var db_villa_clear = function (db){
  db.collection('villas').remove();
};
var db_villa_update = function (client,db,data){
  console.log('villa update',data);
  db.collection('villas').findAndModify({
      query: { dono:data.dono},
      update: { $set: data }
  }, function(a,b,c) {
       //console.log(a,b,c);
       for(i in data )
        b[i] = data[i];
       client.emit("client_update_villa",b);
       client.broadcast.emit("client_update_villa",b);
  });
};
var db_villa_find = function (client,db,people){
   online = [];
  for(i in people[client.room]){
    if(i != client.id)
      online.push(people[client.room][i]);
  }
  db.collection('villas').find({dono:{$in:online}},
      function(err,docs){
        for(i in docs){
          docs[i].db = true;
          client.emit('client_get_villa',docs[i]);
        }
      }
  );
};
var db_villa_save = function (client,db,soldier,people){
    db.collection('villas').find({dono:soldier.dono},
        function(err,docs){
         if(docs.length > 0){ // if user have villa activate
          for(i in docs){
            client.emit('client_get_villa',docs[i]);
            docs[i].db = true;
            client.to(client.room).broadcast.emit("client_get_villa",docs[i]);
            console.log(docs[i]);
          }
         }else{  //new villa for that user
            if(!soldier.db){
              db.collection('villas').save(soldier, function(err, saved) {
                if( err || !saved ) {
                   client.emit("update", "You NOT insert soldier.");//update you
                }else{
                   client.emit("client_get_villa",saved);
                   saved.db = true;
                   client.to(client.room).broadcast.emit("client_get_villa",saved);
                   console.log(saved);
                }
              });
            }
          }
        }
    );
};
var db_villa_delete = function (client,db,dono,soldier){
    console.log('remmove  villa',dono,soldier);
    if(soldier == false){
      db.collection('villas').remove({dono:dono});
    }else{
      db.collection('villas').remove({_id:soldier});
    }
};
var set_villa = function (socket,db,soldier,people){
     return db_villa_save(socket,db,soldier,people);
};
var get_villa = function (socket,db,people){
     db_villa_find(socket,db,people);
};
var delete_villa = function (socket,db,dono,soldier){
     db_villa_delete(socket,db,dono,soldier);
};
var update_villa = function (socket,db,data){
     db_villa_update(socket,db,data);
};
exports.clear     = db_villa_clear;
exports.get_villa = get_villa;
exports.set_villa = set_villa;
exports.update     = update_villa;
exports.delete_villa = delete_villa;
