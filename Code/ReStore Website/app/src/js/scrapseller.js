function addressHandler() {
    $('#two input[type="address"]').prop("disabled", true);
    $('#three input[type="address"]').prop("disabled", true);
    $('#four input[type="address"]').prop("disabled", true);
    $('#five input[type="address"]').prop("disabled", true);
    $('#six input[type="text"]').prop("disabled", true);
    $('input[type="radio"]').click(function(){
          var currentradioValue = $('input[type="radio"]:checked');
          if(currentradioValue.val() == "current"){
            $('#two input[type="address"]').prop("disabled", true);
            $('#three input[type="address"]').prop("disabled", true);
            $('#four input[type="address"]').prop("disabled", true);
            $('#five input[type="address"]').prop("disabled", true);
            $('#six input[type="text"]').prop("disabled", true);
          }else if(currentradioValue.val() == "other"){
            $('#two input[type="address"]').prop("disabled", false);
            $('#three input[type="address"]').prop("disabled", false);
            $('#four input[type="address"]').prop("disabled", false);
            $('#five input[type="address"]').prop("disabled", false);
            $('#six input[type="text"]').prop("disabled", false);
        }
    });
}

function getUserAddress() {
    var addressReq= new XMLHttpRequest();

	addressReq.onreadystatechange= function(){
		if (addressReq.readyState === XMLHttpRequest.DONE){
			if(addressReq.status=== 200){
				//process response data
                var addressRes = JSON.parse(addressReq.responseText);
                houseDetail = addressRes[0].House_Detail;
                landmark = addressRes[0].Landmark;
                city = addressRes[0].City;
                state = addressRes[0].State;
                pincode = addressRes[0].Pincode;
			} else{
				console.log("Address Status Code:"+addressRes.status+" Response "+addressRes.responseText);
			}
        }

	}
	//make the request
	addressReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
    addressReq.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	addressReq.setRequestHeader('Content-Type', 'application/json');
	addressReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"Customer",
			columns:[
                "House_Detail",
				"Landmark",
				"State",
                "Pincode",
                "City"
			],
			where: {
				"user_id": id
			}
		}
	}));
}

function submitRequest() {

    var areaReq= new XMLHttpRequest();

	areaReq.onreadystatechange= function(){
		if (areaReq.readyState === XMLHttpRequest.DONE){
			if(areaReq.status=== 200){
				//process response data
                var areaRes = JSON.parse(areaReq.responseText);
                var enteredpin = pincode;

                for(var i=0; i<areaRes.length; i++) {
                    console.log("Entered: "+enteredpin+", Current: "+areaRes[i].Area_Pincode);
                    if(enteredpin === areaRes[i].Area_Pincode) {
                        alert("Pincode Valid!");
                        var formReq = new XMLHttpRequest();

                    	formReq.onreadystatechange= function(){
                    		if (formReq.readyState === XMLHttpRequest.DONE){
                    			if(formReq.status=== 200){
                    				var formRes = JSON.parse(formReq.responseText);
                                    alert("Request submitted with Request ID:"+formRes.returning[0].Request_ID);
                    			}
                    			else if(formReq.status=== 403){
                    				console.log('Incorrect credentials');
                    			}
                    			else if(formReq.status=== 500){
                    				console.log('Something went wrong');
                    			}
                    			else{
                    				console.log("Product Status Code:"+formReq.status+" Response "+formReq.responseText);
                    			}
                    		}
                    	}
                    	//make the request
                    	formReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
                    	formReq.setRequestHeader('Authorization', 'Bearer '+ auth_token);
                    	formReq.setRequestHeader('Content-Type', 'application/json');
                    	formReq.send(JSON.stringify({
                    		type: "insert",
                    		args: {
                    			table: "Request",
                    			objects:[
                    				{
                                        Request_ID: 4,
                    					user_id: id,
                    					Approximate_Weight: weight,
                    					House_Detail: houseDetail,
                    					Landmark: landmark,
                    					State: state,
                    					Pincode: pincode,
                    					City: city,
                                        Scrap_Type: scrapType
                    				}
                    			],
                    			returning: ["Request_ID"]
                    		}

                    	}));
                    }
                }
			} else{
				console.log("Address Status Code:"+areaRes.status+" Response "+areaRes.responseText);
			}
        }

	}
	//make the request
	areaReq.open('POST', 'https://data.financially92.hasura-app.io/v1/query', true);
    areaReq.setRequestHeader('Content-Type', 'application/json');
	areaReq.send(JSON.stringify({
		type:"select",
		args:{
			table:"Operational_Area",
			columns:[
                "*"
			]
		}
	}));
}

function extractData() {

    weight = document.getElementById("weight").value;
    scrapType = document.getElementById("sType").value;

    var currentradioValue = $('input[type="radio"]:checked');
    if(currentradioValue.val() == "current") {
        getUserAddress();
    } else if(currentradioValue.val() == "other") {
        houseDetail = document.getElementById("housedetails").value;
        landmark = document.getElementById("landmark").value;
        city = document.getElementById("cdt").value;
        state = document.getElementById("state").value;
        pincode = document.getElementById("pincode").value;
    } else {
        alert("No Radio Boxes selected.");
        return 1;
    }
    submitRequest();
    /*if(validArea === true) {

    } else {
        alert("Sorry! Our services are not currently available in your area.");
    }*/
}
