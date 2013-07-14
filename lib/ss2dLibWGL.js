/**
* @fileoverview SmoothStep2D Lib
* @copyright David Gallardo Moreno (portalg@gmail.com)
*/
var ss2d=ss2d||{}; var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    var d;
    a = a.replace(/\\/g, "/");
    for(var e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  if(goog.inHtmlDocument_()) {
    var b = goog.global.document;
    if("complete" == b.readyState) {
      if(/\bdeps.js$/.test(a)) {
        return!1
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    b.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
    return!0
  }
  return!1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    a = a.split("-");
    for(var b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$");
    a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.getMsgWithFallback = function(a) {
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
ss2d.Point = function(a, b) {
  this.mX = a || 0;
  this.mY = b || 0
};
ss2d.Point.prototype.set = function(a, b) {
  this.mX = a || 0;
  this.mY = b || 0
};
ss2d.Point.prototype.length = function() {
  return Math.sqrt(this.mX * this.mX + this.mY * this.mY)
};
ss2d.Point.prototype.normalize = function() {
  var a = this.length();
  return ss2d.Point.scalePoint(this, 0 < a ? 1 / a : 0)
};
ss2d.Point.prototype.getX = function() {
  return this.mX
};
ss2d.Point.prototype.setX = function(a) {
  this.mX = a
};
ss2d.Point.prototype.getY = function() {
  return this.mY
};
ss2d.Point.prototype.setY = function(a) {
  this.mY = a
};
ss2d.Point.distanceBetweenPoints = function(a, b) {
  return Math.abs(Math.sqrt((b.mX - a.mX) * (b.mX - a.mX) + (b.mY - a.mY) * (b.mY - a.mY)))
};
ss2d.Point.addPoints = function(a, b) {
  return new ss2d.Point(a.mX + b.mX, a.mY + b.mY)
};
ss2d.Point.subtractPoints = function(a, b) {
  return new ss2d.Point(b.mX - a.mX, b.mY - a.mY)
};
ss2d.Point.scalePoint = function(a, b) {
  return new ss2d.Point(b * a.mX, b * a.mY)
};
ss2d.Point.dot = function(a, b) {
  return a.mX * b.mX + a.mY * b.mY
};
ss2d.Point.angle = function(a, b) {
  var c = ss2d.Point.dot(a, b), d = a.length() * b.length();
  return Math.acos(c / d)
};
ss2d.Point.X_AXIS = new ss2d.Point(1, 0);
ss2d.Point.Y_AXIS = new ss2d.Point(0, 1);
ss2d.Matrix3 = function() {
  this.mA = 1;
  this.mC = this.mAB = this.mB = 0;
  this.mD = 1;
  this.mTy = this.mTx = this.mCD = 0;
  this.mTxTy = 1
};
ss2d.Matrix3.prototype.setValues = function(a, b, c, d, e, f) {
  this.mA = a;
  this.mB = b;
  this.mC = c;
  this.mD = d;
  this.mTx = e;
  this.mTy = f;
  return this
};
ss2d.Matrix3.prototype.clone = function() {
  var a = (new ss2d.Matrix3).setValues(this.mA, this.mB, this.mC, this.mD, this.mTx, this.mTy);
  a.mAB = this.mAB;
  a.mCD = this.mCD;
  a.mTxTy = this.mTxTy;
  return a
};
ss2d.Matrix3.prototype.toString = function() {
  return"(a=" + this.mA + ", b=" + this.mB + ", c=" + this.mC + ", d=" + this.mD + ", tx=" + this.mTx + ", ty=" + this.mTy + ")"
};
ss2d.Matrix3.prototype.identity = function() {
  return this.setValues(1, 0, 0, 1, 0, 0)
};
ss2d.Matrix3.prototype.determinant = function() {
  return this.mA * this.mD - this.mC * this.mB
};
ss2d.Matrix3.prototype.concatMatrix = function(a) {
  return this.setValues(a.mA * this.mA + a.mC * this.mB, a.mB * this.mA + a.mD * this.mB, a.mA * this.mC + a.mC * this.mD, a.mB * this.mC + a.mD * this.mD, a.mA * this.mTx + a.mC * this.mTy + 1 * a.mTx, a.mB * this.mTx + a.mD * this.mTy + 1 * a.mTy)
};
ss2d.Matrix3.prototype.translate = function(a, b) {
  this.mTx += a;
  this.mTy += b;
  return this
};
ss2d.Matrix3.prototype.scale = function(a, b) {
  this.mA *= a;
  this.mB *= b;
  this.mC *= a;
  this.mD *= b;
  this.mTx *= a;
  this.mTy *= b;
  return this
};
ss2d.Matrix3.prototype.rotate = function(a) {
  var b = new ss2d.Matrix3;
  b.setValues(Math.cos(a), -Math.sin(a), Math.sin(a), Math.cos(a), 0, 0);
  return this.concatMatrix(b)
};
ss2d.Matrix3.prototype.transformPoint = function(a, b) {
  b || (b = new ss2d.Point(0, 0));
  var c = a.mX;
  b.mX = this.mA * a.mX + this.mC * a.mY + this.mTx;
  b.mY = this.mB * c + this.mD * a.mY + this.mTy;
  return b
};
ss2d.Matrix3.prototype.invert = function() {
  var a = this.determinant();
  this.setValues(this.mD / a, -this.mB / a, -this.mC / a, this.mA / a, (this.mC * this.mTy - this.mD * this.mTx) / a, (this.mB * this.mTx - this.mA * this.mTy) / a);
  return this
};
ss2d.Matrix3.prototype.getMatF32Array = function(a) {
  a = a || new Float32Array(9);
  a[0] = this.mA;
  a[1] = this.mB;
  a[2] = this.mAB;
  a[3] = this.mC;
  a[4] = this.mD;
  a[5] = this.mCD;
  a[6] = this.mTx;
  a[7] = this.mTy;
  a[8] = this.mTxTy;
  return a
};
ss2d.ShaderSource = function(a, b, c) {
  this.mShaderId = -1;
  a && (this.mName = a, this.mCallbackFunction = b || null, this.mCallbackTarget = c || null, a = new XMLHttpRequest, a.mShaderSource = this, a.open("GET", atlasJSONFileName, !0), a.responseType = "text", a.onload = function() {
    var a = ss2d.ShaderSource.getShaderType(this.mShaderSource.mName);
    if(!a) {
      throw"Unable to find the shader type for: " + this.mName;
    }
    this.mShaderSource.compileSource(this.response, a);
    this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this.mShaderSource)
  }, a.send())
};
ss2d.ShaderSource.VS_EXT = ["vert", "vs", "vertex"];
ss2d.ShaderSource.FS_EXT = ["frag", "fs", "fragment"];
ss2d.ShaderSource.prototype.compileSource = function(a, b) {
  var c = ss2d.CURRENT_VIEW.mContext;
  this.mShaderId = c.createShader(b);
  c.shaderSource(this.mShaderId, a);
  c.compileShader(this.mShaderId);
  if(!c.getShaderParameter(this.mShaderId, c.COMPILE_STATUS)) {
    throw c.getShaderInfoLog(this.mShaderId);
  }
  this.mCallbackFunction && this.mCallbackFunction.call(null, this);
  return this
};
ss2d.ShaderSource.getShaderType = function(a) {
  var b = ss2d.CURRENT_VIEW.mContext;
  a = a.split(".").pop();
  var c = null;
  -1 != ss2d.ShaderSource.VS_EXT.indexOf(a) ? c = b.VERTEX_SHADER : -1 != ss2d.ShaderSource.FS_EXT.indexOf(a) && (c = b.FRAGMENT_SHADER);
  return c
};
ss2d.ShaderProgram = function(a, b, c) {
  var d = ss2d.CURRENT_VIEW.mContext;
  this.mProgramId = d.createProgram();
  this.mUniforms = {};
  this.mAttributes = {};
  for(var e in a) {
    d.attachShader(this.mProgramId, a[e].mShaderId)
  }
  d.linkProgram(this.mProgramId);
  if(!d.getProgramParameter(this.mProgramId, d.LINK_STATUS)) {
    throw"Link error";
  }
  this.use(d);
  for(var f in b) {
    a = b[f], this.mUniforms[a] = d.getUniformLocation(this.mProgramId, a)
  }
  for(var g in c) {
    b = c[g], this.mAttributes[b] = d.getAttribLocation(this.mProgramId, b)
  }
  ss2d.ShaderProgram.PROGRAM_IN_USE = null
};
ss2d.ShaderProgram.PROGRAM_IN_USE = null;
ss2d.ShaderProgram.prototype.use = function(a) {
  if(ss2d.ShaderProgram.PROGRAM_IN_USE != this) {
    var b = ss2d.ShaderProgram.PROGRAM_IN_USE;
    if(null != b) {
      for(var c in b.mAttributes) {
        a.disableVertexAttribArray(b.mAttributes[c])
      }
    }
    for(c in this.mAttributes) {
      a.enableVertexAttribArray(this.mAttributes[c])
    }
    a.useProgram(this.mProgramId);
    ss2d.ShaderProgram.PROGRAM_IN_USE = this
  }
};
ss2d.materials = {};
ss2d.materials.GPUParticle = function(a) {
  var b = a.mContext;
  a = (new ss2d.ShaderSource).compileSource(ss2d.materials.GPUParticle.VERTEX_SOURCE, b.VERTEX_SHADER);
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.GPUParticle.FRAGMENT_SOURCE, b.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([a, b], "uPMatrix uISMatrix uTotalTime uEmitterType uGravity uDeltaTime".split(" "), "aVertexPosition aPos_Dir aStartPos aColor aDeltaColor aRo_RoD_RaA_TaA aRa_RaD_A_DPS aPS_PSD_T_TS".split(" "));
  this.mActiveTexture = 0;
  this.mParticleDataBuffer = null;
  this.mEmitterType = 0;
  this.mGravity = [];
  this.mAuxF32Matrix = new Float32Array(9)
};
ss2d.materials.GPUParticle.prototype.updateParticle = function(a, b, c) {
  gl.bindBuffer(gl.ARRAY_BUFFER, support.mBuffers.mParticlesData);
  gl.bufferSubData(gl.ARRAY_BUFFER, 100 * c, b)
};
ss2d.materials.GPUParticle.prototype.apply = function(a) {
  var b = a.mContext;
  this.mShaderProgram.use(b);
  a.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, b.TEXTURE0);
  b.bindBuffer(b.ARRAY_BUFFER, a.mBuffers.mParticlesQVP);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, a.mBuffers.mParticlesQVP.itemSize, b.FLOAT, !1, 0, 0);
  b.uniform1f(this.mShaderProgram.mUniforms.uEmitterType, this.mEmitterType);
  b.uniform2fv(this.mShaderProgram.mUniforms.uGravity, this.mGravity);
  b.uniform1f(this.mShaderProgram.mUniforms.uTotalTime, ss2d.CURRENT_VIEW.mTotalTime);
  b.uniformMatrix3fv(this.mShaderProgram.mUniforms.uPMatrix, !1, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix));
  b.uniformMatrix3fv(this.mShaderProgram.mUniforms.uISMatrix, !1, ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().getMatF32Array(this.mAuxF32Matrix));
  b.bindBuffer(b.ARRAY_BUFFER, this.mParticleDataBuffer);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aPos_Dir, 4, b.FLOAT, !1, 104, 0);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aStartPos, 2, b.FLOAT, !1, 104, 16);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aColor, 4, b.FLOAT, !1, 104, 24);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aDeltaColor, 4, b.FLOAT, !1, 104, 40);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aRo_RoD_RaA_TaA, 4, b.FLOAT, !1, 104, 56);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aRa_RaD_A_DPS, 4, b.FLOAT, !1, 104, 72);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aPS_PSD_T_TS, 4, b.FLOAT, !1, 104, 88)
};
ss2d.materials.GPUParticle.VERTEX_SOURCE = "const float EMITTER_TYPE_GRAVITY = 0.0;const float EMITTER_TYPE_RADIAL = 1.0;attribute vec2 aVertexPosition;attribute vec4 aPos_Dir;attribute vec2 aStartPos;attribute vec4 aColor;attribute vec4 aDeltaColor;attribute vec4 aRo_RoD_RaA_TaA;attribute vec4 aRa_RaD_A_DPS;attribute vec4 aPS_PSD_T_TS;uniform mat3 uPMatrix;uniform mat3 uISMatrix;uniform float uTotalTime;uniform float uDeltaTime;uniform float uEmitterType;uniform vec2 uGravity;varying vec4 vColor;varying vec2 vTextureCoord;void main(void){float timeLapse = (uTotalTime - aPS_PSD_T_TS.w);float sizeToZero = 1.0; if(timeLapse > aPS_PSD_T_TS.z){ sizeToZero = 0.0; }vec2 pos = vec2(aPos_Dir.x, aPos_Dir.y);float angle = aRa_RaD_A_DPS.y;float scaleMultiplier = 1.0;if(uEmitterType == EMITTER_TYPE_RADIAL){angle += aRa_RaD_A_DPS.w * timeLapse;pos += vec2(-cos(angle) * aRa_RaD_A_DPS.x, -sin(angle) * aRa_RaD_A_DPS.x);} else {vec2 tmp = vec2(0.0, 0.0);vec2 radial = vec2(0.0, 0.0);vec2 tangential = vec2(0.0, 0.0);vec2 diff = aStartPos - radial;pos -= diff;if(pos.x != 0.0 || pos.y != 0.0){radial = normalize(pos);}tangential = vec2(radial.x, radial.y);radial *= aRo_RoD_RaA_TaA.z;float newy = tangential.x;tangential.x = -tangential.y;tangential.y = newy;tangential *= aRo_RoD_RaA_TaA.w;vec2 direction = (radial + tangential + uGravity) * timeLapse;pos += ((vec2(aPos_Dir.z, aPos_Dir.w) * timeLapse) + direction);pos += diff;}vColor = aColor + (aDeltaColor * timeLapse);float size = aPS_PSD_T_TS.x + (aPS_PSD_T_TS.y * timeLapse);size *= scaleMultiplier;vTextureCoord = aVertexPosition;gl_Position = vec4((uPMatrix * uISMatrix * vec3((aVertexPosition * size * sizeToZero) + pos - vec2(size * scaleMultiplier * 0.5, size * scaleMultiplier * 0.5), 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.GPUParticle.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;varying vec4 vColor;void main(void){vec4 color = texture2D(uSampler, vTextureCoord.xy);gl_FragData[0] = color * vColor;}";
ss2d.Defines = {};
var RENDER_CONTEXT = "webgl", COMPILING_CLIENT = !1, COMPILING_SERVER = !1, COMPILING_OFFLINE = !0, COMPILING_ADVANCE = !1;
ss2d.materials.Textured = function(a) {
  var b = a.mContext;
  a = (new ss2d.ShaderSource).compileSource(ss2d.materials.Textured.VERTEX_SOURCE, b.VERTEX_SHADER);
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.Textured.FRAGMENT_SOURCE, b.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([a, b], ["uMVPMatrix", "uTMatrix", "uSampler", "uColor"], ["aVertexPosition", "aTextureCoord"]);
  this.mModelViewMatrix = new ss2d.Matrix3;
  this.mTextureCoordMatrix = new ss2d.Matrix3;
  this.mActiveTexture = 0;
  this.mColor = [];
  this.mTextureCoordBuffer = this.mVertexPositionBuffer = null;
  this.mAuxVec4Array = new Float32Array(4);
  this.mAuxMat3Array = new Float32Array(9)
};
ss2d.materials.Textured.prototype.apply = function(a) {
  var b = a.mContext;
  this.mShaderProgram.use(b);
  a.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, b.TEXTURE0);
  b.uniformMatrix3fv(this.mShaderProgram.mUniforms.uTMatrix, !1, this.mTextureCoordMatrix.getMatF32Array(this.mAuxMat3Array));
  a = this.mModelViewMatrix.clone().concatMatrix(ss2d.CURRENT_VIEW.mProjection);
  b.uniformMatrix3fv(this.mShaderProgram.mUniforms.uMVPMatrix, !1, a.getMatF32Array(this.mAuxMat3Array));
  b.uniform4fv(this.mShaderProgram.mUniforms.uColor, this.mColor);
  b.bindBuffer(b.ARRAY_BUFFER, this.mVertexPositionBuffer);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, this.mVertexPositionBuffer.itemSize, b.FLOAT, !1, 0, 0);
  b.bindBuffer(b.ARRAY_BUFFER, this.mTextureCoordBuffer);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aTextureCoord, this.mTextureCoordBuffer.itemSize, b.FLOAT, !1, 0, 0)
};
ss2d.materials.Textured.VERTEX_SOURCE = "attribute vec2 aVertexPosition;attribute vec2 aTextureCoord;uniform mat3 uMVPMatrix;varying vec2 vTextureCoord;void main(void){vTextureCoord = aTextureCoord;gl_Position = vec4((uMVPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.Textured.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;uniform mat3 uTMatrix;uniform vec4 uColor;varying vec2 vTextureCoord;void main(void){vec4 color = texture2D(uSampler, (uTMatrix * vec3(vTextureCoord, 1.0)).xy);gl_FragData[0] = color * uColor;}";
ss2d.materials.Particle = function(a) {
  var b = a.mContext;
  a = (new ss2d.ShaderSource).compileSource(ss2d.materials.Particle.VERTEX_SOURCE, b.VERTEX_SHADER);
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.Particle.FRAGMENT_SOURCE, b.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([a, b], ["uPMatrix", "uScaleMatrix", "uSampler"], ["aVertexPosition", "aColor"]);
  this.mActiveTexture = 0;
  this.mParticleDataBuffer = null;
  this.mParticleDataArray = new ArrayBuffer;
  this.mAuxF32Matrix = new Float32Array(9)
};
ss2d.materials.Particle.prototype.apply = function(a) {
  var b = a.mContext;
  this.mShaderProgram.use(b);
  a.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, b.TEXTURE0);
  b.bindBuffer(b.ARRAY_BUFFER, this.mParticleDataBuffer);
  b.bufferSubData(b.ARRAY_BUFFER, 0, this.mParticleDataArray);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, 2, b.FLOAT, !1, 24, 0);
  b.vertexAttribPointer(this.mShaderProgram.mAttributes.aColor, 4, b.FLOAT, !1, 24, 8);
  b.uniformMatrix3fv(this.mShaderProgram.mUniforms.uPMatrix, !1, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix))
};
ss2d.materials.Particle.VERTEX_SOURCE = "attribute vec2 aVertexPosition;attribute vec4 aColor;uniform mat3 uScaleMatrix;uniform mat3 uPMatrix;varying vec4 vColor;varying vec2 vTextureCoord;void main(void){vColor = aColor;vTextureCoord = aVertexPosition;gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.Particle.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;varying vec4 vColor;void main(void){vec4 color = texture2D(uSampler, vTextureCoord.xy);gl_FragData[0] = color * vColor;}";
ss2d.RenderSupport = function(a) {
  this.mContext = a;
  this.mAuxMatrix = new ss2d.Matrix3;
  this.mAux2DCanvas = document.createElement("canvas");
  this.mAux2DContext = this.mAux2DCanvas.getContext("2d");
  this.mAux2DCanvas.width = this.mAux2DCanvas.height = 8;
  this.mAux2DContext.fillStyle = "#ffffff";
  this.mAux2DContext.fillRect(0, 0, 8, 8);
  this.mAux8x8Texture = new ss2d.Texture(this.mAux2DCanvas.toDataURL());
  "webgl" == RENDER_CONTEXT && (this.mMatrixStack = [], this.mCurrentMatrix = new ss2d.Matrix3, this.mColorStack = [], this.mCurrentColor = [1, 1, 1, 1], this.mActiveSampler = this.mActiveTexture = 0, a = this.mContext, this.mDefaultBlendSource = a.SRC_ALPHA, this.mDefaultBlendDestination = a.ONE_MINUS_SRC_ALPHA, a.blendFunc(this.mDefaultBlendSource, this.mDefaultBlendDestination), a.enable(a.BLEND), this.createBuiltInBuffers(), this.mMaterials = {}, this.mMaterials.mTextured = new ss2d.materials.Textured(this), 
  this.mMaterials.mParticle = new ss2d.materials.Particle(this), this.mMaterials.mGPUParticle = new ss2d.materials.GPUParticle(this))
};
ss2d.RenderSupport.prototype.pushTransform = function() {
};
ss2d.RenderSupport.prototype.popTransform = function() {
};
"webgl" == RENDER_CONTEXT ? (ss2d.RenderSupport.prototype.pushTransform = function(a, b) {
  b = b || [1, 1, 1, 1];
  a instanceof ss2d.DisplayObject && (a.getTransformationMatrix(), b = a.mColor.getF32Array(b, a.mAlpha));
  this.mColorStack.push(this.mCurrentColor.slice());
  this.mCurrentColor[0] *= b[0];
  this.mCurrentColor[1] *= b[1];
  this.mCurrentColor[2] *= b[2];
  this.mCurrentColor[3] *= b[3]
}, ss2d.RenderSupport.prototype.popTransform = function() {
  0 < this.mColorStack.length && (this.mCurrentColor = this.mColorStack.pop())
}, ss2d.RenderSupport.prototype.activeTextureForSampler = function(a, b, c) {
  if(this.mActiveTexture != a || this.mActiveSampler != b) {
    var d = this.mContext;
    this.mActiveTexture = a;
    this.mActiveSampler = b;
    d.activeTexture(c);
    d.bindTexture(d.TEXTURE_2D, this.mActiveTexture);
    d.uniform1i(this.mActiveSampler, 0)
  }
}, ss2d.RenderSupport.make2DProjection = function(a, b, c) {
  c = c || new ss2d.Matrix3;
  c.mA = 2 / a;
  c.mD = -2 / b;
  c.mTx = -1;
  c.mTy = 1;
  return c
}, ss2d.RenderSupport.prototype.createBuffer = function(a, b, c, d) {
  var e = this.mContext, f = e.createBuffer();
  e.bindBuffer(a, f);
  e.bufferData(a, b, e.STATIC_DRAW);
  f.itemSize = c;
  f.numItems = d;
  return f
}, ss2d.RenderSupport.prototype.createBuiltInBuffers = function() {
  var a = this.mContext;
  this.mBuffers = this.mBuffers || {};
  this.mBuffers.mQuadVertexPosition = this.createBuffer(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2, 4);
  this.mBuffers.mQuadTextureCoords = this.createBuffer(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2, 4);
  this.mBuffers.mQuadVertexIndex = this.createBuffer(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), 1, 6);
  for(var b = [], c = [], d = 0;2E3 > d;++d) {
    b = b.concat([0, 0, 1, 0, 1, 1, 0, 1]), c = c.concat([0 + 4 * d, 1 + 4 * d, 2 + 4 * d, 0 + 4 * d, 2 + 4 * d, 3 + 4 * d])
  }
  this.mBuffers.mParticlesQVP = this.createBuffer(a.ARRAY_BUFFER, new Float32Array(b), 2, b.length / 2);
  this.mBuffers.mParticlesQVI = this.createBuffer(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(c), 1, c.length)
}) : (ss2d.RenderSupport.prototype.pushTransform = function(a) {
  var b = a;
  a instanceof ss2d.DisplayObject && (b = a.getTransformationMatrix());
  this.mContext.save();
  this.mContext.globalAlpha *= a.mAlpha;
  this.mContext.transform(b.mA, b.mB, b.mC, b.mD, b.mTx, b.mTy)
}, ss2d.RenderSupport.prototype.popTransform = function() {
  this.mContext.restore()
});
ss2d.Texture = function(a, b, c) {
  this.mName = a;
  this.mTextureElement = new Image;
  this.mTextureElement.mTexture = this;
  this.mCallbackFunction = b || function() {
  };
  this.mCallbackTarget = c || null;
  this.mTextureElement.onload = function() {
    this.mTexture.handleLoadedTexture(this)
  };
  this.mTextureElement.src = a
};
ss2d.Texture.prototype.handleLoadedTexture = function() {
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
"webgl" == RENDER_CONTEXT && (ss2d.Texture.prototype.handleLoadedTexture = function(a) {
  try {
    var b = ss2d.CURRENT_VIEW.mContext, c = this.mTextureElement = a;
    this.mPOTWidth = c.width;
    this.mPOTHeight = c.height;
    var d = this.mTextureId = b.createTexture();
    b.bindTexture(b.TEXTURE_2D, d);
    if(!ss2d.Texture.isPowerOfTwo(c.width) || !ss2d.Texture.isPowerOfTwo(c.height)) {
      var e = document.createElement("canvas");
      e.width = this.mPOTWidth = ss2d.Texture.nextHighestPowerOfTwo(c.width);
      e.height = this.mPOTHeight = ss2d.Texture.nextHighestPowerOfTwo(c.height);
      e.getContext("2d").drawImage(c, 0, 0, c.width, c.height);
      c = e
    }
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, c);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
    b.generateMipmap(b.TEXTURE_2D);
    b.bindTexture(b.TEXTURE_2D, null)
  }catch(f) {
    console.log(f)
  }
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
});
ss2d.Texture.prototype.getWidth = function() {
  return this.mTextureElement.width
};
ss2d.Texture.prototype.getHeight = function() {
  return this.mTextureElement.height
};
ss2d.Texture.isPowerOfTwo = function(a) {
  return 0 == (a & a - 1)
};
ss2d.Texture.nextHighestPowerOfTwo = function(a) {
  --a;
  for(var b = 1;32 > b;b <<= 1) {
    a |= a >> b
  }
  return a + 1
};
ss2d.TextureAtlas = function(a, b, c) {
  this.mName = a;
  this.mCallbackFunction = b;
  this.mCallbackTarget = c;
  this.mTexture = this.mAtlasDescriptor = null;
  b = new XMLHttpRequest;
  b.mAtlas = this;
  b.open("GET", a, !0);
  b.responseType = "text";
  b.onload = function() {
    this.mAtlas.atlasFileLoaded(this.response)
  };
  b.send()
};
ss2d.TextureAtlas.prototype.atlasFileLoaded = function(a) {
  this.mAtlasDescriptor = JSON.parse(a);
  a = this.mName.lastIndexOf("/") + 1;
  var b = this.mAtlasDescriptor.meta.image;
  a = 0 < a ? this.mName.substring(0, a) + b : b;
  this.mTexture = new ss2d.Texture(a, this.textureLoaded, this)
};
ss2d.TextureAtlas.prototype.textureLoaded = function(a) {
  this.mTexture = a;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.TextureAtlas.prototype.getClipFor = function(a, b) {
  b = b || [];
  var c = this.mAtlasDescriptor.frames[a].frame;
  c && (b[0] = c.x, b[1] = c.y, b[2] = c.w, b[3] = c.h);
  return b
};
ss2d.ILoader = {};
ss2d.ILoader.RESOURCE_EXTENSION = "";
ss2d.ILoader.loadResource = function() {
};
ss2d.TextureAtlasLoader = {};
ss2d.TextureAtlasLoader.RESOURCE_EXTENSION = "atlas";
ss2d.TextureAtlasLoader.loadResource = function(a, b, c) {
  return new ss2d.TextureAtlas(a, b, c)
};
ss2d.ReelFrame = function(a, b, c, d, e, f) {
  this.mX = a;
  this.mY = b;
  this.mWidth = c;
  this.mHeight = d;
  this.mOffsetX = e || 0;
  this.mOffsetY = f || 0
};
ss2d.ReelFrame.prototype.dumpClip = function(a) {
  a = a || Array(4);
  a[0] = this.mX;
  a[1] = this.mY;
  a[2] = this.mWidth;
  a[3] = this.mHeight;
  return a
};
ss2d.Reel = function(a, b) {
  this.mFrames = [];
  this.mName = a;
  this.mDuration = b
};
ss2d.Reel.prototype.getTimePerFrame = function() {
  return this.mFrames.length ? this.mDuration / this.mFrames.length : 0
};
ss2d.Reel.getFramesFromGrid = function(a, b, c, d, e, f) {
  e = e || [];
  for(var g = 0;g < d;g++) {
    var h = Math.floor(g / c);
    e.push([(g - h * c) * a, h * b, a, b, 0, 0])
  }
  a = JSON.stringify(e);
  if(f) {
    for(;-1 != a.indexOf("],[");) {
      a = a.replace("],[", "],\n[")
    }
  }
  return a
};
ss2d.Color = function(a, b) {
  this.setValue(a, b)
};
ss2d.Color.prototype.setValue = function(a, b) {
  if(a instanceof ss2d.Color) {
    this.mColorArray = a.mColorArray.slice(0)
  }else {
    if(a instanceof Array && 2 < a.length) {
      this.mColorArray = a.slice(0), b && (this.mColorArray[0] = 255 * a[0], this.mColorArray[1] = 255 * a[1], this.mColorArray[2] = 255 * a[2])
    }else {
      if("string" == typeof a || "number" == typeof a) {
        "string" == typeof a && (a = parseInt("0x" + a.replace("#", "").substring(0, 6))), a &= 16777215, this.mColorArray = [(a & 16711680) >> 16, (a & 65280) >> 8, a & 255]
      }
    }
  }
};
ss2d.Color.prototype.setRGB = function(a, b, c) {
  this.mColorArray[0] = a;
  this.mColorArray[1] = b;
  this.mColorArray[2] = c
};
ss2d.Color.prototype.getRed = function() {
  return this.mColorArray[0]
};
ss2d.Color.prototype.setRed = function(a) {
  this.mColorArray[0] = a
};
ss2d.Color.prototype.getGreen = function() {
  return this.mColorArray[1]
};
ss2d.Color.prototype.setGreen = function(a) {
  this.mColorArray[1] = a
};
ss2d.Color.prototype.getBlue = function() {
  return this.mColorArray[2]
};
ss2d.Color.prototype.setBlue = function(a) {
  this.mColorArray[2] = a
};
ss2d.Color.prototype.getRGBArray = function() {
  return this.mColorArray
};
ss2d.Color.prototype.getHexString = function() {
  var a = Math.floor(this.mColorArray[0]).toString(16), a = 1 == a.length ? "0" + a : a, b = Math.floor(this.mColorArray[1]).toString(16), b = 1 == b.length ? "0" + b : b, c = Math.floor(this.mColorArray[2]).toString(16), c = 1 == c.length ? "0" + c : c;
  return"#" + a + b + c
};
ss2d.Color.prototype.getRGBAString = function(a) {
  return"rgba(" + this.mColorArray[0] + "," + this.mColorArray[1] + "," + this.mColorArray[2] + "," + (a || "1.0") + ")"
};
ss2d.Color.prototype.getF32Array = function(a, b) {
  a = a || Array(3);
  a[0] = this.mColorArray[0] / 255;
  a[1] = this.mColorArray[1] / 255;
  a[2] = this.mColorArray[2] / 255;
  a[3] = b;
  return a
};
ss2d.Color.prototype.getF32 = function() {
  return(this.mColorArray[0] << 16) + (this.mColorArray[1] << 8) + this.mColorArray[2]
};
ss2d.Color.interpolate = function(a, b, c) {
  a = new ss2d.Color(a);
  b = new ss2d.Color(b);
  a.mColorArray[0] += (b.mColorArray[0] - a.mColorArray[0]) * c;
  a.mColorArray[1] += (b.mColorArray[1] - a.mColorArray[1]) * c;
  a.mColorArray[2] += (b.mColorArray[2] - a.mColorArray[2]) * c;
  delete b;
  return a
};
ss2d.DefaultConfig = {};
ss2d.DefaultConfig.FRAME_RATE = 60;
ss2d.DefaultConfig.CANVAS_WIDTH = 800;
ss2d.DefaultConfig.CANVAS_HEIGHT = 600;
ss2d.DefaultConfig.SERVER_HOST = "localhost";
ss2d.DefaultConfig.SERVER_PORT = 0;
ss2d.IAnimatable = function() {
  this.mTarget = null
};
ss2d.IAnimatable.prototype.tick = function() {
};
ss2d.IAnimatable.prototype.isComplete = function() {
};
ss2d.DelayedInvocation = function(a, b, c, d) {
  this.mTarget = a;
  this.mMethods = b;
  this.mValues = c;
  this.mDelayTime = d;
  this.mPassedTime = 0;
  this.mComplete = !1
};
ss2d.DelayedInvocation.prototype.performCalls = function() {
  if(this.mMethods instanceof Array) {
    for(var a = 0;a < this.mMethods.lenght;++a) {
      this.callMethodWithValues(this.mMethods[a], this.mValues)
    }
  }else {
    this.callMethodWithValues(this.mMethods, this.mValues)
  }
};
ss2d.DelayedInvocation.prototype.callMethodWithValues = function(a, b) {
  b instanceof Array ? a.apply(this.mTarget, b) : a.call(this.mTarget, b)
};
ss2d.DelayedInvocation.prototype.tick = function(a) {
  this.mComplete || (this.mPassedTime += a, this.mPassedTime >= this.mDelayTime && (this.mComplete = !0, this.performCalls(), delete this.mValues, delete this.mMethods))
};
ss2d.DelayedInvocation.prototype.isComplete = function() {
  return this.mComplete
};
ss2d.Juggler = function() {
  this.mObjects = [];
  this.mElapsedTime = 0
};
ss2d.Juggler.prototype.tick = function(a) {
  this.mElapsedTime += a;
  for(var b = this.mObjects.slice(), c = 0;c < b.length;++c) {
    var d = b[c];
    d.tick(a);
    d.isComplete() && this.removeObject(d)
  }
};
ss2d.Juggler.prototype.addObject = function(a) {
  a && this.mObjects.push(a)
};
ss2d.Juggler.prototype.removeObject = function(a) {
  a = this.mObjects.indexOf(a);
  -1 < a && this.mObjects.splice(a, 1)
};
ss2d.Juggler.prototype.removeAllObjects = function() {
  this.mObjects.splice(0, this.mObjects.length)
};
ss2d.Juggler.prototype.removeObjectsWithTarget = function(a) {
  for(var b = [], c = 0;c < this.mObjects.length;++c) {
    var d = this.mObjects[c];
    d.mTarget != a && b.push(d)
  }
  delete this.mObjects;
  this.mObjects = b
};
ss2d.Juggler.prototype.delayInvocation = function(a, b, c, d) {
  this.addObject(new ss2d.DelayedInvocation(a, b, c, d))
};
ss2d.IAudioComponent = function() {
};
ss2d.IAudioComponent.prototype.play = function() {
};
ss2d.IAudioComponent.prototype.pause = function() {
};
ss2d.IAudioComponent.prototype.stop = function() {
};
ss2d.HTML5Audio = function(a, b) {
  this.mName = a;
  this.mAudioElement = new Audio;
  this.mAudioElement.mSound = this;
  this.mAudioElement.preload = !0;
  this.mAudioElement.mCallbackFunction = b || function() {
  };
  b && this.mAudioElement.addEventListener("canplay", function() {
    this.mCallbackFunction.call(null, this.mSound)
  });
  this.mAudioElement.addEventListener("ended", function() {
    this.mSound.stop()
  });
  this.mAudioElement.src = a
};
ss2d.HTML5Audio.prototype.play = function() {
  this.mAudioElement.play();
  return this
};
ss2d.HTML5Audio.prototype.pause = function() {
  this.mAudioElement.pause()
};
ss2d.HTML5Audio.prototype.stop = function() {
  this.mAudioElement.pause();
  this.mAudioElement.currentTime = 0
};
ss2d.Input = function(a) {
  this.mView = a;
  a = a.mCanvas;
  a.style.outline = "none";
  this.mView.mHaveFocus = !0;
  this.mMobileDevice = !1;
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
    this.mMobileDevice = !0, a.style.webkitTapHighlightColor = "rgba(0,0,0,0)"
  }
  this.mMobileDevice || (window.navigator.msPointerEnabled ? window.addEventListener("MSPointerDown", ss2d.Input.windowMouseEventHandler, !0) : window.addEventListener("mousedown", ss2d.Input.windowMouseEventHandler, !0));
  window.addEventListener("keydown", ss2d.Input.handleEventCaller, !0);
  window.addEventListener("keyup", ss2d.Input.handleEventCaller, !0);
  window.navigator.msPointerEnabled ? (a.addEventListener("MSPointerDown", ss2d.Input.handleEventCaller, !0), a.addEventListener("MSPointerUp", ss2d.Input.handleEventCaller, !0), a.addEventListener("MSPointerMove", ss2d.Input.handleEventCaller, !0)) : (a.addEventListener("mousedown", ss2d.Input.handleEventCaller, !0), a.addEventListener("mouseup", ss2d.Input.handleEventCaller, !0), a.addEventListener("mousemove", ss2d.Input.handleEventCaller, !0));
  a.addEventListener("touchstart", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchend", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchcancel", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchleave", ss2d.Input.handleEventCaller, !1);
  this.mPressedKeys = {};
  this.mMouseY = this.mMouseX = -50;
  this.mPreviousMouseY = this.mPreviousMouseX = 0;
  this.mMouseDown = !1;
  this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
  this.mPreviousMousePoint = new ss2d.Point(this.mPreviousMouseX, this.mPreviousMouseY);
  this.mClicked = this.mPreviousMouseDown = !1;
  this.mCleanKeysOnFocusOut = !0
};
ss2d.Input.getInput = function() {
  return ss2d.CURRENT_VIEW.mInput
};
ss2d.Input.Keys = {};
ss2d.Input.Keys.TAB = 9;
ss2d.Input.Keys.SHIFT = 16;
ss2d.Input.Keys.CTRL = 17;
ss2d.Input.Keys.ALT = 18;
ss2d.Input.Keys.SPACE = 32;
ss2d.Input.Keys.ARROW_LEFT = 37;
ss2d.Input.Keys.ARROW_UP = 38;
ss2d.Input.Keys.ARROW_RIGHT = 39;
ss2d.Input.Keys.ARROW_DOWN = 40;
ss2d.Input.Keys.ZERO = 48;
ss2d.Input.Keys.ONE = 49;
ss2d.Input.Keys.TWO = 50;
ss2d.Input.Keys.THREE = 51;
ss2d.Input.Keys.FOUR = 52;
ss2d.Input.Keys.FIVE = 53;
ss2d.Input.Keys.SIX = 54;
ss2d.Input.Keys.SEVEN = 55;
ss2d.Input.Keys.EIGHT = 56;
ss2d.Input.Keys.NINE = 57;
ss2d.Input.Keys.A = 65;
ss2d.Input.Keys.B = 66;
ss2d.Input.Keys.C = 67;
ss2d.Input.Keys.D = 68;
ss2d.Input.Keys.E = 69;
ss2d.Input.Keys.F = 70;
ss2d.Input.Keys.G = 71;
ss2d.Input.Keys.H = 72;
ss2d.Input.Keys.I = 73;
ss2d.Input.Keys.J = 74;
ss2d.Input.Keys.K = 75;
ss2d.Input.Keys.L = 76;
ss2d.Input.Keys.M = 77;
ss2d.Input.Keys.N = 78;
ss2d.Input.Keys.O = 79;
ss2d.Input.Keys.P = 80;
ss2d.Input.Keys.Q = 81;
ss2d.Input.Keys.R = 82;
ss2d.Input.Keys.S = 83;
ss2d.Input.Keys.T = 84;
ss2d.Input.Keys.U = 85;
ss2d.Input.Keys.V = 86;
ss2d.Input.Keys.W = 87;
ss2d.Input.Keys.X = 88;
ss2d.Input.Keys.Y = 89;
ss2d.Input.Keys.Z = 90;
ss2d.Input.prototype.tick = function() {
  this.mPreviousMouseX = this.mMouseX;
  this.mPreviousMouseY = this.mMouseY;
  this.mPreviousMousePoint.mX = this.mPreviousMouseX;
  this.mPreviousMousePoint.mY = this.mPreviousMouseY;
  this.mPreviousMouseDown = this.mMouseDown;
  this.mMouseDown = this.mClicked
};
ss2d.Input.handleEventCaller = function(a) {
  ss2d.CURRENT_VIEW.mInput.handleEvent(a)
};
ss2d.Input.windowMouseEventHandler = function(a) {
  a = a || window.event;
  var b = ss2d.CURRENT_VIEW.mInput;
  if("undefined" != typeof a.toElement && a.toElement != ss2d.CURRENT_VIEW.mCanvas || "undefined" != typeof a.target && a.target != ss2d.CURRENT_VIEW.mCanvas && b.mView.mHaveFocus) {
    b.onFocusOut()
  }else {
    b.mView.mHaveFocus = !0
  }
};
ss2d.Input.prototype.handleEvent = function(a) {
  a = a || window.event;
  var b = !0;
  switch(a.type) {
    case "mousedown":
    ;
    case "touchstart":
    ;
    case "MSPointerDown":
      b = this.onMouseDown(a);
      break;
    case "mouseup":
    ;
    case "touchend":
    ;
    case "touchcancel":
    ;
    case "MSPointerUp":
      b = this.onMouseUp(a);
      break;
    case "keydown":
      b = this.onKeyDown(a);
      break;
    case "keyup":
      b = this.onKeyUp(a);
      break;
    case "mousemove":
    ;
    case "touchmove":
    ;
    case "MSPointerMove":
      b = this.onMouseMove(a)
  }
  return b
};
ss2d.Input.prototype.getTouch = function(a, b) {
  if(b && b.targetTouches) {
    return b.targetTouches[a] || !1
  }
  if(window.event && window.event.targetTouches) {
    return window.event.targetTouches[a] || !1
  }
};
ss2d.Input.prototype.onMouseDown = function(a) {
  var b = this.mMobileDevice ? this.getTouch(0, a) : a;
  if(!b) {
    return!1
  }
  this.mMouseX = b.offsetX || b.pageX - this.mView.mCanvas.offsetLeft;
  this.mMouseY = b.offsetY || b.pageY - this.mView.mCanvas.offsetTop;
  this.mMousePoint.mX = this.mMouseX;
  this.mMousePoint.mY = this.mMouseY;
  if(this.mMobileDevice && b || !this.mMobileDevice) {
    this.onFocusIn(), this.mClicked = !0, a.preventDefault(), a.stopPropagation(), this.mView.mCanvas.addEventListener("touchmove", ss2d.Input.handleEventCaller, !1)
  }
  return!1
};
ss2d.Input.prototype.onMouseUp = function(a) {
  this.mClicked = this.mMouseDown = !1;
  a.preventDefault();
  a.stopPropagation();
  this.mView.mCanvas.removeEventListener("touchmove", ss2d.Input.handleEventCaller, !1);
  return!1
};
ss2d.Input.prototype.onKeyDown = function(a) {
  return this.mView.mHaveFocus ? (this.mPressedKeys["_" + parseInt(a.keyCode)] = !0, (37 == a.keyCode || 38 == a.keyCode || 39 == a.keyCode || 40 == a.keyCode || 32 == a.keyCode) && a.preventDefault(), !1) : !0
};
ss2d.Input.prototype.onKeyUp = function(a) {
  this.mPressedKeys["_" + parseInt(a.keyCode)] = !1;
  delete this.mPressedKeys["_" + parseInt(a.keyCode)];
  return!this.mView.mHaveFocus
};
ss2d.Input.prototype.onFocusIn = function() {
  this.mView.mHaveFocus = !0
};
ss2d.Input.prototype.onFocusOut = function() {
  this.mClicked = this.mView.mHaveFocus = !1;
  if(this.mCleanKeysOnFocusOut) {
    for(var a in this.mPressedKeys) {
      this.mPressedKeys[a] = !1, delete this.mPressedKeys[a]
    }
  }
};
ss2d.Input.prototype.onMouseMove = function(a) {
  if(a = this.mMobileDevice ? this.getTouch(0, a) : a) {
    this.mMouseX = a.offsetX || a.pageX - this.mView.mCanvas.offsetLeft, this.mMouseY = a.offsetY || a.pageY - this.mView.mCanvas.offsetTop, this.mMousePoint.mX = this.mMouseX, this.mMousePoint.mY = this.mMouseY
  }
};
ss2d.Input.prototype.isKeyPressed = function(a) {
  return null != this.mPressedKeys["_" + a] ? !0 : !1
};
ss2d.Input.prototype.getTransformedMousePoint = function() {
  return ss2d.CURRENT_VIEW.mMainScene instanceof ss2d.DisplayObjectContainer ? ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(this.mMousePoint) : this.mMousePoint
};
ss2d.Input.prototype.toJSON = function() {
  var a = this.getTransformedMousePoint();
  if(isNaN(a.mX) || isNaN(a.mY)) {
    a = this.mMousePoint
  }
  var b;
  b = "{" + ('"keys":' + JSON.stringify(this.mPressedKeys) + ",");
  b += '"mx":' + a.mX + ",";
  b += '"my":' + a.mY + ",";
  b += '"md":' + this.mMouseDown;
  return b + "}"
};
ss2d.Rectangle = function(a, b, c, d) {
  this.mX = a;
  this.mY = b;
  this.mWidth = c;
  this.mHeight = d
};
ss2d.Rectangle.prototype.setValues = function(a, b, c, d) {
  this.mX = a;
  this.mY = b;
  this.mWidth = c;
  this.mHeight = d;
  return this
};
ss2d.Rectangle.prototype.clone = function() {
  return new ss2d.Rectangle(this.mX, this.mY, this.mWidth, this.mHeight)
};
ss2d.Rectangle.prototype.toString = function() {
  return"(" + this.mX + "," + this.mY + "," + this.mWidth + "," + this.mHeight + ")"
};
ss2d.Rectangle.prototype.contains = function(a, b) {
  return a >= this.mX && b >= this.mY && a <= this.mX + this.mWidth && b <= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.containsPoint = function(a) {
  return this.contains(a.mX, a.mY)
};
ss2d.Rectangle.prototype.containsRectangle = function(a) {
  return a.mX >= this.mX && a.mX + a.mWidth <= this.mX + this.mWidth && a.mY >= this.mY && a.mY + a.mHeight <= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.intersectsRectangle = function(a) {
  var b = a.mX, c = a.mY, d = a.mWidth;
  a = a.mHeight;
  return!(b <= this.mX && b + d <= this.mX || b >= this.mX + this.mWidth && b + d >= this.mX + this.mWidth || c <= this.mY && c + a <= this.mY || c >= this.mY + this.mHeight && c + a >= this.mY + this.mHeight)
};
ss2d.Rectangle.prototype.intersectionWithRectangle = function(a, b) {
  if(!a) {
    return null
  }
  b = b || new ss2d.Rectangle(0, 0, 0, 0);
  var c = Math.max(this.mX, a.mX), d = Math.min(this.mX + this.mWidth, a.mX + a.mWidth), e = Math.max(this.mY, a.mY), f = Math.min(this.mY + this.mHeight, a.mY + a.mHeight);
  c > d || e > f || b.setValues(c, e, d - c, f - e);
  return b
};
ss2d.Rectangle.prototype.uniteWithRectangle = function(a) {
  targetRectangle || (targetRectangle = this.clone());
  if(!a) {
    return targetRectangle ? targetRectangle.setValues(this.mX, this.mY, this.mWidth, this.mHeight) : targetRectangle
  }
  var b = Math.min(this.mX, a.mX), c = Math.max(this.mX + this.mWidth, a.mX + a.mWidth), d = Math.min(this.mY, a.mY);
  a = Math.max(this.mY + this.mHeight, a.mY + a.mHeight);
  return targetRectangle.setValues(b, d, c - b, a - d)
};
ss2d.Object = {};
ss2d.Object.CLASSES = [];
ss2d.Object.OBJECT_COUNT = 0;
ss2d.Object.assignClassId = function(a, b) {
  a.prototype.CLASS_ID = b;
  ss2d.Object.CLASSES[b] = a
};
ss2d.Object.getObjectPrototype = function(a) {
  return ss2d.Object.CLASSES[a.cid]
};
ss2d.Object.convertStringToArrayBuffer = function(a) {
  return ss2d.Object.LZWCompressor.compress(a)
};
ss2d.Object.convertArrayBufferToString = function(a) {
  return ss2d.Object.LZWCompressor.decompress(a)
};
ss2d.Object.convertSceneObject = function(a) {
  ss2d.Object.CLASSES[treeObject.cid].convert(a);
  return a
};
ss2d.Object.backupAndDeleteObjectProperties = function(a) {
  var b = {};
  for(valueKey in a) {
    b[valueKey] = a[valueKey], delete a[valueKey]
  }
  return b
};
ss2d.Object.LZWCompressor = {compress:function(a) {
  var b, c = {}, d, e, f = "", g = [], h = 256;
  for(b = 0;256 > b;b += 1) {
    c[String.fromCharCode(b)] = b
  }
  for(b = 0;b < a.length;b += 1) {
    d = a.charAt(b), e = f + d, c.hasOwnProperty(e) ? f = e : (g.push(c[f]), c[e] = h++, f = String(d))
  }
  "" !== f && g.push(c[f]);
  return g
}, decompress:function(a) {
  var b, c = [], d, e, f;
  f = "";
  var g = 256;
  for(b = 0;256 > b;b += 1) {
    c[b] = String.fromCharCode(b)
  }
  e = d = String.fromCharCode(a[0]);
  for(b = 1;b < a.length;b += 1) {
    f = a[b];
    if(c[f]) {
      f = c[f]
    }else {
      if(f === g) {
        f = d + d.charAt(0)
      }else {
        return null
      }
    }
    e += f;
    c[g++] = d + f.charAt(0);
    d = f
  }
  return e
}};
ss2d.DisplayObject = function(a, b, c, d, e, f) {
  this.mLocation = new ss2d.Point(a || 0, b || 0);
  this.mRotation = d || 0;
  this.mPivotY = this.mPivotX = 0;
  this.mScaleX = c || 1;
  this.mScaleY = c || 1;
  this.mParent = null;
  this.mColor = e instanceof ss2d.Color ? e : new ss2d.Color(e || 16777215);
  this.mAlpha = f || 1;
  this.mObjectId = ss2d.Object.OBJECT_COUNT++;
  COMPILING_SERVER && (this.mSoundList = []);
  this.mInheritAlpha = this.mInheritColor = !0
};
ss2d.Object.assignClassId(ss2d.DisplayObject, 1001);
ss2d.DisplayObject.prototype.getTransformationMatrix = function(a) {
  a = a || new ss2d.Matrix3;
  (0 != this.mPivotX || 0 != this.mPivotY) && a.translate(-this.mPivotX, -this.mPivotY);
  (1 != this.mScaleX || 1 != this.mScaleY) && a.scale(this.mScaleX, this.mScaleY);
  0 != this.mRotation && a.rotate(this.mRotation);
  (0 != this.mLocation.mX || 0 != this.mLocation.mY) && a.translate(this.mLocation.mX, this.mLocation.mY);
  return a
};
ss2d.DisplayObject.prototype.getWorldTransformationMatrix = function(a, b, c) {
  var d = [], e = this;
  for(b = b || null;e && e.mParent != b;) {
    d.push(e.mParent), e = e.mParent
  }
  a = a || new ss2d.Matrix3;
  a = c ? this.getTransformationMatrix(a) : a;
  b = new ss2d.Matrix3;
  for(matIndex in d) {
    b.identity(), d[matIndex].getTransformationMatrix(b), a.concatMatrix(b)
  }
  return a
};
ss2d.DisplayObject.prototype.worldToLocal = function(a) {
  return this.getWorldTransformationMatrix().invert().transformPoint(a)
};
ss2d.DisplayObject.prototype.localToWorld = function(a) {
  return this.getWorldTransformationMatrix().transformPoint(a)
};
ss2d.DisplayObject.prototype.setGlobalLocation = function() {
  this.setLocation(this.worldToLocal(p))
};
ss2d.DisplayObject.prototype.setLocation = function() {
  this.mLocation.mX = p.mX;
  this.mLocation.mY = p.mY
};
ss2d.DisplayObject.prototype.collideWith = function(a) {
  var b = this.getBounds();
  a = a.getBounds();
  return b && a ? b.intersectsRectangle(a) : !1
};
ss2d.DisplayObject.prototype.tick = function() {
};
ss2d.DisplayObject.prototype.render = function() {
};
ss2d.DisplayObject.prototype.getBounds = function() {
  return new ss2d.Rectangle
};
ss2d.DisplayObject.prototype.hitTestPoint = function() {
  return null
};
ss2d.DisplayObject.prototype.getWidth = function() {
  return 0
};
ss2d.DisplayObject.prototype.getHeight = function() {
  return 0
};
ss2d.DisplayObject.prototype.setWidth = function() {
};
ss2d.DisplayObject.prototype.setHeight = function() {
};
COMPILING_CLIENT && (ss2d.DisplayObject.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.DisplayObject.call(a);
  a.__proto__ = ss2d.DisplayObject.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.DisplayObject.prototype.restoreSerializedProperties = function(a) {
  this.CLASS_ID = a.cid;
  this.mLocation.mX = a.x || this.mLocation.mX;
  this.mLocation.mY = a.y || this.mLocation.mY;
  this.mRotation = a.r || this.mRotation;
  this.mPivotX = a.px || this.mPivotX;
  this.mPivotY = a.py || this.mPivotY;
  this.mScaleX = a.sx || this.mScaleX;
  this.mScaleY = a.sy || this.mScaleY;
  this.mColor = new ss2d.Color(a.c) || this.mColor;
  this.mAlpha = a.a || this.mAlpha
}, ss2d.DisplayObject.createFromSerializedObject = function(a) {
  var b = new ss2d.DisplayObject(a.x, a.y, a.s, a.r, a.c);
  b.mObjectId = a.doid;
  return b
}, ss2d.DisplayObject.prototype.interpolateState = function(a, b, c, d) {
  this.mLocation.mX = a.x ? a.x + (b.x - a.x) * c : this.mLocation.mX;
  this.mLocation.mY = a.y ? a.y + (b.y - a.y) * c : this.mLocation.mY;
  this.mRotation = a.r ? a.r + (b.r - a.r) * c : this.mRotation;
  this.mPivotX = a.px ? a.px + (b.px - a.px) * c : this.mPivotX;
  this.mPivotY = a.py ? a.py + (b.py - a.py) * c : this.mPivotY;
  this.mScaleX = a.sx ? a.sx + (b.sx - a.sx) * c : this.mScaleX;
  this.mScaleY = a.sy ? a.sy + (b.sy - a.sy) * c : this.mScaleY;
  if(a.c) {
    var e = ss2d.Color.interpolate(a.c, b.c, c).getRGBArray();
    this.mColor.setRGB(e[0], e[1], e[2])
  }
  this.mAlpha = a.a ? a.a + (b.a - a.a) * c : this.mAlpha;
  this.playSoundList(a);
  this.tick && this.tick(d)
}, ss2d.DisplayObject.prototype.playSoundList = function(a) {
  var b = a.snds;
  if(null != b) {
    for(var c in b) {
      b = a.snds[childIndex];
      try {
        ss2d.ResourceManager.loadSound(b).play()
      }catch(d) {
      }
    }
    delete a.snds
  }
});
COMPILING_SERVER && (ss2d.DisplayObject.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.DisplayObject.prototype.getPropertiesJSON = function() {
  var a;
  a = "" + ('"cid":' + this.CLASS_ID + ",");
  a += '"doid":' + this.mObjectId + ",";
  a += '"x":' + Math.floor(1E3 * this.mLocation.mX) / 1E3 + ",";
  a += '"y":' + Math.floor(1E3 * this.mLocation.mY) / 1E3 + ",";
  a += '"r":' + Math.floor(100 * this.mRotation) / 100 + ",";
  a += '"px":' + this.mPivotX + ",";
  a += '"py":' + this.mPivotY + ",";
  a += '"sx":' + this.mScaleX + ",";
  a += '"sy":' + this.mScaleY + ",";
  a += '"c":' + JSON.stringify(this.mColor.getRGBArray()) + ",";
  a += '"a":' + this.mAlpha;
  return a += ',"snds":' + JSON.stringify(this.mSoundList)
});
ss2d.DisplayObject.prototype.getX = function() {
  return this.mLocation.mX
};
ss2d.DisplayObject.prototype.setX = function(a) {
  this.mLocation.mX = a
};
ss2d.DisplayObject.prototype.getY = function() {
  return this.mLocation.mY
};
ss2d.DisplayObject.prototype.setY = function(a) {
  this.mLocation.mY = a
};
ss2d.DisplayObject.prototype.getRotation = function() {
  return this.mRotation
};
ss2d.DisplayObject.prototype.setRotation = function(a) {
  return this.mRotation = a
};
ss2d.DisplayObject.prototype.getPivotX = function() {
  return this.mPivotX
};
ss2d.DisplayObject.prototype.setPivotX = function(a) {
  this.mPivotX = a
};
ss2d.DisplayObject.prototype.getPivotY = function() {
  return this.mPivotY
};
ss2d.DisplayObject.prototype.setPivotY = function(a) {
  this.mPivotY = a
};
ss2d.DisplayObject.prototype.getScaleX = function() {
  return this.ScaleX
};
ss2d.DisplayObject.prototype.setScaleX = function(a) {
  this.mScaleX = a
};
ss2d.DisplayObject.prototype.getScaleY = function() {
  return this.ScaleY
};
ss2d.DisplayObject.prototype.setScaleY = function(a) {
  this.mScaleY = a
};
ss2d.DisplayObject.prototype.getAlpha = function() {
  return this.mAlpha
};
ss2d.DisplayObject.prototype.setAlpha = function(a) {
  this.mAlpha = a
};
ss2d.Quad = function(a, b, c, d, e) {
  ss2d.DisplayObject.call(this, a, b, 1, 0, e, 1);
  this.mWidth = c;
  this.mHeight = d
};
goog.inherits(ss2d.Quad, ss2d.DisplayObject);
ss2d.Object.assignClassId(ss2d.Quad, 1003);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Quad.prototype.render = "webgl" == RENDER_CONTEXT ? function(a) {
    var b = a.mContext, c = a.mMaterials.mTextured, d = (new ss2d.Matrix3).scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix()).concatMatrix(this.getWorldTransformationMatrix(null, null));
    a.pushTransform(this);
    c.mModelViewMatrix = d;
    var d = a.mCurrentColor.slice(), e = this.mInheritAlpha ? a.mCurrentColor[3] : this.mAlpha;
    this.mInheritColor || this.mColor.getF32Array(d, e);
    c.mColor = d;
    c.mActiveTexture = a.mAux8x8Texture.mTextureId;
    c.mVertexPositionBuffer = a.mBuffers.mQuadVertexPosition;
    c.mTextureCoordBuffer = a.mBuffers.mQuadTextureCoords;
    c.apply(a);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.mBuffers.mQuadVertexIndex);
    b.drawElements(b.TRIANGLES, a.mBuffers.mQuadVertexIndex.numItems, b.UNSIGNED_SHORT, 0);
    a.popTransform()
  } : function(a) {
    a.pushTransform(this);
    var b = a.mContext;
    b.fillStyle = this.mColor.getHexString();
    b.fillRect(0, 0, this.mWidth, this.mHeight);
    a.popTransform()
  }
}
ss2d.Quad.prototype.getWidth = function() {
  return this.mWidth
};
ss2d.Quad.prototype.getHeight = function() {
  return this.mHeight
};
ss2d.Quad.prototype.setWidth = function(a) {
  this.mWidth = a
};
ss2d.Quad.prototype.setHeight = function(a) {
  this.mHeight = a
};
ss2d.Quad.prototype.getBounds = function() {
  return new ss2d.Rectangle(this.mLocation.mX - this.mPivotX * this.mScaleX, this.mLocation.mY - this.mPivotY * this.mScaleY, this.getWidth() * this.mScaleX, this.getHeight() * this.mScaleY)
};
ss2d.Quad.prototype.hitTestPoint = function(a) {
  a = this.worldToLocal(a);
  return this.getBounds().containsPoint(a) ? this : null
};
COMPILING_CLIENT && (ss2d.Quad.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.Quad.call(a);
  a.__proto__ = ss2d.Quad.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.Quad.prototype.restoreSerializedProperties = function(a) {
  ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, a);
  this.mWidth = a.w || this.mWidth;
  this.mHeight = a.h || this.mHeight
}, ss2d.Quad.createFromSerializedObject = function(a) {
  var b = new ss2d.Quad(a.x, a.y, a.w, a.h, a.c);
  b.mObjectId = a.doid;
  return b
}, ss2d.Quad.prototype.interpolateState = function(a, b, c, d) {
  ss2d.DisplayObject.prototype.interpolateState.call(this, a, b, c, d);
  this.mWidth = a.w ? a.w + (b.w - a.w) * c : this.mWidth;
  this.mHeight = a.h ? a.h + (b.h - a.h) * c : this.mHeight
});
COMPILING_SERVER && (ss2d.Quad.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Quad.prototype.getPropertiesJSON = function() {
  var a = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",", a = a + ('"w": ' + this.getWidth() + ",");
  return a += '"h": ' + this.getHeight()
});
ss2d.Skeleton = function(a, b, c) {
  this.mName = a;
  this.mCallbackFunction = b;
  this.mCallbackTarget = c || null;
  this.mIncludeAnimations = !1;
  b = new XMLHttpRequest;
  b.mSkeleton = this;
  b.open("GET", a, !0);
  b.responseType = "text";
  b.onload = function() {
    this.mSkeleton.skeletonDataLoaded(this.response)
  };
  b.send()
};
ss2d.Skeleton.prototype.skeletonDataLoaded = function(a) {
  this.mSkeletonData = JSON.parse(a);
  ss2d.Skeleton.allDegToRad(this.mSkeletonData);
  this.mSkeletonData.animations && (this.mIncludeAnimations = !0);
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.Skeleton.allDegToRad = function(a) {
  var b = 1 / (180 / Math.PI), c;
  for(c in a) {
    "rotation" == c || "angle" == c ? (180 < a[c] ? a[c] -= 360 : -180 > a[c] && (a[c] += 360), a[c] *= b) : "y" == c ? a[c] *= -1 : "object" == typeof a[c] && "scale" != c && ss2d.Skeleton.allDegToRad(a[c])
  }
};
ss2d.SkeletonLoader = {};
ss2d.SkeletonLoader.RESOURCE_EXTENSION = "skl";
ss2d.SkeletonLoader.loadResource = function(a, b, c) {
  return new ss2d.Skeleton(a, b, c)
};
ss2d.ParticleSystem = function(a, b, c) {
  this.mName = a;
  this.mCallbackFunction = b;
  this.mCallbackTarget = c;
  this.mTexture = this.mSystemDescriptor = null;
  b = new XMLHttpRequest;
  b.mSystem = this;
  b.open("GET", a, !0);
  b.responseType = "text";
  b.onload = function() {
    this.mSystem.loaded(this.response)
  };
  b.send()
};
ss2d.ParticleSystem.prototype.loaded = function(a) {
  this.mSystemDescriptor = (new XML.ObjTree).parseXML(a).particleEmitterConfig;
  var b = this.mName.lastIndexOf("/") + 1;
  a = this.mSystemDescriptor.texture["-name"];
  b = 0 < b ? this.mName.substring(0, b) + a : a;
  this.mTexture = ss2d.CURRENT_VIEW.mRenderSupport.mAux8x8Texture;
  0 < a.length && (this.mTexture = ss2d.ResourceManager.loadTexture(b, this.textureLoaded, this))
};
ss2d.ParticleSystem.prototype.textureLoaded = function(a) {
  this.mTexture = a;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.ParticleSystemLoader = {};
ss2d.ParticleSystemLoader.RESOURCE_EXTENSION = "particle";
ss2d.ParticleSystemLoader.loadResource = function(a, b, c) {
  return new ss2d.ParticleSystem(a, b, c)
};
ss2d.ReelSet = function(a, b, c) {
  this.mName = a;
  this.mCallbackFunction = b;
  this.mCallbackTarget = c || null;
  this.mReelSetDescriptor = null;
  this.mReels = {};
  this.mTexture = null;
  b = new XMLHttpRequest;
  b.mReelSet = this;
  b.open("GET", a, !0);
  b.responseType = "text";
  b.onload = function() {
    this.mReelSet.reelSetLoaded(this.response)
  };
  b.send()
};
ss2d.ReelSet.prototype.reelSetLoaded = function(a) {
  this.mReelSetDescriptor = JSON.parse(a);
  this.mReels = {};
  for(var b in this.mReelSetDescriptor.reels) {
    var c = this.mReelSetDescriptor.reels[b];
    a = new ss2d.Reel(b, c.duration);
    for(var c = c.frames, d = 0;d < c.length;++d) {
      var e = c[d];
      a.mFrames.push(new ss2d.ReelFrame(e[0], e[1], e[2], e[3], e[4], e[5]))
    }
    this.mReels[b] = a
  }
  b = this.mName.lastIndexOf("/") + 1;
  a = this.mReelSetDescriptor.image;
  b = 0 < b ? this.mName.substring(0, b) + a : a;
  this.mTexture = new ss2d.Texture(b, this.mCallbackFunction, this.mCallbackTarget)
};
ss2d.ReelSetLoader = {};
ss2d.ReelSetLoader.RESOURCE_EXTENSION = "reelset";
ss2d.ReelSetLoader.loadResource = function(a, b, c) {
  return new ss2d.ReelSet(a, b, c)
};
ss2d.SkeletalAnimation = function(a, b, c) {
  a && (this.mName = a, this.mCallbackFunction = b, this.mCallbackTarget = c || null, b = new XMLHttpRequest, b.mSkeletalAnimation = this, b.open("GET", a, !0), b.responseType = "text", b.onload = function() {
    this.mSkeletalAnimation.animationDataLoaded(this.response)
  }, b.send())
};
ss2d.SkeletalAnimation.prototype.animationDataLoaded = function(a) {
  this.mAnimationData = JSON.parse(a);
  ss2d.Skeleton.allDegToRad(this.mAnimationData);
  this.mDuration = ss2d.SkeletalAnimation.findMaxTime(this.mAnimationData, 0);
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.SkeletalAnimation.prototype.setFromSkeleton = function(a) {
  this.mAnimationData = a;
  this.mDuration = ss2d.SkeletalAnimation.findMaxTime(this.mAnimationData, 0)
};
ss2d.SkeletalAnimation.findMaxTime = function(a, b) {
  b = b || 0;
  for(var c in a) {
    "time" == c ? b = Math.max(a[c], b) : "object" == typeof a[c] && (b = ss2d.SkeletalAnimation.findMaxTime(a[c], b))
  }
  return b
};
ss2d.SkeletalAnimationLoader = {};
ss2d.SkeletalAnimationLoader.RESOURCE_EXTENSION = "sklanim";
ss2d.SkeletalAnimationLoader.loadResource = function(a, b, c) {
  return new ss2d.SkeletalAnimation(a, b, c)
};
ss2d.WebAudio = function(a, b) {
  if(a) {
    this.mName = a;
    this.mCallbackFunction = b || function() {
    };
    this.mSoundSources = [];
    this.mPausedSource = this.mLastSource = this.mSoundBuffer = null;
    var c = new XMLHttpRequest;
    c.mSound = this;
    c.open("GET", a, !0);
    c.responseType = "arraybuffer";
    c.onload = function() {
      this.mSound.mSoundBuffer = ss2d.AUDIO_CONTEXT.createBuffer(this.response, !1);
      this.mSound.mCallbackFunction(this.mSound)
    };
    c.send()
  }
};
ss2d.WebAudio.prototype.play = function() {
  var a = this.mPausedSource || ss2d.AUDIO_CONTEXT.createBufferSource();
  this.mPausedSource = null;
  a.buffer = this.mSoundBuffer;
  a.connect(ss2d.AUDIO_CONTEXT.destination);
  a.noteOn(0);
  return this.mLastSource = a
};
ss2d.WebAudio.prototype.pause = function() {
  this.mLastSource && (this.mLastSource.noteOff(0), this.mPausedSource = this.mLastSource)
};
ss2d.WebAudio.prototype.stop = function() {
  this.mLastSource && (this.mLastSource.noteOff(0), this.mLastSource.disconnect(), this.mLastSource = null)
};
ss2d.WebAudio.getAudioContext = function() {
  if(ss2d.AUDIO_CONTEXT) {
    return ss2d.AUDIO_CONTEXT
  }
  if("undefined" !== typeof AudioContext) {
    return new AudioContext
  }
  if("undefined" !== typeof webkitAudioContext) {
    return new webkitAudioContext
  }
  console.log("AudioContext not supported");
  return null
};
ss2d.AudioLoader = {};
ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if("undefined" != typeof webkitAudioContext || "undefined" != typeof AudioContext) {
  ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio
}
ss2d.AudioLoader.RESOURCE_EXTENSION = "sound";
ss2d.AudioLoader.loadResource = function(a, b, c) {
  return new ss2d.AudioLoader.AUDIO_COMPONENT_CLASS(a, b, c)
};
var XML = {ObjTree:function() {
  return this
}};
XML.ObjTree.VERSION = "0.23";
XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
XML.ObjTree.prototype.attr_prefix = "-";
XML.ObjTree.prototype.parseXML = function(a) {
  var b;
  if(window.DOMParser) {
    b = new DOMParser;
    a = b.parseFromString(a, "application/xml");
    if(!a) {
      return
    }
    b = a.documentElement
  }else {
    window.ActiveXObject && (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.loadXML(a), b = b.documentElement)
  }
  if(b) {
    return this.parseDOM(b)
  }
};
XML.ObjTree.prototype.parseHTTP = function(a, b, c) {
  var d = {}, e;
  for(e in b) {
    d[e] = b[e]
  }
  d.method || (d.method = "undefined" == typeof d.postBody && "undefined" == typeof d.postbody && "undefined" == typeof d.parameters ? "get" : "post");
  if(c) {
    d.asynchronous = !0;
    var f = this, g = d.onComplete;
    d.onComplete = function(a) {
      var b;
      a && (a.responseXML && a.responseXML.documentElement) && (b = f.parseDOM(a.responseXML.documentElement));
      c(b, a);
      g && g(a)
    }
  }else {
    d.asynchronous = !1
  }
  var h;
  if("undefined" != typeof HTTP && HTTP.Request) {
    if(d.uri = a, a = new HTTP.Request(d)) {
      h = a.transport
    }
  }else {
    if("undefined" != typeof Ajax && Ajax.Request && (a = new Ajax.Request(a, d))) {
      h = a.transport
    }
  }
  if(c) {
    return h
  }
  if(h && h.responseXML && h.responseXML.documentElement) {
    return this.parseDOM(h.responseXML.documentElement)
  }
};
XML.ObjTree.prototype.parseDOM = function(a) {
  if(a) {
    this.__force_array = {};
    if(this.force_array) {
      for(var b = 0;b < this.force_array.length;b++) {
        this.__force_array[this.force_array[b]] = 1
      }
    }
    b = this.parseElement(a);
    this.__force_array[a.nodeName] && (b = [b]);
    if(11 != a.nodeType) {
      var c = {};
      c[a.nodeName] = b;
      b = c
    }
    return b
  }
};
XML.ObjTree.prototype.parseElement = function(a) {
  if(7 != a.nodeType) {
    if(3 == a.nodeType || 4 == a.nodeType) {
      return null == a.nodeValue.match(/[^\x00-\x20]/) ? void 0 : a.nodeValue
    }
    var b, c = {};
    if(a.attributes && a.attributes.length) {
      b = {};
      for(var d = 0;d < a.attributes.length;d++) {
        var e = a.attributes[d].nodeName;
        if("string" == typeof e) {
          var f = a.attributes[d].nodeValue;
          f && (e = this.attr_prefix + e, "undefined" == typeof c[e] && (c[e] = 0), c[e]++, this.addNode(b, e, c[e], f))
        }
      }
    }
    if(a.childNodes && a.childNodes.length) {
      e = !0;
      b && (e = !1);
      for(d = 0;d < a.childNodes.length && e;d++) {
        f = a.childNodes[d].nodeType, 3 == f || 4 == f || (e = !1)
      }
      if(e) {
        b || (b = "");
        for(d = 0;d < a.childNodes.length;d++) {
          b += a.childNodes[d].nodeValue
        }
      }else {
        b || (b = {});
        for(d = 0;d < a.childNodes.length;d++) {
          if(e = a.childNodes[d].nodeName, "string" == typeof e && (f = this.parseElement(a.childNodes[d]))) {
            "undefined" == typeof c[e] && (c[e] = 0), c[e]++, this.addNode(b, e, c[e], f)
          }
        }
      }
    }
    return b
  }
};
XML.ObjTree.prototype.addNode = function(a, b, c, d) {
  this.__force_array[b] ? (1 == c && (a[b] = []), a[b][a[b].length] = d) : 1 == c ? a[b] = d : 2 == c ? a[b] = [a[b], d] : a[b][a[b].length] = d
};
XML.ObjTree.prototype.writeXML = function(a) {
  a = this.hash_to_xml(null, a);
  return this.xmlDecl + a
};
XML.ObjTree.prototype.hash_to_xml = function(a, b) {
  var c = [], d = [], e;
  for(e in b) {
    if(b.hasOwnProperty(e)) {
      var f = b[e];
      e.charAt(0) != this.attr_prefix ? c[c.length] = "undefined" == typeof f || null == f ? "<" + e + " />" : "object" == typeof f && f.constructor == Array ? this.array_to_xml(e, f) : "object" == typeof f ? this.hash_to_xml(e, f) : this.scalar_to_xml(e, f) : d[d.length] = " " + e.substring(1) + '="' + this.xml_escape(f) + '"'
    }
  }
  d = d.join("");
  e = c.join("");
  "undefined" == typeof a || null == a || (e = 0 < c.length ? e.match(/\n/) ? "<" + a + d + ">\n" + e + "</" + a + ">\n" : "<" + a + d + ">" + e + "</" + a + ">\n" : "<" + a + d + " />\n");
  return e
};
XML.ObjTree.prototype.array_to_xml = function(a, b) {
  for(var c = [], d = 0;d < b.length;d++) {
    var e = b[d];
    c[c.length] = "undefined" == typeof e || null == e ? "<" + a + " />" : "object" == typeof e && e.constructor == Array ? this.array_to_xml(a, e) : "object" == typeof e ? this.hash_to_xml(a, e) : this.scalar_to_xml(a, e)
  }
  return c.join("")
};
XML.ObjTree.prototype.scalar_to_xml = function(a, b) {
  return"#text" == a ? this.xml_escape(b) : "<" + a + ">" + this.xml_escape(b) + "</" + a + ">\n"
};
XML.ObjTree.prototype.xml_escape = function(a) {
  return(a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
ss2d.BitmapFont = function(a, b, c) {
  this.mName = a;
  this.mCallbackFunction = b;
  this.mCallbackTarget = c;
  this.mTexture = this.mFontDescriptor = null;
  this.mMidHeight = this.mMidWidth = 0;
  b = new XMLHttpRequest;
  b.mBitmapFont = this;
  b.open("GET", a, !0);
  b.responseType = "text";
  b.onload = function() {
    this.mBitmapFont.fontFileLoaded(this.response)
  };
  b.send()
};
ss2d.BitmapFont.prototype.fontFileLoaded = function(a) {
  this.mFontDescriptor = (new XML.ObjTree).parseXML(a);
  a = this.mFontDescriptor.font.chars["char"];
  for(var b = 0, c = 0, d = {}, e = 0;e < a.length;++e) {
    var f = a[e], b = b + parseInt(f["-xadvance"]), c = c + parseInt(f["-height"]);
    d[a[e]["-id"]] = f;
    f["-x"] = parseInt(f["-x"]);
    f["-xoffset"] = parseInt(f["-xoffset"]);
    f["-y"] = parseInt(f["-y"]);
    f["-width"] = parseInt(f["-width"]);
    f["-height"] = parseInt(f["-height"]);
    f["-xadvance"] = parseInt(f["-xadvance"]);
    f["-yoffset"] = parseInt(f["-yoffset"])
  }
  this.mFontDescriptor.mIndexedChars = d;
  this.mMidWidth = b / a.length;
  this.mMidHeight = c / a.length;
  a = this.mFontDescriptor.font.pages.page;
  a = a["-file"];
  b = this.mName.lastIndexOf("/") + 1;
  a = 0 < b ? this.mName.substring(0, b) + a : a;
  this.mTexture = new ss2d.Texture(a, this.fontTextureLoaded, this)
};
ss2d.BitmapFont.prototype.fontTextureLoaded = function(a) {
  this.mTexture = a;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.BitmapFont.prototype.getGlyphClip = function(a, b) {
  b = b || [];
  var c = this.mFontDescriptor.mIndexedChars[a];
  c && (b[0] = c["-x"], b[1] = c["-y"], b[2] = c["-width"], b[3] = c["-height"], b[4] = c["-xadvance"], b[5] = c["-yoffset"]);
  return b
};
ss2d.BitmapFontLoader = {};
ss2d.BitmapFontLoader.RESOURCE_EXTENSION = "bmfont";
ss2d.BitmapFontLoader.loadResource = function(a, b, c) {
  return new ss2d.BitmapFont(a, b, c)
};
ss2d.TextureLoader = {};
ss2d.TextureLoader.RESOURCE_EXTENSION = "texture";
ss2d.TextureLoader.loadResource = function(a, b, c) {
  return new ss2d.Texture(a, b, c)
};
ss2d.ResourceManager = {};
ss2d.ResourceManager.LOADED_RESOURCES = {};
ss2d.ResourceManager.ELEMENTS_TO_LOAD = 0;
ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;
ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
};
ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
};
ss2d.ResourceManager.ACTIVE_LOADER = function(a) {
  throw"No active loader for: " + a;
};
ss2d.ResourceManager.Loaders = {TEXTURE:ss2d.TextureLoader, SOUND:ss2d.AudioLoader, TEXTURE_ATLAS:ss2d.TextureAtlasLoader, BITMAP_FONT:ss2d.BitmapFontLoader, REELSET:ss2d.ReelSetLoader, SKELETON:ss2d.SkeletonLoader, SKELETAL_ANIMATION:ss2d.SkeletalAnimationLoader, PARTICLE_SYSTEM:ss2d.ParticleSystemLoader};
ss2d.ResourceManager.loadResources = function(a, b, c) {
  if(a instanceof Array) {
    ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = c || function() {
    };
    ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = b || function() {
    };
    ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;
    0 == a.length && (ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK.call(), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
    }, ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
    });
    b = 0;
    for(resKey in a) {
      "object" == typeof a[resKey] && ++b
    }
    ss2d.ResourceManager.ELEMENTS_TO_LOAD = a.length - b;
    for(resKey in a) {
      b = a[resKey], "object" == typeof b ? ss2d.ResourceManager.ACTIVE_LOADER = b : ss2d.ResourceManager.loadResourceWithLoader(ss2d.ResourceManager.ACTIVE_LOADER, b, ss2d.ResourceManager.loadEndsCallback)
    }
    ss2d.ResourceManager.ACTIVE_LOADER = function(a) {
      throw"No active loader for: " + a;
    }
  }
};
ss2d.ResourceManager.loadResourceWithLoader = function(a, b, c, d) {
  var e = ss2d.ResourceManager.LOADED_RESOURCES, f = b + "." + a.RESOURCE_EXTENSION;
  e[f] ? c && c.call(d, e[f]) : e[f] = a.loadResource(b, c, d || null);
  return e[f]
};
ss2d.ResourceManager.loadEndsCallback = function(a) {
  ++ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD;
  ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK(a.mName, ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceManager.ELEMENTS_TO_LOAD);
  ss2d.ResourceManager.ELEMENTS_TO_LOAD == ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD && (console.log("Load resources ends"), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK.call(), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
  }, ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
  })
};
ss2d.ResourceManager.loadTexture = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureLoader, a, b, c)
};
ss2d.ResourceManager.loadTextureAtlas = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureAtlasLoader, a, b, c)
};
ss2d.ResourceManager.loadSound = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.AudioLoader, a, b, c)
};
ss2d.ResourceManager.loadBitmapFont = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.BitmapFontLoader, a, b, c)
};
ss2d.ResourceManager.loadReelSet = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.ReelSetLoader, a, b, c)
};
ss2d.ResourceManager.loadSkeleton = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.SkeletonLoader, a, b, c)
};
ss2d.ResourceManager.loadSkeletalAnimation = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.SkeletalAnimationLoader, a, b, c)
};
ss2d.ResourceManager.loadParticleSystem = function(a, b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.ParticleSystemLoader, a, b, c)
};
ss2d.Sprite = function(a, b, c, d, e, f) {
  ss2d.Quad.call(this, a, b, c, d);
  if(COMPILING_CLIENT || COMPILING_OFFLINE) {
    this.mTextureAtlas = f || null, this.mTexture = e || null, this.mReady = !1, "string" == typeof f ? f = ss2d.ResourceManager.loadTextureAtlas(f, function(a) {
      this.mTextureAtlas = a;
      this.mReady = !0
    }, this) : "string" == typeof e && !f && (e = ss2d.ResourceManager.loadTexture(e, function(a) {
      this.mTexture = a;
      this.mReady = !0;
      0 >= this.mWidth && 0 >= this.mHeight && (this.mWidth = this.mTexture.mTextureElement.width, this.mHeight = this.mTexture.mTextureElement.height)
    }, this))
  }
  this.mClip = []
};
goog.inherits(ss2d.Sprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.Sprite, 1004);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Sprite.prototype.render = "webgl" == RENDER_CONTEXT ? function(a) {
    if(this.mReady && !(this.mTextureAtlas && -1 == this.mTextureAtlas.mTextureId) && (this.mTextureAtlas || -1 != this.mTexture.mTextureId)) {
      var b = this.mTexture;
      this.mTextureAtlas && (b = this.mTextureAtlas.mTexture) && this.mTextureAtlas.mAtlasDescriptor && this.mTextureAtlas.getClipFor(this.mTexture, this.mClip);
      if(b && b.mTextureElement) {
        var c = a.mContext, d = a.mMaterials.mTextured, e = (new ss2d.Matrix3).scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix()).concatMatrix(this.getWorldTransformationMatrix(null, null));
        if(!this.mClip || 3 >= this.mClip.length) {
          this.mClip = [0, 0, b.mTextureElement.width, b.mTextureElement.height]
        }
        var f = new ss2d.Matrix3, g = b.mPOTWidth, h = b.mPOTHeight;
        f.scale(this.mClip[2] / g, this.mClip[3] / h);
        f.translate(this.mClip[0] / g, this.mClip[1] / h);
        a.pushTransform(this);
        d.mModelViewMatrix = e;
        e = a.mCurrentColor.slice();
        g = this.mInheritAlpha ? a.mCurrentColor[3] : this.mAlpha;
        this.mInheritColor || this.mColor.getF32Array(e, g);
        d.mColor = e;
        d.mTextureCoordMatrix = f;
        d.mActiveTexture = b.mTextureId;
        d.mVertexPositionBuffer = a.mBuffers.mQuadVertexPosition;
        d.mTextureCoordBuffer = a.mBuffers.mQuadTextureCoords;
        d.apply(a);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a.mBuffers.mQuadVertexIndex);
        c.drawElements(c.TRIANGLES, a.mBuffers.mQuadVertexIndex.numItems, c.UNSIGNED_SHORT, 0);
        a.popTransform()
      }
    }
  } : function(a) {
    var b = null;
    this.mTextureAtlas ? this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor && (b = this.mTextureAtlas.mTexture.mTextureElement, this.mTextureAtlas.getClipFor(this.mTexture, this.mClip)) : b = this.mTexture.mTextureElement;
    a.pushTransform(this);
    var c = a.mContext;
    b && (3 < this.mClip.length ? c.drawImage(b, this.mClip[0], this.mClip[1], this.mClip[2], this.mClip[3], 0, 0, this.mWidth, this.mHeight) : c.drawImage(b, 0, 0, this.mWidth, this.mHeight));
    a.popTransform()
  }, ss2d.Sprite.prototype.setTexture = function(a, b) {
    "string" == typeof b ? b = ss2d.ResourceManager.loadTextureAtlas(b) : "string" == typeof a && !b && (a = ss2d.ResourceManager.loadTexture(a));
    this.mTextureAtlas = b || null;
    this.mTexture = a || null
  }
}
ss2d.Sprite.prototype.setClip = function(a, b, c, d) {
  a instanceof ss2d.Rectangle ? (this.mClip[0] = a.mX, this.mClip[1] = b.mY, this.mClip[2] = c.mWidth, this.mClip[3] = d.mHeight) : (this.mClip[0] = a, this.mClip[1] = b, this.mClip[2] = c, this.mClip[3] = d)
};
COMPILING_CLIENT && (ss2d.Sprite.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.Sprite.call(a);
  a.__proto__ = ss2d.Sprite.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.Sprite.prototype.restoreSerializedProperties = function(a) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, a);
  this.mTexture = this.mTexture || ss2d.ResourceManager.loadTexture(a.t);
  this.mClip = a.clip || null
}, ss2d.Sprite.createFromSerializedObject = function(a) {
  var b = new ss2d.Sprite(a.x, a.y, a.w, a.h, a.t, a.c);
  b.mObjectId = a.doid;
  return b
}, ss2d.Sprite.prototype.interpolateState = function(a, b, c, d) {
  ss2d.Quad.prototype.interpolateState.call(this, a, b, c, d);
  this.mTexture = a.t && a.t != this.mTexture.mName ? ss2d.ResourceManager.loadTexture(a.t) : this.mTexture;
  this.mClip = a.clip || this.mClip
});
COMPILING_SERVER && (ss2d.Sprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Sprite.prototype.getPropertiesJSON = function(a) {
  var b = ss2d.Quad.prototype.getPropertiesJSON.call(this);
  a && (b += ',"t": "' + this.mTexture.mName + '"');
  this.mClip && 3 < this.mClip.length && (b += ',"clip": ' + JSON.stringify(this.mClip));
  this.mPrevSerializedTexture = this.mTexture.mName;
  return b
});
ss2d.RigidBody = function(a, b, c) {
  if(!a) {
    throw"Rigid body component requires an owner";
  }
  this.mOwner = a;
  this.mBodyType = b || ss2d.RigidBody.Types.BOX;
  "undefined" == typeof c && (c = !0);
  this.mDyniamicBody = c;
  this.reset()
};
ss2d.RigidBody.Types = {BOX:1, CIRCLE:2, POLYGON:3};
ss2d.RigidBody.prototype.reset = function() {
  var a = ss2d.PhysicalWorld.getWorld();
  switch(this.mBodyType) {
    case ss2d.RigidBody.Types.BOX:
      var b = this.mOwner.getBounds();
      this.mOwner.mPivotX = 0.5 * b.mWidth;
      this.mOwner.mPivotY = 0.5 * b.mHeight;
      var c = this.mOwner.mLocation;
      this.mBody = a.createBox(c.mX, c.mY, 0.5 * b.mWidth, 0.5 * b.mHeight, !this.mDyniamicBody);
      this.mBody.m_rotation = -this.mOwner.mRotation + Math.PI;
      break;
    case ss2d.RigidBody.Types.CIRCLE:
      break;
    case ss2d.RigidBody.Types.POLYGON:
      break;
    default:
      throw"[" + bodyType + "] is not a valid body type";
  }
};
ss2d.RigidBody.prototype.destroy = function() {
  ss2d.PhysicalWorld.getWorld().mWorld.DestroyBody(this.mBody)
};
ss2d.RigidBody.prototype.tick = function() {
  this.mBody && (this.mOwner.mLocation.mX = this.mBody.m_position.x, this.mOwner.mLocation.mY = this.mBody.m_position.y, this.mOwner.mRotation = -this.mBody.m_rotation - Math.PI)
};
ss2d.ReelSprite = function(a, b, c, d, e) {
  ss2d.Sprite.call(this, a, b, 1, 1);
  this.mScaleX = this.mScaleY = c || 1;
  if(!d) {
    throw"Trying to create a sprite reel without specifying a ss2d.ReelSet";
  }
  this.mReelSetName = d;
  this.mPlayingReel = this.mReelSet = null;
  this.mDefaultReel = e || !1;
  this.mLoop = !0;
  this.mTimeDilation = 1;
  this.mComplete = this.mPlaying = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0;
  this.mTexture = null;
  this.mClip = [0, 0, 0, 0];
  this.mOffsetY = this.mOffsetX = 0;
  ss2d.ResourceManager.loadReelSet(d, this.setup, this)
};
goog.inherits(ss2d.ReelSprite, ss2d.Sprite);
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);
ss2d.ReelSprite.prototype.setup = function() {
  this.mReelSet = ss2d.ResourceManager.loadReelSet(this.mReelSetName);
  if(this.mDefaultReel) {
    this.playReel(this.mDefaultReel)
  }else {
    for(var a in this.mReelSet.mReels) {
      this.playReel(a);
      break
    }
  }
  this.mTexture = this.mReelSet.mTexture;
  this.mPlayingReel.mFrames[0].dumpClip(this.mClip)
};
ss2d.ReelSprite.prototype.playReel = function(a) {
  this.mReelSet && (this.mPlayingReel = a && this.mReelSet.mReels[a] ? this.mReelSet.mReels[a] : this.mPlayingReel, this.mPlayingReel.mFrames[0].dumpClip(this.mClip));
  this.mPlaying = !0;
  this.mComplete = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0
};
ss2d.ReelSprite.prototype.pauseReel = function() {
  this.mPlaying = !1
};
ss2d.ReelSprite.prototype.resumeReel = function() {
  this.mPlaying = !0
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.ReelSprite.prototype.tick = function(a) {
    this.updateReelAnimation(a)
  }, ss2d.ReelSprite.prototype.updateReelAnimation = function(a) {
    if(this.mPlaying && this.mReelSet) {
      this.mTexture || (this.mTexture = this.mReelSet.mTexture);
      var b = this.mPlayingReel.getTimePerFrame();
      this.mElapsedTimeCurrentFrame += a * Math.abs(this.mTimeDilation);
      if(0.01 < Math.abs(this.mTimeDilation) && this.mElapsedTimeCurrentFrame >= b && (a = Math.floor(this.mElapsedTimeCurrentFrame / b), 0 > this.mTimeDilation && (a *= -1), this.mFrameCount += a, this.mElapsedTimeCurrentFrame -= b, 0 < this.mTimeDilation && this.mFrameCount >= this.mPlayingReel.mFrames.length ? this.mLoop ? this.mElapsedTimeCurrentFrame = this.mFrameCount = 0 : (this.mFrameCount--, this.mComplete = !0, this.mPlaying = !1) : 0 > this.mTimeDilation && 0 > this.mFrameCount && (this.mLoop ? 
      (this.mFrameCount = this.mPlayingReel.mFrames.length - 1, this.mElapsedTimeCurrentFrame = 0) : (this.mFrameCount++, this.mComplete = !0, this.mPlaying = !1)), b = this.mPlayingReel.mFrames[this.mFrameCount])) {
        b.dumpClip(this.mClip), this.mOffsetX = b.mOffsetX, this.mOffsetY = b.mOffsetY, this.mWidth = this.mClip[2], this.mHeight = this.mClip[3]
      }
    }
  }, ss2d.ReelSprite.prototype.render = function(a) {
    this.mTexture && (this.mLocation.mX += this.mOffsetX, this.mLocation.mY += this.mOffsetY, ss2d.Sprite.prototype.render.call(this, a), this.mLocation.mX -= this.mOffsetX, this.mLocation.mY -= this.mOffsetY)
  }
}
;ss2d.DisplayObjectContainer = function(a, b, c, d) {
  ss2d.DisplayObject.call(this, a, b, c, d);
  this.mChildren = [];
  COMPILING_SERVER && (this.mRemovedObjectsIds = [])
};
goog.inherits(ss2d.DisplayObjectContainer, ss2d.DisplayObject);
ss2d.Object.assignClassId(ss2d.DisplayObjectContainer, 1002);
ss2d.DisplayObjectContainer.prototype.tick = function(a) {
  this.tickChildren(a)
};
ss2d.DisplayObjectContainer.prototype.tickChildren = function(a) {
  for(var b in this.mChildren) {
    this.mChildren[b].tick && this.mChildren[b].tick(a)
  }
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.DisplayObjectContainer.prototype.render = function(a) {
    a.pushTransform(this);
    for(var b in this.mChildren) {
      this.mChildren[b].render(a)
    }
    a.popTransform()
  }
}
ss2d.DisplayObjectContainer.prototype.addObject = function(a) {
  if(a instanceof Array) {
    for(var b in a) {
      this.addObject(a[b])
    }
  }else {
    a instanceof ss2d.DisplayObject && (a.mParent && a.mParent.removeObject(a), a.mParent = this, this.mChildren.push(a))
  }
};
ss2d.DisplayObjectContainer.prototype.removeObject = function(a) {
  if(a instanceof Array) {
    for(var b in a) {
      this.removeObject(a[b])
    }
  }else {
    b = this.mChildren.indexOf(a), -1 != b && (COMPILING_SERVER && this.mRemovedObjectsIds.push(a.mObjectId), this.mChildren.splice(b, 1)), a.mParent = null
  }
};
ss2d.DisplayObjectContainer.prototype.removeAll = function() {
  this.removeObject(this.mChildren.slice())
};
ss2d.DisplayObjectContainer.prototype.hitTestPoint = function(a) {
  for(var b = null, c = this.mChildren.length - 1;0 <= c && !b;--c) {
    b = this.mChildren[c].hitTestPoint(a)
  }
  return b
};
ss2d.DisplayObjectContainer.prototype.getBounds = function() {
  if(0 == this.mChildren.length) {
    var a = this.localToWorld(this.mLocation);
    return new ss2d.Rectangle(a.mX, a.mY)
  }
  for(var a = this.mChildren[0].getBounds(), b = a.mX, c = a.mY, d = a.mX + a.mWidth, e = a.mY + a.mHeight, f = 1;f < this.mChildren.length;++f) {
    a = this.mChildren[f].getBounds(), b = b < a.mX ? b : a.mX, c = c < a.mY ? c : a.mY, d = d > a.mX + a.mWidth ? d : a.mX + a.mWidth, e = e > a.mY + a.mHeight ? e : a.mY + a.mHeight
  }
  return new ss2d.Rectangle(b, c, (d - b) * this.mScaleX, (e - c) * this.mScaleY)
};
COMPILING_CLIENT && (ss2d.DisplayObjectContainer.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.DisplayObjectContainer.call(a);
  a.__proto__ = ss2d.DisplayObjectContainer.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.DisplayObjectContainer.prototype.restoreSerializedProperties = function(a) {
  ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, a);
  for(var b in a.clist) {
    var c = a.clist[b];
    ss2d.Object.CLASSES[c.cid].convert(c);
    this.addObject(c)
  }
}, ss2d.DisplayObjectContainer.createFromSerializedObject = function(a) {
  var b = new ss2d.DisplayObjectContainer(a.x, a.y);
  b.mObjectId = a.doid;
  return b
}, ss2d.DisplayObjectContainer.prototype.interpolateState = function(a, b, c, d, e) {
  e || ss2d.DisplayObject.prototype.interpolateState.call(this, a, b, c, d);
  a = a.clist;
  d = b.clist;
  e = b.rmobjts;
  for(b = 0;b < this.mChildren.length && 0 < e.length;++b) {
    var f = this.mChildren[b];
    -1 != e.indexOf(f.mObjectId) && (this.removeObject(f), delete a.splice(b, 1)[0], e.splice(e.indexOf(f.mObjectId), 1), delete f)
  }
  for(b = this.mChildren.length;b < a.length;++b) {
    e = ss2d.Object.getObjectPrototype(a[b]).createFromSerializedObject(a[b]), this.addObject(e)
  }
  for(b = 0;b < this.mChildren.length;++b) {
    a[b] && d[b] ? this.mChildren[b].interpolateState(a[b], d[b], c) : this.removeObject(this.mChildren[b])
  }
});
COMPILING_SERVER && (ss2d.DisplayObjectContainer.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.DisplayObjectContainer.prototype.getPropertiesJSON = function(a, b) {
  var c = "";
  b ? (c += '"cid":' + this.CLASS_ID + ",", c += '"doid":' + this.mObjectId + ",") : c += ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",";
  for(var c = c + '"clist":[', d = 0;d < this.mChildren.length;d++) {
    c += this.mChildren[d].toJSON(), d + 1 < this.mChildren.length && (c += ",")
  }
  c = c + "]" + (',"rmobjts":' + JSON.stringify(this.mRemovedObjectsIds));
  a || (delete this.mRemovedObjectsIds, this.mRemovedObjectsIds = []);
  return c
});
ss2d.MultiplayerScene = function() {
  ss2d.DisplayObjectContainer.call(this);
  this.mParentView = null
};
goog.inherits(ss2d.MultiplayerScene, ss2d.DisplayObjectContainer);
ss2d.Object.assignClassId(ss2d.MultiplayerScene, 1006);
COMPILING_CLIENT && (ss2d.MultiplayerScene.prototype.interpolateState = function(a, b, c, d) {
  ss2d.DisplayObjectContainer.prototype.interpolateState.call(this, a, b, c, d, !0);
  this.tick && this.tick(d)
});
COMPILING_SERVER && (ss2d.MultiplayerScene.prototype.tick = function(a) {
  this.tickChildren(a);
  this.mParentView.mComunication.broadcastSceneToClients(this)
}, ss2d.MultiplayerScene.prototype.onUserConnect = function() {
}, ss2d.MultiplayerScene.prototype.onUserDisconnect = function() {
}, ss2d.MultiplayerScene.prototype.onUserChangeName = function() {
}, ss2d.MultiplayerScene.prototype.onUserMessage = function() {
}, ss2d.MultiplayerScene.prototype.getPropertiesJSON = function() {
  return ss2d.DisplayObjectContainer.prototype.getPropertiesJSON.call(this, !0, !0)
});
ss2d.BitmapTextSprite = function(a, b, c, d, e, f) {
  ss2d.Quad.call(this, a, b, 0, 0, f);
  this.mTextString = c || "";
  this.mFontSize = e || 16;
  this.mDisplayChars = -1;
  if(COMPILING_CLIENT || COMPILING_OFFLINE) {
    this.mGlyphSprite = new ss2d.Sprite, this.mClip = [], this.mDisplacement = new ss2d.Point, this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(d, function() {
      this.mGlyphSprite.mReady = !0
    }, this), "webgl" == RENDER_CONTEXT && (this.mGlyphSprite.mParent = this)
  }
};
goog.inherits(ss2d.BitmapTextSprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.BitmapTextSprite, 1007);
ss2d.BitmapTextSprite.prototype.setDisplayChars = function(a) {
  this.mDisplayChars = Math.floor(a)
};
ss2d.BitmapTextSprite.prototype.getDisplayChars = function() {
  return this.mDisplayChars
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.BitmapTextSprite.prototype.render = function(a) {
    a.pushTransform(this);
    try {
      var b = this.mWidth = 0;
      this.mGlyphSprite.mTexture = this.mBitmapFont.mTexture;
      this.mScaleX = this.mScaleY = this.mFontSize / this.mBitmapFont.mMidHeight;
      for(var c = -1 < this.mDisplayChars ? Math.min(this.mDisplayChars, this.mTextString.length) : this.mTextString.length, d = 0;d < c;++d) {
        var e = this.mTextString.charCodeAt(d);
        32 == e ? b += 0.6 * this.mBitmapFont.mMidWidth : (this.mBitmapFont.getGlyphClip(e, this.mClip), this.mGlyphSprite.mClip = this.mClip, this.mGlyphSprite.mWidth = this.mClip[2], this.mGlyphSprite.mHeight = this.mClip[3], this.mDisplacement.mX = b, this.mDisplacement.mY = this.mClip[5], this.displacement(d, e, b, this.mClip[5], this.mDisplacement), this.mGlyphSprite.mLocation.mX = this.mDisplacement.mX, this.mGlyphSprite.mLocation.mY = this.mDisplacement.mY, this.mGlyphSprite.render(a), b += 
        this.mClip[4])
      }
      this.mWidth = b;
      this.mHeight = this.mFontSize / this.mScaleY
    }catch(f) {
    }
    a.popTransform()
  }
}
ss2d.BitmapTextSprite.prototype.displacement = function(a, b, c, d, e) {
  e.mX = c;
  e.mY = d
};
COMPILING_CLIENT && (ss2d.BitmapTextSprite.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.BitmapTextSprite.call(a);
  a.__proto__ = ss2d.BitmapTextSprite.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.BitmapTextSprite.prototype.restoreSerializedProperties = function(a) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, a);
  this.mTextString = a.str;
  this.mFontSize = a.fsize;
  this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(a.bmfname);
  this.mFontStyle = a.fstyle;
  this.mDisplayChars = a.dc
}, ss2d.BitmapTextSprite.createFromSerializedObject = function(a) {
  var b = new ss2d.BitmapTextSprite(a.x, a.y, a.str, a.bmfname, a.fsize);
  b.mObjectId = a.doid;
  return b
}, ss2d.BitmapTextSprite.prototype.interpolateState = function(a, b, c) {
  ss2d.Quad.prototype.interpolateState.call(this, a, b, c, deltaTime);
  this.mTextString = a.str;
  this.mFontSize = a.fsize;
  if(!this.mBitmapFont || this.mBitmapFont.mName != a.bmfname) {
    this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(a.bmfname)
  }
  this.mDisplayChars = Math.floor(a.dc + (b.dc - a.dc) * c)
});
COMPILING_SERVER && (ss2d.BitmapTextSprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.BitmapTextSprite.prototype.getPropertiesJSON = function() {
  var a = ss2d.Quad.prototype.getPropertiesJSON.call(this), a = a + (',"str": "' + this.mTextString + '"'), a = a + (',"fsize": "' + this.mFontSize + '"'), a = a + (',"bmfname": "' + this.mBitmapFont.mName + '"');
  return a += ',"dc": "' + this.mDisplayChars + '"'
});
ss2d.Transitions = {};
ss2d.Transitions.linear = function(a) {
  return a
};
ss2d.Transitions.easeIn = function(a) {
  return a * a * a
};
ss2d.Transitions.easeOut = function(a) {
  a -= 1;
  return a * a * a + 1
};
ss2d.Transitions.easeInOut = function(a) {
  return 0.5 > a ? 0.5 * ss2d.Transitions.easeIn(2 * a) : 0.5 * ss2d.Transitions.easeOut(2 * (a - 0.5)) + 0.5
};
ss2d.Transitions.easeOutIn = function(a) {
  return 0.5 > a ? 0.5 * ss2d.Transitions.easeOut(2 * a) : 0.5 * ss2d.Transitions.easeIn(2 * (a - 0.5)) + 0.5
};
ss2d.TweenedProperty = function(a, b, c, d) {
  this.mTarget = a;
  this.mGetterMethod = b;
  this.mSetterMethod = c;
  this.mStartValue = this.currentValue();
  this.mEndValue = d
};
ss2d.TweenedProperty.prototype.currentValue = function() {
  return this.mGetterMethod.call(this.mTarget)
};
ss2d.TweenedProperty.prototype.setCurrentValue = function(a) {
  this.mSetterMethod.call(this.mTarget, a)
};
ss2d.TweenedProperty.prototype.setTargetValue = function() {
  this.mSetterMethod.call(this.mTarget, this.mEndValue)
};
ss2d.TweenedProperty.prototype.delta = function() {
  return this.mEndValue - this.mStartValue
};
ss2d.Tween = function(a, b, c, d, e) {
  this.mTarget = a;
  this.mProperties = [];
  this.mTransitionMethod = ss2d.Transitions.linear;
  c && (this.mTransitionMethod = c);
  this.mTotalTime = b;
  this.mDelay = d || 0;
  this.mCurrentTime = -this.mDelay;
  this.mLoopCount = 0;
  this.mLoop = ss2d.Tween.LoopType.NONE;
  e && (this.mLoop = e)
};
ss2d.Tween.LoopType = {NONE:0, REPEAT:1, REVERSE:2};
ss2d.Tween.prototype.animateProperty = function(a, b, c) {
  this.mProperties.push(new ss2d.TweenedProperty(this.mTarget, a, b, c))
};
ss2d.Tween.prototype.moveTo = function(a, b) {
  this.animateProperty(this.mTarget.getX, this.mTarget.setX, a);
  this.animateProperty(this.mTarget.getY, this.mTarget.setY, b)
};
ss2d.Tween.prototype.resizeTo = function(a, b) {
  this.animateProperty(this.mTarget.getWidth, this.mTarget.setWidth, a);
  this.animateProperty(this.mTarget.getHeight, this.mTarget.setHeight, b)
};
ss2d.Tween.prototype.scaleTo = function(a) {
  this.animateProperty(this.mTarget.getScaleX, this.mTarget.setScaleX, a);
  this.animateProperty(this.mTarget.getScaleY, this.mTarget.setScaleY, a)
};
ss2d.Tween.prototype.fadeTo = function(a) {
  this.animateProperty(this.mTarget.getAlpha, this.mTarget.setAlpha, a)
};
ss2d.Tween.prototype.tick = function(a) {
  if(!(0 == a || this.mLoop == ss2d.Tween.LoopType.NONE && this.mCurrentTime >= this.mTotalTime)) {
    this.mCurrentTime >= this.mTotalTime && (this.mCurrentTime = 0, this.mLoopCount++);
    var b = this.mCurrentTime, c = this.mTotalTime - this.mCurrentTime, c = a > c ? a - c : 0;
    this.mCurrentTime = Math.min(this.mTotalTime, this.mCurrentTime + a);
    if(!(0 >= this.mCurrentTime)) {
      a = this.mCurrentTime / this.mTotalTime;
      for(var d = this.mLoop == ss2d.Tween.LoopType.REVERSE && 1 == this.mLoopCount % 2, e = 0;e < this.mProperties.length;++e) {
        var f = this.mProperties[e];
        0 >= b && 0 < this.mCurrentTime && (f.mStartValue = f.currentValue());
        var g = d ? 1 - this.mTransitionMethod(1 - a) : this.mTransitionMethod(a);
        f.setCurrentValue(f.mStartValue + f.delta() * g)
      }
      if(b < this.mTotalTime && this.mCurrentTime >= this.mTotalTime) {
        if(this.mLoop == ss2d.Tween.LoopType.REPEAT) {
          for(e = 0;e < this.mProperties.length;++e) {
            f = this.mProperties[e], f.setCurrentValue(f.mStartValue)
          }
        }else {
          if(this.mLoop == ss2d.Tween.LoopType.REVERSE) {
            for(e = 0;e < this.mProperties.length;++e) {
              f = this.mProperties[e], f.setCurrentValue(f.mEndValue), f.mEndValue = f.mStartValue
            }
          }
        }
      }
      this.tick(c)
    }
  }
};
ss2d.Tween.prototype.isComplete = function() {
  return this.mCurrentTime >= this.mTotalTime && this.mLoop == ss2d.Tween.LoopType.NONE
};
ss2d.Tween.prototype.setDelay = function(a) {
  this.mCurrentTime = this.mCurrentTime + this.mDelay - a;
  this.mDelay = a
};
ss2d.InputProxy = function() {
  this.mPressedKeys = {};
  this.mMouseY = this.mMouseX = -50;
  this.mPreviousMouseY = this.mPreviousMouseX = 0;
  this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
  this.mPreviousMousePoint = new ss2d.Point(this.mPreviousMouseX, this.mPreviousMouseY);
  this.mPreviousMouseDown = this.mMouseDown = !1
};
ss2d.InputProxy.prototype.updateFromClient = function(a) {
  this.mPreviousMouseX = this.mMouseX;
  this.mPreviousMouseY = this.mMouseY;
  this.mPreviousMousePoint.mX = this.mPreviousMouseX;
  this.mPreviousMousePoint.mY = this.mPreviousMouseY;
  this.mPreviousMouseDown = this.mMouseDown;
  this.mMouseDown = this.mClicked;
  this.mPressedKeys = a.keys;
  this.mMouseX = a.mx;
  this.mMouseY = a.my;
  this.mMouseDown = a.md;
  this.mMousePoint.mX = this.mMouseX;
  this.mMousePoint.mY = this.mMouseY
};
ss2d.InputProxy.prototype.isKeyPressed = function(a) {
  return null != this.mPressedKeys["_" + a] ? !0 : !1
};
ss2d.ServerCommunicationInterface = function(a, b, c) {
  this.mUserLimit = c || 30;
  this.mWebSocketModule = require("websocket").server;
  this.mHTTPModule = require("http");
  this.mServerView = a;
  this.mUserConnections = [];
  this.mHTTPServer = this.mHTTPModule.createServer(function() {
  });
  a = {};
  a.httpServer = this.mHTTPServer;
  this.mWebSocketServer = new this.mWebSocketModule(a);
  this.mWebSocketServer.mInterface = this;
  this.mWebSocketServer.on("request", function(a) {
    console.log("a user log in");
    a = a.accept(null, a.origin);
    this.mInterface.mUserConnections.length >= this.mInterface.mUserLimit ? (console.log("user rejected"), a.send('["REJECTED","Too many players connected."]'), a.close()) : (this.mInterface.mUserConnections.push(a), a.mUserName = "", a.mServer = this, a.mInput = new ss2d.InputProxy, a.mConnectionId = ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT++, a.mErrorCount = 0, this.mInterface.mServerView.mMainScene.onUserConnect(a), a.on("message", function(a) {
      try {
        var b = JSON.parse(a.utf8Data);
        this.mServer.mInterface.processClientCommand(b, this)
      }catch(c) {
        this.mErrorCount++, console.log("Exception " + c), 4 < this.mErrorCount && this.close()
      }
    }), a.on("close", function() {
      this.mServer.mInterface.mUserConnections.splice(this.mServer.mInterface.mUserConnections.indexOf(this), 1);
      console.log("a user disconnect");
      this.mServer.mInterface.mServerView.mMainScene.onUserDisconnect(this)
    }))
  });
  this.mHTTPServer.listen(b, function() {
  });
  console.log("Server comunication initialized")
};
ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT = 1E3;
ss2d.ServerCommunicationInterface.prototype.broadcastSceneToClients = function(a) {
  if(0 < this.mUserConnections.length) {
    a = '["SCENE",' + a.toJSON() + "]";
    for(var b in this.mUserConnections) {
      this.mUserConnections[b].send(a)
    }
  }
};
ss2d.ServerCommunicationInterface.prototype.processClientCommand = function(a, b) {
  var c = a[0], d = a[1];
  switch(c) {
    case "UINPUT":
      b.mInput.updateFromClient(d);
      break;
    case "UNAME":
      b.mUserName = d;
      b.mServer.mInterface.mServerView.mMainScene.onUserChangeName(b);
      break;
    default:
      b.mServer.mInterface.mServerView.mMainScene.onUserMessage(c, d, b)
  }
};
ss2d.TextSprite = function(a, b, c, d, e, f, g) {
  ss2d.Quad.call(this, a, b, 0, 0, d);
  this.mTextString = c || "";
  this.mFontSize = e || 16;
  this.mFontName = f || "Verdana";
  this.mFontStyle = g || "normal";
  this.mDisplayChars = -1
};
goog.inherits(ss2d.TextSprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.TextSprite, 1007);
ss2d.TextSprite.prototype.setDisplayChars = function(a) {
  this.mDisplayChars = Math.floor(a)
};
ss2d.TextSprite.prototype.getDisplayChars = function() {
  return this.mDisplayChars
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.TextSprite.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  } : function(a) {
    a.pushTransform(this);
    var b = a.mContext;
    b.font = this.mFontStyle + " " + this.mFontSize + "px " + this.mFontName;
    b.fillStyle = this.mColor.getHexString();
    var c = this.mTextString;
    -1 < this.mDisplayChars && (c = this.mTextString.substring(0, this.mDisplayChars));
    b.fillText(c, 0, this.mFontSize);
    a.popTransform()
  }
}
COMPILING_CLIENT && (ss2d.TextSprite.convert = function(a) {
  var b = ss2d.Object.backupAndDeleteObjectProperties(a);
  ss2d.TextSprite.call(a);
  a.__proto__ = ss2d.TextSprite.prototype;
  a.restoreSerializedProperties(b);
  return a
}, ss2d.TextSprite.prototype.restoreSerializedProperties = function(a) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, a);
  this.mTextString = a.str;
  this.mFontSize = a.fsize;
  this.mFontName = a.fname;
  this.mFontStyle = a.fstyle;
  this.mDisplayChars = a.dc
}, ss2d.TextSprite.createFromSerializedObject = function(a) {
  var b = new ss2d.TextSprite(a.x, a.y, a.str, a.c, a.fsize, a.fname, a.fstyle);
  b.mObjectId = a.doid;
  return b
}, ss2d.TextSprite.prototype.interpolateState = function(a, b, c) {
  ss2d.Quad.prototype.interpolateState.call(this, a, b, c, deltaTime);
  this.mTextString = a.str;
  this.mFontSize = a.fsize;
  this.mFontName = a.fname;
  this.mFontStyle = a.fstyle;
  this.mDisplayChars = Math.floor(a.dc + (b.dc - a.dc) * c)
});
COMPILING_SERVER && (ss2d.TextSprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.TextSprite.prototype.getPropertiesJSON = function() {
  var a = ss2d.Quad.prototype.getPropertiesJSON.call(this), a = a + (',"str": "' + this.mTextString + '"'), a = a + (',"fsize": "' + this.mFontSize + '"'), a = a + (',"fname": "' + this.mFontName + '"'), a = a + (',"fstyle": "' + this.mFontStyle + '"');
  return a += ',"dc": "' + this.mDisplayChars + '"'
});
ss2d.ClientCommunicationInterface = function(a, b, c) {
  this.mClientView = a;
  this.mConnection = new WebSocket("ws://" + b + ":" + c + "/");
  this.mConnection.mInterface = this;
  this.mConnected = !1;
  this.mConnection.onopen = function() {
    console.log("WebSocket connected");
    this.mInterface.mConnected = !0;
    this.mInterface.mClientView.onConnect(this)
  };
  this.mConnection.onerror = function(a) {
    console.log("WebSocket Error " + a);
    this.mInterface.mConnected = !1
  };
  this.mConnection.onclose = function() {
    this.mInterface.mConnected = !1;
    this.mInterface.mClientView.onDisconnect(this)
  };
  this.mConnection.onmessage = function(a) {
    this.mInterface.processServerCommand(JSON.parse(a.data), this);
    delete a.data
  }
};
ss2d.ClientCommunicationInterface.prototype.packAndSendUserName = function(a) {
  this.mConnected && this.mConnection.send('["UNAME","' + a + '"]')
};
ss2d.ClientCommunicationInterface.prototype.packAndSendInput = function(a) {
  this.mConnected && (a = '["UINPUT",' + a.toJSON() + "]", this.mConnection.send(a))
};
ss2d.ClientCommunicationInterface.prototype.processServerCommand = function(a, b) {
  var c = a[0], d = a[1];
  switch(c) {
    case "SCENE":
      this.mClientView.mSceneQueue.push([(new Date).getTime(), d]);
      break;
    case "REJECTED":
      this.mClientView.onServerMessage(c, d, b);
      break;
    default:
      this.mClientView.onServerMessage(c, d, b)
  }
};
ss2d.Particle = function() {
  this.mPosition = new ss2d.Point;
  this.mDirection = new ss2d.Point;
  this.mStartPos = new ss2d.Point;
  this.mColor = [1, 1, 1, 1];
  this.mDeltaColor = [0, 0, 0, 1];
  this.mTangentialAcceleration = this.mRadialAcceleration = this.mRotationDelta = this.mRotation = 0;
  this.mRadius = 1;
  this.mDegreesPerSecond = this.mAngle = this.mRadiusDelta = 0;
  this.mTimeToLive = this.mParticleSizeDelta = this.mParticleSize = 1;
  this.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime
};
ss2d.Particle.SRUCT_SIZE = 26;
ss2d.Particle.PC_BUFFER_ELEMENTS = 6;
ss2d.Particle.prototype.getArray = function(a) {
  a = a || [];
  a.splice(0, a.length);
  a.push(this.mPosition.mX, this.mPosition.mY, this.mDirection.mX, this.mDirection.mY, this.mStartPos.mX, this.mStartPos.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mDeltaColor[0], this.mDeltaColor[1], this.mDeltaColor[2], this.mDeltaColor[3], this.mRotation, this.mRotationDelta, this.mRadialAcceleration, this.mTangentialAcceleration, this.mRadius, this.mRadiusDelta, this.mAngle, this.mDegreesPerSecond, this.mParticleSize, this.mParticleSizeDelta, this.mTimeToLive, this.mTimeStamp);
  return a
};
ss2d.Particle.prototype.getPCBufferArray = function(a, b) {
  a.set([this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3]], b || 0)
};
ss2d.GPUParticleEmitter = function(a, b, c, d, e) {
  ss2d.Quad.call(this, a, b, c, d);
  this.mPivotX = 0.5 * this.mWidth;
  this.mPivotY = 0.5 * this.mHeight;
  if("webgl" != RENDER_CONTEXT) {
    throw"ss2d.GPUParticleEmitter requires WebGL Rendering Context";
  }
  if(!e) {
    throw"No particle system provided";
  }
  this.mParticleSystem = e;
  "string" == typeof e && (this.mParticleSystem = ss2d.ResourceManager.loadParticleSystem(e, this.setup, this));
  this.mShowHitBox = !1
};
goog.inherits(ss2d.GPUParticleEmitter, ss2d.Quad);
ss2d.GPUParticleEmitter.MAX_UPDATE_RATE = 100;
ss2d.GPUParticleEmitter.prototype.setup = function(a) {
  this.mParticleSystem = a;
  this.mTexture = this.mParticleSystem.mTexture;
  a = this.mParticleSystem.mSystemDescriptor;
  this.mSourcePosition = new ss2d.Point(parseFloat(a.sourcePosition["-x"]), parseFloat(a.sourcePosition["-y"]));
  this.mSourcePositionVariance = new ss2d.Point(parseFloat(a.sourcePositionVariance["-x"]), parseFloat(a.sourcePositionVariance["-y"]));
  this.mGravity = new ss2d.Point(parseFloat(a.gravity["-x"]), parseFloat(a.gravity["-y"]));
  this.mAngle = parseFloat(a.angle["-value"]);
  this.mAngleVariance = parseFloat(a.angleVariance["-value"]);
  this.mSpeed = parseFloat(a.speed["-value"]);
  this.mSpeedVariance = parseFloat(a.speedVariance["-value"]);
  this.mRadialAcceleration = parseFloat(a.radialAcceleration["-value"]);
  this.mTangentialAcceleration = parseFloat(a.tangentialAcceleration["-value"]);
  this.mRadialAccelVariance = parseFloat(a.radialAccelVariance["-value"]);
  this.mTangentialAccelVariance = parseFloat(a.tangentialAccelVariance["-value"]);
  this.mParticleLifeSpan = parseFloat(a.particleLifeSpan["-value"]);
  this.mParticleLifespanVariance = parseFloat(a.particleLifespanVariance["-value"]);
  this.mStartParticleSize = parseFloat(a.startParticleSize["-value"]);
  this.mStartParticleSizeVariance = parseFloat(a.startParticleSizeVariance["-value"]);
  this.mFinishParticleSize = parseFloat(a.finishParticleSize["-value"]);
  this.mFinishParticleSizeVariance = parseFloat((a.finishParticleSizeVariance || a.FinishParticleSizeVariance)["-value"]);
  this.mMaxParticles = parseFloat(a.maxParticles["-value"]);
  this.mDuration = parseFloat(a.duration["-value"]);
  this.mRotationStart = parseFloat(a.rotationStart["-value"]);
  this.mRotationStartVariance = parseFloat(a.rotationStartVariance["-value"]);
  this.mRotationEnd = parseFloat(a.rotationEnd["-value"]);
  this.mRotationEndVariance = parseFloat(a.rotationEndVariance["-value"]);
  this.mBlendFuncSource = parseFloat(a.blendFuncSource["-value"]);
  this.mBlendFuncDestination = parseFloat(a.blendFuncDestination["-value"]);
  this.mStartColor = [parseFloat(a.startColor["-red"]), parseFloat(a.startColor["-green"]), parseFloat(a.startColor["-blue"]), parseFloat(a.startColor["-alpha"])];
  this.mStartColorVariance = [parseFloat(a.startColorVariance["-red"]), parseFloat(a.startColorVariance["-green"]), parseFloat(a.startColorVariance["-blue"]), parseFloat(a.startColorVariance["-alpha"])];
  this.mFinishColor = [parseFloat(a.finishColor["-red"]), parseFloat(a.finishColor["-green"]), parseFloat(a.finishColor["-blue"]), parseFloat(a.finishColor["-alpha"])];
  this.mFinishColorVariance = [parseFloat(a.finishColorVariance["-red"]), parseFloat(a.finishColorVariance["-green"]), parseFloat(a.finishColorVariance["-blue"]), parseFloat(a.finishColorVariance["-alpha"])];
  this.mMaxRadius = parseFloat(a.maxRadius["-value"]);
  this.mMaxRadiusVariance = parseFloat(a.maxRadiusVariance["-value"]);
  this.mMinRadius = parseFloat(a.minRadius["-value"]);
  this.mRotatePerSecond = parseFloat(a.rotatePerSecond["-value"]);
  this.mRotatePerSecondVariance = parseFloat(a.rotatePerSecondVariance["-value"]);
  this.mRadiusSpeed = 0;
  this.mRotation = this.mAngle / (180 / Math.PI);
  this.mEmitterType = parseFloat(a.emitterType["-value"]);
  this.mParticleCount = 0;
  this.mEmissionRate = this.mMaxParticles / this.mParticleLifeSpan;
  this.mElapsedTime = this.mEmitCounter = 0;
  this.mUseTexture = !0;
  this.mParticleIndex = 0;
  this.mParticles = [];
  a = [];
  for(var b = [], c = this.localToWorld(this.mLocation), c = ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(c), d = 0;d < this.mMaxParticles;++d) {
    this.mParticles[d] = this.generateParticle(null, c), this.mParticles[d].mTimeToLive = 0, this.mParticles[d].getArray(b), a = a.concat(b), a = a.concat(b), a = a.concat(b), a = a.concat(b)
  }
  this.mParticleCount = this.mMaxParticles;
  c = ss2d.CURRENT_VIEW.mContext;
  this.mParticleDataBuffer = ss2d.CURRENT_VIEW.mRenderSupport.createBuffer(c.ARRAY_BUFFER, new Float32Array(a), ss2d.Particle.SRUCT_SIZE, a.length / ss2d.Particle.SRUCT_SIZE, c.DYNAMIC_DRAW);
  delete a;
  delete b;
  this.mFreeParticles = [];
  this.mReady = !0;
  this.startEmitter()
};
ss2d.GPUParticleEmitter.prototype.startEmitter = function() {
  this.mActive = !0
};
ss2d.GPUParticleEmitter.prototype.stopEmitter = function() {
  this.mActive = !1
};
ss2d.GPUParticleEmitter.MINUS_ONE_TO_ONE = function() {
  return 2 * Math.random() - 1
};
ss2d.GPUParticleEmitter.prototype.generateParticle = function(a, b, c) {
  if(!(this.mParticleCount >= this.mMaxParticles)) {
    a = a || new ss2d.Particle;
    c = c || 0;
    a.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime;
    var d = ss2d.GPUParticleEmitter.MINUS_ONE_TO_ONE;
    a.mPosition.mX = b.mX + d() * this.mSourcePositionVariance.mX;
    a.mPosition.mY = b.mY + d() * this.mSourcePositionVariance.mY;
    a.mStartPos.mX = b.mX;
    a.mStartPos.mY = b.mY;
    b = this.mRotation + d() * this.mAngleVariance / (180 / Math.PI);
    b = new ss2d.Point(Math.cos(b), Math.sin(b));
    var e = this.mSpeed + d() * this.mSpeedVariance;
    a.mDirection = ss2d.Point.scalePoint(b, e);
    a.mDirection.mY *= -1;
    a.mRadius = this.mMaxRadius + d() * this.mMaxRadiusVariance;
    a.mRadiusDelta = this.mMaxRadius / this.mParticleLifeSpan;
    a.mAngle = this.mRotation + d() * this.mAngleVariance / (180 / Math.PI);
    a.mDegreesPerSecond = (this.mRotatePerSecond + d() * this.mRotatePerSecondVariance) / (180 / Math.PI);
    a.mRadialAcceleration = this.mRadialAcceleration;
    a.mTangentialAcceleration = this.mTangentialAcceleration;
    a.mTimeToLive = Math.max(0, this.mParticleLifeSpan + this.mParticleLifespanVariance * d()) + c;
    c = this.mStartParticleSize + this.mStartParticleSizeVariance * d();
    b = this.mFinishParticleSize + this.mFinishParticleSizeVariance * d();
    a.mParticleSizeDelta = (b - c) / a.mTimeToLive;
    a.mParticleSize = Math.max(0, c);
    c = a.mColor;
    c[0] = this.mStartColor[0] + this.mStartColorVariance[0] * d();
    c[1] = this.mStartColor[1] + this.mStartColorVariance[1] * d();
    c[2] = this.mStartColor[2] + this.mStartColorVariance[2] * d();
    c[3] = this.mStartColor[3] + this.mStartColorVariance[3] * d();
    b = [];
    b[0] = this.mFinishColor[0] + this.mFinishColorVariance[0] * d();
    b[1] = this.mFinishColor[1] + this.mFinishColorVariance[1] * d();
    b[2] = this.mFinishColor[2] + this.mFinishColorVariance[2] * d();
    b[3] = this.mFinishColor[3] + this.mFinishColorVariance[3] * d();
    e = a.mDeltaColor;
    e[0] = (b[0] - c[0]) / a.mTimeToLive;
    e[1] = (b[1] - c[1]) / a.mTimeToLive;
    e[2] = (b[2] - c[2]) / a.mTimeToLive;
    e[3] = (b[3] - c[3]) / a.mTimeToLive;
    c = this.mRotationStart + this.mRotationStartVariance * d();
    d = this.mRotationEnd + this.mRotationEndVariance * d();
    a.mRotation = c;
    a.mRotationDelta = (d - c) / a.mTimeToLive;
    this.mParticleCount++;
    return a
  }
};
"webgl" == RENDER_CONTEXT && (ss2d.GPUParticleEmitter.prototype.render = function(a) {
  if(this.mReady) {
    this.mPivotX = 0.5 * this.mWidth;
    this.mPivotY = 0.5 * this.mHeight;
    if(this.mShowHitBox) {
      var b = this.mAlpha;
      this.mAlpha = 0.5;
      ss2d.Quad.prototype.render.call(this, a);
      this.mAlpha = b
    }
    b = a.mContext;
    b.blendFunc(this.mBlendFuncSource, this.mBlendFuncDestination);
    var c = a.mMaterials.mGPUParticle;
    c.mActiveTexture = this.mTexture.mTextureId;
    c.mParticleDataBuffer = this.mParticleDataBuffer;
    c.mEmitterType = this.mEmitterType;
    c.mGravity[0] = this.mGravity.mX;
    c.mGravity[1] = this.mGravity.mY;
    c.apply(a);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.mBuffers.mParticlesQVI);
    b.drawElements(b.TRIANGLES, 6 * this.mMaxParticles, b.UNSIGNED_SHORT, 0);
    b.blendFunc(a.mDefaultBlendSource, a.mDefaultBlendDestination)
  }
}, ss2d.GPUParticleEmitter.prototype.tick = function(a) {
  this.updateParticles(a)
}, ss2d.GPUParticleEmitter.prototype.updateParticles = function(a) {
  if(this.mReady) {
    a = a > 2 / ss2d.CURRENT_VIEW.mFrameRate ? 1 / ss2d.CURRENT_VIEW.mFrameRate : a;
    var b = ss2d.CURRENT_VIEW.mContext;
    if(this.mActive && this.mEmissionRate) {
      var c = 1 / this.mEmissionRate;
      this.mEmitCounter += a;
      for(var d = [], e = this.localToWorld(this.mLocation), e = ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(e);this.mParticleCount < this.mMaxParticles && this.mEmitCounter > c;) {
        if(this.mEmitCounter -= c, 0 != this.mFreeParticles.length) {
          var f = this.mFreeParticles.pop(), g = this.generateParticle(this.mParticles[f], e), d = g.getArray(d), d = d.concat(d), d = d.concat(d);
          b.bindBuffer(b.ARRAY_BUFFER, this.mParticleDataBuffer);
          b.bufferSubData(b.ARRAY_BUFFER, 4 * 4 * f * ss2d.Particle.SRUCT_SIZE, new Float32Array(d))
        }
      }
      this.mElapsedTime += a;
      -1 != this.mDuration && this.mDuration < this.mElapsedTime && this.stopEmitter()
    }
    b = a;
    for(c = 0;c < this.mMaxParticles;++c) {
      if(g = this.mParticles[c], g.mTimeToLive -= b, g.mRadius -= g.mRadiusDelta * a, 0 >= g.mTimeToLive || 1 == this.mEmitterType && g.mRadius < this.mMinRadius) {
        this.mParticleCount--, this.mFreeParticles.push(c)
      }
    }
  }
});
ss2d.ClientView = function(a, b, c, d, e, f) {
  this.mCanvas = document.getElementById(a);
  "webgl" == RENDER_CONTEXT ? (this.mContext = this.mCanvas.getContext("webgl") || this.mCanvas.getContext("experimental-webgl"), this.mProjection = ss2d.RenderSupport.orthogonalProjectionMatrix(0, this.mWidth, this.mHeight, 0, 1, -1)) : this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = d || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = b || this.mCanvas.height;
  this.mCanvas.height = c || this.mCanvas.height;
  ss2d.CURRENT_VIEW = this;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = null;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020";
  this.mSceneQueue = [];
  this.mComunication = null;
  this.mDelay = f || 100;
  this.mInputRate = e || 20;
  this.mPreTickFunctions = [];
  this.mPostTickFunctions = [];
  this.mPreRenderFunctions = [];
  this.mPostRenderFunctions = [];
  this.mTotalTime = 0
};
ss2d.ClientView.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER = function() {
  ss2d.CURRENT_VIEW.nextInputUpdate()
};
ss2d.ClientView.prototype.nextFrame = function() {
  var a = (new Date).getTime(), b = a - this.mLastFrameTimestamp;
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  b /= 1E3;
  this.mTotalTime += b;
  this.mInput.tick(b);
  for(var c in this.mPreTickFunctions) {
    this.mPreTickFunctions[c].call(null, b)
  }
  this.updateSceneState(a, b);
  for(c in this.mPostTickFunctions) {
    this.mPostTickFunctions[c].call(null, b)
  }
  for(c in this.mPreRenderFunctions) {
    this.mPreRenderFunctions[c].call(null, this.mRenderSupport)
  }
  null != this.mMainScene && this.render();
  for(c in this.mPostRenderFunctions) {
    this.mPostRenderFunctions[c].call(null, this.mRenderSupport)
  }
  this.mLastFrameTimestamp = a;
  a = ((new Date).getTime() - a) / 1E3;
  a = Math.max(0, 1 / this.mFrameRate - a);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_FRAME_CALLER, 1E3 * a)
};
ss2d.ClientView.prototype.render = function() {
};
ss2d.ClientView.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  var a = this.mContext;
  a.viewport(0, 0, this.mCanvas.width, this.mCanvas.height);
  var b = this.mClearColor;
  a.clearColor(b[0], b[1], b[2], b[3]);
  a.clear(a.COLOR_BUFFER_BIT);
  this.mMainScene.render(this.mRenderSupport)
} : function() {
  this.mContext.fillStyle = this.mBackgroundFillStyle;
  this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.render(this.mRenderSupport)
};
ss2d.ClientView.prototype.nextInputUpdate = function() {
  this.mComunication.packAndSendInput(this.mInput);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER, 1E3 * (1 / this.mInputRate))
};
ss2d.ClientView.prototype.updateSceneState = function(a, b) {
  for(var c = a - this.mDelay, d = -1, e = -1, f = 0;f < this.mSceneQueue.length && -1 == e;f++) {
    var g = this.mSceneQueue[f][0], h = this.mSceneQueue[f][1];
    g < c && (d = f, null != h.PLAYSOUNDS && (h.PLAYSOUNDS = null, delete h.PLAYSOUNDS));
    g >= c && (e = f)
  }
  if(-1 != d && -1 != e) {
    for(f = 0;f < d;++f) {
      this.interpolateSeceneStates(f, d, c, b)
    }
    this.interpolateSeceneStates(d, e, c, b)
  }
  this.mSceneQueue.splice(0, d)
};
ss2d.ClientView.prototype.interpolateSeceneStates = function(a, b, c, d) {
  var e = this.mSceneQueue[a][0];
  c = (c - e) / (this.mSceneQueue[b][0] - e);
  null == this.mMainScene && (this.mMainScene = ss2d.Object.getObjectPrototype(this.mSceneQueue[a][1]).createFromSerializedObject(this.mSceneQueue[a][1]), console.debug("main scene created"));
  this.mMainScene.interpolateState(this.mSceneQueue[a][1], this.mSceneQueue[b][1], c, d)
};
ss2d.ClientView.prototype.startLoop = function() {
  !this.mRunning && null != this.mComunication && (this.mRunning = !0, this.nextFrame(), this.nextInputUpdate())
};
ss2d.ClientView.prototype.stopLoop = function() {
  this.mRunning = !1
};
ss2d.ClientView.prototype.resizeCanvas = function() {
};
"webgl" == RENDER_CONTEXT && (ss2d.ClientView.prototype.resizeCanvas = function(a, b) {
  this.mProjection = ss2d.RenderSupport.orthogonalProjectionMatrix(0, a, b, 0, 1, -1, this.mProjection)
});
ss2d.ClientView.prototype.startConnection = function(a, b) {
  this.mComunication = new ss2d.ClientCommunicationInterface(this, a, b)
};
ss2d.ClientView.prototype.onConnect = function() {
};
ss2d.ClientView.prototype.onDisconnect = function() {
};
ss2d.ClientView.prototype.onServerMessage = function() {
};
var ss2d = ss2d || {};
ss2d.CURRENT_VIEW = null;
ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
var box2d = {Settings:{}};
box2d.Settings.USHRT_MAX = 65535;
box2d.Settings.invalid = box2d.Settings.USHRT_MAX;
box2d.Settings.b2_pi = Math.PI;
box2d.Settings.b2_massUnitsPerKilogram = 1;
box2d.Settings.b2_timeUnitsPerSecond = 1;
box2d.Settings.b2_lengthUnitsPerMeter = 30;
box2d.Settings.b2_maxManifoldPoints = 2;
box2d.Settings.b2_maxShapesPerBody = 64;
box2d.Settings.b2_maxPolyVertices = 8;
box2d.Settings.b2_maxProxies = 1024;
box2d.Settings.b2_maxPairs = 8 * box2d.Settings.b2_maxProxies;
box2d.Settings.b2_linearSlop = 0.0050 * box2d.Settings.b2_lengthUnitsPerMeter;
box2d.Settings.b2_angularSlop = 2 / 180 * box2d.Settings.b2_pi;
box2d.Settings.b2_velocityThreshold = 1 * box2d.Settings.b2_lengthUnitsPerMeter / box2d.Settings.b2_timeUnitsPerSecond;
box2d.Settings.b2_maxLinearCorrection = 0.2 * box2d.Settings.b2_lengthUnitsPerMeter;
box2d.Settings.b2_maxAngularCorrection = 8 / 180 * box2d.Settings.b2_pi;
box2d.Settings.b2_contactBaumgarte = 0.2;
box2d.Settings.b2_timeToSleep = 0.5 * box2d.Settings.b2_timeUnitsPerSecond;
box2d.Settings.b2_linearSleepTolerance = 0.01 * box2d.Settings.b2_lengthUnitsPerMeter / box2d.Settings.b2_timeUnitsPerSecond;
box2d.Settings.b2_angularSleepTolerance = 2 / 180 / box2d.Settings.b2_timeUnitsPerSecond;
box2d.Settings.FLT_EPSILON = 1.192092896E-7;
box2d.Settings.b2Assert = function(a) {
  if(!a) {
    throw"Assert Failed!";
  }
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$");
    a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", j = e[g] || "", k = RegExp("(\\d*)(\\D*)", "g"), l = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = k.exec(h) || ["", "", ""], n = l.exec(j) || ["", "", ""];
      if(0 == m[0].length && 0 == n[0].length) {
        break
      }
      var c = 0 == m[1].length ? 0 : parseInt(m[1], 10), q = 0 == n[1].length ? 0 : parseInt(n[1], 10), c = goog.string.compareElements_(c, q) || goog.string.compareElements_(0 == m[2].length, 0 == n[2].length) || goog.string.compareElements_(m[2], n[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var j = g[h];
      b.call(c, j, h, a) && (e[f++] = j)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d
  }, c);
  return d
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var j = f + g >> 1, k;
    k = c ? b.call(e, a[j], j, a) : b(d, a[j]);
    0 < k ? f = j + 1 : (g = j, h = !k)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for(var d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for(var e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for(var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e
  });
  return d
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if(0 > c * (f - e)) {
    return[]
  }
  if(0 < c) {
    for(a = e;a < f;a += c) {
      d.push(a)
    }
  }else {
    for(a = e;a > f;a += c) {
      d.push(a)
    }
  }
  return d
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360)
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c
};
goog.math.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  c = c || function(a, b) {
    return a == b
  };
  d = d || function(b) {
    return a[b]
  };
  for(var e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0
  }
  for(var j = 0;j < f + 1;j++) {
    g[0][j] = 0
  }
  for(h = 1;h <= e;h++) {
    for(j = 1;j <= e;j++) {
      g[h][j] = c(a[h - 1], b[j - 1]) ? g[h - 1][j - 1] + 1 : Math.max(g[h - 1][j], g[h][j - 1])
    }
  }
  for(var k = [], h = e, j = f;0 < h && 0 < j;) {
    c(a[h - 1], b[j - 1]) ? (k.unshift(d(h - 1, j - 1)), h--, j--) : g[h - 1][j] > g[h][j - 1] ? h-- : j--
  }
  return k
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c
  }, 0)
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function(a) {
  var b = arguments.length;
  if(2 > b) {
    return 0
  }
  var c = goog.math.average.apply(null, arguments), b = goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2)
  })) / (b - 1);
  return Math.sqrt(b)
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a)
};
goog.math.safeFloor = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.ceil(a - (b || 2E-15))
};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
goog.math.Coordinate.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += a, goog.isNumber(b) && (this.y += b));
  return this
};
goog.math.Coordinate.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.x *= a;
  this.y *= c;
  return this
};
goog.math.Vec2 = function(a, b) {
  this.x = a;
  this.y = b
};
goog.inherits(goog.math.Vec2, goog.math.Coordinate);
goog.math.Vec2.randomUnit = function() {
  var a = 2 * Math.random() * Math.PI;
  return new goog.math.Vec2(Math.cos(a), Math.sin(a))
};
goog.math.Vec2.random = function() {
  var a = Math.sqrt(Math.random()), b = 2 * Math.random() * Math.PI;
  return new goog.math.Vec2(Math.cos(b) * a, Math.sin(b) * a)
};
goog.math.Vec2.fromCoordinate = function(a) {
  return new goog.math.Vec2(a.x, a.y)
};
goog.math.Vec2.prototype.clone = function() {
  return new goog.math.Vec2(this.x, this.y)
};
goog.math.Vec2.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
};
goog.math.Vec2.prototype.squaredMagnitude = function() {
  return this.x * this.x + this.y * this.y
};
goog.math.Vec2.prototype.scale = goog.math.Coordinate.prototype.scale;
goog.math.Vec2.prototype.invert = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this
};
goog.math.Vec2.prototype.normalize = function() {
  return this.scale(1 / this.magnitude())
};
goog.math.Vec2.prototype.add = function(a) {
  this.x += a.x;
  this.y += a.y;
  return this
};
goog.math.Vec2.prototype.subtract = function(a) {
  this.x -= a.x;
  this.y -= a.y;
  return this
};
goog.math.Vec2.prototype.rotate = function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  var c = this.y * b + this.x * a;
  this.x = this.x * b - this.y * a;
  this.y = c;
  return this
};
goog.math.Vec2.rotateAroundPoint = function(a, b, c) {
  return a.clone().subtract(b).rotate(c).add(b)
};
goog.math.Vec2.prototype.equals = function(a) {
  return this == a || !!a && this.x == a.x && this.y == a.y
};
goog.math.Vec2.distance = goog.math.Coordinate.distance;
goog.math.Vec2.squaredDistance = goog.math.Coordinate.squaredDistance;
goog.math.Vec2.equals = goog.math.Coordinate.equals;
goog.math.Vec2.sum = function(a, b) {
  return new goog.math.Vec2(a.x + b.x, a.y + b.y)
};
goog.math.Vec2.difference = function(a, b) {
  return new goog.math.Vec2(a.x - b.x, a.y - b.y)
};
goog.math.Vec2.dot = function(a, b) {
  return a.x * b.x + a.y * b.y
};
goog.math.Vec2.lerp = function(a, b, c) {
  return new goog.math.Vec2(goog.math.lerp(a.x, b.x, c), goog.math.lerp(a.y, b.y, c))
};
box2d.Vec2 = function(a, b) {
  void 0 === a && (a = 0);
  this.x = a;
  void 0 === b && (b = 0);
  this.y = b
};
goog.inherits(box2d.Vec2, goog.math.Vec2);
box2d.Vec2.prototype.SetZero = function() {
  this.y = this.x = 0
};
box2d.Vec2.prototype.Set = function(a, b) {
  this.x = a;
  this.y = b
};
box2d.Vec2.prototype.SetV = function(a) {
  this.x = a.x;
  this.y = a.y
};
box2d.Vec2.prototype.Negative = function() {
  return new box2d.Vec2(-this.x, -this.y)
};
box2d.Vec2.prototype.Copy = function() {
  return new box2d.Vec2(this.x, this.y)
};
box2d.Vec2.prototype.MulM = function(a) {
  var b = this.x;
  this.x = a.col1.x * b + a.col2.x * this.y;
  this.y = a.col1.y * b + a.col2.y * this.y
};
box2d.Vec2.prototype.MulTM = function(a) {
  var b = goog.math.Vec2.dot(this, a.col1);
  this.y = goog.math.Vec2.dot(this, a.col2);
  this.x = b
};
box2d.Vec2.prototype.CrossVF = function(a) {
  var b = this.x;
  this.x = a * this.y;
  this.y = -a * b
};
box2d.Vec2.prototype.CrossFV = function(a) {
  var b = this.x;
  this.x = -a * this.y;
  this.y = a * b
};
box2d.Vec2.prototype.MinV = function(a) {
  this.x = this.x < a.x ? this.x : a.x;
  this.y = this.y < a.y ? this.y : a.y
};
box2d.Vec2.prototype.MaxV = function(a) {
  this.x = this.x > a.x ? this.x : a.x;
  this.y = this.y > a.y ? this.y : a.y
};
box2d.Vec2.prototype.Abs = function() {
  this.x = Math.abs(this.x);
  this.y = Math.abs(this.y)
};
box2d.Vec2.prototype.Normalize = function() {
  var a = this.magnitude();
  if(a < Number.MIN_VALUE) {
    return 0
  }
  var b = 1 / a;
  this.x *= b;
  this.y *= b;
  return a
};
box2d.Vec2.prototype.IsValid = function() {
  return isFinite(this.x) && isFinite(this.y)
};
box2d.Vec2.cross = function(a, b) {
  return a.x * b.y - a.y * b.x
};
box2d.Vec2.crossScalar = function(a, b) {
  return new box2d.Vec2(-a * b.y, a * b.x)
};
box2d.Vec2.add = function(a, b) {
  return new box2d.Vec2(a.x + b.x, a.y + b.y)
};
box2d.Vec2.subtract = function(a, b) {
  return new box2d.Vec2(a.x - b.x, a.y - b.y)
};
box2d.Vec2.multiplyScalar = function(a, b) {
  return new box2d.Vec2(a * b.x, a * b.y)
};
box2d.Vec2.abs = function(a) {
  return new box2d.Vec2(Math.abs(a.x), Math.abs(a.y))
};
box2d.ShapeDef = function() {
  this.type = box2d.ShapeDef.Type.unknownShape;
  this.userData = null;
  this.localPosition = new box2d.Vec2(0, 0);
  this.localRotation = 0;
  this.friction = 0.2;
  this.density = this.restitution = 0;
  this.categoryBits = 1;
  this.maskBits = 65535;
  this.groupIndex = 0
};
box2d.ShapeDef.prototype.ComputeMass = function(a) {
  a.center = new box2d.Vec2(0, 0);
  a.mass = 0;
  a.I = 0
};
box2d.ShapeDef.prototype.categoryBits = 0;
box2d.ShapeDef.prototype.maskBits = 0;
box2d.ShapeDef.prototype.groupIndex = 0;
box2d.ShapeDef.Type = {unknownShape:-1, circleShape:0, boxShape:1, polyShape:2, meshShape:3, shapeTypeCount:4};
box2d.BodyDef = function() {
  this.shapes = [];
  this.userData = null;
  for(var a = 0;a < box2d.Settings.b2_maxShapesPerBody;a++) {
    this.shapes[a] = null
  }
  this.position = new box2d.Vec2(0, 0);
  this.rotation = 0;
  this.linearVelocity = new box2d.Vec2(0, 0);
  this.angularDamping = this.linearDamping = this.angularVelocity = 0;
  this.allowSleep = !0;
  this.preventRotation = this.isSleeping = !1
};
box2d.BodyDef.prototype.AddShape = function(a) {
  for(var b = 0;b < box2d.Settings.b2_maxShapesPerBody;++b) {
    if(null == this.shapes[b]) {
      this.shapes[b] = a;
      break
    }
  }
};
box2d.Mat22 = function(a, b, c) {
  null == a && (a = 0);
  this.col1 = new box2d.Vec2;
  this.col2 = new box2d.Vec2;
  null != b && null != c ? (this.col1.SetV(b), this.col2.SetV(c)) : (b = Math.cos(a), a = Math.sin(a), this.col1.x = b, this.col2.x = -a, this.col1.y = a, this.col2.y = b)
};
box2d.Mat22.prototype.Set = function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  this.col1.x = b;
  this.col2.x = -a;
  this.col1.y = a;
  this.col2.y = b
};
box2d.Mat22.prototype.SetVV = function(a, b) {
  this.col1.SetV(a);
  this.col2.SetV(b)
};
box2d.Mat22.prototype.Copy = function() {
  return new box2d.Mat22(0, this.col1, this.col2)
};
box2d.Mat22.prototype.SetM = function(a) {
  this.col1.SetV(a.col1);
  this.col2.SetV(a.col2)
};
box2d.Mat22.prototype.AddM = function(a) {
  this.col1.x += a.col1.x;
  this.col1.y += a.col1.y;
  this.col2.x += a.col2.x;
  this.col2.y += a.col2.y
};
box2d.Mat22.prototype.SetIdentity = function() {
  this.col1.x = 1;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 1
};
box2d.Mat22.prototype.SetZero = function() {
  this.col1.x = 0;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 0
};
box2d.Mat22.prototype.Invert = function(a) {
  var b = this.col1.x, c = this.col2.x, d = this.col1.y, e = this.col2.y, f;
  f = 1 / (b * e - c * d);
  a.col1.x = f * e;
  a.col2.x = -f * c;
  a.col1.y = -f * d;
  a.col2.y = f * b;
  return a
};
box2d.Mat22.prototype.Solve = function(a, b, c) {
  var d = this.col1.x, e = this.col2.x, f = this.col1.y, g = this.col2.y, h;
  h = 1 / (d * g - e * f);
  a.x = h * (g * b - e * c);
  a.y = h * (d * c - f * b);
  return a
};
box2d.Mat22.prototype.Abs = function() {
  this.col1.Abs();
  this.col2.Abs()
};
box2d.Shape = function(a, b) {
  this.m_R = new box2d.Mat22;
  this.m_position = new box2d.Vec2;
  this.m_userData = a.userData;
  this.m_friction = a.friction;
  this.m_restitution = a.restitution;
  this.m_body = b;
  this.m_proxyId = box2d.Pair.b2_nullProxy;
  this.m_maxRadius = 0;
  this.categoryBits = a.categoryBits;
  this.maskBits = a.maskBits;
  this.m_groupIndex = a.groupIndex
};
box2d.Shape.prototype.TestPoint = function() {
  return!1
};
box2d.Shape.prototype.GetUserData = function() {
  return this.m_userData
};
box2d.Shape.prototype.GetType = function() {
  return this.m_type
};
box2d.Shape.prototype.GetBody = function() {
  return this.m_body
};
box2d.Shape.prototype.GetPosition = function() {
  return this.m_position
};
box2d.Shape.prototype.GetRotationMatrix = function() {
  return this.m_R
};
box2d.Shape.prototype.ResetProxy = function() {
};
box2d.Shape.prototype.GetNext = function() {
  return this.m_next
};
box2d.Shape.prototype.DestroyProxy = function() {
  this.m_proxyId != box2d.Pair.b2_nullProxy && (this.m_body.m_world.m_broadPhase.DestroyProxy(this.m_proxyId), this.m_proxyId = box2d.Pair.b2_nullProxy)
};
box2d.Shape.prototype.Synchronize = function() {
};
box2d.Shape.prototype.QuickSync = function() {
};
box2d.Shape.prototype.Support = function() {
};
box2d.Shape.prototype.GetMaxRadius = function() {
  return this.m_maxRadius
};
box2d.Shape.Destroy = function(a) {
  a.m_proxyId != box2d.Pair.b2_nullProxy && a.m_body.m_world.m_broadPhase.DestroyProxy(a.m_proxyId)
};
box2d.Shape.PolyMass = function(a, b, c, d) {
  var e = new box2d.Vec2;
  e.SetZero();
  for(var f = 0, g = 0, h = new box2d.Vec2(0, 0), j = 1 / 3, k = 0;k < c;++k) {
    var l = h, m = b[k], n = k + 1 < c ? b[k + 1] : b[0], q = box2d.Vec2.subtract(m, l), r = box2d.Vec2.subtract(n, l), s = box2d.Vec2.cross(q, r), t = 0.5 * s, f = f + t, u = new box2d.Vec2;
    u.SetV(l);
    u.add(m);
    u.add(n);
    u.scale(j * t);
    e.add(u);
    m = l.x;
    l = l.y;
    n = q.x;
    q = q.y;
    t = r.x;
    r = r.y;
    g += s * (j * (0.25 * (n * n + t * n + t * t) + (m * n + m * t)) + 0.5 * m * m + (j * (0.25 * (q * q + r * q + r * r) + (l * q + l * r)) + 0.5 * l * l))
  }
  a.mass = d * f;
  e.scale(1 / f);
  a.center = e;
  g = d * (g - f * goog.math.Vec2.dot(e, e));
  a.I = g
};
box2d.Shape.PolyCentroid = function(a, b, c) {
  for(var d = 0, e = 0, f = 0, g = 1 / 3, h = 0;h < b;++h) {
    var j = a[h].x, k = a[h].y, l = h + 1 < b ? a[h + 1].x : a[0].x, m = h + 1 < b ? a[h + 1].y : a[0].y, n = 0.5 * ((j - 0) * (m - 0) - (k - 0) * (l - 0)), f = f + n, d = d + n * g * (0 + j + l), e = e + n * g * (0 + k + m)
  }
  c.Set(d * (1 / f), e * (1 / f))
};
box2d.BoxDef = function() {
  box2d.ShapeDef.call(this);
  this.type = box2d.ShapeDef.Type.boxShape;
  this.extents = new box2d.Vec2(1, 1)
};
goog.inherits(box2d.BoxDef, box2d.ShapeDef);
box2d.BoxDef.prototype.ComputeMass = function(a) {
  a.center = new box2d.Vec2(0, 0);
  0 == this.density && (a.mass = 0, a.center.Set(0, 0), a.I = 0);
  a.mass = 4 * this.density * this.extents.x * this.extents.y;
  a.center.Set(0, 0);
  a.I = a.mass / 3 * goog.math.Vec2.dot(this.extents, this.extents)
};
box2d.JointNode = function() {
  this.next = this.prev = this.joint = this.other = null
};
box2d.Joint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData
};
box2d.Joint.prototype.GetType = function() {
  return this.m_type
};
box2d.Joint.prototype.GetAnchor1 = function() {
  return null
};
box2d.Joint.prototype.GetAnchor2 = function() {
  return null
};
box2d.Joint.prototype.GetReactionForce = function() {
  return null
};
box2d.Joint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.Joint.prototype.GetBody1 = function() {
  return this.m_body1
};
box2d.Joint.prototype.GetBody2 = function() {
  return this.m_body2
};
box2d.Joint.prototype.GetNext = function() {
  return this.m_next
};
box2d.Joint.prototype.GetUserData = function() {
  return this.m_userData
};
box2d.Joint.prototype.PrepareVelocitySolver = function() {
};
box2d.Joint.SolveVelocityConstraints = function() {
};
box2d.Joint.prototype.PreparePositionSolver = function() {
};
box2d.Joint.prototype.SolvePositionConstraints = function() {
  return!1
};
box2d.Joint.e_unknownJoint = 0;
box2d.Joint.e_revoluteJoint = 1;
box2d.Joint.e_prismaticJoint = 2;
box2d.Joint.e_distanceJoint = 3;
box2d.Joint.e_pulleyJoint = 4;
box2d.Joint.e_mouseJoint = 5;
box2d.Joint.e_gearJoint = 6;
box2d.Joint.e_inactiveLimit = 0;
box2d.Joint.e_atLowerLimit = 1;
box2d.Joint.e_atUpperLimit = 2;
box2d.Joint.e_equalLimits = 3;
box2d.JointDef = function(a) {
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.m_collideConnected = a
};
box2d.JointDef.prototype.getCollideConnected = function() {
  return this.m_collideConnected
};
box2d.MouseJointDef = function() {
  box2d.JointDef.call(this, !1);
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.target = new box2d.Vec2;
  this.type = box2d.Joint.e_mouseJoint;
  this.maxForce = 0;
  this.frequencyHz = 5;
  this.dampingRatio = 0.7;
  this.timeStep = 1 / 60
};
goog.inherits(box2d.MouseJointDef, box2d.JointDef);
box2d.CircleDef = function() {
  box2d.ShapeDef.call(this);
  this.type = box2d.ShapeDef.Type.circleShape;
  this.radius = 1
};
goog.inherits(box2d.CircleDef, box2d.ShapeDef);
box2d.CircleDef.prototype.ComputeMass = function(a) {
  a.mass = this.density * box2d.Settings.b2_pi * this.radius * this.radius;
  a.I = 0.5 * a.mass * this.radius * this.radius
};
box2d.MassData = function() {
  this.mass = this.I = 0;
  this.center = new box2d.Vec2(0, 0)
};
box2d.OBB = function() {
  this.R = new box2d.Mat22;
  this.center = new box2d.Vec2;
  this.extents = new box2d.Vec2
};
box2d.PolyDef = function() {
  box2d.ShapeDef.call(this);
  this.vertices = Array(box2d.Settings.b2_maxPolyVertices);
  this.type = box2d.ShapeDef.Type.polyShape;
  for(var a = this.vertexCount = 0;a < box2d.Settings.b2_maxPolyVertices;a++) {
    this.vertices[a] = new box2d.Vec2
  }
};
goog.inherits(box2d.PolyDef, box2d.ShapeDef);
box2d.PolyDef.prototype.SetVertices = function(a) {
  this.vertexCount = a.length;
  for(var b = 0;b < a.length;b++) {
    this.vertices[b].Set(a[b][0], a[b][1])
  }
};
box2d.PolyDef.prototype.ComputeMass = function(a) {
  a.center = new box2d.Vec2(0, 0);
  0 == this.density && (a.mass = 0, a.center.Set(0, 0), a.I = 0);
  box2d.Shape.PolyMass(a, this.vertices, this.vertexCount, this.density)
};
box2d.AABB = function() {
  this.minVertex = new box2d.Vec2;
  this.maxVertex = new box2d.Vec2
};
box2d.AABB.prototype.IsValid = function() {
  var a = this.maxVertex.x, b = this.maxVertex.y, a = this.maxVertex.x, b = this.maxVertex.y, a = a - this.minVertex.x, b = b - this.minVertex.y;
  return a = 0 <= a && 0 <= b && this.minVertex.IsValid() && this.maxVertex.IsValid()
};
box2d.PolyShape = function(a, b, c) {
  box2d.Shape.call(this, a, b);
  this.syncAABB = new box2d.AABB;
  this.syncMat = new box2d.Mat22;
  this.m_localCentroid = new box2d.Vec2;
  this.m_localOBB = new box2d.OBB;
  var d = 0, e;
  b = new box2d.AABB;
  this.m_vertices = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_coreVertices = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_normals = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_type = box2d.ShapeDef.Type.polyShape;
  var f = new box2d.Mat22(a.localRotation);
  if(a instanceof box2d.BoxDef) {
    this.m_localCentroid.x = a.localPosition.x - c.x;
    this.m_localCentroid.y = a.localPosition.y - c.y;
    this.m_vertexCount = 4;
    c = a.extents.x;
    e = a.extents.y;
    a = Math.max(0, c - 2 * box2d.Settings.b2_linearSlop);
    var g = Math.max(0, e - 2 * box2d.Settings.b2_linearSlop), d = this.m_vertices[0] = new box2d.Vec2;
    d.x = f.col1.x * c + f.col2.x * e;
    d.y = f.col1.y * c + f.col2.y * e;
    d = this.m_vertices[1] = new box2d.Vec2;
    d.x = f.col1.x * -c + f.col2.x * e;
    d.y = f.col1.y * -c + f.col2.y * e;
    d = this.m_vertices[2] = new box2d.Vec2;
    d.x = f.col1.x * -c + f.col2.x * -e;
    d.y = f.col1.y * -c + f.col2.y * -e;
    d = this.m_vertices[3] = new box2d.Vec2;
    d.x = f.col1.x * c + f.col2.x * -e;
    d.y = f.col1.y * c + f.col2.y * -e;
    d = this.m_coreVertices[0] = new box2d.Vec2;
    d.x = f.col1.x * a + f.col2.x * g;
    d.y = f.col1.y * a + f.col2.y * g;
    d = this.m_coreVertices[1] = new box2d.Vec2;
    d.x = f.col1.x * -a + f.col2.x * g;
    d.y = f.col1.y * -a + f.col2.y * g;
    d = this.m_coreVertices[2] = new box2d.Vec2;
    d.x = f.col1.x * -a + f.col2.x * -g;
    d.y = f.col1.y * -a + f.col2.y * -g;
    d = this.m_coreVertices[3] = new box2d.Vec2;
    d.x = f.col1.x * a + f.col2.x * -g;
    d.y = f.col1.y * a + f.col2.y * -g
  }else {
    this.m_vertexCount = a.vertexCount;
    box2d.Shape.PolyCentroid(a.vertices, a.vertexCount, box2d.PolyShape.tempVec);
    var g = box2d.PolyShape.tempVec.x, h = box2d.PolyShape.tempVec.y;
    this.m_localCentroid.x = a.localPosition.x + (f.col1.x * g + f.col2.x * h) - c.x;
    this.m_localCentroid.y = a.localPosition.y + (f.col1.y * g + f.col2.y * h) - c.y;
    for(d = 0;d < this.m_vertexCount;++d) {
      this.m_vertices[d] = new box2d.Vec2;
      this.m_coreVertices[d] = new box2d.Vec2;
      c = a.vertices[d].x - g;
      e = a.vertices[d].y - h;
      this.m_vertices[d].x = f.col1.x * c + f.col2.x * e;
      this.m_vertices[d].y = f.col1.y * c + f.col2.y * e;
      c = this.m_vertices[d].x;
      e = this.m_vertices[d].y;
      var j = Math.sqrt(c * c + e * e);
      j > Number.MIN_VALUE && (c *= 1 / j, e *= 1 / j);
      this.m_coreVertices[d].x = this.m_vertices[d].x - 2 * box2d.Settings.b2_linearSlop * c;
      this.m_coreVertices[d].y = this.m_vertices[d].y - 2 * box2d.Settings.b2_linearSlop * e
    }
  }
  a = f = Number.MAX_VALUE;
  c = -Number.MAX_VALUE;
  e = -Number.MAX_VALUE;
  for(d = this.m_maxRadius = 0;d < this.m_vertexCount;++d) {
    g = this.m_vertices[d], f = Math.min(f, g.x), a = Math.min(a, g.y), c = Math.max(c, g.x), e = Math.max(e, g.y), this.m_maxRadius = Math.max(this.m_maxRadius, g.magnitude())
  }
  this.m_localOBB.R.SetIdentity();
  this.m_localOBB.center.Set(0.5 * (f + c), 0.5 * (a + e));
  this.m_localOBB.extents.Set(0.5 * (c - f), 0.5 * (e - a));
  for(d = a = f = 0;d < this.m_vertexCount;++d) {
    this.m_normals[d] = new box2d.Vec2, f = d, a = d + 1 < this.m_vertexCount ? d + 1 : 0, this.m_normals[d].x = this.m_vertices[a].y - this.m_vertices[f].y, this.m_normals[d].y = -(this.m_vertices[a].x - this.m_vertices[f].x), this.m_normals[d].Normalize()
  }
  for(d = 0;d < this.m_vertexCount;++d) {
  }
  this.m_R.SetM(this.m_body.m_R);
  this.m_position.x = this.m_body.m_position.x + (this.m_R.col1.x * this.m_localCentroid.x + this.m_R.col2.x * this.m_localCentroid.y);
  this.m_position.y = this.m_body.m_position.y + (this.m_R.col1.y * this.m_localCentroid.x + this.m_R.col2.y * this.m_localCentroid.y);
  box2d.PolyShape.tAbsR.col1.x = this.m_R.col1.x * this.m_localOBB.R.col1.x + this.m_R.col2.x * this.m_localOBB.R.col1.y;
  box2d.PolyShape.tAbsR.col1.y = this.m_R.col1.y * this.m_localOBB.R.col1.x + this.m_R.col2.y * this.m_localOBB.R.col1.y;
  box2d.PolyShape.tAbsR.col2.x = this.m_R.col1.x * this.m_localOBB.R.col2.x + this.m_R.col2.x * this.m_localOBB.R.col2.y;
  box2d.PolyShape.tAbsR.col2.y = this.m_R.col1.y * this.m_localOBB.R.col2.x + this.m_R.col2.y * this.m_localOBB.R.col2.y;
  box2d.PolyShape.tAbsR.Abs();
  c = box2d.PolyShape.tAbsR.col1.x * this.m_localOBB.extents.x + box2d.PolyShape.tAbsR.col2.x * this.m_localOBB.extents.y;
  e = box2d.PolyShape.tAbsR.col1.y * this.m_localOBB.extents.x + box2d.PolyShape.tAbsR.col2.y * this.m_localOBB.extents.y;
  d = this.m_position.x + (this.m_R.col1.x * this.m_localOBB.center.x + this.m_R.col2.x * this.m_localOBB.center.y);
  f = this.m_position.y + (this.m_R.col1.y * this.m_localOBB.center.x + this.m_R.col2.y * this.m_localOBB.center.y);
  b.minVertex.x = d - c;
  b.minVertex.y = f - e;
  b.maxVertex.x = d + c;
  b.maxVertex.y = f + e;
  d = this.m_body.m_world.m_broadPhase;
  this.m_proxyId = d.InRange(b) ? d.CreateProxy(b, this) : box2d.Pair.b2_nullProxy;
  this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
};
goog.inherits(box2d.PolyShape, box2d.Shape);
box2d.PolyShape.prototype.TestPoint = function(a) {
  var b = new box2d.Vec2;
  b.SetV(a);
  b.subtract(this.m_position);
  b.MulTM(this.m_R);
  for(a = 0;a < this.m_vertexCount;++a) {
    var c = new box2d.Vec2;
    c.SetV(b);
    c.subtract(this.m_vertices[a]);
    if(0 < goog.math.Vec2.dot(this.m_normals[a], c)) {
      return!1
    }
  }
  return!0
};
box2d.PolyShape.prototype.syncAABB = new box2d.AABB;
box2d.PolyShape.prototype.syncMat = new box2d.Mat22;
box2d.PolyShape.prototype.Synchronize = function(a, b, c, d) {
  this.m_R.SetM(d);
  this.m_position.x = this.m_body.m_position.x + (d.col1.x * this.m_localCentroid.x + d.col2.x * this.m_localCentroid.y);
  this.m_position.y = this.m_body.m_position.y + (d.col1.y * this.m_localCentroid.x + d.col2.y * this.m_localCentroid.y);
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    var e, f;
    e = b.col1;
    f = b.col2;
    var g = this.m_localOBB.R.col1, h = this.m_localOBB.R.col2;
    this.syncMat.col1.x = e.x * g.x + f.x * g.y;
    this.syncMat.col1.y = e.y * g.x + f.y * g.y;
    this.syncMat.col2.x = e.x * h.x + f.x * h.y;
    this.syncMat.col2.y = e.y * h.x + f.y * h.y;
    this.syncMat.Abs();
    e = this.m_localCentroid.x + this.m_localOBB.center.x;
    f = this.m_localCentroid.y + this.m_localOBB.center.y;
    g = a.x + (b.col1.x * e + b.col2.x * f);
    a = a.y + (b.col1.y * e + b.col2.y * f);
    e = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    f = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = g - e;
    this.syncAABB.minVertex.y = a - f;
    this.syncAABB.maxVertex.x = g + e;
    this.syncAABB.maxVertex.y = a + f;
    e = d.col1;
    f = d.col2;
    g = this.m_localOBB.R.col1;
    h = this.m_localOBB.R.col2;
    this.syncMat.col1.x = e.x * g.x + f.x * g.y;
    this.syncMat.col1.y = e.y * g.x + f.y * g.y;
    this.syncMat.col2.x = e.x * h.x + f.x * h.y;
    this.syncMat.col2.y = e.y * h.x + f.y * h.y;
    this.syncMat.Abs();
    e = this.m_localCentroid.x + this.m_localOBB.center.x;
    f = this.m_localCentroid.y + this.m_localOBB.center.y;
    g = c.x + (d.col1.x * e + d.col2.x * f);
    a = c.y + (d.col1.y * e + d.col2.y * f);
    e = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    f = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = Math.min(this.syncAABB.minVertex.x, g - e);
    this.syncAABB.minVertex.y = Math.min(this.syncAABB.minVertex.y, a - f);
    this.syncAABB.maxVertex.x = Math.max(this.syncAABB.maxVertex.x, g + e);
    this.syncAABB.maxVertex.y = Math.max(this.syncAABB.maxVertex.y, a + f);
    c = this.m_body.m_world.m_broadPhase;
    c.InRange(this.syncAABB) ? c.MoveProxy(this.m_proxyId, this.syncAABB) : this.m_body.Freeze()
  }
};
box2d.PolyShape.prototype.QuickSync = function(a, b) {
  this.m_R.SetM(b);
  this.m_position.x = a.x + (b.col1.x * this.m_localCentroid.x + b.col2.x * this.m_localCentroid.y);
  this.m_position.y = a.y + (b.col1.y * this.m_localCentroid.x + b.col2.y * this.m_localCentroid.y)
};
box2d.PolyShape.prototype.ResetProxy = function(a) {
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    a.GetProxy(this.m_proxyId);
    a.DestroyProxy(this.m_proxyId);
    var b = box2d.Math.b2MulMM(this.m_R, this.m_localOBB.R), b = box2d.Math.b2AbsM(b), b = box2d.Math.b2MulMV(b, this.m_localOBB.extents), c = box2d.Math.b2MulMV(this.m_R, this.m_localOBB.center);
    c.add(this.m_position);
    var d = new box2d.AABB;
    d.minVertex.SetV(c);
    d.minVertex.subtract(b);
    d.maxVertex.SetV(c);
    d.maxVertex.add(b);
    this.m_proxyId = a.InRange(d) ? a.CreateProxy(d, this) : box2d.Pair.b2_nullProxy;
    this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
  }
};
box2d.PolyShape.prototype.Support = function(a, b, c) {
  var d = a * this.m_R.col1.x + b * this.m_R.col1.y;
  a = a * this.m_R.col2.x + b * this.m_R.col2.y;
  b = 0;
  for(var e = this.m_coreVertices[0].x * d + this.m_coreVertices[0].y * a, f = 1;f < this.m_vertexCount;++f) {
    var g = this.m_coreVertices[f].x * d + this.m_coreVertices[f].y * a;
    g > e && (b = f, e = g)
  }
  c.Set(this.m_position.x + (this.m_R.col1.x * this.m_coreVertices[b].x + this.m_R.col2.x * this.m_coreVertices[b].y), this.m_position.y + (this.m_R.col1.y * this.m_coreVertices[b].x + this.m_R.col2.y * this.m_coreVertices[b].y))
};
box2d.PolyShape.tempVec = new box2d.Vec2;
box2d.PolyShape.tAbsR = new box2d.Mat22;
box2d.CircleShape = function(a, b, c) {
  box2d.Shape.call(this, a, b);
  this.m_localPosition = new box2d.Vec2;
  this.m_localPosition.Set(a.localPosition.x - c.x, a.localPosition.y - c.y);
  this.m_type = a.type;
  this.m_radius = a.radius;
  this.m_R.SetM(this.m_body.m_R);
  a = this.m_R.col1.x * this.m_localPosition.x + this.m_R.col2.x * this.m_localPosition.y;
  b = this.m_R.col1.y * this.m_localPosition.x + this.m_R.col2.y * this.m_localPosition.y;
  this.m_position.x = this.m_body.m_position.x + a;
  this.m_position.y = this.m_body.m_position.y + b;
  this.m_maxRadius = Math.sqrt(a * a + b * b) + this.m_radius;
  a = new box2d.AABB;
  a.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
  a.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
  b = this.m_body.m_world.m_broadPhase;
  this.m_proxyId = b.InRange(a) ? b.CreateProxy(a, this) : box2d.Pair.b2_nullProxy;
  this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
};
goog.inherits(box2d.CircleShape, box2d.Shape);
box2d.CircleShape.prototype.TestPoint = function(a) {
  var b = new box2d.Vec2;
  b.SetV(a);
  b.subtract(this.m_position);
  return goog.math.Vec2.dot(b, b) <= this.m_radius * this.m_radius
};
box2d.CircleShape.prototype.Synchronize = function(a, b, c, d) {
  this.m_R.SetM(d);
  this.m_position.x = d.col1.x * this.m_localPosition.x + d.col2.x * this.m_localPosition.y + c.x;
  this.m_position.y = d.col1.y * this.m_localPosition.x + d.col2.y * this.m_localPosition.y + c.y;
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    c = a.x + (b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y);
    d = a.y + (b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y);
    a = Math.min(c, this.m_position.x);
    b = Math.min(d, this.m_position.y);
    c = Math.max(c, this.m_position.x);
    var e = Math.max(d, this.m_position.y);
    d = new box2d.AABB;
    d.minVertex.Set(a - this.m_radius, b - this.m_radius);
    d.maxVertex.Set(c + this.m_radius, e + this.m_radius);
    a = this.m_body.m_world.m_broadPhase;
    a.InRange(d) ? a.MoveProxy(this.m_proxyId, d) : this.m_body.Freeze()
  }
};
box2d.CircleShape.prototype.QuickSync = function(a, b) {
  this.m_R.SetM(b);
  this.m_position.x = b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y + a.x;
  this.m_position.y = b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y + a.y
};
box2d.CircleShape.prototype.ResetProxy = function(a) {
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    a.GetProxy(this.m_proxyId);
    a.DestroyProxy(this.m_proxyId);
    var b = new box2d.AABB;
    b.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
    b.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
    this.m_proxyId = a.InRange(b) ? a.CreateProxy(b, this) : box2d.Pair.b2_nullProxy;
    this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
  }
};
box2d.CircleShape.prototype.Support = function(a, b, c) {
  var d = Math.sqrt(a * a + b * b);
  c.Set(this.m_position.x + this.m_radius * (a / d), this.m_position.y + this.m_radius * (b / d))
};
box2d.ShapeFactory = {};
box2d.ShapeFactory.Create = function(a, b, c) {
  if(a instanceof box2d.CircleDef) {
    return new box2d.CircleShape(a, b, c)
  }
  if(a instanceof box2d.BoxDef || a instanceof box2d.PolyDef) {
    return new box2d.PolyShape(a, b, c)
  }
  throw"unsupported ShapeDef";
};
box2d.Math = {};
box2d.Math.b2MulMV = function(a, b) {
  return new box2d.Vec2(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
};
box2d.Math.b2MulTMV = function(a, b) {
  return new box2d.Vec2(goog.math.Vec2.dot(b, a.col1), goog.math.Vec2.dot(b, a.col2))
};
box2d.Math.b2MulMM = function(a, b) {
  return new box2d.Mat22(0, box2d.Math.b2MulMV(a, b.col1), box2d.Math.b2MulMV(a, b.col2))
};
box2d.Math.b2AbsM = function(a) {
  return new box2d.Mat22(0, box2d.Vec2.abs(a.col1), box2d.Vec2.abs(a.col2))
};
box2d.Math.b2Clamp = function(a, b, c) {
  return Math.max(b, Math.min(a, c))
};
box2d.Body = function(a, b) {
  this.sMat0 = new box2d.Mat22;
  this.m_position = new box2d.Vec2;
  this.m_position.SetV(a.position);
  this.m_position0 = new box2d.Vec2;
  this.m_position0.SetV(this.m_position);
  var c = 0, d, e;
  this.m_flags = 0;
  this.m_rotation = a.rotation;
  this.m_R = new box2d.Mat22(0);
  this.m_R.Set(this.m_rotation);
  this.m_rotation0 = this.m_rotation;
  this.m_world = b;
  this.m_linearDamping = box2d.Math.b2Clamp(1 - a.linearDamping, 0, 1);
  this.m_angularDamping = box2d.Math.b2Clamp(1 - a.angularDamping, 0, 1);
  this.m_force = new box2d.Vec2(0, 0);
  this.m_mass = this.m_torque = 0;
  for(var f = Array(box2d.Settings.b2_maxShapesPerBody), c = 0;c < box2d.Settings.b2_maxShapesPerBody;c++) {
    f[c] = new box2d.MassData
  }
  this.m_shapeCount = 0;
  this.m_center = new box2d.Vec2(0, 0);
  for(c = 0;c < box2d.Settings.b2_maxShapesPerBody;++c) {
    d = a.shapes[c];
    if(null == d) {
      break
    }
    e = f[c];
    d.ComputeMass(e);
    this.m_mass += e.mass;
    this.m_center.x += e.mass * (d.localPosition.x + e.center.x);
    this.m_center.y += e.mass * (d.localPosition.y + e.center.y);
    ++this.m_shapeCount
  }
  0 < this.m_mass ? (this.m_center.scale(1 / this.m_mass), this.m_position.add(box2d.Math.b2MulMV(this.m_R, this.m_center))) : this.m_flags |= box2d.Body.Flags.staticFlag;
  for(c = this.m_I = 0;c < this.m_shapeCount;++c) {
    d = a.shapes[c], e = f[c], this.m_I += e.I, d = box2d.Vec2.subtract(box2d.Vec2.add(d.localPosition, e.center), this.m_center), this.m_I += e.mass * goog.math.Vec2.dot(d, d)
  }
  this.m_invMass = 0 < this.m_mass ? 1 / this.m_mass : 0;
  this.m_invI = 0 < this.m_I && !1 == a.preventRotation ? 1 / this.m_I : this.m_I = 0;
  this.m_linearVelocity = box2d.Vec2.add(a.linearVelocity, box2d.Vec2.crossScalar(a.angularVelocity, this.m_center));
  this.m_angularVelocity = a.angularVelocity;
  this.m_shapeList = this.m_next = this.m_prev = this.m_contactList = this.m_jointList = null;
  for(c = 0;c < this.m_shapeCount;++c) {
    d = a.shapes[c], e = box2d.ShapeFactory.Create(d, this, this.m_center), e.m_next = this.m_shapeList, this.m_shapeList = e
  }
  this.m_sleepTime = 0;
  a.allowSleep && (this.m_flags |= box2d.Body.Flags.allowSleepFlag);
  a.isSleeping && (this.m_flags |= box2d.Body.Flags.sleepFlag);
  if(this.m_flags & box2d.Body.Flags.sleepFlag || 0 == this.m_invMass) {
    this.m_linearVelocity.Set(0, 0), this.m_angularVelocity = 0
  }
  this.m_userData = a.userData
};
box2d.Body.prototype.SetOriginPosition = function(a, b) {
  if(!this.IsFrozen()) {
    this.m_rotation = b;
    this.m_R.Set(this.m_rotation);
    this.m_position = box2d.Vec2.add(a, box2d.Math.b2MulMV(this.m_R, this.m_center));
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for(var c = this.m_shapeList;null != c;c = c.m_next) {
      c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
    }
    this.m_world.m_broadPhase.Commit()
  }
};
box2d.Body.prototype.GetOriginPosition = function() {
  return box2d.Vec2.subtract(this.m_position, box2d.Math.b2MulMV(this.m_R, this.m_center))
};
box2d.Body.prototype.SetCenterPosition = function(a, b) {
  if(!this.IsFrozen()) {
    this.m_rotation = b;
    this.m_R.Set(this.m_rotation);
    this.m_position.SetV(a);
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for(var c = this.m_shapeList;null != c;c = c.m_next) {
      c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
    }
    this.m_world.m_broadPhase.Commit()
  }
};
box2d.Body.prototype.GetCenterPosition = function() {
  return this.m_position
};
box2d.Body.prototype.GetRotation = function() {
  return this.m_rotation
};
box2d.Body.prototype.GetRotationMatrix = function() {
  return this.m_R
};
box2d.Body.prototype.SetAngularVelocity = function(a) {
  this.m_angularVelocity = a
};
box2d.Body.prototype.GetAngularVelocity = function() {
  return this.m_angularVelocity
};
box2d.Body.prototype.ApplyForce = function(a, b) {
  !1 == this.IsSleeping() && (this.m_force.add(a), this.m_torque += box2d.Vec2.cross(box2d.Vec2.subtract(b, this.m_position), a))
};
box2d.Body.prototype.ApplyTorque = function(a) {
  !1 == this.IsSleeping() && (this.m_torque += a)
};
box2d.Body.prototype.ApplyImpulse = function(a, b) {
  !1 == this.IsSleeping() && (this.m_linearVelocity.add(box2d.Vec2.multiplyScalar(this.m_invMass, a)), this.m_angularVelocity += this.m_invI * box2d.Vec2.cross(box2d.Vec2.subtract(b, this.m_position), a))
};
box2d.Body.prototype.GetMass = function() {
  return this.m_mass
};
box2d.Body.prototype.GetInertia = function() {
  return this.m_I
};
box2d.Body.prototype.GetWorldPoint = function(a) {
  return box2d.Vec2.add(this.m_position, box2d.Math.b2MulMV(this.m_R, a))
};
box2d.Body.prototype.GetWorldVector = function(a) {
  return box2d.Math.b2MulMV(this.m_R, a)
};
box2d.Body.prototype.GetLocalPoint = function(a) {
  return box2d.Math.b2MulTMV(this.m_R, box2d.Vec2.subtract(a, this.m_position))
};
box2d.Body.prototype.GetLocalVector = function(a) {
  return box2d.Math.b2MulTMV(this.m_R, a)
};
box2d.Body.prototype.IsStatic = function() {
  return(this.m_flags & box2d.Body.Flags.staticFlag) == box2d.Body.Flags.staticFlag
};
box2d.Body.prototype.IsFrozen = function() {
  return(this.m_flags & box2d.Body.Flags.frozenFlag) == box2d.Body.Flags.frozenFlag
};
box2d.Body.prototype.IsSleeping = function() {
  return(this.m_flags & box2d.Body.Flags.sleepFlag) == box2d.Body.Flags.sleepFlag
};
box2d.Body.prototype.AllowSleeping = function(a) {
  a ? this.m_flags |= box2d.Body.Flags.allowSleepFlag : (this.m_flags &= ~box2d.Body.Flags.allowSleepFlag, this.WakeUp())
};
box2d.Body.prototype.WakeUp = function() {
  this.m_flags &= ~box2d.Body.Flags.sleepFlag;
  this.m_sleepTime = 0
};
box2d.Body.prototype.GetShapeList = function() {
  return this.m_shapeList
};
box2d.Body.prototype.GetContactList = function() {
  return this.m_contactList
};
box2d.Body.prototype.GetJointList = function() {
  return this.m_jointList
};
box2d.Body.prototype.GetNext = function() {
  return this.m_next
};
box2d.Body.prototype.GetUserData = function() {
  return this.m_userData
};
box2d.Body.prototype.Destroy = function() {
  for(var a = this.m_shapeList;a;) {
    var b = a, a = a.m_next;
    box2d.Shape.Destroy(b)
  }
};
box2d.Body.prototype.SynchronizeShapes = function() {
  this.sMat0.Set(this.m_rotation0);
  for(var a = this.m_shapeList;null != a;a = a.m_next) {
    a.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R)
  }
};
box2d.Body.prototype.QuickSyncShapes = function() {
  for(var a = this.m_shapeList;null != a;a = a.m_next) {
    a.QuickSync(this.m_position, this.m_R)
  }
};
box2d.Body.prototype.IsConnected = function(a) {
  for(var b = this.m_jointList;null != b;b = b.next) {
    if(b.other == a) {
      return!1 == b.joint.m_collideConnected
    }
  }
  return!1
};
box2d.Body.prototype.Freeze = function() {
  this.m_flags |= box2d.Body.Flags.frozenFlag;
  this.m_linearVelocity.SetZero();
  this.m_angularVelocity = 0;
  for(var a = this.m_shapeList;null != a;a = a.m_next) {
    a.DestroyProxy()
  }
};
box2d.Body.prototype.SetLinearVelocity = function(a) {
  this.m_linearVelocity.SetV(a)
};
box2d.Body.prototype.GetLinearVelocity = function() {
  return this.m_linearVelocity
};
box2d.Body.Flags = {staticFlag:1, frozenFlag:2, islandFlag:4, sleepFlag:8, allowSleepFlag:16, destroyFlag:32};
box2d.CollisionFilter = function() {
};
box2d.CollisionFilter.prototype.ShouldCollide = function(a, b) {
  return a.m_groupIndex == b.m_groupIndex && 0 != a.m_groupIndex ? 0 < a.m_groupIndex : 0 != (a.maskBits & b.categoryBits) && 0 != (a.categoryBits & b.maskBits)
};
box2d.CollisionFilter.b2_defaultFilter = new box2d.CollisionFilter;
box2d.WorldListener = function() {
};
box2d.WorldListener.prototype.NotifyJointDestroyed = function() {
};
box2d.WorldListener.prototype.NotifyBoundaryViolated = function() {
  return box2d.WorldListener.b2_freezeBody
};
box2d.WorldListener.b2_freezeBody = 0;
box2d.WorldListener.b2_destroyBody = 1;
box2d.ContactRegister = function() {
  this.primary = this.destroyFcn = this.createFcn = null
};
box2d.ContactNode = function() {
  this.next = this.prev = this.contact = this.other = null
};
box2d.Contact = function(a, b) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !a || !b ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = a, this.m_shape2 = b, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null)
};
box2d.Contact.prototype.GetManifolds = function() {
  return null
};
box2d.Contact.prototype.GetManifoldCount = function() {
  return this.m_manifoldCount
};
box2d.Contact.prototype.GetNext = function() {
  return this.m_next
};
box2d.Contact.prototype.GetShape1 = function() {
  return this.m_shape1
};
box2d.Contact.prototype.GetShape2 = function() {
  return this.m_shape2
};
box2d.Contact.prototype.Evaluate = function() {
};
box2d.Contact.e_islandFlag = 1;
box2d.Contact.e_destroyFlag = 2;
box2d.Features = function(a) {
  this._m_id = a;
  this._flip = this._referenceFace = this._incidentVertex = this._incidentEdg = 0
};
box2d.Features.prototype.set_referenceFace = function(a) {
  this._referenceFace = a;
  this._m_id._key = this._m_id._key & 4294967040 | this._referenceFace & 255
};
box2d.Features.prototype.get_referenceFace = function() {
  return this._referenceFace
};
box2d.Features.prototype.set_incidentEdge = function(a) {
  this._incidentEdge = a;
  this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
};
box2d.Features.prototype.get_incidentEdge = function() {
  return this._incidentEdge
};
box2d.Features.prototype.set_incidentVertex = function(a) {
  this._incidentVertex = a;
  this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
};
box2d.Features.prototype.get_incidentVertex = function() {
  return this._incidentVertex
};
box2d.Features.prototype.set_flip = function(a) {
  this._flip = a;
  this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
};
box2d.Features.prototype.get_flip = function() {
  return this._flip
};
box2d.ContactID = function() {
  this._key = 0;
  this.features = new box2d.Features(this)
};
box2d.ContactID.prototype.Set = function(a) {
  this.set_key(a._key)
};
box2d.ContactID.prototype.Copy = function() {
  var a = new box2d.ContactID;
  a.set_key(this._key);
  return a
};
box2d.ContactID.prototype.get_key = function() {
  return this._key
};
box2d.ContactID.prototype.set_key = function(a) {
  this._key = a;
  this.features._referenceFace = this._key & 255;
  this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
  this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
  this.features._flip = (this._key & 4278190080) >> 24 & 255
};
box2d.ContactPoint = function() {
  this.position = new box2d.Vec2;
  this.id = new box2d.ContactID;
  this.tangentImpulse = this.normalImpulse = this.separation = null
};
box2d.Manifold = function() {
  this.pointCount = 0;
  this.points = Array(box2d.Settings.b2_maxManifoldPoints);
  for(var a = 0;a < box2d.Settings.b2_maxManifoldPoints;a++) {
    this.points[a] = new box2d.ContactPoint
  }
  this.normal = new box2d.Vec2
};
box2d.PolyContact = function(a, b) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !a || !b ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = a, this.m_shape2 = b, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null, this.m0 = new box2d.Manifold, this.m_manifold = [new box2d.Manifold], this.m_manifold[0].pointCount = 0)
};
goog.inherits(box2d.PolyContact, box2d.Contact);
box2d.PolyContact.prototype.Evaluate = function() {
  for(var a = this.m_manifold[0], b = this.m0.points, c = 0;c < a.pointCount;c++) {
    var d = b[c], e = a.points[c];
    d.normalImpulse = e.normalImpulse;
    d.tangentImpulse = e.tangentImpulse;
    d.id = e.id.Copy()
  }
  this.m0.pointCount = a.pointCount;
  box2d.Collision.b2CollidePoly(a, this.m_shape1, this.m_shape2, !1);
  if(0 < a.pointCount) {
    b = [!1, !1];
    for(c = 0;c < a.pointCount;++c) {
      d = a.points[c];
      d.normalImpulse = 0;
      d.tangentImpulse = 0;
      for(var e = d.id.key, f = 0;f < this.m0.pointCount;++f) {
        if(!0 != b[f]) {
          var g = this.m0.points[f];
          if(g.id.key == e) {
            b[f] = !0;
            d.normalImpulse = g.normalImpulse;
            d.tangentImpulse = g.tangentImpulse;
            break
          }
        }
      }
    }
    this.m_manifoldCount = 1
  }else {
    this.m_manifoldCount = 0
  }
};
box2d.PolyContact.prototype.GetManifolds = function() {
  return this.m_manifold
};
box2d.PolyContact.Create = function(a, b) {
  return new box2d.PolyContact(a, b)
};
box2d.PolyAndCircleContact = function(a, b) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !a || !b ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = a, this.m_shape2 = b, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null, this.m_manifold = [new box2d.Manifold], this.m_manifold[0].pointCount = 0, this.m_manifold[0].points[0].normalImpulse = 0, this.m_manifold[0].points[0].tangentImpulse = 0)
};
goog.inherits(box2d.PolyAndCircleContact, box2d.Contact);
box2d.PolyAndCircleContact.prototype.getBodies = function() {
  return[this.m_shape1.m_body, this.m_shape2.m_body]
};
box2d.PolyAndCircleContact.prototype.Evaluate = function() {
  box2d.Collision.b2CollidePolyAndCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, !1);
  this.m_manifoldCount = 0 < this.m_manifold[0].pointCount ? 1 : 0
};
box2d.PolyAndCircleContact.prototype.GetManifolds = function() {
  return this.m_manifold
};
box2d.PolyAndCircleContact.Create = function(a, b) {
  return new box2d.PolyAndCircleContact(a, b)
};
box2d.ClipVertex = function() {
  this.v = new box2d.Vec2;
  this.id = new box2d.ContactID
};
box2d.Collision = {};
box2d.Collision.b2_nullFeature = 255;
box2d.Collision.ClipSegmentToLine = function(a, b, c, d) {
  var e = 0, f = b[0].v, g = b[1].v, h = goog.math.Vec2.dot(c, b[0].v) - d;
  c = goog.math.Vec2.dot(c, b[1].v) - d;
  0 >= h && (a[e++] = b[0]);
  0 >= c && (a[e++] = b[1]);
  0 > h * c && (c = h / (h - c), d = a[e].v, d.x = f.x + c * (g.x - f.x), d.y = f.y + c * (g.y - f.y), a[e].id = 0 < h ? b[0].id : b[1].id, ++e);
  return e
};
box2d.Collision.EdgeSeparation = function(a, b, c) {
  for(var d = a.m_vertices, e = c.m_vertexCount, f = c.m_vertices, g = a.m_normals[b].x, h = a.m_normals[b].y, j = g, k = a.m_R, g = k.col1.x * j + k.col2.x * h, h = k.col1.y * j + k.col2.y * h, l = g, m = h, k = c.m_R, j = l * k.col1.x + m * k.col1.y, m = l * k.col2.x + m * k.col2.y, l = j, j = 0, k = Number.MAX_VALUE, n = 0;n < e;++n) {
    var q = f[n], q = q.x * l + q.y * m;
    q < k && (k = q, j = n)
  }
  k = a.m_R;
  e = a.m_position.x + (k.col1.x * d[b].x + k.col2.x * d[b].y);
  a = a.m_position.y + (k.col1.y * d[b].x + k.col2.y * d[b].y);
  k = c.m_R;
  b = c.m_position.x + (k.col1.x * f[j].x + k.col2.x * f[j].y);
  c = c.m_position.y + (k.col1.y * f[j].x + k.col2.y * f[j].y);
  return(b - e) * g + (c - a) * h
};
box2d.Collision.FindMaxSeparation = function(a, b, c, d) {
  for(var e = b.m_vertexCount, f = c.m_position.x - b.m_position.x, g = c.m_position.y - b.m_position.y, h = f * b.m_R.col1.x + g * b.m_R.col1.y, g = f * b.m_R.col2.x + g * b.m_R.col2.y, f = 0, j = -Number.MAX_VALUE, k = 0;k < e;++k) {
    var l = b.m_normals[k].x * h + b.m_normals[k].y * g;
    l > j && (j = l, f = k)
  }
  h = box2d.Collision.EdgeSeparation(b, f, c);
  if(0 < h && !1 == d) {
    return h
  }
  k = 0 <= f - 1 ? f - 1 : e - 1;
  l = box2d.Collision.EdgeSeparation(b, k, c);
  if(0 < l && !1 == d) {
    return l
  }
  var m = f + 1 < e ? f + 1 : 0, n = box2d.Collision.EdgeSeparation(b, m, c);
  if(0 < n && !1 == d) {
    return n
  }
  j = g = 0;
  if(l > h && l > n) {
    j = -1, g = k, k = l
  }else {
    if(n > h) {
      j = 1, g = m, k = n
    }else {
      return a[0] = f, h
    }
  }
  for(;;) {
    f = -1 == j ? 0 <= g - 1 ? g - 1 : e - 1 : g + 1 < e ? g + 1 : 0;
    h = box2d.Collision.EdgeSeparation(b, f, c);
    if(0 < h && !1 == d) {
      return h
    }
    if(h > k) {
      g = f, k = h
    }else {
      break
    }
  }
  a[0] = g;
  return k
};
box2d.Collision.FindIncidentEdge = function(a, b, c, d) {
  var e = b.m_vertices, f = d.m_vertexCount, g = d.m_vertices, h = e[c + 1 == b.m_vertexCount ? 0 : c + 1], j = h.x, k = h.y, h = e[c], j = j - h.x, k = k - h.y, h = j, j = k, k = -h, h = 1 / Math.sqrt(j * j + k * k), j = j * h, k = k * h, h = j, e = b.m_R, j = e.col1.x * h + e.col2.x * k, k = e.col1.y * h + e.col2.y * k;
  b = j;
  e = d.m_R;
  h = b * e.col1.x + k * e.col1.y;
  k = b * e.col2.x + k * e.col2.y;
  b = h;
  for(var e = j = 0, l = Number.MAX_VALUE, m = 0;m < f;++m) {
    var n = m, q = m + 1 < f ? m + 1 : 0, h = g[q], r = h.x, s = h.y, h = g[n], r = r - h.x, s = s - h.y, h = r, r = s, s = -h, h = 1 / Math.sqrt(r * r + s * s), r = r * h, s = s * h, h = r * b + s * k;
    h < l && (l = h, j = n, e = q)
  }
  f = a[0];
  h = f.v;
  h.SetV(g[j]);
  h.MulM(d.m_R);
  h.add(d.m_position);
  f.id.features.referenceFace = c;
  f.id.features.incidentEdge = j;
  f.id.features.incidentVertex = j;
  f = a[1];
  h = f.v;
  h.SetV(g[e]);
  h.MulM(d.m_R);
  h.add(d.m_position);
  f.id.features.referenceFace = c;
  f.id.features.incidentEdge = j;
  f.id.features.incidentVertex = e
};
box2d.Collision.b2CollidePolyTempVec = new box2d.Vec2;
box2d.Collision.b2CollidePoly = function(a, b, c, d) {
  a.pointCount = 0;
  var e, f = [0], g = box2d.Collision.FindMaxSeparation(f, b, c, d);
  e = f[0];
  if(!(0 < g && !1 == d)) {
    var h, f = [0], j = box2d.Collision.FindMaxSeparation(f, c, b, d);
    h = f[0];
    if(!(0 < j && !1 == d)) {
      var k = 0, f = 0;
      j > 0.98 * g + 0.0010 ? (g = c, k = h, f = 1) : (g = b, b = c, k = e, f = 0);
      c = [new box2d.ClipVertex, new box2d.ClipVertex];
      box2d.Collision.FindIncidentEdge(c, g, k, b);
      b = g.m_vertices;
      var l = b[k], m = k + 1 < g.m_vertexCount ? b[k + 1] : b[0];
      e = m.x - l.x;
      h = m.y - l.y;
      var n = e, q = g.m_R;
      e = q.col1.x * n + q.col2.x * h;
      h = q.col1.y * n + q.col2.y * h;
      k = 1 / Math.sqrt(e * e + h * h);
      e *= k;
      h *= k;
      n = e;
      k = h;
      b = -n;
      var j = l.x, r = l.y, n = j, q = g.m_R, j = q.col1.x * n + q.col2.x * r, r = q.col1.y * n + q.col2.y * r, j = j + g.m_position.x, r = r + g.m_position.y, l = m.x, m = m.y, n = l, q = g.m_R, l = q.col1.x * n + q.col2.x * m, m = q.col1.y * n + q.col2.y * m, l = l + g.m_position.x, m = m + g.m_position.y, g = k * j + b * r, n = -(e * j + h * r), l = e * l + h * m, m = [new box2d.ClipVertex, new box2d.ClipVertex], j = [new box2d.ClipVertex, new box2d.ClipVertex], q = 0;
      box2d.Collision.b2CollidePolyTempVec.Set(-e, -h);
      q = box2d.Collision.ClipSegmentToLine(m, c, box2d.Collision.b2CollidePolyTempVec, n);
      if(!(2 > q) && (box2d.Collision.b2CollidePolyTempVec.Set(e, h), q = box2d.Collision.ClipSegmentToLine(j, m, box2d.Collision.b2CollidePolyTempVec, l), !(2 > q))) {
        f ? a.normal.Set(-k, -b) : a.normal.Set(k, b);
        for(e = c = 0;e < box2d.Settings.b2_maxManifoldPoints;++e) {
          if(h = j[e].v, h = k * h.x + b * h.y - g, 0 >= h || !0 == d) {
            l = a.points[c], l.separation = h, l.position.SetV(j[e].v), l.id.Set(j[e].id), l.id.features.flip = f, ++c
          }
        }
        a.pointCount = c
      }
    }
  }
};
box2d.Collision.b2CollideCircle = function(a, b, c, d) {
  a.pointCount = 0;
  var e = c.m_position.x - b.m_position.x, f = c.m_position.y - b.m_position.y, g = e * e + f * f;
  b = b.m_radius + c.m_radius;
  g > b * b && !1 == d || (g < Number.MIN_VALUE ? (d = -b, a.normal.Set(0, 1)) : (g = Math.sqrt(g), d = g - b, g = 1 / g, a.normal.x = g * e, a.normal.y = g * f), a.pointCount = 1, e = a.points[0], e.id.set_key(0), e.separation = d, e.position.x = c.m_position.x - c.m_radius * a.normal.x, e.position.y = c.m_position.y - c.m_radius * a.normal.y)
};
box2d.Collision.b2CollidePolyAndCircle = function(a, b, c) {
  a.pointCount = 0;
  var d, e, f;
  e = c.m_position.x - b.m_position.x;
  f = c.m_position.y - b.m_position.y;
  var g = b.m_R, h = e * g.col1.x + f * g.col1.y;
  f = e * g.col2.x + f * g.col2.y;
  e = h;
  var j = 0, k = -Number.MAX_VALUE, h = c.m_radius;
  for(d = 0;d < b.m_vertexCount;++d) {
    var l = b.m_normals[d].x * (e - b.m_vertices[d].x) + b.m_normals[d].y * (f - b.m_vertices[d].y);
    if(l > h) {
      return
    }
    l > k && (k = l, j = d)
  }
  if(k < Number.MIN_VALUE) {
    a.pointCount = 1, f = b.m_normals[j], a.normal.x = g.col1.x * f.x + g.col2.x * f.y, a.normal.y = g.col1.y * f.x + g.col2.y * f.y, d = a.points[0], d.id.features.incidentEdge = j, d.id.features.incidentVertex = box2d.Collision.b2_nullFeature, d.id.features.referenceFace = box2d.Collision.b2_nullFeature, d.id.features.flip = 0, d.position.x = c.m_position.x - h * a.normal.x, d.position.y = c.m_position.y - h * a.normal.y, d.separation = k - h
  }else {
    var k = j + 1 < b.m_vertexCount ? j + 1 : 0, m = b.m_vertices[k].x - b.m_vertices[j].x, l = b.m_vertices[k].y - b.m_vertices[j].y, n = Math.sqrt(m * m + l * l), m = m / n, l = l / n;
    if(n < Number.MIN_VALUE) {
      e -= b.m_vertices[j].x, f -= b.m_vertices[j].y, b = Math.sqrt(e * e + f * f), e /= b, f /= b, b > h || (a.pointCount = 1, a.normal.Set(g.col1.x * e + g.col2.x * f, g.col1.y * e + g.col2.y * f), d = a.points[0], d.id.features.incidentEdge = box2d.Collision.b2_nullFeature, d.id.features.incidentVertex = j, d.id.features.referenceFace = box2d.Collision.b2_nullFeature, d.id.features.flip = 0, d.position.x = c.m_position.x - h * a.normal.x, d.position.y = c.m_position.y - h * a.normal.y, d.separation = 
      b - h)
    }else {
      var q = (e - b.m_vertices[j].x) * m + (f - b.m_vertices[j].y) * l;
      d = a.points[0];
      d.id.features.incidentEdge = box2d.Collision.b2_nullFeature;
      d.id.features.incidentVertex = box2d.Collision.b2_nullFeature;
      d.id.features.referenceFace = box2d.Collision.b2_nullFeature;
      d.id.features.flip = 0;
      0 >= q ? (m = b.m_vertices[j].x, b = b.m_vertices[j].y, d.id.features.incidentVertex = j) : q >= n ? (m = b.m_vertices[k].x, b = b.m_vertices[k].y, d.id.features.incidentVertex = k) : (m = m * q + b.m_vertices[j].x, b = l * q + b.m_vertices[j].y, d.id.features.incidentEdge = j);
      e -= m;
      f -= b;
      b = Math.sqrt(e * e + f * f);
      e /= b;
      f /= b;
      b > h || (a.pointCount = 1, a.normal.Set(g.col1.x * e + g.col2.x * f, g.col1.y * e + g.col2.y * f), d.position.x = c.m_position.x - h * a.normal.x, d.position.y = c.m_position.y - h * a.normal.y, d.separation = b - h)
    }
  }
};
box2d.Collision.b2TestOverlap = function(a, b) {
  var c = b.minVertex, d = a.maxVertex, e = c.x - d.x, f = c.y - d.y, c = a.minVertex, d = b.maxVertex, g = c.y - d.y;
  return 0 < e || 0 < f || 0 < c.x - d.x || 0 < g ? !1 : !0
};
box2d.CircleContact = function(a, b) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !a || !b ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = a, this.m_shape2 = b, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null, this.m_manifold = [new box2d.Manifold], this.m_manifold[0].pointCount = 0, this.m_manifold[0].points[0].normalImpulse = 0, this.m_manifold[0].points[0].tangentImpulse = 0)
};
goog.inherits(box2d.CircleContact, box2d.Contact);
box2d.CircleContact.prototype.getBodies = function() {
  return[this.m_shape1.m_body, this.m_shape2.m_body]
};
box2d.CircleContact.prototype.Evaluate = function() {
  box2d.Collision.b2CollideCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, !1);
  this.m_manifoldCount = 0 < this.m_manifold[0].pointCount ? 1 : 0
};
box2d.CircleContact.prototype.GetManifolds = function() {
  return this.m_manifold
};
box2d.CircleContact.Create = function(a, b) {
  return new box2d.CircleContact(a, b)
};
box2d.ContactFactory = {};
box2d.ContactFactory.Create = function(a, b) {
  !1 == box2d.ContactFactory.s_initialized && (box2d.ContactFactory._InitializeRegisters(), box2d.ContactFactory.s_initialized = !0);
  var c = a.m_type, d = b.m_type, e = box2d.ContactFactory.s_registers[c][d].createFcn;
  if(e) {
    if(box2d.ContactFactory.s_registers[c][d].primary) {
      return e(a, b)
    }
    c = e(b, a);
    for(d = 0;d < c.GetManifoldCount();++d) {
      e = c.GetManifolds()[d], e.normal = e.normal.Negative()
    }
    return c
  }
  return null
};
box2d.ContactFactory.Destroy = function(a) {
  0 < a.GetManifoldCount() && (a.m_shape1.m_body.WakeUp(), a.m_shape2.m_body.WakeUp())
};
box2d.ContactFactory._InitializeRegisters = function() {
  box2d.ContactFactory.s_registers = Array(box2d.ShapeDef.Type.shapeTypeCount);
  for(var a = 0;a < box2d.ShapeDef.Type.shapeTypeCount;a++) {
    box2d.ContactFactory.s_registers[a] = Array(box2d.ShapeDef.Type.shapeTypeCount);
    for(var b = 0;b < box2d.ShapeDef.Type.shapeTypeCount;b++) {
      box2d.ContactFactory.s_registers[a][b] = new box2d.ContactRegister
    }
  }
  box2d.ContactFactory._AddType(box2d.CircleContact.Create, box2d.ShapeDef.Type.circleShape, box2d.ShapeDef.Type.circleShape);
  box2d.ContactFactory._AddType(box2d.PolyAndCircleContact.Create, box2d.ShapeDef.Type.polyShape, box2d.ShapeDef.Type.circleShape);
  box2d.ContactFactory._AddType(box2d.PolyContact.Create, box2d.ShapeDef.Type.polyShape, box2d.ShapeDef.Type.polyShape)
};
box2d.ContactFactory._AddType = function(a, b, c) {
  box2d.ContactFactory.s_registers[b][c].createFcn = a;
  box2d.ContactFactory.s_registers[b][c].primary = !0;
  b != c && (box2d.ContactFactory.s_registers[c][b].createFcn = a, box2d.ContactFactory.s_registers[c][b].primary = !1)
};
box2d.ContactFactory.s_registers = null;
box2d.ContactFactory.s_initialized = !1;
box2d.NullContact = function(a, b) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !a || !b ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = a, this.m_shape2 = b, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null)
};
goog.inherits(box2d.NullContact, box2d.Contact);
box2d.NullContact.prototype.Evaluate = function() {
};
box2d.NullContact.prototype.GetManifolds = function() {
  return null
};
box2d.PairCallback = function() {
};
box2d.PairCallback.prototype.PairAdded = function() {
  return null
};
box2d.PairCallback.prototype.PairRemoved = function() {
};
box2d.ContactManager = function(a) {
  this.m_nullContact = new box2d.NullContact;
  this.m_world = a;
  this.m_destroyImmediate = !1
};
goog.inherits(box2d.ContactManager, box2d.PairCallback);
box2d.ContactManager.prototype.PairAdded = function(a, b) {
  var c = a, d = b, e = c.m_body, f = d.m_body;
  if(e.IsStatic() && f.IsStatic() || c.m_body == d.m_body || f.IsConnected(e) || !1 == this.m_world.collisionFilter.ShouldCollide(c, d)) {
    return this.m_nullContact
  }
  0 == f.m_invMass && (e = c, c = d, d = e);
  c = box2d.ContactFactory.Create(c, d);
  if(null == c) {
    return this.m_nullContact
  }
  c.m_prev = null;
  c.m_next = this.m_world.m_contactList;
  null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = c);
  this.m_world.m_contactList = c;
  this.m_world.m_contactCount++;
  return c
};
box2d.ContactManager.prototype.PairRemoved = function(a, b, c) {
  null != c && c != this.m_nullContact && (!0 == this.m_destroyImmediate ? this.DestroyContact(c) : c.m_flags |= box2d.Contact.e_destroyFlag)
};
box2d.ContactManager.prototype.DestroyContact = function(a) {
  a.m_prev && (a.m_prev.m_next = a.m_next);
  a.m_next && (a.m_next.m_prev = a.m_prev);
  a == this.m_world.m_contactList && (this.m_world.m_contactList = a.m_next);
  if(0 < a.GetManifoldCount()) {
    var b = a.m_shape1.m_body, c = a.m_shape2.m_body, d = a.m_node1;
    a = a.m_node2;
    b.WakeUp();
    c.WakeUp();
    d.prev && (d.prev.next = d.next);
    d.next && (d.next.prev = d.prev);
    d == b.m_contactList && (b.m_contactList = d.next);
    d.prev = null;
    d.next = null;
    a.prev && (a.prev.next = a.next);
    a.next && (a.next.prev = a.prev);
    a == c.m_contactList && (c.m_contactList = a.next);
    a.prev = null;
    a.next = null
  }
  --this.m_world.m_contactCount
};
box2d.ContactManager.prototype.CleanContactList = function() {
  for(var a = this.m_world.m_contactList;null != a;) {
    var b = a, a = a.m_next;
    b.m_flags & box2d.Contact.e_destroyFlag && this.DestroyContact(b)
  }
};
box2d.ContactManager.prototype.Collide = function() {
  for(var a, b, c, d, e = this.m_world.m_contactList;null != e;e = e.m_next) {
    if(!e.m_shape1.m_body.IsSleeping() || !e.m_shape2.m_body.IsSleeping()) {
      a = e.GetManifoldCount(), e.Evaluate(), b = e.GetManifoldCount(), 0 == a && 0 < b ? (a = e.m_shape1.m_body, b = e.m_shape2.m_body, c = e.m_node1, d = e.m_node2, c.contact = e, c.other = b, c.prev = null, c.next = a.m_contactList, null != c.next && (c.next.prev = e.m_node1), a.m_contactList = e.m_node1, d.contact = e, d.other = a, d.prev = null, d.next = b.m_contactList, null != d.next && (d.next.prev = d), b.m_contactList = d) : 0 < a && 0 == b && (a = e.m_shape1.m_body, b = e.m_shape2.m_body, 
      c = e.m_node1, d = e.m_node2, c.prev && (c.prev.next = c.next), c.next && (c.next.prev = c.prev), c == a.m_contactList && (a.m_contactList = c.next), c.prev = null, c.next = null, d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), d == b.m_contactList && (b.m_contactList = d.next), d.prev = null, d.next = null)
    }
  }
};
box2d.ContactConstraintPoint = function() {
  this.localAnchor1 = new box2d.Vec2;
  this.localAnchor2 = new box2d.Vec2;
  this.velocityBias = this.separation = this.tangentMass = this.normalMass = this.positionImpulse = this.tangentImpulse = this.normalImpulse = null
};
box2d.ContactConstraint = function() {
  this.restitution = this.friction = this.body2 = this.body1 = this.manifold = null;
  this.pointCount = 0;
  this.normal = new box2d.Vec2;
  this.points = Array(box2d.Settings.b2_maxManifoldPoints);
  for(var a = 0;a < box2d.Settings.b2_maxManifoldPoints;a++) {
    this.points[a] = new box2d.ContactConstraintPoint
  }
};
box2d.ContactSolver = function(a, b) {
  this.m_constraints = [];
  for(var c = 0, d, e, c = this.m_constraintCount = 0;c < b;++c) {
    this.m_constraintCount += a[c].GetManifoldCount()
  }
  for(c = 0;c < this.m_constraintCount;c++) {
    this.m_constraints[c] = new box2d.ContactConstraint
  }
  for(var f = 0, c = 0;c < b;++c) {
    for(var g = a[c], h = g.m_shape1.m_body, j = g.m_shape2.m_body, k = g.GetManifoldCount(), l = g.GetManifolds(), m = g.m_friction, g = g.m_restitution, n = h.m_linearVelocity.x, q = h.m_linearVelocity.y, r = j.m_linearVelocity.x, s = j.m_linearVelocity.y, t = h.m_angularVelocity, u = j.m_angularVelocity, y = 0;y < k;++y) {
      var z = l[y], v = z.normal.x, B = z.normal.y, x = this.m_constraints[f];
      x.body1 = h;
      x.body2 = j;
      x.manifold = z;
      x.normal.x = v;
      x.normal.y = B;
      x.pointCount = z.pointCount;
      x.friction = m;
      x.restitution = g;
      for(var C = 0;C < x.pointCount;++C) {
        var w = z.points[C], A = x.points[C];
        A.normalImpulse = w.normalImpulse;
        A.tangentImpulse = w.tangentImpulse;
        A.separation = w.separation;
        var D = w.position.x - h.m_position.x, G = w.position.y - h.m_position.y, H = w.position.x - j.m_position.x, w = w.position.y - j.m_position.y;
        d = A.localAnchor1;
        e = h.m_R;
        d.x = D * e.col1.x + G * e.col1.y;
        d.y = D * e.col2.x + G * e.col2.y;
        d = A.localAnchor2;
        e = j.m_R;
        d.x = H * e.col1.x + w * e.col1.y;
        d.y = H * e.col2.x + w * e.col2.y;
        d = D * D + G * G;
        e = H * H + w * w;
        var I = D * v + G * B, F = H * v + w * B, E = h.m_invMass + j.m_invMass, E = E + (h.m_invI * (d - I * I) + j.m_invI * (e - F * F));
        A.normalMass = 1 / E;
        F = B;
        E = -v;
        I = D * F + G * E;
        F = H * F + w * E;
        E = h.m_invMass + j.m_invMass;
        E += h.m_invI * (d - I * I) + j.m_invI * (e - F * F);
        A.tangentMass = 1 / E;
        A.velocityBias = 0;
        0 < A.separation && (A.velocityBias = -60 * A.separation);
        D = x.normal.x * (r + -u * w - n - -t * G) + x.normal.y * (s + u * H - q - t * D);
        D < -box2d.Settings.b2_velocityThreshold && (A.velocityBias += -x.restitution * D)
      }
      ++f
    }
  }
};
box2d.ContactSolver.prototype = {PreSolve:function() {
  for(var a, b, c = 0;c < this.m_constraintCount;++c) {
    var d = this.m_constraints[c], e = d.body1, f = d.body2, g = e.m_invMass, h = e.m_invI, j = f.m_invMass, k = f.m_invI, l = d.normal.x, m = d.normal.y, n = m, q = -l, r = 0, s = 0;
    if(box2d.World.s_enableWarmStarting) {
      s = d.pointCount;
      for(r = 0;r < s;++r) {
        var t = d.points[r], u = t.normalImpulse * l + t.tangentImpulse * n, y = t.normalImpulse * m + t.tangentImpulse * q;
        b = e.m_R;
        a = t.localAnchor1;
        var z = b.col1.x * a.x + b.col2.x * a.y, v = b.col1.y * a.x + b.col2.y * a.y;
        b = f.m_R;
        a = t.localAnchor2;
        var B = b.col1.x * a.x + b.col2.x * a.y;
        a = b.col1.y * a.x + b.col2.y * a.y;
        e.m_angularVelocity -= h * (z * y - v * u);
        e.m_linearVelocity.x -= g * u;
        e.m_linearVelocity.y -= g * y;
        f.m_angularVelocity += k * (B * y - a * u);
        f.m_linearVelocity.x += j * u;
        f.m_linearVelocity.y += j * y;
        t.positionImpulse = 0
      }
    }else {
      s = d.pointCount;
      for(r = 0;r < s;++r) {
        e = d.points[r], e.normalImpulse = 0, e.tangentImpulse = 0, e.positionImpulse = 0
      }
    }
  }
}, SolveVelocityConstraints:function() {
  for(var a = 0, b, c, d, e, f, g, h, j, k = 0;k < this.m_constraintCount;++k) {
    for(var l = this.m_constraints[k], m = l.body1, n = l.body2, q = m.m_angularVelocity, r = m.m_linearVelocity, s = n.m_angularVelocity, t = n.m_linearVelocity, u = m.m_invMass, y = m.m_invI, z = n.m_invMass, v = n.m_invI, B = l.normal.x, x = l.normal.y, C = x, w = -B, A = l.pointCount, a = 0;a < A;++a) {
      b = l.points[a], f = m.m_R, g = b.localAnchor1, c = f.col1.x * g.x + f.col2.x * g.y, d = f.col1.y * g.x + f.col2.y * g.y, f = n.m_R, g = b.localAnchor2, e = f.col1.x * g.x + f.col2.x * g.y, f = f.col1.y * g.x + f.col2.y * g.y, g = t.x + -s * f - r.x - -q * d, h = t.y + s * e - r.y - q * c, g = -b.normalMass * (g * B + h * x - b.velocityBias), h = Math.max(b.normalImpulse + g, 0), g = h - b.normalImpulse, j = g * B, g *= x, r.x -= u * j, r.y -= u * g, q -= y * (c * g - d * j), t.x += z * j, 
      t.y += z * g, s += v * (e * g - f * j), b.normalImpulse = h, g = t.x + -s * f - r.x - -q * d, h = t.y + s * e - r.y - q * c, g = b.tangentMass * -(g * C + h * w), h = l.friction * b.normalImpulse, h = box2d.Math.b2Clamp(b.tangentImpulse + g, -h, h), g = h - b.tangentImpulse, j = g * C, g *= w, r.x -= u * j, r.y -= u * g, q -= y * (c * g - d * j), t.x += z * j, t.y += z * g, s += v * (e * g - f * j), b.tangentImpulse = h
    }
    m.m_angularVelocity = q;
    n.m_angularVelocity = s
  }
}, SolvePositionConstraints:function(a) {
  for(var b = 0, c, d, e = 0;e < this.m_constraintCount;++e) {
    for(var f = this.m_constraints[e], g = f.body1, h = f.body2, j = g.m_position, k = g.m_rotation, l = h.m_position, m = h.m_rotation, n = g.m_invMass, q = g.m_invI, r = h.m_invMass, s = h.m_invI, t = f.normal.x, u = f.normal.y, y = f.pointCount, z = 0;z < y;++z) {
      var v = f.points[z];
      c = g.m_R;
      d = v.localAnchor1;
      var B = c.col1.x * d.x + c.col2.x * d.y, x = c.col1.y * d.x + c.col2.y * d.y;
      c = h.m_R;
      d = v.localAnchor2;
      var C = c.col1.x * d.x + c.col2.x * d.y;
      c = c.col1.y * d.x + c.col2.y * d.y;
      d = (l.x + C - (j.x + B)) * t + (l.y + c - (j.y + x)) * u + v.separation;
      b = Math.min(b, d);
      d = a * box2d.Math.b2Clamp(d + box2d.Settings.b2_linearSlop, -box2d.Settings.b2_maxLinearCorrection, 0);
      d *= -v.normalMass;
      var w = v.positionImpulse;
      v.positionImpulse = Math.max(w + d, 0);
      d = v.positionImpulse - w;
      v = d * t;
      d *= u;
      j.x -= n * v;
      j.y -= n * d;
      k -= q * (B * d - x * v);
      g.m_R.Set(k);
      l.x += r * v;
      l.y += r * d;
      m += s * (C * d - c * v);
      h.m_R.Set(m)
    }
    g.m_rotation = k;
    h.m_rotation = m
  }
  return b >= -box2d.Settings.b2_linearSlop
}, PostSolve:function() {
  for(var a = 0;a < this.m_constraintCount;++a) {
    for(var b = this.m_constraints[a], c = b.manifold, d = 0;d < b.pointCount;++d) {
      var e = c.points[d], f = b.points[d];
      e.normalImpulse = f.normalImpulse;
      e.tangentImpulse = f.tangentImpulse
    }
  }
}};
box2d.Island = function(a, b, c) {
  var d = 0;
  this.m_bodyCapacity = a;
  this.m_contactCapacity = b;
  this.m_jointCapacity = c;
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
  this.m_bodies = Array(a);
  for(d = 0;d < a;d++) {
    this.m_bodies[d] = null
  }
  this.m_contacts = Array(b);
  for(d = 0;d < b;d++) {
    this.m_contacts[d] = null
  }
  this.m_joints = Array(c);
  for(d = 0;d < c;d++) {
    this.m_joints[d] = null
  }
};
box2d.Island.prototype.Clear = function() {
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
};
box2d.Island.prototype.Solve = function(a, b) {
  for(var c = 0, d, c = 0;c < this.m_bodyCount;++c) {
    d = this.m_bodies[c], 0 != d.m_invMass && (d.m_linearVelocity.add(box2d.Vec2.multiplyScalar(a.dt, box2d.Vec2.add(b, box2d.Vec2.multiplyScalar(d.m_invMass, d.m_force)))), d.m_angularVelocity += a.dt * d.m_invI * d.m_torque, d.m_linearVelocity.scale(d.m_linearDamping), d.m_angularVelocity *= d.m_angularDamping, d.m_position0.SetV(d.m_position), d.m_rotation0 = d.m_rotation)
  }
  var e = new box2d.ContactSolver(this.m_contacts, this.m_contactCount);
  e.PreSolve();
  for(c = 0;c < this.m_jointCount;++c) {
    this.m_joints[c].PrepareVelocitySolver()
  }
  for(c = 0;c < a.iterations;++c) {
    e.SolveVelocityConstraints();
    for(d = 0;d < this.m_jointCount;++d) {
      this.m_joints[d].SolveVelocityConstraints(a)
    }
  }
  for(c = 0;c < this.m_bodyCount;++c) {
    d = this.m_bodies[c], 0 != d.m_invMass && (d.m_position.x += a.dt * d.m_linearVelocity.x, d.m_position.y += a.dt * d.m_linearVelocity.y, d.m_rotation += a.dt * d.m_angularVelocity, d.m_R.Set(d.m_rotation))
  }
  for(c = 0;c < this.m_jointCount;++c) {
    this.m_joints[c].PreparePositionSolver()
  }
  if(box2d.World.s_enablePositionCorrection) {
    for(box2d.Island.m_positionIterationCount = 0;box2d.Island.m_positionIterationCount < a.iterations;++box2d.Island.m_positionIterationCount) {
      d = e.SolvePositionConstraints(box2d.Settings.b2_contactBaumgarte);
      for(var f = !0, c = 0;c < this.m_jointCount;++c) {
        var g = this.m_joints[c].SolvePositionConstraints(), f = f && g
      }
      if(d && f) {
        break
      }
    }
  }
  e.PostSolve();
  for(c = 0;c < this.m_bodyCount;++c) {
    d = this.m_bodies[c], 0 != d.m_invMass && (d.m_R.Set(d.m_rotation), d.SynchronizeShapes(), d.m_force.Set(0, 0), d.m_torque = 0)
  }
};
box2d.Island.prototype.UpdateSleep = function(a) {
  for(var b = 0, c, d = Number.MAX_VALUE, e = box2d.Settings.b2_linearSleepTolerance * box2d.Settings.b2_linearSleepTolerance, f = box2d.Settings.b2_angularSleepTolerance * box2d.Settings.b2_angularSleepTolerance, b = 0;b < this.m_bodyCount;++b) {
    c = this.m_bodies[b], 0 != c.m_invMass && (0 == (c.m_flags & box2d.Body.Flags.allowSleepFlag) && (d = c.m_sleepTime = 0), 0 == (c.m_flags & box2d.Body.Flags.allowSleepFlag) || c.m_angularVelocity * c.m_angularVelocity > f || goog.math.Vec2.dot(c.m_linearVelocity, c.m_linearVelocity) > e ? d = c.m_sleepTime = 0 : (c.m_sleepTime += a, d = Math.min(d, c.m_sleepTime)))
  }
  if(d >= box2d.Settings.b2_timeToSleep) {
    for(b = 0;b < this.m_bodyCount;++b) {
      c = this.m_bodies[b], c.m_flags |= box2d.Body.Flags.sleepFlag
    }
    return!0
  }
  return!1
};
box2d.Island.prototype.AddBody = function(a) {
  this.m_bodies[this.m_bodyCount++] = a
};
box2d.Island.prototype.AddContact = function(a) {
  this.m_contacts[this.m_contactCount++] = a
};
box2d.Island.prototype.AddJoint = function(a) {
  this.m_joints[this.m_jointCount++] = a
};
box2d.Island.m_positionIterationCount = 0;
box2d.TimeStep = function() {
  this.inv_dt = this.dt = null;
  this.iterations = 0
};
box2d.Pair = function() {
};
box2d.Pair.prototype = {SetBuffered:function() {
  this.status |= box2d.Pair.Flags.pairBuffered
}, ClearBuffered:function() {
  this.status &= ~box2d.Pair.Flags.pairBuffered
}, IsBuffered:function() {
  return(this.status & box2d.Pair.Flags.pairBuffered) == box2d.Pair.Flags.pairBuffered
}, SetRemoved:function() {
  this.status |= box2d.Pair.Flags.pairRemoved
}, ClearRemoved:function() {
  this.status &= ~box2d.Pair.Flags.pairRemoved
}, IsRemoved:function() {
  return(this.status & box2d.Pair.Flags.pairRemoved) == box2d.Pair.Flags.pairRemoved
}, SetFinal:function() {
  this.status |= box2d.Pair.Flags.pairFinal
}, IsFinal:function() {
  return(this.status & box2d.Pair.Flags.pairFinal) == box2d.Pair.Flags.pairFinal
}, proxyId1:0, proxyId2:0, next:0, status:0};
box2d.Pair.prototype.contactData = null;
box2d.Pair.b2_nullPair = box2d.Settings.USHRT_MAX;
box2d.Pair.b2_nullProxy = box2d.Settings.USHRT_MAX;
box2d.Pair.b2_tableCapacity = box2d.Settings.b2_maxPairs;
box2d.Pair.b2_tableMask = box2d.Pair.b2_tableCapacity - 1;
box2d.Pair.Flags = {pairBuffered:1, pairRemoved:2, pairFinal:4};
box2d.BufferedPair = function() {
  this.proxyId2 = this.proxyId1 = 0
};
box2d.PairManager = function() {
  var a = 0;
  this.m_hashTable = Array(box2d.Pair.b2_tableCapacity);
  for(a = 0;a < box2d.Pair.b2_tableCapacity;++a) {
    this.m_hashTable[a] = box2d.Pair.b2_nullPair
  }
  this.m_pairs = Array(box2d.Settings.b2_maxPairs);
  for(a = 0;a < box2d.Settings.b2_maxPairs;++a) {
    this.m_pairs[a] = new box2d.Pair
  }
  this.m_pairBuffer = Array(box2d.Settings.b2_maxPairs);
  for(a = 0;a < box2d.Settings.b2_maxPairs;++a) {
    this.m_pairBuffer[a] = new box2d.BufferedPair
  }
  for(a = 0;a < box2d.Settings.b2_maxPairs;++a) {
    this.m_pairs[a].proxyId1 = box2d.Pair.b2_nullProxy, this.m_pairs[a].proxyId2 = box2d.Pair.b2_nullProxy, this.m_pairs[a].userData = null, this.m_pairs[a].status = 0, this.m_pairs[a].next = a + 1
  }
  this.m_pairs[box2d.Settings.b2_maxPairs - 1].next = box2d.Pair.b2_nullPair;
  this.m_pairCount = 0
};
box2d.PairManager.prototype = {Initialize:function(a, b) {
  this.m_broadPhase = a;
  this.m_callback = b
}, AddBufferedPair:function(a, b) {
  var c = this.AddPair(a, b);
  !1 == c.IsBuffered() && (c.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2, ++this.m_pairBufferCount);
  c.ClearRemoved();
  box2d.BroadPhase.s_validate && this.ValidateBuffer()
}, RemoveBufferedPair:function(a, b) {
  var c = this._find(a, b);
  null != c && (!1 == c.IsBuffered() && (c.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2, ++this.m_pairBufferCount), c.SetRemoved(), box2d.BroadPhase.s_validate && this.ValidateBuffer())
}, AddPair:function(a, b) {
  if(a > b) {
    var c = a;
    a = b;
    b = c
  }
  var c = box2d.PairManager.Hash(a, b) & box2d.Pair.b2_tableMask, d = this._findHash(a, b, c);
  if(null != d) {
    return d
  }
  var e = this.m_freePair, d = this.m_pairs[e];
  this.m_freePair = d.next;
  d.proxyId1 = a;
  d.proxyId2 = b;
  d.status = 0;
  d.userData = null;
  d.next = this.m_hashTable[c];
  this.m_hashTable[c] = e;
  ++this.m_pairCount;
  return d
}, RemovePair:function(a, b) {
  if(a > b) {
    var c = a;
    a = b;
    b = c
  }
  for(var d = box2d.PairManager.Hash(a, b) & box2d.Pair.b2_tableMask, e = this.m_hashTable[d], f = null;e != box2d.Pair.b2_nullPair;) {
    if(box2d.PairManager.Equals(this.m_pairs[e], a, b)) {
      return c = e, f ? f.next = this.m_pairs[e].next : this.m_hashTable[d] = this.m_pairs[e].next, d = this.m_pairs[c], e = d.userData, d.next = this.m_freePair, d.proxyId1 = box2d.Pair.b2_nullProxy, d.proxyId2 = box2d.Pair.b2_nullProxy, d.userData = null, d.status = 0, this.m_freePair = c, --this.m_pairCount, e
    }
    f = this.m_pairs[e];
    e = f.next
  }
  return null
}, ValidateBuffer:function() {
}, ValidateTable:function() {
}, m_broadPhase:null, m_callback:null, m_freePair:0, m_pairCount:0, m_pairBuffer:null, m_pairBufferCount:0, m_hashTable:null};
box2d.PairManager.prototype._find = function(a, b) {
  if(a > b) {
    var c = a;
    a = b;
    b = c
  }
  c = box2d.PairManager.Hash(a, b) & box2d.Pair.b2_tableMask;
  return this._findHash(a, b, c)
};
box2d.PairManager.prototype._findHash = function(a, b, c) {
  for(c = this.m_hashTable[c];c != box2d.Pair.b2_nullPair && !1 == box2d.PairManager.Equals(this.m_pairs[c], a, b);) {
    c = this.m_pairs[c].next
  }
  return c == box2d.Pair.b2_nullPair ? null : this.m_pairs[c]
};
box2d.PairManager.prototype.Commit = function() {
  for(var a = 0, b = 0, c = this.m_broadPhase.proxyPool, d = [], a = 0;a < this.m_pairBufferCount;++a) {
    var e = this._find(this.m_pairBuffer[a].proxyId1, this.m_pairBuffer[a].proxyId2);
    e.ClearBuffered();
    var f = c[e.proxyId1], g = c[e.proxyId2];
    e.IsRemoved() ? (!0 == e.IsFinal() && this.m_callback.PairRemoved(f.userData, g.userData, e.userData), this.m_pairBuffer[b].proxyId1 = e.proxyId1, this.m_pairBuffer[b].proxyId2 = e.proxyId2, ++b) : !1 == e.IsFinal() && (e.contactData = this.m_callback.PairAdded(f.userData, g.userData), d.push(e.contactData), e.SetFinal())
  }
  for(a = 0;a < b;++a) {
    this.RemovePair(this.m_pairBuffer[a].proxyId1, this.m_pairBuffer[a].proxyId2)
  }
  this.m_pairBufferCount = 0;
  box2d.BroadPhase.s_validate && this.ValidateTable();
  return d
};
box2d.PairManager.Hash = function(a, b) {
  var c = b << 16 & 4294901760 | a, c = ~c + (c << 15 & 4294934528), c = c ^ c >> 12 & 1048575, c = c + (c << 2 & 4294967292), c = 2057 * (c ^ c >> 4 & 268435455);
  return c ^= c >> 16 & 65535
};
box2d.PairManager.Equals = function(a, b, c) {
  return a.proxyId1 == b && a.proxyId2 == c
};
box2d.PairManager.EqualsPair = function(a, b) {
  return a.proxyId1 == b.proxyId1 && a.proxyId2 == b.proxyId2
};
box2d.Bound = function() {
  this.stabbingCount = this.proxyId = this.value = 0
};
box2d.Bound.prototype.IsLower = function() {
  return 0 == (this.value & 1)
};
box2d.Bound.prototype.IsUpper = function() {
  return 1 == (this.value & 1)
};
box2d.Bound.prototype.Swap = function(a) {
  var b = this.value, c = this.proxyId, d = this.stabbingCount;
  this.value = a.value;
  this.proxyId = a.proxyId;
  this.stabbingCount = a.stabbingCount;
  a.value = b;
  a.proxyId = c;
  a.stabbingCount = d
};
box2d.Proxy = function() {
  this.lowerBounds = [0, 0];
  this.upperBounds = [0, 0];
  this.timeStamp = this.overlapCount = 0;
  this.userData = null
};
box2d.Proxy.prototype = {GetNext:function() {
  return this.lowerBounds[0]
}, SetNext:function(a) {
  this.lowerBounds[0] = a
}, IsValid:function() {
  return this.overlapCount != box2d.Settings.invalid
}};
box2d.BoundValues = function() {
  this.lowerValues = [0, 0];
  this.upperValues = [0, 0]
};
box2d.BroadPhase = function(a, b) {
  this.m_pairManager = new box2d.PairManager;
  this.proxyPool = Array(box2d.Settings.b2_maxPairs);
  this.m_bounds = Array(2 * box2d.Settings.b2_maxProxies);
  this.m_queryResults = Array(box2d.Settings.b2_maxProxies);
  this.m_quantizationFactor = new box2d.Vec2;
  var c = 0;
  this.m_pairManager.Initialize(this, b);
  this.m_worldAABB = a;
  for(c = this.m_proxyCount = 0;c < box2d.Settings.b2_maxProxies;c++) {
    this.m_queryResults[c] = 0
  }
  this.m_bounds = Array(2);
  for(c = 0;2 > c;c++) {
    this.m_bounds[c] = Array(2 * box2d.Settings.b2_maxProxies);
    for(var d = 0;d < 2 * box2d.Settings.b2_maxProxies;d++) {
      this.m_bounds[c][d] = new box2d.Bound
    }
  }
  c = a.maxVertex.x;
  d = a.maxVertex.y;
  c -= a.minVertex.x;
  d -= a.minVertex.y;
  this.m_quantizationFactor.x = box2d.Settings.USHRT_MAX / c;
  this.m_quantizationFactor.y = box2d.Settings.USHRT_MAX / d;
  for(c = 0;c < box2d.Settings.b2_maxProxies - 1;++c) {
    d = new box2d.Proxy, this.proxyPool[c] = d, d.SetNext(c + 1), d.timeStamp = 0, d.overlapCount = box2d.Settings.invalid, d.userData = null
  }
  d = new box2d.Proxy;
  this.proxyPool[box2d.Settings.b2_maxProxies - 1] = d;
  d.SetNext(box2d.Pair.b2_nullProxy);
  d.timeStamp = 0;
  d.overlapCount = box2d.Settings.invalid;
  d.userData = null;
  this.m_freeProxy = 0;
  this.m_timeStamp = 1;
  this.m_queryResultCount = 0
};
box2d.BroadPhase.prototype.InRange = function(a) {
  var b, c, d, e;
  b = a.minVertex.x;
  c = a.minVertex.y;
  b -= this.m_worldAABB.maxVertex.x;
  c -= this.m_worldAABB.maxVertex.y;
  d = this.m_worldAABB.minVertex.x;
  e = this.m_worldAABB.minVertex.y;
  d -= a.maxVertex.x;
  e -= a.maxVertex.y;
  b = Math.max(b, d);
  c = Math.max(c, e);
  return 0 > Math.max(b, c)
};
box2d.BroadPhase.prototype.GetProxy = function(a) {
  return a == box2d.Pair.b2_nullProxy || !1 == this.proxyPool[a].IsValid() ? null : this.proxyPool[a]
};
box2d.BroadPhase.prototype.DestroyProxy = function(a) {
  for(var b = this.proxyPool[a], c = 2 * this.m_proxyCount, d = 0;2 > d;++d) {
    for(var e = this.m_bounds[d], f = b.lowerBounds[d], g = b.upperBounds[d], h = e[f].value, j = e[g].value, k = [], l = 0, m = g - f - 1, n, q, l = 0;l < m;l++) {
      k[l] = new box2d.Bound, n = k[l], q = e[f + 1 + l], n.value = q.value, n.proxyId = q.proxyId, n.stabbingCount = q.stabbingCount
    }
    for(var m = k.length, r = f, l = 0;l < m;l++) {
      q = k[l], n = e[r + l], n.value = q.value, n.proxyId = q.proxyId, n.stabbingCount = q.stabbingCount
    }
    k = [];
    m = c - g - 1;
    for(l = 0;l < m;l++) {
      k[l] = new box2d.Bound, n = k[l], q = e[g + 1 + l], n.value = q.value, n.proxyId = q.proxyId, n.stabbingCount = q.stabbingCount
    }
    m = k.length;
    r = g - 1;
    for(l = 0;l < m;l++) {
      q = k[l], n = e[r + l], n.value = q.value, n.proxyId = q.proxyId, n.stabbingCount = q.stabbingCount
    }
    m = c - 2;
    for(k = f;k < m;++k) {
      l = this.proxyPool[e[k].proxyId], e[k].IsLower() ? l.lowerBounds[d] = k : l.upperBounds[d] = k
    }
    for(m = g - 1;f < m;++f) {
      e[f].stabbingCount--
    }
    this.Query([0], [0], h, j, e, c - 2, d)
  }
  for(c = 0;c < this.m_queryResultCount;++c) {
    this.m_pairManager.RemoveBufferedPair(a, this.m_queryResults[c])
  }
  this.m_pairManager.Commit();
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  b.userData = null;
  b.overlapCount = box2d.Settings.invalid;
  b.lowerBounds[0] = box2d.Settings.invalid;
  b.lowerBounds[1] = box2d.Settings.invalid;
  b.upperBounds[0] = box2d.Settings.invalid;
  b.upperBounds[1] = box2d.Settings.invalid;
  b.SetNext(this.m_freeProxy);
  this.m_freeProxy = a;
  --this.m_proxyCount
};
box2d.BroadPhase.prototype.QueryAABB = function(a, b, c) {
  var d = [], e = [];
  this.ComputeBounds(d, e, a);
  a = [0];
  var f = [0];
  this.Query(a, f, d[0], e[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  this.Query(a, f, d[1], e[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  for(e = d = 0;e < this.m_queryResultCount && d < c;++e, ++d) {
    b[e] = this.proxyPool[this.m_queryResults[e]].userData
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return d
};
box2d.BroadPhase.prototype.Validate = function() {
  for(var a = 0;2 > a;++a) {
    for(var b = this.m_bounds[a], c = 2 * this.m_proxyCount, d = 0, e = 0;e < c;++e) {
      !0 == b[e].IsLower() ? d++ : d--
    }
  }
};
box2d.BroadPhase.prototype.ComputeBounds = function(a, b, c) {
  var d = c.minVertex.x, e = c.minVertex.y, d = Math.min(d, this.m_worldAABB.maxVertex.x), e = Math.min(e, this.m_worldAABB.maxVertex.y), d = Math.max(d, this.m_worldAABB.minVertex.x), e = Math.max(e, this.m_worldAABB.minVertex.y), f = c.maxVertex.x;
  c = c.maxVertex.y;
  f = Math.min(f, this.m_worldAABB.maxVertex.x);
  c = Math.min(c, this.m_worldAABB.maxVertex.y);
  f = Math.max(f, this.m_worldAABB.minVertex.x);
  c = Math.max(c, this.m_worldAABB.minVertex.y);
  a[0] = this.m_quantizationFactor.x * (d - this.m_worldAABB.minVertex.x) & box2d.Settings.USHRT_MAX - 1;
  b[0] = this.m_quantizationFactor.x * (f - this.m_worldAABB.minVertex.x) & 65535 | 1;
  a[1] = this.m_quantizationFactor.y * (e - this.m_worldAABB.minVertex.y) & box2d.Settings.USHRT_MAX - 1;
  b[1] = this.m_quantizationFactor.y * (c - this.m_worldAABB.minVertex.y) & 65535 | 1
};
box2d.BroadPhase.prototype.TestOverlapValidate = function(a, b) {
  for(var c = 0;2 > c;++c) {
    var d = this.m_bounds[c];
    if(d[a.lowerBounds[c]].value > d[b.upperBounds[c]].value || d[a.upperBounds[c]].value < d[b.lowerBounds[c]].value) {
      return!1
    }
  }
  return!0
};
box2d.BroadPhase.prototype.TestOverlap = function(a, b) {
  for(var c = 0;2 > c;++c) {
    var d = this.m_bounds[c];
    if(a.lowerValues[c] > d[b.upperBounds[c]].value || a.upperValues[c] < d[b.lowerBounds[c]].value) {
      return!1
    }
  }
  return!0
};
box2d.BroadPhase.prototype.Query = function(a, b, c, d, e, f, g) {
  c = box2d.BroadPhase.BinarySearch(e, f, c);
  d = box2d.BroadPhase.BinarySearch(e, f, d);
  for(f = c;f < d;++f) {
    e[f].IsLower() && this.IncrementOverlapCount(e[f].proxyId)
  }
  if(0 < c) {
    f = c - 1;
    for(var h = e[f].stabbingCount;h;) {
      e[f].IsLower() && c <= this.proxyPool[e[f].proxyId].upperBounds[g] && (this.IncrementOverlapCount(e[f].proxyId), --h), --f
    }
  }
  a[0] = c;
  b[0] = d
};
box2d.BroadPhase.prototype.IncrementOverlapCount = function(a) {
  var b = this.proxyPool[a];
  b.timeStamp < this.m_timeStamp ? (b.timeStamp = this.m_timeStamp, b.overlapCount = 1) : (b.overlapCount = 2, this.m_queryResults[this.m_queryResultCount] = a, ++this.m_queryResultCount)
};
box2d.BroadPhase.prototype.IncrementTimeStamp = function() {
  if(this.m_timeStamp == box2d.Settings.USHRT_MAX) {
    for(var a = 0;a < box2d.Settings.b2_maxProxies;++a) {
      this.proxyPool[a].timeStamp = 0
    }
    this.m_timeStamp = 1
  }else {
    ++this.m_timeStamp
  }
};
box2d.BroadPhase.prototype.MoveProxy = function(a, b) {
  var c = 0, d = 0, e, f, g = 0, h;
  if(!(a == box2d.Pair.b2_nullProxy || box2d.Settings.b2_maxProxies <= a) && !1 != b.IsValid()) {
    var j = 2 * this.m_proxyCount, k = this.proxyPool[a], l = new box2d.BoundValues;
    this.ComputeBounds(l.lowerValues, l.upperValues, b);
    for(var m = new box2d.BoundValues, c = 0;2 > c;++c) {
      m.lowerValues[c] = this.m_bounds[c][k.lowerBounds[c]].value, m.upperValues[c] = this.m_bounds[c][k.upperBounds[c]].value
    }
    for(c = 0;2 > c;++c) {
      var n = this.m_bounds[c], q = k.lowerBounds[c], r = k.upperBounds[c], s = l.lowerValues[c], t = l.upperValues[c], u = s - n[q].value, y = t - n[r].value;
      n[q].value = s;
      n[r].value = t;
      if(0 > u) {
        for(d = q;0 < d && s < n[d - 1].value;) {
          e = n[d], f = n[d - 1], g = f.proxyId, h = this.proxyPool[f.proxyId], f.stabbingCount++, !0 == f.IsUpper() ? (this.TestOverlap(l, h) && this.m_pairManager.AddBufferedPair(a, g), h.upperBounds[c]++, e.stabbingCount++) : (h.lowerBounds[c]++, e.stabbingCount--), k.lowerBounds[c]--, e.Swap(f), --d
        }
      }
      if(0 < y) {
        for(d = r;d < j - 1 && n[d + 1].value <= t;) {
          e = n[d], f = n[d + 1], g = f.proxyId, h = this.proxyPool[g], f.stabbingCount++, !0 == f.IsLower() ? (this.TestOverlap(l, h) && this.m_pairManager.AddBufferedPair(a, g), h.lowerBounds[c]--, e.stabbingCount++) : (h.upperBounds[c]--, e.stabbingCount--), k.upperBounds[c]++, e.Swap(f), d++
        }
      }
      if(0 < u) {
        for(d = q;d < j - 1 && n[d + 1].value <= s;) {
          e = n[d], f = n[d + 1], g = f.proxyId, h = this.proxyPool[g], f.stabbingCount--, f.IsUpper() ? (this.TestOverlap(m, h) && this.m_pairManager.RemoveBufferedPair(a, g), h.upperBounds[c]--, e.stabbingCount--) : (h.lowerBounds[c]--, e.stabbingCount++), k.lowerBounds[c]++, e.Swap(f), d++
        }
      }
      if(0 > y) {
        for(d = r;0 < d && t < n[d - 1].value;) {
          e = n[d], f = n[d - 1], g = f.proxyId, h = this.proxyPool[g], f.stabbingCount--, !0 == f.IsLower() ? (this.TestOverlap(m, h) && this.m_pairManager.RemoveBufferedPair(a, g), h.lowerBounds[c]++, e.stabbingCount--) : (h.upperBounds[c]++, e.stabbingCount++), k.upperBounds[c]--, e.Swap(f), d--
        }
      }
    }
  }
};
box2d.BroadPhase.prototype.Commit = function() {
  return this.m_pairManager.Commit()
};
box2d.BroadPhase.prototype.CreateProxy = function(a, b) {
  var c = 0, d, e = this.m_freeProxy;
  d = this.proxyPool[e];
  this.m_freeProxy = d.GetNext();
  d.overlapCount = 0;
  d.userData = b;
  d = 2 * this.m_proxyCount;
  var f = [], g = [];
  this.ComputeBounds(f, g, a);
  for(var h = 0;2 > h;++h) {
    var j = this.m_bounds[h], k = 0, l = 0, k = [k], l = [l];
    this.Query(k, l, f[h], g[h], j, d, h);
    for(var k = k[0], l = l[0], c = [], m = 0, n = d - l, q, r, m = 0;m < n;m++) {
      c[m] = new box2d.Bound, q = c[m], r = j[l + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    for(var n = c.length, s = l + 2, m = 0;m < n;m++) {
      r = c[m], q = j[s + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    c = [];
    n = l - k;
    for(m = 0;m < n;m++) {
      c[m] = new box2d.Bound, q = c[m], r = j[k + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    n = c.length;
    s = k + 1;
    for(m = 0;m < n;m++) {
      r = c[m], q = j[s + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    ++l;
    j[k].value = f[h];
    j[k].proxyId = e;
    j[l].value = g[h];
    j[l].proxyId = e;
    j[k].stabbingCount = 0 == k ? 0 : j[k - 1].stabbingCount;
    j[l].stabbingCount = j[l - 1].stabbingCount;
    for(c = k;c < l;++c) {
      j[c].stabbingCount++
    }
    for(c = k;c < d + 2;++c) {
      k = this.proxyPool[j[c].proxyId], j[c].IsLower() ? k.lowerBounds[h] = c : k.upperBounds[h] = c
    }
  }
  ++this.m_proxyCount;
  for(d = 0;d < this.m_queryResultCount;++d) {
    this.m_pairManager.AddBufferedPair(e, this.m_queryResults[d])
  }
  this.m_pairManager.Commit();
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return e
};
box2d.BroadPhase.m_freeProxy = 0;
box2d.BroadPhase.s_validate = !1;
box2d.BroadPhase.b2_nullEdge = box2d.Settings.USHRT_MAX;
box2d.BroadPhase.BinarySearch = function(a, b, c) {
  var d = 0;
  for(b -= 1;d <= b;) {
    var e = Math.floor((d + b) / 2);
    if(a[e].value > c) {
      b = e - 1
    }else {
      if(a[e].value < c) {
        d = e + 1
      }else {
        return e
      }
    }
  }
  return d
};
box2d.Jacobian = function() {
  this.linear1 = new box2d.Vec2;
  this.linear2 = new box2d.Vec2
};
box2d.Jacobian.prototype = {angular1:null, angular2:null, SetZero:function() {
  this.linear1.SetZero();
  this.angular1 = 0;
  this.linear2.SetZero();
  this.angular2 = 0
}, Set:function(a, b, c, d) {
  this.linear1.SetV(a);
  this.angular1 = b;
  this.linear2.SetV(c);
  this.angular2 = d
}, Compute:function(a, b, c, d) {
  return this.linear1.x * a.x + this.linear1.y * a.y + this.angular1 * b + (this.linear2.x * c.x + this.linear2.y * c.y) + this.angular2 * d
}};
box2d.PrismaticJointDef = function() {
  box2d.JointDef.call(this, !1);
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.type = box2d.Joint.e_prismaticJoint;
  this.anchorPoint = new box2d.Vec2(0, 0);
  this.axis = new box2d.Vec2(0, 0);
  this.motorSpeed = this.motorForce = this.upperTranslation = this.lowerTranslation = 0;
  this.enableMotor = this.enableLimit = !1
};
goog.inherits(box2d.PrismaticJointDef, box2d.JointDef);
box2d.PrismaticJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_localXAxis1 = new box2d.Vec2;
  this.m_localYAxis1 = new box2d.Vec2;
  this.m_linearJacobian = new box2d.Jacobian;
  this.m_motorJacobian = new box2d.Jacobian;
  var b, c, d;
  b = this.m_body1.m_R;
  c = a.anchorPoint.x - this.m_body1.m_position.x;
  d = a.anchorPoint.y - this.m_body1.m_position.y;
  this.m_localAnchor1.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
  b = this.m_body2.m_R;
  c = a.anchorPoint.x - this.m_body2.m_position.x;
  d = a.anchorPoint.y - this.m_body2.m_position.y;
  this.m_localAnchor2.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
  b = this.m_body1.m_R;
  c = a.axis.x;
  d = a.axis.y;
  this.m_localXAxis1.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_initialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
  this.m_linearJacobian.SetZero();
  this.m_angularImpulse = this.m_angularMass = this.m_linearImpulse = this.m_linearMass = 0;
  this.m_motorJacobian.SetZero();
  this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse = this.m_motorMass = 0;
  this.m_lowerTranslation = a.lowerTranslation;
  this.m_upperTranslation = a.upperTranslation;
  this.m_maxMotorForce = a.motorForce;
  this.m_motorSpeed = a.motorSpeed;
  this.m_enableLimit = a.enableLimit;
  this.m_enableMotor = a.enableMotor
};
goog.inherits(box2d.PrismaticJoint, box2d.Joint);
box2d.PrismaticJoint.prototype.GetAnchor1 = function() {
  var a = this.m_body1, b = new box2d.Vec2;
  b.SetV(this.m_localAnchor1);
  b.MulM(a.m_R);
  b.add(a.m_position);
  return b
};
box2d.PrismaticJoint.prototype.GetAnchor2 = function() {
  var a = this.m_body2, b = new box2d.Vec2;
  b.SetV(this.m_localAnchor2);
  b.MulM(a.m_R);
  b.add(a.m_position);
  return b
};
box2d.PrismaticJoint.prototype.GetJointTranslation = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  d = b.m_position.x + (c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y) - (a.m_position.x + d);
  b = b.m_position.y + (c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y) - (a.m_position.y + e);
  c = a.m_R;
  return(c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y) * d + (c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y) * b
};
box2d.PrismaticJoint.prototype.GetJointSpeed = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y, g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y, h = b.m_position.x + f - (a.m_position.x + d), j = b.m_position.y + g - (a.m_position.y + e);
  c = a.m_R;
  var k = c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y;
  c = c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y;
  var l = a.m_linearVelocity, m = b.m_linearVelocity, a = a.m_angularVelocity, b = b.m_angularVelocity;
  return h * -a * c + j * a * k + (k * (m.x + -b * g - l.x - -a * e) + c * (m.y + b * f - l.y - a * d))
};
box2d.PrismaticJoint.prototype.GetMotorForce = function(a) {
  return a * this.m_motorImpulse
};
box2d.PrismaticJoint.prototype.SetMotorSpeed = function(a) {
  this.m_motorSpeed = a
};
box2d.PrismaticJoint.prototype.SetMotorForce = function(a) {
  this.m_maxMotorForce = a
};
box2d.PrismaticJoint.prototype.GetReactionForce = function(a) {
  a *= this.m_limitImpulse;
  var b;
  b = this.m_body1.m_R;
  return new box2d.Vec2(a * (b.col1.x * this.m_localXAxis1.x + b.col2.x * this.m_localXAxis1.y) + a * (b.col1.x * this.m_localYAxis1.x + b.col2.x * this.m_localYAxis1.y), a * (b.col1.y * this.m_localXAxis1.x + b.col2.y * this.m_localXAxis1.y) + a * (b.col1.y * this.m_localYAxis1.x + b.col2.y * this.m_localYAxis1.y))
};
box2d.PrismaticJoint.prototype.GetReactionTorque = function(a) {
  return a * this.m_angularImpulse
};
box2d.PrismaticJoint.prototype.PrepareVelocitySolver = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y, g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y, h = a.m_invMass, j = b.m_invMass, k = a.m_invI, l = b.m_invI;
  c = a.m_R;
  var m = c.col1.x * this.m_localYAxis1.x + c.col2.x * this.m_localYAxis1.y;
  c = c.col1.y * this.m_localYAxis1.x + c.col2.y * this.m_localYAxis1.y;
  var n = b.m_position.x + f - a.m_position.x, q = b.m_position.y + g - a.m_position.y;
  this.m_linearJacobian.linear1.x = -m;
  this.m_linearJacobian.linear1.y = -c;
  this.m_linearJacobian.linear2.x = m;
  this.m_linearJacobian.linear2.y = c;
  this.m_linearJacobian.angular1 = -(n * c - q * m);
  this.m_linearJacobian.angular2 = f * c - g * m;
  this.m_linearMass = h + k * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 + j + l * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
  this.m_linearMass = 1 / this.m_linearMass;
  this.m_angularMass = 1 / (k + l);
  if(this.m_enableLimit || this.m_enableMotor) {
    c = a.m_R, m = c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y, c = c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y, this.m_motorJacobian.linear1.x = -m, this.m_motorJacobian.linear1.y = -c, this.m_motorJacobian.linear2.x = m, this.m_motorJacobian.linear2.y = c, this.m_motorJacobian.angular1 = -(n * c - q * m), this.m_motorJacobian.angular2 = f * c - g * m, this.m_motorMass = h + k * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + j + l * this.m_motorJacobian.angular2 * 
    this.m_motorJacobian.angular2, this.m_motorMass = 1 / this.m_motorMass, this.m_enableLimit && (d = m * (n - d) + c * (q - e), Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * box2d.Settings.b2_linearSlop ? this.m_limitState = box2d.Joint.e_equalLimits : d <= this.m_lowerTranslation ? (this.m_limitState != box2d.Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atLowerLimit) : d >= this.m_upperTranslation ? (this.m_limitState != box2d.Joint.e_atUpperLimit && 
    (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atUpperLimit) : (this.m_limitState = box2d.Joint.e_inactiveLimit, this.m_limitImpulse = 0))
  }
  !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
  !1 == this.m_enableLimit && (this.m_limitImpulse = 0);
  box2d.World.s_enableWarmStarting ? (d = this.m_linearImpulse * this.m_linearJacobian.linear1.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.y, e = this.m_linearImpulse * this.m_linearJacobian.linear2.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.x, f = this.m_linearImpulse * this.m_linearJacobian.linear2.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.y, g = this.m_linearImpulse * this.m_linearJacobian.angular1 - 
  this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular1, n = this.m_linearImpulse * this.m_linearJacobian.angular2 + this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular2, a.m_linearVelocity.x += h * (this.m_linearImpulse * this.m_linearJacobian.linear1.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.x), a.m_linearVelocity.y += h * d, a.m_angularVelocity += k * g, b.m_linearVelocity.x += 
  j * e, b.m_linearVelocity.y += j * f, b.m_angularVelocity += l * n) : this.m_motorImpulse = this.m_limitImpulse = this.m_angularImpulse = this.m_linearImpulse = 0;
  this.m_limitPositionImpulse = 0
};
box2d.PrismaticJoint.prototype.SolveVelocityConstraints = function(a) {
  var b = this.m_body1, c = this.m_body2, d = b.m_invMass, e = c.m_invMass, f = b.m_invI, g = c.m_invI, h = this.m_linearJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity), h = -this.m_linearMass * h;
  this.m_linearImpulse += h;
  b.m_linearVelocity.x += d * h * this.m_linearJacobian.linear1.x;
  b.m_linearVelocity.y += d * h * this.m_linearJacobian.linear1.y;
  b.m_angularVelocity += f * h * this.m_linearJacobian.angular1;
  c.m_linearVelocity.x += e * h * this.m_linearJacobian.linear2.x;
  c.m_linearVelocity.y += e * h * this.m_linearJacobian.linear2.y;
  c.m_angularVelocity += g * h * this.m_linearJacobian.angular2;
  h = -this.m_angularMass * (c.m_angularVelocity - b.m_angularVelocity);
  this.m_angularImpulse += h;
  b.m_angularVelocity -= f * h;
  c.m_angularVelocity += g * h;
  if(this.m_enableMotor && this.m_limitState != box2d.Joint.e_equalLimits) {
    var h = this.m_motorJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity) - this.m_motorSpeed, h = -this.m_motorMass * h, j = this.m_motorImpulse;
    this.m_motorImpulse = box2d.Math.b2Clamp(this.m_motorImpulse + h, -a.dt * this.m_maxMotorForce, a.dt * this.m_maxMotorForce);
    h = this.m_motorImpulse - j;
    b.m_linearVelocity.x += d * h * this.m_motorJacobian.linear1.x;
    b.m_linearVelocity.y += d * h * this.m_motorJacobian.linear1.y;
    b.m_angularVelocity += f * h * this.m_motorJacobian.angular1;
    c.m_linearVelocity.x += e * h * this.m_motorJacobian.linear2.x;
    c.m_linearVelocity.y += e * h * this.m_motorJacobian.linear2.y;
    c.m_angularVelocity += g * h * this.m_motorJacobian.angular2
  }
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (a = this.m_motorJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity), h = -this.m_motorMass * a, this.m_limitState == box2d.Joint.e_equalLimits ? this.m_limitImpulse += h : this.m_limitState == box2d.Joint.e_atLowerLimit ? (a = this.m_limitImpulse, this.m_limitImpulse = Math.max(this.m_limitImpulse + h, 0), h = this.m_limitImpulse - a) : this.m_limitState == box2d.Joint.e_atUpperLimit && 
  (a = this.m_limitImpulse, this.m_limitImpulse = Math.min(this.m_limitImpulse + h, 0), h = this.m_limitImpulse - a), b.m_linearVelocity.x += d * h * this.m_motorJacobian.linear1.x, b.m_linearVelocity.y += d * h * this.m_motorJacobian.linear1.y, b.m_angularVelocity += f * h * this.m_motorJacobian.angular1, c.m_linearVelocity.x += e * h * this.m_motorJacobian.linear2.x, c.m_linearVelocity.y += e * h * this.m_motorJacobian.linear2.y, c.m_angularVelocity += g * h * this.m_motorJacobian.angular2)
};
box2d.PrismaticJoint.prototype.SolvePositionConstraints = function() {
  var a, b, c = this.m_body1, d = this.m_body2, e = c.m_invMass, f = d.m_invMass, g = c.m_invI, h = d.m_invI;
  a = c.m_R;
  var j = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, k = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
  a = d.m_R;
  var l = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
  a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
  var j = c.m_position.x + j, k = c.m_position.y + k, l = d.m_position.x + l, m = d.m_position.y + a;
  a = c.m_R;
  var n = (a.col1.x * this.m_localYAxis1.x + a.col2.x * this.m_localYAxis1.y) * (l - j) + (a.col1.y * this.m_localYAxis1.x + a.col2.y * this.m_localYAxis1.y) * (m - k), n = box2d.Math.b2Clamp(n, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection);
  b = -this.m_linearMass * n;
  c.m_position.x += e * b * this.m_linearJacobian.linear1.x;
  c.m_position.y += e * b * this.m_linearJacobian.linear1.y;
  c.m_rotation += g * b * this.m_linearJacobian.angular1;
  d.m_position.x += f * b * this.m_linearJacobian.linear2.x;
  d.m_position.y += f * b * this.m_linearJacobian.linear2.y;
  d.m_rotation += h * b * this.m_linearJacobian.angular2;
  n = Math.abs(n);
  b = d.m_rotation - c.m_rotation - this.m_initialAngle;
  b = box2d.Math.b2Clamp(b, -box2d.Settings.b2_maxAngularCorrection, box2d.Settings.b2_maxAngularCorrection);
  var q = -this.m_angularMass * b;
  c.m_rotation -= c.m_invI * q;
  c.m_R.Set(c.m_rotation);
  d.m_rotation += d.m_invI * q;
  d.m_R.Set(d.m_rotation);
  q = Math.abs(b);
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (a = c.m_R, j = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, k = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y, a = d.m_R, l = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y, a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y, j = c.m_position.x + j, k = c.m_position.y + k, l = d.m_position.x + l, m = d.m_position.y + a, a = c.m_R, j = 
  (a.col1.x * this.m_localXAxis1.x + a.col2.x * this.m_localXAxis1.y) * (l - j) + (a.col1.y * this.m_localXAxis1.x + a.col2.y * this.m_localXAxis1.y) * (m - k), a = 0, this.m_limitState == box2d.Joint.e_equalLimits ? (a = box2d.Math.b2Clamp(j, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection), a *= -this.m_motorMass, n = Math.max(n, Math.abs(b))) : this.m_limitState == box2d.Joint.e_atLowerLimit ? (a = j - this.m_lowerTranslation, n = Math.max(n, -a), a = box2d.Math.b2Clamp(a + 
  box2d.Settings.b2_linearSlop, -box2d.Settings.b2_maxLinearCorrection, 0), a *= -this.m_motorMass, b = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.max(this.m_limitPositionImpulse + a, 0), a = this.m_limitPositionImpulse - b) : this.m_limitState == box2d.Joint.e_atUpperLimit && (a = j - this.m_upperTranslation, n = Math.max(n, a), a = box2d.Math.b2Clamp(a - box2d.Settings.b2_linearSlop, 0, box2d.Settings.b2_maxLinearCorrection), a *= -this.m_motorMass, b = this.m_limitPositionImpulse, 
  this.m_limitPositionImpulse = Math.min(this.m_limitPositionImpulse + a, 0), a = this.m_limitPositionImpulse - b), c.m_position.x += e * a * this.m_motorJacobian.linear1.x, c.m_position.y += e * a * this.m_motorJacobian.linear1.y, c.m_rotation += g * a * this.m_motorJacobian.angular1, c.m_R.Set(c.m_rotation), d.m_position.x += f * a * this.m_motorJacobian.linear2.x, d.m_position.y += f * a * this.m_motorJacobian.linear2.y, d.m_rotation += h * a * this.m_motorJacobian.angular2, d.m_R.Set(d.m_rotation));
  return n <= box2d.Settings.b2_linearSlop && q <= box2d.Settings.b2_angularSlop
};
box2d.MouseJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.K = new box2d.Mat22;
  this.K1 = new box2d.Mat22;
  this.K2 = new box2d.Mat22;
  this.m_localAnchor = new box2d.Vec2;
  this.m_target = new box2d.Vec2;
  this.m_impulse = new box2d.Vec2;
  this.m_ptpMass = new box2d.Mat22;
  this.m_C = new box2d.Vec2;
  this.m_target.SetV(a.target);
  var b = this.m_target.x - this.m_body2.m_position.x, c = this.m_target.y - this.m_body2.m_position.y;
  this.m_localAnchor.x = b * this.m_body2.m_R.col1.x + c * this.m_body2.m_R.col1.y;
  this.m_localAnchor.y = b * this.m_body2.m_R.col2.x + c * this.m_body2.m_R.col2.y;
  this.m_maxForce = a.maxForce;
  this.m_impulse.SetZero();
  var c = this.m_body2.m_mass, d = 2 * box2d.Settings.b2_pi * a.frequencyHz, b = 2 * c * a.dampingRatio * d, c = c * d * d;
  this.m_gamma = 1 / (b + a.timeStep * c);
  this.m_beta = a.timeStep * c / (b + a.timeStep * c)
};
goog.inherits(box2d.MouseJoint, box2d.Joint);
box2d.MouseJoint.prototype.GetAnchor1 = function() {
  return this.m_target
};
box2d.MouseJoint.prototype.GetAnchor2 = function() {
  var a = box2d.Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor);
  a.add(this.m_body2.m_position);
  return a
};
box2d.MouseJoint.prototype.GetReactionForce = function(a) {
  var b = new box2d.Vec2;
  b.SetV(this.m_impulse);
  b.scale(a);
  return b
};
box2d.MouseJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.MouseJoint.prototype.SetTarget = function(a) {
  this.m_body2.WakeUp();
  this.m_target = a
};
box2d.MouseJoint.prototype.PrepareVelocitySolver = function() {
  var a = this.m_body2, b;
  b = a.m_R;
  var c = b.col1.x * this.m_localAnchor.x + b.col2.x * this.m_localAnchor.y;
  b = b.col1.y * this.m_localAnchor.x + b.col2.y * this.m_localAnchor.y;
  var d = a.m_invMass, e = a.m_invI;
  this.K1.col1.x = d;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = d;
  this.K2.col1.x = e * b * b;
  this.K2.col2.x = -e * c * b;
  this.K2.col1.y = -e * c * b;
  this.K2.col2.y = e * c * c;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.col1.x += this.m_gamma;
  this.K.col2.y += this.m_gamma;
  this.K.Invert(this.m_ptpMass);
  this.m_C.x = a.m_position.x + c - this.m_target.x;
  this.m_C.y = a.m_position.y + b - this.m_target.y;
  a.m_angularVelocity *= 0.98;
  var f = this.m_impulse.x, g = this.m_impulse.y;
  a.m_linearVelocity.x += d * f;
  a.m_linearVelocity.y += d * g;
  a.m_angularVelocity += e * (c * g - b * f)
};
box2d.MouseJoint.prototype.SolveVelocityConstraints = function(a) {
  var b = this.m_body2, c;
  c = b.m_R;
  var d = c.col1.x * this.m_localAnchor.x + c.col2.x * this.m_localAnchor.y, e = c.col1.y * this.m_localAnchor.x + c.col2.y * this.m_localAnchor.y, f = b.m_linearVelocity.x + -b.m_angularVelocity * e, g = b.m_linearVelocity.y + b.m_angularVelocity * d;
  c = this.m_ptpMass;
  var f = f + this.m_beta * a.inv_dt * this.m_C.x + this.m_gamma * this.m_impulse.x, h = g + this.m_beta * a.inv_dt * this.m_C.y + this.m_gamma * this.m_impulse.y, g = -(c.col1.x * f + c.col2.x * h), h = -(c.col1.y * f + c.col2.y * h);
  c = this.m_impulse.x;
  f = this.m_impulse.y;
  this.m_impulse.x += g;
  this.m_impulse.y += h;
  g = this.m_impulse.magnitude();
  g > a.dt * this.m_maxForce && this.m_impulse.scale(a.dt * this.m_maxForce / g);
  g = this.m_impulse.x - c;
  h = this.m_impulse.y - f;
  b.m_linearVelocity.x += b.m_invMass * g;
  b.m_linearVelocity.y += b.m_invMass * h;
  b.m_angularVelocity += b.m_invI * (d * h - e * g)
};
box2d.MouseJoint.prototype.SolvePositionConstraints = function() {
  return!0
};
box2d.PulleyJointDef = function() {
  box2d.JointDef.call(this, !0);
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.groundPoint1 = new box2d.Vec2;
  this.groundPoint2 = new box2d.Vec2;
  this.anchorPoint1 = new box2d.Vec2;
  this.anchorPoint2 = new box2d.Vec2;
  this.type = box2d.Joint.e_pulleyJoint;
  this.groundPoint1.Set(-1, 1);
  this.groundPoint2.Set(1, 1);
  this.anchorPoint1.Set(-1, 0);
  this.anchorPoint2.Set(1, 0);
  this.maxLength1 = 0.5 * box2d.PulleyJoint.b2_minPulleyLength;
  this.maxLength2 = 0.5 * box2d.PulleyJoint.b2_minPulleyLength;
  this.ratio = 1
};
goog.inherits(box2d.PulleyJointDef, box2d.JointDef);
box2d.PulleyJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.m_groundAnchor1 = new box2d.Vec2;
  this.m_groundAnchor2 = new box2d.Vec2;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_u1 = new box2d.Vec2;
  this.m_u2 = new box2d.Vec2;
  var b, c, d;
  this.m_ground = this.m_body1.m_world.m_groundBody;
  this.m_groundAnchor1.x = a.groundPoint1.x - this.m_ground.m_position.x;
  this.m_groundAnchor1.y = a.groundPoint1.y - this.m_ground.m_position.y;
  this.m_groundAnchor2.x = a.groundPoint2.x - this.m_ground.m_position.x;
  this.m_groundAnchor2.y = a.groundPoint2.y - this.m_ground.m_position.y;
  b = this.m_body1.m_R;
  c = a.anchorPoint1.x - this.m_body1.m_position.x;
  d = a.anchorPoint1.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
  b = this.m_body2.m_R;
  c = a.anchorPoint2.x - this.m_body2.m_position.x;
  d = a.anchorPoint2.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
  this.m_ratio = a.ratio;
  c = a.groundPoint1.x - a.anchorPoint1.x;
  d = a.groundPoint1.y - a.anchorPoint1.y;
  b = Math.sqrt(c * c + d * d);
  c = a.groundPoint2.x - a.anchorPoint2.x;
  d = a.groundPoint2.y - a.anchorPoint2.y;
  c = Math.sqrt(c * c + d * d);
  d = Math.max(0.5 * box2d.PulleyJoint.b2_minPulleyLength, b);
  c = Math.max(0.5 * box2d.PulleyJoint.b2_minPulleyLength, c);
  this.m_constant = d + this.m_ratio * c;
  this.m_maxLength1 = box2d.Math.b2Clamp(a.maxLength1, d, this.m_constant - this.m_ratio * box2d.PulleyJoint.b2_minPulleyLength);
  this.m_maxLength2 = box2d.Math.b2Clamp(a.maxLength2, c, (this.m_constant - box2d.PulleyJoint.b2_minPulleyLength) / this.m_ratio);
  this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_pulleyImpulse = 0
};
goog.inherits(box2d.PulleyJoint, box2d.Joint);
box2d.PulleyJoint.prototype.GetAnchor1 = function() {
  var a = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
};
box2d.PulleyJoint.prototype.GetAnchor2 = function() {
  var a = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
};
box2d.PulleyJoint.prototype.GetGroundPoint1 = function() {
  return new box2d.Vec2(this.m_ground.m_position.x + this.m_groundAnchor1.x, this.m_ground.m_position.y + this.m_groundAnchor1.y)
};
box2d.PulleyJoint.prototype.GetGroundPoint2 = function() {
  return new box2d.Vec2(this.m_ground.m_position.x + this.m_groundAnchor2.x, this.m_ground.m_position.y + this.m_groundAnchor2.y)
};
box2d.PulleyJoint.prototype.GetReactionForce = function() {
  return new box2d.Vec2
};
box2d.PulleyJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.PulleyJoint.prototype.GetLength1 = function() {
  var a;
  a = this.m_body1.m_R;
  var b = this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y) - (this.m_ground.m_position.x + this.m_groundAnchor1.x);
  a = this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y) - (this.m_ground.m_position.y + this.m_groundAnchor1.y);
  return Math.sqrt(b * b + a * a)
};
box2d.PulleyJoint.prototype.GetLength2 = function() {
  var a;
  a = this.m_body2.m_R;
  var b = this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y) - (this.m_ground.m_position.x + this.m_groundAnchor2.x);
  a = this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y) - (this.m_ground.m_position.y + this.m_groundAnchor2.y);
  return Math.sqrt(b * b + a * a)
};
box2d.PulleyJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
box2d.PulleyJoint.prototype.PrepareVelocitySolver = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
  c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
  var g = b.m_position.x + f, h = b.m_position.y + c, j = this.m_ground.m_position.x + this.m_groundAnchor2.x, k = this.m_ground.m_position.y + this.m_groundAnchor2.y;
  this.m_u1.Set(a.m_position.x + d - (this.m_ground.m_position.x + this.m_groundAnchor1.x), a.m_position.y + e - (this.m_ground.m_position.y + this.m_groundAnchor1.y));
  this.m_u2.Set(g - j, h - k);
  g = this.m_u1.magnitude();
  h = this.m_u2.magnitude();
  g > box2d.Settings.b2_linearSlop ? this.m_u1.scale(1 / g) : this.m_u1.SetZero();
  h > box2d.Settings.b2_linearSlop ? this.m_u2.scale(1 / h) : this.m_u2.SetZero();
  g < this.m_maxLength1 ? (this.m_limitState1 = box2d.Joint.e_inactiveLimit, this.m_limitImpulse1 = 0) : (this.m_limitState1 = box2d.Joint.e_atUpperLimit, this.m_limitPositionImpulse1 = 0);
  h < this.m_maxLength2 ? (this.m_limitState2 = box2d.Joint.e_inactiveLimit, this.m_limitImpulse2 = 0) : (this.m_limitState2 = box2d.Joint.e_atUpperLimit, this.m_limitPositionImpulse2 = 0);
  g = d * this.m_u1.y - e * this.m_u1.x;
  h = f * this.m_u2.y - c * this.m_u2.x;
  this.m_limitMass1 = a.m_invMass + a.m_invI * g * g;
  this.m_limitMass2 = b.m_invMass + b.m_invI * h * h;
  this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
  this.m_limitMass1 = 1 / this.m_limitMass1;
  this.m_limitMass2 = 1 / this.m_limitMass2;
  this.m_pulleyMass = 1 / this.m_pulleyMass;
  g = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.x;
  h = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.y;
  j = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.x;
  k = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.y;
  a.m_linearVelocity.x += a.m_invMass * g;
  a.m_linearVelocity.y += a.m_invMass * h;
  a.m_angularVelocity += a.m_invI * (d * h - e * g);
  b.m_linearVelocity.x += b.m_invMass * j;
  b.m_linearVelocity.y += b.m_invMass * k;
  b.m_angularVelocity += b.m_invI * (f * k - c * j)
};
box2d.PulleyJoint.prototype.SolveVelocityConstraints = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
  c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
  var g, h, j, k;
  g = a.m_linearVelocity.x + -a.m_angularVelocity * e;
  h = a.m_linearVelocity.y + a.m_angularVelocity * d;
  j = b.m_linearVelocity.x + -b.m_angularVelocity * c;
  k = b.m_linearVelocity.y + b.m_angularVelocity * f;
  g = -(this.m_u1.x * g + this.m_u1.y * h) - this.m_ratio * (this.m_u2.x * j + this.m_u2.y * k);
  k = -this.m_pulleyMass * g;
  this.m_pulleyImpulse += k;
  g = -k * this.m_u1.x;
  h = -k * this.m_u1.y;
  j = -this.m_ratio * k * this.m_u2.x;
  k = -this.m_ratio * k * this.m_u2.y;
  a.m_linearVelocity.x += a.m_invMass * g;
  a.m_linearVelocity.y += a.m_invMass * h;
  a.m_angularVelocity += a.m_invI * (d * h - e * g);
  b.m_linearVelocity.x += b.m_invMass * j;
  b.m_linearVelocity.y += b.m_invMass * k;
  b.m_angularVelocity += b.m_invI * (f * k - c * j);
  this.m_limitState1 == box2d.Joint.e_atUpperLimit && (g = a.m_linearVelocity.x + -a.m_angularVelocity * e, h = a.m_linearVelocity.y + a.m_angularVelocity * d, g = -(this.m_u1.x * g + this.m_u1.y * h), k = -this.m_limitMass1 * g, g = this.m_limitImpulse1, this.m_limitImpulse1 = Math.max(0, this.m_limitImpulse1 + k), k = this.m_limitImpulse1 - g, g = -k * this.m_u1.x, h = -k * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * g, a.m_linearVelocity.y += a.m_invMass * h, a.m_angularVelocity += a.m_invI * 
  (d * h - e * g));
  this.m_limitState2 == box2d.Joint.e_atUpperLimit && (j = b.m_linearVelocity.x + -b.m_angularVelocity * c, k = b.m_linearVelocity.y + b.m_angularVelocity * f, g = -(this.m_u2.x * j + this.m_u2.y * k), k = -this.m_limitMass2 * g, g = this.m_limitImpulse2, this.m_limitImpulse2 = Math.max(0, this.m_limitImpulse2 + k), k = this.m_limitImpulse2 - g, j = -k * this.m_u2.x, k = -k * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * j, b.m_linearVelocity.y += b.m_invMass * k, b.m_angularVelocity += b.m_invI * 
  (f * k - c * j))
};
box2d.PulleyJoint.prototype.SolvePositionConstraints = function() {
  var a = this.m_body1, b = this.m_body2, c, d = this.m_ground.m_position.x + this.m_groundAnchor1.x, e = this.m_ground.m_position.y + this.m_groundAnchor1.y, f = this.m_ground.m_position.x + this.m_groundAnchor2.x, g = this.m_ground.m_position.y + this.m_groundAnchor2.y, h, j, k, l, m, n, q, r = 0;
  c = a.m_R;
  h = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
  j = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  k = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
  c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
  l = a.m_position.x + h;
  m = a.m_position.y + j;
  n = b.m_position.x + k;
  q = b.m_position.y + c;
  this.m_u1.Set(l - d, m - e);
  this.m_u2.Set(n - f, q - g);
  l = this.m_u1.magnitude();
  m = this.m_u2.magnitude();
  l > box2d.Settings.b2_linearSlop ? this.m_u1.scale(1 / l) : this.m_u1.SetZero();
  m > box2d.Settings.b2_linearSlop ? this.m_u2.scale(1 / m) : this.m_u2.SetZero();
  l = this.m_constant - l - this.m_ratio * m;
  r = Math.max(r, Math.abs(l));
  l = box2d.Math.b2Clamp(l, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection);
  q = -this.m_pulleyMass * l;
  l = -q * this.m_u1.x;
  m = -q * this.m_u1.y;
  n = -this.m_ratio * q * this.m_u2.x;
  q = -this.m_ratio * q * this.m_u2.y;
  a.m_position.x += a.m_invMass * l;
  a.m_position.y += a.m_invMass * m;
  a.m_rotation += a.m_invI * (h * m - j * l);
  b.m_position.x += b.m_invMass * n;
  b.m_position.y += b.m_invMass * q;
  b.m_rotation += b.m_invI * (k * q - c * n);
  a.m_R.Set(a.m_rotation);
  b.m_R.Set(b.m_rotation);
  this.m_limitState1 == box2d.Joint.e_atUpperLimit && (c = a.m_R, h = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, j = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y, l = a.m_position.x + h, m = a.m_position.y + j, this.m_u1.Set(l - d, m - e), l = this.m_u1.magnitude(), l > box2d.Settings.b2_linearSlop ? (this.m_u1.x *= 1 / l, this.m_u1.y *= 1 / l) : this.m_u1.SetZero(), l = this.m_maxLength1 - l, r = Math.max(r, -l), l = box2d.Math.b2Clamp(l + box2d.Settings.b2_linearSlop, 
  -box2d.Settings.b2_maxLinearCorrection, 0), q = -this.m_limitMass1 * l, d = this.m_limitPositionImpulse1, this.m_limitPositionImpulse1 = Math.max(0, this.m_limitPositionImpulse1 + q), q = this.m_limitPositionImpulse1 - d, l = -q * this.m_u1.x, m = -q * this.m_u1.y, a.m_position.x += a.m_invMass * l, a.m_position.y += a.m_invMass * m, a.m_rotation += a.m_invI * (h * m - j * l), a.m_R.Set(a.m_rotation));
  this.m_limitState2 == box2d.Joint.e_atUpperLimit && (c = b.m_R, k = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y, c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y, n = b.m_position.x + k, q = b.m_position.y + c, this.m_u2.Set(n - f, q - g), m = this.m_u2.magnitude(), m > box2d.Settings.b2_linearSlop ? (this.m_u2.x *= 1 / m, this.m_u2.y *= 1 / m) : this.m_u2.SetZero(), l = this.m_maxLength2 - m, r = Math.max(r, -l), l = box2d.Math.b2Clamp(l + box2d.Settings.b2_linearSlop, 
  -box2d.Settings.b2_maxLinearCorrection, 0), q = -this.m_limitMass2 * l, d = this.m_limitPositionImpulse2, this.m_limitPositionImpulse2 = Math.max(0, this.m_limitPositionImpulse2 + q), q = this.m_limitPositionImpulse2 - d, n = -q * this.m_u2.x, q = -q * this.m_u2.y, b.m_position.x += b.m_invMass * n, b.m_position.y += b.m_invMass * q, b.m_rotation += b.m_invI * (k * q - c * n), b.m_R.Set(b.m_rotation));
  return r < box2d.Settings.b2_linearSlop
};
box2d.PulleyJoint.b2_minPulleyLength = box2d.Settings.b2_lengthUnitsPerMeter;
box2d.GearJointDef = function() {
  this.type = box2d.Joint.e_gearJoint;
  this.joint2 = this.joint1 = null;
  this.ratio = 1
};
goog.inherits(box2d.GearJointDef, box2d.JointDef);
box2d.GearJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.m_groundAnchor1 = new box2d.Vec2;
  this.m_groundAnchor2 = new box2d.Vec2;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_J = new box2d.Jacobian;
  this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
  var b, c;
  this.m_ground1 = a.joint1.m_body1;
  this.m_body1 = a.joint1.m_body2;
  a.joint1.m_type == box2d.Joint.e_revoluteJoint ? (this.m_revolute1 = a.joint1, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), b = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), b = this.m_prismatic1.GetJointTranslation());
  this.m_ground2 = a.joint2.m_body1;
  this.m_body2 = a.joint2.m_body2;
  a.joint2.m_type == box2d.Joint.e_revoluteJoint ? (this.m_revolute2 = a.joint2, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), c = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), c = this.m_prismatic2.GetJointTranslation());
  this.m_ratio = a.ratio;
  this.m_constant = b + this.m_ratio * c;
  this.m_impulse = 0
};
goog.inherits(box2d.GearJoint, box2d.Joint);
box2d.GearJoint.prototype.GetAnchor1 = function() {
  var a = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
};
box2d.GearJoint.prototype.GetAnchor2 = function() {
  var a = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
};
box2d.GearJoint.prototype.GetReactionForce = function() {
  return new box2d.Vec2
};
box2d.GearJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.GearJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
box2d.GearJoint.prototype.PrepareVelocitySolver = function() {
  var a = this.m_ground1, b = this.m_ground2, c = this.m_body1, d = this.m_body2, e, f, g, h = 0;
  this.m_J.SetZero();
  this.m_revolute1 ? (this.m_J.angular1 = -1, h += c.m_invI) : (g = a.m_R, e = this.m_prismatic1.m_localXAxis1, a = g.col1.x * e.x + g.col2.x * e.y, e = g.col1.y * e.x + g.col2.y * e.y, g = c.m_R, f = g.col1.x * this.m_localAnchor1.x + g.col2.x * this.m_localAnchor1.y, g = g.col1.y * this.m_localAnchor1.x + g.col2.y * this.m_localAnchor1.y, f = f * e - g * a, this.m_J.linear1.Set(-a, -e), this.m_J.angular1 = -f, h += c.m_invMass + c.m_invI * f * f);
  this.m_revolute2 ? (this.m_J.angular2 = -this.m_ratio, h += this.m_ratio * this.m_ratio * d.m_invI) : (g = b.m_R, e = this.m_prismatic2.m_localXAxis1, a = g.col1.x * e.x + g.col2.x * e.y, e = g.col1.y * e.x + g.col2.y * e.y, g = d.m_R, f = g.col1.x * this.m_localAnchor2.x + g.col2.x * this.m_localAnchor2.y, g = g.col1.y * this.m_localAnchor2.x + g.col2.y * this.m_localAnchor2.y, f = f * e - g * a, this.m_J.linear2.Set(-this.m_ratio * a, -this.m_ratio * e), this.m_J.angular2 = -this.m_ratio * f, 
  h += this.m_ratio * this.m_ratio * (d.m_invMass + d.m_invI * f * f));
  this.m_mass = 1 / h;
  c.m_linearVelocity.x += c.m_invMass * this.m_impulse * this.m_J.linear1.x;
  c.m_linearVelocity.y += c.m_invMass * this.m_impulse * this.m_J.linear1.y;
  c.m_angularVelocity += c.m_invI * this.m_impulse * this.m_J.angular1;
  d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linear2.x;
  d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linear2.y;
  d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angular2
};
box2d.GearJoint.prototype.SolveVelocityConstraints = function() {
  var a = this.m_body1, b = this.m_body2, c = this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity), c = -this.m_mass * c;
  this.m_impulse += c;
  a.m_linearVelocity.x += a.m_invMass * c * this.m_J.linear1.x;
  a.m_linearVelocity.y += a.m_invMass * c * this.m_J.linear1.y;
  a.m_angularVelocity += a.m_invI * c * this.m_J.angular1;
  b.m_linearVelocity.x += b.m_invMass * c * this.m_J.linear2.x;
  b.m_linearVelocity.y += b.m_invMass * c * this.m_J.linear2.y;
  b.m_angularVelocity += b.m_invI * c * this.m_J.angular2
};
box2d.GearJoint.prototype.SolvePositionConstraints = function() {
  var a = this.m_body1, b = this.m_body2, c, d;
  c = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation();
  d = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
  c = -this.m_mass * (this.m_constant - (c + this.m_ratio * d));
  a.m_position.x += a.m_invMass * c * this.m_J.linear1.x;
  a.m_position.y += a.m_invMass * c * this.m_J.linear1.y;
  a.m_rotation += a.m_invI * c * this.m_J.angular1;
  b.m_position.x += b.m_invMass * c * this.m_J.linear2.x;
  b.m_position.y += b.m_invMass * c * this.m_J.linear2.y;
  b.m_rotation += b.m_invI * c * this.m_J.angular2;
  a.m_R.Set(a.m_rotation);
  b.m_R.Set(b.m_rotation);
  return 0 < box2d.Settings.b2_linearSlop
};
box2d.RevoluteJointDef = function() {
  box2d.JointDef.call(this, !1);
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.type = box2d.Joint.e_revoluteJoint;
  this.anchorPoint = new box2d.Vec2(0, 0);
  this.motorSpeed = this.motorTorque = this.upperAngle = this.lowerAngle = 0;
  this.enableMotor = this.enableLimit = !1
};
goog.inherits(box2d.RevoluteJointDef, box2d.JointDef);
box2d.RevoluteJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.K = new box2d.Mat22;
  this.K1 = new box2d.Mat22;
  this.K2 = new box2d.Mat22;
  this.K3 = new box2d.Mat22;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_ptpImpulse = new box2d.Vec2;
  this.m_ptpMass = new box2d.Mat22;
  var b, c, d;
  b = this.m_body1.m_R;
  c = a.anchorPoint.x - this.m_body1.m_position.x;
  d = a.anchorPoint.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
  b = this.m_body2.m_R;
  c = a.anchorPoint.x - this.m_body2.m_position.x;
  d = a.anchorPoint.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
  this.m_intialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
  this.m_ptpImpulse.Set(0, 0);
  this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse = 0;
  this.m_lowerAngle = a.lowerAngle;
  this.m_upperAngle = a.upperAngle;
  this.m_maxMotorTorque = a.motorTorque;
  this.m_motorSpeed = a.motorSpeed;
  this.m_enableLimit = a.enableLimit;
  this.m_enableMotor = a.enableMotor
};
goog.inherits(box2d.RevoluteJoint, box2d.Joint);
box2d.RevoluteJoint.prototype.GetAnchor1 = function() {
  var a = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
};
box2d.RevoluteJoint.prototype.GetAnchor2 = function() {
  var a = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
};
box2d.RevoluteJoint.prototype.GetJointAngle = function() {
  return this.m_body2.m_rotation - this.m_body1.m_rotation
};
box2d.RevoluteJoint.prototype.GetJointSpeed = function() {
  return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity
};
box2d.RevoluteJoint.prototype.GetMotorTorque = function(a) {
  return a * this.m_motorImpulse
};
box2d.RevoluteJoint.prototype.SetMotorSpeed = function(a) {
  this.m_motorSpeed = a
};
box2d.RevoluteJoint.prototype.SetMotorTorque = function(a) {
  this.m_maxMotorTorque = a
};
box2d.RevoluteJoint.prototype.GetReactionForce = function(a) {
  var b = this.m_ptpImpulse.Copy();
  b.scale(a);
  return b
};
box2d.RevoluteJoint.prototype.GetReactionTorque = function(a) {
  return a * this.m_limitImpulse
};
box2d.RevoluteJoint.prototypeK = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K1 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K2 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K3 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.PrepareVelocitySolver = function() {
  var a = this.m_body1, b = this.m_body2, c;
  c = a.m_R;
  var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y, e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
  c = b.m_R;
  var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
  c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
  var g = a.m_invMass, h = b.m_invMass, j = a.m_invI, k = b.m_invI;
  this.K1.col1.x = g + h;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = g + h;
  this.K2.col1.x = j * e * e;
  this.K2.col2.x = -j * d * e;
  this.K2.col1.y = -j * d * e;
  this.K2.col2.y = j * d * d;
  this.K3.col1.x = k * c * c;
  this.K3.col2.x = -k * f * c;
  this.K3.col1.y = -k * f * c;
  this.K3.col2.y = k * f * f;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Invert(this.m_ptpMass);
  this.m_motorMass = 1 / (j + k);
  !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
  if(this.m_enableLimit) {
    var l = b.m_rotation - a.m_rotation - this.m_intialAngle;
    Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2 * box2d.Settings.b2_angularSlop ? this.m_limitState = box2d.Joint.e_equalLimits : l <= this.m_lowerAngle ? (this.m_limitState != box2d.Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atLowerLimit) : l >= this.m_upperAngle ? (this.m_limitState != box2d.Joint.e_atUpperLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atUpperLimit) : (this.m_limitState = box2d.Joint.e_inactiveLimit, this.m_limitImpulse = 
    0)
  }else {
    this.m_limitImpulse = 0
  }
  box2d.World.s_enableWarmStarting ? (a.m_linearVelocity.x -= g * this.m_ptpImpulse.x, a.m_linearVelocity.y -= g * this.m_ptpImpulse.y, a.m_angularVelocity -= j * (d * this.m_ptpImpulse.y - e * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse), b.m_linearVelocity.x += h * this.m_ptpImpulse.x, b.m_linearVelocity.y += h * this.m_ptpImpulse.y, b.m_angularVelocity += k * (f * this.m_ptpImpulse.y - c * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse)) : (this.m_ptpImpulse.SetZero(), 
  this.m_limitImpulse = this.m_motorImpulse = 0);
  this.m_limitPositionImpulse = 0
};
box2d.RevoluteJoint.prototype.SolveVelocityConstraints = function(a) {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
  var h = c.m_linearVelocity.x + -c.m_angularVelocity * d - b.m_linearVelocity.x - -b.m_angularVelocity * f, j = c.m_linearVelocity.y + c.m_angularVelocity * g - b.m_linearVelocity.y - b.m_angularVelocity * e, k = -(this.m_ptpMass.col1.x * h + this.m_ptpMass.col2.x * j), h = -(this.m_ptpMass.col1.y * h + this.m_ptpMass.col2.y * j);
  this.m_ptpImpulse.x += k;
  this.m_ptpImpulse.y += h;
  b.m_linearVelocity.x -= b.m_invMass * k;
  b.m_linearVelocity.y -= b.m_invMass * h;
  b.m_angularVelocity -= b.m_invI * (e * h - f * k);
  c.m_linearVelocity.x += c.m_invMass * k;
  c.m_linearVelocity.y += c.m_invMass * h;
  c.m_angularVelocity += c.m_invI * (g * h - d * k);
  this.m_enableMotor && this.m_limitState != box2d.Joint.e_equalLimits && (e = -this.m_motorMass * (c.m_angularVelocity - b.m_angularVelocity - this.m_motorSpeed), f = this.m_motorImpulse, this.m_motorImpulse = box2d.Math.b2Clamp(this.m_motorImpulse + e, -a.dt * this.m_maxMotorTorque, a.dt * this.m_maxMotorTorque), e = this.m_motorImpulse - f, b.m_angularVelocity -= b.m_invI * e, c.m_angularVelocity += c.m_invI * e);
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (e = -this.m_motorMass * (c.m_angularVelocity - b.m_angularVelocity), this.m_limitState == box2d.Joint.e_equalLimits ? this.m_limitImpulse += e : this.m_limitState == box2d.Joint.e_atLowerLimit ? (a = this.m_limitImpulse, this.m_limitImpulse = Math.max(this.m_limitImpulse + e, 0), e = this.m_limitImpulse - a) : this.m_limitState == box2d.Joint.e_atUpperLimit && (a = this.m_limitImpulse, this.m_limitImpulse = Math.min(this.m_limitImpulse + 
  e, 0), e = this.m_limitImpulse - a), b.m_angularVelocity -= b.m_invI * e, c.m_angularVelocity += c.m_invI * e)
};
box2d.RevoluteJoint.prototype.SolvePositionConstraints = function() {
  var a, b = this.m_body1, c = this.m_body2, d = 0, d = b.m_R, e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y, d = c.m_R;
  a = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  var g = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y, h = c.m_position.x + a - (b.m_position.x + e), j = c.m_position.y + g - (b.m_position.y + f), d = Math.sqrt(h * h + j * j), k = b.m_invMass, l = c.m_invMass, m = b.m_invI, n = c.m_invI;
  this.K1.col1.x = k + l;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = k + l;
  this.K2.col1.x = m * f * f;
  this.K2.col2.x = -m * e * f;
  this.K2.col1.y = -m * e * f;
  this.K2.col2.y = m * e * e;
  this.K3.col1.x = n * g * g;
  this.K3.col2.x = -n * a * g;
  this.K3.col1.y = -n * a * g;
  this.K3.col2.y = n * a * a;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Solve(box2d.RevoluteJoint.tImpulse, -h, -j);
  h = box2d.RevoluteJoint.tImpulse.x;
  j = box2d.RevoluteJoint.tImpulse.y;
  b.m_position.x -= b.m_invMass * h;
  b.m_position.y -= b.m_invMass * j;
  b.m_rotation -= b.m_invI * (e * j - f * h);
  b.m_R.Set(b.m_rotation);
  c.m_position.x += c.m_invMass * h;
  c.m_position.y += c.m_invMass * j;
  c.m_rotation += c.m_invI * (a * j - g * h);
  c.m_R.Set(c.m_rotation);
  e = 0;
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (a = c.m_rotation - b.m_rotation - this.m_intialAngle, f = 0, this.m_limitState == box2d.Joint.e_equalLimits ? (a = box2d.Math.b2Clamp(a, -box2d.Settings.b2_maxAngularCorrection, box2d.Settings.b2_maxAngularCorrection), f = -this.m_motorMass * a, e = Math.abs(a)) : this.m_limitState == box2d.Joint.e_atLowerLimit ? (a -= this.m_lowerAngle, e = Math.max(0, -a), a = box2d.Math.b2Clamp(a + box2d.Settings.b2_angularSlop, -box2d.Settings.b2_maxAngularCorrection, 
  0), f = -this.m_motorMass * a, a = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.max(this.m_limitPositionImpulse + f, 0), f = this.m_limitPositionImpulse - a) : this.m_limitState == box2d.Joint.e_atUpperLimit && (a -= this.m_upperAngle, e = Math.max(0, a), a = box2d.Math.b2Clamp(a - box2d.Settings.b2_angularSlop, 0, box2d.Settings.b2_maxAngularCorrection), f = -this.m_motorMass * a, a = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.min(this.m_limitPositionImpulse + 
  f, 0), f = this.m_limitPositionImpulse - a), b.m_rotation -= b.m_invI * f, b.m_R.Set(b.m_rotation), c.m_rotation += c.m_invI * f, c.m_R.Set(c.m_rotation));
  return d <= box2d.Settings.b2_linearSlop && e <= box2d.Settings.b2_angularSlop
};
box2d.RevoluteJoint.tImpulse = new box2d.Vec2;
box2d.DistanceJointDef = function() {
  box2d.JointDef.call(this, !1);
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.anchorPoint1 = new box2d.Vec2;
  this.anchorPoint2 = new box2d.Vec2;
  this.type = box2d.Joint.e_distanceJoint
};
goog.inherits(box2d.DistanceJointDef, box2d.JointDef);
box2d.DistanceJoint = function(a) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = a.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = a.body1;
  this.m_body2 = a.body2;
  this.m_collideConnected = a.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = a.userData;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_u = new box2d.Vec2;
  var b, c, d;
  b = this.m_body1.m_R;
  c = a.anchorPoint1.x - this.m_body1.m_position.x;
  d = a.anchorPoint1.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
  b = this.m_body2.m_R;
  c = a.anchorPoint2.x - this.m_body2.m_position.x;
  d = a.anchorPoint2.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
  this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
  c = a.anchorPoint2.x - a.anchorPoint1.x;
  d = a.anchorPoint2.y - a.anchorPoint1.y;
  this.m_length = Math.sqrt(c * c + d * d);
  this.m_impulse = 0
};
goog.inherits(box2d.DistanceJoint, box2d.Joint);
box2d.DistanceJoint.prototype.PrepareVelocitySolver = function() {
  var a;
  a = this.m_body1.m_R;
  var b = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, c = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
  a = this.m_body2.m_R;
  var d = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
  a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
  this.m_u.x = this.m_body2.m_position.x + d - this.m_body1.m_position.x - b;
  this.m_u.y = this.m_body2.m_position.y + a - this.m_body1.m_position.y - c;
  var e = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
  e > box2d.Settings.b2_linearSlop ? this.m_u.scale(1 / e) : this.m_u.SetZero();
  var e = b * this.m_u.y - c * this.m_u.x, f = d * this.m_u.y - a * this.m_u.x;
  this.m_mass = this.m_body1.m_invMass + this.m_body1.m_invI * e * e + this.m_body2.m_invMass + this.m_body2.m_invI * f * f;
  this.m_mass = 1 / this.m_mass;
  box2d.World.s_enableWarmStarting ? (e = this.m_impulse * this.m_u.x, f = this.m_impulse * this.m_u.y, this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * e, this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * f, this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (b * f - c * e), this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * e, this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * f, this.m_body2.m_angularVelocity += this.m_body2.m_invI * (d * f - a * e)) : 
  this.m_impulse = 0
};
box2d.DistanceJoint.prototype.SolveVelocityConstraints = function() {
  var a;
  a = this.m_body1.m_R;
  var b = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, c = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
  a = this.m_body2.m_R;
  var d = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
  a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
  var e = -this.m_mass * (this.m_u.x * (this.m_body2.m_linearVelocity.x + -this.m_body2.m_angularVelocity * a - (this.m_body1.m_linearVelocity.x + -this.m_body1.m_angularVelocity * c)) + this.m_u.y * (this.m_body2.m_linearVelocity.y + this.m_body2.m_angularVelocity * d - (this.m_body1.m_linearVelocity.y + this.m_body1.m_angularVelocity * b)));
  this.m_impulse += e;
  var f = e * this.m_u.x, e = e * this.m_u.y;
  this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * f;
  this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * e;
  this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (b * e - c * f);
  this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * f;
  this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * e;
  this.m_body2.m_angularVelocity += this.m_body2.m_invI * (d * e - a * f)
};
box2d.DistanceJoint.prototype.SolvePositionConstraints = function() {
  var a;
  a = this.m_body1.m_R;
  var b = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, c = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
  a = this.m_body2.m_R;
  var d = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
  a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
  var e = this.m_body2.m_position.x + d - this.m_body1.m_position.x - b, f = this.m_body2.m_position.y + a - this.m_body1.m_position.y - c, g = Math.sqrt(e * e + f * f), e = e / g, f = f / g, g = g - this.m_length, g = box2d.Math.b2Clamp(g, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection), h = -this.m_mass * g;
  this.m_u.Set(e, f);
  e = h * this.m_u.x;
  f = h * this.m_u.y;
  this.m_body1.m_position.x -= this.m_body1.m_invMass * e;
  this.m_body1.m_position.y -= this.m_body1.m_invMass * f;
  this.m_body1.m_rotation -= this.m_body1.m_invI * (b * f - c * e);
  this.m_body2.m_position.x += this.m_body2.m_invMass * e;
  this.m_body2.m_position.y += this.m_body2.m_invMass * f;
  this.m_body2.m_rotation += this.m_body2.m_invI * (d * f - a * e);
  this.m_body1.m_R.Set(this.m_body1.m_rotation);
  this.m_body2.m_R.Set(this.m_body2.m_rotation);
  return Math.abs(g) < box2d.Settings.b2_linearSlop
};
box2d.DistanceJoint.prototype.GetAnchor1 = function() {
  return box2d.Vec2.add(this.m_body1.m_position, box2d.Math.b2MulMV(this.m_body1.m_R, this.m_localAnchor1))
};
box2d.DistanceJoint.prototype.GetAnchor2 = function() {
  return box2d.Vec2.add(this.m_body2.m_position, box2d.Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor2))
};
box2d.DistanceJoint.prototype.GetReactionForce = function(a) {
  var b = new box2d.Vec2;
  b.SetV(this.m_u);
  b.scale(this.m_impulse * a);
  return b
};
box2d.DistanceJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.JointFactory = {};
box2d.JointFactory.Create = function(a) {
  switch(a.type) {
    case box2d.Joint.e_distanceJoint:
      return new box2d.DistanceJoint(a);
    case box2d.Joint.e_mouseJoint:
      return new box2d.MouseJoint(a);
    case box2d.Joint.e_prismaticJoint:
      return new box2d.PrismaticJoint(a);
    case box2d.Joint.e_revoluteJoint:
      return new box2d.RevoluteJoint(a);
    case box2d.Joint.e_pulleyJoint:
      return new box2d.PulleyJoint(a);
    case box2d.Joint.e_gearJoint:
      return new box2d.GearJoint(a);
    default:
      throw"def not supported";
  }
};
box2d.World = function(a, b, c) {
  this.m_step = new box2d.TimeStep;
  this.m_contactManager = new box2d.ContactManager(this);
  this.m_listener = null;
  this.collisionFilter = box2d.CollisionFilter.b2_defaultFilter;
  this.m_jointList = this.m_contactList = this.m_bodyList = null;
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
  this.m_bodyDestroyList = null;
  this.m_allowSleep = c;
  this.m_gravity = b;
  this.m_contactManager.m_world = this;
  this.m_broadPhase = new box2d.BroadPhase(a, this.m_contactManager);
  a = new box2d.BodyDef;
  this.m_groundBody = this.CreateBody(a);
  this.lastPairs = [];
  this.sleeping = !1
};
box2d.World.prototype.SetListener = function(a) {
  this.m_listener = a
};
box2d.World.prototype.SetFilter = function(a) {
  this.collisionFilter = a
};
box2d.World.prototype.CreateBody = function(a) {
  a = new box2d.Body(a, this);
  a.m_prev = null;
  if(a.m_next = this.m_bodyList) {
    this.m_bodyList.m_prev = a
  }
  this.m_bodyList = a;
  ++this.m_bodyCount;
  return a
};
box2d.World.prototype.DestroyBody = function(a) {
  a.m_flags & box2d.Body.Flags.destroyFlag || (a.m_prev && (a.m_prev.m_next = a.m_next), a.m_next && (a.m_next.m_prev = a.m_prev), a == this.m_bodyList && (this.m_bodyList = a.m_next), a.m_flags |= box2d.Body.Flags.destroyFlag, --this.m_bodyCount, a.m_prev = null, a.m_next = this.m_bodyDestroyList, this.m_bodyDestroyList = a)
};
box2d.World.prototype.CleanBodyList = function() {
  this.m_contactManager.m_destroyImmediate = !0;
  for(var a = this.m_bodyDestroyList;a;) {
    for(var b = a, a = a.m_next, c = b.m_jointList;c;) {
      var d = c, c = c.next;
      this.m_listener && this.m_listener.NotifyJointDestroyed(d.joint);
      this.DestroyJoint(d.joint)
    }
    for(c = b.m_contactList;c;) {
      d = c, c = c.next, this.m_contactManager.DestroyContact(d.contact)
    }
    b.Destroy()
  }
  this.m_bodyDestroyList = null;
  this.m_contactManager.m_destroyImmediate = !1
};
box2d.World.prototype.CreateJoint = function(a) {
  var b = box2d.JointFactory.Create(a);
  b.m_prev = null;
  if(b.m_next = this.m_jointList) {
    this.m_jointList.m_prev = b
  }
  this.m_jointList = b;
  ++this.m_jointCount;
  b.m_node1.joint = b;
  b.m_node1.other = b.m_body2;
  b.m_node1.prev = null;
  if(b.m_node1.next = b.m_body1.m_jointList) {
    b.m_body1.m_jointList.prev = b.m_node1
  }
  b.m_body1.m_jointList = b.m_node1;
  b.m_node2.joint = b;
  b.m_node2.other = b.m_body1;
  b.m_node2.prev = null;
  if(b.m_node2.next = b.m_body2.m_jointList) {
    b.m_body2.m_jointList.prev = b.m_node2
  }
  b.m_body2.m_jointList = b.m_node2;
  if(!1 == a.getCollideConnected()) {
    for(a = (a.body1.m_shapeCount < a.body2.m_shapeCount ? a.body1 : a.body2).m_shapeList;a;a = a.m_next) {
      a.ResetProxy(this.m_broadPhase)
    }
  }
  return b
};
box2d.World.prototype.DestroyJoint = function(a) {
  var b = a.m_collideConnected;
  a.m_prev && (a.m_prev.m_next = a.m_next);
  a.m_next && (a.m_next.m_prev = a.m_prev);
  a == this.m_jointList && (this.m_jointList = a.m_next);
  var c = a.m_body1, d = a.m_body2;
  c.WakeUp();
  d.WakeUp();
  a.m_node1.prev && (a.m_node1.prev.next = a.m_node1.next);
  a.m_node1.next && (a.m_node1.next.prev = a.m_node1.prev);
  a.m_node1 == c.m_jointList && (c.m_jointList = a.m_node1.next);
  a.m_node1.prev = null;
  a.m_node1.next = null;
  a.m_node2.prev && (a.m_node2.prev.next = a.m_node2.next);
  a.m_node2.next && (a.m_node2.next.prev = a.m_node2.prev);
  a.m_node2 == d.m_jointList && (d.m_jointList = a.m_node2.next);
  a.m_node2.prev = null;
  a.m_node2.next = null;
  --this.m_jointCount;
  if(!1 == b) {
    for(a = (c.m_shapeCount < d.m_shapeCount ? c : d).m_shapeList;a;a = a.m_next) {
      a.ResetProxy(this.m_broadPhase)
    }
  }
};
box2d.World.prototype.GetGroundBody = function() {
  return this.m_groundBody
};
box2d.World.prototype.Step = function(a, b) {
  var c, d;
  this.m_step.dt = a;
  this.m_step.iterations = b;
  this.m_step.inv_dt = 0 < a ? 1 / a : 0;
  this.m_positionIterationCount = 0;
  this.CleanBodyList();
  this.m_contactManager.CleanContactList();
  this.m_contactManager.Collide();
  var e = new box2d.Island(this.m_bodyCount, this.m_contactCount, this.m_jointCount);
  for(c = this.m_bodyList;null != c;c = c.m_next) {
    c.m_flags &= ~box2d.Body.Flags.islandFlag
  }
  for(var f = this.m_contactList;null != f;f = f.m_next) {
    f.m_flags &= ~box2d.Contact.e_islandFlag
  }
  for(f = this.m_jointList;null != f;f = f.m_next) {
    f.m_islandFlag = !1
  }
  for(var f = Array(this.m_bodyCount), g = 0;g < this.m_bodyCount;g++) {
    f[g] = null
  }
  for(g = this.m_bodyList;null != g;g = g.m_next) {
    if(!(g.m_flags & (box2d.Body.Flags.staticFlag | box2d.Body.Flags.islandFlag | box2d.Body.Flags.sleepFlag | box2d.Body.Flags.frozenFlag))) {
      e.Clear();
      var h = 0;
      f[h++] = g;
      for(g.m_flags |= box2d.Body.Flags.islandFlag;0 < h;) {
        if(c = f[--h], e.AddBody(c), c.m_flags &= ~box2d.Body.Flags.sleepFlag, !(c.m_flags & box2d.Body.Flags.staticFlag)) {
          for(var j = c.m_contactList;null != j;j = j.next) {
            j.contact.m_flags & box2d.Contact.e_islandFlag || (e.AddContact(j.contact), j.contact.m_flags |= box2d.Contact.e_islandFlag, d = j.other, d.m_flags & box2d.Body.Flags.islandFlag || (f[h++] = d, d.m_flags |= box2d.Body.Flags.islandFlag))
          }
          for(c = c.m_jointList;null != c;c = c.next) {
            !0 != c.joint.m_islandFlag && (e.AddJoint(c.joint), c.joint.m_islandFlag = !0, d = c.other, d.m_flags & box2d.Body.Flags.islandFlag || (f[h++] = d, d.m_flags |= box2d.Body.Flags.islandFlag))
          }
        }
      }
      e.Solve(this.m_step, this.m_gravity);
      this.m_positionIterationCount = Math.max(this.m_positionIterationCount, box2d.Island.m_positionIterationCount);
      this.m_allowSleep && (this.sleeping = e.UpdateSleep(a));
      for(d = 0;d < e.m_bodyCount;++d) {
        c = e.m_bodies[d], c.m_flags & box2d.Body.Flags.staticFlag && (c.m_flags &= ~box2d.Body.Flags.islandFlag), c.IsFrozen() && this.m_listener && this.m_listener.NotifyBoundaryViolated(c) == box2d.WorldListener.b2_destroyBody && (this.DestroyBody(c), e.m_bodies[d] = null)
      }
    }
  }
  this.lastPairs = this.m_broadPhase.Commit()
};
box2d.World.prototype.Query = function(a, b, c) {
  var d = [];
  a = this.m_broadPhase.QueryAABB(a, d, c);
  for(c = 0;c < a;++c) {
    b[c] = d[c]
  }
  return a
};
box2d.World.prototype.GetBodyList = function() {
  return this.m_bodyList
};
box2d.World.prototype.GetJointList = function() {
  return this.m_jointList
};
box2d.World.prototype.GetContactList = function() {
  return this.m_contactList
};
box2d.World.s_enablePositionCorrection = 1;
box2d.World.s_enableWarmStarting = 1;
ss2d.PhysicalWorld = function() {
  var a = new box2d.AABB;
  a.minVertex.Set(-2048, -2048);
  a.maxVertex.Set(2048, 2048);
  var b = new box2d.Vec2(0, 300);
  this.mWorld = new box2d.World(a, b, !0)
};
ss2d.PhysicalWorld.WORLD_INSTANCE = null;
ss2d.PhysicalWorld.UPDATE_RATE = 30;
ss2d.PhysicalWorld.getWorld = function() {
  ss2d.PhysicalWorld.WORLD_INSTANCE || (ss2d.PhysicalWorld.WORLD_INSTANCE = new ss2d.PhysicalWorld);
  return ss2d.PhysicalWorld.WORLD_INSTANCE
};
ss2d.PhysicalWorld.prototype.setGravity = function(a, b) {
  this.mWorld.m_gravity.x = a;
  this.mWorld.m_gravity.y = b
};
ss2d.PhysicalWorld.prototype.tick = function(a) {
  this.mWorld.Step(a, 1)
};
ss2d.PhysicalWorld.prototype.createBall = function(a, b, c) {
  c = c || 20;
  var d = new box2d.CircleDef;
  d.density = 1;
  d.radius = c;
  d.restitution = 0.8;
  d.friction = 0.9;
  c = new box2d.BodyDef;
  c.AddShape(d);
  c.position.Set(a, b);
  return this.mWorld.CreateBody(c)
};
ss2d.PhysicalWorld.prototype.createBox = function(a, b, c, d, e, f) {
  "undefined" == typeof e && (e = !0);
  "undefined" == typeof f && (f = !1);
  var g = new box2d.BoxDef;
  e || (g.density = 1);
  f && (g.userData = "filled");
  g.extents.Set(c, d);
  c = new box2d.BodyDef;
  c.AddShape(g);
  c.position.Set(a, b);
  return this.mWorld.CreateBody(c)
};
ss2d.PhysicalWorld.prototype.createMouseJoint = function(a, b) {
  var c = b || ss2d.CURRENT_VIEW.mInput;
  md = new box2d.MouseJointDef;
  md.body1 = this.mWorld.m_groundBody;
  md.body2 = a.mBody;
  c = a.mOwner.worldToLocal(c.mMousePoint);
  md.target.Set(c.mX, c.mY);
  md.maxForce = 1E3 * a.mBody.m_mass;
  md.m_collideConnected = !0;
  md.timeStep = 1 / ss2d.PhysicalWorld.UPDATE_RATE;
  return this.mWorld.CreateJoint(md)
};
ss2d.View = function(a, b, c, d, e) {
  this.mCanvas = document.getElementById(a);
  "webgl" == RENDER_CONTEXT ? (this.mContext = this.mCanvas.getContext("webgl", {alpha:!1}) || this.mCanvas.getContext("experimental-webgl", {alpha:!1}), this.mProjection = ss2d.RenderSupport.make2DProjection(this.mCanvas.width, this.mCanvas.height), this.mClearColor = [0.8, 0.8, 0.8, 1]) : (this.mContext = this.mCanvas.getContext("2d"), this.mBackgroundFillStyle = "#cccccc");
  if(!this.mContext) {
    throw"Incompatible render context: " + RENDER_CONTEXT;
  }
  ss2d.CURRENT_VIEW = this;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mRunning = !1;
  this.mFrameRate = e || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = c || this.mCanvas.width;
  this.mCanvas.height = d || this.mCanvas.height;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = b || new ss2d.DisplayObjectContainer;
  this.mPhysicalWorld = ss2d.PhysicalWorld.getWorld();
  this.mPreTickFunctions = [];
  this.mPostTickFunctions = [];
  this.mPreRenderFunctions = [];
  this.mPostRenderFunctions = [];
  this.mTotalTime = 0
};
ss2d.View.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.View.prototype.nextFrame = function() {
  var a = (new Date).getTime(), b = Math.min(a - this.mLastFrameTimestamp, 1200 / this.mFrameRate);
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  for(var c in this.mPreRenderFunctions) {
    this.mPreRenderFunctions[c].call(null, this.mRenderSupport)
  }
  this.render();
  for(c in this.mPostRenderFunctions) {
    this.mPostRenderFunctions[c].call(null, this.mRenderSupport)
  }
  for(var d = Math.floor(Math.max(1, b / (1E3 / ss2d.PhysicalWorld.UPDATE_RATE))), e = 0;e < d;++e) {
    this.mPhysicalWorld.tick(b / d / 1E3)
  }
  b /= 1E3;
  this.mRealFPS = 0.01 * Math.floor(100 / b);
  this.mTotalTime += b;
  this.mInput.tick(b);
  for(c in this.mPreTickFunctions) {
    this.mPreTickFunctions[c].call(null, b)
  }
  this.mMainScene.tick(b);
  for(c in this.mPostTickFunctions) {
    this.mPostTickFunctions[c].call(null, b)
  }
  this.mLastFrameTimestamp = a;
  a = ((new Date).getTime() - a) / 1E3;
  a = Math.max(0, 1 / this.mFrameRate - a);
  this.mRunning && setTimeout(ss2d.View.NEXT_FRAME_CALLER, 1E3 * a)
};
ss2d.View.prototype.render = function() {
};
ss2d.View.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  var a = this.mContext;
  a.viewport(0, 0, this.mCanvas.width, this.mCanvas.height);
  var b = this.mClearColor;
  a.clearColor(b[0], b[1], b[2], b[3]);
  a.clear(a.COLOR_BUFFER_BIT);
  this.mMainScene.render(this.mRenderSupport)
} : function() {
  this.mContext.fillStyle = this.mBackgroundFillStyle;
  this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.render(this.mRenderSupport)
};
ss2d.View.prototype.startLoop = function() {
  !this.mRunning && null != this.mMainScene && (this.mRunning = !0, this.nextFrame())
};
ss2d.View.prototype.stopLoop = function() {
  this.mRunning = !1
};
ss2d.View.prototype.resizeCanvas = function() {
};
"webgl" == RENDER_CONTEXT && (ss2d.View.prototype.resizeCanvas = function() {
  this.mProjection = ss2d.RenderSupport.make2DProjection(this.mCanvas.width, this.mCanvas.height, this.mProjection)
});
ss2d.Pickable = function(a, b) {
  if(!a) {
    throw"Pickable component need an owner";
  }
  this.mOwner = a || null;
  this.mPicked = !1;
  this.mOffset = new ss2d.Point;
  this.mMoveObject = !0;
  this.mRigidBody = b || null;
  this.mJustPicked = this.mPreviousPicked = !1;
  this.mInput = this.mMouseJoint = null
};
ss2d.Pickable.prototype.tick = function(a, b) {
  var c = b || ss2d.CURRENT_VIEW.mInput;
  this.mJustPicked = !1;
  if(c.mMouseDown && !c.mPreviousMouseDown && this.mOwner.hitTestPoint(c.mMousePoint)) {
    this.mInput && (this.mRigidBody && ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), this.mMouseJoint = null, this.mInput = this.mInput.PICKED_COMPONENT = null);
    c.PICKED_COMPONENT && (this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), this.mInput = this.mMouseJoint = null), c.PICKED_COMPONENT.mPicked = !1);
    this.mPicked = this.mJustPicked = !0;
    this.mInput = c;
    c.PICKED_COMPONENT = this;
    var d = this.mOwner.worldToLocal(c.mMousePoint);
    this.mOffset.set(this.mOwner.mLocation.mX - d.mX, this.mOwner.mLocation.mY - d.mY);
    this.mRigidBody && (this.mMouseJoint = ss2d.PhysicalWorld.getWorld().createMouseJoint(this.mRigidBody, this.mInput), this.mRigidBody.mBody.WakeUp())
  }
  (this.mPicked = c.PICKED_COMPONENT == this && this.mInput && this.mInput.mMouseDown) ? (c = this.mInput, this.mMoveObject && (d = this.mOwner.worldToLocal(c.mMousePoint), this.mRigidBody ? this.mMouseJoint && this.mMouseJoint.m_target.Set(d.mX, d.mY) : (this.mOwner.mLocation.mX = d.mX + this.mOffset.mX, this.mOwner.mLocation.mY = d.mY + this.mOffset.mY))) : c.PICKED_COMPONENT == this && (c.PICKED_COMPONENT = null, this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), 
  this.mInput = this.mMouseJoint = null));
  this.mPreviousPicked = this.mPicked
};
ss2d.Bone = function(a, b, c, d, e, f, g, h) {
  ss2d.DisplayObjectContainer.call(this, c, d, 1, g);
  this.mScaleX = e;
  this.mScaleY = f;
  this.mLength = h;
  this.mName = b;
  this.mParentSkeletalSprite = a;
  this.mRepresentation = new ss2d.Quad(0, 0, 5, h, "#ff0000");
  this.mRepresentation.mAlpha = 0.7;
  this.mRepresentation.mRotation = 0.5 * Math.PI;
  this.mRepresentation.mInheritColor = this.mRepresentation.mInheritAlpha = !1;
  this.addObject(this.mRepresentation);
  this.mSetupPose = {x:c, y:d, r:g, sx:e, sy:f}
};
goog.inherits(ss2d.Bone, ss2d.DisplayObjectContainer);
ss2d.Bone.prototype.interpolateBoneStates = function(a, b, c) {
  this.mLocation.mX = this.mSetupPose.x + a.x + (b.x - a.x) * c.xy;
  this.mLocation.mY = this.mSetupPose.y + a.y + (b.y - a.y) * c.xy;
  this.mRotation = this.mSetupPose.r + a.r + (b.r - a.r) * c.r;
  this.mScaleX = a.sx + (b.sx - a.sx) * c.s;
  this.mScaleY = a.sy + (b.sy - a.sy) * c.s;
  if(0 == this.mScaleX || 0 == this.mScaleY) {
    throw"scale 0";
  }
};
ss2d.Bone.prototype.tick = function(a) {
  this.updateBone(a)
};
ss2d.Bone.prototype.updateBone = function(a) {
  this.tickChildren(a);
  a = this.mParentSkeletalSprite;
  if(a.mCurrentAnimation) {
    var b = a.mCurrentAnimation.mAnimationData;
    if(b && b.bones && b.bones[this.mName]) {
      a = 0 > a.mTimeDilation ? !0 : !1;
      var c = this.mParentSkeletalSprite.mCurrentAnimationTime, d = b.bones[this.mName].rotate, e = b.bones[this.mName].translate, f = b.bones[this.mName].scale, b = {x:0, y:0, r:0, sx:this.mSetupPose.sx, sy:this.mSetupPose.sy}, g = {x:0, y:0, r:0, sx:this.mSetupPose.sx, sy:this.mSetupPose.sy}, h = {xy:0, r:0, s:0}, j = {xy:ss2d.Transitions.linear, r:ss2d.Transitions.linear, s:ss2d.Transitions.linear}, k = null, l = null, m = null, n = null, q = null, r = null;
      if(d) {
        for(var s = 0;s < d.length && null == k;s++) {
          d[s].time > c && (k = d[s], l = 0 == s ? d[d.length - 1] : d[s - 1])
        }
        l && k && (b.r = l.angle, g.r = k.angle, h.r = (c - l.time) / (k.time - l.time))
      }
      if(f) {
        for(s = 0;s < f.length && null == q;s++) {
          f[s].time > c && (q = f[s], r = 0 == s ? f[f.length - 1] : f[s - 1])
        }
        r && q && (b.sx = r.x, g.sx = q.x, b.sy = r.y, g.sy = q.y, h.s = (c - r.time) / (q.time - r.time))
      }
      if(e) {
        for(d = 0;d < e.length && null == m;d++) {
          e[d].time > c && (m = e[d], n = 0 == d ? e[e.length - 1] : e[d - 1])
        }
        n && m && (b.x = n.x, g.x = m.x, b.y = n.y, g.y = m.y, h.xy = (c - n.time) / (m.time - n.time))
      }
      a ? (h.xy = 1 - h.xy, h.r = 1 - h.r, h.s = 1 - h.s, this.interpolateBoneStates(g, b, h, j)) : this.interpolateBoneStates(b, g, h, j)
    }
  }
};
ss2d.Slot = function(a, b, c, d, e, f, g, h) {
  ss2d.Sprite.call(this, c, d, e, f, g, h);
  this.mName = b;
  this.mBone = a;
  this.mAuxBoneMatrix = new ss2d.Matrix3
};
goog.inherits(ss2d.Slot, ss2d.Sprite);
ss2d.Slot.prototype.getWorldTransformationMatrix = function(a, b, c) {
  var d = this.mParent;
  this.mParent = this.mBone;
  a = ss2d.DisplayObject.prototype.getWorldTransformationMatrix.call(this, a, b, c);
  this.mParent = d;
  return a
};
"webgl" != RENDER_CONTEXT && (ss2d.Slot.prototype.render = function(a) {
  this.mAuxBoneMatrix.identity();
  this.mBone.getWorldTransformationMatrix(this.mAuxBoneMatrix, this.mParent.mParent, !0);
  a.pushTransform(this.mAuxBoneMatrix);
  ss2d.Sprite.prototype.render.call(this, a);
  a.popTransform()
});
ss2d.Slot.prototype.tick = function() {
  var a = this.mBone.mParentSkeletalSprite;
  if(a.mCurrentAnimation) {
    var b = a.mCurrentAnimation.mAnimationData;
    if(b && b.slots && b.slots[this.mName]) {
      var c = b.slots[this.mName].attachment;
      if(c) {
        for(var d = a.mCurrentAnimationTime, b = null, e = 0;e < c.length && null == b;e++) {
          if(c[e].time > d) {
            e = 0 < e ? e - 1 : c.length - 1;
            b = c[e].name;
            break
          }
        }
        if(b) {
          this.setTexture(b, this.mTextureAtlas);
          c = null;
          try {
            c = a.mSkeleton.mSkeletonData.skins[a.mCurrentSkin]
          }catch(f) {
          }
          c && (a = c[this.mName][b], this.mLocation.mX = a.x || 0, this.mLocation.mY = a.y || 0, this.mRotation = a.rotation || 0, this.mWidth = a.width || 1, this.mHeight = a.height || 1, this.mPivotX = 0.5 * this.mWidth, this.mPivotY = 0.5 * this.mHeight)
        }
      }
    }
  }
};
ss2d.SkeletalSprite = function(a, b, c, d, e, f) {
  ss2d.DisplayObjectContainer.call(this, a, b);
  this.mScaleX = this.mScaleY = c;
  this.mBones = new ss2d.DisplayObjectContainer;
  this.addObject(this.mBones);
  this.mSlots = new ss2d.DisplayObjectContainer;
  this.addObject(this.mSlots);
  this.mSlotClass = f || ss2d.Slot;
  this.mBoneMap = {};
  this.mSlotMap = {};
  this.mAnimationsMap = {};
  this.mSkeleton = d || null;
  this.mBodyAtlas = e || null;
  this.mPlayOnce = !1;
  this.mTriggers = {};
  this.mShowBones = !1;
  this.mCurrentAnimationTime = 0;
  this.mCurrentAnimation = null;
  this.mCurrentAnimationName = "";
  this.mTimeDilation = 1;
  this.mCurrentSkin = "default";
  "string" == typeof d && (this.mSkeleton = ss2d.ResourceManager.loadSkeleton(d, this.setup, this))
};
goog.inherits(ss2d.SkeletalSprite, ss2d.DisplayObjectContainer);
ss2d.SkeletalSprite.prototype.setup = function(a) {
  this.mSkeleton = a;
  a = this.mSkeleton.mSkeletonData.bones;
  for(var b in a) {
    var c = a[b], d = this.mBones;
    c.parent && (d = this.mBoneMap[c.parent]);
    var e = new ss2d.Bone(this, c.name, c.x || 0, c.y || 0, c.scaleX || 1, c.scaleY || 1, c.rotation || 0, c.length || 0);
    this.mBoneMap[c.name] = e;
    d.addObject(e)
  }
  b = this.mSkeleton.mSkeletonData.slots;
  a = this.mSkeleton.mSkeletonData.skins["default"];
  for(var f in b) {
    c = b[f], c.attachment && (d = a[c.name][c.attachment], e = new this.mSlotClass(this.mBoneMap[c.bone], c.name, d.x || 0, d.y || 0, d.width || 1, d.height || 1, c.attachment, this.mBodyAtlas), e.mPivotX = 0.5 * e.mWidth, e.mPivotY = 0.5 * e.mHeight, e.mRotation = d.rotation || 0, this.mSlotMap[c.name] = e, this.mSlots.addObject(e))
  }
  if(this.mSkeleton.mIncludeAnimations) {
    for(var g in this.mSkeleton.mSkeletonData.animations) {
      f = new ss2d.SkeletalAnimation, f.setFromSkeleton(this.mSkeleton.mSkeletonData.animations[g]), this.mAnimationsMap[g] = f
    }
  }
};
ss2d.SkeletalSprite.prototype.setDefaultPose = function() {
  var a = this.mSkeleton.mSkeletonData.bones, b;
  for(b in a) {
    var c = a[b], d = this.mBoneMap[c.name];
    d.mLocation.mX = c.x || 0;
    d.mLocation.mY = c.y || 0;
    d.mRotation = c.rotation || 0;
    d.mScaleX = c.scaleX || 1;
    d.mScaleY = c.scaleY || 1
  }
};
ss2d.SkeletalSprite.prototype.setSkin = function(a) {
  this.mCurrentSkin = a || this.mCurrentSkin;
  if(a = this.mSkeleton.mSkeletonData.skins[this.mCurrentSkin]) {
    for(var b in slotList) {
      var c = slotList[b];
      if(c.attachment) {
        var d = a[c.name][c.attachment], e = this.mSlotMap[c.name];
        e.mLocation.mX = d.x || 0;
        e.mLocation.mY = d.y || 0;
        e.mRotation = d.rotation || 0;
        e.mWidth = d.width || 1;
        e.mHeight = d.height || 1;
        e.setTexture(c.attachment, this.mBodyAtlas);
        e.mPivotX = 0.5 * e.mWidth;
        e.mPivotY = 0.5 * e.mHeight
      }
    }
  }
};
ss2d.SkeletalSprite.prototype.addAnimation = function(a, b) {
  this.mAnimationsMap[a] = ss2d.ResourceManager.loadSkeletalAnimation(b)
};
ss2d.SkeletalSprite.prototype.playAnimation = function(a, b, c) {
  this.mCurrentAnimationName = a;
  this.mCurrentAnimationTime = b || 0;
  this.mPlayOnce = c || !1;
  this.mCurrentAnimation = this.mAnimationsMap[a] || null
};
ss2d.SkeletalSprite.prototype.addTrigger = function(a, b, c) {
  this.mTriggers[a] || (this.mTriggers[a] = []);
  this.mTriggers[a].push({time:b, callback:c})
};
ss2d.SkeletalSprite.prototype.stopAnimation = function() {
  this.mCurrentAnimationTime = 0;
  this.mCurrentAnimationName = "";
  this.mPlayOnce = !1;
  this.mCurrentAnimation = null;
  this.setDefaultPose()
};
ss2d.SkeletalSprite.prototype.updateAnimation = function(a) {
  var b = this.mCurrentAnimationTime;
  if(this.mCurrentAnimation && 0.01 < Math.abs(this.mTimeDilation)) {
    this.mCurrentAnimationTime += a * this.mTimeDilation;
    var c = !1;
    if(0 < this.mTimeDilation) {
      this.mCurrentAnimationTime >= this.mCurrentAnimation.mDuration && (this.mCurrentAnimationTime -= this.mCurrentAnimation.mDuration, c = !0);
      for(var d in this.mTriggers[this.mCurrentAnimationName]) {
        var e = this.mTriggers[this.mCurrentAnimationName][d];
        e.time > b && (e.time < this.mCurrentAnimationTime || c) && e.callback.call(this)
      }
    }
    if(0 > this.mTimeDilation) {
      for(d in 0 >= this.mCurrentAnimationTime && (this.mCurrentAnimationTime += this.mCurrentAnimation.mDuration, c = !0), this.mTriggers[this.mCurrentAnimationName]) {
        e = this.mTriggers[this.mCurrentAnimationName][d], e.time < b && (e.time > this.mCurrentAnimationTime || c) && e.callback.call(this)
      }
    }
    c && this.mPlayOnce && this.stopAnimation()
  }
  this.tickChildren(a);
  if(this.mCurrentAnimation && (this.mCurrentAnimationTime > 3 * this.mCurrentAnimation.mDuration || this.mCurrentAnimationTime < -3 * this.mCurrentAnimation.mDuration)) {
    this.mCurrentAnimationTime = 0
  }
};
ss2d.SkeletalSprite.prototype.tick = function(a) {
  this.updateAnimation(a)
};
ss2d.SkeletalSprite.prototype.render = function(a) {
  a.pushTransform(this);
  this.mSlots.render(a);
  this.mShowBones && this.mBones.render(a);
  a.popTransform()
};
ss2d.SkeletalSprite.prototype.hitTestPoint = function(a) {
  return this.mSlots.hitTestPoint(a)
};
ss2d.ParticleEmitter = function(a, b, c, d, e) {
  ss2d.Quad.call(this, a, b, c, d);
  this.mPivotX = 0.5 * this.mWidth;
  this.mPivotY = 0.5 * this.mHeight;
  if("webgl" != RENDER_CONTEXT) {
    throw"ss2d.ParticleEmitter requires WebGL Rendering Context";
  }
  if(!e) {
    throw"No particle system provided";
  }
  this.mParticleSystem = e;
  this.mActive = !1;
  this.mShowHitBox = !0;
  "string" == typeof e && (this.mParticleSystem = ss2d.ResourceManager.loadParticleSystem(e, this.setup, this))
};
goog.inherits(ss2d.ParticleEmitter, ss2d.Quad);
ss2d.ParticleEmitter.MAX_UPDATE_RATE = 100;
ss2d.ParticleEmitter.prototype.setup = function(a) {
  this.mParticleSystem = a;
  this.mTexture = this.mParticleSystem.mTexture;
  a = this.mParticleSystem.mSystemDescriptor;
  this.mSourcePosition = new ss2d.Point(parseFloat(a.sourcePosition["-x"]), parseFloat(a.sourcePosition["-y"]));
  this.mSourcePositionVariance = new ss2d.Point(parseFloat(a.sourcePositionVariance["-x"]), parseFloat(a.sourcePositionVariance["-y"]));
  this.mGravity = new ss2d.Point(parseFloat(a.gravity["-x"]), parseFloat(a.gravity["-y"]));
  this.mAngle = parseFloat(a.angle["-value"]);
  this.mAngleVariance = parseFloat(a.angleVariance["-value"]);
  this.mSpeed = parseFloat(a.speed["-value"]);
  this.mSpeedVariance = parseFloat(a.speedVariance["-value"]);
  this.mRadialAcceleration = parseFloat(a.radialAcceleration["-value"]);
  this.mTangentialAcceleration = parseFloat(a.tangentialAcceleration["-value"]);
  this.mRadialAccelVariance = parseFloat(a.radialAccelVariance["-value"]);
  this.mTangentialAccelVariance = parseFloat(a.tangentialAccelVariance["-value"]);
  this.mParticleLifeSpan = Math.max(0.08, parseFloat(a.particleLifeSpan["-value"]));
  this.mParticleLifespanVariance = parseFloat(a.particleLifespanVariance["-value"]);
  this.mStartParticleSize = parseFloat(a.startParticleSize["-value"]);
  this.mStartParticleSizeVariance = parseFloat(a.startParticleSizeVariance["-value"]);
  this.mFinishParticleSize = parseFloat(a.finishParticleSize["-value"]);
  this.mFinishParticleSizeVariance = parseFloat((a.finishParticleSizeVariance || a.FinishParticleSizeVariance)["-value"]);
  this.mMaxParticles = parseFloat(a.maxParticles["-value"]);
  this.mDuration = parseFloat(a.duration["-value"]);
  this.mRotationStart = parseFloat(a.rotationStart["-value"]);
  this.mRotationStartVariance = parseFloat(a.rotationStartVariance["-value"]);
  this.mRotationEnd = parseFloat(a.rotationEnd["-value"]);
  this.mRotationEndVariance = parseFloat(a.rotationEndVariance["-value"]);
  this.mBlendFuncSource = parseFloat(a.blendFuncSource["-value"]);
  this.mBlendFuncDestination = parseFloat(a.blendFuncDestination["-value"]);
  this.mStartColor = [parseFloat(a.startColor["-red"]), parseFloat(a.startColor["-green"]), parseFloat(a.startColor["-blue"]), parseFloat(a.startColor["-alpha"])];
  this.mStartColorVariance = [parseFloat(a.startColorVariance["-red"]), parseFloat(a.startColorVariance["-green"]), parseFloat(a.startColorVariance["-blue"]), parseFloat(a.startColorVariance["-alpha"])];
  this.mFinishColor = [parseFloat(a.finishColor["-red"]), parseFloat(a.finishColor["-green"]), parseFloat(a.finishColor["-blue"]), parseFloat(a.finishColor["-alpha"])];
  this.mFinishColorVariance = [parseFloat(a.finishColorVariance["-red"]), parseFloat(a.finishColorVariance["-green"]), parseFloat(a.finishColorVariance["-blue"]), parseFloat(a.finishColorVariance["-alpha"])];
  this.mMaxRadius = parseFloat(a.maxRadius["-value"]);
  this.mMaxRadiusVariance = parseFloat(a.maxRadiusVariance["-value"]);
  this.mMinRadius = parseFloat(a.minRadius["-value"]);
  this.mRotatePerSecond = parseFloat(a.rotatePerSecond["-value"]);
  this.mRotatePerSecondVariance = parseFloat(a.rotatePerSecondVariance["-value"]);
  this.mRadiusSpeed = 0;
  this.mRotation = -this.mAngle / (180 / Math.PI);
  this.mEmitterType = parseFloat(a.emitterType["-value"]);
  this.mParticleCount = 0;
  this.mEmissionRate = this.mMaxParticles / this.mParticleLifeSpan;
  this.mElapsedTime = this.mEmitCounter = 0;
  this.mUseTexture = !0;
  this.mParticleIndex = 0;
  this.mParticles = [];
  this.mParticleDataArray = new Float32Array(this.mMaxParticles);
  a = this.localToWorld(this.mLocation);
  a = ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(a);
  for(var b = 0;b < this.mMaxParticles;++b) {
    this.mParticles[b] = this.generateParticle(null, a, 0.0080 * b), this.mParticles[b].getPCBufferArray(this.mParticleDataArray, 24 * b)
  }
  this.mParticleCount = this.mMaxParticles;
  a = ss2d.CURRENT_VIEW.mContext;
  this.mParticleDataBuffer = ss2d.CURRENT_VIEW.mRenderSupport.createBuffer(a.ARRAY_BUFFER, new Float32Array(this.mParticleDataArray), 6, this.mParticleDataArray.length / 6, a.DYNAMIC_DRAW);
  this.mFreeParticles = [];
  this.mReady = !0;
  this.startEmitter()
};
ss2d.ParticleEmitter.prototype.startEmitter = function() {
  this.mActive = !0
};
ss2d.ParticleEmitter.prototype.stopEmitter = function() {
  this.mActive = !1
};
ss2d.ParticleEmitter.prototype.generateParticle = function(a, b, c) {
  if(!(this.mParticleCount >= this.mMaxParticles)) {
    a = a || new ss2d.Particle;
    c = c || 0;
    a.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime;
    a.mPosition.mX = b.mX + (2 * Math.random() - 1) * this.mSourcePositionVariance.mX;
    a.mPosition.mY = b.mY + (2 * Math.random() - 1) * this.mSourcePositionVariance.mY;
    a.mStartPos.mX = b.mX;
    a.mStartPos.mY = b.mY;
    b = this.mRotation + (2 * Math.random() - 1) * this.mAngleVariance / (180 / Math.PI);
    b = new ss2d.Point(Math.cos(b), Math.sin(b));
    var d = this.mSpeed + (2 * Math.random() - 1) * this.mSpeedVariance;
    a.mDirection = ss2d.Point.scalePoint(b, d);
    a.mRadius = this.mMaxRadius + (2 * Math.random() - 1) * this.mMaxRadiusVariance;
    a.mRadiusDelta = this.mMaxRadius / this.mParticleLifeSpan;
    a.mAngle = this.mRotation + (2 * Math.random() - 1) * this.mAngleVariance / (180 / Math.PI);
    a.mDegreesPerSecond = (this.mRotatePerSecond + (2 * Math.random() - 1) * this.mRotatePerSecondVariance) / (180 / Math.PI);
    a.mRadialAcceleration = this.mRadialAcceleration;
    a.mTangentialAcceleration = this.mTangentialAcceleration;
    a.mTimeToLive = Math.max(0, this.mParticleLifeSpan + this.mParticleLifespanVariance * (2 * Math.random() - 1)) + c;
    c = this.mStartParticleSize + this.mStartParticleSizeVariance * (2 * Math.random() - 1);
    b = this.mFinishParticleSize + this.mFinishParticleSizeVariance * (2 * Math.random() - 1);
    a.mParticleSizeDelta = (b - c) / this.mParticleLifeSpan / this.mTexture.mTextureElement.width;
    a.mParticleSize = Math.max(0, c);
    c = a.mColor;
    c[0] = this.mStartColor[0] + this.mStartColorVariance[0] * (2 * Math.random() - 1);
    c[1] = this.mStartColor[1] + this.mStartColorVariance[1] * (2 * Math.random() - 1);
    c[2] = this.mStartColor[2] + this.mStartColorVariance[2] * (2 * Math.random() - 1);
    c[3] = this.mStartColor[3] + this.mStartColorVariance[3] * (2 * Math.random() - 1);
    b = [];
    b[0] = this.mFinishColor[0] + this.mFinishColorVariance[0] * (2 * Math.random() - 1);
    b[1] = this.mFinishColor[1] + this.mFinishColorVariance[1] * (2 * Math.random() - 1);
    b[2] = this.mFinishColor[2] + this.mFinishColorVariance[2] * (2 * Math.random() - 1);
    b[3] = this.mFinishColor[3] + this.mFinishColorVariance[3] * (2 * Math.random() - 1);
    d = a.mDeltaColor;
    d[0] = (b[0] - c[0]) / a.mTimeToLive / this.mParticleLifeSpan;
    d[1] = (b[1] - c[1]) / a.mTimeToLive / this.mParticleLifeSpan;
    d[2] = (b[2] - c[2]) / a.mTimeToLive / this.mParticleLifeSpan;
    d[3] = (b[3] - c[3]) / a.mTimeToLive / this.mParticleLifeSpan;
    c = this.mRotationStart + this.mRotationStartVariance * (2 * Math.random() - 1);
    b = this.mRotationEnd + this.mRotationEndVariance * (2 * Math.random() - 1);
    a.mRotation = c;
    a.mRotationDelta = (b - c) / this.mParticleLifeSpan;
    this.mParticleCount++;
    return a
  }
};
"webgl" == RENDER_CONTEXT && (ss2d.ParticleEmitter.prototype.render = function(a) {
  if(this.mReady) {
    this.mPivotX = 0.5 * this.mWidth;
    this.mPivotY = 0.5 * this.mHeight;
    var b = a.mContext;
    b.blendFunc(this.mBlendFuncSource, this.mBlendFuncDestination);
    var c = a.mMaterials.mParticle;
    c.mActiveTexture = this.mTexture.mTextureId;
    c.mParticleDataBuffer = this.mParticleDataBuffer;
    c.mParticleDataArray = this.mParticleDataArray;
    c.apply(a);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.mBuffers.mParticlesQVI);
    b.drawElements(b.TRIANGLES, 6 * this.mMaxParticles, b.UNSIGNED_SHORT, 0);
    b.blendFunc(a.mDefaultBlendSource, a.mDefaultBlendDestination);
    this.mShowHitBox && (b = this.mAlpha, this.mAlpha = 0.5, ss2d.Quad.prototype.render.call(this, a), this.mAlpha = b)
  }
}, ss2d.ParticleEmitter.prototype.tick = function(a) {
  this.updateParticles(a)
}, ss2d.ParticleEmitter.prototype.updateParticles = function(a) {
  if(this.mReady) {
    var b = ss2d.CURRENT_VIEW.mContext;
    if(this.mActive && this.mEmissionRate) {
      var c = 1 / this.mEmissionRate;
      this.mEmitCounter += a;
      for(var d = [], e = this.localToWorld(this.mLocation), e = ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(e);this.mParticleCount < this.mMaxParticles && this.mEmitCounter > c;) {
        if(this.mEmitCounter -= c, 0 != this.mFreeParticles.length) {
          var f = this.mFreeParticles.pop(), g = this.generateParticle(this.mParticles[f], e), d = g.getArray(d), d = d.concat(d), d = d.concat(d);
          b.bindBuffer(b.ARRAY_BUFFER, this.mParticleDataBuffer);
          b.bufferSubData(b.ARRAY_BUFFER, 4 * 4 * f * ss2d.Particle.SRUCT_SIZE, new Float32Array(d))
        }
      }
      this.mElapsedTime += a;
      -1 != this.mDuration && this.mDuration < this.mElapsedTime && this.stopEmitter()
    }
    for(b = 0;b < this.mMaxParticles;++b) {
      if(g = this.mParticles[b], g.mTimeToLive -= a, g.mRadius -= g.mRadiusDelta * a, 0 >= g.mTimeToLive || 1 == this.mEmitterType && g.mRadius < this.mMinRadius) {
        this.mParticleCount--, this.mFreeParticles.push(b)
      }
    }
  }
});
ss2d.ServerView = function(a, b, c) {
  this.mRunning = !1;
  this.mFrameRate = c || 20;
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  this.mMainScene = a || new ss2d.DisplayObjectContainer;
  this.mMainScene.mParentView = this;
  this.mComunication = new ss2d.ServerCommunicationInterface(this, b);
  this.mSoundList = [];
  this.mPhysicalWorld = ss2d.PhysicalWorld.getWorld();
  this.mPreTickFunctions = [];
  this.mPostTickFunctions = [];
  this.mPreRenderFunctions = [];
  this.mPostRenderFunctions = [];
  this.mTotalTime = 0
};
ss2d.ServerView.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.ServerView.prototype.nextFrame = function() {
  var a = (new Date).getTime(), b = a - this.mLastFrameTimestamp, c = timePasse / 1E3;
  this.mTotalTime += c;
  for(var d in this.mPreTickFunctions) {
    this.mPreTickFunctions[d].call(null, c)
  }
  this.mMainScene.tick(c);
  for(d in this.mPostTickFunctions) {
    this.mPostTickFunctions[d].call(null, c)
  }
  c = Math.floor(Math.max(1, b / (1E3 / ss2d.PhysicalWorld.UPDATE_RATE)));
  for(d = 0;d < c;++d) {
    this.mPhysicalWorld.tick(b / c / 1E3)
  }
  this.mLastFrameTimestamp = a;
  a = ((new Date).getTime() - a) / 1E3;
  a = 1 / this.mFrameRate - a;
  this.mRunning && setTimeout(ss2d.ServerView.NEXT_FRAME_CALLER, 1E3 * a)
};
ss2d.ServerView.prototype.startLoop = function() {
  !this.mRunning && null != this.mMainScene && (this.mRunning = !0, this.nextFrame())
};
ss2d.ServerView.prototype.stopLoop = function() {
  this.mRunning = !1
};
var ss2dLib = {};

