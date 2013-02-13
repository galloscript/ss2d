// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Collection of transition functions. Used by ss2d.Tween class.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Transitions');

/** 
 * @class
 * @static 
 */
ss2d.Transitions = {};

ss2d.Transitions.linear = function(ratio)
{
	return ratio;
};

ss2d.Transitions.easeIn = function(ratio)
{
	return ratio * ratio * ratio;
};

ss2d.Transitions.easeOut = function(ratio)
{
	var invRatio = ratio - 1.0;
	return invRatio * invRatio * invRatio + 1.0;
};

ss2d.Transitions.easeInOut = function(ratio)
{
	if (ratio < 0.5) return 0.5 * ss2d.Transitions.easeIn(ratio*2.0);
	else             return 0.5 * ss2d.Transitions.easeOut((ratio-0.5)*2.0) + 0.5;
};

ss2d.Transitions.easeOutIn = function(ratio)
{
    if (ratio < 0.5) return 0.5 * ss2d.Transitions.easeOut(ratio*2.0);
    else             return 0.5 * ss2d.Transitions.easeIn((ratio-0.5)*2.0) + 0.5;
};


