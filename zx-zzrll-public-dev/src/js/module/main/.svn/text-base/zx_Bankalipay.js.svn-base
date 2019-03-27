/**
 * validationCode对象用于控制验证码时间
 * **/
var validationCode={
		timer:"null", //timer变量，控制时间  
		count:59,//间隔函数，1秒执行  
		curCount:null,//当前剩余秒数  
	/****
	 * ***定义验证码重发时间控制的方法**
	 * ***参数elem 为按钮元素$对象
	 * ***/
		sendMessage:function sendMessage(elem) {
			var self=this;
		    self.curCount = self.count; 
		    //设置button效果，开始计时  
		    elem.attr("disabled", "true").css("background","#c1c1c1");;  
		    elem.text(self.curCount + "s");  
		    self.timer =setInterval(function(){
			    	self.SetRemainTime(elem)
			    }, 1000); //启动计时器，1秒执行一次
		},  
	/****
	 * ***timer处理函数，判断时间**
	 * ***参数elem 为按钮元素$对象
	 * ***/
		SetRemainTime:function(elem) {
			var self=this;
		    if (self.curCount == 1) {                  
		        clearInterval(self.timer);//停止计时器  
		        elem.removeAttr("disabled").css("background","#fff");//启用按钮  
		        elem.text("重新发送");  
		    }  
		    else {  
		        self.curCount--;  
		        elem.text(self.curCount + "s");  
		    }  
		}  
}
var msincre=100;//判断验证码是否有效	
var phoneCode;//存储收到的验证码
var telphonenum=null;//存储发送验证码的手机号码
var BankType;//记录选择的开户银行
var Openbank=false; //标记开户银行是否选择
var BankCode=false;//标记银行卡是否填写
var bankCity = false;//标记开户行所在地是否选择
var bankAccount = false;//标记账户类型是否选择
var BankPhone = false;//标记手机验证码是否填写
var Bankmold;//记录选择的账户类型
var userPicker;//开户银行选择器
var userPickertype;//账户类型选择器
//var Bankphone="18999998889";//获取电话号码
var $alertBankcode;//监听银行卡错误  提示弹框
var $alertBankcodeText;//监听银行卡错误 提示信息
var $alertopenBank;//监听开户银行错误提示框
var $alertopenBankText;//监听开户银行错误信息
var $alertBankegion;//开户所地区错误提示框
var $alertBankegionText;//开户所地区错误信息
var $alertBankeType;//账户类型下拉选择错误提示框
var $alertBankeTypeTetxt;//账户类型下拉选择错误信息
var $alertBankPhone;//手机验证码错误提示框
var $alertBankPhoneText;//手机验证码错误信息
//var phoneCard = "4254821963188888";
//var payAmount ="55"; 
var phoneCard = sessionStorage.getItem('Phone_card');//登录时身份证号
var payAmount = sessionStorage.getItem('payAmount');//支付金额
var Bankphone = sessionStorage.getItem("Phonevode");//获取电话号码
var cityPicker3;
var aflag=false;
$(function(){
	mui('.mui-input-row input').input();
	init();
	clickEvent();//点击事件初始化方法
})
/*初始化方法*/
function init(){
	Clients.postClientAjax(url.zx_bankalipayCode,null,getInitData);
}
/*证件类型回调函数方法*/
function getInitData(data){
	var accountBankName=data.data;
    bankData=textChange(accountBankName,"bankdesc");
    userPicker.setData(bankData);
	console.log(bankData);
}
/*选择器文本键的修改开始*/
function textChange(arr,key){ 
 
   for(var i=0;i<arr.length;i++){
   	    var textValue=arr[i][key];
   	    delete arr[i][key];
   	  	arr[i]["text"]=textValue;
   	  
}
  return arr;
}
/*页面点击事件处理方法*/
function clickEvent(){
	$alertBankcode = $("#zx_bankAlipay .alertBankcode");//银行卡错误提示框
	$alertBankcodeText = $("#zx_bankAlipay .alertBankcode span");//银行卡错误提示信息
	$alertopenBank = $("#zx_bankAlipay .alertopenBank");//开户银行错误提示框
	$alertopenBankText = $("#zx_bankAlipay .alertopenBank span");//开户银行错误信息
	$alertBankegion = $("#zx_bankAlipay .alertBankegion");//开户行所在地错误提示框
	$alertBankegionText = $("#zx_bankAlipay .alertBankegion span");//开户行所在地错误信息
	$alertBankeType = $("#zx_bankAlipay .alertBankeType");//账户类型下拉选择错误提示框
	$alertBankeTypeText = $("#zx_bankAlipay .alertBankeType span");//账户类型下拉选择错误信息
	$alertBankPhone = $("#zx_bankAlipay .alertBankPhone");//手机验证码错误提示框
	$alertBankPhoneText = $("#zx_bankAlipay .alertBankPhone span");//手机验证码错误信息
	/*银行卡输入框绑定事件处理*/
	$("#zx_bankAlipay .card-phone").bind("input",function(){
		var vals=$(this).val();
//		vals=vals.replace(/\D/g,'').replace(/....(?!$)/g,'$& ');//格式化银行卡号
//		$(this).val(vals);
		$alertBankcode.hide();
	});
	/*手机验证码绑定处理事件*/
	$("#zx_bankAlipay .valCode").bind("input",function(){
		$alertBankPhone.hide();
	})
	/*银行卡失去焦点时校验*/
	$("#zx_bankAlipay .card-phone").blur("input",function(){
		var vals=$(this).val();
		vals=vals.replace(/\D/g,'');
		var Bankreg=/^(\d{16}|\d{19})$/;
		if($(this).val()==""){
			$alertBankcode.hide();
			$alertBankcodeText.text("请输入银行卡号");
			BankCode=false;
		}else{
			if(Bankreg.test(vals)==false){
				$alertBankcodeText.text("银行卡位数不对，请输入正确的银行卡号");
				$alertBankcode.show();
				BankCode=false;
			}else{
				$alertBankcode.hide();
				BankCode=true;
			}
		}
	});
	/***为发送验证码按钮添加点击事件***/
	$("#zx_bankAlipay .countBtn").click(function(){
		var reg=/^1\d{10}$/;//手机号码的正则表达式
		if(reg.test(Bankphone)){	
			sendPhone =Bankphone;
			telphonenum={"telphonenum":Bankphone,"messageType":"BankCode"};
			Clients.postClientAjax(url.zx_Phonecode,telphonenum,getPhonecode);
			console.log(telphonenum);
			$alertBankPhone.hide();
		}else if(Bankphone=="" || Bankphone==null || Bankphone == undefined){
			$alertBankPhone.show();
			$alertBankPhoneText.text("手机号码不存在，无法获取验证码");
		}else{
			$alertBankPhone.show();
			$alertBankPhoneText.text("手机号码无效，无法获取验证码");
		}
	});
	/*验证码输入框失去焦点时校验*/
//	$("#zx_bankAlipay .valCode").blur("input",function(){
//			if($(this).val()==phoneCode){
//				$alertBankPhone.hide();
//				BankPhone=true;
//			}else{
//				$alertBankPhone.show();
//				$alertBankPhoneText.text("请输入正确的验证码");
//				BankPhone=false;
//			}
//	});
	/*下拉选择器开户银行*/
	(function(mui, doc) {
		mui.init();
		mui('.mui-input-row input').input();
		mui.ready(function() {
			//普通示例
			userPicker = new mui.PopPicker()
			var cancelBtn = document.getElementsByClassName('mui-poppicker-btn-cancel')[0];
			var addH2 = document.createElement("h2");
			addH2.setAttribute("class", "addTitle");
			addH2.innerHTML = "请选择开户银行";
			$(cancelBtn).after(addH2);
			 //accountBankName 开户银行类型
			var showBorrowUsing1 = document.getElementById('ckbank');
			var showBorrowUsing = document.getElementById('id-bank');
			var showBank = document.getElementById('inputMask');
			showBorrowUsing1.addEventListener('tap', function(event) {
				$("#cardPhone").blur();
				$("#phoneCode").blur();
				userPicker.show(function(items) {
					showBorrowUsing.value = items[0].text;
					showBorrowUsing.dataset.i = items[0].bankcode;
					BankType = items[0].text;
					$alertopenBank.hide();
					Openbank=true;
					//返回 false 可以阻止选择框的关闭
				});
			}, false);
			cancelBtn.addEventListener("tap",function(){
				if(!showBorrowUsing.value){
					$alertopenBank.show();
					$alertopenBankText.text("请选择开户银行")
					Openbank=false;
				}
				else{
					$alertopenBank.hide();
					Openbank=true;
				}				
			},false);	
		});
	})(mui, document);
	/*下拉选择器账户类型*/
	(function(mui, doc) {
		mui.init();
		mui('.mui-input-row input').input();
		mui.ready(function() {
			//普通示例
			userPickertype = new mui.PopPicker()
			var cancelBtn = document.getElementsByClassName('mui-poppicker-btn-cancel')[1];
			var addH2 = document.createElement("h2");
			addH2.setAttribute("class", "addTitle");
			addH2.innerHTML = "请选择账户类型";
			$(cancelBtn).after(addH2);
			userPickertype.setData(bankCardKind); //bankCardKind 账户类型
			var showBorrowUsing1 = document.getElementById('ckBankType');
			var showBorrowUsing = document.getElementById('id-BankType');
			var showBank = document.getElementById('inputMask');
			showBorrowUsing1.addEventListener('tap', function(event) {
				$("#cardPhone").blur();
				$("#phoneCode").blur();
				userPickertype.show(function(items) {
					showBorrowUsing.value = items[0].text;
					showBorrowUsing.dataset.i = items[0].type;
					Bankmold = items[0].text;
					$alertBankeType.hide();
					bankAccount=true;
					//返回 false 可以阻止选择框的关闭
				});
			}, false);
			cancelBtn.addEventListener("tap",function(){
				if(!showBorrowUsing.value){
					$alertBankeType.show();
					$alertBankeTypeText.text("请选择账户类型")
					bankAccount=false;
				}
				else{
					$alertBankeType.hide();
					bankAccount=true;
				}				
			},false);	
		});
	})(mui, document);
	$(".Bamkscanimg").click(function(){
		scanBankCardInfo();
	});
		/*下拉选择器账户类型*/
	// (function(mui, doc) {
	// 	mui.init();
	// 	mui('.mui-input-row input').input();
	// 	mui.ready(function() {
	// 		cityPicker3 = new mui.PopPicker({layer: 3});
	// 		var cancelBtn = document.getElementsByClassName('mui-poppicker-btn-cancel')[1];
	// 		cityPicker3.setData(cityData3); //bankCardKind 账户类型
	// 		var showBorrowUsing = document.getElementById('bankck');
	// 		var showBank = document.getElementById('bankck');
	// 		//地址开始
	// 		var _getParam = function(obj, param) {
	// 			return obj[param] || '';
	// 		};
	// 		showBorrowUsing.addEventListener('tap', function(event) {
	// 			cityPicker3.show(function(items) {
	// 				$("#UOBI-bankCity").val(_getParam(items[0], 'text') + _getParam(items[1], 'text') + _getParam(items[2], 'text'));
	// 				$("#UOBI-bankCity").attr("data-address-type", _getParam(items[0], 'value') + _getParam(items[1], 'value') + _getParam(items[2], 'value'));
	// 				bankCity=true;
	// 				//返回 false 可以阻止选择框的关闭
	// 			});
	// 		}, false);
//			$(".mui-poppicker-btn-cancel").click(function(){
//				console.log("=====");
//				if($("#UOBI-bankCity").val()==""){
//					bankCity =false ;
//		       		//UOBISuccessBtn();
//		       		$alertBankegion.show();
//		       		$alertBankegionText.text("请选择开户行所在地")
//				}else{
//					bankCity =true ;
//		       		//UOBISuccessBtn();
//		       		$alertBankegion.hide();
//				}
//			},false);	
	// 	});
	// })(mui, document);
	/*点击支付按钮处理事件*/
	$("#zx_bankAlipay .Bankbtnonclick").click(function(){
		//银行卡是否填写  账号类型是否填写   开户行所在地是否填写   开户银行是否选中 开户行所在地客户建议不做
		//if(BankCode && bankAccount  && bankCity && Openbank ){
		if(BankCode && bankAccount  && Openbank ){
			var cardPhone=$("#cardPhone").val().replace(/\s/g,"");//卡号
			console.log(cardPhone);
			var Code=$("#id-bank").attr("data-i");//银行卡的类型
			// var uBankCity=$('#UOBI-bankCity').val();
			// var iBankCity=$('#id-BankType').attr("data-i");
			var data={idNo:phoneCard,amount:payAmount,bankcount:cardPhone,bankcode:Code};
				if($("#phoneCode").val()!=""){
		    		Clients.postClientAjax(url.zx_bankalipayInit,data,getBankalipayData);
		    	/*if(aflag){
		    	 	Clients.postClientAjax(url.zx_bankalipayInit,data,getBankalipayData);
				}else{
					mui.alert("验证码已失效，请重新获取");
				}*/
		    }else{
		    	mui.alert("请输入手机短信验证码");
		    }
		}else{
			mui.alert("信息有未填写或填写错误！");
		}
		//isVerifyinfo();
	})
}

/*返回事件监听*/
function onBtnback(){
	userPicker.dispose();//清空选择器
	userPickertype.dispose();//清空选择器
	history.go(-1);
}
/*校验页面输入框是否填写正确*/
function isVerifyinfo(){
	// if(BankCode && bankAccount && BankPhone && bankCity && Openbank){
	
}
/****银行卡号的格式化方法****/
function inputAccount(){  
    var str = $("#cardPhone").val();  
    if(str.length > num){  
        var c = str.replace(/\s/g,  "");
        if(str != "" && c.length > 4 && c.length % 4 == 1){  
        	$("#cardPhone").attr("type","text");
        	$("#cardPhone").val(str.substring(0, str.length - 1)+ " " + str.substring(str.length - 1, str.length));  
    	}  
	} 
	num = str.length;
}
/*获取手机号码验证码回调*/
function getPhonecode(data){
	if (data.success) {
		 phoneCode=data.data;
		 msincre=59;
		 validationCode.sendMessage($("#zx_bankAlipay .countBtn"));//执行验证码重发时间函数
		msinLess();
	} else{
		mui.alert(data.message);
	}
}
function getBankalipayData(data){
	if (data.success==true) {
		if (data.data=="PY") {
			sessionStorage.setItem("stutas", "PY");
			location.hash="#zx_approval";
		} else if(data.data == "PI"){
			mui.alert(data.message);
			$(".Bankbtnonclick").attr("disabled",true).css("background","#ccc");
		} else if(data.data == "AY"){
			mui.alert(data.message);
//			location.hash="#zx_approval";
//			sessionStorage.setItem("paystate",data.message);
		}
	} else{
		mui.alert(data.message);
		//$(".Bankbtnonclick").attr("disabled",true).css("background","#ccc");
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
//扫描身份证结束
//扫描银行卡开始
function scanBankCardInfo(){
		cordova.sino.getBankCardInfo(function(result){
			 result.data.bigPic="";
			result.data.smallPic="";	
			if(result.success){
				if(!result.data.exit){
					//===代表既比较类型也比较内容
					if(appVersion==="IOS"){
						if(result.data.ok){
							    //mui.confirm("银行卡号为："+result.data.CardNumber+"\n银行名字为"+result.data.CardInsName,"tip",['否', '是'],function(e){
							    	//if(e.index==1){
							    		//if(result.data.CardInsName=="中信银行" || result.data.CardInsName=="工商银行"){
										   $("#cardPhone").val(result.data.CardNumber);//银行卡号
											$("#id-bank").val(result.data.CardInsName);//英汉卡名字
											$("#id-BankType").val(result.data.BankCardType);//银行卡类型
											for(var i=0;i<bankData.length;i++){
												if(bankData[i].text==result.data.CardInsName){
													$("#id-bank").attr("data-i",bankData[i].bankcode);
													break;
												}
											}
											Openbank=true;
											BankCode=true;
											bankAccount=true;
//											if(result.data.CardInsName=="中信银行"){
//												$("#bank").attr("bankkey","CITICINDUB");
//											}
//											if(result.data.CardInsName=="工商银行"){
//												$("#bank").attr("bankkey","INDU&COMMB");
//											}
											
									   // }
//							    		else{
//							    			mui.alert("现阶段只支持中信银行和工商银行");
//							    		}
							    	//}
							    	
					          // })
						        	
						}
					}
					else{
					//	alert("android");
						cordova.sino.confirmBankCardInfo(function(result){
							 result.data.bigPic="";
					     	result.data.smallPic="";	
							if(result.success){
								if(result.data.ok){
									//mui.confirm("银行卡号为："+result.data.CardNumber+"\n银行名字为"+result.data.CardInsName,"tip",['否', '是'],function(e){
							    //	if(e.index==1){
							    		//if(result.data.CardInsName=="中信银行" || result.data.CardInsName=="工商银行"){
										    $("#cardPhone").val(result.data.CardNumber);//银行卡号
											$("#id-bank").val(result.data.CardInsName);//英汉卡名字
											$("#id-BankType").val(result.data.BankCardType);//银行卡类型
											for(var i=0;i<bankData.length;i++){
												if(bankData[i].text==result.data.CardInsName){
													$("#id-bank").attr("data-i",bankData[i].bankcode);
													break;
												}
											}
											Openbank=true;
											BankCode=true;
											bankAccount=true;
//											if(result.data.CardInsName=="中信银行"){
//												$("#bank").attr("bankkey","CITICINDUB");
//											}
//											if(result.data.CardInsName=="工商银行"){
//												$("#bank").attr("bankkey","INDU&COMMB");
//											}
											
//									    }
//							    		else{
//							    			mui.alert("现阶段只支持中信银行和工商银行");
//							    		}
							    //	}
							    	
					         //  })
									
								
								
								}else{
									scanBankCardInfo();
								}
							}else{
								mui.alert("确认银行卡信息发生错误:"+result.data.errormsg);
							}
						},result.data)
					}
				}
			}else{
				mui.alert("扫描银行卡信息失败:"+result.data.errormsg);
			}
				
		})
	}
//扫描银行卡结束