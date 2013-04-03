// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for particle system files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ParticleSystemLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.ParticleSystem');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.ParticleSystemLoader = {};

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.ParticleSystemLoader.RESOURCE_EXTENSION = 'particle';

/**
 * Load the texture
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @param {Object} callbackTarget
 * @return {ss2d.ParticleSystem} The loaded particle system
 */
ss2d.ParticleSystemLoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget)
{
	return new ss2d.ParticleSystem(resourceFileName, resourceLoadedCallback, callbackTarget);
};