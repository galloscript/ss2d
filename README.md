SmoothStep2D Framework
======================
-------------------------
Javascript 2D Game Framework

Author: David Gallardo Moreno <portalg@gmail.com>

License: The MIT License (MIT), read LICENSE.md file.

Main Page: http://galloman.github.com/ss2d/

Youtube channel: http://www.youtube.com/user/SmoothStep2D

Main Features
-------------

- Free and open source.

- Easy management of your scene tree, scene objects transformations and collision detection.

- Low level sound playback when available (webkit browsers only at this moment), if not it uses standard html5 audio api.

- Smart resource loader that led you preload all content before start running the game, keeping a reference to already loaded resources and giving the ability to implement custom loaders for any metadata + bindata format type.

- Compatible with some well known content creation tools like BMFont / GlyphDesigner for bitmap fonts and Texture Packer for texture atlas.

- Include a client / server communication interface based on node.js and websockets that brings the ability to implement real-time multiplayer online games.

- Realistic 2D physics with easy to use components that wraps box2d api.

- Compatible with window 8 for desktop apps and touchscreen input.

- Compatible with any mobile device that supports canvas 2d context in it’s web-browser (single finger touch at this moment).

- Develop simply including the ss2dLib.js in your html page or go advanced and compile it with google closure builder, getting all the needed pieces of the framework plus your game or application.in a single compressed, optimized and obfuscated javascript file, the framework include the needed configurable command-line tools.

Changelog
---------

30-03-2013<br>
Added partial WebGL compatibilty in a separate lib file ss2dLibWGL.js

28-03-2013<br>
Added partial support to Spine skeletal animations. See http://esotericsoftware.com/

17-03-2013<br>
Added Sprite Reels.

14-03-2013<br>
Lots of bug fixes since the last changelog update and a new demo source code added: physicsMultiplayer, a multiplayer world with 2d physics objects and free world transformation in client side, it means that every user can move and scale the world viewport and interact with succes with the scene elements.

23-02-2013<br>
Added Windows 8 touchscreen input, thanks to Gorkinovich contribution.

19-02-2013<br>
Now the mAlpha works properly. The mAlpha value is automatically applied to all childs of a container.

18-02-2013<br>
Added suppor for texture atlas generated with TexturePacker in JSON (hash) format. See http://www.codeandweb.com/texturepacker





