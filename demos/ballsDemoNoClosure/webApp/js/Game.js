// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Simple game launcher
 * @author David Gallardo Moreno (portalg@gmail.com)
 */
var sand = sand||{};

//create a instance of the main scene with your game logic.
var mainScene =  new sand.MainScene;

//create a instance of a ss2d.View indicating the canvas id, the main scene object, and optional parameters.
sand.Game = new ss2d.View('mainScene', mainScene, window.innerWidth, window.innerHeight);

/** 
 * A resizeCanvas callback is provided, in this cases the canvas is resized to fit the window size.
 * @this {ss2d.View} 
 */
sand.Game.resizeCanvas = function(cw, ch)
{
	this.mCanvas.width = window.innerWidth;
	this.mCanvas.height = window.innerHeight;
};

//init your secene, the initialization is done here because in our scene we need some ss2d.View properties.
//so whe need to instance a View before initialize the content of our scene.
mainScene.init();

//this starts an infinte loop at 60 frames per second by default.
sand.Game.startLoop();
