/*
* Controls
* @Author Cristiano Boell
*/
Touch = function () {
    this.alive    = true;
    this.cursors  = {};
    this.create();
};
Touch.prototype.go = function () {
    this.create_controll();
};
Touch.prototype.create = function () {
    this.cursors = week.get('game').input.keyboard.createCursorKeys();
    //this.go();
};
Touch.prototype.update = function () {
    click = week.get('letter').get('click');
    if (this.cursors.left.isDown || click == 'left'){
        week.get('game').camera.x -= 8;
    }else if (this.cursors.right.isDown || click == 'right'){
        week.get('game').camera.x += 8;
    }else if (this.cursors.up.isDown || click == 'up'){
        week.get('game').camera.y -= 8;
    }else if (this.cursors.down.isDown || click == 'down'){
        week.get('game').camera.y += 8;
    }
};
Touch.prototype.create_controll = function(){
  /*
   *   Controles
   */
  week.get('letter').new({name:'click',msg:''});
  //left
  this.tt1 = week.get('game').add.sprite(0, 400, 'bat',107);
  this.tt1.fixedToCamera = true;
  this.tt1.inputEnabled = true;
  this.tt1.events.onInputDown.add(function(){ week.get('letter').set('click','left'); }, this);
  this.tt1.events.onInputUp.add(function(){ week.get('letter').set('click',''); }, this);
  this.tt1.bringToTop();
  //rigth
  this.tt2 = week.get('game').add.sprite(200, 400, 'bat',110);
  this.tt2.fixedToCamera = true;
  this.tt2.inputEnabled = true;
  this.tt2.events.onInputDown.add(function(){ week.get('letter').set('click','right'); }, this);
  this.tt2.events.onInputUp.add(function(){ week.get('letter').set('click',''); }, this);
  this.tt2.bringToTop();
  //up
  this.tt3 = week.get('game').add.sprite(100, 330, 'bat',107);
  this.tt3.fixedToCamera = true;
  this.tt3.inputEnabled = true;
  this.tt3.events.onInputDown.add(function(){ week.get('letter').set('click','up'); }, this);
  this.tt3.events.onInputUp.add(function(){ week.get('letter').set('click',''); }, this);
  this.tt3.bringToTop();
  //down
  this.tt4 = week.get('game').add.sprite(100, 400, 'bat',110);
  this.tt4.fixedToCamera = true;
  this.tt4.inputEnabled = true;
  this.tt4.events.onInputDown.add(function(){ week.get('letter').set('click','down'); }, this);
  this.tt4.events.onInputUp.add(function(){ week.get('letter').set('click',''); }, this);
  this.tt4.bringToTop();
};
function oTouch(){
  Tools.Class.apply(this, [0]);
  var list = [];
  var name = 'Touch';
  var _preload= function(){
      week.get('game').load.spritesheet('bat', 'map/img/menu/bat.png',64,64);
  }
  var _go = function(){
    for(i in list){
       if(list[i].alive == true){
         list[i].go();
       }
    }
  }
  var _full = function(){
    /*
    week.get('game').scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    week.get('game').scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    week.get('game').scale.forceOrientation(true, false);
    week.get('game').scale.setScreenSize(true);
    week.get('game').scale.forceLandscape = true;
    week.get('game').scale.startFullScreen();
    week.get('game').scale.setShowAll();
    week.get('game').scale.refresh();*/
    if (week.get('game').scale.isFullScreen)
    {
        week.get('game').scale.stopFullScreen();
    }
    else
    {
        week.get('game').scale.startFullScreen(false);
    }
  }
  var _create = function(){
      list.push(new Touch());
  }
  var _update = function(){
      for(i in list){
         if(list[i].alive == true){
           list[i].update();
         }
      }
  }
  //public's
  return {
      name: 'Touch',
      start  : this.start,
      preload: function(){ _preload(); },
      create : function(){ _create(); },
      render : this.render,
      go     : function(){ _go(); },
      full   : function(){ _full(); },
      update : function(){ _update(); },
      clear  : function(){  }
  };
}
var touch = new oTouch();
week.set('touch',touch);
