// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Controls the major part of animations and delayed calls of the game.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Juggler');

goog.require('ss2d.DelayedInvocation');

/** @constructor */
ss2d.Juggler = function()
{
	this.mObjects = [];
	this.mElapsedTime = 0.0;
};

/**
 * Call the the advanceTime methods of all stored objects with the speficied time.
 * If the animation of an object is completed, then the object is removed.
 * @param {number} deltaTime
 */
ss2d.Juggler.prototype.advanceTime = function(deltaTime)
{
	this.mElapsedTime += deltaTime;
	var objectsCopy = this.mObjects.slice();
	for (var i = 0;i < objectsCopy.length; ++i)
	{
		var object = objectsCopy[i];
		object.advanceTime(deltaTime);        
		if (object.isComplete()) this.removeObject(object);
	}    
};

/**
 * Store an object that implements ss2d.IAnimatable interface.
 * @param {ss2d.IAnimatable} object
 */
ss2d.Juggler.prototype.addObject = function(object)
{
	if (object) this.mObjects.push(object);    
};

/**
 * Remove the specified object
 * @param {ss2d.IAnimatable} object
 */
ss2d.Juggler.prototype.removeObject = function(object)
{
	var objectIndex = this.mObjects.indexOf(object);
	if(objectIndex > -1)
	{
		this.mObjects.splice(objectIndex, 1);
	}
};

ss2d.Juggler.prototype.removeAllObjects = function()
{
	this.mObjects.splice(0, this.mObjects.length);
};

/**
 * Remove all objects that have the specified target.
 * @param {Object} object
 */
ss2d.Juggler.prototype.removeObjectsWithTarget = function(object)
{
	var remainingObjects = [];
	
	for (var i = 0; i < this.mObjects.length; ++i)
	{
		var currentObject = this.mObjects[i];
		if (currentObject.mTarget != object)
		{
			remainingObjects.push(currentObject);
		}
	}
	
	delete this.mObjects;
	this.mObjects = remainingObjects;
};

/**
 * Creates and store a ss2d.DelayedInvocation object with the specified parameters.
 * @param {(ss2d.DisplayObject|?Object)} target The object that implements the methods or null
 * @param {(function|Array.<function>)} methods
 * @param {*} values
 * @param {number} time The time that must pass to call the function
 */
ss2d.Juggler.prototype.delayInvocation = function(target, methods, values, time)
{
	this.addObject(new ss2d.DelayedInvocation(target, methods, values, time));     
};


