var express = require('express');
var path = require('path');
var sass = require('node-sass-middleware');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
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

// mailer smtpTransporter configuration
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  secureConnection: false,
  port: 587,
  auth: {
    user: EMAIL.username,
    pass: EMAIL.password
  }
}));

// set up public directory to serve files
app.use(express.static(filePath));


// root path serves up index.html
app.get('/', function(req, res){
  res.sendFile('index.html');
});

// mailer request
app.get('/send', function(req, res){
  var mailerOptions = {
    to: 'azurenokite@gmail.com',
    from: req.query.email,
    subject: req.query.name,
    text: req.query.content
  };
  console.log(mailerOptions);
  transporter.sendMail(mailerOptions, function(err, info){
    if(err){
      return console.log(err);
    } 
    console.log('Message sent successfully! ' + info.response);
    res.end('sent');
  });
});

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});