// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Global definitions.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d');

goog.require('ss2d.WebAudio');

/** 
 * SmoothStep2D namespace.
 * @class
 * @static 
 */
var ss2d = ss2d||{};

/** 
 * The active ss2d.View, ss2d.ClientView or ss2d.ServerView
 * @type {ss2d.ClientView|ss2d.ClientView|ss2d.ServerView} 
 */
ss2d.CURRENT_VIEW = null;

/** 
 * WebAudio Context
 * @type {AudioContext|webkitAudioContext} 
 */
ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
