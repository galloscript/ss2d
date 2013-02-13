// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Collection of ss2d.Reel objects. (NOT IMPLEMENTED YET)
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ReelSet');

goog.require('ss2d.Reel');

/**
 * @constructor
 * @param {Array.<ss2d.Reel>} rsFileName
 */
ss2d.ReelSet = function(rsFileName, callbackFunction)
{
	this.mCallbackFunction = callbackFunction;
	
	//Reels are stored in an object by name.
	this.mReels = (rsFileName)?this.loadFromFile(rsFileName):{};
};

/**
 * 
 * @param {Object} rsFileName
 */
ss2d.ReelSet.prototype.loadFromFile = function(rsFileName)
{
	//TODO: implement a file specification for sprite animations
	
	this.mCallbackFunction.call(this);
	return {};
};
