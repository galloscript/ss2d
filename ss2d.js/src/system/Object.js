// Copyright (c) 2013 David Gallardo Moreno. All rights reserved.

/**
 * @fileoverview Object and Class utilities. This is NOT a base class for all Objects of ss2d
 * @author David Gallardo Moreno (portalg@gmail.com)
 */

goog.provide('ss2d.Object');

/** 
 * @class
 * @static 
 */
ss2d.Object = {};

/** @type {function(new:ss2d.DisplayObject)[]} */
ss2d.Object.CLASSES = [];

/** @type {number} */
ss2d.Object.OBJECT_COUNT = 0;

/** 
 * Assign a unique id to a class that inherits ss2d.DisplayObject
 * @param {function(new:ss2d.DisplayObject)} objClass 
 * @param {number} id
 */
ss2d.Object.assignClassId = function(objClass, id)
{
	objClass.prototype.CLASS_ID = id;
	ss2d.Object.CLASSES[id] = objClass;
};

/**
 * @param {{cid: number}} obj JSON parsed object
 * @return {function(new:ss2d.DisplayObject)} The class of the object.
 */
ss2d.Object.getObjectPrototype = function(obj)
{
	return ss2d.Object.CLASSES[obj['cid']];
}

ss2d.Object.convertStringToArrayBuffer = function(str)
{
	return ss2d.Object.LZWCompressor.compress(str);
};

ss2d.Object.convertArrayBufferToString = function(binaryArray)
{
	return ss2d.Object.LZWCompressor.decompress(binaryArray);
};

ss2d.Object.convertSceneObject = function(sceneObject)
{
	ss2d.Object.CLASSES[treeObject['cid']].convert(sceneObject);
	return sceneObject;
};

ss2d.Object.backupAndDeleteObjectProperties = function(obj)
{
	var objBackup = {};
	for(valueKey in obj)
	{
		objBackup[valueKey] = obj[valueKey];
		delete obj[valueKey];
	}
	
	return objBackup;
};

//LZW Compression/Decompression for Strings
//comp = LZW.compress("TOBEORNOTTOBEORTOBEORNOT"),
//decomp = LZW.decompress(comp);
//document.write(comp + '<br>' + decomp);

//** @class Compression for websocket packages. Not used yet. */
ss2d.Object.LZWCompressor = {
    compress: function (uncompressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = {},
            c,
            wc,
            w = "",
            result = [],
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[String.fromCharCode(i)] = i;
        }
 
        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed.charAt(i);
            wc = w + c;
            //Do not use dictionary[wc] because javascript arrays 
            //will return values for array['pop'], array['push'] etc
           // if (dictionary[wc]) {
            if (dictionary.hasOwnProperty(wc)) {
                w = wc;
            } else {
                result.push(dictionary[w]);
                // Add wc to the dictionary.
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }
 
        // Output the code for w.
        if (w !== "") {
            result.push(dictionary[w]);
        }
        return result;
    },
 
 
    decompress: function (compressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }
 
        w = String.fromCharCode(compressed[0]);
        result = w;
        for (i = 1; i < compressed.length; i += 1) {
            k = compressed[i];
            if (dictionary[k]) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }
 
            result += entry;
 
            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
        return result;
    }
}

    

