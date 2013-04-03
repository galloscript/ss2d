// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Particle element for ss2.ParticleEmitter
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Particle');

goog.require('ss2d.Point');

ss2d.Particle = function()
{
	this.mPosition = new ss2d.Point();
	this.mDirection = new ss2d.Point();
    this.mStartPos = new ss2d.Point();
	this.mColor = [1.0, 1.0, 1.0, 1.0];
	this.mDeltaColor = [0.0, 0.0, 0.0, 1.0];
    this.mRotation = 0;
    this.mRotationDelta = 0;
    this.mRadialAcceleration = 0;
    this.mTangentialAcceleration = 0;
	this.mRadius = 1;
	this.mRadiusDelta = 0;
	this.mAngle = 0;
	this.mDegreesPerSecond = 0;
	this.mParticleSize = 1;
	this.mParticleSizeDelta  = 1;
	this.mTimeToLive  = 1;
	this.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime;
};

ss2d.Particle.SRUCT_SIZE = 26;

ss2d.Particle.prototype.getArray = function(target)
{
	target = target||[];
	target.splice(0, target.length);
	target.push(	
		this.mPosition.mX, this.mPosition.mY, this.mDirection.mX, this.mDirection.mY, 				//aPos_Dir
		this.mStartPos.mX, this.mStartPos.mY,														//aStartPos
		this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3],								//aColor
		this.mDeltaColor[0], this.mDeltaColor[1], this.mDeltaColor[2], this.mDeltaColor[3],			//aDeltaColor
		this.mRotation, this.mRotationDelta, this.mRadialAcceleration, this.mTangentialAcceleration,//aRo_RoD_RaA_TaA
		this.mRadius, this.mRadiusDelta, this.mAngle, this.mDegreesPerSecond,						//aRa_RaD_A_DPS
		this.mParticleSize, this.mParticleSizeDelta, this.mTimeToLive, this.mTimeStamp				//aPS_PSD_T_TS
	);
	
	return target;
};
