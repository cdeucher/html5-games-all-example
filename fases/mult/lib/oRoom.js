var db_clear = function (db){
  db.collection('rooms').remove();
};
var db_find = function (client,db){
   db.collection('rooms').find({},
      function(err,docs){
         client.emit("rooms", docs);
   });
};
var db_save = function (client, db, name, people, room){
  db.collection('rooms').find({name:room.name},
      function(err,docs){
          console.log('Players:',docs.length);
         if(docs.length == 0){ //check if exists room
            room.position = 1;
            db.collection('rooms').save(room, function(err, saved) {
            if( err || !saved ) {
             console.log("NOT insert room - ", room.name, room.position);
            }else{
             console.log("1insert room - ", room.name);
             client.emit("login", name, people, room.position);//set login  in the villa
             client.broadcast.to(client.room).emit("client_two", name, people, room.position);//set login  in the villa
            }});
         }else if(docs.length == 1){
           room.position = (docs[0].position == 1) ? 2 : 1;
           db.collection('rooms').save(room, function(err, saved) {
           if( err || !saved ) {
              console.log("NOT insert room - ", room.name);
           }else{
              console.log("2insert room - ", room.name, room.position);
              client.emit("login", name, people, room.position);//set login  in the villa
              client.broadcast.to(client.room).emit("client_two", name, people, room.position);//set login  in the villa
           }});
         }else{
            console.log("guest",docs.length);
            client.emit("update", name+" - You as join guest on server.");//update you
            client.emit("guest", name, people);
         }
      }
    );
};
var db_delete = function (client,db,player){
    console.log('remove player room - ',player);
    db.collection('rooms').remove({player:player});
};

exports.clear     = db_clear;
exports.find      = db_find;
exports.set       = db_save;
exports.delete    = db_delete;
