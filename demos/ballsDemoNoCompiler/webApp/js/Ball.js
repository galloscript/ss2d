// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview A ball that interacts with mouse and other balls.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

var sand = sand||{};

/** @constructor */
sand.Ball = function(x, y, radius, color)
{
	ss2d.Quad.call(this, x, y, radius*2, radius*2, color);
	this.mRadius = radius;
	this.mPicked = false;
	this.mPivotX = this.mPivotY = radius;
}

goog.inherits(sand.Ball, ss2d.Quad);

//assign unique class id, ss2d class ids starts with 1000
ss2d.Object.assignClassId(sand.Ball, 3001);

//custom hit test, not used in this sample
sand.Ball.prototype.hitTestPoint = function(point)
{
	var distance = ss2d.Point.distanceBetweenPoints(this.mLocation, this.worldToLocal(point));
	return (distance <= this.mRadius)?this:null;
}

sand.Ball.prototype.getWidth = function(){ return ball.mRadius * 2 * this.mScaleX; };
sand.Ball.prototype.getHeight = function(){ return ball.mRadius * 2 * this.mScaleY; }; 

//render a ball
sand.Ball.prototype.render = function(renderSupport)
{
	renderSupport.pushTransform(this);
	var ctx = renderSupport.mContext;
	ctx.beginPath();
	ctx.fillStyle=this.mColor.getHexString();
	ctx.arc(this.mRadius, this.mRadius, this.mRadius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	renderSupport.popTransform();
}

//interact with mouse and other balls in the scene.
sand.Ball.prototype.tick = function(deltaTime)
{
	//if the ball isn't picked
	if(!this.mPicked)
	{
		//unnormalized direction produce an acceleration effect
		var direction = ss2d.Point.subtractPoints(this.mLocation, this.worldToLocal(ss2d.CURRENT_VIEW.mInput.mMousePoint));
		var distance = direction.length();
		var normal = direction.normalize();
		
		//if shift is pressed the mouse attract balls, if no, repeal.
		var modifier = (ss2d.CURRENT_VIEW.mInput.isKeyPressed(ss2d.Input.Keys.SHIFT))?1:-1;
		this.mLocation.mX += Math.max(0.0, 100 - distance)*direction.mX*deltaTime*0.2*modifier;
		this.mLocation.mY += Math.max(0.0, 100 - distance)*direction.mY*deltaTime*0.2*modifier;
		
		//Limit the movement to canvas bounds.
		this.mLocation.mX = Math.max(Math.min(this.mLocation.mX, ss2d.CURRENT_VIEW.mCanvas.width - this.mRadius),this.mRadius);
		this.mLocation.mY = Math.max(Math.min(this.mLocation.mY, ss2d.CURRENT_VIEW.mCanvas.height - this.mRadius),this.mRadius);
	
		//Check if this ball touch others.
		var brothers = this.mParent.mChildren;
		for(var i = brothers.indexOf(this); i<brothers.length; ++i)
		{
			var brother = brothers[i];
			if(brother instanceof sand.Ball)
			{
				var bdir = ss2d.Point.subtractPoints(this.mLocation, brother.mLocation);
				var bdis = bdir.length()+0.1;
				this.mLocation.mX += -Math.max(0.0, brother.mRadius+this.mRadius - bdis)*bdir.mX*deltaTime;
				this.mLocation.mY += -Math.max(0.0, brother.mRadius+this.mRadius - bdis)*bdir.mY*deltaTime;
				brother.mLocation.mX += Math.max(0.0, brother.mRadius+this.mRadius - bdis)*bdir.mX*deltaTime;
				brother.mLocation.mY += Math.max(0.0, brother.mRadius+this.mRadius - bdis)*bdir.mY*deltaTime;
			}
		}
	}
};
