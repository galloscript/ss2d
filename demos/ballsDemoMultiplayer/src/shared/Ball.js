
goog.provide('sand.Ball');

goog.require('ss2d.Defines');
goog.require('ss2d.Quad');
goog.require('ss2d.Input');

/** @constructor */
sand.Ball = function(x, y, radius, color)
{
	ss2d.Quad.call(this, x, y, radius*2, radius*2, color);
	this.mRadius = radius;
	this.mPivotX = this.mPivotY = radius;
}

goog.inherits(sand.Ball, ss2d.Quad);

//static
ss2d.Object.assignClassId(sand.Ball, 3001);

sand.Ball.createFromSerializedObject = function(obj)
{
	var newBall = new sand.Ball(obj['x'], obj['y'], obj['rd'], obj['c']);
	newBall.mObjectId = obj['doid'];
	return newBall;
}

sand.Ball.prototype.interpolateState = function(prevState, nextState, part)
{
	this.mLocation.mX = prevState['x'] + (nextState['x'] - prevState['x']) * part;
	this.mLocation.mY = prevState['y'] + (nextState['y'] - prevState['y']) * part;
	this.mPivotX = this.mPivotY = this.mRadius = prevState['rd'] + (nextState['rd'] - prevState['rd']) * part;
	var ca = ss2d.Color.interpolate(prevState['c'], nextState['c'], part).getRGBArray();
	this.mColor.setRGB(ca[0],ca[1],ca[2]);
}

sand.Ball.prototype.restoreSerializedProperties = function(objBackup)
{
}

if(COMPILING_CLIENT) //client only function
{
	sand.Ball.prototype.render = function(renderSupport)
	{
		renderSupport.pushTransform(this);
		var ctx = renderSupport.mContext;
		ctx.fillStyle=this.mColor.getHexString();
		ctx.beginPath();
		ctx.arc(this.mRadius, this.mRadius, this.mRadius, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		
		
		renderSupport.popTransform();
	}
}

sand.Ball.prototype.getWidth = function(){ return ball.mRadius * 2 * this.mScaleX; };
sand.Ball.prototype.getHeight = function(){ return ball.mRadius * 2 * this.mScaleY; }; 

if(COMPILING_SERVER) //server only functions
{	
	sand.Ball.prototype.hitTestPoint = function(point)
	{
		var localPoint = new ss2d.Point(this.mLocation.mX, this.mLocation.mY);
		var distance = ss2d.Point.distanceBetweenPoints(localPoint, this.worldToLocal(point));
		delete localPoint;
		return (distance <= this.mRadius)?this:null;
	}
	
	sand.Ball.prototype.tick = function(deltaTime)
	{ 
		var connections = ss2d.CURRENT_VIEW.mComunication.mUserConnections;
		
		for(var ic = 0; ic < connections.length; ++ic)
		{
			var input = connections[ic].mInput;
			
			//unnormalized direction produce an acceleration effect
			var direction = ss2d.Point.subtractPoints(this.mLocation, this.worldToLocal(input.mMousePoint));
			var distance = direction.length();
	
			//if shift is pressed the mouse attract balls, if no, repeal.
			var modifier = (input.isKeyPressed(ss2d.Input.Keys.SHIFT))?1:-1;
			this.mLocation.mX += Math.max(0.0, 100 - distance)*direction.mX*deltaTime*0.2*modifier;
			this.mLocation.mY += Math.max(0.0, 100 - distance)*direction.mY*deltaTime*0.2*modifier;
		}
		
		//Limit the movement to canvas bounds.
		this.mLocation.mX = Math.max(Math.min(this.mLocation.mX, sand.Config.CANVAS_WIDTH - this.mRadius),this.mRadius);
		this.mLocation.mY = Math.max(Math.min(this.mLocation.mY, sand.Config.CANVAS_HEIGHT - this.mRadius),this.mRadius);
		
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
}

sand.Ball.prototype.toJSON = function()
{
	return '{'+this.getPropertiesJSON()+'}';
}

/**
 * SERIALIZATION
 * custom
 */
sand.Ball.prototype.getPropertiesJSON = function()
{		
	var str = '"cid":'+this.CLASS_ID+',';
	str += '"doid":'+this.mObjectId+',';
	str += '"x":'+Math.floor(this.mLocation.mX*1000.0)/1000.0+',';
	str += '"y":'+Math.floor(this.mLocation.mY*1000.0)/1000.0+',';
	str += '"rd":'+this.mRadius+',';
	str += '"c":'+JSON.stringify(this.mColor.getRGBArray());
	
	return str;
}
