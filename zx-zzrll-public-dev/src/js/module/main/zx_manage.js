
var refPhoneCard = sessionStorage.getItem('Phone_card');//登录时身份证号
// var refPhoneCard = "44058219970823599x";
var payAmount = sessionStorage.getItem('payAmount');//履约保证金
var gentNum;
/*页面最开始加载执行*/
$(function() {
	mui('.mui-input-row input').input();
	init();//初始化
})
/*初始化方法*/
function init(){
	//一进页面上岗审批小红点后台发数据
	Clients.postClientAjax(url.zx_manageApprovalPoint,null,getManageApprovalPointData);
	eventBind();
}
// 离职审批小红点回调函数
function getManageApprovalPointData(result){
	//mui.alert(result.data.leaveCount);
	if(result.success){
		gentNum = result.data;
		if(result.data.leaveCount>0){
			$(".manage_point").css("display","block");
		}else{
			$(".manage_point").css("display","none");
		}
		if(result.data.entryCount>0){
			$(".manage_point1").css("display","block");
		}else{
			$(".manage_point1").css("display","none");
		}
	}else{
		mui.alert(result.message);
	}
}

//事件绑定函数
function eventBind(){
	//上岗审批跳转
	$(".entry-app").click(function(){
		location.hash="#zx_approval_list";
	});
	//代理合同跳转
	$(".agency-contract").click(function(){
		//var pdfData={
		//chequeno: refPhoneCard,//身份证号
		//subcomid:"GD0001",//分公司
		//address:add,//乙方的地址(详细地址)
		//postcode:post,//邮编
		//paymoney:payAmount,//履约保证金(缴费之后取seesion)
		//};
		Clients.postClientAjax(url.zx_manageOpneContract,{chequeno:refPhoneCard},getManageOpenContracttData);
	});
	//交费凭证跳转
	$(".app-pay").click(function(){
		Clients.postClientAjax(url.zx_managePayMoneyPdf,null,getManagePayMoneyPdfData);
		// alert('待开发');
	});
	//离职申请跳转
	$(".resign-app").click(function(){
		Clients.postClientAjax(url.zx_lzapprovalInit,null,getLzApprovalData);
		
	});
	//离职审批跳转
	$(".resign-sign").click(function(){
		sessionStorage.setItem("gentNum",gentNum);
		sessionStorage.removeItem("strus");
		location.hash="#zx_lzapproval_list";
	});
	$("#goback").click(function(){ 
		//window.location.href="https://test2.citicpruagents.com.cn/xyt/#user-home";
		var data={
				exitSysPage:"2",
				sessionTimeOut:"No"
				};
		setTimeout(function(){
			cordova.sino.entryLocalSys(function(){},data);
		},350);
	});
}

//合同回调函数
function getManageOpenContracttData(result){
	// 请求自己后台获取的数据，result.data为pdf文件的url地址
	console.log(result);
	if(result.success){
	// 	// alert(JSON.stringify(result.data));
		var pdfUrl=result.data;
		// if(result.message =="success"){
		// 	sessionStorage.setItem("download",true);
		// }
	// 	//window.open("前端服务器地址/pdf/web/viewer.html?file=后台服务器地址的pdf")
	// 	 // window.open("http://192.168.43.209:8000/openPdf/web/viewer.html?file=result.data");
	// 	 // window.open("https://test2.citicpruagents.com.cn/autoemploy/pdf/435335465346464546_1.jpg",'_blank');

		 
	// 	 // window.open("https://test2.citicpruagents.com.cn/autoemploy/openPdf/web/viewer.html?file="+pdfUrl,'_blank');
		 // sessionStorage.setItem("contractUrl",pdfUrl);
		 // location.hash="#zx_agencyContract"
		// var ua = navigator.userAgent.toLowerCase();
		// if (/iphone|ipad|ipod/.test(ua)) {
		// 	alert(1);
		// 	location.href=pdfUrl;

		// } else if (/android/.test(ua)) {
			var callback = function(result) {};
			var data={
			URL:pdfUrl
			};
			cordova.sino.openPDF(callback, data);
		// }
		
	}else{
		mui.alert(result.message);
	}
}


//缴费凭证回调函数
function getManagePayMoneyPdfData(result){
	console.log(result);
	if(result.success){
		var pdfUrl=result.data;
		 sessionStorage.setItem("contractUrl",pdfUrl);
		 var callback = function(result) {};
		 var data={
			URL:pdfUrl
			};
		cordova.sino.openPDF(callback, data);
	}else{
		mui.alert(result.message);
	}
}

function getLzApprovalData(result){
	if(result.success){
		sessionStorage.setItem("statusNo",result.data.STATUSNO);
		sessionStorage.setItem("clntsurnm",result.data.CLNTSURNM);
		location.hash="#zx_lzapproval";
	}else{
		sessionStorage.setItem("gentNum",gentNum);
		location.hash="#zx_quitappylecode";
	}
	
}