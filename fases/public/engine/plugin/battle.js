class oBattle extends ecTools{
   constructor(conf){
     super()
     this.name='battle'

   }
   new(a,list){
      week.l('go battle').l(list.my)
                         .l(list.enemy) 
                         .l('----------------------');
      week.get('data').current.list_war  = list; // list of soldier that will to war
      week.get('letter').new({name:'battle',x:a.x,y:a.y,msg:'GO BATTLE','action':this.start,'sec':60});

   }
   start(){
      week.l('start')
      week.get('hamer').set('war');
   }
}
var Battle = new oBattle();
week.set('battle',Battle);