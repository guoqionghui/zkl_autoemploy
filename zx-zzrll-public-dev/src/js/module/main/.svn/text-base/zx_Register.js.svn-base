/**
 * validationCode对象用于控制验证码时间
 * **/
var validationCode = {
	timer: "null", //timer变量，控制时间  
	count: 59, //间隔函数，1秒执行  
	curCount: null, //当前剩余秒数  
	/****
	 * ***定义验证码重发时间控制的方法**
	 * ***参数elem 为按钮元素$对象
	 * ***/
	sendMessage: function sendMessage(elem) {
		var self = this;
		self.curCount = self.count;
		//设置button效果，开始计时  
		elem.attr("disabled", "true").css("background", "#c1c1c1");
		elem.text(self.curCount + "s");
		self.timer = setInterval(function() {
			self.SetRemainTime(elem)
		}, 1000); //启动计时器，1秒执行一次
	},
	/****
	 * ***timer处理函数，判断时间**
	 * ***参数elem 为按钮元素$对象
	 * ***/
	SetRemainTime: function(elem) {
		var self = this;
		if (self.curCount == 1) {
			clearInterval(self.timer); //停止计时器  
			elem.removeAttr("disabled").css("background", "#fff"); //启用按钮  
			elem.text("重新发送");
		} else {
			self.curCount--;
			elem.text(self.curCount + "s");
		}
	}
}
var msincre = 59; //判断验证码是否有效	
var userPicker2; //证件类型选择器
var telphonenum = null; //存储发送验证码的手机号码
var phoneCode; //存储收到的验证码
var idType; //记录证件类型选中的值
var $alertInfo; //监听手机错误信息提示框
var $alertText; //错误弹窗的信息--监听手机
var $alertcardInfo; //监听证件号码
var $alertcardText; //错误弹窗的信息--监听证件号码
var $isSelectinfo; //监听证件类型
var $isSelecText; //监听证件类型错误提示信息
var $alerCodetInfo; //监听验证码
var $alerCodetText; //错误弹窗的信息--监听验证码
var $alerCodeimg; //图形验证码错误提示
var $alerCodeimgText; //图形验证码错误提示信息
var reg; //手机号码的正则表达式
var isPhone = false; //手机号码默认为FALSE
var isCodephone = false; //验证码默认为false
var isCardvode = false; //证件类型默认为false
var isType = false; //证件类型默认为false
var isImgphone=false;//图形验证码
var dataCard; //获取后台证件类型
var sendPhone; //手机号
var flag;
var aflag=false;
var IDKinds=[
		{PROCFLG01 :"1",text:"身份证"},
//		{PROCFLG01 :"2",text:"中国护照"},
	 	{PROCFLG01 :"3",text:"军官证"},
	 	{PROCFLG01 :"4",text:"港澳回乡证"},
	 	{PROCFLG01 :"5",text:"其他"},
//	 	{PROCFLG01 :"6",text:"出生证"},
//	 	{PROCFLG01 :"7",text:"户口本"},
//	 	{PROCFLG01 :"8",text:"士兵证"},
	 	{PROCFLG01 :"9",text:"台胞证"},
	 	{PROCFLG01 :"A",text:"外国人永久居留身份证"},
	 
];
/*页面最开始加载执行*/
$(function() {
	mui('.mui-input-row input').input();
		$("#cardPhone").focus();
//		$("#zx_register .phoneInput").focus();
//		$("#zx_register .card-phone").focus();
//		$("#zx_register .valCode").focus();
	init(); //初始化
	clickEvent(); //点击事件初始化方法
})

/*初始化方法*/
function init() {
	//一进页面初始化图形验证的地址 BASEURl为client文件的全局变量BASEURl="https://test2.citicpruagents.com.cn/autoemploy/"
	$('#randomImg').attr('src', BASEURl + 'login/getImagecode?t=' + new Date().getTime());
	//一进页面清除所有的session缓存
	removesessionStorage();
	//调用url截取参数的函数
	
	var urlflage = getUrlParam();
	//截取支付宝URL后面成功的参数
	var flge = urlflage.tradeStatus;
	//截取支付宝URL后面订单号的参数
	var orderNo = urlflage.orderNo;
	//flge = "TRADE_SUCCESS"为成功状态；TRADE_ERROR为失败状态;
	if(flge=="TRADE_SUCCESS"||flge=="TRADE_ERROR"){
		//将支付状态、订单号存进session，以便状态页面查询
		sessionStorage.setItem("trade",flge);
		sessionStorage.setItem("orderNo",orderNo);
		location.hash="#zx_approval";
	}else if(flge==null||flge==""||flge==undefined){
		console.log("3"+flge);
		//location.hash="#zx_register";
	}
}
/*页面点击事件方法*/
function clickEvent() {
	reg =/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //手机号码的正则表达式
	$alertInfo = $("#zx_register .alertInfo"); //监听手机错误信息提示框
	$alertText = $("#zx_register .alertInfo span"); //错误弹窗的信息--监听手机
	$alertcardInfo = $("#zx_register .alertcardInfo"); //监听证件号码
	$alertcardText = $("#zx_register .alertcardInfo span"); //错误弹窗的信息--监听证件号码
	$isSelectinfo = $("#zx_register .Isselect"); //监听证件类型
	$isSelecText = $("#zx_register .Isselect span"); //监听证件类型错误提示信息
	$alerCodetInfo = $("#zx_register .alerCodetInfo"); //监听验证码
	$alerCodetText = $("#zx_register .alerCodetInfo span"); //监听验证码错误提示信息
	$alerCodeimg = $("#zx_register .alerCodeimg"); //图形验证码错误
	$alerCodeimgText = $("#zx_register .alerCodeimg span"); //图形验证码错误
	$("#zx_register .card-phone").bind("input", function() {
		$alertcardInfo.hide();
	});
	$("#zx_register .phoneInput").bind("input", function() {
		$alertInfo.hide();
	});
	$("#zx_register .valCode").bind("input", function() {
		$alerCodetInfo.hide();
	});
	$("#Codeimg").bind("input", function() {
		$alerCodeimg.hide();
	});
//	$("#zx_register .phoneInput").on("change",function(){
//		validationCode.curCount=1;
//	});
	/*下拉选择器证件类型*/
	(function(mui, doc) {
		mui.init();
		mui('.mui-input-row input').input();
		mui.ready(function() {
			//普通示例
			userPicker2 = new mui.PopPicker();
			var cancelBtn = document.getElementsByClassName('mui-poppicker-btn-cancel')[0];
			var addH2 = document.createElement("h2");
			addH2.setAttribute("class", "addTitle");
			addH2.innerHTML = "请选择证件类型";
			$(cancelBtn).after(addH2);
			userPicker2.setData(IDKinds); //IDKinds证件类型
			var showBorrowUsing = document.getElementById('id-card');
			showBorrowUsing.value = IDKinds[0].text;
			showBorrowUsing.dataset.i = IDKinds[0].PROCFLG01;
			idType = IDKinds[0].text;
			var showBank = document.getElementById('inputMask');
			showBank.addEventListener('tap', function(event) {
				$("#cardPhone").blur();
				$(".phoneInput").blur();
				$("#Codeimg").blur();
				$("#phoneCode").blur();
				$alertcardInfo.hide();
				$alertInfo.hide();
				$alerCodetInfo.hide();
				$alerCodeimg.hide();
				userPicker2.show(function(items) {
					showBorrowUsing.value = items[0].text;
					showBorrowUsing.dataset.i = items[0].PROCFLG01;
					idType = items[0].text;
					//返回 false 可以阻止选择框的关闭
					$isSelectinfo.hide();
//					var pattern=/^[a-zA-Z0-9]{6,21}$/;
//					if(idType=="身份证"){
//						if(checkID(cardPhone)){
//							return true;
//						}else{
//							return false;
//						}
//					}else{
//						return pattern.test(cardPhone);
//					}
				});
//				$("#cardPhone").focus();
			}, false);
			isType = true;
		});
	})(mui, document);
	/***为发送验证码按钮添加点击事件***/
	$("#zx_register .countBtn").click(function() {
	
		var phoneVal = $("#zx_register .phoneInput").val(); //手机号
		var codeVal= $("#Codeimg").val();//图片验证码
		if(phoneVal && codeVal && isCardvode){
			if(reg.test(phoneVal)){
				$alertcardInfo.hide();
				sendPhone = phoneVal;
				telphonenum = {
					"imageCode":$("#Codeimg").val(),
					"telphonenum": phoneVal,
					"messageType": "Register"
				};
				Clients.postClientAjax(url.zx_signInformationCode, telphonenum, getPhonecode);
				
			}
			else{
				$alertInfo.show();
			    $alertText.text("手机号码信息有误，请确认");
			}
		}
		else{
			if(phoneVal == ""){
				$alertInfo.show();
			    $alertText.text("请输入手机号");
			}
			if(codeVal == ""){
				//mui.alert(请输入图片验证码)
				$alerCodeimg.show();
				$alerCodeimgText.text("请输入图片验证码!");
			}
		}
	
	});
	/*证件号码码输入框事件失去焦点校验*/
	$("#zx_register .card-phone").on("blur", function() {
		var cardNumber=$(".card-phone").val();
		var cardType=$("#id-card").val();
//		alert(cardType);
		if(cardNumber){
			if(isCardNo($.trim(cardNumber))){
				$alertcardInfo.hide();
				isCardvode = true;
			}
			else{
				$alertcardInfo.show();
				$alertcardText.text("请输入正确的证件号码");
				isCardvode = false;
				
			}
		}
		else{
			$alertcardInfo.show();
			$alertcardText.text("请输入证件号码");
			isCardvode = false;
			
		}
		
	})
		/*手机号码输入框事件梳理函数*/
	$("#zx_register .phoneInput").blur("input", function() {
			if($("#Phonetext").val()!=""){
				if (!reg.test($("#zx_register .phoneInput").val())) {
					$alertInfo.show();
					$alertText.text("手机号码信息有误，请确认");
					isPhone = false
				} else {
					$alertInfo.hide();
					isPhone = true;
				}
			}else{
					$alertInfo.show();
					$alertText.text("请输入手机号");
			}
		})
		/*验证码输入框事件梳理函数*/
	$("#zx_register .valCode").blur("input", function() {
//			if (phoneCode != $("#phoneCode").val()) {
//				$alerCodetInfo.show();
//				$alerCodetText.text("请输入正确的手机验证码");
//				isCodephone = false;
//			} else {
				$alerCodetInfo.hide();
				isCodephone = true;
//			}
	});
	//点击更换图形验证码
	$('#randomImg').click(function() {
		// 图形验证的地址 BASEURl为client文件的全局变量BASEURl="https://test2.citicpruagents.com.cn/autoemploy/"
		$('#randomImg').attr('src', BASEURl + 'login/getImagecode?t=' + new Date().getTime());
	});
	//判断图形验证码是否正确
	$("#Codeimg").on("blur", function() {
		var imgCode=/[a-zA-Z\d]{4,4}/;
		//onlyNumAlpha();
		if ($("#Codeimg").val()=="") {
		    $alerCodeimg.show();
			$alerCodeimgText.text("请输入图片验证码");
			isImgphone=false;
		}else{
			if(!imgCode.test($("#Codeimg").val())){
				 $alerCodeimg.show();
				 isImgphone=false;
				$alerCodeimgText.text("图片验证码输入有误");
			}else{
				isImgphone=true;
			}
		}
	});
	/*点击确认按钮事件*/
	$(".btnonclick").click(function(){
		 ifNonullInfo(); //提交时验证页面信息事件
		 //location.hash = "#zx_job_applicationios"; //跳转到信息录入页面
	})
		/*确认按钮点击之后弹框事件*/
	$(".rightButton").click(function() {
			sessionStorage.setItem("Phone_card", $("#cardPhone").val()); //证件号码
			sessionStorage.setItem("Type_code", $("#id-card").attr("data-i")); //证件类型
			sessionStorage.setItem("Phonevode", $("#zx_register .phoneInput").val()); //手机号码
			sessionStorage.setItem("idType", idType); //证件类型文字
			$("#indexMask").hide();
			$("#indexNetPop").hide();
			sessionStorage.setItem("infotime","1");
			location.hash = "#zx_inforRegister"; //跳转到信息录入页面
		})
		/*弹框提示返回按钮事件*/
	$(".leftButton").click(function() {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
	})
}
/*验证页面信息是否正确*/
function ifNonullInfo() {
// if (isCardvode && isPhone && isType && isCodephone) {
	//isCardvode:证件号码;isPhone:手机号码;isType:证件类型；isCodephone ：手机验证码；
	if (isCardvode && isPhone && isType && isImgphone && isCodephone) {
        	var chequeno = $("#cardPhone").val();
			var telphonenum = $(".phoneInput").val();
			var procflg01 = $("#id-card").attr("data-i");
			var secuityNo = {
				chequeno: chequeno,
				telphonenum: telphonenum,
				procflg01: procflg01
		    };
		    Clients.postClientAjax(url.zx_Gologin, secuityNo, getOkdata);
		    if($("#phoneCode").val()!=""){
		    	//Clients.postClientAjax(url.zx_Gologin, secuityNo, getOkdata);
		    	if(aflag){
		    	 	Clients.postClientAjax(url.zx_Gologin, secuityNo, getOkdata);
				}else{
					$("#phoneCode").val("");
					mui.alert("验证码错误，请重新获取");
				}
		    }else{
		    	mui.alert("请输入手机短信验证码");
		    }
	} 
	else {
		if(!isCardvode){
			mui.alert("请检查输入的证件号码");
		}else if(!isPhone){
			mui.alert("请检查输入的手机号");
		}else if(!isImgphone){
			mui.alert("请检查输入的图形验证码");
		}else if(!isCodephone){
			mui.alert("请检查输入的短信验证码");
		}else{
			mui.alert("请检查输入的登录信息");
		}
	}


}

//确定提交回调函数
function getOkdata(data) {
	var status;
	console.log(data);
	if(data.success){
		if(data.data.login){
			if(data.data.apply){
				status=data.data.status;
				if(status=="AY"){
					sessionStorage.setItem("Phone_card", $("#cardPhone").val()); //证件号码
					sessionStorage.setItem("Type_code", $("#id-card").attr("data-i")); //证件类型
					sessionStorage.setItem("IDname",data.data.clntsurnm);//姓名
					sessionStorage.setItem("Phonevode", $("#zx_register .phoneInput").val()); //手机号码
					sessionStorage.setItem("IDstatusname",status);//审批状态
					location.hash="#zx_approvePay";
				}else{
					sessionStorage.setItem("Phone_card", $("#cardPhone").val()); //证件号码
					sessionStorage.setItem("Type_code", $("#id-card").attr("data-i")); //证件类型
					sessionStorage.setItem("Phonevode", $("#zx_register .phoneInput").val()); //手机号码
					sessionStorage.setItem("IDname",data.data.clntsurnm);//姓名
			        sessionStorage.setItem("IDstatusname",status);//审批状态
					location.hash="#zx_approval";
				}
			}else{
				sessionStorage.setItem("Phone_card", $("#cardPhone").val()); //证件号码
				sessionStorage.setItem("Type_code", $("#id-card").attr("data-i")); //证件类型
				sessionStorage.setItem("Phonevode", $("#zx_register .phoneInput").val()); //手机号码
				sessionStorage.setItem("idType", idType); //证件类型文字	
				location.hash="#zx_inforRegister";
			}
		}else{
			$("#indexMask").show();
			$("#indexNetPop").show();
	
		}
	}else{
		phoneCode=null;
		mui.alert(data.message);
		$("#Codeimg").val("");
		$("#phoneCode").val("");
		//validationCode.curCount=1;
		$('#randomImg').attr('src', BASEURl + 'login/getImagecode?t=' + new Date().getTime());
	}
}
function checkNumber(str) {
	var reg=/^([\u4e00-\u9fa5A-Za-z0-9,.?!;，。？！、；])*$/;
	if ( reg.test(str)) {
		return true;
	}
	return false;
}
//返回到信易通我的登录页面
function backck(){
	var data={
				exitSysPage:"3",
				sessionTimeOut:"Yes"
				};
	//setTimeout(function(){
			cordova.sino.entryLocalSys(function(){},data);
	//	},350);
}
/*获取手机号码验证码回调*/
function getPhonecode(data) {
	if (data.success) {
		phoneCode = data.data;
		validationCode.sendMessage($("#zx_register .countBtn")); //执行验证码重发时间函数
		msinLess();
		msincre = 59;
	} else {
		isImgphone=false;
		$('#randomImg').attr('src', BASEURl + 'login/getImagecode?t=' + new Date().getTime());
		mui.alert(data.message);
	
	}
	
}
/****验证码有效计时****/
function msinLess(){
	timer=setInterval(function(){
		msincre--;
		if(msincre==0){
			clearInterval(timer);
			timer=null;
			aflag=false;
		}else{
			aflag=true;
		}
	},1000)
}
/*获取url的传递的值*/
function getUrlParam(){
		var searchStr=location.search;
		if(searchStr==""){
		    return {};
		}
		var param=searchStr.slice(1,searchStr.length);		
		var moreParamArr=param.split("&");
		var getParam={};
		for(var i=0;i<moreParamArr.length;i++){
				if(moreParamArr[i]!=""){
						var paramArr=moreParamArr[i].split("=");
						getParam[paramArr[0]]=paramArr[1];				
				}
		}
		console.log(getParam);
		return getParam;
}
//校验证件号开始
function isCardNo(cardPhone) {
	//中国护照：14/15+7位数字或p|P|S|s+7位数字或S|s|G|g+8位数字或Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff+8位数字
	//军官证：7位到21位的字母和数字
	//港澳通行证：一位大写字母+6至10位的数字+0个或1个“（1个字母、数字、下划线）”
	//台胞证：8位数字| 10位字母或数字|18位数字
	var pattern=/^[a-zA-Z0-9]{6,21}$/;
	var pattern1=/^[a-zA-Z0-9\u4e00-\u9fa5]{6,21}$/;
	if(idType=="身份证"){
		if(checkID(cardPhone)){
			return true;
		}else{
			return false;
		}
	}else if(idType=="军官证"){
		return pattern1.test(cardPhone);
	}else{
		return pattern.test(cardPhone);
	}
}
//校验证件号开始
//证件号码开始
	//15位转18位中,计算校验位即最后一位
	function GetVerifyBit(id) {
		var result;
		var nNum = eval(id.charAt(0) * 7 + id.charAt(1) * 9 + id.charAt(2) * 10 + id.charAt(3) * 5 + id.charAt(4) * 8 + id.charAt(5) * 4 + id.charAt(6) * 2 + id.charAt(7) * 1 + id.charAt(8) * 6 + id.charAt(9) * 3 + id.charAt(10) * 7 + id.charAt(11) * 9 + id.charAt(12) * 10 + id.charAt(13) * 5 + id.charAt(14) * 8 + id.charAt(15) * 4 + id.charAt(16) * 2);
		nNum = nNum % 11;
		switch (nNum) {
			case 0:
				result = "1";
				break;
			case 1:
				result = "0";
				break;
			case 2:
				result = "X";
				break;
			case 3:
				result = "9";
				break;
			case 4:
				result = "8";
				break;
			case 5:
				result = "7";
				break;
			case 6:
				result = "6";
				break;
			case 7:
				result = "5";
				break;
			case 8:
				result = "4";
				break;
			case 9:
				result = "3";
				break;
			case 10:
				result = "2";
				break;
		}
		return result;
	}
	//15位转18位
	function Get18(idCard) {
		if (CheckValue(idCard)) {
			var id = idCard;
			var id18 = id;
			if (id.length == 0) {
				//alert("请输入15位身份证号！");
				return false;
			}
			if (id.length == 15) {
				if (id.substring(6, 8) > 20) {
					id18 = id.substring(0, 6) + "19" + id.substring(6, 15);
				} else {
					id18 = id.substring(0, 6) + "20" + id.substring(6, 15);
				}
				id18 = id18 + GetVerifyBit(id18);
			}
			return id18;
		} else {
			return false;
		}
	}
	//身份证类
	function identity(no, area, birthday, gender) {
		this.id_no = no; //身份证号
		this.id_area = area; //身份证所在地区
		this.id_birth = birthday; //生日 格式：YYYYMMDD
		this.id_gender = gender; //性别 格式：M/F
	}
	
	function checkID(id) {
		var id_length = id.length;
		var area = "";
		var birthday = "";
		var gender = "";
	
		if (id_length == 0) {
			//alert("请输入身份证号码!");
			return null;
		}
	
		if (aCity[Number(id.substr(0, 2))] == null) {
			//alert("Error:非法地区");
			return null;
		}
	
		if (id_length != 15 && id_length != 18) {
			//alert("身份证号长度应为15位或18位！");
			return null;
		}
	
		if (id_length == 15) {
	
			var bir_yyyy = "19" + id.substring(6, 8);
			var yyyy = Number(bir_yyyy);
	
			var bir_mm = id.substring(8, 10);
			var mm = Number(bir_mm);
	
			var bir_dd = id.substring(10, 12);
			var dd = Number(bir_dd);
	
			var sBirthday = yyyy + "/" + mm + "/" + dd;
			var d = new Date(sBirthday);
			if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
				//alert("Error:非法生日");
				return null;
			}
	
			birthday = bir_yyyy +"/"+ bir_mm +"/" +bir_dd;
	
			if ("13579".indexOf(id.substring(14, 15)) != -1) {
				gender = "M";
			} else {
				gender = "F";
			}
	
		} else if (id_length == 18) {
	
			if (id.indexOf("X") > 0 && id.indexOf("X") != 17 || id.indexOf("x") > 0 && id.indexOf("x") != 17) {
				//alert("身份证中\"X\"输入位置不正确！");
				return null;
			}
	
			var bir_yyyy = id.substring(6, 10);
			var yyyy = Number(bir_yyyy);
			if (yyyy > 2200 || yyyy < 1900) {
				//alert("输入身份证号,年度非法！");
				return null;
			}
	
			var bir_mm = id.substring(10, 12);
			var mm = Number(bir_mm);
	
			var bir_dd = id.substring(12, 14);
			var dd = Number(bir_dd);
	
			var sBirthday = yyyy + "/" + mm + "/" + dd;
			var d = new Date(sBirthday);
			if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
				//alert("Error:非法生日");
				return null;
			}
			//birthday=sBirthday.replace(/-/g,"");
			birthday = bir_yyyy + bir_mm + bir_dd;
			if (id.charAt(17) == "x" || id.charAt(17) == "X") {
				if ("x" != GetVerifyBit(id) && "X" != GetVerifyBit(id)) {
					//alert("身份证校验错误，请检查最后一位！");
					return null;
				}
	
			} else {
				if (id.charAt(17) != GetVerifyBit(id)) {
					//alert("身份证校验错误，请检查最后一位！");
					return null;
				}
			}
			if ("13579".indexOf(id.substring(16, 17)) > -1) {
				gender = "M";
			} else {
				gender = "F";
			}
		}
		var idClass = new identity(id, aCity[Number(id.substr(0, 2))], birthday, gender);
		return idClass;
	}
	
	//证件号码结束
