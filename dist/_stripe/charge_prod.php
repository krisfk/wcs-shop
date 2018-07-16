<?
require('stripe/init.php');

print_r($_REQUEST);

// \Stripe\Stripe::setApiKey("pk_test_ABEudWXTmLwrt4jLE3AGgFDS");
\Stripe\Stripe::setApiKey("sk_live_bBfdE2Sgg6KFUNnPJvQlViMI");

try{

	$charge = \Stripe\Charge::create(array(
	  "amount" => 400,
	  "currency" => "hkd",
	  "source" => $_REQUEST['source'],
	));

	// $charge = \Stripe\Charge::create(array(
	// 		   "amount" => $amount,
	// 		   "currency" => "hkd",
	// 		   "description" => $description,
	// 		   "source" => $token
	// 		   //,"invoice"=>'MSL-01-0000001'
	// 		   ));
	$obj_json = $charge->__toJSON();
	$obj = $charge->__toArray(true);

}catch (\Stripe\Error\ApiConnection $e) {
			// Network problem, perhaps try again.
			return $this->printError($e);
		} catch (\Stripe\Error\InvalidRequest $e) {
			// You screwed up in your programming. Shouldn't happen!
			// echo 'error<br/>';
			print_r($e);
			
			// return $this->printError($e);
		} catch (\Stripe\Error\Api $e) {
			// Stripe's servers are down!
			return $this->printError($e);
		} catch (\Stripe\Error\Card $e) {
			// Card was declined.
			return $this->printError($e);
		}


?>