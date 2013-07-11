// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview An ss2d.DisplayObject with a texture.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Sprite');

goog.require('ss2d.Quad');
goog.require('ss2d.Texture');
goog.require('ss2d.ResourceManager');

/**
 * @constructor
 * @extends {ss2d.Quad}
 * @param {number=} x Position in x axis 
 * @param {number=} y Position in y axis
 * @param {number} width The width
 * @param {number} height The height
 * @param {string|ss2d.Texture} texture The name or reference of a texture file or the name of a frame in a texture atlas.
 * @param {string|ss2d.TextureAtlas=} textureAtlas The name or reference of a texture atlas file.
 * @property {*} inherited @see ss2d.Quad
 * @property {ss2d.Texture} mTexture Reference to the texture the sprite will draw
 * @property {ss2d.TextureAtlas} mTextureAtlas Reference to the textureAtlas where the sprite will look up for mTexture frame.
 * @property {number[4]} mClip Texture clipping rectangle
 */
ss2d.Sprite = function(x, y, width, height, texture, textureAtlas)
{
	ss2d.Quad.call(this, x, y, width, height);
	
	
	if(COMPILING_CLIENT || COMPILING_OFFLINE)
	{
		this.mTextureAtlas = textureAtlas||null
		this.mTexture = texture || null;
		this.mReady = false;
		if(typeof textureAtlas == 'string')
		{
			textureAtlas = ss2d.ResourceManager.loadTextureAtlas(textureAtlas, function(atlasObj){ 
				this.mTextureAtlas = atlasObj; 
				this.mReady = true;
			}, this);
		}
		else if(typeof texture == 'string' && !textureAtlas)
		{
			texture = ss2d.ResourceManager.loadTexture(texture, function(textureObj){
				this.mTexture = textureObj;
				this.mReady = true;
				if(this.mWidth <= 0 && this.mHeight <= 0)
				{
					this.mWidth = this.mTexture.mTextureElement.width;
					this.mHeight = this.mTexture.mTextureElement.height;
				}
			}, this);
		}
	}

	this.mClip = [];
};

goog.inherits(ss2d.Sprite, ss2d.Quad);

ss2d.Object.assignClassId(ss2d.Sprite, 1004);

if(COMPILING_CLIENT||COMPILING_OFFLINE)
{
	/** @override */
	if(RENDER_CONTEXT == 'webgl')
	{
		ss2d.Sprite.prototype.render = function(renderSupport)
		{
			if(!this.mReady)
				return;
				
			if(this.mTextureAtlas && this.mTextureAtlas.mTextureId == -1)
				return;
				
			if(!this.mTextureAtlas && this.mTexture.mTextureId == -1)
				return;
			
			var textureObject = this.mTexture;
			if(this.mTextureAtlas)
			{
				textureObject = this.mTextureAtlas.mTexture;
				
				if(this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor)
				{
					this.mTextureAtlas.getClipFor(this.mTexture, this.mClip);
				}
			}
			
			if(!textureObject || !textureObject.mTextureElement)
				return;
			
			var gl = renderSupport.mContext;
			var material = renderSupport.mMaterials.mTextured;

			var mMatrix = new ss2d.Matrix3().scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix());
			var mvMatrix = mMatrix.concatMatrix(this.getWorldTransformationMatrix(null, null));

			if(!this.mClip || this.mClip.length <= 3)
				this.mClip = [0 , 0, textureObject.mTextureElement.width, textureObject.mTextureElement.height];
			
			var tMatrix = new ss2d.Matrix3();	
			var tw = textureObject.mPOTWidth;
			var th = textureObject.mPOTHeight;
			tMatrix.scale(this.mClip[2] / tw, this.mClip[3] / th);
			tMatrix.translate(this.mClip[0] / tw, this.mClip[1] / th);

			renderSupport.pushTransform(this);

			material.mModelViewMatrix = mvMatrix;
			var color = renderSupport.mCurrentColor.slice();
			var alpha = (this.mInheritAlpha) ? renderSupport.mCurrentColor[3] : this.mAlpha;
			if(!this.mInheritColor)
			{
				this.mColor.getF32Array(color, alpha);
			}
			material.mColor = color;
			material.mTextureCoordMatrix = tMatrix; 
			material.mActiveTexture = textureObject.mTextureId;
			material.mVertexPositionBuffer = renderSupport.mBuffers.mQuadVertexPosition;
			material.mTextureCoordBuffer = renderSupport.mBuffers.mQuadTextureCoords;
			
			material.apply(renderSupport);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderSupport.mBuffers.mQuadVertexIndex);
			gl.drawElements(gl.TRIANGLES, renderSupport.mBuffers.mQuadVertexIndex.numItems, gl.UNSIGNED_SHORT, 0);

			renderSupport.popTransform();
		};
	}
	else
	{
		ss2d.Sprite.prototype.render = function(renderSupport)
		{
			var textureElement = null;
			if(this.mTextureAtlas)
			{
				if(this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor)
				{
					textureElement = this.mTextureAtlas.mTexture.mTextureElement;
					this.mTextureAtlas.getClipFor(this.mTexture, this.mClip);
				}
			}
			else
			{
				textureElement = this.mTexture.mTextureElement;
			}
			renderSupport.pushTransform(this);
			var ctx = renderSupport.mContext;
			//ctx.fillStyle = this.mColor.getHexString();
			if(textureElement)
			{
				if(this.mClip.length > 3)
				{
					ctx.drawImage(textureElement,
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
					ctx.drawImage(textureElement,
								  0,
								  0,
								  this.mWidth, 
								  this.mHeight);	 
				}
			}
			renderSupport.popTransform();
		};
	}
	
	ss2d.Sprite.prototype.setTexture = function(texture, textureAtlas)
	{
		if(typeof textureAtlas == 'string')
		{
			textureAtlas = ss2d.ResourceManager.loadTextureAtlas(textureAtlas);
		}
		else if(typeof texture == 'string' && !textureAtlas)
		{
			texture = ss2d.ResourceManager.loadTexture(texture);
		}

		this.mTextureAtlas = textureAtlas||null
		this.mTexture = texture || null;
	}
}

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
		
		this.mTexture = this.mTexture || ss2d.ResourceManager.loadTexture(objBackup['t']);
		this.mClip = objBackup['clip'] || null;
	}
	
	ss2d.Sprite.createFromSerializedObject = function(obj)
	{
		var newObj = new ss2d.Sprite(obj['x'], obj['y'], obj['w'], obj['h'], obj['t'], obj['c']);
		newObj.mObjectId = obj['doid'];
		return newObj;
	}
	
	ss2d.Sprite.prototype.interpolateState = function(prevState, nextState, part, deltaTime)
	{
		ss2d.Quad.prototype.interpolateState.call(this, prevState, nextState, part, deltaTime);
		this.mTexture = (prevState['t'] && prevState['t'] != this.mTexture.mName)?ss2d.ResourceManager.loadTexture(prevState['t']):this.mTexture;
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
		if(this.mClip && this.mClip.length > 3)
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