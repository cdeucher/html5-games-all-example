/*
*   LIBS
*/
var db        = require('./mongo');
var villa     = require('./oVilla');
var supplie   = require('./oSupplies');
var room      = require('./oRoom');
var player    = require('./oPlayer');

villa.clear(db);
supplie.clear(db);
room.clear(db);
player.clear(db);
