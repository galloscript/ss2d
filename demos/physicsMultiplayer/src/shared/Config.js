//
// this is a special namespace used to change some "compiler" features
//
//

goog.provide('phys.Config');

goog.require('ss2d.DefaultConfig');

phys.Config = ss2d.DefaultConfig;

//canvas
/** @define {number} */
phys.Config.CLIENT_FRAME_RATE = 60.0;

phys.Config.SERVER_FRAME_RATE = 35.0;

/** @define {number} */
//phys.Config.CANVAS_WIDTH = 768; //640

/** @define {number} */
//phys.Config.CANVAS_HEIGHT = 432; //360

//networking
/** @define {string} */
phys.Config.SERVER_HOST = 'niutek.net';

/** @define {string} */
//phys.Config.SERVER_HOST = '127.0.0.1';

/** @define {number} */
phys.Config.SERVER_PORT = 51000;



