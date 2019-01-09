var tempId;//用户记录被修改的那条数据的_id.

$(function(){
	tableShow();
	//获取数据
	getDataPost({});//所有数据
	//
	$("#addPost").click(function(){
		var goodsName=$("#goodsName").val();
		var price=$("#price").val();
		if(goodsName&&price){
			var myUrl="/addPost";
			var obj={
				goodsName:goodsName,
				price:price,
				img:$("#img").val(),
				sel:$("#sel").val()
			}
			//console.log("addPost obj:",obj);
			
			$.post(myUrl,obj,function(data){
				console.log("addPost data:",data);
				if(data.ok==1&&data.n>0){
					getDataPost({});
					//添加成功后清空输入框
					$("#img").val("");
					$("#goodsName").val("");
					$("#price").val("");
					$("#sel").val("s1");
				}
			})
		}else{
			$("#prompt").html("商品名称/价格不能为空");
		}
	});
	//搜索
	$("#search").click(function(){
		$("#prompt").html("");
		var searchName=$("#searchName").val();
		var searchPrice=$("#searchPrice").val();
		var obj={};
		if(searchName||searchPrice){
			//////////
			if(searchName){
				obj.goodsName=searchName;
			}
			if(searchPrice){
				obj.price=searchPrice
			}
			//////////
		}else{
			$("#prompt").html("名称,价格至少有一项不能为空");
		}
		//console.log("serch obj:",obj);
		///////
		$.ajax({
			url:"/searchData",
			type:"post",
			timeout:0,
			data:obj,
			beforeSend:function(){
				$("#loading").show();
			},
			success:function(data){
				show(data);
			},
			error:function(){
				$("#prompt").html("获取数据失败");
			},
			complete:function(){
				$("#loading").hide();
			}
		})
		///////
		
	});
	
	
	$("#typeBtn>button").click(function(){
		//console.log("this:",this);
		$(this).addClass("active").siblings().removeClass("active");
		var v=$(this).attr("id");
		var obj={};
		if(v!="all"){
			obj.sel=v;
		}
		console.log("obj:",obj);
		$.ajax({
			url:"/searchData",
			type:"post",
			timeout:0,
			data:obj,
			beforeSend:function(){
				$("#loading").show();
			},
			success:function(data){
				show(data);
			},
			error:function(){
				$("#prompt").html("获取数据失败");
			},
			complete:function(){
				$("#loading").hide();
			}
		})
		///////
		
	})
	
	//确认修改
	$("#updf").click(function(){
		var goodsName=$("#goodsName").val();
		var price=$("#price").val();
		if(goodsName&&price){
			var myUrl="/updf";
			var obj={
				goodsName:goodsName,
				price:price,
				img:$("#img").val(),
				sel:$("#sel").val(),
				id:tempId
			}
			//console.log("addPost obj:",obj);
			
			$.post(myUrl,obj,function(data){
				console.log("updf data:",data);
				if(data.ok==1&&data.n>0){
					getDataPost({});
					//添加成功后清空输入框
					$("#img").val("");
					$("#goodsName").val("");
					$("#price").val("");
					$("#sel").val("s1");
					//切换按钮
						$("#updf").hide();
						$("#addPost").show();
				}
			})
		}else{
			$("#prompt").html("商品名称/价格不能为空");
		}
	});
	///////////////////////////////
});

//getDataPost
function getDataPost(obj){
	var myUrl="/getDataPost";
	/*$.post(myUrl,obj,function(data){
		console.log("data:",data);
		if(data.length>0){
			show(data);
		}
	})*/
	$("#typeBtn>button:nth-child(1)").addClass("active").siblings().removeClass("active");
	$.ajax({
		url:myUrl,
		type:"post",
		timeout:0,
		beforeSend:function(){
			$("#loading").show();
		},
		success:function(data){
			show(data);
		},
		error:function(){
			$("#prompt").html("获取数据失败");
		},
		complete:function(){
			$("#loading").hide();
		}
	})
}

//渲染页面
function show(arr){
	console.log("show arr:",arr);
	$("table#tab").show();
	var trtd="";
	for(var i=0;i<arr.length;i++){
		console.log("arr[i]:",arr[i]);
		trtd+=`
			<tr>
				<td>
					<img src="/img/${arr[i].img}"  />
				</td>
				<td>${arr[i].goodsName}</td>
				<td>${arr[i].price}</td>
				<td>
					${setSel(arr[i].sel)}
				</td>
				<td>
					<a onclick=del("${arr[i]._id}")>删除</a>
					<a onclick=upd(${JSON.stringify(arr[i])})>修改</a>
				</td>
			</tr>
		`;
	}
	$("table#tab tbody").html(trtd);
}

//删除
function del(id){
	//console.log("删除",id);
	var myUrl="/delDataPost";
	var obj={id:id};
	$.post(myUrl,obj,function(data){
		console.log("delDataPost data:",data);
		if(data.ok==1){
			getDataPost({});
		}
	});
}
//修改1
function upd(obj){
	console.log("修改",obj);
	tempId=obj._id;
	$("#img").val(obj.img);
	$("#goodsName").val(obj.goodsName);
	$("#price").val(obj.price);
	$("#sel").val(obj.sel);
	$("#addPost").hide();
	$("#updf").show();
}



//设置类型
function setSel(s){
	var obj={
		s1:"冰箱",
		s2:"电脑",
		s3:"手机"
	}
	return obj[s];
}


//显示表格
function tableShow(){
	var trs=$("table#tab tr");
	console.log("trs:",trs);
	if(trs.length<=1){
		$("table#tab").hide();
	}else{
		$("table#tab").show();
	}
}
