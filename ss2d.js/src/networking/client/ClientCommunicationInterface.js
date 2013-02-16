// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Client side communication interface that uses HTML5 WebSocket API to connect a server.
 * Defines a basic protocol to send commands that set a user name, and the user input. 
 * It also processes the commands received from server.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ClientCommunicationInterface');

goog.require('ss2d.Object');

/**
 * @constructor
 * @param {ss2d.ClientView} clientView client main view
 * @param {string} host
 * @param {number} port
 */
ss2d.ClientCommunicationInterface = function(clientView, host, port)
{
	this.mClientView = clientView;
	/** @type {WebSocket} */
	this.mConnection = new WebSocket('ws://'+host+':'+port+'/');
	this.mConnection.mInterface = this;
	this.mConnected = false;
	
	// Log connection
	this.mConnection.onopen = function () {
		console.log('WebSocket connected');
		this.mInterface.mConnected = true;
		this.mInterface.mClientView.onConnect(this);
	};
	
	// Log errors
	this.mConnection.onerror = function (error) {
		console.log('WebSocket Error ' + error);
		this.mInterface.mConnected = false;
	};
	
	this.mConnection.onclose = function () {
		this.mInterface.mConnected = false;
		this.mInterface.mClientView.onDisconnect(this);
	};
	
	// Log messages from the server
	this.mConnection.onmessage = function (event) {
		//var fr = new FileReader();
		//fr.mInterface = this.mInterface;
		//fr.onloadend = function(){ this.mInterface.processServerCommand(this.result);}
		//fr.readAsBinaryString(event.data);
		this.mInterface.processServerCommand(JSON.parse(event.data), this);
		delete event.data;
	};
};

/**
 * Sends a UNAME command with the user name.
 * @param {string} userName
 */
ss2d.ClientCommunicationInterface.prototype.packAndSendUserName = function(userName)
{
	if(this.mConnected)
	{
		var command = '["UNAME","'+userName+'"]';
		this.mConnection.send(command);
	}
};

/**
 * Sends a UINPUT command with the user input.
 * @param {ss2d.Input} inputObject
 */
ss2d.ClientCommunicationInterface.prototype.packAndSendInput = function(inputObject)
{
	if(this.mConnected)
	{
		var command = '["UINPUT",'+inputObject.toJSON()+']';
		this.mConnection.send(command);
	}
};

/**
 * Interprets the server commands
 * @param {Object[2]} commandPackage
 * @param {WebSocket} connection
 */
ss2d.ClientCommunicationInterface.prototype.processServerCommand = function(commandPackage, connection)
{
	var commandName = commandPackage[0];
	var commandParam = commandPackage[1];
	
	switch(commandName)
	{
		case 'SCENE':
			this.mClientView.mSceneQueue.push([new Date().getTime(), commandParam]);
		break;
		case 'REJECTED':
			this.mClientView.onServerMessage(commandName, commandParam, connection);
		break;
		default:
			this.mClientView.onServerMessage(commandName, commandParam, connection);
		break;
	}
};








