$(document).ready(function(){

  /* IE FALLBACK FOR GRAPHS */
  if ( $.browser.msie && $.browser.version < 9 || $(window).width()<700) {
      $('canvas').remove();
      $('.slide:eq(0)').css('background-image', 'url("++theme++unweb.me/images/slider/slideshow_social_media.png")');
      $('.slide:eq(1)').css('background-image', 'url("++theme++unweb.me/images/slider/slideshow_business.png")');
      $('.slide:eq(2)').css('background-image', 'url("++theme++unweb.me/images/slider/slideshow_egovernment.png")');
  } else {
    var pi1 = new Processing(document.getElementById("canvas0"), sl1),
      pi2 = new Processing(document.getElementById("canvas1"), sl2),
      pi3 = new Processing(document.getElementById("canvas2"), sl3);
      pi2.noLoop();
      pi3.noLoop();
  }

  /* SLIDESHOW */
         
  var currentPosition = 0,
      slides = $('.slide'),
      slideWidth = slides.outerWidth(true),
      container = $('#image-slider'),
      numberOfSlides = slides.length,
      resizeTimeout;
      
  

  // Set sliding timeout.
  var autoSlideTimeout = setTimeout(function() {
    if (!container.hasClass('hover')) transition('right');
        refreshTimeout();
  }, 7000);
  
  // Slide down container
  container.slideDown(500);
  // Remove scrollbar in JS
  $('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
  .wrapAll('<div id="slideInner"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left'
  });
    
  if (slides.length>1) {
    
    // Insert left and right arrow controls in the DOM
    container
    .prepend('<span class="control" id="leftControl">Move left</span>')
    .append('<span class="control" id="rightControl">Move right</span>');

    // Insert a copy of the first slide at the end,
    // update 'slides' variable and remove the
    // canvas from the copied slide.
    $('#slideInner').append(slides.first().clone(true));
    slides = $('.slide');
    slides.last().children('canvas').remove();
    
    
    // Set #slideInner width equal to total width of all slides (plus one)
    $('#slideInner').css('width', slideWidth * (numberOfSlides + 1));
  
    // Create event listeners for .controls clicks
    $('.control')
    .bind('click', function(){
      var id = $(this).attr('id');
      
      if ($(this).attr('id') == 'rightControl') transition('right'); else transition('left');
      
      // Clear the autoslide timeout.
      clearTimeout(autoSlideTimeout);      
    });
    
    // The actual slide transition function.
    var transition = function(direction) {
      // Resolve boundary conditions and move canvases correctly.
      slideWidth = slides.outerWidth(true);
      if (direction == 'right' && currentPosition == numberOfSlides) {
        currentPosition = 0;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
        slides.first().append(slides.last().children('canvas'));
      } else if (direction == 'left' && currentPosition == 0) {
        currentPosition = numberOfSlides;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
        slides.last().append(slides.first().children('canvas'));
      }
      if (direction == 'right' && currentPosition == numberOfSlides - 1) {
        slides.last().append(slides.first().children('canvas'));
      }
      if (direction == 'left' && currentPosition == 1) {
        slides.first().append(slides.last().children('canvas'));
      }
      
      // Determine new position.
      currentPosition = direction == 'right' ? currentPosition + 1 : currentPosition - 1;
      
      // Move slideInner using margin-left
      $('#slideInner').filter(':not(:animated)').animate({
        'marginLeft' : slideWidth*(-currentPosition)
      });
      
      // Disable invisible sketches.
      $('.processing-canvas').each(function() {
        try{var inst = Processing.getInstanceById($(this).attr('id'));} catch(err){}
        if (inst != undefined)  { inst.noLoop(); }
      });
      try {
        Processing.getInstanceById($(slides[currentPosition]).children('canvas').attr('id')).loop();
      } catch(err) {}
    }
    
    // Refresh timeout.
    var refreshTimeout = function() {
      clearTimeout(autoSlideTimeout);
      autoSlideTimeout = setTimeout(function() {
        if (!container.hasClass('hover')) transition('right');
        refreshTimeout();
      }, 7000);
    }
    
    // Bind to resize event
    $(window).resize(function() {
      try{
      	clearTimeout(timeout);
      } catch (err) {}
      resizeTimeout = setTimeout(function() {
        slideWidth = slides.outerWidth(true);
      }, 200);
    });
    
    // Clicking on site categories triggers a rollup of the slider window.
    $('#nav a').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      $('#image-slider').slideUp(300, function() {
        window.location = $this.attr('href');
      });
      
      return false;
    });
    
    // Add 'hover' class to container when mouseover
    $('#slidesContainer').mouseenter(function() {
      container.addClass('hover');
      $('.control').fadeTo(300, 0.3);
    });
    $('#slidesContainer').mouseleave(function() {
      container.removeClass('hover');
      $('.control').fadeTo(300, 1.0);
    });
  }
  
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
