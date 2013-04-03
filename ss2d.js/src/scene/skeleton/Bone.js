// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine skeletal joint
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Bone');

goog.require('ss2d.DisplayObjectContainer');
goog.require('ss2d.Transitions');
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
ss2d.Bone = function(skeletalSprite, name, x, y, scaleX, scaleY, rotation, length)
{
	ss2d.DisplayObjectContainer.call(this, x, y, 1, rotation);
	this.mScaleX = scaleX;
	this.mScaleY = scaleY;
	
	//for a graphical representation
	this.mLength = length; 
	
	this.mName = name;
	this.mParentSkeletalSprite = skeletalSprite;
	
	this.mRepresentation = new ss2d.Quad(0, 0, 5, length, '#ff0000');
	this.mRepresentation.mAlpha = 0.7;
	this.mRepresentation.mRotation = Math.PI*0.5;
	this.mRepresentation.mInheritColor = this.mRepresentation.mInheritAlpha = false;
	this.addObject(this.mRepresentation);
	
	this.mSetupPose = {'x': x, 'y': y, 'r': rotation, 'sx': scaleX, 'sy':scaleY};
};

goog.inherits(ss2d.Bone, ss2d.DisplayObjectContainer);

/**
 * Interpolate between two bone states
 * @param {Object} prevState
 * @param {Object} nextState
 * @param {number} part
 */
ss2d.Bone.prototype.interpolateBoneStates = function(prevState, nextState, parts, curves)
{
	this.mLocation.mX = this.mSetupPose['x'] + prevState['x'] + ((nextState['x'] - prevState['x']) * parts['xy']);
	this.mLocation.mY = this.mSetupPose['y'] + prevState['y'] + ((nextState['y'] - prevState['y']) * parts['xy']);
	this.mRotation = this.mSetupPose['r'] + prevState['r'] + ((nextState['r'] - prevState['r']) * parts['r']);
	this.mScaleX = prevState['sx'] + ((nextState['sx'] - prevState['sx']) * parts['s']);
	this.mScaleY = prevState['sy'] + ((nextState['sy'] - prevState['sy']) * parts['s']);
	
	if(this.mScaleX == 0 ||this.mScaleY == 0) throw 'scale 0';
};

/** @override */
ss2d.Bone.prototype.tick = function(deltaTime)
{
	this.tickChildren(deltaTime);
	
	var parent = this.mParentSkeletalSprite;
	
	if(!parent.mCurrentAnimation)
		return;
		
	var animation = parent.mCurrentAnimation.mAnimationData;
	
	if(!animation || !animation['bones'] || !animation['bones'][this.mName])
		return;
		
	var playReverse = (parent.mTimeDilation < 0)? true : false;
	var currentTime = this.mParentSkeletalSprite.mCurrentAnimationTime;
	var boneRotations = animation['bones'][this.mName]['rotate'];
	var boneTranslations = animation['bones'][this.mName]['translate'];
	var boneScalations =  animation['bones'][this.mName]['scale'];
	
	var prevState = {'x':0, 'y':0, 'r': 0, 'sx':this.mSetupPose['sx'], 'sy':this.mSetupPose['sy']};
	var nextState = {'x':0, 'y':0, 'r': 0, 'sx':this.mSetupPose['sx'], 'sy':this.mSetupPose['sy']};
	var parts = {'xy':0, 'r': 0, 's':0};
	var curves = {'xy':ss2d.Transitions.linear, 'r': ss2d.Transitions.linear, 's':ss2d.Transitions.linear};
	//nearest rotation and translation

	var nextRotation = null;
	var prevRotation = null;
	var nextTranslation = null;
	var prevTranslation = null;
	var nextScalation = null;
	var prevScalation = null;
	var translatePart = 1;
	var rotatePart = 1;
	var scalePart = 1;
	
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
			parts['r'] = (currentTime - prevRotation['time']) / (nextRotation['time'] - prevRotation['time']);
		}
	}
	
	if(boneScalations)
	{
		for(var ri = 0; ri < boneScalations.length && nextScalation == null; ri++)
		{
			if(boneScalations[ri]['time'] > currentTime)
			{
				nextScalation = boneScalations[ri]; 
				
				if(ri == 0)
				{
					prevScalation = boneScalations[boneScalations.length - 1];
				}
				else
				{
					prevScalation = boneScalations[ri - 1];
				}
			}
		}
		
		if(prevScalation && nextScalation)
		{
			prevState['sx'] = prevScalation['x'];
			nextState['sx'] = nextScalation['x'];
			prevState['sy'] = prevScalation['y'];
			nextState['sy'] = nextScalation['y'];
			parts['s'] = (currentTime - prevScalation['time']) / (nextScalation['time'] - prevScalation['time']);
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
			parts['xy'] = (currentTime - prevTranslation['time']) / (nextTranslation['time'] - prevTranslation['time']);
		}
	}
	
	//TODO: Add curve
	
	if(!playReverse)
	{
		this.interpolateBoneStates(prevState, nextState, parts, curves);
	}
	else
	{
		parts['xy'] = 1 - parts['xy'];
		parts['r'] = 1 - parts['r'];
		parts['s'] = 1 - parts['s'];
		this.interpolateBoneStates(nextState, prevState, parts, curves);
	}
};


