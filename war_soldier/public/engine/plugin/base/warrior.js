var Interface = {
    abstract :function(c){
        if( c.prototype.isPrototypeOf(this) )
            throw new Error('Abstract Class')
    }
}
var Warrior = {
    Class :function(){
        tmp       = {};
        /*-----------------------WALLS------------------------------------------*/
        this.MYwalls_collision = function(soldier,wall){
           this.stop();
           if(this.dir == 1){
              this.soldier.x += 20;
              tmp = this.soldier.x + 40;
           }else{
              this.soldier.x -= 5;
              tmp = this.soldier.x - 40;
           }
          this.move_for(tmp,this.soldier.y);
        };
        this.ENEMYwalls_collision = function(soldier,wall){
          if(this.atk_enemy == undefined && this.current != 'atk'){
            //if(this.bounds == undefined)
                   this.atk_walls_to(wall);
            //else   this.stop(); //archer can't follow
          }
        };
        this.atk_walls_to = function(wall){
               this.atk_enemy = wall._id;
               this.current   = 'atk';
               this.battle    = 'go';
               this.soldier.animations.stop(); //'walk'
             if(this.soldier.tween != undefined)
               this.soldier.tween.stop();
             if(this.dir == 0)
               this.soldier.animations.play('atk_wall1');
             else
               this.soldier.animations.play('atk_wall2');
        }
        this.stopAtkWalls = function(){
          this.battle   = undefined;
          if(this.atk_enemy != undefined){
                data = week.get('walls').atak({_id:this._id,enemy_id:this.atk_enemy,force:this.force,dono:this.dono});
                if(data.get_healt <= 0){
                  week.get('walls').gokill(this.atk_enemy);
                  this.soldier.animations.stop();//'atk'
                  this.current   = undefined;
                  this.atk_enemy = undefined;
                  this.soldier.animations.play('stay');
                  this.soldier.animations.stop();
                }else{
                  this.control_dir(this.soldier.x,data.x);
                  if(this.dir == 0)
                     this.soldier.animations.play('atk_wall1');
                  else
                    this.soldier.animations.play('atk_wall2');
                }
          }
        };
        /*-----------------------SOLDIERS------------------------------------------*/
        this.name = function(){ return this.name; }
        this.bar  = function(){
                  bmd = week.get('game').add.bitmapData(this.healt*3, 4);
                  bmd.ctx.beginPath();
                	bmd.ctx.rect(0, 0, this.healt*3, 4);
                	bmd.ctx.fillStyle = (!this.db) ? '#00685e' : '#980000' ;
                	bmd.ctx.fill();
                  this.progress = week.get('game').add.sprite(this.soldier.x+25, this.soldier.y-10, bmd);
                  this.progress.anchor.set(0.5);
        };
        this.bar_update = function(){
            if(this.alive){
                  this.progress.x = this.soldier.x+25;
                  this.progress.y = this.soldier.y-10;
            }
        };
        this.control_dir = function(x,point_x) {
             if(x < point_x){
                 this.dir =0;
             }else{
                 this.dir =1;
             }
        };
        this.tween  = function(){
                  this.soldier.tween = week.get('game').add.tween(this.soldier)
                    .to({ x: this.base.x, y: this.base.y}, this.velocity, Phaser.Easing.Linear.None);
                  this.soldier.tween.start();
                  this.soldier.tween.onComplete.add(this.end_walk,this);
        };
        this.check_collision = function() {
          for(i in this.enemys){
            if(this.enemys[i].alive){
                this.enemys[i].soldier._id = this.enemys[i]._id;
                week.get('game').physics.arcade.overlap(this.soldier,this.enemys[i].soldier, this.collision , null, this);
            }
          }
            week.get('game').physics.arcade.overlap(this.soldier, this.walls.centuria, this.MYwalls_collision , null, this);
            week.get('game').physics.arcade.overlap(this.soldier, this.walls.orda, this.ENEMYwalls_collision , null, this);
        };
        this.collision = function(soldier,enemy){
           if(this.atk_enemy == undefined){
            if(this.soldier.tween != undefined)
              this.soldier.tween.stop();
              this.soldier.animations.stop(); //'walk'
              this.collision_to({_id:this._id,enemy_id:enemy._id},enemy);
           }
        };
        this.collision_to = function(data,group){
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
        this.look = function(){
          if(this.current == undefined)
            for(i in this.enemys){
                if(this.enemys[i].alive && this.current == undefined){
                 if(this.enemys[i].myATK == undefined || this.enemys[i].myATK == this._id){ //only one atk each enemy
                   this.enemys[i].soldier._id = this.enemys[i]._id;
                   if (week.get('game').physics.arcade.distanceBetween(this.soldier, this.enemys[i].soldier) < this.Isee){
                        this.current = 'walk';
                        this.enemys[i].myATK = this._id;//(this.bounds != undefined)? undefined : this._id; //only one atk me - archer no have limit
                        //console.log(this._id,'=>',this.enemys[i]._id);
                        this.move_to({_id:this._id,enemy_id:this.enemys[i]._id});
                   }
                 }
               }
            }
        };
        this.archer_atk = function (){
          if (this.atk_enemy == undefined){
            for(i in this.enemys){
              if (this.enemys[i].alive && this.bounds != undefined){   //archer
                if (this.atk_enemy == undefined)
                  if (week.get('game').physics.arcade.distanceBetween(this.soldier, this.enemys[i].soldier) < this.bounds){
                      this.collision(this.soldier, this.enemys[i].soldier);
                  }
              }
            }
          }
        };
        this.update = function(enemys,walls) {
          if(this.alive){
             this.enemys = enemys;
             this.walls  = walls;
             this.soldier._id = this._id;
             this.bar_update();
             this.look();
             this.archer_atk();
             this.check_collision();
          }
        };
        this.sync = function() {
          if(this.alive){
             //
          }
        };
        this.render = function() {
          if(this.alive){
             week.get('game').debug.body(this.soldier);
          }
        };
        this.move_to = function(data){
          if(this.current != 'atk'){
              if(this.soldier.tween != undefined) this.soldier.tween.stop();
              if(this.soldier.animations != undefined) this.soldier.animations.stop();
              x = (data.enemy_id != undefined) ? this.enemys[data.enemy_id].soldier.x : data.x;
              y = (data.enemy_id != undefined) ? this.enemys[data.enemy_id].soldier.y : data.y;
              this.soldier.tween = week.get('game').add.tween(this.soldier).to({ x: x, y: y },this.velocity, Phaser.Easing.Linear.None);
              this.soldier.tween.onComplete.add(this.end_walk,this);
              this.walk(x);
            }
        };
        this.move_for = function(x,y){
          if(this.current != 'atk'){
              if(this.soldier.tween != undefined) this.soldier.tween.stop();
              if(this.soldier.animations != undefined) this.soldier.animations.stop();
              this.soldier.tween = week.get('game').add.tween(this.soldier).to({ x: x, y: y },this.velocity, Phaser.Easing.Linear.None);
              this.soldier.tween.onComplete.add(this.end_walk,this);
              this.walk(x);
            }
        };
        this.walk = function(x){
              this.current = 'walk';
              this.soldier.tween.start();
              this.control_dir(this.soldier.x,x);
              if(this.dir == 0)
                 this.soldier.animations.play('walk');
              else
                 this.soldier.animations.play('walk2');
        };
        this.stopAtk = function(){
          this.battle   = undefined;
          if(this.atk_enemy != undefined){
              if(this.enemys != undefined){
                this.atk_to({_id:this._id,enemy_id:this.atk_enemy,force:this.force,dono:this.dono});
              }else
                 console.log(this);
          }
        };
        this.atk_to = function(data) {
             if (this.bounds != undefined) {
               this.animaAnew(this.enemys[data.enemy_id].soldier);
             }
             this.enemys[data.enemy_id].damage(data.force);
             if(this.enemys[data.enemy_id].get_healt() <= 0){
               this.end_Atk(this.enemys[data.enemy_id]);
             }else{
               this.control_dir(this.soldier.x,this.enemys[data.enemy_id].soldier.x);
               if(this.dir == 0)
                 this.soldier.animations.play('atk');  // new attack
               else
                 this.soldier.animations.play('atk2');
             }
        };
        this.end_Atk = function(enemy){
               this.soldier.animations.stop();//'atk'
               this.current   = undefined;
               this.atk_enemy = undefined;
               this.soldier.animations.play('stay');
               this.soldier.animations.stop();
               enemy.goKill();
        };
        this.end_walk = function(enemy,anima){
               this.soldier.animations.stop(); //'walk'
               this.current = undefined;
        };
        this.set_mira = function(enemy) {
               this.mira = enemy;
        };
        this.get_mira = function() {
              return this.mira;
        };
        this.goKill = function(){
              for(i in this.enemys){
                if(this.enemys[i].myATK == this._id)
                  this.enemys[i].myATK = undefined; //only one atk me
              }
              this.alive = false;
              this.healt = 0;
              this.progress.kill();
              this.soldier.kill();
        };
        this.animaAnew = function(enemy){
              bomb = new Anew(this.soldier,this.arrow,this.speed);
              bullet = bomb.create();
              bullet.father = bomb;
              bomb.move(enemy);
        };
        this.stop = function(){
              this.current = undefined;
              this.atk_enemy = undefined;
              this.soldier.animations.stop();
              this.soldier.tween.stop();
        };
        this.damage = function (force) {
                this.healt -= (this.armor != undefined) ?(force - this.armor) : force;
                this.progress.width = this.healt*3;
        };
        this.get_healt = function () {
             return this.healt;
        };
    }
}
