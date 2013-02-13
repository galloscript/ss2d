// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview An ss2d.Sprite with a frame based animation.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelSprite');

goog.require('ss2d.Sprite');
goog.require('ss2d.ReelFrame');
goog.require('ss2d.ReelSet');

/** @constructor */
ss2d.ReelSprite = function(x, y, w, h, descriptor)
{
	//not Sprite constructor, we only need methods
	ss2d.Quad.call(this, x, y, w, h);
	
	if(!descriptor)
	{
		throw 'Trying to create a sprite reel without a SpriteReelDescriptor';
	}
	
	//Animation info
	this.mDescriptor = descriptor;
	this.mFirstFrame = this.mDescriptor.mFrames[0];
	this.mLoop = true;
	this.mTimeDilation = 1.0;
	
	//Sprite
	this.mTexture = this.mFirstFrame.mTexture;
	this.mClip = this.mFirstFrame.copyClip(new Array(4));
	
	//Animation state
	this.mPlaying = true;
	this.mComplete = false;
	this.mFrameCount = 0; 
	this.mElapsedTimeCurrentFrame = 0;
};

goog.inherits(ss2d.ReelSprite, ss2d.Sprite);

//static
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);

//prototype
ss2d.ReelSprite.prototype.playAnimation = function(descriptor)
{
	this.mDescriptor = descriptor || this.mDescriptor;
	this.mPlaying = true;
	this.mComplete = false;
	this.mFrameCount = 0; 
	this.mElapsedTimeCurrentFrame = 0;
}

ss2d.ReelSprite.prototype.pauseAnimation = function()
{
	this.mPlaying = false;
}

if(COMPILING_CLIENT || COMPILING_OFFLINE)
{
	ss2d.ReelSprite.prototype.tick = function(deltaTime)
	{
		if(this.mPlaying)
		{
			var timePerFrame = this.mDescriptor.getTimePerFrame() * this.mTimeDilation;	
			
			this.mElapsedTimeCurrentFrame += deltaTime;
			
			//a frame change
			if(this.mElapsedTimeCurrentFrame >= timePerFrame)
			{
				this.mFrameCount++;
				this.mElapsedTimeCurrentFrame -= timePerFrame;
				
				if(this.mFrameCount >= this.mDescriptor.mFrames.length)
				{
					if(this.mLoop)
					{	
						this.mFrameCount = 0;
					}
					else
					{
						this.mFrameCount--;
						this.mComplete = true;
					}
				}
				
				var currentFrame = this.mDescriptor.mFrames[this.mFrameCount];
				
				currentFrame.dumpClip(this.mClip);
				this.mTexture = currentFrame.mTexture;
				this.mOffsetX = currentFrame.mOffsetX;
				this.mOffsetY = currentFrame.mOffsetY;
			}
		}
	};
}
