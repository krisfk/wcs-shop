// JavaScript Document

import "./styles/styles.scss";


const moment = require('moment');
const dropkickjs = require('dropkickjs');
const jquery_cookie = require('jquery.cookie');
const defiant = require('defiant.js');

const common_js = require('./common.js');

$.cookie.json = true;

let parameter = common_js.parameter();
let call_api = common_js.call_api();




$(function(){
	
	call_api(parameter, "validate");

	$.cookie('token',token);
	$.cookie('request_client',request_client);
	$.cookie('request_date',request_date);
	$.cookie('request_ip',request_ip);
	$.cookie('mbr_code',mbr_code);
	
}
 
 
);