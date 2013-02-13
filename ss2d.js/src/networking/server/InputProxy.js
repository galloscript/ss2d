// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Server side input representation for each user connected to the server.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.InputProxy');

/** @constructor */
ss2d.InputProxy = function()
{
	this.mPressedKeys = {};
	this.mMouseX = -50;
	this.mMouseY = -50;
	this.mPrevMouseX = 0;
	this.mPrevMouseY = 0;
	this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
	this.mPrevMousePoint = new ss2d.Point(this.mPrevMouseX, this.mPrevMouseY);
	this.mMouseDown = false;
	this.mPreviousMouseDown = false;
};

/**
 * @param {Object} clientProxy Input received from the client
 */
ss2d.InputProxy.prototype.updateFromClient = function(clientProxy)
{
	this.mPrevMouseX = this.mMouseX;
	this.mPrevMouseY = this.mMouseY;
	this.mPrevMousePoint.mX = this.mPrevMouseX;
	this.mPrevMousePoint.mY = this.mPrevMouseY;
	this.mPreviousMouseDown = this.mMouseDown;
	this.mMouseDown = this.mClicked;
	
	this.mPressedKeys = clientProxy['keys'];
	this.mMouseX = clientProxy['mx'];
	this.mMouseY = clientProxy['my'];
	this.mMouseDown = clientProxy['md'];
	this.mMousePoint.mX = this.mMouseX;
	this.mMousePoint.mY = this.mMouseY;
};

/**
 * @param {Object} keyCode ASCII key code
 * @return {boolean} Return true if the specified key is pressed
 */
ss2d.InputProxy.prototype.isKeyPressed = function(keyCode)
{
	return (this.mPressedKeys['_'+keyCode] != null)?true:false;
};
