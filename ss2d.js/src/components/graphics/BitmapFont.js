// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A texture atlas component for TexturePacker JSON (hash) output files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.BitmapFont');

goog.require('ss2d.Texture');
goog.require('XML.ObjTree');

/**
 * A Bitmap font component for Glyph Designer XML .fnt output files.
 * @see http://www.71squared.com/en/glyphdesigner
 * @constructor
 * @param {string} bitmapFilename The resource name
 * @param {function} callbackFunction Called when the BitmapFont is loaded
 * @param {Object} callbackTarget
 */
ss2d.BitmapFont = function(bitmapFilename, callbackFunction, callbackTarget)
{
	this.mName = bitmapFilename;
	this.mCallbackFunction = callbackFunction;
	this.mCallbackTarget = callbackTarget;
	this.mFontDescriptor = null;
	this.mTexture = null; 
	this.mMidWidth = 0;
	this.mMidHeight = 0;
	
	var fontFileRequest = new XMLHttpRequest();
	fontFileRequest.mBitmapFont = this;
	fontFileRequest.open("GET", bitmapFilename, true);
	fontFileRequest.responseType = "text";
	fontFileRequest.onload = function() 
	{
		this.mBitmapFont.fontFileLoaded(this.response);
	};
	
	fontFileRequest.send();
};

/**
 * @private
 * @param {string} fileData
 */
ss2d.BitmapFont.prototype.fontFileLoaded = function(fileData)
{
	this.mFontDescriptor = (new XML.ObjTree()).parseXML(fileData);
	/** @type {Array} */
	var charArray = this.mFontDescriptor['font']['chars']['char'];
	var totalWidths = 0;
	var totalHeights = 0;
	var indexedChars = {};
	for(var c = 0; c < charArray.length; ++c)
	{
		var charObj = charArray[c];
		totalWidths += parseInt(charObj['-xadvance']);
		totalHeights += parseInt(charObj['-height']);
		indexedChars[charArray[c]['-id']] = charObj;
		
		charObj['-x'] = parseInt(charObj['-x']);
		charObj['-xoffset'] = parseInt(charObj['-xoffset']);
		charObj['-y'] = parseInt(charObj['-y']);
		charObj['-width'] = parseInt(charObj['-width']);
		charObj['-height'] = parseInt(charObj['-height']);
		charObj['-xadvance'] = parseInt(charObj['-xadvance']);
		charObj['-yoffset'] = parseInt(charObj['-yoffset']);
	}
	this.mFontDescriptor.mIndexedChars = indexedChars;
	this.mMidWidth = totalWidths / charArray.length;
	this.mMidHeight = totalHeights / charArray.length;
	
	var texturePageList = this.mFontDescriptor['font']['pages']['page'];
	var texturePage = null;
	if(texturePage instanceof Array)
	{
		texturePage = texturePageList[0]['-file'];
	}
	else
	{
		texturePage = texturePageList['-file'];
	}
	
	var pathEnd = this.mName.lastIndexOf('/') + 1;
	texturePage = (pathEnd > 0)?this.mName.substring(0, pathEnd)+texturePage:texturePage;
	
	this.mTexture = new ss2d.Texture(texturePage, this.fontTextureLoaded, this);
};

/**
 * Called once the texture atlas is loaded
 */
ss2d.BitmapFont.prototype.fontTextureLoaded = function(texture)
{
	this.mTexture = texture;
	if(this.mCallbackFunction)
		this.mCallbackFunction.call(this.mCallbackTarget, this);
}

/** 
 * Retrieve the clip frame information for a given character
 * @param {number|string} charCode
 * @param {number[4]=} targetClipArray Optional array where the clipping information will be copied
 * @return {number[4]} The clip array
 */
ss2d.BitmapFont.prototype.getGlyphClip = function(charCode, targetClipArray)
{
	targetClipArray = targetClipArray||[];
	
	var charDesc = this.mFontDescriptor.mIndexedChars[charCode];
	
	if(charDesc)
	{
		targetClipArray[0] = charDesc['-x'];
		targetClipArray[1] = charDesc['-y'];
		targetClipArray[2] = charDesc['-width'];
		targetClipArray[3] = charDesc['-height'];
		targetClipArray[4] = charDesc['-xadvance'];
		targetClipArray[5] = charDesc['-yoffset'];
	}
	
	return targetClipArray;
};
