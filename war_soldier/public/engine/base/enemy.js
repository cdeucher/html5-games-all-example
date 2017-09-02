var Enemy = new Object(); 
Enemy['City'] = {
 'wessex':{
	           'cards':['soldier','knight'],
	           'general':[{dono:'Enemy',x:350,y:400, army:[{dono:'Enemy',start:true,x:400,y:500,type:'soldier','n':12},
                                                           {dono:'Enemy',start:true,x:550,y:460,type:'soldier','n':12}]},
                          {dono:'Enemy',x:300,y:300, army:[{dono:'Enemy',start:true,x:750,y:300,type:'soldier','n':12}]},                                                  
                          {dono:'Enemy',x:400,y:400, army:[{dono:'Enemy',start:true,x:350,y:400,type:'soldier','n':12},
                                                           {dono:'Enemy',start:true,x:450,y:470,type:'soldier','n':12}]}]
}
};
Enemy['current'] = {'general':{},'oldX':0,'oldY':0,'tween':{},'map':{},'path':[]};
                   
week.set('enemy',Enemy);