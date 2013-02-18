goog.provide('sand.server');

goog.require('sand.Config');
goog.require('sand.Game');
goog.require('ss2d.ServerView');

sand.server = new ss2d.ServerView(new sand.Game(), sand.Config.SERVER_PORT, sand.Config.SERVER_FRAME_RATE);
sand.server.startLoop();
