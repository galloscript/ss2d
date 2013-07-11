// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A colored Quad object.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Quad');

goog.require('ss2d.DisplayObject');
goog.require('ss2d.Rectangle');

/**
 * @constructor
 * @extends {ss2d.DisplayObject}
 * @param {number=} x Position in x axis 
 * @param {number=} y Position in y axis
 * @param {number} w The width
 * @param {number} h The height
 * @param {(number|string|number[3]|ss2d.Color)} color
 * @property {*} inherited @see ss2d.DisplayObject
 * @property {number} mWidth The width in pixels of the object
 * @property {number} mHeight The height in pixels of the object
 */
ss2d.Quad = function(x, y, w, h, color)
{
	ss2d.DisplayObject.call(this, x, y, 1.0, 0.0, color, 1.0);
	
	this.mWidth = w;
	this.mHeight = h;
};

goog.inherits(ss2d.Quad, ss2d.DisplayObject);

ss2d.Object.assignClassId(ss2d.Quad, 1003);

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	if(RENDER_CONTEXT == 'webgl')
	{
		ss2d.Quad.prototype.render = function(renderSupport)
		{	
			var gl = renderSupport.mContext;
			var material = renderSupport.mMaterials.mTextured;

			var mMatrix = new ss2d.Matrix3().scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix());
			var mvMatrix = mMatrix.concatMatrix(this.getWorldTransformationMatrix(null, null));
			
			renderSupport.pushTransform(this);
			
			material.mModelViewMatrix = mvMatrix;
			var color = renderSupport.mCurrentColor.slice();
			var alpha = (this.mInheritAlpha) ? renderSupport.mCurrentColor[3] : this.mAlpha;
			if(!this.mInheritColor)
			{
				this.mColor.getF32Array(color, alpha);
			}
			material.mColor = color;
			material.mActiveTexture = renderSupport.mAux8x8Texture.mTextureId;
			material.mVertexPositionBuffer = renderSupport.mBuffers.mQuadVertexPosition;
			material.mTextureCoordBuffer = renderSupport.mBuffers.mQuadTextureCoords;
			
			material.apply(renderSupport);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderSupport.mBuffers.mQuadVertexIndex);
			gl.drawElements(gl.TRIANGLES, renderSupport.mBuffers.mQuadVertexIndex.numItems, gl.UNSIGNED_SHORT, 0);
			
			renderSupport.popTransform();
		};
	}
	else
	{
		/** @override */
		ss2d.Quad.prototype.render = function(renderSupport)
		{
			renderSupport.pushTransform(this);
			var ctx = renderSupport.mContext;
			ctx.fillStyle = this.mColor.getHexString();
			ctx.fillRect(0, 0, this.mWidth, this.mHeight);
			renderSupport.popTransform(); 
		};
	}
}

/** @override */
ss2d.Quad.prototype.getWidth = function(v)
{ 
	return this.mWidth;
};

/** @override */
ss2d.Quad.prototype.getHeight = function(v)
{ 
	return this.mHeight; 
};

/** @override */
ss2d.Quad.prototype.setWidth = function(w, excludeClip)
{ 
	this.mWidth = w;
};

/** @override */
ss2d.Quad.prototype.setHeight = function(h, excludeClip)
{ 
	this.mHeight = h;
};

/** @override */
ss2d.Quad.prototype.getBounds = function()
{
	return new ss2d.Rectangle(this.mLocation.mX - (this.mPivotX * this.mScaleX), 
							  this.mLocation.mY - (this.mPivotY * this.mScaleY), 
							  this.getWidth() * this.mScaleX, 
							  this.getHeight() * this.mScaleY);
};

/** @override */
ss2d.Quad.prototype.hitTestPoint = function(point)
{
	var localPoint = this.worldToLocal(point);
	return (this.getBounds().containsPoint(localPoint))?this:null;
}

//*****************
//* SERIALIZATION *
//*****************/

if(COMPILING_CLIENT)
{
	/** @override */
	ss2d.Quad.convert = function(obj)
	{
		var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		
		ss2d.Quad.call(obj);
		
		obj.__proto__ = ss2d.Quad.prototype;
		
		//now obj is a Quad
		obj.restoreSerializedProperties(objBackup);
		
		return obj;
	}
	
	/** @override */
	ss2d.Quad.prototype.restoreSerializedProperties = function(objBackup)
	{
		ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, objBackup);
		
		this.mWidth = objBackup['w'] || this.mWidth;
		this.mHeight = objBackup['h'] || this.mHeight;
	}
	
	/** @override */
	ss2d.Quad.createFromSerializedObject = function(obj)
	{
		var newObj = new ss2d.Quad(obj['x'], obj['y'], obj['w'], obj['h'], obj['c']);
		newObj.mObjectId = obj['doid'];
		return newObj;
	}
	
	/** @override */
	ss2d.Quad.prototype.interpolateState = function(prevState, nextState, part, deltaTime)
	{
		ss2d.DisplayObject.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		this.mWidth = (prevState['w']) ? prevState['w'] + (nextState['w'] - prevState['w']) * part : this.mWidth;
		this.mHeight = (prevState['h']) ? prevState['h'] + (nextState['h'] - prevState['h']) * part : this.mHeight;
	}
}

if(COMPILING_SERVER)
{
	/** @override */
	ss2d.Quad.prototype.toJSON = function()
	{
		return '{'+this.getPropertiesJSON()+'}';
	}


	/**
	 * mWidth : w
	 * mHeight : h
	 * @override
	 */
	ss2d.Quad.prototype.getPropertiesJSON = function()
	{
		var str = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this)+',';
		str += '"w": '+this.getWidth()+',';
		str += '"h": '+this.getHeight();
		
		return str;
	}
}

//************************
//* END OF SERIALIZATION *
//************************/

