// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine skeletal sprite
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.SkeletalSprite');

goog.require('ss2d.ResourceManager');
goog.require('ss2d.DisplayObjectContainer');
goog.require('ss2d.Bone');
goog.require('ss2d.Slot');

/**
 * @constructor
 */
ss2d.SkeletalSprite = function(x, y, scale, skeleton, bodyAtlas)
{
	ss2d.DisplayObjectContainer.call(this, x, y);
	this.mScaleX = this.mScaleY = scale;
	
	this.mBones = new ss2d.DisplayObjectContainer();
	this.addObject(this.mBones);
	
	this.mSlots = new ss2d.DisplayObjectContainer();
	this.addObject(this.mSlots);
	
	this.mBoneMap = {};
	this.mSlotMap = {};
	this.mAnimationsMap = {};
	
	this.mSkeleton = skeleton||null;
	this.mBodyAtlas = bodyAtlas||null;
	
	//if(typeof bodyAtlas == 'string')
	//{
		//this.mBodyAtlas = ss2d.ResourceManager.loadTextureAtlas(bodyAtlas);
	//}
	
	if(typeof skeleton == 'string')
	{
		this.mSkeleton = ss2d.ResourceManager.loadSkeleton(skeleton, this.setup, this);
	}
	
	//debug
	this.mShowBones = false;
	
	//animation
	this.mCurrentAnimationTime = 0;
	this.mCurrentAnimation = null;
	this.mTimeDilation = 1;
};

goog.inherits(ss2d.SkeletalSprite, ss2d.DisplayObjectContainer);

/**
 * Called once all skeleton info is loaded.
 * @param {ss2d.Skeleton} skeleton
 */
ss2d.SkeletalSprite.prototype.setup = function(skeleton)
{
	this.mSkeleton = skeleton;
	var boneList = this.mSkeleton.mSkeletonData['bones'];
	for(var boneIndex in boneList)
	{
		var bone = boneList[boneIndex];
		var parent = this.mBones;
		if(bone['parent'])
		{
			parent = this.mBoneMap[bone['parent']];
		}

		var boneObject = new ss2d.Bone(this, 
									   bone['name'], 
									   bone['x']||0, 
									   bone['y']||0, 
									   bone['scale']||1,
									   bone['rotation']||0,
									   bone['length']||0);
		this.mBoneMap[bone['name']] = boneObject;
		parent.addObject(boneObject);
	}
	
	var slotList = this.mSkeleton.mSkeletonData['slots'];
	var defaultSkin = this.mSkeleton.mSkeletonData['skins']['default'];
	for(var slotIndex in slotList)
	{
		var slot = slotList[slotIndex];
		if(!slot['attachment'])
			continue;
		
		var skinInfo = defaultSkin[slot['name']][slot['attachment']];
		var masterBone = this.mBoneMap[slot['bone']];
		var slotObject = new ss2d.Slot(masterBone,
									   slot['name'],
									   skinInfo['x']||0, 
									   skinInfo['y']||0,
									   skinInfo['width']||1,
									   skinInfo['height']||1,
									   slot['attachment'],
									   this.mBodyAtlas);
		slotObject.mPivotX = slotObject.mWidth*0.5;
		slotObject.mPivotY = slotObject.mHeight*0.5;							   
		slotObject.mRotation = skinInfo['rotation']||0;
		this.mSlotMap[slot['name']] = slotObject;
		this.mSlots.addObject(slotObject);
	}
};

ss2d.SkeletalSprite.prototype.setDefaultPose = function()
{
	var boneList = this.mSkeleton.mSkeletonData['bones'];
	for(var boneIndex in boneList)
	{
		var bonePose = boneList[boneIndex];
		var targetBone = this.mBoneMap[bonePose['name']];
		targetBone.mLocation.mX = bonePose['x']||0;
		targetBone.mLocation.mY = bonePose['y']||0;
		targetBone.mRotation = bonePose['rotation']||0;
		targetBone.mScaleX = targetBone.mScaleY = bonePose['scale']||1;
	}
};

ss2d.SkeletalSprite.prototype.addAnimation = function(animationName, animationPath)
{
	this.mAnimationsMap[animationName] = ss2d.ResourceManager.loadSkeletalAnimation(animationPath);
};

ss2d.SkeletalSprite.prototype.playAnimation = function(animationName)
{
	this.mCurrentAnimationTime = 0;
	this.mCurrentAnimation = this.mAnimationsMap[animationName]||null;
};

ss2d.SkeletalSprite.prototype.stopAnimation = function()
{
	this.mCurrentAnimationTime = 0;
	this.mCurrentAnimation = null;
	this.setDefaultPose();
};

ss2d.SkeletalSprite.prototype.updateAnimation = function(deltaTime)
{
	if(this.mCurrentAnimation && Math.abs(this.mTimeDilation) > 0.01)
	{
		this.mCurrentAnimationTime += deltaTime*this.mTimeDilation;
	
		if(this.mTimeDilation > 0 && this.mCurrentAnimationTime >= this.mCurrentAnimation.mDuration)
		{
			this.mCurrentAnimationTime -= this.mCurrentAnimation.mDuration;
		}
		else if(this.mTimeDilation < 0 && this.mCurrentAnimationTime <= 0)
		{
			this.mCurrentAnimationTime += this.mCurrentAnimation.mDuration
		}

		this.tickChildren(deltaTime);
	}
	
	//security
	if(this.mCurrentAnimation &&
	   ((this.mCurrentAnimationTime > this.mCurrentAnimation.mDuration * 3) || 
	   (this.mCurrentAnimationTime < this.mCurrentAnimation.mDuration * -3)))
	{
		this.mCurrentAnimationTime = 0;
	}
	
};

/** @override */
ss2d.SkeletalSprite.prototype.tick = function(deltaTime)
{
	this.updateAnimation(deltaTime);
};

/** @override */
ss2d.SkeletalSprite.prototype.render = function(support)
{
	support.pushTransform(this);
	this.mSlots.render(support);
	if(this.mShowBones)
		this.mBones.render(support);
	support.popTransform();
};

/** @override */
ss2d.SkeletalSprite.prototype.hitTestPoint = function(point)
{	
	return this.mSlots.hitTestPoint(point);
};
