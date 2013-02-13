
goog.provide('sand.UserAvatar');

goog.require('ss2d.Defines');
goog.require('ss2d.Quad');

/** @constructor */
sand.UserAvatar = function(connection)
{
	//TODO: take connection information
	ss2d.Quad.call(this, 0, 0, 5, 5, 0xffffff);
	
	this.mConnection = connection || null;
	this.mUserName = '';
}

goog.inherits(sand.UserAvatar, ss2d.Quad);

//static
ss2d.Object.assignClassId(sand.UserAvatar, 3003);

sand.UserAvatar.createFromSerializedObject = function(obj)
{
	var newObj = new sand.UserAvatar();
	newObj.mObjectId = obj['doid'];
	return newObj;
}

sand.UserAvatar.prototype.interpolateState = function(prevState, nextState, part)
{
	this.mLocation.mX = prevState['x'] + (nextState['x'] - prevState['x']) * part;
	this.mLocation.mY = prevState['y'] + (nextState['y'] - prevState['y']) * part;
	this.mUserName = nextState['uname'];
}

if(COMPILING_CLIENT) //client only function
{
	sand.UserAvatar.prototype.render = function(renderSupport)
	{
		renderSupport.pushTransform(this);
		var ctx = renderSupport.mContext;
		ctx.fillStyle = this.mColor.getHexString();
		ctx.fillRect(0, 0, this.mWidth, this.mHeight);
		ctx.font = "normal 12px Verdana";
		ctx.fillText(this.mUserName, -5, -10);
		renderSupport.popTransform(); 
	}
}

if(COMPILING_SERVER) //server only functions
{
	sand.UserAvatar.prototype.hitTestPoint = function(point)
	{
		var localPoint = new ss2d.Point(this.mLocation.mX, this.mLocation.mY);
		var distance = ss2d.Point.distanceBetweenPoints(localPoint, this.worldToLocal(point));
		delete localPoint;
		return (distance <= this.mRadius)?this:null;
	}
	
	sand.UserAvatar.prototype.tick = function(deltaTime)
	{ 
		this.mLocation.mX = this.mConnection.mInput.mMouseX;
		this.mLocation.mY = this.mConnection.mInput.mMouseY;
	}
}

sand.UserAvatar.prototype.toJSON = function()
{
	return '{'+this.getPropertiesJSON()+'}';
}

/**
 * SERIALIZATION
 * custom
 */
sand.UserAvatar.prototype.getPropertiesJSON = function()
{		
	var str = '"cid":'+this.CLASS_ID+',';
	str += '"doid":'+this.mObjectId+',';
	str += '"x":'+Math.floor(this.mLocation.mX)+',';
	str += '"y":'+Math.floor(this.mLocation.mY)+',';
	str += '"uname":"'+this.mUserName+'"';
	
	return str;
}
