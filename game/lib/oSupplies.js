var db_supplie_clear = function (db){
  db.collection('supplies').remove();
};
var db_supplie_find = function (client,db,people){
   online = [];
  for(i in people[client.room]){
    if(i != client.id)
      online.push(people[client.room][i]);
  }
  db.collection('supplies').find({dono:{$in:online}},
      function(err,docs){
        for(i in docs){
          docs[i].db = true;
          client.emit('client_get_supplies',docs[i]);
        }
      }
  );
};
var db_supplie_save = function (client,db,soldier,people){
    console.log('insert supplies - ',soldier);
    db.collection('supplies').save(soldier, function(err, saved) {
      if( err || !saved ) {
        client.emit("update", "You NOT insert soldier.");//update you
      }else{
        client.emit("client_get_supplies",saved);
        saved.db = true;
        client.to(client.room).broadcast.emit("client_get_supplies",saved);
      }
    });
};
var db_supplie_delete = function (client,db,dono,soldier){
    console.log('remmove  supplie',dono,soldier);
    if(soldier == false){
      db.collection('supplies').remove({dono:dono});
    }else{
      db.collection('supplies').remove({_id:soldier});
    }
};
var set_supplie = function (socket,db,soldier,people){
     return db_supplie_save(socket,db,soldier,people);
};
var get_supplie = function (socket,db,people){
     db_supplie_find(socket,db,people);
};
var delete_supplie = function (socket,db,dono,soldier){
     db_supplie_delete(socket,db,dono,soldier);
};

exports.clear        = db_supplie_clear;
exports.get_supplies = get_supplie;
exports.set_supplies = set_supplie;
exports.delete_supplies = delete_supplie;
