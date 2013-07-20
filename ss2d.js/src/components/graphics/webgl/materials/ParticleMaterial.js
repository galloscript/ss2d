// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Bult in material interface for particles
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.materials.Particle');

goog.require('ss2d.ShaderSource');
goog.require('ss2d.ShaderProgram');

/** @constructor */
ss2d.materials.Particle = function(support)
{
	var gl = support.mContext;
	var vertexShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Particle.VERTEX_SOURCE, gl.VERTEX_SHADER);
	var fragmentShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Particle.FRAGMENT_SOURCE, gl.FRAGMENT_SHADER);
	
	this.mShaderProgram = new ss2d.ShaderProgram([vertexShader, fragmentShader], 
												 ['uPMatrix', 'uScaleMatrix', 'uSampler'], 
												 ['aVertexPosition', 'aColor']);				 
	this.mActiveTexture = 0;
	this.mParticleDataBuffer = null;
	this.mParticleDataArray = new ArrayBuffer();
	this.mAuxF32Matrix = new Float32Array(9);
};

ss2d.materials.Particle.prototype.apply = function(support)
{
	var gl = support.mContext;
	
	this.mShaderProgram.use(gl);

	support.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms['uSampler'], gl.TEXTURE0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mParticleDataBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.mParticleDataArray);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aVertexPosition'], 2, gl.FLOAT, false, 24, 0);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aColor'], 4, gl.FLOAT, false, 24, 8);
	
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uPMatrix'], false, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix));
};

ss2d.materials.Particle.VERTEX_SOURCE = ''+
	'attribute vec2 aVertexPosition;'+
	'attribute vec4 aColor;'+
	'uniform mat3 uScaleMatrix;'+
	'uniform mat3 uPMatrix;'+
	'varying vec4 vColor;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		'vColor = aColor;'+
		'vTextureCoord = aVertexPosition;'+
		'gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);'+
	'}';

ss2d.materials.Particle.FRAGMENT_SOURCE = ''+
	'precision mediump float;'+
	'uniform sampler2D uSampler;'+
	'varying vec2 vTextureCoord;'+
	'varying vec4 vColor;'+
	'void main(void){'+
		'vec4 color = texture2D(uSampler, vTextureCoord.xy);'+
		'gl_FragData[0] = color * vColor;'+
	'}';
	
