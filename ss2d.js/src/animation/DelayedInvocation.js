// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Representation of a delayed in time function call. 
 * Implements ss2d.IAnimatable interface to be used with ss2d.Juggler class.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.DelayedInvocation');

goog.require('ss2d.IAnimatable');

/**
 * @constructor
 * @implements {ss2d.IAnimatable}
 * @param {ss2d.DisplayObject} target
 * @param {(function|function[])} methods
 * @param {Array} values
 * @param {number} time
 */
ss2d.DelayedInvocation = function(target, methods, values, time)
{
	this.mTarget = target;
	this.mMethods = methods
	this.mValues = values;
	this.mDelayTime = time;
	this.mPassedTime = 0.0;
	this.mComplete = false;
};

/**
 * Perform all stored functions calls with the arguments specified in the constructor.
 */
ss2d.DelayedInvocation.prototype.performCalls = function()
{
	
	if(this.mMethods instanceof Array)
	{
		for(var i = 0; i < this.mMethods.lenght; ++i)
		{
			this.callMethodWithValues(this.mMethods[i],this.mValues);
		}
	}
	else 
	{
		this.callMethodWithValues(this.mMethods, this.mValues);
	}
};

/**
 * Call a method with the specified values.
 * @param {function} method
 * @param {*} values
 */
ss2d.DelayedInvocation.prototype.callMethodWithValues = function(method, values)
{
	
	if(values instanceof Array)
	{
		method.apply(this.mTarget, values);	
	}
	else 
	{
		method.call(this.mTarget, values);
	}	
};

/**
 * Called every frame by the ss2d.Juggler parent object.
 * @param {number} deltaTime The time passed since the last frame call (1.0 / frameRate)
 */
ss2d.DelayedInvocation.prototype.tick = function(deltaTime)
{
	if(!this.mComplete)
	{
		this.mPassedTime += deltaTime;
		if(this.mPassedTime >= this.mDelayTime)
		{
			this.mComplete = true;
			this.performCalls();
			delete this.mValues;
			delete this.mMethods;
		}
	}
};

/**
 * Called by the ss2d.Juggler parent object to check if the object must be removed.
 * @return {boolean} Return true if the animation is completed.
 */
ss2d.DelayedInvocation.prototype.isComplete = function()
{
	return this.mComplete;
};
