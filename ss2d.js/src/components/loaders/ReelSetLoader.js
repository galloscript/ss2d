// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for texture atlas files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelSetLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.ReelSet');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.ReelSetLoader = {};

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.ReelSetLoader.RESOURCE_EXTENSION = 'reelset';

/**
 * Load the texture
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @return {ss2d.TextureAtlas} The loaded texture
 */
ss2d.ReelSetLoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget)
{
	return new ss2d.ReelSet(resourceFileName, resourceLoadedCallback, callbackTarget);
};
