// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview ss2d.IAudioComponent implementation that implements audio play back using
 * the standard HTML5 Audio element.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.HTML5Audio');

goog.require('ss2d.IAudioComponent');

/**
 * @constructor
 * @implements {ss2d.IAudioComponent}
 * @inheritDoc
 */
ss2d.HTML5Audio = function(soundFile, callbackFunction)
{
	//resource loading info
	this.mName = soundFile;
	this.mAudioElement = new Audio();
	this.mAudioElement.mSound = this;
	this.mAudioElement.preload = true;
	this.mAudioElement.mCallbackFunction = callbackFunction || function(){};
	
	if(callbackFunction)
	{
		this.mAudioElement.addEventListener('canplay', function(){ this.mCallbackFunction.call(null, this.mSound); });
	}
	else
	{
		//this.mAudioElement.addEventListener('canplay', function(){ this.mSound.handleLoadedSound(); });
	}
	
	this.mAudioElement.addEventListener('ended', function(){ this.mSound.stop(); });
	
	this.mAudioElement.src = soundFile;
}

/** @inheritDoc */
ss2d.HTML5Audio.prototype.play = function()
{ 
	//this.mAudioElement.src = this.mName;
	this.mAudioElement.play(); 
	return this;
};

/** @inheritDoc */
ss2d.HTML5Audio.prototype.pause = function()
{ 
	this.mAudioElement.pause(); 
};

/** @inheritDoc */
ss2d.HTML5Audio.prototype.stop = function()
{ 
	this.mAudioElement.pause(); 
	this.mAudioElement.currentTime = 0;
};