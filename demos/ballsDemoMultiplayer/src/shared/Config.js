//
// this is a special namespace used to change some "compiler" features
//
//

goog.provide('sand.Config');

goog.require('ss2d.DefaultConfig');

sand.Config = ss2d.DefaultConfig;

//canvas
/** @define {number} */
sand.Config.CLIENT_FRAME_RATE = 60.0;

sand.Config.SERVER_FRAME_RATE = 20.0;

/** @define {number} */
sand.Config.CANVAS_WIDTH = 768; //640

/** @define {number} */
sand.Config.CANVAS_HEIGHT = 432; //360

//networking
/** @define {string} */
sand.Config.SERVER_HOST = 'niutek.net';

/** @define {string} */
//sand.Config.SERVER_HOST = '127.0.0.1';

/** @define {number} */
sand.Config.SERVER_PORT = 51137;



