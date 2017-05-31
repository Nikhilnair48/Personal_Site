$(document).ready(function(){
  	$('body').append('<div id="toTop" class="btn btn-info"><span class="glyphicon glyphicon-chevron-up"></span> Top</div>');
	$(window).scroll(function () {

		// ONCE THE USER STARTS SCROLLING, ADD BACKGROUND TO THE NAVBAR
		if ($(this).scrollTop() > $(".overlay").offset().top) {
			$('#toTop').fadeIn();
			$('#navColor').addClass('navbar-below-main');
		} else {
			$('#toTop').fadeOut();
			$('#navColor').removeClass('navbar-below-main');
		}
	}); 

	// ACTIVATED BY TO THE TOP BUTTON
	$('#toTop').click(function(){
    	$("html, body").animate({ scrollTop: 0 }, 600);
    	return false;
	});

	setTimeout(function() {
		$("img:hidden:first").fadeIn();
		$("img:hidden:first").fadeIn(450);
	}, 4500);

	
});

var currentSectionID = "#myCarousel";

// TO HANDLE MOUSE HOVERING OVER THE MENU ITEMS
// HANDLE THIS IN JQUERY INSTEAD OF CSS, BECAUSE 
// THE BACKGROUND CHANGES AS WE SCROLL DOWN, SO THE
// COLORS NEED TO BE ADJUSTED PROPERLY.
////.navbar-nav > li > a:focus, .navbar-nav > li > a:focus, #animatedParent > li > a:focus
$("#animatedParent > li > a").hover(
	function() {
		var scroll = $(window).scrollTop();
		if(scroll > $(".overlay").offset().top) {
			$(this).css('border-bottom','3px solid black');
		} else {
			$(this).css('color', 'white');
		}
	}, function() {
		var scroll = $(window).scrollTop();
		if(scroll > $(".overlay").offset().top) {
			$(this).css('border-bottom', 'none');
			$("#animatedParent > li[class='active'] > a").css('border-bottom','none');
		} else {
			console.log("scroll is " + scroll + "\t")
			$(this).css('color', 'rgb(157, 157, 157)');
			$("#animatedParent > li[class='active'] > a").css('color','white');
			//$("#animatedParent > li").not('.active').css('color', 'rgb(157, 157, 157)');
		}
	}
);

// SELECT ALL NAVBAR ITEMS THAT ARE ACTIVE AND GIVE THEM APPROPRIATE COLORS
$(window).scroll(function(event) {
	var scroll = $(window).scrollTop();
	// USER HAS SCROLLED ENOUGH, NAVBARS' BACKGROUND HAS CHANGED
	if(scroll > $(".overlay").offset().top) {
		$("ul > li > a")
			.css('color', 'rgb(157, 157, 157)')
			.css('background','transparent')
			.css('border-bottom','none');
		$("ul > li[class='active'] > a")
			.css('color', 'rgb(157, 157, 157)')
			.css('background','transparent')
			.css('border-bottom','3px solid black');
	} else {	// WHEN THE USER HASN'T SCROLLED DOWN FAR ENOUGH
		$("ul > li > a").css('color', 'rgb(157, 157, 157)');
		$("ul > li[class='active'] > a").css('color', 'white');
	}
});
//$("ul[class='nav.navbar-nav'] > li[class='active'")

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - $("#navColor").height()
        }, 1000, function() {


          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

/* This is the plugin */
(function(a){
	a.createModal=function(b) {
		defaults = {
			title:"",
			message:"Your Message Goes Here!",
			closeButton:true,
			scrollable:false 
		};
		var b = a.extend({

		},defaults,b);
		var c = (b.scrollable === true) ? 'style="max-height: 420px;overflow-y: auto;"':""; 

		html='<div class="modal fade" id="myModal">'; 
		html += '<div class="modal-dialog" style="width:97%">'; 
		html += '<div class="modal-content" style="padding:15px">'; 
		/*html += '<div class="modal-header">'; 
		html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'; 
		if(b.title.length>0) {
			html += '<h4 class="modal-title">' + b.title + "</h4>"
		}
		html += "</div>";*/
		html += '<div class="modal-body" ' + c + ">";
		html += b.message;
		html += "</div>";
		/*html += '<div class="modal-footer">';
		if (b.closeButton === true) {
			html += '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
		}
		html += "</div>";*/
		html += "</div>";
		html += "</div>";
		html += "</div>";
		a("body").prepend(html);
		a("#myModal").modal().on("hidden.bs.modal",function(){
			a(this).remove()
		})
	}
})(jQuery);

/* Here is how you use it */
$(function(){    
    $('.view-pdf').on('click',function(){
        var pdf_link = $(this).attr('href');
        //var iframe = '<div class="iframe-container"><iframe src="'+pdf_link+'"></iframe></div>'
        //var iframe = '<object data="'+pdf_link+'" type="application/pdf"><embed src="'+pdf_link+'" type="application/pdf" /></object>'
        var iframe = '<object type="application/pdf" data="'+pdf_link+'" width="100%" height="500">No Support</object>'
        $.createModal({
            /*title:'My Title',*/
            message: iframe,
            closeButton:true,
            scrollable:false
        });
        return false;        
    });    
})

var rowOut = ["project-1-info", "project-2-info", "project-3-info"];
function showMe(id) {
	var i = 0, j = -1;
	while(i < 3 && i !== -1) {
		if($('#'+rowOut[i]).is(':visible')) {
			console.log('yes');
			$('#'+rowOut[i]).slideToggle(500);
			j = i;
			i = -1;
		} else {
			i++;
		}
		console.log("one more");
	}
	if(rowOut[j] !== (id+'-info'))
		$('#'+id+'-info').slideToggle(500);
}