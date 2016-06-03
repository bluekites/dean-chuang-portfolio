var express = require('express');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;
var filePath = path.resolve(__dirname, 'public');

// set up public directory to serve files
app.use(express.static(filePath));

// root path serves up index.html
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});