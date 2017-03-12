// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
  var data = fs.readFileSync('./data.json');
  res.json(JSON.parse(data));
});

app.post('/contactlist', function (req, res) {
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  console.log(req.body);
  json.data.push(req.body);
  console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  json.data.splice(id,1);
  console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  json.data.splice(id, 1, req.body);
  console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));  
});

app.listen(3000);
console.log("Server running on port 3000");