// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Render context and matrix stack tracking.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */


goog.provide('ss2d.RenderSupport');

goog.require('ss2d.Defines');
goog.require('ss2d.Matrix3');
goog.require('ss2d.materials.Textured');
goog.require('ss2d.materials.Particle');
goog.require('ss2d.materials.GPUParticle');

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

		this.mColorStack = [];
		this.mCurrentColor = [1.0, 1.0, 1.0, 1.0];
		
		this.mActiveTexture = 0;
		this.mActiveSampler = 0;
		
		var gl = this.mContext;
		
		//webgl setup
		//gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
		this.mDefaultBlendSource = gl.SRC_ALPHA;
		this.mDefaultBlendDestination = gl.ONE_MINUS_SRC_ALPHA;
		gl.blendFunc(this.mDefaultBlendSource, this.mDefaultBlendDestination);
		gl.enable(gl.BLEND);
		
		this.createBuiltInBuffers();
														   
		//setup built-in materials
		this.mMaterials = {};
		this.mMaterials.mTextured = new ss2d.materials.Textured(this);
		this.mMaterials.mParticle = new ss2d.materials.Particle(this);
		
		//not supported yet
		this.mMaterials.mGPUParticle = new ss2d.materials.GPUParticle(this);
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
	ss2d.RenderSupport.prototype.pushTransform = function(displayObject, color)
	{
		//this.mAuxMatrix.identity();
		var curMatrix = displayObject;
		color = color||[1.0, 1.0, 1.0, 1.0];
		if(displayObject instanceof ss2d.DisplayObject)
		{
			curMatrix = displayObject.getTransformationMatrix();
			color = displayObject.mColor.getF32Array(color, displayObject.mAlpha);
		} 
		this.mColorStack.push(this.mCurrentColor.slice());
		this.mCurrentColor[0] *= color[0];
		this.mCurrentColor[1] *= color[1];
		this.mCurrentColor[2] *= color[2];
		this.mCurrentColor[3] *= color[3];
		
		//this.mMatrixStack.push(curMatrix);
		//this.mCurrentMatrix = this.mCurrentMatrix.concatMatrix(curMatrix);
		//return this.mCurrentMatrix;
	};
	
	ss2d.RenderSupport.prototype.popTransform = function()
	{
		//if(this.mMatrixStack.length > 0)
		//{
			//this.mCurrentMatrix.concatMatrix(this.mMatrixStack.pop().invert());
		//}
		if(this.mColorStack.length > 0)
		{
			this.mCurrentColor = this.mColorStack.pop();
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
	
	ss2d.RenderSupport.prototype.createBuiltInBuffers = function()
	{
		var gl = this.mContext;
		//setup built-in buffers
		this.mBuffers = this.mBuffers||{};
		
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
		
		
		var particlesQVP = [];
		var particlesQVI = [];
		for(var i = 0; i < 2000; ++i)
		{
			particlesQVP = particlesQVP.concat([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);
			particlesQVI = particlesQVI.concat([0 + (i * 4), 1 + (i * 4), 2 + (i * 4), 0 + (i * 4), 2 + (i * 4), 3 + (i * 4)]);
		}
		
		this.mBuffers.mParticlesQVP = this.createBuffer(gl.ARRAY_BUFFER, 
														new Float32Array(particlesQVP), 
														2, particlesQVP.length / 2);
		this.mBuffers.mParticlesQVI = this.createBuffer(gl.ELEMENT_ARRAY_BUFFER, 
														new Uint16Array(particlesQVI), 
														1, particlesQVI.length);	
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




