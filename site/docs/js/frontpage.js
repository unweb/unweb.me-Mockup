$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = $('.slide').outerWidth(true);
  var slides = $('.slide');
  var numberOfSlides = slides.length;

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
    
    // Set #slideInner width equal to total width of all slides (plus one)
    $('#slideInner').css('width', slideWidth * (numberOfSlides + 1));
  
    // Create event listeners for .controls clicks
    $('.control')
    .bind('click', function(){
      var id = $(this).attr('id');
      
      clearInterval(autoSlideTimeout);
      
      if ($(this).attr('id') == 'rightControl') transition('right'); else transition('left');
    });
    
    var transition = function(direction) {
      // Resolve boundary conditions
      if (direction == 'right' && currentPosition == numberOfSlides) {
        currentPosition = 0;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
      } else if (direction == 'left' && currentPosition == 0) {
        currentPosition = numberOfSlides;
        $('#slideInner').css({
          'marginLeft' : slideWidth*(-currentPosition)
        });
      }
      
      // Determine new position
      currentPosition = direction == 'right' ? currentPosition + 1 : currentPosition - 1;
      
      // Move slideInner using margin-left
      $('#slideInner').animate({
        'marginLeft' : slideWidth*(-currentPosition)
      });
    }
    
    // Set sliding timeout.
    var autoSlideTimeout = setInterval(function() {
      transition('right');
    }, 6000)
  }
  });