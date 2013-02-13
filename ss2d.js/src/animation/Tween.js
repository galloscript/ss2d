// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview This class is used with ss2d.Juggler to create animations, 
 * calculate the needed time to interpolate between a value and another 
 * in the specified time and update the property value every frame.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Tween');

goog.require('ss2d.TweenedProperty');
goog.require('ss2d.Transitions');
goog.require('ss2d.IAnimatable');

/** 
 * @constructor
 * @implements {ss2d.IAnimatable}
 * @param {!ss2d.DisplayObject} target
 * @param {number} time
 * @param {function(number)=} transitionMethod
 * @param {number=} delay Starts the animation when this delay time has passed
 * @param {ss2d.Tween.LoopType=} looptype Specifies the loop type.
 */
ss2d.Tween = function(target, time, transitionMethod, delay, looptype)
{
	this.mTarget = target;		
	this.mProperties = [];
	this.mTransitionMethod = ss2d.Transitions.linear;
	if(transitionMethod) this.mTransitionMethod = transitionMethod;
	
	this.mTotalTime = time;
	this.mCurrentTime = 0.0;
	this.mDelay = 0;
	if(delay) this.mDelay = delay;
	
	this.mLoopCount = 0;
	this.mLoop = ss2d.Tween.LoopType.NONE;
	if(looptype) this.mLoop = looptype;
};

/**
 * Enumeration for loop types
 * <pre>
 * NONE: 0
 * REPEAT: 1
 * REVERSE: 2
 * </pre>
 * @enum {number}
 */
ss2d.Tween.LoopType = {
	NONE: 0,
	REPEAT: 1,
	REVERSE: 2
};

/**
 * Creates and store a ss2d.TweenedProperty object
 * @param {function} propertyGetter Called to get the current value of the animated property.
 * @param {function} propertySetter Called to set the new value of the animated property.
 * @param {number} targetValue
 */
ss2d.Tween.prototype.animateProperty = function(propertyGetter, propertySetter, targetValue)
{
	this.mProperties.push(new ss2d.TweenedProperty(this.mTarget, propertyGetter, propertySetter, targetValue));
};

/**
 * Created the needed ss2d.TweenedProperty objects to move a ss2d.DisplayObject to the specified coords.
 * @param {number} x coord
 * @param {number} y coord
 */
ss2d.Tween.prototype.moveTo = function(x, y)
{
	this.animateProperty(this.mTarget.getX, this.mTarget.setX, x);
	this.animateProperty(this.mTarget.getY, this.mTarget.setY, y);
};

/**
 * Created the needed ss2d.TweenedProperty object to animate the alpha property of a ss2d.DisplayObject
 * @param {number} x coord
 * @param {number} y coord
 */
ss2d.Tween.prototype.fadeTo = function(alpha)
{
	this.animateProperty(this.mTarget.getAlpha, this.mTarget.setAlpha, alpha);
};

/**
 * Called every frame by the ss2d.Juggler parent object.
 * @param {number} deltaTime The time passed since the last frame call (1.0 / frameRate)
 */
ss2d.Tween.prototype.advanceTime = function(deltaTime)
{
	if (deltaTime == 0 || (this.mLoop == ss2d.Tween.LoopTypeNone && this.mCurrentTime >= this.mTotalTime))
		return;
	
	if (this.mCurrentTime >= this.mTotalTime)
	{
		this.mCurrentTime = 0.0;	
		this.mLoopCount++;
	}
	
	var previousTime = this.mCurrentTime;
	var restTime = this.mTotalTime - this.mCurrentTime;
	var carryOverTime = deltaTime > restTime ? deltaTime - restTime : 0.0;	
	this.mCurrentTime = Math.min(this.mTotalTime, this.mCurrentTime + deltaTime);

	if (this.mCurrentTime <= 0) return;
	
	var ratio = this.mCurrentTime / this.mTotalTime;

	var invertTransition = (this.mLoop == ss2d.Tween.LoopTypeReverse && this.mLoopCount % 2 == 1);
	
	for (var i = 0; i < this.mProperties.length; ++i)
	{		
		var prop = this.mProperties[i];
		if (previousTime <= 0 && this.mCurrentTime > 0) 
			prop.mStartValue = prop.currentValue();

		var transitionValue = invertTransition? 1.0 - this.mTransitionMethod(1.0 - ratio) : this.mTransitionMethod(ratio);		
		prop.setCurrentValue(prop.mStartValue + prop.delta() * transitionValue);
	}
	
	if (previousTime < this.mTotalTime && this.mCurrentTime >= this.mTotalTime)
	{
		if (this.mLoop == ss2d.Tween.LoopTypeRepeat)
		{
			for (var i = 0; i < this.mProperties.length; ++i)
			{
				var prop = this.mProperties[i];
				prop.setCurrentValue(prop.mStartValue);
			}
		}
		else if (this.mLoop == ss2d.Tween.LoopTypeReverse)
		{
			for (var i = 0; i < this.mProperties.length; ++i)
			{
				var prop = this.mProperties[i];
				prop.setCurrentValue(prop.mEndValue);
				prop.mEndValue = prop.mStartValue;
			}
		}
	}
	
	this.advanceTime(carryOverTime);
};

/**
 * Called by the ss2d.Juggler parent object to check if the object must be removed.
 * @return {boolean} Return true if the animation is completed.
 */
ss2d.Tween.prototype.isComplete = function()
{
	return this.mCurrentTime >= this.mTotalTime && this.mLoop == ss2d.Tween.LoopTypeNone;
};

/**
 * Changes the delay time value
 * @param {number} delay
 */
ss2d.Tween.prototype.setDelay = function(delay)
{
	this.mCurrentTime = this.mCurrentTime + this.mDelay - delay;
	this.mDelay = delay;
};
