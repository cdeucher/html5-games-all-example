/*
* Soldier
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
Soldier = function (conf,_game,_socket) {
         this._id      = conf._id;
         this._socket  = _socket;
         this.x        = conf.x;
         this.y        = conf.y;
         this.indicey  = conf.indicey;
         this.indicex  = conf.indicex;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.cap      = conf.cap;
         this.db       = (conf.db   == undefined)? false: conf.db;
         this.boot     = (conf.boot == undefined)? false: conf.boot;
         this.base     = (conf.base == undefined)? {x:0,y:0}: conf.base;
         this.alive    = true;
         this.dir      = 0;
         this.battle   = undefined;
         this.myATK    = undefined;
        switch (conf.type) {
                case 0:
                    this.soldier = game.add.sprite(this.x,this.y, 'soldier', 0);
                    this.healt  = 10;
                    this.force  = 2;
                    this.legion = 5;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                    this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                    this.base   = this.base;
                    break;
                case 1:
                    this.soldier = game.add.sprite(this.x,this.y, 'archer', 0);
                    this.healt  = 8;
                    this.force  = 1;
                    this.legion = 4;
                    this.cost   = 2;
                    this.action_WALK= [['walk0','walk1','walk2','walk3'],['2walk0','2walk1','2walk2','2walk3']];
                    this.action_ATK = [['atk0','atk1','atk2','atk3'],['2atk0','2atk1','2atk2','2atk3']];
                    this.base   = this.base;
                    this.bounds = 270;
                break;
                case 2:
                    this.soldier = game.add.sprite(this.x,this.y, 'knight', 0);
                    this.healt  = 10;
                    this.force  = 2;
                    this.legion = 5;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[11,10,9,8]];
                    this.action_ATK = [[4,5,6,7],[12,13,14,15]];
                    this.base   = this.base;
                    break;
                case 3:
                    this.soldier = game.add.sprite(this.x,this.y, 'enemy', 0);
                    this.healt  = 8;
                    this.force  = 1;
                    this.legion = 5;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                    this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                    this.base   = this.base;
                    break;
                case 4:
                    this.soldier = game.add.sprite(this.x,this.y, 'sir', 0);
                    this.healt  = 10;
                    this.force  = 3;
                    this.legion = 5;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                    this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                    this.base   = this.base;
                    break;
                case 5:
                    this.soldier = game.add.sprite(this.x,this.y, 'dragon', 0);
                    this.healt  = 60;
                    this.force  = 8;
                    this.legion = 1;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                    this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                    this.base   = this.base;
                    break;
                case 6:
                    this.soldier = game.add.sprite(this.x,this.y, 'boss', 0);
                    this.healt  = 18;
                    this.force  = 2;
                    this.legion = 1;
                    this.cost   = 2;
                    this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                    this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                    this.base   = this.base;
                    break;
        }
        if(isObject(spritesLayer))
           spritesLayer.add(this.soldier);
          this.anima  = this.soldier.animations.add('atk', this.action_ATK[0], 4, false);
          this.anima2 = this.soldier.animations.add('atk2', this.action_ATK[1], 4, false);
          this.anima.onComplete.add(this.stopAtk, this);
          this.anima2.onComplete.add(this.stopAtk, this);
          this.soldier.animations.add('walk',  this.action_WALK[0], 4, true);
          this.soldier.animations.add('walk2', this.action_WALK[1], 4, true);
          game.physics.enable(this.soldier, Phryan.Physics.ARCADE);
          this.bar();
      if(!this.db){ //remote does not started move
          this.soldier.inputEnabled = true;
          this.soldier.events.onInputDown.add(this.go_select, this); // click under soldier
          this.soldier.animations.play('walk');
          this.current = 'walk';
          this.tween();
      }
      if(this.boot){ //remote does not started move
          this.soldier.animations.play('walk2');
          this.current = 'walk';
          this.tween();
      }
};
Soldier.prototype.bar = function(){
          bmd = game.add.bitmapData(this.healt*3, 4);
          bmd.ctx.beginPath();
        	bmd.ctx.rect(0, 0, this.healt*3, 4);
        	bmd.ctx.fillStyle = (!this.db) ? '#00685e' : '#980000' ;
        	bmd.ctx.fill();
          this.progress = game.add.sprite(this.soldier.x+15, this.soldier.y+15, bmd);
          this.progress.anchor.set(0.5);
};
Soldier.prototype.bar_update = function(){
    if(this.alive){
          this.progress.x = this.soldier.x+15;
          this.progress.y = this.soldier.y;
    }
};
Soldier.prototype.tween  = function(){
          this.soldier.tween = game.add.tween(this.soldier)
            .to({ x: this.base.x, y: this.base.y}, 30000, Phryan.Easing.Linear.None);
          this.soldier.tween.start();
          this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
};
Soldier.prototype.check_collision = function(enemys) {
  if(this.alive){
      this.bar_update();
      this.soldier._id = this._id;
    for(i in enemys){
      if(enemys[i].alive){
          enemys[i].soldier._id = enemys[i]._id;
          game.physics.arcade.overlap(this.soldier,enemys[i].soldier, this.collision , null, this);
      }
    }
    /*for(i in _centuria){
      if(_centuria[i].alive && _centuria[i]._id != this._id){
          //
      }
    }*/
  }
};
Soldier.prototype.control_dir = function(x,y) {
     if(this.soldier.x < x){
        if(this.dir == 1){
         this.dir =0;
       }
     }else{
        if(this.dir == 0){
         this.dir =1;
        }
     }
};
Soldier.prototype.update = function(enemys,socket) {
  if(this.alive && this.atk_enemy == undefined){
     this.soldier._id = this._id;
     socket.emit('server_update_remote',{_id:this._id, x:this.soldier.x, y:this.soldier.y});
    for(i in enemys){
      if(enemys[i].alive){
          enemys[i].soldier._id = enemys[i]._id;
       if (this.current == undefined) {   //stop and not attack nobody
           if (enemys[i].IcanHIT == undefined && enemys[i].myATK == undefined) {   //i can't see walls for hit
             if (game.physics.arcade.distanceBetween(this.soldier, enemys[i].soldier) < 250){
                this.current = 'walk';
                enemys[i].myATK = this._id; //only one atk me
                //console.log('I see you man');
                socket.emit('server_move_to',{_id:this._id,enemy_id:enemys[i]._id});
             }
           }
           if (this.bounds != undefined) {   //archer
               if (game.physics.arcade.distanceBetween(this.soldier, enemys[i].soldier) < this.bounds){
                 //console.log('I atk you man');
                 this.collision(this.soldier, enemys[i].soldier);
               }
           }
        }
     }
    }
  }
};
Soldier.prototype.sync = function() {
  if(this.alive){
     //
  }
};
Soldier.prototype.render = function() {
  if(this.alive){
     game.debug.body(this.soldier);
  }
};
Soldier.prototype.move_to = function(data,group){
   //console.log(data,group);
   //if(group[data.enemy_id] != undefined){
      if(this.soldier.tween != undefined) this.soldier.tween.stop();
      if(this.soldier.animations != undefined) this.soldier.animations.stop();
      x = (data.enemy_id != undefined) ? group[data.enemy_id].soldier.x : data.x;
      y = (data.enemy_id != undefined) ? group[data.enemy_id].soldier.y : data.y;
      this.current = 'walk';
      this.soldier.tween = game.add.tween(this.soldier).to({ x: x, y: y },12000, Phryan.Easing.Linear.None);
      this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
      this.soldier.tween.start();
      //this.soldier.animations.play('atk2');
      this.control_dir(x,y);
      if(this.dir == 0)
         this.soldier.animations.play('walk');
      else
         this.soldier.animations.play('walk2');
    //}
};
Soldier.prototype.collision = function(soldier,enemy){
   if(this.atk_enemy == undefined){
      this.current   = 'atk';
    if(this.soldier.tween != undefined)
      this.soldier.tween.stop();
      this.atk_enemy = enemy._id;
      this.soldier.animations.stop(); //'walk'
      //console.log({_id:this._id,enemy_id:enemy._id})
      socket.emit('server_collision_to',{_id:this._id,enemy_id:enemy._id});  // approve enemy in the server
   }
};
Soldier.prototype.collision_to = function(data,group){
      //console.log('client-collision-to -',data);
      this.atk_enemy = data.enemy_id;
      this.current   = 'atk';
      this.battle    = 'go';
      this.soldier.animations.stop(); //'walk'
      if(this.soldier.tween != undefined)
      this.soldier.tween.stop();
    if(this.dir == 0)
      this.soldier.animations.play('atk');
    else
      this.soldier.animations.play('atk2');
};
Soldier.prototype.stopAtk = function(){
  this.battle   = undefined;
  if(this.atk_enemy != undefined){
       this._socket.emit('server_atk_to',{_id:this._id,enemy_id:this.atk_enemy,force:this.force}); //send attack to server
  }
};
Soldier.prototype.atk_to = function(data,group) {
     if (this.bounds != undefined) {
       this.animaAnew(group[data.enemy_id].soldier);
     }
     group[data.enemy_id].damage(data.force);
     if(group[data.enemy_id].get_healt() <= 0){
       this.end_Atk(group[data.enemy_id]);
     }else{
       if(this.dir == 0)
         this.soldier.animations.play('atk');  // new attack
       else
         this.soldier.animations.play('atk2');
     }
};
Soldier.prototype.end_Atk = function(enemy,anima){
       //console.log('end_Atk',enemy);
       this.soldier.animations.stop();//'atk'
       this._socket.emit('server_kill_soldier',{_id:this.atk_enemy,IcanHIT:enemy.IcanHIT});//  kill enemy in to server
       //console.log('atk_enemy',this.atk_enemy);
       this.current = undefined;
       this.atk_enemy = undefined;
};
Soldier.prototype.update_remote = function(soldier) {
     if(this.soldier.alive){
       this.bar_update();
       this.soldier.x = soldier.x;
       this.soldier.y = soldier.y;
     }
};
Soldier.prototype.end_walk = function(enemy,anima){
       this.soldier.animations.stop(); //'walk'
       this.current = undefined;
};
Soldier.prototype.set_mira = function(enemy) {
     this.mira = enemy;
};
Soldier.prototype.get_mira = function() {
     return this.mira;
};
Soldier.prototype.goKill = function(enemys){
    for(i in enemys){
      if(enemys[i].myATK == this._id)
        enemys[i].myATK = undefined; //only one atk me
    }
     this.alive = false;
     this.healt = 0;
     this.progress.kill();
     this.soldier.kill();
};
Soldier.prototype.go_select = function(a,b){
  if(!domo.getActivate()){
    x = game.input.activePointer.worldX;
    y = game.input.activePointer.worldY;
    domo.create({x:x,y:y,index:5})
        .create({x:(x-60),y:y,index:0})
        .create({x:x,y:(y+90),index:3});
    domo.setAction(getSkill,this.soldier);
    domo.setActivate();
  }
};
Soldier.prototype.animaAnew = function(enemy){
  bomb = new Anew(this.soldier,'arrow');
  bullet = bomb.create();
  bullet.father = bomb;
  bomb.move(enemy);
};
Soldier.prototype.stop = function(){
  this.current = undefined;
  this.atk_enemy = undefined;
  this.soldier.animations.stop();
  this.soldier.tween.stop();
};
Soldier.prototype.damage = function (force) {
     this.healt -= force;
     this.progress.width = this.healt*3;
};
Soldier.prototype.get_healt = function () {
     return this.healt;
};
function Anew(main,img){
    //privates
    var _alive = true;
    var _test;
    var _duration;
    var _bullet = game.add.sprite((main.x),(main.y), img);
    var _tween;
    var _main   = main;
    var _game   = game;
    var _create = function(){
         // _test = _game.add.sprite(100,100, 'bombImg', 0);
          _bullet.force           = 2;
          _bullet.current         = 'spin';
          _bullet.enableBody      = true;
          _bullet.physicsBodyType = Phryan.Physics.ARCADE;
          //_bullet.and_anima = _bullet.animations.add('arrow', [1], 5, false);
          //_bullet.and_anima.onComplete.add(_stopped_bomb, this);

          //_bullet.animations.add('arrow', [1], 5, true);
          //_bullet.animations.play('arrow');
        return _bullet;
    }
    var _moveSprite = function(_pointer) {
        //pointer = _test;
       if(_tween != undefined)
        if(_tween && _tween.isRunning){
            _tween.stop();
        }
        _duration = (game.physics.arcade.distanceBetween(_bullet, _pointer) / 300) * 1000;
        x = _pointer.x + (_pointer.width/2);
        y = _pointer.y + (_pointer.height/2);
        _tween    = game.add.tween(_bullet).to({ x:x , y:y }, _duration, Phryan.Easing.Linear.None, true);
        _tween._lastChild.onComplete.add(_and_move,this);
    }
    var _and_move = function(){
        // console.log('_and_move');
       //_bullet.animations.stop('arrow');
       //_bullet.animations.play('arrow');
       _bullet.current = 'boom';
       _stopped_bomb();
    }
    var _stopped_bomb = function(a,b){
       //_bullet.animations.stop('arrow');
       _bullet.kill();
    }
    var _set_pointer = function(pointer){
       _pointer = pointer;
    }
    //public's
    return {
        create: function(){
            return _create();
        },
        move: function(pointer){
            return _moveSprite(pointer);
        },
        stop_tween: function(){
            return _tween.stop();
        }
    };
}
