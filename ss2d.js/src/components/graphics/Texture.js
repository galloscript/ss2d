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
	this.mCallbackFunction.call(this.mCallbackTarget, this); 
};

if(RENDER_CONTEXT == 'webgl')
{
	ss2d.Texture.prototype.handleLoadedTexture = function(textureElement)
	{
		try
		{
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
			gl.bindTexture(gl.TEXTURE_2D, null);	
		}
		catch (t)
		{
			console.log(t);
		}
		
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
