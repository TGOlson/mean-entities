var express = require('express');
var mongoose = require('mongoose');
var Q = require('q');

var app = express();

mongoose.connect('mongodb://localhost/test');

var personSchema = {
  name: String
};

var Person = mongoose.model('Person', personSchema, 'people');

app.use(express.json());
app.use(express.static(__dirname + '/public'));		// this serves static files from the public dir as the root context

app.get('/people', function(req, res){


//    var id = res.body.id
//    var args = {name: 'Tyler'}
      var args;

    entityAction('count', args).then(function(result){
      console.log(result)
    })

    entityAction('find', args).then(function(result){

      res.send(result);

    }, function(error){

      console.log('errorrrrrrrr', error);

    });



});



var entityAction = function(action, args){
  return Q.ninvoke(Person, action, args);
};



//
//var entityCreate = function(model, doc){
//  return Q.ninvoke(model, 'create', doc);
//};



app.post('/people', function(req, res){
  console.log(req.body);

  var newPerson = req.body

  entityAction('create', newPerson).then(function(result){

    res.send('success');


  }, function(error){

    console.log('error', error);

  });


});

app.listen(3000);