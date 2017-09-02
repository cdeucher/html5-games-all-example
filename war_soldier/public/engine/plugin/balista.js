/*
* Push
* @Author Cristiano Boell
*/
Pushx = function(conf) {
  Balista.Class.apply(this, [1]);
  this._id      = 'ax'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
  this.x        = conf.x;
  this.y        = conf.y;
  this.indicey  = conf.indicey;
  this.indicex  = conf.indicex;
  this.type     = conf.type;
  this.dono     = conf.dono;
  this.db       = (conf.db   == undefined)? false: conf.db;
  this.boot     = (conf.boot == undefined)? false: conf.boot;
  this.base     = (conf.base == undefined)? {x:this.x+50,y:this.y+50}: {x:conf.base.x,y:conf.base.y};

  this.soldier  = week.get('game').add.sprite(this.x, this.y, 'push_base');
  this.soldier._id  = this._id;
  this.soldier.scale.setTo(0.5, 0.5);
  this.soldier.anchor.setTo(0.5, 0.5);
  this.top      = week.get('game').add.sprite(this.x, this.y, 'push_top');
  this.top._id  = this._id;
  this.top.scale.setTo(0.5, 0.5);
  this.top.anchor.setTo(0.6, 0.6);
  this.soldier.inputEnabled = true;
  this.soldier.events.onInputDown.add(push_imput, this);
  this.top.inputEnabled = true;
  this.top.events.onInputDown.add(push_imput, this);
  this.bar();

  week.get('xmen').LayerGround.add(this.soldier);
  week.get('xmen').LayerGround.add(this.top);
  week.get('xmen').LayerGround.setAll('z', 2);
};
Pushx.prototype.local_update = function(list){
   this.top.x  = this.soldier.x;
   this.top.y  = this.soldier.y;
};
Pushx.prototype.kill = function () {
   this.alive = false;
   this.soldier.kill();
};
Pushx.prototype.render = function(){
   week.get('game').debug.body(this.soldier);
};
function oPush(){
  Tools.Class.apply(this, [0]);
  var list = [];
  var _preload = function(){
      week.get('game').load.image('push_base', 'map/img/player/push_base.png');
      week.get('game').load.image('push_top', 'map/img/player/push_top.png');
      week.get('game').load.image('push_arrow', 'map/img/player/push_arrow.png');
  }
  var _new = function(data,cap){
     tmp = new Pushx({x:150,y:150,index:1},1111);
     list[tmp._id] = tmp;
  }
  var _gokill = function(min){
  }
  var _update = function(){
    for(i in list){
       if(list[i].alive == true){
         list[i].local_update()
         list[i].update(week.get('soldier').get_orda(),week.get('walls').get('centuria'));
       }
    }
  }
  var _render = function(){
    for(i in list){
       if(list[i].alive == true){
         list[i].render();
       }
    }
  }
  var _clear = function(){
    for(i in list){
         list[i].kill();
         list.splice(i,1);
    }
  }
  var _to_go = function(author,point){
      for(i in list){
         if(list[i].alive == true && list[i]._id == author._id){
            list[i].move_to(point);
         }
      }
  }
  //public's
  return {
      name  : 'Push',
      start : this.start,
      preload: _preload,
      create : this.create,
      new    : function(data,cap){ _new(data,cap); },
      update : _update,
      render : _render,
      gokill : _gokill,
      clear  : _clear,
      to_go  : _to_go
  }
}
var Push = new oPush();
week.set('push',Push);
week.set('push_move',{action:0});

var push_imput = function(a,b){
  if(!week.get('menu').getActivate()){
     x = week.get('game').input.activePointer.worldX;
     y = week.get('game').input.activePointer.worldY;
     week.get('menu').new({x:x,y:y,index:1});
                     //.new({x:x+90,y:y,index:0})
                     //.new({x:x+90,y:y+90,index:2});
     week.get('menu').setAction(push_move,a);
  }
};
var push_move = function(author,a,b){
    if(a.index == 1)
      week.set('push_move',{action:1,soldier:author});
}
