// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for texture files
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.TextureLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.Texture');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.TextureLoader = {};

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.TextureLoader.RESOURCE_EXTENSION = 'texture';

/**
 * Load the texture
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @return {ss2d.Texture} The loaded texture
 */
ss2d.TextureLoader.loadResource = function(resourceFileName, resourceLoadedCallback)
{
	return new ss2d.Texture(resourceFileName, resourceLoadedCallback);
};
