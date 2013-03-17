// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A frame for of a ss2d.Reel
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelFrame');


/**
 * @constructor
 * @param {number} x The X texture coordinate
 * @param {number} y The Y texture coordinate
 * @param {number} width Width in texture pixels
 * @param {number} height Height in texture pixels
 * @param {(string|ss2d.Texture)} texture
 * @param {number=} ox Horizontal offset (optional)
 * @param {number=} oy Vertical offset (optional)
 * The offsets are used by the ss2d.SpriteReelPlayer to "center" the position of the figure.
 */
ss2d.ReelFrame = function(x, y, width, height, offsetX, offsetY)
{
	this.mX = x;
	this.mY = y;
	this.mWidth = width;
	this.mHeight = height;
	
	this.mOffsetX = offsetX||0;
	this.mOffsetY = offsetY||0;
};

/**
 * @param {Array=} clipArray array where the clip information will be dump
 * @return {number[4]} array for clipping the proper frame from the texture
 */
ss2d.ReelFrame.prototype.dumpClip = function(clipArray)
{
	clipArray = clipArray || new Array(4);
	
	clipArray[0] = this.mX;
	clipArray[1] = this.mY;
	clipArray[2] = this.mWidth;
	clipArray[3] = this.mHeight;
	
	return clipArray;
};

