// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Interface for loaders
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ILoader');

/**
 * @constructor
 * @interface
 * @static
 */
ss2d.ILoader = {};

/**
 * The extensión used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.ILoader.RESOURCE_EXTENSION = '';

/**
 * Load the resource and returns a component.
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @param {Object} callbackTarget
 * @return {Object} The loaded component
 */
ss2d.ILoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget){};
