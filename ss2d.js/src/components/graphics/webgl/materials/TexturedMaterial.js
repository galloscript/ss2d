// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Bult in material interface for textured object 
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.materials.Textured');

goog.require('ss2d.ShaderSource');
goog.require('ss2d.ShaderProgram');

ss2d.materials.Textured = function(support)
{
	var gl = support.mContext;
	var vertexShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Textured.VERTEX_SOURCE, gl.VERTEX_SHADER);
	var fragmentShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Textured.FRAGMENT_SOURCE, gl.FRAGMENT_SHADER);
	
	this.mShaderProgram = new ss2d.ShaderProgram([vertexShader, fragmentShader], 
												 ['uMVMatrix', 'uPMatrix', 'uTMatrix', 'uSampler'], 
												 ['aVertexPosition', 'aTextureCoord']);
								 
	this.mModelViewMatrix = [];
	this.mTextureCoordMatrix = [];
	this.mActiveTexture = 0;
	this.mVertexPositionBuffer = null;
	this.mTextureCoordBuffer = null;
};

ss2d.materials.Textured.prototype.apply = function(support)
{
	var gl = support.mContext;
	
	this.mShaderProgram.use(gl);

	support.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms['uSampler'], gl.TEXTURE0);
	
	//gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uPMatrix'], false, ss2d.CURRENT_VIEW.mProjection.getMatF32Array());
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uTMatrix'], false, this.mTextureCoordMatrix.getMatF32Array());
	
	//var mvpMatrix = ss2d.CURRENT_VIEW.mProjection.clone().concatMatrix(this.mModelViewMatrix); 
	var mvpMatrix = this.mModelViewMatrix.clone().concatMatrix(ss2d.CURRENT_VIEW.mProjection); 
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uMVMatrix'], false, mvpMatrix.getMatF32Array());	
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordBuffer);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aTextureCoord'], this.mTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mVertexPositionBuffer);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aVertexPosition'], this.mVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
};

ss2d.materials.Textured.VERTEX_SOURCE = ''+
	'attribute vec2 aVertexPosition;'+
	'attribute vec2 aTextureCoord;'+
	'uniform mat3 uMVMatrix;'+
	//'uniform mat3 uPMatrix;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		'gl_Position = vec4((uMVMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);'+
		'vTextureCoord = aTextureCoord;'+
		//'float px = (uMVMatrix[0][0] * aVertexPosition.x) + (uMVMatrix[1][0] * aVertexPosition.y) + uMVMatrix[2][0];'+
		//'float py = (uMVMatrix[0][1] * aVertexPosition.x) + (uMVMatrix[1][1] * aVertexPosition.y) + uMVMatrix[2][1];'+
		//'gl_Position = vec4(px, py , 0.0, 1.0);'+
		// Multiply the position by the matrix.
		//'vec2 pos = (uMVMatrix * vec3(aVertexPosition, 0)).xy;'+
		
		// convert the position from pixels to 0.0 to 1.0
		//'vec2 zeroToOne = pos / vec2(256, 256);'+

		// convert from 0->1 to 0->2
		//'vec2 zeroToTwo = zeroToOne * 2.0;'+
		
		// convert from 0->2 to -1->+1 (clipspace)
		//'vec2 clipSpace = zeroToTwo - 1.0;'+
		
		//'gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);'+
	'}';

ss2d.materials.Textured.FRAGMENT_SOURCE = ''+
	'precision mediump float;'+
	'uniform sampler2D uSampler;'+
	'uniform mat3 uTMatrix;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		'gl_FragData[0] = texture2D(uSampler, (uTMatrix * vec3(vTextureCoord, 1.0)).xy);'+
		//'if(gl_FragData[0].a < 0.9){ discard; }'+
		//'gl_FragData[0] = texture2D(uSampler, vTextureCoord);'+
		//'gl_FragData[0] = vec4(0.0, 1.0, 1.0, 1.0);'+
	'}';
	
