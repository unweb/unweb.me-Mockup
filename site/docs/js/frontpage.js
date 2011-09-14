$(document).ready(function(){
  
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
  }, 6000);
  
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
        var inst = Processing.getInstanceById($(this).attr('id'));
        inst.noLoop();
      });
      Processing.getInstanceById($(slides[currentPosition]).children('canvas').attr('id')).loop();
    }
    
    // Refresh timeout.
    var refreshTimeout = function() {
      clearTimeout(autoSlideTimeout);
      autoSlideTimeout = setTimeout(function() {
        if (!container.hasClass('hover')) transition('right');
        refreshTimeout();
      }, 6000);
    }
    
    // Bind to resize event
    $(window).resize(function() {
      clearTimeout(timeout);
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
    container.mouseenter(function() {
      container.addClass('hover');
    });
    container.mouseleave(function() {
      container.removeClass('hover');
    });
  } 
});
