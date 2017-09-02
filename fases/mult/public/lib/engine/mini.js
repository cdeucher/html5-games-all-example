/*
* Menu
* @Autor Cristiano Boell
*/
Mini = function(conf,cap) {
  this.x        = conf.x;
  this.y        = conf.y;
  this.company  = undefined;
  this.clicked  = undefined;
  this.calc(conf.num);
  this.cap      = cap;
  this.alive    = true;
  this.status   = 'move';
  conf.index    = (conf.index>3) ? 3 : conf.index;
  this.soldier  = game.add.sprite(this.x, this.y, 'battle',conf.index);
  this.soldier.cap  = this.cap;
  this.soldier.index  = conf.index;
  game.physics.enable(this.soldier, Phryan.Physics.ARCADE);
  this.soldier.body.enable = true;
  this.soldier.body.setSize(50, 10, 0, 0);
  this.soldier.inputEnabled = true;
  this.soldier.events.onInputDown.add(this.move, this); // click under soldier
};
Mini.prototype.move = function(a){
   this.clicked = true;
};
Mini.prototype.update = function(list){
   this.soldier.y = this.y;
   this.soldier.x = this.x;
   this.set_body(list);
};
Mini.prototype.set_body = function(list_cap){
   company = 0;
   for(i in list_cap){
      if(list_cap[i].alive && list_cap[i].cap == this.cap._id){
        company++;
        if(this.clicked != undefined){
          this.clicked = undefined;
          game.camera.x = list_cap[i].soldier.x-150;
          game.camera.y = list_cap[i].soldier.y-150;
        }
        this.set_battle(list_cap[i]);  //case soldier or captain attack an enemy then start battle
      }
      if(list_cap[i].alive && list_cap[i]._id == this.cap._id){
        company++;
        this.set_battle(list_cap[i]);  //case soldier or captain attack an enemy then start battle
      }
   }
   if(this.company == undefined || this.company < company)
      this.company = company;

   tmp = (50/this.company)*company;
   this.soldier.body.setSize(tmp, 10, 0, 0);
   if(tmp <= 0) //case not have more soldier in group then kill mini
       mini.gokill(this.soldier);
};
Mini.prototype.calc = function (num) {
   this.x = (game.camera.width+game.camera.x)-((num < 10)?50:100);
   if(num >= 10) num = num-10;
   this.y = game.camera.y+(num*50);
};
Mini.prototype.kill = function () {
   this.alive = false;
   this.soldier.kill();
};
Mini.prototype.render = function(){
   game.debug.body(this.soldier);
};
Mini.prototype.set_battle = function (a) {
   //console.log(a.battle);
   if(a.battle == undefined){
      this.soldier.tint = 16777215;
   }else if(a.battle != undefined)
      this.soldier.tint = 14224750.480263751;
};
function oMini(){
  var list = [];

  var _create = function(data,cap){
     data.num = list.length;
     list.push(new Mini(data,cap));
  }
  var _gokill = function(min){
    for(i in list){
       if(list[i].cap._id == min.cap._id){
         list[i].kill();
         list.splice(i,1);
       }
    }
  }
  var _reset = function(){
    for(i in list){
       if(list[i].alive == true){
         list[i].calc(i);
       }
    }
  }
  var _update = function(centuria){
    _reset();
    for(i in list){
       if(list[i].alive == true){
         list[i].update(centuria);
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
  //public's
  return {
      create: function(data,cap){
           _create(data,cap);
      },
      update: function(data){
           _update(data);
      },
      render: function(){
           _render();
      },
      gokill: function(mini){
           _gokill(mini);
      }
  }
}
