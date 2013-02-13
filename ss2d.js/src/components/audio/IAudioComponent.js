// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview This class provides a basic interface to load, play, pause and stop audio files.
 * It's not finished yet, and probably needs another interface that represents a sound source.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.IAudioComponent');

/**
 * @class Defines a class interface for an audio component.
 * @interface
 * @param {string} soundFile The name of a file with audio data.
 * @param {function} callbackFunction Function that will be called once sound file is loaded
 */
ss2d.IAudioComponent = function(soundFile, callbackFunction){};

/**
 * Play the sound.
 * @return {Object} a reference to the audio source.
 */
ss2d.IAudioComponent.prototype.play = function(){};

/**
 * Pause the sound.
 */
ss2d.IAudioComponent.prototype.pause = function(){}; 

/**
 * Stop and rewind the sound.
 */
ss2d.IAudioComponent.prototype.stop = function(){};