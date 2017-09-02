var Div = {
    Class :function(){
        Obj.Class.apply(this, [0]);
        GO      = 0;
        this.start = function(){
            var game =  new Phaser.Game(width,height, Phaser.CANVAS, 'game');
            game.myWidth  = width;
            game.myHeight = height;
            week.set('game',game);
            hamer.set(week.get('data').lvl.Country);
        }
        this.wait = function(check,param,xcall){
            if(check[param] != undefined && check[param] != []){
               week.l('call');
               xcall();
            }else{
                GO += 1;
               if(GO < week.get('data').game.timeout)
                  setTimeout(function(){hamer.wait(check,param,xcall);},1000);
               else  week.l('timeout');
            }
        }
        this.startPlugins = function(){
            for (i in week.get('data').plugins){
              if(week.get(week.get('data').plugins[i].name) == undefined){
                week.loadScript(week.get('data').plugins[i].path+'.js',i,function(index){
                     week.get('data').plugins[index].index = index;
                     week.get('data').plugins[index].state = true;
                     //week.get(week.get('data').plugins[index].name).start();
                });
               }
            }
        }
        this.get_map = function(a){
             for (i in week.get('data').maps){
                if(week.get('data').maps[i].name == a){
                   return week.get('data').maps[i];
                   break;
                }
             }
          return undefined;
        }
        this.set = function(a){
              for (i in week.get('data').plugins)
                 week.get(week.get('data').plugins[i].name).clear();

              //if(week.get('game').state.states[a] == undefined){
                  week.l('load map ->',a);
                  mp = this.get_map(a);
                 if(mp != undefined){
                  week.get('data').current.map = mp;
                  week.loadScript(mp.path+'.js',a,function(_a_){
                       week.get('game').state.add(_a_, map);
                       week.get('game').state.start(_a_);
                  });
                 }else{
                  week.l('map not found, check data!')
                        .l('--------------------------------------------');
                 }
               //}else{
               //  week.l('start map ->',a);
               //  week.get('game').state.start(a);
               //}
        }
    }
}
var hamer = new Div.Class;
week.set('hamer',hamer);
hamer.startPlugins();
/*hamer.wait(week.get('data').plugins[0],'state',function(){console.log('exec');});*/
/*após o último plugin, começa o jogo*/
/*after the last plugin, begin the game.*/
hamer.wait(week.get('data').plugins[week.get('data').plugins.length-1],'state',hamer.start);
