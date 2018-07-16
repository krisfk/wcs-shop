<?php
include 'header.php';
?>

	<div class="msg">
	<?php
		
		/*
require( 'stripe/init.php' );

//print_r( $_REQUEST );

// \Stripe\Stripe::setApiKey("pk_test_ABEudWXTmLwrt4jLE3AGgFDS");
\Stripe\ Stripe::setApiKey( "sk_test_43f49DoTBLS4gp7G5WE70Vbo" );

try {

	$charge = \Stripe\ Charge::create( array(
		"amount" => 1099,
		"currency" => "hkd",
		"source" => $_REQUEST[ 'stripeToken' ],
	) );

	// $charge = \Stripe\Charge::create(array(
	// 		   "amount" => $amount,
	// 		   "currency" => "hkd",
	// 		   "description" => $description,
	// 		   "source" => $token
	// 		   //,"invoice"=>'MSL-01-0000001'
	// 		   ));
	$obj_json = $charge->__toJSON();
	$obj = $charge->__toArray( true );

} catch ( \Stripe\ Error\ ApiConnection $e ) {
	// Network problem, perhaps try again.
	return $this->printError( $e );
} catch ( \Stripe\ Error\ InvalidRequest $e ) {
	
//	echo '<input type="hidden" id="error" value="1">';
	// You screwed up in your programming. Shouldn't happen!
	// echo 'error<br/>';
//	print_r( $e );
	//index.php

	
//	header("Location: index.php"); 
	// Redirect browser 

//	echo $e["error"];

	// return $this->printError($e);
} catch ( \Stripe\ Error\ Api $e ) {
	// Stripe's servers are down!
	return $this->printError( $e );
} catch ( \Stripe\ Error\ Card $e ) {
	// Card was declined.
	return $this->printError( $e );
}

*/
?>
</div>
	

	<div class="container">

		<div class="middle">
			<a href="javascript:void(0);" class="logo"><img  src="img/logo.png"></a>
			<div class="mbr-code-div">客戶編號：<span class="mbr-code"></span>
			</div>
		</div>



		<div class="step-bar">

			<ul class="step-flow">
				<li>1.選購</li>
				<li>2.確認及付款</li>
				<li class="last active">3.交易完成</li>

			</ul>


		</div>

		<div class="middle">


			<h2 class="h2-title">交易完成</h2>


			<div class="complete-content">



				<img class="thankyou-icon" src="img/thankyou-icon.png">

				<div class="transaction-code-div">交易編號： <span class="transaction-code-txt"></span>
					<!--HSL-01-000221749-->
				</div>

				<div class="complete-txt">您已成功選購</div>


				<table class="complete-bought">


					<!--

					<tr>
						<td><img class="clock-icon" src="img/clock-icon.png">
						</td>
						<td><span class="course-type">補鐘</span>
						</td>
					</tr>
					
					<tr>
						<td></td>
						<td>智專實習課5+2堂組合(私家車自動波)</td>
					</tr>
					<tr>
						<td></td>
						<td>沙田安全駕駛中心</td>
					</tr>

-->



				</table>

			</div>

			<ul class="bottom-btns-ul">
				<li class="back-to-home-btn-li"><a class="back-to-home-btn" href="index.php">返回主頁</a>
				</li>

			</ul>

		</div>

	</div>


	
	<script type="text/javascript" src="complete.bundle.js?t=<?php echo time();?>"></script>

	<input type="hidden" id="stripe_payment_token" value="<?php echo $_REQUEST['stripeToken']; ?>">
	
	<input type="hidden" id="error">

	
</body>
</html>