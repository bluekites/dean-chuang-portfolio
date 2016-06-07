$(document).ready(function(){
  
  // scrolling effects
  $(window).scroll(function(){
    // declaring windowScroll
    var windowScroll = $(this).scrollTop();
    
    // masthead parallax effect
    $('#logo').css({
      'transform': 'translate(0px, ' + windowScroll/2 + '%)'
    });
    
    // project section parallax effect
    $('.row').each(function(i){
      // won't trigger until the rows are within 50% of the browser
      if(windowScroll > $('.row').eq(i).offset().top - ($(window).height() / 1.3)) {
        if(i % 2 === 0) {
          $('.row').eq(i).addClass('evenshow');
        } else {
          $('.row').eq(i).addClass('oddshow');
        }
      }
    });
    
    // form fade effect
    if(windowScroll > $('#contact-section').offset().top - ($(window).height() / 1.4)) {
      $('form').css('opacity', '1');
    }
  });
  
  // project section overlay
  $('.overlay-container').on('mouseenter', function(){
    $(this).children('img').addClass('zoom-in');
    $(this).children('.overlay').fadeToggle('slow');
  }).on('mouseleave', function(){
    $(this).children('img').removeClass('zoom-in');
    $(this).children('.overlay').fadeToggle('slow');
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
        $('#email').val('');
        $('#name').val('');
        $('#content').val('');
        message.text('Message sent! Thank you for contacting me!');
      }
    });
  });
});