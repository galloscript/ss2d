// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Rectangle with hit test methods
 * @author David Gallardo Moreno (portalg@gmail.com)
 */


goog.provide('ss2d.Rectangle');

/**
 * @constructor 
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
ss2d.Rectangle = function(x,y,w,h)
{
	this.mX = x;
	this.mY = y;
	this.mWidth = w;
	this.mHeight = h;	
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @return {ss2d.Rectangle} this object
 */
ss2d.Rectangle.prototype.setValues = function(x,y,w,h)
{
	this.mX = x;
	this.mY = y;
	this.mWidth = w;
	this.mHeight = h;
	
	return this;
}

/**
 * @return {ss2d.Rectangle} a copy of this object
 */
ss2d.Rectangle.prototype.clone = function()
{
	return new ss2d.Rectangle(this.mX, this.mY, this.mWidth, this.mHeight);
}

/**
 * @return {string}
 */
ss2d.Rectangle.prototype.toString = function()
{
	return "("+this.mX+","+this.mY+","+this.mWidth+","+this.mHeight+")";
}

/**
 * Determines if a coordinate is within the rectangle.
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
ss2d.Rectangle.prototype.contains = function(x, y)
{
	return  x >= this.mX && y >= this.mY && x <= this.mX + this.mWidth && y <= this.mY + this.mHeight;
}

/**
 * Determines if a point is within the rectangle.
 * @param {ss2d.Point} point
 * @return {boolean}
 */
ss2d.Rectangle.prototype.containsPoint = function(point)
{
	return this.contains(point.mX, point.mY);	
}

/**
 * Determines if another rectangle is within the rectangle.
 * @param {ss2d.Rectangle} otherRectangle
 * @return {boolean}
 */
ss2d.Rectangle.prototype.containsRectangle = function(otherRectangle)
{
	return (otherRectangle.mX >= this.mX && otherRectangle.mX + otherRectangle.mWidth <= this.mX + this.mWidth &&
		otherRectangle.mY >= this.mY && otherRectangle.mY + otherRectangle.mHeight <= this.mY + this.mHeight);
}

/**
 * Determines if another rectangle contains or intersects the rectangle.
 * @param {ss2d.Rectangle} otherRectangle
 * @return {boolean}
 */
ss2d.Rectangle.prototype.intersectsRectangle = function(otherRectangle)
{
        return !(otherRectangle.mX <= this.mX && otherRectangle.mX + otherRectangle.mWidth <= this.mX)  || 
        	(otherRectangle.mX >= this.mX + this.mWidth && rX + otherRectangle.mWidth >= this.mX + this.mWidth) ||
        	(otherRectangle.mY <= this.mY && otherRectangle.mY + otherRectangle.mHeight <= this.mY) || 
        	(otherRectangle.mY >= this.mY + this.mHeight && otherRectangle.mY + otherRectangle.mHeight >= this.mY + this.mHeight);	
}

/**
 * If the specified rectangle intersects with the rectangle, returns the area of intersection.
 * @param {ss2d.Rectangle} otherRectangle
 * @param {ss2d.Rectangle} targetRectangle Empty rectangle to dump the result
 * @return {ss2d.Rectangle} Area of intersection
 */
ss2d.Rectangle.prototype.intersectionWithRectangle = function(otherRectangle, targetRectangle)
{
	if(!otherRectangle)
	{
		return null;
	} 
	
	if(!targetRectangle)
	{
		targetRectangle = new ss2d.Rectangle(0.0, 0.0, 0.0, 0.0);
	} 

	var left   = Math.max(this.mX, otherRectangle.mX);
	var right  = Math.min(this.mX + this.mWidth, otherRectangle.mX + otherRectangle.mWidth);
	var top    = Math.max(this.mY, otherRectangle.mY);
	var bottom = Math.min(this.mY + this.mHeight, otherRectangle.mY + otherRectangle.mHeight);
    
	if (!(left > right || top > bottom))
	{
		targetRectangle.setValues(left, top, right-left, bottom-top);
	}
	
	return targetRectangle;
}

/**
 * Adds two rectangles together to create a new Rectangle object (by filling in the space between the two rectangles).
 * @param {ss2d.Rectangle} otherRectangle
 */
ss2d.Rectangle.prototype.uniteWithRectangle = function(otherRectangle)
{
	if(!targetRectangle)
	{
		targetRectangle = this.clone();
	} 
	
	if(!otherRectangle)
	{
		if(!targetRectangle){
			return targetRectangle;
		} else {
			return targetRectangle.setValues(this.mX, this.mY, this.mWidth, this.mHeight);
		}
	} 

	var left   = Math.min(this.mX, otherRectangle.mX);
	var right  = Math.max(this.mX + this.mWidth, otherRectangle.mX + otherRectangle.mWidth);
	var top    = Math.min(this.mY, otherRectangle.mY);
	var bottom = Math.max(this.mY + this.mHeight, otherRectangle.mY + otherRectangle.mHeight);
	
	return targetRectangle.setValues(left, top, right - left, bottom - top);
}

