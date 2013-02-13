// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Render context and matrix stack tracking.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */


goog.provide('ss2d.RenderSupport');

goog.require('ss2d.Defines');
goog.require('ss2d.Matrix3');

/**
 * @constructor
 * @param {Object} context
 */
ss2d.RenderSupport = function(context)
{
	this.mContext = context;
	this.mAuxMatrix = new ss2d.Matrix3();
	
	if(RENDER_CONTEXT == 'webgl')
	{
		this.mMatrixStack = [];
		this.mCurrentMatrix = new ss2d.Matrix3();
	}
};

/**
 * Push the transformation matrix of the object being rendered.
 * @param {ss2d.DisplayObject} displayObject 
 */
ss2d.RenderSupport.prototype.pushTransform = function(displayObject){};
if(RENDER_CONTEXT == 'webgl')
{
	ss2d.RenderSupport.prototype.pushTransform = function(displayObject)
	{
		this.mAuxMatrix.identity();
		var curMatrix = displayObject.getTransformationMatrix(this.mAuxMatrix);
		this.mMatrixStack.push(curMatrix);
		this.mCurrentMatrix = this.mCurrentMatrix.concatMatrix(curMatrix);
	};
}
else
{
	ss2d.RenderSupport.prototype.pushTransform = function(displayObject)
	{
		this.mAuxMatrix.identity();
		var curMatrix = displayObject.getTransformationMatrix(this.mAuxMatrix);
		this.mContext.save();
		this.mContext.transform(curMatrix.mA,
								curMatrix.mB,
								curMatrix.mC,
								curMatrix.mD,
								curMatrix.mTx,
								curMatrix.mTy);
	};
}

/**
 * Pop the last transformation matrix.
 */
ss2d.RenderSupport.prototype.popTransform = function(){};
if(RENDER_CONTEXT == 'webgl')
{
	ss2d.RenderSupport.prototype.popTransform = function()
	{
		if(this.mMatrixStack.length > 0)
		{
			this.mCurrentMatrix.concatMatrix(this.mMatrixStack.pop().invert());
		}
	};
}
else
{
	ss2d.RenderSupport.prototype.popTransform = function()
	{
		this.mContext.restore();
	};
}




