var map = {
  create: function(){
    this.main();
  },
  preload: function(){
      week.get('game').load.tilemap('map', 'map/f_map_carbonaria.json', null, Phaser.Tilemap.TILED_JSON);
      week.get('game').load.image('solo',  'map/img/map/map1_1.png');
      week.get('game').load.image('tileset_woods',  'map/img/map/map1_2.png');
      week.get('game').load.image('shield','map/img/f_mapa/shield.png');
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
     map.addTilesetImage('solo');
     map.addTilesetImage('tileset_woods');

     layer = map.createLayer('solo');
     layer.resizeWorld();
     
     stay  = map.createLayer('stay');     
     stay.resizeWorld();
         
     week.set('stay',stay);
     week.set('layer',layer);
     // groups of layers
     var x = {    'create_centuria':week.get('game').add.group(),
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
     week.get('cli').new('map_lvl_carbonaria');
     week.get('celtas').new('map_lvl_carbonaria');
     /*week.get('walls').conf({'obj':'my','img':'shield'}).new_centuria(1097);
     week.get('walls').conf({'obj':'enemy','img':'shield'}).new_orda(1097);
     _orda = week.get('walls').get('centuria');
     for(i = 0; i < _orda.orda.children.length; i++){
        _orda.orda.getAt(i).alpha =0.5;
     } */
 } 
}