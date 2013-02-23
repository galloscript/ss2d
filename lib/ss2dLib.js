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
ss2d.Defines = {};
var RENDER_CONTEXT = "2d", COMPILING_CLIENT = !1, COMPILING_SERVER = !1, COMPILING_OFFLINE = !0;
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
  this.mTexture = new ss2d.Texture(this.mAtlasDescriptor.meta.image, this.mCallbackFunction)
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
ss2d.ResourceManager.Loaders = {TEXTURE:ss2d.TextureLoader, SOUND:ss2d.AudioLoader, TEXTURE_ATLAS:ss2d.TextureAtlasLoader};
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
ss2d.ReelFrame = function(b, c, d, e, f, g, h) {
  this.mX = b;
  this.mY = c;
  this.mWidth = d;
  this.mHeight = e;
  this.mOffsetX = g || 0;
  this.mOffsetY = h || 0;
  this.mTexture = f instanceof ss2d.Texture ? f : ss2d.ResourceManager.loadTexture(f)
};
ss2d.ReelFrame.prototype.dumpClip = function(b) {
  b = b || Array(4);
  b[0] = this.mX;
  b[1] = this.mY;
  b[2] = this.mWidth;
  b[3] = this.mHeight;
  return b
};
ss2d.Reel = function(b) {
  this.mFrames = [];
  this.mDuration = b
};
ss2d.Reel.prototype.getTimePerFrame = function() {
  return this.mFrames.length ? this.mDuration / this.mFrames.length : 0
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
ss2d.IAnimatable = function() {
  this.mTarget = null
};
ss2d.IAnimatable.prototype.advanceTime = function() {
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
ss2d.DelayedInvocation.prototype.advanceTime = function(b) {
  this.mComplete || (this.mPassedTime += b, this.mPassedTime >= this.mDelayTime && (this.mComplete = !0, this.performCalls(), delete this.mValues, delete this.mMethods))
};
ss2d.DelayedInvocation.prototype.isComplete = function() {
  return this.mComplete
};
ss2d.Juggler = function() {
  this.mObjects = [];
  this.mElapsedTime = 0
};
ss2d.Juggler.prototype.advanceTime = function(b) {
  this.mElapsedTime += b;
  for(var c = this.mObjects.slice(), d = 0;d < c.length;++d) {
    var e = c[d];
    e.advanceTime(b);
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
  this.mClicked = this.mPreviousMouseDown = !1
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
  this.mClicked = this.mView.mHaveFocus = !1;
  for(var b in this.mPressedKeys) {
    this.mPressedKeys[b] = !1, delete this.mPressedKeys[b]
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
ss2d.Input.prototype.toJSON = function() {
  var b;
  b = "{" + ('"keys":' + JSON.stringify(this.mPressedKeys) + ",");
  b += '"mx":' + this.mMouseX + ",";
  b += '"my":' + this.mMouseY + ",";
  b += '"md":' + this.mMouseDown;
  return b + "}"
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
  return!(b.mX <= this.mX && b.mX + b.mWidth <= this.mX) || b.mX >= this.mX + this.mWidth && rX + b.mWidth >= this.mX + this.mWidth || b.mY <= this.mY && b.mY + b.mHeight <= this.mY || b.mY >= this.mY + this.mHeight && b.mY + b.mHeight >= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.intersectionWithRectangle = function(b, c) {
  if(!b) {
    return null
  }
  c || (c = new ss2d.Rectangle(0, 0, 0, 0));
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
  return ss2d.Point.scalePoint(this, 1 / this.length())
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
  c.setValues(-Math.cos(b), -Math.sin(b), -Math.sin(b), Math.cos(b), 0, 0);
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
    b.unshift(c.mParent), c = c.mParent
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
  var b = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",", b = b + ('"w": ' + this.mWidth + ",");
  return b += '"h": ' + this.mHeight
});
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
    c && (4 == this.mClip.length ? d.drawImage(c, this.mClip[0], this.mClip[1], this.mClip[2], this.mClip[3], 0, 0, this.mWidth, this.mHeight) : d.drawImage(c, 0, 0, this.mWidth, this.mHeight));
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
}, ss2d.Sprite.prototype.interpolateState = function(b, c, d) {
  ss2d.Quad.prototype.interpolateState.call(this, b, c, d, deltaTime);
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
ss2d.ReelSet = function(b, c) {
  this.mCallbackFunction = c;
  this.mReels = b ? this.loadFromFile(b) : {}
};
ss2d.ReelSet.prototype.loadFromFile = function() {
  this.mCallbackFunction.call(this);
  return{}
};
ss2d.ReelSprite = function(b, c, d, e, f) {
  ss2d.Quad.call(this, b, c, d, e);
  if(!f) {
    throw"Trying to create a sprite reel without a SpriteReelDescriptor";
  }
  this.mDescriptor = f;
  this.mFirstFrame = this.mDescriptor.mFrames[0];
  this.mLoop = !0;
  this.mTimeDilation = 1;
  this.mTexture = this.mFirstFrame.mTexture;
  this.mClip = this.mFirstFrame.copyClip(Array(4));
  this.mOffsetY = this.mOffsetX = 0;
  this.mPlaying = !0;
  this.mComplete = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0
};
goog.inherits(ss2d.ReelSprite, ss2d.Sprite);
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);
ss2d.ReelSprite.prototype.playAnimation = function(b) {
  this.mDescriptor = b || this.mDescriptor;
  this.mPlaying = !0;
  this.mComplete = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0
};
ss2d.ReelSprite.prototype.pauseAnimation = function() {
  this.mPlaying = !1
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.ReelSprite.prototype.tick = function(b) {
    if(this.mPlaying) {
      var c = this.mDescriptor.getTimePerFrame() * this.mTimeDilation;
      this.mElapsedTimeCurrentFrame += b;
      this.mElapsedTimeCurrentFrame >= c && (this.mFrameCount++, this.mElapsedTimeCurrentFrame -= c, this.mFrameCount >= this.mDescriptor.mFrames.length && (this.mLoop ? this.mFrameCount = 0 : (this.mFrameCount--, this.mComplete = !0)), b = this.mDescriptor.mFrames[this.mFrameCount], b.dumpClip(this.mClip), this.mTexture = b.mTexture, this.mOffsetX = b.mOffsetX, this.mOffsetY = b.mOffsetY)
    }
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
ss2d.DisplayObjectContainer.prototype.hitTestPoint = function(b) {
  for(var c = null, d = this.mChildren.length - 1;0 <= d && !c;--d) {
    c = this.mChildren[d].hitTestPoint(b)
  }
  return c
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
  ss2d.DisplayObjectContainer.prototype.interpolateState.call(this, b, c, d, e, !0)
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
  this.mDelay = this.mCurrentTime = 0;
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
ss2d.Tween.prototype.fadeTo = function(b) {
  this.animateProperty(this.mTarget.getAlpha, this.mTarget.setAlpha, b)
};
ss2d.Tween.prototype.advanceTime = function(b) {
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
      this.advanceTime(d)
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
    this.mInterface.mUserConnections.length >= this.mInterface.mUserLimit ? (console.log("user rejected"), b.send('["REJECTED","Too many players connected."]'), b.close()) : (this.mInterface.mUserConnections.push(b), b.mUserName = "", b.mServer = this, b.mInput = new ss2d.InputProxy, b.mConnectionId = ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT++, this.mInterface.mServerView.mMainScene.onUserConnect(b), b.on("message", function(b) {
      b = JSON.parse(b.utf8Data);
      this.mServer.mInterface.processClientCommand(b, this)
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
  1 < this.mSceneQueue.length && (this.updateSceneState(b), this.mContext.fillStyle = this.mBackgroundFillStyle, this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height), null != this.mMainScene && this.mMainScene.render(this.mRenderSupport));
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
ss2d.ClientView.prototype.updateSceneState = function(b) {
  b -= this.mDelay;
  for(var c = -1, d = -1, e = 0;e < this.mSceneQueue.length && -1 == d;e++) {
    var f = this.mSceneQueue[e][0], g = this.mSceneQueue[e][1];
    f < b && (c = e, null != g.PLAYSOUNDS && (g.PLAYSOUNDS = null, delete g.PLAYSOUNDS));
    f >= b && (d = e)
  }
  if(-1 != c && -1 != d) {
    for(e = 0;e < c;++e) {
      this.interpolateSeceneStates(e, c, b)
    }
    this.interpolateSeceneStates(c, d, b)
  }
  this.mSceneQueue.splice(0, c)
};
ss2d.ClientView.prototype.interpolateSeceneStates = function(b, c, d) {
  var e = this.mSceneQueue[b][0];
  d = (d - e) / (this.mSceneQueue[c][0] - e);
  null == this.mMainScene && (this.mMainScene = ss2d.Object.getObjectPrototype(this.mSceneQueue[b][1]).createFromSerializedObject(this.mSceneQueue[b][1]), console.debug("main scene created"));
  this.mMainScene.interpolateState(this.mSceneQueue[b][1], this.mSceneQueue[c][1], d)
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
var ss2d = ss2d || {};
ss2d.CURRENT_VIEW = null;
ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
ss2d.View = function(b, c, d, e, f) {
  this.mCanvas = document.getElementById(b);
  this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = f || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  ss2d.View.CANVAS_CONTEXT = this.mContext;
  this.mCanvas.width = d || this.mCanvas.width;
  this.mCanvas.height = e || this.mCanvas.height;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = c || new ss2d.DisplayObjectContainer;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020"
};
ss2d.View.CANVAS_CONTEXT = null;
ss2d.View.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.View.prototype.nextFrame = function() {
  var b = (new Date).getTime(), c = b - this.mLastFrameTimestamp;
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.tick(c / 1E3);
  this.mInput.tick(c / 1E3);
  this.mContext.fillStyle = this.mBackgroundFillStyle;
  this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.render(this.mRenderSupport);
  this.mLastFrameTimestamp = b;
  b = ((new Date).getTime() - b) / 1E3;
  b = Math.max(0, 1 / this.mFrameRate - b);
  this.mRunning && setTimeout(ss2d.View.NEXT_FRAME_CALLER, 1E3 * b)
};
ss2d.View.prototype.startLoop = function() {
  !this.mRunning && null != this.mMainScene && (this.mRunning = !0, this.nextFrame())
};
ss2d.View.prototype.stopLoop = function() {
  this.mRunning = !1
};
ss2d.View.prototype.resizeCanvas = function() {
};
ss2d.DefaultConfig = {};
ss2d.DefaultConfig.FRAME_RATE = 60;
ss2d.DefaultConfig.CANVAS_WIDTH = 800;
ss2d.DefaultConfig.CANVAS_HEIGHT = 600;
ss2d.DefaultConfig.SERVER_HOST = "localhost";
ss2d.DefaultConfig.SERVER_PORT = 0;
ss2d.ServerView = function(b, c, d) {
  this.mRunning = !1;
  this.mFrameRate = d || 20;
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  this.mMainScene = b || new ss2d.DisplayObjectContainer;
  this.mMainScene.mParentView = this;
  this.mComunication = new ss2d.ServerCommunicationInterface(this, c);
  this.mSoundList = []
};
ss2d.ServerView.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.ServerView.prototype.nextFrame = function() {
  var b = (new Date).getTime();
  this.mMainScene.tick((b - this.mLastFrameTimestamp) / 1E3);
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

