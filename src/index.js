import "./styles/styles.scss";

const moment = require('moment');
const dropkickjs = require('dropkickjs');
const jquery_cookie = require('jquery.cookie');
const defiant = require('defiant.js');

const common_js = require('./common.js');

$.cookie.json = true;

let parameter = common_js.parameter();
let call_api = common_js.call_api();




$(function () {
 
	call_api(parameter, "validate");

	var veh_type_btn = $('.container .middle .veh-type-btn-div .veh-type-btn');

	$('.course-selection-div').fadeOut(0);
	
	$('.course-selection-div.pc').fadeIn(200);
	 
	 
	veh_type_btn.click(function (e) {
		e.preventDefault();
		var veh_type =$(this).attr('data-veh-type');
		
		if ($(this).hasClass('has_course')) {
			veh_type_btn.removeClass('active');
			$(this).toggleClass('active');
				$('.course-selection-div').fadeOut(0);
				$('.course-selection-div.'+veh_type).fadeIn(200);

			
		//	gen_course_list();
		} else {
			alert('你暫時不能報讀此課程');
		}

	});


	$.cookie('mbr_parameter', parameter);


	
	$('.mbr-code').html(parameter.mbr_code);
	console.log('package_list:');
	console.log($.cookie('package_list'));
	
	if (!$.cookie('package_list')) {
		call_api(parameter, "start_purchase");
	} else {
		call_api(parameter, "get_package_list");
	}
	


	$(".exit").click(function(e){
		
		e.preventDefault();
		console.log('exit');
		$.removeCookie('add_package_code');
		$.removeCookie('cart_package_code_arr');
		$.removeCookie('cart_package_num_arr');
		$.removeCookie('cart_mbr_veh_type_arr');
		
		window.location='exit.php';

		
	})


});


