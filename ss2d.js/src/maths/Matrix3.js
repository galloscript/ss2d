// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview 3x3 Transformation Matrix.
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Matrix3');

goog.require('ss2d.Point');

/** @constructor */
ss2d.Matrix3 = function()
{
	this.mA = 1.0;
	this.mB = 0.0;
	this.mC = 0.0;
	this.mD = 1.0;
	this.mTx = 0.0;
	this.mTy = 0.0; 
	//this.setValues(0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
	
	this.mMatF32Array = new Array(9); //new Float32Array(9);
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @param {number} tx
 * @param {number} ty
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.setValues = function(a,b,c,d,tx,ty)
{
	this.mA = a;
	this.mB = b;
	this.mC = c;
	this.mD = d;
	this.mTx = tx;
	this.mTy = ty; 
	
	return this;
}

/**
 * @return {ss2d.Matrix3} new ss2d.Matrix3 object that is a copy of this one
 */
ss2d.Matrix3.prototype.clone = function()
{
	return new ss2d.Matrix3().setValues(this.mA, this.mB, this.mC, this.mD, this.mTx, this.mTy);	
}

/**
 * @return {string} for debug purposes
 */
ss2d.Matrix3.prototype.toString = function()
{
	return "(a="+this.mA+", b="+this.mB+", c="+this.mC+", d="+this.mD+", tx="+this.mTx+", ty="+this.mTy+")";	
}

/** 
 * Sets each matrix property to a value that causes a null transformation.
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.identity = function()
{
	return this.setValues(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);	
}

/**
 * @return {number} The determinant of the matrix.
 */
ss2d.Matrix3.prototype.determinant = function()
{
	return (this.mA * this.mD) - (this.mC * this.mB);
}

/**
 * Concatenates a matrix with the current matrix, combining the geometric effects of the two.
 * @param {ss2d.Matrix3} otherMatrix
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.concatMatrix = function(otherMatrix)
{
	return this.setValues(otherMatrix.mA * this.mA + (otherMatrix.mC * this.mB),
			      otherMatrix.mB * this.mA + (otherMatrix.mD * this.mB),
			      otherMatrix.mA * this.mC + (otherMatrix.mC * this.mD),
			      otherMatrix.mB * this.mC + (otherMatrix.mD * this.mD),
			      otherMatrix.mA * this.mTx + (otherMatrix.mC * this.mTy) + otherMatrix.mTx * 1,
			      otherMatrix.mB * this.mTx + (otherMatrix.mD * this.mTy) + otherMatrix.mTy * 1);
}

/**
 * Translates the matrix along the x and y axes.
 * @param {number} dx movement in x axis
 * @param {number} dy movement in y axis
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.translate = function(dx,dy)
{
	this.mTx += dx;
	this.mTy += dy;
	
	return this;
}

/**
 * Applies a uniform scaling transformation to the matrix.
 * @param {number} sx scale in x axis
 * @param {number} sy scale in y axis
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.scale = function(sx,sy)
{
	this.mA *= sx;
	this.mB *= sy;
	this.mC *= sx;
	this.mD *= sy;
	this.mTx *= sx;
	this.mTy *= sy;
	
	return this;
}

/**
 * Applies a rotation on the matrix (angle in RAD).
 * @param {number} angle
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.rotate = function(angle)
{
	var rotMatrix = new ss2d.Matrix3()
	rotMatrix.setValues(Math.cos(angle),
			    Math.sin(angle),
			    -Math.sin(angle),
			    Math.cos(angle),
			    0.0, 0.0);
	this.concatMatrix(rotMatrix)
	delete rotMatrix;
	
	return this;
}

/**
 * Applies the geometric transformation represented by the matrix to the specified point.
 * @param {ss2d.Point} point
 * @param {ss2d.Point=} targetPoint
 * @return {ss2d.Point} the transformed point
 */
ss2d.Matrix3.prototype.transformPoint = function(point, targetPoint)
{
	if(!targetPoint)
	{
		targetPoint = new ss2d.Point(0.0,0.0);	
	}
	
	var orgX = point.mX;
	targetPoint.mX = (this.mA * point.mX) + (this.mC * point.mY) + this.mTx;
	targetPoint.mY = (this.mB * orgX) + (this.mD * point.mY) + this.mTy;	
	
	return targetPoint;
}

/**
 * Performs the opposite transformation of the matrix.
 * @return {ss2d.Matrix3} this object
 */
ss2d.Matrix3.prototype.invert = function()
{
	var det = this.determinant();
	this.setValues( this.mD/det,
			-this.mB/det,
			-this.mC/det,
			this.mA/det,
			((this.mC * this.mTy) - (this.mD * this.mTx))/det,
			((this.mB * this.mTx) - (this.mA * this.mTy))/det);
	return this;
}

/**
 * @return {Float32Array} for uniform shader attributes
 */
ss2d.Matrix3.prototype.getMatF32Array = function()
{
	//this.mMat3 = [this.mA, this.mB, 0.0, this.mC, this.mD, 0.0, this.mTx, this.mTy, 1.0];
	//this.mMat3 = [this.mA, this.mC, this.mTx, this.mB, this.mD, this.mTy, 0.0, 0.0, 1.0];
	this.mMatF32Array[0] = this.mA; 
	this.mMatF32Array[1] = this.mB; 
	this.mMatF32Array[2] = 0.0;
	this.mMatF32Array[3] = this.mC; 
	this.mMatF32Array[4] = this.mD;
	this.mMatF32Array[5] = 0.0; 
	this.mMatF32Array[6] = this.mTx; 
	this.mMatF32Array[7] = this.mTy;
	this.mMatF32Array[8] = 1.0;
	//this.mMatF32Array = new Float32Array([this.mA, this.mC, this.mTx, this.mB, this.mD, this.mTy, 0.0, 0.0, 1.0]);
	
	return this.mMatF32Array;
}


