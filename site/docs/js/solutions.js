$(document).ready(function(){
  
//  $('.project-column').find('img').reflect();
  $('.solutions-image').reflect();
  
  // Expand contact section in footer
  $('#footer-click').click(function() {
    if (!$('#footer-expand').is(':visible')) {
      $("html, body").animate({ scrollTop: $(document).height() + $('#footer-expand').outerHeight(true) }, 500);
      $('#footer-expand').slideDown(400);
    } else {
      $("html, body").animate({ scrollTop: $(document).height() - $('#footer-expand').outerHeight(true) }, 500);
      $('#footer-expand').slideUp(400);
    }
  });
});
