/*
* Fire
* @Author Cristiano Boell
*/
bFire = function(x,y) {
    this.fire = week.get('game').add.sprite(x,y, 'mage_fire', 0);
    week.get('game').physics.enable(this.fire, Phaser.Physics.ARCADE);
    this.fire.enableBody = true;
    this.fire.force = 2;
    this.fire.healt = 200;
    this.fire.alive = true;
    this.anima = this.fire.animations.add('walk', [1,2,3,1,2,3,2,1], 4, false);
    this.anima.onComplete.add(this.stopAtk, this);
    this.fire.animations.play('walk');
    this.fire.x = x;
    this.fire.y = y;
    this.fire.scale.setTo(0.5,0.5);
};
bFire.prototype.update = function(list){
};
bFire.prototype.kill = function () {
   this.alive = false;
   this.soldier.kill();
};
bFire.prototype.stopAtk = function(a,b) {
      this.fire.animations.play('walk');
};
function oFire(){
  Tools.Class.apply(this, [0]);
  var _orda = [];
  var _centuria = [];
  var layer = {};

  var _preload = function(){
        week.get('game').load.spritesheet('mage_fire', 'map/img/player/fire.png', 200, 150);
  }
  var _create = function(){
  }
  var _new = function(a,b){
     tmp = new bFire(a,b);
     week.get('xmen').fire.add(tmp.fire);
     _centuria.push(tmp);

  }
  var _update = function(centuria){
  }
  var _render = function(){
  }
  var _clear = function(){
  }
  //public's
  return {
      name    : 'Fire',
      new     : _new,
      clear   : this.clear,
      start   : this.start,
      preload : _preload,
      create  : _create,
      update  : _update,
      render  : this.render
  }
}
var Fire = new oFire();
week.set('fire',Fire);
