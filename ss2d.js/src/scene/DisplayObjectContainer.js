// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview An ss2d.DisplayObject that can contain other objects of the same type.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.DisplayObjectContainer');

goog.require('ss2d.DisplayObject');
goog.require('ss2d.ResourceManager');

/**
 * @constructor
 * @extends {ss2d.DisplayObject}
 * @param {number=} x
 * @param {number=} y
 * @param {number=} scale
 * @param {number=} rotation
 * @property {*} inherited @see ss2d.DisplayObject
 * @property {ss2d.DisplayObject[]} mChildren List of ss2d.DisplayObject children.
 */
ss2d.DisplayObjectContainer = function(x, y, scale, rotation)
{
	ss2d.DisplayObject.call(this, x, y, scale, rotation);
	this.mChildren = [];
	
	if(COMPILING_SERVER)
	{
		this.mRemovedObjectsIds = [];
	}
};

goog.inherits(ss2d.DisplayObjectContainer, ss2d.DisplayObject);

ss2d.Object.assignClassId(ss2d.DisplayObjectContainer, 1002);


/** @override */
ss2d.DisplayObjectContainer.prototype.tick = function(deltaTime)
{
    this.tickChildren(deltaTime);
};

/**
 * Calls the tick method of all children. Automatically called by the tick method of this object.
 * @param {number} deltaTime
 */
ss2d.DisplayObjectContainer.prototype.tickChildren = function(deltaTime)
{
	for(var childIndex in this.mChildren)
	{
		if(this.mChildren[childIndex].tick)
		{
			this.mChildren[childIndex].tick(deltaTime);
		}
	}
};

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	/**
	 * Render all children. Don't override this method.
	 * @param {ss2d.RenderSupport} renderSupport
	 */
	ss2d.DisplayObjectContainer.prototype.render = function(renderSupport)
	{
		renderSupport.pushTransform(this);
		for(var childIndex in this.mChildren)
		{
			this.mChildren[childIndex].render(renderSupport);
		}
		renderSupport.popTransform();
	};
}

/**
 * Adds a display objects to this container
 * @param {(ss2d.DisplayObject|ss2d.DisplayObject[])} displayObject
 */
ss2d.DisplayObjectContainer.prototype.addObject = function(displayObjects)
{
	if(displayObjects instanceof Array)
	{
		for(var objIndex in displayObjects)
		{
			this.addObject(displayObjects[objIndex]);
		}
	}
	else if(displayObjects instanceof ss2d.DisplayObject)
	{
		if(displayObjects.mParent)
		{
			displayObjects.mParent.removeObject(displayObjects);
		}
		displayObjects.mParent = this;
		this.mChildren.push(displayObjects);
	}
};

/**
 * Remove the specified displayObjects from this container
 * @param {(ss2d.DisplayObject|ss2d.DisplayObject[])} displayObject
 */
ss2d.DisplayObjectContainer.prototype.removeObject = function(displayObjects)
{
	
	if(displayObjects instanceof Array)
	{
		for(var objIndex in displayObjects)
		{
			//this.mChildren.splice(this.mChildren.indexOf(displayObjects[objIndex]) , 1);
			this.removeObject(displayObjects[objIndex]);
		}
	}
	else
	{
		var objIndex = this.mChildren.indexOf(displayObjects);
		if(objIndex != -1)
		{
			if(COMPILING_SERVER)
			{
				this.mRemovedObjectsIds.push(displayObjects.mObjectId);
			}
			this.mChildren.splice(objIndex , 1);
		}
		displayObjects.mParent = null;
	}
};

/** @override */
ss2d.DisplayObjectContainer.prototype.hitTestPoint = function(point)
{
	var hittedObject = null;
	
	for(var ic = this.mChildren.length-1; ic >= 0 && !hittedObject; --ic)
	{
		hittedObject = this.mChildren[ic].hitTestPoint(point);
	}
	
	return hittedObject;
}

ss2d.DisplayObjectContainer.prototype.getBounds = function()
{
	if(this.mChildren.length == 0)
	{ 
		var worldLocation = this.localToWorld(this.mLocation)
		return new ss2d.Rectangle(worldLocation.mX, worldLocation.mY);
	}
	
	var objBounds = this.mChildren[0].getBounds();
	var x = objBounds.mX;
	var y = objBounds.mY;
	var width = objBounds.mX + objBounds.mWidth;
	var height = objBounds.mY + objBounds.mHeight;
	
	for(var childIndex = 1; childIndex < this.mChildren.length; ++childIndex)
	{
		objBounds = this.mChildren[childIndex].getBounds();
		x = (x < objBounds.mX)?x:objBounds.mX;
		y = (y < objBounds.mY)?y:objBounds.mY;
		width = (width > objBounds.mX + objBounds.mWidth)?width:(objBounds.mX + objBounds.mWidth);
		height = (height > objBounds.mY + objBounds.mHeight)?height:(objBounds.mY + objBounds.mHeight);
	}
	
	return new ss2d.Rectangle(x, y, width - x, height - y);
};

//*****************
//* SERIALIZATION *
//*****************/

if(COMPILING_CLIENT)
{
	/** @override */
	ss2d.DisplayObjectContainer.convert = function(obj)
	{
		var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		
	 	ss2d.DisplayObjectContainer.call(obj);
		
		obj.__proto__ = ss2d.DisplayObjectContainer.prototype;
		
		obj.restoreSerializedProperties(objBackup);
		return obj; 
	}
	
	/** @override */
	ss2d.DisplayObjectContainer.prototype.restoreSerializedProperties = function(objBackup)
	{
		ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, objBackup);
		
		for(var childIndex in objBackup['clist'])
		{
			var child = objBackup['clist'][childIndex];
			ss2d.Object.CLASSES[child['cid']].convert(child);
			this.addObject(child);
		}
	}
	
	/** @override */
	ss2d.DisplayObjectContainer.createFromSerializedObject = function(obj)
	{
		var newDoc = new ss2d.DisplayObjectContainer(obj['x'], obj['y']);
		newDoc.mObjectId = obj['doid'];
		return newDoc;
	}
	
	/**
	 * Interpolate the object state between a previous and future JSON parsed states.
	 * This method also calls the tick method for client side updates.
	 * @param {Object} prevState
	 * @param {Object} nextState
	 * @param {number} part Difference between both states to add to the current state.
	 * @param {number} deltaTime
	 * @param {boolean} childrenOnly if true, only update the children state
	 * @override
	 */
	ss2d.DisplayObjectContainer.prototype.interpolateState = function(prevState, nextState, part, deltaTime, childrenOnly)
	{
		//var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		if(!childrenOnly)
		{
			ss2d.DisplayObject.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		}
		
		//TODO: interpolate child, create if not exists, delete if not in nextState
		var prevChildList = prevState['clist'];
		var nextChildList = nextState['clist'];
		var objectsToRemove = nextState['rmobjts'];
		
		for(var i = 0; i <  this.mChildren.length && objectsToRemove.length > 0; ++i)
		{
			var child = this.mChildren[i];
			if(objectsToRemove.indexOf(child.mObjectId) != -1)
			{
				this.removeObject(child);
				delete prevChildList.splice(i, 1)[0];
				objectsToRemove.splice(objectsToRemove.indexOf(child.mObjectId),1);
				delete child;
			}
		}
		
		for(var i = this.mChildren.length; i < prevChildList.length; ++i)
		{
				var newObj = ss2d.Object.getObjectPrototype(prevChildList[i]).createFromSerializedObject(prevChildList[i]);
				//console.debug('added obj: ',newObj);
				this.addObject(newObj);
		}
		
		for(var i = 0; i < this.mChildren.length; ++i)
		{
			if(prevChildList[i] && nextChildList[i])
			{
				this.mChildren[i].interpolateState(prevChildList[i], nextChildList[i], part);
			}
			else
			{
				this.removeObject(this.mChildren[i]);
			}
		}
	};
}

if(COMPILING_SERVER)
{
	/** @override */
	ss2d.DisplayObjectContainer.prototype.toJSON = function()
	{
		return '{'+this.getPropertiesJSON()+'}';
	}
	
	/**
	 * @override
	 * @param {boolean} keepRemovedIds Do not clean the removed objects array once a serialization is done.
	 * @param {boolean} childrenOnly If true only return a serialized version of the children array.
	 */
	ss2d.DisplayObjectContainer.prototype.getPropertiesJSON = function(keepRemovedIds, childrenOnly)
	{
		
		var str = '';
		if(!childrenOnly)
		{
			str += ss2d.DisplayObject.prototype.getPropertiesJSON.call(this)+',';
		}
		else
		{
			str += '"cid":'+this.CLASS_ID+',';
			str += '"doid":'+this.mObjectId+',';
		}
		str += '"clist":[';
		for(var ic = 0; ic < this.mChildren.length; ic++)
		{
			str += this.mChildren[ic].toJSON();
			if(ic+1 < this.mChildren.length)
			{
				str += ',';
			}
		}
		str += ']';
		str += ',"rmobjts":'+JSON.stringify(this.mRemovedObjectsIds);
		
		if(!keepRemovedIds)
		{
			delete this.mRemovedObjectsIds;
			this.mRemovedObjectsIds = [];
		}
		return str;
	}
}

//************************
//* END OF SERIALIZATION *
//************************/
