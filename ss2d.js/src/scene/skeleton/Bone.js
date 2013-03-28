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
	
	this.mSetupPose = {'x': x, 'y': y, 's': scale, 'r': rotation};
};

goog.inherits(ss2d.Bone, ss2d.DisplayObjectContainer);

/**
 * Interpolate between two bone states
 * @param {Object} prevState
 * @param {Object} nextState
 * @param {number} part
 */
ss2d.Bone.prototype.interpolateBoneStates = function(prevState, nextState, translatePart, rotatePart, translateCurve, rotateCurve)
{
	this.mLocation.mX = this.mSetupPose['x'] + prevState['x'] + ((nextState['x'] - prevState['x']) * translatePart);
	this.mLocation.mY = this.mSetupPose['y'] + prevState['y'] + ((nextState['y'] - prevState['y']) * translatePart);
	this.mRotation = this.mSetupPose['r'] + prevState['r'] + ((nextState['r'] - prevState['r']) * rotatePart);
};

/** @override */
ss2d.Bone.prototype.tick = function(deltaTime)
{
	this.tickChildren(deltaTime);
	
	var parent = this.mParentSkeletalSprite;
	
	if(!parent.mCurrentAnimation)
		return;
		
	var animation = parent.mCurrentAnimation.mAnimationData;
	
	if(!animation || !animation['bones'][this.mName])
		return;
		
	var playReverse = (parent.mTimeDilation < 0)? true : false;
	var currentTime = this.mParentSkeletalSprite.mCurrentAnimationTime;
	var boneRotations = animation['bones'][this.mName]['rotate'];
	var boneTranslations = animation['bones'][this.mName]['translate'];
	
	var prevState = {'x':0, 'y':0, 'r': 0};
	var nextState = {'x':0, 'y':0, 'r': 0};
	
	//nearest rotation and translation

	var nextRotation = null;
	var prevRotation = null;
	var nextTranslation = null;
	var prevTranslation = null;
	var translatePart = 1;
	var rotatePart = 1;
	
	if(boneRotations)
	{
		for(var ri = 0; ri < boneRotations.length && nextRotation == null; ri++)
		{
			if(boneRotations[ri]['time'] > currentTime)
			{
				nextRotation = boneRotations[ri]; 
				
				if(ri == 0)
				{
					prevRotation = boneRotations[boneRotations.length - 1];
				}
				else
				{
					prevRotation = boneRotations[ri - 1];
				}
			}
		}
		
		if(prevRotation && nextRotation)
		{
			prevState['r'] = prevRotation['angle'];
			nextState['r'] = nextRotation['angle'];
			rotatePart = (currentTime - prevRotation['time']) / (nextRotation['time'] - prevRotation['time']);
		}
	}
	
	if(boneTranslations)
	{
		for(var ti = 0; ti < boneTranslations.length && nextTranslation == null; ti++)
		{
			if(boneTranslations[ti]['time'] > currentTime)
			{
				nextTranslation = boneTranslations[ti]; 
				
				if(ti == 0)
				{
					prevTranslation = boneTranslations[boneTranslations.length - 1];
				}
				else
				{
					prevTranslation = boneTranslations[ti - 1];
				}
			}
		}
		
		if(prevTranslation && nextTranslation)
		{
			prevState['x'] = prevTranslation['x'];
			nextState['x'] = nextTranslation['x'];
			prevState['y'] = prevTranslation['y'];
			nextState['y'] = nextTranslation['y'];
			translatePart = (currentTime - prevTranslation['time']) / (nextTranslation['time'] - prevTranslation['time']);
		}
	}
	
	//TODO: Add curve
	
	if(!playReverse)
	{
		this.interpolateBoneStates(prevState, nextState, translatePart, rotatePart);
	}
	else
	{
		translatePart = 1 - translatePart;
		rotatePart = 1 - rotatePart;
		this.interpolateBoneStates(nextState, prevState, translatePart, rotatePart);
	}
};

