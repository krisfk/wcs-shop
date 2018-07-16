<?php
include 'header.php';

?>
	<script src="https://js.stripe.com/v3/"></script>


	<div class="container">

		<div class="middle">
			<a href="javascript:void(0);" class="logo"><img  src="img/logo.png"></a>
			<div class="mbr-code-div">客戶編號：<span class="mbr-code"></span>
			</div>
		</div>



		<div class="step-bar">

			<ul class="step-flow">
				<li>1.選購</li>
				<li class="active">2.確認及付款</li>
				<li class="last">3.交易完成</li>

			</ul>


		</div>

		<div class="middle">


			<div class="cart-content">

				<table>


				</table>


			</div>

			<div class="total-price">
				<div class="txt">HK$ <span class="total-price-txt"></span>
				</div>
			</div>



			<h2 class="h2-title">付款</h2>


			<form action="complete.php" method="post" id="payment-form">


				<div class="pay-div">


					<div class="loading-layer">
					
					</div>
					
					<div class="pay-div-middle">
						<img class="card-icon" src="img/card.png">
						<div class="fill-info">

							<div class="form-row">


								<div class="group">

									<div class="field-div">
										<label>
										<span>以信用咭付款</span>
										<div id="card-number-element" class="field"></div>
									  </label>
									



									</div>

									<div class="field-div field-div-2">
										<label>
										<span>有效日期</span>
										<div id="card-expiry-element" class="field"></div>
									  </label>
									



									</div>

									<div class="field-div field-div-2">

										<label>
										<span>安全碼</span>
										<div id="card-cvc-element" class="field"></div>
									  </label>
									



									</div>

									<label style="display: none;">
										<span>Postal code</span>
										<input id="postal-code" name="postal_code" class="field" value="00852"  placeholder="00852" type="hidden"  />
									  </label>
								






								</div>


								<div class="outcome">
									<div class="error"></div>

								</div>

								<!-- Used to display form errors. -->
								<div id="card-errors" role="alert"></div>
							</div>



						</div>

						<img class="strip-icon" src="img/strip-icon.jpg">

						<div class="strip-txt">信用卡付款資料經加密處理，<br/>本公司不會儲存任何信用卡號碼</div>
					</div>

				</div>




				<ul class="bottom-btns-ul">
					<li><a href="index.php">返回</a>
					</li>
					<li>

						<button>確認付款</button>


					</li>

				</ul>

			</form>




		</div>



	</div>


	
	<script type="text/javascript" src="cart.bundle.js?t=<?php echo time();?>"></script>


	<script>
	</script>

</body>
</html>