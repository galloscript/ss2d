// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A rigid body component
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.RigidBody');


/** 
 * @constructor 
 * @param {ss2d.DisplayObject} owner The display object owner of this rigid body
 */
ss2d.RigidBody = function(owner, bodyType, dynamicBody)
{
	if(!owner)
	{
		throw "Rigid body component requires an owner";
	}
	
	this.mOwner = owner;
	

	this.mBodyType = bodyType||ss2d.RigidBody.Types.BOX;
	if (typeof(dynamicBody) == 'undefined') {  
        dynamicBody = true;  
    }
	this.mDyniamicBody = dynamicBody;
	
	this.reset();
};

/** @enum {number} */
ss2d.RigidBody.Types = {
	BOX: 1,
	CIRCLE: 2,
	POLYGON: 3
};


ss2d.RigidBody.prototype.reset = function()  
{  
	var world = ss2d.PhysicalWorld.getWorld();
	switch(this.mBodyType)
	{
		case ss2d.RigidBody.Types.BOX:
			var ownerBounds = this.mOwner.getBounds();
			this.mOwner.mPivotX = 0.5*ownerBounds.mWidth/this.mOwner.mScaleX;
			this.mOwner.mPivotY = 0.5*ownerBounds.mHeight/this.mOwner.mScaleY;
			var loc = new ss2d.Point(this.mOwner.mLocation.mX, 
									 this.mOwner.mLocation.mY);
			var worldLocation = this.mOwner.localToWorld(loc);
			this.mBody = world.createBox(worldLocation.mX,
										 worldLocation.mY,
										 ownerBounds.mWidth*0.5,
										 ownerBounds.mHeight*0.5,
										 !this.mDyniamicBody);
										 
			this.mBody.m_rotation = this.mOwner.mRotation + Math.PI;
										 
		break;
		case ss2d.RigidBody.Types.CIRCLE:
		break;
		case ss2d.RigidBody.Types.POLYGON:
		break;
		default:
			throw "["+bodyType+"] is not a valid body type";
		break;
	}
};

ss2d.RigidBody.prototype.destroy = function()  
{  
	this.mBody.m_flags = box2d.Body.Flags.sleepFlag;
	this.mBody.Destroy();
};

/**
 * @param {number} deltaTime Time passed since the last update
 */
ss2d.RigidBody.prototype.tick = function(deltaTime)  
{  
	if(this.mBody)
	{
		this.mOwner.mLocation.mX = this.mBody.m_position.x;
		this.mOwner.mLocation.mY = this.mBody.m_position.y;
		this.mOwner.mRotation = this.mBody.m_rotation - Math.PI;
	}
};
