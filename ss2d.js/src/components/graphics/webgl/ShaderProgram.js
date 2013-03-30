// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview ShaderProgram component.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.ShaderProgram');

/**
 * @constructor
 * @param {ss2d.ShaderProgram[]} shaders Shader sources list
 * @param {string[]} uniforms Uniform names
 * @param {string[]} attributes Attribute names
 */
ss2d.ShaderProgram = function(shaders, uniforms, attributes)
{	
	var gl = ss2d.CURRENT_VIEW.mContext;
	this.mProgramId = gl.createProgram();
	this.mUniforms = {};
	this.mAttributes = {};
	for(var shaderIndex in shaders)
	{
		var shader = shaders[shaderIndex];
		gl.attachShader(this.mProgramId, shader.mShaderId);
	}
	
	gl.linkProgram(this.mProgramId);
	if (!gl.getProgramParameter(this.mProgramId, gl.LINK_STATUS))
 	{
		throw 'Link error';
	}
	
  	this.use(gl);
  	
  	for(var uIndex in uniforms)
	{
		var uniformName = uniforms[uIndex];
		this.mUniforms[uniformName] = gl.getUniformLocation(this.mProgramId, uniformName);
	}
	
	for(var aIndex in attributes)
	{
		var attributeName = attributes[aIndex];
		this.mAttributes[attributeName] = gl.getAttribLocation(this.mProgramId, attributeName);
		gl.enableVertexAttribArray(this.mAttributes[attributeName]);
	}
	
	ss2d.ShaderProgram.PROGRAM_IN_USE = null
};

/**
 * Active program
 */
ss2d.ShaderProgram.PROGRAM_IN_USE = null;

/**
 * Active this program
 * @param {WebGLContext} gl
 */
ss2d.ShaderProgram.prototype.use = function(gl)
{
	if(ss2d.ShaderProgram.PROGRAM_IN_USE != this)
	{
		gl.useProgram(this.mProgramId);
		ss2d.ShaderProgram.PROGRAM_IN_USE = this;
	}
};
