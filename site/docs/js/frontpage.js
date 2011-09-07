$(document).ready(function(){
  
  /* SLIDESHOW */
  
  var currentPosition = 0;
  var slideWidth = $('.slide').outerWidth(true);
  var slides = $('.slide');
  var numberOfSlides = slides.length;
  var timeout;
  
  // Slide down container
  $('#image-slider').slideDown(500);
  // Remove scrollbar in JS
  $('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
  .wrapAll('<div id="slideInner"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
    'width' : $('.slide').width()
  });
  
  if ($('.slide').length>1) {
    
    // Insert left and right arrow controls in the DOM
    $('#slideshow')
    .prepend('<span class="control" id="leftControl">Move left</span>')
    .append('<span class="control" id="rightControl">Move right</span>');

    // Insert a copy of the first slide at the end 
    $('#slideInner').append($('.slide').first().clone(true));
    $('.slide').last().children('canvas').attr('data-processing-sources', '');
    
    // Set #slideInner width equal to total width of all slides (plus one)
    $('#slideInner').css('width', slideWidth * (numberOfSlides + 1));
  
    // Create event listeners for .controls clicks
    $('.control')
    .bind('click', function(){
      var id = $(this).attr('id');
      
      // Clear the autoslide timeout.
      clearInterval(autoSlideTimeout);
      
      if ($(this).attr('id') == 'rightControl') transition('right'); else transition('left');
    });
    
    var transition = function(direction) {
      // Resolve boundary conditions and move canvases correctly.
      if (direction == 'right' && currentPosition == numberOfSlides) {
        currentPosition = 0;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
        $('.slide').first().append($('.slide').last().children('canvas'));
      } else if (direction == 'left' && currentPosition == 0) {
        currentPosition = numberOfSlides;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
        $('.slide').last().append($('.slide').first().children('canvas'));
      }
      if (direction == 'right' && currentPosition == numberOfSlides - 1) {
        $('.slide').last().append($('.slide').first().children('canvas'));
      }
      if (direction == 'left' && currentPosition == 1) {
        $('.slide').first().append($('.slide').last().children('canvas'));
      }
      
      // Determine new position.
      currentPosition = direction == 'right' ? currentPosition + 1 : currentPosition - 1;
      
      // Move slideInner using margin-left
      $('#slideInner').animate({
        'marginLeft' : slideWidth*(-currentPosition)
      });
      
      // Disable invisible sketches. Needs proper implementation
      //$('.processing-canvas').each(function() {
      //  console.log(this);
      //});
      //$('#canvas'+currentPosition).processing.loop();
    }
    
    // Set sliding timeout.
    var autoSlideTimeout = setInterval(function() {
      transition('right');
    }, 6000);
    
    // Bind to resize event
    $(window).resize(function() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        slideWidth = $('.slide').outerWidth(true);
        slides = $('.slide');
      }, 200);
    });
    
    // Clicking on site categories triggers a rollup of the slider window.
    $('.category-link').click(function(e) {
      var $this = $(this);
      e.preventDefault();
      $('#image-slider').slideUp(300, function() {
        window.location = $this.attr('href');
      });
      
      return false;
    });
  } 
});
