// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for texture atlas files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.SkeletalAnimationLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.SkeletalAnimation');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.SkeletalAnimationLoader = {};

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.SkeletalAnimationLoader.RESOURCE_EXTENSION = 'sklanim';

/**
 * Load the texture
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @param {Object} callbackTarget
 * @return {ss2d.Skeleton}
 */
ss2d.SkeletalAnimationLoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget)
{
	return new ss2d.SkeletalAnimation(resourceFileName, resourceLoadedCallback, callbackTarget);
};
