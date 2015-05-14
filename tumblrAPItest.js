// JavaScript Document
var mysqltest = require("./mysqltest");//user-defined module

function callTumblrAPI(bid,basehostname){
		var options = {
		  hostname: 'api.tumblr.com',
		  port: 80,
		  path: '/v2/blog/'+basehostname+'/likes?api_key=WEnpuuvPY9764Q2SX73U2VLmA4aCjiImvuVhC06ZREJH6TgMOU',
		  //'/v2/blog/'+basehostname+'/likes?api_key=WEnpuuvPY9764Q2SX73U2VLmA4aCjiImvuVhC06ZREJH6TgMOU'
		  method: 'get'
		};
		var req = http.request(options, function(res) {
			console.log('STATUS: ' + res.statusCode);
			if(res.statusCode != 200) return;
			//console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			var jsonData="";
			res.on('data', function (chunk) {
				//console.log('BODY: ' + chunk);
				jsonData += chunk;
				//console.log('data');
		  	});
			
			res.on('end', function () {
				//console.log('BODY: ' + jsonData);
				/*var myData = JSON.parse(jsonData, function (key, value) {
					console.log('key: ' + key + '  value:'+ value);
				});*/
				
				//how to resolve the specified data ,like 'post_url','caption','image_permalink','note_count'
				myData = JSON.parse(jsonData);
				var url,text,image,timestamp,timestampTmp,count,date;
				var sql = "INSERT INTO post(bid,url,text,image,timestamp,count,date) VALUES"
				for(var i=0;i<myData.response.liked_posts.length;i++){
					//console.log(myData.response.liked_posts.length);
					//console.log("post_url:" + myData.response.liked_posts[i].post_url);
					url =  myData.response.liked_posts[i].post_url;
					//text, quote, link, answer, video, audio, photo, chat
					switch(myData.response.liked_posts[i].type){
						case 'text':case 'link':case 'chat':
							//console.log("caption:" +myData.response.liked_posts[i].title);
							text = myData.response.liked_posts[i].title;
							break;
						case 'quote':
						    //console.log("caption:" + myData.response.liked_posts[i].text);
							text = myData.response.liked_posts[i].text;
							break;
						case 'photo'://video': case 'audio': 
						    //console.log("caption:" + myData.response.liked_posts[i].caption);
							text = myData.response.liked_posts[i].caption;
							//console.log("image_permalink:" + myData.response.liked_posts[i].image_permalink);
							image = myData.response.liked_posts[i].photos[0].alt_sizes[0].url;
							console.log("image:" +image);
							break;
						case 'answer':
							//console.log("caption:" + myData.response.liked_posts[i].question);
							text = myData.response.liked_posts[i].question;
							break;
						default:
						    //console.log("caption:" + "");
					}
					//console.log("note_count:" + myData.response.liked_posts[i].note_count);
					count = myData.response.liked_posts[i].note_count;
					timestampTmp = new Date();
				    timestamp = timestampTmp.getFullYear()+"-"+timestampTmp.getMonth()+"-"+timestampTmp.getDate() +" "+timestampTmp.getHours()+":"+ timestampTmp.getMinutes()+":"+ timestampTmp.getSeconds();
					date =  myData.response.liked_posts[i].date;
					//console.log(date);
					if( i == myData.response.liked_posts.length - 1){sql = sql + "("+bid+",'"+url+"','"+text+"','"+image+"','"+timestamp+"',"+count+",'"+date+"')";}
					else{sql = sql + "("+bid+",'"+url+"','"+text+"','"+image+"','"+timestamp+"',"+count+",'"+date+"'),";}
					
					
					
				}
				//console.log(sql);
				var ret = mysqltest.InsertData(sql);
			    console.log("ret:"+ret);
				console.log('BODY End');
		  	});
		});
		
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
		req.end();
}

exports.callTumblrAPI = callTumblrAPI;