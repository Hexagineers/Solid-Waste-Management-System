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
	}*/
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
				var pincode = response[0].Pincode;*/

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
								}));*/
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
							}));*/
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
	*/

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
								}));*/
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
								}));*/
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

app.get('/', function (req, res) {
	res.sendFile("/html/Backend.html", {root});
});

app.listen(8080, function () {
  console.log('ReStore listening on port 8080!');
});
