// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Spine skeleton attachments
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Slot');

goog.require('ss2d.Sprite');

/**
 * @constructor
 * @extends {ss2d.Sprite}
 * @param {ss2d.Bone} masterBone The master bone of this "slave" slot.
 * @param {number=} x Position in x axis 
 * @param {number=} y Position in y axis
 * @param {number} width The width
 * @param {number} height The height
 * @param {string|ss2d.Texture} texture The name or reference of a texture file or the name of a frame in a texture atlas.
 * @param {string|ss2d.TextureAtlas=} textureAtlas The name or reference of a texture atlas file.
 */
ss2d.Slot = function(masterBone, x, y, w, h, texture, textureAtlas)
{
	ss2d.Sprite.call(this, x, y, w, h, texture, textureAtlas)
	this.mBone = masterBone;
	this.mAuxBoneMatrix = new ss2d.Matrix3();
};

goog.inherits(ss2d.Slot, ss2d.Sprite)

/** 
 * Fakes the world transformation matrix to have it's Bone as parent.
 * @override
 */
ss2d.Slot.prototype.getWorldTransformationMatrix = function(targetMatrix, upToParent, includeHimself)
{
	var trueParent = this.mParent;
	this.mParent = this.mBone;
	var worldMatrix = ss2d.DisplayObject.prototype.getWorldTransformationMatrix.call(this, targetMatrix, upToParent, includeHimself);
	this.mParent = trueParent;
	return worldMatrix;
};

/** @override */
ss2d.Slot.prototype.render = function(support)
{
	this.mAuxBoneMatrix.identity();
	this.mBone.getWorldTransformationMatrix(this.mAuxBoneMatrix, this.mParent.mParent, true);
	support.pushTransform(this.mAuxBoneMatrix);
	ss2d.Sprite.prototype.render.call(this, support);
	support.popTransform();
};

