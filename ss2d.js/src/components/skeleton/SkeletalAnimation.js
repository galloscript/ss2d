// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine SkeletalAnimation descriptor.
 * @see http://esotericsoftware.com/spine-json-format/
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.SkeletalAnimation');

goog.require('ss2d.Skeleton');

/**
 * @constructor
 * @param {string} SkeletalAnimationFileName
 */
ss2d.SkeletalAnimation = function(animationFileName, callbackFunction, callbackTarget)
{
	this.mName = animationFileName;
	this.mCallbackFunction = callbackFunction;
	this.mCallbackTarget = callbackTarget||null;
	
	var animFileRequest = new XMLHttpRequest();
	animFileRequest.mSkeletalAnimation = this;
	animFileRequest.open("GET", animationFileName, true);
	animFileRequest.responseType = "text";
	animFileRequest.onload = function() 
	{
		this.mSkeletalAnimation.animationDataLoaded(this.response);
	};
	
	animFileRequest.send();
};

ss2d.SkeletalAnimation.prototype.animationDataLoaded = function(data)
{
	this.mAnimationData = JSON.parse(data);
	this.mCallbackFunction.call(this.mCallbackTarget, this);
	
	ss2d.Skeleton.allDegToRad(this.mAnimationData);
};

