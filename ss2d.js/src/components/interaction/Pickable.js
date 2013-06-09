// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Behaviour component that gives pickable interaction to a DisplayObject.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Pickable');

/**
 * @constructor
 * @param {ss2d.DisplayObject} owner The object that owns this component
 */
ss2d.Pickable = function(owner, rb)
{
	if(!owner)
	{
		throw "Pickable component need an owner";
	}
	
	this.mOwner = owner||null;
	this.mPicked = false;
	this.mOffset = new ss2d.Point();
	this.mMoveObject = true;
	this.mRigidBody = rb||null;
	this.mPreviousPicked = false;
	this.mJustPicked = false;
	this.mMouseJoint = null;
	this.mInput = null;
};

//ss2d.Pickable.PICKED_COMPONENT = null;

/**
 * Called on every frame by the owner with the delta time
 * @param {number} deltaTime
 * @param {ss2d.InputProxy} playerInput Input of one connected player (multiplayer feature)
 */
ss2d.Pickable.prototype.tick = function(deltaTime, playerInput)
{
	var input = playerInput||ss2d.CURRENT_VIEW.mInput;
	this.mJustPicked = false;
	if(input.mMouseDown && !input.mPreviousMouseDown)
	{
		//picking
		if(this.mOwner.hitTestPoint(input.mMousePoint))
		{	
			if(this.mInput)
			{	
				if(this.mRigidBody)
				{
					ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint);
				}
				this.mMouseJoint  = null;
				this.mInput.PICKED_COMPONENT = null;
				this.mInput = null;
			}
			
			//last elements are near in z
			if(input.PICKED_COMPONENT)
			{
				if(this.mRigidBody && this.mMouseJoint)
				{
					ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint);
					this.mMouseJoint  = null;
					this.mInput = null;
				}

				input.PICKED_COMPONENT.mPicked = false;
			}
			
			
			
			this.mJustPicked = true;
			this.mPicked = true;
			this.mInput = input;
			input.PICKED_COMPONENT = this;
			var localMouse = this.mOwner.worldToLocal(input.mMousePoint);
			this.mOffset.set(this.mOwner.mLocation.mX - localMouse.mX, 
							 this.mOwner.mLocation.mY - localMouse.mY);
							 
			if(this.mRigidBody)
			{
				this.mMouseJoint = ss2d.PhysicalWorld.getWorld().createMouseJoint(this.mRigidBody, this.mInput);
    			this.mRigidBody.mBody.WakeUp();
			}
		}
	}
	
	this.mPicked = (input.PICKED_COMPONENT == this) && this.mInput && this.mInput.mMouseDown;
	
	if(this.mPicked)
	{
		input = this.mInput;
		if(this.mMoveObject)
		{
			var localMouse = this.mOwner.worldToLocal(input.mMousePoint);
			if(this.mRigidBody)
			{ 
				if(this.mMouseJoint)
				{
					this.mMouseJoint.m_target.Set(localMouse.mX, localMouse.mY);
				}
			}
			else
			{
				this.mOwner.mLocation.mX = localMouse.mX + this.mOffset.mX;
				this.mOwner.mLocation.mY = localMouse.mY + this.mOffset.mY;
			}
		}
	}
	else if(input.PICKED_COMPONENT == this)
	{
		input.PICKED_COMPONENT = null;
		
		if(this.mRigidBody && this.mMouseJoint)
		{
			ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint);
        	this.mMouseJoint = null;
        	this.mInput = null;
        }
	}
	
	this.mPreviousPicked = this.mPicked;
};
