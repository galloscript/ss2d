// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A texture atlas component for TexturePacker JSON (hash) output files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.TextureAtlas');

goog.require('ss2d.Texture');

/**
 * A texture atlas component for TexturePacker JSON (hash) output files.
 * @see http://www.codeandweb.com/texturepacker
 * @constructor
 * @param {string} atlasJSONFileName The resource name
 * @param {function} callbackFunction Called when the textureAtlas is loaded
 */
ss2d.TextureAtlas = function(atlasJSONFileName, callbackFunction)
{
	this.mName = atlasJSONFileName;
	this.mCallbackFunction = callbackFunction;
	this.mAtlasDescriptor = null;
	this.mTexture = null; 
	
	var atlasFileRequest = new XMLHttpRequest();
	atlasFileRequest.mAtlas = this;
	atlasFileRequest.open("GET", atlasJSONFileName, true);
	atlasFileRequest.responseType = "text";
	atlasFileRequest.onload = function() 
	{
		this.mAtlas.atlasFileLoaded(this.response);
	};
	
	atlasFileRequest.send();
};

/**
 * @private
 * @param {string} fileData
 */
ss2d.TextureAtlas.prototype.atlasFileLoaded = function(fileData)
{
	this.mAtlasDescriptor = JSON.parse(fileData);
	
	var pathEnd = this.mName.lastIndexOf('/') + 1;
	var img = this.mAtlasDescriptor['meta']['image'];
	var texturePath = (pathEnd > 0)?this.mName.substring(0, pathEnd)+img:img;
	
	this.mTexture = new ss2d.Texture(texturePath, this.mCallbackFunction);
};


/** 
 * Retrieve the clip frame information for a given frame name.
 * @param {string} frameName
 * @param {number[4]=} targetClipArray Optional array where the clipping information will be copied
 * @return {number[4]} The clip array
 */
ss2d.TextureAtlas.prototype.getClipFor = function(frameName, targetClipArray)
{
	targetClipArray = targetClipArray||[];
	
	var frame = this.mAtlasDescriptor['frames'][frameName]['frame'];
	
	if(frame)
	{
		targetClipArray[0] = frame['x'];
		targetClipArray[1] = frame['y'];
		targetClipArray[2] = frame['w'];
		targetClipArray[3] = frame['h'];
	}
	
	return targetClipArray;
};