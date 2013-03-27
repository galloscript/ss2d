// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Loader for audio files.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.AudioLoader');

goog.require('ss2d.ILoader');
goog.require('ss2d.Texture');

/**
 * @constructor
 * @implements ss2d.ILoader
 * @static
 */
ss2d.AudioLoader = {};


/** @type {ss2d.IAudioComponent} */
ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if(typeof webkitAudioContext != 'undefined' || typeof AudioContext != 'undefined')
{
	ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio;
}

/**
 * The extension used in ResourceManager class.
 * @static
 * @type {string}
 */
ss2d.AudioLoader.RESOURCE_EXTENSION = 'sound';

/**
 * Load the audio file
 * @param {string} resourceFileName
 * @param {function} resourceLoadedCallback
 * @param {Object} callbackTarget
 * @return {ss2d.Texture} The loaded texture
 */
ss2d.AudioLoader.loadResource = function(resourceFileName, resourceLoadedCallback, callbackTarget)
{
	return new ss2d.AudioLoader.AUDIO_COMPONENT_CLASS(resourceFileName, resourceLoadedCallback, callbackTarget);
};
