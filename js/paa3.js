// check width for options(services)
checkWidth();
$(window).resize(checkWidth);

//document ready
welcome();
typeHeader();
navLinks();
labelScroll();
navPos();
$('.navbar li:nth-child(1)').addClass('active'); 
carouselAbout();
flexCards();
forModal();
forTabs();
forDialogs();
autoComplete();
validateForm();

// functions
function typeHeader() {
  let typed = new Typed('.typing', {
    strings:['photos.', 'videos.', 'animations.'],
    typeSpeed: 90,
    backSpeed: 45,
    loop: true
  });
}
function navPos() {
  $(window).scroll(function() {
    var _wscoll = $(window).scrollTop();
    if(_wscoll > 758){
      $('.navbar').css('position','fixed');
    }else {
      $('.navbar').css('position','sticky');
    }
  })
}
function navLinks() {
  var a = $('.navbar-toggler').is(':visible');
  if(!a){
    $(window).scroll(function() {
      var menu1 = $('#home').offset().top;
      var menu2 = $('#about').offset().top;
      var menu3 = $('#services').offset().top;
      var menu4 = $('#contact').offset().top;
      var _wscoll = $(window).scrollTop();
      if ( _wscoll >= menu1 && _wscoll < 684 ) {
        $('.navbar  li:nth-child(1)').addClass('active');
        $('.navbar  li:nth-child(2),  .navbar li:nth-child(3), .navbar li:nth-child(4)').removeClass('active');
      } else if ( _wscoll >= 684 && _wscoll < 1380 ) {
        $('.navbar li:nth-child(2)').addClass('active');
        $('.navbar li:nth-child(1), .navbar li:nth-child(3), .navbar li:nth-child(4)').removeClass('active');
      } else if ( _wscoll >= 1380 && _wscoll < 2044 ) {
        $('.navbar li:nth-child(3)').addClass('active');
        $('.navbar li:nth-child(1), .navbar li:nth-child(2), .navbar li:nth-child(4)').removeClass('active');
      } else if ( _wscoll >= 2044 ) {
        $('.navbar li:nth-child(4)').addClass('active');
        $('.navbar li:nth-child(1),.navbar li:nth-child(2),.navbar li:nth-child(3)').removeClass('active');
      } else {
        $('.navbar li:nth-child(1), .navbar li:nth-child(2), .navbar li:nth-child(3), .navbar li:nth-child(4)').removeClass('active');  
      }
    });
  }
}
function labelScroll() {
  $(window).scroll(function() {
    $('.about .section-label-txt').css("bottom", Math.max(500 - 0.35*window.scrollY) + "px");
    $('.services .section-label-txt').css("bottom", Math.max(770 - 0.35*window.scrollY) + "px");
    $('.contact .section-label-txt').css("bottom", Math.max(1010 - 0.35*window.scrollY) + "px");
    var a = $('.about .section-label-txt').css("bottom");
    var c = $('.services .section-label-txt').css("bottom");
    var r = $('.contact .section-label-txt').css("bottom");

    if(a >= '190px' && a < '260px'){
      $('.about .section-label-txt').css("color", "orange");
      $('.about .section-content').css("opacity", "1" );
    } else if (c >= '210px' && c < '294px'){
      $('.services .section-label-txt').css("color", "orange" );
      $('.services .section-content').css("opacity", "1" );
    } else if (r >= '0px' && r < '300px'){
      $('.contact .section-label-txt').css("color", "orange" );
      $('.contact .section-content').css("opacity", "1" );
    } else{
      $('.about .section-label-txt').css("color", "black");
      $('.services .section-label-txt').css("color", "black");
      $('.contact .section-label-txt').css("color", "black" );
    }
  });
}
function welcome() {
  $('.welcome h1').click(function() {
    $('.welcome').css("opacity", "0");
    $('.welcome').css("z-index", "-10");
    $('.welcome').css("transition", "1s ease-out");
  })
}
function carouselAbout() {
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}
function flexCards() {
  $('.option').click(function() {
    $('.option').removeClass('active');
    $(this).addClass('active');
    playGIF();
  });
  playGIF();
}
function playGIF() {
  if($('.pic').hasClass('active')){
    $('.pic').css("background-image", "url(./assets/paa3/photos.gif)");
    $('.vid').css("background-image", "url(./assets/paa3/cover2.jpg)");
    $('.anim').css("background-image", "url(./assets/paa3/cover3.jpg)");
  }else if($('.vid').hasClass('active')){
    $('.pic').css("background-image", "url(./assets/paa3/cover1.jpg)");
    $('.vid').css("background-image", "url(./assets/paa3/videos.gif)");
    $('.anim').css("background-image", "url(./assets/paa3/cover3.jpg)");
  }else if($('.anim').hasClass('active')){
    $('.pic').css("background-image", "url(./assets/paa3/cover1.jpg)");
    $('.vid').css("background-image", "url(./assets/paa3/cover2.jpg)");
    $('.anim').css("background-image", "url(./assets/paa3/anim.gif)");
  } 
}
function forModal() {
  $.fn.animatedModal = function (options) {
    var modal = $(this);
    //Defaults
    var settings = $.extend({
        modalTarget: modal.attr('href').replace('#', ''),
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndexIn: '9999',
        zIndexOut: '-9999',
        color: '#39BEB9',
        opacityIn: '1',
        opacityOut: '0',
        animatedIn: 'zoomIn',
        animatedOut: 'zoomOut',
        animationDuration: '.6s',
        overflow: 'auto',
        // Callbacks
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
    }, options);
    var closeBt = $('.close-' + settings.modalTarget);
    var href = $(modal).attr('href'),
        id = $('body').find('#' + settings.modalTarget),
        idConc = '#' + id.attr('id');
    id.addClass('animated');
    id.addClass(settings.modalTarget + '-off');
    var initStyles = {
        'position': settings.position,
        'width': settings.width,
        'height': settings.height,
        'top': settings.top,
        'left': settings.left,
        'background-color': settings.color,
        'overflow-y': settings.overflow,
        'z-index': settings.zIndexOut,
        'opacity': settings.opacityOut,
        '-webkit-animation-duration': settings.animationDuration,
        '-moz-animation-duration': settings.animationDuration,
        '-ms-animation-duration': settings.animationDuration,
        'animation-duration': settings.animationDuration
    };
    id.css(initStyles);
    modal.click(function (event) {
        event.preventDefault();
        $('body, html').css({ 'overflow': 'hidden' });
        if (href == idConc) {
            if (id.hasClass(settings.modalTarget + '-off')) {
                id.removeClass(settings.animatedOut);
                id.removeClass(settings.modalTarget + '-off');
                id.addClass(settings.modalTarget + '-on');
            }

            if (id.hasClass(settings.modalTarget + '-on')) {
                settings.beforeOpen();
                id.css({ 'opacity': settings.opacityIn, 'z-index': settings.zIndexIn });
                id.addClass(settings.animatedIn);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
            };
        }
    });
    closeBt.click(function (event) {
        event.preventDefault(); 
        $('body, html').css({ 'overflow': 'auto' });
        settings.beforeClose(); //beforeClose
        if (id.hasClass(settings.modalTarget + '-on')) {
            id.removeClass(settings.modalTarget + '-on');
            id.addClass(settings.modalTarget + '-off');
        }
        if (id.hasClass(settings.modalTarget + '-off')) {
            id.removeClass(settings.animatedIn);
            id.addClass(settings.animatedOut);
            id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
        };
    });
    function afterClose() {
        id.css({ 'z-index': settings.zIndexOut });
        settings.afterClose(); //afterClose
    }
    function afterOpen() {
      settings.afterOpen(); //afterOpen
    }
  }
  //after click
  $("#modal-box-pic").animatedModal({
    color:'white',
  });
  $("#modal-box-vid").animatedModal({
    color:'white',
  });
  $("#modal-box-anim").animatedModal({
    color:'white',
  });
  $("#modal-box-terms").animatedModal({
    color:'white',
  });
}    
function forTabs() {
  $( "#tabs-pic" ).tabs({
    event: "mouseover"
  });
  $( "#tabs-vid" ).tabs({
    event: "mouseover"
  });
  $( "#tabs-anim" ).tabs({
    event: "mouseover"
  });
}
function forDialogs() {
  $("#dialog-team").dialog({
    modal: true,
    autoOpen: false,
    closeOnEscape: true,
    draggable: false,
    title: "Digital Studios Team",
    width: 400,
    height: 400,
    show: {
      effect: 'clip',
      duration: 500
    },
    hide: {
      effect: 'clip',
      duration: 500
    },
    open: function(event, ui) {
        $(event.target).dialog('widget')
            .css({ position: 'fixed' })
            .position({ my: 'center', at: 'center', of: window });
    },
    resizable: false
  });
  $("#show-team").click(function () {
    $('#dialog-team').dialog('open');
  });
}
function autoComplete() {
  var availTags = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
  ];
  $('#email').autocomplete({
    source: availTags,
    minLength: 1
  });
}
function validateForm() {
  var form = $('#contact-form');
  $.validator.addMethod("noSpace", function(value, element) {
    return value == '' || value.trim().length != 0
  }, "This cannot start with a space.");
  $.validator.addMethod("noNumber", function(value, element) {
    var a = /\d/.test(value);
    return !a;
  }, "This contains letters only.");
  if(form.length){
    form.validate({
      rules: {
        fname: {
          required: true,
          noSpace: true,
          noNumber: true
        },
        lname: {
          required: true,
          noSpace: true,
          noNumber: true
        },
        email: {
          required: true,
          noSpace: true,
          email: true
        },
        address: {
          required: true
        },
        terms: {
          required: true
        }
      },
      messages: {
        address: {
          required: "Please select your city.",
        },
        terms: {
          required: "!"
        }
      },
      errorPlacement: function(error, element) {
        if(element.is(':checkbox')){
          error.appendTo(element.parent('.form-check'));
        }else {
          error.insertAfter(element);
        }
      }
    });
  }
}
function clickSubmit() {
  // $('#modal-submit').modal('hide');
  var a = $('#contact-form').valid();
  $('#submit-contact').click(function(e) {
    if(a){
      $('#modal-submit').modal();
      e.preventDefault();
    }
  });
}
function checkWidth() {
  var windowsize = $(window).width();
  if (windowsize < 992) {
    $('.pic').removeClass('active');
  }else {
    $('.pic').addClass('active');
  }
  forDialogs();
  flexCards();
}