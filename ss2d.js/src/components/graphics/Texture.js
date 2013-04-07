// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Texture component
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Texture');

goog.require('ss2d.Defines');

/**
 * @constructor
 * @param {string} textureFile The resource name
 * @param {function} callbackFunction Called when the texture is loaded
 */
ss2d.Texture = function(textureFile, callbackFunction, callbackTarget)
{	
	//resource loading info
	this.mName = textureFile;
	
	/** @type {Image} */
	this.mTextureElement = new Image();
	this.mTextureElement.mTexture = this;
	this.mCallbackFunction = callbackFunction || function(){};
	this.mCallbackTarget = callbackTarget||null;
	this.mTextureElement.onload = function()
	{ 
		this.mTexture.handleLoadedTexture(this); 
	};

	this.mTextureElement.src = textureFile;
};

/**
 * Method called when the texture is loaded
 */
ss2d.Texture.prototype.handleLoadedTexture = function(textureElement)
{
	if(this.mCallbackFunction)
		this.mCallbackFunction.call(this.mCallbackTarget, this); 
};

if(RENDER_CONTEXT == 'webgl')
{
	ss2d.Texture.prototype.handleLoadedTexture = function(textureElement)
	{
		try
		{
			//TODO: check if the image size is a power of 2, if not, use aux canvas to create one.
			/*
			var gl = ss2d.CURRENT_VIEW.mContext;
			this.mTextureId = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.mTextureId);
			//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureElement);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);	*/
			
			
			var gl = ss2d.CURRENT_VIEW.mContext;
			var image = this.mTextureElement = textureElement;
			this.mPOTWidth = image.width;
			this.mPOTHeight = image.height;
			var texture = this.mTextureId = gl.createTexture();
		    gl.bindTexture(gl.TEXTURE_2D, texture);
		    if (!ss2d.Texture.isPowerOfTwo(image.width) || !ss2d.Texture.isPowerOfTwo(image.height)) 
		    {
		        // Scale up the texture to the next highest power of two dimensions.
		        var canvas = document.createElement("canvas");
		        canvas.width = this.mPOTWidth = ss2d.Texture.nextHighestPowerOfTwo(image.width);
		        canvas.height = this.mPOTHeight = ss2d.Texture.nextHighestPowerOfTwo(image.height);
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(image, 0, 0, image.width, image.height);
		        image = canvas;
		    }
		    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		    gl.generateMipmap(gl.TEXTURE_2D);
		    gl.bindTexture(gl.TEXTURE_2D, null);
		}
		catch (t)
		{
			console.log(t);
		}
		if(this.mCallbackFunction)
			this.mCallbackFunction.call(this.mCallbackTarget, this);
	};
}

/**
 * @return {number} the width of the texture in pixels
 */
ss2d.Texture.prototype.getWidth = function()
{ 
	return this.mTextureElement.width; 
};

/**
 * @return {number} the height of the texture in pixels
 */
ss2d.Texture.prototype.getHeight = function()
{ 
	return this.mTextureElement.height; 
};

ss2d.Texture.isPowerOfTwo = function(x) 
{
    return (x & (x - 1)) == 0;
};
 
ss2d.Texture.nextHighestPowerOfTwo = function(x) 
{
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x = x | x >> i;
    }
    return x + 1;
};
