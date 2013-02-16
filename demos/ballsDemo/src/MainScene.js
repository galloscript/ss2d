// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Main scene of this game
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('sand.MainScene');

goog.require('ss2d.View');
goog.require('ss2d.DisplayObjectContainer');
goog.require('sand.Ball');

/** @constructor */
sand.MainScene = function()
{
	ss2d.DisplayObjectContainer.call(this);
}

goog.inherits(sand.MainScene, ss2d.DisplayObjectContainer);

sand.MainScene.prototype.init = function()
{
	//create 100 balls	
	var c=100;
	while(c--)
	{
		var newBall = new sand.Ball(0.5*ss2d.CURRENT_VIEW.mCanvas.width + Math.random()*10, //x = half of the canvas width with a variation of 0 to 10 pixels
									0.5*ss2d.CURRENT_VIEW.mCanvas.height + Math.random()*10, //y = half of the canvas height with a variation of 0 to 10 pixels
									Math.max(Math.random()*13, 10.0), //radius between 10 and 13
									'#'+Math.floor(Math.max(Math.random(), 0.2)*16777215).toString(16)); //random color
									
		//add object to the scene
		this.addObject(newBall);  
	}
	
	this.mTouchedObject = null;
	
	//put a help text, this type of anonymous object only works on client side scene.
	var helpText = new ss2d.DisplayObject();
	helpText.tick = function(deltaTime)
	{
		this.mLocation.mX = 5;
		this.mLocation.mY = window.innerHeight - 10;
	}
	helpText.render = function(support)
	{
		support.mContext.font      = "normal 14px Verdana";
		support.mContext.fillStyle = "#FFFFFF";
		support.mContext.fillText("Press shift to invert cursor force", this.mLocation.mX, this.mLocation.mY);
	}
	
	//add the text
	this.addObject(helpText);
	
	ss2d.CURRENT_VIEW.mHaveFocus = true;
}

sand.MainScene.prototype.tick = function(deltaTime)
{
	//player input reference
	var input = ss2d.CURRENT_VIEW.mInput;
	
	//firstly restore the picked state of the currently picked object to false (will be restored if is still picked)
	if(this.mTouchedObject)
	{ 
		this.mTouchedObject.mPicked = false; 
	}
	
	if(input.mMouseDown && !input.mPreviousMouseDown)  
    {  
        //test if some object is touched  
        this.mTouchedObject = this.hitTestPoint(input.mMousePoint);  
          
        //if not, create one  
        if(!this.mTouchedObject)  
        {  
            this.addObject(new sand.Ball(input.mMouseX - 3*Math.random() + 3*Math.random(), //x = mouseX with a variation of -3 to 3 pixels
            							 input.mMouseY - 3*Math.random() + 3*Math.random(), //y = mouseY with a variation of -3 to 3 pixels
            							 Math.max(Math.random()*13,10.0), //random radius from 13 to  
            							 '#'+Math.floor(Math.max(Math.random(), 0.2)*16777215).toString(16)));  //random color
        }
    }
    
    //move the picked object
    if(input.mMouseDown && input.mPreviousMouseDown && this.mTouchedObject)  
    {
		var addPosition = ss2d.Point.subtractPoints(input.mPreviousMousePoint, input.mMousePoint);
    	this.mTouchedObject.mLocation.mX += addPosition.mX;
    	this.mTouchedObject.mLocation.mY += addPosition.mY;
		this.mTouchedObject.mPicked = true; 
    }
	
	//update all children, this call must be added in all ss2d.DisplayObjectContainer tick overrides
    this.tickChildren(deltaTime);
}

