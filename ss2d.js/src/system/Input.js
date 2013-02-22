// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A cross-browser Input class. Reads input from everywhere.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */


goog.provide('ss2d.Input');

/**
 * @param {ss2d.View} view
 * @constructor
 * @implements {EventHandler} 
 * @property {number} mMouseX Mouse location in x axis
 * @property {number} mMouseY Mouse location in y axis
 * @property {number} mPreviousMouseX Last frame mouse location in x axis
 * @property {number} mPreviousMouseY Last frame mouse location in y axis
 * @property {ss2d.Point} mMousePoint Mouse location point
 * @property {ss2d.Point} mPreviousMousePoint Last frame mouse location point
 * @property {boolean} mMouseDown Is mouse left button down?
 * @property {boolean} mPreviousMouseDown Was mouse left button down last frame?
 */
ss2d.Input = function(view)
{
	this.mView = view;
	var canvas = view.mCanvas;
	canvas.style.outline = 'none';
	this.mView.mHaveFocus = true;
	this.mMobileDevice = false;
	if((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||  (navigator.userAgent.match(/iPad/i)))
	{
		this.mMobileDevice = true;
   	}
	
	
   	if(!this.mMobileDevice){
   		if (window.navigator.msPointerEnabled) { // WIN8
   			//Gorkinovich contribution: Windows 8 Touchscreen
   			window.addEventListener("MSPointerDown", ss2d.Input.windowMouseEventHandler, true);
		} 
		else 
		{
			window.addEventListener('mousedown', ss2d.Input.windowMouseEventHandler, true);
		}
   	}
   	window.addEventListener('keydown', ss2d.Input.handleEventCaller, true);
	window.addEventListener('keyup', ss2d.Input.handleEventCaller, true);
   	
   	if (window.navigator.msPointerEnabled) { // WIN8
   		a.addEventListener("MSPointerDown", ss2d.Input.handleEventCaller, true);
		a.addEventListener("MSPointerUp", ss2d.Input.handleEventCaller, true);
		a.addEventListener("MSPointerMove", ss2d.Input.handleEventCaller, true);
   	} 
   	else
   	{
   		canvas.addEventListener('mousedown', ss2d.Input.handleEventCaller, true);
		canvas.addEventListener('mouseup', ss2d.Input.handleEventCaller, true);
		canvas.addEventListener('mousemove', ss2d.Input.handleEventCaller, true);
   	}


	canvas.addEventListener("touchstart", ss2d.Input.handleEventCaller, false);
	canvas.addEventListener("touchend", ss2d.Input.handleEventCaller, false);
	canvas.addEventListener("touchcancel", ss2d.Input.handleEventCaller, false);
	canvas.addEventListener("touchleave", ss2d.Input.handleEventCaller, false);

	this.mPressedKeys = {};
	this.mMouseX = -50;
	this.mMouseY = -50;
	this.mPreviousMouseX = 0;
	this.mPreviousMouseY = 0;
	this.mMouseDown = false;
	this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
	this.mPreviousMousePoint = new ss2d.Point(this.mPreviousMouseX, this.mPreviousMouseY);
	this.mPreviousMouseDown = false;
	this.mClicked = false;
}

//keyboard keys
ss2d.Input.Keys = {};
ss2d.Input.Keys.TAB = 9;
ss2d.Input.Keys.SHIFT = 16;
ss2d.Input.Keys.CTRL = 17;
ss2d.Input.Keys.ALT = 18;
ss2d.Input.Keys.SPACE = 32;
ss2d.Input.Keys.ARROW_LEFT = 37;
ss2d.Input.Keys.ARROW_UP = 38;
ss2d.Input.Keys.ARROW_RIGHT = 39;
ss2d.Input.Keys.ARROW_DOWN = 40;
ss2d.Input.Keys.A = 65;
ss2d.Input.Keys.B = 66;
ss2d.Input.Keys.C = 67;
ss2d.Input.Keys.D = 68;
ss2d.Input.Keys.E = 69;
ss2d.Input.Keys.F = 70;
ss2d.Input.Keys.G = 71;
ss2d.Input.Keys.H = 72;
ss2d.Input.Keys.I = 73;
ss2d.Input.Keys.J = 74;
ss2d.Input.Keys.K = 75;
ss2d.Input.Keys.L = 76;
ss2d.Input.Keys.M = 77;
ss2d.Input.Keys.N = 78;
ss2d.Input.Keys.O = 79;
ss2d.Input.Keys.P = 80;
ss2d.Input.Keys.Q = 81;
ss2d.Input.Keys.R = 82;
ss2d.Input.Keys.S = 83;
ss2d.Input.Keys.T = 84;
ss2d.Input.Keys.U = 85;
ss2d.Input.Keys.V = 86;
ss2d.Input.Keys.W = 87;
ss2d.Input.Keys.X = 88;
ss2d.Input.Keys.Y = 89;
ss2d.Input.Keys.Z = 90;

ss2d.Input.prototype.tick = function()
{
	this.mPreviousMouseX = this.mMouseX;
	this.mPreviousMouseY = this.mMouseY;
	this.mPreviousMousePoint.mX = this.mPreviousMouseX;
	this.mPreviousMousePoint.mY = this.mPreviousMouseY;
	this.mPreviousMouseDown = this.mMouseDown;
	this.mMouseDown = this.mClicked;	
}

//catch all events
ss2d.Input.handleEventCaller = function(e)
{ 
	ss2d.CURRENT_VIEW.mInput.handleEvent(e); 
}

//catch mobile events
ss2d.Input.windowMouseEventHandler = function(e)
{
	var input = ss2d.CURRENT_VIEW.mInput;
	if(input.mView.mHaveFocus)
	{
		input.onFocusOut();
	}
}

/** @override */
ss2d.Input.prototype.handleEvent = function(event)
{
	var r = true;
	switch(event.type){
	case 'mousedown': case 'touchstart': case "MSPointerDown": r = this.onMouseDown(event); break;
	case 'mouseup': case 'touchend': case 'touchcancel': case "MSPointerUp": r = this.onMouseUp(event); break;
	case 'keydown': r = this.onKeyDown(event); break;
	case 'keyup': r = this.onKeyUp(event); break;
	case 'mousemove': case 'touchmove':  case "MSPointerMove": r = this.onMouseMove(event); break;
	}

	return r;
}

ss2d.Input.prototype.onMouseDown = function(pe)
{	
	var event = this.mMobileDevice ? window.event.targetTouches[ 0 ] : pe;
	
	this.mMouseX = event.offsetX || event.pageX - this.mView.mCanvas.offsetLeft;
	this.mMouseY = event.offsetY || event.pageY - this.mView.mCanvas.offsetTop;
	this.mMousePoint.mX = this.mMouseX;
	this.mMousePoint.mY = this.mMouseY;

	if((this.mMobileDevice && event) || !this.mMobileDevice){
		this.onFocusIn();
		this.mClicked = true;
		pe.preventDefault();
		pe.stopPropagation();
		this.mView.mCanvas.addEventListener("touchmove", ss2d.Input.handleEventCaller, false);
	}
	
	return false;
}

ss2d.Input.prototype.onMouseUp = function(pe)
{
	var event = this.mMobileDevice ? window.event.targetTouches[ 0 ] : pe;
	if((this.mMobileDevice && !event) || !this.mMobileDevice){
		this.mMouseDown = false;
		this.mClicked = false;
		pe.preventDefault();
		pe.stopPropagation();
		this.mView.mCanvas.removeEventListener("touchmove", ss2d.Input.handleEventCaller, false);
	}
	return false;
}

ss2d.Input.prototype.onKeyDown = function(event)
{
	if(this.mView.mHaveFocus)
	{ 
		this.mPressedKeys['_'+parseInt(event.keyCode)] = true;
		if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 32)
		{
			event.preventDefault();	
		}
		return false;
	}
	return true;
}

ss2d.Input.prototype.onKeyUp = function(event)
{
	if(this.mView.mHaveFocus)
	{ 
		this.mPressedKeys['_'+parseInt(event.keyCode)] = false;
		delete this.mPressedKeys['_'+parseInt(event.keyCode)];
		return false;
	}
	return true;
}

ss2d.Input.prototype.onFocusIn = function(event)
{
	this.mView.mHaveFocus = true;
}

ss2d.Input.prototype.onFocusOut = function(event)
{
	this.mView.mHaveFocus = false;
	this.mClicked = false;
	//this.mPressedKeys = [];
}

ss2d.Input.prototype.onMouseMove = function(pe)
{
	var event = this.mMobileDevice ? window.event.targetTouches[0] : pe;
	if(event){
		this.mMouseX = event.offsetX || event.pageX - this.mView.mCanvas.offsetLeft;
		this.mMouseY = event.offsetY || event.pageY - this.mView.mCanvas.offsetTop;
		this.mMousePoint.mX = this.mMouseX;
		this.mMousePoint.mY = this.mMouseY;
	}
}

ss2d.Input.prototype.isKeyPressed = function(keycode)
{
	return (this.mPressedKeys['_'+keycode] != null)?true:false;
};


ss2d.Input.prototype.toJSON = function()
{
	var str = '{';
	str += '"keys":'+JSON.stringify(this.mPressedKeys)+',';
	str += '"mx":'+this.mMouseX+',';
	str += '"my":'+this.mMouseY+',';
	str += '"md":'+this.mMouseDown;
	return str+'}';
}

