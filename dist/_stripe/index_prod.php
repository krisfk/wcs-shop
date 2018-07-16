<input type="button" value="Alipay" onclick="doAlipay()" />
<div id="payment-request-button"></div>

<br/>
<br/>

<a href="http://stripe-payments-demo.appspot.com">Offical Demo</a>

<!-- <form action="192.9.204.24/stripe/post.php" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_ABEudWXTmLwrt4jLE3AGgFDS"
    data-amount="999"
    data-name="Stripe.com"
    data-description="Widget"
    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
    data-locale="auto"
    data-zip-code="true">
  </script>
</form> -->


<script src="https://js.stripe.com/v3/"></script>
<script>

	function doAlipay(){
	  var stripe = Stripe('pk_live_1j7NJUAuTUorfZGVbQi5NpDf');

		stripe.createSource({
		  type: 'alipay',
		  amount: 400,
		  currency: 'hkd',
		  redirect: {
		    return_url: 'https://testapi.meghk.com/stripe/charge_prod.php',
		  },
		}).then(function(result) {
		  // handle result.error or result.source
		  console.log(result);
		  console.log(result['source']['redirect']['url']);
		  document.location = result['source']['redirect']['url'];
		});
	}

//   var paymentRequest = stripe.paymentRequest({
//       country: 'HK',
//       currency: 'hkd',
//       total: {
//         label: 'Demo total',
//         amount: 1000,
//       },
//     });

//     var elements = stripe.elements();
//     var prButton = elements.create('paymentRequestButton', {
//       paymentRequest: paymentRequest,
//       style: {
//         paymentRequestButton: {
//           type: 'default', // default: 'default'
//           theme: 'dark', // default: 'dark'
//           height: '64px', // default: '40px', the width is always '100%'
//         },
//         },
//     });

//     // Check the availability of the Payment Request API first.
//     paymentRequest.canMakePayment().then(function(result) {
//         console.log(result);
//       if (result) {
//         prButton.mount('#payment-request-button');
//         console.log('sss');
//       } else {
//         //document.getElementById('payment-request-button').style.display = 'none';
//       }
//     });


// paymentRequest.on('token', function(ev) {
//   // Send the token to your server to charge it!
//   fetch('/charges', {
//     method: 'POST',
//     body: JSON.stringify({token: ev.token.id}),
//     headers: {'content-type': 'application/json'},
//   })
//   .then(function(response) {
//     if (response.ok) {
//       // Report to the browser that the payment was successful, prompting
//       // it to close the browser payment interface.
//       ev.complete('success');
//     } else {
//       // Report to the browser that the payment failed, prompting it to
//       // re-show the payment interface, or show an error message and close
//       // the payment interface.
//       ev.complete('fail');
//     }
//   });
// });

</script>

