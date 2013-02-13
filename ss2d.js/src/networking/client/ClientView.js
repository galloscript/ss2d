// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Client side main view class, setup canvas and make use of
 * ss2d.ClientCommunicationInterface to setup the WebScoket connection, 
 * send player input to server and process the response.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ClientView');

goog.require('ss2d.Input');
goog.require('ss2d.RenderSupport');
goog.require('ss2d.ClientCommunicationInterface');
goog.require('ss2d.WebAudio');

/**
 * @constructor
 * @param {Object} canvasId Id of the canvas element where the scene will be rendered
 * @param {number=} canvasWidth Canvas width in pixels, 800 by default.
 * @param {number=} canvasHeight Canvas height in pixels, 600 by default.
 * @param {number=} frameRate Frames to render per second, 60 by default.
 * @param {number=} inputRate Input updates to send to the server per second, 20 by default.
 * @param {number=} delay Latency in milliseconds
 */
ss2d.ClientView = function(canvasId, canvasWidth, canvasHeight, frameRate, inputRate, delay)
{
	this.mCanvas = document.getElementById(canvasId);
	this.mContext = this.mCanvas.getContext('2d'); 
	this.mRunning = false;
	this.mFrameRate = frameRate || 60.0;
	this.mInput = new ss2d.Input(this);
	this.mLastFrameTimestamp = new Date().getTime();
	
	this.mCanvas.width = canvasWidth || 800;
	this.mCanvas.height = canvasHeight || 600;
	
	ss2d.CURRENT_VIEW = this;
	ss2d.ClientView.CANVAS_CONTEXT = this.mContext;
	
	ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
	
	/** @type {ss2d.DisplayObject} */
	this.mMainScene = null;
	
	this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
	this.mBackgroundFillStyle = '#202020';
	
	this.mSceneQueue = []; //commands received by server
	
	this.mComunication = null;
	
	this.mDelay = delay || 100;
	this.mInputRate = inputRate || 20.0;
	window['wastedTimePerFrame'] = 0;
};

/** @type {Object} */
ss2d.ClientView.CANVAS_CONTEXT = null;

/** @type {function} */
ss2d.ClientView.NEXT_FRAME_CALLER = function(){ ss2d.CURRENT_VIEW.nextFrame() };

/** @type {function} */
ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER = function(){ ss2d.CURRENT_VIEW.nextInputUpdate() };

/**
 * Called every frame to update and render every object
 */
ss2d.ClientView.prototype.nextFrame = function()
{
	//get current time in miliseconds
	var now = new Date().getTime();
	var timePassed = now - this.mLastFrameTimestamp;

	//interpolate scene
	if(this.mSceneQueue.length > 1)
	{
		this.updateSceneState(now);
		
		//clean background
		this.mContext.fillStyle = this.mBackgroundFillStyle;  
		this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height); 
		
		//render scene
		if(this.mMainScene != null)
		{
			this.mMainScene.render(this.mRenderSupport);
		}
	}
	
	//update input
	this.mInput.tick(timePassed/1000.0);

	//calculate the delay time for the nextFrame call based on the 
	//frameRate and time spend in update and render operations.
	this.mLastFrameTimestamp = now;
	var wastedTime = (new Date().getTime() - now) / 1000.0;
	var nextFrameTime = Math.max(0.0, (1.0/this.mFrameRate) - wastedTime);
	
	//if game is running call the next frame with the specified time
	if(this.mRunning)
	{ 
		setTimeout(ss2d.ClientView.NEXT_FRAME_CALLER, nextFrameTime * 1000.0);
	}
};

/**
 * Called in an interval specified by the inputRate property seconds and sends the user input to the server
 */
ss2d.ClientView.prototype.nextInputUpdate = function()
{
	this.mComunication.packAndSendInput(this.mInput);
	if(this.mRunning)
	{ 
		setTimeout(ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER, (1.0/this.mInputRate)*1000.0);
	}
}

/**
 * Called by the nextFrame method to interpolate scene elements state.
 * @param {number} currentTime
 */
ss2d.ClientView.prototype.updateSceneState = function(currentTime)
{
    var renderTime = currentTime - this.mDelay;
    
    var prevStateIndex = -1;
    var nextStateIndex = -1;
    
    for(var i = 0; i < this.mSceneQueue.length && nextStateIndex == -1; i++)
    {
    	var stateTime = this.mSceneQueue[i][0];
    	var command = this.mSceneQueue[i][1];
		var state = command['STATE'];

		if(stateTime < renderTime)
   	 	{
   		 	prevStateIndex = i;
   		 
   		 	if(command['PLAYSOUNDS'] != null)
   		 	{
   			 	//play and remove unplayed sounds
   			 	//playSounds(command['PLAYSOUNDS']);
   			 	command['PLAYSOUNDS'] = null;
   			 	delete command['PLAYSOUNDS'];
   		 	}
   	 	}
   	 
   	 	if(stateTime >= renderTime)
   	 	{
   		 	nextStateIndex = i;
   	 	}
    }
    
    if(prevStateIndex != -1 && nextStateIndex != -1)
    {
    	//interpolate all previous states, then the current 
    	for(var istates = 0; istates < prevStateIndex; ++istates)
    	{
    		this.interpolateSeceneStates(istates, prevStateIndex, renderTime);
    	}
    	
    	this.interpolateSeceneStates(prevStateIndex, nextStateIndex, renderTime);
    }
    
    this.mSceneQueue.splice(0, prevStateIndex);
}

ss2d.ClientView.prototype.interpolateSeceneStates = function(prevStateIndex, nextStateIndex, renderTime)
{
	var prevStateTime = this.mSceneQueue[prevStateIndex][0];
	var nextStateTime = this.mSceneQueue[nextStateIndex][0];
	var fraction = (renderTime - prevStateTime) / (nextStateTime - prevStateTime); 
	
	if(this.mMainScene == null)
	{
		var sceneClass = ss2d.Object.getObjectPrototype(this.mSceneQueue[prevStateIndex][1]);
		this.mMainScene = sceneClass.createFromSerializedObject(this.mSceneQueue[prevStateIndex][1]);
		console.debug('main scene created');
	}
	
	this.mMainScene.interpolateState(this.mSceneQueue[prevStateIndex][1], this.mSceneQueue[nextStateIndex][1], fraction);
}

/**
 * Start the main loop if it's ready.
 */
ss2d.ClientView.prototype.startLoop = function()
{
	if(!this.mRunning && this.mComunication != null)
	{
		this.mRunning = true;
		this.nextFrame();
		this.nextInputUpdate();
	}	
};

/**
 * Pause the main loop
 */
ss2d.ClientView.prototype.stopLoop = function()
{
	this.mRunning = false;	
};

/**
 * Create a new ss2d.ClientCommunicationInterface connection.
 * @param {string} serverHost
 * @param {number} serverPort
 */
ss2d.ClientView.prototype.startConnection = function(serverHost, serverPort)
{
	this.mComunication = new ss2d.ClientCommunicationInterface(this, serverHost, serverPort);
};

/**
 * Called on client when is connected to the server. Implemented by user o
 * @param {WebSocket} connection
 */
ss2d.ClientView.prototype.onConnect = function(connection){};

/**
 * Called on client when is disconnected from the server
 * @param {WebSocket} connection
 */
ss2d.ClientView.prototype.onDisconnect = function(connection){};

/**
 * Called on client when receives a message
 * @param {string} commandName
 * @param {Object} commandParam
 * @param {WebSocket} connection
 */
ss2d.ClientView.prototype.onServerMessage = function(commandName, commandParam, connection){};

