function loadVideos(categoryName) {
    if(categoryName === "all") {
        var vidReq= new XMLHttpRequest();
        var vidList = "";

    	vidReq.onreadystatechange= function(){
    		if (vidReq.readyState === XMLHttpRequest.DONE){
    			if(vidReq.status=== 200){
    				//process response data
                    var vidRes = JSON.parse(vidReq.responseText);
    				var vidLen = vidRes.length;

                    console.log("Response length = "+vidLen);
    				for(var i=0; i < vidLen; i++) {
                        var vidID = vidRes[i].Video_ID;
    					vidList += `<iframe width="300" height="180" src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe> &nbsp`;
    				}
                    if(vidList === "" ) {
                        vidList = "<h2><bold>Sorry! No videos currently available for the selected category.</bold></h2>";
                    }
                    document.getElementById("video_display").innerHTML = vidList;
    			} else{
    				console.log("Video Status Code:"+vidReq.status+" Response "+vidReq.responseText);
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
    				"Video_ID"
    			]
    		}
    	}));
    } else {
        var vidReq= new XMLHttpRequest();
        var vidList = "";

    	vidReq.onreadystatechange= function(){
    		if (vidReq.readyState === XMLHttpRequest.DONE){
    			if(vidReq.status=== 200){
    				//process response data
                    var vidRes = JSON.parse(vidReq.responseText);
    				var vidLen = vidRes.length;

                    console.log("Response length = "+vidLen);
    				for(var i=0; i < vidLen; i++) {
                        var vidID = vidRes[i].Video_ID;
    					vidList += `<iframe width="300" height="180" src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe> &nbsp`;
    				}
                    if(vidList === "" ) {
                        vidList = "<h2><bold>Sorry! No videos currently available for the selected category.</bold></h2>";
                    }
                    document.getElementById("video_display").innerHTML = vidList;
    			} else{
    				console.log("Video Status Code:"+vidReq.status+" Response "+vidReq.responseText);
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
    				"Video_ID"
    			],
    			where: {
    				"Category": categoryName
    			}
    		}
    	}));
    }
}
