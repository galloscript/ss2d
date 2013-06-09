// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview ss2d.IAudioComponent implementation that implements audio play back using
 * the WebAudio API only available in webkit at this point.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.WebAudio');

goog.require('ss2d.IAudioComponent');

/**
 * @constructor
 * @implements {ss2d.IAudioComponent}
 * @inheritDoc
 */
ss2d.WebAudio = function(soundFile, callbackFunction)
{
	if(!soundFile) return; //file is optional cause it can simply be a buffer
	
	//for resource loading info
	this.mName = soundFile;
	this.mCallbackFunction = callbackFunction || function(){};
	this.mSoundSources = [];
	this.mSoundBuffer = null;
	this.mLastSource = null;
	this.mPausedSource = null;
	
	var audioFileRequest = new XMLHttpRequest();
	audioFileRequest.mSound = this;
	audioFileRequest.open("GET", soundFile, true);
	audioFileRequest.responseType = "arraybuffer";
	audioFileRequest.onload = function() 
	{
	    this.mSound.mSoundBuffer = ss2d.AUDIO_CONTEXT.createBuffer(this.response, false);
	    this.mSound.mCallbackFunction(this.mSound);
	};
	
	audioFileRequest.send();
};

/** @inheritDoc */
ss2d.WebAudio.prototype.play = function()
{
	
	var source = this.mPausedSource || ss2d.AUDIO_CONTEXT.createBufferSource();
	this.mPausedSource = null;
    source.buffer = this.mSoundBuffer;
    source.connect(ss2d.AUDIO_CONTEXT.destination);
    
    source.noteOn(0);
	
	this.mLastSource = source;
	
	//return the source to let the user control it
	return source;
};

/** @inheritDoc */
ss2d.WebAudio.prototype.pause = function()
{ 
	if(this.mLastSource)
	{ 
		this.mLastSource.noteOff(0); 
		this.mPausedSource = this.mLastSource; 
	}
}; 

/** @inheritDoc */
ss2d.WebAudio.prototype.stop = function()
{
	 if(this.mLastSource)
	 { 
	 	this.mLastSource.noteOff(0); 
	 	this.mLastSource.disconnect(); 
	 	this.mLastSource = null;
	 } 
};

/**
 * @static
 * @return {AudioContext|webkitAudioContext} Return the WebAudio API context
 */
ss2d.WebAudio.getAudioContext = function()
{
	//there can be only one audio context per page
	if(ss2d.AUDIO_CONTEXT)
	{
		return ss2d.AUDIO_CONTEXT; 
	}
	else
	{
		if (typeof AudioContext !== 'undefined') 
		{
		    return new AudioContext();
		} 
		else if (typeof webkitAudioContext !== 'undefined') 
		{
		    return new webkitAudioContext();
		} 
		else 
		{
		    console.log('AudioContext not supported');
		    return null;
		}
	}
};