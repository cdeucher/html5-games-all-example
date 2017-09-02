/*
* Menu
* @Autor Cristiano Boell
*/
//step
Step = function(a,b){
    this._id      = 'step'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
    this.bounds   = new Phaser.Rectangle(a.worldX+1,a.worldY+1,a.height-2, a.width-2);
    this.graphics = week.get('game').add.graphics(this.bounds.x, this.bounds.y);

    if(b != undefined)
      this.graphics.beginFill(0x000000);
    else
      this.graphics.beginFill(0x808000);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);
    this.graphics.alpha = 0.5;
};
Step.prototype.kill = function(){
    this.graphics.kill();
};
//step_by_step - control of the steps
Step_by_Step = function(){
    this.list = []; 
    this.forStep = 3;
};
Step_by_Step.prototype.create = function(a,b){    
    this.list.push(new Step(a,b));
};
Step_by_Step.prototype.mount = function(){
    var x = week.get('layer').getTileX(week.get('game').input.activePointer.worldX);
    var y = week.get('layer').getTileY(week.get('game').input.activePointer.worldY);
    for (i=(x-this.forStep);i<=(x+this.forStep);i++){
      for (j=(y-this.forStep);j<=(y+this.forStep);j++){
        tile      = map.getTile(i, j, week.get('layer'));
        stay      = map.getTile(i, j, week.get('stay'));
        if(tile != undefined) this.create(tile,stay);
      }
    }  

};
Step_by_Step.prototype.mount_my_space = function(a,b){
        this.bounds   = new Phaser.Rectangle((a.x-100), (a.y-(a.y/2)), 400, 400);
        this.graphics = week.get('game').add.graphics(this.bounds.x, this.bounds.y);
        this.graphics.beginFill(0x808000);
        this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);
        this.graphics.alpha = 0.1;
        a.input.boundsRect = this.bounds;
        a.bringToTop();       
        if(week.get('data').City[week.get('data').lvl.Country] != undefined) {
          general = week.get('data').City[week.get('data').lvl.Country]['general']; 
          for(i in general){            
            if(general[i].obj._id == a._id){                                
                week.get('map').create_bar(general[i]);                  
            }
          }  
        }
};
Step_by_Step.prototype.check_down = function(){    
    var x = week.get('stay').getTileX(week.get('game').input.activePointer.worldX);
    var y = week.get('stay').getTileY(week.get('game').input.activePointer.worldY);
    stay  = map.getTile(x, y, week.get('stay'));
  if(stay != undefined){     
      week.get('data').current.tween = week.get('game').add.tween(week.get('data').current.general)
           .to({ x:week.get('data').current.oldX, y:week.get('data').current.oldY}, 1000, Phaser.Easing.Linear.None, true);                              
    return true;
  }else
    return false;

};
Step_by_Step.prototype.kill = function(){
      for(i in this.list){
          this.list[i].kill();
      }
};
//  //
Shieldx = function (data) {
   this.create(data);
};
Shieldx.prototype.create = function (conf) {
    this.dono    = conf.dono;
    this.shield  = conf.shield;
    this.db      = (conf.db == undefined)? false: conf.db;
    this.soldier = week.get('game').add.sprite(conf.x, conf.y, (conf.db)?'shield_human':'shield_orda', 0);
    this._id     = conf._id;
    this.index   = conf.index;
    this.soldier._id     = conf._id;
    this.soldier.inputEnabled = true;
    this.soldier.dono = conf.dono;
    this.soldier.index= conf.index;
    if(this.dono == week.get('cli').username){
       this.soldier.input.enableDrag(true);
       this.soldier.events.onInputDown.add(Shield_imput, this);
       this.soldier.events.onDragStart.add(onDragStart, this);
       this.soldier.events.onDragStop.add(onDragStop, this);
       this.soldier.events.onDragUpdate.add(onDragUpdate, this);
    }else{
       this.soldier.alpha =0.5; 
    }  
}
Shieldx.prototype.kill = function () {
         this.soldier.kill();
}
Shieldx.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
};

function oShield(conf){
  Tools.Class.apply(this, [0]);
  var _centuria  = [];
  var _orda      = [];
  var list       = [];
  var _preload = function(){
      week.get('game').load.image('shield_human',      'map/img/f_mapa/shield.png');
      week.get('game').load.image('shield_orda',       'map/img/f_mapa/shield.png');
  }
  var _create = function(obj){
       tmp = new Shieldx(obj);//{dono:'1',Shield:'1',_id:'1',x:400,y:300});
      if(obj.dono == week.get('cli').username)
         _centuria[tmp._id] = tmp;
      else
         _orda[tmp._id] = tmp;
  }
  var _get_shield = function(){
      return {'orda':_orda,'centuria':_centuria};
  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Shield(soldier);
    }else{
       _orda[soldier._id]     = new Shield(soldier);
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
      name: 'Shield',
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
      get_shield: function(){
           return _get_Shield();
      }
  };
}
var onDragStop = function(a,b){
        week.get('data').City[week.get('data').lvl.Country]['general'][a.index].x = a.x;
        week.get('data').City[week.get('data').lvl.Country]['general'][a.index].y = a.y;
        //down
        week.get('my_step').check_down();
        //kill
        week.get('my_step').kill();
        week.get('my_step').graphics.kill();
};
var onDragStart = function(a,b){
        week.get('data').current.oldX    = a.x;
        week.get('data').current.oldY    = a.y;  
        week.get('data').current.general = a;
        my_step = new Step_by_Step();
        my_step.mount();
        my_step.mount_my_space(a,b);
        week.set('my_step',my_step);
        //_check_war(a,b);  
        
};
var onDragUpdate = function(a,b){
        //week.l(a);
}
var Shield_imput = function(a,b){
    
};
var Shield = new oShield();
week.set('shield',Shield);
