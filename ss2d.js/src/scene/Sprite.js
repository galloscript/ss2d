// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview An ss2d.DisplayObject with a texture.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Sprite');

goog.require('ss2d.Quad');
goog.require('ss2d.Texture');
goog.require('ss2d.ResourceLoader');

/**
 * @constructor
 * @extends {ss2d.Quad}
 * @param {string|ss2d.Texture} texture
 * @override
 */
ss2d.Sprite = function(x, y, w, h, texture, color)
{
	ss2d.Quad.call(this, x, y, w, h, color);

	if(COMPILING_CLIENT || COMPILING_OFFLINE)
	{
		if(typeof texture == 'string')
		{
			texture = ss2d.ResourceLoader.loadTexture(texture);
		}
	}
	
	this.mTexture = texture || null;
	this.mClip = [];
	
	//WEBGL
	//if(RENDER_CONTEXT == 'webgl')
	//{
		
	
	//}
};

goog.inherits(ss2d.Sprite, ss2d.Quad);

ss2d.Object.assignClassId(ss2d.Sprite, 1004);

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	/** @override */
	ss2d.Sprite.prototype.render = function(renderSupport)
	{
		//if(RENDER_CONTEXT == 'webgl')
		//{
			
		//}
		//else
		//{
			renderSupport.pushTransform(this);
			var ctx = renderSupport.mContext;
			//ctx.fillStyle = this.mColor.getHexString();
			if(this.mClip.length == 4)
			{
				ctx.drawImage(this.mTexture.mTextureElement,
							  this.mClip[0],
							  this.mClip[1],
							  this.mClip[2],
							  this.mClip[3],
							  0,
							  0,
							  this.mWidth, 
							  this.mHeight);
			}
			else
			{
				ctx.drawImage(this.mTexture.mTextureElement,
							  0,
							  0,
							  this.mWidth, 
							  this.mHeight);	 
			}
			renderSupport.popTransform();
		//}
	};
}

/** @override */
ss2d.Sprite.prototype.setWidth = function(w, excludeClip)
{ 
	this.mWidth = w;
	if(!excludeClip)
	{
		this.mClip[2] = w;
	}
};

/** @override */
ss2d.Sprite.prototype.setHeight = function(h, excludeClip)
{ 
	this.mHeight = h;
	if(!excludeClip)
	{
		this.mClip[3] = h;
	}
};

/**
 * Sets a clipping frame for the image.
 * @param {number} x
 * @param {number} y
 * @param {number} w Width
 * @param {number} h Height
 */
ss2d.Sprite.prototype.setClip = function(x, y, w, h)
{
	if(x instanceof ss2d.Rectangle)
	{
		this.mClip[0] = x.mX;
		this.mClip[1] = y.mY;
		this.mClip[2] = w.mWidth;
		this.mClip[3] = h.mHeight;
	}
	else
	{
		this.mClip[0] = x;
		this.mClip[1] = y;
		this.mClip[2] = w;
		this.mClip[3] = h;
	}
}

//*****************
//* SERIALIZATION *
//*****************/

if(COMPILING_CLIENT)
{
	/** @override */
	ss2d.Sprite.convert = function(obj)
	{
		var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		
		ss2d.Sprite.call(obj);
		
		obj.__proto__ = ss2d.Sprite.prototype;
		
		//now obj is a Sprite
		obj.restoreSerializedProperties(objBackup);
		
		return obj;
	}
	
	ss2d.Sprite.prototype.restoreSerializedProperties = function(objBackup)
	{
		ss2d.Quad.prototype.restoreSerializedProperties.call(this, objBackup);
		
		this.mTexture = this.mTexture || ss2d.ResourceLoader.loadTexture(objBackup['t']);
		this.mClip = objBackup['clip'] || null;
	}
	
	ss2d.Sprite.createFromSerializedObject = function(obj)
	{
		var newObj = new ss2d.Sprite(obj['x'], obj['y'], obj['w'], obj['h'], obj['t'], obj['c']);
		newObj.mObjectId = obj['doid'];
		return newObj;
	}
	
	ss2d.Sprite.prototype.interpolateState = function(prevState, nextState, part)
	{
		ss2d.Quad.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		this.mTexture = (prevState['t'] && prevState['t'] != this.mTexture.mName)?ss2d.ResourceLoader.loadTexture(prevState['t']):this.mTexture;
		this.mClip = prevState['clip'] || this.mClip;
	}
}

if(COMPILING_SERVER)
{
	ss2d.Sprite.prototype.toJSON = function()
	{
		return '{'+this.getPropertiesJSON()+'}';
	}
	
	/**
	 * SERIALIZACION SPEC
	 * mTexture : t
	 * mClip : clip
	 * @param {boolean} includeTexture If true, includes the texture.
	 * @override
	 */
	ss2d.Sprite.prototype.getPropertiesJSON = function(includeTexture)
	{
		
		var str = ss2d.Quad.prototype.getPropertiesJSON.call(this);
		if(includeTexture)
		{
			str += ',"t": "'+this.mTexture.mName+'"';
		}
		if(this.mClip)
		{
			str += ',"clip": '+JSON.stringify(this.mClip);
		}
		this.mPrevSerializedTexture = this.mTexture.mName;
		return str;
	}
}

//************************
//* END OF SERIALIZATION *
//************************/