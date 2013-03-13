
goog.provide('phys.Crate');

goog.require('ss2d.RigidBody');
goog.require('ss2d.Pickable');
goog.require('ss2d.Sprite');

/** @constructor */
phys.Crate = function(x, y)
{
	ss2d.Sprite.call(this, x, y, 40, 40, 'textures/crate0.png');
	if(COMPILING_SERVER) //server only functions
	{	
		this.mRigidBody = new ss2d.RigidBody(this);
		this.mPickable = new ss2d.Pickable(this, this.mRigidBody);
	}
}

goog.inherits(phys.Crate, ss2d.Sprite);

//static
ss2d.Object.assignClassId(phys.Crate, 3001);

if(COMPILING_CLIENT)
{
	
	phys.Crate.createFromSerializedObject = function(obj)
	{
		var newDoc = new phys.Crate();
		newDoc.mObjectId = obj['doid'];
		return newDoc;
	}
}

if(COMPILING_SERVER) //server only functions
{	
	phys.Crate.prototype.tick = function(deltaTime)
	{ 
		var connections = ss2d.CURRENT_VIEW.mComunication.mUserConnections;
		
		for(var ic = 0; ic < connections.length; ++ic)
		{
			var input = connections[ic].mInput;
			
			this.mPickable.tick(deltaTime, input);
		}
		
		this.mRigidBody.tick(deltaTime);
	}
}

