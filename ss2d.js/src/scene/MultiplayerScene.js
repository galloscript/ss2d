// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A subclass of ss2d.DisplayObjectContainer that implements some multiplayer features.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.MultiplayerScene');

goog.require('ss2d.Defines');
goog.require('ss2d.DisplayObjectContainer');

/** 
 * @constructor 
 * @extends {ss2d.DisplayObjectContainer}
 * */
ss2d.MultiplayerScene = function()
{
	ss2d.DisplayObjectContainer.call(this);
	
	//seted by the view
	this.mParentView = null;
}

goog.inherits(ss2d.MultiplayerScene, ss2d.DisplayObjectContainer);

ss2d.Object.assignClassId(ss2d.MultiplayerScene, 1006);

if(COMPILING_CLIENT)
{
	/**
	 * @override
	 */
	ss2d.MultiplayerScene.prototype.interpolateState = function(prevState, nextState, part, deltaTime, childrenOnly)
	{
		ss2d.DisplayObjectContainer.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime, true)
	}
}

if(COMPILING_SERVER)
{
	
	/** @override */
	ss2d.MultiplayerScene.prototype.tick = function(deltaTime)
	{
		this.tickChildren(deltaTime);
		this.mParentView.mComunication.broadcastSceneToClients(this);
	};
	
	/**
	 * Server side method called every time a user connects.
 	 * @param {Object} connection
	 */
	ss2d.MultiplayerScene.prototype.onUserConnect = function(connection){};
	
	/**
	 * Server side method called every time a user disconnects.
 	 * @param {Object} connection
	 */
	ss2d.MultiplayerScene.prototype.onUserDisconnect = function(connection){};
	
	/**
	 * Server side method called every time a user change his or her name.
 	 * @param {Object} connection
	 */
	ss2d.MultiplayerScene.prototype.onUserChangeName = function(connection){};
	
	/**
	 * Server side method called every time a user sent a message not intepreted by the communication interface.
	 * @param {string} commandName
	 * @param {Object} commandParam
	 * @param {Object} connection
	 */
	ss2d.MultiplayerScene.prototype.onUserMessage = function(commandName, commandParam, connection){};
	
	/**
	 * Return a JSON compliant string representation of the entire scene.
	 * @override
	 */
	ss2d.MultiplayerScene.prototype.getPropertiesJSON = function()
	{
		return ss2d.DisplayObjectContainer.prototype.getPropertiesJSON.call(this, true, true);
	}
}


