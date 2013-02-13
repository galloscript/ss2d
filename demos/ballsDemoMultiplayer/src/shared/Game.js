goog.provide('sand.Game');

goog.require('sand.Config');
goog.require('ss2d.MultiplayerScene');
goog.require('sand.Ball');
goog.require('sand.UserAvatar');
/** 
 * @constructor 
 * @extends {ss2d.DisplayObjectContainer}
 * */
sand.Game = function()
{
	ss2d.MultiplayerScene.call(this);
	
	if(COMPILING_SERVER)
	{
		var c=100;
		while(c--)
		{
			var newBall = new sand.Ball(0.5*sand.Config.CANVAS_WIDTH + Math.random()*10, 0.5*sand.Config.CANVAS_HEIGHT + Math.random()*10,10, '#'+Math.floor(Math.max(Math.random(), 0.2)*16777215).toString(16));
			this.addObject(newBall);  
		}
		
		this.mUserTracker = new ss2d.DisplayObjectContainer();
		this.addObject(this.mUserTracker);
	}
}

goog.inherits(sand.Game, ss2d.MultiplayerScene);

ss2d.Object.assignClassId(sand.Game, 3002);

if(COMPILING_CLIENT)
{

	//cast raw object to class
	sand.Game.convert = function(obj)
	{		
		ss2d.DisplayObjectContainer.convert.call(obj);
		obj.__proto__ = sand.Game.prototype;
		
		return obj;
	}
	
	
	sand.Game.createFromSerializedObject = function(obj)
	{
		var newDoc = new sand.Game();
		newDoc.mObjectId = obj['doid'];
		return newDoc;
	}
}

if(COMPILING_SERVER)
{	
	sand.Game.prototype.onUserConnect = function(connection)
	{
		this.mUserTracker.addObject(new sand.UserAvatar(connection));
	};

	sand.Game.prototype.onUserDisconnect = function(connection)
	{
		for(var iut = 0; iut < this.mUserTracker.mChildren.length; ++iut)
		{
			var child = this.mUserTracker.mChildren[iut];
			if(child.mConnection == connection)
			{
				this.mUserTracker.removeObject(child);
				iut = this.mUserTracker.mChildren.length;
				console.log(connection.mUserName+' disconnect');
			}
		}
	};

	sand.Game.prototype.onUserChangeName = function(connection)
	{
		for(var iut = 0; iut < this.mUserTracker.mChildren.length; ++iut)
		{
			var child = this.mUserTracker.mChildren[iut];
			if(child.mConnection == connection)
			{
				child.mUserName = connection.mUserName;
				iut = this.mUserTracker.mChildren.length;
			}
		}
	};

	sand.Game.prototype.onUserMessage = function(commandPackage, connection)
	{
		
	};
}
