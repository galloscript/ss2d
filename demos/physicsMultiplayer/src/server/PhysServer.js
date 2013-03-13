goog.provide('phys.server');

goog.require('phys.Config');
goog.require('phys.World');
goog.require('ss2d.ServerView');

phys.server = new ss2d.ServerView(new phys.World(), phys.Config.SERVER_PORT, phys.Config.SERVER_FRAME_RATE);
phys.server.startLoop();
