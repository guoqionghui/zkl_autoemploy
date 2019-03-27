var refPhoneCard = sessionStorage.getItem("Phone_card");//获取session里的证件号码
var orderNum = sessionStorage.getItem("orderNo");//获取session里的支付宝的订单号
var flge = sessionStorage.getItem("trade");//获取session里的支付宝状态
// var flge = "TRADE_FALSE";
var Stutas;//审批状态的英文代号

// var Stutas = sessionStorage.getItem("IDstatusNo");
// var refPhoneCard = "11223311";
// var IDname = sessionStorage.getItem("IDname");
// var IDname = "张艳艳";
// 审批环节代号
// var IDstatusname = sessionStorage.getItem("IDstatusname");





/*页面最开始加载执行*/
$(function() {
	init();//初始化
})
/*初始化方法*/
function init(){
	// 将状态页面的名字清空
	$("#approval-name").html("");
	// 支付宝状态
	if(flge){
		//正常的请求后台数据
		Clients.postClientAjax(url.zx_approvalPay,{orderNo:orderNum},getApprovalInfoDataT);
		if(flge=="TRADE_SUCCESS"){
			$('.remove').empty(".remove");
			$(".change-color").html("审批完成缴费成功");
			$(".add").html("，请耐心等待");		
		}
		else{
			mui.alert('缴费失败，请重新缴费');
			location.hash="zx_approvePay";
		}

		
	}else{
		//正常的请求后台数据
		Clients.postClientAjax(url.zx_approval,null,getApprovalInfoData);
	}			
}

// 请求后台数据的回调
function getApprovalInfoData(result){
	// alert(JSON.stringify(result));
	if(result.success){
		//姓名的数据
		if(result.data.clntsurNm){
			var IDname = result.data.clntsurNm;
			$("#approval-name").html(IDname);
		}
		//状态的数据
		if(result.data.stutas){
			 Stutas = result.data.stutas;
			 switch(Stutas)
			{
			case "AI":$(".change-color").html("正在审批中");
					$(".add").html("，点击文字查看信息");
			  		 break;
			case "AB":$(".change-color").html("返回申请人");
			 		 $(".add").html("，点击文字修改申请资料");
			  break;
			case "AN":$('.remove').empty(".remove");
					 $(".change-color").html("审批不通过");
					 $(".add").html("，点击文字重新申请");
			  break;
			case "PY":
			  		$(".change-color").html("审批完成缴费成功");
			  		$(".add").html("，请耐心等待");	
			  break;
			}
			//将状态存进session stutas
			sessionStorage.setItem("stutas",Stutas);
			//调用点击事件
			clickEvent();
		}
		
	}else{
		mui.alert(result.message)
	}
}



// 支付宝请求后台数据的回调
function getApprovalInfoDataT(result){
	if(result.success){
		//姓名的数据
		if(result.data.clntsurnm){
			var IDname = result.data.clntsurnm;
			$("#approval-name").html(IDname);
		}
	}else{
		mui.alert(result.message)
	}
}

//点击函数
function clickEvent(){
	//审批中、返回申请人、审批不通过 这三种状态跳转到信息录入页面
	if(Stutas=="AB"||Stutas=="AN"||Stutas=="AI"){
		$(".approval-text").click(function(){
    //回显附件开始	
		sessionStorage.setItem("wef","1");
    //回显附件结束
		location.hash="#zx_inforRegister";	
		});
	}	
}

// 点击页面返回键跳转页面
function gotoRegister(){
	if(flge){
		var data={exitSysPage:"3",
						sessionTimeOut:"No"}
		setTimeout(function(){
			cordova.sino.entryLocalSys(function(){},data);
		},350);
		sessionStorage.removeItem("trade");
		sessionStorage.removeItem("orderNo");
	}else{
		location.hash="#zx_register";
	}
	
}

/*获取url的传递的值*/
// function getUrlParam(){
// 		var searchStr=location.search;
// 		if(searchStr==""){
// 		    return {};
// 		}
// 		var param=searchStr.slice(1,searchStr.length);		
// 		var moreParamArr=param.split("&");
// 		var getParam={};
// 		for(var i=0;i<moreParamArr.length;i++){
// 				if(moreParamArr[i]!=""){
// 						var paramArr=moreParamArr[i].split("=");
// 						getParam[paramArr[0]]=paramArr[1];				
// 				}
// 		}
// 		console.log(getParam);
// 		return getParam;
// }
// 
// 




















// https://test2.citicpruagents.com.cn/autoemploy/index.html?buyer=2088102174780071&inputCharset=UTF-8&notifyTime=2018-12-04%2017:08:42&orderNo=ZX912GM98&payAmount=0.01&payTime=2018-12-04%2017:09:59&payplatForm=ALIPAYINC&productName=押金&signature=8049bc7607cd2a040c76257f850117f6&signatureType=MD5&systemSSN=70344F76640341D7A6CD5D0B621C8FA1&tradeNo=ZX912GM9820181204170848&tradeStatus=TRADE_SUCCESS#zx_approval