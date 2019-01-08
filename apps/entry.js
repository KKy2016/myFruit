var getTime=require("./../modules/getTime");
console.log("getTime:",getTime);

module.exports.entryAddPost=function(req,res){
	var obj=req.body;
	obj.time=getTime.getTime();
	console.log("/addPost obj:",obj);
	//res.send({s:0});
	
	/////////////
	var mongodb = require("mongodb");//引入mongodb
	var MongoClient = mongodb.MongoClient;
	//1.创建MongoClient对象,用来连接数据
	//2.数据库地址,端口号
	var dbUrl="mongodb://localhost:27017";
	//3.关联数据库
	MongoClient.connect(dbUrl,{useNewUrlParser:true},function(err,db2){//db2,关联数据库成功
		//4.判断是否连接数据库成功
		if(err){
			//将连接失败的信息1返回给前台
			console.log("连接数据库失败",err);//网络中断/数据库地址错误/端口号错误/数据服务没有启动
		}else{
			console.log("数据库连接成功");
			//5.关联数据库
			var dbase = db2.db("mydb1809");//数据库名
	
			//6.dbase要操作的数据库;collection关联集合;insert,如何操作数据(插入)
			dbase.collection("goods").insertOne(obj,function(err,result){
				if(err){
					console.log("数据添加到mongodb失败");
					//将操作失败的信息2返回给前台
				}else{
					//console.log("数据添加到mongodb成功",result);
					console.log("数据添加到mongodb成功",result.result);
					//7.关闭数据库连接
					db2.close();
					//将操作 成功的信息3返回给前台
				}
			})
		}
	})

	/////////////
}





