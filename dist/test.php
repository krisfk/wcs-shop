
<!DOCTYPE html> 
<html> 
  <head> 
  <title></title> 
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://testapi.meghk.com/hksm_web_sales/lib/jquery/jquery-1.8.3.min.js"></script>
  <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
</head> 

<?php
	
	if ( empty( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] ) ) {
		$IP = $_SERVER[ 'REMOTE_ADDR' ];
	} else {
		$IP = explode( ',', $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] );
		$IP = $IP[ 0 ];
	}

	
		$request_client='A1 Android App';
		$request_date=  date( 'Y-m-d h:i:s', time() );
		$request_ip =$IP;
		$code = 'A1drivingSchool';
		$token = sha1($request_ip.$request_date.$code);
	
	?>
<script>

    var api_list = [];

    var api = {};

    api = {};
    api['seq']  = '1';
    api['name'] = 'start_purchase';
    api['parameter'] = [
        {name:'mbr_code'               , default: '99-0008899', desc: ''}
    ];
    api_list.push(api);

    api = {};
    api['seq']  = '2';
    api['name'] = 'get_package_list';
    api['parameter'] = [];
    api_list.push(api);


    api = {};
    api['seq']  = '3';
    api['name'] = 'create_trx_stripe';
    api['parameter'] = [
        {name:'stripe_payment_token' , default: 'tok_visa', desc: 'get from https://stripe.com/docs/testing'},
        {name:'mbr_veh_type'         , default: 'PA'      , desc: 'value from api gete_package_list'},
        {name:'package_code_list'    , default: 'extra_1' , desc: 'value from api gete_package_list, e.g. extra_1,extra_2'},
        {name:'package_num'          , default: '1'       , desc: 'value from api gete_package_list, e.g. 1,2'},
        {name:'total_amount'         , default: '615'     , desc: ''},
    ];
    api_list.push(api);
    

    api = {};
    api['seq']  = '4';    api['name'] = 'sim_maintenance';    api['parameter'] = [];    api_list.push(api);

    api = {};
    api['seq']  = '5';    api['name'] = 'sim_invalid_token';    api['parameter'] = [];    api_list.push(api);

    api = {};
    api['seq']  = '6';    api['name'] = 'sim_session_timeout';    api['parameter'] = [];    api_list.push(api);

    /*

    // add custom field is_dummy to all api
    for(var i=0;i<api_list.length;i++){
        console.log(api_list[i]);
        api_list[i]['parameter'].push({name:'is_dummy'               , default: 'Y', desc: 'Y use dummy api'});
    }

    console.log(api_list);
    */

    

    var api_func = {};
    api_func.api_list = api_list;
    api_func.getApiNameList = function(){
        var list = [];
        for(var i=0; i < this.api_list.length; i++){
            list.push({seq: this.api_list[i]['seq'], name: this.api_list[i]['name']});
        }

        return list;
    }
    api_func.getApiDetail = function(api_name){
        for(var i=0; i < this.api_list.length; i++){
            if(this.api_list[i]['name'] == api_name){
                return this.api_list[i]['parameter'];
            }
        }
    }

    function createSeperator(length){
        var s = "=";
        var str = "";
        for(var i=0; i<length;i++) str += s;
        return str;
    }


    $(function(){
        // console.log(api_list);
        console.log(api_func.getApiNameList());
        
        var list = api_func.getApiNameList();
        for(var i=0; i < list.length; i++){
             var seperator = '-';
             var seperator_length = 50;

            var s_name = "";
            var length = seperator_length - list[i]['name'].length;
            if(length %2 == 0){ s_name = createSeperator(length/2) + ' ' + list[i]['name'] + ' ' + createSeperator(length/2); }
            else{ s_name = createSeperator(length/2) + ' ' + list[i]['name'] + ' ' + createSeperator(length/2-1); }
             
            console.log(s_name);


             if(list[i]['seq'] == '') $('#api_list').append('<option value="">' + s_name + '</option>');
             else $('#api_list').append('<option value="' + list[i]['name'] + '">' + list[i]['seq'] + '&nbsp;&nbsp;' + list[i]['name'] + '</option>');
        }

        $('#api_list').change(function(){
            var val = $(this).val();

            $('#api_result').html('');

            if(val == ''){ $('#api_body').html(''); }
            else{
                var api_detail = api_func.getApiDetail(val);


                var str = "<input type='hidden' id='api_name' value='" + val + "' />";
                for(var i=0; i < api_detail.length; i++){
                    
                    api_detail[i]['name'] = api_detail[i]['name'].trim();
                    api_detail[i]['default'] = api_detail[i]['default'].trim();
                    api_detail[i]['desc'] = api_detail[i]['desc'].trim();

                    str += "<div id='line'>";
                    str += "<div id='title'>" + api_detail[i]['name'] + '</div>';
                    str += "<div id='in'><input type='text' attr='" + api_detail[i]['name'] + "' value='" + api_detail[i]['default'] + "' /> </div>";
                    str += "<div id='desc'>" + api_detail[i]['desc'] + '</div>';
                    str += "</div>"
                }

                str += "<input type='submit' onclick='callApi()' />";

                $('#api_body').html(str);

            }
        })


    })

    function callApi(){
        $('#api_result').html('');

        var url = "https://testapi.meghk.com/hksm_web_sales/api/" + $('#api_name').val();
        var parameter = {};

        $('#api_body input').each(function(){
            if($(this).attr('id') == 'api_name') return;
            if($(this).attr('attr') == undefined) return;

            parameter[$(this).attr('attr')] = $(this).val();
        })


       
	
        parameter['token']          = "<?php echo $token;?>";//'bde7b9c66ad6552d9883a79a186a1763dafe2ca8';
        parameter['request_client'] = "<?php echo $request_client;?>";
        parameter['request_date']   = "<?php echo $request_date;?>";
        parameter['request_ip']     = "<?php echo $request_ip;?>";
       
		//	$token = sha1( $request_ip . $request_date . $code );
		
	/*	
		   parameter['token']          = 'b722cadf109409d64aa4d8de810a1a00e61d693f';
        parameter['request_client'] = 'A1 Android App';
        parameter['request_date']   = '2018-07-04 16:02:04';
        parameter['request_ip']     = '101.78.144.238';
       */
		

        $.ajax({
           
            url       : url,
            type      : "POST",
            data      : parameter,
            dataType  : "json",
            success   : function(data){

                $('#api_result').html(JSON.stringify(data, null, 2));
            },
            error: function(data){
                $('#api_result').text(data.responseText);
            }
        });
    }


</script>



<select id="api_list">
    <option>--</option>
    
</select>

<br/>
<br/>

<br/>

<div id="api_body"></div>

<pre class="prettyprint"><div id="api_result"></div>
</pre>

	
	<?php
	
	
		
		$token = sha1($request_ip.$request_date.$code);
		echo $token;
	?>
<style>
    
    pre.prettyprint{ border: none;}

    #line{ overflow: hidden; margin-bottom: 3px }
    #line div{ float:left; }
    #line div#title{ width: 150px;}
    #line div#in{ width: 200px;}

</style>