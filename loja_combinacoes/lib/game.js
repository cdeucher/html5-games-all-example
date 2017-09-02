var game = new Ryan.Game(900, 600, Ryan.CANVAS, 'canvas-game', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('map', 'map/map.json', null, Ryan.Tilemap.TILED_JSON);
    game.load.spritesheet('bat', 'img/bat.png',64,64);
    game.load.spritesheet('mini','img/heads.png',64,64);
    game.load.spritesheet('marcas','img/marca.png',32,32);
    game.load.spritesheet('product','img/produtis.png',64,64);
    game.load.spritesheet('cli','img/cocotas.png',287,350);
}

var objs,tt1,tt2,tt3,tt4,perfu;
var cli,caminhos,cliGroup;
var cursors;
var counter = 0;
var nextCli = 15000;//time prox. cliente
var clientes = 2;

function create() {
  game.physics.startSystem(Ryan.Physics.ARCADE);
  //game.physics.startSystem(Phaser.Physics.P2JS);
  //game.physics.p2.restitution =1;
  game.world.setBounds(0, 0, 1280, 960);
  /*
  *   Map
  */
  map = game.add.tilemap('map');
  map.addTilesetImage('bat');
  layer = map.createLayer('fundo');
  layer.resizeWorld();
  /*
   *   Pontos
   */
  objs = game.add.group();
  objs.enableBody = true;
  map.createFromObjects('obj',227, 'marcas', 419, true, false, objs);
  /*
   *   Cli
   */
  //pontos de caminho
  caminhos = game.add.group();
  caminhos.enableBody = true;
  map.createFromObjects('ponto_partida',226, 'marcas', 419, true, false, caminhos);

  cli =[];
  cli.push(new Cli());
  /*
   *   Controles
   */
  tt1 = game.add.sprite(120, 500, 'bat',107);
  tt1.fixedToCamera = true;
  tt1.inputEnabled = true;
  tt1.events.onInputDown.add(leftImput, this);

  tt2 = game.add.sprite(220, 500, 'bat',110);
  tt2.fixedToCamera = true;
  tt2.inputEnabled = true;
  tt2.events.onInputDown.add(rigthImput, this);

  tt3 = game.add.sprite(20, 500, 'bat',110);
  tt3.fixedToCamera = true;
  tt3.inputEnabled = true;
  tt3.events.onInputDown.add(lixo, this);
  /*
   *   Bandeija
   */
  bb1 = game.add.sprite(64, 400, 'bat',107);
  bb1.fixedToCamera = true;
  bb1.enableBody = true;
  bb2 = game.add.sprite(128, 400, 'bat',110);
  bb2.fixedToCamera = true;
  bb1.enableBody = true;
  bb3 = game.add.sprite(64, 334, 'bat',107);
  bb3.fixedToCamera = true;
  bb3.enableBody = true;
  bb4 = game.add.sprite(128, 334, 'bat',110);
  bb4.fixedToCamera = true;
  bb4.enableBody = true;
  /*
   *   perfu
   */
  perfu = game.add.group();
  map.createFromObjects('perfu',257, 'product', (Math.floor(Math.random() * 5)), true, false, perfu);

  for (var i = 0; i < perfu.length; i++){
     perfu.getAt(i).frame = (Math.floor(Math.random() * 5));
     perfu.getAt(i).old_x = perfu.getAt(i).x;
     perfu.getAt(i).old_y = perfu.getAt(i).y;
     perfu.getAt(i).enableBody = true;
     perfu.physicsBodyType = Ryan.Physics.ARCADE;
     perfu.getAt(i).inputEnabled = true;
     perfu.getAt(i).input.enableDrag(true,false);
     perfu.getAt(i).events.onDragStart.add(perfuDragStart, this);
     perfu.getAt(i).events.onDragStop.add(perfuDragStop, this);
  }
  /*
   *   Timer
   */
    timer = game.time.create(false);
    timer.loop(nextCli, CliTimer, this);
    timer.start();
    timer1 = game.time.create(false);
    timer1.loop(1000, CliTimerFila, this);
    timer1.start();
  /*
   *   Text
   */
    text = game.add.text(150, 20, "-  oks", {
		font: "15px Arial",
		fill: "#fff",
		align: "center"
    });
  /*
   *   conf
   */
  game.camera.follow(objs.getAt(2));
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    for (var i in cli){
      if(cli[i].cli.alive){
        for (var j in cli){
          if(cli[j].cli.alive && (i != j)){ //faz veficar 1 x n  e evita que verifica ele x ele
                game.physics.arcade.overlap(cli[i].cli,cli[j].cli, function(r, s) {
                  tweenCompleted(cli[i].cli);
                });
                game.physics.arcade.overlap(cli[i].cli.button,cli[j].cli.button, function(r, s) {
                   tweenButton(cli[i].cli.button);
                });
          }
        }
        cli[i].update();
      }
    }

    if (cursors.left.isDown){
         objs.getAt(2).x -= 4;
    }else if (cursors.right.isDown){
         objs.getAt(2).x += 4;
    }
    if (cursors.up.isDown){
         objs.getAt(2).y -= 4;
    }else if (cursors.down.isDown){
         objs.getAt(2).y += 4;
    }
  /*
   *   Text
   */
   text.setText("" + counter + " - oks");
}

function render() {
    for (var i in cli){
      if(cli[i].cli.alive)
        cli[i].render();
    }
    game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(card, 32, 32);
    // game.debug.physicsBody(card.body);

}

function perfuDragStart(a,b){
}

function perfuDragStop(a,b){
    if((checkOverlap(a, bb1))||(checkOverlap(a, bb2))|(checkOverlap(a, bb3))|(checkOverlap(a, bb4))){
       a.reset(b.x,b.y);
       a.fixedToCamera = true;;
    }else{
       a.fixedToCamera = false;
       a.reset(a.old_x,a.old_y);
    }
       //a.cameraOffset.setTo(bb1.x, bb1.y);
}

function rigthImput(){
        objs.getAt(2).tween = game.add.tween(objs.getAt(2))
            .to({ x: objs.getAt(1).x, y: objs.getAt(1).y }, 3000, Ryan.Easing.Quadratic.InOut);
        objs.getAt(2).tween.start();
}
function leftImput(){
        objs.getAt(2).tween = game.add.tween(objs.getAt(2))
            .to({ x: objs.getAt(0).x, y: objs.getAt(0).y }, 3000, Ryan.Easing.Quadratic.InOut);
        objs.getAt(2).tween.start();
}
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Ryan.Rectangle.intersects(boundsA, boundsB);

}
