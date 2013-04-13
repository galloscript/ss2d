// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Bult in material interface for textured object 
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.materials.Textured');

goog.require('ss2d.ShaderSource');
goog.require('ss2d.ShaderProgram');

/** @constructor */
ss2d.materials.Textured = function(support)
{
	var gl = support.mContext;
	var vertexShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Textured.VERTEX_SOURCE, gl.VERTEX_SHADER);
	var fragmentShader = new ss2d.ShaderSource().compileSource(ss2d.materials.Textured.FRAGMENT_SOURCE, gl.FRAGMENT_SHADER);
	
	this.mShaderProgram = new ss2d.ShaderProgram([vertexShader, fragmentShader], 
												 ['uMVPMatrix', 'uTMatrix', 'uSampler', 'uColor'], 
												 ['aVertexPosition', 'aTextureCoord']);
								 
	this.mModelViewMatrix = new ss2d.Matrix3();
	this.mTextureCoordMatrix = new ss2d.Matrix3();
	this.mActiveTexture = 0;
	this.mColor = [];
	this.mVertexPositionBuffer = null;
	this.mTextureCoordBuffer = null;
	
	this.mAuxVec4Array = new Float32Array(4);
	this.mAuxMat3Array = new Float32Array(9);
};

ss2d.materials.Textured.prototype.apply = function(support)
{
	var gl = support.mContext;
	
	this.mShaderProgram.use(gl);

	support.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms['uSampler'], gl.TEXTURE0);
	
	//gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uPMatrix'], false, ss2d.CURRENT_VIEW.mProjection.getMatF32Array());
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uTMatrix'], false, this.mTextureCoordMatrix.getMatF32Array(this.mAuxMat3Array));
	
	//var mvpMatrix = ss2d.CURRENT_VIEW.mProjection.clone().concatMatrix(this.mModelViewMatrix); 
	var mvpMatrix = this.mModelViewMatrix.clone().concatMatrix(ss2d.CURRENT_VIEW.mProjection); 
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uMVPMatrix'], false, mvpMatrix.getMatF32Array(this.mAuxMat3Array));	
	
	gl.uniform4fv(this.mShaderProgram.mUniforms['uColor'], this.mColor);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mVertexPositionBuffer);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aVertexPosition'], this.mVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordBuffer);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aTextureCoord'], this.mTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
	

};

ss2d.materials.Textured.VERTEX_SOURCE = ''+
	'attribute vec2 aVertexPosition;'+
	'attribute vec2 aTextureCoord;'+
	'uniform mat3 uMVPMatrix;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		'vTextureCoord = aTextureCoord;'+
		'gl_Position = vec4((uMVPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);'+
	'}';

ss2d.materials.Textured.FRAGMENT_SOURCE = ''+
	'precision mediump float;'+
	'uniform sampler2D uSampler;'+
	'uniform mat3 uTMatrix;'+
	'uniform vec4 uColor;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		'vec4 color = texture2D(uSampler, (uTMatrix * vec3(vTextureCoord, 1.0)).xy);'+
		'gl_FragData[0] = color * uColor;'+
	'}';
	
