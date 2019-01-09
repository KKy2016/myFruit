var getTime=require("./../modules/getTime");
console.log("getTime:",getTime);
var db=require("./../modules/db");
console.log("db:",db);
var mongodb = require("mongodb");

module.exports.entryAddPost=function(req,res){
	var obj=req.body;
	obj.time=getTime.getTime();
	console.log("/addPost obj:",obj);
	//res.send({s:0});
	/////////////
	db.insertOne(res,"goods",obj,function(err,result,db2){
		if(err){
			console.log("数据添加到mongodb失败");
			res.send({error:2});
			//将操作失败的信息2返回给前台
		}else{
			//console.log("数据添加到mongodb成功",result);
			console.log("数据添加到mongodb成功",result.result);
			res.send(result.result);
			//7.关闭数据库连接
			db2.close();
			//将操作 成功的信息3返回给前台
		}
	});
	/////////////
}

//entryGetDataPost
module.exports.entryGetDataPost=function(req,res){
	var obj=req.body;
	console.log("/entryGetDataPost obj:",obj);
	/////////////
	db.find(res,"goods",obj,function(err,result,db){
		if(err){
				console.log("查询数据失败");
				res.send({error:1});
			}else{
				console.log("查询数据成功");
				console.log("result:",result);
				res.send(result);
				db.close();
			}
	});
	/////////////
}

//entrySearchData
module.exports.entrySearchData=function(req,res){
	var obj=req.body;
	console.log("/entrySearchData obj:",obj);
	/////////////
	var whereObj={
		find:obj
	}
	console.log("/entrySearchData whereObj:",whereObj);
	/////////////
	db.find(res,"goods",whereObj,function(err,result,db){
		if(err){
				console.log("查询数据失败");
				res.send({error:1});
			}else{
				console.log("查询数据成功");
				console.log("result:",result);
				res.send(result);
				db.close();
			}
	});
	/////////////
}
//entryDelDataPost
module.exports.entryDelDataPost=function(req,res){
	var o=req.body;
	var id=mongodb.ObjectId(o.id);
	var obj={_id:id};
	console.log("/entryDelDataPost obj:",obj,typeof obj);
	/////////////
	db.deleteOne(res,"goods",obj,function(err,result,db){
		if(err){
			console.log("删除失败!");
			res.send({error:1});
		}else{
			console.log("删除成功!",result.result);
			res.send(result.result);
			db.close();
		}
	});
	/////////////
}
//entryUpdf
module.exports.entryUpdf=function(req,res){
	var o=req.body;
	console.log("entryUpdf o:",o);
	var id=mongodb.ObjectId(o.id);
	var whereObj={_id:id};
	console.log("/entryUpdf whereObj:",whereObj);
	var updateObj={
		$set:o
	}
	console.log("/entryUpdf updateObj:",updateObj);
	/////////////
	db.updateOne(res,"goods",whereObj,updateObj,function(err,result,db){
		if(err){
			console.log("更改失败");
			res.send({error:1});
		}else{
			console.log("更改成功",result.result);
			res.send(result.result);
			db.close();
		}
	});
	/////////////
}





