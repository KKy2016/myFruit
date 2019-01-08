$(function(){
	tableShow();
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
			})
		}else{
			$("#prompt").html("商品名称/价格不能为空");
		}
	})
});

function tableShow(){
	var trs=$("table#tab tr");
	console.log("trs:",trs);
	if(trs.length<=1){
		$("table#tab").hide();
	}else{
		$("table#tab").show();
	}
}
