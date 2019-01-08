var express=require("express");
var app=express();
var bodyParser=require("body-parser");


app.use(express.static("./public"));
app.use(express.static("./views"));

//接收前台post传的数据

//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});//1.1接收前台用post传递过来的字符串



//变量名
var page1="index.html";
var page2="entry/entry.html";
var page3="show/show.html";


//引入模块
var entry=require("./apps/entry");
//console.log("entry",entry);


//主页
app.get("/",function(req,res){
	res.sendFile(__dirname+"/views/"+page1);
});

//entry录入
app.get("/entry",function(req,res){
	res.sendFile(__dirname+"/views/"+page2);
});

//show展示
app.get("/show",function(req,res){
	res.sendFile(__dirname+"/views/"+page3);
});

//appPost 接收前台用post传过来的数据(字符串)
/*app.post("/addPost",urlencodedParser,function(req,res){
	var obj=req.body;
	console.log("/addPost obj:",obj);
	res.send({s:0});
})*/
app.post("/addPost",urlencodedParser,entry.entryAddPost);


app.listen(81,function(){
	console.log("OK 81");
});
