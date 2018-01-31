function createCardProdList(data) {
    var prodName = data.prodName;
    var prodID = data.prodID;
    var price = data.price;

    var template = `
    <div class="responsive">
      <div class="gallery">
        <a href="/products/${prodID}">
          <img src="/pics/${prodID}.jpg"  width="300" height="200">
        </a>
        <div class="desc">${prodName}</div>
        <i class="fa fa-money fa-3x" aria-hidden="true"></i> &nbsp
        <font size="6">${price}</font>
      </div>
    </div>
    `;

    return template;
}

function loadProducts(categoryName) {
    //console.log("Category = "+categoryName);
    var prodReq= new XMLHttpRequest();
    var prodList = "";

	prodReq.onreadystatechange= function(){
		if (prodReq.readyState === XMLHttpRequest.DONE){
			if(prodReq.status=== 200){
				//process response data
                var prodRes = JSON.parse(prodReq.responseText);
				var prodLen = prodRes.length;

                console.log("Response length = "+prodLen);
				for(var i=0; i < prodLen; i++) {
					var data = {
						prodID: prodRes[i].Product_ID,
                        prodName: prodRes[i].Product_Name,
						price: prodRes[i].Price
					}
					prodList += createCardProdList(data);
				}
                if(prodList === "" ) {
                    prodList = "<h2><bold>Sorry! No products currently available for the selected category.</bold></h2>";
                }
                document.getElementById("product_display").innerHTML = prodList;
			}
			else if(prodReq.status=== 403){
				console.log('Incorrect credentials');
			}
			else if(prodReq.status=== 500){
				console.log('Something went wrong');
			}
			else{
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
				"Product_ID",
                "Product_Name",
				"Price",
				"Add_Time"
			],
			where: {
				"Category_Name": categoryName
			},
			order_by: "-Add_Time"
		}
	}));

}
