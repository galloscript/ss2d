// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Server side communication. It's implemented to run on a node.js server with the websocket plug-in.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ServerCommunicationInterface');

goog.require('ss2d.Object');
goog.require('ss2d.InputProxy');


/**
 * @constructor
 * @param {ss2d.ServerView} serverView
 * @param {number} port Port that will be opened
 * @param {number=} userLimit
 */
ss2d.ServerCommunicationInterface = function(serverView, serverPort, userLimit)
{
	//TODO: create websocket externs file and replace the ['symbol'] trick
	
	this.mUserLimit = userLimit || 30;
	this.mWebSocketModule = require('websocket')['server'];
	this.mHTTPModule = require('http');
	
	//this.mConnection.mInterface = this;
	
	this.mServerView = serverView;
	
	this.mUserConnections = [];

	this.mHTTPServer = this.mHTTPModule.createServer(function(request, response) 
	{
		
	});
	
	var wsParams = {};
	wsParams['httpServer'] = this.mHTTPServer;
	this.mWebSocketServer = new this.mWebSocketModule(wsParams);
	this.mWebSocketServer.mInterface = this;
	
	this.mWebSocketServer['on']('request', function(request) {
		console.log('a user log in');
    	var connection = request['accept'](null, request['origin']);
    	
    	if(this.mInterface.mUserConnections.length >= this.mInterface.mUserLimit)
		{
			console.log('user rejected');
			connection.send('["REJECTED","Too many players connected."]');
			connection.close();
			return;
		}
    	
    	this.mInterface.mUserConnections.push(connection);
    	
    	
    	connection.mUserName = '';
    	connection.mServer = this;
    	connection.mInput = new ss2d.InputProxy();
    	connection.mConnectionId = ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT++;
    	connection.mErrorCount = 0;
    	
    	this.mInterface.mServerView.mMainScene.onUserConnect(connection);
    	
    	connection['on']('message', function(message) 
    	{
    		//var commandPackage = JSON.parse(ss2d.Object.convertArrayBufferToString(data));
    		try
    		{
    			var commandPackage = JSON.parse(message['utf8Data']);
    			this.mServer.mInterface.processClientCommand(commandPackage, this);
    		} 
    		catch(t)
    		{
    			this.mErrorCount++;
    			console.log('Exception '+t);
    			if(this.mErrorCount > 4)
    			{
    				this.close();
    			}
    		}
    	});
    	
		connection['on']('close', function(con) 
		{
        	this.mServer.mInterface.mUserConnections.splice(this.mServer.mInterface.mUserConnections.indexOf(this), 1);
        	console.log('a user disconnect');
        	this.mServer.mInterface.mServerView.mMainScene.onUserDisconnect(this);
		});
	});
	
	this.mHTTPServer.listen(serverPort, function(){});
	console.log('Server comunication initialized');
};

/** @type {number} */
ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT = 1000;

/**
 * @param {ss2d.MultiplayerScene} sceneToSend
 * @param {Object[]} userConnections
 */
ss2d.ServerCommunicationInterface.prototype.broadcastSceneToClients = function(sceneToSend, userConnections)
{
	if(this.mUserConnections.length > 0)
	{
		var command = '["SCENE",'+sceneToSend.toJSON()+']';
		
		/*if(this.mServerView.mSoundList.length > 0)
		{
			command += ',"PLAYSOUNDS":'+JSON.stringify(sceneToSend.mSoundList);
			this.mServerView.mSoundList = [];
		}*/
		/*if(this.mServerView.mDeletedObjectList > 0)
		{
			command += ',"RMOBJTS":'+JSON.stringify(this.mServerView.mDeletedObjectList);
			this.mServerView.mDeletedObjectList = [];
		}
		command += '}';*/
	
		//var binCommand = ss2d.Object.convertStringToArrayBuffer(command);
		userConnections = userConnections || this.mUserConnections;
		for(var i in this.mUserConnections)
		{
			//this.mUserConnections[i]['sendBytes'](new Buffer(command));
			this.mUserConnections[i]['send'](command);
		}
	}
};

/**
 * Called when the server receives a message from a client.
 * @param {Object} commandPackage 
 * @param {Object} connection
 */
ss2d.ServerCommunicationInterface.prototype.processClientCommand = function(commandPackage, connection)
{
	var commandName = commandPackage[0];
	var commandParam = commandPackage[1];
	
	switch(commandName)
	{
		case 'UINPUT':
			connection.mInput.updateFromClient(commandParam);
		break;
		case 'UNAME':
			connection.mUserName = commandParam;
			connection.mServer.mInterface.mServerView.mMainScene.onUserChangeName(connection);
		break;
		default:
			connection.mServer.mInterface.mServerView.mMainScene.onUserMessage(commandName, commandParam, connection);
		break;
	}
};

