// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for texture atlas files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.TextureAtlasLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.TextureAtlas');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.TextureAtlasLoader = {};

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.TextureAtlasLoader.RESOURCE_EXTENSION = 'atlas';

/**
 * Load the texture
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @param {Object} callbackTarget
 * @return {ss2d.TextureAtlas} The loaded texture
 */
ss2d.TextureAtlasLoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget)
{
	return new ss2d.TextureAtlas(resourceFileName, resourceLoadedCallback, callbackTarget);
};
