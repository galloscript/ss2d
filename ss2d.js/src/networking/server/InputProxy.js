// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Server side input representation for each user connected to the server.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.InputProxy');

/** 
 * @constructor 
 * @property {number} mMouseX Mouse location in x axis
 * @property {number} mMouseY Mouse location in y axis
 * @property {number} mPreviousMouseX Last frame mouse location in x axis
 * @property {number} mPreviousMouseY Last frame mouse location in y axis
 * @property {ss2d.Point} mMousePoint Mouse location point
 * @property {ss2d.Point} mPreviousMousePoint Last frame mouse location point
 * @property {boolean} mMouseDown Is mouse left button down?
 * @property {boolean} mPreviousMouseDown Was mouse left button down last frame?
 */
ss2d.InputProxy = function()
{
	this.mPressedKeys = {};
	this.mMouseX = -50;
	this.mMouseY = -50;
	this.mPreviousMouseX = 0;
	this.mPreviousMouseY = 0;
	this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
	this.mPreviousMousePoint = new ss2d.Point(this.mPreviousMouseX, this.mPreviousMouseY);
	this.mMouseDown = false;
	this.mPreviousMouseDown = false;
};

/**
 * @param {Object} clientProxy Input received from the client
 */
ss2d.InputProxy.prototype.updateFromClient = function(clientProxy)
{
	this.mPreviousMouseX = this.mMouseX;
	this.mPreviousMouseY = this.mMouseY;
	this.mPreviousMousePoint.mX = this.mPreviousMouseX;
	this.mPreviousMousePoint.mY = this.mPreviousMouseY;
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
