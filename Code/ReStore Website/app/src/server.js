var express = require('express');
var app = express();
var root = process.cwd();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
XMLHttpRequest.UNSENT = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/register', function (req, res) {

	var userName = req.body.username;
	var passWord = req.body.password;
	var mobile = req.body.mobile;
	var name = req.body.name;
	var houseDetail = req.body.houseDetail;
	var landmark = req.body.landmark;
	var city = req.body.city;
	var state = req.body.state;
	var pincode = req.body.pincode;

	var addRequest= new XMLHttpRequest();
	addRequest.onreadystatechange= function(){
		if (addRequest.readyState === XMLHttpRequest.DONE){
			if(addRequest.status=== 200){
				var authToken = JSON.parse(addRequest.responseText).auth_token;
				var id = JSON.parse(addRequest.responseText).hasura_id;

				var addDetails= new XMLHttpRequest();
				addDetails.onreadystatechange= function(){
					if (addDetails.readyState === XMLHttpRequest.DONE){
						console.log(addDetails.status+" Response "+addDetails.responseText);
						if(addDetails.status=== 200){
							console.log("Added details in Customer table: "+addDetails.responseText);
							var returned = JSON.parse(addDetails.responseText).returning;
							var custUsername = returned[0].username;

							res.setHeader('Content-Type', 'application/json');
							res.send(JSON.stringify({
								auth_token: authToken,
								user_id: id,
								username: custUsername
							}));
						}
						else if(addDetails.status=== 403){
							console.log('Incorrect credentials');
						}
						else if(addDetails.status=== 500){
							console.log('Something went wrong');
						}
						else{
							console.log(addDetails.status+" Response "+addDetails.responseText);
						}
					}
				}

				//make the request
				addDetails.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
				addDetails.setRequestHeader('Content-Type', 'application/json');
				addDetails.setRequestHeader('Authorization', 'Bearer '+authToken);
				addDetails.send(JSON.stringify({
					type: "insert",
					args: {
						table: "Customer",
						objects:[
							{
								user_id: id,
								Name: name,
								House_Detail: houseDetail,
								Landmark: landmark,
								City: city,
								State: state,
								Pincode: pincode,
								Mobile_Number: mobile,
								username: userName
							}
						],
						returning: ["username"]
					}
				}));
			}
			else if(addRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(addRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(addRequest.status+" Response "+addRequest.responseText);
			}
		}
	}

	//make the request
	addRequest.open('POST', 'https://auth.financially92.hasura-app.io/signup', true);
	addRequest.setRequestHeader('Content-Type', 'application/json');
	addRequest.send(JSON.stringify({
		username: userName,
		password: passWord,
		mobile: mobile
	}));
});

app.post('/login', function (req, res) {

	var userName = req.body.username;
	var passWord = req.body.password;

	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		console.log(request.responseText);
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status=== 200){
				var authToken = JSON.parse(request.responseText).auth_token;
				var id = JSON.parse(request.responseText).hasura_id;

				var creditReq= new XMLHttpRequest();
				creditReq.onreadystatechange= function(){
					if (creditReq.readyState === XMLHttpRequest.DONE){
						if(creditReq.status=== 200){
							var creditResponse = JSON.parse(creditReq.responseText)
							var userCredits = creditResponse[0].Credits;

							console.log(userCredits+" BTC");
							console.log("Response sent: "+JSON.stringify({
								auth_token: authToken,
								user_credits: userCredits
							}));

							res.setHeader('Content-Type', 'application/json');
							res.send(JSON.stringify({
								auth_token: authToken,
								user_id: id,
								user_credits: userCredits
							}));
							console.log("Credit Response: "+creditReq.responseText);

						}
						else if(creditReq.status=== 403){
							console.log('Incorrect credentials');
						}
						else if(creditReq.status=== 500){
							console.log('Something went wrong');
						}
						else{
							console.log("Credit Status Code:"+creditReq.status+" Response "+creditReq.responseText);
						}
					}
				}
				//make the request
				creditReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
				creditReq.setRequestHeader('Content-Type', 'application/json');
				creditReq.setRequestHeader('Authorization', 'Bearer '+ authToken);
				creditReq.send(JSON.stringify({
					type:"select",
					args:{
						table:"Customer",
						columns:[
							"user_id",
							"Credits"
						],
						where: {
							user_id : id
						}
					}
				}));
			}
			else if(request.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(request.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(request.status);
			}
		}
	}

	//make the request
	request.open('POST', 'https://auth.financially92.hasura-app.io/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({
		username: userName,
		password: passWord
	}));

	//res.send("Token = "+authToken+", Role = "+role+", ID = "+id);

});

app.post('/productcategory', function (req, res){


	var prodCategory= new XMLHttpRequest();

	prodCategory.onreadystatechange= function(){
		if (prodCategory.readyState === XMLHttpRequest.DONE){
			if(prodCategory.status=== 200){
				res.setHeader('Content-Type', 'application/json');
				res.send(this.responseText);
			}
			else if(prodCategory.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(prodCategory.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+this.status);
			}
		}
	}
	//make the request
	prodCategory.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	prodCategory.setRequestHeader('Content-Type', 'application/json');
	prodCategory.send(JSON.stringify({type:"select",args:{table:"Product_Category",columns:["*"]}}));


});

app.post('/credit', function (req, res) {
	var authToken = req.body.auth_token;
	var id = req.body.user_id;

	var creditReq= new XMLHttpRequest();
	creditReq.onreadystatechange= function(){
		if (creditReq.readyState === XMLHttpRequest.DONE){
			if(creditReq.status=== 200){
				var creditResponse = JSON.parse(creditReq.responseText)
				var userCredits = creditResponse[0].Credits;

				console.log(userCredits+" BTC");
				console.log("Response sent: "+JSON.stringify({
					user_credits: userCredits
				}));

				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify({
					user_credits: userCredits
				}));
				console.log("Credit Response: "+creditReq.responseText);

			}
			else if(creditReq.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(creditReq.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+creditReq.status+" Response "+creditReq.responseText);
			}
		}
	}
	//make the request
	creditReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	creditReq.setRequestHeader('Content-Type', 'application/json');
	creditReq.setRequestHeader('Authorization', 'Bearer '+ authToken);
	creditReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"Customer",
			columns:[
				"user_id",
				"Credits"
			],
			where: {
				user_id : id
			}
		}
	}));

});

app.get('/js/:filename', function (req, res) {
	var fileName = req.params.filename;
	res.sendFile("/js/"+fileName, {root});
});

app.get('/css/:filename', function (req, res) {
	var fileName = req.params.filename;
	res.sendFile("/css/"+fileName, {root});
});

app.get('/pics/:filename', function (req, res) {
	var fileName = req.params.filename;
	res.sendFile("/pics/"+fileName, {root});
});

app.get('/favicon.ico', function (req, res) {
	res.sendFile("/pics/favicon.ico", {root});
});

app.get('/offers', function(req, res) {
	res.send("Offers coming Soon!");
});

app.get('/logout', function(req, res) {
	var data = {
		addJS : "",
		addCSS : `<link rel="stylesheet" href="/css/main.css">`,
		pageData : `
			<section id="section3">
			  <div class="container-fluid">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg">
				  <div id="myCarousel" class="carousel slide" data-ride="carousel">
					  <!-- Indicators -->
					  <ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
						<li data-target="#myCarousel" data-slide-to="3"></li>
					  </ol>

					  <!-- Wrapper for slides -->
					  <div class="carousel-inner">
						<div class="item active">
						  <a href="/offers"><img class="img-responsive" src="/pics/latest.jpeg" alt="Offers">
						  <div class="carousel-caption">
							<h2>Offers</h2>
							<h3>Click to get the offer items!</h3>
						  </div>
						  </a>
						</div>


						<div class="item">
						  <a href="/product/Garments"><img class="img-responsive" src="/pics/Garments.jpeg" alt="Garments">
						  <div class="carousel-caption">
							<h2>Latest!</h2>
							<h3>Latest in Garments</h3>
						  </div>
						  </a>
						</div>


						<div class="item">
						  <a href="/product/Furniture"><img class="img-responsive" src="/pics/Sofa.jpeg" alt="Furniture">
						  <div class="carousel-caption">
							<h2>Grand!</h2>
							<h3>Decoration counts!</h3>
						  </div>
						  </a>
						</div>


					<div class="item">
						<a href="/product/Shoes"><img class="img-responsive" src="/pics/Boots.jpeg" alt="Shoes">
						<div class="carousel-caption">
						  <h2>Stylish!</h2>
						  <h3>Sporty Look!</h3>
						</div>
						</a>
					  </div>


					  <!-- Left and right controls -->
					  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
						<span class="glyphicon glyphicon-chevron-left"></span>
						<span class="sr-only">Previous</span>
					  </a>
					  <a class="right carousel-control" href="#myCarousel" data-slide="next">
						<span class="glyphicon glyphicon-chevron-right"></span>
						<span class="sr-only">Next</span>
					  </a>
				  </div>
				 </div>
				</div>
			  </div>
			</section>
			  <section id="section4">
				<div class="container-fluid">
				  <h1><strong>TRY OUR EXCLUSIVE COLLECTION</strong></h1>
				  <p>The ultimate collection of recycled goods made of Waste materials
					manufactured by some of the top class recycled products manufacturing
					companies.That too for the cost of your discarded waste!</p>
				  </div>
			  </section>
			`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   productCategory();
				   stickyWork();
				   Cookies.remove('auth_token');
				   Cookies.remove('user_id');
				   alert("Logged Out successfully!");
				   window.location = "/";
				}
		  	</script>`
	};

	var page = developPage(data);
	res.send(page);
});

app.get('/register', function(req, res) {
	var data = {
		addJS : `<script src="/js/register.js"></script>`,
		addCSS : `<link rel="stylesheet" href="/css/register.css">`,
		pageData : `
			<section id="section3">
				<div class="container">
				<h1>Registration Form:</h1>
				<p>Kindly enter your details below.</p>
					<form class="form-horizontal">
						<div class="form-group" id="two">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="Your name">Your Name:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="name" placeholder="Your name here" name="yourname">
						  </div>
						</div>
						<div class="form-group" id="three">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="mobile_number">Mobile No.</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="mobile" placeholder="Mobile number" name="mobile">
						  </div>
						</div>
						<div class="form-group" id="four">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="house_details">House_details:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="housedetail" placeholder="Housedetails" name="housedetails">
						  </div>
						</div>
						<div class="form-group" id="five">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="landmark">Land mark:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="landmark" placeholder="Landmark" name="landmark">
						  </div>
						</div>
						<div class="form-group" id="six">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="cdt">City/District/Town</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="city" placeholder="city/district/town" name="cdt">
						  </div>
						</div>
						<div class="form-group" id="seven">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="state">State:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="state" placeholder="State" name="state">
						  </div>
						</div>
						<div class="form-group" id="eight">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="pincode">Pincode:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="pincode" placeholder="Pincode" name="pincode">
						  </div>
						</div>
						<div class="form-group" id="nine">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="username">Username:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" value="" class="form-control" id="username" placeholder="Username" name="username">
						  </div>
						</div>
						<div class="form-group" id="ten">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="username">Password:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="password" value="" class="form-control" id="password" placeholder="Password" name="password">
						  </div>
						</div>
						<div class="form-group" id="eleven">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="confirm_password">Confirm password:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="password" value="" class="form-control" id="confirmpassword" placeholder="Confirm password" name="confirm password">
						  </div>
						</div>
						<div class="form-group" id="twelve">
						  <div class="col-xs-offset-3 col-xs-9 col-sm-offset-3 col-sm-9 col-md-offset-3 col-md-9 col-lg-offset-3 col-lg-9">
							<button type="button" class="btn btn-primary" onclick="register()">Submit</button>
						  </div>
						</div>
					</form>
				</div>
			</section>
		`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   productCategory();
				   stickyWork();
				   auth_token = Cookies.get('auth_token');
				   if(auth_token !== undefined) {
					   getCredits();
					   pageChanges();
					}
				}
		  	</script>`
	};

	var page = developPage(data);
	res.send(page);
});

app.get('/aboutus', function (req, res) {
	var data = {
		addJS : "",
		addCSS : `<link rel="stylesheet" href="/css/aboutus.css">`,
		pageData : `
			<section id="section3">
					<div id="d1">
						<h1> THE RESTORE STORY ... </h1>
					</div>
					<div id="d2">
						<p>
							 Restore as a product is a thought refined by a team of 6 students of IIIT VADODARA.
							 The thought process began by August,2017 and our team came up with an idea to develop
							 a market product that would be consistent with the current trends of the society and
							 on the other hand it might serve as a boon to the environment as well. Taking forward
							 this motto and after a heavy mindboggling we came up with an idea that what if there
							 would be an online store that sells products based on recycled goods. It would be nice
							 if there exists a platform where you can sell your scrap with ease and earn credits that
							 could fetch you nice recycled products for daily use. This is our idea behind ReStore.
						 </p>
					</div>
					<h2>Behind the scenes</h2>
					<div class="container">
						<!-- Media middle -->
								<div class="media" id="first">
									<div class="media-left media-middle">
										<img src="/pics/akash.jpg" class="media-object" style="width:150px">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Akash Agrawal</h4>
										<p>
											 Akash Agrawal is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 He is very fond of playing computer games, solving puzzles and watching TV
											 series. He is creative, innovative and likes to be involved in team discussions
											 and activities.
										</p>
									</div>
								</div>

								<div class="media" id="second">
									<div class="media-left media-middle">
										<img src="/pics/tanmay.jpg" class="media-object" style="width:150px">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Tanmay Khandait</h4>
										<p>
											 Tanmay Khandait is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 He is very enthusiastic and extremely creative in ideas.
											 He likes managing various activities apart from his study routine.
											 He is a helpful boy and a must have member for the team.
										</p>
									</div>
								</div>

								<div class="media" id="third">
									<div class="media-left media-middle">
										<img src="/pics/megana.jpg" class="media-object" style="width:150px">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Megana Ganapathiraju</h4>
										<p>
											 Megana Ganapathiraju is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 She likes management apart from her technical stuff.
											 She is extremely devoted to her work and likes to contribute from her side as
											 much as she can.
										</p>
									</div>
								</div>

								<div class="media" id="fourth">
									<div class="media-left media-middle">
										<img src="/pics/vikesh.jpg" class="media-object" style="width:150px">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Vikesh Meena</h4>
										<p>
											 Vikesh Meena is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 He likes sports particularly cricket apart from his studies. He plays
											 a very crucial role sometimes when it comes to supporting activities during
											 project work.
										</p>
									</div>
								</div>

								<div class="media" id="fifth">
									<div class="media-left media-middle">
										<img src="/pics/anil.jpeg" class="media-object" style="width:150px;">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Anil Sharma</h4>
										<p>
											 Anil Sharma is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 He is very fond of watching movies and playing cricket apart from his studies.
											 He is also a very active member of the team.He is also SRKian and MSDian.
										</p>
									</div>
								</div>
								<div class="media" id="sixth">
									<div class="media-left media-middle">
										<img src="/pics/madhukar.jpg" class="media-object" style="width:200px;">
									</div>
									<div class="media-body">
										<h4 class="media-heading">Madhukar Jaiswal</h4>
										<p>
											 Madhukar Jaiswal is a 5th semester B.Tech(C.S.E) student at IIIT Vadodara.
											 He is fond of watching movies, playing cricket and listening songs
											 apart from his studies. He likes to suggest and contribute as a team member.
										</p>
									</div>
								</div>
							</div>
			</section3>
		`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   productCategory();
				   stickyWork();
				   auth_token = Cookies.get('auth_token');
				   if(auth_token !== undefined) {
					   getCredits();
					   pageChanges();
					}
				}
		  	</script>`
	}

	var page = developPage(data);
	res.send(page);
});

app.get('/scrapseller', function (req, res) {
	var data = {
		addJS : `<script src="/js/scrapseller.js"></script>`,
		addCSS : `<link rel="stylesheet" href="/css/scrapseller.css">`,
		pageData : `
			<section id="section3">
			  <div class="container">
				<h1>Request Form:</h1>
				<p>Kindly enter your scrap details below.</p>
					<form class="form-horizontal">
						<div class="form-group" id="one">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3">Address:</label>
						  <label class="radio-inline col-xs-12 col-sm-4 col-md-4 col-lg-4"><input type="radio" name="optradio" value="current">Current</label>
						  <label class="radio-inline col-xs-12 col-sm-4 col-md-4 col-lg-4"><input type="radio" name="optradio" value="other">Other</label>
						</div>
						<div class="form-group" id="two">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="housedetails">House details:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="address" class="form-control" id="housedetails" placeholder="Housedetails" name="housedetails" value="">
						  </div>
						</div>
						<div class="form-group" id="three">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="landmark">Landmark</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="address" class="form-control" id="landmark" placeholder="Landmark" name="landmark" value="">
						  </div>
						</div>
						<div class="form-group" id="four">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="cdt">City/District/Town:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="address" class="form-control" id="cdt" placeholder="City/District/Town" name="cdt" value="">
						  </div>
						</div>
						<div class="form-group" id="five">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="state">State</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="address" class="form-control" id="state" placeholder="State" name="state" value = "">
						  </div>
						</div>
						<div class="form-group" id="six">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="pincode">Pincode</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" class="form-control" id="pincode" placeholder="pincode" name="pincode" value="">
						  </div>
						</div>
						<div class="form-group" id="seven">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="weight">Approx.weight:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="weight" class="form-control" id="weight" placeholder="Approx.wt(in kgs.)" name="weight" value="">
						  </div>
						</div>
						<div class="form-group" id="eight">
						  <label class="control-label col-xs-12 col-sm-3 col-md-3 col-lg-3" for="s.type">Scrap Types:</label>
						  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						  <input type="text" class="form-control" id="sType" placeholder="Eg: Paper,Plastics,etc." name="sType" value="">
						  </div>
						</div>
						<div class="form-group" id="nine">
						  <div class="col-xs-offset-3 col-xs-9 col-sm-offset-3 col-sm-9 col-md-offset-3 col-md-9 col-lg-offset-3 col-lg-9">
							<button type="button" class="btn btn-primary" onclick="extractData()">Request Pickup</button>
						  </div>
						</div>
					</form>
			  </div>
			</section>
			`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				var houseDetail;
				var landmark;
				var city;
				var state;
				var pincode;
				var weight;
				var scrapType;
				var validArea = false;
				window.onload = function(){
				   	productCategory();
					stickyWork();
				   	auth_token = Cookies.get('auth_token');
					id = Cookies.get('user_id');
				   	if(auth_token !== undefined) {
					   	getCredits();
					   	pageChanges();
					}
					addressHandler();
				}
		  	</script>`
	};

	var page = developPage(data);
	res.send(page);
});

app.get('/diy/:categoryName', function (req, res) {
	var categoryName = req.params.categoryName;

	var data = {
		addJS : `<script src="/js/diy.js"></script>`,
		addCSS : `<link rel="stylesheet" href="/css/diy.css">`,
		pageData : `
			<div class="menu">
				<div class="vertical-menu">
					<a href="/diy/all" class="active">All Videos</a>
					<a href="/diy/Clothes">Clothes</a>
					<a href="/diy/Covers">Covers</a>
					<a href="/diy/Bottles">Bottles</a>
					<a href="/diy/Paper">Paper</a>
				</div>

				<div class="videos" id="video_display">
				<!-- To be popluated by query -->
				</div>
			</div>
			`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   productCategory();
				   stickyWork();
				   loadVideos("${categoryName}");
				   auth_token = Cookies.get('auth_token');
				   if(auth_token !== undefined) {
					   getCredits();
					   pageChanges();
					}
				}
		  	</script>`
	};

	var page = developPage(data);
	res.send(page);
});

app.get('/products/:productID', function (req, res) {
	var prodID = req.params.productID;
	var prodName;
	var price;
	var desc;
	var totStock;
	var categoryName;

	var prodReq= new XMLHttpRequest();

	prodReq.onreadystatechange= function(){
		if (prodReq.readyState === XMLHttpRequest.DONE){
			if(prodReq.status=== 200){
				//process response data
                var prodRes = JSON.parse(prodReq.responseText);
                prodName = prodRes[0].Product_Name;
				price = prodRes[0].Price;
				desc = prodRes[0].Description;
				totStock = prodRes[0].Total_Stock;
				categoryName = prodRes[0].Category_Name;

				var data = {
					addJS : `<script src="/js/product_detail.js"></script>`,
					addCSS : `<link rel="stylesheet" href="/css/product_detail.css">`,
					pageData : `
						<section id="section4">
						<div class = "item">
						<ul class = "pager">
							 <li>
							  <a href = "/product/${categoryName}"><i class="fa fa-arrow-left fa-lg" aria-hidden="true">Back</i></a>
							</li>
						</ul>
						<div class= "pic">
							<img src="/pics/${prodID}.jpg"  width="500" height="400">
						</div>
						<div class= "details">
							<h1> ${prodName} </h1>
							<font size="4">${desc}</font>
							<br><br>
							<font size="6">Credits :</font>
								<i class="fa fa-money fa-3x" aria-hidden="true"></i>
								  <font size="6">${price}</font>
								   <br> <br>
									<font size="6">No. of Pieces Left : ${totStock}</font>
									  <br> <br>
								  <div class="cart" >
							  <!-- Add to cart button is implemented here along with the onclick event to fire a function call on clicking the button-->
									<a href="#"><button class="but" onclick="#">
							   <font size="6">Add to Cart: </font>
									  <i class="fa fa-cart-plus fa-3x" aria-hidden="true"></i>
							   </button>
							  </a>
								  </div>
							</div>
						</div>
						</section>
					`,
					windowLoad : `
						<script type="text/javascript">
							var auth_token;
							var id;
							var credits;
							window.onload = function(){
							   	productCategory();
								stickyWork();
								auth_token = Cookies.get('auth_token');
							   	if(auth_token !== undefined) {
								   	getCredits();
							   		pageChanges();
								}
							}
						</script>
					`
				};
				var page = developPage(data);
				res.send(page);
			} else {
				console.log("Product Status Code:"+prodReq.status+" Response "+prodReq.responseText);
			}
        }

	}
	//make the request
	prodReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	prodReq.setRequestHeader('Content-Type', 'application/json');
	prodReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"Product",
			columns:[
				"*"
			],
			where: {
				"Product_ID": prodID
			},
			order_by: "-Add_Time"
		}
	}));
});

app.get('/product/:categoryname', function (req, res) {
	var categoryName = req.params.categoryname;

	var data = {
		addJS : `<script src="/js/products.js"></script>`,
		addCSS : `<link rel="stylesheet" href="/css/products.css">`,
		pageData : `
			<div class="products">
			<div class= "categories" >

			<a href="#" class="active">Filters</a>
			  <a href="#">
				SIZE :
				<select style="width:50%;">
					<option value="s">S</option>
					<option value="m">M</option>
					<option value="l">L</option>
					<option value="xl">XL</option>
				</select>
				</a>
			 <a href="#">Price :
				<select style="width:50%;">
					<option value="min">0-1000</option>
					<option value="less">1000-5000</option>
					<option value="more">5000-10000</option>
					<option value="high">above 10000</option>
				</select>
				</a>
			  <a href="#">Sort by :
				<select style="width:50%;>
					<option value="less">Less Prize</option>
					<option value="more">More Prize</option>
					<option value="rel">Relevance</option>
					<option value="pop">Popularity</option>

				</select>


			  </a>
			  </div>

			<div class="images" id="product_display">
				<!-- Populated by query -->
			</div>
			<br><br><br><br><br><br> <br><br><br><br><br><br>
			<br><br><br><br><br><br> <br><br><br><br><br><br>
			</div>
			<br><br><br><br><br><br> <br><br><br><br><br><br>
			<br><br><br><br><br><br> <br><br><br><br><br><br>
		`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   	productCategory();
					stickyWork();
					auth_token = Cookies.get('auth_token');
				   	if(auth_token !== undefined) {
					   	getCredits();
				   		pageChanges();
					}
					loadProducts("${categoryName}");
				}
			</script>
		`
	};
	var page = developPage(data);
	res.send(page);
});

app.get('/', function (req, res) {
	var data = {
		addJS : "",
		addCSS : `<link rel="stylesheet" href="/css/main.css">`,
		pageData : `
			<section id="section3">
			  <div class="container-fluid">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg">
				  <div id="myCarousel" class="carousel slide" data-ride="carousel">
					  <!-- Indicators -->
					  <ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
						<li data-target="#myCarousel" data-slide-to="3"></li>
					  </ol>

					  <!-- Wrapper for slides -->
					  <div class="carousel-inner">
						<div class="item active">
						  <a href="/offers"><img class="img-responsive" src="/pics/latest.jpeg" alt="Offers">
						  <div class="carousel-caption">
							<h2>Offers</h2>
							<h3>Click to get the offer items!</h3>
						  </div>
						  </a>
						</div>


						<div class="item">
						  <a href="/product/Garments"><img class="img-responsive" src="/pics/Garments.jpeg" alt="Garments">
						  <div class="carousel-caption">
							<h2>Latest!</h2>
							<h3>Latest in Garments</h3>
						  </div>
						  </a>
						</div>


						<div class="item">
						  <a href="/product/Furniture"><img class="img-responsive" src="/pics/Sofa.jpeg" alt="Furniture">
						  <div class="carousel-caption">
							<h2>Grand!</h2>
							<h3>Decoration counts!</h3>
						  </div>
						  </a>
						</div>


					<div class="item">
						<a href="/product/Shoes"><img class="img-responsive" src="/pics/Boots.jpeg" alt="Shoes">
						<div class="carousel-caption">
						  <h2>Stylish!</h2>
						  <h3>Sporty Look!</h3>
						</div>
						</a>
					  </div>


					  <!-- Left and right controls -->
					  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
						<span class="glyphicon glyphicon-chevron-left"></span>
						<span class="sr-only">Previous</span>
					  </a>
					  <a class="right carousel-control" href="#myCarousel" data-slide="next">
						<span class="glyphicon glyphicon-chevron-right"></span>
						<span class="sr-only">Next</span>
					  </a>
				  </div>
				 </div>
				</div>
			  </div>
			</section>
			  <section id="section4">
				<div class="container-fluid">
				  <h1><strong>TRY OUR EXCLUSIVE COLLECTION</strong></h1>
				  <p>The ultimate collection of recycled goods made of Waste materials
					manufactured by some of the top class recycled products manufacturing
					companies.That too for the cost of your discarded waste!</p>
				  </div>
			  </section>
			`,
		windowLoad : `
			<script type="text/javascript">
				var auth_token;
				var id;
				var credits;
				window.onload = function(){
				   productCategory();
				   stickyWork();
				   auth_token = Cookies.get('auth_token');
				   if(auth_token !== undefined) {
					   getCredits();
					   pageChanges();
					}
				}
		  	</script>`
	};

	var page = developPage(data);
	res.send(page);
});

app.listen(8080, function () {
  console.log('ReStore listening on port 8080!');
});

function developPage(data) {

	var addJS = data.addJS;
	var addCSS = data.addCSS;
	var pageData = data.pageData;
	var windowLoad = data.windowLoad;
	/*	Part to be shifted to function callers
		addCSS = "<link rel=\"stylesheet\" href=\"/css/"+pageName+".css\">";
		addJS = "<script src=\"/js/"+pageName+".js\"></script>"; */
	var baseTemplate = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
			  <!-- Latest compiled and minified CSS -->
			  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
			  <link rel="stylesheet" href="/css/base.css">
			  ${addCSS}
			  <!-- jQuery library -->
			  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
			  <!-- Latest compiled JavaScript -->
			  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
			  <!-- third party library -->
			  <script src="https://use.fontawesome.com/8933f968b0.js"></script>
			   <!-- external javascript file-->
			   <!-- <script src="/js/toggle.js"></script> -->
			   <script src="/js/js.cookie.js"></script>
			   <script src="/js/base.js"></script>
			   ${addJS}
			  <meta charset="utf-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1">
			</head>
			<!-- <body background="/pics/background.png"> -->
			  <div class="main">
			  <section id="section1">
			  <div class="container-fluid" id="a">
			  <div class="row" id="b">
				<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
					  <a href="/"><h2>ReStore</h2></a>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
				  <form>
					   <div class="input-group">
						 <input type="text" class="form-control" placeholder="Search for Products...">
						 <div class="input-group-btn">
						   <button class="btn btn-default" type="button" onclick="toDo()">
							 <i class="glyphicon glyphicon-search"></i>
						   </button>
						 </div>
					   </div>
				  </form>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
					<div style="text-align:center;padding-top:10px;" id="credits">
						<font size="6"><strong>Credits:0</strong></font>
						<i class="fa fa-money fa-2x" aria-hidden="true"></i>
					</div>
				</div>
				<div id="profile_part" class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
				  <div style="padding-top:10px;">
					<button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#myModal">Login/Register</button>
				  </div>
				</div>
			  </div>
			  </div>
			</section>

			<section id="section2">
			  <nav class="navbar navbar-inverse myc">
				  <div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					  <span class="icon-bar"></span>
					  <span class="icon-bar"></span>
					  <span class="icon-bar"></span>
					</button>
				  </div>
				  <div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav">
					  <li><a class="active" href="/">Home</a></li>
					  <li class="dropdown">
						<a href="#" data-toggle="dropdown" class="dropdown-toggle">
						  Products<b class="caret"></b>
						</a>
						<ul class="dropdown-menu" id="drop">
						  <!--To be populated via productscategory() function-->
						</ul>
					  </li>
					  <li><a href="/diy/all">Do It Yourself</a></li>
					  <li id="scrap_part"><a data-toggle="modal" data-target="#myModal">For Scrap Sellers</a></li>
					  <li><a href="/aboutus">About Us</a></li>
					</ul>
				  </div>
			  </nav>
			</section>
		<!-- End of Upper Part -->
		${pageData}
		<!-- Start of Bottom Part -->
			<section id="section5">
			  <footer>
					Developed By:Hexagineers, Backend Powered by <a href="https://hasura.io/" target="_blank">Hasura</a>
			  </footer>
			</section>

			<section>
				<!-- Modal HTML -->
				<div id="myModal" class="modal fade">
				  <div class="modal-dialog modal-login">
					<div class="modal-content">
					  <div class="modal-header">
						<div class="avatar">
						  <img src="/pics/loginavatar.png" alt="Avatar">
						</div>
						<h4 class="modal-title">User Login</h4>
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					  </div>
					  <div class="modal-body">
						<form id="loginform">
						  <div class="form-group">
							<input id="username" type="text" class="form-control" name="username" placeholder="Username" required="required">
						  </div>
						  <div class="form-group">
							<input id="password" type="password" class="form-control" name="password" placeholder="Password" required="required">
						  </div>
						  <div class="form-group">
							<button type="button" class="btn btn-primary btn-lg btn-block login-btn" onclick="login()">Login</button>
						  </div>
						</form>
					  </div>
					  <div class="modal-footer">
						<p><a href="/register">New User? Sign In!</a></p>
					  </div>
					</div>
				  </div>
				</div>
			</section>

		  </div>
		  </body>
		${windowLoad}
		</html>
		`;

	return baseTemplate;
}

/* Unimplemented Features

app.post('/productcategory', function (req, res){


	var prodCategory= new XMLHttpRequest();

	prodCategory.onreadystatechange= function(){
		if (prodCategory.readyState === XMLHttpRequest.DONE){
			if(prodCategory.status=== 200){
				res.setHeader('Content-Type', 'application/json');
				res.send(this.responseText);
			}
			else if(prodCategory.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(prodCategory.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+this.status);
			}
		}
	}
	//make the request
	prodCategory.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	prodCategory.setRequestHeader('Content-Type', 'application/json');
	prodCategory.send(JSON.stringify({type:"select",args:{table:"Product_Category",columns:["*"]}}));


});

app.post('/videocategory', function (req, res){

 	//var Category_Name = req.body.Category;



	var cart= new XMLHttpRequest();

	cart.onreadystatechange= function(){
		if (cart.readyState === XMLHttpRequest.DONE){
			if(cart.status=== 200){
				res.setHeader('Content-Type', 'application/json');
				res.send(this.responseText);
			}
			else if(cart.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(cart.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+this.status);
			}
		}
	}
	//make the request
	cart.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	cart.setRequestHeader('Content-Type', 'application/json');
	cart.send(JSON.stringify({type:"select",args:{table:"Video_Category",columns:["Category_Name"]}}));


});

app.post('/cart', function (req, res){

	//console.log("Started Cart function.");

	var authToken = req.body.auth_token;
	var id = req.body.user_id;


 	console.log(authToken);

	var cart= new XMLHttpRequest();

	cart.onreadystatechange= function(){
		if (cart.readyState === XMLHttpRequest.DONE){
			if(cart.status=== 200){
				//id = JSON.parse(this.responseText).hasura_id;
				res.setHeader('Content-Type', 'application/json');
				res.send(this.responseText);
				//res.send("user_id"+id);
				//	console.log(id);
			}
			else if(cart.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(cart.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+this.status);
			}
		}
	}
	//make the request
	cart.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	cart.setRequestHeader('Authorization', 'Bearer ' + authToken);
	cart.setRequestHeader('Content-Type', 'application/json');
	cart.send(JSON.stringify({
		type:"select",
		args:{
			table:"User_Cart",
			columns:["*"],
			where: {
				user_id: id
			}
		}
	}));

});

app.post('/notification', function (req, res){

	var notification= new XMLHttpRequest();

	notification.onreadystatechange= function(){
		if (notification.readyState === XMLHttpRequest.DONE){
			if(notification.status=== 200){
				res.setHeader('Content-Type', 'application/json');
				res.send(this.responseText);
			}
			else if(notification.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(notification.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log("Credit Status Code:"+this.status);
			}
		}
	}
	//make the request
	notification.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	notification.setRequestHeader('Content-Type', 'application/json');
	notification.send(JSON.stringify({type:"select",args:{table:"Customer_Notification",columns:["*"]}}));


});

app.post('/videos', function (req, res) {
	var categoryName = req.body.categoryName;

	/*var token = req.header('Authorization');
	console.log("Auth Token extracted: "+token);*/

	/*if(categoryName === undefined) {
		categoryName = "Garments";
	}
	var vidReq= new XMLHttpRequest();

	vidReq.onreadystatechange= function(){
		if (vidReq.readyState === XMLHttpRequest.DONE){
			if(vidReq.status=== 200){
				//res.setHeader('Content-Type', 'application/json');
				res.setHeader('Content-Type', 'application/json');
				res.send(vidReq.responseText);
			}
			else if(vidReq.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(vidReq.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(" Response "+vidReq.responseText);
			}
		}
	}
	//make the request
	vidReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	vidReq.setRequestHeader('Content-Type', 'application/json');
	vidReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"DIY_Video",
			columns:[
			"*"
			],
			where: {
				"Category_Name": categoryName
			}
		}
	}));

});

app.post('/scrap', function (req, res) {
	var scrapType = req.body.scrapType;

	var scrapReq= new XMLHttpRequest();

	scrapReq.onreadystatechange= function(){
		if (scrapReq.readyState === XMLHttpRequest.DONE){
			if(scrapReq.status=== 200){
				res.send(scrapReq.responseText);
			}
			else if(scrapReq.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(scrapReq.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(" Response "+scrapReq.responseText);
			}
		}
	}
	//make the request
	scrapReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	scrapReq.setRequestHeader('Content-Type', 'application/json');
	scrapReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"Scrap",
			columns:[
			"*"
			]
		}
	}));
});

app.post('/profile', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;

	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				var response=JSON.parse(profRequest.responseText);

				var username = response[0].username;
				var name = response[0].Name;
                var credits = response[0].Credits;
                var mobile_number = response[0].Mobile_Number;
                var state = response[0].State;
				var city = response[0].City;
				var landmark = response[0].Landmark;
				var houseDetail = response[0].House_Detail;
				var pincode = response[0].Pincode;

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                				userName:username,
                				Name: name,
								Credits: credits,
								Mob_No: mobile_number,
								State : state,
								City : city,
								Landmark : landmark,
								House_Detail : houseDetail,
								Pincode : pincode
							}));

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "select",
					args: {
						table: "Customer",
						columns:[
							"user_id",
							"username",
							"Name",
							"Mobile_Number",
							"Credits",
							"State",
							"City",
							"Landmark",
							"House_Detail",
							"Pincode"
						],
						where:
						{
				               user_id: id
			            }
				}}));
});

app.post('/shoppingHistory', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;


	var odrHisRequest= new XMLHttpRequest();
	odrHisRequest.onreadystatechange= function(){
		if (odrHisRequest.readyState === XMLHttpRequest.DONE){
			if(odrHisRequest.status=== 200){
				var response=JSON.parse(odrHisRequest.responseText);
				console.log("readyState="+odrHisRequest.readyState+", status="+odrHisRequest.status+", response="+odrHisRequest.responseText);

				/*var order_id = response[0].Order_ID;
				var order_date = response[0].Order_Date;
				//var shipping_date = response[0].Shipping_Date;
				//var name = response[0].Name;
                var credits = response[0].Credit_Cost;
                var delivery_status = response[0].Delivery_status;
                //var mobile_number = response[0].Mobile_Number;
                /*var state = response[0].State;
				var city = response[0].City;
				var landmark = response[0].Landmark;
				var houseDetail = response[0].House_Detail;
				var pincode = response[0].Pincode;

                res.setHeader('Content-Type', 'application/json');
                /*res.send(JSON.stringify({
                				//userName:username,
                				//Name: name,
								//Credits: credits,
								//Mob_No: mobile_number,
								Order_ID : order_id,
								Order_Date : order_date,
								Delivery_status : delivery_status,
								Credit_Cost : credits
								}));
			res.send(response);

			}
			else if(odrHisRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(odrHisRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(odrHisRequest.status+" Response "+odrHisRequest.responseText);
			}
		}
	}

	//make the request
	odrHisRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	odrHisRequest.setRequestHeader('Content-Type', 'application/json');
	odrHisRequest.setRequestHeader('Authorization', 'Bearer '+authToken);

	odrHisRequest.send(JSON.stringify({
		type: "select",
		args: {
			table: "shopping_history",
			columns:[
				"Order_ID",
				"Order_Date",
				"Credit_Cost"
			],
			where:
			{
	               user_id: id,
	               Delivery_Status:true
            }
	}}));
});

app.post('/scrapSellingHistory', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;

	var pntHisRequest= new XMLHttpRequest();
	pntHisRequest.onreadystatechange= function(){
		if (pntHisRequest.readyState === XMLHttpRequest.DONE){
			if(pntHisRequest.status=== 200){

                var response=JSON.parse(pntHisRequest.responseText);
				console.log("readyState="+pntHisRequest.readyState+", status="+pntHisRequest.status+", response="+pntHisRequest.responseText);

				//var request_id = response[0].Request_ID;
                //var credits = response[0].Credit_Given;

                res.setHeader('Content-Type', 'application/json');
                /*res.send(JSON.stringify({
								Payment_ID : payment_id,
								Date : payment_date,
								Time : payment_time,
								Credit_Cost : credits
							}));
			res.send(response);

			}
			else if(pntHisRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(pntHisRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(pntHisRequest.status+" Response "+pntHisRequest.responseText);
			}
		}
	}

	//make the request
	pntHisRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	pntHisRequest.setRequestHeader('Content-Type', 'application/json');
	pntHisRequest.setRequestHeader('Authorization', 'Bearer '+authToken);


	pntHisRequest.send(JSON.stringify({
		type: "select",
		args: {
			table: "Request",
			columns:[
				"Request_ID",
		     	"Credits_Given"
			],
			where:
			{
	               user_id: id
            }
	}}));
});

app.post('/nameChange', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var newName = req.body.new_name;

	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "update",
					args: {
						table: "Customer",
						"$set": {
							Name:newName
						},
						where:
						{
				               user_id: id
			            },
			          returning: ["Name"]
				}}));
});

app.post('/addressChange', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var newState = req.body.new_state;
	var newCity = req.body.new_city;
	var newLandmark = req.body.new_landmark;
	var newHouseDetail = req.body.new_housedetail;
	var newPincode = req.body.new_pincode;


	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "update",
					args: {
						table: "Customer",
						"$set": {
							House_Detail:newHouseDetail,
							Landmark:newLandmark,
							City:newCity,
							State:newState,
							Pincode:newPincode
						},
						where:
						{
				               user_id: id
			            },
			          returning: ["House_Detail"]
				}}));
});

app.post('/mbNoChange', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var newMbNo = req.body.new_mbno;

	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "update",
					args: {
						table: "Customer",
						"$set": {
							Mobile_Number:newMbNo
						},
						where:
						{
				               user_id: id
			            },
			          returning: ["Mobile_Number"]
				}}));
});

app.post('/addToCart', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var Product_Id = req.body.product_id;
	//var Quantity = req.body.quantity;
	/*console.log(JSON.stringify({
					type: "insert",
					args: {
						table: "User_Cart",
						objects: [
							{Customer_ID : id},
							{Product_ID : Product_Id}
						],
			          returning: ["Customer_ID"]
				}}));


	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "insert",
					args: {
						table: "User_Cart",
						objects: [
							{Customer_ID : id},
							{Product_ID : Product_Id}
						],
			          returning: ["Customer_ID"]
				}}));
});

app.post('/deleteToCart', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var Product_Id = req.body.product_id;

	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "delete",
					args: {
						table: "User_Cart",
						where: {
						  Product_ID : Product_Id,
						  Customer_ID : id
						}
				}}));
});

app.post('/updateQuantity', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var updtQuantity = req.body.update_quantity;

	var profRequest= new XMLHttpRequest();
	profRequest.onreadystatechange= function(){
		if (profRequest.readyState === XMLHttpRequest.DONE){
			if(profRequest.status=== 200){

				console.log("readyState="+profRequest.readyState+", status="+profRequest.status+", response="+profRequest.responseText);
				//var response=JSON.parse(profRequest.responseText);

				//var username = response[0].username;
				//var name = response[0].Name;

                res.setHeader('Content-Type', 'application/json');

                res.send(profRequest.responseText);

			}
			else if(profRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(profRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(profRequest.status+" Response "+profRequest.responseText);
			}
		}
	}

	//make the request
	profRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	profRequest.setRequestHeader('Content-Type', 'application/json');
	profRequest.setRequestHeader('Authorization', 'Bearer '+authToken);
	profRequest.send(JSON.stringify({
					type: "update",
					args: {
						table: "User_Cart",
						"$set": {
							Quantity: updtQuantity
						},
						where:
						{
				               Customer_ID: id
			            },
			          returning: ["Quantity"]
				}}));
});

app.post('/kbdlogin', function (req, res) {

	var userName = req.body.username;
	var passWord = req.body.password;

	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status=== 200){
				var authToken = JSON.parse(request.responseText).auth_token;
				var id = JSON.parse(request.responseText).hasura_id;

			    res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify({
					auth_token: authToken,
					user_id : id
				}));

			}
			else if(request.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(request.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(request.status);
			}
		}
	}
	//make the request
	request.open('POST', 'https://auth.financially92.hasura-app.io/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({
		username: userName,
		password: passWord
	}));
});

app.post('/requestForm', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var RequestId = req.body.request_id;

	var odrHisRequest= new XMLHttpRequest();
	odrHisRequest.onreadystatechange= function(){
		if (odrHisRequest.readyState === XMLHttpRequest.DONE){
			if(odrHisRequest.status=== 200){
				var response=JSON.parse(odrHisRequest.responseText);
				console.log("readyState="+odrHisRequest.readyState+", status="+odrHisRequest.status+", response="+odrHisRequest.responseText);

                res.setHeader('Content-Type', 'application/json');
                /*res.send(JSON.stringify({
                				//userName:username,
                				//Name: name,
								//Credits: credits,
								//Mob_No: mobile_number,
								Order_ID : order_id,
								Order_Date : order_date,
								Delivery_status : delivery_status,
								Credit_Cost : credits
								}));
			res.send(odrHisRequest.responseText);
			console.log("response="+odrHisRequest.responseText);

			}
			else if(odrHisRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(odrHisRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(odrHisRequest.status+" Response "+odrHisRequest.responseText);
			}
		}
	}

	//make the request
	odrHisRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	odrHisRequest.setRequestHeader('Content-Type', 'application/json');
	odrHisRequest.setRequestHeader('Authorization', 'Bearer '+authToken);

	odrHisRequest.send(JSON.stringify({
		type: "select",
		args: {
			table: "Request",
			columns:[
			    "Request_ID",
			    "user_id",
			    "State",
				"City",
				"Landmark",
				"House_Detail",
				"Pincode"
			    ],
			where:
			{
	               Status:false,
	               Kabadiwala_ID:null            }
	}}));
});

app.post('/requestForm1', function (req, res) {

	var authToken = req.body.auth_token;
	var id = req.body.user_id;
	var RequestId = req.body.request_id;
	var kabadiwalaID = req.body.kabadiwala_id;

	var odrHisRequest= new XMLHttpRequest();
	odrHisRequest.onreadystatechange= function(){
		if (odrHisRequest.readyState === XMLHttpRequest.DONE){
			if(odrHisRequest.status=== 200){
				var response=JSON.parse(odrHisRequest.responseText);
				console.log("readyState="+odrHisRequest.readyState+", status="+odrHisRequest.status+", response="+odrHisRequest.responseText);

                res.setHeader('Content-Type', 'application/json');
                /*res.send(JSON.stringify({
                				//userName:username,
                				//Name: name,
								//Credits: credits,
								//Mob_No: mobile_number,
								Order_ID : order_id,
								Order_Date : order_date,
								Delivery_status : delivery_status,
								Credit_Cost : credits
								}));
			res.send(odrHisRequest.responseText);
			console.log("response="+odrHisRequest.responseText);

			}
			else if(odrHisRequest.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(odrHisRequest.status=== 500){
				console.log('Something went wrong');
			}
			else{
				console.log(odrHisRequest.status+" Response "+odrHisRequest.responseText);
			}
		}
	}

	//make the request
	odrHisRequest.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
	odrHisRequest.setRequestHeader('Content-Type', 'application/json');
	odrHisRequest.setRequestHeader('Authorization', 'Bearer '+authToken);

	odrHisRequest.send(JSON.stringify({
		type: "select",
		args: {
			table: "Request",
			columns:[
			    "Request_ID",
			    "user_id",
			    "State",
				"City",
				"Landmark",
				"House_Detail",
				"Pincode"
			    ],
			where:
			{
	               Status:false,
	               Kabadiwala_ID:kabadiwalaID            }
	}}));
});
*/
