var Data = new Object();
Data['game'] = {'timeout': 60};
Data['City'] = {
 'wessex':{
	           'cards':['soldier','knight'],
             'general':[{dono:'Player',shield:'Player',x:150,y:200, army:[{dono:'Player',start:false,x:400,y:500,type:'soldier','n':8},
                                                                          {dono:'Player',start:false,x:400,y:500,type:'soldier','n':8}]},
                        {dono:'Player',shield:'Player',x:250,y:420, army:[{dono:'Player',start:false,x:400,y:500,type:'soldier','n':8}]},
                        {dono:'Player',shield:'Player',x:150,y:200, army:[{dono:'Player',start:false,x:400,y:500,type:'soldier','n':8},
                                                                          {dono:'Player',start:false,x:400,y:500,type:'soldier','n':8}]}]
},
 'carbonaria':{
               'cards':['knight','archer','balista'],
               'general':[{dono:'Player',shield:'Player',x:170,y:400, army:[{dono:'Player',start:false,x:400,y:500,type:'soldier','n':8},
                                                                            {dono:'Player',start:false,x:400,y:500,type:'archer','n':8}]},
                          {dono:'Player',shield:'Player',x:250,y:420, army:[]},
                          {dono:'Player',shield:'Player',x:90,y:350, army:[]}]
 }
};
Data['current'] = {'general':{},'oldX':0,'oldY':0,'tween':{},'map':{},'path':[],'war':false};
Data['lvl']     = {'Country':'levelMap','general':undefined};
Data['maps']    = [{'name':'levelMap'    ,'path':'engine/plugin/lvl/levelMap'      , 'json': ''},
                   {'name':'wessex'      ,'i':30, 'j':15,'path':'engine/plugin/lvl/lvl_wessex'    , 'json': 'map/f_map_wessex.json'},
                   {'name':'carbonaria'  ,'i':30, 'j':15,'path':'engine/plugin/lvl/lvl_carbonaria', 'json': ''},

                   {'name':'war'         ,'path':'engine/plugin/lvl/war'   , 'json': ''},
                   {'name':'level0'      ,'path':'engine/plugin/lvl/level0', 'json': ''},
                   {'name':'level1'      ,'path':'engine/plugin/lvl/level1', 'json': ''},
                   {'name':'level3'      ,'path':'engine/plugin/lvl/level3', 'json': ''},
                   {'name':'level2'      ,'path':'engine/plugin/lvl/level2', 'json': ''}];

Data['plugins'] = [{'name':'fire','path':'engine/plugin/fire'},
                   {'name':'walls','path':'engine/plugin/walls'},
                   {'name':'cli','path':'engine/cli'},
                   {'name':'letter','path':'engine/plugin/letter'},
                   {'name':'villa','path':'engine/plugin/villa'},
						       {'name':'menu','path':'engine/plugin/menu'},
                   {'name':'touch','path':'engine/plugin/touch'},
						       {'name':'soldier','path':'engine/plugin/soldier'},
						       {'name':'mini','path':'engine/plugin/mini'},
						       {'name':'controls','path':'engine/plugin/controls'},
						       {'name':'celtas','path':'engine/celtas'},
						       {'name':'shield','path':'engine/plugin/shield'},
                   {'name':'warfoge','path':'engine/plugin/war_foge'},
                   {'name':'legion','path':'engine/plugin/legion'},
                   {'name':'legion','path':'engine/plugin/battle'}];
/*************************TRIGGERS************************/
Data['trigger'] = {'_id':function(){ return 'trigger'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax' },
                   'go':''};

week.set('data',Data);
