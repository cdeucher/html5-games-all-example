/*
* Controls
* @Author Cristiano Boell
*/
Controls = function () {
    this.alive    = true;
    this.cursors  = {};
    this.create();
};
Controls.prototype.create = function () {
    this.cursors = week.get('game').input.keyboard.createCursorKeys();
}
Controls.prototype.update = function () {
  if (this.cursors.up.isDown) {
         week.get('game').camera.y -= 4;
     }else if (this.cursors.down.isDown) {
         week.get('game').camera.y += 4;
     }if (this.cursors.left.isDown) {
         week.get('game').camera.x -= 4;
     }else if (this.cursors.right.isDown){
         week.get('game').camera.x += 4;
     }
}
function oControls(){
  Tools.Class.apply(this, [0]);
  var list = [];
  var name = 'Controls';
  var _create = function(){
      list.push(new Controls());
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
      name: 'Controls',
      start  : this.start,
      preload: this.preload,
      create : function(){ _create(); },
      render : this.render,
      update : function(){ _update(); },
      clear  : function(){  }
  };
}
var controls = new oControls();
week.set('controls',controls);
