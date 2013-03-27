// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Collection of ss2d.Reel objects.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelSet');

goog.require('ss2d.Reel');

/**
 * @constructor
 * @param {string} rsFileName
 */
ss2d.ReelSet = function(rsFileName, callbackFunction, callbackTarget)
{
	this.mName = rsFileName;
	this.mCallbackFunction = callbackFunction;
	this.mCallbackTarget = callbackTarget||null;
	this.mReelSetDescriptor = null;
	this.mReels = {};
	this.mTexture = null; 
	
	var rsFileRequest = new XMLHttpRequest();
	rsFileRequest.mReelSet = this;
	rsFileRequest.open("GET", rsFileName, true);
	rsFileRequest.responseType = "text";
	rsFileRequest.onload = function() 
	{
		this.mReelSet.reelSetLoaded(this.response);
	};
	
	rsFileRequest.send();
};

ss2d.ReelSet.prototype.reelSetLoaded = function(fileData)
{
	this.mReelSetDescriptor = JSON.parse(fileData);
	
	this.mReels = {};
	
	for(var reelName in this.mReelSetDescriptor['reels'])
	{
		
		var reelInfo = this.mReelSetDescriptor['reels'][reelName];
		var reel = new ss2d.Reel(reelName, reelInfo['duration']);
		var frames = reelInfo['frames'];
		
		for(var f = 0; f < frames.length; ++f)
		{
			var frameInfo = frames[f];
			//x, y, width, height, offsetX, offsetY
			reel.mFrames.push(new ss2d.ReelFrame(frameInfo[0],
												 frameInfo[1],
												 frameInfo[2],
												 frameInfo[3],
												 frameInfo[4],
												 frameInfo[5]));
		}
		
		this.mReels[reelName] = reel;
	}
	
	
	var pathEnd = this.mName.lastIndexOf('/') + 1;
	var img = this.mReelSetDescriptor['image'];
	var texturePath = (pathEnd > 0)?this.mName.substring(0, pathEnd)+img:img;
	
	this.mTexture = new ss2d.Texture(texturePath, this.mCallbackFunction, this.mCallbackTarget);
};


