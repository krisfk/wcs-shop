var base_url = API_BASE_URL;

const moment = require('moment');
var parameter = {};




if ($.cookie('token')) {
	parameter["token"] = $.cookie('token').replace(/['"]+/g, '');
	parameter["request_client"] = $.cookie('request_client').replace(/['"]+/g, '');
	parameter["request_date"] = $.cookie('request_date').replace(/['"]+/g, '');
	parameter["request_ip"] = $.cookie('request_ip').replace(/['"]+/g, '');
	parameter["mbr_code"] = $.cookie('mbr_code').replace(/['"]+/g, '');
} else {

	if (!$('body').hasClass('init')) {
		call_api(parameter, "sim_invalid_token");
	}
}

console.log('start common parameter:');
console.log(parameter);



function call_api(parameter, api_name) {
	console.log('call ' + api_name);
	console.log(parameter);
	switch (api_name) {
		case "start_purchase":
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
					console.log('return start_purchase:');
					call_api(parameter, "get_package_list");
				},
				error: function (data) {}
			});
			break;
		case "get_package_list":
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
//					console.log('return get_package_list:dummy');
					console.log('return get_package_list:');

				//	data = '{"response_code":"0","response_msg":"","data":[{"veh_type":"PC","mbr_has_course":"Y","mbr_info":{"course_veh_type":"PA","course_veh_type_desc":"私家車自動波","course_centre":"ST","course_centre_desc":"沙田安全駕駛中心"},"package_list":[{"package_code":"extra_1","package_name":"智專實習課1堂組合","package_name_short":"補課1堂","max_num":"0","price":"615"},{"package_code":"extra_2","package_name":"智專實習課2堂組合","package_name_short":"補課2堂","max_num":"0","price":"1230"},{"package_code":"extra_3","package_name":"智專實習課3堂組合","package_name_short":"補課3堂","max_num":"0","price":"1170"},{"package_code":"extra_5","package_name":"智專實習課5堂組合","package_name_short":"補課5堂","max_num":"0","price":"2850"},{"package_code":"extra_52","package_name":"智專實習課5+1堂組合","package_name_short":"補課5+2堂","max_num":"0","price":"3310"}]},{"veh_type":"LG","mbr_has_course":"Y","mbr_info":{"course_veh_type":"PB","course_veh_type_desc":"輕型貨車aa自動波","course_centre":"ST","course_centre_desc":"dummy安全駕駛中心"},"package_list":[{"package_code":"extra_a","package_name":"智專實習課a堂組合","package_name_short":"補課a堂","max_num":"0","price":"999"},{"package_code":"extra_b","package_name":"智專實習課b堂組合","package_name_short":"補課b堂","max_num":"0","price":"888"}]},{"veh_type":"MC","mbr_has_course":"N","mbr_info":[],"package_list":[]}]}'; 
			//		data = JSON.parse(data);
				
					if (data.response_code == 0) {
						$.cookie('package_list', data);
						init_veh_type_btn();
					} else {

						$('#error').val(data.response_code);
						call_api(parameter, "validate");

					}
				},
				error: function (data) {}
			});
			break;

		case "create_trx_stripe":
//			alert(base_url+api_name);
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
					
					console.log('no error');
					console.log('return create_trx_stripe:');
					console.log(data);
					var trx_no = data["data"].trx_no;
					$('.transaction-code-txt').html(trx_no);
					$.removeCookie('add_package_code');
					$.removeCookie('cart_package_code_arr');
					$.removeCookie('cart_package_num_arr');
					$.removeCookie('cart_mbr_veh_type_arr');


				},
				error: function (data) {
					
					console.log('error');
					console.log(data);
					
				}
			});
			break;



		case "sim_maintenance":
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
					console.log('return sim_maintenance:');
					window.location = WCS_MAIN_PAGE;
				},
				error: function (data) {}
			});
			break;

		case "sim_invalid_token":
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
					console.log('return sim_invalid_token:');
					alert(data.response_msg);
					window.location = WCS_MAIN_PAGE;
				},
				error: function (data) {}
			});
			break;

		case "sim_session_timeout":
			$.ajax({
				url: base_url + api_name,
				type: "POST",
				data: parameter,
				dataType: "json",
				success: function (data) {
					console.log('return sim_session_timeout:');
					console.log(data);
					alert(data.data);
					window.location = WCS_MAIN_PAGE;
				},
				error: function (data) {}
			});
			break;




		case "validate":
			console.log('erro-code: ' + $('#error').val());
			$.ajax({
				url: 'validate.php',
				type: "POST",
				data: {
					err: $('#error').val()
				},
				dataType: "html",
				success: function (error) {
					console.log('return validate:');
					if (error) {
						call_api(parameter, error);
					} else {

						if ($('body').hasClass('init')) {
							window.location = SHOP_INDEX;
						}

					}
				}
			});

			break;


	}
}




function init_veh_type_btn() {

	var package_list = $.cookie('package_list');

	console.log('test3');
	for (var i = 0; i < package_list['data'].length; i++) {
//		var veh_type = package_list['data'][i].veh_type.toLowerCase();
//		var veh_type = package_list['data'][i].veh_type.toLowerCase();
		var veh_type = package_list['data'][i].veh_type.toLowerCase();
		var mbr_veh_type = package_list['data'][i].mbr_info['course_veh_type'];//.toLowerCase();
		
		if (package_list['data'][i].mbr_has_course == 'Y') {
			$('.veh-type-btn.' + veh_type).addClass('has_course');
	//		$('.course-selection-div.' + veh_type).fadeIn(200);

			var html = '';
			html += '<ul class="course-selection-ul">';

			var list = package_list['data'][i]['package_list'];

			for (var j = 0; j < list.length; j++) {
				var package_name_short = list[j].package_name_short;
				var price = list[j].price;
				var package_code = list[j].package_code;

				if (j < list.length - 1) {
					html += '<li class="course-selection-li"><a data-mbr-veh-type="' + mbr_veh_type + '" data-package-code="' + package_code + '" href="javascript:void(0);"><span class="course-name">' + package_name_short + '</span> <span class="course-price">$' + price + '</span></a></li>';
				} else {
					html += '<li class="course-selection-li last"><a data-mbr-veh-type="' + mbr_veh_type + '" data-package-code="' + package_code + '"  href="javascript:void(0);"><span class="course-name">' + package_name_short + '</span> <span class="course-price">$' + price + '</span></a></li>';
				}
			}


			html += '</ul>';


			$('.course-selection-div.' + veh_type).html(html);



			var list_section_btn = $('.container .course-selection-div a');

			list_section_btn.click(function (e) {
				e.preventDefault();
				list_section_btn.removeClass('active');
				$(this).toggleClass('active');
				$.cookie('add_package_code', $(this).attr('data-package-code'));
				$.cookie('add_package_mbr_veh_type', $(this).attr('data-mbr-veh-type'));
			});


		}
	}

}



module.exports = {
	parameter: function () {
		return parameter;
	},
	call_api: function () {
		return call_api;
	},
	base_url: function () {
		return base_url;
	}

};
