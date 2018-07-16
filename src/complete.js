import "./styles/styles.scss";

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

const dropkickjs = require('dropkickjs');
const jquery_cookie = require('jquery.cookie');
const defiant = require('defiant.js');
const moment = require('moment');
const common_js = require('./common.js');


$.cookie.json = true;

var package_list;
var cart_package_code_arr = [];
var cart_package_price_arr = [];
var cart_package_num_arr = [];
var cart_mbr_veh_type_arr=[];
var mbr_veh_type = $.cookie('add_package_mbr_veh_type');


let parameter = common_js.parameter();
let call_api = common_js.call_api();

if ($.cookie('mbr_parameter')) {
	var mbr_parameter = $.cookie('mbr_parameter');
	$('.mbr-code').html(mbr_parameter.mbr_code);
}


$(function () {

	
	if($.cookie('cart_package_code_arr'))
	{
			
	call_api(parameter, "validate");

	if ($.cookie('cart_package_code_arr') && $.cookie('cart_package_num_arr')) {
		cart_package_code_arr = $.cookie('cart_package_code_arr');
		cart_package_num_arr = $.cookie('cart_package_num_arr');
		cart_mbr_veh_type_arr = $.cookie('cart_mbr_veh_type_arr');

	}

	show_result();

	show_transaction_num();
	}
	else{ 
		
		window.location=SHOP_INDEX;
	}
	

})

function show_result() {

	cart_package_code_arr = $.cookie('cart_package_code_arr');
	cart_package_num_arr = $.cookie('cart_package_num_arr');
	cart_mbr_veh_type_arr = $.cookie('cart_mbr_veh_type_arr');
	
	package_list = $.cookie('package_list');

	console.log(package_list);

	var html = '';
	for (var i = 0; i < cart_package_code_arr.length; i++) {

//		var course_info = JSON.search(package_list, '//data[veh_type="' + mbr_veh_type.toUpperCase() + '"]');
		var course = JSON.search(package_list, '//data//package_list[package_code="' + cart_package_code_arr[i] + '"]');
			var course_info =  JSON.search(package_list, '//*[package_code="' + cart_package_code_arr[i] + '"]/..');

		html += '<tr>';
		html += '<td><img class="clock-icon" src="img/clock-icon.png"></td>';
		html += '<td><span class="course-type">補鐘</span></td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td></td>';
		html += '<td>' + course[0].package_name + '(' + course_info[0].mbr_info.course_veh_type_desc + ')</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td></td>';
		html += '<td>' + course_info[0].mbr_info.course_centre_desc + '</td>';
		html += '</tr>';
		html += '<tr class="unit-row">';
		html += '<td></td>';
		html += '<td>數量:' + cart_package_num_arr[i] + '</td>';
		html += '</tr>';
		cart_package_price_arr.push(course[0].price);
	}

	$('.complete-bought').html(html);

}

function show_transaction_num() {
	var stripe_payment_token = $('#stripe_payment_token').val();
	var package_code_list = cart_package_code_arr.toString();
	var package_num = cart_package_num_arr.toString();
	var mbr_veh_type_list = cart_mbr_veh_type_arr.toString();
	
	var total_amount = 0;
	console.log(cart_package_num_arr);
	console.log(cart_package_code_arr);
	console.log(cart_mbr_veh_type_arr);

	
	
	for (var i = 0; i < cart_package_num_arr.length; i++) {
		console.log(Number(cart_package_num_arr[i]));
		console.log(Number(cart_package_price_arr[i]));

		total_amount += Number(cart_package_num_arr[i]) * Number(cart_package_price_arr[i]);
	}

	console.log('stripe_payment_token:' + stripe_payment_token);
	console.log('mbr_veh_type:' + mbr_veh_type_list);
	console.log('package_code_list:' + package_code_list);
	console.log('package_num:' + package_num);
	console.log('total_amount:' + total_amount);

	parameter.stripe_payment_token = stripe_payment_token;
	parameter.mbr_veh_type = mbr_veh_type_list;
	parameter.package_code_list = package_code_list;
	parameter.package_num = package_num;
	parameter.total_amount = total_amount;

	call_api(parameter, "create_trx_stripe");


}
