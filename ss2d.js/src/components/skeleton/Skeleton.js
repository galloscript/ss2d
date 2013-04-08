// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine skeleton descriptor.
 * @see http://esotericsoftware.com/spine-json-format/
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Skeleton');

/**
 * @constructor
 * @param {string} skeletonFileName
 */
ss2d.Skeleton = function(skeletonFileName, callbackFunction, callbackTarget)
{
	this.mName = skeletonFileName;
	this.mCallbackFunction = callbackFunction;
	this.mCallbackTarget = callbackTarget||null;
	this.mIncludeAnimations = false;
	var sklFileRequest = new XMLHttpRequest();
	sklFileRequest.mSkeleton = this;
	sklFileRequest.open("GET", skeletonFileName, true);
	sklFileRequest.responseType = "text";
	sklFileRequest.onload = function() 
	{
		this.mSkeleton.skeletonDataLoaded(this.response);
	};
	
	sklFileRequest.send();
};

ss2d.Skeleton.prototype.skeletonDataLoaded = function(data)
{
	this.mSkeletonData = JSON.parse(data);
	ss2d.Skeleton.allDegToRad(this.mSkeletonData);
	
	if(this.mSkeletonData['animations'])
		this.mIncludeAnimations = true;
		
	if(this.mCallbackFunction)
		this.mCallbackFunction.call(this.mCallbackTarget, this);
};

ss2d.Skeleton.allDegToRad = function(jsonObject)
{
	var deg2Rad = 1 / (180/Math.PI);
	for(var key in jsonObject)
	{
		if(key == 'rotation' || key == 'angle')
		{
			if(jsonObject[key] > 180)
			{
				jsonObject[key] -= 360;
			}
			else if(jsonObject[key] < -180)
			{
				jsonObject[key] += 360;
			}
			
			jsonObject[key] = (jsonObject[key]*deg2Rad);
		}
		else if(key == 'y')
		{
			jsonObject[key] *= -1;
		}
		else if(typeof jsonObject[key] == 'object' && key != 'scale')
		{
			ss2d.Skeleton.allDegToRad(jsonObject[key]);
		}
	}
};

