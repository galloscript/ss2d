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
ss2d.Defines = {};
var RENDER_CONTEXT = "2d", COMPILING_CLIENT = !1, COMPILING_SERVER = !0, COMPILING_OFFLINE = !1;
ss2d.Texture = function(a, b) {
  this.mName = a;
  this.mTextureElement = new Image;
  this.mTextureElement.mTexture = this;
  this.mTextureElement.mCallbackFunction = b || function() {
  };
  this.mTextureElement.onload = function() {
    this.mTexture.handleLoadedTexture()
  };
  this.mTextureElement.src = a
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
ss2d.IAudioComponent = function() {
};
ss2d.IAudioComponent.prototype.play = function() {
};
ss2d.IAudioComponent.prototype.pause = function() {
};
ss2d.IAudioComponent.prototype.stop = function() {
};
ss2d.WebAudio = function(a, b) {
  if(a) {
    this.mName = a;
    this.mCallbackFunction = b;
    this.mSoundSources = [];
    this.mPausedSource = this.mLastSource = this.mSoundBuffer = null;
    var c = new XMLHttpRequest;
    c.mSound = this;
    c.open("GET", a, !0);
    c.responseType = "arraybuffer";
    c.onload = function() {
      this.mSound.mSoundBuffer = ss2d.AUDIO_CONTEXT.createBuffer(this.response, !1);
      c.mSound.mCallbackFunction(this.mSound)
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
ss2d.HTML5Audio = function(a, b) {
  this.mName = a;
  this.mAudioElement = new Audio;
  this.mAudioElement.mSound = this;
  this.mAudioElement.preload = !0;
  (this.mAudioElement.mCallbackFunction = b) && this.mAudioElement.addEventListener("canplay", function() {
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
ss2d.ResourceLoader = {};
ss2d.ResourceLoader.LOADED_RESOURCES = {};
ss2d.ResourceLoader.ELEMENTS_TO_LOAD = 0;
ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD = 0;
ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = function() {
};
ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = function() {
};
ss2d.ResourceLoader.ACTIVE_LOADER = function(a) {
  console.debug("No active loader for: ", a)
};
ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS = ss2d.HTML5Audio;
if("undefined" != typeof webkitAudioContext || "undefined" != typeof AudioContext) {
  ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS = ss2d.WebAudio
}
ss2d.ResourceLoader.loadResources = function(a, b, c) {
  if(a instanceof Array) {
    ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = c || function() {
    };
    ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = b || function() {
    };
    b = ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD = 0;
    for(resKey in a) {
      "function" == typeof a[resKey] && ++b
    }
    ss2d.ResourceLoader.ELEMENTS_TO_LOAD = a.length - b;
    for(resKey in a) {
      b = a[resKey], "function" == typeof b ? ss2d.ResourceLoader.ACTIVE_LOADER = b : ss2d.ResourceLoader.ACTIVE_LOADER(b, ss2d.ResourceLoader.loadEndsCallback)
    }
    ss2d.ResourceLoader.ACTIVE_LOADER = function(a) {
      console.debug("No active loader for: ", a)
    }
  }
};
ss2d.ResourceLoader.loadTexture = function(a, b) {
  var c = ss2d.ResourceLoader.LOADED_RESOURCES;
  c[a + ".texture"] || (c[a + ".texture"] = new ss2d.Texture(a, b));
  return c[a + ".texture"]
};
ss2d.ResourceLoader.loadSound = function(a, b) {
  var c = ss2d.ResourceLoader.LOADED_RESOURCES;
  c[a + ".sound"] || (c[a + ".sound"] = new ss2d.ResourceLoader.AUDIO_COMPONENT_CLASS(a, b));
  return c[a + ".sound"]
};
ss2d.ResourceLoader.loadJSON = function() {
};
ss2d.ResourceLoader.loadXML = function() {
};
ss2d.ResourceLoader.loadEndsCallback = function(a) {
  ++ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD;
  ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK(a.mName, ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD, ss2d.ResourceLoader.ELEMENTS_TO_LOAD);
  ss2d.ResourceLoader.ELEMENTS_TO_LOAD == ss2d.ResourceLoader.CURRENT_ELEMENT_TO_LOAD && (console.log("Load resources ends"), ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK.call(), ss2d.ResourceLoader.ELEMENTS_LOADED_CALLBACK = function() {
  }, ss2d.ResourceLoader.ONE_ELEMENT_LOADED_CALLBACK = function() {
  })
};
ss2d.ResourceLoader.Types = {TEXTURE:ss2d.ResourceLoader.loadTexture, SOUND:ss2d.ResourceLoader.loadSound, JSON:ss2d.ResourceLoader.loadJSON, XML:ss2d.ResourceLoader.loadXML};
ss2d.ReelFrame = function(a, b, c, d, e, f, g) {
  this.mX = a;
  this.mY = b;
  this.mWidth = c;
  this.mHeight = d;
  this.mOffsetX = f || 0;
  this.mOffsetY = g || 0;
  this.mTexture = e instanceof ss2d.Texture ? e : ss2d.ResourceLoader.loadTexture(e)
};
ss2d.ReelFrame.prototype.dumpClip = function(a) {
  a = a || Array(4);
  a[0] = this.mX;
  a[1] = this.mY;
  a[2] = this.mWidth;
  a[3] = this.mHeight;
  return a
};
ss2d.Reel = function(a) {
  this.mFrames = [];
  this.mDuration = a
};
ss2d.Reel.prototype.getTimePerFrame = function() {
  return this.mFrames.length ? this.mDuration / this.mFrames.length : 0
};
ss2d.Color = function(a) {
  this.setValue(a)
};
ss2d.Color.prototype.setValue = function(a) {
  if(a instanceof ss2d.Color) {
    this.mColorArray = a.mColorArray.slice(0)
  }else {
    if(a instanceof Array && 2 < a.length) {
      this.mColorArray = a.slice(0)
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
ss2d.Color.prototype.getF32Array = function(a) {
  a = a || Array(3);
  a[0] = this.mColorArray[0] / 255;
  a[1] = this.mColorArray[1] / 255;
  a[2] = this.mColorArray[2] / 255;
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
ss2d.IAnimatable = function() {
  this.mTarget = null
};
ss2d.IAnimatable.prototype.advanceTime = function() {
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
ss2d.DelayedInvocation.prototype.advanceTime = function(a) {
  this.mComplete || (this.mPassedTime += a, this.mPassedTime >= this.mDelayTime && (this.mComplete = !0, this.performCalls(), delete this.mValues, delete this.mMethods))
};
ss2d.DelayedInvocation.prototype.isComplete = function() {
  return this.mComplete
};
ss2d.Juggler = function() {
  this.mObjects = [];
  this.mElapsedTime = 0
};
ss2d.Juggler.prototype.advanceTime = function(a) {
  this.mElapsedTime += seconds;
  for(var b = this.mObjects.slice(), c = 0;c < b.length;++c) {
    var d = b[c];
    d.advanceTime(a);
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
ss2d.Input = function(a) {
  this.mView = a;
  a = a.mCanvas;
  a.style.outline = "none";
  this.mView.mHaveFocus = !0;
  this.mMobileDevice = !1;
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
    this.mMobileDevice = !0
  }
  this.mMobileDevice || window.addEventListener("mousedown", ss2d.Input.windowMouseEventHandler, !0);
  window.addEventListener("keydown", ss2d.Input.handleEventCaller, !0);
  window.addEventListener("keyup", ss2d.Input.handleEventCaller, !0);
  a.addEventListener("mousedown", ss2d.Input.handleEventCaller, !0);
  a.addEventListener("mouseup", ss2d.Input.handleEventCaller, !0);
  a.addEventListener("mousemove", ss2d.Input.handleEventCaller, !0);
  a.addEventListener("touchstart", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchend", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchcancel", ss2d.Input.handleEventCaller, !1);
  a.addEventListener("touchleave", ss2d.Input.handleEventCaller, !1);
  this.mPressedKeys = {};
  this.mMouseY = this.mMouseX = -50;
  this.mPrevMouseY = this.mPrevMouseX = 0;
  this.mMouseDown = !1;
  this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
  this.mPrevMousePoint = new ss2d.Point(this.mPrevMouseX, this.mPrevMouseY);
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
  this.mPrevMouseX = this.mMouseX;
  this.mPrevMouseY = this.mMouseY;
  this.mPrevMousePoint.mX = this.mPrevMouseX;
  this.mPrevMousePoint.mY = this.mPrevMouseY;
  this.mPreviousMouseDown = this.mMouseDown;
  this.mMouseDown = this.mClicked
};
ss2d.Input.handleEventCaller = function(a) {
  ss2d.CURRENT_VIEW.mInput.handleEvent(a)
};
ss2d.Input.windowMouseEventHandler = function() {
  var a = ss2d.CURRENT_VIEW.mInput;
  if(a.mView.mHaveFocus) {
    a.onFocusOut()
  }
};
ss2d.Input.prototype.handleEvent = function(a) {
  var b = !0;
  switch(a.type) {
    case "mousedown":
    ;
    case "touchstart":
      b = this.onMouseDown(a);
      break;
    case "mouseup":
    ;
    case "touchend":
    ;
    case "touchcancel":
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
      b = this.onMouseMove(a)
  }
  return b
};
ss2d.Input.prototype.onMouseDown = function(a) {
  var b = this.mMobileDevice ? window.event.targetTouches[0] : a;
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
  var b = this.mMobileDevice ? window.event.targetTouches[0] : a;
  if(this.mMobileDevice && !b || !this.mMobileDevice) {
    this.mClicked = this.mMouseDown = !1, a.preventDefault(), a.stopPropagation(), this.mView.mCanvas.removeEventListener("touchmove", ss2d.Input.handleEventCaller, !1)
  }
  return!1
};
ss2d.Input.prototype.onKeyDown = function(a) {
  return this.mView.mHaveFocus ? (this.mPressedKeys["_" + parseInt(a.keyCode)] = !0, (37 == a.keyCode || 38 == a.keyCode || 39 == a.keyCode || 40 == a.keyCode || 32 == a.keyCode) && a.preventDefault(), !1) : !0
};
ss2d.Input.prototype.onKeyUp = function(a) {
  return this.mView.mHaveFocus ? (this.mPressedKeys["_" + parseInt(a.keyCode)] = !1, delete this.mPressedKeys["_" + parseInt(a.keyCode)], !1) : !0
};
ss2d.Input.prototype.onFocusIn = function() {
  this.mView.mHaveFocus = !0
};
ss2d.Input.prototype.onFocusOut = function() {
  this.mClicked = this.mView.mHaveFocus = !1
};
ss2d.Input.prototype.onMouseMove = function(a) {
  if(a = this.mMobileDevice ? window.event.targetTouches[0] : a) {
    this.mMouseX = a.offsetX || a.pageX - this.mView.mCanvas.offsetLeft, this.mMouseY = a.offsetY || a.pageY - this.mView.mCanvas.offsetTop, this.mMousePoint.mX = this.mMouseX, this.mMousePoint.mY = this.mMouseY
  }
};
ss2d.Input.prototype.isKeyPressed = function(a) {
  return null != this.mPressedKeys["_" + a] ? !0 : !1
};
ss2d.Input.prototype.toJSON = function() {
  var a;
  a = "{" + ('"keys":' + JSON.stringify(this.mPressedKeys) + ",");
  a += '"mx":' + this.mMouseX + ",";
  a += '"my":' + this.mMouseY + ",";
  a += '"md":' + this.mMouseDown;
  return a + "}"
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
  return!(a.mX <= this.mX && a.mX + a.mWidth <= this.mX) || a.mX >= this.mX + this.mWidth && rX + a.mWidth >= this.mX + this.mWidth || a.mY <= this.mY && a.mY + a.mHeight <= this.mY || a.mY >= this.mY + this.mHeight && a.mY + a.mHeight >= this.mY + this.mHeight
};
ss2d.Rectangle.prototype.intersectionWithRectangle = function(a, b) {
  if(!a) {
    return null
  }
  b || (b = new ss2d.Rectangle(0, 0, 0, 0));
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
ss2d.Point = function(a, b) {
  this.mX = a;
  this.mY = b
};
ss2d.Point.prototype.set = function(a, b) {
  this.mX = a;
  this.mY = b
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
ss2d.Matrix3 = function() {
  this.mA = 1;
  this.mC = this.mB = 0;
  this.mD = 1;
  this.mTy = this.mTx = 0;
  this.mMatF32Array = Array(9)
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
  b.setValues(-Math.cos(a), -Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0);
  this.concatMatrix(b);
  delete b;
  return this
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
  this.mPicked = !1;
  this.mOffsetY = this.mOffsetX = 0;
  this.mColor = e instanceof ss2d.Color ? e : new ss2d.Color(e || 16777215);
  this.mAlpha = f || 1;
  this.mObjectId = ss2d.Object.OBJECT_COUNT++;
  COMPILING_SERVER && (this.mSoundList = [])
};
ss2d.Object.assignClassId(ss2d.DisplayObject, 1001);
ss2d.DisplayObject.prototype.getTransformationMatrix = function(a) {
  a = a || new ss2d.Matrix3;
  (0 != this.mPivotX || 0 != this.mPivotY) && a.translate(-this.mPivotX, -this.mPivotY);
  (0 != this.mOffsetX || 0 != this.mOffsetY) && a.translate(-this.mOffsetX, -this.mOffsetY);
  (1 != this.mScaleX || 1 != this.mScaleY) && a.scale(this.mScaleX, this.mScaleY);
  0 != this.mRotation && a.rotate(this.mRotation);
  (0 != this.mLocation.mX || 0 != this.mLocation.mY) && a.translate(this.mLocation.mX, this.mLocation.mY);
  return a
};
ss2d.DisplayObject.prototype.getWorldTransformationMatrix = function() {
  for(var a = [], b = this;b.mParent;) {
    a.unshift(b.mParent), b = b.mParent
  }
  var b = new ss2d.Matrix3, c = new ss2d.Matrix3;
  for(matIndex in a) {
    c.identity(), a[matIndex].getTransformationMatrix(c), b.concatMatrix(c)
  }
  return b
};
ss2d.DisplayObject.prototype.worldToLocal = function(a) {
  a = this.getWorldTransformationMatrix().invert().transformPoint(a);
  delete worldMatrix;
  return a
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
  this.mOffsetX = a.ox || this.mOffsetX;
  this.mOffsetY = a.oy || this.mOffsetY;
  this.mColor = new ss2d.Color(a.c) || this.mColor;
  this.mAlpha = a.a || this.mAlpha
}, ss2d.DisplayObject.createFromSerializedObject = function(a) {
  var b = new ss2d.DisplayObject(a.x, a.y, a.s, a.r, a.c);
  b.mObjectId = a.doid;
  return b
}, ss2d.DisplayObject.prototype.interpolateState = function(a, b, c, d) {
  this.mLocation.mX = a.x + (b.x - a.x) * c;
  this.mLocation.mY = a.y + (b.y - a.y) * c;
  this.mRotation = a.r + (b.r - a.r) * c;
  this.mPivotX = a.px + (b.px - a.px) * c;
  this.mPivotY = a.py + (b.py - a.py) * c;
  this.mScaleX = a.sx + (b.sx - a.sx) * c;
  this.mScaleY = a.sy + (b.sy - a.sy) * c;
  this.mOffsetX = a.ox + (b.ox - a.ox) * c;
  this.mOffsetY = a.oy + (b.oy - a.oy) * c;
  var e = ss2d.Color.interpolate(a.c, b.c, c).getRGBArray();
  this.mColor.setRGB(e[0], e[1], e[2]);
  this.mAlpha = a.a + (b.a - a.a) * c;
  this.playSoundList(a);
  this.tick && this.tick(d)
}, ss2d.DisplayObject.prototype.playSoundList = function(a) {
  var b = a.snds;
  if(null != b) {
    for(var c in b) {
      b = a.snds[childIndex];
      try {
        ss2d.ResourceLoader.loadSound(b).play()
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
  a += '"ox":' + this.mOffsetX + ",";
  a += '"oy":' + this.mOffsetY + ",";
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
  this.mWidth = c || 10;
  this.mHeight = d || 10
};
goog.inherits(ss2d.Quad, ss2d.DisplayObject);
ss2d.Object.assignClassId(ss2d.Quad, 1003);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Quad.prototype.render = function(a) {
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
  return new ss2d.Rectangle(this.mLocation.mX, this.mLocation.mY, this.getWidth(), this.getHeight())
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
  this.mWidth = a.w + (b.w - a.w) * c;
  this.mHeight = a.h + (b.h - a.h) * c
});
COMPILING_SERVER && (ss2d.Quad.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Quad.prototype.getPropertiesJSON = function() {
  var a = ss2d.DisplayObject.prototype.getPropertiesJSON.call(this) + ",", a = a + ('"w": ' + this.mWidth + ",");
  return a += '"h": ' + this.mHeight
});
ss2d.Sprite = function(a, b, c, d, e, f) {
  ss2d.Quad.call(this, a, b, c, d, f);
  if(COMPILING_CLIENT || COMPILING_OFFLINE) {
    "string" == typeof e && (e = ss2d.ResourceLoader.loadTexture(e))
  }
  this.mTexture = e || null;
  this.mClip = []
};
goog.inherits(ss2d.Sprite, ss2d.Quad);
ss2d.Object.assignClassId(ss2d.Sprite, 1004);
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.Sprite.prototype.render = function(a) {
    a.pushTransform(this);
    var b = a.mContext;
    4 == this.mClip.length ? b.drawImage(this.mTexture.mTextureElement, this.mClip[0], this.mClip[1], this.mClip[2], this.mClip[3], 0, 0, this.mWidth, this.mHeight) : b.drawImage(this.mTexture.mTextureElement, 0, 0, this.mWidth, this.mHeight);
    a.popTransform()
  }
}
ss2d.Sprite.prototype.setWidth = function(a, b) {
  this.mWidth = a;
  b || (this.mClip[2] = a)
};
ss2d.Sprite.prototype.setHeight = function(a, b) {
  this.mHeight = a;
  b || (this.mClip[3] = a)
};
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
  this.mTexture = this.mTexture || ss2d.ResourceLoader.loadTexture(a.t);
  this.mClip = a.clip || null
}, ss2d.Sprite.createFromSerializedObject = function(a) {
  var b = new ss2d.Sprite(a.x, a.y, a.w, a.h, a.t, a.c);
  b.mObjectId = a.doid;
  return b
}, ss2d.Sprite.prototype.interpolateState = function(a, b, c) {
  ss2d.Quad.prototype.interpolateState.call(this, a, b, c, deltaTime);
  this.mTexture = a.t && a.t != this.mTexture.mName ? ss2d.ResourceLoader.loadTexture(a.t) : this.mTexture;
  this.mClip = a.clip || this.mClip
});
COMPILING_SERVER && (ss2d.Sprite.prototype.toJSON = function() {
  return"{" + this.getPropertiesJSON() + "}"
}, ss2d.Sprite.prototype.getPropertiesJSON = function(a) {
  var b = ss2d.Quad.prototype.getPropertiesJSON.call(this);
  a && (b += ',"t": "' + this.mTexture.mName + '"');
  this.mClip && (b += ',"clip": ' + JSON.stringify(this.mClip));
  this.mPrevSerializedTexture = this.mTexture.mName;
  return b
});
ss2d.RenderSupport = function(a) {
  this.mContext = a;
  this.mAuxMatrix = new ss2d.Matrix3;
  "webgl" == RENDER_CONTEXT && (this.mMatrixStack = [], this.mCurrentMatrix = new ss2d.Matrix3)
};
ss2d.RenderSupport.prototype.pushTransform = function() {
};
ss2d.RenderSupport.prototype.pushTransform = "webgl" == RENDER_CONTEXT ? function(a) {
  this.mAuxMatrix.identity();
  a = a.getTransformationMatrix(this.mAuxMatrix);
  this.mMatrixStack.push(a);
  this.mCurrentMatrix = this.mCurrentMatrix.concatMatrix(a)
} : function(a) {
  this.mAuxMatrix.identity();
  a = a.getTransformationMatrix(this.mAuxMatrix);
  this.mContext.save();
  this.mContext.transform(a.mA, a.mB, a.mC, a.mD, a.mTx, a.mTy)
};
ss2d.RenderSupport.prototype.popTransform = function() {
};
ss2d.RenderSupport.prototype.popTransform = "webgl" == RENDER_CONTEXT ? function() {
  0 < this.mMatrixStack.length && this.mCurrentMatrix.concatMatrix(this.mMatrixStack.pop().invert())
} : function() {
  this.mContext.restore()
};
ss2d.ReelSet = function(a, b) {
  this.mCallbackFunction = b;
  this.mReels = a ? this.loadFromFile(a) : {}
};
ss2d.ReelSet.prototype.loadFromFile = function() {
  this.mCallbackFunction.call(this);
  return{}
};
ss2d.ReelSprite = function(a, b, c, d, e) {
  ss2d.Quad.call(this, a, b, c, d);
  if(!e) {
    throw"Trying to create a sprite reel without a SpriteReelDescriptor";
  }
  this.mDescriptor = e;
  this.mFirstFrame = this.mDescriptor.mFrames[0];
  this.mLoop = !0;
  this.mTimeDilation = 1;
  this.mTexture = this.mFirstFrame.mTexture;
  this.mClip = this.mFirstFrame.copyClip(Array(4));
  this.mPlaying = !0;
  this.mComplete = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0
};
goog.inherits(ss2d.ReelSprite, ss2d.Sprite);
ss2d.Object.assignClassId(ss2d.ReelSprite, 1005);
ss2d.ReelSprite.prototype.playAnimation = function(a) {
  this.mDescriptor = a || this.mDescriptor;
  this.mPlaying = !0;
  this.mComplete = !1;
  this.mElapsedTimeCurrentFrame = this.mFrameCount = 0
};
ss2d.ReelSprite.prototype.pauseAnimation = function() {
  this.mPlaying = !1
};
if(COMPILING_CLIENT || COMPILING_OFFLINE) {
  ss2d.ReelSprite.prototype.tick = function(a) {
    if(this.mPlaying) {
      var b = this.mDescriptor.getTimePerFrame() * this.mTimeDilation;
      this.mElapsedTimeCurrentFrame += a;
      this.mElapsedTimeCurrentFrame >= b && (this.mFrameCount++, this.mElapsedTimeCurrentFrame -= b, this.mFrameCount >= this.mDescriptor.mFrames.length && (this.mLoop ? this.mFrameCount = 0 : (this.mFrameCount--, this.mComplete = !0)), a = this.mDescriptor.mFrames[this.mFrameCount], a.dumpClip(this.mClip), this.mTexture = a.mTexture, this.mOffsetX = a.mOffsetX, this.mOffsetY = a.mOffsetY)
    }
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
ss2d.DisplayObjectContainer.prototype.hitTestPoint = function(a) {
  var b = null, c;
  for(c in this.mChildren) {
    b = this.mChildren[c].hitTestPoint(a) || b
  }
  return b
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
  ss2d.DisplayObjectContainer.prototype.interpolateState.call(this, a, b, c, d, !0)
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
  this.mDelay = this.mCurrentTime = 0;
  d && (this.mDelay = d);
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
ss2d.Tween.prototype.fadeTo = function(a) {
  this.animateProperty(this.mTarget.getAlpha, this.mTarget.setAlpha, a)
};
ss2d.Tween.prototype.advanceTime = function(a) {
  if(!(0 == a || this.mLoop == ss2d.Tween.LoopTypeNone && this.mCurrentTime >= this.mTotalTime)) {
    this.mCurrentTime >= this.mTotalTime && (this.mCurrentTime = 0, this.mLoopCount++);
    var b = this.mCurrentTime, c = this.mTotalTime - this.mCurrentTime, c = a > c ? a - c : 0;
    this.mCurrentTime = Math.min(this.mTotalTime, this.mCurrentTime + a);
    if(!(0 >= this.mCurrentTime)) {
      a = this.mCurrentTime / this.mTotalTime;
      for(var d = this.mLoop == ss2d.Tween.LoopTypeReverse && 1 == this.mLoopCount % 2, e = 0;e < this.mProperties.length;++e) {
        var f = this.mProperties[e];
        0 >= b && 0 < this.mCurrentTime && (f.mStartValue = f.currentValue());
        var g = d ? 1 - this.mTransitionMethod(1 - a) : this.mTransitionMethod(a);
        f.setCurrentValue(f.mStartValue + f.delta() * g)
      }
      if(b < this.mTotalTime && this.mCurrentTime >= this.mTotalTime) {
        if(this.mLoop == ss2d.Tween.LoopTypeRepeat) {
          for(e = 0;e < this.mProperties.length;++e) {
            f = this.mProperties[e], f.setCurrentValue(f.mStartValue)
          }
        }else {
          if(this.mLoop == ss2d.Tween.LoopTypeReverse) {
            for(e = 0;e < this.mProperties.length;++e) {
              f = this.mProperties[e], f.setCurrentValue(f.mEndValue), f.mEndValue = f.mStartValue
            }
          }
        }
      }
      this.advanceTime(c)
    }
  }
};
ss2d.Tween.prototype.isComplete = function() {
  return this.mCurrentTime >= this.mTotalTime && this.mLoop == ss2d.Tween.LoopTypeNone
};
ss2d.Tween.prototype.setDelay = function(a) {
  this.mCurrentTime = this.mCurrentTime + this.mDelay - a;
  this.mDelay = a
};
ss2d.InputProxy = function() {
  this.mPressedKeys = {};
  this.mMouseY = this.mMouseX = -50;
  this.mPrevMouseY = this.mPrevMouseX = 0;
  this.mMousePoint = new ss2d.Point(this.mMouseX, this.mMouseY);
  this.mPrevMousePoint = new ss2d.Point(this.mPrevMouseX, this.mPrevMouseY);
  this.mPreviousMouseDown = this.mMouseDown = !1
};
ss2d.InputProxy.prototype.updateFromClient = function(a) {
  this.mPrevMouseX = this.mMouseX;
  this.mPrevMouseY = this.mMouseY;
  this.mPrevMousePoint.mX = this.mPrevMouseX;
  this.mPrevMousePoint.mY = this.mPrevMouseY;
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
    this.mInterface.mUserConnections.length >= this.mInterface.mUserLimit ? (console.log("user rejected"), a.send('["REJECTED","Too many players connected."]'), a.close()) : (this.mInterface.mUserConnections.push(a), a.mUserName = "", a.mServer = this, a.mInput = new ss2d.InputProxy, a.mConnectionId = ss2d.ServerCommunicationInterface.CONNECTIONS_COUNT++, this.mInterface.mServerView.mMainScene.onUserConnect(a), a.on("message", function(a) {
      a = JSON.parse(a.utf8Data);
      this.mServer.mInterface.processClientCommand(a, this)
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
ss2d.ClientView = function(a, b, c, d, e, f) {
  this.mCanvas = document.getElementById(a);
  this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = d || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  this.mCanvas.width = b || 800;
  this.mCanvas.height = c || 600;
  ss2d.CURRENT_VIEW = this;
  ss2d.ClientView.CANVAS_CONTEXT = this.mContext;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = null;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020";
  this.mSceneQueue = [];
  this.mComunication = null;
  this.mDelay = f || 100;
  this.mInputRate = e || 20;
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
  var a = (new Date).getTime(), b = a - this.mLastFrameTimestamp;
  1 < this.mSceneQueue.length && (this.updateSceneState(a), this.mContext.fillStyle = this.mBackgroundFillStyle, this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height), null != this.mMainScene && this.mMainScene.render(this.mRenderSupport));
  this.mInput.tick(b / 1E3);
  this.mLastFrameTimestamp = a;
  a = ((new Date).getTime() - a) / 1E3;
  a = Math.max(0, 1 / this.mFrameRate - a);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_FRAME_CALLER, 1E3 * a)
};
ss2d.ClientView.prototype.nextInputUpdate = function() {
  this.mComunication.packAndSendInput(this.mInput);
  this.mRunning && setTimeout(ss2d.ClientView.NEXT_INPUT_UPDATE_CALLER, 1E3 * (1 / this.mInputRate))
};
ss2d.ClientView.prototype.updateSceneState = function(a) {
  a -= this.mDelay;
  for(var b = -1, c = -1, d = 0;d < this.mSceneQueue.length && -1 == c;d++) {
    var e = this.mSceneQueue[d][0], f = this.mSceneQueue[d][1];
    e < a && (b = d, null != f.PLAYSOUNDS && (f.PLAYSOUNDS = null, delete f.PLAYSOUNDS));
    e >= a && (c = d)
  }
  if(-1 != b && -1 != c) {
    for(d = 0;d < b;++d) {
      this.interpolateSeceneStates(d, b, a)
    }
    this.interpolateSeceneStates(b, c, a)
  }
  this.mSceneQueue.splice(0, b)
};
ss2d.ClientView.prototype.interpolateSeceneStates = function(a, b, c) {
  var d = this.mSceneQueue[a][0];
  c = (c - d) / (this.mSceneQueue[b][0] - d);
  null == this.mMainScene && (this.mMainScene = ss2d.Object.getObjectPrototype(this.mSceneQueue[a][1]).createFromSerializedObject(this.mSceneQueue[a][1]), console.debug("main scene created"));
  this.mMainScene.interpolateState(this.mSceneQueue[a][1], this.mSceneQueue[b][1], c)
};
ss2d.ClientView.prototype.startLoop = function() {
  !this.mRunning && null != this.mComunication && (this.mRunning = !0, this.nextFrame(), this.nextInputUpdate())
};
ss2d.ClientView.prototype.stopLoop = function() {
  this.mRunning = !1
};
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
ss2d.View = function(a, b, c, d, e) {
  this.mCanvas = document.getElementById(a);
  this.mContext = this.mCanvas.getContext("2d");
  this.mRunning = !1;
  this.mFrameRate = e || 60;
  this.mInput = new ss2d.Input(this);
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  ss2d.View.CANVAS_CONTEXT = this.mContext;
  this.mCanvas.width = c || 800;
  this.mCanvas.height = d || 600;
  ss2d.AUDIO_CONTEXT = ss2d.WebAudio.getAudioContext();
  this.mMainScene = b || new ss2d.DisplayObjectContainer;
  this.mRenderSupport = new ss2d.RenderSupport(this.mContext);
  this.mBackgroundFillStyle = "#202020"
};
ss2d.View.CANVAS_CONTEXT = null;
ss2d.View.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.View.prototype.nextFrame = function() {
  var a = (new Date).getTime(), b = a - this.mLastFrameTimestamp;
  this.resizeCanvas(this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.tick(b / 1E3);
  this.mInput.tick(b / 1E3);
  this.mContext.fillStyle = this.mBackgroundFillStyle;
  this.mContext.fillRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  this.mMainScene.render(this.mRenderSupport);
  this.mLastFrameTimestamp = a;
  a = ((new Date).getTime() - a) / 1E3;
  a = Math.max(0, 1 / this.mFrameRate - a);
  this.mRunning && setTimeout(ss2d.View.NEXT_FRAME_CALLER, 1E3 * a)
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
ss2d.ServerView = function(a, b, c) {
  this.mRunning = !1;
  this.mFrameRate = c || 20;
  this.mLastFrameTimestamp = (new Date).getTime();
  ss2d.CURRENT_VIEW = this;
  this.mMainScene = a;
  this.mMainScene.mParentView = this;
  this.mComunication = new ss2d.ServerCommunicationInterface(this, b);
  this.mSoundList = []
};
ss2d.ServerView.NEXT_FRAME_CALLER = function() {
  ss2d.CURRENT_VIEW.nextFrame()
};
ss2d.ServerView.prototype.nextFrame = function() {
  var a = (new Date).getTime();
  this.mMainScene.tick((a - this.mLastFrameTimestamp) / 1E3);
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
