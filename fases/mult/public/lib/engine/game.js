width = (window.innerWidth >= 1200) ? 1360 : 900;
height = (window.innerWidth >= 1200) ? 760 : 480;
var game = new Phryan.Game(width,height, Phryan.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
game.myWidth  = width;
game.myHeight = height;
var skill = undefined;
var debug = false;
var ready = false;

function connect_game(){
    //soldiers
    game.load.image('arrow',   'img/enemy/arrow.png');
    game.load.atlas('soldier', 'img/ryu/ryu.gif',         'map/soldier.json');
    game.load.atlas('sir',     'img/ryu/ryu2.gif',        'map/sir.json');
    game.load.atlas('knight',  'img/enemy/knight.png',    'map/k.json');
    game.load.atlas('boss',    'img/enemy/boss.png',      'map/boss.json');
    game.load.atlas('enemy',   'img/enemy/enemy.png',     'map/enemy.json');
    game.load.atlas('dragon',  'img/enemy/reddragon.png', 'map/dragon.json');
    game.load.atlas('archer',   'img/enemy/archer.png',     'map/archer.json');
    //maps
    game.load.tilemap('map', 'map/street5.json', null, Phryan.Tilemap.TILED_JSON);
    game.load.image('chao', 'img/hyptosis_tile-art-batch-1.png');
    game.load.spritesheet('bat', 'img/bat.png',64,64);
    //villa
    game.load.atlas('villa_orda',  'img/home/villa_orda.png', 'map/villa_orda.json');
    game.load.atlas('villa_human',  'img/home/zz.png', 'map/villa_human.json');
    game.load.image('supplie_forte', 'img/home/supplie_forte.png');
    game.load.image('supplie_eforte', 'img/home/supplie_eforte.png');
    game.load.image('villa_supplie', 'img/home/supplie.png');
    //icons
    game.load.atlas('battle',  'img/icons/battle.png', 'map/battle.json');
    game.load.atlas('mini',  'img/cards/mini.png',   'map/mini.json');
    game.load.start();
}
function preload() {
  // do it stay screen fixed in the center
  //this.scale.pageAlignHorizontally = true;
}
function create() {
   game.load.onLoadStart.add(loadStart, this);
   game.load.onFileComplete.add(fileComplete, this);
   game.load.onLoadComplete.add(loadComplete, this);
   game.scale.fullScreenScaleMode = Phryan.ScaleManager.EXACT_FIT;
   //
   connect_game();
}
function main(){
  //game.physics.startSystem(Phryan.Physics.P2JS);
  game.physics.startSystem(Phryan.Physics.ARCADE);
  game.world.setBounds(0, 0, 2880, 1600);
  //game.scale.refresh();
  /*
  *   Map
  */
  map = game.add.tilemap('map');
  map.addTilesetImage('chao');
  layer = map.createLayer('chao');
  layer.resizeWorld();
  // -
  supplies = game.add.group();
  map.createFromObjects('supplie', 197, 'villa_supplie', 0, true, false, supplies);
  for(i = 0; i < supplies.length; i++){
      supplies.getAt(i).inputEnabled = true;
      supplies.getAt(i).events.onInputDown.add(Supplies_imput, this);
  }
  /*
   *  layer
   */
   spritesLayer = game.add.group();
   spritesLayer.z = 2;

   romanos.create();
  /*
   *   conf
   */
   cursors = game.input.keyboard.createCursorKeys();
   game.input.onDown.add(movex, this);

   rastro = map.createLayer('rastro');
   rastro.resizeWorld();
   /*
    * Timers
   */
   game.time.advancedTiming = true;
   game.time.events.loop(1000,timer,this);
   ready = true;
}
function timer(){ // 1 em 1 seg.
  if(isReady()){
    romanos.update(socket,supplie);
    supplie.update();
  }
}
function update() {  //sempre
  if(isReady()){
     romanos.check_collision();
     touch();
     mini.update(romanos.get_centuria());
     letter.set('fps',game.time.fps);
     letter.set('latency',st.latency);
     letter.update();
 }
}

function render() {
  if(isReady()){
     romanos.render();
     mini.render();
     //game.debug.cameraInfo(game.camera, 500, 32);
  }
}
function isObject(val) {
    return (typeof val === 'object');
}
function isReady() {
  return (ready) ? true : false;
}
function  goclick(author,a,b){
  if(isReady()){
    basex = game.input.activePointer.worldX;
    basey = game.input.activePointer.worldY;
   if(letter.get('people') >= 5){
     x = game.rnd.integerInRange(25, 150);
     y = game.rnd.integerInRange(1, 100);
     type = (a.index == undefined)? 2 : a.index;
     //ryan
     base = (letter.get('side') == 1)?{x:basex+x,y:basey}:{x:basex-x,y:basey};
     cont = 0; cent = romanos.get_centuria();
     for(i in cent)
       if(cent[i].cap == undefined && cent[i].alive)
         cont++;
     if(cont <= 10) //max number of groups
       romanos.add({x:basex,y:basey,type:type,dono:userx,base:base});
     else
       letter.create({name:'warn',x:(game.camera.width / 2), y:(game.camera.height / 2),msg:'Limit people.',sec:100});
   }else{
       letter.create({name:'warn',x:(game.camera.width / 2), y:(game.camera.height / 2),msg:'You need more people',sec:100});
   }
 }
}
function supplieclick(a,b,c){
  if(isReady()){
    all = romanos.get_centuria();
    cont =0;
   for(i in all){
    if(all[i].alive == true){
      if (game.physics.arcade.distanceBetween(a, all[i].soldier) < 150){
        cont++;
        //  supplie.start({author:a,menu:b,supplie:c});
        supplie.start({x:a.x,y:a.y,dono:userx,room:rooms});
      }
    }
  }
  if(cont == 0) letter.create({name:'warn',x:(game.camera.width / 2), y:(game.camera.height / 2),msg:'No troops here to conquer the villas',sec:100});
 }
}
var Supplies_imput = function(a,b){
 if(isReady()){
  if(!domo.getActivate()){
     x = game.input.activePointer.worldX;
     y = game.input.activePointer.worldY;
     domo.create({x:x,y:y,index:0});
     domo.setAction(supplieclick,a);
     domo.setActivate();
  }
 }
}
var villa_imput = function(a,b){
  if(isReady()){
  if(!domo.getActivate()){
     x = game.input.activePointer.worldX;
     y = game.input.activePointer.worldY;
     if(letter.get('side') == 1){
       domo.create({x:x,y:y,index:0})
           .create({x:x+90,y:y,index:1})
           .create({x:x,y:y+90, index:4})
           .create({x:x+90,y:y+90,index:2});
     }else{
       domo.create({x:x,y:y,index:0})
           .create({x:x+90,y:y,index:1})
           .create({x:x,y:y+90, index:4})
           .create({x:x+90,y:y+90,index:2});
     }
     domo.setAction(goclick,a);
     domo.setActivate();
  }
 }
}
var getSkill = function(author,a,b){ //soldier under click
   if(a.index == 5)
     skill = author;
   else if(a.index == 0)
     romanos.restart(author);
   else if(a.index == 3)
     romanos.stop(author);
   else
     romanos.restart(author);
}
function movex(a,b){  // click map
    if(skill != undefined){  //if skill move of soldier is activated ..  then to go
      romanos.to_go(skill,{x:game.input.activePointer.worldX,y:game.input.activePointer.worldY});
      skill = undefined;
    }
}
function touch(){
  click = letter.get('click');
  if (cursors.left.isDown || click == 'left'){
      game.camera.x -= 8;
  }else if (cursors.right.isDown || click == 'right'){
      game.camera.x += 8;
  }else if (cursors.up.isDown || click == 'up'){
      game.camera.y -= 8;
  }else if (cursors.down.isDown || click == 'down'){
      game.camera.y += 8;
  }
}
function bootx(){
      boot = new Boot(rooms);
    try{
      boot.logout();
    }catch(e){}
      boot.login();
}
function create_controll(){
  /*
   *   Controles
   */
  letter.create({name:'click',msg:''});
  //left
  tt1 = game.add.sprite(0, 400, 'bat',107);
  tt1.fixedToCamera = true;
  tt1.inputEnabled = true;
  tt1.events.onInputDown.add(function(){ letter.set('click','left'); }, this);
  tt1.events.onInputUp.add(function(){ letter.set('click',''); }, this);
  tt1.bringToTop();
  //rigth
  tt2 = game.add.sprite(200, 400, 'bat',110);
  tt2.fixedToCamera = true;
  tt2.inputEnabled = true;
  tt2.events.onInputDown.add(function(){ letter.set('click','right'); }, this);
  tt2.events.onInputUp.add(function(){ letter.set('click',''); }, this);
  tt2.bringToTop();
  //up
  tt3 = game.add.sprite(100, 330, 'bat',107);
  tt3.fixedToCamera = true;
  tt3.inputEnabled = true;
  tt3.events.onInputDown.add(function(){ letter.set('click','up'); }, this);
  tt3.events.onInputUp.add(function(){ letter.set('click',''); }, this);
  tt3.bringToTop();
  //down
  tt4 = game.add.sprite(100, 400, 'bat',110);
  tt4.fixedToCamera = true;
  tt4.inputEnabled = true;
  tt4.events.onInputDown.add(function(){ letter.set('click','down'); }, this);
  tt4.events.onInputUp.add(function(){ letter.set('click',''); }, this);
  tt4.bringToTop();
}
function rooms(docs){
    ar = new Object();
   for(i in docs){
      key = docs[i].name;
      if(ar[key] == undefined) ar[key] = '';
      ar[key] += ' - '+docs[i].player;
   }
   for(i in ar){
     html = '<div class="panel panel-info" onclick="login(this);full();modal();"><div class="panel-heading">'+i+':'+ar[i]+'</div></div>';
     $('#xrooms').append(html);
   }
   console.log(ar);
}
function full(){
    game.scale.fullScreenScaleMode = Phryan.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phryan.ScaleManager.SHOW_ALL;
    game.scale.forceOrientation(true, false);
    game.scale.setScreenSize(true);
    game.scale.forceLandscape = true;
    game.scale.startFullScreen();
    game.scale.setShowAll();
    game.scale.refresh();
}
