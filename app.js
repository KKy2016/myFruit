var express=require("express");
var app=express();

app.use(express.static("./public"));
app.use(express.static("./views"));



app.listen(81,function(){
	console.log("OK 81");
});
