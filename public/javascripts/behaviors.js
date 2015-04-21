$(document).ready(function() {

  $('#hello').hide();
  $("#hello").fadeIn(1000);

  $('#developmentNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#development").offset().top
    }, 800);
    return false;
  });

  $('#designNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#design").offset().top
    }, 800);
    return false;
  });

  $('#consultingNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#consulting").offset().top
    }, 800);
    return false;
  });

  $('#startNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#start").offset().top
    }, 800);
    return false;
  });

  $('#contactSubmit').click(function() {

    var name = $("#nameField").val();
    var phone = $("#phoneField").val();
    var message = $("#messageField").val();

    var data = {
      name: name,
      phone: phone,
      message: message
    };

    $.ajax({
      type: "POST",
      url: '/contact',
      data: data
    }, function(result) {
      if(data == { status: 'success' }) {
        return false;
      }
      else {
        alert('There was a problem');
      }
    });
  });
});