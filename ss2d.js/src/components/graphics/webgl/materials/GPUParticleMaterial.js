// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Bult in material interface for particles
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.materials.GPUParticle');

goog.require('ss2d.ShaderSource');
goog.require('ss2d.ShaderProgram');

ss2d.materials.GPUParticle = function(support)
{
	var gl = support.mContext;
	var vertexShader = new ss2d.ShaderSource().compileSource(ss2d.materials.GPUParticle.VERTEX_SOURCE, gl.VERTEX_SHADER);
	var fragmentShader = new ss2d.ShaderSource().compileSource(ss2d.materials.GPUParticle.FRAGMENT_SOURCE, gl.FRAGMENT_SHADER);
	
	this.mShaderProgram = new ss2d.ShaderProgram([vertexShader, fragmentShader], 
												 ['uPMatrix', 'uTotalTime', 'uEmitterType', 'uGravity', 'uDeltaTime'], 
												 ['aVertexPosition', 'aPos_Dir', 'aStartPos', 'aColor',
												  'aDeltaColor', 'aRo_RoD_RaA_TaA', 'aRa_RaD_A_DPS', 'aPS_PSD_T_TS']);				 
	this.mActiveTexture = 0;
	this.mParticleDataBuffer = null;
	this.mEmitterType = 0;
	this.mGravity = [];
	
	this.mAuxF32Matrix = new Float32Array(9);
	


	
};

ss2d.materials.GPUParticle.prototype.updateParticle = function(buffer, data, offset)
{
	gl.bindBuffer(gl.ARRAY_BUFFER, support.mBuffers.mParticlesData);
	gl.bufferSubData(gl.ARRAY_BUFFER, offset * 4 * 25, data);
};

ss2d.materials.GPUParticle.prototype.apply = function(support)
{
	var gl = support.mContext;
	
	this.mShaderProgram.use(gl);

	support.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms['uSampler'], gl.TEXTURE0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, support.mBuffers.mParticlesQVP);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aVertexPosition'], support.mBuffers.mParticlesQVP.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.uniform1f(this.mShaderProgram.mUniforms['uEmitterType'], this.mEmitterType);
	gl.uniform2fv(this.mShaderProgram.mUniforms['uGravity'], this.mGravity);
	gl.uniform1f(this.mShaderProgram.mUniforms['uTotalTime'], ss2d.CURRENT_VIEW.mTotalTime);
	gl.uniformMatrix3fv(this.mShaderProgram.mUniforms['uPMatrix'], false, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix));

	gl.bindBuffer(gl.ARRAY_BUFFER, this.mParticleDataBuffer);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aPos_Dir'], 		4, gl.FLOAT, false, 26 * 4, 0);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aStartPos'], 		2, gl.FLOAT, false, 26 * 4, 4 * 4); 
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aColor'], 			4, gl.FLOAT, false, 26 * 4, 6 * 4);
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aDeltaColor'], 		4, gl.FLOAT, false, 26 * 4, 10 * 4); 
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aRo_RoD_RaA_TaA'], 	4, gl.FLOAT, false, 26 * 4, 14 * 4); 
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aRa_RaD_A_DPS'], 	4, gl.FLOAT, false, 26 * 4, 18 * 4); 
	gl.vertexAttribPointer(this.mShaderProgram.mAttributes['aPS_PSD_T_TS'], 	4, gl.FLOAT, false, 26 * 4, 22 * 4);

};

ss2d.materials.GPUParticle.VERTEX_SOURCE = ''+
	'const float EMITTER_TYPE_GRAVITY = 0.0;'+
	'const float EMITTER_TYPE_RADIAL = 1.0;'+
	'attribute vec2 aVertexPosition;'+
	'attribute vec4 aPos_Dir;'+
	'attribute vec2 aStartPos;'+
	'attribute vec4 aColor;'+
	'attribute vec4 aDeltaColor;'+
	'attribute vec4 aRo_RoD_RaA_TaA;'+
	'attribute vec4 aRa_RaD_A_DPS;'+
	'attribute vec4 aPS_PSD_T_TS;'+
	'uniform mat3 uPMatrix;'+
	'uniform float uTotalTime;'+
	'uniform float uDeltaTime;'+
	'uniform float uEmitterType;'+
	'uniform vec2 uGravity;'+
	'varying vec4 vColor;'+
	'varying vec2 vTextureCoord;'+
	'void main(void){'+
		
		'float timeLapse = (uTotalTime - aPS_PSD_T_TS.w);'+
		'float sizeToZero = 1.0; if(aPS_PSD_T_TS.z <= 0.0){ sizeToZero = 0.0; }'+
		'vec2 pos = vec2(aPos_Dir.x, aPos_Dir.y);'+
		'float angle = aRa_RaD_A_DPS.y;'+
		'float scaleMultiplier = 1.0;'+
		'if(uEmitterType == EMITTER_TYPE_RADIAL){'+
			'angle += aRa_RaD_A_DPS.w * timeLapse;'+
			'pos += vec2(-cos(angle) * aRa_RaD_A_DPS.x, -sin(angle) * aRa_RaD_A_DPS.x);'+
		'} else {'+
			'vec2 tmp = vec2(0.0, 0.0);'+
			'vec2 radial = vec2(0.0, 0.0);'+
			'vec2 tangential = vec2(0.0, 0.0);'+
			
			'vec2 diff = aStartPos - radial;'+
			'pos -= diff;'+
			
			'if(pos.x != 0.0 || pos.y != 0.0){'+
				'radial = normalize(pos);'+
			'}'+
			'tangential = vec2(radial.x, radial.y);'+
			'radial *= aRo_RoD_RaA_TaA.z;'+
			
			'float newy = tangential.x;'+
			'tangential.x = -tangential.y;'+
			'tangential.y = newy;'+
			'tangential *= aRo_RoD_RaA_TaA.w;'+
			
			'vec2 direction = (radial + tangential + uGravity) * timeLapse;'+
			'pos += ((vec2(aPos_Dir.z, aPos_Dir.w) * timeLapse) + direction);'+
			'pos += diff;'+

		'}'+
		
		'vColor = aColor + (aDeltaColor * timeLapse);'+
		'float size = aPS_PSD_T_TS.x + (aPS_PSD_T_TS.y * timeLapse);'+
		
		//TODO: rotation
		'size *= scaleMultiplier;'+
		'vTextureCoord = aVertexPosition;'+
		//- vec2(size * scaleMultiplier * 0.5, size * scaleMultiplier * 0.5)
		'gl_Position = vec4((uPMatrix * vec3((aVertexPosition * size * sizeToZero) + pos - vec2(size * scaleMultiplier * 0.5, size * scaleMultiplier * 0.5), 1.0)).xy, 0.0, 1.0);'+
	'}';

ss2d.materials.GPUParticle.FRAGMENT_SOURCE = ''+
	'precision mediump float;'+
	'uniform sampler2D uSampler;'+
	'varying vec2 vTextureCoord;'+
	'varying vec4 vColor;'+
	'void main(void){'+
		'vec4 color = texture2D(uSampler, vTextureCoord.xy);'+
		'gl_FragData[0] = color * vColor;'+
	'}';
	
