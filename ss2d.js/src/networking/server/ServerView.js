// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Server side Main view
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ServerView');

goog.require('ss2d.ServerCommunicationInterface');
goog.require('ss2d.PhysicalWorld');

/**
 * @constructor
 * @param {ss2d.MultiplayerScene=} mainScene
 * @param {number=} serverPort
 * @param {number=} updateRate Number of world states per second that will be updated and broadcasted to all clients.
 */
ss2d.ServerView = function(mainScene, serverPort, updateRate)
{
	this.mRunning = false;
	this.mFrameRate = updateRate || 20.0;
	this.mLastFrameTimestamp = new Date().getTime();
	
	ss2d.CURRENT_VIEW = this;
	
	this.mMainScene = mainScene || new ss2d.DisplayObjectContainer();
	this.mMainScene.mParentView = this;
	
	this.mComunication = new ss2d.ServerCommunicationInterface(this, serverPort);
	
	//sounds that must be send to the client on the next command list, once sent, the sound list is empty
	this.mSoundList = [];
	//this.mDeletedObjectList = [];
	
	this.mPhysicalWorld = ss2d.PhysicalWorld.getWorld();
};

/** @type {function} */
ss2d.ServerView.NEXT_FRAME_CALLER = function(){ ss2d.CURRENT_VIEW.nextFrame() };

/**
 * Called every frame to update the scene elements state and broadcast scene to clients.
 */
ss2d.ServerView.prototype.nextFrame = function()
{
	//get current time in miliseconds
	var now = new Date().getTime();
	var timePassed = now - this.mLastFrameTimestamp;
	
	//update scene
	this.mMainScene.tick(timePassed/1000.0);
	
	//update physics
	var worldUpdates = Math.floor(Math.max(1, timePassed/(1000.0/this.mFrameRate)));
	for(var i = 0; i < worldUpdates; ++i)
	{
		this.mPhysicalWorld.tick((timePassed/worldUpdates)/1000.0);
	}
	
	//calculate the delay time for the nextFrame call based on the 
	//frameRate and time spend in update and render operations.
	this.mLastFrameTimestamp = now;
	var wastedTime = (new Date().getTime() - now) / 1000.0;
	var nextFrameTime = (1.0/this.mFrameRate) - wastedTime;
	
	//if game is running call the next frame with the specified time
	if(this.mRunning)
	{ 
		setTimeout(ss2d.ServerView.NEXT_FRAME_CALLER, nextFrameTime * 1000.0);
	}
};

/**
 * Start the main loop if it's ready.
 */
ss2d.ServerView.prototype.startLoop = function()
{
	if(!this.mRunning && this.mMainScene != null)
	{
		this.mRunning = true;
		this.nextFrame();
	}	
};

/**
 * Pause the loop
 */
ss2d.ServerView.prototype.stopLoop = function()
{
	this.mRunning = false;	
};

