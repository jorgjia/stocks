var express=require('express');
var http=require('http');
var socket_io=require("socket.io");
var horseman=require("node-horseman");//libraria per scrap

var h=new horseman();//browseri virual h
var app=new express();
app.use(express.static("public"));
var server=http.Server(app);// per ta bere server te avancuar
var io=socket_io(server);// deklarojme socketi si variabel
io.on('connection',function(socket){// bejme te mundur lidhjen 
socket.on("text",function(text1){ // marr inputin qe kam derguar me on 
		h// browseri virtual
		.open('http://finance.google.com/finance/info?client=ig&q=' + text1)//hapinputu ke kete aksion kur un fus nga inputi kete
		.waitForSelector("body")//pres deri sa te selektohet body
		.html("body")//marr body nga ml
		.then(function(data) {// ky funksion me parameter data 
			if(data.split("")[0] === 'h') {
				var stock_status =  "Stock not found.";
				socket.emit("pergjigje", stock_status);
			}
			else {
				var stock_status = "Stock found.";

				io.emit('stocks',text1);
				io.emit('pergjigje', stock_status);
			}
		});

	socket.on("message",function(parent_id){
		console.log(parent_id);
		io.emit("delete", parent_id);
	});
});
	console.log("client connected");
});
	
server.listen(process.env.PORT || 7000);