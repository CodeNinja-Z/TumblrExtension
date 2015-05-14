var http = require("http");
var url = require("url");
var fs = require("fs");
var fileserver = require("./fileserver");//user-defined module
var mysqltest = require("./mysqltest");//user-defined module
PORT = 8888;//Port definition
IP = '127.0.0.1'
STATIC_PREFIX = 'js';
function onRequest(request, response) 
{  
	//request.url:Request URL string. This contains only the URL that is present in the actual HTTP request.

    //Method 1;  http://127.0.0.1:8888/{base-hostname}
	//Method 2:  http://127.0.0.1:8888/blog/{base-hostname}/trends?limit=10&order=Trending
	//Method 3:  http://127.0.0.1:8888/blogs/trends?limit=10&order=Trending
	var pathname = url.parse(request.url).pathname;
	var query = url.parse(request.url,true).query;
    console.log(request.url);
	console.log(pathname);
	console.log(query);
	
	if (request.url == '/') {
		fileserver.serveFile('\/testClient.html', response);
		//console.log('fileserver.serveFile is called');
	}
	else if (request.url.indexOf(STATIC_PREFIX) > 0) {
		fileserver.serveFile('\/jquery-1.6.3.min.js', response);
	}
	else if(pathname.indexOf('trends') > 0){//Method 2 Method 3 are all possible
			var limit,order,sql;
			if(query ==undefined)//no parameters
				console.log("no query");
			else{
				limit = query.limit;
				order = query.order;
				//sql = "select * from track "
				console.log("limit=" + limit);console.log("order=" + order);
				//if(limit != undefined)  if(order != undefined) 
			}
			
			if(pathname.indexOf('blogs') > 0){//Method 3 http://127.0.0.1:8888/blogs/trends?limit=10&order=Trending
				//query in the database
				var sql = "select * from post";
				sql +=" order by bid, url, pid desc";
				//query in the database
				//response.end(sql);
				mysqltest.GetData(sql,response);
			}
			else{//Method 2:  http://127.0.0.1:8888/blog/{base-hostname}/trends?limit=10&order=Trending
				
				pathname = pathname.substr(1);
				var paraArr = pathname.split("/");
				if(paraArr.length == 3 && paraArr[0] == "blog" && paraArr[2] == "trends"){
					//select the bid in table 'blog',  then select all the posts where pbid = bid and add some limit or order
					var sql = "select url,text,image,timestamp,date,count from blog,post where basename='" + paraArr[1] +"' ";
					sql +=" and blog.bid = post.bid order by url, pid desc";
					//query in the database
					//response.end(sql);
				    mysqltest.GetData(sql,response);
				}
				else{
					response.end("Invalid rest api, the resourse is not found!");
				}	
			}
		}//else if(pathname.indexOf('trends') > 0)
	else{//method 1 
		var basename = pathname.substr(1);
		if(basename != undefined && basename.indexOf('\/') < 0 ){
			var sql = "INSERT INTO blog SET basename = '"+basename+"'";
			var ret = mysqltest.InsertData(sql);
			response.end("{Status:200,msg:OK}");
		}
		else{
			response.end("Invalid rest api, the resourse is not found!");
		}}
}
	





/*
http.createServer([requestListener])#
Returns a new web server object.
The requestListener is a function which is automatically added to the 'request' event.


Event: 'request'#
function (request, response) { }

Emitted each time there is a request. Note that there may be multiple requests per connection (in the case of keep-alive connections). request is an instance of http.ServerRequest and response is an instance of http.ServerResponse
*/

http.createServer(onRequest).listen(PORT,IP);
	
console.log('Server running at http://127.0.0.1:' + PORT + '/');
var tmrid;
function track()
{
	//console.log("track is called,tmrid = " + tmrid);
	//search table 'blog', then retirve each blog's liked posts through tumblr api: likes?api_key
	//mysqltest.TrackData();
	//clearInterval(tmrid);
	console.log("one hour passed Now:"+new Date());
}
tmrid =  setInterval(track, 10000);//1 hour :3600000