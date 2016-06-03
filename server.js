var express = require('express');
var path = require('path');
var sass = require('node-sass-middleware');
var app = express();

var EMAIL = require('../hidden_data/email'); // environment variable for mailing information
var PORT = process.env.PORT || 3000;
var filePath = path.resolve(__dirname, 'public');
var sassPath = path.resolve(__dirname, 'sass');


// set up sass middleware to convert scss into css
app.use(
  sass({
    src: sassPath,
    dest: filePath + '/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css' // crucial line to get the css rendered to the right place
  })
);

// set up public directory to serve files
app.use(express.static(filePath));

// root path serves up index.html
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});