// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A particle system created with Particle Designer
 * @see http://www.71squared.com/en/particledesigner
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ParticleSystem');

goog.require('ss2d.Texture');

/**
 * @constructor
 * @param {string} systemXMLFile The resource name
 * @param {function} callbackFunction Called when the ParticleSystem is loaded
 * @param {Object} callbackTarget
 */
ss2d.ParticleSystem = function(systemXMLFile, callbackFunction, callbackTarget)
{
	this.mName = systemXMLFile;
	this.mCallbackFunction = callbackFunction;
	this.mCallbackTarget = callbackTarget;
	this.mSystemDescriptor = null;
	this.mTexture = null; 
	
	var rqst = new XMLHttpRequest();
	rqst.mSystem = this;
	rqst.open("GET", systemXMLFile, true);
	rqst.responseType = "text";
	rqst.onload = function() 
	{
		this.mSystem.loaded(this.response);
	};
	
	rqst.send();
};

/**
 * @param {string} fileData
 */
ss2d.ParticleSystem.prototype.loaded = function(fileData)
{
	this.mSystemDescriptor = (new XML.ObjTree()).parseXML(fileData)['particleEmitterConfig'];	
	var pathEnd = this.mName.lastIndexOf('/') + 1;
	var img = this.mSystemDescriptor['texture']['-name'];
	var texturePath = (pathEnd > 0)?this.mName.substring(0, pathEnd)+img:img;
	
	this.mTexture = ss2d.ResourceManager.loadTexture(texturePath, this.textureLoaded, this);
};

ss2d.ParticleSystem.prototype.textureLoaded = function(texture)
{
	this.mTexture = texture;
	if(this.mCallbackFunction)
		this.mCallbackFunction.call(this.mCallbackTarget, this);
	
};
