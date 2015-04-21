$(document).ready(function() {
  $('#developmentNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#development").offset().top
    }, 800);
  });

  $('#designNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#design").offset().top
    }, 800);
  });

  $('#consultingNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#consulting").offset().top
    }, 800);
  });

  $('#startNav').click(function() {
    $('html, body').animate({
      scrollTop: $("#start").offset().top
    }, 800);
  });
});