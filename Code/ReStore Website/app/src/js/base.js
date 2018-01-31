function login() {

	var userName = document.getElementById("username").value;
	var passWord = document.getElementById("password").value;

	var request= new XMLHttpRequest();

	request.onreadystatechange= function(){
		if (request.readyState === XMLHttpRequest.DONE){
			var response = JSON.parse(this.responseText);
			if(request.status=== 200){
				authToken = response.auth_token;
				id = response.user_id;
				credits = response.user_credits;
				Cookies.set('auth_token', authToken);
				Cookies.set('user_id', id);
                $('#myModal').modal('hide');
				document.getElementById("credits").innerHTML = `<font size="6"><strong>Credits:${credits}</strong></font>
																<i class="fa fa-money fa-2x" aria-hidden="true"></i>`;
				pageChanges();
				alert("Logged In Successfully!");
  			}
  			else{
  				alert("Something went wrong!");
  			}
		}
	}

	//make the request
	request.open('POST', 'https://restore.financially92.hasura-app.io/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({
		username: userName,
		password: passWord
	}));
}

function productCategory(){

	var request= new XMLHttpRequest();

	request.onreadystatechange= function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status=== 200){
				var response = JSON.parse(this.responseText);

				var list = "";
				for(var i=0 ; i<response.length; i++) {
					list += `<li><a href="/product/`+response[i].Category_Name+`">`+response[i].Category_Name+"</a></li>";
				}
				document.getElementById("drop").innerHTML = list;
			}
			else{
				alert(response);
			}
		}
	}

	//make the request
	request.open('POST', 'https://restore.financially92.hasura-app.io/productcategory', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({}));
}

function toDo() {
	alert("Yet to Implement!");
}

function getCredits() {
	var authToken = Cookies.get('auth_token');
	var id = Cookies.get('user_id');

	var request= new XMLHttpRequest();

	request.onreadystatechange= function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status=== 200){
				var credits = JSON.parse(this.responseText).user_credits;
				document.getElementById("credits").innerHTML = `<font size="6"><strong>Credits:${credits}</strong></font>
																<i class="fa fa-money fa-2x" aria-hidden="true"></i>`;
			}
			else {
				alert(this.responseText);
			}
		}
	}

	//make the request
	request.open('POST', 'https://restore.financially92.hasura-app.io/credit', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({auth_token: authToken, user_id: id}));
}

function pageChanges() {
    document.getElementById("scrap_part").innerHTML = `<a href="/scrapseller">Scrap Selling</a>`;
    document.getElementById("profile_part").innerHTML = `<div class="top">
         <div style="padding-top:10px;">
           <a href="/cart"> <i class="fa fa-shopping-cart fa-3x" aria-hidden="true" ></i></a>

           <div class="dropdown" style="float:right; margin-right:2px;" >
               <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                <i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>
               </a>
               <ul class="dropdown-menu">
                 <li><a href="/profile">Profile</a></li>
                 <li><a href="/logout">Logout</a></li>
               </ul>
             </div>

             <div class="dropdown" style="float:right; margin-right:2px;">
               <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                 <i class="fa fa-bell fa-3x" aria-hidden="true"></i>
               </a>
               <ul class="dropdown-menu">

                 <button onclick="toDo()" class="dropbtn">11/11/2017 : Review your pickup</button>
                 <button onclick="toDo()" class="dropbtn">10/11/2017 : Review your pickup</button>
                 <button onclick="toDo()" class="dropbtn">09/11/2017 : Review your pickup</button>

               </ul>
             </div>
           </div>
         </div>`
}

function stickyWork() {
	$("#myNavbar .dropdown").click(function(){
	  $("#myNavbar .dropdown>ul.dropdown-menu").slideToggle("fast");
	});
	var navOffset = jQuery("nav").offset().top;
	jQuery(window).scroll(function(){
	  var scrollPos = jQuery(window).scrollTop();
	  if(scrollPos>=navOffset){
	    jQuery("nav").addClass("sticky");
	  }else{
	    jQuery("nav").removeClass("sticky");
	  }
	});
}
