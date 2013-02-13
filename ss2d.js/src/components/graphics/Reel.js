// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Collection of ss2d.ReelFrame objects that describe an animation.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Reel');

goog.require('ss2d.ReelFrame');

/**
 * @constructor
 * @param {number} duration
 */
ss2d.Reel = function(duration)
{
	/** @type {Array.<ss2d.ReelFrame>} */
	this.mFrames = [];
	
	this.mDuration = duration; //duration in seconds
};


//how many time must remain in each frame
ss2d.Reel.prototype.getTimePerFrame = function()
{
	return (this.mFrames.length)?this.mDuration/this.mFrames.length:0;
};