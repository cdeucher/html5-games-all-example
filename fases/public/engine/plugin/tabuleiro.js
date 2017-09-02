/*
* @Autor Cristiano Boell
*/
Tabu = function (data) {
   this.create(data);
};
Tabu.prototype.create = function (conf) {
    this.dono    = conf.dono;
    this.Tabu  = conf.Tabu;
    this.db      = (conf.db == undefined)? false: conf.db;
    this.soldier = week.get('game').add.sprite(conf.x, conf.y, (conf.db)?'Tabu_human':'Tabu_orda', 0);
    this._id     = conf._id;
    this.index   = conf.index;
    this.soldier._id     = conf._id;
    this.soldier.inputEnabled = true;
    this.soldier.dono = conf.dono;
    this.soldier.index= conf.index;
    if(this.dono == week.get('cli').username){
         
    }else{
       this.soldier.alpha =0.5; 
    }  
}
Tabu.prototype.kill = function () {
         this.soldier.kill();
}
Tabu.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
};

function oTabu(conf){
  Tools.Class.apply(this, [0]);
  var _centuria  = [];
  var _orda      = [];
  var list       = [];
  var _preload = function(){
      week.get('game').load.image('Tabu_human',      'map/img/f_mapa/shield.png');
      week.get('game').load.image('Tabu_orda',       'map/img/f_mapa/shield.png');
  }
  var _create = function(obj){
       tmp = new Tabu(obj);//{dono:'1',Tabu:'1',_id:'1',x:400,y:300});
      if(obj.dono == week.get('cli').username)
         _centuria[tmp._id] = tmp;
      else
         _orda[tmp._id] = tmp;
  }
  var _get_Tabu = function(){
      return {'orda':_orda,'centuria':_centuria};
  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Tabu(soldier);
    }else{
       _orda[soldier._id]     = new Tabu(soldier);
    }
  }

  var _check_war = function(iam_here){
       
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
      name: 'Tabu',
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
      get_Tabu: function(){
           return _get_Tabu();
      }
  };
}

var Tabu = new oTabu();
week.set('tabu',Tabu);
