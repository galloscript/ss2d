// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Defines used by the compiler
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Defines');

/**  
 * String flag used to tell the compiler exclude code that is not 
 * related to the render context specified.
 * <pre>
 * Possible values:
 * '2d'
 * 'webgl'
 * <pre> 
 * @define {string}
 */
var RENDER_CONTEXT = '2d';

/** 
 * Boolean flag used to tell the compiler include client side related code.
 * @define {boolean} 
 */
var COMPILING_CLIENT = false;

/** 
 * Boolean flag used to tell the compiler include server side related code.
 * @define {boolean} 
 */
var COMPILING_SERVER = false;

/** 
 * Boolean flag used to tell the compiler include code that is usually for both client 
 * applications and single player applications side related code.
 * @define {boolean} 
 */
var COMPILING_OFFLINE = true;

/** 
 * Boolean flag used to include or strip code for ADVANCED compilation mode (obfuscated).
 * @define {boolean} 
 */
var COMPILING_ADVANCE = false;