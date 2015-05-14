// JavaScript Document
var mysql = require('mysql');
var tumblrAPItest = require('./tumblrAPItest');

//Insert data to mysql, first to connect mysql
function InsertData(sql){
	//////////////////////////////////////////////////////////////////
	console.log('Connecting to mysql... for InsertData function'); 
	//console.log(sql);
	var connection = mysql.createConnection({  
	  host:'127.0.0.1',
	  port:3308,//port must be correct!!
	  user: 'root',  
	  password: '123456'//password must be correct!
	 });
	//////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////////////////////
	 connection.connect(function(error, results) { 
		
		if(error) { 

			console.log('Connection Error: ' + error.message); 
			return 0; 
 		}
		console.log('Connected to MySQL for InsertData function'); 
        ClientConnectionReady(connection);
 	});
	 //////////////////////////////////////////////////////////////////
	 
	 
	 
	 ////////////////////////////////////////////////////////////////// USE database
	 ClientConnectionReady = function(connection){ 
		
		connection.query('USE csc309h_c1zhaoho', function(error, results) { 
	
			if(error) { 
	
				console.log('ClientConnectionReady Error: ' + error.message); 
	
				connection.end();
				return 0; 
	
			 } 
			 console.log('Database changed!'); 
			 InsertData(connection);
		}); 
	
	 };
	 //////////////////////////////////////////////////////////////////
	 
	 
	 
	 
	 //////////////////////////////////////////////////////////////////Query INSERT
		 
	InsertData = function(connection){ 
		
		var values = ['Chad']; 
		//console.log(sql);
		
		connection.query(sql, function(error, results) { 
		
			if(error) { 
			
				console.log("InsertData Error: " + error.message); 
				
				connection.end(); 
				return 0; 
		
			} 
	
			console.log('Inserted: ' + results.affectedRows + ' row.'); 
		
			console.log('Id inserted: ' + results.insertId); 
			connection.end();
			return 0;
		}); 
	}
	
	console.log("return");
}










function TrackData(){
	//////////////////////////////////////////////////////////////////
	console.log('Connecting to mysql... for TrackData function'); 
	var connection = mysql.createConnection({  
	  host:'127.0.0.1',
	  port:3308,//port must be correct!!
	  user: 'root',  
	  password: '123456'//password must be correct!
	 });
	//////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////////////////////
	 connection.connect(function(error, results) { 
		
		if(error) { 

			console.log('Connection Error: ' + error.message); 
			return 0; 
 		}
		console.log('Connected to MySQL for TrackData function'); 
        Prepare(connection);
 	});
	 //////////////////////////////////////////////////////////////////
	 
	 
	 Prepare = function(connection){ //Create Database and tables if not exist
		
		
		connection.query('CREATE  database  if not exists csc309h_c1zhaoho' , function(err) {  
		if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {  
			throw err;  
		}  
		else
		{
			//USE csc309h_c1zhaoho start
			connection.query('USE csc309h_c1zhaoho', function(error, results) { 
	
				if(error) { 
	
					console.log('Prepare Error: ' + error.message); 
	
					connection.end();
					return 0; 
	
			 	} 
			 	console.log('Database changed!'); 

						//create the sql table when first time run the program
				 		//console.log("create the sql table when first time run the program");
						
						//create  table  blog start
						connection.query('CREATE  table IF NOT EXISTS blog (bid int(8) NOT NULL auto_increment PRIMARY KEY,basename varchar(40) NOT NULL)', function(err) {  
						 if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {  
							throw err;  
						 }  
						 else
						 {	
						        //create  table  post start
								connection.query('CREATE  table IF NOT EXISTS post (pid int NOT NULL auto_increment PRIMARY KEY,bid int(8) NOT NULL, url text, text text, image text, timestamp varchar(25),date varchar(25), last_track varchar(25),count int)',
									function(err){  
									 if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {  
										throw err;  
									 }  
									 else
									 {	
											//create  table  post
											ClientConnectionReady(connection);			 
									 }
									});	
								//create  table  post end
						 }
						});	
						//create  table  blog end

		     	});
			//USE csc309h_c1zhaoho end
				
				
			  	 
			}//else
		});//create csc309h_c1zhaoho end
		
		
	
	 };
	 

	
	
	
	 
	 ////////////////////////////////////////////////////////////////// USE database
	 ClientConnectionReady = function(connection){ 
		
		/*connection.query('USE mysql', function(error, results) { 
	
			if(error) { 
	
				console.log('ClientConnectionReady Error: ' + error.message); 
	
				connection.end();
				return 0; 
	
			 } 
			 console.log('Database changed!'); */
			 GetDataFromTumblr(connection);
		/*});*/ 
	
	 };
	 //////////////////////////////////////////////////////////////////
	 
	//////////////////////////////////////////////////////////////////Query SELECT
	GetDataFromTumblr = function(connection){
		connection.query("SELECT * FROM blog;",function(error,results,fields){
			if(error){
				console.log('TrackData Error: ' + error.message);
				connection.end();
				return;
			}
			if(results.length > 0) 
			{ 
				var firstResult;
				var i;
				for(i=0;i<results.length;i++){
					firstResult = results[i]; 
					
					console.log('bid:' + firstResult['bid']); 
					
					console.log('basename:'+ firstResult['basename']); 
					
					//call remote tumblr api
					tumblrAPItest.callTumblrAPI(firstResult['bid'],firstResult['basename']);
					
				}
				
			} 
			connection.end();
		});
	};
}





function GetData(sql,response){
	//////////////////////////////////////////////////////////////////
	console.log('Connecting to mysql... for GetData function'); 
	var connection = mysql.createConnection({  
	  host:'127.0.0.1',
	  port:3308,//port must be correct!!
	  user: 'root',  
	  password: '123456'//password must be correct!
	 });
	//////////////////////////////////////////////////////////////////
	//console.log('after mysql.createConnection'); 
	//////////////////////////////////////////////////////////////////
	 connection.connect(function(error, results) { 
		
		if(error) { 

			console.log('Connection Error: ' + error.message); 
			return 0; 
 		}
		console.log('Connected to MySQL for GetData function'); 
        ClientConnectionReady(connection);
		//console.log('Connected to MySQL for GetData functionsssssssssssssssssss'); 
 	});
	 //////////////////////////////////////////////////////////////////
	 
	 
	 
	 ////////////////////////////////////////////////////////////////// USE database
	 ClientConnectionReady = function(connection){ 
		//console.log('ClientConnectionReady'); 
		connection.query('USE csc309h_c1zhaoho', function(error, results) { 
	
			if(error) { 
	
				console.log('ClientConnectionReady Error: ' + error.message); 
	
				connection.end();
				return 0; 
	
			 } 
			 console.log('Database changed!'); 
			 GetDataFromDB(connection);
		}); 
	
	 };
	 //////////////////////////////////////////////////////////////////
	 
	//////////////////////////////////////////////////////////////////Query SELECT
	GetDataFromDB = function(connection){
		connection.query(sql,function(error,results,fields){
			if(error){
				console.log('GetData Error: ' + error.message);
				connection.end();
				return;
			}
			if(results.length > 0) 
			{ 
				var firstResult;
				var jsonData = [];
				var trendingData = [];
				var tracking = [];
				var i;
				var bCal = true;
				var recordsnum;
				var last_track;
				for(i=0;i<results.length;i++){
					firstResult = results[i]; 
					//calculate the track records number of this post
					if(bCal){recordsnum = fun(results,i);bCal = false;last_track=results[i]['count'];}
					if((i+1) < results.length && (results[i]['url'] == results[i+1]['url']) ){
						tracking.push({"timestamp":firstResult['timestamp'],"sequence":recordsnum--,
									"increment":firstResult['count']-results[i+1]['count'],"count":firstResult['count']});}
					else{
						tracking.push({"timestamp":firstResult['timestamp'],"sequence":recordsnum--,
									"increment":0,"count":firstResult['count']});
						trendingData.push({"url":firstResult['url'],"text":removeHTMLTag(firstResult['text']),
									"image":firstResult['image'],"date":firstResult['date'],
									"last_track":last_track,"tracking":tracking});
						
						tracking = [];
						bCal = true;}
					
				}
				jsonData.push({"trending":trendingData,"order": "Trending","limit": 10});
				var json = JSON.stringify(jsonData);
				//console.log(json);
				console.log(results.length);
				response.end(json);
				return 0	
			}
			else
			{
				response.end("{ \"trending\": [],\"order\": \"Trending\",\"limit\": 10}");
			}
			connection.end();
		});
	};
	//console.log("bbbbbbbbbbbbbbbbbbbbbbb");
	return "bbbbbbbbbbbbbbbbbbbbbbb";
}

function removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g,''); //removeHTML tag
            str = str.replace(/[ | ]*\n/g,'\n'); //remove––Œ≤ø’∞◊
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //remove∂‡”‡ø’––
            str=str.replace(/&nbsp;/ig,'');//remove&nbsp;
            return str;
    }
	
	
function fun(results,i){
	var num;
	num = 0;
	var j;
	for(j=i;j<results.length;j++){
		if((j+1) < results.length && (results[j]['url'] == results[j+1]['url']) ){
			num++;
		}
		else
		{
			break;
		}
	}
	return num+1;
}
exports.InsertData = InsertData;
exports.TrackData = TrackData;
exports.GetData = GetData;


        