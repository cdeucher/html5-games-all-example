var oCli = function(){
        Tools.Class.apply(this, [0]);
        var name     = 'Cli';
        var username = 'Player';

        var _create = function(){
               week.get('letter').new({name:'player',x:(week.get('game').camera.width / 2),y:40,msg:'Player 1'});
               week.get('letter').new({name:'fps',x:100,y:40,msg:'60'});
               //
              switch(week.get('data').current.map.name) {
                case 'levelMap':
                      week.get('map').create(70);
                break;
                case 'carbonaria':
                      list = week.get('data').City[week.get('data').lvl.Country].general;
                      for(i in list){
                        list[i].index = i;
                        week.get('shield').new(list[i]);
                      }
                      week.get('letter').new({name:'player',x:(week.get('game').camera.width / 2),y:40,msg:'Player 1'});
                      week.get('letter').new({name:'fps',x:100,y:40,msg:'60'});
                    break;
                case 'wessex':
                      week.get('warfoge').mount();
                      week.get('legion').mount(week.get('data').City[week.get('data').lvl.Country].general);

                      week.get('letter').new({name:'player',x:(week.get('game').camera.width / 2),y:40,msg:'Player 1'});
                      week.get('letter').new({name:'fps',x:100,y:40,msg:'60'});
                    break;
                case 'war':
                      week.get('touch').go();
                      
                      for(i in week.get('data').current.list_war.my){
                          let sold = week.get('data').current.list_war.my[i];
                          week.get('soldier').new({x:sold.x+50,y:sold.y,type:0,legion:6,cap:undefined,dono:week.get('cli').username});
                      }

                      week.get('letter').new({name:'player',x:(week.get('game').camera.width / 2),y:40,msg:'Player 1'});
                      week.get('letter').new({name:'fps',x:100,y:40,msg:'60'});
                break;
                case 'level0':
                      week.get('touch').go();

                      week.get('soldier').new({x:280,y:50,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:380,y:50,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                break;
                case 'level1':
                      week.get('touch').go();

                      week.get('soldier').new({x:80,y:50,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:150,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:250,type:3,legion:0,cap:undefined,dono:week.get('cli').username});

                      week.get('soldier').new({x:80,y:50,type:0,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:100,type:0,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:180,y:250,type:1,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:250,type:1,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:350,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:250,y:350,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:250,y:350,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('letter').new({name:'player',x:(week.get('game').camera.width / 2),y:40,msg:'Player 1'});
                      week.get('letter').new({name:'fps',x:100,y:40,msg:'60'});
                    break;
                case 'level2':
                      week.get('touch').go();

                      week.get('villa').new({dono:this.username,villa:this.username,x:150,y:300});
                    break;
                case 'level3':
                      week.get('touch').go();

                      week.get('soldier').new({x:80,y:50,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:150,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:250,type:3,legion:0,cap:undefined,dono:week.get('cli').username});
                      //week.get('villa').new({dono:this.username,villa:this.username,x:200,y:300});
                      week.get('soldier').new({x:80,y:50,type:0,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:550,type:0,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:180,y:250,type:1,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:250,type:1,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:80,y:350,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:150,y:150,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                      week.get('soldier').new({x:250,y:350,type:2,legion:4,cap:undefined,dono:week.get('cli').username});
                    break;
              }
               ready   = true;
        }
        var _update = function(){
               week.get('letter').set('fps','FPS:'+week.get('game').time.fps);
        }
        var _render = function(){
               week.get('map').render();
        }
        //public's
        return {
            name: 'Cli',
            username:username,
            start  : this.start,
            preload: this.preload,
            new    : _create,
            create : this.create,
            render : _render,
            update : _update,
            clear  : this.clear
        };
}
var cli   = new oCli();
week.set('cli',cli);
