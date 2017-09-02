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
          this.soldier  = {alive:0};
          this.indicey  = conf.indicey;
          this.indicex  = conf.indicex;
          this.type     = conf.type;
          this.dono     = conf.dono;
          this.cap      = conf.cap;
          this.db       = (conf.db == undefined)? false: conf.db;
          this.base     = (conf.base == undefined)? {x:0,y:0}: conf.base;
          this.alive    = true;
          this.dir      = 0;
          this.healt    = 20;
          this.force    = 4;
          this.legion   = 5;
          this.action_WALK= [[0,1,2,3],[0,1,2,3]];
          this.action_ATK = [[7,6,5,4],[7,6,5,4]];
          this.base     = this.base;
};
Soldier.prototype.tween  = function(){

};
Soldier.prototype.check_collision = function(enemys,socket,_centuria) {

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
  if(this.alive){
       this.soldier._id = this._id;
       socket.emit('server_update_remote',{_id:this._id, x:this.soldier.x, y:this.soldier.y});
    for(i in enemys){
      if(enemys[i].alive){
          enemys[i].soldier._id = enemys[i]._id;
       if (this.current == undefined) {   //stop and not attack nobody
           if (enemys[i].IcanHIT == undefined) {   //i can't see walls for hit
               if (this.between(this.soldier, enemys[i].soldier) < 250){
                  this.current = 'walk';
                  console.log('I am bot and I see you man');
                  socket.emit('server_move_to',{_id:this._id,enemy_id:enemys[i]._id});
               }
           }
        }
     }
    }
  }
};
Soldier.prototype.between = function(a,b) {
   if(a.x > b.x)
     return (a.x - b.x);
   else
     return (b.x - a.x);
};
Soldier.prototype.render = function() {

};
Soldier.prototype.move_to = function(data,group){

};
Soldier.prototype.collision = function(soldier,enemy){
   if(this.atk_enemy == undefined){
      this.current   = 'atk';
      this.atk_enemy = enemy._id;
      socket.emit('server_collision_to',{_id:this._id,enemy_id:enemy._id});  // approve enemy in the server
   }
};
Soldier.prototype.collision_to = function(data,group){
      this.atk_enemy = data.enemy_id;
      this.current   = 'atk';
};
Soldier.prototype.stopAtk = function(){
  if(this.atk_enemy != undefined){
       this._socket.emit('server_atk_to',{_id:this._id,enemy_id:this.atk_enemy,force:this.force}); //send attack to server
  }
};
Soldier.prototype.atk_to = function(data,group) {
     //console.log('attacking - ',data,group);
     if (this.bounds != undefined) {

     }
};
Soldier.prototype.end_Atk = function(enemy,anima){
       this._socket.emit('server_kill_soldier',{_id:this.atk_enemy,IcanHIT:enemy.IcanHIT});//  kill enemy in to server
       this.current = undefined;
       this.atk_enemy = undefined;
};
Soldier.prototype.update_remote = function(soldier) {
     if(this.soldier.alive){
       this.soldier.x = soldier.x;
       this.soldier.y = soldier.y;
     }
};
Soldier.prototype.end_walk = function(enemy,anima){
       this.current = undefined;
};
Soldier.prototype.set_mira = function(enemy) {
     this.mira = enemy;
};
Soldier.prototype.get_mira = function() {
     return this.mira;
};
Soldier.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
};
Soldier.prototype.go_select = function(a,b){

};
Soldier.prototype.animaAnew = function(enemy){

};
Soldier.prototype.stop = function(){
  this.current = undefined;
  this.atk_enemy = undefined;
};
Soldier.prototype.damage = function (force) {
     this.healt -= force;
};
Soldier.prototype.get_healt = function () {
     return this.healt;
};
function Anew(main,img){
    //privates
    var _alive = true;
    var _test;
    var _duration;
    var _bullet = {};
    var _tween;
    var _main   = main;
    var _game   = game;
    var _create = function(){

    }
    var _moveSprite = function(_pointer) {

    }
    var _and_move = function(){

    }
    var _stopped_bomb = function(a,b){
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

        }
    };
}
