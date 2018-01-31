function register() {
	var userName = document.getElementById("username").value;
	var passWord = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirmpassword").value;
	var mobile = document.getElementById("mobile").value;
	var name = document.getElementById("name").value;
	var houseDetail = document.getElementById("housedetail").value;
	var landmark = document.getElementById("landmark").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var pincode = document.getElementById("pincode").value;

	var request= new XMLHttpRequest();

	if(userName === "" || passWord === "" || confirmpassword === "" || mobile === "" || name === "" || houseDetail === "" || landmark === "" || city === "" || state === "" || pincode === "") {
		alert("Please fill all the fields");
	} else if(passWord !== confirmPassword) {
		alert("Password and Confirm Password doesn't match!");
	} else if(pincode.length !== 6) {
		alert("Invalid Pincode!");
	} else if(mobile.length !== 10) {
        alert("Invalid Mobile Number!");
    } else {
		request.onreadystatechange= function(){
			//console.log("Request state = "+request.readyState+"Status: "+this.status+", Response: "+this.responseText);
			if (request.readyState === XMLHttpRequest.DONE){
                var response = JSON.parse(this.responseText);
				if(request.status=== 200){
					var authToken = response.auth_token;
					var id = response.user_id;
					var username = response.username;
					Cookies.set('auth_token', authToken);
					Cookies.set('user_id', id);
                    alert("Registered Successfully!");
				} else{
					alert(this.responseText);
				}
			}
		}

		//make the request
		request.open('POST', 'https://restore.financially92.hasura-app.io/register', true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify({
			username: userName,
			password: passWord,
			mobile: mobile,
			name: name,
			houseDetail: houseDetail,
			landmark: landmark,
			city: city,
			state: state,
			pincode: pincode
		}));
	}
}
