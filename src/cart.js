import "./styles/styles.scss";

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

const dropkickjs = require('dropkickjs');
const jquery_cookie = require('jquery.cookie');
const defiant = require('defiant.js');
const common_js = require('./common.js');
const moment = require('moment');
$.cookie.json = true;

let parameter = common_js.parameter();
let call_api = common_js.call_api();

var package_list;
var cart_package_code_arr = [];
var cart_package_num_arr = [];
var cart_mbr_veh_type_arr = [];

var mbr_veh_type; // = $.cookie('add_package_mbr_veh_type');


if ($.cookie('mbr_parameter')) {
	var mbr_parameter = $.cookie('mbr_parameter');
	$('.mbr-code').html(mbr_parameter.mbr_code);
}


$(function () {

	call_api(parameter, "validate");


	$('.pay-div,.h2-title,.bottom-btns-ul button').fadeOut(0);

	package_list = $.cookie('package_list');
	mbr_veh_type = $.cookie('add_package_mbr_veh_type');


	if ($.cookie('add_package_code')) {
		if ($.cookie('cart_package_code_arr') && $.cookie('cart_package_num_arr')) {
			cart_package_code_arr = $.cookie('cart_package_code_arr');
			cart_package_num_arr = $.cookie('cart_package_num_arr');
			cart_mbr_veh_type_arr = $.cookie('cart_mbr_veh_type_arr');
			//	alert($.cookie('cart_mbr_veh_type_arr'));

			var add_package_code = $.cookie('add_package_code');

			var idx = cart_package_code_arr.indexOf(add_package_code);

			if (idx != -1) {
				cart_package_num_arr[idx]++;
			} else {
				cart_package_code_arr.push($.cookie('add_package_code'));

				if (!cart_mbr_veh_type_arr ||  cart_mbr_veh_type_arr === 'undefined' || cart_mbr_veh_type_arr.length==0 ) {
					cart_mbr_veh_type_arr.push(mbr_veh_type);
				}
				//!!

				cart_package_num_arr.push(1);
			}
		} else {
			cart_package_code_arr.push($.cookie('add_package_code'));

			if (!cart_mbr_veh_type_arr || cart_mbr_veh_type_arr === 'undefined'  || cart_mbr_veh_type_arr.length==0) {
				cart_mbr_veh_type_arr.push(mbr_veh_type);
			}
			//!!


			cart_package_num_arr.push(1);
		}

		$.cookie('cart_package_code_arr', cart_package_code_arr);
		$.cookie('cart_package_num_arr', cart_package_num_arr);
		$.cookie('cart_mbr_veh_type_arr', cart_mbr_veh_type_arr);

	}
	show_cart_info();

	$.removeCookie('add_package_code');



	console.log(cart_package_code_arr);
	console.log(cart_package_num_arr);
	console.log(cart_mbr_veh_type_arr);



});


function show_cart_info() {

	cart_package_code_arr = $.cookie('cart_package_code_arr');
	cart_package_num_arr = $.cookie('cart_package_num_arr');
	cart_mbr_veh_type_arr = $.cookie('cart_mbr_veh_type_arr');

	console.log('show cart');

	var html = '';
	var empty_cart = false;
	if (typeof cart_package_code_arr != 'undefined') {
		for (var i = 0; i < cart_package_code_arr.length; i++) {

			//	var course_info = JSON.search(package_list, '//data[veh_type="' + mbr_veh_type.toUpperCase() + '"]');
			var course = JSON.search(package_list, '//data//package_list[package_code="' + cart_package_code_arr[i] + '"]');
			//	var abc =  JSON.search(package_list, '//*[package_code="' + cart_package_code_arr[i] + '"]');
			var course_info = JSON.search(package_list, '//*[package_code="' + cart_package_code_arr[i] + '"]/..');

			html += '<tr>';
			html += '<td class="col-l">';
			html += '<div class="course-type"><img class="clock-icon" src="img/clock-icon.png">補鐘</div>';
			html += '<div class="course-title-info">' + course[0].package_name + '<br/>(' + course_info[0].mbr_info.course_veh_type_desc + ')</div>';
			html += '<div class="course-place">' + course_info[0].mbr_info.course_centre_desc + '</div>';
			html += '</td>';
			html += '<td class="col-r">';
			html += '<select class="normal_select" data-dkcacheid="0">';

			for (var k = 0; k <= 9; k++) {
				if (k == cart_package_num_arr[i]) {
					html += '<option selected value="' + k + '">' + k + '</option>';

				} else {
					html += '<option value="' + k + '">' + k + '</option>';

				}
			}

			html += '</select>';
			html += '</td>';
			html += '</tr>';
			html += '<tr class="item-cost-tr">';
			html += '<td colspan="2" class="item-cost">$<span class="unit-price">' + course[0].price + '</span> x <span class="unit">' + cart_package_num_arr[i] + '</span></td>';
			html += '</tr>';

		}

		empty_cart = (cart_package_code_arr.length == 0) ? true : false;



	} else {
		empty_cart = true;
	}


	if (empty_cart) {

		html += '<tr>';
		html += '<td colspan="2"><br/>暫時未有選購任何課程</td>';
		html += '</tr>';
	} else {
		$('.pay-div,.h2-title,.bottom-btns-ul button').fadeIn(200);
	}


	$('.cart-content table').html(html);


	/*
	html='';
	html += '<tr>';
			html += '<td colspan="2"><br/>暫時未有選購任何課程</td>';
			html += '</tr>';
				$('.cart-content table').html(html);

			
	*/






	initialize_ui();

	initalize_stripe();




}

function initialize_ui() {
	$(".normal_select").dropkick({
		mobile: true
	});

	$('.dk-selected').append('<div class="bg"></div>');


	/*$('.normal_select').change(function () {
		$('.dk-selected').append('<div class="bg"></div>');
	});
*/
	$(".normal_select").change(function () {

		$('.dk-selected').append('<div class="bg"></div>');

		var new_unit = $(this).val();

		$(this).closest('tr').next('tr').find('.unit').html(new_unit);
		update_total_price();

		//change unit
		//	console.log('aa:'+$(this).closest('tr').index());
		var idx = $(this).closest('tr').index() / 2;

		console.log('change unit idx:' + idx);

		if (Number(new_unit) == 0) {
			console.log('before splice');
			console.log(cart_package_code_arr);
			console.log(cart_package_num_arr);
			console.log(cart_mbr_veh_type_arr);

			cart_package_code_arr.splice(idx, 1);
			cart_package_num_arr.splice(idx, 1);
			cart_mbr_veh_type_arr.splice(idx, 1);


			$(this).closest('tr').next('tr').fadeOut(200).remove();
			$(this).closest('tr').fadeOut(200).remove();
			console.log('remove');
		} else {
			cart_package_num_arr[idx] = Number(new_unit);
		}

		if (cart_package_code_arr.length == 0 || typeof cart_package_code_arr === 'undefined') {
			$('.pay-div,.bottom-btns-ul button,.h2-title').fadeOut(0);
			var html = '';
			html += '<tr>';
			html += '<td colspan="2"><br/>暫時未有選購任何課程</td>';
			html += '</tr>';
			$('.cart-content table').html(html);

		}

		$.cookie('cart_package_num_arr', cart_package_num_arr);
		$.cookie('cart_package_code_arr', cart_package_code_arr);
		$.cookie('cart_mbr_veh_type_arr', cart_mbr_veh_type_arr);


		console.log(cart_package_code_arr);
		console.log(cart_package_num_arr);
		console.log(cart_mbr_veh_type_arr);
		console.log('length:' + Number(cart_package_code_arr.length));

	});
	update_total_price();

}


function update_total_price() {

	var total_price_txt = 0;

	for (var i = 0; i < $('.unit-price').length; i++) {
		total_price_txt += Number($('.unit-price').eq(i).html()) * Number($('.unit').eq(i).html());
	}
	$('.total-price-txt').html(total_price_txt);



}


function initalize_stripe() {
	// Create a Stripe client.
	var stripe = Stripe('pk_test_ABEudWXTmLwrt4jLE3AGgFDS');

	// Create an instance of Elements.
	var elements = stripe.elements();

	// Custom styling can be passed to options when creating an Element.
	// (Note that this demo uses a wider set of styles than the guide below.)
	var style = {
		base: {
			color: '#32325d',
			lineHeight: '18px',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '14px',
			'::placeholder': {
				color: '#aab7c4'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		}
	};
	/*
	card		A flexible single-line input that collects all necessary card details.
	cardNumber	The card number.
	cardExpiry	The card‘s expiration date.
	cardCvc		The card‘s CVC number.
	*/


	var cardNumberElement = elements.create('cardNumber', {
		style: style
	});
	cardNumberElement.mount('#card-number-element');

	var cardExpiryElement = elements.create('cardExpiry', {
		style: style
	});
	cardExpiryElement.mount('#card-expiry-element');

	var cardCvcElement = elements.create('cardCvc', {
		style: style
	});
	cardCvcElement.mount('#card-cvc-element');


	function setOutcome(result) {
		//		var successElement = document.querySelector('.success');
		var errorElement = document.querySelector('.error');
		//		successElement.classList.remove('visible');
		errorElement.classList.remove('visible');

		if (result.token) {
			// In this example, we're simply displaying the token
			/*	successElement.querySelector('.token').textContent = result.token.id;
				successElement.classList.add('visible');*/

			// Insert the token ID into the form so it gets submitted to the server
			var form = document.getElementById('payment-form');
			var hiddenInput = document.createElement('input');
			hiddenInput.setAttribute('type', 'hidden');
			hiddenInput.setAttribute('name', 'stripeToken');
			hiddenInput.setAttribute('value', result.token.id);
			form.appendChild(hiddenInput);

			// Submit the form
			$('.loading-layer').fadeIn(0);
			form.submit();
			

			// In a real integration, you'd submit the form with the token to your backend server
			//var form = document.querySelector('form');
			//form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
			//form.submit();
		} else if (result.error) {
			errorElement.textContent = result.error.message;
			errorElement.classList.add('visible');
		}
	}

	cardNumberElement.on('change', function (event) {
		setOutcome(event);
	});

	cardExpiryElement.on('change', function (event) {
		setOutcome(event);
	});

	cardCvcElement.on('change', function (event) {
		setOutcome(event);
	});

	document.querySelector('form').addEventListener('submit', function (e) {
		e.preventDefault();
		var options = {
			address_zip: document.getElementById('postal-code').value,
		};
		stripe.createToken(cardNumberElement, options).then(setOutcome);
	});


	/*// Create an instance of the card Element.
		var card = elements.create( 'card', {
			style: style
		} );

		// Add an instance of the card Element into the `card-element` <div>.
		card.mount( '#card-element' );

		// Handle real-time validation errors from the card Element.
		card.addEventListener( 'change', function ( event ) {
			var displayError = document.getElementById( 'card-errors' );
			if ( event.error ) {
				displayError.textContent = event.error.message;
			} else {
				displayError.textContent = '';
			}
		} );
	
	
	

		// Handle form submission.
		var form = document.getElementById( 'payment-form' );
		form.addEventListener( 'submit', function ( event ) {
			event.preventDefault();

			stripe.createToken( card ).then( function ( result ) {
				if ( result.error ) {
					// Inform the user if there was an error.
					var errorElement = document.getElementById( 'card-errors' );
					errorElement.textContent = result.error.message;
				} else {
					// Send the token to your server.
					stripeTokenHandler( result.token );
				}
			} );
		} );

		function stripeTokenHandler( token ) {
			// Insert the token ID into the form so it gets submitted to the server
			var form = document.getElementById( 'payment-form' );
			var hiddenInput = document.createElement( 'input' );
			hiddenInput.setAttribute( 'type', 'hidden' );
			hiddenInput.setAttribute( 'name', 'stripeToken' );
			hiddenInput.setAttribute( 'value', token.id );
			form.appendChild( hiddenInput );

			// Submit the form
			form.submit();
		}*/
}
