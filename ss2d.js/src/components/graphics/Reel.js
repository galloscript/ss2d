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
ss2d.Reel = function(name, duration)
{
	/** @type {ss2d.ReelFrame[]} */
	this.mFrames = [];
	this.mName = name;
	this.mDuration = duration; //duration in seconds
};


//how many time must remain in each frame
ss2d.Reel.prototype.getTimePerFrame = function()
{
	return (this.mFrames.length)?this.mDuration/this.mFrames.length:0;
};


ss2d.Reel.getFramesFromGrid = function(frameWidth, frameHeight, framesPerRow, frames, resultArray, addLineBreaks)
{
	var resultArray = resultArray||[];
	
	for(var f = 0; f < frames; f++)
	{
		var row = Math.floor(f / framesPerRow);
		var column = f - (row * framesPerRow);
		resultArray.push([column*frameWidth, row*frameHeight, frameWidth, frameHeight, 0, 0]);
	}
	
	var str = JSON.stringify(resultArray);
	
	if(addLineBreaks)
	{
		while(str.indexOf('],[') != -1)
		{
			str = str.replace('],[','],\n[');
		}
	}
	return str;
};
