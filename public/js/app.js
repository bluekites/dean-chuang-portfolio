$(document).ready(function(){
  
  
  var email;
  var name;
  var content;
  var message = $('#message');
  $('#submit').click(function(){
    email = $('#email').val();
    name = $('#name').val();
    content = $('#content').val();
    message.text('Sending your message...Please wait');
    $.get('/send', {email: email, name: name, content: content}, function(data){
      if(data === 'sent') {
        message.text('Message sent! Thank you for contacting us!');
      }
    });
  });
});