// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Basic scroll-animatable text sprite.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.TextSprite');

goog.require('ss2d.Quad');

/**
 * @constructor
 * @extends {ss2d.Quad}
 * @param {number=} x Position in x axis 
 * @param {number=} y Position in y axis
 * @param {string} textString The text that will be displayed.
 * @param {(number|string|number[3]|ss2d.Color)} color 
 * @param {number} fontSize size in pixels of the line-height
 * @param {string} fontStyle [normal | italic | oblique] [bold | weight-value from 100 to 900]
 * @property {*} inherited @see ss2d.Quad
 * @property {string} mTextString 
 * @property {number} mFontSize
 * @property {string} mFontName 
 * @property {string} mFontStyle
 * @property {string} mDisplayChars Number of chars that will be displayed, by default -1 (all), used for text scrolling.
 */
ss2d.TextSprite = function(x, y, textString, color, fontSize, fontName, fontStyle)
{
	ss2d.Quad.call(this, x, y, 0, 0, color);
	
	this.mTextString = textString||'';
	this.mFontSize = fontSize||16;
	this.mFontName = fontName||'Verdana';
	this.mFontStyle = fontStyle||'normal';
	this.mDisplayChars = -1;
	//WEBGL
	//if(RENDER_CONTEXT == 'webgl')
	//{
		
	
	//}
};

goog.inherits(ss2d.TextSprite, ss2d.Quad);

ss2d.Object.assignClassId(ss2d.TextSprite, 1007);

/**
 * Sets the number of chars that will be displayed, use with ss2d.Tween to create scroll animation.
 * @param {number} displayChars
 */
ss2d.TextSprite.prototype.setDisplayChars = function(displayChars)
{
	this.mDisplayChars = Math.floor(displayChars);
}

/**
 * Gets the number of chars that will be displayed, use with ss2d.Tween to create scroll animation.
 * @return {number}
 */
ss2d.TextSprite.prototype.getDisplayChars = function()
{
	return this.mDisplayChars;
}

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	if(RENDER_CONTEXT == 'webgl')
	{
		ss2d.TextSprite.prototype.render = function(renderSupport)
		{
			
		}
	}
	else
	{
		/** @override */
		ss2d.TextSprite.prototype.render = function(renderSupport)
		{
			renderSupport.pushTransform(this);
			var ctx = renderSupport.mContext;
			ctx.font = this.mFontStyle+' '+this.mFontSize+'px '+this.mFontName;
			ctx.fillStyle = this.mColor.getHexString();
			var textToDisplay = this.mTextString;
			
			if(this.mDisplayChars > -1)
				textToDisplay = this.mTextString.substring(0, this.mDisplayChars);
			
			ctx.fillText(textToDisplay, 0, this.mFontSize);	 
			
			renderSupport.popTransform();
		};
	}
}

//*****************
//* SERIALIZATION *
//*****************/

if(COMPILING_CLIENT)
{
	/** @override */
	ss2d.TextSprite.convert = function(obj)
	{
		var objBackup =  ss2d.Object.backupAndDeleteObjectProperties(obj);
		
		ss2d.TextSprite.call(obj);
		
		obj.__proto__ = ss2d.TextSprite.prototype;
		
		//now obj is a TextSprite
		obj.restoreSerializedProperties(objBackup);
		
		return obj;
	}
	
	ss2d.TextSprite.prototype.restoreSerializedProperties = function(objBackup)
	{
		ss2d.Quad.prototype.restoreSerializedProperties.call(this, objBackup);
		
		this.mTextString = objBackup['str'];
		this.mFontSize = objBackup['fsize'];
		this.mFontName = objBackup['fname'];
		this.mFontStyle = objBackup['fstyle'];
		this.mDisplayChars = objBackup['dc'];
	}
	
	ss2d.TextSprite.createFromSerializedObject = function(obj)
	{
		var newObj = new ss2d.TextSprite(obj['x'], 
										 obj['y'], 
										 obj['str'], 
										 obj['c'],  
										 obj['fsize'],  
										 obj['fname'],  
										 obj['fstyle']);
		newObj.mObjectId = obj['doid'];
		return newObj;
	}
	
	ss2d.TextSprite.prototype.interpolateState = function(prevState, nextState, part)
	{
		ss2d.Quad.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		
		this.mTextString = prevState['str'];
		this.mFontSize = prevState['fsize'];
		this.mFontName = prevState['fname'];
		this.mFontStyle = prevState['fstyle'];
		this.mDisplayChars = Math.floor(prevState['dc'] + (nextState['dc'] - prevState['dc']) * part);
	}
}

if(COMPILING_SERVER)
{
	ss2d.TextSprite.prototype.toJSON = function()
	{
		return '{'+this.getPropertiesJSON()+'}';
	}
	
	/**
	 * SERIALIZACION SPEC:
	 * mTextString : str
	 * @override
	 */
	ss2d.TextSprite.prototype.getPropertiesJSON = function()
	{
		var str = ss2d.Quad.prototype.getPropertiesJSON.call(this);

		str += ',"str": "'+this.mTextString+'"';
		str += ',"fsize": "'+this.mFontSize+'"';
		str += ',"fname": "'+this.mFontName+'"';
		str += ',"fstyle": "'+this.mFontStyle+'"';
		str += ',"dc": "'+this.mDisplayChars+'"';
		
		return str;
	}
}

//************************
//* END OF SERIALIZATION *
//************************/