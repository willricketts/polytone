$(document).ready(function() {

  // ELEMENT SETUP

  $('#hello').hide();
  $("#hello").fadeIn(1000);



  // NAV CLICK-SCROLL BEHAVIORS

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


  //CONTACT FORM SUBMIT

  $('#contactSubmit').click(function() {

    var name = $("#nameField").val();
    var email = $("#emailField").val();
    var phone = $("#phoneField").val();
    var message = $("#messageField").text();

    var data = {
      name: name,
      phone: phone,
      message: message,
      email: email
    };

    $.ajax({
      type: "POST",
      url: '/contact',
      data: data
    }, function(result) {
      if(data == { status: 'success' }) {

      }
      else {
        alert('There was a problem');
      }
    });
    return false;
  });
});