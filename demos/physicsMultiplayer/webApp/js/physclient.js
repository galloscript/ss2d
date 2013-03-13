var COMPILED = !0, goog = goog || {};
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
var ss2d = {Pickable:function(b, c) {
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
}};
ss2d.Pickable.PICKED_COMPONENT = null;
ss2d.Pickable.prototype.tick = function(b, c) {
  var d = c || ss2d.CURRENT_VIEW.mInput;
  this.mJustPicked = !1;
  d.mMouseDown && !d.mPreviousMouseDown && this.mOwner.hitTestPoint(d.mMousePoint) && (ss2d.Pickable.PICKED_COMPONENT && (this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), this.mInput = this.mMouseJoint = null), ss2d.Pickable.PICKED_COMPONENT.mPicked = !1), this.mPicked = this.mJustPicked = !0, this.mInput = d, ss2d.Pickable.PICKED_COMPONENT = this, d = this.mOwner.worldToLocal(d.mMousePoint), this.mOffset.set(this.mOwner.mLocation.mX - d.mX, 
  this.mOwner.mLocation.mY - d.mY), this.mRigidBody && (this.mMouseJoint = ss2d.PhysicalWorld.getWorld().createMouseJoint(this.mRigidBody, this.mInput), this.mRigidBody.mBody.WakeUp()));
  (this.mPicked = ss2d.Pickable.PICKED_COMPONENT == this && this.mInput && this.mInput.mMouseDown) ? (d = this.mInput, this.mMoveObject && (d = this.mOwner.worldToLocal(d.mMousePoint), this.mRigidBody ? this.mMouseJoint && this.mMouseJoint.m_target.Set(d.mX, d.mY) : (this.mOwner.mLocation.mX = d.mX + this.mOffset.mX, this.mOwner.mLocation.mY = d.mY + this.mOffset.mY))) : ss2d.Pickable.PICKED_COMPONENT == this && (ss2d.Pickable.PICKED_COMPONENT = null, this.mRigidBody && this.mMouseJoint && (ss2d.PhysicalWorld.getWorld().mWorld.DestroyJoint(this.mMouseJoint), 
  this.mInput = this.mMouseJoint = null));
  this.mPreviousPicked = this.mPicked
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
ss2d.Color = function(b) {
  this.setValue(b)
};
ss2d.Color.prototype.setValue = function(b) {
  if(b instanceof ss2d.Color) {
    this.mColorArray = b.mColorArray.slice(0)
  }else {
    if(b instanceof Array && 2 < b.length) {
      this.mColorArray = b.slice(0)
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
ss2d.Color.prototype.getF32Array = function(b) {
  b = b || Array(3);
  b[0] = this.mColorArray[0] / 255;
  b[1] = this.mColorArray[1] / 255;
  b[2] = this.mColorArray[2] / 255;
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
ss2d.Point = function(b, c) {
  this.mX = b;
  this.mY = c
};
ss2d.Point.prototype.set = function(b, c) {
  this.mX = b;
  this.mY = c
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
  this.mC = this.mB = 0;
  this.mD = 1;
  this.mTy = this.mTx = 0;
  this.mMatF32Array = Array(9)
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
  return(new ss2d.Matrix3).setValues(this.mA, this.mB, this.mC, this.mD, this.mTx, this.mTy)
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
  c.setValues(Math.cos(b), Math.sin(b), -Math.sin(b), Math.cos(b), 0, 0);
  this.concatMatrix(c);
  delete c;
  return this
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
ss2d.Matrix3.prototype.getMatF32Array = function() {
  this.mMatF32Array[0] = this.mA;
  this.mMatF32Array[1] = this.mB;
  this.mMatF32Array[2] = 0;
  this.mMatF32Array[3] = this.mC;
  this.mMatF32Array[4] = this.mD;
  this.mMatF32Array[5] = 0;
  this.mMatF32Array[6] = this.mTx;
  this.mMatF32Array[7] = this.mTy;
  this.mMatF32Array[8] = 1;
  return this.mMatF32Array
};
ss2d.Defines = {};
var RENDER_CONTEXT = "2d", COMPILING_CLIENT = !0, COMPILING_SERVER = !1, COMPILING_OFFLINE = !1;
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
  COMPILING_SERVER && (this.mSoundList = [])
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
ss2d.DisplayObject.prototype.getWorldTransformationMatrix = function() {
  for(var b = [], c = this;c.mParent;) {
    b.push(c.mParent), c = c.mParent
  }
  var c = new ss2d.Matrix3, d = new ss2d.Matrix3;
  for(matIndex in b) {
    d.identity(), b[matIndex].getTransformationMatrix(d), c.concatMatrix(d)
  }
  return c
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
ss2d.DisplayObject.prototype.tick = function() {
};
ss2d.DisplayObject.prototype.render = function() {
};
ss2d.DisplayObject.prototype.getBounds = function() {
  return null
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
  this.mLocation.mX = b.x + (c.x - b.x) * d;
  this.mLocation.mY = b.y + (c.y - b.y) * d;
  this.mRotation = b.r + (c.r - b.r) * d;
  this.mPivotX = b.px + (c.px - b.px) * d;
  this.mPivotY = b.py + (c.py - b.py) * d;
  this.mScaleX = b.sx + (c.sx - b.sx) * d;
  this.mScaleY = b.sy + (c.sy - b.sy) * d;
  var f = ss2d.Color.interpolate(b.c, c.c, d).getRGBArray();
  this.mColor.setRGB(f[0], f[1], f[2]);
  this.mAlpha = b.a + (c.a - b.a) * d;
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
  ss2d.Quad.prototype.render = function(b) {
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
  this.mWidth = b.w + (c.w - b.w) * d;
  this.mHeight = b.h + (c.h - b.h) * d
});
COMPILING_SERVER && (ss2d.Quad.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Quad.prototype.getPropertiesJSON = function() {
  var b = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",", b = b + ('"w": ' + this.getWidth() + ",");
  return b += '"h": ' + this.getHeight()
});
ss2d.Texture = function(b, c) {
  this.mName = b;
  this.mTextureElement = new Image;
  this.mTextureElement.mTexture = this;
  this.mCallbackFunction = c || function() {
  };
  this.mTextureElement.onload = function() {
    this.mTexture.handleLoadedTexture()
  };
  this.mTextureElement.src = b
};
ss2d.Texture.prototype.handleLoadedTexture = function() {
  this.mCallbackFunction.call(null, this)
};
ss2d.Texture.prototype.getWidth = function() {
  return this.mTextureElement.width
};
ss2d.Texture.prototype.getHeight = function() {
  return this.mTextureElement.height
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
  this.mTexture = new ss2d.Texture(b, this.mCallbackFunction)
};
ss2d.BitmapFont.prototype.getGlyphClip = function(b, c) {
  c = c || [];
  var d = this.mFontDescriptor.mIndexedChars[b];
  d && (c[0] = d["-x"], c[1] = d["-y"], c[2] = d["-width"], c[3] = d["-height"], c[4] = d["-xadvance"], c[5] = d["-yoffset"]);
  return c
};
ss2d.ILoader = {};
ss2d.ILoader.RESOURCE_EXTENSION = "";
ss2d.ILoader.loadResource = function() {
};
ss2d.BitmapFontLoader = {};
ss2d.BitmapFontLoader.RESOURCE_EXTENSION = "bmfont";
ss2d.BitmapFontLoader.loadResource = function(b, c) {
  return new ss2d.BitmapFont(b, c)
};
ss2d.TextureAtlas = function(b, c) {
  this.mName = b;
  this.mCallbackFunction = c;
  this.mTexture = this.mAtlasDescriptor = null;
  var d = new XMLHttpRequest;
  d.mAtlas = this;
  d.open("GET", b, !0);
  d.responseType = "text";
  d.onload = function() {
    this.mAtlas.atlasFileLoaded(this.response)
  };
  d.send()
};
ss2d.TextureAtlas.prototype.atlasFileLoaded = function(b) {
  this.mAtlasDescriptor = JSON.parse(b);
  b = this.mName.lastIndexOf("/") + 1;
  var c = this.mAtlasDescriptor.meta.image;
  b = 0 < b ? this.mName.substring(0, b) + c : c;
  this.mTexture = new ss2d.Texture(b, this.mCallbackFunction)
};
ss2d.TextureAtlas.prototype.getClipFor = function(b, c) {
  c = c || [];
  var d = this.mAtlasDescriptor.frames[b].frame;
  d && (c[0] = d.x, c[1] = d.y, c[2] = d.w, c[3] = d.h);
  return c
};
ss2d.TextureAtlasLoader = {};
ss2d.TextureAtlasLoader.RESOURCE_EXTENSION = "atlas";
ss2d.TextureAtlasLoader.loadResource = function(b, c) {
  return new ss2d.TextureAtlas(b, c)
};
ss2d.TextureLoader = {};
ss2d.TextureLoader.RESOURCE_EXTENSION = "texture";
ss2d.TextureLoader.loadResource = function(b, c) {
  return new ss2d.Texture(b, c)
};
ss2d.AudioLoader = {};
ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if("undefined" != typeof webkitAudioContext || "undefined" != typeof AudioContext) {
  ss2d.AudioLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio
}
ss2d.AudioLoader.RESOURCE_EXTENSION = "sound";
ss2d.AudioLoader.loadResource = function(b, c) {
  return new ss2d.AudioLoader.AUDIO_COMPONENT_CLASS(b, c)
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
ss2d.ResourceManager.Loaders = {TEXTURE:ss2d.TextureLoader, SOUND:ss2d.AudioLoader, TEXTURE_ATLAS:ss2d.TextureAtlasLoader, BITMAP_FONT:ss2d.BitmapFontLoader};
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
ss2d.ResourceManager.loadResourceWithLoader = function(b, c, d) {
  var e = ss2d.ResourceManager.LOADED_RESOURCES, f = c + "." + b.RESOURCE_EXTENSION;
  e[f] || (e[f] = b.loadResource(c, d));
  return e[f]
};
ss2d.ResourceManager.loadEndsCallback = function(b) {
  ++ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD;
  ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK(b.mName, ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceManager.ELEMENTS_TO_LOAD);
  ss2d.ResourceManager.ELEMENTS_TO_LOAD == ss2d.ResourceManager.CURRENT_ELEMENT_TO_LOAD && (console.log("Load resources ends"), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK.call(), ss2d.ResourceManager.ELEMENTS_LOADED_CALLBACK = function() {
  }, ss2d.ResourceManager.ONE_ELEMENT_LOADED_CALLBACK = function() {
  })
};
ss2d.ResourceManager.loadTexture = function(b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureLoader, b, c)
};
ss2d.ResourceManager.loadTextureAtlas = function(b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.TextureAtlasLoader, b, c)
};
ss2d.ResourceManager.loadSound = function(b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.AudioLoader, b, c)
};
ss2d.ResourceManager.loadBitmapFont = function(b, c) {
  return ss2d.ResourceManager.loadResourceWithLoader(ss2d.BitmapFontLoader, b, c)
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
  ss2d.Sprite.prototype.render = function(b) {
    var c = null;
    this.mTextureAtlas ? this.mTextureAtlas.mTexture && this.mTextureAtlas.mAtlasDescriptor && (c = this.mTextureAtlas.mTexture.mTextureElement, this.mTextureAtlas.getClipFor(this.mTexture, this.mClip)) : c = this.mTexture.mTextureElement;
    b.pushTransform(this);
    var d = b.mContext;
    c && (3 < this.mClip.length ? d.drawImage(c, this.mClip[0], this.mClip[1], this.mClip[2], this.mClip[3], 0, 0, this.mWidth, this.mHeight) : d.drawImage(c, 0, 0, this.mWidth, this.mHeight));
    b.popTransform()
  }
}
ss2d.Sprite.prototype.setWidth = function(b, c) {
  this.mWidth = b;
  c || (this.mClip[2] = b)
};
ss2d.Sprite.prototype.setHeight = function(b, c) {
  this.mHeight = b;
  c || (this.mClip[3] = b)
};
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
  this.mClip && (c += ',"clip": ' + JSON.stringify(this.mClip));
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
      this.mBody.m_rotation = this.mOwner.mRotation + Math.PI;
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
  this.mBody && (this.mOwner.mLocation.mX = this.mBody.m_position.x, this.mOwner.mLocation.mY = this.mBody.m_position.y, this.mOwner.mRotation = this.mBody.m_rotation - Math.PI)
};
var phys = {Crate:function(b, c) {
  ss2d.Sprite.call(this, b, c, 40, 40, "textures/crate0.png");
  COMPILING_SERVER && (this.mRigidBody = new ss2d.RigidBody(this), this.mPickable = new ss2d.Pickable(this, this.mRigidBody))
}};
goog.inherits(phys.Crate, ss2d.Sprite);
ss2d.Object.assignClassId(phys.Crate, 3001);
COMPILING_CLIENT && (phys.Crate.createFromSerializedObject = function(b) {
  var c = new phys.Crate;
  c.mObjectId = b.doid;
  return c
});
COMPILING_SERVER && (phys.Crate.prototype.tick = function(b) {
  for(var c = ss2d.CURRENT_VIEW.mComunication.mUserConnections, d = 0;d < c.length;++d) {
    this.mPickable.tick(b, c[d].mInput)
  }
  this.mRigidBody.tick(b)
});
phys.UserAvatar = function(b) {
  ss2d.Quad.call(this, 0, 0, 5, 5, 16777215);
  this.mConnection = b || null;
  this.mUserName = ""
};
goog.inherits(phys.UserAvatar, ss2d.Quad);
ss2d.Object.assignClassId(phys.UserAvatar, 3003);
phys.UserAvatar.createFromSerializedObject = function(b) {
  var c = new phys.UserAvatar;
  c.mObjectId = b.doid;
  return c
};
phys.UserAvatar.prototype.interpolateState = function(b, c, d) {
  this.mLocation.mX = b.x + (c.x - b.x) * d;
  this.mLocation.mY = b.y + (c.y - b.y) * d;
  this.mUserName = c.uname
};
COMPILING_CLIENT && (phys.UserAvatar.prototype.render = function(b) {
  b.pushTransform(this);
  var c = b.mContext;
  c.fillStyle = this.mColor.getHexString();
  c.fillRect(0, 0, this.mWidth, this.mHeight);
  c.font = "normal 12px Verdana";
  c.fillText(this.mUserName, -5, -10);
  b.popTransform()
});
COMPILING_SERVER && (phys.UserAvatar.prototype.hitTestPoint = function(b) {
  var c = new ss2d.Point(this.mLocation.mX, this.mLocation.mY);
  b = ss2d.Point.distanceBetweenPoints(c, this.worldToLocal(b));
  delete c;
  return b <= this.mRadius ? this : null
}, phys.UserAvatar.prototype.tick = function() {
  this.mLocation.mX = this.mConnection.mInput.mMouseX;
  this.mLocation.mY = this.mConnection.mInput.mMouseY
});
phys.UserAvatar.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
};
phys.UserAvatar.prototype.getPropertiesJSON = function() {
  var b = '"cid":' + this.CLASS_ID + ",", b = b + ('"doid":' + this.mObjectId + ","), b = b + ('"x":' + Math.floor(this.mLocation.mX) + ","), b = b + ('"y":' + Math.floor(this.mLocation.mY) + ",");
  return b += '"uname":"' + this.mUserName + '"'
};
ss2d.DisplayObjectContainer = function(b, c, d, e) {
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
ss2d.DefaultConfig = {};
ss2d.DefaultConfig.FRAME_RATE = 60;
ss2d.DefaultConfig.CANVAS_WIDTH = 800;
ss2d.DefaultConfig.CANVAS_HEIGHT = 600;
ss2d.DefaultConfig.SERVER_HOST = "localhost";
ss2d.DefaultConfig.SERVER_PORT = 0;
phys.Config = ss2d.DefaultConfig;
phys.Config.CLIENT_FRAME_RATE = 60;
phys.Config.SERVER_FRAME_RATE = 30;
phys.Config.CANVAS_WIDTH = 768;
phys.Config.CANVAS_HEIGHT = 432;
phys.Config.SERVER_HOST = "127.0.0.1";
phys.Config.SERVER_PORT = 51E3;
phys.World = function() {
  ss2d.MultiplayerScene.call(this);
  if(COMPILING_SERVER) {
    for(var b = 20;b--;) {
      var c = new phys.Crate(0.5 * phys.Config.CANVAS_WIDTH + 10 * Math.random(), 0.5 * phys.Config.CANVAS_HEIGHT + 10 * Math.random());
      this.addObject(c)
    }
    b = new ss2d.Quad(350, 400, 700, 30, "#ff0000");
    this.addObject(b);
    b.mRB = new ss2d.RigidBody(b, null, !1);
    this.mUserTracker = new ss2d.DisplayObjectContainer;
    this.addObject(this.mUserTracker)
  }
};
goog.inherits(phys.World, ss2d.MultiplayerScene);
ss2d.Object.assignClassId(phys.World, 3002);
COMPILING_CLIENT && (phys.World.convert = function(b) {
  ss2d.DisplayObjectContainer.convert.call(b);
  b.__proto__ = phys.World.prototype;
  return b
}, phys.World.createFromSerializedObject = function(b) {
  var c = new phys.World;
  c.mObjectId = b.doid;
  return c
}, phys.World.prototype.tick = function(b) {
  this.tickChildren(b);
  var c = ss2d.CURRENT_VIEW.mInput;
  c.isKeyPressed(ss2d.Input.Keys.D) && (this.mLocation.mX -= 200 * b);
  c.isKeyPressed(ss2d.Input.Keys.A) && (this.mLocation.mX += 200 * b);
  c.isKeyPressed(ss2d.Input.Keys.W) && (this.mLocation.mY += 200 * b);
  c.isKeyPressed(ss2d.Input.Keys.S) && (this.mLocation.mY -= 200 * b);
  c.isKeyPressed(ss2d.Input.Keys.Z) && (this.mScaleY = this.mScaleX += 0.5 * b);
  c.isKeyPressed(ss2d.Input.Keys.X) && (this.mScaleY = this.mScaleX -= 0.5 * b);
  c.isKeyPressed(ss2d.Input.Keys.R) && (this.mLocation.mX = 0, this.mRotation = this.mLocation.mY = 0, this.mScaleY = this.mScaleX = 1)
});
COMPILING_SERVER && (phys.World.prototype.onUserConnect = function(b) {
  this.mUserTracker.addObject(new phys.UserAvatar(b));
  ss2d.CURRENT_VIEW.mFrameRate = phys.Config.SERVER_FRAME_RATE
}, phys.World.prototype.onUserDisconnect = function(b) {
  for(var c = 0;c < this.mUserTracker.mChildren.length;++c) {
    var d = this.mUserTracker.mChildren[c];
    d.mConnection == b && (this.mUserTracker.removeObject(d), c = this.mUserTracker.mChildren.length, console.log(b.mUserName + " disconnect"))
  }
  0 == this.mUserTracker.mChildren.length && (ss2d.CURRENT_VIEW.mFrameRate = 0.5)
}, phys.World.prototype.onUserChangeName = function(b) {
  for(var c = 0;c < this.mUserTracker.mChildren.length;++c) {
    var d = this.mUserTracker.mChildren[c];
    d.mConnection == b && (d.mUserName = b.mUserName, c = this.mUserTracker.mChildren.length)
  }
}, phys.World.prototype.onUserMessage = function() {
});
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
  this.mClicked = this.mPreviousMouseDown = !1
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
ss2d.Input.windowMouseEventHandler = function() {
  var b = ss2d.CURRENT_VIEW.mInput;
  if(b.mView.mHaveFocus) {
    b.onFocusOut()
  }
};
ss2d.Input.prototype.handleEvent = function(b) {
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
  return this.mView.mHaveFocus ? (this.mPressedKeys["_" + parseInt(b.keyCode)] = !1, delete this.mPressedKeys["_" + parseInt(b.keyCode)], !1) : !0
};
ss2d.Input.prototype.onFocusIn = function() {
  this.mView.mHaveFocus = !0
};
ss2d.Input.prototype.onFocusOut = function() {
  this.mClicked = this.mView.mHaveFocus = !1
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
ss2d.RenderSupport = function(b) {
  this.mContext = b;
  this.mAuxMatrix = new ss2d.Matrix3;
  "webgl" == RENDER_CONTEXT && (this.mMatrixStack = [], this.mCurrentMatrix = new ss2d.Matrix3)
};
ss2d.RenderSupport.prototype.pushTransform = function() {
};
ss2d.RenderSupport.prototype.pushTransform = "webgl" == RENDER_CONTEXT ? function(b) {
  this.mAuxMatrix.identity();
  b = b.getTransformationMatrix(this.mAuxMatrix);
  this.mMatrixStack.push(b);
  this.mCurrentMatrix = this.mCurrentMatrix.concatMatrix(b)
} : function(b) {
  this.mAuxMatrix.identity();
  var c = b.getTransformationMatrix(this.mAuxMatrix);
  this.mContext.save();
  this.mContext.globalAlpha *= b.mAlpha;
  this.mContext.transform(c.mA, c.mB, c.mC, c.mD, c.mTx, c.mTy)
};
ss2d.RenderSupport.prototype.popTransform = function() {
};
ss2d.RenderSupport.prototype.popTransform = "webgl" == RENDER_CONTEXT ? function() {
  0 < this.mMatrixStack.length && this.mCurrentMatrix.concatMatrix(this.mMatrixStack.pop().invert())
} : function() {
  this.mContext.restore()
};
ss2d.IAudioComponent = function() {
};
ss2d.IAudioComponent.prototype.play = function() {
};
ss2d.IAudioComponent.prototype.pause = function() {
};
ss2d.IAudioComponent.prototype.stop = function() {
};
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
  this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = e || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = c || this.mCanvas.height;
  this.mCanvas.height = d || this.mCanvas.height;
  ss2d.CURRENT_VIEW = this;
  ss2d.ClientView.CANVAS_CONTEXT = this.mContext;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = null;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020";
  this.mSceneQueue = [];
  this.mComunication = null;
  this.mDelay = g || 100;
  this.mInputRate = f || 20;
  window.wastedTimePerFrame = 0
};
ss2d.ClientView.CANVAS_CONTEXT = null;
ss2d.ClientView.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER = function() {
  ss2d.CURRENT_VIEW.nextInputUpdate()
};
ss2d.ClientView.prototype.nextFrame = function() {
  var b = (new Date).getTime(), c = b - this.mLastFrameTimestamp;
  1 < this.mSceneQueue.length && (this.updateSceneState(b, c / 1E3), this.mContext.fillStyle = this.mBackgroundFillStyle, this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height), null != this.mMainScene && this.mMainScene.render(this.mRenderSupport));
  this.mInput.tick(c / 1E3);
  this.mLastFrameTimestamp = b;
  b = ((new Date).getTime() - b) / 1E3;
  b = Math.max(0, 1 / this.mFrameRate - b);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_FRAME_CALLER, 1E3 * b)
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
ss2d.ClientView.prototype.startConnection = function(b, c) {
  this.mComunication = new ss2d.ClientCommunicationInterface(this, b, c)
};
ss2d.ClientView.prototype.onConnect = function() {
};
ss2d.ClientView.prototype.onDisconnect = function() {
};
ss2d.ClientView.prototype.onServerMessage = function() {
};
phys.client = new ss2d.ClientView("mainScene", phys.Config.CANVAS_WIDTH, phys.Config.CANVAS_HEIGHT, phys.Config.CLIENT_FRAME_RATE, 20, 100);
phys.client.onConnect = function() {
  for(var b = "";null != b && 3 > b.length;) {
    b = window.prompt("Your name? (3 characters min)")
  }
  b && phys.client.mComunication.packAndSendUserName(b.substring(0, 8))
};
phys.client.onServerMessage = function(b, c) {
  switch(b) {
    case "REJECTED":
      alert(c), phys.client.noAlertOnDisconnect = !0
  }
};
phys.client.onDisconnect = function() {
  ("undefined" == typeof phys.client.noAlertOnDisconnect || !phys.client.noAlertOnDisconnect) && alert("Disconnected")
};
phys.client.startConnection(phys.Config.SERVER_HOST, phys.Config.SERVER_PORT);
phys.client.startLoop();

