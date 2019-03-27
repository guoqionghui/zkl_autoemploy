var Canvasimg = false; //记录有没有签名
var Cheboxopt = false; //记录是否勾选了本人确认单选按钮
var CauseisText = false; //记录离职原因是否填写
var cardphone = sessionStorage.getItem("cardphone"); //获取身份证号
var idagentNum = sessionStorage.getItem("idagentNum"); //获取工号
var statusno = sessionStorage.getItem("statusno");//获取状态
var thisPic;//附件上传保存点击的是哪一张图片
var thisPicCode1;//附件上传从相册中选择的图片编码
var thisPicCode2;//附件上传拍照的图片编码
var  signPic;//保存电子签名图片dataUrl
$(document).ready(function() {
	
	mui('.mui-input-row input').input();
	mui.init();
	init(); //初始化
	clickEvent(); //点击事件初始化方法
});
//控制离职原因自适应内容开始
$(function(){
        $.fn.autoHeight = function(){    
        function autoHeight(elem){
            elem.style.height = 'auto';
            elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
        }
        this.each(function(){
      
            autoHeight(this);
            $(this).on('keyup', function(){
                autoHeight(this);
            });
        });     
    }                
    $('textarea[autoHeight]').autoHeight(); 
  
})
//控制离职原因自适应内容结束
/*初始化事件*/
function init() {
	$("#indexMask").hide();
	$("#indexNetPop").hide();
	var data={
		agentNum:idagentNum
	};
   Clients.postClientAjax(url.zx_disEmploy, data, getechoApplyInfo);

}
/*页面点击事件处理方法*/
function clickEvent() {
	var $alertcauiseInfo = $("#zx_submitinfo .alertcauiseInfo"); //离职原因没有输入错误提示框
	var $alertcauiseText = $("#zx_submitinfo .alertcauiseInfo span"); //离职原因错误信息
	//为离职原因输入框绑定事件处理
	$("#Lz_cause").focus(function() {
		$alertcauiseInfo.hide();
	});
	$("#Lz_cause").blur(function() {
		if ($(this).val() != "") {
			if(checkReason($(this).val())){
				$alertcauiseInfo.hide();
				CauseisText = true;
			}
			else{
				$alertcauiseInfo.show();
				$(this).val("");
			    $alertcauiseText.text("请输入正确格式!");
			}
		} else {
			$alertcauiseInfo.show();
			$alertcauiseText.text("请输入离职原因");
			CauseisText = false;
		}
	});
	//点击签字确认，弹出窗口
	$(".confirmBtn").click(function() {
		$("#indexisappMode").show();
		 $("#indexMask").show();
	});
	//弹框签名提示确认按钮
	$("#okCanvs").click(function(){
		$("#indexisappMode").hide();
		$("#indexMask").hide();
		appntPen();
	});
	//弹框签名提示取消按钮
	$("#colsehide").click(function(){
		$("#indexisappMode").hide();
		$("#indexMask").hide();
	});
	//勾选本人是否确认按钮事件处理
	$("#Chebox").click(function() {
		if ($(".Cheboximg").hasClass("Trueimg")) {
			$(".Cheboximg").removeClass("Trueimg");
			Cheboxopt = false;
		} else {
			$(".Cheboximg").addClass("Trueimg");
			Cheboxopt = true;
		}
	});
	/*点击图片事件处理函数*/
	$("#zx_submitinfo .clickImg").click(function() {
		if ($(this).children("img").attr("data-i") == "1") {
			$("#imgShowlz img").removeClass("imgone");
			$("#imgShowlz img").removeClass("imgtow");
			$("#imgShowlz").show();
			var imgPath = $(this).children("img").attr("src");
		    $("#imgShowlz img").attr("src", imgPath);
		    if ($("#imgShowlz img").width() > $("#imgShowlz img").height()) {
		    	$("#imgShowlz img").addClass("imgone");
		    } else {
		    	$("#imgShowlz img").addClass("imgtow");
			}
		    $("#zx_submitinfo .contentScroll").css("overflow-y","hidden");
		}
	})
	$("#imgShowlz").click(function() {
			$(this).hide();
			$("#zx_submitinfo .contentScroll").css("overflow-y","scroll");
	});
	/*图片预览结束*/
	//绑定点击添加图片事件
	$(".addImg").click(function() {
		thisPic=$(this);//保存点击对象
		$("#ishospital").slideDown();
		$("#blackInterface").show();
		
	});
	
	//弹框拍照事件
	$("#choosePhone").click(function() {
		//其他证件拍照获取
		appntCamera();
	});
	//弹框选择从相册
	$("#choosePreview").click(function() {
		//其他证件相册获取
		appntCamera1();
	});
	
	//拍照弹框取消按钮事件
	$("#hidecance").click(function() {
		$("#ishospital").slideUp();
		$("#blackInterface").hide(20);
	});
	

	//点击提交申请按钮时候弹框的返回按钮事件
	$("#ckleftButton").click(function() {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
	});
   //点击提交申请按钮处理事件
	$(".btnonclick").click(function() {
		//Cheboxopt：复选框; CauseisText:离职原因;Canvasimg:签名图片
		if (Cheboxopt && CauseisText && Canvasimg) {
		
				$("#indexMask").show();
			    $("#indexNetPop").show();
		} else {
			mui.alert("未完成信息填写或申请人未签字，请完成");
		}
	});
	//点击提交申请按钮时候弹框的确认按钮事件
	$("#ckrightButton").click(function() {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
		//获取传过来的信息
		var dataInfo = {
             "leaveReason": $("#Lz_cause").val()//离职原因
        }

		Clients.postClientAjax(url.zx_quitapple, dataInfo, getinfodata);
	});
}
function scaleSmall(realScale,clientScale,dom){
//	if(realScale<clientScale){
//		return "";
//	}
 dom.css("transform","scale(realScale)");
 return dom;
	
}
/*提交申请回调函数方法*/
function getinfodata(data) {

	if (data.success) {
		sessionStorage.setItem("statusNo","LB");
		sessionStorage.setItem("clntsurnm",$(".Text_name").text());
		location.hash = "#zx_lzapproval";
	} else {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
		mui.alert(data.message);
	}
}

/*数据回显回调方法*/
function getechoApplyInfo(data) {
//	alert(JSON.stringify(data));
	
	if (data.success == true) {
		if(data.data.leavereason){
			CauseisText=true;
		}
		else{
			CauseisText=false;
		}
		$(".Text_filiale").text(data.data.prodesc02); //获取分公司
		$(".Text_city").text(data.data.sorgName); //获取中支
		$(".Text_service").text(data.data.agenName); //获取服务部
		$(".Text_number").text(data.data.agentnum); //获取工号
		$(".Text_name").text(data.data.clntsurnm); //获取姓名
		$(".Text_rank").text(data.data.dutyName); //获取职级
		
		if(data.data.entrydate){
			var str=data.data.entrydate.substring(0,4)+"-"+data.data.entrydate.substring(4,6)+"-"+data.data.entrydate.substring(6,8);
			$(".Text_date").text(str); //获取入司时间
	
		}
		$(".Text_phone").text(data.data.telphonenum); //获取移动电话
		$("#idnumber").text(data.data.agentnum); //设置工号
		$("#idname").text(data.data.clntsurnm); //设置姓名
		$(".Lz_cause1").val(data.data.leavereason); //设置离职原因
		$(".Lz_cause2").html(data.data.leavereason); //设置离职原因
		$("#appledebt").text(data.data.debt + ".00"); //设置负责金额
		$('textarea[autoHeight]').triggerHandler("keyup");
		if(data.list && data.list.length>0){
				for (var i = 0; i < data.list.length; i++) {
						switch (data.list[i].pictype) {
							case "510100":
								$("#addImg1").attr("src", data.list[i].picpath).attr("data-i", "1");
								break;
							case "510101":
								$("#addImg2").attr("src", data.list[i].picpath).attr("data-i", "1");
								break;
							case "510102":
								$("#addImg3").attr("src", data.list[i].picpath).attr("data-i", "1");
								break;
							case "509800":
								$(".signPic").attr("src", data.list[i].picpath);
								$("#imghide").show();
								Canvasimg = true;
								break;
						}
		        }
			
			
			
		}
	
		switch (statusno) {
			case "LB":
			case "LE":
			case "LF":
				$(".confirmBtn").unbind();
				$("#Lz_cause").attr("disabled", true);
				$(".Lz_cause1").css("display","none");
			    $(".Lz_cause2").css("display","block");
				$("#frontImg").attr("disabled", true);
				$("#reversImg").attr("disabled", true);
				$("#handImg").attr("disabled", true);
				$(".Cheboximg").addClass("Trueimg");
				$("#Chebox").unbind();
				$(".btnonclick").attr("disabled", true).css("background", "#ccc");
				Cheboxopt = true;
				CauseisText = true;
				Canvasimg = true;
				break;
			case "LC":
				$(".Lz_cause1").css("display","block");
			    $(".Lz_cause2").css("display","none");
				Cheboxopt = true;
				CauseisText = true;
				Canvasimg = false;
				$(".signPic").attr("src", "");
				$(".Cheboximg").addClass("Trueimg");
		        break;
			case "LD":
				$(".Lz_cause1").val("");
			    $(".Lz_cause2").html("");
				$(".signPic").attr("src", "");
				$("#imghide").hide();
				$("#addImg1").attr("src", "app/resources/imgs/xuxian.png");
				$("#addImg2").attr("src", "app/resources/imgs/xuxian.png");
				$("#addImg3").attr("src", "app/resources/imgs/xuxian.png");
				CauseisText = false;
				Cheboxopt = false;
				Canvasimg = false;
				break;
		}
	} else {
		mui.alert(data.message);
	}
}
//拍照图片采集
var appntCamera1 = function() { // 从相册选择
	var data = {
		width: "320",
		height: "240",
		mono: 'false',
		quality: '50',
		openFromGallery: 'true',
		businessType: '1',
		scale: "10",
		scalefalg: "true",
		imgType: "OtherPhoto"
	};
	cordova.sino.takePhoto_upload(callback1, data);
};
var callback1 = function(result) {
		$("#ishospital").slideUp();
		$("#blackInterface").hide(20);
		if (result.data.exit == "false") {
			var data = result.data;
		    thisPicCode1=data.signMinImg;
		
			addImg1 = "data:image/png;base64," + data.signMinImg;
			var picOne;
		    if(thisPic.attr("id")=="frontImg"){
		    	picOne="510100"
		    	
		    }
		    else if(thisPic.attr("id")=="reversImg"){ 
		    	picOne="510101"
		    }
		    else{
		    	picOne="510102"
		    }
			var imgdata = {
				agentNum:$("#idnumber").text(),
				picType: picOne,
				fileStr: addImg1
				
				
			}
		
			Clients.postClientAjax(url.zx_fileUploadLeave, imgdata, getPic1);
		}
	}
//拍照图片采集
var appntCamera = function() { // 拍照
	var data = {
		width: "320",
		height: "240",
		mono: 'false',
		quality: '50',
		openFromGallery: 'false',
		businessType: '1',
		scale: "10",
		scalefalg: "true",
		imgType: "01"
	};
	var callback = function(result) {
		$("#ishospital").slideUp();
		$("#blackInterface").hide(20);
		if (result.data.exit=="false") {
			var data = result.data;
		    thisPicCode2=data.signMinImg;
			addImg1 = "data:image/png;base64," + data.signMinImg;
			var picOne;
		    if(thisPic.attr("id")=="frontImg"){
		    	picOne="510100"
		    	
		    }
		    else if(thisPic.attr("id")=="reversImg"){ 
		    	picOne="510101"
		    }
		    else{
		    	picOne="510102"
		    }
			var imgdata = {
				agentNum:$("#idnumber").text(),
				picType: picOne,
				fileStr: addImg1
			
				
			}
		 
			Clients.postClientAjax(url.zx_fileUploadLeave, imgdata, getPic2);
		}
	}
	cordova.sino.takePhoto_upload(callback, data);
};
// 电子签名
signAppntFlag = true;
var appntPen = function() {
	if (appVersion != 'IOS') {
		if (!signAppntFlag) {
			return;
		}
	}
	var name =$(".Text_name").text();
	signAppntFlag = false;
	var data = {
		title: '请签名',
		titleSpanFromOffset: '4',
		titleSpanToOffset: '5',
		singleWidth: '150',
		singleHeight: '75',
		businessType: '1',
		Identitycardnbr: cardphone,
		username: name,
		nessesary: 'false',
		template_serial: cardphone, //标识号
		serverConfigRule: '1137', //关键字 即是签名的位置,是固定编码

	};
	var callback = function(result) {

		signAppntFlag = true;
		if(result.data.cancel){//取消签名放回原有图片
			
		    if($("#imghide").attr("src")==""){
			  $("#imghide").hide();
		    }
		}else if (!result.data.exit) {
            var data = result.data;
			AppntSignatureData = data.signatureData; //投保人签名加密数
			signPic=data.signImg;
	      // 在这写你的请求
			// 可以补全方法 也可以调用方法
			var data1 = {
				picType:"509800",
			    encryStr: AppntSignatureData,
				agentNum: $("#idnumber").text(),
				signStr: "data:image/png;base64," + data.signImg,
			};

			Clients.postClientAjax(url.zx_fliesaveLeave, data1, getsignDigitalSignaturData);
		}
	}
	if (!signAppntFlag) {
		cordova.sino.digitalSignature(callback, data);
	}
};
/*电子签名接口回调方法*/
function getsignDigitalSignaturData(data) {
	if (data.success) {
	
		Canvasimg = true;
		mui.alert("签名成功");
		
		$(".signPic").attr("src","data:image/png;base64," + signPic);
	
		$("#imghide").show();
	} else {
	
		Canvasimg = false;
		mui.alert("签名失败");
		if($("#imghide").attr("src")==""){
			$("#imghide").hide();
		}
	}
}
/*附件上传回调方法*/
//从相册中选取回调
function getPic1(data){

	if (data.success == true) {
//		mui.alert("上传成功！");
		thisPic.parent().prev().find('img').attr("src", "data:image/png;base64," + thisPicCode1).attr("data-i", "1");
	} else {
		mui.alert(data.message);
	}
		
}
//照相机拍照回调
function getPic2(data){

	if (data.success == true) {
//		mui.alert("上传成功！");
		thisPic.parent().prev().find('img').attr("src", "data:image/png;base64," + thisPicCode2).attr("data-i", "1");
	} else {
		mui.alert(data.message);
	}
		
}
//离职原因开始
function checkReason(str){
	
	var reg=/^([A-Za-z\d\u4e00-\u9fa5\s]|[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\、|\，|\；|\。|\？|\！|\“|\”|\‘|\’|\：|\（|\）|\─|\…|\—|\·|\《|\》]){1,200}$/g;
	if(reg.test(str)){
		
		return true;
	}
	else{
		return false;
	}


}
//离职原因结束