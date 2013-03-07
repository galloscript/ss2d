// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A singleton class that represents a box2d physic world
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.PhysicalWorld');

goog.require('box2d.World');
goog.require('box2d.AABB');
goog.require('box2d.Vec2');
goog.require('box2d.BoxDef');
goog.require('box2d.CircleDef');
goog.require('box2d.BodyDef');

/** @constructor */
ss2d.PhysicalWorld = function()
{
	var worldAABB = new box2d.AABB();  
	worldAABB.minVertex.Set(-1024, -1024);  
	worldAABB.maxVertex.Set(1024, 1024);  
	var gravity = new box2d.Vec2(0, 300);  
	var doSleep = true;  
	this.mWorld = new box2d.World(worldAABB, gravity, doSleep);
};

ss2d.PhysicalWorld.WORLD_INSTANCE = null;

ss2d.PhysicalWorld.getWorld = function()
{
	if(!ss2d.PhysicalWorld.WORLD_INSTANCE)
	{
		ss2d.PhysicalWorld.WORLD_INSTANCE = new ss2d.PhysicalWorld();
	}
	
	return ss2d.PhysicalWorld.WORLD_INSTANCE;
}

/**
 * Sets the world gravity
 * @param {number} x Gravity force in X axis
 * @param {number} y Gravity force in Y axis
 */
ss2d.PhysicalWorld.prototype.setGravity = function(x, y)
{
	this.mWorld.m_gravity.x = x;
	this.mWorld.m_gravity.y = y;
};

/**
 * @param {number} deltaTime Time passed since the last update
 */
ss2d.PhysicalWorld.prototype.tick = function(deltaTime)  
{  
    this.mWorld.Step(deltaTime, 1);  
};

/**
 * Creates and returns a circle body
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @return {Object} A ball
 */
ss2d.PhysicalWorld.prototype.createBall = function(x, y, radius) {  
    radius = radius || 20;  
    var ballSd = new box2d.CircleDef();  
    ballSd.density = 1.0;  
    ballSd.radius = radius;  
    ballSd.restitution = 0.8;  
    ballSd.friction = 0.9;  
    var ballBd = new box2d.BodyDef();  
    ballBd.AddShape(ballSd);  
    ballBd.position.Set(x, y);  
    return this.mWorld.CreateBody(ballBd);  
};  

/**
 * Creates and returns a box body
 * @param {number} x Origin of the box in X axis
 * @param {number} y Origin of the box in Y axis
 * @param {number} width
 * @param {number} height
 * @param {boolean} fixed
 * @param {boolean} filled
 * @return {Object} A box
 */
ss2d.PhysicalWorld.prototype.createBox = function(x, y, width, height, fixed, filled) 
{  
	if (typeof(fixed) == 'undefined') {  
		fixed = true;  
	}
	 
	if (typeof(filled) == 'undefined') {  
		filled = false;  
	} 
    
	var boxSd = new box2d.BoxDef();  
	if (!fixed) {  
	    boxSd.density = 1.0;  
	}  
	if (filled) {  
	    boxSd.userData = 'filled';  
	}  
	boxSd.extents.Set(width, height);  
	var boxBd = new box2d.BodyDef();  
	boxBd.AddShape(boxSd);  
	boxBd.position.Set(x, y);  
	return this.mWorld.CreateBody(boxBd);  
};

/**
 * Create a mouse joint for target body
 * @param {Object} body Target body
 */
ss2d.PhysicalWorld.prototype.createMouseJoint = function(body) 
{  
	var input = ss2d.CURRENT_VIEW.mInput;
	md = new box2d.MouseJointDef();
	md.body1 = this.mWorld.m_groundBody;
	md.body2 = body;
	md.target.Set(input.mMouseX, input.mMouseY);
	md.maxForce = 1000.0 * body.m_mass;
	md.m_collideConnected = true;
	md.timeStep = 1.0/ss2d.CURRENT_VIEW.mFrameRate;
	return this.mWorld.CreateJoint(md);
};