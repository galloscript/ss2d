// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Basic scroll-animatable bitmap text sprite.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.BitmapTextSprite');

goog.require('ss2d.Quad');

/**
 * @constructor
 * @extends {ss2d.Quad}
 * @param {number=} x Position in x axis 
 * @param {number=} y Position in y axis
 * @param {string} textString The text that will be displayed.
 * @param {string} bitmapFont Bitmap font name.
 * @param {number} fontSize size in pixels of the line-height
 * @property {*} inherited @see ss2d.Quad
 * @property {string} mTextString 
 * @property {number} mFontSize
 * @property {string} mBitmapFont 
 * @property {string} mDisplayChars Number of chars that will be displayed, by default -1 (all), used for text scrolling.
 * @property {number[5]} mClip
 */
ss2d.BitmapTextSprite = function(x, y, textString, bitmapFont, fontSize)
{
	ss2d.Quad.call(this, x, y, 0, 0);
	
	this.mTextString = textString||'';
	this.mFontSize = fontSize||16;
	this.mDisplayChars = -1;
	this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(bitmapFont);
	
	
	if(COMPILING_CLIENT || COMPILING_OFFLINE)
	{
		this.mGlyphSprite = new ss2d.Sprite;
		this.mClip = [];
	}
	//WEBGL
	//if(RENDER_CONTEXT == 'webgl')
	//{
		
	
	//}
};

goog.inherits(ss2d.BitmapTextSprite, ss2d.Quad);

ss2d.Object.assignClassId(ss2d.BitmapTextSprite, 1007);

/**
 * Sets the number of chars that will be displayed, use with ss2d.Tween to create scroll animation.
 * @param {number} displayChars
 */
ss2d.BitmapTextSprite.prototype.setDisplayChars = function(displayChars)
{
	this.mDisplayChars = Math.floor(displayChars);
}

/**
 * Gets the number of chars that will be displayed, use with ss2d.Tween to create scroll animation.
 * @return {number}
 */
ss2d.BitmapTextSprite.prototype.getDisplayChars = function()
{
	return this.mDisplayChars;
}

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	/** @override */
	ss2d.BitmapTextSprite.prototype.render = function(renderSupport)
	{

		//if(RENDER_CONTEXT == 'webgl')
		//{
			
		//}
		//else
		//{
			renderSupport.pushTransform(this);
			var ctx = renderSupport.mContext;
			try{
				this.mWidth = 0;
				var xTranslation = 0;
				this.mGlyphSprite.mTexture = this.mBitmapFont.mTexture;
				var s = this.mFontSize /this.mBitmapFont.mMidHeight;
				this.mScaleX = this.mScaleY = s;
				var charsToShow = (this.mDisplayChars > -1)?
								  Math.min(this.mDisplayChars, this.mTextString.length):
								  this.mTextString.length;
				
				for(var c = 0; c < charsToShow; ++c)
				{
					var charCode = this.mTextString.charCodeAt(c);
					if(charCode == 32){ 
						ctx.translate(this.mBitmapFont.mMidWidth*0.5, 0);
						continue;
					}
					
					this.mBitmapFont.getGlyphClip(charCode, this.mClip);
				
					//this.mGlyphSprite.mScaleX = this.mGlyphSprite.mScaleY = s;
					//ctx.scale(s, s);
					this.mGlyphSprite.mLocation.mX = xTranslation;
					this.mGlyphSprite.mLocation.mY = this.mClip[5];
					//ctx.translate(0, this.mClip[5]);
					
					//this.mGlyphSprite.mRotation = this.mRotation
					this.mGlyphSprite.mClip = this.mClip;
					this.mGlyphSprite.mWidth =  this.mClip[2];
					this.mGlyphSprite.mHeight =  this.mClip[3];
					
					
					this.mGlyphSprite.render(renderSupport);
					//ctx.rotate(this.mRotation);
					
					/*ctx.drawImage(this.mBitmapFont.mTexture.mTextureElement,
								  this.mClip[0],
								  this.mClip[1],
								  this.mClip[2],
								  this.mClip[3],
								  0,
								  0,
								  this.mClip[2], 
								  this.mClip[3]);
					ctx.translate(0, -this.mClip[5]);
					ctx.translate(this.mClip[4], 0);
					ctx.scale(1/s, 1/s);*/
					xTranslation += this.mClip[4];
					
				}
			} catch (t) { }
			renderSupport.popTransform();
			
		//}
	};
}

//*****************
//* SERIALIZATION *
//*****************/

if(COMPILING_CLIENT)
{
	/** @override */
	ss2d.BitmapTextSprite.convert = function(obj)
	{
		var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		
		ss2d.BitmapTextSprite.call(obj);
		
		obj.__proto__ = ss2d.BitmapTextSprite.prototype;
		
		//now obj is a BitmapTextSprite
		obj.restoreSerializedProperties(objBackup);
		
		return obj;
	}
	
	ss2d.BitmapTextSprite.prototype.restoreSerializedProperties = function(objBackup)
	{
		ss2d.Quad.prototype.restoreSerializedProperties.call(this, objBackup);
		
		this.mTextString = objBackup['str'];
		this.mFontSize = objBackup['fsize'];
		this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(objBackup['bmfname']);
		this.mFontStyle = objBackup['fstyle'];
		this.mDisplayChars = objBackup['dc'];
	}
	
	ss2d.BitmapTextSprite.createFromSerializedObject = function(obj)
	{
		var newObj = new ss2d.BitmapTextSprite(obj['x'], 
											   obj['y'], 
											   obj['str'], 
											   obj['bmfname'],
											   obj['fsize']);
		newObj.mObjectId = obj['doid'];
		return newObj;
	}
	
	ss2d.BitmapTextSprite.prototype.interpolateState = function(prevState, nextState, part)
	{
		ss2d.Quad.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		
		this.mTextString = prevState['str'];
		this.mFontSize = prevState['fsize'];
		
		if(!this.mBitmapFont ||this.mBitmapFont.mName != prevState['bmfname'])
			this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(prevState['bmfname']);

		this.mDisplayChars = Math.floor(prevState['dc'] + (nextState['dc'] - prevState['dc']) * part);
	}
}

if(COMPILING_SERVER)
{
	ss2d.BitmapTextSprite.prototype.toJSON = function()
	{
		return '{'+this.getPropertiesJSON()+'}';
	}
	
	/**
	 * SERIALIZACION SPEC:
	 * mTextString : str
	 * @override
	 */
	ss2d.BitmapTextSprite.prototype.getPropertiesJSON = function()
	{
		var str = ss2d.Quad.prototype.getPropertiesJSON.call(this);

		str += ',"str": "'+this.mTextString+'"';
		str += ',"fsize": "'+this.mFontSize+'"';
		str += ',"bmfname": "'+this.mBitmapFont.mName+'"';
		str += ',"dc": "'+this.mDisplayChars+'"';
		
		return str;
	}
}

//************************
//* END OF SERIALIZATION *
//************************/