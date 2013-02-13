// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Animated property stored in a ss2d.Tween object.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.TweenedProperty');

/** 
 * @constructor 
 * @param {!Object} target
 * @param {function():number} getterMethod
 * @param {function(number):void} setterMethod
 * @param {number} targetValue 
 */
ss2d.TweenedProperty = function (target, getterMethod, setterMethod, targetValue)
{
	this.mTarget = target;
	this.mGetterMethod = getterMethod;
	this.mSetterMethod = setterMethod;
	this.mStartValue = this.currentValue();
	this.mEndValue = targetValue;
}

/**
 * @return {number} The current value of the property 
 */
ss2d.TweenedProperty.prototype.currentValue = function()
{
	return this.mGetterMethod.call(this.mTarget);
}

/**
 * Sets a new value for the animated property using the stored setter methods
 * @param {number} newValue
 */
ss2d.TweenedProperty.prototype.setCurrentValue = function(newValue)
{
	this.mSetterMethod.call(this.mTarget, newValue);
}

/**
 * Sets the final target value 
 */
ss2d.TweenedProperty.prototype.setTargetValue = function()
{
	this.mSetterMethod.call(this.mTarget, this.mEndValue);
}

/**
 * @return {number} The difference between the initial value and the final value 
 */
ss2d.TweenedProperty.prototype.delta = function()
{
	return this.mEndValue - this.mStartValue;
}

