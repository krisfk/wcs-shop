<?php
include 'header.php';
?>

	<div class="container">

		<div class="middle">
			<a href="javascript:void(0);" class="logo"><img  src="img/logo.png"></a>
			<div class="mbr-code-div">客戶編號：<span class="mbr-code"></span>
			</div>
		</div>



		<div class="step-bar">

			<ul class="step-flow">
				<li class="active">1.選購</li>
				<li>2.確認及付款</li>
				<li class="last">3.交易完成</li>

			</ul>


		</div>

		<div class="middle">


			<ul class="veh-type-btn-div">

				<li><a href="javascript:void(0);" class="veh-type-btn active pc" data-veh-type="pc">私家車</a>
				</li>
				<li><a href="javascript:void(0);" class="veh-type-btn lg" data-veh-type="lg">輕型貨車</a>
				</li>
				<li class="last"><a href="javascript:void(0);" class="veh-type-btn mc"  data-veh-type="mc">電單車</a>
				</li>


			</ul>


			<h2 class="h2-title"><img src="img/clock-icon.png" class="clock-icon">選購補鐘</h2>

			<div class="course-selection-div pc">

			</div>

			<div class="course-selection-div lg">

			</div>

			<div class="course-selection-div mc">

			</div>





			<ul class="bottom-btns-ul">
				<li><a class="exit" href="javascript:void(0);">取消</a>
				</li>
				<li><a class="cart-btn" href="cart.php">下一步</a>
				</li>

			</ul>




		</div>



	</div>





	<script type="text/javascript" src="index.bundle.js?t=<?php echo time();?>">
	</script>
	
</body>
</html>