/*
* Menu
* @Autor Cristiano Boell
*/
Villa = function (data) {
   this.create(data);
};
Villa.prototype.create = function (conf) {
    this.dono    = conf.dono;
    this.villa   = conf.villa;
    this.db      = (conf.db == undefined)? false: conf.db;
    this.soldier = week.get('game').add.sprite(conf.x, conf.y, (this.db)?'villa_human':'villa_orda', 0);
    this._id     = 'villa'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
    this.soldier._id     = this._id;
    this.soldier.inputEnabled = true;
    this.soldier.dono = conf.dono;
    if(this.dono == week.get('cli').username){
       //week.get('xmen').create_centuria.add(this.soldier);
       this.soldier.events.onInputDown.add(villa_imput, this);
       week.get('game').camera.x = conf.x-200;
       week.get('game').camera.y = conf.y-200;
    }else{
       //week.get('xmen').create_orda.add(this.soldier);
    }
}
Villa.prototype.kill = function () {
         this.soldier.kill();
}
Villa.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
};

function oVilla(conf){
  Tools.Class.apply(this, [0]);
  var _centuria  = [];
  var _orda      = [];
  var list       = [];
  var _preload = function(){
      week.get('game').load.atlas('villa_orda',  'map/img/player/villa_orda.png', 'map/villa_orda.json');
      week.get('game').load.atlas('villa_human',  'map/img/player/villa_human.png', 'map/villa_human.json');
  }
  var _create = function(obj){
       tmp = _centuria[obj._id] = new Villa(obj);//{dono:'1',villa:'1',_id:'1',x:400,y:300});
      if(obj.dono == week.get('cli').username)
         _centuria[tmp._id] = tmp;
      else
         _orda[tmp._id] = tmp;
  }
  var _get_villa = function(){
      return {'orda':_orda,'centuria':_centuria};
  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Villa(soldier);
    }else{
       _orda[soldier._id]     = new Villa(soldier);
    }
  }
  var _update_group = function(soldier){
    if(soldier.dono == userx){
        //letter.set('people',soldier.cost.people);
    }
  }
  var _remove = function(dono){
    for(i in _orda){
      if(_orda[i].dono == dono){
          _orda[i].goKill();
          _orda.splice(i,-1);
      }
    }
  }
  // remove all soldiers
  var _clear = function(){
    for(i in _centuria){
      _centuria[i].goKill();
    }
    for(i in _orda){
      _orda[i].goKill();
    }
    _orda = [];
    _centuria = [];
  }
  //public's
  return {
      name: 'Villa',
      start : this.start,
      preload: _preload,
      new   : _create,
      create: this.create,
      update: this.update,
      render: this.render,
      clear : this.clear,
      init: function(a){
           _init(a);
           return this;
      },
      set_group: function(a,b){
           _set_group(a,b);
      },
      update_group: function(a){
           _update_group(a);
      },
      remove: function(a){
           _remove(a);
      },
      get_villa: function(){
           tmp =_get_villa();
           return tmp;
      }
  };
}
var villa_imput = function(a,b){
  if(!week.get('menu').getActivate()){
     x = week.get('game').input.activePointer.worldX;
     y = week.get('game').input.activePointer.worldY;
     week.get('menu').new({x:x,y:y,index:0})
                     .new({x:x+50,y:y,index:1})
                     .new({x:x+100,y:y,index:3})
                     .new({x:x,y:y+90, index:2})
                      //.new({x:x+90,y:y+90,index:2});
     week.get('menu').setAction(villa_menu,a);
     week.get('menu').setActivate();
  }
};
var villa_menu = function(author,a,b){
   if(a.index == 0 )
      week.get('soldier').new({x:a.x,y:a.y,type:0,legion:3,cap:undefined,dono:week.get('cli').username});
   if(a.index == 1 )
      week.get('soldier').new({x:a.x,y:a.y,type:1,legion:3,cap:undefined,dono:week.get('cli').username});
   if(a.index == 3)
      week.get('soldier').new({x:a.x,y:a.y,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
   if(a.index == 2 )
      week.get('celtas').create();

}
var villa = new oVilla();
week.set('villa',villa);
