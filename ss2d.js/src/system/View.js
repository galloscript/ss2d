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
 * @property {CanvasRenderingContext2d|WebGLRenderginContext} mContext Canvas context
 * @property {number[16]} mProjection Orthogonal projection matrix
 * @property {boolean} mRunning Is main loop running?
 * @property {number} mFrameRate Frames per second (60 by default)
 * @property {ss2d.Input} mInput Mapped user input
 * @property {ss2d.DisplayObjectContainer} mMainScene Scene that is being rendering
 * @property {ss2d.RenderSupport} mRenderSupport Rendering support
 * @property {string} mBackgroundFillStyle Background fill style mapped to Context fillstyle
 * @property {ss2d.PhysicalWorld} mPhysicalWorld A box2d physical world
 * @property {Array} mPreTickFunctions Functions called every frame before the main scene tick method.
 * @property {Array} mPostTickFunctions Functions called every frame after the main scene tick method.
 * @property {Array} mPreRenderFunctions Functions called every frame before the main scene render method.
 * @property {Array} mPostRenderFunctions Functions called every frame after the main scene render method.
 * @property {number} mTotalTime Time passed since the view loop starts.
 */
ss2d.View = function(canvasId, mainScene, canvasWidth, canvasHeight, frameRate)
{
	this.mCanvas = document.getElementById(canvasId);
	
	if(RENDER_CONTEXT == 'webgl')
	{
		this.mContext = this.mCanvas.getContext('webgl', { alpha: false })||this.mCanvas.getContext('experimental-webgl', { alpha: false });
		this.mProjection = ss2d.RenderSupport.make2DProjection(this.mCanvas.width, this.mCanvas.height);
		this.mClearColor = [0.8, 0.8, 0.8, 1.0];
	}
	else
	{
		this.mContext = this.mCanvas.getContext('2d'); 
		this.mBackgroundFillStyle = '#cccccc';
	}
	
	if(!this.mContext)
	{
		throw 'Incompatible render context: '+RENDER_CONTEXT;
	}

	ss2d.CURRENT_VIEW = this;
	
	this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
	
	this.mRunning = false;
	this.mFrameRate = frameRate || 60.0;
	this.mInput = new ss2d.Input(this);
	
	this.mLastFrameTimestamp = new Date().getTime();

	this.mCanvas.width = canvasWidth || this.mCanvas.width;
	this.mCanvas.height = canvasHeight || this.mCanvas.height;
	
	ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();

	this.mMainScene = mainScene || new ss2d.DisplayObjectContainer();
	
	this.mPhysicalWorld = ss2d.PhysicalWorld.getWorld();
	
	//plug-in development
	this.mPreTickFunctions = [];
	this.mPostTickFunctions = [];
	this.mPreRenderFunctions = [];
	this.mPostRenderFunctions = [];
	
	this.mTotalTime = 0;
};

/** @type {function} */
ss2d.View.NEXT_FRAME_CALLER = function(){ ss2d.CURRENT_VIEW.nextFrame() };

/**
 * Called every frame to update and render every object
 */
ss2d.View.prototype.nextFrame = function()
{
	//get current time in miliseconds
	var now = new Date().getTime();
	var timePassed = Math.min(now - this.mLastFrameTimestamp, 1200.0/this.mFrameRate);
	
	//called with canvas width and height every frame
	this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
	
	for(var methodIndex in this.mPreRenderFunctions)
	{ 
		this.mPreRenderFunctions[methodIndex].call(null, this.mRenderSupport); 
	}
	
	this.render();
	
	for(var methodIndex in this.mPostRenderFunctions)
	{ 
		this.mPostRenderFunctions[methodIndex].call(null, this.mRenderSupport); 
	}
	
	//update physics
	var worldUpdates = Math.floor(Math.max(1, timePassed/(1000.0/ss2d.PhysicalWorld.UPDATE_RATE)));
	for(var i = 0; i < worldUpdates; ++i)
	{
		this.mPhysicalWorld.tick((timePassed/worldUpdates)/1000.0);
	}
	
	var timePassedInSeconds = timePassed / 1000.0;
	
	this.mRealFPS = Math.floor(100.0 / timePassedInSeconds)*0.01;
	this.mTotalTime += timePassedInSeconds;
	
	//update input
	this.mInput.tick(timePassedInSeconds);
	
	for(var methodIndex in this.mPreTickFunctions)
	{ 
		this.mPreTickFunctions[methodIndex].call(null, timePassedInSeconds); 
	}
	
	//update scene
	this.mMainScene.tick(timePassedInSeconds);

	for(var methodIndex in this.mPostTickFunctions)
	{ 
		this.mPostTickFunctions[methodIndex].call(null, timePassedInSeconds); 
	}
	


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

/**
 * Called every frame by nextFrame method to render the scene in the proper context.
 */
ss2d.View.prototype.render = function(){};

if(RENDER_CONTEXT == 'webgl')
{
	ss2d.View.prototype.render = function()
	{	
		var gl = this.mContext;
		gl.viewport(0, 0, this.mCanvas.width, this.mCanvas.height);
		var cc = this.mClearColor;
		gl.clearColor(cc[0], cc[1], cc[2], cc[3]);
		gl.clear(gl.COLOR_BUFFER_BIT);
		
		//render scene
		this.mMainScene.render(this.mRenderSupport);
	}
}
else
{
	ss2d.View.prototype.render = function()
	{
		//clean background
		this.mContext.fillStyle = this.mBackgroundFillStyle;  
		this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height); 

		//render scene
		this.mMainScene.render(this.mRenderSupport);
	};
}

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
 * A callback function that receives canvas width and height every frame.
 * Implemented by the user
 * @param {Object} cw canvas width
 * @param {Object} ch canvas height
 */
ss2d.View.prototype.resizeCanvas = function(cw, ch){};

if(RENDER_CONTEXT == 'webgl')
{
	ss2d.View.prototype.resizeCanvas = function(cw, ch)
	{
		this.mProjection = ss2d.RenderSupport.make2DProjection(this.mCanvas.width, this.mCanvas.height, this.mProjection);
	};
}
