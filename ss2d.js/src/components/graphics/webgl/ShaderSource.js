// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview ShaderSource resource. Requires an initialized view
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ShaderSource');

/**
 * @constructor
 * @param {string} shaderFile The resource name
 * @param {function} shaderLoadedCallback Called when the shader file is loaded
 */
ss2d.ShaderSource = function(shaderFile, shaderLoadedCallback, callbackTarget)
{	
	this.mShaderId = -1;
	
	//can be created from source
	if(!shaderFile){ return; } 
	
	//resource loading info
	this.mName = shaderFile;
	this.mCallbackFunction = shaderLoadedCallback||null;
	this.mCallbackTarget = callbackTarget||null;
	
	var shaderFileRequest = new XMLHttpRequest();
	shaderFileRequest.mShaderSource = this;
	shaderFileRequest.open("GET", atlasJSONFileName, true);
	shaderFileRequest.responseType = "text";
	shaderFileRequest.onload = function() 
	{
		var shaderType = ss2d.ShaderSource.getShaderType(this.mShaderSource.mName);
		if(!shaderType)
		{
			throw 'Unable to find the shader type for: '+this.mName;	
		}
		this.mShaderSource.compileSource(this.response, shaderType);
		
		if(this.mCallbackFunction)
		{
			this.mCallbackFunction.call(this.mCallbackTarget, this.mShaderSource);
		}
	};
	
	shaderFileRequest.send();
}

ss2d.ShaderSource.VS_EXT = ['vert','vs','vertex'];
ss2d.ShaderSource.FS_EXT = ['frag','fs','fragment'];

/**
 * Method called when the shader source is loaded to compile it
 */
ss2d.ShaderSource.prototype.compileSource = function(data, shaderType)
{
	var gl = ss2d.CURRENT_VIEW.mContext;

	this.mShaderId = gl.createShader(shaderType);
	gl.shaderSource(this.mShaderId, data);
	gl.compileShader(this.mShaderId);
	
	if (!gl.getShaderParameter(this.mShaderId, gl.COMPILE_STATUS)) 
	{
		throw gl.getShaderInfoLog(this.mShaderId);
	}

	if(this.mCallbackFunction)
	{
		this.mCallbackFunction.call(null, this);
	}
	
	return this;
};

/**
 * Retrieves the shader source type comparing the file extension.
 */
ss2d.ShaderSource.getShaderType = function(shaderFile)
{
	var gl = ss2d.CURRENT_VIEW.mContext;
	var ext = shaderFile.split('.').pop();
	var shaderType = null;
	
	if(ss2d.ShaderSource.VS_EXT.indexOf(ext) != -1)
	{
		shaderType = gl.VERTEX_SHADER;
	} 
	else if(ss2d.ShaderSource.FS_EXT.indexOf(ext) != -1)
	{
		shaderType = gl.FRAGMENT_SHADER;
	}
	
	return shaderType;
};


