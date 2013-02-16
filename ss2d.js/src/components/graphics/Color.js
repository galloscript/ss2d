// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Representation of an RGB color
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Color');

/**
 * @constructor
 * @param {(ss2d.Color|number|string|number[3])} color
 */
ss2d.Color = function(color)
{
	this.setValue(color);
};

/**
 * Sets the color value from various types of color representation formats
 * @param {(ss2d.Color|number|string|number[3])} color
 */
ss2d.Color.prototype.setValue = function(color)
{
	if(color instanceof ss2d.Color)
	{
		this.mColorArray = color.mColorArray.slice(0);
	}
	else if(color instanceof Array && color.length > 2)
	{
		//color = (color[0] << 16) + (color[1] << 8) + color[2];
		this.mColorArray = color.slice(0);
	}
	else if(typeof color == 'string' || typeof color == 'number')
	{
		if(typeof color == 'string')
		{
			color = parseInt('0x'+(color.replace('#','').substring(0,6)));
		}
		
		color = color & 0xffffff;
		this.mColorArray = [(color & 0xff0000) >> 16, (color & 0xff00) >> 8 , color & 0xff];
	}
};

/**
 * Sets the byte value of red, green and blue color components with values from 0 to 255
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 */
ss2d.Color.prototype.setRGB = function(red, green, blue)
{
	this.mColorArray[0] = red;
	this.mColorArray[1] = green;
	this.mColorArray[2] = blue;
};

ss2d.Color.prototype.getRed = function(){ return this.mColorArray[0]; };
ss2d.Color.prototype.setRed = function(r){ this.mColorArray[0] = r; };

ss2d.Color.prototype.getGreen = function(){ return this.mColorArray[1]; };
ss2d.Color.prototype.setGreen = function(g){ this.mColorArray[1] = g; };

ss2d.Color.prototype.getBlue = function(){ return this.mColorArray[2]; };
ss2d.Color.prototype.setBlue = function(b){ this.mColorArray[2] = b; };

/**
 * @return {number[3]} Array of bytes with values from 0 to 255
 */
ss2d.Color.prototype.getRGBArray = function()
{
	return this.mColorArray;
};

/**
 * @return {string} The Hex string CSS color format: #AABBCC
 */
ss2d.Color.prototype.getHexString = function()
{
	var r = Math.floor(this.mColorArray[0]).toString(16); r = (r.length == 1)?'0'+r:r;
	var g = Math.floor(this.mColorArray[1]).toString(16); g = (g.length == 1)?'0'+g:g;
	var b = Math.floor(this.mColorArray[2]).toString(16); b = (b.length == 1)?'0'+b:b;
	
	return '#' + r + g + b;
};

/**
 * @param {number=} The value for the alpha component, 1.0 by default.
 * @return {string} The rgba string CSS color format: rgba(red,green,blue,alpha);
 */
ss2d.Color.prototype.getRGBAString = function(alpha)
{
	alpha = alpha || '1.0';
	return 'rgba(' + this.mColorArray[0] + ',' + this.mColorArray[1] + ',' + this.mColorArray[2] + ',' + alpha+')';
};

/**
 * @param {Array=} target An already created array to store the values
 * @return {number[3]} Array with float color components values from 0 to 1.
 */
ss2d.Color.prototype.getF32Array = function(target)
{
	target = target || new Array(3);
	target[0] = this.mColorArray[0] / 255;
	target[1] = this.mColorArray[1] / 255;
	target[2] = this.mColorArray[2] / 255;
	return target;
};

/**
 * @return {number} The numeric value of the color
 */
ss2d.Color.prototype.getF32 = function()
{
	return (this.mColorArray[0] << 16) + (this.mColorArray[1] << 8) + this.mColorArray[2];
};

/**
 * Interpolate between two color values
 * @param {number[3]} initialColor
 * @param {number[3]} finalColor
 * @param {number} part The fraction of difference value between two colors.
 */
ss2d.Color.interpolate = function(initialColor, finalColor, part)
{
	var ic = new ss2d.Color(initialColor);
	var fc = new ss2d.Color(finalColor);
	ic.mColorArray[0] += (fc.mColorArray[0] - ic.mColorArray[0])*part;
	ic.mColorArray[1] += (fc.mColorArray[1] - ic.mColorArray[1])*part;
	ic.mColorArray[2] += (fc.mColorArray[2] - ic.mColorArray[2])*part;
	delete fc;
	return ic;
}
