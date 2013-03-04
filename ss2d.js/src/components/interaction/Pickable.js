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
ss2d.Pickable = function(owner)
{
	if(!owner)
	{
		throw "Pickable component need an owner";
	}
	
	this.mOwner = owner||null;
	this.mPicked = false;
	this.mOffset = new ss2d.Point();
};

ss2d.Pickable.PICKED_COMPONENT = null;

/**
 * Called on every frame by the owner with the delta time
 * @param {number} deltaTime
 */
ss2d.Pickable.prototype.tick = function(deltaTime)
{
	var input = ss2d.CURRENT_VIEW.mInput;
	if(input.mMouseDown && !input.mPreviousMouseDown)
	{
		//picking
		if(this.mOwner.hitTestPoint(input.mMousePoint))
		{
			//last elements are near in z
			if(ss2d.Pickable.PICKED_COMPONENT)
			{
				ss2d.Pickable.PICKED_COMPONENT.mPicked = false;
			}
			
			ss2d.Pickable.PICKED_COMPONENT = this;
			this.mPicked = true;
			this.mOffset.set(this.mOwner.mLocation.mX - input.mMouseX, 
							 this.mOwner.mLocation.mY - input.mMouseY);
		}
	}
	
	this.mPicked = (ss2d.Pickable.PICKED_COMPONENT == this) && input.mMouseDown;
	
	if(this.mPicked)
	{
		this.mOwner.mLocation.mX = input.mMouseX + this.mOffset.mX;
		this.mOwner.mLocation.mY = input.mMouseY + this.mOffset.mY;
	}
	else
	{
		if(ss2d.Pickable.PICKED_COMPONENT == this)
		{
			ss2d.Pickable.PICKED_COMPONENT = null;
		}
	}
	
	
};
