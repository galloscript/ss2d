// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A utility class for load and track resources
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ResourceLoader');

goog.require('ss2d.Texture');
goog.require('ss2d.HTML5Audio');
goog.require('ss2d.WebAudio');

/** 
 * @class 
 * @static 
 */
ss2d.ResourceLoader = {};

/** @type {Object} */
ss2d.ResourceLoader.LOADED_RESOURCES = {};

/** @type {number} */
ss2d.ResourceLoader.ELEMENTS_TO_LOAD = 0;

/** @type {number} */
ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD = 0;

/** @type {function} */
ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = function(){};

/** @type {function} */
ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = function(){};

/** @type {function} */
ss2d.ResourceLoader.ACTIVE_LOADER = function(res){ console.debug('No active loader for: ',res); };

/** @type {ss2d.IAudioComponent} */
ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if(typeof webkitAudioContext != 'undefined' || typeof AudioContext != 'undefined')
{
	ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio;
}

/**
 * Load resources of the specified types
 * 
 * <pre>
 * example of use:
 * sample.App = new sample.Game();
 * ss2d.ResourceLoader.loadResources(
 * [
 *    ss2d.ResourceLoader.Types.TEXTURE,  //next elements will be loaded as textures
 *   'textures/ball01.png',
 *   'textures/ball02.png',
 *    ss2d.ResourceLoader.Types.SOUND,  //next elements will be loaded as sounds
 *   'sounds/clink.wav',
 *   'sounds/pom.wav',
 *   'sounds/door.wav',
 *    sample.CustomTypeLoaderFunction,  //next elements will be loaded as a custom type
 *   'customAssets/customAsset01.json
 * ],
 * //For each element loaded callback
 * function(resourceName, numLoaded, totalToLoad)  
 * {
 *   console.log(resourceName+' '+numLoaded+'/'+totalToLoad);
 * },
 * //Resource loading ends callback
 * function()  
 * {
 *   sample.App.initScene();
 *   sample.App.run();
 * });
 * </pre>
 * @param {(string|Array)} resources Resource name or list of resource loaders plus resource names to load.
 * @param {function(string, number, number)} oneElementLoadedCallback Called for each loaded resource with the element name,
 * 																		  the number of loaded elements, and the total elements to load.
 * @param {function} elementsLoadedCallback  Called once all resources are loaded.
 */
ss2d.ResourceLoader.loadResources = function(resources, oneElementLoadedCallback, elementsLoadedCallback)
{
	if(resources instanceof Array)
	{
		ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = elementsLoadedCallback || function(){};
		ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = oneElementLoadedCallback || function(){};
		ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD = 0;
		
		var loaderKeys = 0;
		
		for(resKey in resources)
		{
			if(typeof resources[resKey] == 'function')
			{
				++loaderKeys;
			}
		}
		
		ss2d.ResourceLoader.ELEMENTS_TO_LOAD = resources.length - loaderKeys;
		
		for(resKey in resources)
		{
			var resName = resources[resKey];
			if(typeof resName == 'function')
			{
				ss2d.ResourceLoader.ACTIVE_LOADER = resName;
			}
			else
			{
				ss2d.ResourceLoader.ACTIVE_LOADER(resName, ss2d.ResourceLoader.loadEndsCallback);
			}
		}
		ss2d.ResourceLoader.ACTIVE_LOADER = function(res){ console.debug('No active loader for: ',res); };
	}
}

/**
 * @param {string} textureName
 * @param {function} textureLoadedCallback
 */
ss2d.ResourceLoader.loadTexture = function(textureName, textureLoadedCallback)
{
	var lrArray = ss2d.ResourceLoader.LOADED_RESOURCES;
	if(!lrArray[textureName+'.texture'])
	{	
		lrArray[textureName+'.texture'] = new ss2d.Texture(textureName, textureLoadedCallback);
	}
	
	return lrArray[textureName+'.texture'];
}




/**
 * @param {string} soudName
 * @param {function} soundLoadedCallback
 */
ss2d.ResourceLoader.loadSound = function(soudName, soundLoadedCallback)
{
	var lrArray = ss2d.ResourceLoader.LOADED_RESOURCES;
	if(!lrArray[soudName+'.sound'])
	{	
		lrArray[soudName+'.sound'] = new ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS(soudName, soundLoadedCallback);
	}
	
	return lrArray[soudName+'.sound'];
}

/**
 * @param {string} jsonFileName
 * @param {function} jsonLoadedCallback
 */
ss2d.ResourceLoader.loadJSON = function(jsonFileName, jsonLoadedCallback)
{
	//TODO: implement
}

/**
 * @param {string} xmlFileName
 * @param {function} xmlLoadedCallback
 */
ss2d.ResourceLoader.loadXML = function(xmlFileName, xmlLoadedCallback)
{
	//TODO: implement
}

/**
 * Called by loadResources every time a resource is loaded
 * @param {Object} resource
 */
ss2d.ResourceLoader.loadEndsCallback = function(resource)
{
	++ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD;
	
	ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK(resource.mName, ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceLoader.ELEMENTS_TO_LOAD);
	
	if(ss2d.ResourceLoader.ELEMENTS_TO_LOAD == ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD)
	{
		console.log('Load resources ends');
		ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK.call();
		
		ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = function(){};
		ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = function(){};
	}
}

/**
 * Enumeration for loader functions
 * @enum {number}
 */
ss2d.ResourceLoader.Types = {
	TEXTURE: ss2d.ResourceLoader.loadTexture,
	SOUND: ss2d.ResourceLoader.loadSound,
	JSON: ss2d.ResourceLoader.loadJSON,
	XML: ss2d.ResourceLoader.loadXML
};



