// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine skeletal joint
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Bone');

goog.require('ss2d.DisplayObjectContainer');

/**
 * @constructor
 * @extends {ss2d.DisplayObjectContainer} 
 * @param {ss2d.SkeletalSprite} skeletalSprite
 * @param {string} name
 * @param {number} x
 * @param {number} y
 * @param {number} scale
 * @param {number} rotation
 * @param {number} length
 */
ss2d.Bone = function(skeletalSprite, name, x, y, scale, rotation, length)
{
	ss2d.DisplayObjectContainer.call(this, x, y, scale, rotation);
	
	//for a graphical representation
	this.mLength = length; 
	
	this.mName = name;
	this.mParentSkeletalSprite = skeletalSprite;
	
	this.mRepresentation = new ss2d.Quad(0, 0, 5, length, '#ff0000');
	this.mRepresentation.mAlpha = 0.7;
	this.mRepresentation.mRotation = -Math.PI*0.5;
	this.addObject(this.mRepresentation);
};

goog.inherits(ss2d.Bone, ss2d.DisplayObjectContainer);

/**
 * Interpolate between two bone states
 * @param {Object} prevState
 * @param {Object} nextState
 * @param {number} part
 */
ss2d.Bone.prototype.interpolateBoneStates = function(prevState, nextState, part)
{
	
};

/** @override */
ss2d.Bone.prototype.tick = function(deltaTime)
{
	
	var prevState = null;
	var nextState = null;
	var part = 0;
	this.interpolateBoneStates(prevState, nextState, part);
	this.tickChildren(deltaTime);
};
