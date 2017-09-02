var map = {
	create: function(){
		this.main();
	},
	preload: function(){
		week.get('game').load.tilemap('map',       'map/f_map3.json', null, Phaser.Tilemap.TILED_JSON);
		week.get('game').load.image('img_solo',    'map/img/f_mapa/map.png');
		week.get('game').load.image('img_detail',  'map/img/f_mapa/detail.png');
		week.get('game').load.image('wessex',      'map/img/f_mapa/wessex.png');
    week.get('game').load.image('mold',        'map/img/f_mapa/moldura.png');
		week.get('game').load.image('carbonaria',  'map/img/f_mapa/carbonaria.png');
    week.get('game').load.image('enter',       'map/img/f_mapa/enter.png');
    week.get('game').load.image('shield',      'map/img/f_mapa/shield.png');
		for (i in week.get('data').plugins)
            week.get(week.get('data').plugins[i].name).preload();
	},
	render: function(){
		if(week.get('hamer').isReady())
			 for (i in week.get('data').plugins)
                 week.get(week.get('data').plugins[i].name).render();
	},
	update: function(){
		if(week.get('hamer').isReady())
			 for (i in week.get('data').plugins)
                week.get(week.get('data').plugins[i].name).update();
  },
  onProgress: function(progress){
     if(progress==100){
        this.main();
     }
  },
  fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
     //console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
     $('#bar').html("Loading : "+progress+"%");
     this.onProgress(progress);
  },
  main: function(){
     week.get('game').physics.startSystem(Phaser.Physics.ARCADE);
     week.get('game').world.setBounds(0, 0, 2880, 1600);
     /*
     *   Map
     */
    map = week.get('game').add.tilemap('map');
    map.addTilesetImage('img_solo');
    layer = map.createLayer('solo');
    map.addTilesetImage('img_detail');
    detail = map.createLayer('detail');
    layer.resizeWorld();
  	layer.alpha = 0.5;
  		 // groups of layers
  	var x = { 'create_centuria':week.get('game').add.group(),
  						'create_orda':week.get('game').add.group()};
  	week.set('xmen',x);
    /*
    * Settings
    */
    week.get('game').input.onDown.add(move, this);
    /*
    * Timers
    */
    week.get('game').time.advancedTiming = true;
    //week.get('game').time.events.loop(1000,week.get('hamer').timer,this);
    ready = true;
  	for (i in week.get('data').plugins){
  	     week.get(week.get('data').plugins[i].name).create();
  	}	      
  	week.get('walls').conf({'obj':'wessex','img':'wessex','action':week.get('map').action_click}).new_centuria(1);//need objects in maps    
  	week.get('walls').conf({'obj':'wessex','img':'carbonaria','action':week.get('map').action_click}).new_orda(44);//need objects in maps
    //button enter
    week.get('walls').conf({'obj':'icons','img':'enter','action':week.get('map').action_enter}).new_centuria(71);//need objects in maps
    //week.get('walls').conf({'obj':'generals','img':'mold'}).new_centuria(70);
    week.get('cli').new('levelMap');
    week.get('celtas').new('levelMap');    
  }
}