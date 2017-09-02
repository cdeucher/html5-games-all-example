/*
* Menu
* @Autor Cristiano Boell
*/
Letter = function (data) {
   this.create(data);
};
Letter.prototype.create = function (conf) {
   this.name     = conf.name;
   this.alive    = true;
   this.msg      = conf.msg;
   this.sub      = (conf.sub != undefined)?conf.sub:'';
   this.sec      = (conf.sec != undefined)?conf.sec:undefined;
   if(conf.x != undefined){
     this.screen   = true;
     this.x        = conf.x;
     this.y        = conf.y;
     this.soldier  = game.add.text(this.x, this.y, this.msg+this.sub , { font: '16px Arial', fill: '#fff' });
     this.soldier.fixedToCamera = true;
   }
}
Letter.prototype.set = function (data) {
   this.msg      = data;
}
Letter.prototype.kill = function () {
   this.alive = false;
  if(this.screen)
   game.world.remove(this.soldier);
}
Letter.prototype.update = function () {
  if(this.alive == true){
    if(this.screen){
        this.soldier.setText(this.msg+this.sub);
      if(this.sec != undefined){
        this.sec--;
        if(this.sec <= 0){
          this.alive = false;
        if(this.screen)
          game.world.remove(this.soldier);
        }
      }
    }
  }else{
    if(this.screen)
      game.world.remove(this.soldier);
  }
}
function oLetter(){
  var list = [];
  var activity = false;
  var action   = function(a,b,c){console.log(a,b,c);};
  var author   = undefined;

  var _create = function(data){
    if(data.name == 'warn'){
     if(list.length > 0 )
        data.y -= 15*list.length;
    }
    list.push(new Letter(data));
  }
  //public's
  return {
      create: function(data){
           _create(data);
           return this;
      },
      set: function(key,msg){
        for(i in list){
           if(list[i].name == key)
              list[i].set(msg);
        }
      },
      get: function(key){
        for(i in list){
           if(list[i].name == key){
              return list[i].msg;
              break;
           }
        }
      },
      update: function(){
         for(i in list){
            list[i].update();
            if(list[i].alive == false)
              list.splice(i,1);
         }
      },
      kill: function(key){
        for(i in list){
           if(list[i].name == key){
              return list[i].kill();
              break;
           }
        }
      },
      clear: function(){
        for(i in list){
              list[i].kill();
        }
      }
  };
}
