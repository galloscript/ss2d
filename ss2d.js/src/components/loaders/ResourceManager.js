// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A utility class for load and track resources
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ResourceManager');

goog.require('ss2d.TextureLoader');
goog.require('ss2d.TextureAtlasLoader');
goog.require('ss2d.AudioLoader');

/** 
 * @class 
 * @static 
 */
ss2d.ResourceManager = {};

/** @type {Object} */
ss2d.ResourceManager.LOADED_RESOURCES = {};

/** @type {number} */
ss2d.ResourceManager.ELEMENTS_TO_LOAD = 0;

/** @type {number} */
ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;

/** @type {function} */
ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function(){};

/** @type {function} */
ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function(){};

/** @type {function} */
ss2d.ResourceManager.ACTIVE_LOADER = function(res){ throw 'No active loader for: '+res; };

/**
 * Enumeration for loader functions
 * @enum {Object}
 */
ss2d.ResourceManager.Loaders = {
	TEXTURE: ss2d.TextureLoader,
	SOUND: ss2d.AudioLoader,
	TEXTURE_ATLAS: ss2d.TextureAtlasLoader
};

/**
 * Load resources of the specified types
 * 
 * <pre>
 * example of use:
 * sample.App = new sample.Game();
 * ss2d.ResourceManager.loadResources(
 * [
 *    ss2d.ResourceManager.Loaders.TEXTURE,  //next elements will be loaded as textures
 *   'textures/ball01.png',
 *   'textures/ball02.png',
 *    ss2d.ResourceManager.Loaders.SOUND,  //next elements will be loaded as sounds
 *   'sounds/clink.wav',
 *   'sounds/pom.wav',
 *   'sounds/door.wav',
 *    sample.CustomLoadr,  //next elements will be loaded as a custom type
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
 * @param {(Array)} resources List of resource loaders plus resource names to load.
 * @param {function(string, number, number)} oneElementLoadedCallback Called for each loaded resource with the element name,
 * 																		  the number of loaded elements, and the total elements to load.
 * @param {function} elementsLoadedCallback  Called once all resources are loaded.
 */
ss2d.ResourceManager.loadResources = function(resources, oneElementLoadedCallback, elementsLoadedCallback)
{
	if(resources instanceof Array)
	{
		ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = elementsLoadedCallback || function(){};
		ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = oneElementLoadedCallback || function(){};
		ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;
		
		var loaderKeys = 0;
		
		for(resKey in resources)
		{
			if(typeof resources[resKey] == 'object')
			{
				++loaderKeys;
			}
		}
		
		ss2d.ResourceManager.ELEMENTS_TO_LOAD = resources.length - loaderKeys;
		
		for(resKey in resources)
		{
			var resName = resources[resKey];
			if(typeof resName == 'object')
			{
				ss2d.ResourceManager.ACTIVE_LOADER = resName;
			}
			else
			{
				ss2d.ResourceManager.loadResourceWithLoader(ss2d.ResourceManager.ACTIVE_LOADER, 
															resName, 
															ss2d.ResourceManager.loadEndsCallback);
			}
		}
		ss2d.ResourceManager.ACTIVE_LOADER = function(res){ throw 'No active loader for: '+res; };
	}
}

/**
 * Loads a resource with the specified loader.
 * @param {ss2d.ILoader} loader The static class that loads this resource
 * @param {string} name Resource file name
 * @param {function=} loadedCallback
 */
ss2d.ResourceManager.loadResourceWithLoader = function(loaderClass, resourceName, loadedCallback)
{
	var lrArray = ss2d.ResourceManager.LOADED_RESOURCES;
	var resHash = resourceName+'.'+loaderClass.RESOURCE_EXTENSION;
	if(!lrArray[resHash])
	{	
		lrArray[resHash] = loaderClass.loadResource(resourceName, loadedCallback);
	}
	
	return lrArray[resHash];
}

/**
 * Called by loadResources every time a resource is loaded
 * @param {Object} resource
 */
ss2d.ResourceManager.loadEndsCallback = function(resource)
{
	++ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD;
	
	ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK(resource.mName, ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceManager.ELEMENTS_TO_LOAD);
	
	if(ss2d.ResourceManager.ELEMENTS_TO_LOAD == ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD)
	{
		console.log('Load resources ends');
		ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK.call();
		
		ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function(){};
		ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function(){};
	}
}

//Built-in loaders

/**
 * @param {string} textureName
 * @param {function} textureLoadedCallback
 */
ss2d.ResourceManager.loadTexture = function(textureName, textureLoadedCallback)
{	
	return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureLoader, textureName, textureLoadedCallback);
}

/**
 * @param {string} textureName
 * @param {function} textureLoadedCallback
 */
ss2d.ResourceManager.loadTextureAtlas = function(atlasName, textureLoadedCallback)
{
	return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureAtlasLoader, atlasName, textureLoadedCallback);
}

/**
 * @param {string} soudName
 * @param {function} soundLoadedCallback
 */
ss2d.ResourceManager.loadSound = function(soudName, soundLoadedCallback)
{	
	return ss2d.ResourceManager.loadResourceWithLoader(ss2d.AudioLoader, soudName, soundLoadedCallback);
}





