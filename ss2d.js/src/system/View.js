// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Main view class
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.View');


goog.require('ss2d.Input');
goog.require('ss2d.RenderSupport');
goog.require('ss2d.WebAudio');
goog.require('ss2d.DisplayObjectContainer');
goog.require('ss2d.PhysicalWorld');

/**
 * @constructor
 * @param {string} canvasId
 * @param {ss2d.DisplayObject=} mainScene
 * @param {number=} canvasWidth
 * @param {number=} canvasHeight
 * @param {number=} frameRate Frames per second, 60.0 by default
 * @property {HTMLCanvasElement} mCanvas Canvas HTML Canvas element
 * @property {CanvasRenderingContext2d} mContext Canvas context
 * @property {boolean} mRunning Is main loop running?
 * @property {number} mFrameRate Frames per second (60 by default)
 * @property {ss2d.Input} mInput Mapped user input
 * @property {ss2d.DisplayObjectContainer} mMainScene Scene that is being rendering
 * @property {ss2d.RenderSupport} mRenderSupport Rendering support
 * @property {string} mBackgroundFillStyle Background fill style mapped to Context fillstyle
 * @property {ss2d.PhysicalWorld} mPhysicalWorld A box2d physical world
 */
ss2d.View = function(canvasId, mainScene, canvasWidth, canvasHeight, frameRate)
{
	this.mCanvas = document.getElementById(canvasId);
	this.mContext = this.mCanvas.getContext('2d'); 
	this.mRunning = false;
	this.mFrameRate = frameRate || 60.0;
	this.mInput = new ss2d.Input(this);
	
	this.mLastFrameTimestamp = new Date().getTime();
	
	ss2d.CURRENT_VIEW = this;
	ss2d.View.CANVAS_CONTEXT = this.mContext;
	
	this.mCanvas.width = canvasWidth || this.mCanvas.width;
	this.mCanvas.height = canvasHeight || this.mCanvas.height;
	
	ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();

	this.mMainScene = mainScene || new ss2d.DisplayObjectContainer();
	this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
	
	this.mBackgroundFillStyle = '#202020';
	
	this.mPhysicalWorld = ss2d.PhysicalWorld.getWorld();
};

/** @type {Object} */
ss2d.View.CANVAS_CONTEXT = null;

/** @type {function} */
ss2d.View.NEXT_FRAME_CALLER = function(){ ss2d.CURRENT_VIEW.nextFrame() };

/**
 * Called every frame to update and render every object
 */
ss2d.View.prototype.nextFrame = function()
{
	//get current time in miliseconds
	var now = new Date().getTime();
	var timePassed = now - this.mLastFrameTimestamp;
	
	//called with canvas width and height every frame
	this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
	
	//update scene
	this.mMainScene.tick(timePassed/1000.0);
	
	//update input
	this.mInput.tick(timePassed/1000.0);
	
	//update physics
	var worldUpdates = Math.floor(Math.max(1, timePassed/(1000.0/ss2d.PhysicalWorld.UPDATE_RATE)));
	for(var i = 0; i < worldUpdates; ++i)
	{
		this.mPhysicalWorld.tick((timePassed/worldUpdates)/1000.0);
	}
	
	//clean background
	this.mContext.fillStyle = this.mBackgroundFillStyle;  
	this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height); 
	
	//render scene
	this.mMainScene.render(this.mRenderSupport);
	
	//calculate the delay time for the nextFrame call based on the 
	//frameRate and time spend in update and render operations.
	this.mLastFrameTimestamp = now;
	var wastedTime = (new Date().getTime() - now) / 1000.0;
	var nextFrameTime = Math.max(0.0, (1.0/this.mFrameRate) - wastedTime);
	
	
	//if game is running call the next frame with the specified time
	if(this.mRunning)
	{ 
		setTimeout(ss2d.View.NEXT_FRAME_CALLER, nextFrameTime * 1000.0);
	}
};

//start the main loop if it's ready.
ss2d.View.prototype.startLoop = function()
{
	if(!this.mRunning && this.mMainScene != null)
	{
		this.mRunning = true;
		this.nextFrame();
	}	
};

/**
 * Start the main loop if it's ready.
 */
ss2d.View.prototype.stopLoop = function()
{
	this.mRunning = false;	
};

/**
 * A callback function to resize the canvas. Receives canvas width and height every frame.
 * Implemented by the user
 * @param {Object} cw canvas width
 * @param {Object} ch canvas height
 */
ss2d.View.prototype.resizeCanvas = function(cw, ch){};
