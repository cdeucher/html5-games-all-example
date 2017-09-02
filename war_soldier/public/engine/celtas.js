/*
* Controls
* @Author Cristiano Boell
*/
function oCeltas(){
  Tools.Class.apply(this, [0]);
  var list = [];
  var _create = function(){
      switch(week.get('data').current.map.name) {        
        case 'wessex':                  
                week.get('legion').mount(week.get('enemy').City[week.get('data').lvl.Country].general);
            break;  
        case 'war':                  
               for(i in week.get('data').current.list_war.enemy){
                  let sold = week.get('data').current.list_war.enemy[i];
                  week.get('soldier').new({x:sold.x+50,y:sold.y,db:true,type:0,legion:8,cap:undefined,dono:'userEMENY'});    
               }
        break;                 
        case 'level0':
              week.get('soldier').new({x:400,y:250,db:true,type:3,legion:0,cap:undefined,base:{x:700,y:100},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:700,y:60,db:true,type:0,legion:8,cap:undefined,base:{x:350,y:50},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
        break;
        case 'level1':
              week.get('soldier').new({x:700,y:60,db:true,type:0,legion:8,cap:undefined,base:{x:350,y:50},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:700,y:200,db:true,type:0,legion:8,cap:undefined,base:{x:350,y:200},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:700,y:350,db:true,type:0,legion:8,cap:undefined,base:{x:350,y:350},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:770,y:500,db:true,type:0,legion:8,cap:undefined,base:{x:320,y:400},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            break;          
        case 'level2':
              week.get('soldier').new({x:1400,y:60,db:true,type:0,legion:8,cap:undefined,base:{x:750,y:50},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:1400,y:200,db:true,type:0,legion:8,cap:undefined,base:{x:750,y:200},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:1400,y:350,db:true,type:0,legion:8,cap:undefined,base:{x:750,y:350},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              week.get('soldier').new({x:1370,y:500,db:true,type:0,legion:8,cap:undefined,base:{x:720,y:400},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
              //balista
              week.get('soldier').new({x:1400,y:200,db:true,type:3,legion:0,cap:undefined,base:{x:700,y:200},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            break;
        case 'level3':
            week.get('villa').new({dono:'userEMENY',villa:'userEMENY',db:true,x:1700,y:300});
            week.get('soldier').new({x:900,y:60,db:true,type:0,legion:8,cap:undefined,base:{x:700,y:50},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:900,y:100,db:true,type:0,legion:8,cap:undefined,base:{x:700,y:200},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:900,y:650,db:true,type:0,legion:8,cap:undefined,base:{x:750,y:400},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:900,y:600,db:true,type:0,legion:8,cap:undefined,base:{x:750,y:500},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            //
            week.get('soldier').new({x:1500,y:160,db:true,type:0,legion:8,cap:undefined,base:{x:1400,y:160},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:1500,y:250,db:true,type:0,legion:8,cap:undefined,base:{x:1400,y:250},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:1500,y:300,db:true,type:0,legion:8,cap:undefined,base:{x:1400,y:300},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            week.get('soldier').new({x:1600,y:450,db:true,type:0,legion:8,cap:undefined,base:{x:1400,y:500},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
            //balista
            week.get('soldier').new({x:700,y:20,db:true,type:3,legion:0,cap:undefined,base:{x:700,y:100},dono:'userEMENY',_id:new Date().getTime()+Math.floor((Math.random() * 9999) + 1)});
          break;
    }
  }
  //public's
  return {
      name: 'Celtas',
      start  : this.start,
      preload: this.preload,
      new    : _create,
      create : this.create,
      render : this.render,
      update : this.update,
      clear  : this.clear
  };
}
var celtas = new oCeltas();
week.set('celtas',celtas);
