// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Interface for objects that will be used with ss2d.Juggler.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.IAnimatable');

/** 
 * @constructor
 * @class Defines a prototype for a class that will be used with ss2d.Juggler to animate values over time.
 * @interface 
 */
ss2d.IAnimatable = function()
{
	/** @type {(ss2d.DisplayObject|?Object)} */
	this.mTarget = null;
};

/**
 * Called every frame by the ss2d.Juggler parent object.
 * @param {number} deltaTime The time passed since the last frame call (1.0 / frameRate)
 */
ss2d.IAnimatable.prototype.tick = function(deltaTime){};

/**
 * Called by the ss2d.Juggler parent object to check if the object must be removed.
 * @return {boolean} Return true if the animation is completed.
 */
ss2d.IAnimatable.prototype.isComplete = function(){};