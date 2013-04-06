/**
* @fileoverview SmoothStep2D Lib
* @copyright David Gallardo Moreno (portalg@gmail.com)
*/
var ss2d=ss2d||{}; var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function(b) {
  if(!COMPILED) {
    if(goog.isProvided_(b)) {
      throw Error('Namespace "' + b + '" already declared.');
    }
    delete goog.implicitNamespaces_[b];
    for(var c = b;(c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
      goog.implicitNamespaces_[c] = !0
    }
  }
  goog.exportPath_(b)
};
goog.setTestOnly = function(b) {
  if(COMPILED && !goog.DEBUG) {
    throw b = b || "", Error("Importing test-only code into non-debug environment" + b ? ": " + b : ".");
  }
};
COMPILED || (goog.isProvided_ = function(b) {
  return!goog.implicitNamespaces_[b] && !!goog.getObjectByName(b)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(b, c, d) {
  b = b.split(".");
  d = d || goog.global;
  !(b[0] in d) && d.execScript && d.execScript("var " + b[0]);
  for(var e;b.length && (e = b.shift());) {
    !b.length && goog.isDef(c) ? d[e] = c : d = d[e] ? d[e] : d[e] = {}
  }
};
goog.getObjectByName = function(b, c) {
  for(var d = b.split("."), e = c || goog.global, f;f = d.shift();) {
    if(goog.isDefAndNotNull(e[f])) {
      e = e[f]
    }else {
      return null
    }
  }
  return e
};
goog.globalize = function(b, c) {
  var d = c || goog.global, e;
  for(e in b) {
    d[e] = b[e]
  }
};
goog.addDependency = function(b, c, d) {
  if(!COMPILED) {
    var e;
    b = b.replace(/\\/g, "/");
    for(var f = goog.dependencies_, g = 0;e = c[g];g++) {
      f.nameToPath[e] = b, b in f.pathToNames || (f.pathToNames[b] = {}), f.pathToNames[b][e] = !0
    }
    for(e = 0;c = d[e];e++) {
      b in f.requires || (f.requires[b] = {}), f.requires[b][c] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(b) {
  if(!COMPILED && !goog.isProvided_(b)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var c = goog.getPathFromDeps_(b);
      if(c) {
        goog.included_[c] = !0;
        goog.writeScripts_();
        return
      }
    }
    b = "goog.require could not find: " + b;
    goog.global.console && goog.global.console.error(b);
    throw Error(b);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(b) {
  return b
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(b) {
  b.getInstance = function() {
    if(b.instance_) {
      return b.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = b);
    return b.instance_ = new b
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var b = goog.global.document;
  return"undefined" != typeof b && "write" in b
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var b = goog.global.document.getElementsByTagName("script"), c = b.length - 1;0 <= c;--c) {
        var d = b[c].src, e = d.lastIndexOf("?"), e = -1 == e ? d.length : e;
        if("base.js" == d.substr(e - 7, 7)) {
          goog.basePath = d.substr(0, e - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(b) {
  var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[b] && c(b) && (goog.dependencies_.written[b] = !0)
}, goog.writeScriptTag_ = function(b) {
  if(goog.inHtmlDocument_()) {
    var c = goog.global.document;
    if("complete" == c.readyState) {
      if(/\bdeps.js$/.test(b)) {
        return!1
      }
      throw Error('Cannot write "' + b + '" after document load');
    }
    c.write('<script type="text/javascript" src="' + b + '">\x3c/script>');
    return!0
  }
  return!1
}, goog.writeScripts_ = function() {
  function b(f) {
    if(!(f in e.written)) {
      if(!(f in e.visited) && (e.visited[f] = !0, f in e.requires)) {
        for(var h in e.requires[f]) {
          if(!goog.isProvided_(h)) {
            if(h in e.nameToPath) {
              b(e.nameToPath[h])
            }else {
              throw Error("Undefined nameToPath for " + h);
            }
          }
        }
      }
      f in d || (d[f] = !0, c.push(f))
    }
  }
  var c = [], d = {}, e = goog.dependencies_, f;
  for(f in goog.included_) {
    e.written[f] || b(f)
  }
  for(f = 0;f < c.length;f++) {
    if(c[f]) {
      goog.importScript_(goog.basePath + c[f])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(b) {
  return b in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[b] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(b) {
  var c = typeof b;
  if("object" == c) {
    if(b) {
      if(b instanceof Array) {
        return"array"
      }
      if(b instanceof Object) {
        return c
      }
      var d = Object.prototype.toString.call(b);
      if("[object Window]" == d) {
        return"object"
      }
      if("[object Array]" == d || "number" == typeof b.length && "undefined" != typeof b.splice && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == d || "undefined" != typeof b.call && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == c && "undefined" == typeof b.call) {
      return"object"
    }
  }
  return c
};
goog.isDef = function(b) {
  return void 0 !== b
};
goog.isNull = function(b) {
  return null === b
};
goog.isDefAndNotNull = function(b) {
  return null != b
};
goog.isArray = function(b) {
  return"array" == goog.typeOf(b)
};
goog.isArrayLike = function(b) {
  var c = goog.typeOf(b);
  return"array" == c || "object" == c && "number" == typeof b.length
};
goog.isDateLike = function(b) {
  return goog.isObject(b) && "function" == typeof b.getFullYear
};
goog.isString = function(b) {
  return"string" == typeof b
};
goog.isBoolean = function(b) {
  return"boolean" == typeof b
};
goog.isNumber = function(b) {
  return"number" == typeof b
};
goog.isFunction = function(b) {
  return"function" == goog.typeOf(b)
};
goog.isObject = function(b) {
  var c = typeof b;
  return"object" == c && null != b || "function" == c
};
goog.getUid = function(b) {
  return b[goog.UID_PROPERTY_] || (b[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(b) {
  "removeAttribute" in b && b.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete b[goog.UID_PROPERTY_]
  }catch(c) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(b) {
  var c = goog.typeOf(b);
  if("object" == c || "array" == c) {
    if(b.clone) {
      return b.clone()
    }
    var c = "array" == c ? [] : {}, d;
    for(d in b) {
      c[d] = goog.cloneObject(b[d])
    }
    return c
  }
  return b
};
goog.bindNative_ = function(b, c, d) {
  return b.call.apply(b.bind, arguments)
};
goog.bindJs_ = function(b, c, d) {
  if(!b) {
    throw Error();
  }
  if(2 < arguments.length) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var d = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(d, e);
      return b.apply(c, d)
    }
  }
  return function() {
    return b.apply(c, arguments)
  }
};
goog.bind = function(b, c, d) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(b, c) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var c = Array.prototype.slice.call(arguments);
    c.unshift.apply(c, d);
    return b.apply(this, c)
  }
};
goog.mixin = function(b, c) {
  for(var d in c) {
    b[d] = c[d]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function(b) {
  if(goog.global.execScript) {
    goog.global.execScript(b, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(b)
      }else {
        var c = goog.global.document, d = c.createElement("script");
        d.type = "text/javascript";
        d.defer = !1;
        d.appendChild(c.createTextNode(b));
        c.body.appendChild(d);
        c.body.removeChild(d)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(b, c) {
  var d = function(b) {
    return goog.cssNameMapping_[b] || b
  }, e = function(b) {
    b = b.split("-");
    for(var c = [], e = 0;e < b.length;e++) {
      c.push(d(b[e]))
    }
    return c.join("-")
  }, e = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? d : e : function(b) {
    return b
  };
  return c ? b + "-" + e(c) : e(b)
};
goog.setCssNameMapping = function(b, c) {
  goog.cssNameMapping_ = b;
  goog.cssNameMappingStyle_ = c
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(b, c) {
  var d = c || {}, e;
  for(e in d) {
    var f = ("" + d[e]).replace(/\$/g, "$$$$");
    b = b.replace(RegExp("\\{\\$" + e + "\\}", "gi"), f)
  }
  return b
};
goog.getMsgWithFallback = function(b) {
  return b
};
goog.exportSymbol = function(b, c, d) {
  goog.exportPath_(b, c, d)
};
goog.exportProperty = function(b, c, d) {
  b[c] = d
};
goog.inherits = function(b, c) {
  function d() {
  }
  d.prototype = c.prototype;
  b.superClass_ = c.prototype;
  b.prototype = new d;
  b.prototype.constructor = b
};
goog.base = function(b, c, d) {
  var e = arguments.callee.caller;
  if(e.superClass_) {
    return e.superClass_.constructor.apply(b, Array.prototype.slice.call(arguments, 1))
  }
  for(var f = Array.prototype.slice.call(arguments, 2), g = !1, h = b.constructor;h;h = h.superClass_ && h.superClass_.constructor) {
    if(h.prototype[c] === e) {
      g = !0
    }else {
      if(g) {
        return h.prototype[c].apply(b, f)
      }
    }
  }
  if(b[c] === e) {
    return b.constructor.prototype[c].apply(b, f)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(b) {
  b.call(goog.global)
};
ss2d.Point = function(b, c) {
  this.mX = b || 0;
  this.mY = c || 0
};
ss2d.Point.prototype.set = function(b, c) {
  this.mX = b || 0;
  this.mY = c || 0
};
ss2d.Point.prototype.length = function() {
  return Math.sqrt(this.mX * this.mX + this.mY * this.mY)
};
ss2d.Point.prototype.normalize = function() {
  var b = this.length();
  return ss2d.Point.scalePoint(this, 0 < b ? 1 / b : 0)
};
ss2d.Point.prototype.getX = function() {
  return this.mX
};
ss2d.Point.prototype.setX = function(b) {
  this.mX = b
};
ss2d.Point.prototype.getY = function() {
  return this.mY
};
ss2d.Point.prototype.setY = function(b) {
  this.mY = b
};
ss2d.Point.distanceBetweenPoints = function(b, c) {
  return Math.abs(Math.sqrt((c.mX - b.mX) * (c.mX - b.mX) + (c.mY - b.mY) * (c.mY - b.mY)))
};
ss2d.Point.addPoints = function(b, c) {
  return new ss2d.Point(b.mX + c.mX, b.mY + c.mY)
};
ss2d.Point.subtractPoints = function(b, c) {
  return new ss2d.Point(c.mX - b.mX, c.mY - b.mY)
};
ss2d.Point.scalePoint = function(b, c) {
  return new ss2d.Point(c * b.mX, c * b.mY)
};
ss2d.Point.dot = function(b, c) {
  return b.mX * c.mX + b.mY * c.mY
};
ss2d.Point.angle = function(b, c) {
  var d = ss2d.Point.dot(b, c), e = b.length() * c.length();
  return Math.acos(d / e)
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
ss2d.Matrix3.prototype.setValues = function(b, c, d, e, f, g) {
  this.mA = b;
  this.mB = c;
  this.mC = d;
  this.mD = e;
  this.mTx = f;
  this.mTy = g;
  return this
};
ss2d.Matrix3.prototype.clone = function() {
  var b = (new ss2d.Matrix3).setValues(this.mA, this.mB, this.mC, this.mD, this.mTx, this.mTy);
  b.mAB = this.mAB;
  b.mCD = this.mCD;
  b.mTxTy = this.mTxTy;
  return b
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
ss2d.Matrix3.prototype.concatMatrix = function(b) {
  return this.setValues(b.mA * this.mA + b.mC * this.mB, b.mB * this.mA + b.mD * this.mB, b.mA * this.mC + b.mC * this.mD, b.mB * this.mC + b.mD * this.mD, b.mA * this.mTx + b.mC * this.mTy + 1 * b.mTx, b.mB * this.mTx + b.mD * this.mTy + 1 * b.mTy)
};
ss2d.Matrix3.prototype.translate = function(b, c) {
  this.mTx += b;
  this.mTy += c;
  return this
};
ss2d.Matrix3.prototype.scale = function(b, c) {
  this.mA *= b;
  this.mB *= c;
  this.mC *= b;
  this.mD *= c;
  this.mTx *= b;
  this.mTy *= c;
  return this
};
ss2d.Matrix3.prototype.rotate = function(b) {
  var c = new ss2d.Matrix3;
  c.setValues(Math.cos(b), -Math.sin(b), Math.sin(b), Math.cos(b), 0, 0);
  return this.concatMatrix(c)
};
ss2d.Matrix3.prototype.transformPoint = function(b, c) {
  c || (c = new ss2d.Point(0, 0));
  var d = b.mX;
  c.mX = this.mA * b.mX + this.mC * b.mY + this.mTx;
  c.mY = this.mB * d + this.mD * b.mY + this.mTy;
  return c
};
ss2d.Matrix3.prototype.invert = function() {
  var b = this.determinant();
  this.setValues(this.mD / b, -this.mB / b, -this.mC / b, this.mA / b, (this.mC * this.mTy - this.mD * this.mTx) / b, (this.mB * this.mTx - this.mA * this.mTy) / b);
  return this
};
ss2d.Matrix3.prototype.getMatF32Array = function(b) {
  b = b || new Float32Array(9);
  b[0] = this.mA;
  b[1] = this.mB;
  b[2] = this.mAB;
  b[3] = this.mC;
  b[4] = this.mD;
  b[5] = this.mCD;
  b[6] = this.mTx;
  b[7] = this.mTy;
  b[8] = this.mTxTy;
  return b
};
ss2d.ShaderSource = function(b, c, d) {
  this.mShaderId = -1;
  b && (this.mName = b, this.mCallbackFunction = c || null, this.mCallbackTarget = d || null, b = new XMLHttpRequest, b.mShaderSource = this, b.open("GET", atlasJSONFileName, !0), b.responseType = "text", b.onload = function() {
    var b = ss2d.ShaderSource.getShaderType(this.mShaderSource.mName);
    if(!b) {
      throw"Unable to find the shader type for: " + this.mName;
    }
    this.mShaderSource.compileSource(this.response, b);
    this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this.mShaderSource)
  }, b.send())
};
ss2d.ShaderSource.VS_EXT = ["vert", "vs", "vertex"];
ss2d.ShaderSource.FS_EXT = ["frag", "fs", "fragment"];
ss2d.ShaderSource.prototype.compileSource = function(b, c) {
  var d = ss2d.CURRENT_VIEW.mContext;
  this.mShaderId = d.createShader(c);
  d.shaderSource(this.mShaderId, b);
  d.compileShader(this.mShaderId);
  if(!d.getShaderParameter(this.mShaderId, d.COMPILE_STATUS)) {
    throw d.getShaderInfoLog(this.mShaderId);
  }
  this.mCallbackFunction && this.mCallbackFunction.call(null, this);
  return this
};
ss2d.ShaderSource.getShaderType = function(b) {
  var c = ss2d.CURRENT_VIEW.mContext;
  b = b.split(".").pop();
  var d = null;
  -1 != ss2d.ShaderSource.VS_EXT.indexOf(b) ? d = c.VERTEX_SHADER : -1 != ss2d.ShaderSource.FS_EXT.indexOf(b) && (d = c.FRAGMENT_SHADER);
  return d
};
ss2d.ShaderProgram = function(b, c, d) {
  var e = ss2d.CURRENT_VIEW.mContext;
  this.mProgramId = e.createProgram();
  this.mUniforms = {};
  this.mAttributes = {};
  for(var f in b) {
    e.attachShader(this.mProgramId, b[f].mShaderId)
  }
  e.linkProgram(this.mProgramId);
  if(!e.getProgramParameter(this.mProgramId, e.LINK_STATUS)) {
    throw"Link error";
  }
  this.use(e);
  for(var g in c) {
    b = c[g], this.mUniforms[b] = e.getUniformLocation(this.mProgramId, b)
  }
  for(var h in d) {
    c = d[h], this.mAttributes[c] = e.getAttribLocation(this.mProgramId, c)
  }
  ss2d.ShaderProgram.PROGRAM_IN_USE = null
};
ss2d.ShaderProgram.PROGRAM_IN_USE = null;
ss2d.ShaderProgram.prototype.use = function(b) {
  if(ss2d.ShaderProgram.PROGRAM_IN_USE != this) {
    var c = ss2d.ShaderProgram.PROGRAM_IN_USE;
    if(null != c) {
      for(var d in c.mAttributes) {
        b.disableVertexAttribArray(c.mAttributes[d])
      }
    }
    for(d in this.mAttributes) {
      b.enableVertexAttribArray(this.mAttributes[d])
    }
    b.useProgram(this.mProgramId);
    ss2d.ShaderProgram.PROGRAM_IN_USE = this
  }
};
ss2d.materials = {};
ss2d.materials.GPUParticle = function(b) {
  var c = b.mContext;
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.GPUParticle.VERTEX_SOURCE, c.VERTEX_SHADER);
  c = (new ss2d.ShaderSource).compileSource(ss2d.materials.GPUParticle.FRAGMENT_SOURCE, c.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([b, c], ["uPMatrix", "uTotalTime", "uEmitterType", "uGravity", "uDeltaTime"], "aVertexPosition aPos_Dir aStartPos aColor aDeltaColor aRo_RoD_RaA_TaA aRa_RaD_A_DPS aPS_PSD_T_TS".split(" "));
  this.mActiveTexture = 0;
  this.mParticleDataBuffer = null;
  this.mEmitterType = 0;
  this.mGravity = [];
  this.mAuxF32Matrix = new Float32Array(9)
};
ss2d.materials.GPUParticle.prototype.updateParticle = function(b, c, d) {
  gl.bindBuffer(gl.ARRAY_BUFFER, support.mBuffers.mParticlesData);
  gl.bufferSubData(gl.ARRAY_BUFFER, 100 * d, c)
};
ss2d.materials.GPUParticle.prototype.apply = function(b) {
  var c = b.mContext;
  this.mShaderProgram.use(c);
  b.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, c.TEXTURE0);
  c.bindBuffer(c.ARRAY_BUFFER, b.mBuffers.mParticlesQVP);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, b.mBuffers.mParticlesQVP.itemSize, c.FLOAT, !1, 0, 0);
  c.uniform1f(this.mShaderProgram.mUniforms.uEmitterType, this.mEmitterType);
  c.uniform2fv(this.mShaderProgram.mUniforms.uGravity, this.mGravity);
  c.uniform1f(this.mShaderProgram.mUniforms.uTotalTime, ss2d.CURRENT_VIEW.mTotalTime);
  c.uniformMatrix3fv(this.mShaderProgram.mUniforms.uPMatrix, !1, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix));
  c.bindBuffer(c.ARRAY_BUFFER, this.mParticleDataBuffer);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aPos_Dir, 4, c.FLOAT, !1, 104, 0);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aStartPos, 2, c.FLOAT, !1, 104, 16);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aColor, 4, c.FLOAT, !1, 104, 24);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aDeltaColor, 4, c.FLOAT, !1, 104, 40);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aRo_RoD_RaA_TaA, 4, c.FLOAT, !1, 104, 56);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aRa_RaD_A_DPS, 4, c.FLOAT, !1, 104, 72);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aPS_PSD_T_TS, 4, c.FLOAT, !1, 104, 88)
};
ss2d.materials.GPUParticle.VERTEX_SOURCE = "const float EMITTER_TYPE_GRAVITY = 0.0;const float EMITTER_TYPE_RADIAL = 1.0;attribute vec2 aVertexPosition;attribute vec4 aPos_Dir;attribute vec2 aStartPos;attribute vec4 aColor;attribute vec4 aDeltaColor;attribute vec4 aRo_RoD_RaA_TaA;attribute vec4 aRa_RaD_A_DPS;attribute vec4 aPS_PSD_T_TS;uniform mat3 uPMatrix;uniform float uTotalTime;uniform float uDeltaTime;uniform float uEmitterType;uniform vec2 uGravity;varying vec4 vColor;varying vec2 vTextureCoord;void main(void){float timeLapse = (uTotalTime - aPS_PSD_T_TS.w);float sizeToZero = 1.0; if(timeLapse > aPS_PSD_T_TS.z){ sizeToZero = 0.0; }vec2 pos = vec2(aPos_Dir.x, aPos_Dir.y);float angle = aRa_RaD_A_DPS.y;float scaleMultiplier = 1.0;if(uEmitterType == EMITTER_TYPE_RADIAL){angle += aRa_RaD_A_DPS.w * timeLapse;pos += vec2(-cos(angle) * aRa_RaD_A_DPS.x, -sin(angle) * aRa_RaD_A_DPS.x);} else {vec2 tmp = vec2(0.0, 0.0);vec2 radial = vec2(0.0, 0.0);vec2 tangential = vec2(0.0, 0.0);vec2 diff = aStartPos - radial;pos -= diff;if(pos.x != 0.0 || pos.y != 0.0){radial = normalize(pos);}tangential = vec2(radial.x, radial.y);radial *= aRo_RoD_RaA_TaA.z;float newy = tangential.x;tangential.x = -tangential.y;tangential.y = newy;tangential *= aRo_RoD_RaA_TaA.w;vec2 direction = (radial + tangential + uGravity) * timeLapse;pos += ((vec2(aPos_Dir.z, aPos_Dir.w) * timeLapse) + direction);pos += diff;}vColor = aColor + (aDeltaColor * timeLapse);float size = aPS_PSD_T_TS.x + (aPS_PSD_T_TS.y * timeLapse);size *= scaleMultiplier;vTextureCoord = aVertexPosition;gl_Position = vec4((uPMatrix * vec3((aVertexPosition * size * sizeToZero) + pos - vec2(size * scaleMultiplier * 0.5, size * scaleMultiplier * 0.5), 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.GPUParticle.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;varying vec4 vColor;void main(void){vec4 color = texture2D(uSampler, vTextureCoord.xy);gl_FragData[0] = color * vColor;}";
ss2d.Defines = {};
var RENDER_CONTEXT = "2d", COMPILING_CLIENT = !1, COMPILING_SERVER = !1, COMPILING_OFFLINE = !0;
ss2d.materials.Textured = function(b) {
  var c = b.mContext;
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.Textured.VERTEX_SOURCE, c.VERTEX_SHADER);
  c = (new ss2d.ShaderSource).compileSource(ss2d.materials.Textured.FRAGMENT_SOURCE, c.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([b, c], ["uMVPMatrix", "uTMatrix", "uSampler", "uColor"], ["aVertexPosition", "aTextureCoord"]);
  this.mModelViewMatrix = new ss2d.Matrix3;
  this.mTextureCoordMatrix = new ss2d.Matrix3;
  this.mActiveTexture = 0;
  this.mColor = [];
  this.mTextureCoordBuffer = this.mVertexPositionBuffer = null;
  this.mAuxVec4Array = new Float32Array(4);
  this.mAuxMat3Array = new Float32Array(9)
};
ss2d.materials.Textured.prototype.apply = function(b) {
  var c = b.mContext;
  this.mShaderProgram.use(c);
  b.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, c.TEXTURE0);
  c.uniformMatrix3fv(this.mShaderProgram.mUniforms.uTMatrix, !1, this.mTextureCoordMatrix.getMatF32Array(this.mAuxMat3Array));
  b = this.mModelViewMatrix.clone().concatMatrix(ss2d.CURRENT_VIEW.mProjection);
  c.uniformMatrix3fv(this.mShaderProgram.mUniforms.uMVPMatrix, !1, b.getMatF32Array(this.mAuxMat3Array));
  c.uniform4fv(this.mShaderProgram.mUniforms.uColor, this.mColor);
  c.bindBuffer(c.ARRAY_BUFFER, this.mVertexPositionBuffer);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, this.mVertexPositionBuffer.itemSize, c.FLOAT, !1, 0, 0);
  c.bindBuffer(c.ARRAY_BUFFER, this.mTextureCoordBuffer);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aTextureCoord, this.mTextureCoordBuffer.itemSize, c.FLOAT, !1, 0, 0)
};
ss2d.materials.Textured.VERTEX_SOURCE = "attribute vec2 aVertexPosition;attribute vec2 aTextureCoord;uniform mat3 uMVPMatrix;varying vec2 vTextureCoord;void main(void){vTextureCoord = aTextureCoord;gl_Position = vec4((uMVPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.Textured.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;uniform mat3 uTMatrix;uniform vec4 uColor;varying vec2 vTextureCoord;void main(void){vec4 color = texture2D(uSampler, (uTMatrix * vec3(vTextureCoord, 1.0)).xy);gl_FragData[0] = color * uColor;}";
ss2d.materials.Particle = function(b) {
  var c = b.mContext;
  b = (new ss2d.ShaderSource).compileSource(ss2d.materials.Particle.VERTEX_SOURCE, c.VERTEX_SHADER);
  c = (new ss2d.ShaderSource).compileSource(ss2d.materials.Particle.FRAGMENT_SOURCE, c.FRAGMENT_SHADER);
  this.mShaderProgram = new ss2d.ShaderProgram([b, c], ["uPMatrix", "uScaleMatrix", "uSampler"], ["aVertexPosition", "aColor"]);
  this.mActiveTexture = 0;
  this.mParticleDataBuffer = null;
  this.mParticleDataArray = new ArrayBuffer;
  this.mAuxF32Matrix = new Float32Array(9)
};
ss2d.materials.Particle.prototype.apply = function(b) {
  var c = b.mContext;
  this.mShaderProgram.use(c);
  b.activeTextureForSampler(this.mActiveTexture, this.mShaderProgram.mUniforms.uSampler, c.TEXTURE0);
  c.bindBuffer(c.ARRAY_BUFFER, this.mParticleDataBuffer);
  c.bufferSubData(c.ARRAY_BUFFER, 0, this.mParticleDataArray);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aVertexPosition, 2, c.FLOAT, !1, 24, 0);
  c.vertexAttribPointer(this.mShaderProgram.mAttributes.aColor, 4, c.FLOAT, !1, 24, 8);
  c.uniformMatrix3fv(this.mShaderProgram.mUniforms.uPMatrix, !1, ss2d.CURRENT_VIEW.mProjection.getMatF32Array(this.mAuxF32Matrix))
};
ss2d.materials.Particle.VERTEX_SOURCE = "attribute vec2 aVertexPosition;attribute vec4 aColor;uniform mat3 uScaleMatrix;uniform mat3 uPMatrix;varying vec4 vColor;varying vec2 vTextureCoord;void main(void){vColor = aColor;vTextureCoord = aVertexPosition;gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}";
ss2d.materials.Particle.FRAGMENT_SOURCE = "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;varying vec4 vColor;void main(void){vec4 color = texture2D(uSampler, vTextureCoord.xy);gl_FragData[0] = color * vColor;}";
ss2d.RenderSupport = function(b) {
  this.mContext = b;
  this.mAuxMatrix = new ss2d.Matrix3;
  this.mAux2DCanvas = document.createElement("canvas");
  this.mAux2DContext = this.mAux2DCanvas.getContext("2d");
  this.mAux2DCanvas.width = this.mAux2DCanvas.height = 8;
  this.mAux2DContext.fillStyle = "#ffffff";
  this.mAux2DContext.fillRect(0, 0, 8, 8);
  this.mAux8x8Texture = new ss2d.Texture(this.mAux2DCanvas.toDataURL());
  "webgl" == RENDER_CONTEXT && (this.mMatrixStack = [], this.mCurrentMatrix = new ss2d.Matrix3, this.mColorStack = [], this.mCurrentColor = [1, 1, 1, 1], this.mActiveSampler = this.mActiveTexture = 0, b = this.mContext, this.mDefaultBlendSource = b.SRC_ALPHA, this.mDefaultBlendDestination = b.ONE_MINUS_SRC_ALPHA, b.blendFunc(this.mDefaultBlendSource, this.mDefaultBlendDestination), b.enable(b.BLEND), this.createBuiltInBuffers(), this.mMaterials = {}, this.mMaterials.mTextured = new ss2d.materials.Textured(this), 
  this.mMaterials.mParticle = new ss2d.materials.Particle(this), this.mMaterials.mGPUParticle = new ss2d.materials.GPUParticle(this))
};
ss2d.RenderSupport.prototype.pushTransform = function() {
};
ss2d.RenderSupport.prototype.popTransform = function() {
};
"webgl" == RENDER_CONTEXT ? (ss2d.RenderSupport.prototype.pushTransform = function(b, c) {
  c = c || [1, 1, 1, 1];
  b instanceof ss2d.DisplayObject && (b.getTransformationMatrix(), c = b.mColor.getF32Array(c, b.mAlpha));
  this.mColorStack.push(this.mCurrentColor.slice());
  this.mCurrentColor[0] *= c[0];
  this.mCurrentColor[1] *= c[1];
  this.mCurrentColor[2] *= c[2];
  this.mCurrentColor[3] *= c[3]
}, ss2d.RenderSupport.prototype.popTransform = function() {
  0 < this.mColorStack.length && (this.mCurrentColor = this.mColorStack.pop())
}, ss2d.RenderSupport.prototype.activeTextureForSampler = function(b, c, d) {
  if(this.mActiveTexture != b || this.mActiveSampler != c) {
    var e = this.mContext;
    this.mActiveTexture = b;
    this.mActiveSampler = c;
    e.activeTexture(d);
    e.bindTexture(e.TEXTURE_2D, this.mActiveTexture);
    e.uniform1i(this.mActiveSampler, 0)
  }
}, ss2d.RenderSupport.make2DProjection = function(b, c, d) {
  d = d || new ss2d.Matrix3;
  d.mA = 2 / b;
  d.mD = -2 / c;
  d.mTx = -1;
  d.mTy = 1;
  return d
}, ss2d.RenderSupport.prototype.createBuffer = function(b, c, d, e) {
  var f = this.mContext, g = f.createBuffer();
  f.bindBuffer(b, g);
  f.bufferData(b, c, f.STATIC_DRAW);
  g.itemSize = d;
  g.numItems = e;
  return g
}, ss2d.RenderSupport.prototype.createBuiltInBuffers = function() {
  var b = this.mContext;
  this.mBuffers = this.mBuffers || {};
  this.mBuffers.mQuadVertexPosition = this.createBuffer(b.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2, 4);
  this.mBuffers.mQuadTextureCoords = this.createBuffer(b.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2, 4);
  this.mBuffers.mQuadVertexIndex = this.createBuffer(b.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), 1, 6);
  for(var c = [], d = [], e = 0;2E3 > e;++e) {
    c = c.concat([0, 0, 1, 0, 1, 1, 0, 1]), d = d.concat([0 + 4 * e, 1 + 4 * e, 2 + 4 * e, 0 + 4 * e, 2 + 4 * e, 3 + 4 * e])
  }
  this.mBuffers.mParticlesQVP = this.createBuffer(b.ARRAY_BUFFER, new Float32Array(c), 2, c.length / 2);
  this.mBuffers.mParticlesQVI = this.createBuffer(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(d), 1, d.length)
}) : (ss2d.RenderSupport.prototype.pushTransform = function(b) {
  var c = b;
  b instanceof ss2d.DisplayObject && (c = b.getTransformationMatrix());
  this.mContext.save();
  this.mContext.globalAlpha *= b.mAlpha;
  this.mContext.transform(c.mA, c.mB, c.mC, c.mD, c.mTx, c.mTy)
}, ss2d.RenderSupport.prototype.popTransform = function() {
  this.mContext.restore()
});
ss2d.Texture = function(b, c, d) {
  this.mName = b;
  this.mTextureElement = new Image;
  this.mTextureElement.mTexture = this;
  this.mCallbackFunction = c || function() {
  };
  this.mCallbackTarget = d || null;
  this.mTextureElement.onload = function() {
    this.mTexture.handleLoadedTexture(this)
  };
  this.mTextureElement.src = b
};
ss2d.Texture.prototype.handleLoadedTexture = function() {
  this.mCallbackFunction.call(this.mCallbackTarget, this)
};
"webgl" == RENDER_CONTEXT && (ss2d.Texture.prototype.handleLoadedTexture = function(b) {
  try {
    var c = ss2d.CURRENT_VIEW.mContext, d = this.mTextureElement = b;
    this.mPOTWidth = d.width;
    this.mPOTHeight = d.height;
    var e = this.mTextureId = c.createTexture();
    c.bindTexture(c.TEXTURE_2D, e);
    if(!ss2d.Texture.isPowerOfTwo(d.width) || !ss2d.Texture.isPowerOfTwo(d.height)) {
      var f = document.createElement("canvas");
      f.width = this.mPOTWidth = ss2d.Texture.nextHighestPowerOfTwo(d.width);
      f.height = this.mPOTHeight = ss2d.Texture.nextHighestPowerOfTwo(d.height);
      f.getContext("2d").drawImage(d, 0, 0, d.width, d.height);
      d = f
    }
    c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, d);
    c.generateMipmap(c.TEXTURE_2D);
    c.bindTexture(c.TEXTURE_2D, null)
  }catch(g) {
    console.log(g)
  }
  this.mCallbackFunction.call(this.mCallbackTarget, this)
});
ss2d.Texture.prototype.getWidth = function() {
  return this.mTextureElement.width
};
ss2d.Texture.prototype.getHeight = function() {
  return this.mTextureElement.height
};
ss2d.Texture.isPowerOfTwo = function(b) {
  return 0 == (b & b - 1)
};
ss2d.Texture.nextHighestPowerOfTwo = function(b) {
  --b;
  for(var c = 1;32 > c;c <<= 1) {
    b |= b >> c
  }
  return b + 1
};
ss2d.TextureAtlas = function(b, c, d) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mCallbackTarget = d;
  this.mTexture = this.mAtlasDescriptor = null;
  c = new XMLHttpRequest;
  c.mAtlas = this;
  c.open("GET", b, !0);
  c.responseType = "text";
  c.onload = function() {
    this.mAtlas.atlasFileLoaded(this.response)
  };
  c.send()
};
ss2d.TextureAtlas.prototype.atlasFileLoaded = function(b) {
  this.mAtlasDescriptor = JSON.parse(b);
  b = this.mName.lastIndexOf("/") + 1;
  var c = this.mAtlasDescriptor.meta.image;
  b = 0 < b ? this.mName.substring(0, b) + c : c;
  this.mTexture = new ss2d.Texture(b, this.textureLoaded, this)
};
ss2d.TextureAtlas.prototype.textureLoaded = function(b) {
  this.mTexture = b;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.TextureAtlas.prototype.getClipFor = function(b, c) {
  c = c || [];
  var d = this.mAtlasDescriptor.frames[b].frame;
  d && (c[0] = d.x, c[1] = d.y, c[2] = d.w, c[3] = d.h);
  return c
};
ss2d.ILoader = {};
ss2d.ILoader.RESOURCE_EXTENSION = "";
ss2d.ILoader.loadResource = function() {
};
ss2d.TextureAtlasLoader = {};
ss2d.TextureAtlasLoader.RESOURCE_EXTENSION = "atlas";
ss2d.TextureAtlasLoader.loadResource = function(b, c, d) {
  return new ss2d.TextureAtlas(b, c, d)
};
ss2d.ReelFrame = function(b, c, d, e, f, g) {
  this.mX = b;
  this.mY = c;
  this.mWidth = d;
  this.mHeight = e;
  this.mOffsetX = f || 0;
  this.mOffsetY = g || 0
};
ss2d.ReelFrame.prototype.dumpClip = function(b) {
  b = b || Array(4);
  b[0] = this.mX;
  b[1] = this.mY;
  b[2] = this.mWidth;
  b[3] = this.mHeight;
  return b
};
ss2d.Reel = function(b, c) {
  this.mFrames = [];
  this.mName = b;
  this.mDuration = c
};
ss2d.Reel.prototype.getTimePerFrame = function() {
  return this.mFrames.length ? this.mDuration / this.mFrames.length : 0
};
ss2d.Reel.getFramesFromGrid = function(b, c, d, e, f, g) {
  f = f || [];
  for(var h = 0;h < e;h++) {
    var j = Math.floor(h / d);
    f.push([(h - j * d) * b, j * c, b, c, 0, 0])
  }
  b = JSON.stringify(f);
  if(g) {
    for(;-1 != b.indexOf("],[");) {
      b = b.replace("],[", "],\n[")
    }
  }
  return b
};
ss2d.Color = function(b, c) {
  this.setValue(b, c)
};
ss2d.Color.prototype.setValue = function(b, c) {
  if(b instanceof ss2d.Color) {
    this.mColorArray = b.mColorArray.slice(0)
  }else {
    if(b instanceof Array && 2 < b.length) {
      this.mColorArray = b.slice(0), c && (this.mColorArray[0] = 255 * b[0], this.mColorArray[1] = 255 * b[1], this.mColorArray[2] = 255 * b[2])
    }else {
      if("string" == typeof b || "number" == typeof b) {
        "string" == typeof b && (b = parseInt("0x" + b.replace("#", "").substring(0, 6))), b &= 16777215, this.mColorArray = [(b & 16711680) >> 16, (b & 65280) >> 8, b & 255]
      }
    }
  }
};
ss2d.Color.prototype.setRGB = function(b, c, d) {
  this.mColorArray[0] = b;
  this.mColorArray[1] = c;
  this.mColorArray[2] = d
};
ss2d.Color.prototype.getRed = function() {
  return this.mColorArray[0]
};
ss2d.Color.prototype.setRed = function(b) {
  this.mColorArray[0] = b
};
ss2d.Color.prototype.getGreen = function() {
  return this.mColorArray[1]
};
ss2d.Color.prototype.setGreen = function(b) {
  this.mColorArray[1] = b
};
ss2d.Color.prototype.getBlue = function() {
  return this.mColorArray[2]
};
ss2d.Color.prototype.setBlue = function(b) {
  this.mColorArray[2] = b
};
ss2d.Color.prototype.getRGBArray = function() {
  return this.mColorArray
};
ss2d.Color.prototype.getHexString = function() {
  var b = Math.floor(this.mColorArray[0]).toString(16), b = 1 == b.length ? "0" + b : b, c = Math.floor(this.mColorArray[1]).toString(16), c = 1 == c.length ? "0" + c : c, d = Math.floor(this.mColorArray[2]).toString(16), d = 1 == d.length ? "0" + d : d;
  return"#" + b + c + d
};
ss2d.Color.prototype.getRGBAString = function(b) {
  return"rgba(" + this.mColorArray[0] + "," + this.mColorArray[1] + "," + this.mColorArray[2] + "," + (b || "1.0") + ")"
};
ss2d.Color.prototype.getF32Array = function(b, c) {
  b = b || Array(3);
  b[0] = this.mColorArray[0] / 255;
  b[1] = this.mColorArray[1] / 255;
  b[2] = this.mColorArray[2] / 255;
  b[3] = c;
  return b
};
ss2d.Color.prototype.getF32 = function() {
  return(this.mColorArray[0] << 16) + (this.mColorArray[1] << 8) + this.mColorArray[2]
};
ss2d.Color.interpolate = function(b, c, d) {
  b = new ss2d.Color(b);
  c = new ss2d.Color(c);
  b.mColorArray[0] += (c.mColorArray[0] - b.mColorArray[0]) * d;
  b.mColorArray[1] += (c.mColorArray[1] - b.mColorArray[1]) * d;
  b.mColorArray[2] += (c.mColorArray[2] - b.mColorArray[2]) * d;
  delete c;
  return b
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
ss2d.DelayedInvocation = function(b, c, d, e) {
  this.mTarget = b;
  this.mMethods = c;
  this.mValues = d;
  this.mDelayTime = e;
  this.mPassedTime = 0;
  this.mComplete = !1
};
ss2d.DelayedInvocation.prototype.performCalls = function() {
  if(this.mMethods instanceof Array) {
    for(var b = 0;b < this.mMethods.lenght;++b) {
      this.callMethodWithValues(this.mMethods[b], this.mValues)
    }
  }else {
    this.callMethodWithValues(this.mMethods, this.mValues)
  }
};
ss2d.DelayedInvocation.prototype.callMethodWithValues = function(b, c) {
  c instanceof Array ? b.apply(this.mTarget, c) : b.call(this.mTarget, c)
};
ss2d.DelayedInvocation.prototype.tick = function(b) {
  this.mComplete || (this.mPassedTime += b, this.mPassedTime >= this.mDelayTime && (this.mComplete = !0, this.performCalls(), delete this.mValues, delete this.mMethods))
};
ss2d.DelayedInvocation.prototype.isComplete = function() {
  return this.mComplete
};
ss2d.Juggler = function() {
  this.mObjects = [];
  this.mElapsedTime = 0
};
ss2d.Juggler.prototype.tick = function(b) {
  this.mElapsedTime += b;
  for(var c = this.mObjects.slice(), d = 0;d < c.length;++d) {
    var e = c[d];
    e.tick(b);
    e.isComplete() && this.removeObject(e)
  }
};
ss2d.Juggler.prototype.addObject = function(b) {
  b && this.mObjects.push(b)
};
ss2d.Juggler.prototype.removeObject = function(b) {
  b = this.mObjects.indexOf(b);
  -1 < b && this.mObjects.splice(b, 1)
};
ss2d.Juggler.prototype.removeAllObjects = function() {
  this.mObjects.splice(0, this.mObjects.length)
};
ss2d.Juggler.prototype.removeObjectsWithTarget = function(b) {
  for(var c = [], d = 0;d < this.mObjects.length;++d) {
    var e = this.mObjects[d];
    e.mTarget != b && c.push(e)
  }
  delete this.mObjects;
  this.mObjects = c
};
ss2d.Juggler.prototype.delayInvocation = function(b, c, d, e) {
  this.addObject(new ss2d.DelayedInvocation(b, c, d, e))
};
ss2d.IAudioComponent = function() {
};
ss2d.IAudioComponent.prototype.play = function() {
};
ss2d.IAudioComponent.prototype.pause = function() {
};
ss2d.IAudioComponent.prototype.stop = function() {
};
ss2d.HTML5Audio = function(b, c) {
  this.mName = b;
  this.mAudioElement = new Audio;
  this.mAudioElement.mSound = this;
  this.mAudioElement.preload = !0;
  (this.mAudioElement.mCallbackFunction = c) && this.mAudioElement.addEventListener("canplay", function() {
    this.mCallbackFunction.call(null, this.mSound)
  });
  this.mAudioElement.addEventListener("ended", function() {
    this.mSound.stop()
  });
  this.mAudioElement.src = b
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
ss2d.Input = function(b) {
  this.mView = b;
  b = b.mCanvas;
  b.style.outline = "none";
  this.mView.mHaveFocus = !0;
  this.mMobileDevice = !1;
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
    this.mMobileDevice = !0
  }
  this.mMobileDevice || (window.navigator.msPointerEnabled ? window.addEventListener("MSPointerDown", ss2d.Input.windowMouseEventHandler, !0) : window.addEventListener("mousedown", ss2d.Input.windowMouseEventHandler, !0));
  window.addEventListener("keydown", ss2d.Input.handleEventCaller, !0);
  window.addEventListener("keyup", ss2d.Input.handleEventCaller, !0);
  window.navigator.msPointerEnabled ? (a.addEventListener("MSPointerDown", ss2d.Input.handleEventCaller, !0), a.addEventListener("MSPointerUp", ss2d.Input.handleEventCaller, !0), a.addEventListener("MSPointerMove", ss2d.Input.handleEventCaller, !0)) : (b.addEventListener("mousedown", ss2d.Input.handleEventCaller, !0), b.addEventListener("mouseup", ss2d.Input.handleEventCaller, !0), b.addEventListener("mousemove", ss2d.Input.handleEventCaller, !0));
  b.addEventListener("touchstart", ss2d.Input.handleEventCaller, !1);
  b.addEventListener("touchend", ss2d.Input.handleEventCaller, !1);
  b.addEventListener("touchcancel", ss2d.Input.handleEventCaller, !1);
  b.addEventListener("touchleave", ss2d.Input.handleEventCaller, !1);
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
ss2d.Input.handleEventCaller = function(b) {
  ss2d.CURRENT_VIEW.mInput.handleEvent(b)
};
ss2d.Input.windowMouseEventHandler = function(b) {
  b = b || window.event;
  var c = ss2d.CURRENT_VIEW.mInput;
  if("undefined" != typeof b.toElement && b.toElement != ss2d.CURRENT_VIEW.mCanvas || "undefined" != typeof b.target && b.target != ss2d.CURRENT_VIEW.mCanvas && c.mView.mHaveFocus) {
    c.onFocusOut()
  }else {
    c.mView.mHaveFocus = !0
  }
};
ss2d.Input.prototype.handleEvent = function(b) {
  b = b || window.event;
  var c = !0;
  switch(b.type) {
    case "mousedown":
    ;
    case "touchstart":
    ;
    case "MSPointerDown":
      c = this.onMouseDown(b);
      break;
    case "mouseup":
    ;
    case "touchend":
    ;
    case "touchcancel":
    ;
    case "MSPointerUp":
      c = this.onMouseUp(b);
      break;
    case "keydown":
      c = this.onKeyDown(b);
      break;
    case "keyup":
      c = this.onKeyUp(b);
      break;
    case "mousemove":
    ;
    case "touchmove":
    ;
    case "MSPointerMove":
      c = this.onMouseMove(b)
  }
  return c
};
ss2d.Input.prototype.onMouseDown = function(b) {
  var c = this.mMobileDevice ? window.event.targetTouches[0] : b;
  this.mMouseX = c.offsetX || c.pageX - this.mView.mCanvas.offsetLeft;
  this.mMouseY = c.offsetY || c.pageY - this.mView.mCanvas.offsetTop;
  this.mMousePoint.mX = this.mMouseX;
  this.mMousePoint.mY = this.mMouseY;
  if(this.mMobileDevice && c || !this.mMobileDevice) {
    this.onFocusIn(), this.mClicked = !0, b.preventDefault(), b.stopPropagation(), this.mView.mCanvas.addEventListener("touchmove", ss2d.Input.handleEventCaller, !1)
  }
  return!1
};
ss2d.Input.prototype.onMouseUp = function(b) {
  var c = this.mMobileDevice ? window.event.targetTouches[0] : b;
  if(this.mMobileDevice && !c || !this.mMobileDevice) {
    this.mClicked = this.mMouseDown = !1, b.preventDefault(), b.stopPropagation(), this.mView.mCanvas.removeEventListener("touchmove", ss2d.Input.handleEventCaller, !1)
  }
  return!1
};
ss2d.Input.prototype.onKeyDown = function(b) {
  return this.mView.mHaveFocus ? (this.mPressedKeys["_" + parseInt(b.keyCode)] = !0, (37 == b.keyCode || 38 == b.keyCode || 39 == b.keyCode || 40 == b.keyCode || 32 == b.keyCode) && b.preventDefault(), !1) : !0
};
ss2d.Input.prototype.onKeyUp = function(b) {
  this.mPressedKeys["_" + parseInt(b.keyCode)] = !1;
  delete this.mPressedKeys["_" + parseInt(b.keyCode)];
  return!this.mView.mHaveFocus
};
ss2d.Input.prototype.onFocusIn = function() {
  this.mView.mHaveFocus = !0
};
ss2d.Input.prototype.onFocusOut = function() {
  this.mClicked = this.mView.mHaveFocus = !1;
  if(this.mCleanKeysOnFocusOut) {
    for(var b in this.mPressedKeys) {
      this.mPressedKeys[b] = !1, delete this.mPressedKeys[b]
    }
  }
};
ss2d.Input.prototype.onMouseMove = function(b) {
  if(b = this.mMobileDevice ? window.event.targetTouches[0] : b) {
    this.mMouseX = b.offsetX || b.pageX - this.mView.mCanvas.offsetLeft, this.mMouseY = b.offsetY || b.pageY - this.mView.mCanvas.offsetTop, this.mMousePoint.mX = this.mMouseX, this.mMousePoint.mY = this.mMouseY
  }
};
ss2d.Input.prototype.isKeyPressed = function(b) {
  return null != this.mPressedKeys["_" + b] ? !0 : !1
};
ss2d.Input.prototype.getTransformedMousePoint = function() {
  return ss2d.CURRENT_VIEW.mMainScene instanceof ss2d.DisplayObjectContainer ? ss2d.CURRENT_VIEW.mMainScene.getTransformationMatrix().invert().transformPoint(this.mMousePoint) : this.mMousePoint
};
ss2d.Input.prototype.toJSON = function() {
  var b = this.getTransformedMousePoint();
  if(isNaN(b.mX) || isNaN(b.mY)) {
    b = this.mMousePoint
  }
  var c;
  c = "{" + ('"keys":' + JSON.stringify(this.mPressedKeys) + ",");
  c += '"mx":' + b.mX + ",";
  c += '"my":' + b.mY + ",";
  c += '"md":' + this.mMouseDown;
  return c + "}"
};
ss2d.Rectangle = function(b, c, d, e) {
  this.mX = b;
  this.mY = c;
  this.mWidth = d;
  this.mHeight = e
};
ss2d.Rectangle.prototype.setValues = function(b, c, d, e) {
  this.mX = b;
  this.mY = c;
  this.mWidth = d;
  this.mHeight = e;
  return this
};
ss2d.Rectangle.prototype.clone = function() {
  return new ss2d.Rectangle(this.mX, this.mY, this.mWidth, this.mHeight)
};
ss2d.Rectangle.prototype.toString = function() {
  return"(" + this.mX + "," + this.mY + "," + this.mWidth + "," + this.mHeight + ")"
};
ss2d.Rectangle.prototype.contains = function(b, c) {
  return b >= this.mX && c >= this.mY && b <= this.mX + this.mWidth && c <= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.containsPoint = function(b) {
  return this.contains(b.mX, b.mY)
};
ss2d.Rectangle.prototype.containsRectangle = function(b) {
  return b.mX >= this.mX && b.mX + b.mWidth <= this.mX + this.mWidth && b.mY >= this.mY && b.mY + b.mHeight <= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.intersectsRectangle = function(b) {
  var c = b.mX, d = b.mY, e = b.mWidth;
  b = b.mHeight;
  return!(c <= this.mX && c + e <= this.mX || c >= this.mX + this.mWidth && c + e >= this.mX + this.mWidth || d <= this.mY && d + b <= this.mY || d >= this.mY + this.mHeight && d + b >= this.mY + this.mHeight)
};
ss2d.Rectangle.prototype.intersectionWithRectangle = function(b, c) {
  if(!b) {
    return null
  }
  c = c || new ss2d.Rectangle(0, 0, 0, 0);
  var d = Math.max(this.mX, b.mX), e = Math.min(this.mX + this.mWidth, b.mX + b.mWidth), f = Math.max(this.mY, b.mY), g = Math.min(this.mY + this.mHeight, b.mY + b.mHeight);
  d > e || f > g || c.setValues(d, f, e - d, g - f);
  return c
};
ss2d.Rectangle.prototype.uniteWithRectangle = function(b) {
  targetRectangle || (targetRectangle = this.clone());
  if(!b) {
    return targetRectangle ? targetRectangle.setValues(this.mX, this.mY, this.mWidth, this.mHeight) : targetRectangle
  }
  var c = Math.min(this.mX, b.mX), d = Math.max(this.mX + this.mWidth, b.mX + b.mWidth), e = Math.min(this.mY, b.mY);
  b = Math.max(this.mY + this.mHeight, b.mY + b.mHeight);
  return targetRectangle.setValues(c, e, d - c, b - e)
};
ss2d.Object = {};
ss2d.Object.CLASSES = [];
ss2d.Object.OBJECT_COUNT = 0;
ss2d.Object.assignClassId = function(b, c) {
  b.prototype.CLASS_ID = c;
  ss2d.Object.CLASSES[c] = b
};
ss2d.Object.getObjectPrototype = function(b) {
  return ss2d.Object.CLASSES[b.cid]
};
ss2d.Object.convertStringToArrayBuffer = function(b) {
  return ss2d.Object.LZWCompressor.compress(b)
};
ss2d.Object.convertArrayBufferToString = function(b) {
  return ss2d.Object.LZWCompressor.decompress(b)
};
ss2d.Object.convertSceneObject = function(b) {
  ss2d.Object.CLASSES[treeObject.cid].convert(b);
  return b
};
ss2d.Object.backupAndDeleteObjectProperties = function(b) {
  var c = {};
  for(valueKey in b) {
    c[valueKey] = b[valueKey], delete b[valueKey]
  }
  return c
};
ss2d.Object.LZWCompressor = {compress:function(b) {
  var c, d = {}, e, f, g = "", h = [], j = 256;
  for(c = 0;256 > c;c += 1) {
    d[String.fromCharCode(c)] = c
  }
  for(c = 0;c < b.length;c += 1) {
    e = b.charAt(c), f = g + e, d.hasOwnProperty(f) ? g = f : (h.push(d[g]), d[f] = j++, g = String(e))
  }
  "" !== g && h.push(d[g]);
  return h
}, decompress:function(b) {
  var c, d = [], e, f, g;
  g = "";
  var h = 256;
  for(c = 0;256 > c;c += 1) {
    d[c] = String.fromCharCode(c)
  }
  f = e = String.fromCharCode(b[0]);
  for(c = 1;c < b.length;c += 1) {
    g = b[c];
    if(d[g]) {
      g = d[g]
    }else {
      if(g === h) {
        g = e + e.charAt(0)
      }else {
        return null
      }
    }
    f += g;
    d[h++] = e + g.charAt(0);
    e = g
  }
  return f
}};
ss2d.DisplayObject = function(b, c, d, e, f, g) {
  this.mLocation = new ss2d.Point(b || 0, c || 0);
  this.mRotation = e || 0;
  this.mPivotY = this.mPivotX = 0;
  this.mScaleX = d || 1;
  this.mScaleY = d || 1;
  this.mParent = null;
  this.mColor = f instanceof ss2d.Color ? f : new ss2d.Color(f || 16777215);
  this.mAlpha = g || 1;
  this.mObjectId = ss2d.Object.OBJECT_COUNT++;
  COMPILING_SERVER && (this.mSoundList = []);
  this.mInheritAlpha = this.mInheritColor = !0
};
ss2d.Object.assignClassId(ss2d.DisplayObject, 1001);
ss2d.DisplayObject.prototype.getTransformationMatrix = function(b) {
  b = b || new ss2d.Matrix3;
  (0 != this.mPivotX || 0 != this.mPivotY) && b.translate(-this.mPivotX, -this.mPivotY);
  (1 != this.mScaleX || 1 != this.mScaleY) && b.scale(this.mScaleX, this.mScaleY);
  0 != this.mRotation && b.rotate(this.mRotation);
  (0 != this.mLocation.mX || 0 != this.mLocation.mY) && b.translate(this.mLocation.mX, this.mLocation.mY);
  return b
};
ss2d.DisplayObject.prototype.getWorldTransformationMatrix = function(b, c, d) {
  var e = [], f = this;
  for(c = c || null;f && f.mParent != c;) {
    e.push(f.mParent), f = f.mParent
  }
  b = b || new ss2d.Matrix3;
  b = d ? this.getTransformationMatrix(b) : b;
  c = new ss2d.Matrix3;
  for(matIndex in e) {
    c.identity(), e[matIndex].getTransformationMatrix(c), b.concatMatrix(c)
  }
  return b
};
ss2d.DisplayObject.prototype.worldToLocal = function(b) {
  return this.getWorldTransformationMatrix().invert().transformPoint(b)
};
ss2d.DisplayObject.prototype.localToWorld = function(b) {
  return this.getWorldTransformationMatrix().transformPoint(b)
};
ss2d.DisplayObject.prototype.setGlobalLocation = function() {
  this.setLocation(this.worldToLocal(p))
};
ss2d.DisplayObject.prototype.setLocation = function() {
  this.mLocation.mX = p.mX;
  this.mLocation.mY = p.mY
};
ss2d.DisplayObject.prototype.collideWith = function(b) {
  var c = this.getBounds();
  b = b.getBounds();
  return c && b ? c.intersectsRectangle(b) : !1
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
COMPILING_CLIENT && (ss2d.DisplayObject.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.DisplayObject.call(b);
  b.__proto__ = ss2d.DisplayObject.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.DisplayObject.prototype.restoreSerializedProperties = function(b) {
  this.CLASS_ID = b.cid;
  this.mLocation.mX = b.x || this.mLocation.mX;
  this.mLocation.mY = b.y || this.mLocation.mY;
  this.mRotation = b.r || this.mRotation;
  this.mPivotX = b.px || this.mPivotX;
  this.mPivotY = b.py || this.mPivotY;
  this.mScaleX = b.sx || this.mScaleX;
  this.mScaleY = b.sy || this.mScaleY;
  this.mColor = new ss2d.Color(b.c) || this.mColor;
  this.mAlpha = b.a || this.mAlpha
}, ss2d.DisplayObject.createFromSerializedObject = function(b) {
  var c = new ss2d.DisplayObject(b.x, b.y, b.s, b.r, b.c);
  c.mObjectId = b.doid;
  return c
}, ss2d.DisplayObject.prototype.interpolateState = function(b, c, d, e) {
  this.mLocation.mX = b.x ? b.x + (c.x - b.x) * d : this.mLocation.mX;
  this.mLocation.mY = b.y ? b.y + (c.y - b.y) * d : this.mLocation.mY;
  this.mRotation = b.r ? b.r + (c.r - b.r) * d : this.mRotation;
  this.mPivotX = b.px ? b.px + (c.px - b.px) * d : this.mPivotX;
  this.mPivotY = b.py ? b.py + (c.py - b.py) * d : this.mPivotY;
  this.mScaleX = b.sx ? b.sx + (c.sx - b.sx) * d : this.mScaleX;
  this.mScaleY = b.sy ? b.sy + (c.sy - b.sy) * d : this.mScaleY;
  if(b.c) {
    var f = ss2d.Color.interpolate(b.c, c.c, d).getRGBArray();
    this.mColor.setRGB(f[0], f[1], f[2])
  }
  this.mAlpha = b.a ? b.a + (c.a - b.a) * d : this.mAlpha;
  this.playSoundList(b);
  this.tick && this.tick(e)
}, ss2d.DisplayObject.prototype.playSoundList = function(b) {
  var c = b.snds;
  if(null != c) {
    for(var d in c) {
      c = b.snds[childIndex];
      try {
        ss2d.ResourceManager.loadSound(c).play()
      }catch(e) {
      }
    }
    delete b.snds
  }
});
COMPILING_SERVER && (ss2d.DisplayObject.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.DisplayObject.prototype.getPropertiesJSON = function() {
  var b;
  b = "" + ('"cid":' + this.CLASS_ID + ",");
  b += '"doid":' + this.mObjectId + ",";
  b += '"x":' + Math.floor(1E3 * this.mLocation.mX) / 1E3 + ",";
  b += '"y":' + Math.floor(1E3 * this.mLocation.mY) / 1E3 + ",";
  b += '"r":' + Math.floor(100 * this.mRotation) / 100 + ",";
  b += '"px":' + this.mPivotX + ",";
  b += '"py":' + this.mPivotY + ",";
  b += '"sx":' + this.mScaleX + ",";
  b += '"sy":' + this.mScaleY + ",";
  b += '"c":' + JSON.stringify(this.mColor.getRGBArray()) + ",";
  b += '"a":' + this.mAlpha;
  return b += ',"snds":' + JSON.stringify(this.mSoundList)
});
ss2d.DisplayObject.prototype.getX = function() {
  return this.mLocation.mX
};
ss2d.DisplayObject.prototype.setX = function(b) {
  this.mLocation.mX = b
};
ss2d.DisplayObject.prototype.getY = function() {
  return this.mLocation.mY
};
ss2d.DisplayObject.prototype.setY = function(b) {
  this.mLocation.mY = b
};
ss2d.DisplayObject.prototype.getRotation = function() {
  return this.mRotation
};
ss2d.DisplayObject.prototype.setRotation = function(b) {
  return this.mRotation = b
};
ss2d.DisplayObject.prototype.getPivotX = function() {
  return this.mPivotX
};
ss2d.DisplayObject.prototype.setPivotX = function(b) {
  this.mPivotX = b
};
ss2d.DisplayObject.prototype.getPivotY = function() {
  return this.mPivotY
};
ss2d.DisplayObject.prototype.setPivotY = function(b) {
  this.mPivotY = b
};
ss2d.DisplayObject.prototype.getScaleX = function() {
  return this.ScaleX
};
ss2d.DisplayObject.prototype.setScaleX = function(b) {
  this.mScaleX = b
};
ss2d.DisplayObject.prototype.getScaleY = function() {
  return this.ScaleY
};
ss2d.DisplayObject.prototype.setScaleY = function(b) {
  this.mScaleY = b
};
ss2d.DisplayObject.prototype.getAlpha = function() {
  return this.mAlpha
};
ss2d.DisplayObject.prototype.setAlpha = function(b) {
  this.mAlpha = b
};
ss2d.Quad = function(b, c, d, e, f) {
  ss2d.DisplayObject.call(this, b, c, 1, 0, f, 1);
  this.mWidth = d || 10;
  this.mHeight = e || 10
};
goog.inherits(ss2d.Quad, ss2d.DisplayObject);
ss2d.Object.assignClassId(ss2d.Quad, 1003);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Quad.prototype.render = "webgl" == RENDER_CONTEXT ? function(b) {
    var c = b.mContext, d = b.mMaterials.mTextured, e = (new ss2d.Matrix3).scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix()).concatMatrix(this.getWorldTransformationMatrix(null, null));
    b.pushTransform(this);
    d.mModelViewMatrix = e;
    var e = b.mCurrentColor.slice(), f = this.mInheritAlpha ? b.mCurrentColor[3] : this.mAlpha;
    this.mInheritColor || this.mColor.getF32Array(e, f);
    d.mColor = e;
    d.mActiveTexture = b.mAux8x8Texture.mTextureId;
    d.mVertexPositionBuffer = b.mBuffers.mQuadVertexPosition;
    d.mTextureCoordBuffer = b.mBuffers.mQuadTextureCoords;
    d.apply(b);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b.mBuffers.mQuadVertexIndex);
    c.drawElements(c.TRIANGLES, b.mBuffers.mQuadVertexIndex.numItems, c.UNSIGNED_SHORT, 0);
    b.popTransform()
  } : function(b) {
    b.pushTransform(this);
    var c = b.mContext;
    c.fillStyle = this.mColor.getHexString();
    c.fillRect(0, 0, this.mWidth, this.mHeight);
    b.popTransform()
  }
}
ss2d.Quad.prototype.getWidth = function() {
  return this.mWidth
};
ss2d.Quad.prototype.getHeight = function() {
  return this.mHeight
};
ss2d.Quad.prototype.setWidth = function(b) {
  this.mWidth = b
};
ss2d.Quad.prototype.setHeight = function(b) {
  this.mHeight = b
};
ss2d.Quad.prototype.getBounds = function() {
  return new ss2d.Rectangle(this.mLocation.mX - this.mPivotX * this.mScaleX, this.mLocation.mY - this.mPivotY * this.mScaleY, this.getWidth() * this.mScaleX, this.getHeight() * this.mScaleY)
};
ss2d.Quad.prototype.hitTestPoint = function(b) {
  b = this.worldToLocal(b);
  return this.getBounds().containsPoint(b) ? this : null
};
COMPILING_CLIENT && (ss2d.Quad.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.Quad.call(b);
  b.__proto__ = ss2d.Quad.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.Quad.prototype.restoreSerializedProperties = function(b) {
  ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, b);
  this.mWidth = b.w || this.mWidth;
  this.mHeight = b.h || this.mHeight
}, ss2d.Quad.createFromSerializedObject = function(b) {
  var c = new ss2d.Quad(b.x, b.y, b.w, b.h, b.c);
  c.mObjectId = b.doid;
  return c
}, ss2d.Quad.prototype.interpolateState = function(b, c, d, e) {
  ss2d.DisplayObject.prototype.interpolateState.call(this, b, c, d, e);
  this.mWidth = b.w ? b.w + (c.w - b.w) * d : this.mWidth;
  this.mHeight = b.h ? b.h + (c.h - b.h) * d : this.mHeight
});
COMPILING_SERVER && (ss2d.Quad.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Quad.prototype.getPropertiesJSON = function() {
  var b = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",", b = b + ('"w": ' + this.getWidth() + ",");
  return b += '"h": ' + this.getHeight()
});
ss2d.Skeleton = function(b, c, d) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mCallbackTarget = d || null;
  this.mIncludeAnimations = !1;
  c = new XMLHttpRequest;
  c.mSkeleton = this;
  c.open("GET", b, !0);
  c.responseType = "text";
  c.onload = function() {
    this.mSkeleton.skeletonDataLoaded(this.response)
  };
  c.send()
};
ss2d.Skeleton.prototype.skeletonDataLoaded = function(b) {
  this.mSkeletonData = JSON.parse(b);
  ss2d.Skeleton.allDegToRad(this.mSkeletonData);
  this.mSkeletonData.animations && (this.mIncludeAnimations = !0);
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.Skeleton.allDegToRad = function(b) {
  var c = 1 / (180 / Math.PI), d;
  for(d in b) {
    "rotation" == d || "angle" == d ? b[d] *= c : "y" == d ? b[d] *= -1 : "object" == typeof b[d] && "scale" != d && ss2d.Skeleton.allDegToRad(b[d])
  }
};
ss2d.SkeletonLoader = {};
ss2d.SkeletonLoader.RESOURCE_EXTENSION = "skl";
ss2d.SkeletonLoader.loadResource = function(b, c, d) {
  return new ss2d.Skeleton(b, c, d)
};
ss2d.ParticleSystem = function(b, c, d) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mCallbackTarget = d;
  this.mTexture = this.mSystemDescriptor = null;
  c = new XMLHttpRequest;
  c.mSystem = this;
  c.open("GET", b, !0);
  c.responseType = "text";
  c.onload = function() {
    this.mSystem.loaded(this.response)
  };
  c.send()
};
ss2d.ParticleSystem.prototype.loaded = function(b) {
  this.mSystemDescriptor = (new XML.ObjTree).parseXML(b).particleEmitterConfig;
  var c = this.mName.lastIndexOf("/") + 1;
  b = this.mSystemDescriptor.texture["-name"];
  c = 0 < c ? this.mName.substring(0, c) + b : b;
  this.mTexture = ss2d.CURRENT_VIEW.mRenderSupport.mAux8x8Texture;
  0 < b.length && (this.mTexture = ss2d.ResourceManager.loadTexture(c, this.textureLoaded, this))
};
ss2d.ParticleSystem.prototype.textureLoaded = function(b) {
  this.mTexture = b;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.ParticleSystemLoader = {};
ss2d.ParticleSystemLoader.RESOURCE_EXTENSION = "particle";
ss2d.ParticleSystemLoader.loadResource = function(b, c, d) {
  return new ss2d.ParticleSystem(b, c, d)
};
ss2d.ReelSet = function(b, c, d) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mCallbackTarget = d || null;
  this.mReelSetDescriptor = null;
  this.mReels = {};
  this.mTexture = null;
  c = new XMLHttpRequest;
  c.mReelSet = this;
  c.open("GET", b, !0);
  c.responseType = "text";
  c.onload = function() {
    this.mReelSet.reelSetLoaded(this.response)
  };
  c.send()
};
ss2d.ReelSet.prototype.reelSetLoaded = function(b) {
  this.mReelSetDescriptor = JSON.parse(b);
  this.mReels = {};
  for(var c in this.mReelSetDescriptor.reels) {
    var d = this.mReelSetDescriptor.reels[c];
    b = new ss2d.Reel(c, d.duration);
    for(var d = d.frames, e = 0;e < d.length;++e) {
      var f = d[e];
      b.mFrames.push(new ss2d.ReelFrame(f[0], f[1], f[2], f[3], f[4], f[5]))
    }
    this.mReels[c] = b
  }
  c = this.mName.lastIndexOf("/") + 1;
  b = this.mReelSetDescriptor.image;
  c = 0 < c ? this.mName.substring(0, c) + b : b;
  this.mTexture = new ss2d.Texture(c, this.mCallbackFunction, this.mCallbackTarget)
};
ss2d.ReelSetLoader = {};
ss2d.ReelSetLoader.RESOURCE_EXTENSION = "reelset";
ss2d.ReelSetLoader.loadResource = function(b, c, d) {
  return new ss2d.ReelSet(b, c, d)
};
ss2d.SkeletalAnimation = function(b, c, d) {
  b && (this.mName = b, this.mCallbackFunction = c, this.mCallbackTarget = d || null, c = new XMLHttpRequest, c.mSkeletalAnimation = this, c.open("GET", b, !0), c.responseType = "text", c.onload = function() {
    this.mSkeletalAnimation.animationDataLoaded(this.response)
  }, c.send())
};
ss2d.SkeletalAnimation.prototype.animationDataLoaded = function(b) {
  this.mAnimationData = JSON.parse(b);
  ss2d.Skeleton.allDegToRad(this.mAnimationData);
  this.mDuration = ss2d.SkeletalAnimation.findMaxTime(this.mAnimationData, 0);
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.SkeletalAnimation.prototype.setFromSkeleton = function(b) {
  this.mAnimationData = b;
  this.mDuration = ss2d.SkeletalAnimation.findMaxTime(this.mAnimationData, 0)
};
ss2d.SkeletalAnimation.findMaxTime = function(b, c) {
  c = c || 0;
  for(var d in b) {
    "time" == d ? c = Math.max(b[d], c) : "object" == typeof b[d] && (c = ss2d.SkeletalAnimation.findMaxTime(b[d], c))
  }
  return c
};
ss2d.SkeletalAnimationLoader = {};
ss2d.SkeletalAnimationLoader.RESOURCE_EXTENSION = "sklanim";
ss2d.SkeletalAnimationLoader.loadResource = function(b, c, d) {
  return new ss2d.SkeletalAnimation(b, c, d)
};
ss2d.AudioLoader = {};
ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if("undefined" != typeof webkitAudioContext || "undefined" != typeof AudioContext) {
  ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio
}
ss2d.AudioLoader.RESOURCE_EXTENSION = "sound";
ss2d.AudioLoader.loadResource = function(b, c, d) {
  return new ss2d.AudioLoader.AUDIO_COMPONENT_CLASS(b, c, d)
};
var XML = {ObjTree:function() {
  return this
}};
XML.ObjTree.VERSION = "0.23";
XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
XML.ObjTree.prototype.attr_prefix = "-";
XML.ObjTree.prototype.parseXML = function(b) {
  var c;
  if(window.DOMParser) {
    c = new DOMParser;
    b = c.parseFromString(b, "application/xml");
    if(!b) {
      return
    }
    c = b.documentElement
  }else {
    window.ActiveXObject && (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.loadXML(b), c = c.documentElement)
  }
  if(c) {
    return this.parseDOM(c)
  }
};
XML.ObjTree.prototype.parseHTTP = function(b, c, d) {
  var e = {}, f;
  for(f in c) {
    e[f] = c[f]
  }
  e.method || (e.method = "undefined" == typeof e.postBody && "undefined" == typeof e.postbody && "undefined" == typeof e.parameters ? "get" : "post");
  if(d) {
    e.asynchronous = !0;
    var g = this, h = e.onComplete;
    e.onComplete = function(b) {
      var c;
      b && (b.responseXML && b.responseXML.documentElement) && (c = g.parseDOM(b.responseXML.documentElement));
      d(c, b);
      h && h(b)
    }
  }else {
    e.asynchronous = !1
  }
  var j;
  if("undefined" != typeof HTTP && HTTP.Request) {
    if(e.uri = b, b = new HTTP.Request(e)) {
      j = b.transport
    }
  }else {
    if("undefined" != typeof Ajax && Ajax.Request && (b = new Ajax.Request(b, e))) {
      j = b.transport
    }
  }
  if(d) {
    return j
  }
  if(j && j.responseXML && j.responseXML.documentElement) {
    return this.parseDOM(j.responseXML.documentElement)
  }
};
XML.ObjTree.prototype.parseDOM = function(b) {
  if(b) {
    this.__force_array = {};
    if(this.force_array) {
      for(var c = 0;c < this.force_array.length;c++) {
        this.__force_array[this.force_array[c]] = 1
      }
    }
    c = this.parseElement(b);
    this.__force_array[b.nodeName] && (c = [c]);
    if(11 != b.nodeType) {
      var d = {};
      d[b.nodeName] = c;
      c = d
    }
    return c
  }
};
XML.ObjTree.prototype.parseElement = function(b) {
  if(7 != b.nodeType) {
    if(3 == b.nodeType || 4 == b.nodeType) {
      return null == b.nodeValue.match(/[^\x00-\x20]/) ? void 0 : b.nodeValue
    }
    var c, d = {};
    if(b.attributes && b.attributes.length) {
      c = {};
      for(var e = 0;e < b.attributes.length;e++) {
        var f = b.attributes[e].nodeName;
        if("string" == typeof f) {
          var g = b.attributes[e].nodeValue;
          g && (f = this.attr_prefix + f, "undefined" == typeof d[f] && (d[f] = 0), d[f]++, this.addNode(c, f, d[f], g))
        }
      }
    }
    if(b.childNodes && b.childNodes.length) {
      f = !0;
      c && (f = !1);
      for(e = 0;e < b.childNodes.length && f;e++) {
        g = b.childNodes[e].nodeType, 3 == g || 4 == g || (f = !1)
      }
      if(f) {
        c || (c = "");
        for(e = 0;e < b.childNodes.length;e++) {
          c += b.childNodes[e].nodeValue
        }
      }else {
        c || (c = {});
        for(e = 0;e < b.childNodes.length;e++) {
          if(f = b.childNodes[e].nodeName, "string" == typeof f && (g = this.parseElement(b.childNodes[e]))) {
            "undefined" == typeof d[f] && (d[f] = 0), d[f]++, this.addNode(c, f, d[f], g)
          }
        }
      }
    }
    return c
  }
};
XML.ObjTree.prototype.addNode = function(b, c, d, e) {
  this.__force_array[c] ? (1 == d && (b[c] = []), b[c][b[c].length] = e) : 1 == d ? b[c] = e : 2 == d ? b[c] = [b[c], e] : b[c][b[c].length] = e
};
XML.ObjTree.prototype.writeXML = function(b) {
  b = this.hash_to_xml(null, b);
  return this.xmlDecl + b
};
XML.ObjTree.prototype.hash_to_xml = function(b, c) {
  var d = [], e = [], f;
  for(f in c) {
    if(c.hasOwnProperty(f)) {
      var g = c[f];
      f.charAt(0) != this.attr_prefix ? d[d.length] = "undefined" == typeof g || null == g ? "<" + f + " />" : "object" == typeof g && g.constructor == Array ? this.array_to_xml(f, g) : "object" == typeof g ? this.hash_to_xml(f, g) : this.scalar_to_xml(f, g) : e[e.length] = " " + f.substring(1) + '="' + this.xml_escape(g) + '"'
    }
  }
  e = e.join("");
  f = d.join("");
  "undefined" == typeof b || null == b || (f = 0 < d.length ? f.match(/\n/) ? "<" + b + e + ">\n" + f + "</" + b + ">\n" : "<" + b + e + ">" + f + "</" + b + ">\n" : "<" + b + e + " />\n");
  return f
};
XML.ObjTree.prototype.array_to_xml = function(b, c) {
  for(var d = [], e = 0;e < c.length;e++) {
    var f = c[e];
    d[d.length] = "undefined" == typeof f || null == f ? "<" + b + " />" : "object" == typeof f && f.constructor == Array ? this.array_to_xml(b, f) : "object" == typeof f ? this.hash_to_xml(b, f) : this.scalar_to_xml(b, f)
  }
  return d.join("")
};
XML.ObjTree.prototype.scalar_to_xml = function(b, c) {
  return"#text" == b ? this.xml_escape(c) : "<" + b + ">" + this.xml_escape(c) + "</" + b + ">\n"
};
XML.ObjTree.prototype.xml_escape = function(b) {
  return(b + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
ss2d.BitmapFont = function(b, c) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mTexture = this.mFontDescriptor = null;
  this.mMidHeight = this.mMidWidth = 0;
  var d = new XMLHttpRequest;
  d.mBitmapFont = this;
  d.open("GET", b, !0);
  d.responseType = "text";
  d.onload = function() {
    this.mBitmapFont.fontFileLoaded(this.response)
  };
  d.send()
};
ss2d.BitmapFont.prototype.fontFileLoaded = function(b) {
  this.mFontDescriptor = (new XML.ObjTree).parseXML(b);
  b = this.mFontDescriptor.font.chars["char"];
  for(var c = 0, d = 0, e = {}, f = 0;f < b.length;++f) {
    var g = b[f], c = c + parseInt(g["-xadvance"]), d = d + parseInt(g["-height"]);
    e[b[f]["-id"]] = g;
    g["-x"] = parseInt(g["-x"]);
    g["-xoffset"] = parseInt(g["-xoffset"]);
    g["-y"] = parseInt(g["-y"]);
    g["-width"] = parseInt(g["-width"]);
    g["-height"] = parseInt(g["-height"]);
    g["-xadvance"] = parseInt(g["-xadvance"]);
    g["-yoffset"] = parseInt(g["-yoffset"])
  }
  this.mFontDescriptor.mIndexedChars = e;
  this.mMidWidth = c / b.length;
  this.mMidHeight = d / b.length;
  b = this.mFontDescriptor.font.pages.page;
  b = b["-file"];
  c = this.mName.lastIndexOf("/") + 1;
  b = 0 < c ? this.mName.substring(0, c) + b : b;
  this.mTexture = new ss2d.Texture(b, this.fontTextureLoaded, this)
};
ss2d.BitmapFont.prototype.fontTextureLoaded = function(b) {
  this.mTexture = b;
  this.mCallbackFunction && this.mCallbackFunction.call(this.mCallbackTarget, this)
};
ss2d.BitmapFont.prototype.getGlyphClip = function(b, c) {
  c = c || [];
  var d = this.mFontDescriptor.mIndexedChars[b];
  d && (c[0] = d["-x"], c[1] = d["-y"], c[2] = d["-width"], c[3] = d["-height"], c[4] = d["-xadvance"], c[5] = d["-yoffset"]);
  return c
};
ss2d.BitmapFontLoader = {};
ss2d.BitmapFontLoader.RESOURCE_EXTENSION = "bmfont";
ss2d.BitmapFontLoader.loadResource = function(b, c, d) {
  return new ss2d.BitmapFont(b, c, d)
};
ss2d.TextureLoader = {};
ss2d.TextureLoader.RESOURCE_EXTENSION = "texture";
ss2d.TextureLoader.loadResource = function(b, c, d) {
  return new ss2d.Texture(b, c, d)
};
ss2d.ResourceManager = {};
ss2d.ResourceManager.LOADED_RESOURCES = {};
ss2d.ResourceManager.ELEMENTS_TO_LOAD = 0;
ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;
ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
};
ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
};
ss2d.ResourceManager.ACTIVE_LOADER = function(b) {
  throw"No active loader for: " + b;
};
ss2d.ResourceManager.Loaders = {TEXTURE:ss2d.TextureLoader, SOUND:ss2d.AudioLoader, TEXTURE_ATLAS:ss2d.TextureAtlasLoader, BITMAP_FONT:ss2d.BitmapFontLoader, REELSET:ss2d.ReelSetLoader, SKELETON:ss2d.SkeletonLoader, SKELETAL_ANIMATION:ss2d.SkeletalAnimationLoader, PARTICLE_SYSTEM:ss2d.ParticleSystemLoader};
ss2d.ResourceManager.loadResources = function(b, c, d) {
  if(b instanceof Array) {
    ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = d || function() {
    };
    ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = c || function() {
    };
    c = ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD = 0;
    for(resKey in b) {
      "object" == typeof b[resKey] && ++c
    }
    ss2d.ResourceManager.ELEMENTS_TO_LOAD = b.length - c;
    for(resKey in b) {
      c = b[resKey], "object" == typeof c ? ss2d.ResourceManager.ACTIVE_LOADER = c : ss2d.ResourceManager.loadResourceWithLoader(ss2d.ResourceManager.ACTIVE_LOADER, c, ss2d.ResourceManager.loadEndsCallback)
    }
    ss2d.ResourceManager.ACTIVE_LOADER = function(b) {
      throw"No active loader for: " + b;
    }
  }
};
ss2d.ResourceManager.loadResourceWithLoader = function(b, c, d, e) {
  var f = ss2d.ResourceManager.LOADED_RESOURCES, g = c + "." + b.RESOURCE_EXTENSION;
  f[g] ? d && d.call(e, f[g]) : f[g] = b.loadResource(c, d, e || null);
  return f[g]
};
ss2d.ResourceManager.loadEndsCallback = function(b) {
  ++ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD;
  ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK(b.mName, ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceManager.ELEMENTS_TO_LOAD);
  ss2d.ResourceManager.ELEMENTS_TO_LOAD == ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD && (console.log("Load resources ends"), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK.call(), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
  }, ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
  })
};
ss2d.ResourceManager.loadTexture = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureLoader, b, c, d)
};
ss2d.ResourceManager.loadTextureAtlas = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureAtlasLoader, b, c, d)
};
ss2d.ResourceManager.loadSound = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.AudioLoader, b, c, d)
};
ss2d.ResourceManager.loadBitmapFont = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.BitmapFontLoader, b, c, d)
};
ss2d.ResourceManager.loadReelSet = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.ReelSetLoader, b, c, d)
};
ss2d.ResourceManager.loadSkeleton = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.SkeletonLoader, b, c, d)
};
ss2d.ResourceManager.loadSkeletalAnimation = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.SkeletalAnimationLoader, b, c, d)
};
ss2d.ResourceManager.loadParticleSystem = function(b, c, d) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.ParticleSystemLoader, b, c, d)
};
ss2d.Sprite = function(b, c, d, e, f, g) {
  ss2d.Quad.call(this, b, c, d, e);
  if(COMPILING_CLIENT || COMPILING_OFFLINE) {
    "string" == typeof g ? g = ss2d.ResourceManager.loadTextureAtlas(g) : "string" == typeof f && !g && (f = ss2d.ResourceManager.loadTexture(f))
  }
  this.mTextureAtlas = g || null;
  this.mTexture = f || null;
  this.mClip = []
};
goog.inherits(ss2d.Sprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.Sprite, 1004);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Sprite.prototype.render = "webgl" == RENDER_CONTEXT ? function(b) {
    if(!(this.mTextureAtlas && -1 == this.mTextureAtlas.mTextureId) && (this.mTextureAtlas || -1 != this.mTexture.mTextureId)) {
      var c = this.mTexture;
      this.mTextureAtlas && (this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor) && (c = this.mTextureAtlas.mTexture, this.mTextureAtlas.getClipFor(this.mTexture, this.mClip));
      var d = b.mContext, e = b.mMaterials.mTextured, f = (new ss2d.Matrix3).scale(this.mWidth, this.mHeight).concatMatrix(this.getTransformationMatrix()).concatMatrix(this.getWorldTransformationMatrix(null, null));
      if(!this.mClip || 3 >= this.mClip.length) {
        this.mClip = [0, 0, c.mTextureElement.width, c.mTextureElement.height]
      }
      var g = new ss2d.Matrix3, h = c.mPOTWidth, j = c.mPOTHeight;
      g.scale(this.mClip[2] / h, this.mClip[3] / j);
      g.translate(this.mClip[0] / h, this.mClip[1] / j);
      b.pushTransform(this);
      e.mModelViewMatrix = f;
      f = b.mCurrentColor.slice();
      h = this.mInheritAlpha ? b.mCurrentColor[3] : this.mAlpha;
      this.mInheritColor || this.mColor.getF32Array(f, h);
      e.mColor = f;
      e.mTextureCoordMatrix = g;
      e.mActiveTexture = c.mTextureId;
      e.mVertexPositionBuffer = b.mBuffers.mQuadVertexPosition;
      e.mTextureCoordBuffer = b.mBuffers.mQuadTextureCoords;
      e.apply(b);
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, b.mBuffers.mQuadVertexIndex);
      d.drawElements(d.TRIANGLES, b.mBuffers.mQuadVertexIndex.numItems, d.UNSIGNED_SHORT, 0);
      b.popTransform()
    }
  } : function(b) {
    var c = null;
    this.mTextureAtlas ? this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor && (c = this.mTextureAtlas.mTexture.mTextureElement, this.mTextureAtlas.getClipFor(this.mTexture, this.mClip)) : c = this.mTexture.mTextureElement;
    b.pushTransform(this);
    var d = b.mContext;
    c && (3 < this.mClip.length ? d.drawImage(c, this.mClip[0], this.mClip[1], this.mClip[2], this.mClip[3], 0, 0, this.mWidth, this.mHeight) : d.drawImage(c, 0, 0, this.mWidth, this.mHeight));
    b.popTransform()
  }, ss2d.Sprite.prototype.setTexture = function(b, c) {
    "string" == typeof c ? c = ss2d.ResourceManager.loadTextureAtlas(c) : "string" == typeof b && !c && (b = ss2d.ResourceManager.loadTexture(b));
    this.mTextureAtlas = c || null;
    this.mTexture = b || null
  }
}
ss2d.Sprite.prototype.setClip = function(b, c, d, e) {
  b instanceof ss2d.Rectangle ? (this.mClip[0] = b.mX, this.mClip[1] = c.mY, this.mClip[2] = d.mWidth, this.mClip[3] = e.mHeight) : (this.mClip[0] = b, this.mClip[1] = c, this.mClip[2] = d, this.mClip[3] = e)
};
COMPILING_CLIENT && (ss2d.Sprite.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.Sprite.call(b);
  b.__proto__ = ss2d.Sprite.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.Sprite.prototype.restoreSerializedProperties = function(b) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, b);
  this.mTexture = this.mTexture || ss2d.ResourceManager.loadTexture(b.t);
  this.mClip = b.clip || null
}, ss2d.Sprite.createFromSerializedObject = function(b) {
  var c = new ss2d.Sprite(b.x, b.y, b.w, b.h, b.t, b.c);
  c.mObjectId = b.doid;
  return c
}, ss2d.Sprite.prototype.interpolateState = function(b, c, d, e) {
  ss2d.Quad.prototype.interpolateState.call(this, b, c, d, e);
  this.mTexture = b.t && b.t != this.mTexture.mName ? ss2d.ResourceManager.loadTexture(b.t) : this.mTexture;
  this.mClip = b.clip || this.mClip
});
COMPILING_SERVER && (ss2d.Sprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Sprite.prototype.getPropertiesJSON = function(b) {
  var c = ss2d.Quad.prototype.getPropertiesJSON.call(this);
  b && (c += ',"t": "' + this.mTexture.mName + '"');
  this.mClip && 3 < this.mClip.length && (c += ',"clip": ' + JSON.stringify(this.mClip));
  this.mPrevSerializedTexture = this.mTexture.mName;
  return c
});
ss2d.RigidBody = function(b, c, d) {
  if(!b) {
    throw"Rigid body component requires an owner";
  }
  this.mOwner = b;
  this.mBodyType = c || ss2d.RigidBody.Types.BOX;
  "undefined" == typeof d && (d = !0);
  this.mDyniamicBody = d;
  this.reset()
};
ss2d.RigidBody.Types = {BOX:1, CIRCLE:2, POLYGON:3};
ss2d.RigidBody.prototype.reset = function() {
  var b = ss2d.PhysicalWorld.getWorld();
  switch(this.mBodyType) {
    case ss2d.RigidBody.Types.BOX:
      var c = this.mOwner.getBounds();
      this.mOwner.mPivotX = 0.5 * c.mWidth;
      this.mOwner.mPivotY = 0.5 * c.mHeight;
      var d = this.mOwner.mLocation;
      this.mBody = b.createBox(d.mX, d.mY, 0.5 * c.mWidth, 0.5 * c.mHeight, !this.mDyniamicBody);
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
ss2d.ReelSprite = function(b, c, d, e, f) {
  ss2d.Sprite.call(this, b, c, 1, 1);
  this.mScaleX = this.mScaleY = d || 1;
  if(!e) {
    throw"Trying to create a sprite reel without specifying a ss2d.ReelSet";
  }
  this.mReelSetName = e;
  this.mPlayingReel = this.mReelSet = null;
  this.mDefaultReel = f || !1;
  this.mLoop = !0;
  this.mTimeDilation = 1;
  this.mComplete = this.mPlaying = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0;
  this.mTexture = null;
  this.mClip = [0, 0, 0, 0];
  this.mOffsetY = this.mOffsetX = 0;
  ss2d.ResourceManager.loadReelSet(e, this.setup, this)
};
goog.inherits(ss2d.ReelSprite, ss2d.Sprite);
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);
ss2d.ReelSprite.prototype.setup = function() {
  this.mReelSet = ss2d.ResourceManager.loadReelSet(this.mReelSetName);
  if(this.mDefaultReel) {
    this.playReel(this.mDefaultReel)
  }else {
    for(var b in this.mReelSet.mReels) {
      this.playReel(b);
      break
    }
  }
  this.mTexture = this.mReelSet.mTexture;
  this.mPlayingReel.mFrames[0].dumpClip(this.mClip)
};
ss2d.ReelSprite.prototype.playReel = function(b) {
  this.mReelSet && (this.mPlayingReel = b && this.mReelSet.mReels[b] ? this.mReelSet.mReels[b] : this.mPlayingReel, this.mPlayingReel.mFrames[0].dumpClip(this.mClip));
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
  ss2d.ReelSprite.prototype.tick = function(b) {
    this.updateReelAnimation(b)
  }, ss2d.ReelSprite.prototype.updateReelAnimation = function(b) {
    if(this.mPlaying && this.mReelSet) {
      this.mTexture || (this.mTexture = this.mReelSet.mTexture);
      var c = this.mPlayingReel.getTimePerFrame();
      this.mElapsedTimeCurrentFrame += b * Math.abs(this.mTimeDilation);
      if(0.01 < Math.abs(this.mTimeDilation) && this.mElapsedTimeCurrentFrame >= c && (b = Math.floor(this.mElapsedTimeCurrentFrame / c), 0 > this.mTimeDilation && (b *= -1), this.mFrameCount += b, this.mElapsedTimeCurrentFrame -= c, 0 < this.mTimeDilation && this.mFrameCount >= this.mPlayingReel.mFrames.length ? this.mLoop ? this.mElapsedTimeCurrentFrame = this.mFrameCount = 0 : (this.mFrameCount--, this.mComplete = !0, this.mPlaying = !1) : 0 > this.mTimeDilation && 0 > this.mFrameCount && (this.mLoop ? 
      (this.mFrameCount = this.mPlayingReel.mFrames.length - 1, this.mElapsedTimeCurrentFrame = 0) : (this.mFrameCount++, this.mComplete = !0, this.mPlaying = !1)), c = this.mPlayingReel.mFrames[this.mFrameCount])) {
        c.dumpClip(this.mClip), this.mOffsetX = c.mOffsetX, this.mOffsetY = c.mOffsetY, this.mWidth = this.mClip[2], this.mHeight = this.mClip[3]
      }
    }
  }, ss2d.ReelSprite.prototype.render = function(b) {
    this.mTexture && (this.mLocation.mX += this.mOffsetX, this.mLocation.mY += this.mOffsetY, ss2d.Sprite.prototype.render.call(this, b), this.mLocation.mX -= this.mOffsetX, this.mLocation.mY -= this.mOffsetY)
  }
}
;ss2d.DisplayObjectContainer = function(b, c, d, e) {
  ss2d.DisplayObject.call(this, b, c, d, e);
  this.mChildren = [];
  COMPILING_SERVER && (this.mRemovedObjectsIds = [])
};
goog.inherits(ss2d.DisplayObjectContainer, ss2d.DisplayObject);
ss2d.Object.assignClassId(ss2d.DisplayObjectContainer, 1002);
ss2d.DisplayObjectContainer.prototype.tick = function(b) {
  this.tickChildren(b)
};
ss2d.DisplayObjectContainer.prototype.tickChildren = function(b) {
  for(var c in this.mChildren) {
    this.mChildren[c].tick && this.mChildren[c].tick(b)
  }
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.DisplayObjectContainer.prototype.render = function(b) {
    b.pushTransform(this);
    for(var c in this.mChildren) {
      this.mChildren[c].render(b)
    }
    b.popTransform()
  }
}
ss2d.DisplayObjectContainer.prototype.addObject = function(b) {
  if(b instanceof Array) {
    for(var c in b) {
      this.addObject(b[c])
    }
  }else {
    b instanceof ss2d.DisplayObject && (b.mParent && b.mParent.removeObject(b), b.mParent = this, this.mChildren.push(b))
  }
};
ss2d.DisplayObjectContainer.prototype.removeObject = function(b) {
  if(b instanceof Array) {
    for(var c in b) {
      this.removeObject(b[c])
    }
  }else {
    c = this.mChildren.indexOf(b), -1 != c && (COMPILING_SERVER && this.mRemovedObjectsIds.push(b.mObjectId), this.mChildren.splice(c, 1)), b.mParent = null
  }
};
ss2d.DisplayObjectContainer.prototype.removeAll = function() {
  this.removeObject(this.mChildren.slice())
};
ss2d.DisplayObjectContainer.prototype.hitTestPoint = function(b) {
  for(var c = null, d = this.mChildren.length - 1;0 <= d && !c;--d) {
    c = this.mChildren[d].hitTestPoint(b)
  }
  return c
};
ss2d.DisplayObjectContainer.prototype.getBounds = function() {
  if(0 == this.mChildren.length) {
    var b = this.localToWorld(this.mLocation);
    return new ss2d.Rectangle(b.mX, b.mY)
  }
  for(var b = this.mChildren[0].getBounds(), c = b.mX, d = b.mY, e = b.mX + b.mWidth, f = b.mY + b.mHeight, g = 1;g < this.mChildren.length;++g) {
    b = this.mChildren[g].getBounds(), c = c < b.mX ? c : b.mX, d = d < b.mY ? d : b.mY, e = e > b.mX + b.mWidth ? e : b.mX + b.mWidth, f = f > b.mY + b.mHeight ? f : b.mY + b.mHeight
  }
  return new ss2d.Rectangle(c, d, (e - c) * this.mScaleX, (f - d) * this.mScaleY)
};
COMPILING_CLIENT && (ss2d.DisplayObjectContainer.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.DisplayObjectContainer.call(b);
  b.__proto__ = ss2d.DisplayObjectContainer.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.DisplayObjectContainer.prototype.restoreSerializedProperties = function(b) {
  ss2d.DisplayObject.prototype.restoreSerializedProperties.call(this, b);
  for(var c in b.clist) {
    var d = b.clist[c];
    ss2d.Object.CLASSES[d.cid].convert(d);
    this.addObject(d)
  }
}, ss2d.DisplayObjectContainer.createFromSerializedObject = function(b) {
  var c = new ss2d.DisplayObjectContainer(b.x, b.y);
  c.mObjectId = b.doid;
  return c
}, ss2d.DisplayObjectContainer.prototype.interpolateState = function(b, c, d, e, f) {
  f || ss2d.DisplayObject.prototype.interpolateState.call(this, b, c, d, e);
  b = b.clist;
  e = c.clist;
  f = c.rmobjts;
  for(c = 0;c < this.mChildren.length && 0 < f.length;++c) {
    var g = this.mChildren[c];
    -1 != f.indexOf(g.mObjectId) && (this.removeObject(g), delete b.splice(c, 1)[0], f.splice(f.indexOf(g.mObjectId), 1), delete g)
  }
  for(c = this.mChildren.length;c < b.length;++c) {
    f = ss2d.Object.getObjectPrototype(b[c]).createFromSerializedObject(b[c]), this.addObject(f)
  }
  for(c = 0;c < this.mChildren.length;++c) {
    b[c] && e[c] ? this.mChildren[c].interpolateState(b[c], e[c], d) : this.removeObject(this.mChildren[c])
  }
});
COMPILING_SERVER && (ss2d.DisplayObjectContainer.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.DisplayObjectContainer.prototype.getPropertiesJSON = function(b, c) {
  var d = "";
  c ? (d += '"cid":' + this.CLASS_ID + ",", d += '"doid":' + this.mObjectId + ",") : d += ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",";
  for(var d = d + '"clist":[', e = 0;e < this.mChildren.length;e++) {
    d += this.mChildren[e].toJSON(), e + 1 < this.mChildren.length && (d += ",")
  }
  d = d + "]" + (',"rmobjts":' + JSON.stringify(this.mRemovedObjectsIds));
  b || (delete this.mRemovedObjectsIds, this.mRemovedObjectsIds = []);
  return d
});
ss2d.MultiplayerScene = function() {
  ss2d.DisplayObjectContainer.call(this);
  this.mParentView = null
};
goog.inherits(ss2d.MultiplayerScene, ss2d.DisplayObjectContainer);
ss2d.Object.assignClassId(ss2d.MultiplayerScene, 1006);
COMPILING_CLIENT && (ss2d.MultiplayerScene.prototype.interpolateState = function(b, c, d, e) {
  ss2d.DisplayObjectContainer.prototype.interpolateState.call(this, b, c, d, e, !0);
  this.tick && this.tick(e)
});
COMPILING_SERVER && (ss2d.MultiplayerScene.prototype.tick = function(b) {
  this.tickChildren(b);
  this.mParentView.mComunication.broadcastSceneToClients(this)
}, ss2d.MultiplayerScene.prototype.onUserConnect = function() {
}, ss2d.MultiplayerScene.prototype.onUserDisconnect = function() {
}, ss2d.MultiplayerScene.prototype.onUserChangeName = function() {
}, ss2d.MultiplayerScene.prototype.onUserMessage = function() {
}, ss2d.MultiplayerScene.prototype.getPropertiesJSON = function() {
  return ss2d.DisplayObjectContainer.prototype.getPropertiesJSON.call(this, !0, !0)
});
ss2d.BitmapTextSprite = function(b, c, d, e, f) {
  ss2d.Quad.call(this, b, c, 0, 0);
  this.mTextString = d || "";
  this.mFontSize = f || 16;
  this.mDisplayChars = -1;
  this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(e);
  if(COMPILING_CLIENT || COMPILING_OFFLINE) {
    this.mGlyphSprite = new ss2d.Sprite, this.mClip = [], this.mDisplacement = new ss2d.Point, "webgl" == RENDER_CONTEXT && (this.mGlyphSprite.mParent = this)
  }
};
goog.inherits(ss2d.BitmapTextSprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.BitmapTextSprite, 1007);
ss2d.BitmapTextSprite.prototype.setDisplayChars = function(b) {
  this.mDisplayChars = Math.floor(b)
};
ss2d.BitmapTextSprite.prototype.getDisplayChars = function() {
  return this.mDisplayChars
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.BitmapTextSprite.prototype.render = function(b) {
    b.pushTransform(this);
    try {
      var c = this.mWidth = 0;
      this.mGlyphSprite.mTexture = this.mBitmapFont.mTexture;
      this.mScaleX = this.mScaleY = this.mFontSize / this.mBitmapFont.mMidHeight;
      for(var d = -1 < this.mDisplayChars ? Math.min(this.mDisplayChars, this.mTextString.length) : this.mTextString.length, e = 0;e < d;++e) {
        var f = this.mTextString.charCodeAt(e);
        32 == f ? c += 0.6 * this.mBitmapFont.mMidWidth : (this.mBitmapFont.getGlyphClip(f, this.mClip), this.mGlyphSprite.mClip = this.mClip, this.mGlyphSprite.mWidth = this.mClip[2], this.mGlyphSprite.mHeight = this.mClip[3], this.mDisplacement.mX = c, this.mDisplacement.mY = this.mClip[5], this.displacement(e, f, c, this.mClip[5], this.mDisplacement), this.mGlyphSprite.mLocation.mX = this.mDisplacement.mX, this.mGlyphSprite.mLocation.mY = this.mDisplacement.mY, this.mGlyphSprite.render(b), c += 
        this.mClip[4])
      }
      this.mWidth = c;
      this.mHeight = this.mFontSize / this.mScaleY
    }catch(g) {
    }
    b.popTransform()
  }
}
ss2d.BitmapTextSprite.prototype.displacement = function(b, c, d, e, f) {
  f.mX = d;
  f.mY = e
};
COMPILING_CLIENT && (ss2d.BitmapTextSprite.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.BitmapTextSprite.call(b);
  b.__proto__ = ss2d.BitmapTextSprite.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.BitmapTextSprite.prototype.restoreSerializedProperties = function(b) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, b);
  this.mTextString = b.str;
  this.mFontSize = b.fsize;
  this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(b.bmfname);
  this.mFontStyle = b.fstyle;
  this.mDisplayChars = b.dc
}, ss2d.BitmapTextSprite.createFromSerializedObject = function(b) {
  var c = new ss2d.BitmapTextSprite(b.x, b.y, b.str, b.bmfname, b.fsize);
  c.mObjectId = b.doid;
  return c
}, ss2d.BitmapTextSprite.prototype.interpolateState = function(b, c, d) {
  ss2d.Quad.prototype.interpolateState.call(this, b, c, d, deltaTime);
  this.mTextString = b.str;
  this.mFontSize = b.fsize;
  if(!this.mBitmapFont || this.mBitmapFont.mName != b.bmfname) {
    this.mBitmapFont = ss2d.ResourceManager.loadBitmapFont(b.bmfname)
  }
  this.mDisplayChars = Math.floor(b.dc + (c.dc - b.dc) * d)
});
COMPILING_SERVER && (ss2d.BitmapTextSprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.BitmapTextSprite.prototype.getPropertiesJSON = function() {
  var b = ss2d.Quad.prototype.getPropertiesJSON.call(this), b = b + (',"str": "' + this.mTextString + '"'), b = b + (',"fsize": "' + this.mFontSize + '"'), b = b + (',"bmfname": "' + this.mBitmapFont.mName + '"');
  return b += ',"dc": "' + this.mDisplayChars + '"'
});
ss2d.Transitions = {};
ss2d.Transitions.linear = function(b) {
  return b
};
ss2d.Transitions.easeIn = function(b) {
  return b * b * b
};
ss2d.Transitions.easeOut = function(b) {
  b -= 1;
  return b * b * b + 1
};
ss2d.Transitions.easeInOut = function(b) {
  return 0.5 > b ? 0.5 * ss2d.Transitions.easeIn(2 * b) : 0.5 * ss2d.Transitions.easeOut(2 * (b - 0.5)) + 0.5
};
ss2d.Transitions.easeOutIn = function(b) {
  return 0.5 > b ? 0.5 * ss2d.Transitions.easeOut(2 * b) : 0.5 * ss2d.Transitions.easeIn(2 * (b - 0.5)) + 0.5
};
ss2d.TweenedProperty = function(b, c, d, e) {
  this.mTarget = b;
  this.mGetterMethod = c;
  this.mSetterMethod = d;
  this.mStartValue = this.currentValue();
  this.mEndValue = e
};
ss2d.TweenedProperty.prototype.currentValue = function() {
  return this.mGetterMethod.call(this.mTarget)
};
ss2d.TweenedProperty.prototype.setCurrentValue = function(b) {
  this.mSetterMethod.call(this.mTarget, b)
};
ss2d.TweenedProperty.prototype.setTargetValue = function() {
  this.mSetterMethod.call(this.mTarget, this.mEndValue)
};
ss2d.TweenedProperty.prototype.delta = function() {
  return this.mEndValue - this.mStartValue
};
ss2d.Tween = function(b, c, d, e, f) {
  this.mTarget = b;
  this.mProperties = [];
  this.mTransitionMethod = ss2d.Transitions.linear;
  d && (this.mTransitionMethod = d);
  this.mTotalTime = c;
  this.mCurrentTime = -e;
  this.mDelay = 0;
  e && (this.mDelay = e);
  this.mLoopCount = 0;
  this.mLoop = ss2d.Tween.LoopType.NONE;
  f && (this.mLoop = f)
};
ss2d.Tween.LoopType = {NONE:0, REPEAT:1, REVERSE:2};
ss2d.Tween.prototype.animateProperty = function(b, c, d) {
  this.mProperties.push(new ss2d.TweenedProperty(this.mTarget, b, c, d))
};
ss2d.Tween.prototype.moveTo = function(b, c) {
  this.animateProperty(this.mTarget.getX, this.mTarget.setX, b);
  this.animateProperty(this.mTarget.getY, this.mTarget.setY, c)
};
ss2d.Tween.prototype.resizeTo = function(b, c) {
  this.animateProperty(this.mTarget.getWidth, this.mTarget.setWidth, b);
  this.animateProperty(this.mTarget.getHeight, this.mTarget.setHeight, c)
};
ss2d.Tween.prototype.fadeTo = function(b) {
  this.animateProperty(this.mTarget.getAlpha, this.mTarget.setAlpha, b)
};
ss2d.Tween.prototype.tick = function(b) {
  if(!(0 == b || this.mLoop == ss2d.Tween.LoopType.NONE && this.mCurrentTime >= this.mTotalTime)) {
    this.mCurrentTime >= this.mTotalTime && (this.mCurrentTime = 0, this.mLoopCount++);
    var c = this.mCurrentTime, d = this.mTotalTime - this.mCurrentTime, d = b > d ? b - d : 0;
    this.mCurrentTime = Math.min(this.mTotalTime, this.mCurrentTime + b);
    if(!(0 >= this.mCurrentTime)) {
      b = this.mCurrentTime / this.mTotalTime;
      for(var e = this.mLoop == ss2d.Tween.LoopType.REVERSE && 1 == this.mLoopCount % 2, f = 0;f < this.mProperties.length;++f) {
        var g = this.mProperties[f];
        0 >= c && 0 < this.mCurrentTime && (g.mStartValue = g.currentValue());
        var h = e ? 1 - this.mTransitionMethod(1 - b) : this.mTransitionMethod(b);
        g.setCurrentValue(g.mStartValue + g.delta() * h)
      }
      if(c < this.mTotalTime && this.mCurrentTime >= this.mTotalTime) {
        if(this.mLoop == ss2d.Tween.LoopType.REPEAT) {
          for(f = 0;f < this.mProperties.length;++f) {
            g = this.mProperties[f], g.setCurrentValue(g.mStartValue)
          }
        }else {
          if(this.mLoop == ss2d.Tween.LoopType.REVERSE) {
            for(f = 0;f < this.mProperties.length;++f) {
              g = this.mProperties[f], g.setCurrentValue(g.mEndValue), g.mEndValue = g.mStartValue
            }
          }
        }
      }
      this.tick(d)
    }
  }
};
ss2d.Tween.prototype.isComplete = function() {
  return this.mCurrentTime >= this.mTotalTime && this.mLoop == ss2d.Tween.LoopType.NONE
};
ss2d.Tween.prototype.setDelay = function(b) {
  this.mCurrentTime = this.mCurrentTime + this.mDelay - b;
  this.mDelay = b
};
ss2d.InputProxy = function() {
  this.mPressedKeys = {};
  this.mMouseY = this.mMouseX = -50;
  this.mPreviousMouseY = this.mPreviousMouseX = 0;
  this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
  this.mPreviousMousePoint = new ss2d.Point(this.mPreviousMouseX, this.mPreviousMouseY);
  this.mPreviousMouseDown = this.mMouseDown = !1
};
ss2d.InputProxy.prototype.updateFromClient = function(b) {
  this.mPreviousMouseX = this.mMouseX;
  this.mPreviousMouseY = this.mMouseY;
  this.mPreviousMousePoint.mX = this.mPreviousMouseX;
  this.mPreviousMousePoint.mY = this.mPreviousMouseY;
  this.mPreviousMouseDown = this.mMouseDown;
  this.mMouseDown = this.mClicked;
  this.mPressedKeys = b.keys;
  this.mMouseX = b.mx;
  this.mMouseY = b.my;
  this.mMouseDown = b.md;
  this.mMousePoint.mX = this.mMouseX;
  this.mMousePoint.mY = this.mMouseY
};
ss2d.InputProxy.prototype.isKeyPressed = function(b) {
  return null != this.mPressedKeys["_" + b] ? !0 : !1
};
ss2d.ServerCommunicationInterface = function(b, c, d) {
  this.mUserLimit = d || 30;
  this.mWebSocketModule = require("websocket").server;
  this.mHTTPModule = require("http");
  this.mServerView = b;
  this.mUserConnections = [];
  this.mHTTPServer = this.mHTTPModule.createServer(function() {
  });
  b = {};
  b.httpServer = this.mHTTPServer;
  this.mWebSocketServer = new this.mWebSocketModule(b);
  this.mWebSocketServer.mInterface = this;
  this.mWebSocketServer.on("request", function(b) {
    console.log("a user log in");
    b = b.accept(null, b.origin);
    this.mInterface.mUserConnections.length >= this.mInterface.mUserLimit ? (console.log("user rejected"), b.send('["REJECTED","Too many players connected."]'), b.close()) : (this.mInterface.mUserConnections.push(b), b.mUserName = "", b.mServer = this, b.mInput = new ss2d.InputProxy, b.mConnectionId = ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT++, b.mErrorCount = 0, this.mInterface.mServerView.mMainScene.onUserConnect(b), b.on("message", function(b) {
      try {
        var c = JSON.parse(b.utf8Data);
        this.mServer.mInterface.processClientCommand(c, this)
      }catch(d) {
        this.mErrorCount++, console.log("Exception " + d), 4 < this.mErrorCount && this.close()
      }
    }), b.on("close", function() {
      this.mServer.mInterface.mUserConnections.splice(this.mServer.mInterface.mUserConnections.indexOf(this), 1);
      console.log("a user disconnect");
      this.mServer.mInterface.mServerView.mMainScene.onUserDisconnect(this)
    }))
  });
  this.mHTTPServer.listen(c, function() {
  });
  console.log("Server comunication initialized")
};
ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT = 1E3;
ss2d.ServerCommunicationInterface.prototype.broadcastSceneToClients = function(b) {
  if(0 < this.mUserConnections.length) {
    b = '["SCENE",' + b.toJSON() + "]";
    for(var c in this.mUserConnections) {
      this.mUserConnections[c].send(b)
    }
  }
};
ss2d.ServerCommunicationInterface.prototype.processClientCommand = function(b, c) {
  var d = b[0], e = b[1];
  switch(d) {
    case "UINPUT":
      c.mInput.updateFromClient(e);
      break;
    case "UNAME":
      c.mUserName = e;
      c.mServer.mInterface.mServerView.mMainScene.onUserChangeName(c);
      break;
    default:
      c.mServer.mInterface.mServerView.mMainScene.onUserMessage(d, e, c)
  }
};
ss2d.TextSprite = function(b, c, d, e, f, g, h) {
  ss2d.Quad.call(this, b, c, 0, 0, e);
  this.mTextString = d || "";
  this.mFontSize = f || 16;
  this.mFontName = g || "Verdana";
  this.mFontStyle = h || "normal";
  this.mDisplayChars = -1
};
goog.inherits(ss2d.TextSprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.TextSprite, 1007);
ss2d.TextSprite.prototype.setDisplayChars = function(b) {
  this.mDisplayChars = Math.floor(b)
};
ss2d.TextSprite.prototype.getDisplayChars = function() {
  return this.mDisplayChars
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.TextSprite.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  } : function(b) {
    b.pushTransform(this);
    var c = b.mContext;
    c.font = this.mFontStyle + " " + this.mFontSize + "px " + this.mFontName;
    c.fillStyle = this.mColor.getHexString();
    var d = this.mTextString;
    -1 < this.mDisplayChars && (d = this.mTextString.substring(0, this.mDisplayChars));
    c.fillText(d, 0, this.mFontSize);
    b.popTransform()
  }
}
COMPILING_CLIENT && (ss2d.TextSprite.convert = function(b) {
  var c = ss2d.Object.backupAndDeleteObjectProperties(b);
  ss2d.TextSprite.call(b);
  b.__proto__ = ss2d.TextSprite.prototype;
  b.restoreSerializedProperties(c);
  return b
}, ss2d.TextSprite.prototype.restoreSerializedProperties = function(b) {
  ss2d.Quad.prototype.restoreSerializedProperties.call(this, b);
  this.mTextString = b.str;
  this.mFontSize = b.fsize;
  this.mFontName = b.fname;
  this.mFontStyle = b.fstyle;
  this.mDisplayChars = b.dc
}, ss2d.TextSprite.createFromSerializedObject = function(b) {
  var c = new ss2d.TextSprite(b.x, b.y, b.str, b.c, b.fsize, b.fname, b.fstyle);
  c.mObjectId = b.doid;
  return c
}, ss2d.TextSprite.prototype.interpolateState = function(b, c, d) {
  ss2d.Quad.prototype.interpolateState.call(this, b, c, d, deltaTime);
  this.mTextString = b.str;
  this.mFontSize = b.fsize;
  this.mFontName = b.fname;
  this.mFontStyle = b.fstyle;
  this.mDisplayChars = Math.floor(b.dc + (c.dc - b.dc) * d)
});
COMPILING_SERVER && (ss2d.TextSprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.TextSprite.prototype.getPropertiesJSON = function() {
  var b = ss2d.Quad.prototype.getPropertiesJSON.call(this), b = b + (',"str": "' + this.mTextString + '"'), b = b + (',"fsize": "' + this.mFontSize + '"'), b = b + (',"fname": "' + this.mFontName + '"'), b = b + (',"fstyle": "' + this.mFontStyle + '"');
  return b += ',"dc": "' + this.mDisplayChars + '"'
});
ss2d.ClientCommunicationInterface = function(b, c, d) {
  this.mClientView = b;
  this.mConnection = new WebSocket("ws://" + c + ":" + d + "/");
  this.mConnection.mInterface = this;
  this.mConnected = !1;
  this.mConnection.onopen = function() {
    console.log("WebSocket connected");
    this.mInterface.mConnected = !0;
    this.mInterface.mClientView.onConnect(this)
  };
  this.mConnection.onerror = function(b) {
    console.log("WebSocket Error " + b);
    this.mInterface.mConnected = !1
  };
  this.mConnection.onclose = function() {
    this.mInterface.mConnected = !1;
    this.mInterface.mClientView.onDisconnect(this)
  };
  this.mConnection.onmessage = function(b) {
    this.mInterface.processServerCommand(JSON.parse(b.data), this);
    delete b.data
  }
};
ss2d.ClientCommunicationInterface.prototype.packAndSendUserName = function(b) {
  this.mConnected && this.mConnection.send('["UNAME","' + b + '"]')
};
ss2d.ClientCommunicationInterface.prototype.packAndSendInput = function(b) {
  this.mConnected && (b = '["UINPUT",' + b.toJSON() + "]", this.mConnection.send(b))
};
ss2d.ClientCommunicationInterface.prototype.processServerCommand = function(b, c) {
  var d = b[0], e = b[1];
  switch(d) {
    case "SCENE":
      this.mClientView.mSceneQueue.push([(new Date).getTime(), e]);
      break;
    case "REJECTED":
      this.mClientView.onServerMessage(d, e, c);
      break;
    default:
      this.mClientView.onServerMessage(d, e, c)
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
ss2d.Particle.prototype.getArray = function(b) {
  b = b || [];
  b.splice(0, b.length);
  b.push(this.mPosition.mX, this.mPosition.mY, this.mDirection.mX, this.mDirection.mY, this.mStartPos.mX, this.mStartPos.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mDeltaColor[0], this.mDeltaColor[1], this.mDeltaColor[2], this.mDeltaColor[3], this.mRotation, this.mRotationDelta, this.mRadialAcceleration, this.mTangentialAcceleration, this.mRadius, this.mRadiusDelta, this.mAngle, this.mDegreesPerSecond, this.mParticleSize, this.mParticleSizeDelta, this.mTimeToLive, this.mTimeStamp);
  return b
};
ss2d.Particle.prototype.getPCBufferArray = function(b, c) {
  b.set([this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3], this.mPosition.mX, this.mPosition.mY, this.mColor[0], this.mColor[1], this.mColor[2], this.mColor[3]], c || 0)
};
ss2d.GPUParticleEmitter = function(b, c, d, e, f) {
  ss2d.Quad.call(this, b, c, d, e);
  this.mPivotX = 0.5 * this.mWidth;
  this.mPivotY = 0.5 * this.mHeight;
  if("webgl" != RENDER_CONTEXT) {
    throw"ss2d.GPUParticleEmitter requires WebGL Rendering Context";
  }
  if(!f) {
    throw"No particle system provided";
  }
  this.mParticleSystem = f;
  "string" == typeof f && (this.mParticleSystem = ss2d.ResourceManager.loadParticleSystem(f, this.setup, this));
  this.mShowHitBox = !1
};
goog.inherits(ss2d.GPUParticleEmitter, ss2d.Quad);
ss2d.GPUParticleEmitter.MAX_UPDATE_RATE = 100;
ss2d.GPUParticleEmitter.prototype.setup = function(b) {
  this.mParticleSystem = b;
  this.mTexture = this.mParticleSystem.mTexture;
  b = this.mParticleSystem.mSystemDescriptor;
  this.mSourcePosition = new ss2d.Point(parseFloat(b.sourcePosition["-x"]), parseFloat(b.sourcePosition["-y"]));
  this.mSourcePositionVariance = new ss2d.Point(parseFloat(b.sourcePositionVariance["-x"]), parseFloat(b.sourcePositionVariance["-y"]));
  this.mGravity = new ss2d.Point(parseFloat(b.gravity["-x"]), parseFloat(b.gravity["-y"]));
  this.mAngle = parseFloat(b.angle["-value"]);
  this.mAngleVariance = parseFloat(b.angleVariance["-value"]);
  this.mSpeed = parseFloat(b.speed["-value"]);
  this.mSpeedVariance = parseFloat(b.speedVariance["-value"]);
  this.mRadialAcceleration = parseFloat(b.radialAcceleration["-value"]);
  this.mTangentialAcceleration = parseFloat(b.tangentialAcceleration["-value"]);
  this.mRadialAccelVariance = parseFloat(b.radialAccelVariance["-value"]);
  this.mTangentialAccelVariance = parseFloat(b.tangentialAccelVariance["-value"]);
  this.mParticleLifeSpan = parseFloat(b.particleLifeSpan["-value"]);
  this.mParticleLifespanVariance = parseFloat(b.particleLifespanVariance["-value"]);
  this.mStartParticleSize = parseFloat(b.startParticleSize["-value"]);
  this.mStartParticleSizeVariance = parseFloat(b.startParticleSizeVariance["-value"]);
  this.mFinishParticleSize = parseFloat(b.finishParticleSize["-value"]);
  this.mFinishParticleSizeVariance = parseFloat((b.finishParticleSizeVariance || b.FinishParticleSizeVariance)["-value"]);
  this.mMaxParticles = parseFloat(b.maxParticles["-value"]);
  this.mDuration = parseFloat(b.duration["-value"]);
  this.mRotationStart = parseFloat(b.rotationStart["-value"]);
  this.mRotationStartVariance = parseFloat(b.rotationStartVariance["-value"]);
  this.mRotationEnd = parseFloat(b.rotationEnd["-value"]);
  this.mRotationEndVariance = parseFloat(b.rotationEndVariance["-value"]);
  this.mBlendFuncSource = parseFloat(b.blendFuncSource["-value"]);
  this.mBlendFuncDestination = parseFloat(b.blendFuncDestination["-value"]);
  this.mStartColor = [parseFloat(b.startColor["-red"]), parseFloat(b.startColor["-green"]), parseFloat(b.startColor["-blue"]), parseFloat(b.startColor["-alpha"])];
  this.mStartColorVariance = [parseFloat(b.startColorVariance["-red"]), parseFloat(b.startColorVariance["-green"]), parseFloat(b.startColorVariance["-blue"]), parseFloat(b.startColorVariance["-alpha"])];
  this.mFinishColor = [parseFloat(b.finishColor["-red"]), parseFloat(b.finishColor["-green"]), parseFloat(b.finishColor["-blue"]), parseFloat(b.finishColor["-alpha"])];
  this.mFinishColorVariance = [parseFloat(b.finishColorVariance["-red"]), parseFloat(b.finishColorVariance["-green"]), parseFloat(b.finishColorVariance["-blue"]), parseFloat(b.finishColorVariance["-alpha"])];
  this.mMaxRadius = parseFloat(b.maxRadius["-value"]);
  this.mMaxRadiusVariance = parseFloat(b.maxRadiusVariance["-value"]);
  this.mMinRadius = parseFloat(b.minRadius["-value"]);
  this.mRotatePerSecond = parseFloat(b.rotatePerSecond["-value"]);
  this.mRotatePerSecondVariance = parseFloat(b.rotatePerSecondVariance["-value"]);
  this.mRadiusSpeed = 0;
  this.mRotation = this.mAngle / (180 / Math.PI);
  this.mEmitterType = parseFloat(b.emitterType["-value"]);
  this.mParticleCount = 0;
  this.mEmissionRate = this.mMaxParticles / this.mParticleLifeSpan;
  this.mElapsedTime = this.mEmitCounter = 0;
  this.mUseTexture = !0;
  this.mParticleIndex = 0;
  this.mParticles = [];
  b = [];
  for(var c = [], d = this.localToWorld(this.mLocation), e = 0;e < this.mMaxParticles;++e) {
    this.mParticles[e] = this.generateParticle(null, d), this.mParticles[e].mTimeToLive = 0, this.mParticles[e].getArray(c), b = b.concat(c), b = b.concat(c), b = b.concat(c), b = b.concat(c)
  }
  this.mParticleCount = this.mMaxParticles;
  d = ss2d.CURRENT_VIEW.mContext;
  this.mParticleDataBuffer = ss2d.CURRENT_VIEW.mRenderSupport.createBuffer(d.ARRAY_BUFFER, new Float32Array(b), ss2d.Particle.SRUCT_SIZE, b.length / ss2d.Particle.SRUCT_SIZE, d.DYNAMIC_DRAW);
  delete b;
  delete c;
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
ss2d.GPUParticleEmitter.prototype.generateParticle = function(b, c, d) {
  if(!(this.mParticleCount >= this.mMaxParticles)) {
    b = b || new ss2d.Particle;
    d = d || 0;
    b.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime;
    var e = ss2d.GPUParticleEmitter.MINUS_ONE_TO_ONE;
    b.mPosition.mX = c.mX + e() * this.mSourcePositionVariance.mX;
    b.mPosition.mY = c.mY + e() * this.mSourcePositionVariance.mY;
    b.mStartPos.mX = c.mX;
    b.mStartPos.mY = c.mY;
    c = this.mRotation + e() * this.mAngleVariance / (180 / Math.PI);
    c = new ss2d.Point(Math.cos(c), Math.sin(c));
    var f = this.mSpeed + e() * this.mSpeedVariance;
    b.mDirection = ss2d.Point.scalePoint(c, f);
    b.mDirection.mY *= -1;
    b.mRadius = this.mMaxRadius + e() * this.mMaxRadiusVariance;
    b.mRadiusDelta = this.mMaxRadius / this.mParticleLifeSpan;
    b.mAngle = this.mRotation + e() * this.mAngleVariance / (180 / Math.PI);
    b.mDegreesPerSecond = (this.mRotatePerSecond + e() * this.mRotatePerSecondVariance) / (180 / Math.PI);
    b.mRadialAcceleration = this.mRadialAcceleration;
    b.mTangentialAcceleration = this.mTangentialAcceleration;
    b.mTimeToLive = Math.max(0, this.mParticleLifeSpan + this.mParticleLifespanVariance * e()) + d;
    d = this.mStartParticleSize + this.mStartParticleSizeVariance * e();
    c = this.mFinishParticleSize + this.mFinishParticleSizeVariance * e();
    b.mParticleSizeDelta = (c - d) / b.mTimeToLive;
    b.mParticleSize = Math.max(0, d);
    d = b.mColor;
    d[0] = this.mStartColor[0] + this.mStartColorVariance[0] * e();
    d[1] = this.mStartColor[1] + this.mStartColorVariance[1] * e();
    d[2] = this.mStartColor[2] + this.mStartColorVariance[2] * e();
    d[3] = this.mStartColor[3] + this.mStartColorVariance[3] * e();
    c = [];
    c[0] = this.mFinishColor[0] + this.mFinishColorVariance[0] * e();
    c[1] = this.mFinishColor[1] + this.mFinishColorVariance[1] * e();
    c[2] = this.mFinishColor[2] + this.mFinishColorVariance[2] * e();
    c[3] = this.mFinishColor[3] + this.mFinishColorVariance[3] * e();
    f = b.mDeltaColor;
    f[0] = (c[0] - d[0]) / b.mTimeToLive;
    f[1] = (c[1] - d[1]) / b.mTimeToLive;
    f[2] = (c[2] - d[2]) / b.mTimeToLive;
    f[3] = (c[3] - d[3]) / b.mTimeToLive;
    d = this.mRotationStart + this.mRotationStartVariance * e();
    e = this.mRotationEnd + this.mRotationEndVariance * e();
    b.mRotation = d;
    b.mRotationDelta = (e - d) / b.mTimeToLive;
    this.mParticleCount++;
    return b
  }
};
"webgl" == RENDER_CONTEXT && (ss2d.GPUParticleEmitter.prototype.render = function(b) {
  if(this.mReady) {
    this.mPivotX = 0.5 * this.mWidth;
    this.mPivotY = 0.5 * this.mHeight;
    if(this.mShowHitBox) {
      var c = this.mAlpha;
      this.mAlpha = 0.5;
      ss2d.Quad.prototype.render.call(this, b);
      this.mAlpha = c
    }
    c = b.mContext;
    c.blendFunc(this.mBlendFuncSource, this.mBlendFuncDestination);
    var d = b.mMaterials.mGPUParticle;
    d.mActiveTexture = this.mTexture.mTextureId;
    d.mParticleDataBuffer = this.mParticleDataBuffer;
    d.mEmitterType = this.mEmitterType;
    d.mGravity[0] = this.mGravity.mX;
    d.mGravity[1] = this.mGravity.mY;
    d.apply(b);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b.mBuffers.mParticlesQVI);
    c.drawElements(c.TRIANGLES, 6 * this.mMaxParticles, c.UNSIGNED_SHORT, 0);
    c.blendFunc(b.mDefaultBlendSource, b.mDefaultBlendDestination)
  }
}, ss2d.GPUParticleEmitter.prototype.tick = function(b) {
  this.updateParticles(b)
}, ss2d.GPUParticleEmitter.prototype.updateParticles = function(b) {
  if(this.mReady) {
    b = b > 2 / ss2d.CURRENT_VIEW.mFrameRate ? 1 / ss2d.CURRENT_VIEW.mFrameRate : b;
    var c = ss2d.CURRENT_VIEW.mContext;
    if(this.mActive && this.mEmissionRate) {
      var d = 1 / this.mEmissionRate;
      this.mEmitCounter += b;
      for(var e = [], f = this.localToWorld(this.mLocation);this.mParticleCount < this.mMaxParticles && this.mEmitCounter > d;) {
        if(this.mEmitCounter -= d, 0 != this.mFreeParticles.length) {
          var g = this.mFreeParticles.pop(), h = this.generateParticle(this.mParticles[g], f), e = h.getArray(e), e = e.concat(e), e = e.concat(e);
          c.bindBuffer(c.ARRAY_BUFFER, this.mParticleDataBuffer);
          c.bufferSubData(c.ARRAY_BUFFER, 4 * 4 * g * ss2d.Particle.SRUCT_SIZE, new Float32Array(e))
        }
      }
      this.mElapsedTime += b;
      -1 != this.mDuration && this.mDuration < this.mElapsedTime && this.stopEmitter()
    }
    c = b;
    for(d = 0;d < this.mMaxParticles;++d) {
      if(h = this.mParticles[d], h.mTimeToLive -= c, h.mRadius -= h.mRadiusDelta * b, 0 >= h.mTimeToLive || 1 == this.mEmitterType && h.mRadius < this.mMinRadius) {
        this.mParticleCount--, this.mFreeParticles.push(d)
      }
    }
  }
});
ss2d.WebAudio = function(b, c) {
  if(b) {
    this.mName = b;
    this.mCallbackFunction = c;
    this.mSoundSources = [];
    this.mPausedSource = this.mLastSource = this.mSoundBuffer = null;
    var d = new XMLHttpRequest;
    d.mSound = this;
    d.open("GET", b, !0);
    d.responseType = "arraybuffer";
    d.onload = function() {
      this.mSound.mSoundBuffer = ss2d.AUDIO_CONTEXT.createBuffer(this.response, !1);
      this.mSound.mCallbackFunction(this.mSound)
    };
    d.send()
  }
};
ss2d.WebAudio.prototype.play = function() {
  var b = this.mPausedSource || ss2d.AUDIO_CONTEXT.createBufferSource();
  this.mPausedSource = null;
  b.buffer = this.mSoundBuffer;
  b.connect(ss2d.AUDIO_CONTEXT.destination);
  b.noteOn(0);
  return this.mLastSource = b
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
ss2d.ClientView = function(b, c, d, e, f, g) {
  this.mCanvas = document.getElementById(b);
  "webgl" == RENDER_CONTEXT ? (this.mContext = this.mCanvas.getContext("webgl") || this.mCanvas.getContext("experimental-webgl"), this.mProjection = ss2d.RenderSupport.orthogonalProjectionMatrix(0, this.mWidth, this.mHeight, 0, 1, -1)) : this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = e || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = c || this.mCanvas.height;
  this.mCanvas.height = d || this.mCanvas.height;
  ss2d.CURRENT_VIEW = this;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = null;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020";
  this.mSceneQueue = [];
  this.mComunication = null;
  this.mDelay = g || 100;
  this.mInputRate = f || 20;
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
  var b = (new Date).getTime(), c = b - this.mLastFrameTimestamp;
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  c /= 1E3;
  this.mTotalTime += c;
  this.mInput.tick(c);
  for(var d in this.mPreTickFunctions) {
    this.mPreTickFunctions[d].call(null, c)
  }
  this.updateSceneState(b, c);
  for(d in this.mPostTickFunctions) {
    this.mPostTickFunctions[d].call(null, c)
  }
  for(d in this.mPreRenderFunctions) {
    this.mPreRenderFunctions[d].call(null, this.mRenderSupport)
  }
  null != this.mMainScene && this.render();
  for(d in this.mPostRenderFunctions) {
    this.mPostRenderFunctions[d].call(null, this.mRenderSupport)
  }
  this.mLastFrameTimestamp = b;
  b = ((new Date).getTime() - b) / 1E3;
  b = Math.max(0, 1 / this.mFrameRate - b);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_FRAME_CALLER, 1E3 * b)
};
ss2d.ClientView.prototype.render = function() {
};
ss2d.ClientView.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  var b = this.mContext;
  b.viewport(0, 0, this.mCanvas.width, this.mCanvas.height);
  var c = this.mClearColor;
  b.clearColor(c[0], c[1], c[2], c[3]);
  b.clear(b.COLOR_BUFFER_BIT);
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
ss2d.ClientView.prototype.updateSceneState = function(b, c) {
  for(var d = b - this.mDelay, e = -1, f = -1, g = 0;g < this.mSceneQueue.length && -1 == f;g++) {
    var h = this.mSceneQueue[g][0], j = this.mSceneQueue[g][1];
    h < d && (e = g, null != j.PLAYSOUNDS && (j.PLAYSOUNDS = null, delete j.PLAYSOUNDS));
    h >= d && (f = g)
  }
  if(-1 != e && -1 != f) {
    for(g = 0;g < e;++g) {
      this.interpolateSeceneStates(g, e, d, c)
    }
    this.interpolateSeceneStates(e, f, d, c)
  }
  this.mSceneQueue.splice(0, e)
};
ss2d.ClientView.prototype.interpolateSeceneStates = function(b, c, d, e) {
  var f = this.mSceneQueue[b][0];
  d = (d - f) / (this.mSceneQueue[c][0] - f);
  null == this.mMainScene && (this.mMainScene = ss2d.Object.getObjectPrototype(this.mSceneQueue[b][1]).createFromSerializedObject(this.mSceneQueue[b][1]), console.debug("main scene created"));
  this.mMainScene.interpolateState(this.mSceneQueue[b][1], this.mSceneQueue[c][1], d, e)
};
ss2d.ClientView.prototype.startLoop = function() {
  !this.mRunning && null != this.mComunication && (this.mRunning = !0, this.nextFrame(), this.nextInputUpdate())
};
ss2d.ClientView.prototype.stopLoop = function() {
  this.mRunning = !1
};
ss2d.ClientView.prototype.resizeCanvas = function() {
};
"webgl" == RENDER_CONTEXT && (ss2d.ClientView.prototype.resizeCanvas = function(b, c) {
  this.mProjection = ss2d.RenderSupport.orthogonalProjectionMatrix(0, b, c, 0, 1, -1, this.mProjection)
});
ss2d.ClientView.prototype.startConnection = function(b, c) {
  this.mComunication = new ss2d.ClientCommunicationInterface(this, b, c)
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
box2d.Settings.b2Assert = function(b) {
  if(!b) {
    throw"Assert Failed!";
  }
};
goog.debug = {};
goog.debug.Error = function(b) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  b && (this.message = String(b))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(b, c) {
  return 0 == b.lastIndexOf(c, 0)
};
goog.string.endsWith = function(b, c) {
  var d = b.length - c.length;
  return 0 <= d && b.indexOf(c, d) == d
};
goog.string.caseInsensitiveStartsWith = function(b, c) {
  return 0 == goog.string.caseInsensitiveCompare(c, b.substr(0, c.length))
};
goog.string.caseInsensitiveEndsWith = function(b, c) {
  return 0 == goog.string.caseInsensitiveCompare(c, b.substr(b.length - c.length, c.length))
};
goog.string.subs = function(b, c) {
  for(var d = 1;d < arguments.length;d++) {
    var e = String(arguments[d]).replace(/\$/g, "$$$$");
    b = b.replace(/\%s/, e)
  }
  return b
};
goog.string.collapseWhitespace = function(b) {
  return b.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(b) {
  return/^[\s\xa0]*$/.test(b)
};
goog.string.isEmptySafe = function(b) {
  return goog.string.isEmpty(goog.string.makeSafe(b))
};
goog.string.isBreakingWhitespace = function(b) {
  return!/[^\t\n\r ]/.test(b)
};
goog.string.isAlpha = function(b) {
  return!/[^a-zA-Z]/.test(b)
};
goog.string.isNumeric = function(b) {
  return!/[^0-9]/.test(b)
};
goog.string.isAlphaNumeric = function(b) {
  return!/[^a-zA-Z0-9]/.test(b)
};
goog.string.isSpace = function(b) {
  return" " == b
};
goog.string.isUnicodeChar = function(b) {
  return 1 == b.length && " " <= b && "~" >= b || "\u0080" <= b && "\ufffd" >= b
};
goog.string.stripNewlines = function(b) {
  return b.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(b) {
  return b.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(b) {
  return b.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(b) {
  return b.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(b) {
  return b.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(b) {
  return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(b) {
  return b.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(b) {
  return b.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(b, c) {
  var d = String(b).toLowerCase(), e = String(c).toLowerCase();
  return d < e ? -1 : d == e ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(b, c) {
  if(b == c) {
    return 0
  }
  if(!b) {
    return-1
  }
  if(!c) {
    return 1
  }
  for(var d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = c.toLowerCase().match(goog.string.numerateCompareRegExp_), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
    var h = d[g], j = e[g];
    if(h != j) {
      return d = parseInt(h, 10), !isNaN(d) && (e = parseInt(j, 10), !isNaN(e) && d - e) ? d - e : h < j ? -1 : 1
    }
  }
  return d.length != e.length ? d.length - e.length : b < c ? -1 : 1
};
goog.string.urlEncode = function(b) {
  return encodeURIComponent(String(b))
};
goog.string.urlDecode = function(b) {
  return decodeURIComponent(b.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(b, c) {
  return b.replace(/(\r\n|\r|\n)/g, c ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(b, c) {
  if(c) {
    return b.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(b)) {
    return b
  }
  -1 != b.indexOf("&") && (b = b.replace(goog.string.amperRe_, "&amp;"));
  -1 != b.indexOf("<") && (b = b.replace(goog.string.ltRe_, "&lt;"));
  -1 != b.indexOf(">") && (b = b.replace(goog.string.gtRe_, "&gt;"));
  -1 != b.indexOf('"') && (b = b.replace(goog.string.quotRe_, "&quot;"));
  return b
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(b) {
  return goog.string.contains(b, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(b) : goog.string.unescapePureXmlEntities_(b) : b
};
goog.string.unescapeEntitiesUsingDom_ = function(b) {
  var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, d = document.createElement("div");
  return b.replace(goog.string.HTML_ENTITY_PATTERN_, function(b, f) {
    var g = c[b];
    if(g) {
      return g
    }
    if("#" == f.charAt(0)) {
      var h = Number("0" + f.substr(1));
      isNaN(h) || (g = String.fromCharCode(h))
    }
    g || (d.innerHTML = b + " ", g = d.firstChild.nodeValue.slice(0, -1));
    return c[b] = g
  })
};
goog.string.unescapePureXmlEntities_ = function(b) {
  return b.replace(/&([^;]+);/g, function(b, d) {
    switch(d) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == d.charAt(0)) {
          var e = Number("0" + d.substr(1));
          if(!isNaN(e)) {
            return String.fromCharCode(e)
          }
        }
        return b
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(b, c) {
  return goog.string.newLineToBr(b.replace(/  /g, " &#160;"), c)
};
goog.string.stripQuotes = function(b, c) {
  for(var d = c.length, e = 0;e < d;e++) {
    var f = 1 == d ? c : c.charAt(e);
    if(b.charAt(0) == f && b.charAt(b.length - 1) == f) {
      return b.substring(1, b.length - 1)
    }
  }
  return b
};
goog.string.truncate = function(b, c, d) {
  d && (b = goog.string.unescapeEntities(b));
  b.length > c && (b = b.substring(0, c - 3) + "...");
  d && (b = goog.string.htmlEscape(b));
  return b
};
goog.string.truncateMiddle = function(b, c, d, e) {
  d && (b = goog.string.unescapeEntities(b));
  if(e && b.length > c) {
    e > c && (e = c);
    var f = b.length - e;
    b = b.substring(0, c - e) + "..." + b.substring(f)
  }else {
    b.length > c && (e = Math.floor(c / 2), f = b.length - e, b = b.substring(0, e + c % 2) + "..." + b.substring(f))
  }
  d && (b = goog.string.htmlEscape(b));
  return b
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(b) {
  b = String(b);
  if(b.quote) {
    return b.quote()
  }
  for(var c = ['"'], d = 0;d < b.length;d++) {
    var e = b.charAt(d), f = e.charCodeAt(0);
    c[d + 1] = goog.string.specialEscapeChars_[e] || (31 < f && 127 > f ? e : goog.string.escapeChar(e))
  }
  c.push('"');
  return c.join("")
};
goog.string.escapeString = function(b) {
  for(var c = [], d = 0;d < b.length;d++) {
    c[d] = goog.string.escapeChar(b.charAt(d))
  }
  return c.join("")
};
goog.string.escapeChar = function(b) {
  if(b in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[b]
  }
  if(b in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[b] = goog.string.specialEscapeChars_[b]
  }
  var c = b, d = b.charCodeAt(0);
  if(31 < d && 127 > d) {
    c = b
  }else {
    if(256 > d) {
      if(c = "\\x", 16 > d || 256 < d) {
        c += "0"
      }
    }else {
      c = "\\u", 4096 > d && (c += "0")
    }
    c += d.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[b] = c
};
goog.string.toMap = function(b) {
  for(var c = {}, d = 0;d < b.length;d++) {
    c[b.charAt(d)] = !0
  }
  return c
};
goog.string.contains = function(b, c) {
  return-1 != b.indexOf(c)
};
goog.string.countOf = function(b, c) {
  return b && c ? b.split(c).length - 1 : 0
};
goog.string.removeAt = function(b, c, d) {
  var e = b;
  0 <= c && (c < b.length && 0 < d) && (e = b.substr(0, c) + b.substr(c + d, b.length - c - d));
  return e
};
goog.string.remove = function(b, c) {
  var d = RegExp(goog.string.regExpEscape(c), "");
  return b.replace(d, "")
};
goog.string.removeAll = function(b, c) {
  var d = RegExp(goog.string.regExpEscape(c), "g");
  return b.replace(d, "")
};
goog.string.regExpEscape = function(b) {
  return String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(b, c) {
  return Array(c + 1).join(b)
};
goog.string.padNumber = function(b, c, d) {
  b = goog.isDef(d) ? b.toFixed(d) : String(b);
  d = b.indexOf(".");
  -1 == d && (d = b.length);
  return goog.string.repeat("0", Math.max(0, c - d)) + b
};
goog.string.makeSafe = function(b) {
  return null == b ? "" : String(b)
};
goog.string.buildString = function(b) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(b, c) {
  for(var d = 0, e = goog.string.trim(String(b)).split("."), f = goog.string.trim(String(c)).split("."), g = Math.max(e.length, f.length), h = 0;0 == d && h < g;h++) {
    var j = e[h] || "", k = f[h] || "", l = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
    do {
      var n = l.exec(j) || ["", "", ""], q = m.exec(k) || ["", "", ""];
      if(0 == n[0].length && 0 == q[0].length) {
        break
      }
      var d = 0 == n[1].length ? 0 : parseInt(n[1], 10), r = 0 == q[1].length ? 0 : parseInt(q[1], 10), d = goog.string.compareElements_(d, r) || goog.string.compareElements_(0 == n[2].length, 0 == q[2].length) || goog.string.compareElements_(n[2], q[2])
    }while(0 == d)
  }
  return d
};
goog.string.compareElements_ = function(b, c) {
  return b < c ? -1 : b > c ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(b) {
  for(var c = 0, d = 0;d < b.length;++d) {
    c = 31 * c + b.charCodeAt(d), c %= goog.string.HASHCODE_MAX_
  }
  return c
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(b) {
  var c = Number(b);
  return 0 == c && goog.string.isEmpty(b) ? NaN : c
};
goog.string.toCamelCase = function(b) {
  return String(b).replace(/\-([a-z])/g, function(b, d) {
    return d.toUpperCase()
  })
};
goog.string.toSelectorCase = function(b) {
  return String(b).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(b, c) {
  var d = goog.isString(c) ? goog.string.regExpEscape(c) : "\\s";
  return b.replace(RegExp("(^" + (d ? "|[" + d + "]+" : "") + ")([a-z])", "g"), function(b, c, d) {
    return c + d.toUpperCase()
  })
};
goog.string.parseInt = function(b) {
  isFinite(b) && (b = String(b));
  return goog.isString(b) ? /^\s*-?0x/i.test(b) ? parseInt(b, 16) : parseInt(b, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(b, c) {
  c.unshift(b);
  goog.debug.Error.call(this, goog.string.subs.apply(null, c));
  c.shift();
  this.messagePattern = b
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(b, c, d, e) {
  var f = "Assertion failed";
  if(d) {
    var f = f + (": " + d), g = e
  }else {
    b && (f += ": " + b, g = c)
  }
  throw new goog.asserts.AssertionError("" + f, g || []);
};
goog.asserts.assert = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !b && goog.asserts.doAssertFailure_("", null, c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.fail = function(b, c) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (b ? ": " + b : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(b) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertString = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(b) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertFunction = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(b) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertObject = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(b) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertArray = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(b) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertBoolean = function(b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(b) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(b), b], c, Array.prototype.slice.call(arguments, 2));
  return b
};
goog.asserts.assertInstanceof = function(b, c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !(b instanceof c) && goog.asserts.doAssertFailure_("instanceof check failed.", null, d, Array.prototype.slice.call(arguments, 3));
  return b
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.peek = function(b) {
  return b[b.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(b, c, d)
} : function(b, c, d) {
  d = null == d ? 0 : 0 > d ? Math.max(0, b.length + d) : d;
  if(goog.isString(b)) {
    return!goog.isString(c) || 1 != c.length ? -1 : b.indexOf(c, d)
  }
  for(;d < b.length;d++) {
    if(d in b && b[d] === c) {
      return d
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(b, c, null == d ? b.length - 1 : d)
} : function(b, c, d) {
  d = null == d ? b.length - 1 : d;
  0 > d && (d = Math.max(0, b.length + d));
  if(goog.isString(b)) {
    return!goog.isString(c) || 1 != c.length ? -1 : b.lastIndexOf(c, d)
  }
  for(;0 <= d;d--) {
    if(d in b && b[d] === c) {
      return d
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0;g < e;g++) {
    g in f && c.call(d, f[g], g, b)
  }
};
goog.array.forEachRight = function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, e = e - 1;0 <= e;--e) {
    e in f && c.call(d, f[e], e, b)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = [], g = 0, h = goog.isString(b) ? b.split("") : b, j = 0;j < e;j++) {
    if(j in h) {
      var k = h[j];
      c.call(d, k, j, b) && (f[g++] = k)
    }
  }
  return f
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = Array(e), g = goog.isString(b) ? b.split("") : b, h = 0;h < e;h++) {
    h in g && (f[h] = c.call(d, g[h], h, b))
  }
  return f
};
goog.array.reduce = function(b, c, d, e) {
  if(b.reduce) {
    return e ? b.reduce(goog.bind(c, e), d) : b.reduce(c, d)
  }
  var f = d;
  goog.array.forEach(b, function(d, h) {
    f = c.call(e, f, d, h, b)
  });
  return f
};
goog.array.reduceRight = function(b, c, d, e) {
  if(b.reduceRight) {
    return e ? b.reduceRight(goog.bind(c, e), d) : b.reduceRight(c, d)
  }
  var f = d;
  goog.array.forEachRight(b, function(d, h) {
    f = c.call(e, f, d, h, b)
  });
  return f
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0;g < e;g++) {
    if(g in f && c.call(d, f[g], g, b)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0;g < e;g++) {
    if(g in f && !c.call(d, f[g], g, b)) {
      return!1
    }
  }
  return!0
};
goog.array.count = function(b, c, d) {
  var e = 0;
  goog.array.forEach(b, function(b, g, h) {
    c.call(d, b, g, h) && ++e
  }, d);
  return e
};
goog.array.find = function(b, c, d) {
  c = goog.array.findIndex(b, c, d);
  return 0 > c ? null : goog.isString(b) ? b.charAt(c) : b[c]
};
goog.array.findIndex = function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0;g < e;g++) {
    if(g in f && c.call(d, f[g], g, b)) {
      return g
    }
  }
  return-1
};
goog.array.findRight = function(b, c, d) {
  c = goog.array.findIndexRight(b, c, d);
  return 0 > c ? null : goog.isString(b) ? b.charAt(c) : b[c]
};
goog.array.findIndexRight = function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, e = e - 1;0 <= e;e--) {
    if(e in f && c.call(d, f[e], e, b)) {
      return e
    }
  }
  return-1
};
goog.array.contains = function(b, c) {
  return 0 <= goog.array.indexOf(b, c)
};
goog.array.isEmpty = function(b) {
  return 0 == b.length
};
goog.array.clear = function(b) {
  if(!goog.isArray(b)) {
    for(var c = b.length - 1;0 <= c;c--) {
      delete b[c]
    }
  }
  b.length = 0
};
goog.array.insert = function(b, c) {
  goog.array.contains(b, c) || b.push(c)
};
goog.array.insertAt = function(b, c, d) {
  goog.array.splice(b, d, 0, c)
};
goog.array.insertArrayAt = function(b, c, d) {
  goog.partial(goog.array.splice, b, d, 0).apply(null, c)
};
goog.array.insertBefore = function(b, c, d) {
  var e;
  2 == arguments.length || 0 > (e = goog.array.indexOf(b, d)) ? b.push(c) : goog.array.insertAt(b, c, e)
};
goog.array.remove = function(b, c) {
  var d = goog.array.indexOf(b, c), e;
  (e = 0 <= d) && goog.array.removeAt(b, d);
  return e
};
goog.array.removeAt = function(b, c) {
  goog.asserts.assert(null != b.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(b, c, 1).length
};
goog.array.removeIf = function(b, c, d) {
  c = goog.array.findIndex(b, c, d);
  return 0 <= c ? (goog.array.removeAt(b, c), !0) : !1
};
goog.array.concat = function(b) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(b) {
  var c = b.length;
  if(0 < c) {
    for(var d = Array(c), e = 0;e < c;e++) {
      d[e] = b[e]
    }
    return d
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(b, c) {
  for(var d = 1;d < arguments.length;d++) {
    var e = arguments[d], f;
    if(goog.isArray(e) || (f = goog.isArrayLike(e)) && Object.prototype.hasOwnProperty.call(e, "callee")) {
      b.push.apply(b, e)
    }else {
      if(f) {
        for(var g = b.length, h = e.length, j = 0;j < h;j++) {
          b[g + j] = e[j]
        }
      }else {
        b.push(e)
      }
    }
  }
};
goog.array.splice = function(b, c, d, e) {
  goog.asserts.assert(null != b.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(b, goog.array.slice(arguments, 1))
};
goog.array.slice = function(b, c, d) {
  goog.asserts.assert(null != b.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(b, c) : goog.array.ARRAY_PROTOTYPE_.slice.call(b, c, d)
};
goog.array.removeDuplicates = function(b, c) {
  for(var d = c || b, e = {}, f = 0, g = 0;g < b.length;) {
    var h = b[g++], j = goog.isObject(h) ? "o" + goog.getUid(h) : (typeof h).charAt(0) + h;
    Object.prototype.hasOwnProperty.call(e, j) || (e[j] = !0, d[f++] = h)
  }
  d.length = f
};
goog.array.binarySearch = function(b, c, d) {
  return goog.array.binarySearch_(b, d || goog.array.defaultCompare, !1, c)
};
goog.array.binarySelect = function(b, c, d) {
  return goog.array.binarySearch_(b, c, !0, void 0, d)
};
goog.array.binarySearch_ = function(b, c, d, e, f) {
  for(var g = 0, h = b.length, j;g < h;) {
    var k = g + h >> 1, l;
    l = d ? c.call(f, b[k], k, b) : c(e, b[k]);
    0 < l ? g = k + 1 : (h = k, j = !l)
  }
  return j ? g : ~g
};
goog.array.sort = function(b, c) {
  goog.asserts.assert(null != b.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(b, c || goog.array.defaultCompare)
};
goog.array.stableSort = function(b, c) {
  for(var d = 0;d < b.length;d++) {
    b[d] = {index:d, value:b[d]}
  }
  var e = c || goog.array.defaultCompare;
  goog.array.sort(b, function(b, c) {
    return e(b.value, c.value) || b.index - c.index
  });
  for(d = 0;d < b.length;d++) {
    b[d] = b[d].value
  }
};
goog.array.sortObjectsByKey = function(b, c, d) {
  var e = d || goog.array.defaultCompare;
  goog.array.sort(b, function(b, d) {
    return e(b[c], d[c])
  })
};
goog.array.isSorted = function(b, c, d) {
  c = c || goog.array.defaultCompare;
  for(var e = 1;e < b.length;e++) {
    var f = c(b[e - 1], b[e]);
    if(0 < f || 0 == f && d) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(b, c, d) {
  if(!goog.isArrayLike(b) || !goog.isArrayLike(c) || b.length != c.length) {
    return!1
  }
  var e = b.length;
  d = d || goog.array.defaultCompareEquality;
  for(var f = 0;f < e;f++) {
    if(!d(b[f], c[f])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(b, c, d) {
  return goog.array.equals(b, c, d)
};
goog.array.compare3 = function(b, c, d) {
  d = d || goog.array.defaultCompare;
  for(var e = Math.min(b.length, c.length), f = 0;f < e;f++) {
    var g = d(b[f], c[f]);
    if(0 != g) {
      return g
    }
  }
  return goog.array.defaultCompare(b.length, c.length)
};
goog.array.defaultCompare = function(b, c) {
  return b > c ? 1 : b < c ? -1 : 0
};
goog.array.defaultCompareEquality = function(b, c) {
  return b === c
};
goog.array.binaryInsert = function(b, c, d) {
  d = goog.array.binarySearch(b, c, d);
  return 0 > d ? (goog.array.insertAt(b, c, -(d + 1)), !0) : !1
};
goog.array.binaryRemove = function(b, c, d) {
  c = goog.array.binarySearch(b, c, d);
  return 0 <= c ? goog.array.removeAt(b, c) : !1
};
goog.array.bucket = function(b, c) {
  for(var d = {}, e = 0;e < b.length;e++) {
    var f = b[e], g = c(f, e, b);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
  }
  return d
};
goog.array.toObject = function(b, c, d) {
  var e = {};
  goog.array.forEach(b, function(f, g) {
    e[c.call(d, f, g, b)] = f
  });
  return e
};
goog.array.range = function(b, c, d) {
  var e = [], f = 0, g = b;
  d = d || 1;
  void 0 !== c && (f = b, g = c);
  if(0 > d * (g - f)) {
    return[]
  }
  if(0 < d) {
    for(b = f;b < g;b += d) {
      e.push(b)
    }
  }else {
    for(b = f;b > g;b += d) {
      e.push(b)
    }
  }
  return e
};
goog.array.repeat = function(b, c) {
  for(var d = [], e = 0;e < c;e++) {
    d[e] = b
  }
  return d
};
goog.array.flatten = function(b) {
  for(var c = [], d = 0;d < arguments.length;d++) {
    var e = arguments[d];
    goog.isArray(e) ? c.push.apply(c, goog.array.flatten.apply(null, e)) : c.push(e)
  }
  return c
};
goog.array.rotate = function(b, c) {
  goog.asserts.assert(null != b.length);
  b.length && (c %= b.length, 0 < c ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(b, b.splice(-c, c)) : 0 > c && goog.array.ARRAY_PROTOTYPE_.push.apply(b, b.splice(0, -c)));
  return b
};
goog.array.zip = function(b) {
  if(!arguments.length) {
    return[]
  }
  for(var c = [], d = 0;;d++) {
    for(var e = [], f = 0;f < arguments.length;f++) {
      var g = arguments[f];
      if(d >= g.length) {
        return c
      }
      e.push(g[d])
    }
    c.push(e)
  }
};
goog.array.shuffle = function(b, c) {
  for(var d = c || Math.random, e = b.length - 1;0 < e;e--) {
    var f = Math.floor(d() * (e + 1)), g = b[e];
    b[e] = b[f];
    b[f] = g
  }
};
goog.math = {};
goog.math.randomInt = function(b) {
  return Math.floor(Math.random() * b)
};
goog.math.uniformRandom = function(b, c) {
  return b + Math.random() * (c - b)
};
goog.math.clamp = function(b, c, d) {
  return Math.min(Math.max(b, c), d)
};
goog.math.modulo = function(b, c) {
  var d = b % c;
  return 0 > d * c ? d + c : d
};
goog.math.lerp = function(b, c, d) {
  return b + d * (c - b)
};
goog.math.nearlyEquals = function(b, c, d) {
  return Math.abs(b - c) <= (d || 1E-6)
};
goog.math.standardAngle = function(b) {
  return goog.math.modulo(b, 360)
};
goog.math.toRadians = function(b) {
  return b * Math.PI / 180
};
goog.math.toDegrees = function(b) {
  return 180 * b / Math.PI
};
goog.math.angleDx = function(b, c) {
  return c * Math.cos(goog.math.toRadians(b))
};
goog.math.angleDy = function(b, c) {
  return c * Math.sin(goog.math.toRadians(b))
};
goog.math.angle = function(b, c, d, e) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(e - c, d - b)))
};
goog.math.angleDifference = function(b, c) {
  var d = goog.math.standardAngle(c) - goog.math.standardAngle(b);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d
};
goog.math.sign = function(b) {
  return 0 == b ? 0 : 0 > b ? -1 : 1
};
goog.math.longestCommonSubsequence = function(b, c, d, e) {
  d = d || function(b, c) {
    return b == c
  };
  e = e || function(c) {
    return b[c]
  };
  for(var f = b.length, g = c.length, h = [], j = 0;j < f + 1;j++) {
    h[j] = [], h[j][0] = 0
  }
  for(var k = 0;k < g + 1;k++) {
    h[0][k] = 0
  }
  for(j = 1;j <= f;j++) {
    for(k = 1;k <= f;k++) {
      h[j][k] = d(b[j - 1], c[k - 1]) ? h[j - 1][k - 1] + 1 : Math.max(h[j - 1][k], h[j][k - 1])
    }
  }
  for(var l = [], j = f, k = g;0 < j && 0 < k;) {
    d(b[j - 1], c[k - 1]) ? (l.unshift(e(j - 1, k - 1)), j--, k--) : h[j - 1][k] > h[j][k - 1] ? j-- : k--
  }
  return l
};
goog.math.sum = function(b) {
  return goog.array.reduce(arguments, function(b, d) {
    return b + d
  }, 0)
};
goog.math.average = function(b) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function(b) {
  var c = arguments.length;
  if(2 > c) {
    return 0
  }
  var d = goog.math.average.apply(null, arguments), c = goog.math.sum.apply(null, goog.array.map(arguments, function(b) {
    return Math.pow(b - d, 2)
  })) / (c - 1);
  return Math.sqrt(c)
};
goog.math.isInt = function(b) {
  return isFinite(b) && 0 == b % 1
};
goog.math.isFiniteNumber = function(b) {
  return isFinite(b) && !isNaN(b)
};
goog.math.safeFloor = function(b, c) {
  goog.asserts.assert(!goog.isDef(c) || 0 < c);
  return Math.floor(b + (c || 2E-15))
};
goog.math.safeCeil = function(b, c) {
  goog.asserts.assert(!goog.isDef(c) || 0 < c);
  return Math.ceil(b - (c || 2E-15))
};
goog.math.Coordinate = function(b, c) {
  this.x = goog.isDef(b) ? b : 0;
  this.y = goog.isDef(c) ? c : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(b, c) {
  return b == c ? !0 : !b || !c ? !1 : b.x == c.x && b.y == c.y
};
goog.math.Coordinate.distance = function(b, c) {
  var d = b.x - c.x, e = b.y - c.y;
  return Math.sqrt(d * d + e * e)
};
goog.math.Coordinate.magnitude = function(b) {
  return Math.sqrt(b.x * b.x + b.y * b.y)
};
goog.math.Coordinate.azimuth = function(b) {
  return goog.math.angle(0, 0, b.x, b.y)
};
goog.math.Coordinate.squaredDistance = function(b, c) {
  var d = b.x - c.x, e = b.y - c.y;
  return d * d + e * e
};
goog.math.Coordinate.difference = function(b, c) {
  return new goog.math.Coordinate(b.x - c.x, b.y - c.y)
};
goog.math.Coordinate.sum = function(b, c) {
  return new goog.math.Coordinate(b.x + c.x, b.y + c.y)
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
goog.math.Coordinate.prototype.translate = function(b, c) {
  b instanceof goog.math.Coordinate ? (this.x += b.x, this.y += b.y) : (this.x += b, goog.isNumber(c) && (this.y += c));
  return this
};
goog.math.Coordinate.prototype.scale = function(b, c) {
  var d = goog.isNumber(c) ? c : b;
  this.x *= b;
  this.y *= d;
  return this
};
goog.math.Vec2 = function(b, c) {
  this.x = b;
  this.y = c
};
goog.inherits(goog.math.Vec2, goog.math.Coordinate);
goog.math.Vec2.randomUnit = function() {
  var b = 2 * Math.random() * Math.PI;
  return new goog.math.Vec2(Math.cos(b), Math.sin(b))
};
goog.math.Vec2.random = function() {
  var b = Math.sqrt(Math.random()), c = 2 * Math.random() * Math.PI;
  return new goog.math.Vec2(Math.cos(c) * b, Math.sin(c) * b)
};
goog.math.Vec2.fromCoordinate = function(b) {
  return new goog.math.Vec2(b.x, b.y)
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
goog.math.Vec2.prototype.add = function(b) {
  this.x += b.x;
  this.y += b.y;
  return this
};
goog.math.Vec2.prototype.subtract = function(b) {
  this.x -= b.x;
  this.y -= b.y;
  return this
};
goog.math.Vec2.prototype.rotate = function(b) {
  var c = Math.cos(b);
  b = Math.sin(b);
  var d = this.y * c + this.x * b;
  this.x = this.x * c - this.y * b;
  this.y = d;
  return this
};
goog.math.Vec2.rotateAroundPoint = function(b, c, d) {
  return b.clone().subtract(c).rotate(d).add(c)
};
goog.math.Vec2.prototype.equals = function(b) {
  return this == b || !!b && this.x == b.x && this.y == b.y
};
goog.math.Vec2.distance = goog.math.Coordinate.distance;
goog.math.Vec2.squaredDistance = goog.math.Coordinate.squaredDistance;
goog.math.Vec2.equals = goog.math.Coordinate.equals;
goog.math.Vec2.sum = function(b, c) {
  return new goog.math.Vec2(b.x + c.x, b.y + c.y)
};
goog.math.Vec2.difference = function(b, c) {
  return new goog.math.Vec2(b.x - c.x, b.y - c.y)
};
goog.math.Vec2.dot = function(b, c) {
  return b.x * c.x + b.y * c.y
};
goog.math.Vec2.lerp = function(b, c, d) {
  return new goog.math.Vec2(goog.math.lerp(b.x, c.x, d), goog.math.lerp(b.y, c.y, d))
};
box2d.Vec2 = function(b, c) {
  void 0 === b && (b = 0);
  this.x = b;
  void 0 === c && (c = 0);
  this.y = c
};
goog.inherits(box2d.Vec2, goog.math.Vec2);
box2d.Vec2.prototype.SetZero = function() {
  this.y = this.x = 0
};
box2d.Vec2.prototype.Set = function(b, c) {
  this.x = b;
  this.y = c
};
box2d.Vec2.prototype.SetV = function(b) {
  this.x = b.x;
  this.y = b.y
};
box2d.Vec2.prototype.Negative = function() {
  return new box2d.Vec2(-this.x, -this.y)
};
box2d.Vec2.prototype.Copy = function() {
  return new box2d.Vec2(this.x, this.y)
};
box2d.Vec2.prototype.MulM = function(b) {
  var c = this.x;
  this.x = b.col1.x * c + b.col2.x * this.y;
  this.y = b.col1.y * c + b.col2.y * this.y
};
box2d.Vec2.prototype.MulTM = function(b) {
  var c = goog.math.Vec2.dot(this, b.col1);
  this.y = goog.math.Vec2.dot(this, b.col2);
  this.x = c
};
box2d.Vec2.prototype.CrossVF = function(b) {
  var c = this.x;
  this.x = b * this.y;
  this.y = -b * c
};
box2d.Vec2.prototype.CrossFV = function(b) {
  var c = this.x;
  this.x = -b * this.y;
  this.y = b * c
};
box2d.Vec2.prototype.MinV = function(b) {
  this.x = this.x < b.x ? this.x : b.x;
  this.y = this.y < b.y ? this.y : b.y
};
box2d.Vec2.prototype.MaxV = function(b) {
  this.x = this.x > b.x ? this.x : b.x;
  this.y = this.y > b.y ? this.y : b.y
};
box2d.Vec2.prototype.Abs = function() {
  this.x = Math.abs(this.x);
  this.y = Math.abs(this.y)
};
box2d.Vec2.prototype.Normalize = function() {
  var b = this.magnitude();
  if(b < Number.MIN_VALUE) {
    return 0
  }
  var c = 1 / b;
  this.x *= c;
  this.y *= c;
  return b
};
box2d.Vec2.prototype.IsValid = function() {
  return isFinite(this.x) && isFinite(this.y)
};
box2d.Vec2.cross = function(b, c) {
  return b.x * c.y - b.y * c.x
};
box2d.Vec2.crossScalar = function(b, c) {
  return new box2d.Vec2(-b * c.y, b * c.x)
};
box2d.Vec2.add = function(b, c) {
  return new box2d.Vec2(b.x + c.x, b.y + c.y)
};
box2d.Vec2.subtract = function(b, c) {
  return new box2d.Vec2(b.x - c.x, b.y - c.y)
};
box2d.Vec2.multiplyScalar = function(b, c) {
  return new box2d.Vec2(b * c.x, b * c.y)
};
box2d.Vec2.abs = function(b) {
  return new box2d.Vec2(Math.abs(b.x), Math.abs(b.y))
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
box2d.ShapeDef.prototype.ComputeMass = function(b) {
  b.center = new box2d.Vec2(0, 0);
  b.mass = 0;
  b.I = 0
};
box2d.ShapeDef.prototype.categoryBits = 0;
box2d.ShapeDef.prototype.maskBits = 0;
box2d.ShapeDef.prototype.groupIndex = 0;
box2d.ShapeDef.Type = {unknownShape:-1, circleShape:0, boxShape:1, polyShape:2, meshShape:3, shapeTypeCount:4};
box2d.BodyDef = function() {
  this.shapes = [];
  this.userData = null;
  for(var b = 0;b < box2d.Settings.b2_maxShapesPerBody;b++) {
    this.shapes[b] = null
  }
  this.position = new box2d.Vec2(0, 0);
  this.rotation = 0;
  this.linearVelocity = new box2d.Vec2(0, 0);
  this.angularDamping = this.linearDamping = this.angularVelocity = 0;
  this.allowSleep = !0;
  this.preventRotation = this.isSleeping = !1
};
box2d.BodyDef.prototype.AddShape = function(b) {
  for(var c = 0;c < box2d.Settings.b2_maxShapesPerBody;++c) {
    if(null == this.shapes[c]) {
      this.shapes[c] = b;
      break
    }
  }
};
box2d.Mat22 = function(b, c, d) {
  null == b && (b = 0);
  this.col1 = new box2d.Vec2;
  this.col2 = new box2d.Vec2;
  null != c && null != d ? (this.col1.SetV(c), this.col2.SetV(d)) : (c = Math.cos(b), b = Math.sin(b), this.col1.x = c, this.col2.x = -b, this.col1.y = b, this.col2.y = c)
};
box2d.Mat22.prototype.Set = function(b) {
  var c = Math.cos(b);
  b = Math.sin(b);
  this.col1.x = c;
  this.col2.x = -b;
  this.col1.y = b;
  this.col2.y = c
};
box2d.Mat22.prototype.SetVV = function(b, c) {
  this.col1.SetV(b);
  this.col2.SetV(c)
};
box2d.Mat22.prototype.Copy = function() {
  return new box2d.Mat22(0, this.col1, this.col2)
};
box2d.Mat22.prototype.SetM = function(b) {
  this.col1.SetV(b.col1);
  this.col2.SetV(b.col2)
};
box2d.Mat22.prototype.AddM = function(b) {
  this.col1.x += b.col1.x;
  this.col1.y += b.col1.y;
  this.col2.x += b.col2.x;
  this.col2.y += b.col2.y
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
box2d.Mat22.prototype.Invert = function(b) {
  var c = this.col1.x, d = this.col2.x, e = this.col1.y, f = this.col2.y, g;
  g = 1 / (c * f - d * e);
  b.col1.x = g * f;
  b.col2.x = -g * d;
  b.col1.y = -g * e;
  b.col2.y = g * c;
  return b
};
box2d.Mat22.prototype.Solve = function(b, c, d) {
  var e = this.col1.x, f = this.col2.x, g = this.col1.y, h = this.col2.y, j;
  j = 1 / (e * h - f * g);
  b.x = j * (h * c - f * d);
  b.y = j * (e * d - g * c);
  return b
};
box2d.Mat22.prototype.Abs = function() {
  this.col1.Abs();
  this.col2.Abs()
};
box2d.Shape = function(b, c) {
  this.m_R = new box2d.Mat22;
  this.m_position = new box2d.Vec2;
  this.m_userData = b.userData;
  this.m_friction = b.friction;
  this.m_restitution = b.restitution;
  this.m_body = c;
  this.m_proxyId = box2d.Pair.b2_nullProxy;
  this.m_maxRadius = 0;
  this.categoryBits = b.categoryBits;
  this.maskBits = b.maskBits;
  this.m_groupIndex = b.groupIndex
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
box2d.Shape.Destroy = function(b) {
  b.m_proxyId != box2d.Pair.b2_nullProxy && b.m_body.m_world.m_broadPhase.DestroyProxy(b.m_proxyId)
};
box2d.Shape.PolyMass = function(b, c, d, e) {
  var f = new box2d.Vec2;
  f.SetZero();
  for(var g = 0, h = 0, j = new box2d.Vec2(0, 0), k = 1 / 3, l = 0;l < d;++l) {
    var m = j, n = c[l], q = l + 1 < d ? c[l + 1] : c[0], r = box2d.Vec2.subtract(n, m), s = box2d.Vec2.subtract(q, m), t = box2d.Vec2.cross(r, s), u = 0.5 * t, g = g + u, v = new box2d.Vec2;
    v.SetV(m);
    v.add(n);
    v.add(q);
    v.scale(k * u);
    f.add(v);
    n = m.x;
    m = m.y;
    q = r.x;
    r = r.y;
    u = s.x;
    s = s.y;
    h += t * (k * (0.25 * (q * q + u * q + u * u) + (n * q + n * u)) + 0.5 * n * n + (k * (0.25 * (r * r + s * r + s * s) + (m * r + m * s)) + 0.5 * m * m))
  }
  b.mass = e * g;
  f.scale(1 / g);
  b.center = f;
  h = e * (h - g * goog.math.Vec2.dot(f, f));
  b.I = h
};
box2d.Shape.PolyCentroid = function(b, c, d) {
  for(var e = 0, f = 0, g = 0, h = 1 / 3, j = 0;j < c;++j) {
    var k = b[j].x, l = b[j].y, m = j + 1 < c ? b[j + 1].x : b[0].x, n = j + 1 < c ? b[j + 1].y : b[0].y, q = 0.5 * ((k - 0) * (n - 0) - (l - 0) * (m - 0)), g = g + q, e = e + q * h * (0 + k + m), f = f + q * h * (0 + l + n)
  }
  d.Set(e * (1 / g), f * (1 / g))
};
box2d.BoxDef = function() {
  box2d.ShapeDef.call(this);
  this.type = box2d.ShapeDef.Type.boxShape;
  this.extents = new box2d.Vec2(1, 1)
};
goog.inherits(box2d.BoxDef, box2d.ShapeDef);
box2d.BoxDef.prototype.ComputeMass = function(b) {
  b.center = new box2d.Vec2(0, 0);
  0 == this.density && (b.mass = 0, b.center.Set(0, 0), b.I = 0);
  b.mass = 4 * this.density * this.extents.x * this.extents.y;
  b.center.Set(0, 0);
  b.I = b.mass / 3 * goog.math.Vec2.dot(this.extents, this.extents)
};
box2d.JointNode = function() {
  this.next = this.prev = this.joint = this.other = null
};
box2d.Joint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData
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
box2d.JointDef = function(b) {
  this.type = box2d.Joint.e_unknownJoint;
  this.body2 = this.body1 = this.userData = null;
  this.m_collideConnected = b
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
box2d.CircleDef.prototype.ComputeMass = function(b) {
  b.mass = this.density * box2d.Settings.b2_pi * this.radius * this.radius;
  b.I = 0.5 * b.mass * this.radius * this.radius
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
  for(var b = this.vertexCount = 0;b < box2d.Settings.b2_maxPolyVertices;b++) {
    this.vertices[b] = new box2d.Vec2
  }
};
goog.inherits(box2d.PolyDef, box2d.ShapeDef);
box2d.PolyDef.prototype.SetVertices = function(b) {
  this.vertexCount = b.length;
  for(var c = 0;c < b.length;c++) {
    this.vertices[c].Set(b[c][0], b[c][1])
  }
};
box2d.PolyDef.prototype.ComputeMass = function(b) {
  b.center = new box2d.Vec2(0, 0);
  0 == this.density && (b.mass = 0, b.center.Set(0, 0), b.I = 0);
  box2d.Shape.PolyMass(b, this.vertices, this.vertexCount, this.density)
};
box2d.AABB = function() {
  this.minVertex = new box2d.Vec2;
  this.maxVertex = new box2d.Vec2
};
box2d.AABB.prototype.IsValid = function() {
  var b = this.maxVertex.x, c = this.maxVertex.y, b = this.maxVertex.x, c = this.maxVertex.y, b = b - this.minVertex.x, c = c - this.minVertex.y;
  return b = 0 <= b && 0 <= c && this.minVertex.IsValid() && this.maxVertex.IsValid()
};
box2d.PolyShape = function(b, c, d) {
  box2d.Shape.call(this, b, c);
  this.syncAABB = new box2d.AABB;
  this.syncMat = new box2d.Mat22;
  this.m_localCentroid = new box2d.Vec2;
  this.m_localOBB = new box2d.OBB;
  var e = 0, f;
  c = new box2d.AABB;
  this.m_vertices = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_coreVertices = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_normals = Array(box2d.Settings.b2_maxPolyVertices);
  this.m_type = box2d.ShapeDef.Type.polyShape;
  var g = new box2d.Mat22(b.localRotation);
  if(b instanceof box2d.BoxDef) {
    this.m_localCentroid.x = b.localPosition.x - d.x;
    this.m_localCentroid.y = b.localPosition.y - d.y;
    this.m_vertexCount = 4;
    d = b.extents.x;
    f = b.extents.y;
    b = Math.max(0, d - 2 * box2d.Settings.b2_linearSlop);
    var h = Math.max(0, f - 2 * box2d.Settings.b2_linearSlop), e = this.m_vertices[0] = new box2d.Vec2;
    e.x = g.col1.x * d + g.col2.x * f;
    e.y = g.col1.y * d + g.col2.y * f;
    e = this.m_vertices[1] = new box2d.Vec2;
    e.x = g.col1.x * -d + g.col2.x * f;
    e.y = g.col1.y * -d + g.col2.y * f;
    e = this.m_vertices[2] = new box2d.Vec2;
    e.x = g.col1.x * -d + g.col2.x * -f;
    e.y = g.col1.y * -d + g.col2.y * -f;
    e = this.m_vertices[3] = new box2d.Vec2;
    e.x = g.col1.x * d + g.col2.x * -f;
    e.y = g.col1.y * d + g.col2.y * -f;
    e = this.m_coreVertices[0] = new box2d.Vec2;
    e.x = g.col1.x * b + g.col2.x * h;
    e.y = g.col1.y * b + g.col2.y * h;
    e = this.m_coreVertices[1] = new box2d.Vec2;
    e.x = g.col1.x * -b + g.col2.x * h;
    e.y = g.col1.y * -b + g.col2.y * h;
    e = this.m_coreVertices[2] = new box2d.Vec2;
    e.x = g.col1.x * -b + g.col2.x * -h;
    e.y = g.col1.y * -b + g.col2.y * -h;
    e = this.m_coreVertices[3] = new box2d.Vec2;
    e.x = g.col1.x * b + g.col2.x * -h;
    e.y = g.col1.y * b + g.col2.y * -h
  }else {
    this.m_vertexCount = b.vertexCount;
    box2d.Shape.PolyCentroid(b.vertices, b.vertexCount, box2d.PolyShape.tempVec);
    var h = box2d.PolyShape.tempVec.x, j = box2d.PolyShape.tempVec.y;
    this.m_localCentroid.x = b.localPosition.x + (g.col1.x * h + g.col2.x * j) - d.x;
    this.m_localCentroid.y = b.localPosition.y + (g.col1.y * h + g.col2.y * j) - d.y;
    for(e = 0;e < this.m_vertexCount;++e) {
      this.m_vertices[e] = new box2d.Vec2;
      this.m_coreVertices[e] = new box2d.Vec2;
      d = b.vertices[e].x - h;
      f = b.vertices[e].y - j;
      this.m_vertices[e].x = g.col1.x * d + g.col2.x * f;
      this.m_vertices[e].y = g.col1.y * d + g.col2.y * f;
      d = this.m_vertices[e].x;
      f = this.m_vertices[e].y;
      var k = Math.sqrt(d * d + f * f);
      k > Number.MIN_VALUE && (d *= 1 / k, f *= 1 / k);
      this.m_coreVertices[e].x = this.m_vertices[e].x - 2 * box2d.Settings.b2_linearSlop * d;
      this.m_coreVertices[e].y = this.m_vertices[e].y - 2 * box2d.Settings.b2_linearSlop * f
    }
  }
  b = g = Number.MAX_VALUE;
  d = -Number.MAX_VALUE;
  f = -Number.MAX_VALUE;
  for(e = this.m_maxRadius = 0;e < this.m_vertexCount;++e) {
    h = this.m_vertices[e], g = Math.min(g, h.x), b = Math.min(b, h.y), d = Math.max(d, h.x), f = Math.max(f, h.y), this.m_maxRadius = Math.max(this.m_maxRadius, h.magnitude())
  }
  this.m_localOBB.R.SetIdentity();
  this.m_localOBB.center.Set(0.5 * (g + d), 0.5 * (b + f));
  this.m_localOBB.extents.Set(0.5 * (d - g), 0.5 * (f - b));
  for(e = b = g = 0;e < this.m_vertexCount;++e) {
    this.m_normals[e] = new box2d.Vec2, g = e, b = e + 1 < this.m_vertexCount ? e + 1 : 0, this.m_normals[e].x = this.m_vertices[b].y - this.m_vertices[g].y, this.m_normals[e].y = -(this.m_vertices[b].x - this.m_vertices[g].x), this.m_normals[e].Normalize()
  }
  for(e = 0;e < this.m_vertexCount;++e) {
  }
  this.m_R.SetM(this.m_body.m_R);
  this.m_position.x = this.m_body.m_position.x + (this.m_R.col1.x * this.m_localCentroid.x + this.m_R.col2.x * this.m_localCentroid.y);
  this.m_position.y = this.m_body.m_position.y + (this.m_R.col1.y * this.m_localCentroid.x + this.m_R.col2.y * this.m_localCentroid.y);
  box2d.PolyShape.tAbsR.col1.x = this.m_R.col1.x * this.m_localOBB.R.col1.x + this.m_R.col2.x * this.m_localOBB.R.col1.y;
  box2d.PolyShape.tAbsR.col1.y = this.m_R.col1.y * this.m_localOBB.R.col1.x + this.m_R.col2.y * this.m_localOBB.R.col1.y;
  box2d.PolyShape.tAbsR.col2.x = this.m_R.col1.x * this.m_localOBB.R.col2.x + this.m_R.col2.x * this.m_localOBB.R.col2.y;
  box2d.PolyShape.tAbsR.col2.y = this.m_R.col1.y * this.m_localOBB.R.col2.x + this.m_R.col2.y * this.m_localOBB.R.col2.y;
  box2d.PolyShape.tAbsR.Abs();
  d = box2d.PolyShape.tAbsR.col1.x * this.m_localOBB.extents.x + box2d.PolyShape.tAbsR.col2.x * this.m_localOBB.extents.y;
  f = box2d.PolyShape.tAbsR.col1.y * this.m_localOBB.extents.x + box2d.PolyShape.tAbsR.col2.y * this.m_localOBB.extents.y;
  e = this.m_position.x + (this.m_R.col1.x * this.m_localOBB.center.x + this.m_R.col2.x * this.m_localOBB.center.y);
  g = this.m_position.y + (this.m_R.col1.y * this.m_localOBB.center.x + this.m_R.col2.y * this.m_localOBB.center.y);
  c.minVertex.x = e - d;
  c.minVertex.y = g - f;
  c.maxVertex.x = e + d;
  c.maxVertex.y = g + f;
  e = this.m_body.m_world.m_broadPhase;
  this.m_proxyId = e.InRange(c) ? e.CreateProxy(c, this) : box2d.Pair.b2_nullProxy;
  this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
};
goog.inherits(box2d.PolyShape, box2d.Shape);
box2d.PolyShape.prototype.TestPoint = function(b) {
  var c = new box2d.Vec2;
  c.SetV(b);
  c.subtract(this.m_position);
  c.MulTM(this.m_R);
  for(b = 0;b < this.m_vertexCount;++b) {
    var d = new box2d.Vec2;
    d.SetV(c);
    d.subtract(this.m_vertices[b]);
    if(0 < goog.math.Vec2.dot(this.m_normals[b], d)) {
      return!1
    }
  }
  return!0
};
box2d.PolyShape.prototype.syncAABB = new box2d.AABB;
box2d.PolyShape.prototype.syncMat = new box2d.Mat22;
box2d.PolyShape.prototype.Synchronize = function(b, c, d, e) {
  this.m_R.SetM(e);
  this.m_position.x = this.m_body.m_position.x + (e.col1.x * this.m_localCentroid.x + e.col2.x * this.m_localCentroid.y);
  this.m_position.y = this.m_body.m_position.y + (e.col1.y * this.m_localCentroid.x + e.col2.y * this.m_localCentroid.y);
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    var f, g;
    f = c.col1;
    g = c.col2;
    var h = this.m_localOBB.R.col1, j = this.m_localOBB.R.col2;
    this.syncMat.col1.x = f.x * h.x + g.x * h.y;
    this.syncMat.col1.y = f.y * h.x + g.y * h.y;
    this.syncMat.col2.x = f.x * j.x + g.x * j.y;
    this.syncMat.col2.y = f.y * j.x + g.y * j.y;
    this.syncMat.Abs();
    f = this.m_localCentroid.x + this.m_localOBB.center.x;
    g = this.m_localCentroid.y + this.m_localOBB.center.y;
    h = b.x + (c.col1.x * f + c.col2.x * g);
    b = b.y + (c.col1.y * f + c.col2.y * g);
    f = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    g = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = h - f;
    this.syncAABB.minVertex.y = b - g;
    this.syncAABB.maxVertex.x = h + f;
    this.syncAABB.maxVertex.y = b + g;
    f = e.col1;
    g = e.col2;
    h = this.m_localOBB.R.col1;
    j = this.m_localOBB.R.col2;
    this.syncMat.col1.x = f.x * h.x + g.x * h.y;
    this.syncMat.col1.y = f.y * h.x + g.y * h.y;
    this.syncMat.col2.x = f.x * j.x + g.x * j.y;
    this.syncMat.col2.y = f.y * j.x + g.y * j.y;
    this.syncMat.Abs();
    f = this.m_localCentroid.x + this.m_localOBB.center.x;
    g = this.m_localCentroid.y + this.m_localOBB.center.y;
    h = d.x + (e.col1.x * f + e.col2.x * g);
    b = d.y + (e.col1.y * f + e.col2.y * g);
    f = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
    g = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
    this.syncAABB.minVertex.x = Math.min(this.syncAABB.minVertex.x, h - f);
    this.syncAABB.minVertex.y = Math.min(this.syncAABB.minVertex.y, b - g);
    this.syncAABB.maxVertex.x = Math.max(this.syncAABB.maxVertex.x, h + f);
    this.syncAABB.maxVertex.y = Math.max(this.syncAABB.maxVertex.y, b + g);
    d = this.m_body.m_world.m_broadPhase;
    d.InRange(this.syncAABB) ? d.MoveProxy(this.m_proxyId, this.syncAABB) : this.m_body.Freeze()
  }
};
box2d.PolyShape.prototype.QuickSync = function(b, c) {
  this.m_R.SetM(c);
  this.m_position.x = b.x + (c.col1.x * this.m_localCentroid.x + c.col2.x * this.m_localCentroid.y);
  this.m_position.y = b.y + (c.col1.y * this.m_localCentroid.x + c.col2.y * this.m_localCentroid.y)
};
box2d.PolyShape.prototype.ResetProxy = function(b) {
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    b.GetProxy(this.m_proxyId);
    b.DestroyProxy(this.m_proxyId);
    var c = box2d.Math.b2MulMM(this.m_R, this.m_localOBB.R), c = box2d.Math.b2AbsM(c), c = box2d.Math.b2MulMV(c, this.m_localOBB.extents), d = box2d.Math.b2MulMV(this.m_R, this.m_localOBB.center);
    d.add(this.m_position);
    var e = new box2d.AABB;
    e.minVertex.SetV(d);
    e.minVertex.subtract(c);
    e.maxVertex.SetV(d);
    e.maxVertex.add(c);
    this.m_proxyId = b.InRange(e) ? b.CreateProxy(e, this) : box2d.Pair.b2_nullProxy;
    this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
  }
};
box2d.PolyShape.prototype.Support = function(b, c, d) {
  var e = b * this.m_R.col1.x + c * this.m_R.col1.y;
  b = b * this.m_R.col2.x + c * this.m_R.col2.y;
  c = 0;
  for(var f = this.m_coreVertices[0].x * e + this.m_coreVertices[0].y * b, g = 1;g < this.m_vertexCount;++g) {
    var h = this.m_coreVertices[g].x * e + this.m_coreVertices[g].y * b;
    h > f && (c = g, f = h)
  }
  d.Set(this.m_position.x + (this.m_R.col1.x * this.m_coreVertices[c].x + this.m_R.col2.x * this.m_coreVertices[c].y), this.m_position.y + (this.m_R.col1.y * this.m_coreVertices[c].x + this.m_R.col2.y * this.m_coreVertices[c].y))
};
box2d.PolyShape.tempVec = new box2d.Vec2;
box2d.PolyShape.tAbsR = new box2d.Mat22;
box2d.CircleShape = function(b, c, d) {
  box2d.Shape.call(this, b, c);
  this.m_localPosition = new box2d.Vec2;
  this.m_localPosition.Set(b.localPosition.x - d.x, b.localPosition.y - d.y);
  this.m_type = b.type;
  this.m_radius = b.radius;
  this.m_R.SetM(this.m_body.m_R);
  b = this.m_R.col1.x * this.m_localPosition.x + this.m_R.col2.x * this.m_localPosition.y;
  c = this.m_R.col1.y * this.m_localPosition.x + this.m_R.col2.y * this.m_localPosition.y;
  this.m_position.x = this.m_body.m_position.x + b;
  this.m_position.y = this.m_body.m_position.y + c;
  this.m_maxRadius = Math.sqrt(b * b + c * c) + this.m_radius;
  b = new box2d.AABB;
  b.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
  b.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
  c = this.m_body.m_world.m_broadPhase;
  this.m_proxyId = c.InRange(b) ? c.CreateProxy(b, this) : box2d.Pair.b2_nullProxy;
  this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
};
goog.inherits(box2d.CircleShape, box2d.Shape);
box2d.CircleShape.prototype.TestPoint = function(b) {
  var c = new box2d.Vec2;
  c.SetV(b);
  c.subtract(this.m_position);
  return goog.math.Vec2.dot(c, c) <= this.m_radius * this.m_radius
};
box2d.CircleShape.prototype.Synchronize = function(b, c, d, e) {
  this.m_R.SetM(e);
  this.m_position.x = e.col1.x * this.m_localPosition.x + e.col2.x * this.m_localPosition.y + d.x;
  this.m_position.y = e.col1.y * this.m_localPosition.x + e.col2.y * this.m_localPosition.y + d.y;
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    d = b.x + (c.col1.x * this.m_localPosition.x + c.col2.x * this.m_localPosition.y);
    e = b.y + (c.col1.y * this.m_localPosition.x + c.col2.y * this.m_localPosition.y);
    b = Math.min(d, this.m_position.x);
    c = Math.min(e, this.m_position.y);
    d = Math.max(d, this.m_position.x);
    var f = Math.max(e, this.m_position.y);
    e = new box2d.AABB;
    e.minVertex.Set(b - this.m_radius, c - this.m_radius);
    e.maxVertex.Set(d + this.m_radius, f + this.m_radius);
    b = this.m_body.m_world.m_broadPhase;
    b.InRange(e) ? b.MoveProxy(this.m_proxyId, e) : this.m_body.Freeze()
  }
};
box2d.CircleShape.prototype.QuickSync = function(b, c) {
  this.m_R.SetM(c);
  this.m_position.x = c.col1.x * this.m_localPosition.x + c.col2.x * this.m_localPosition.y + b.x;
  this.m_position.y = c.col1.y * this.m_localPosition.x + c.col2.y * this.m_localPosition.y + b.y
};
box2d.CircleShape.prototype.ResetProxy = function(b) {
  if(this.m_proxyId != box2d.Pair.b2_nullProxy) {
    b.GetProxy(this.m_proxyId);
    b.DestroyProxy(this.m_proxyId);
    var c = new box2d.AABB;
    c.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
    c.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
    this.m_proxyId = b.InRange(c) ? b.CreateProxy(c, this) : box2d.Pair.b2_nullProxy;
    this.m_proxyId == box2d.Pair.b2_nullProxy && this.m_body.Freeze()
  }
};
box2d.CircleShape.prototype.Support = function(b, c, d) {
  var e = Math.sqrt(b * b + c * c);
  d.Set(this.m_position.x + this.m_radius * (b / e), this.m_position.y + this.m_radius * (c / e))
};
box2d.ShapeFactory = {};
box2d.ShapeFactory.Create = function(b, c, d) {
  if(b instanceof box2d.CircleDef) {
    return new box2d.CircleShape(b, c, d)
  }
  if(b instanceof box2d.BoxDef || b instanceof box2d.PolyDef) {
    return new box2d.PolyShape(b, c, d)
  }
  throw"unsupported ShapeDef";
};
box2d.Math = {};
box2d.Math.b2MulMV = function(b, c) {
  return new box2d.Vec2(b.col1.x * c.x + b.col2.x * c.y, b.col1.y * c.x + b.col2.y * c.y)
};
box2d.Math.b2MulTMV = function(b, c) {
  return new box2d.Vec2(goog.math.Vec2.dot(c, b.col1), goog.math.Vec2.dot(c, b.col2))
};
box2d.Math.b2MulMM = function(b, c) {
  return new box2d.Mat22(0, box2d.Math.b2MulMV(b, c.col1), box2d.Math.b2MulMV(b, c.col2))
};
box2d.Math.b2AbsM = function(b) {
  return new box2d.Mat22(0, box2d.Vec2.abs(b.col1), box2d.Vec2.abs(b.col2))
};
box2d.Math.b2Clamp = function(b, c, d) {
  return Math.max(c, Math.min(b, d))
};
box2d.Body = function(b, c) {
  this.sMat0 = new box2d.Mat22;
  this.m_position = new box2d.Vec2;
  this.m_position.SetV(b.position);
  this.m_position0 = new box2d.Vec2;
  this.m_position0.SetV(this.m_position);
  var d = 0, e, f;
  this.m_flags = 0;
  this.m_rotation = b.rotation;
  this.m_R = new box2d.Mat22(0);
  this.m_R.Set(this.m_rotation);
  this.m_rotation0 = this.m_rotation;
  this.m_world = c;
  this.m_linearDamping = box2d.Math.b2Clamp(1 - b.linearDamping, 0, 1);
  this.m_angularDamping = box2d.Math.b2Clamp(1 - b.angularDamping, 0, 1);
  this.m_force = new box2d.Vec2(0, 0);
  this.m_mass = this.m_torque = 0;
  for(var g = Array(box2d.Settings.b2_maxShapesPerBody), d = 0;d < box2d.Settings.b2_maxShapesPerBody;d++) {
    g[d] = new box2d.MassData
  }
  this.m_shapeCount = 0;
  this.m_center = new box2d.Vec2(0, 0);
  for(d = 0;d < box2d.Settings.b2_maxShapesPerBody;++d) {
    e = b.shapes[d];
    if(null == e) {
      break
    }
    f = g[d];
    e.ComputeMass(f);
    this.m_mass += f.mass;
    this.m_center.x += f.mass * (e.localPosition.x + f.center.x);
    this.m_center.y += f.mass * (e.localPosition.y + f.center.y);
    ++this.m_shapeCount
  }
  0 < this.m_mass ? (this.m_center.scale(1 / this.m_mass), this.m_position.add(box2d.Math.b2MulMV(this.m_R, this.m_center))) : this.m_flags |= box2d.Body.Flags.staticFlag;
  for(d = this.m_I = 0;d < this.m_shapeCount;++d) {
    e = b.shapes[d], f = g[d], this.m_I += f.I, e = box2d.Vec2.subtract(box2d.Vec2.add(e.localPosition, f.center), this.m_center), this.m_I += f.mass * goog.math.Vec2.dot(e, e)
  }
  this.m_invMass = 0 < this.m_mass ? 1 / this.m_mass : 0;
  this.m_invI = 0 < this.m_I && !1 == b.preventRotation ? 1 / this.m_I : this.m_I = 0;
  this.m_linearVelocity = box2d.Vec2.add(b.linearVelocity, box2d.Vec2.crossScalar(b.angularVelocity, this.m_center));
  this.m_angularVelocity = b.angularVelocity;
  this.m_shapeList = this.m_next = this.m_prev = this.m_contactList = this.m_jointList = null;
  for(d = 0;d < this.m_shapeCount;++d) {
    e = b.shapes[d], f = box2d.ShapeFactory.Create(e, this, this.m_center), f.m_next = this.m_shapeList, this.m_shapeList = f
  }
  this.m_sleepTime = 0;
  b.allowSleep && (this.m_flags |= box2d.Body.Flags.allowSleepFlag);
  b.isSleeping && (this.m_flags |= box2d.Body.Flags.sleepFlag);
  if(this.m_flags & box2d.Body.Flags.sleepFlag || 0 == this.m_invMass) {
    this.m_linearVelocity.Set(0, 0), this.m_angularVelocity = 0
  }
  this.m_userData = b.userData
};
box2d.Body.prototype.SetOriginPosition = function(b, c) {
  if(!this.IsFrozen()) {
    this.m_rotation = c;
    this.m_R.Set(this.m_rotation);
    this.m_position = box2d.Vec2.add(b, box2d.Math.b2MulMV(this.m_R, this.m_center));
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for(var d = this.m_shapeList;null != d;d = d.m_next) {
      d.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
    }
    this.m_world.m_broadPhase.Commit()
  }
};
box2d.Body.prototype.GetOriginPosition = function() {
  return box2d.Vec2.subtract(this.m_position, box2d.Math.b2MulMV(this.m_R, this.m_center))
};
box2d.Body.prototype.SetCenterPosition = function(b, c) {
  if(!this.IsFrozen()) {
    this.m_rotation = c;
    this.m_R.Set(this.m_rotation);
    this.m_position.SetV(b);
    this.m_position0.SetV(this.m_position);
    this.m_rotation0 = this.m_rotation;
    for(var d = this.m_shapeList;null != d;d = d.m_next) {
      d.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
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
box2d.Body.prototype.SetAngularVelocity = function(b) {
  this.m_angularVelocity = b
};
box2d.Body.prototype.GetAngularVelocity = function() {
  return this.m_angularVelocity
};
box2d.Body.prototype.ApplyForce = function(b, c) {
  !1 == this.IsSleeping() && (this.m_force.add(b), this.m_torque += box2d.Vec2.cross(box2d.Vec2.subtract(c, this.m_position), b))
};
box2d.Body.prototype.ApplyTorque = function(b) {
  !1 == this.IsSleeping() && (this.m_torque += b)
};
box2d.Body.prototype.ApplyImpulse = function(b, c) {
  !1 == this.IsSleeping() && (this.m_linearVelocity.add(box2d.Vec2.multiplyScalar(this.m_invMass, b)), this.m_angularVelocity += this.m_invI * box2d.Vec2.cross(box2d.Vec2.subtract(c, this.m_position), b))
};
box2d.Body.prototype.GetMass = function() {
  return this.m_mass
};
box2d.Body.prototype.GetInertia = function() {
  return this.m_I
};
box2d.Body.prototype.GetWorldPoint = function(b) {
  return box2d.Vec2.add(this.m_position, box2d.Math.b2MulMV(this.m_R, b))
};
box2d.Body.prototype.GetWorldVector = function(b) {
  return box2d.Math.b2MulMV(this.m_R, b)
};
box2d.Body.prototype.GetLocalPoint = function(b) {
  return box2d.Math.b2MulTMV(this.m_R, box2d.Vec2.subtract(b, this.m_position))
};
box2d.Body.prototype.GetLocalVector = function(b) {
  return box2d.Math.b2MulTMV(this.m_R, b)
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
box2d.Body.prototype.AllowSleeping = function(b) {
  b ? this.m_flags |= box2d.Body.Flags.allowSleepFlag : (this.m_flags &= ~box2d.Body.Flags.allowSleepFlag, this.WakeUp())
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
  for(var b = this.m_shapeList;b;) {
    var c = b, b = b.m_next;
    box2d.Shape.Destroy(c)
  }
};
box2d.Body.prototype.SynchronizeShapes = function() {
  this.sMat0.Set(this.m_rotation0);
  for(var b = this.m_shapeList;null != b;b = b.m_next) {
    b.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R)
  }
};
box2d.Body.prototype.QuickSyncShapes = function() {
  for(var b = this.m_shapeList;null != b;b = b.m_next) {
    b.QuickSync(this.m_position, this.m_R)
  }
};
box2d.Body.prototype.IsConnected = function(b) {
  for(var c = this.m_jointList;null != c;c = c.next) {
    if(c.other == b) {
      return!1 == c.joint.m_collideConnected
    }
  }
  return!1
};
box2d.Body.prototype.Freeze = function() {
  this.m_flags |= box2d.Body.Flags.frozenFlag;
  this.m_linearVelocity.SetZero();
  this.m_angularVelocity = 0;
  for(var b = this.m_shapeList;null != b;b = b.m_next) {
    b.DestroyProxy()
  }
};
box2d.Body.prototype.SetLinearVelocity = function(b) {
  this.m_linearVelocity.SetV(b)
};
box2d.Body.prototype.GetLinearVelocity = function() {
  return this.m_linearVelocity
};
box2d.Body.Flags = {staticFlag:1, frozenFlag:2, islandFlag:4, sleepFlag:8, allowSleepFlag:16, destroyFlag:32};
box2d.CollisionFilter = function() {
};
box2d.CollisionFilter.prototype.ShouldCollide = function(b, c) {
  return b.m_groupIndex == c.m_groupIndex && 0 != b.m_groupIndex ? 0 < b.m_groupIndex : 0 != (b.maskBits & c.categoryBits) && 0 != (b.categoryBits & c.maskBits)
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
box2d.Contact = function(b, c) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !b || !c ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = b, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
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
box2d.Features = function(b) {
  this._m_id = b;
  this._flip = this._referenceFace = this._incidentVertex = this._incidentEdg = 0
};
box2d.Features.prototype.set_referenceFace = function(b) {
  this._referenceFace = b;
  this._m_id._key = this._m_id._key & 4294967040 | this._referenceFace & 255
};
box2d.Features.prototype.get_referenceFace = function() {
  return this._referenceFace
};
box2d.Features.prototype.set_incidentEdge = function(b) {
  this._incidentEdge = b;
  this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
};
box2d.Features.prototype.get_incidentEdge = function() {
  return this._incidentEdge
};
box2d.Features.prototype.set_incidentVertex = function(b) {
  this._incidentVertex = b;
  this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
};
box2d.Features.prototype.get_incidentVertex = function() {
  return this._incidentVertex
};
box2d.Features.prototype.set_flip = function(b) {
  this._flip = b;
  this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
};
box2d.Features.prototype.get_flip = function() {
  return this._flip
};
box2d.ContactID = function() {
  this._key = 0;
  this.features = new box2d.Features(this)
};
box2d.ContactID.prototype.Set = function(b) {
  this.set_key(b._key)
};
box2d.ContactID.prototype.Copy = function() {
  var b = new box2d.ContactID;
  b.set_key(this._key);
  return b
};
box2d.ContactID.prototype.get_key = function() {
  return this._key
};
box2d.ContactID.prototype.set_key = function(b) {
  this._key = b;
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
  for(var b = 0;b < box2d.Settings.b2_maxManifoldPoints;b++) {
    this.points[b] = new box2d.ContactPoint
  }
  this.normal = new box2d.Vec2
};
box2d.PolyContact = function(b, c) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !b || !c ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = b, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
  null, this.m_node2.other = null, this.m0 = new box2d.Manifold, this.m_manifold = [new box2d.Manifold], this.m_manifold[0].pointCount = 0)
};
goog.inherits(box2d.PolyContact, box2d.Contact);
box2d.PolyContact.prototype.Evaluate = function() {
  for(var b = this.m_manifold[0], c = this.m0.points, d = 0;d < b.pointCount;d++) {
    var e = c[d], f = b.points[d];
    e.normalImpulse = f.normalImpulse;
    e.tangentImpulse = f.tangentImpulse;
    e.id = f.id.Copy()
  }
  this.m0.pointCount = b.pointCount;
  box2d.Collision.b2CollidePoly(b, this.m_shape1, this.m_shape2, !1);
  if(0 < b.pointCount) {
    c = [!1, !1];
    for(d = 0;d < b.pointCount;++d) {
      e = b.points[d];
      e.normalImpulse = 0;
      e.tangentImpulse = 0;
      for(var f = e.id.key, g = 0;g < this.m0.pointCount;++g) {
        if(!0 != c[g]) {
          var h = this.m0.points[g];
          if(h.id.key == f) {
            c[g] = !0;
            e.normalImpulse = h.normalImpulse;
            e.tangentImpulse = h.tangentImpulse;
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
box2d.PolyContact.Create = function(b, c) {
  return new box2d.PolyContact(b, c)
};
box2d.PolyAndCircleContact = function(b, c) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !b || !c ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = b, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
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
box2d.PolyAndCircleContact.Create = function(b, c) {
  return new box2d.PolyAndCircleContact(b, c)
};
box2d.ClipVertex = function() {
  this.v = new box2d.Vec2;
  this.id = new box2d.ContactID
};
box2d.Collision = {};
box2d.Collision.b2_nullFeature = 255;
box2d.Collision.ClipSegmentToLine = function(b, c, d, e) {
  var f = 0, g = c[0].v, h = c[1].v, j = goog.math.Vec2.dot(d, c[0].v) - e;
  d = goog.math.Vec2.dot(d, c[1].v) - e;
  0 >= j && (b[f++] = c[0]);
  0 >= d && (b[f++] = c[1]);
  0 > j * d && (d = j / (j - d), e = b[f].v, e.x = g.x + d * (h.x - g.x), e.y = g.y + d * (h.y - g.y), b[f].id = 0 < j ? c[0].id : c[1].id, ++f);
  return f
};
box2d.Collision.EdgeSeparation = function(b, c, d) {
  for(var e = b.m_vertices, f = d.m_vertexCount, g = d.m_vertices, h = b.m_normals[c].x, j = b.m_normals[c].y, k = h, l = b.m_R, h = l.col1.x * k + l.col2.x * j, j = l.col1.y * k + l.col2.y * j, m = h, n = j, l = d.m_R, k = m * l.col1.x + n * l.col1.y, n = m * l.col2.x + n * l.col2.y, m = k, k = 0, l = Number.MAX_VALUE, q = 0;q < f;++q) {
    var r = g[q], r = r.x * m + r.y * n;
    r < l && (l = r, k = q)
  }
  l = b.m_R;
  f = b.m_position.x + (l.col1.x * e[c].x + l.col2.x * e[c].y);
  b = b.m_position.y + (l.col1.y * e[c].x + l.col2.y * e[c].y);
  l = d.m_R;
  c = d.m_position.x + (l.col1.x * g[k].x + l.col2.x * g[k].y);
  d = d.m_position.y + (l.col1.y * g[k].x + l.col2.y * g[k].y);
  return(c - f) * h + (d - b) * j
};
box2d.Collision.FindMaxSeparation = function(b, c, d, e) {
  for(var f = c.m_vertexCount, g = d.m_position.x - c.m_position.x, h = d.m_position.y - c.m_position.y, j = g * c.m_R.col1.x + h * c.m_R.col1.y, h = g * c.m_R.col2.x + h * c.m_R.col2.y, g = 0, k = -Number.MAX_VALUE, l = 0;l < f;++l) {
    var m = c.m_normals[l].x * j + c.m_normals[l].y * h;
    m > k && (k = m, g = l)
  }
  j = box2d.Collision.EdgeSeparation(c, g, d);
  if(0 < j && !1 == e) {
    return j
  }
  l = 0 <= g - 1 ? g - 1 : f - 1;
  m = box2d.Collision.EdgeSeparation(c, l, d);
  if(0 < m && !1 == e) {
    return m
  }
  var n = g + 1 < f ? g + 1 : 0, q = box2d.Collision.EdgeSeparation(c, n, d);
  if(0 < q && !1 == e) {
    return q
  }
  k = h = 0;
  if(m > j && m > q) {
    k = -1, h = l, l = m
  }else {
    if(q > j) {
      k = 1, h = n, l = q
    }else {
      return b[0] = g, j
    }
  }
  for(;;) {
    g = -1 == k ? 0 <= h - 1 ? h - 1 : f - 1 : h + 1 < f ? h + 1 : 0;
    j = box2d.Collision.EdgeSeparation(c, g, d);
    if(0 < j && !1 == e) {
      return j
    }
    if(j > l) {
      h = g, l = j
    }else {
      break
    }
  }
  b[0] = h;
  return l
};
box2d.Collision.FindIncidentEdge = function(b, c, d, e) {
  var f = c.m_vertices, g = e.m_vertexCount, h = e.m_vertices, j = f[d + 1 == c.m_vertexCount ? 0 : d + 1], k = j.x, l = j.y, j = f[d], k = k - j.x, l = l - j.y, j = k, k = l, l = -j, j = 1 / Math.sqrt(k * k + l * l), k = k * j, l = l * j, j = k, f = c.m_R, k = f.col1.x * j + f.col2.x * l, l = f.col1.y * j + f.col2.y * l;
  c = k;
  f = e.m_R;
  j = c * f.col1.x + l * f.col1.y;
  l = c * f.col2.x + l * f.col2.y;
  c = j;
  for(var f = k = 0, m = Number.MAX_VALUE, n = 0;n < g;++n) {
    var q = n, r = n + 1 < g ? n + 1 : 0, j = h[r], s = j.x, t = j.y, j = h[q], s = s - j.x, t = t - j.y, j = s, s = t, t = -j, j = 1 / Math.sqrt(s * s + t * t), s = s * j, t = t * j, j = s * c + t * l;
    j < m && (m = j, k = q, f = r)
  }
  g = b[0];
  j = g.v;
  j.SetV(h[k]);
  j.MulM(e.m_R);
  j.add(e.m_position);
  g.id.features.referenceFace = d;
  g.id.features.incidentEdge = k;
  g.id.features.incidentVertex = k;
  g = b[1];
  j = g.v;
  j.SetV(h[f]);
  j.MulM(e.m_R);
  j.add(e.m_position);
  g.id.features.referenceFace = d;
  g.id.features.incidentEdge = k;
  g.id.features.incidentVertex = f
};
box2d.Collision.b2CollidePolyTempVec = new box2d.Vec2;
box2d.Collision.b2CollidePoly = function(b, c, d, e) {
  b.pointCount = 0;
  var f, g = [0], h = box2d.Collision.FindMaxSeparation(g, c, d, e);
  f = g[0];
  if(!(0 < h && !1 == e)) {
    var j, g = [0], k = box2d.Collision.FindMaxSeparation(g, d, c, e);
    j = g[0];
    if(!(0 < k && !1 == e)) {
      var l = 0, g = 0;
      k > 0.98 * h + 0.0010 ? (h = d, l = j, g = 1) : (h = c, c = d, l = f, g = 0);
      d = [new box2d.ClipVertex, new box2d.ClipVertex];
      box2d.Collision.FindIncidentEdge(d, h, l, c);
      c = h.m_vertices;
      var m = c[l], n = l + 1 < h.m_vertexCount ? c[l + 1] : c[0];
      f = n.x - m.x;
      j = n.y - m.y;
      var q = f, r = h.m_R;
      f = r.col1.x * q + r.col2.x * j;
      j = r.col1.y * q + r.col2.y * j;
      l = 1 / Math.sqrt(f * f + j * j);
      f *= l;
      j *= l;
      q = f;
      l = j;
      c = -q;
      var k = m.x, s = m.y, q = k, r = h.m_R, k = r.col1.x * q + r.col2.x * s, s = r.col1.y * q + r.col2.y * s, k = k + h.m_position.x, s = s + h.m_position.y, m = n.x, n = n.y, q = m, r = h.m_R, m = r.col1.x * q + r.col2.x * n, n = r.col1.y * q + r.col2.y * n, m = m + h.m_position.x, n = n + h.m_position.y, h = l * k + c * s, q = -(f * k + j * s), m = f * m + j * n, n = [new box2d.ClipVertex, new box2d.ClipVertex], k = [new box2d.ClipVertex, new box2d.ClipVertex], r = 0;
      box2d.Collision.b2CollidePolyTempVec.Set(-f, -j);
      r = box2d.Collision.ClipSegmentToLine(n, d, box2d.Collision.b2CollidePolyTempVec, q);
      if(!(2 > r) && (box2d.Collision.b2CollidePolyTempVec.Set(f, j), r = box2d.Collision.ClipSegmentToLine(k, n, box2d.Collision.b2CollidePolyTempVec, m), !(2 > r))) {
        g ? b.normal.Set(-l, -c) : b.normal.Set(l, c);
        for(f = d = 0;f < box2d.Settings.b2_maxManifoldPoints;++f) {
          if(j = k[f].v, j = l * j.x + c * j.y - h, 0 >= j || !0 == e) {
            m = b.points[d], m.separation = j, m.position.SetV(k[f].v), m.id.Set(k[f].id), m.id.features.flip = g, ++d
          }
        }
        b.pointCount = d
      }
    }
  }
};
box2d.Collision.b2CollideCircle = function(b, c, d, e) {
  b.pointCount = 0;
  var f = d.m_position.x - c.m_position.x, g = d.m_position.y - c.m_position.y, h = f * f + g * g;
  c = c.m_radius + d.m_radius;
  h > c * c && !1 == e || (h < Number.MIN_VALUE ? (e = -c, b.normal.Set(0, 1)) : (h = Math.sqrt(h), e = h - c, h = 1 / h, b.normal.x = h * f, b.normal.y = h * g), b.pointCount = 1, f = b.points[0], f.id.set_key(0), f.separation = e, f.position.x = d.m_position.x - d.m_radius * b.normal.x, f.position.y = d.m_position.y - d.m_radius * b.normal.y)
};
box2d.Collision.b2CollidePolyAndCircle = function(b, c, d) {
  b.pointCount = 0;
  var e, f, g;
  f = d.m_position.x - c.m_position.x;
  g = d.m_position.y - c.m_position.y;
  var h = c.m_R, j = f * h.col1.x + g * h.col1.y;
  g = f * h.col2.x + g * h.col2.y;
  f = j;
  var k = 0, l = -Number.MAX_VALUE, j = d.m_radius;
  for(e = 0;e < c.m_vertexCount;++e) {
    var m = c.m_normals[e].x * (f - c.m_vertices[e].x) + c.m_normals[e].y * (g - c.m_vertices[e].y);
    if(m > j) {
      return
    }
    m > l && (l = m, k = e)
  }
  if(l < Number.MIN_VALUE) {
    b.pointCount = 1, g = c.m_normals[k], b.normal.x = h.col1.x * g.x + h.col2.x * g.y, b.normal.y = h.col1.y * g.x + h.col2.y * g.y, e = b.points[0], e.id.features.incidentEdge = k, e.id.features.incidentVertex = box2d.Collision.b2_nullFeature, e.id.features.referenceFace = box2d.Collision.b2_nullFeature, e.id.features.flip = 0, e.position.x = d.m_position.x - j * b.normal.x, e.position.y = d.m_position.y - j * b.normal.y, e.separation = l - j
  }else {
    var l = k + 1 < c.m_vertexCount ? k + 1 : 0, n = c.m_vertices[l].x - c.m_vertices[k].x, m = c.m_vertices[l].y - c.m_vertices[k].y, q = Math.sqrt(n * n + m * m), n = n / q, m = m / q;
    if(q < Number.MIN_VALUE) {
      f -= c.m_vertices[k].x, g -= c.m_vertices[k].y, c = Math.sqrt(f * f + g * g), f /= c, g /= c, c > j || (b.pointCount = 1, b.normal.Set(h.col1.x * f + h.col2.x * g, h.col1.y * f + h.col2.y * g), e = b.points[0], e.id.features.incidentEdge = box2d.Collision.b2_nullFeature, e.id.features.incidentVertex = k, e.id.features.referenceFace = box2d.Collision.b2_nullFeature, e.id.features.flip = 0, e.position.x = d.m_position.x - j * b.normal.x, e.position.y = d.m_position.y - j * b.normal.y, e.separation = 
      c - j)
    }else {
      var r = (f - c.m_vertices[k].x) * n + (g - c.m_vertices[k].y) * m;
      e = b.points[0];
      e.id.features.incidentEdge = box2d.Collision.b2_nullFeature;
      e.id.features.incidentVertex = box2d.Collision.b2_nullFeature;
      e.id.features.referenceFace = box2d.Collision.b2_nullFeature;
      e.id.features.flip = 0;
      0 >= r ? (n = c.m_vertices[k].x, c = c.m_vertices[k].y, e.id.features.incidentVertex = k) : r >= q ? (n = c.m_vertices[l].x, c = c.m_vertices[l].y, e.id.features.incidentVertex = l) : (n = n * r + c.m_vertices[k].x, c = m * r + c.m_vertices[k].y, e.id.features.incidentEdge = k);
      f -= n;
      g -= c;
      c = Math.sqrt(f * f + g * g);
      f /= c;
      g /= c;
      c > j || (b.pointCount = 1, b.normal.Set(h.col1.x * f + h.col2.x * g, h.col1.y * f + h.col2.y * g), e.position.x = d.m_position.x - j * b.normal.x, e.position.y = d.m_position.y - j * b.normal.y, e.separation = c - j)
    }
  }
};
box2d.Collision.b2TestOverlap = function(b, c) {
  var d = c.minVertex, e = b.maxVertex, f = d.x - e.x, g = d.y - e.y, d = b.minVertex, e = c.maxVertex, h = d.y - e.y;
  return 0 < f || 0 < g || 0 < d.x - e.x || 0 < h ? !1 : !0
};
box2d.CircleContact = function(b, c) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !b || !c ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = b, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
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
box2d.CircleContact.Create = function(b, c) {
  return new box2d.CircleContact(b, c)
};
box2d.ContactFactory = {};
box2d.ContactFactory.Create = function(b, c) {
  !1 == box2d.ContactFactory.s_initialized && (box2d.ContactFactory._InitializeRegisters(), box2d.ContactFactory.s_initialized = !0);
  var d = b.m_type, e = c.m_type, f = box2d.ContactFactory.s_registers[d][e].createFcn;
  if(f) {
    if(box2d.ContactFactory.s_registers[d][e].primary) {
      return f(b, c)
    }
    d = f(c, b);
    for(e = 0;e < d.GetManifoldCount();++e) {
      f = d.GetManifolds()[e], f.normal = f.normal.Negative()
    }
    return d
  }
  return null
};
box2d.ContactFactory.Destroy = function(b) {
  0 < b.GetManifoldCount() && (b.m_shape1.m_body.WakeUp(), b.m_shape2.m_body.WakeUp())
};
box2d.ContactFactory._InitializeRegisters = function() {
  box2d.ContactFactory.s_registers = Array(box2d.ShapeDef.Type.shapeTypeCount);
  for(var b = 0;b < box2d.ShapeDef.Type.shapeTypeCount;b++) {
    box2d.ContactFactory.s_registers[b] = Array(box2d.ShapeDef.Type.shapeTypeCount);
    for(var c = 0;c < box2d.ShapeDef.Type.shapeTypeCount;c++) {
      box2d.ContactFactory.s_registers[b][c] = new box2d.ContactRegister
    }
  }
  box2d.ContactFactory._AddType(box2d.CircleContact.Create, box2d.ShapeDef.Type.circleShape, box2d.ShapeDef.Type.circleShape);
  box2d.ContactFactory._AddType(box2d.PolyAndCircleContact.Create, box2d.ShapeDef.Type.polyShape, box2d.ShapeDef.Type.circleShape);
  box2d.ContactFactory._AddType(box2d.PolyContact.Create, box2d.ShapeDef.Type.polyShape, box2d.ShapeDef.Type.polyShape)
};
box2d.ContactFactory._AddType = function(b, c, d) {
  box2d.ContactFactory.s_registers[c][d].createFcn = b;
  box2d.ContactFactory.s_registers[c][d].primary = !0;
  c != d && (box2d.ContactFactory.s_registers[d][c].createFcn = b, box2d.ContactFactory.s_registers[d][c].primary = !1)
};
box2d.ContactFactory.s_registers = null;
box2d.ContactFactory.s_initialized = !1;
box2d.NullContact = function(b, c) {
  this.m_node1 = new box2d.ContactNode;
  this.m_node2 = new box2d.ContactNode;
  this.m_flags = 0;
  !b || !c ? this.m_shape2 = this.m_shape1 = null : (this.m_shape1 = b, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = Math.max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = 
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
box2d.ContactManager = function(b) {
  this.m_nullContact = new box2d.NullContact;
  this.m_world = b;
  this.m_destroyImmediate = !1
};
goog.inherits(box2d.ContactManager, box2d.PairCallback);
box2d.ContactManager.prototype.PairAdded = function(b, c) {
  var d = b, e = c, f = d.m_body, g = e.m_body;
  if(f.IsStatic() && g.IsStatic() || d.m_body == e.m_body || g.IsConnected(f) || !1 == this.m_world.collisionFilter.ShouldCollide(d, e)) {
    return this.m_nullContact
  }
  0 == g.m_invMass && (f = d, d = e, e = f);
  d = box2d.ContactFactory.Create(d, e);
  if(null == d) {
    return this.m_nullContact
  }
  d.m_prev = null;
  d.m_next = this.m_world.m_contactList;
  null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = d);
  this.m_world.m_contactList = d;
  this.m_world.m_contactCount++;
  return d
};
box2d.ContactManager.prototype.PairRemoved = function(b, c, d) {
  null != d && d != this.m_nullContact && (!0 == this.m_destroyImmediate ? this.DestroyContact(d) : d.m_flags |= box2d.Contact.e_destroyFlag)
};
box2d.ContactManager.prototype.DestroyContact = function(b) {
  b.m_prev && (b.m_prev.m_next = b.m_next);
  b.m_next && (b.m_next.m_prev = b.m_prev);
  b == this.m_world.m_contactList && (this.m_world.m_contactList = b.m_next);
  if(0 < b.GetManifoldCount()) {
    var c = b.m_shape1.m_body, d = b.m_shape2.m_body, e = b.m_node1;
    b = b.m_node2;
    c.WakeUp();
    d.WakeUp();
    e.prev && (e.prev.next = e.next);
    e.next && (e.next.prev = e.prev);
    e == c.m_contactList && (c.m_contactList = e.next);
    e.prev = null;
    e.next = null;
    b.prev && (b.prev.next = b.next);
    b.next && (b.next.prev = b.prev);
    b == d.m_contactList && (d.m_contactList = b.next);
    b.prev = null;
    b.next = null
  }
  --this.m_world.m_contactCount
};
box2d.ContactManager.prototype.CleanContactList = function() {
  for(var b = this.m_world.m_contactList;null != b;) {
    var c = b, b = b.m_next;
    c.m_flags & box2d.Contact.e_destroyFlag && this.DestroyContact(c)
  }
};
box2d.ContactManager.prototype.Collide = function() {
  for(var b, c, d, e, f = this.m_world.m_contactList;null != f;f = f.m_next) {
    if(!f.m_shape1.m_body.IsSleeping() || !f.m_shape2.m_body.IsSleeping()) {
      b = f.GetManifoldCount(), f.Evaluate(), c = f.GetManifoldCount(), 0 == b && 0 < c ? (b = f.m_shape1.m_body, c = f.m_shape2.m_body, d = f.m_node1, e = f.m_node2, d.contact = f, d.other = c, d.prev = null, d.next = b.m_contactList, null != d.next && (d.next.prev = f.m_node1), b.m_contactList = f.m_node1, e.contact = f, e.other = b, e.prev = null, e.next = c.m_contactList, null != e.next && (e.next.prev = e), c.m_contactList = e) : 0 < b && 0 == c && (b = f.m_shape1.m_body, c = f.m_shape2.m_body, 
      d = f.m_node1, e = f.m_node2, d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), d == b.m_contactList && (b.m_contactList = d.next), d.prev = null, d.next = null, e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e == c.m_contactList && (c.m_contactList = e.next), e.prev = null, e.next = null)
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
  for(var b = 0;b < box2d.Settings.b2_maxManifoldPoints;b++) {
    this.points[b] = new box2d.ContactConstraintPoint
  }
};
box2d.ContactSolver = function(b, c) {
  this.m_constraints = [];
  for(var d = 0, e, f, d = this.m_constraintCount = 0;d < c;++d) {
    this.m_constraintCount += b[d].GetManifoldCount()
  }
  for(d = 0;d < this.m_constraintCount;d++) {
    this.m_constraints[d] = new box2d.ContactConstraint
  }
  for(var g = 0, d = 0;d < c;++d) {
    for(var h = b[d], j = h.m_shape1.m_body, k = h.m_shape2.m_body, l = h.GetManifoldCount(), m = h.GetManifolds(), n = h.m_friction, h = h.m_restitution, q = j.m_linearVelocity.x, r = j.m_linearVelocity.y, s = k.m_linearVelocity.x, t = k.m_linearVelocity.y, u = j.m_angularVelocity, v = k.m_angularVelocity, z = 0;z < l;++z) {
      var A = m[z], w = A.normal.x, C = A.normal.y, y = this.m_constraints[g];
      y.body1 = j;
      y.body2 = k;
      y.manifold = A;
      y.normal.x = w;
      y.normal.y = C;
      y.pointCount = A.pointCount;
      y.friction = n;
      y.restitution = h;
      for(var D = 0;D < y.pointCount;++D) {
        var x = A.points[D], B = y.points[D];
        B.normalImpulse = x.normalImpulse;
        B.tangentImpulse = x.tangentImpulse;
        B.separation = x.separation;
        var E = x.position.x - j.m_position.x, H = x.position.y - j.m_position.y, I = x.position.x - k.m_position.x, x = x.position.y - k.m_position.y;
        e = B.localAnchor1;
        f = j.m_R;
        e.x = E * f.col1.x + H * f.col1.y;
        e.y = E * f.col2.x + H * f.col2.y;
        e = B.localAnchor2;
        f = k.m_R;
        e.x = I * f.col1.x + x * f.col1.y;
        e.y = I * f.col2.x + x * f.col2.y;
        e = E * E + H * H;
        f = I * I + x * x;
        var J = E * w + H * C, G = I * w + x * C, F = j.m_invMass + k.m_invMass, F = F + (j.m_invI * (e - J * J) + k.m_invI * (f - G * G));
        B.normalMass = 1 / F;
        G = C;
        F = -w;
        J = E * G + H * F;
        G = I * G + x * F;
        F = j.m_invMass + k.m_invMass;
        F += j.m_invI * (e - J * J) + k.m_invI * (f - G * G);
        B.tangentMass = 1 / F;
        B.velocityBias = 0;
        0 < B.separation && (B.velocityBias = -60 * B.separation);
        E = y.normal.x * (s + -v * x - q - -u * H) + y.normal.y * (t + v * I - r - u * E);
        E < -box2d.Settings.b2_velocityThreshold && (B.velocityBias += -y.restitution * E)
      }
      ++g
    }
  }
};
box2d.ContactSolver.prototype = {PreSolve:function() {
  for(var b, c, d = 0;d < this.m_constraintCount;++d) {
    var e = this.m_constraints[d], f = e.body1, g = e.body2, h = f.m_invMass, j = f.m_invI, k = g.m_invMass, l = g.m_invI, m = e.normal.x, n = e.normal.y, q = n, r = -m, s = 0, t = 0;
    if(box2d.World.s_enableWarmStarting) {
      t = e.pointCount;
      for(s = 0;s < t;++s) {
        var u = e.points[s], v = u.normalImpulse * m + u.tangentImpulse * q, z = u.normalImpulse * n + u.tangentImpulse * r;
        c = f.m_R;
        b = u.localAnchor1;
        var A = c.col1.x * b.x + c.col2.x * b.y, w = c.col1.y * b.x + c.col2.y * b.y;
        c = g.m_R;
        b = u.localAnchor2;
        var C = c.col1.x * b.x + c.col2.x * b.y;
        b = c.col1.y * b.x + c.col2.y * b.y;
        f.m_angularVelocity -= j * (A * z - w * v);
        f.m_linearVelocity.x -= h * v;
        f.m_linearVelocity.y -= h * z;
        g.m_angularVelocity += l * (C * z - b * v);
        g.m_linearVelocity.x += k * v;
        g.m_linearVelocity.y += k * z;
        u.positionImpulse = 0
      }
    }else {
      t = e.pointCount;
      for(s = 0;s < t;++s) {
        f = e.points[s], f.normalImpulse = 0, f.tangentImpulse = 0, f.positionImpulse = 0
      }
    }
  }
}, SolveVelocityConstraints:function() {
  for(var b = 0, c, d, e, f, g, h, j, k, l = 0;l < this.m_constraintCount;++l) {
    for(var m = this.m_constraints[l], n = m.body1, q = m.body2, r = n.m_angularVelocity, s = n.m_linearVelocity, t = q.m_angularVelocity, u = q.m_linearVelocity, v = n.m_invMass, z = n.m_invI, A = q.m_invMass, w = q.m_invI, C = m.normal.x, y = m.normal.y, D = y, x = -C, B = m.pointCount, b = 0;b < B;++b) {
      c = m.points[b], g = n.m_R, h = c.localAnchor1, d = g.col1.x * h.x + g.col2.x * h.y, e = g.col1.y * h.x + g.col2.y * h.y, g = q.m_R, h = c.localAnchor2, f = g.col1.x * h.x + g.col2.x * h.y, g = g.col1.y * h.x + g.col2.y * h.y, h = u.x + -t * g - s.x - -r * e, j = u.y + t * f - s.y - r * d, h = -c.normalMass * (h * C + j * y - c.velocityBias), j = Math.max(c.normalImpulse + h, 0), h = j - c.normalImpulse, k = h * C, h *= y, s.x -= v * k, s.y -= v * h, r -= z * (d * h - e * k), u.x += A * k, 
      u.y += A * h, t += w * (f * h - g * k), c.normalImpulse = j, h = u.x + -t * g - s.x - -r * e, j = u.y + t * f - s.y - r * d, h = c.tangentMass * -(h * D + j * x), j = m.friction * c.normalImpulse, j = box2d.Math.b2Clamp(c.tangentImpulse + h, -j, j), h = j - c.tangentImpulse, k = h * D, h *= x, s.x -= v * k, s.y -= v * h, r -= z * (d * h - e * k), u.x += A * k, u.y += A * h, t += w * (f * h - g * k), c.tangentImpulse = j
    }
    n.m_angularVelocity = r;
    q.m_angularVelocity = t
  }
}, SolvePositionConstraints:function(b) {
  for(var c = 0, d, e, f = 0;f < this.m_constraintCount;++f) {
    for(var g = this.m_constraints[f], h = g.body1, j = g.body2, k = h.m_position, l = h.m_rotation, m = j.m_position, n = j.m_rotation, q = h.m_invMass, r = h.m_invI, s = j.m_invMass, t = j.m_invI, u = g.normal.x, v = g.normal.y, z = g.pointCount, A = 0;A < z;++A) {
      var w = g.points[A];
      d = h.m_R;
      e = w.localAnchor1;
      var C = d.col1.x * e.x + d.col2.x * e.y, y = d.col1.y * e.x + d.col2.y * e.y;
      d = j.m_R;
      e = w.localAnchor2;
      var D = d.col1.x * e.x + d.col2.x * e.y;
      d = d.col1.y * e.x + d.col2.y * e.y;
      e = (m.x + D - (k.x + C)) * u + (m.y + d - (k.y + y)) * v + w.separation;
      c = Math.min(c, e);
      e = b * box2d.Math.b2Clamp(e + box2d.Settings.b2_linearSlop, -box2d.Settings.b2_maxLinearCorrection, 0);
      e *= -w.normalMass;
      var x = w.positionImpulse;
      w.positionImpulse = Math.max(x + e, 0);
      e = w.positionImpulse - x;
      w = e * u;
      e *= v;
      k.x -= q * w;
      k.y -= q * e;
      l -= r * (C * e - y * w);
      h.m_R.Set(l);
      m.x += s * w;
      m.y += s * e;
      n += t * (D * e - d * w);
      j.m_R.Set(n)
    }
    h.m_rotation = l;
    j.m_rotation = n
  }
  return c >= -box2d.Settings.b2_linearSlop
}, PostSolve:function() {
  for(var b = 0;b < this.m_constraintCount;++b) {
    for(var c = this.m_constraints[b], d = c.manifold, e = 0;e < c.pointCount;++e) {
      var f = d.points[e], g = c.points[e];
      f.normalImpulse = g.normalImpulse;
      f.tangentImpulse = g.tangentImpulse
    }
  }
}};
box2d.Island = function(b, c, d) {
  var e = 0;
  this.m_bodyCapacity = b;
  this.m_contactCapacity = c;
  this.m_jointCapacity = d;
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
  this.m_bodies = Array(b);
  for(e = 0;e < b;e++) {
    this.m_bodies[e] = null
  }
  this.m_contacts = Array(c);
  for(e = 0;e < c;e++) {
    this.m_contacts[e] = null
  }
  this.m_joints = Array(d);
  for(e = 0;e < d;e++) {
    this.m_joints[e] = null
  }
};
box2d.Island.prototype.Clear = function() {
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
};
box2d.Island.prototype.Solve = function(b, c) {
  for(var d = 0, e, d = 0;d < this.m_bodyCount;++d) {
    e = this.m_bodies[d], 0 != e.m_invMass && (e.m_linearVelocity.add(box2d.Vec2.multiplyScalar(b.dt, box2d.Vec2.add(c, box2d.Vec2.multiplyScalar(e.m_invMass, e.m_force)))), e.m_angularVelocity += b.dt * e.m_invI * e.m_torque, e.m_linearVelocity.scale(e.m_linearDamping), e.m_angularVelocity *= e.m_angularDamping, e.m_position0.SetV(e.m_position), e.m_rotation0 = e.m_rotation)
  }
  var f = new box2d.ContactSolver(this.m_contacts, this.m_contactCount);
  f.PreSolve();
  for(d = 0;d < this.m_jointCount;++d) {
    this.m_joints[d].PrepareVelocitySolver()
  }
  for(d = 0;d < b.iterations;++d) {
    f.SolveVelocityConstraints();
    for(e = 0;e < this.m_jointCount;++e) {
      this.m_joints[e].SolveVelocityConstraints(b)
    }
  }
  for(d = 0;d < this.m_bodyCount;++d) {
    e = this.m_bodies[d], 0 != e.m_invMass && (e.m_position.x += b.dt * e.m_linearVelocity.x, e.m_position.y += b.dt * e.m_linearVelocity.y, e.m_rotation += b.dt * e.m_angularVelocity, e.m_R.Set(e.m_rotation))
  }
  for(d = 0;d < this.m_jointCount;++d) {
    this.m_joints[d].PreparePositionSolver()
  }
  if(box2d.World.s_enablePositionCorrection) {
    for(box2d.Island.m_positionIterationCount = 0;box2d.Island.m_positionIterationCount < b.iterations;++box2d.Island.m_positionIterationCount) {
      e = f.SolvePositionConstraints(box2d.Settings.b2_contactBaumgarte);
      for(var g = !0, d = 0;d < this.m_jointCount;++d) {
        var h = this.m_joints[d].SolvePositionConstraints(), g = g && h
      }
      if(e && g) {
        break
      }
    }
  }
  f.PostSolve();
  for(d = 0;d < this.m_bodyCount;++d) {
    e = this.m_bodies[d], 0 != e.m_invMass && (e.m_R.Set(e.m_rotation), e.SynchronizeShapes(), e.m_force.Set(0, 0), e.m_torque = 0)
  }
};
box2d.Island.prototype.UpdateSleep = function(b) {
  for(var c = 0, d, e = Number.MAX_VALUE, f = box2d.Settings.b2_linearSleepTolerance * box2d.Settings.b2_linearSleepTolerance, g = box2d.Settings.b2_angularSleepTolerance * box2d.Settings.b2_angularSleepTolerance, c = 0;c < this.m_bodyCount;++c) {
    d = this.m_bodies[c], 0 != d.m_invMass && (0 == (d.m_flags & box2d.Body.Flags.allowSleepFlag) && (e = d.m_sleepTime = 0), 0 == (d.m_flags & box2d.Body.Flags.allowSleepFlag) || d.m_angularVelocity * d.m_angularVelocity > g || goog.math.Vec2.dot(d.m_linearVelocity, d.m_linearVelocity) > f ? e = d.m_sleepTime = 0 : (d.m_sleepTime += b, e = Math.min(e, d.m_sleepTime)))
  }
  if(e >= box2d.Settings.b2_timeToSleep) {
    for(c = 0;c < this.m_bodyCount;++c) {
      d = this.m_bodies[c], d.m_flags |= box2d.Body.Flags.sleepFlag
    }
    return!0
  }
  return!1
};
box2d.Island.prototype.AddBody = function(b) {
  this.m_bodies[this.m_bodyCount++] = b
};
box2d.Island.prototype.AddContact = function(b) {
  this.m_contacts[this.m_contactCount++] = b
};
box2d.Island.prototype.AddJoint = function(b) {
  this.m_joints[this.m_jointCount++] = b
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
  var b = 0;
  this.m_hashTable = Array(box2d.Pair.b2_tableCapacity);
  for(b = 0;b < box2d.Pair.b2_tableCapacity;++b) {
    this.m_hashTable[b] = box2d.Pair.b2_nullPair
  }
  this.m_pairs = Array(box2d.Settings.b2_maxPairs);
  for(b = 0;b < box2d.Settings.b2_maxPairs;++b) {
    this.m_pairs[b] = new box2d.Pair
  }
  this.m_pairBuffer = Array(box2d.Settings.b2_maxPairs);
  for(b = 0;b < box2d.Settings.b2_maxPairs;++b) {
    this.m_pairBuffer[b] = new box2d.BufferedPair
  }
  for(b = 0;b < box2d.Settings.b2_maxPairs;++b) {
    this.m_pairs[b].proxyId1 = box2d.Pair.b2_nullProxy, this.m_pairs[b].proxyId2 = box2d.Pair.b2_nullProxy, this.m_pairs[b].userData = null, this.m_pairs[b].status = 0, this.m_pairs[b].next = b + 1
  }
  this.m_pairs[box2d.Settings.b2_maxPairs - 1].next = box2d.Pair.b2_nullPair;
  this.m_pairCount = 0
};
box2d.PairManager.prototype = {Initialize:function(b, c) {
  this.m_broadPhase = b;
  this.m_callback = c
}, AddBufferedPair:function(b, c) {
  var d = this.AddPair(b, c);
  !1 == d.IsBuffered() && (d.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = d.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = d.proxyId2, ++this.m_pairBufferCount);
  d.ClearRemoved();
  box2d.BroadPhase.s_validate && this.ValidateBuffer()
}, RemoveBufferedPair:function(b, c) {
  var d = this._find(b, c);
  null != d && (!1 == d.IsBuffered() && (d.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = d.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = d.proxyId2, ++this.m_pairBufferCount), d.SetRemoved(), box2d.BroadPhase.s_validate && this.ValidateBuffer())
}, AddPair:function(b, c) {
  if(b > c) {
    var d = b;
    b = c;
    c = d
  }
  var d = box2d.PairManager.Hash(b, c) & box2d.Pair.b2_tableMask, e = this._findHash(b, c, d);
  if(null != e) {
    return e
  }
  var f = this.m_freePair, e = this.m_pairs[f];
  this.m_freePair = e.next;
  e.proxyId1 = b;
  e.proxyId2 = c;
  e.status = 0;
  e.userData = null;
  e.next = this.m_hashTable[d];
  this.m_hashTable[d] = f;
  ++this.m_pairCount;
  return e
}, RemovePair:function(b, c) {
  if(b > c) {
    var d = b;
    b = c;
    c = d
  }
  for(var e = box2d.PairManager.Hash(b, c) & box2d.Pair.b2_tableMask, f = this.m_hashTable[e], g = null;f != box2d.Pair.b2_nullPair;) {
    if(box2d.PairManager.Equals(this.m_pairs[f], b, c)) {
      return d = f, g ? g.next = this.m_pairs[f].next : this.m_hashTable[e] = this.m_pairs[f].next, e = this.m_pairs[d], f = e.userData, e.next = this.m_freePair, e.proxyId1 = box2d.Pair.b2_nullProxy, e.proxyId2 = box2d.Pair.b2_nullProxy, e.userData = null, e.status = 0, this.m_freePair = d, --this.m_pairCount, f
    }
    g = this.m_pairs[f];
    f = g.next
  }
  return null
}, ValidateBuffer:function() {
}, ValidateTable:function() {
}, m_broadPhase:null, m_callback:null, m_freePair:0, m_pairCount:0, m_pairBuffer:null, m_pairBufferCount:0, m_hashTable:null};
box2d.PairManager.prototype._find = function(b, c) {
  if(b > c) {
    var d = b;
    b = c;
    c = d
  }
  d = box2d.PairManager.Hash(b, c) & box2d.Pair.b2_tableMask;
  return this._findHash(b, c, d)
};
box2d.PairManager.prototype._findHash = function(b, c, d) {
  for(d = this.m_hashTable[d];d != box2d.Pair.b2_nullPair && !1 == box2d.PairManager.Equals(this.m_pairs[d], b, c);) {
    d = this.m_pairs[d].next
  }
  return d == box2d.Pair.b2_nullPair ? null : this.m_pairs[d]
};
box2d.PairManager.prototype.Commit = function() {
  for(var b = 0, c = 0, d = this.m_broadPhase.proxyPool, e = [], b = 0;b < this.m_pairBufferCount;++b) {
    var f = this._find(this.m_pairBuffer[b].proxyId1, this.m_pairBuffer[b].proxyId2);
    f.ClearBuffered();
    var g = d[f.proxyId1], h = d[f.proxyId2];
    f.IsRemoved() ? (!0 == f.IsFinal() && this.m_callback.PairRemoved(g.userData, h.userData, f.userData), this.m_pairBuffer[c].proxyId1 = f.proxyId1, this.m_pairBuffer[c].proxyId2 = f.proxyId2, ++c) : !1 == f.IsFinal() && (f.contactData = this.m_callback.PairAdded(g.userData, h.userData), e.push(f.contactData), f.SetFinal())
  }
  for(b = 0;b < c;++b) {
    this.RemovePair(this.m_pairBuffer[b].proxyId1, this.m_pairBuffer[b].proxyId2)
  }
  this.m_pairBufferCount = 0;
  box2d.BroadPhase.s_validate && this.ValidateTable();
  return e
};
box2d.PairManager.Hash = function(b, c) {
  var d = c << 16 & 4294901760 | b, d = ~d + (d << 15 & 4294934528), d = d ^ d >> 12 & 1048575, d = d + (d << 2 & 4294967292), d = 2057 * (d ^ d >> 4 & 268435455);
  return d ^= d >> 16 & 65535
};
box2d.PairManager.Equals = function(b, c, d) {
  return b.proxyId1 == c && b.proxyId2 == d
};
box2d.PairManager.EqualsPair = function(b, c) {
  return b.proxyId1 == c.proxyId1 && b.proxyId2 == c.proxyId2
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
box2d.Bound.prototype.Swap = function(b) {
  var c = this.value, d = this.proxyId, e = this.stabbingCount;
  this.value = b.value;
  this.proxyId = b.proxyId;
  this.stabbingCount = b.stabbingCount;
  b.value = c;
  b.proxyId = d;
  b.stabbingCount = e
};
box2d.Proxy = function() {
  this.lowerBounds = [0, 0];
  this.upperBounds = [0, 0];
  this.timeStamp = this.overlapCount = 0;
  this.userData = null
};
box2d.Proxy.prototype = {GetNext:function() {
  return this.lowerBounds[0]
}, SetNext:function(b) {
  this.lowerBounds[0] = b
}, IsValid:function() {
  return this.overlapCount != box2d.Settings.invalid
}};
box2d.BoundValues = function() {
  this.lowerValues = [0, 0];
  this.upperValues = [0, 0]
};
box2d.BroadPhase = function(b, c) {
  this.m_pairManager = new box2d.PairManager;
  this.proxyPool = Array(box2d.Settings.b2_maxPairs);
  this.m_bounds = Array(2 * box2d.Settings.b2_maxProxies);
  this.m_queryResults = Array(box2d.Settings.b2_maxProxies);
  this.m_quantizationFactor = new box2d.Vec2;
  var d = 0;
  this.m_pairManager.Initialize(this, c);
  this.m_worldAABB = b;
  for(d = this.m_proxyCount = 0;d < box2d.Settings.b2_maxProxies;d++) {
    this.m_queryResults[d] = 0
  }
  this.m_bounds = Array(2);
  for(d = 0;2 > d;d++) {
    this.m_bounds[d] = Array(2 * box2d.Settings.b2_maxProxies);
    for(var e = 0;e < 2 * box2d.Settings.b2_maxProxies;e++) {
      this.m_bounds[d][e] = new box2d.Bound
    }
  }
  d = b.maxVertex.x;
  e = b.maxVertex.y;
  d -= b.minVertex.x;
  e -= b.minVertex.y;
  this.m_quantizationFactor.x = box2d.Settings.USHRT_MAX / d;
  this.m_quantizationFactor.y = box2d.Settings.USHRT_MAX / e;
  for(d = 0;d < box2d.Settings.b2_maxProxies - 1;++d) {
    e = new box2d.Proxy, this.proxyPool[d] = e, e.SetNext(d + 1), e.timeStamp = 0, e.overlapCount = box2d.Settings.invalid, e.userData = null
  }
  e = new box2d.Proxy;
  this.proxyPool[box2d.Settings.b2_maxProxies - 1] = e;
  e.SetNext(box2d.Pair.b2_nullProxy);
  e.timeStamp = 0;
  e.overlapCount = box2d.Settings.invalid;
  e.userData = null;
  this.m_freeProxy = 0;
  this.m_timeStamp = 1;
  this.m_queryResultCount = 0
};
box2d.BroadPhase.prototype.InRange = function(b) {
  var c, d, e, f;
  c = b.minVertex.x;
  d = b.minVertex.y;
  c -= this.m_worldAABB.maxVertex.x;
  d -= this.m_worldAABB.maxVertex.y;
  e = this.m_worldAABB.minVertex.x;
  f = this.m_worldAABB.minVertex.y;
  e -= b.maxVertex.x;
  f -= b.maxVertex.y;
  c = Math.max(c, e);
  d = Math.max(d, f);
  return 0 > Math.max(c, d)
};
box2d.BroadPhase.prototype.GetProxy = function(b) {
  return b == box2d.Pair.b2_nullProxy || !1 == this.proxyPool[b].IsValid() ? null : this.proxyPool[b]
};
box2d.BroadPhase.prototype.DestroyProxy = function(b) {
  for(var c = this.proxyPool[b], d = 2 * this.m_proxyCount, e = 0;2 > e;++e) {
    for(var f = this.m_bounds[e], g = c.lowerBounds[e], h = c.upperBounds[e], j = f[g].value, k = f[h].value, l = [], m = 0, n = h - g - 1, q, r, m = 0;m < n;m++) {
      l[m] = new box2d.Bound, q = l[m], r = f[g + 1 + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    for(var n = l.length, s = g, m = 0;m < n;m++) {
      r = l[m], q = f[s + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    l = [];
    n = d - h - 1;
    for(m = 0;m < n;m++) {
      l[m] = new box2d.Bound, q = l[m], r = f[h + 1 + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    n = l.length;
    s = h - 1;
    for(m = 0;m < n;m++) {
      r = l[m], q = f[s + m], q.value = r.value, q.proxyId = r.proxyId, q.stabbingCount = r.stabbingCount
    }
    n = d - 2;
    for(l = g;l < n;++l) {
      m = this.proxyPool[f[l].proxyId], f[l].IsLower() ? m.lowerBounds[e] = l : m.upperBounds[e] = l
    }
    for(n = h - 1;g < n;++g) {
      f[g].stabbingCount--
    }
    this.Query([0], [0], j, k, f, d - 2, e)
  }
  for(d = 0;d < this.m_queryResultCount;++d) {
    this.m_pairManager.RemoveBufferedPair(b, this.m_queryResults[d])
  }
  this.m_pairManager.Commit();
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  c.userData = null;
  c.overlapCount = box2d.Settings.invalid;
  c.lowerBounds[0] = box2d.Settings.invalid;
  c.lowerBounds[1] = box2d.Settings.invalid;
  c.upperBounds[0] = box2d.Settings.invalid;
  c.upperBounds[1] = box2d.Settings.invalid;
  c.SetNext(this.m_freeProxy);
  this.m_freeProxy = b;
  --this.m_proxyCount
};
box2d.BroadPhase.prototype.QueryAABB = function(b, c, d) {
  var e = [], f = [];
  this.ComputeBounds(e, f, b);
  b = [0];
  var g = [0];
  this.Query(b, g, e[0], f[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  this.Query(b, g, e[1], f[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  for(f = e = 0;f < this.m_queryResultCount && e < d;++f, ++e) {
    c[f] = this.proxyPool[this.m_queryResults[f]].userData
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return e
};
box2d.BroadPhase.prototype.Validate = function() {
  for(var b = 0;2 > b;++b) {
    for(var c = this.m_bounds[b], d = 2 * this.m_proxyCount, e = 0, f = 0;f < d;++f) {
      !0 == c[f].IsLower() ? e++ : e--
    }
  }
};
box2d.BroadPhase.prototype.ComputeBounds = function(b, c, d) {
  var e = d.minVertex.x, f = d.minVertex.y, e = Math.min(e, this.m_worldAABB.maxVertex.x), f = Math.min(f, this.m_worldAABB.maxVertex.y), e = Math.max(e, this.m_worldAABB.minVertex.x), f = Math.max(f, this.m_worldAABB.minVertex.y), g = d.maxVertex.x;
  d = d.maxVertex.y;
  g = Math.min(g, this.m_worldAABB.maxVertex.x);
  d = Math.min(d, this.m_worldAABB.maxVertex.y);
  g = Math.max(g, this.m_worldAABB.minVertex.x);
  d = Math.max(d, this.m_worldAABB.minVertex.y);
  b[0] = this.m_quantizationFactor.x * (e - this.m_worldAABB.minVertex.x) & box2d.Settings.USHRT_MAX - 1;
  c[0] = this.m_quantizationFactor.x * (g - this.m_worldAABB.minVertex.x) & 65535 | 1;
  b[1] = this.m_quantizationFactor.y * (f - this.m_worldAABB.minVertex.y) & box2d.Settings.USHRT_MAX - 1;
  c[1] = this.m_quantizationFactor.y * (d - this.m_worldAABB.minVertex.y) & 65535 | 1
};
box2d.BroadPhase.prototype.TestOverlapValidate = function(b, c) {
  for(var d = 0;2 > d;++d) {
    var e = this.m_bounds[d];
    if(e[b.lowerBounds[d]].value > e[c.upperBounds[d]].value || e[b.upperBounds[d]].value < e[c.lowerBounds[d]].value) {
      return!1
    }
  }
  return!0
};
box2d.BroadPhase.prototype.TestOverlap = function(b, c) {
  for(var d = 0;2 > d;++d) {
    var e = this.m_bounds[d];
    if(b.lowerValues[d] > e[c.upperBounds[d]].value || b.upperValues[d] < e[c.lowerBounds[d]].value) {
      return!1
    }
  }
  return!0
};
box2d.BroadPhase.prototype.Query = function(b, c, d, e, f, g, h) {
  d = box2d.BroadPhase.BinarySearch(f, g, d);
  e = box2d.BroadPhase.BinarySearch(f, g, e);
  for(g = d;g < e;++g) {
    f[g].IsLower() && this.IncrementOverlapCount(f[g].proxyId)
  }
  if(0 < d) {
    g = d - 1;
    for(var j = f[g].stabbingCount;j;) {
      f[g].IsLower() && d <= this.proxyPool[f[g].proxyId].upperBounds[h] && (this.IncrementOverlapCount(f[g].proxyId), --j), --g
    }
  }
  b[0] = d;
  c[0] = e
};
box2d.BroadPhase.prototype.IncrementOverlapCount = function(b) {
  var c = this.proxyPool[b];
  c.timeStamp < this.m_timeStamp ? (c.timeStamp = this.m_timeStamp, c.overlapCount = 1) : (c.overlapCount = 2, this.m_queryResults[this.m_queryResultCount] = b, ++this.m_queryResultCount)
};
box2d.BroadPhase.prototype.IncrementTimeStamp = function() {
  if(this.m_timeStamp == box2d.Settings.USHRT_MAX) {
    for(var b = 0;b < box2d.Settings.b2_maxProxies;++b) {
      this.proxyPool[b].timeStamp = 0
    }
    this.m_timeStamp = 1
  }else {
    ++this.m_timeStamp
  }
};
box2d.BroadPhase.prototype.MoveProxy = function(b, c) {
  var d = 0, e = 0, f, g, h = 0, j;
  if(!(b == box2d.Pair.b2_nullProxy || box2d.Settings.b2_maxProxies <= b) && !1 != c.IsValid()) {
    var k = 2 * this.m_proxyCount, l = this.proxyPool[b], m = new box2d.BoundValues;
    this.ComputeBounds(m.lowerValues, m.upperValues, c);
    for(var n = new box2d.BoundValues, d = 0;2 > d;++d) {
      n.lowerValues[d] = this.m_bounds[d][l.lowerBounds[d]].value, n.upperValues[d] = this.m_bounds[d][l.upperBounds[d]].value
    }
    for(d = 0;2 > d;++d) {
      var q = this.m_bounds[d], r = l.lowerBounds[d], s = l.upperBounds[d], t = m.lowerValues[d], u = m.upperValues[d], v = t - q[r].value, z = u - q[s].value;
      q[r].value = t;
      q[s].value = u;
      if(0 > v) {
        for(e = r;0 < e && t < q[e - 1].value;) {
          f = q[e], g = q[e - 1], h = g.proxyId, j = this.proxyPool[g.proxyId], g.stabbingCount++, !0 == g.IsUpper() ? (this.TestOverlap(m, j) && this.m_pairManager.AddBufferedPair(b, h), j.upperBounds[d]++, f.stabbingCount++) : (j.lowerBounds[d]++, f.stabbingCount--), l.lowerBounds[d]--, f.Swap(g), --e
        }
      }
      if(0 < z) {
        for(e = s;e < k - 1 && q[e + 1].value <= u;) {
          f = q[e], g = q[e + 1], h = g.proxyId, j = this.proxyPool[h], g.stabbingCount++, !0 == g.IsLower() ? (this.TestOverlap(m, j) && this.m_pairManager.AddBufferedPair(b, h), j.lowerBounds[d]--, f.stabbingCount++) : (j.upperBounds[d]--, f.stabbingCount--), l.upperBounds[d]++, f.Swap(g), e++
        }
      }
      if(0 < v) {
        for(e = r;e < k - 1 && q[e + 1].value <= t;) {
          f = q[e], g = q[e + 1], h = g.proxyId, j = this.proxyPool[h], g.stabbingCount--, g.IsUpper() ? (this.TestOverlap(n, j) && this.m_pairManager.RemoveBufferedPair(b, h), j.upperBounds[d]--, f.stabbingCount--) : (j.lowerBounds[d]--, f.stabbingCount++), l.lowerBounds[d]++, f.Swap(g), e++
        }
      }
      if(0 > z) {
        for(e = s;0 < e && u < q[e - 1].value;) {
          f = q[e], g = q[e - 1], h = g.proxyId, j = this.proxyPool[h], g.stabbingCount--, !0 == g.IsLower() ? (this.TestOverlap(n, j) && this.m_pairManager.RemoveBufferedPair(b, h), j.lowerBounds[d]++, f.stabbingCount--) : (j.upperBounds[d]++, f.stabbingCount++), l.upperBounds[d]--, f.Swap(g), e--
        }
      }
    }
  }
};
box2d.BroadPhase.prototype.Commit = function() {
  return this.m_pairManager.Commit()
};
box2d.BroadPhase.prototype.CreateProxy = function(b, c) {
  var d = 0, e, f = this.m_freeProxy;
  e = this.proxyPool[f];
  this.m_freeProxy = e.GetNext();
  e.overlapCount = 0;
  e.userData = c;
  e = 2 * this.m_proxyCount;
  var g = [], h = [];
  this.ComputeBounds(g, h, b);
  for(var j = 0;2 > j;++j) {
    var k = this.m_bounds[j], l = 0, m = 0, l = [l], m = [m];
    this.Query(l, m, g[j], h[j], k, e, j);
    for(var l = l[0], m = m[0], d = [], n = 0, q = e - m, r, s, n = 0;n < q;n++) {
      d[n] = new box2d.Bound, r = d[n], s = k[m + n], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount
    }
    for(var q = d.length, t = m + 2, n = 0;n < q;n++) {
      s = d[n], r = k[t + n], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount
    }
    d = [];
    q = m - l;
    for(n = 0;n < q;n++) {
      d[n] = new box2d.Bound, r = d[n], s = k[l + n], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount
    }
    q = d.length;
    t = l + 1;
    for(n = 0;n < q;n++) {
      s = d[n], r = k[t + n], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount
    }
    ++m;
    k[l].value = g[j];
    k[l].proxyId = f;
    k[m].value = h[j];
    k[m].proxyId = f;
    k[l].stabbingCount = 0 == l ? 0 : k[l - 1].stabbingCount;
    k[m].stabbingCount = k[m - 1].stabbingCount;
    for(d = l;d < m;++d) {
      k[d].stabbingCount++
    }
    for(d = l;d < e + 2;++d) {
      l = this.proxyPool[k[d].proxyId], k[d].IsLower() ? l.lowerBounds[j] = d : l.upperBounds[j] = d
    }
  }
  ++this.m_proxyCount;
  for(e = 0;e < this.m_queryResultCount;++e) {
    this.m_pairManager.AddBufferedPair(f, this.m_queryResults[e])
  }
  this.m_pairManager.Commit();
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return f
};
box2d.BroadPhase.m_freeProxy = 0;
box2d.BroadPhase.s_validate = !1;
box2d.BroadPhase.b2_nullEdge = box2d.Settings.USHRT_MAX;
box2d.BroadPhase.BinarySearch = function(b, c, d) {
  var e = 0;
  for(c -= 1;e <= c;) {
    var f = Math.floor((e + c) / 2);
    if(b[f].value > d) {
      c = f - 1
    }else {
      if(b[f].value < d) {
        e = f + 1
      }else {
        return f
      }
    }
  }
  return e
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
}, Set:function(b, c, d, e) {
  this.linear1.SetV(b);
  this.angular1 = c;
  this.linear2.SetV(d);
  this.angular2 = e
}, Compute:function(b, c, d, e) {
  return this.linear1.x * b.x + this.linear1.y * b.y + this.angular1 * c + (this.linear2.x * d.x + this.linear2.y * d.y) + this.angular2 * e
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
box2d.PrismaticJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_localXAxis1 = new box2d.Vec2;
  this.m_localYAxis1 = new box2d.Vec2;
  this.m_linearJacobian = new box2d.Jacobian;
  this.m_motorJacobian = new box2d.Jacobian;
  var c, d, e;
  c = this.m_body1.m_R;
  d = b.anchorPoint.x - this.m_body1.m_position.x;
  e = b.anchorPoint.y - this.m_body1.m_position.y;
  this.m_localAnchor1.Set(d * c.col1.x + e * c.col1.y, d * c.col2.x + e * c.col2.y);
  c = this.m_body2.m_R;
  d = b.anchorPoint.x - this.m_body2.m_position.x;
  e = b.anchorPoint.y - this.m_body2.m_position.y;
  this.m_localAnchor2.Set(d * c.col1.x + e * c.col1.y, d * c.col2.x + e * c.col2.y);
  c = this.m_body1.m_R;
  d = b.axis.x;
  e = b.axis.y;
  this.m_localXAxis1.Set(d * c.col1.x + e * c.col1.y, d * c.col2.x + e * c.col2.y);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_initialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
  this.m_linearJacobian.SetZero();
  this.m_angularImpulse = this.m_angularMass = this.m_linearImpulse = this.m_linearMass = 0;
  this.m_motorJacobian.SetZero();
  this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse = this.m_motorMass = 0;
  this.m_lowerTranslation = b.lowerTranslation;
  this.m_upperTranslation = b.upperTranslation;
  this.m_maxMotorForce = b.motorForce;
  this.m_motorSpeed = b.motorSpeed;
  this.m_enableLimit = b.enableLimit;
  this.m_enableMotor = b.enableMotor
};
goog.inherits(box2d.PrismaticJoint, box2d.Joint);
box2d.PrismaticJoint.prototype.GetAnchor1 = function() {
  var b = this.m_body1, c = new box2d.Vec2;
  c.SetV(this.m_localAnchor1);
  c.MulM(b.m_R);
  c.add(b.m_position);
  return c
};
box2d.PrismaticJoint.prototype.GetAnchor2 = function() {
  var b = this.m_body2, c = new box2d.Vec2;
  c.SetV(this.m_localAnchor2);
  c.MulM(b.m_R);
  c.add(b.m_position);
  return c
};
box2d.PrismaticJoint.prototype.GetJointTranslation = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  e = c.m_position.x + (d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y) - (b.m_position.x + e);
  c = c.m_position.y + (d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y) - (b.m_position.y + f);
  d = b.m_R;
  return(d.col1.x * this.m_localXAxis1.x + d.col2.x * this.m_localXAxis1.y) * e + (d.col1.y * this.m_localXAxis1.x + d.col2.y * this.m_localXAxis1.y) * c
};
box2d.PrismaticJoint.prototype.GetJointSpeed = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y, h = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y, j = c.m_position.x + g - (b.m_position.x + e), k = c.m_position.y + h - (b.m_position.y + f);
  d = b.m_R;
  var l = d.col1.x * this.m_localXAxis1.x + d.col2.x * this.m_localXAxis1.y;
  d = d.col1.y * this.m_localXAxis1.x + d.col2.y * this.m_localXAxis1.y;
  var m = b.m_linearVelocity, n = c.m_linearVelocity, b = b.m_angularVelocity, c = c.m_angularVelocity;
  return j * -b * d + k * b * l + (l * (n.x + -c * h - m.x - -b * f) + d * (n.y + c * g - m.y - b * e))
};
box2d.PrismaticJoint.prototype.GetMotorForce = function(b) {
  return b * this.m_motorImpulse
};
box2d.PrismaticJoint.prototype.SetMotorSpeed = function(b) {
  this.m_motorSpeed = b
};
box2d.PrismaticJoint.prototype.SetMotorForce = function(b) {
  this.m_maxMotorForce = b
};
box2d.PrismaticJoint.prototype.GetReactionForce = function(b) {
  b *= this.m_limitImpulse;
  var c;
  c = this.m_body1.m_R;
  return new box2d.Vec2(b * (c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y) + b * (c.col1.x * this.m_localYAxis1.x + c.col2.x * this.m_localYAxis1.y), b * (c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y) + b * (c.col1.y * this.m_localYAxis1.x + c.col2.y * this.m_localYAxis1.y))
};
box2d.PrismaticJoint.prototype.GetReactionTorque = function(b) {
  return b * this.m_angularImpulse
};
box2d.PrismaticJoint.prototype.PrepareVelocitySolver = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y, h = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y, j = b.m_invMass, k = c.m_invMass, l = b.m_invI, m = c.m_invI;
  d = b.m_R;
  var n = d.col1.x * this.m_localYAxis1.x + d.col2.x * this.m_localYAxis1.y;
  d = d.col1.y * this.m_localYAxis1.x + d.col2.y * this.m_localYAxis1.y;
  var q = c.m_position.x + g - b.m_position.x, r = c.m_position.y + h - b.m_position.y;
  this.m_linearJacobian.linear1.x = -n;
  this.m_linearJacobian.linear1.y = -d;
  this.m_linearJacobian.linear2.x = n;
  this.m_linearJacobian.linear2.y = d;
  this.m_linearJacobian.angular1 = -(q * d - r * n);
  this.m_linearJacobian.angular2 = g * d - h * n;
  this.m_linearMass = j + l * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 + k + m * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
  this.m_linearMass = 1 / this.m_linearMass;
  this.m_angularMass = 1 / (l + m);
  if(this.m_enableLimit || this.m_enableMotor) {
    d = b.m_R, n = d.col1.x * this.m_localXAxis1.x + d.col2.x * this.m_localXAxis1.y, d = d.col1.y * this.m_localXAxis1.x + d.col2.y * this.m_localXAxis1.y, this.m_motorJacobian.linear1.x = -n, this.m_motorJacobian.linear1.y = -d, this.m_motorJacobian.linear2.x = n, this.m_motorJacobian.linear2.y = d, this.m_motorJacobian.angular1 = -(q * d - r * n), this.m_motorJacobian.angular2 = g * d - h * n, this.m_motorMass = j + l * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + k + m * this.m_motorJacobian.angular2 * 
    this.m_motorJacobian.angular2, this.m_motorMass = 1 / this.m_motorMass, this.m_enableLimit && (e = n * (q - e) + d * (r - f), Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * box2d.Settings.b2_linearSlop ? this.m_limitState = box2d.Joint.e_equalLimits : e <= this.m_lowerTranslation ? (this.m_limitState != box2d.Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atLowerLimit) : e >= this.m_upperTranslation ? (this.m_limitState != box2d.Joint.e_atUpperLimit && 
    (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atUpperLimit) : (this.m_limitState = box2d.Joint.e_inactiveLimit, this.m_limitImpulse = 0))
  }
  !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
  !1 == this.m_enableLimit && (this.m_limitImpulse = 0);
  box2d.World.s_enableWarmStarting ? (e = this.m_linearImpulse * this.m_linearJacobian.linear1.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.y, f = this.m_linearImpulse * this.m_linearJacobian.linear2.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.x, g = this.m_linearImpulse * this.m_linearJacobian.linear2.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.y, h = this.m_linearImpulse * this.m_linearJacobian.angular1 - 
  this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular1, q = this.m_linearImpulse * this.m_linearJacobian.angular2 + this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular2, b.m_linearVelocity.x += j * (this.m_linearImpulse * this.m_linearJacobian.linear1.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.x), b.m_linearVelocity.y += j * e, b.m_angularVelocity += l * h, c.m_linearVelocity.x += 
  k * f, c.m_linearVelocity.y += k * g, c.m_angularVelocity += m * q) : this.m_motorImpulse = this.m_limitImpulse = this.m_angularImpulse = this.m_linearImpulse = 0;
  this.m_limitPositionImpulse = 0
};
box2d.PrismaticJoint.prototype.SolveVelocityConstraints = function(b) {
  var c = this.m_body1, d = this.m_body2, e = c.m_invMass, f = d.m_invMass, g = c.m_invI, h = d.m_invI, j = this.m_linearJacobian.Compute(c.m_linearVelocity, c.m_angularVelocity, d.m_linearVelocity, d.m_angularVelocity), j = -this.m_linearMass * j;
  this.m_linearImpulse += j;
  c.m_linearVelocity.x += e * j * this.m_linearJacobian.linear1.x;
  c.m_linearVelocity.y += e * j * this.m_linearJacobian.linear1.y;
  c.m_angularVelocity += g * j * this.m_linearJacobian.angular1;
  d.m_linearVelocity.x += f * j * this.m_linearJacobian.linear2.x;
  d.m_linearVelocity.y += f * j * this.m_linearJacobian.linear2.y;
  d.m_angularVelocity += h * j * this.m_linearJacobian.angular2;
  j = -this.m_angularMass * (d.m_angularVelocity - c.m_angularVelocity);
  this.m_angularImpulse += j;
  c.m_angularVelocity -= g * j;
  d.m_angularVelocity += h * j;
  if(this.m_enableMotor && this.m_limitState != box2d.Joint.e_equalLimits) {
    var j = this.m_motorJacobian.Compute(c.m_linearVelocity, c.m_angularVelocity, d.m_linearVelocity, d.m_angularVelocity) - this.m_motorSpeed, j = -this.m_motorMass * j, k = this.m_motorImpulse;
    this.m_motorImpulse = box2d.Math.b2Clamp(this.m_motorImpulse + j, -b.dt * this.m_maxMotorForce, b.dt * this.m_maxMotorForce);
    j = this.m_motorImpulse - k;
    c.m_linearVelocity.x += e * j * this.m_motorJacobian.linear1.x;
    c.m_linearVelocity.y += e * j * this.m_motorJacobian.linear1.y;
    c.m_angularVelocity += g * j * this.m_motorJacobian.angular1;
    d.m_linearVelocity.x += f * j * this.m_motorJacobian.linear2.x;
    d.m_linearVelocity.y += f * j * this.m_motorJacobian.linear2.y;
    d.m_angularVelocity += h * j * this.m_motorJacobian.angular2
  }
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (b = this.m_motorJacobian.Compute(c.m_linearVelocity, c.m_angularVelocity, d.m_linearVelocity, d.m_angularVelocity), j = -this.m_motorMass * b, this.m_limitState == box2d.Joint.e_equalLimits ? this.m_limitImpulse += j : this.m_limitState == box2d.Joint.e_atLowerLimit ? (b = this.m_limitImpulse, this.m_limitImpulse = Math.max(this.m_limitImpulse + j, 0), j = this.m_limitImpulse - b) : this.m_limitState == box2d.Joint.e_atUpperLimit && 
  (b = this.m_limitImpulse, this.m_limitImpulse = Math.min(this.m_limitImpulse + j, 0), j = this.m_limitImpulse - b), c.m_linearVelocity.x += e * j * this.m_motorJacobian.linear1.x, c.m_linearVelocity.y += e * j * this.m_motorJacobian.linear1.y, c.m_angularVelocity += g * j * this.m_motorJacobian.angular1, d.m_linearVelocity.x += f * j * this.m_motorJacobian.linear2.x, d.m_linearVelocity.y += f * j * this.m_motorJacobian.linear2.y, d.m_angularVelocity += h * j * this.m_motorJacobian.angular2)
};
box2d.PrismaticJoint.prototype.SolvePositionConstraints = function() {
  var b, c, d = this.m_body1, e = this.m_body2, f = d.m_invMass, g = e.m_invMass, h = d.m_invI, j = e.m_invI;
  b = d.m_R;
  var k = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y, l = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y;
  b = e.m_R;
  var m = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y;
  b = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y;
  var k = d.m_position.x + k, l = d.m_position.y + l, m = e.m_position.x + m, n = e.m_position.y + b;
  b = d.m_R;
  var q = (b.col1.x * this.m_localYAxis1.x + b.col2.x * this.m_localYAxis1.y) * (m - k) + (b.col1.y * this.m_localYAxis1.x + b.col2.y * this.m_localYAxis1.y) * (n - l), q = box2d.Math.b2Clamp(q, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection);
  c = -this.m_linearMass * q;
  d.m_position.x += f * c * this.m_linearJacobian.linear1.x;
  d.m_position.y += f * c * this.m_linearJacobian.linear1.y;
  d.m_rotation += h * c * this.m_linearJacobian.angular1;
  e.m_position.x += g * c * this.m_linearJacobian.linear2.x;
  e.m_position.y += g * c * this.m_linearJacobian.linear2.y;
  e.m_rotation += j * c * this.m_linearJacobian.angular2;
  q = Math.abs(q);
  c = e.m_rotation - d.m_rotation - this.m_initialAngle;
  c = box2d.Math.b2Clamp(c, -box2d.Settings.b2_maxAngularCorrection, box2d.Settings.b2_maxAngularCorrection);
  var r = -this.m_angularMass * c;
  d.m_rotation -= d.m_invI * r;
  d.m_R.Set(d.m_rotation);
  e.m_rotation += e.m_invI * r;
  e.m_R.Set(e.m_rotation);
  r = Math.abs(c);
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (b = d.m_R, k = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y, l = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y, b = e.m_R, m = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y, b = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y, k = d.m_position.x + k, l = d.m_position.y + l, m = e.m_position.x + m, n = e.m_position.y + b, b = d.m_R, k = 
  (b.col1.x * this.m_localXAxis1.x + b.col2.x * this.m_localXAxis1.y) * (m - k) + (b.col1.y * this.m_localXAxis1.x + b.col2.y * this.m_localXAxis1.y) * (n - l), b = 0, this.m_limitState == box2d.Joint.e_equalLimits ? (b = box2d.Math.b2Clamp(k, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection), b *= -this.m_motorMass, q = Math.max(q, Math.abs(c))) : this.m_limitState == box2d.Joint.e_atLowerLimit ? (b = k - this.m_lowerTranslation, q = Math.max(q, -b), b = box2d.Math.b2Clamp(b + 
  box2d.Settings.b2_linearSlop, -box2d.Settings.b2_maxLinearCorrection, 0), b *= -this.m_motorMass, c = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.max(this.m_limitPositionImpulse + b, 0), b = this.m_limitPositionImpulse - c) : this.m_limitState == box2d.Joint.e_atUpperLimit && (b = k - this.m_upperTranslation, q = Math.max(q, b), b = box2d.Math.b2Clamp(b - box2d.Settings.b2_linearSlop, 0, box2d.Settings.b2_maxLinearCorrection), b *= -this.m_motorMass, c = this.m_limitPositionImpulse, 
  this.m_limitPositionImpulse = Math.min(this.m_limitPositionImpulse + b, 0), b = this.m_limitPositionImpulse - c), d.m_position.x += f * b * this.m_motorJacobian.linear1.x, d.m_position.y += f * b * this.m_motorJacobian.linear1.y, d.m_rotation += h * b * this.m_motorJacobian.angular1, d.m_R.Set(d.m_rotation), e.m_position.x += g * b * this.m_motorJacobian.linear2.x, e.m_position.y += g * b * this.m_motorJacobian.linear2.y, e.m_rotation += j * b * this.m_motorJacobian.angular2, e.m_R.Set(e.m_rotation));
  return q <= box2d.Settings.b2_linearSlop && r <= box2d.Settings.b2_angularSlop
};
box2d.MouseJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.K = new box2d.Mat22;
  this.K1 = new box2d.Mat22;
  this.K2 = new box2d.Mat22;
  this.m_localAnchor = new box2d.Vec2;
  this.m_target = new box2d.Vec2;
  this.m_impulse = new box2d.Vec2;
  this.m_ptpMass = new box2d.Mat22;
  this.m_C = new box2d.Vec2;
  this.m_target.SetV(b.target);
  var c = this.m_target.x - this.m_body2.m_position.x, d = this.m_target.y - this.m_body2.m_position.y;
  this.m_localAnchor.x = c * this.m_body2.m_R.col1.x + d * this.m_body2.m_R.col1.y;
  this.m_localAnchor.y = c * this.m_body2.m_R.col2.x + d * this.m_body2.m_R.col2.y;
  this.m_maxForce = b.maxForce;
  this.m_impulse.SetZero();
  var d = this.m_body2.m_mass, e = 2 * box2d.Settings.b2_pi * b.frequencyHz, c = 2 * d * b.dampingRatio * e, d = d * e * e;
  this.m_gamma = 1 / (c + b.timeStep * d);
  this.m_beta = b.timeStep * d / (c + b.timeStep * d)
};
goog.inherits(box2d.MouseJoint, box2d.Joint);
box2d.MouseJoint.prototype.GetAnchor1 = function() {
  return this.m_target
};
box2d.MouseJoint.prototype.GetAnchor2 = function() {
  var b = box2d.Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor);
  b.add(this.m_body2.m_position);
  return b
};
box2d.MouseJoint.prototype.GetReactionForce = function(b) {
  var c = new box2d.Vec2;
  c.SetV(this.m_impulse);
  c.scale(b);
  return c
};
box2d.MouseJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.MouseJoint.prototype.SetTarget = function(b) {
  this.m_body2.WakeUp();
  this.m_target = b
};
box2d.MouseJoint.prototype.PrepareVelocitySolver = function() {
  var b = this.m_body2, c;
  c = b.m_R;
  var d = c.col1.x * this.m_localAnchor.x + c.col2.x * this.m_localAnchor.y;
  c = c.col1.y * this.m_localAnchor.x + c.col2.y * this.m_localAnchor.y;
  var e = b.m_invMass, f = b.m_invI;
  this.K1.col1.x = e;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = e;
  this.K2.col1.x = f * c * c;
  this.K2.col2.x = -f * d * c;
  this.K2.col1.y = -f * d * c;
  this.K2.col2.y = f * d * d;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.col1.x += this.m_gamma;
  this.K.col2.y += this.m_gamma;
  this.K.Invert(this.m_ptpMass);
  this.m_C.x = b.m_position.x + d - this.m_target.x;
  this.m_C.y = b.m_position.y + c - this.m_target.y;
  b.m_angularVelocity *= 0.98;
  var g = this.m_impulse.x, h = this.m_impulse.y;
  b.m_linearVelocity.x += e * g;
  b.m_linearVelocity.y += e * h;
  b.m_angularVelocity += f * (d * h - c * g)
};
box2d.MouseJoint.prototype.SolveVelocityConstraints = function(b) {
  var c = this.m_body2, d;
  d = c.m_R;
  var e = d.col1.x * this.m_localAnchor.x + d.col2.x * this.m_localAnchor.y, f = d.col1.y * this.m_localAnchor.x + d.col2.y * this.m_localAnchor.y, g = c.m_linearVelocity.x + -c.m_angularVelocity * f, h = c.m_linearVelocity.y + c.m_angularVelocity * e;
  d = this.m_ptpMass;
  var g = g + this.m_beta * b.inv_dt * this.m_C.x + this.m_gamma * this.m_impulse.x, j = h + this.m_beta * b.inv_dt * this.m_C.y + this.m_gamma * this.m_impulse.y, h = -(d.col1.x * g + d.col2.x * j), j = -(d.col1.y * g + d.col2.y * j);
  d = this.m_impulse.x;
  g = this.m_impulse.y;
  this.m_impulse.x += h;
  this.m_impulse.y += j;
  h = this.m_impulse.magnitude();
  h > b.dt * this.m_maxForce && this.m_impulse.scale(b.dt * this.m_maxForce / h);
  h = this.m_impulse.x - d;
  j = this.m_impulse.y - g;
  c.m_linearVelocity.x += c.m_invMass * h;
  c.m_linearVelocity.y += c.m_invMass * j;
  c.m_angularVelocity += c.m_invI * (e * j - f * h)
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
box2d.PulleyJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.m_groundAnchor1 = new box2d.Vec2;
  this.m_groundAnchor2 = new box2d.Vec2;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_u1 = new box2d.Vec2;
  this.m_u2 = new box2d.Vec2;
  var c, d, e;
  this.m_ground = this.m_body1.m_world.m_groundBody;
  this.m_groundAnchor1.x = b.groundPoint1.x - this.m_ground.m_position.x;
  this.m_groundAnchor1.y = b.groundPoint1.y - this.m_ground.m_position.y;
  this.m_groundAnchor2.x = b.groundPoint2.x - this.m_ground.m_position.x;
  this.m_groundAnchor2.y = b.groundPoint2.y - this.m_ground.m_position.y;
  c = this.m_body1.m_R;
  d = b.anchorPoint1.x - this.m_body1.m_position.x;
  e = b.anchorPoint1.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor1.y = d * c.col2.x + e * c.col2.y;
  c = this.m_body2.m_R;
  d = b.anchorPoint2.x - this.m_body2.m_position.x;
  e = b.anchorPoint2.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor2.y = d * c.col2.x + e * c.col2.y;
  this.m_ratio = b.ratio;
  d = b.groundPoint1.x - b.anchorPoint1.x;
  e = b.groundPoint1.y - b.anchorPoint1.y;
  c = Math.sqrt(d * d + e * e);
  d = b.groundPoint2.x - b.anchorPoint2.x;
  e = b.groundPoint2.y - b.anchorPoint2.y;
  d = Math.sqrt(d * d + e * e);
  e = Math.max(0.5 * box2d.PulleyJoint.b2_minPulleyLength, c);
  d = Math.max(0.5 * box2d.PulleyJoint.b2_minPulleyLength, d);
  this.m_constant = e + this.m_ratio * d;
  this.m_maxLength1 = box2d.Math.b2Clamp(b.maxLength1, e, this.m_constant - this.m_ratio * box2d.PulleyJoint.b2_minPulleyLength);
  this.m_maxLength2 = box2d.Math.b2Clamp(b.maxLength2, d, (this.m_constant - box2d.PulleyJoint.b2_minPulleyLength) / this.m_ratio);
  this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_pulleyImpulse = 0
};
goog.inherits(box2d.PulleyJoint, box2d.Joint);
box2d.PulleyJoint.prototype.GetAnchor1 = function() {
  var b = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y))
};
box2d.PulleyJoint.prototype.GetAnchor2 = function() {
  var b = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y))
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
  var b;
  b = this.m_body1.m_R;
  var c = this.m_body1.m_position.x + (b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y) - (this.m_ground.m_position.x + this.m_groundAnchor1.x);
  b = this.m_body1.m_position.y + (b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y) - (this.m_ground.m_position.y + this.m_groundAnchor1.y);
  return Math.sqrt(c * c + b * b)
};
box2d.PulleyJoint.prototype.GetLength2 = function() {
  var b;
  b = this.m_body2.m_R;
  var c = this.m_body2.m_position.x + (b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y) - (this.m_ground.m_position.x + this.m_groundAnchor2.x);
  b = this.m_body2.m_position.y + (b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y) - (this.m_ground.m_position.y + this.m_groundAnchor2.y);
  return Math.sqrt(c * c + b * b)
};
box2d.PulleyJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
box2d.PulleyJoint.prototype.PrepareVelocitySolver = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
  var h = c.m_position.x + g, j = c.m_position.y + d, k = this.m_ground.m_position.x + this.m_groundAnchor2.x, l = this.m_ground.m_position.y + this.m_groundAnchor2.y;
  this.m_u1.Set(b.m_position.x + e - (this.m_ground.m_position.x + this.m_groundAnchor1.x), b.m_position.y + f - (this.m_ground.m_position.y + this.m_groundAnchor1.y));
  this.m_u2.Set(h - k, j - l);
  h = this.m_u1.magnitude();
  j = this.m_u2.magnitude();
  h > box2d.Settings.b2_linearSlop ? this.m_u1.scale(1 / h) : this.m_u1.SetZero();
  j > box2d.Settings.b2_linearSlop ? this.m_u2.scale(1 / j) : this.m_u2.SetZero();
  h < this.m_maxLength1 ? (this.m_limitState1 = box2d.Joint.e_inactiveLimit, this.m_limitImpulse1 = 0) : (this.m_limitState1 = box2d.Joint.e_atUpperLimit, this.m_limitPositionImpulse1 = 0);
  j < this.m_maxLength2 ? (this.m_limitState2 = box2d.Joint.e_inactiveLimit, this.m_limitImpulse2 = 0) : (this.m_limitState2 = box2d.Joint.e_atUpperLimit, this.m_limitPositionImpulse2 = 0);
  h = e * this.m_u1.y - f * this.m_u1.x;
  j = g * this.m_u2.y - d * this.m_u2.x;
  this.m_limitMass1 = b.m_invMass + b.m_invI * h * h;
  this.m_limitMass2 = c.m_invMass + c.m_invI * j * j;
  this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
  this.m_limitMass1 = 1 / this.m_limitMass1;
  this.m_limitMass2 = 1 / this.m_limitMass2;
  this.m_pulleyMass = 1 / this.m_pulleyMass;
  h = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.x;
  j = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.y;
  k = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.x;
  l = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.y;
  b.m_linearVelocity.x += b.m_invMass * h;
  b.m_linearVelocity.y += b.m_invMass * j;
  b.m_angularVelocity += b.m_invI * (e * j - f * h);
  c.m_linearVelocity.x += c.m_invMass * k;
  c.m_linearVelocity.y += c.m_invMass * l;
  c.m_angularVelocity += c.m_invI * (g * l - d * k)
};
box2d.PulleyJoint.prototype.SolveVelocityConstraints = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
  var h, j, k, l;
  h = b.m_linearVelocity.x + -b.m_angularVelocity * f;
  j = b.m_linearVelocity.y + b.m_angularVelocity * e;
  k = c.m_linearVelocity.x + -c.m_angularVelocity * d;
  l = c.m_linearVelocity.y + c.m_angularVelocity * g;
  h = -(this.m_u1.x * h + this.m_u1.y * j) - this.m_ratio * (this.m_u2.x * k + this.m_u2.y * l);
  l = -this.m_pulleyMass * h;
  this.m_pulleyImpulse += l;
  h = -l * this.m_u1.x;
  j = -l * this.m_u1.y;
  k = -this.m_ratio * l * this.m_u2.x;
  l = -this.m_ratio * l * this.m_u2.y;
  b.m_linearVelocity.x += b.m_invMass * h;
  b.m_linearVelocity.y += b.m_invMass * j;
  b.m_angularVelocity += b.m_invI * (e * j - f * h);
  c.m_linearVelocity.x += c.m_invMass * k;
  c.m_linearVelocity.y += c.m_invMass * l;
  c.m_angularVelocity += c.m_invI * (g * l - d * k);
  this.m_limitState1 == box2d.Joint.e_atUpperLimit && (h = b.m_linearVelocity.x + -b.m_angularVelocity * f, j = b.m_linearVelocity.y + b.m_angularVelocity * e, h = -(this.m_u1.x * h + this.m_u1.y * j), l = -this.m_limitMass1 * h, h = this.m_limitImpulse1, this.m_limitImpulse1 = Math.max(0, this.m_limitImpulse1 + l), l = this.m_limitImpulse1 - h, h = -l * this.m_u1.x, j = -l * this.m_u1.y, b.m_linearVelocity.x += b.m_invMass * h, b.m_linearVelocity.y += b.m_invMass * j, b.m_angularVelocity += b.m_invI * 
  (e * j - f * h));
  this.m_limitState2 == box2d.Joint.e_atUpperLimit && (k = c.m_linearVelocity.x + -c.m_angularVelocity * d, l = c.m_linearVelocity.y + c.m_angularVelocity * g, h = -(this.m_u2.x * k + this.m_u2.y * l), l = -this.m_limitMass2 * h, h = this.m_limitImpulse2, this.m_limitImpulse2 = Math.max(0, this.m_limitImpulse2 + l), l = this.m_limitImpulse2 - h, k = -l * this.m_u2.x, l = -l * this.m_u2.y, c.m_linearVelocity.x += c.m_invMass * k, c.m_linearVelocity.y += c.m_invMass * l, c.m_angularVelocity += c.m_invI * 
  (g * l - d * k))
};
box2d.PulleyJoint.prototype.SolvePositionConstraints = function() {
  var b = this.m_body1, c = this.m_body2, d, e = this.m_ground.m_position.x + this.m_groundAnchor1.x, f = this.m_ground.m_position.y + this.m_groundAnchor1.y, g = this.m_ground.m_position.x + this.m_groundAnchor2.x, h = this.m_ground.m_position.y + this.m_groundAnchor2.y, j, k, l, m, n, q, r, s = 0;
  d = b.m_R;
  j = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y;
  k = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  l = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
  m = b.m_position.x + j;
  n = b.m_position.y + k;
  q = c.m_position.x + l;
  r = c.m_position.y + d;
  this.m_u1.Set(m - e, n - f);
  this.m_u2.Set(q - g, r - h);
  m = this.m_u1.magnitude();
  n = this.m_u2.magnitude();
  m > box2d.Settings.b2_linearSlop ? this.m_u1.scale(1 / m) : this.m_u1.SetZero();
  n > box2d.Settings.b2_linearSlop ? this.m_u2.scale(1 / n) : this.m_u2.SetZero();
  m = this.m_constant - m - this.m_ratio * n;
  s = Math.max(s, Math.abs(m));
  m = box2d.Math.b2Clamp(m, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection);
  r = -this.m_pulleyMass * m;
  m = -r * this.m_u1.x;
  n = -r * this.m_u1.y;
  q = -this.m_ratio * r * this.m_u2.x;
  r = -this.m_ratio * r * this.m_u2.y;
  b.m_position.x += b.m_invMass * m;
  b.m_position.y += b.m_invMass * n;
  b.m_rotation += b.m_invI * (j * n - k * m);
  c.m_position.x += c.m_invMass * q;
  c.m_position.y += c.m_invMass * r;
  c.m_rotation += c.m_invI * (l * r - d * q);
  b.m_R.Set(b.m_rotation);
  c.m_R.Set(c.m_rotation);
  this.m_limitState1 == box2d.Joint.e_atUpperLimit && (d = b.m_R, j = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, k = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y, m = b.m_position.x + j, n = b.m_position.y + k, this.m_u1.Set(m - e, n - f), m = this.m_u1.magnitude(), m > box2d.Settings.b2_linearSlop ? (this.m_u1.x *= 1 / m, this.m_u1.y *= 1 / m) : this.m_u1.SetZero(), m = this.m_maxLength1 - m, s = Math.max(s, -m), m = box2d.Math.b2Clamp(m + box2d.Settings.b2_linearSlop, 
  -box2d.Settings.b2_maxLinearCorrection, 0), r = -this.m_limitMass1 * m, e = this.m_limitPositionImpulse1, this.m_limitPositionImpulse1 = Math.max(0, this.m_limitPositionImpulse1 + r), r = this.m_limitPositionImpulse1 - e, m = -r * this.m_u1.x, n = -r * this.m_u1.y, b.m_position.x += b.m_invMass * m, b.m_position.y += b.m_invMass * n, b.m_rotation += b.m_invI * (j * n - k * m), b.m_R.Set(b.m_rotation));
  this.m_limitState2 == box2d.Joint.e_atUpperLimit && (d = c.m_R, l = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y, d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y, q = c.m_position.x + l, r = c.m_position.y + d, this.m_u2.Set(q - g, r - h), n = this.m_u2.magnitude(), n > box2d.Settings.b2_linearSlop ? (this.m_u2.x *= 1 / n, this.m_u2.y *= 1 / n) : this.m_u2.SetZero(), m = this.m_maxLength2 - n, s = Math.max(s, -m), m = box2d.Math.b2Clamp(m + box2d.Settings.b2_linearSlop, 
  -box2d.Settings.b2_maxLinearCorrection, 0), r = -this.m_limitMass2 * m, e = this.m_limitPositionImpulse2, this.m_limitPositionImpulse2 = Math.max(0, this.m_limitPositionImpulse2 + r), r = this.m_limitPositionImpulse2 - e, q = -r * this.m_u2.x, r = -r * this.m_u2.y, c.m_position.x += c.m_invMass * q, c.m_position.y += c.m_invMass * r, c.m_rotation += c.m_invI * (l * r - d * q), c.m_R.Set(c.m_rotation));
  return s < box2d.Settings.b2_linearSlop
};
box2d.PulleyJoint.b2_minPulleyLength = box2d.Settings.b2_lengthUnitsPerMeter;
box2d.GearJointDef = function() {
  this.type = box2d.Joint.e_gearJoint;
  this.joint2 = this.joint1 = null;
  this.ratio = 1
};
goog.inherits(box2d.GearJointDef, box2d.JointDef);
box2d.GearJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.m_groundAnchor1 = new box2d.Vec2;
  this.m_groundAnchor2 = new box2d.Vec2;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_J = new box2d.Jacobian;
  this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
  var c, d;
  this.m_ground1 = b.joint1.m_body1;
  this.m_body1 = b.joint1.m_body2;
  b.joint1.m_type == box2d.Joint.e_revoluteJoint ? (this.m_revolute1 = b.joint1, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), c = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = b.joint1, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), c = this.m_prismatic1.GetJointTranslation());
  this.m_ground2 = b.joint2.m_body1;
  this.m_body2 = b.joint2.m_body2;
  b.joint2.m_type == box2d.Joint.e_revoluteJoint ? (this.m_revolute2 = b.joint2, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), d = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = b.joint2, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), d = this.m_prismatic2.GetJointTranslation());
  this.m_ratio = b.ratio;
  this.m_constant = c + this.m_ratio * d;
  this.m_impulse = 0
};
goog.inherits(box2d.GearJoint, box2d.Joint);
box2d.GearJoint.prototype.GetAnchor1 = function() {
  var b = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y))
};
box2d.GearJoint.prototype.GetAnchor2 = function() {
  var b = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y))
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
  var b = this.m_ground1, c = this.m_ground2, d = this.m_body1, e = this.m_body2, f, g, h, j = 0;
  this.m_J.SetZero();
  this.m_revolute1 ? (this.m_J.angular1 = -1, j += d.m_invI) : (h = b.m_R, f = this.m_prismatic1.m_localXAxis1, b = h.col1.x * f.x + h.col2.x * f.y, f = h.col1.y * f.x + h.col2.y * f.y, h = d.m_R, g = h.col1.x * this.m_localAnchor1.x + h.col2.x * this.m_localAnchor1.y, h = h.col1.y * this.m_localAnchor1.x + h.col2.y * this.m_localAnchor1.y, g = g * f - h * b, this.m_J.linear1.Set(-b, -f), this.m_J.angular1 = -g, j += d.m_invMass + d.m_invI * g * g);
  this.m_revolute2 ? (this.m_J.angular2 = -this.m_ratio, j += this.m_ratio * this.m_ratio * e.m_invI) : (h = c.m_R, f = this.m_prismatic2.m_localXAxis1, b = h.col1.x * f.x + h.col2.x * f.y, f = h.col1.y * f.x + h.col2.y * f.y, h = e.m_R, g = h.col1.x * this.m_localAnchor2.x + h.col2.x * this.m_localAnchor2.y, h = h.col1.y * this.m_localAnchor2.x + h.col2.y * this.m_localAnchor2.y, g = g * f - h * b, this.m_J.linear2.Set(-this.m_ratio * b, -this.m_ratio * f), this.m_J.angular2 = -this.m_ratio * g, 
  j += this.m_ratio * this.m_ratio * (e.m_invMass + e.m_invI * g * g));
  this.m_mass = 1 / j;
  d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linear1.x;
  d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linear1.y;
  d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angular1;
  e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linear2.x;
  e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linear2.y;
  e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angular2
};
box2d.GearJoint.prototype.SolveVelocityConstraints = function() {
  var b = this.m_body1, c = this.m_body2, d = this.m_J.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity), d = -this.m_mass * d;
  this.m_impulse += d;
  b.m_linearVelocity.x += b.m_invMass * d * this.m_J.linear1.x;
  b.m_linearVelocity.y += b.m_invMass * d * this.m_J.linear1.y;
  b.m_angularVelocity += b.m_invI * d * this.m_J.angular1;
  c.m_linearVelocity.x += c.m_invMass * d * this.m_J.linear2.x;
  c.m_linearVelocity.y += c.m_invMass * d * this.m_J.linear2.y;
  c.m_angularVelocity += c.m_invI * d * this.m_J.angular2
};
box2d.GearJoint.prototype.SolvePositionConstraints = function() {
  var b = this.m_body1, c = this.m_body2, d, e;
  d = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation();
  e = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
  d = -this.m_mass * (this.m_constant - (d + this.m_ratio * e));
  b.m_position.x += b.m_invMass * d * this.m_J.linear1.x;
  b.m_position.y += b.m_invMass * d * this.m_J.linear1.y;
  b.m_rotation += b.m_invI * d * this.m_J.angular1;
  c.m_position.x += c.m_invMass * d * this.m_J.linear2.x;
  c.m_position.y += c.m_invMass * d * this.m_J.linear2.y;
  c.m_rotation += c.m_invI * d * this.m_J.angular2;
  b.m_R.Set(b.m_rotation);
  c.m_R.Set(c.m_rotation);
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
box2d.RevoluteJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.K = new box2d.Mat22;
  this.K1 = new box2d.Mat22;
  this.K2 = new box2d.Mat22;
  this.K3 = new box2d.Mat22;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_ptpImpulse = new box2d.Vec2;
  this.m_ptpMass = new box2d.Mat22;
  var c, d, e;
  c = this.m_body1.m_R;
  d = b.anchorPoint.x - this.m_body1.m_position.x;
  e = b.anchorPoint.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor1.y = d * c.col2.x + e * c.col2.y;
  c = this.m_body2.m_R;
  d = b.anchorPoint.x - this.m_body2.m_position.x;
  e = b.anchorPoint.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor2.y = d * c.col2.x + e * c.col2.y;
  this.m_intialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
  this.m_ptpImpulse.Set(0, 0);
  this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse = 0;
  this.m_lowerAngle = b.lowerAngle;
  this.m_upperAngle = b.upperAngle;
  this.m_maxMotorTorque = b.motorTorque;
  this.m_motorSpeed = b.motorSpeed;
  this.m_enableLimit = b.enableLimit;
  this.m_enableMotor = b.enableMotor
};
goog.inherits(box2d.RevoluteJoint, box2d.Joint);
box2d.RevoluteJoint.prototype.GetAnchor1 = function() {
  var b = this.m_body1.m_R;
  return new box2d.Vec2(this.m_body1.m_position.x + (b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y))
};
box2d.RevoluteJoint.prototype.GetAnchor2 = function() {
  var b = this.m_body2.m_R;
  return new box2d.Vec2(this.m_body2.m_position.x + (b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y))
};
box2d.RevoluteJoint.prototype.GetJointAngle = function() {
  return this.m_body2.m_rotation - this.m_body1.m_rotation
};
box2d.RevoluteJoint.prototype.GetJointSpeed = function() {
  return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity
};
box2d.RevoluteJoint.prototype.GetMotorTorque = function(b) {
  return b * this.m_motorImpulse
};
box2d.RevoluteJoint.prototype.SetMotorSpeed = function(b) {
  this.m_motorSpeed = b
};
box2d.RevoluteJoint.prototype.SetMotorTorque = function(b) {
  this.m_maxMotorTorque = b
};
box2d.RevoluteJoint.prototype.GetReactionForce = function(b) {
  var c = this.m_ptpImpulse.Copy();
  c.scale(b);
  return c
};
box2d.RevoluteJoint.prototype.GetReactionTorque = function(b) {
  return b * this.m_limitImpulse
};
box2d.RevoluteJoint.prototypeK = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K1 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K2 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.K3 = new box2d.Mat22;
box2d.RevoluteJoint.prototype.PrepareVelocitySolver = function() {
  var b = this.m_body1, c = this.m_body2, d;
  d = b.m_R;
  var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y, f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
  d = c.m_R;
  var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
  d = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
  var h = b.m_invMass, j = c.m_invMass, k = b.m_invI, l = c.m_invI;
  this.K1.col1.x = h + j;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = h + j;
  this.K2.col1.x = k * f * f;
  this.K2.col2.x = -k * e * f;
  this.K2.col1.y = -k * e * f;
  this.K2.col2.y = k * e * e;
  this.K3.col1.x = l * d * d;
  this.K3.col2.x = -l * g * d;
  this.K3.col1.y = -l * g * d;
  this.K3.col2.y = l * g * g;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Invert(this.m_ptpMass);
  this.m_motorMass = 1 / (k + l);
  !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
  if(this.m_enableLimit) {
    var m = c.m_rotation - b.m_rotation - this.m_intialAngle;
    Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2 * box2d.Settings.b2_angularSlop ? this.m_limitState = box2d.Joint.e_equalLimits : m <= this.m_lowerAngle ? (this.m_limitState != box2d.Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atLowerLimit) : m >= this.m_upperAngle ? (this.m_limitState != box2d.Joint.e_atUpperLimit && (this.m_limitImpulse = 0), this.m_limitState = box2d.Joint.e_atUpperLimit) : (this.m_limitState = box2d.Joint.e_inactiveLimit, this.m_limitImpulse = 
    0)
  }else {
    this.m_limitImpulse = 0
  }
  box2d.World.s_enableWarmStarting ? (b.m_linearVelocity.x -= h * this.m_ptpImpulse.x, b.m_linearVelocity.y -= h * this.m_ptpImpulse.y, b.m_angularVelocity -= k * (e * this.m_ptpImpulse.y - f * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse), c.m_linearVelocity.x += j * this.m_ptpImpulse.x, c.m_linearVelocity.y += j * this.m_ptpImpulse.y, c.m_angularVelocity += l * (g * this.m_ptpImpulse.y - d * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse)) : (this.m_ptpImpulse.SetZero(), 
  this.m_limitImpulse = this.m_motorImpulse = 0);
  this.m_limitPositionImpulse = 0
};
box2d.RevoluteJoint.prototype.SolveVelocityConstraints = function(b) {
  var c = this.m_body1, d = this.m_body2, e;
  e = c.m_R;
  var f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y, g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
  e = d.m_R;
  var h = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y;
  e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y;
  var j = d.m_linearVelocity.x + -d.m_angularVelocity * e - c.m_linearVelocity.x - -c.m_angularVelocity * g, k = d.m_linearVelocity.y + d.m_angularVelocity * h - c.m_linearVelocity.y - c.m_angularVelocity * f, l = -(this.m_ptpMass.col1.x * j + this.m_ptpMass.col2.x * k), j = -(this.m_ptpMass.col1.y * j + this.m_ptpMass.col2.y * k);
  this.m_ptpImpulse.x += l;
  this.m_ptpImpulse.y += j;
  c.m_linearVelocity.x -= c.m_invMass * l;
  c.m_linearVelocity.y -= c.m_invMass * j;
  c.m_angularVelocity -= c.m_invI * (f * j - g * l);
  d.m_linearVelocity.x += d.m_invMass * l;
  d.m_linearVelocity.y += d.m_invMass * j;
  d.m_angularVelocity += d.m_invI * (h * j - e * l);
  this.m_enableMotor && this.m_limitState != box2d.Joint.e_equalLimits && (f = -this.m_motorMass * (d.m_angularVelocity - c.m_angularVelocity - this.m_motorSpeed), g = this.m_motorImpulse, this.m_motorImpulse = box2d.Math.b2Clamp(this.m_motorImpulse + f, -b.dt * this.m_maxMotorTorque, b.dt * this.m_maxMotorTorque), f = this.m_motorImpulse - g, c.m_angularVelocity -= c.m_invI * f, d.m_angularVelocity += d.m_invI * f);
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (f = -this.m_motorMass * (d.m_angularVelocity - c.m_angularVelocity), this.m_limitState == box2d.Joint.e_equalLimits ? this.m_limitImpulse += f : this.m_limitState == box2d.Joint.e_atLowerLimit ? (b = this.m_limitImpulse, this.m_limitImpulse = Math.max(this.m_limitImpulse + f, 0), f = this.m_limitImpulse - b) : this.m_limitState == box2d.Joint.e_atUpperLimit && (b = this.m_limitImpulse, this.m_limitImpulse = Math.min(this.m_limitImpulse + 
  f, 0), f = this.m_limitImpulse - b), c.m_angularVelocity -= c.m_invI * f, d.m_angularVelocity += d.m_invI * f)
};
box2d.RevoluteJoint.prototype.SolvePositionConstraints = function() {
  var b, c = this.m_body1, d = this.m_body2, e = 0, e = c.m_R, f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y, g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y, e = d.m_R;
  b = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y;
  var h = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y, j = d.m_position.x + b - (c.m_position.x + f), k = d.m_position.y + h - (c.m_position.y + g), e = Math.sqrt(j * j + k * k), l = c.m_invMass, m = d.m_invMass, n = c.m_invI, q = d.m_invI;
  this.K1.col1.x = l + m;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = l + m;
  this.K2.col1.x = n * g * g;
  this.K2.col2.x = -n * f * g;
  this.K2.col1.y = -n * f * g;
  this.K2.col2.y = n * f * f;
  this.K3.col1.x = q * h * h;
  this.K3.col2.x = -q * b * h;
  this.K3.col1.y = -q * b * h;
  this.K3.col2.y = q * b * b;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Solve(box2d.RevoluteJoint.tImpulse, -j, -k);
  j = box2d.RevoluteJoint.tImpulse.x;
  k = box2d.RevoluteJoint.tImpulse.y;
  c.m_position.x -= c.m_invMass * j;
  c.m_position.y -= c.m_invMass * k;
  c.m_rotation -= c.m_invI * (f * k - g * j);
  c.m_R.Set(c.m_rotation);
  d.m_position.x += d.m_invMass * j;
  d.m_position.y += d.m_invMass * k;
  d.m_rotation += d.m_invI * (b * k - h * j);
  d.m_R.Set(d.m_rotation);
  f = 0;
  this.m_enableLimit && this.m_limitState != box2d.Joint.e_inactiveLimit && (b = d.m_rotation - c.m_rotation - this.m_intialAngle, g = 0, this.m_limitState == box2d.Joint.e_equalLimits ? (b = box2d.Math.b2Clamp(b, -box2d.Settings.b2_maxAngularCorrection, box2d.Settings.b2_maxAngularCorrection), g = -this.m_motorMass * b, f = Math.abs(b)) : this.m_limitState == box2d.Joint.e_atLowerLimit ? (b -= this.m_lowerAngle, f = Math.max(0, -b), b = box2d.Math.b2Clamp(b + box2d.Settings.b2_angularSlop, -box2d.Settings.b2_maxAngularCorrection, 
  0), g = -this.m_motorMass * b, b = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.max(this.m_limitPositionImpulse + g, 0), g = this.m_limitPositionImpulse - b) : this.m_limitState == box2d.Joint.e_atUpperLimit && (b -= this.m_upperAngle, f = Math.max(0, b), b = box2d.Math.b2Clamp(b - box2d.Settings.b2_angularSlop, 0, box2d.Settings.b2_maxAngularCorrection), g = -this.m_motorMass * b, b = this.m_limitPositionImpulse, this.m_limitPositionImpulse = Math.min(this.m_limitPositionImpulse + 
  g, 0), g = this.m_limitPositionImpulse - b), c.m_rotation -= c.m_invI * g, c.m_R.Set(c.m_rotation), d.m_rotation += d.m_invI * g, d.m_R.Set(d.m_rotation));
  return e <= box2d.Settings.b2_linearSlop && f <= box2d.Settings.b2_angularSlop
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
box2d.DistanceJoint = function(b) {
  this.m_node1 = new box2d.JointNode;
  this.m_node2 = new box2d.JointNode;
  this.m_type = b.type;
  this.m_next = this.m_prev = null;
  this.m_body1 = b.body1;
  this.m_body2 = b.body2;
  this.m_collideConnected = b.getCollideConnected();
  this.m_islandFlag = !1;
  this.m_userData = b.userData;
  this.m_localAnchor1 = new box2d.Vec2;
  this.m_localAnchor2 = new box2d.Vec2;
  this.m_u = new box2d.Vec2;
  var c, d, e;
  c = this.m_body1.m_R;
  d = b.anchorPoint1.x - this.m_body1.m_position.x;
  e = b.anchorPoint1.y - this.m_body1.m_position.y;
  this.m_localAnchor1.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor1.y = d * c.col2.x + e * c.col2.y;
  c = this.m_body2.m_R;
  d = b.anchorPoint2.x - this.m_body2.m_position.x;
  e = b.anchorPoint2.y - this.m_body2.m_position.y;
  this.m_localAnchor2.x = d * c.col1.x + e * c.col1.y;
  this.m_localAnchor2.y = d * c.col2.x + e * c.col2.y;
  d = b.anchorPoint2.x - b.anchorPoint1.x;
  e = b.anchorPoint2.y - b.anchorPoint1.y;
  this.m_length = Math.sqrt(d * d + e * e);
  this.m_impulse = 0
};
goog.inherits(box2d.DistanceJoint, box2d.Joint);
box2d.DistanceJoint.prototype.PrepareVelocitySolver = function() {
  var b;
  b = this.m_body1.m_R;
  var c = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y, d = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y;
  b = this.m_body2.m_R;
  var e = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y;
  b = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y;
  this.m_u.x = this.m_body2.m_position.x + e - this.m_body1.m_position.x - c;
  this.m_u.y = this.m_body2.m_position.y + b - this.m_body1.m_position.y - d;
  var f = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
  f > box2d.Settings.b2_linearSlop ? this.m_u.scale(1 / f) : this.m_u.SetZero();
  var f = c * this.m_u.y - d * this.m_u.x, g = e * this.m_u.y - b * this.m_u.x;
  this.m_mass = this.m_body1.m_invMass + this.m_body1.m_invI * f * f + this.m_body2.m_invMass + this.m_body2.m_invI * g * g;
  this.m_mass = 1 / this.m_mass;
  box2d.World.s_enableWarmStarting ? (f = this.m_impulse * this.m_u.x, g = this.m_impulse * this.m_u.y, this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * f, this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * g, this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (c * g - d * f), this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * f, this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * g, this.m_body2.m_angularVelocity += this.m_body2.m_invI * (e * g - b * f)) : 
  this.m_impulse = 0
};
box2d.DistanceJoint.prototype.SolveVelocityConstraints = function() {
  var b;
  b = this.m_body1.m_R;
  var c = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y, d = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y;
  b = this.m_body2.m_R;
  var e = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y;
  b = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y;
  var f = -this.m_mass * (this.m_u.x * (this.m_body2.m_linearVelocity.x + -this.m_body2.m_angularVelocity * b - (this.m_body1.m_linearVelocity.x + -this.m_body1.m_angularVelocity * d)) + this.m_u.y * (this.m_body2.m_linearVelocity.y + this.m_body2.m_angularVelocity * e - (this.m_body1.m_linearVelocity.y + this.m_body1.m_angularVelocity * c)));
  this.m_impulse += f;
  var g = f * this.m_u.x, f = f * this.m_u.y;
  this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * g;
  this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * f;
  this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (c * f - d * g);
  this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * g;
  this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * f;
  this.m_body2.m_angularVelocity += this.m_body2.m_invI * (e * f - b * g)
};
box2d.DistanceJoint.prototype.SolvePositionConstraints = function() {
  var b;
  b = this.m_body1.m_R;
  var c = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y, d = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y;
  b = this.m_body2.m_R;
  var e = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y;
  b = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y;
  var f = this.m_body2.m_position.x + e - this.m_body1.m_position.x - c, g = this.m_body2.m_position.y + b - this.m_body1.m_position.y - d, h = Math.sqrt(f * f + g * g), f = f / h, g = g / h, h = h - this.m_length, h = box2d.Math.b2Clamp(h, -box2d.Settings.b2_maxLinearCorrection, box2d.Settings.b2_maxLinearCorrection), j = -this.m_mass * h;
  this.m_u.Set(f, g);
  f = j * this.m_u.x;
  g = j * this.m_u.y;
  this.m_body1.m_position.x -= this.m_body1.m_invMass * f;
  this.m_body1.m_position.y -= this.m_body1.m_invMass * g;
  this.m_body1.m_rotation -= this.m_body1.m_invI * (c * g - d * f);
  this.m_body2.m_position.x += this.m_body2.m_invMass * f;
  this.m_body2.m_position.y += this.m_body2.m_invMass * g;
  this.m_body2.m_rotation += this.m_body2.m_invI * (e * g - b * f);
  this.m_body1.m_R.Set(this.m_body1.m_rotation);
  this.m_body2.m_R.Set(this.m_body2.m_rotation);
  return Math.abs(h) < box2d.Settings.b2_linearSlop
};
box2d.DistanceJoint.prototype.GetAnchor1 = function() {
  return box2d.Vec2.add(this.m_body1.m_position, box2d.Math.b2MulMV(this.m_body1.m_R, this.m_localAnchor1))
};
box2d.DistanceJoint.prototype.GetAnchor2 = function() {
  return box2d.Vec2.add(this.m_body2.m_position, box2d.Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor2))
};
box2d.DistanceJoint.prototype.GetReactionForce = function(b) {
  var c = new box2d.Vec2;
  c.SetV(this.m_u);
  c.scale(this.m_impulse * b);
  return c
};
box2d.DistanceJoint.prototype.GetReactionTorque = function() {
  return 0
};
box2d.JointFactory = {};
box2d.JointFactory.Create = function(b) {
  switch(b.type) {
    case box2d.Joint.e_distanceJoint:
      return new box2d.DistanceJoint(b);
    case box2d.Joint.e_mouseJoint:
      return new box2d.MouseJoint(b);
    case box2d.Joint.e_prismaticJoint:
      return new box2d.PrismaticJoint(b);
    case box2d.Joint.e_revoluteJoint:
      return new box2d.RevoluteJoint(b);
    case box2d.Joint.e_pulleyJoint:
      return new box2d.PulleyJoint(b);
    case box2d.Joint.e_gearJoint:
      return new box2d.GearJoint(b);
    default:
      throw"def not supported";
  }
};
box2d.World = function(b, c, d) {
  this.m_step = new box2d.TimeStep;
  this.m_contactManager = new box2d.ContactManager(this);
  this.m_listener = null;
  this.collisionFilter = box2d.CollisionFilter.b2_defaultFilter;
  this.m_jointList = this.m_contactList = this.m_bodyList = null;
  this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
  this.m_bodyDestroyList = null;
  this.m_allowSleep = d;
  this.m_gravity = c;
  this.m_contactManager.m_world = this;
  this.m_broadPhase = new box2d.BroadPhase(b, this.m_contactManager);
  b = new box2d.BodyDef;
  this.m_groundBody = this.CreateBody(b);
  this.lastPairs = [];
  this.sleeping = !1
};
box2d.World.prototype.SetListener = function(b) {
  this.m_listener = b
};
box2d.World.prototype.SetFilter = function(b) {
  this.collisionFilter = b
};
box2d.World.prototype.CreateBody = function(b) {
  b = new box2d.Body(b, this);
  b.m_prev = null;
  if(b.m_next = this.m_bodyList) {
    this.m_bodyList.m_prev = b
  }
  this.m_bodyList = b;
  ++this.m_bodyCount;
  return b
};
box2d.World.prototype.DestroyBody = function(b) {
  b.m_flags & box2d.Body.Flags.destroyFlag || (b.m_prev && (b.m_prev.m_next = b.m_next), b.m_next && (b.m_next.m_prev = b.m_prev), b == this.m_bodyList && (this.m_bodyList = b.m_next), b.m_flags |= box2d.Body.Flags.destroyFlag, --this.m_bodyCount, b.m_prev = null, b.m_next = this.m_bodyDestroyList, this.m_bodyDestroyList = b)
};
box2d.World.prototype.CleanBodyList = function() {
  this.m_contactManager.m_destroyImmediate = !0;
  for(var b = this.m_bodyDestroyList;b;) {
    for(var c = b, b = b.m_next, d = c.m_jointList;d;) {
      var e = d, d = d.next;
      this.m_listener && this.m_listener.NotifyJointDestroyed(e.joint);
      this.DestroyJoint(e.joint)
    }
    for(d = c.m_contactList;d;) {
      e = d, d = d.next, this.m_contactManager.DestroyContact(e.contact)
    }
    c.Destroy()
  }
  this.m_bodyDestroyList = null;
  this.m_contactManager.m_destroyImmediate = !1
};
box2d.World.prototype.CreateJoint = function(b) {
  var c = box2d.JointFactory.Create(b);
  c.m_prev = null;
  if(c.m_next = this.m_jointList) {
    this.m_jointList.m_prev = c
  }
  this.m_jointList = c;
  ++this.m_jointCount;
  c.m_node1.joint = c;
  c.m_node1.other = c.m_body2;
  c.m_node1.prev = null;
  if(c.m_node1.next = c.m_body1.m_jointList) {
    c.m_body1.m_jointList.prev = c.m_node1
  }
  c.m_body1.m_jointList = c.m_node1;
  c.m_node2.joint = c;
  c.m_node2.other = c.m_body1;
  c.m_node2.prev = null;
  if(c.m_node2.next = c.m_body2.m_jointList) {
    c.m_body2.m_jointList.prev = c.m_node2
  }
  c.m_body2.m_jointList = c.m_node2;
  if(!1 == b.getCollideConnected()) {
    for(b = (b.body1.m_shapeCount < b.body2.m_shapeCount ? b.body1 : b.body2).m_shapeList;b;b = b.m_next) {
      b.ResetProxy(this.m_broadPhase)
    }
  }
  return c
};
box2d.World.prototype.DestroyJoint = function(b) {
  var c = b.m_collideConnected;
  b.m_prev && (b.m_prev.m_next = b.m_next);
  b.m_next && (b.m_next.m_prev = b.m_prev);
  b == this.m_jointList && (this.m_jointList = b.m_next);
  var d = b.m_body1, e = b.m_body2;
  d.WakeUp();
  e.WakeUp();
  b.m_node1.prev && (b.m_node1.prev.next = b.m_node1.next);
  b.m_node1.next && (b.m_node1.next.prev = b.m_node1.prev);
  b.m_node1 == d.m_jointList && (d.m_jointList = b.m_node1.next);
  b.m_node1.prev = null;
  b.m_node1.next = null;
  b.m_node2.prev && (b.m_node2.prev.next = b.m_node2.next);
  b.m_node2.next && (b.m_node2.next.prev = b.m_node2.prev);
  b.m_node2 == e.m_jointList && (e.m_jointList = b.m_node2.next);
  b.m_node2.prev = null;
  b.m_node2.next = null;
  --this.m_jointCount;
  if(!1 == c) {
    for(b = (d.m_shapeCount < e.m_shapeCount ? d : e).m_shapeList;b;b = b.m_next) {
      b.ResetProxy(this.m_broadPhase)
    }
  }
};
box2d.World.prototype.GetGroundBody = function() {
  return this.m_groundBody
};
box2d.World.prototype.Step = function(b, c) {
  var d, e;
  this.m_step.dt = b;
  this.m_step.iterations = c;
  this.m_step.inv_dt = 0 < b ? 1 / b : 0;
  this.m_positionIterationCount = 0;
  this.CleanBodyList();
  this.m_contactManager.CleanContactList();
  this.m_contactManager.Collide();
  var f = new box2d.Island(this.m_bodyCount, this.m_contactCount, this.m_jointCount);
  for(d = this.m_bodyList;null != d;d = d.m_next) {
    d.m_flags &= ~box2d.Body.Flags.islandFlag
  }
  for(var g = this.m_contactList;null != g;g = g.m_next) {
    g.m_flags &= ~box2d.Contact.e_islandFlag
  }
  for(g = this.m_jointList;null != g;g = g.m_next) {
    g.m_islandFlag = !1
  }
  for(var g = Array(this.m_bodyCount), h = 0;h < this.m_bodyCount;h++) {
    g[h] = null
  }
  for(h = this.m_bodyList;null != h;h = h.m_next) {
    if(!(h.m_flags & (box2d.Body.Flags.staticFlag | box2d.Body.Flags.islandFlag | box2d.Body.Flags.sleepFlag | box2d.Body.Flags.frozenFlag))) {
      f.Clear();
      var j = 0;
      g[j++] = h;
      for(h.m_flags |= box2d.Body.Flags.islandFlag;0 < j;) {
        if(d = g[--j], f.AddBody(d), d.m_flags &= ~box2d.Body.Flags.sleepFlag, !(d.m_flags & box2d.Body.Flags.staticFlag)) {
          for(var k = d.m_contactList;null != k;k = k.next) {
            k.contact.m_flags & box2d.Contact.e_islandFlag || (f.AddContact(k.contact), k.contact.m_flags |= box2d.Contact.e_islandFlag, e = k.other, e.m_flags & box2d.Body.Flags.islandFlag || (g[j++] = e, e.m_flags |= box2d.Body.Flags.islandFlag))
          }
          for(d = d.m_jointList;null != d;d = d.next) {
            !0 != d.joint.m_islandFlag && (f.AddJoint(d.joint), d.joint.m_islandFlag = !0, e = d.other, e.m_flags & box2d.Body.Flags.islandFlag || (g[j++] = e, e.m_flags |= box2d.Body.Flags.islandFlag))
          }
        }
      }
      f.Solve(this.m_step, this.m_gravity);
      this.m_positionIterationCount = Math.max(this.m_positionIterationCount, box2d.Island.m_positionIterationCount);
      this.m_allowSleep && (this.sleeping = f.UpdateSleep(b));
      for(e = 0;e < f.m_bodyCount;++e) {
        d = f.m_bodies[e], d.m_flags & box2d.Body.Flags.staticFlag && (d.m_flags &= ~box2d.Body.Flags.islandFlag), d.IsFrozen() && this.m_listener && this.m_listener.NotifyBoundaryViolated(d) == box2d.WorldListener.b2_destroyBody && (this.DestroyBody(d), f.m_bodies[e] = null)
      }
    }
  }
  this.lastPairs = this.m_broadPhase.Commit()
};
box2d.World.prototype.Query = function(b, c, d) {
  var e = [];
  b = this.m_broadPhase.QueryAABB(b, e, d);
  for(d = 0;d < b;++d) {
    c[d] = e[d]
  }
  return b
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
  var b = new box2d.AABB;
  b.minVertex.Set(-2048, -2048);
  b.maxVertex.Set(2048, 2048);
  var c = new box2d.Vec2(0, 300);
  this.mWorld = new box2d.World(b, c, !0)
};
ss2d.PhysicalWorld.WORLD_INSTANCE = null;
ss2d.PhysicalWorld.UPDATE_RATE = 30;
ss2d.PhysicalWorld.getWorld = function() {
  ss2d.PhysicalWorld.WORLD_INSTANCE || (ss2d.PhysicalWorld.WORLD_INSTANCE = new ss2d.PhysicalWorld);
  return ss2d.PhysicalWorld.WORLD_INSTANCE
};
ss2d.PhysicalWorld.prototype.setGravity = function(b, c) {
  this.mWorld.m_gravity.x = b;
  this.mWorld.m_gravity.y = c
};
ss2d.PhysicalWorld.prototype.tick = function(b) {
  this.mWorld.Step(b, 1)
};
ss2d.PhysicalWorld.prototype.createBall = function(b, c, d) {
  d = d || 20;
  var e = new box2d.CircleDef;
  e.density = 1;
  e.radius = d;
  e.restitution = 0.8;
  e.friction = 0.9;
  d = new box2d.BodyDef;
  d.AddShape(e);
  d.position.Set(b, c);
  return this.mWorld.CreateBody(d)
};
ss2d.PhysicalWorld.prototype.createBox = function(b, c, d, e, f, g) {
  "undefined" == typeof f && (f = !0);
  "undefined" == typeof g && (g = !1);
  var h = new box2d.BoxDef;
  f || (h.density = 1);
  g && (h.userData = "filled");
  h.extents.Set(d, e);
  d = new box2d.BodyDef;
  d.AddShape(h);
  d.position.Set(b, c);
  return this.mWorld.CreateBody(d)
};
ss2d.PhysicalWorld.prototype.createMouseJoint = function(b, c) {
  var d = c || ss2d.CURRENT_VIEW.mInput;
  md = new box2d.MouseJointDef;
  md.body1 = this.mWorld.m_groundBody;
  md.body2 = b.mBody;
  d = b.mOwner.worldToLocal(d.mMousePoint);
  md.target.Set(d.mX, d.mY);
  md.maxForce = 1E3 * b.mBody.m_mass;
  md.m_collideConnected = !0;
  md.timeStep = 1 / ss2d.PhysicalWorld.UPDATE_RATE;
  return this.mWorld.CreateJoint(md)
};
ss2d.View = function(b, c, d, e, f) {
  this.mCanvas = document.getElementById(b);
  "webgl" == RENDER_CONTEXT ? (this.mContext = this.mCanvas.getContext("webgl", {alpha:!1}) || this.mCanvas.getContext("experimental-webgl", {alpha:!1}), this.mProjection = ss2d.RenderSupport.make2DProjection(this.mCanvas.width, this.mCanvas.height), this.mClearColor = [0.8, 0.8, 0.8, 1]) : (this.mContext = this.mCanvas.getContext("2d"), this.mBackgroundFillStyle = "#202020");
  if(!this.mContext) {
    throw"Incompatible render context: " + RENDER_CONTEXT;
  }
  ss2d.CURRENT_VIEW = this;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mRunning = !1;
  this.mFrameRate = f || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = d || this.mCanvas.width;
  this.mCanvas.height = e || this.mCanvas.height;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = c || new ss2d.DisplayObjectContainer;
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
  var b = (new Date).getTime(), c = b - this.mLastFrameTimestamp;
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  for(var d = Math.floor(Math.max(1, c / (1E3 / ss2d.PhysicalWorld.UPDATE_RATE))), e = 0;e < d;++e) {
    this.mPhysicalWorld.tick(c / d / 1E3)
  }
  c /= 1E3;
  this.mRealFPS = 0.01 * Math.floor(100 / c);
  this.mTotalTime += c;
  this.mInput.tick(c);
  for(var f in this.mPreTickFunctions) {
    this.mPreTickFunctions[f].call(null, c)
  }
  this.mMainScene.tick(c);
  for(f in this.mPostTickFunctions) {
    this.mPostTickFunctions[f].call(null, c)
  }
  for(f in this.mPreRenderFunctions) {
    this.mPreRenderFunctions[f].call(null, this.mRenderSupport)
  }
  this.render();
  for(f in this.mPostRenderFunctions) {
    this.mPostRenderFunctions[f].call(null, this.mRenderSupport)
  }
  this.mLastFrameTimestamp = b;
  b = ((new Date).getTime() - b) / 1E3;
  b = Math.max(0, 1 / this.mFrameRate - b);
  this.mRunning && setTimeout(ss2d.View.NEXT_FRAME_CALLER, 1E3 * b)
};
ss2d.View.prototype.render = function() {
};
ss2d.View.prototype.render = "webgl" == RENDER_CONTEXT ? function() {
  var b = this.mContext;
  b.viewport(0, 0, this.mCanvas.width, this.mCanvas.height);
  var c = this.mClearColor;
  b.clearColor(c[0], c[1], c[2], c[3]);
  b.clear(b.COLOR_BUFFER_BIT);
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
ss2d.Pickable = function(b, c) {
  if(!b) {
    throw"Pickable component need an owner";
  }
  this.mOwner = b || null;
  this.mPicked = !1;
  this.mOffset = new ss2d.Point;
  this.mMoveObject = !0;
  this.mRigidBody = c || null;
  this.mJustPicked = this.mPreviousPicked = !1;
  this.mInput = this.mMouseJoint = null
};
ss2d.Pickable.prototype.tick = function(b, c) {
  var d = c || ss2d.CURRENT_VIEW.mInput;
  this.mJustPicked = !1;
  if(d.mMouseDown && !d.mPreviousMouseDown && this.mOwner.hitTestPoint(d.mMousePoint)) {
    this.mInput && (this.mRigidBody && s2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), this.mMouseJoint = null, this.mInput = this.mInput.PICKED_COMPONENT = null);
    d.PICKED_COMPONENT && (this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), this.mInput = this.mMouseJoint = null), d.PICKED_COMPONENT.mPicked = !1);
    this.mPicked = this.mJustPicked = !0;
    this.mInput = d;
    d.PICKED_COMPONENT = this;
    var e = this.mOwner.worldToLocal(d.mMousePoint);
    this.mOffset.set(this.mOwner.mLocation.mX - e.mX, this.mOwner.mLocation.mY - e.mY);
    this.mRigidBody && (this.mMouseJoint = ss2d.PhysicalWorld.getWorld().createMouseJoint(this.mRigidBody, this.mInput), this.mRigidBody.mBody.WakeUp())
  }
  (this.mPicked = d.PICKED_COMPONENT == this && this.mInput && this.mInput.mMouseDown) ? (d = this.mInput, this.mMoveObject && (e = this.mOwner.worldToLocal(d.mMousePoint), this.mRigidBody ? this.mMouseJoint && this.mMouseJoint.m_target.Set(e.mX, e.mY) : (this.mOwner.mLocation.mX = e.mX + this.mOffset.mX, this.mOwner.mLocation.mY = e.mY + this.mOffset.mY))) : d.PICKED_COMPONENT == this && (d.PICKED_COMPONENT = null, this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), 
  this.mInput = this.mMouseJoint = null));
  this.mPreviousPicked = this.mPicked
};
ss2d.Bone = function(b, c, d, e, f, g, h, j) {
  ss2d.DisplayObjectContainer.call(this, d, e, 1, h);
  this.mScaleX = f;
  this.mScaleY = g;
  this.mLength = j;
  this.mName = c;
  this.mParentSkeletalSprite = b;
  this.mRepresentation = new ss2d.Quad(0, 0, 5, j, "#ff0000");
  this.mRepresentation.mAlpha = 0.7;
  this.mRepresentation.mRotation = 0.5 * Math.PI;
  this.mRepresentation.mInheritColor = this.mRepresentation.mInheritAlpha = !1;
  this.addObject(this.mRepresentation);
  this.mSetupPose = {x:d, y:e, r:h, sx:f, sy:g}
};
goog.inherits(ss2d.Bone, ss2d.DisplayObjectContainer);
ss2d.Bone.prototype.interpolateBoneStates = function(b, c, d) {
  this.mLocation.mX = this.mSetupPose.x + b.x + (c.x - b.x) * d.xy;
  this.mLocation.mY = this.mSetupPose.y + b.y + (c.y - b.y) * d.xy;
  this.mRotation = this.mSetupPose.r + b.r + (c.r - b.r) * d.r;
  this.mScaleX = b.sx + (c.sx - b.sx) * d.s;
  this.mScaleY = b.sy + (c.sy - b.sy) * d.s;
  if(0 == this.mScaleX || 0 == this.mScaleY) {
    throw"scale 0";
  }
};
ss2d.Bone.prototype.tick = function(b) {
  this.updateBone(b)
};
ss2d.Bone.prototype.updateBone = function(b) {
  this.tickChildren(b);
  b = this.mParentSkeletalSprite;
  if(b.mCurrentAnimation) {
    var c = b.mCurrentAnimation.mAnimationData;
    if(c && c.bones && c.bones[this.mName]) {
      b = 0 > b.mTimeDilation ? !0 : !1;
      var d = this.mParentSkeletalSprite.mCurrentAnimationTime, e = c.bones[this.mName].rotate, f = c.bones[this.mName].translate, g = c.bones[this.mName].scale, c = {x:0, y:0, r:0, sx:this.mSetupPose.sx, sy:this.mSetupPose.sy}, h = {x:0, y:0, r:0, sx:this.mSetupPose.sx, sy:this.mSetupPose.sy}, j = {xy:0, r:0, s:0}, k = {xy:ss2d.Transitions.linear, r:ss2d.Transitions.linear, s:ss2d.Transitions.linear}, l = null, m = null, n = null, q = null, r = null, s = null;
      if(e) {
        for(var t = 0;t < e.length && null == l;t++) {
          e[t].time > d && (l = e[t], m = 0 == t ? e[e.length - 1] : e[t - 1])
        }
        m && l && (c.r = m.angle, h.r = l.angle, j.r = (d - m.time) / (l.time - m.time))
      }
      if(g) {
        for(t = 0;t < g.length && null == r;t++) {
          g[t].time > d && (r = g[t], s = 0 == t ? g[g.length - 1] : g[t - 1])
        }
        s && r && (c.sx = s.x, h.sx = r.x, c.sy = s.y, h.sy = r.y, j.s = (d - s.time) / (r.time - s.time))
      }
      if(f) {
        for(e = 0;e < f.length && null == n;e++) {
          f[e].time > d && (n = f[e], q = 0 == e ? f[f.length - 1] : f[e - 1])
        }
        q && n && (c.x = q.x, h.x = n.x, c.y = q.y, h.y = n.y, j.xy = (d - q.time) / (n.time - q.time))
      }
      b ? (j.xy = 1 - j.xy, j.r = 1 - j.r, j.s = 1 - j.s, this.interpolateBoneStates(h, c, j, k)) : this.interpolateBoneStates(c, h, j, k)
    }
  }
};
ss2d.Slot = function(b, c, d, e, f, g, h, j) {
  ss2d.Sprite.call(this, d, e, f, g, h, j);
  this.mName = c;
  this.mBone = b;
  this.mAuxBoneMatrix = new ss2d.Matrix3
};
goog.inherits(ss2d.Slot, ss2d.Sprite);
ss2d.Slot.prototype.getWorldTransformationMatrix = function(b, c, d) {
  var e = this.mParent;
  this.mParent = this.mBone;
  b = ss2d.DisplayObject.prototype.getWorldTransformationMatrix.call(this, b, c, d);
  this.mParent = e;
  return b
};
"webgl" != RENDER_CONTEXT && (ss2d.Slot.prototype.render = function(b) {
  this.mAuxBoneMatrix.identity();
  this.mBone.getWorldTransformationMatrix(this.mAuxBoneMatrix, this.mParent.mParent, !0);
  b.pushTransform(this.mAuxBoneMatrix);
  ss2d.Sprite.prototype.render.call(this, b);
  b.popTransform()
});
ss2d.Slot.prototype.tick = function() {
  var b = this.mBone.mParentSkeletalSprite;
  if(b.mCurrentAnimation) {
    var c = b.mCurrentAnimation.mAnimationData;
    if(c && c.slots && c.slots[this.mName]) {
      var d = c.slots[this.mName].attachment;
      if(d) {
        for(var e = b.mCurrentAnimationTime, c = null, f = 0;f < d.length && null == c;f++) {
          if(d[f].time > e) {
            f = 0 < f ? f - 1 : d.length - 1;
            c = d[f].name;
            break
          }
        }
        if(c) {
          this.setTexture(c, this.mTextureAtlas);
          d = null;
          try {
            d = b.mSkeleton.mSkeletonData.skins[b.mCurrentSkin]
          }catch(g) {
          }
          d && (b = d[this.mName][c], this.mLocation.mX = b.x || 0, this.mLocation.mY = b.y || 0, this.mRotation = b.rotation || 0, this.mWidth = b.width || 1, this.mHeight = b.height || 1, this.mPivotX = 0.5 * this.mWidth, this.mPivotY = 0.5 * this.mHeight)
        }
      }
    }
  }
};
ss2d.SkeletalSprite = function(b, c, d, e, f, g) {
  ss2d.DisplayObjectContainer.call(this, b, c);
  this.mScaleX = this.mScaleY = d;
  this.mBones = new ss2d.DisplayObjectContainer;
  this.addObject(this.mBones);
  this.mSlots = new ss2d.DisplayObjectContainer;
  this.addObject(this.mSlots);
  this.mSlotClass = g || ss2d.Slot;
  this.mBoneMap = {};
  this.mSlotMap = {};
  this.mAnimationsMap = {};
  this.mSkeleton = e || null;
  this.mBodyAtlas = f || null;
  "string" == typeof e && (this.mSkeleton = ss2d.ResourceManager.loadSkeleton(e, this.setup, this));
  this.mShowBones = !1;
  this.mCurrentAnimationTime = 0;
  this.mCurrentAnimation = null;
  this.mTimeDilation = 1;
  this.mCurrentSkin = "default"
};
goog.inherits(ss2d.SkeletalSprite, ss2d.DisplayObjectContainer);
ss2d.SkeletalSprite.prototype.setup = function(b) {
  this.mSkeleton = b;
  b = this.mSkeleton.mSkeletonData.bones;
  for(var c in b) {
    var d = b[c], e = this.mBones;
    d.parent && (e = this.mBoneMap[d.parent]);
    var f = new ss2d.Bone(this, d.name, d.x || 0, d.y || 0, d.scaleX || 1, d.scaleY || 1, d.rotation || 0, d.length || 0);
    this.mBoneMap[d.name] = f;
    e.addObject(f)
  }
  c = this.mSkeleton.mSkeletonData.slots;
  b = this.mSkeleton.mSkeletonData.skins["default"];
  for(var g in c) {
    d = c[g], d.attachment && (e = b[d.name][d.attachment], f = new this.mSlotClass(this.mBoneMap[d.bone], d.name, e.x || 0, e.y || 0, e.width || 1, e.height || 1, d.attachment, this.mBodyAtlas), f.mPivotX = 0.5 * f.mWidth, f.mPivotY = 0.5 * f.mHeight, f.mRotation = e.rotation || 0, this.mSlotMap[d.name] = f, this.mSlots.addObject(f))
  }
  if(this.mSkeleton.mIncludeAnimations) {
    for(var h in this.mSkeleton.mSkeletonData.animations) {
      g = new ss2d.SkeletalAnimation, g.setFromSkeleton(this.mSkeleton.mSkeletonData.animations[h]), this.mAnimationsMap[h] = g
    }
  }
};
ss2d.SkeletalSprite.prototype.setDefaultPose = function() {
  var b = this.mSkeleton.mSkeletonData.bones, c;
  for(c in b) {
    var d = b[c], e = this.mBoneMap[d.name];
    e.mLocation.mX = d.x || 0;
    e.mLocation.mY = d.y || 0;
    e.mRotation = d.rotation || 0;
    e.mScaleX = d.scaleX || 1;
    e.mScaleY = d.scaleY || 1
  }
};
ss2d.SkeletalSprite.prototype.setSkin = function(b) {
  this.mCurrentSkin = b || this.mCurrentSkin;
  if(b = this.mSkeleton.mSkeletonData.skins[this.mCurrentSkin]) {
    for(var c in slotList) {
      var d = slotList[c];
      if(d.attachment) {
        var e = b[d.name][d.attachment], f = this.mSlotMap[d.name];
        f.mLocation.mX = e.x || 0;
        f.mLocation.mY = e.y || 0;
        f.mRotation = e.rotation || 0;
        f.mWidth = e.width || 1;
        f.mHeight = e.height || 1;
        f.setTexture(d.attachment, this.mBodyAtlas);
        f.mPivotX = 0.5 * f.mWidth;
        f.mPivotY = 0.5 * f.mHeight
      }
    }
  }
};
ss2d.SkeletalSprite.prototype.addAnimation = function(b, c) {
  this.mAnimationsMap[b] = ss2d.ResourceManager.loadSkeletalAnimation(c)
};
ss2d.SkeletalSprite.prototype.playAnimation = function(b) {
  this.mCurrentAnimationTime = 0;
  this.mCurrentAnimation = this.mAnimationsMap[b] || null
};
ss2d.SkeletalSprite.prototype.stopAnimation = function() {
  this.mCurrentAnimationTime = 0;
  this.mCurrentAnimation = null;
  this.setDefaultPose()
};
ss2d.SkeletalSprite.prototype.updateAnimation = function(b) {
  this.mCurrentAnimation && 0.01 < Math.abs(this.mTimeDilation) && (this.mCurrentAnimationTime += b * this.mTimeDilation, 0 < this.mTimeDilation && this.mCurrentAnimationTime >= this.mCurrentAnimation.mDuration ? this.mCurrentAnimationTime -= this.mCurrentAnimation.mDuration : 0 > this.mTimeDilation && 0 >= this.mCurrentAnimationTime && (this.mCurrentAnimationTime += this.mCurrentAnimation.mDuration));
  this.tickChildren(b);
  if(this.mCurrentAnimation && (this.mCurrentAnimationTime > 3 * this.mCurrentAnimation.mDuration || this.mCurrentAnimationTime < -3 * this.mCurrentAnimation.mDuration)) {
    this.mCurrentAnimationTime = 0
  }
};
ss2d.SkeletalSprite.prototype.tick = function(b) {
  this.updateAnimation(b)
};
ss2d.SkeletalSprite.prototype.render = function(b) {
  b.pushTransform(this);
  this.mSlots.render(b);
  this.mShowBones && this.mBones.render(b);
  b.popTransform()
};
ss2d.SkeletalSprite.prototype.hitTestPoint = function(b) {
  return this.mSlots.hitTestPoint(b)
};
ss2d.ParticleEmitter = function(b, c, d, e, f) {
  ss2d.Quad.call(this, b, c, d, e);
  this.mPivotX = 0.5 * this.mWidth;
  this.mPivotY = 0.5 * this.mHeight;
  if("webgl" != RENDER_CONTEXT) {
    throw"ss2d.ParticleEmitter requires WebGL Rendering Context";
  }
  if(!f) {
    throw"No particle system provided";
  }
  this.mParticleSystem = f;
  this.mActive = !1;
  this.mShowHitBox = !0;
  "string" == typeof f && (this.mParticleSystem = ss2d.ResourceManager.loadParticleSystem(f, this.setup, this))
};
goog.inherits(ss2d.ParticleEmitter, ss2d.Quad);
ss2d.ParticleEmitter.MAX_UPDATE_RATE = 100;
ss2d.ParticleEmitter.prototype.setup = function(b) {
  this.mParticleSystem = b;
  this.mTexture = this.mParticleSystem.mTexture;
  b = this.mParticleSystem.mSystemDescriptor;
  this.mSourcePosition = new ss2d.Point(parseFloat(b.sourcePosition["-x"]), parseFloat(b.sourcePosition["-y"]));
  this.mSourcePositionVariance = new ss2d.Point(parseFloat(b.sourcePositionVariance["-x"]), parseFloat(b.sourcePositionVariance["-y"]));
  this.mGravity = new ss2d.Point(parseFloat(b.gravity["-x"]), parseFloat(b.gravity["-y"]));
  this.mAngle = parseFloat(b.angle["-value"]);
  this.mAngleVariance = parseFloat(b.angleVariance["-value"]);
  this.mSpeed = parseFloat(b.speed["-value"]);
  this.mSpeedVariance = parseFloat(b.speedVariance["-value"]);
  this.mRadialAcceleration = parseFloat(b.radialAcceleration["-value"]);
  this.mTangentialAcceleration = parseFloat(b.tangentialAcceleration["-value"]);
  this.mRadialAccelVariance = parseFloat(b.radialAccelVariance["-value"]);
  this.mTangentialAccelVariance = parseFloat(b.tangentialAccelVariance["-value"]);
  this.mParticleLifeSpan = Math.max(0.08, parseFloat(b.particleLifeSpan["-value"]));
  this.mParticleLifespanVariance = parseFloat(b.particleLifespanVariance["-value"]);
  this.mStartParticleSize = parseFloat(b.startParticleSize["-value"]);
  this.mStartParticleSizeVariance = parseFloat(b.startParticleSizeVariance["-value"]);
  this.mFinishParticleSize = parseFloat(b.finishParticleSize["-value"]);
  this.mFinishParticleSizeVariance = parseFloat((b.finishParticleSizeVariance || b.FinishParticleSizeVariance)["-value"]);
  this.mMaxParticles = parseFloat(b.maxParticles["-value"]);
  this.mDuration = parseFloat(b.duration["-value"]);
  this.mRotationStart = parseFloat(b.rotationStart["-value"]);
  this.mRotationStartVariance = parseFloat(b.rotationStartVariance["-value"]);
  this.mRotationEnd = parseFloat(b.rotationEnd["-value"]);
  this.mRotationEndVariance = parseFloat(b.rotationEndVariance["-value"]);
  this.mBlendFuncSource = parseFloat(b.blendFuncSource["-value"]);
  this.mBlendFuncDestination = parseFloat(b.blendFuncDestination["-value"]);
  this.mStartColor = [parseFloat(b.startColor["-red"]), parseFloat(b.startColor["-green"]), parseFloat(b.startColor["-blue"]), parseFloat(b.startColor["-alpha"])];
  this.mStartColorVariance = [parseFloat(b.startColorVariance["-red"]), parseFloat(b.startColorVariance["-green"]), parseFloat(b.startColorVariance["-blue"]), parseFloat(b.startColorVariance["-alpha"])];
  this.mFinishColor = [parseFloat(b.finishColor["-red"]), parseFloat(b.finishColor["-green"]), parseFloat(b.finishColor["-blue"]), parseFloat(b.finishColor["-alpha"])];
  this.mFinishColorVariance = [parseFloat(b.finishColorVariance["-red"]), parseFloat(b.finishColorVariance["-green"]), parseFloat(b.finishColorVariance["-blue"]), parseFloat(b.finishColorVariance["-alpha"])];
  this.mMaxRadius = parseFloat(b.maxRadius["-value"]);
  this.mMaxRadiusVariance = parseFloat(b.maxRadiusVariance["-value"]);
  this.mMinRadius = parseFloat(b.minRadius["-value"]);
  this.mRotatePerSecond = parseFloat(b.rotatePerSecond["-value"]);
  this.mRotatePerSecondVariance = parseFloat(b.rotatePerSecondVariance["-value"]);
  this.mRadiusSpeed = 0;
  this.mRotation = -this.mAngle / (180 / Math.PI);
  this.mEmitterType = parseFloat(b.emitterType["-value"]);
  this.mParticleCount = 0;
  this.mEmissionRate = this.mMaxParticles / this.mParticleLifeSpan;
  this.mElapsedTime = this.mEmitCounter = 0;
  this.mUseTexture = !0;
  this.mParticleIndex = 0;
  this.mParticles = [];
  this.mParticleDataArray = new Float32Array(this.mMaxParticles);
  b = this.localToWorld(this.mLocation);
  for(var c = 0;c < this.mMaxParticles;++c) {
    this.mParticles[c] = this.generateParticle(null, b, 0.0080 * c), this.mParticles[c].getPCBufferArray(this.mParticleDataArray, 24 * c)
  }
  this.mParticleCount = this.mMaxParticles;
  b = ss2d.CURRENT_VIEW.mContext;
  this.mParticleDataBuffer = ss2d.CURRENT_VIEW.mRenderSupport.createBuffer(b.ARRAY_BUFFER, new Float32Array(this.mParticleDataArray), 6, this.mParticleDataArray.length / 6, b.DYNAMIC_DRAW);
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
ss2d.ParticleEmitter.prototype.generateParticle = function(b, c, d) {
  if(!(this.mParticleCount >= this.mMaxParticles)) {
    b = b || new ss2d.Particle;
    d = d || 0;
    b.mTimeStamp = ss2d.CURRENT_VIEW.mTotalTime;
    b.mPosition.mX = c.mX + (2 * Math.random() - 1) * this.mSourcePositionVariance.mX;
    b.mPosition.mY = c.mY + (2 * Math.random() - 1) * this.mSourcePositionVariance.mY;
    b.mStartPos.mX = c.mX;
    b.mStartPos.mY = c.mY;
    c = this.mRotation + (2 * Math.random() - 1) * this.mAngleVariance / (180 / Math.PI);
    c = new ss2d.Point(Math.cos(c), Math.sin(c));
    var e = this.mSpeed + (2 * Math.random() - 1) * this.mSpeedVariance;
    b.mDirection = ss2d.Point.scalePoint(c, e);
    b.mRadius = this.mMaxRadius + (2 * Math.random() - 1) * this.mMaxRadiusVariance;
    b.mRadiusDelta = this.mMaxRadius / this.mParticleLifeSpan;
    b.mAngle = this.mRotation + (2 * Math.random() - 1) * this.mAngleVariance / (180 / Math.PI);
    b.mDegreesPerSecond = (this.mRotatePerSecond + (2 * Math.random() - 1) * this.mRotatePerSecondVariance) / (180 / Math.PI);
    b.mRadialAcceleration = this.mRadialAcceleration;
    b.mTangentialAcceleration = this.mTangentialAcceleration;
    b.mTimeToLive = Math.max(0, this.mParticleLifeSpan + this.mParticleLifespanVariance * (2 * Math.random() - 1)) + d;
    d = this.mStartParticleSize + this.mStartParticleSizeVariance * (2 * Math.random() - 1);
    c = this.mFinishParticleSize + this.mFinishParticleSizeVariance * (2 * Math.random() - 1);
    b.mParticleSizeDelta = (c - d) / this.mParticleLifeSpan / this.mTexture.mTextureElement.width;
    b.mParticleSize = Math.max(0, d);
    d = b.mColor;
    d[0] = this.mStartColor[0] + this.mStartColorVariance[0] * (2 * Math.random() - 1);
    d[1] = this.mStartColor[1] + this.mStartColorVariance[1] * (2 * Math.random() - 1);
    d[2] = this.mStartColor[2] + this.mStartColorVariance[2] * (2 * Math.random() - 1);
    d[3] = this.mStartColor[3] + this.mStartColorVariance[3] * (2 * Math.random() - 1);
    c = [];
    c[0] = this.mFinishColor[0] + this.mFinishColorVariance[0] * (2 * Math.random() - 1);
    c[1] = this.mFinishColor[1] + this.mFinishColorVariance[1] * (2 * Math.random() - 1);
    c[2] = this.mFinishColor[2] + this.mFinishColorVariance[2] * (2 * Math.random() - 1);
    c[3] = this.mFinishColor[3] + this.mFinishColorVariance[3] * (2 * Math.random() - 1);
    e = b.mDeltaColor;
    e[0] = (c[0] - d[0]) / b.mTimeToLive / this.mParticleLifeSpan;
    e[1] = (c[1] - d[1]) / b.mTimeToLive / this.mParticleLifeSpan;
    e[2] = (c[2] - d[2]) / b.mTimeToLive / this.mParticleLifeSpan;
    e[3] = (c[3] - d[3]) / b.mTimeToLive / this.mParticleLifeSpan;
    d = this.mRotationStart + this.mRotationStartVariance * (2 * Math.random() - 1);
    c = this.mRotationEnd + this.mRotationEndVariance * (2 * Math.random() - 1);
    b.mRotation = d;
    b.mRotationDelta = (c - d) / this.mParticleLifeSpan;
    this.mParticleCount++;
    return b
  }
};
"webgl" == RENDER_CONTEXT && (ss2d.ParticleEmitter.prototype.render = function(b) {
  if(this.mReady) {
    this.mPivotX = 0.5 * this.mWidth;
    this.mPivotY = 0.5 * this.mHeight;
    var c = b.mContext;
    c.blendFunc(this.mBlendFuncSource, this.mBlendFuncDestination);
    var d = b.mMaterials.mParticle;
    d.mActiveTexture = this.mTexture.mTextureId;
    d.mParticleDataBuffer = this.mParticleDataBuffer;
    d.mParticleDataArray = this.mParticleDataArray;
    d.apply(b);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b.mBuffers.mParticlesQVI);
    c.drawElements(c.TRIANGLES, 6 * this.mMaxParticles, c.UNSIGNED_SHORT, 0);
    c.blendFunc(b.mDefaultBlendSource, b.mDefaultBlendDestination);
    this.mShowHitBox && (c = this.mAlpha, this.mAlpha = 0.5, ss2d.Quad.prototype.render.call(this, b), this.mAlpha = c)
  }
}, ss2d.ParticleEmitter.prototype.tick = function(b) {
  this.updateParticles(b)
}, ss2d.ParticleEmitter.prototype.updateParticles = function(b) {
  if(this.mReady) {
    var c = ss2d.CURRENT_VIEW.mContext;
    if(this.mActive && this.mEmissionRate) {
      var d = 1 / this.mEmissionRate;
      this.mEmitCounter += b;
      for(var e = [], f = this.localToWorld(this.mLocation);this.mParticleCount < this.mMaxParticles && this.mEmitCounter > d;) {
        if(this.mEmitCounter -= d, 0 != this.mFreeParticles.length) {
          var g = this.mFreeParticles.pop(), h = this.generateParticle(this.mParticles[g], f), e = h.getArray(e), e = e.concat(e), e = e.concat(e);
          c.bindBuffer(c.ARRAY_BUFFER, this.mParticleDataBuffer);
          c.bufferSubData(c.ARRAY_BUFFER, 4 * 4 * g * ss2d.Particle.SRUCT_SIZE, new Float32Array(e))
        }
      }
      this.mElapsedTime += b;
      -1 != this.mDuration && this.mDuration < this.mElapsedTime && this.stopEmitter()
    }
    for(c = 0;c < this.mMaxParticles;++c) {
      if(h = this.mParticles[c], h.mTimeToLive -= b, h.mRadius -= h.mRadiusDelta * b, 0 >= h.mTimeToLive || 1 == this.mEmitterType && h.mRadius < this.mMinRadius) {
        this.mParticleCount--, this.mFreeParticles.push(c)
      }
    }
  }
});
ss2d.ServerView = function(b, c, d) {
  this.mRunning = !1;
  this.mFrameRate = d || 20;
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  this.mMainScene = b || new ss2d.DisplayObjectContainer;
  this.mMainScene.mParentView = this;
  this.mComunication = new ss2d.ServerCommunicationInterface(this, c);
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
  var b = (new Date).getTime(), c = b - this.mLastFrameTimestamp, d = timePasse / 1E3;
  this.mTotalTime += d;
  for(var e in this.mPreTickFunctions) {
    this.mPreTickFunctions[e].call(null, d)
  }
  this.mMainScene.tick(d);
  for(e in this.mPostTickFunctions) {
    this.mPostTickFunctions[e].call(null, d)
  }
  d = Math.floor(Math.max(1, c / (1E3 / ss2d.PhysicalWorld.UPDATE_RATE)));
  for(e = 0;e < d;++e) {
    this.mPhysicalWorld.tick(c / d / 1E3)
  }
  this.mLastFrameTimestamp = b;
  b = ((new Date).getTime() - b) / 1E3;
  b = 1 / this.mFrameRate - b;
  this.mRunning && setTimeout(ss2d.ServerView.NEXT_FRAME_CALLER, 1E3 * b)
};
ss2d.ServerView.prototype.startLoop = function() {
  !this.mRunning && null != this.mMainScene && (this.mRunning = !0, this.nextFrame())
};
ss2d.ServerView.prototype.stopLoop = function() {
  this.mRunning = !1
};
var ss2dLib = {};

