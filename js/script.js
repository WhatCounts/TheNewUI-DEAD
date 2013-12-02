/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.projects-container');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.show();
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').click(function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


		var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	/*-------------------------------------------------*/
	/* =   Smooth scroll
	/*-------------------------------------------------*/

	//Get Sections top position
	function getTargetTop(elem){
		
		//gets the id of the section header
		//from the navigation's href e.g. ("#html")
		var id = elem.attr("href");

		//Height of the navigation
		var offset = 100;

		//Gets the distance from the top and 
		//subtracts the height of the nav.
		return $(id).offset().top - offset;
	}

	//Smooth scroll when user click link that starts with #

	var elemHref = $('.navbar-right a[href^="#"]');

	elemHref.click(function(event) {
		
		//gets the distance from the top of the 
		//section refenced in the href.
		var target = getTargetTop($(this));

		//scrolls to that section.
		$('html, body').animate({scrollTop:target}, 500);

		//prevent the browser from jumping down to section.
		event.preventDefault();
	});

	//Pulling sections from main nav.
	var sections = $('.navbar-right a[href^="#"]');

	// Go through each section to see if it's at the top.
	// if it is add an active class
	function checkSectionSelected(scrolledTo){
		
		//How close the top has to be to the section.
		var threshold = 100;

		var i;

		for (i = 0; i < sections.length; i++) {
			
			//get next nav item
			var section = $(sections[i]);

			//get the distance from top
			var target = getTargetTop(section);
			
			//Check if section is at the top of the page.
			if (scrolledTo > target - threshold && scrolledTo < target + threshold) {

				//remove all selected elements
				sections.removeClass("active");

				//add current selected element.
				section.addClass("active");
			}

		}
	}

	//Check if page is already scrolled to a section.
	checkSectionSelected($(window).scrollTop());

	$(window).scroll(function(){
		checkSectionSelected($(window).scrollTop());
	});


	/*-------------------------------------------------*/
	/* =   magnific popup
	/*-------------------------------------------------*/

	try {
		var magnLink = $('.link-project');
		magnLink.magnificPopup({
			closeBtnInside:true
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade"
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Banner slider
	/*-------------------------------------------------*/

	var sliderTestimonial = $('.bxslider');
	try{		
		sliderTestimonial.bxSlider({
			mode: 'vertical'
		});
	} catch(err) {
	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"52.204914", "lon":"0.121686"}; //Change a map coordinate here!

	try {
		var mapContainer = $('.map');
		mapContainer.gmap3({
			action: 'addMarker',
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 14
				},
			},
			{action: 'setOptions', args:[{scrollwheel:true}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

});

