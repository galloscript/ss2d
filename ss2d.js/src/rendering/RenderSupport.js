// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Render context and matrix stack tracking.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */


goog.provide('ss2d.RenderSupport');

goog.require('ss2d.Defines');
goog.require('ss2d.Matrix3');
goog.require('ss2d.materials.Textured');

/**
 * @constructor
 * @param {Object} context
 */
ss2d.RenderSupport = function(context)
{
	this.mContext = context;
	this.mAuxMatrix = new ss2d.Matrix3();
	
	this.mAux2DCanvas = document.createElement('canvas');
	this.mAux2DContext = this.mAux2DCanvas.getContext('2d');
	
	//aux 8x8 texture
	this.mAux2DCanvas.width = this.mAux2DCanvas.height = 8;
	this.mAux2DContext.fillStyle = '#ffffff';
	this.mAux2DContext.fillRect(0, 0, 8, 8);
	this.mAux8x8Texture = new ss2d.Texture(this.mAux2DCanvas.toDataURL());
	
	if(RENDER_CONTEXT == 'webgl')
	{
		this.mMatrixStack = [];
		this.mCurrentMatrix = new ss2d.Matrix3();
		this.mAlphaStack = [];
		this.mCurrentAlpha = 1;
		this.mActiveTexture = 0;
		this.mActiveSampler = 0;
		
		var gl = this.mContext;
		
		//webgl setup
		//gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		
		//setup built-in buffers
		this.mBuffers = {};
		this.mBuffers.mQuadVertexPosition = this.createBuffer(gl.ARRAY_BUFFER,
															  new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]),
															  //new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
															  2, 4);
															  
		this.mBuffers.mQuadTextureCoords = this.createBuffer(gl.ARRAY_BUFFER,
															 new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]),
															 //new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]),
															 2, 4);
															 
		this.mBuffers.mQuadVertexIndex = this.createBuffer(gl.ELEMENT_ARRAY_BUFFER,
														   new Uint16Array([0, 1, 2, 0, 2, 3]),
														   1, 6);
														   
		//setup built-in materials
		this.mMaterials = {};
		this.mMaterials.mTextured = new ss2d.materials.Textured(this);
	}
};

/**
 * Push the transformation matrix of the object being rendered.
 * @param {ss2d.DisplayObject|ss2d.Matrix3} displayObject 
 */
ss2d.RenderSupport.prototype.pushTransform = function(displayObject){};

/**
 * Pop the last transformation matrix.
 */
ss2d.RenderSupport.prototype.popTransform = function(){};

if(RENDER_CONTEXT == 'webgl')
{		
	ss2d.RenderSupport.prototype.pushTransform = function(displayObject, alpha)
	{
		//this.mAuxMatrix.identity();
		var curMatrix = displayObject;
		alpha = alpha||1;
		if(displayObject instanceof ss2d.DisplayObject)
		{
			curMatrix = displayObject.getTransformationMatrix();
			alpha = displayObject.mAlpha;
		} 
		this.mAlphaStack.push(alpha);
		this.mCurrentAlpha *= alpha;
		this.mMatrixStack.push(curMatrix);
		this.mCurrentMatrix = this.mCurrentMatrix.concatMatrix(curMatrix);
		return this.mCurrentMatrix;
	};
	
	ss2d.RenderSupport.prototype.popTransform = function()
	{
		if(this.mMatrixStack.length > 0)
		{
			this.mCurrentMatrix.concatMatrix(this.mMatrixStack.pop().invert());
		}
		if(this.mAlphaStack.length > 0)
		{
			this.mCurrentAlpha /= this.mAlphaStack.pop();
		}
	};
	
	ss2d.RenderSupport.prototype.activeTextureForSampler = function(textureId, sampler, textureSlot)
	{
		if(this.mActiveTexture != textureId ||this.mActiveSampler != sampler)
		{
			var gl = this.mContext;
			this.mActiveTexture = textureId;
			this.mActiveSampler = sampler;
			gl.activeTexture(textureSlot);
			gl.bindTexture(gl.TEXTURE_2D, this.mActiveTexture);
			gl.uniform1i(this.mActiveSampler, 0);
		}
		
	}
	
	ss2d.RenderSupport.prototype.createBuffer = function(type, data, itemSize, numItems, usage)
	{
		var gl = this.mContext;
		usage = usage||gl.STATIC_DRAW
		var buffer = gl.createBuffer();
		gl.bindBuffer(type, buffer);
		gl.bufferData(type, data, gl.STATIC_DRAW);
		buffer.itemSize = itemSize;
		buffer.numItems = numItems;
		return buffer;
	};
	
	ss2d.RenderSupport.make2DProjection = function(width, height, target) 
	{
	  // Note: This matrix flips the Y axis so 0 is at the top.
	  	target = target||new ss2d.Matrix3();
	  	
	  	//[2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
	  	target.mA = 2 / width;
	  	target.mD = -2 / height;
	  	target.mTx = -1;
	  	target.mTy = 1;

		return target;
	};
}
else
{
	ss2d.RenderSupport.prototype.pushTransform = function(displayObject)
	{
		//this.mAuxMatrix.identity();
		var curMatrix = displayObject;
		if(displayObject instanceof ss2d.DisplayObject)
		{
			curMatrix = displayObject.getTransformationMatrix();
		} 
		
		this.mContext.save();
		this.mContext.globalAlpha *= displayObject.mAlpha;
		this.mContext.transform(curMatrix.mA,
								curMatrix.mB,
								curMatrix.mC,
								curMatrix.mD,
								curMatrix.mTx,
								curMatrix.mTy);
	};
	
	ss2d.RenderSupport.prototype.popTransform = function()
	{
		this.mContext.restore();
	};
}




