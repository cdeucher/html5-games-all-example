var myId=0;

var land;

var shadow;
var tank;
var turret;
var player;
var tanksList;
var explosions;

var logo;


var cursors;

var bullets;
var fireRate = 100;
var nextFire = 0;

var ready = false;
var eurecaServer;
//this function will handle client communication with the server
var eurecaClientSetup = function() {
	//create an instance of eureca.io client
	var eurecaClient = new Eureca.Client();
	
	eurecaClient.ready(function (proxy) {		
		eurecaServer = proxy;
	});
	eurecaClient.exports.update = function(conn){
      console.log(conn);
	}
}


Tank = function (index, game, player) {
    var x = 0;
    var y = 0;
    this.game = game;
    this.player = player;
    this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
    this.tank.id = index;

};

Tank.prototype.update = function() {	
	var inputChanged = (
		'gogog '
	);	
	eurecaServer.handleKeys(inputChanged);
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: eurecaClientSetup, update: update, render: render });

function preload () {
    game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');  
}
function create () {
    tanksList = {};
	
	player = new Tank(myId, game, tank);
	tanksList[myId] = player;
}
function update () {
	//do not update if client not ready
	if (!ready) return;
    
    for (var i in tanksList)
    {
		tanksList[i].update();
    }
}
function render () {}