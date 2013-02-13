// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A simple 2D point.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Point');

/**
 * @constructor
 * @param {number} x coordinate
 * @param {number} y coordinate
 */
ss2d.Point = function(x, y)
{
	this.mX = x;
	this.mY = y;
};

/**
 * Set point values
 * @param {number} xv
 * @param {number} yv
 */
ss2d.Point.prototype.set = function(xv, yv)
{
	this.mX = xv;
	this.mY = yv;
};

/**
 * @return {number} the length of the vector
 */
ss2d.Point.prototype.length = function()
{
	return Math.sqrt((this.mX*this.mX) + (this.mY*this.mY));
}

/**
 * @return {ss2d.Point} reutn the normalized version of this point
 */
ss2d.Point.prototype.normalize = function()
{
	return ss2d.Point.scalePoint(this, 1.0 / this.length());
}

/**
 * @return {number} the x coordinate
 */
ss2d.Point.prototype.getX = function()
{ 
	return this.mX; 
};

/**
 * @param {number} x
 */
ss2d.Point.prototype.setX = function(x)
{ 
	this.mX = x; 
};

/**
 * @return {number} the y coordinate
 */
ss2d.Point.prototype.getY = function()
{ 
	return this.mY; 
};

/**
 * @param {number} y
 */
ss2d.Point.prototype.setY = function(y)
{ 
	this.mY = y	
};

/**
 * @static
 * @param {ss2d.Point} p1
 * @param {ss2d.Point} p2
 * @return {number} distance between points
 */
ss2d.Point.distanceBetweenPoints = function(p1, p2)
{
	return Math.abs(Math.sqrt(((p2.mX - p1.mX) * (p2.mX - p1.mX)) + ((p2.mY - p1.mY) * (p2.mY - p1.mY))));
}

/**
 * @static
 * @param {ss2d.Point} p1
 * @param {ss2d.Point} p2
 * @return {ss2d.Point} the two points added
 */
ss2d.Point.addPoints = function(p1, p2)
{
	return new ss2d.Point(p1.mX + p2.mX, p1.mY + p2.mY);
}

/**
 * @static
 * @param {ss2d.Point} p1
 * @param {ss2d.Point} p2
 * @return {ss2d.Point} the subtract result
 */
ss2d.Point.subtractPoints = function(p1, p2)
{
	return new ss2d.Point(p2.mX - p1.mX, p2.mY - p1.mY);
}

/**
 * @static
 * @param {ss2d.Point} p1
 * @param {number} scalar
 * @return {ss2d.Point} the scaled point
 */
ss2d.Point.scalePoint = function(p, scalar)
{
	return new ss2d.Point(scalar * p.mX, scalar * p.mY);
}


