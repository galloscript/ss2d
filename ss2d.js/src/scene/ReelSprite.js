// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview An ss2d.Sprite with a frame based animation.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelSprite');

goog.require('ss2d.Sprite');
goog.require('ss2d.ReelSet');
goog.require('ss2d.ResourceManager');

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {string} reelSet
 * @param {string} playingReel
 */
ss2d.ReelSprite = function(x, y, w, h, reelSet, playingReel)
{

	ss2d.Sprite.call(this, x, y, w, h);
	
	if(!reelSet)
	{
		throw 'Trying to create a sprite reel without specifying a ss2d.ReelSet';
	}

	//Animation info
	this.mReelSetName = reelSet;
	this.mReelSet = null;
	this.mPlayingReel = null;
	this.mDefaultReel = playingReel||false;	
	this.mLoop = true;
	this.mTimeDilation = 1.0;
	
	//Animation state
	this.mPlaying = false;
	this.mComplete = false;
	this.mFrameCount = 0; 
	this.mElapsedTimeCurrentFrame = 0;
	
	//Sprite
	this.mTexture = null;
	this.mClip = [0, 0, 0, 0];
	this.mOffsetX = 0;
	this.mOffsetY = 0;
	
	//setup
	ss2d.ResourceManager.loadReelSet(reelSet, this.setup, this);

};

goog.inherits(ss2d.ReelSprite, ss2d.Sprite);

//static
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);

/**
 * Prepare teh ReelSprite to play animations once the reelset is loaded. 
 */
ss2d.ReelSprite.prototype.setup = function()
{
	this.mReelSet = ss2d.ResourceManager.loadReelSet(this.mReelSetName);
	if(!this.mDefaultReel)
	{
		for(var reelName in this.mReelSet.mReels)
		{
			//first reel
			this.playReel(reelName);
			break;
		}
	} else {
		this.playReel(this.mDefaultReel);
	}
	
	this.mTexture = this.mReelSet.mTexture;
	var firstFrame = this.mPlayingReel.mFrames[0];
	firstFrame.dumpClip(this.mClip);
}

/**
 * @param {string} reelName
 */
ss2d.ReelSprite.prototype.playReel = function(reelName)
{
	if(this.mReelSet)
	{
		this.mPlayingReel = (reelName && this.mReelSet.mReels[reelName]) ? this.mReelSet.mReels[reelName] : this.mPlayingReel;
		var firstFrame = this.mPlayingReel.mFrames[0];
		firstFrame.dumpClip(this.mClip);
	}
	
	this.mPlaying = true;
	this.mComplete = false;
	this.mFrameCount = 0; 
	this.mElapsedTimeCurrentFrame = 0;
}

ss2d.ReelSprite.prototype.pauseReel = function()
{
	this.mPlaying = false;
}

ss2d.ReelSprite.prototype.resumeReel = function()
{
	this.mPlaying = true;
}

if(COMPILING_CLIENT || COMPILING_OFFLINE)
{
	ss2d.ReelSprite.prototype.tick = function(deltaTime)
	{
		this.updateReelAnimation(deltaTime);
	};
	
	ss2d.ReelSprite.prototype.updateReelAnimation = function(deltaTime)
	{	
		if(this.mPlaying && this.mReelSet)
		{
			if(!this.mTexture)
			{
				this.mTexture = this.mReelSet.mTexture;
			}
			
			var timePerFrame = this.mPlayingReel.getTimePerFrame() * this.mTimeDilation;	
			
			this.mElapsedTimeCurrentFrame += deltaTime;
			
			//a frame change
			if(this.mElapsedTimeCurrentFrame >= timePerFrame)
			{
				var framesToAdd = Math.floor(this.mElapsedTimeCurrentFrame / timePerFrame);
				this.mFrameCount += framesToAdd;
				this.mElapsedTimeCurrentFrame -= timePerFrame;
				
				if(this.mFrameCount >= this.mPlayingReel.mFrames.length)
				{
					if(this.mLoop)
					{	
						this.mFrameCount = 0;
						this.mElapsedTimeCurrentFrame = 0;
					}
					else
					{
						this.mFrameCount--;
						this.mComplete = true;
						this.mPlaying = false;
					}
				}
				
				var currentFrame = this.mPlayingReel.mFrames[this.mFrameCount];
				
				currentFrame.dumpClip(this.mClip);
				this.mOffsetX = currentFrame.mOffsetX;
				this.mOffsetY = currentFrame.mOffsetY;
			}
		}
	};
	
	ss2d.ReelSprite.prototype.render = function(renderSupport)
	{
		if(this.mTexture)
		{
			this.mLocation.mX += this.mOffsetX;
			this.mLocation.mY += this.mOffsetY;
			ss2d.Sprite.prototype.render.call(this, renderSupport);
			this.mLocation.mX -= this.mOffsetX;
			this.mLocation.mY -= this.mOffsetY;
		}
	};
}
