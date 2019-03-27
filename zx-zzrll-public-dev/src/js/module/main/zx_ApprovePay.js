var phoneCard = sessionStorage.getItem('Phone_card');//登录时身份证号
//var phoneCard = "4254821963188888"; 
var infoData=[];
$(function(){
	init();
	clickEvent();//页面点击事件初始化方法
	//initData(infoData);//初始化页面数据信息
});
//页面初始化方法
function init(){
	var data={chequeno:phoneCard};
	Clients.postClientAjax(url.zx_appPaymoney,data,getInfomoney);
	var stutas = sessionStorage.getItem("IDstatusname");//获取缴费审批状态
	if(stutas=="AY"){
		$(".Pay-sateinfo").text("审批完成，待缴费");
	}
	$(".Namepay").text(sessionStorage.getItem("IDname"));//设置姓名
}
/*页面点击事件方法*/
function clickEvent(){
	//点击立即缴费按钮处理事件
	$(".btnonclick").click(function(){
		$(".Payshow").slideDown();
		$("#indexMask").show();
		$(".Pay-atimg").attr("src","app/resources/imgs/pay_selected.png");
		$(".Pay-atnoimg").attr("src","app/resources/imgs/pay_gray.png");
		$(".paybtnonclick").text("支付宝支付");
		$(".Pay-bottombg").hide();//隐藏审批状态显示
		$(".Pay-infobg").css("height","150px");
	})
	//支付弹框取消按钮事件处理
	$(".Pay-backimg").click(function(){
		$(".Payshow").slideUp();
		$("#indexMask").hide();
		$(".Pay-bottombg").show();//隐藏审批状态显示
		$(".Pay-infobg").css("height","185px");
	})
	//单击选择支付方式处理事件
	$(".Pay-atnoimg").click(function(){
		$(".Pay-atimg").attr("src","app/resources/imgs/pay_gray.png");
		$(this).attr("src","app/resources/imgs/pay_selected.png");
		$(".paybtnonclick").text("银行卡支付");
	});
	$(".Pay-atimg").click(function(){
		$(this).attr("src","app/resources/imgs/pay_selected.png");
		$(".Pay-atnoimg").attr("src","app/resources/imgs/pay_gray.png");
		$(".paybtnonclick").text("支付宝支付");
	});
	/*支付弹框按钮处理事件*/
	$(".paybtnonclick").click(function(){
		if($(this).text()=="支付宝支付"){
			$(".Payshow").slideUp();
			$("#indexMask").hide();
			var payAmount = $('#Pay-summonery').html();
			var data={idNo:phoneCard,amount:payAmount}
			Clients.postClientAjax(url.zx_approvePayInit,data,getApprovePayData);
		}else{
			var payAmount = $('#Pay-summonery').html();
			sessionStorage.setItem("payAmount",payAmount);
			location.hash="#zx_bankAlipay";//银行卡支付页面
		}
	});
	$(".Namepay").click(function(){
		sessionStorage.setItem("payref","PY");
		location.hash="#zx_inforRegister";
	});
}
//点击缴费回调函数
function getApprovePayData(data){
	console.log(data);
	if (data.success==true) {
		var approvePayData = data.data.data;
		var approveUrl = data.data.url;
		//console.log(approveUrl);
		$("#form").attr("action",approveUrl);
		console.log(approvePayData[0]);
		if(approvePayData){
			console.log(approvePayData)
			for(var key in approvePayData){
				formAttr=$("<input />");
				formAttr.attr("name",key);
				formAttr.attr("value",approvePayData[key]);	
				$("#form").append(formAttr);
			}
			$("#form").find("input").css("display","none");	
	}
		$("#form").submit();
	} else{
		mui.alert(data.message);
		//$(".btnonclick").attr("disabled",true).css("background","#ccc");
	}
	
}
/*初始化请假页面接口信息回调函数*/
function getInfomoney(data){
	if (data.success==true) {
		infoData = data.data.afijList;
		var nav="";
		for (var i=0;i<infoData.length;i++) {
			nav+='<p class="Pay-moneryp"><span>' + infoData[i].paymodec + '</span><span class="Pay-monerysp">￥'+ infoData[i].totalsuamry+'</span></p>';
		}
		$(".Pay-comesp").text("￥"+data.data.sumary);//设置总金额
		var name = data.data.clntsurnm;
		$("#Pay-summonery").text(data.data.sumary);//支付弹框总金额
		$("#infoMoney").html(nav);
	} else{
		mui.alert(data.message);
	}
}
/*
 * 创建页面收费信息项*/
function initData(infoData){
	console.log(infoData.afijList);
}
