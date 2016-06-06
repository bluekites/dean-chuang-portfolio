$(document).ready(function(){
  // masthead parallax effect
  $(window).scroll(function(){
    var windowScroll = $(this).scrollTop();
    console.log(windowScroll);
    $('#logo').css({
      'transform': 'translate(0px, ' + windowScroll/2 + '%)'
    });
  });
  
  
  // Contact Form
  var email;
  var name;
  var content;
  var message = $('#message');
  $('#submit').click(function(e){
    e.preventDefault();
    email = $('#email').val();
    name = $('#name').val();
    content = $('#content').val();
    message.text('Sending your message...Please wait');
    $.get('/send', {email: email, name: name, content: content}, function(data){
      if(data === 'sent') {
        message.text('Message sent! Thank you for contacting me!');
      }
    });
  });
});