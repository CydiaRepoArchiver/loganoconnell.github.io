jQuery(document).ready(function($){

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  
  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  }  
  
  
  // Scroll +1px - big fix
  $(window).scrollTop($(window).scrollTop()+1);
  
  
  // niceScroll
  $("html").niceScroll();
    
    
  // Stick menu
  $(".menu").sticky({topSpacing:0});




  // Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+105,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault();
       
	var target = $(this).attr("href");

  if (topMenu.is(":visible")) {

    if (target === "#about-us") {

      $('html, body').stop().animate({ scrollTop: $(target).offset().top-140 }, 1500, "easeInOutExpo");
    }

    else {

      $('html, body').stop().animate({ scrollTop: $(target).offset().top-90 }, 1500, "easeInOutExpo");
    }
  }

  else {

    if (target === "#about-us") {

      $( " ul.menu-click" ).slideUp( "slow", function() {

        $('html, body').stop().animate({ scrollTop: $(target).offset().top-50 }, 1500, "easeInOutExpo");
      });
    }

    else if (target === "#home" || target === "#portfolio" || target === "#contact") {

      $( " ul.menu-click" ).slideUp( "slow", function() {

        $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1500, "easeInOutExpo");
      });
    }

    else {

      return true;
    }
  }
			
	return false;
   });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
  });  
  

  //portfolio - opacity
  $('.grid .text').hover(
    function () {
      $(this).animate({opacity:'1'});
    },
    function () {
      $(this).animate({opacity:'0'});
    }
  );    


  if ( $(window).width() > 1023) {     

    tiles = $("p, h1, h2, h3, .column-one, .column-two, .column-three, .start-page .content .text, hr, .grid li, .contact .content .form, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d,h) {
      tiles.each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) {

            if ($(this).is(".header")) {

              $(this).fadeTo(1000, 1);
              $(this).animate({ color:"white" }, 500);
            }

            else {

              $(this).fadeTo(1000, 1);
            }
          }
      });
    });

  }
  else {

    $(".header").css({ color:"white" });
  }


  //Menu mobile click
  $( ".icon" ).click(function() {
    $( " ul.menu-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });
    
  $(window).resize(function() {
 
    if (($(window).width()) > "767") {
 
        $(" ul.menu-click" ).hide();
    }
  });  

  $("#signup-form").submit(function(event) {

    event.stopPropagation();
    event.preventDefault();

            $.ajax({
              type: "POST",
              url: "https://mandrillapp.com/api/1.0/messages/send.json",
              data: {
                'key': 'ILwuNA4aVDtau50vvho8ew',
                'message': {
                  'from_email': document.getElementById("your-email").value,
                  'to': [
                      {
                        'email': 'logan.developeremail@gmail.com',
                        'name': '',
                        'type': 'to'
                      },
                    ],
                  'autotext': 'true',
                  'subject': 'Contact Form',
                  'html': document.getElementById("message").value + " - " + document.getElementById("your-name").value
                }
              }
             }).done(function(response) {
               // Reset form.
                $("#signup-form")[0].reset();

              // Enable submit.
                $(".send").val("Thank you!");

             });

  });

  
});
