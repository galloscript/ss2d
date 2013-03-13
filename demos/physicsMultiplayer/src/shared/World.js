goog.provide('phys.World');

goog.require('phys.Config');
goog.require('ss2d.MultiplayerScene');
goog.require('phys.Crate');
goog.require('phys.UserAvatar');
goog.require('ss2d.RigidBody');

/** 
 * @constructor 
 * @extends {ss2d.MultiplayerScene}
 * */
phys.World = function()
{
	ss2d.MultiplayerScene.call(this);
	
	if(COMPILING_SERVER)
	{
		var c=20;
		while(c--)
		{
			var newCrate = new phys.Crate(0.5*phys.Config.CANVAS_WIDTH + Math.random()*10, 
										  0.5*phys.Config.CANVAS_HEIGHT + Math.random()*10);
			this.addObject(newCrate);  
		}
		
		var floor = new ss2d.Quad(350, 400, 700, 30, '#ff0000');
		this.addObject(floor);
		floor.mRB = new ss2d.RigidBody(floor, null, false);
		
		this.mUserTracker = new ss2d.DisplayObjectContainer();
		this.addObject(this.mUserTracker);
	}
}

goog.inherits(phys.World, ss2d.MultiplayerScene);

ss2d.Object.assignClassId(phys.World, 3002);

if(COMPILING_CLIENT)
{

	//cast raw object to class
	phys.World.convert = function(obj)
	{		
		ss2d.DisplayObjectContainer.convert.call(obj);
		obj.__proto__ = phys.World.prototype;
		
		return obj;
	}
	
	
	phys.World.createFromSerializedObject = function(obj)
	{
		var newDoc = new phys.World();
		newDoc.mObjectId = obj['doid'];
		return newDoc;
	}
	
	/** @override */
	phys.World.prototype.tick = function(dt)
	{
		this.tickChildren(dt);
		var input = ss2d.CURRENT_VIEW.mInput;
		
		if(input.isKeyPressed(ss2d.Input.Keys.D))
			this.mLocation.mX -= 200*dt;

		if(input.isKeyPressed(ss2d.Input.Keys.A))
			this.mLocation.mX += 200*dt;

		if(input.isKeyPressed(ss2d.Input.Keys.W))
			this.mLocation.mY += 200*dt;

		if(input.isKeyPressed(ss2d.Input.Keys.S))
			this.mLocation.mY -= 200*dt;

		if(input.isKeyPressed(ss2d.Input.Keys.Z))
		{
			this.mScaleY = this.mScaleX += 0.5*dt;
		}
		
		if(input.isKeyPressed(ss2d.Input.Keys.X))
		{
			this.mScaleY = this.mScaleX -= 0.5*dt;
		}

		if(input.isKeyPressed(ss2d.Input.Keys.R))
		{
			this.mLocation.mX = 0;
			this.mLocation.mY = 0;
			this.mRotation = 0;
			this.mScaleX = 1;
			this.mScaleY = 1;
		}
	};
}

if(COMPILING_SERVER)
{	
	phys.World.prototype.onUserConnect = function(connection)
	{
		this.mUserTracker.addObject(new phys.UserAvatar(connection));
		ss2d.CURRENT_VIEW.mFrameRate = phys.Config.SERVER_FRAME_RATE;
	};

	phys.World.prototype.onUserDisconnect = function(connection)
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
		
		if(this.mUserTracker.mChildren.length == 0)
		{
			ss2d.CURRENT_VIEW.mFrameRate = 0.5;
		}
	};

	phys.World.prototype.onUserChangeName = function(connection)
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

	phys.World.prototype.onUserMessage = function(commandPackage, connection)
	{
		
	};
}
