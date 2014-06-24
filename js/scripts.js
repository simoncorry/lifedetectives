var ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

function ScrollToElement(element, offset) {
    offset = typeof offset !== 'undefined' ? offset : 0;
    if(!$("#navigation").hasClass("fixed")) offset -= 38;
    $('body,html').animate({
            scrollTop: $(element).offset().top + 1 + offset
    }, 1000,"swing");	
}

function changeContact(index) {
    $("#interest").val(index);
    ScrollToElement("#contact");
    return false;
}

if (!ie) window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

$(document).ready(function(){	
	// Global JS
	$('a').click(function () {
		if ($(this).is("[href]")) {
			var anchor = $(this).attr('href').split('#');
			if ($('#'+anchor[1]).length > 0) { 
				ScrollToElement('#'+anchor[1]);
				return false;
			}
		}
	});
	
	$('#mobile-nav select').change(function() {
		if ($(this).attr('value') != '') ScrollToElement($(this).attr('value'));
	});
	
	var sticky = document.querySelector('.sticky');
	var origOffsetY = sticky.offsetTop;
	
	function onScroll(e) {
	  window.scrollY >= origOffsetY ? sticky.classList.add('fixed') :
									  sticky.classList.remove('fixed');
	}
    
	if (!(ie <= 9)) {
		document.addEventListener('scroll', onScroll);
		document.addEventListener('touchmove', onScroll);
	}
	
	// Coaching JS
	if (!Modernizr.touch) $("#coaching ul > li").tooltip({ 
		delay: 0, 
		showURL: false, 
		fixPNG:true,
		track:true,
		left:15,
		top:-84,
		extraClass:'coaching',
		bodyHandler: function() { 
			return $("<div>");
		} 
	});
	
	$('#coaching ul li').click(function () {
		$(this).toggleClass('selected');
		if ($('#coaching ul > li.selected').size() >= 3) {
            $('#coaching #button-hidden').slideDown(500,"swing");
            if ($(window).width() < 600) ScrollToElement("#button-hidden", -$(window).height()/2);
        } else {
            $('#coaching #button-hidden').slideUp(500,"swing");
        }
		return false;
	});
	
	$('#coaching #button-hidden').hide();
	
	// Process JS
	
    $("#process #carousel").carouFredSel({
        responsive  : true,
        auto		:false,
        circular	:false,
        items       : {
            width       : 165,
            play		:false,
            visible     : {
                min         : 1,
                max         : 4
            }
        },
        prev    : {
        button  : "#foo_prev",
        key     : "left"
    },
    next    : {
        button  : "#foo_next",
        key     : "right"
    }
    });
	
    $('#process ul li a').click(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {  
            $('#process ul li a').each(function(index, element) {
                $(this).removeClass('selected');
            });
            $(this).addClass('selected');
        }
	});
	
	// Packages JS
	if (!Modernizr.touch) $("#packages ul > li").tooltip({ 
		delay: 0, 
		showURL: false, 
		fixPNG:true,
		track:true,
		left:15,
		top:-84,
		extraClass:'packages',
		bodyHandler: function() { 
			return $("<div>");
		} 
	});
	
	$('#packages ul li').click(function () {
		$('#packages ul li').each(function(index, element) {
            $(this).removeClass('selected');
		});
		$(this).addClass('selected');
        if ($(window).width() < 600) ScrollToElement("#package-info",-40);
	});
	
	jcps.fader(300, '#switcher-panel');
	
	// Contact JS
	
	$("#contact-form").submit(function(event) {
		event.preventDefault();
	        if ($("#verify").val() == "4") {
	            $('#contact #result').text("Sending message...");
	            var $form = $(this),
	                $inputs = $form.find("input, textarea, select, button"),
	                serialisedData = $form.serialize();
	                
	            $inputs.attr("disabled","disabled");
	            url = $form.attr('action');
	                
	            $.ajax({
	                type: 'POST',
	                url: url,
	                data: serialisedData,
	                success: function(response, textStatus, jqXHR) {$('#contact #result').text("Message sent successfully.");},
	                error: function (jqXHR, textStatus, errorThrown) {$('#contact #result').text("Message did not send.");},
	                complete: function(){
	                    $inputs.removeAttr("disabled");
	                }		
	            });
	        } else {
	            alert("Your verification answer is wrong, please check it and try again.");
	        }
	});
});


    
