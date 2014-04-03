var express = require('express');
var mongoose = require('mongoose');
var Q = require('q');

var app = express();

mongoose.connect('mongodb://localhost/test');


var entitySchema = { 
  type: String,
  name: String,
  ideas: Array
};



var Entity = mongoose.model('Entity', entitySchema)


app.use(express.json());
app.use(express.static(__dirname + '/public'));		// this serves static files from the public dir as the root context

app.get('/entities', function(req, res){

    var args;

    // entityAction('count', args).then(function(result){
    //   // console.log(result)
    // })

    entityAction('find', args).then(function(result){
      res.send(result);
    }, function(error){
      console.log('errorrrrrrrr', error);
    });

});



app.post('/entities', function(req, res){

  var newEntity = req.body

  entityAction('create', newEntity).then(function(result){

    // if it comes with a question attached
    if(newEntity.question){

        var qId = newEntity.question._id;
        entityAction('update', {_id: qId}, {$push: {ideas: result}})

    } else {
      console.log('not an idea')
    }

    res.send('success');

  }, function(error){
    console.log('error', error);
  });


});


var entityAction = function(action, argOne, argTwo){
  if(argTwo){
    return Q.ninvoke(Entity, action, argOne, argTwo); 
  } else {
    return Q.ninvoke(Entity, action, argOne); 
  }
};

app.listen(3000);
