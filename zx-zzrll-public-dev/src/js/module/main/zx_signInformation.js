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
	sendMessage: function(elem) {
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
var refF; //sessionStorage 资料一的变量
var refS; //sessionStorage 资料二的变量
var refT; //sessionStorage 资料三的变量
var refContract; //sessionStorage 代理合同的变量
var refConfirm; //sessionStorage 本人确认的变量
// var dataUrl; //签字图片保存的变量
var $alertBankPhone; //手机验证码错误提示框
var $alertBankPhoneText; //手机验证码错误信息
var msincre = 179; //短信失效时间
// var conflag; //弹出确认框的标志
var isFaceVerify = false; //人脸识别是否完成标志
var isBankPhone = false; //标记手机验证码是否填写
var isSign = false; //签名是否完成标志
var ischeck = false; //人脸、短信、签名三项是否都完成的标识
var code = "Code" //手机验证码标识，传向后台
var aflag = false;
var PhoneCode; //手机验证码
var signPhoto; //显示签名的变量
var facePhoto; //显示拍照或者人脸识别的变量
var personState; //返回申请人的session值
// var Bankphone = "17602066003"; //获取电话号码

//获取sessionStorage的值
var refF = sessionStorage.getItem("infoReadStateF"); //资料一
var refS = sessionStorage.getItem("infoReadStateS"); //资料二
var refT = sessionStorage.getItem("infoReadStateT"); //资料三
var refContract = sessionStorage.getItem('agencyContract'); //代理合同
var refConfirm = sessionStorage.getItem('confirmed'); //本人确认
var payAmount = sessionStorage.getItem('payAmount'); //履约保证金
var pdfData = JSON.parse(sessionStorage.getItem("contract")); //请求代理合同传的参数(分公司名称、乙方身份在号、详细地址、邮编、履约保证金)
var refTypeCode = sessionStorage.getItem('Type_code'); //登录时证件类型
var Bankphone = sessionStorage.getItem('Phonevode'); //登录时手机号
var applicationName = sessionStorage.getItem('applicationName'); //人脸识别姓名

var refPhoneCard = sessionStorage.getItem('Phone_card'); //登录时证件证号

var AppntverificationData = ""; //人脸识别大礼包
// var refTypeCode = "1";//登录时证件类型
// var refPhoneCard="4254821963188888";//人脸识别身份证 打开pdf传的参数号
// var applicationName="郭浩妙";//人脸识别姓名

// var refPhoneCard="4254821963188888";//打开pdf传的参数身份证号
// var comname="广东分公司";//打开pdf传的参数分公司
// var add="广东省广州市";//打开pdf传的参数详细地址
// var post="3453333";//打开pdf传的参数邮编
// var costAmount="55"//pdf 履约保证金

$(document).ready(function() {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	if (sessionStorage.getItem("stutas") || sessionStorage.getItem("payref")) {

		personState = sessionStorage.getItem("stutas");

		//审批中或者审批完成待缴费状态
		if (personState == "AI" || sessionStorage.getItem("payref") == "PY") {
			$("#information1 span").html("已阅读");
			$("#information1 span").css({
				color: "gray"
			});
			$("#information2 span").html("已阅读");
			$("#information2 span").css({
				color: "gray"
			});
			$("#information3 span").html("已阅读");
			$("#information3 span").css({
				color: "gray"
			});
			$("#agencyContract span").html("已阅读");
			$("#agencyContract span").css({
				color: "gray"
			});
			$('#information1').click(function() {
				location.hash = "#zx_read-infoContentF";
			});
			$('#information2').click(function() {
				location.hash = "#zx_read-infoContentS";
			});
			$('#information3').click(function() {
				location.hash = "#zx_read-infoContentT";
			});

			//点击代理合同
			$('#agencyContract').click(function() {
				// var pdfData={
				// 	chequeno: "466161616313133131",//身份证号
				// 	subcomid:"GD0001",//分公司
				// 	address:"33445657687",//乙方的地址(详细地址)
				// 	postcode:"233234",//邮编
				// 	paymoney:"",//履约保证金(缴费之后取seesion)
				// };
				location.hash = "#zx_agencyContract"
					//Clients.postClientAjax(url.zx_signContractInit,pdfData,getSignContractInitData);
					// window.open("https://test2.citicpruagents.com.cn/autoemploy/pdf/test.jpg",'_blank');
					// sessionStorage.setItem("contractUrl","https://test2.citicpruagents.com.cn/autoemploy/pdf/test.jpg");
					// location.hash="#zx_agencyContract";
					// cordova.sino.openPDF(callback, {URL:"https://test2.citicpruagents.com.cn/autoemploy/pdf/123.pdf"});

			});
			$(".readOne").addClass('read');
			$(".readOne").unbind();
			var photoTypes = ["999900", "999800"];
			var returnPhoto = {
				PicTypes: photoTypes,
				CHEQUENO: refPhoneCard
			};
			Clients.postClientAjax(url.zx_signFaceSignPhotoY, returnPhoto, getReturnPhotoDataY);
			$("#appntCamera").unbind();
			$(".countBtn").unbind();
			$("#Signname").unbind();
			$(".countBtn").remove();
			$("#se-approval-state").remove();
			$(".camera").attr("disabled", "true").css("background", "#ccc");
			$(".message").attr("disabled", "true").css("background", "#ccc");
			$(".sign").attr("disabled", "true").css("background", "#ccc");
			$("#confirm").attr("disabled", "true").css("background", "#ccc");
			$(".btnonclick").html("返回登录页面");
			$(".btnonclick").click(function() {
				location.hash = "#zx_register";
			})
		}
		//返回申请人或者申请不通过
		else {
			if (sessionStorage.getItem('flag') == "true") {
				//调用点击绑定事件
				eventBind();
				//从资料、合同页面返回，请求是否做过人脸识别、短信、签名等
				var photoTypes = ["999900", "999800"];
				var returnPhoto = {
					PicTypes: photoTypes,
					CHEQUENO: refPhoneCard
				};
				Clients.postClientAjax(url.zx_signFaceSignPhoto, returnPhoto, getReturnPhotoData);

				//	改变未阅读和已阅读的状态
				//	资料状态
				if (refF == "1") {
					$("#information1 span").html("已阅读");
					$("#information1 span").css({
						color: "gray"
					});
				}
				if (refS == "1") {
					$("#information2 span").html("已阅读");
					$("#information2 span").css({
						color: "gray"
					});
				}
				if (refT == "1") {
					$("#information3 span").html("已阅读");
					$("#information3 span").css({
						color: "gray"
					});
				}
				//	代理合同状态
				if (refContract == "1") {
					$("#agencyContract span").html("已阅读");
					$("#agencyContract span").css({
						color: "gray"
					});
				}
				//	本人确认方框状态
				if (refConfirm == "1") {
					$(".readOne").addClass('read');
				} else {
					$('.readOne').removeClass('read');
				}

				if (aflag) {
					isBankPhone = true;
					var mesageval = sessionStorage.getItem("valCode");
					$("#se-approval-state").val(mesageval);
					// $(".message").attr("disabled","true").css("background","#ccc");			
				} else {
					isBankPhone = false;
				}
			} else if (sessionStorage.getItem("stutasFlag")) {
				//调用点击绑定事件
				eventBind();
				//从资料、合同页面返回，请求是否做过人脸识别、短信、签名等
				var photoTypes = ["999900", "999800"];
				var returnPhoto = {
					PicTypes: photoTypes,
					CHEQUENO: refPhoneCard
				};
				Clients.postClientAjax(url.zx_signFaceSignPhoto, returnPhoto, getReturnPhotoData);

				//	改变未阅读和已阅读的状态
				//	资料状态
				if (refF == "1") {
					$("#information1 span").html("已阅读");
					$("#information1 span").css({
						color: "gray"
					});
				}
				if (refS == "1") {
					$("#information2 span").html("已阅读");
					$("#information2 span").css({
						color: "gray"
					});
				}
				if (refT == "1") {
					$("#information3 span").html("已阅读");
					$("#information3 span").css({
						color: "gray"
					});
				}
				//	代理合同状态
				if (refContract == "1") {
					$("#agencyContract span").html("已阅读");
					$("#agencyContract span").css({
						color: "gray"
					});
				}
				//	本人确认方框状态
				if (refConfirm == "1") {
					$(".readOne").addClass('read');
				} else {
					$('.readOne').removeClass('read');
				}

				if (aflag) {
					isBankPhone = true;
					var mesageval = sessionStorage.getItem("valCode");
					$("#se-approval-state").val(mesageval);
					// $(".message").attr("disabled","true").css("background","#ccc");			
				} else {
					isBankPhone = false;
				}
				//请求删除图片
				Clients.postClientAjax(url.zx_signInformationDeletePhoto, {
					idNum: refPhoneCard
				}, getReturnDeletePhotoData);
			} else {
				//请求删除图片
				Clients.postClientAjax(url.zx_signInformationDeletePhoto, {
					idNum: refPhoneCard
				}, getReturnDeletePhotoData);
				//	改变未阅读和已阅读的状态
				//	资料状态
				$("#information1 span").html("未阅读");
				$("#information1 span").css({
					color: "#d92531"
				});
				$("#information2 span").html("未阅读");
				$("#information2 span").css({
					color: "#d92531"
				});
				$("#information3 span").html("未阅读");
				$("#information3 span").css({
					color: "#d92531"
				});
				$("#agencyContract span").html("未阅读");
				$("#agencyContract span").css({
					color: "#d92531"
				});
				$('.readOne').removeClass('read');
				sessionStorage.setItem("infoReadStateF", "0");
				sessionStorage.setItem("infoReadStateS", "0");
				sessionStorage.setItem("infoReadStateT", "0");
				sessionStorage.setItem("aefF", refF);
				sessionStorage.setItem("aefS", refS);
				sessionStorage.setItem("aefT", refT);
				sessionStorage.setItem('agencyContract', '0');

				//调用点击绑定事件
				eventBind();

				if (sessionStorage.getItem('flag') == "true") {
					var photoTypes = ["999900", "999800"];
					var returnPhoto = {
						PicTypes: photoTypes,
						CHEQUENO: refPhoneCard
					};
					Clients.postClientAjax(url.zx_signFaceSignPhoto, returnPhoto, getReturnPhotoData);
				} else {
					Clients.postClientAjax(url.zx_signInformationDeletePhoto, {
						idNum: refPhoneCard
					}, getReturnDeletePhotoData);
				}
				//删除”返回申请人或者不通过的session "AB"返回申请人  "AN"审批不通过
				if (personState == "AB") {
					sessionStorage.setItem("stutasFlag", "AB");
				} else {
					sessionStorage.setItem("stutasFlag", "AN");
				}

				//删除”返回申请人或者不通过的session
				sessionStorage.removeItem("stutas");
			}
		}
	} else if (sessionStorage.getItem('flag') == "true") {
		//调用点击绑定事件
		eventBind();
		//从资料、合同页面返回，请求是否做过人脸识别、短信、签名等
		var photoTypes = ["999900", "999800"];
		var returnPhoto = {
			PicTypes: photoTypes,
			CHEQUENO: refPhoneCard
		};
		Clients.postClientAjax(url.zx_signFaceSignPhoto, returnPhoto, getReturnPhotoData);

		//	改变未阅读和已阅读的状态
		//	资料状态
		if (refF == "1") {
			$("#information1 span").html("已阅读");
			$("#information1 span").css({
				color: "gray"
			});
		}
		if (refS == "1") {
			$("#information2 span").html("已阅读");
			$("#information2 span").css({
				color: "gray"
			});
		}
		if (refT == "1") {
			$("#information3 span").html("已阅读");
			$("#information3 span").css({
				color: "gray"
			});
		}
		//	代理合同状态
		if (refContract == "1") {
			$("#agencyContract span").html("已阅读");
			$("#agencyContract span").css({
				color: "gray"
			});
		}
		//	本人确认方框状态
		if (refConfirm == "1") {
			$(".readOne").addClass('read');
		} else {
			$('.readOne').removeClass('read');
		}

		if (aflag) {
			isBankPhone = true;
			var mesageval = sessionStorage.getItem("valCode");
			$("#se-approval-state").val(mesageval);
			// $(".message").attr("disabled","true").css("background","#ccc");			
		} else {
			isBankPhone = false;
		}
	} else {
		//从上个页面进入，请求删除图片
		Clients.postClientAjax(url.zx_signInformationDeletePhoto, {
			idNum: refPhoneCard
		}, getReturnDeletePhotoData);
		//调用点击绑定事件
		eventBind();

		//	改变未阅读和已阅读的状态
		//	资料状态
		if (refF == "1") {
			$("#information1 span").html("已阅读");
			$("#information1 span").css({
				color: "gray"
			});
		}
		if (refS == "1") {
			$("#information2 span").html("已阅读");
			$("#information2 span").css({
				color: "gray"
			});
		}
		if (refT == "1") {
			$("#information3 span").html("已阅读");
			$("#information3 span").css({
				color: "gray"
			});
		}
		//	代理合同状态
		if (refContract == "1") {
			$("#agencyContract span").html("已阅读");
			$("#agencyContract span").css({
				color: "gray"
			});
		}
		//	本人确认方框状态
		if (refConfirm == "1") {
			$(".readOne").addClass('read');
		} else {
			$('.readOne').removeClass('read');
		}
	}
});

// 绑定函数事件开始
function eventBind() {
	//	点击资料时,调转其他页面
	$('#information1').click(function() {
		sessionStorage.setItem("aefF", refF);
		sessionStorage.setItem("flag", false);
		location.hash = "#zx_read-infoContentF";
	});
	$('#information2').click(function() {
		sessionStorage.setItem("aefS", refS);
		sessionStorage.setItem("flag", false);
		location.hash = "#zx_read-infoContentS";
	});
	$('#information3').click(function() {
		sessionStorage.setItem("aefT", refT);
		sessionStorage.setItem("flag", false);
		location.hash = "#zx_read-infoContentT";
	});
	//	本人确认方框
	$('.check-confirm').click(function() {
		$('.check-confirm span').toggleClass('read');
		//	判断本人确认方框是否已经选中,并且将状态记录
		if ($('.check-confirm .readOne').hasClass('read')) {
			sessionStorage.setItem("confirmed", "1");
		} else {
			sessionStorage.setItem("confirmed", "0");
		}
	});
	//点击代理合同
	$('#agencyContract').click(function() {
		sessionStorage.setItem('agencyContract', '1');
		sessionStorage.setItem("flag", false);
		// var pdfData={
		// 	chequeno: "466161616313133131",//身份证号
		// 	subcomid:"GD0001",//分公司
		// 	address:"33445657687",//乙方的地址(详细地址)
		// 	postcode:"233234",//邮编
		// 	paymoney:"",//履约保证金(缴费之后取seesion)
		// };
		location.hash = "#zx_agencyContract"
			//Clients.postClientAjax(url.zx_signContractInit,pdfData,getSignContractInitData);
			// window.open("https://test2.citicpruagents.com.cn/autoemploy/pdf/test.jpg",'_blank');
			// sessionStorage.setItem("contractUrl","https://test2.citicpruagents.com.cn/autoemploy/pdf/test.jpg");
			// location.hash="#zx_agencyContract";
			// cordova.sino.openPDF(callback, {URL:"https://test2.citicpruagents.com.cn/autoemploy/pdf/123.pdf"});
	});

	//手机验证码
	$alertBankPhone = $("#zx_signInformation .alertBankPhone"); //手机验证码错误提示框
	$alertBankPhoneText = $("#zx_signInformation .alertBankPhone span"); //手机验证码错误信息
	/*手机验证码绑定处理事件*/
	$("#zx_signInformation .valCode").bind("input", function() {
		$alertBankPhone.hide();
	});
	/***为发送验证码按钮添加点击事件***/
	$("#zx_signInformation .countBtn").click(function() {
		refConfirm = sessionStorage.getItem('confirmed');
		//	当代理合同和本人确认状态改变后,进行人脸识别拍照,验证码,电子签名
		if (refContract == "1" && refConfirm == "1") {
			var reg = /^1\d{10}$/; //手机号码的正则表达式
			if (reg.test(Bankphone)) {
				validationCode.sendMessage($("#zx_signInformation .countBtn")); //执行验证码重发时间函数
				$alertBankPhone.hide();
				Clients.postClientAjax(url.zx_queryCode, {
					telphonenum: Bankphone,
					messageType: "Code"
				}, getPhoneCodeData);
			} else if (Bankphone == "" || Bankphone == null || Bankphone == undefined) {
				$alertBankPhone.show();
				$alertBankPhoneText.text("手机号码不存在，无法获取验证码");
			} else {
				$alertBankPhone.show();
				$alertBankPhoneText.text("手机号码无效，无法获取验证码");
			}
		} else {
			mui.alert('请阅读代理合同并确认')
		}
	});

	//点击人脸识别拍照
	$("#appntCamera").click(function() {
	
		//检验是否已经阅读并确认
		refConfirm = sessionStorage.getItem('confirmed');
		if (refContract == "1" && refConfirm == "1") {
			//refTypeCode获取证件类型 "1"为身份证
			//证件类型是身份证，进行人脸识别
			if (refTypeCode == "1") {
				appntOcr(); //人脸识别
			} else {
				//进行拍照
				var ua = navigator.userAgent.toLowerCase();
				if (/iphone|ipad|ipod/.test(ua)) { //登录过没有提交过申请N
				
					appntCamera(); //拍照
				} else if (/android/.test(ua)) {
//					appntCamera(); //拍照
				
					appntCamera1(); //拍照
				}
			}
		} else {
			mui.alert('请阅读代理合同并确认');
		}
	});

	//点击电子签名
	$("#Signname").click(function() {
		//检验是否已经阅读并确认
		refConfirm = sessionStorage.getItem('confirmed');
		if (refContract == "1" && refConfirm == "1") {
			if (isFaceVerify) {
				var ua = navigator.userAgent.toLowerCase();
		 			if (/iphone|ipad|ipod/.test(ua)) {//登录过没有提交过申请N
		 				$("#indexisappMode").show();
		 				$("#indexMask").show();
		 			} else if (/android/.test(ua)) {
		 				$("#indexisappMode").show();
		 				$("#indexMask").show();
		 				$("#Canvasname").text("请把手机竖向完成签名!")
		 			}
				
			} else {
				mui.alert('请先进行人脸识别/拍照');
			}

		} else {
			mui.alert('请阅读代理合同并确认');
		}

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
	//点击确认按钮
	$("#confirm").click(function() {
			// console.log(sessionStorage.getItem("message"));
			//msinLess();//调用验证码有效时间&&isBankPhone&&isBankPhone
			if (isFaceVerify && isSign) {
				if ($(".valCode").val() == "") {
					mui.alert("请输入手机短信验证码");
				} else {
					if (aflag) {
						$("#indexMask").show();
						$("#indexNetPopok").show();
					} else {
						mui.alert("验证码错误，请重新获取")
					}
				}
			} else {
				mui.alert("请检查人脸识别/拍照、短信验证、电子签名是否填写完成");
			}
			//		if($(".valCode").val()==""){
			//				
			//		}else{
			//			if(isBankPhone){
			//				$("#indexMask").show();
			//				$("#indexNetPopok").show();
			//				
			//			}
			//			else{
			//				if(isBankPhone == false){
			//					if(sessionStorage.getItem("message")=="false"){
			//						mui.alert("验证码已失效，请重新获取")
			//					}else{
			//						mui.alert("请检查短信验证填写完成")
			//					}
			//					
			//				}else{
			//					mui.alert("请检查人脸识别/拍照、短信验证、电子签名是否填写完成");
			//				}
			//				
			//			}	
			//		}
		})
		//确认弹框取消按钮事件
	$("#callbackbtn").click(function() {
		$("#indexMask").hide();
		$("#indexNetPopok").hide();
	});
	//确认弹框确定按钮事件
	$("#okrightButton").click(function() {
		$("#indexMask").hide();
		$("#indexNetPopok").hide();
		//点击确认后，人脸识别、拍照、验证码、电子签名按钮置灰
		$("#appntCamera").unbind();
		$(".countBtn").unbind();
		$("#Signname").unbind();
		$(".countBtn").remove();
		$(".check-confirm").unbind();
		$("#se-approval-state").attr("readonly");
		$(".camera").attr("disabled", "true").css("background", "#ccc");
		$(".message").attr("disabled", "true").css("background", "#ccc");
		$(".sign").attr("disabled", "true").css("background", "#ccc");
		$("#confirm").attr("disabled", "true").css("background", "#ccc");
		ischeck = true;

	});

	//点击提交申请
	$(".btnonclick").click(function() {
		ckConfirm = sessionStorage.getItem('confirmed');
		if (ischeck && refF == "1" && refS == "1" && refT == "1" && ckConfirm== "1") {
			//mui.alert(ckConfirm);
			$("#indexMask").show();
			$("#indexNetPop").show();
		} else {
			if (refF != "1" || refS != "1" || refT != "1") {
				mui.alert("请阅读全部资料");

			} else {
				mui.alert('请确认已完成人脸识别和电子签名等以上操作');
			}

		}
	});
	/*弹框提示返回按钮事件*/
	$("#backbtn").click(function() {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
	});

	/*确认按钮点击之后弹框事件*/
	$("#rightButton").click(function() {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
		sessionStorage.setItem("stutas", "AI"); //返回审批中
		var flag = sessionStorage.getItem("flag");
		flag = true;
		sessionStorage.setItem("flag", flag);
		sessionStorage.setItem("stutas", flag);
		// location.hash = "#zx_approval";
		// var photoTypes = ["999900","999800"];
		// var returnPhoto={PicTypes:photoTypes,CHEQUENO:refPhoneCard};
		Clients.postClientAjax(url.zx_signInsertApprInfo, {
			chequeno: refPhoneCard
		}, getApprInfoData);
	});
}
// 绑定函数事件结束

/*返回上一页面事件*/
function goBack() {
	history.go(-1);
	var ref = 1;
	var stutasFlag = sessionStorage.getItem("stutasFlag");
	if (sessionStorage.getItem("stutas")) {
		sessionStorage.setItem("Imgref", ref);
	} else if (stutasFlag == "AB") {
		//添加”返回申请人或者不通过的session
		sessionStorage.setItem("stutas", "AB");
		sessionStorage.setItem("Imgref", ref);
	} else if (stutasFlag == "AN") {
		sessionStorage.setItem("stutas", "AN");
		sessionStorage.setItem("Imgref", ref);
	}
	sessionStorage.setItem("Imgref", ref);
}

//获取手机验证码的回调
function getPhoneCodeData(data) {
	msinLess(); //调用验证码有效时间
	PhoneCode = data.data;
	console.log(PhoneCode);
	//phoneCodeBlur(PhoneCode);

}

/*验证码输入框失去焦点时校验*/
function phoneCodeBlur(PhoneCode) {
	$("#zx_signInformation .valCode").blur("input", function() {
		if ($(this).val() == PhoneCode) {
			var messageCode = $(this).val()
			$alertBankPhone.hide();
			sessionStorage.setItem("valCode", messageCode);
			isBankPhone = true;
			// 	mui.alert("短信验证成功");
		} else {
			$alertBankPhone.show();
			$alertBankPhoneText.text("请输入正确的验证码");
			isBankPhone = false;
		}
	});
}

/****验证码有效计时****/
function msinLess() {
	timer = setInterval(function() {
		msincre--;
		if (msincre == 0) {
			clearInterval(timer);
			timer = null;
			//sessionStorage.setItem("message",false);
			aflag = false;
		} else {
			aflag = true;
			//sessionStorage.setItem("message",true);
		}
	}, 1000)
}

//人脸识别
var appntOcrFlag = true;
var appntOcr = function() {
	if (appVersion != 'IOS') {
		if (!appntOcrFlag) {
			return;
		}
		appntOcrFlag = false;
	}
	//调用人脸的参数
	var data = {};
	var callback = function(result) {
		appntOcrFlag = true;
		//判断是否成功
		if (result.data.isSuccess == "1") {
			AppntverificationData = result.data.verificationData; //大礼包
			// ajaxceshi(AppntverificationData);
			appntOcrSave(AppntverificationData); //调用保存人脸识别数据函数
		} else {
			//人脸识别原生"没通过"
			sino.alert("人脸识别失败");
		}
	};
	//调用原生
	cordova.sino.LivenessDetection(callback, data);
}

//拍照，图片采集
var appntCameraFlag = true;
var appntCamera = function() { // 投保人拍照
	if (appVersion != 'IOS') {
		if (!appntCameraFlag) {
			return;
		}
		appntCameraFlag = false;
	}
	//原生拍照的参数
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
			appntCameraFlag = true;
			if (!result.data.exit) {
				var data = result.data;
				//回显拍照的图片
				$("#appntCamera").attr("src",
					"data:image/png;base64," + data.signImg);
				// 将拍照的图片存在全局变量
				facePhoto = data.signImg;
				//请求后台,参数photoName,photoTypes,photoNos是数组,因为有可能是多张
				var photoName = ["data:image/png;base64," + data.signImg]; //拍照的图片,"data:image/png;base64,"代表头信息(一定要加),data.signImg是二进制流
				var photoTypes = ["999900"]; //上传附件,999900代表拍照/人脸识别的图片
				var phoneCard = refPhoneCard; //证件号
				var photoData = {
					fileName: photoName, //拍照图片
					PicTypes: photoTypes, //类型
					CHEQUENO: phoneCard //证件号
				};
				//请求后台保存拍照图片
				Clients.postClientAjax(url.zx_signMultifileUploadPhoto, photoData, getsignMultifileUploadPhotoData);
			}
		}
		// 调用原生拍照
	cordova.sino.takePhoto(callback, data);
};
//拍照，图片采集
   var appntCameraFlag1 = true;
   var appntCamera1 = function() { // 投保人拍照
   	if (appVersion != 'IOS') {
   		if (!appntCameraFlag1) {
   			return;
   		}
   		appntCameraFlag1 = false;
   	}
   	//原生拍照的参数
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
   			appntCameraFlag1 = true;
   			if (result.data.exit == "false") {
   				var data = result.data;
   				//回显拍照的图片
   				$("#appntCamera").attr("src",
   					"data:image/png;base64," + data.signMinImg);
   				// 将拍照的图片存在全局变量
   				facePhoto = data.signMinImg;
   				//请求后台,参数photoName,photoTypes,photoNos是数组,因为有可能是多张
   				var photoName = ["data:image/png;base64," + data.signMinImg]; //拍照的图片,"data:image/png;base64,"代表头信息(一定要加),data.signImg是二进制流
   				var photoTypes = ["999900"]; //上传附件,999900代表拍照/人脸识别的图片
   				var phoneCard = refPhoneCard; //证件号
   				var photoData = {
   					fileName: photoName, //拍照图片
   					PicTypes: photoTypes, //类型
   					CHEQUENO: phoneCard //证件号
   				};
   				//请求后台保存拍照图片
   				Clients.postClientAjax(url.zx_signMultifileUploadPhoto, photoData, getsignMultifileUploadPhotoData);
   			}
   		}
   		// 调用原生拍照
   	cordova.sino.takePhoto_upload(callback, data);
   };
//拍照存数据的回调
function getsignMultifileUploadPhotoData(result) {
	if (result.success) {
		isFaceVerify = true;
		mui.alert(result.message);
	} else {
		mui.alert(result.message);
		isFaceVerify = false;
	}

}

// 电子签名
var signAppntFlag = true;
var appntPen = function() {
	if (appVersion != 'IOS') {
		if (!signAppntFlag) {
			return;
		}
	}
	signAppntFlag = false;
	var data = {
		title: '请签名',
		titleSpanFromOffset : '4',
		titleSpanToOffset : '5',
		singleWidth : '150',
		singleHeight : '75',
		businessType: '1',
		Identitycardnbr: refPhoneCard, //证件号
		username: applicationName,
		nessesary: 'false',
		template_serial: refPhoneCard, //标识号
		serverConfigRule: '1135', //关键字 即是签名的位置,是固定编码

	};
	var callback = function(result) {
		signAppntFlag = true;
		if (result.data.cancel) { //取消签名放回原有图片
			if (signPhoto) {
				$("#Signname").attr("src", "data:image/png;base64," + data.signImg);
			} else {
				$("#Signname").attr("src", "app/resources/imgs/sign.jpg");
			}

		} else if (!result.data.exit) {
			var data = result.data;
			AppntSignatureData = data.signatureData; //签名加密数据
			$("#Signname").attr("src", "data:image/png;base64," + data.signImg);
			signPhoto = data.signImg;
			// $("#AppntSignBase64").val(data.signImg);
			// 在这写你的请求
			// 可以补全方法 也可以调用方法
			var ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				var data = {
					CHEQUENO: refPhoneCard,
					base64Str: "data:image/png;base64," + data.signImg,
					ESIGNBACKDSTR: AppntSignatureData,
					deviceType:"ios"
				};
				Clients.postClientAjax(url.zx_signDigitalSignature, data, getsignDigitalSignaturData);
			} else if (/android/.test(ua)) {
				var data = {
					CHEQUENO: refPhoneCard,
					base64Str: "data:image/png;base64," + data.signImg,
					ESIGNBACKDSTR: AppntSignatureData,
					deviceType:"android"
				};
				Clients.postClientAjax(url.zx_signDigitalSignature, data, getsignDigitalSignaturData);
			}
		}

	}
	if (!signAppntFlag) {
		cordova.sino.digitalSignature(callback, data);
	}
};
// 人脸认识测试方法
var ajaxceshi = function(AppntverificationData) {
	alert("进入方法1");
	$.ajax({
		// url:"http://openapi.situdata.com/face/pair-package-photo",
		url: "http://openapi.situdata.com/face/pair-package-photo",
		type: 'post',
		data: {
			"queryImagePackage": AppntverificationData,
			"databaseImageContent": "iVBORw0KGgoAAAANSUhEUgAAADgAAABBCAYAAACEq2cXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAABZVSURBVGhDjZu/i1vXtsdV3GKKFFO8YooUGUiRgRR3IEUG0kRwiwy4yECKCFKEwUUYXBiRwgg3RrgwwkUQLi7ChUEuDHIRkAuD3BjkIiAXgUlxYVKkmPL9Ced9P9+11tGZeeO8Vyz2OUfnSPu7v9/1Y+991Fu+WDSrl8uGdvl03qyez9XOmpXOF/+eyebN/PG0WT7RdR0vdW2l+xa/TJuFr+sejrn3ma7zmWyO6bta02fz54tm7nbezGSTx5NmqucmT6bNTNcn+h6u23Q+VT98r9rZs5nunTbTbGcvdO25rj3lmTj2OZ/r/umzaTPR/b2FvsAA9eMLdRZgc/0gIN3pX2bN8pnAC9zK90zblgHhc57j87lajEEBJB1bMFB6zscAdIcDhAHwe2V5jXvdSf0+wHjG5+44QHRuMALcAtOxwNYAuJX16IjBwR5AZKsXANZ1jSKguAYIGAO0P9OP1T3chy18TffDnEdfph9hEM1CsQqLAsU1t9xf7ctkHdB5ffFSvy+by8zuizS+/1fdr2dg1IANDPakDrW91atls/pVJhYBtnoerTvdAQmwdcmWQUlQW2AxUEh9oQ7QuWV2zOzRQQaBjqtFglixt1AfeGbxazBaMg15pqx5BvZgVfchSQOUGXSySos8x7+Mm9767coAN+/W0UEYpE0QHBeLARBwwbjlWEwCRj9iSfo4rXOMD7bX83OulZTtn2JjocEOpgDLuZ4DUMrToFOawV6ZrvtY7Usx+RwG36ya9SvZ65XlxzFA1wKN4ZMFuoCaJSSN7ybToYQEl8wVmAI218AUIMu1w2jcC6OwKDYNark1FADglGrJkraOAdYCFkBA9pbqZAG0TAXQkgWgQANqnUHI0gUYncE/MwLXvY7EXZBmU8/IpmLbwUODWMczIqgip69lpLTskChgkznYW2gADRiG/Rvb1vdapslsMsq1HuAAZjC0b9YClyABQKctXQLL3GANlM/0QzxDEAGEmVWnlnQmfc6yy5CPXwx+OmuO/tVvTn88bQbfD5r+reNmeH/UDHRO2uCeGc/ii8WaWa2gE762fK3feBXSnavtSrWOaXsGow5vAJqMBKMCWj4JqATQZW2lH0GaHk0GArAV8QAl1sYPJ83ZnaGB9L85bnb/a0+2u7U9He/FtcN/HjTDn4d6bmI2So7FIMzyWwA0sGIRoGkeGDFHBOU7ehHWFwaImVFJgWsGmP5o6SZQQK3lu46SDixi0PIhEkbQGD+aNIPbZ83eJ/stgC2wHQEqA2AB3mn2Pt5t9j/ba8YC6TxZvphtgVoCSABh0teuAAzwZnAjpjavxFb6Ir5VuRBm1zAMOAMPUCFTGMu0QL5KKU6UK0++G6ijxVQHSJe5/3XMfVtm+7f6zejRKKqcTOywhvzNZPqkgxIStZ/KXkcbAMUgAAHhakUPki4cSUkXlRthtPVP5Ir/lTzjBwE2+OG0Ofji6BpjO81Ol60rxx2pttcTqFjFV8/uDhWIJsppkm2WbgaZAQg5Wq60HYDBKEGGjgtgBY9N5zgSf6QJSzkjImyaPYEkCZ/9PFKgGEuOB1f964NgusD+7lhgJdmDLw6a058GUXeSWioAORh1GCz22upGAB0ZM9C41lQiD3+UbKtsy7YNNMiD0EwgUYg/EXO7H++LKTrb9a+b5HnN/0qWrR/WdyTwvH78bd9MRp5cbKuZ8j+iKgAzukawWYhBqhiliDWJWgwBrg06AFfpVuw6JVSlgl8oSvZvncjfxNzuNlDcDPI68Ovy/MC5o2wYfjlVjVkJP3wvcyD5U+fLNwU0PotiW7ahonFlkondJVvkPEdXpCt/XTIASFP+MHo4bfY/P/yALD/E5N8B7SqgE10TIL48fjzK6Com34gxA1K/W2BxXlG1tyHkwxwsAiIDDr64LbwDtAEScGQTsXf4z34y1w0kNwG7dm1X52WW9P/DJy3V+J6zu2fOc3MFkaVAko8r8XMtgk2kj945+QwWpe1iCv9rKxaXZlm9ZKCh6h/dn2TSjh9ldK/bjVL9ILgb8mLJkwFoj3ea4+8k1aeSagIE3FI4zFz64Yw0IaCZB7dRtKoYWqcQt8msADJTp1De/zSkeROw7rW/98eb0sS1INMNQga50xx+eWCAMIU0u363fBvyNKMEmfO3SvQke+SZAWX9MmYXBqfaFHPppnMmslMVyC65xMZNrNW1/xvcNXl2GUOOVyJrRVVd/6inmnXsPIdEAbN6J0l25AmjXFcUDTCVGizNnBMW0I0GYUURrvvwv5Fy3ocA7nRA289SujeCvQ7IoFSucf3jjt92Iimf7ys3Tp+MxJCK7jdyobfyw9/EpFoDzsDjNFElmpl6tQk2q3zzrCJYXBskCX7pisVp4RqDgNiT0QF3shMYugD5zEbd+cleHEuKWP+rg+bg0z0FsH1/1gagFiS/IQYNUODEHMBoV+/U39/UR03iMco5T5dgsQX2RiDfbc1zPcDrmhnUQ5NHN0t0X6N79Oluc/L1YXPyr6PmSLMDA+1UNNSoB2n7lGNfHArQvu9jYAYKIEeqXI55/kv8/HphHufTJ5LoayQa8gQc/rcCXDJI0Omdvz+PJQuxdv5205y/OxcYGb6ZvgdAg9Q1JDpVtbPz0VUG9wTu5KvDZvDNUTP88aQZq7Q6/f5EHe03h5+Llc/EiBg6ECt9nR/p/OgzAfmKgTg0WwA8FigGpg/Ir49U/sFi11czVdwZmEFAGRhAE6xlmtd7LVtIUPI7F1MtoA6Tm990XedMic7ujpodSdTBJGV68Mluc6bRH/04aCZ3NHm9pyL557NmJDv74USM9g3GJhADnQOU4+Mvj5pDsXioadLg1lHTB+Tn+xocsauBuJonA+Dk0bAFaGnCIAABplQRvkiaMFuSpBiCQfuiwJ7/ruuAgsn3up7HAOzfGpjBbgQ9lN+cfXdscFOBmz0c2aYPBPT+sBlrVjC6fdoMfxCzmvgOxe7Zt8cCeqRWTMOkwJwI1KkGiu8DPGBvZvDE0yGzZ4mmD1qmAmnflEQNroAlODPItAkTMIILAImklGpXGEQ+YrGvzg3FlNm7r0rjQQCcaU5nezhuZro21fIEA2BL0KOfTjUAYlqgYdA+LHkeidFjyZ5gFCwGew4yj4dmiqBicAaqY7OoFl/EBxdPF2JObAGO6FkShTmB2sCkGIRRggwgqUG7Et0TwIEYGN8eNGMYFGNT2APg47GWFzWXE8D5IwUG5dC51l7mD3Ru0DK1U7UTLVcAdKjvgV0kTLA6lFy7s35Azp9PAmDKc22gaQBEss6DKsscXJJJ/KwFJOYIQpxzHVsK5Ex5cmd3z/7Hj+3LkFwxMZbfTWAKxsyiQMgAONdSBgAXmI79mQBO7o2a0R35rAASnGATOdt/NYu4Ek13e5rlJ0AxB7jWpLqWRfXfAMPvIriYNQE5p8UXDRB/jBa5TlWqGWCWan0Wi9QZAJ6qQ6ffH6tT8i/ZqZgwcIGeCgSMGSjsaRAciHhOfkggGuj+0+/wzwCI7PlOB5tMOeTK5SvtoyQ4JFoAS570k+PwwWTN4NJYVHLKELA1DKdUIxeutDBUs3cVvwoEdDI62leaUMcUUM7MQAAfix0kaN80a+GjRFs+434zqHOOh1pGHGpZcSS58jz50n4o9s6Ugkqe6/di771iBa2ZJG6IRWQKgwA0SwJWkdMM/g7YZM9At5EUkGaRXCh5EgELIP7jY0nNHZbBHr4FWyFT+SJbZwI7vhcMAuhMdgooLTOOdDzWqhw+zecDMRoA5Q4CuFJBjRQDXJkAyvcwABIkey2ojjSdGvC5ShcMQBYAsImUWR4sPzwxQDq6lVufxacddegfKgAUKOgoNheohZYeMPwT8Pgcpd/eRwpWkujB3n5zKnmPxeREA8Nzp1IC9/QVcPDPlQprMyZwm9+3ZrAVeNT2zv84N4MXf1zY7zCniYyiIc2QajAdkmUF7uBTliooz/YNLqQ2kO9p5Vq5DkbwRSd9MeXUIECwB4ukD1g8Q9JETzEzZCD4LsDp+3gGkASbff0WuRbAawHcCOCmAP4RLHIOc7REUjNoEPhhBptKFQ40ALZ8L0KymQ9Z/B0oRxHCSdBIsYAgRfxtgo8RTZU2SBf2O50vlDacKpArC7xmkkEIH51mzpw5X+q77kaePBCDI5WBXFsrRZwbHKlM/fuD6L+VqwOQAWa0tA+mTF2HVpnGNedBMWxLkMox49uKcAoqR6oXnf/0w65exMxce3N0fs5KmApjjhdcE1ADLF/UXsSC/T4t8HIvA8EuMhJGzjNVQrAOyKGiKzUu37NR5Az2AmBZBRlLVcHGAMPEpPzMkZPI2omoBo+UASeLnLgWmKElcyofQ4J0ZqZFIQAtmHFrHXMhAEsBWLKpkpETABVJAdXuFLMByn6jt8/Z/9d9MJrSZhD5Db4bdq6DuwKUzwWyBXgBO4AsS6bO8U35XhdgVTcsLxLhKLIDoMBZdmN1cqJFq+isO+xqJpitIONzydHb4mzHsUuVu8p+Bkb5Thl+GJWQwEmeBBZHeqTZbcsPM130CC4lxwoiBpS+aXaTvWh1PyxmMMJforZUB+iw5LnQ2uVSq14ANEjYy9oUoEsxi0UxPmr3+70lwIo5g6JnqHooDKhfKe1gFDWwK10A7Xsytx1f9AQBBi8A0smB5++DMSJnm0KyFi2A5/8JkLDNZo2TtwKJ2ZNEC4ABsgIOE4BP/yuQtDZ9HvuQW4mGpLcFOsFpqTp2pdUyfGujqOn+GFwqLFuA+h71WxKN8L/1xQw2gE6QFwIEWFqnDABnelkr2RIgzFDaAol2GKTAZto0VqAYEYwIHBoQyjAGhXdvbJZnSjqL8vpOBsnrt8xsYOo/6nMZfWmPM5o6NwqgV8u0iubUoArFoMiLydDFn5dbiaZsDThBO+mz0kZeY2aAzxA41FHYw69W3h3WPWLBs4ucYTi66njFvQXOAUlRNQvz8FuB00BuU0IC+rMDDIDlj+WTMMhSweB7bXtpo9JbZDVNEuAL2AIUYDRKBiafpa3jmgxTvs2yOjGABNkyQhpIn7JfZU2KPP1mVb17w+4RacIzDdKGJKzPKiWUHC8AVwBpS6YCWoGHVNHbVzXS/1orxfoyf5HzXki2ZvYFygn/GsAKRmieFxDoEIEn/C3SBFGS18HMsJYc21lFzgdJ+hFpyYXxihjX+C4GLYLKNVl2ABqsVZXgMvAAtMcW8wETS+0S4UvnotXyxOdIEVgy1mWuIiugzXKmlSmdcrCJpF3HVCuUXhMKaJVwzOZtyNYDwhwxgDk9JIMUARsNXutjXdYS5MVf6mNe3wDSQMN6Oypw97WMd6of3jBSWcGUBGNkJEn54uVf+GPJE1l0pJsAeXXLpVbO4A3UE1oFGRXMY62pTvVbo29UlWjmEAU1aziADPamsAzbAklJGGmg42/FXgG8cq5ACLgE2htpBD1F0S4tUmjzXxbgACvmLv7c+l6B8/05WjDJNMWdS5AF1H6nenOmSe9cALCpftNyhcWc6Vvi9lGZjpH+NmImUwLU+uA1sDAJwHP1FZC9Wmdpg4s7HMy0/gZIwBFRs1xrGeZergEyy7iZXh3B1yKP1ZpLJHVmHAYGa9yTBXfUomKv1mco0iVx15T2v+xTBxAgkWe1IVMSP31RC8DKadFmhCzWaCVLrJy4ZbMiaRbh5Yu09h9XIIALiZYvRjGQQcSFuI474GoBiu8oBulosWgwNoDBaLoQQBOsFeVUIYCVxCtohJ/lFzBqfBHX8gtLpi2DAKTcYyolBr0oBUCYYM0FCSZIT5GYSRQooqsjrVpedhV47jeLHKttZwwpO1jqAiygBkew+WsbZNZEUTp3aQnC0rZaaYFn+C0m7ZPJcCtjPxsghz9Rl2YnxeKY48p7GS2RIr42N7AAyaAwd/T8UeCQM6vivC7msgs3uEmejqCVIiI3diOpim38ihJM6aHSQQKATQODvcutXKO66cr50h1gzXSg6EhUdEcFaKzo6clwO6GN6FhJnHtgbcIgIOXMfwap4z2t+7AAVj5lEloWQ2l2nwTZBYjv9kpyJU3nv2JJDxlknsdxOrsHo5gnNF+o8F5ovSSWLlypOJ/R8ZAqs3KW8L3AS9qgVcCZyFeRo6XJM2KU87EGiSUR1nQINvYt/DGZxMdaiRaLxWAm+143iQPgEqZKgllgt4y1wSciahlsrpVWptpWG93RGotm3q5NO9WIO58RspiayjdtBBTSBL5JHpWfTjTtGmkAvIqmdR4WmCxTB5xtutjm6WKyMwBE0ZYhgYsR2QKs5F73FINdVssPWSudP9Gb82JkX4vCxeBc8z5bRUoYBbyXJ7DwxxmzB78rqncA5JdjKYCFqJ1/9GKZMMu1qlBaWVYUrahalQxMyrYAM9c54KQvmtEOq1eAurrJCPrmXDlMHdOexfTepDn5Uu+YaR3TdSWTVwpoXthjEktAwbLOnOutfQKNgw4AfR/VUDKoZUcm1Dy3ZhKb+TYqm22q6Pqi7yMfApB6E1BtGcZ5Arue80q6FOSuUxWc1q+1Z/hvvX3xUJ18QEEt/7k7bk60Lgqb/otCLkUA1uBIDRTXvFynBWTA+y3HeolW7+DA8pnKOvYOHYV17sVc9kkA4FlOziKq0GaiW59n4R2JngpEEdCSJEIym8jp0RWwWbVQjHvtVHPJmYDNH2FiRwxigDxVND37Vi/QMaEFQIJwC2DeOXMbr0f7Hr//pkEQ80TVfS8T6jvuAZCAxQqcZvSa0rmwoO81N63ZvIMQQS+WMlKiUW45goqVy478aiYPm5eKml7ZZpKsl4OQ5VQvBM0fMx0KoxO0k5/H2lsgalJy6R6zFawFSEmXF2lZqsj33+p/FgBkf+JYmzrUr/zG7AHGMgYFgYKSWKbMbGczXm2QslzdhP95PmgZdmYIPqbQrmJbgD3x1csJy2faNdV+4uqpWgUUmONHF4/VYQAywmr5NwwdGf2oHPgDKUPlGUuI/pNIml435rwAxsvsyaAkfKDXnGdeqdOz+l6+b3YfhaQroBb8F0ZRU8q28iU+uAWYIGHrEh9MkN4YlY9tflUO+lXtS1UUL7SxAUCBwpBkC1CjvBCr/p+TjIAzvs1maPjQgvfLWFHjZXY2T3iDN9/i5RVlGITdoZYiT/QSAgtZyNPgYK8LMNmkriXVMFCWrlfTYnrlYvvy8r+jVKsqBpkmg7C2fqb8Y2AytWuxuH4ukAosyzIA8R8n/sckBlewrPtgeKKdIjZYSAvFYgswX2Bnl6jeweYe8igr2S7MvfiE9NMF8HmdM4ChnnALVFI+3UbbyoMVRa8ARdO8GwMgFqXEot8d7dhCP+I/dPFmFG8FC7Cv1b9jxCYlG1XLjAVfMRiylPESD3Ume+kwygt1Auz9Qe0eeeXbk14irpZC8G2kn4DIn+RdCnmuE3xIL0yQg72cLl0H5SK7/M9SDWN5kbrVPsoMwotSkgIpgwCV0biW/Lm/Xf7PfQJvjqgiYUXaVrP0dnqjTrF5KbCxS8TLD1KO3/Rgxytehojdo1zo9fZ6SNOWazcEGUdRR8cqrkuqVUjnsn13jcZ5sy3Kt8m+mzNjwpylU4Zx562c+VeSbheQ2+WImBUU8KpaPEMnr1XncwnD15mqkf9IXVgtOGUe/B/4+p6kJl8b+AAAAABJRU5ErkJggg==",
			"databaseImageType": "1"
		},
		success: function(resJson) {
			alert(JSON.stringify(resJson));
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("X-Auth-Token", "895cab5fe05e42769ec00dff2cd80527");
		}
	})
}

//保存人脸识别数据
var appntOcrSave = function(AppntverificationData) {
	//加载图片
	sino.globalLoading.show();
	//请求思图后台的参数
	var paramMap = {
			"imagePackage": AppntverificationData, //大礼包
			"citizenId": refPhoneCard, //身份证号
			"appVersionPlat": appVersion, //手机版本 ios 安卓
			"customerName": applicationName, //人脸识别姓名
			"idType": "1", //人脸识别证件类型
		}
		//发出请求思图后台(url,参数,backback)
	Clients.postClientAjax(url.zx_signFaceVerify, paramMap, getSignFaceVerifyData);
}

//人脸识别请求思图接口回调函数
function getSignFaceVerifyData(result) {

	//result.data.verifyStatus=="0"即调思图接口成功
	if (result.data.verifyStatus == "0") {
		//回显人脸识别的图片
		$("#appntCamera").attr("src",
			"data:image/png;base64," + result.data.resultImage);
		// 将人脸识别的图片存在全局变量
		facePhoto = result.data.resultImage;
		// 人脸识别的标识改变为true
		isFaceVerify = true;
		mui.alert("人脸识别成功");
		//加载图片隐藏
		sino.globalLoading.hide();
	} else {
		// 思图回调失败,人脸图片换回照相机图片
		$("#appntCamera").attr("src",
			"app/resources/imgs/camera-red.jpg");
		mui.alert(result.message);
		//加载图片隐藏
		sino.globalLoading.hide();
		//人脸识别的标识改变为false
		isFaceVerify = false;
	}
}

//代理合同回调函数
//function getSignContractInitData(result){
//	// 请求自己后台获取的数据，result.data为pdf文件的url地址
//
//	if(result.success){
//		// alert(JSON.stringify(result.data));
//		var pdfUrl=result.data;
//		//window.open("前端服务器地址/pdf/web/viewer.html?file=后台服务器地址的pdf")
//		 // window.open("http://192.168.43.209:8000/openPdf/web/viewer.html?file=result.data");
//		 // window.open("https://test2.citicpruagents.com.cn/autoemploy/pdf/435335465346464546_1.jpg",'_blank');
//
//		 
//		 // window.open("https://test2.citicpruagents.com.cn/autoemploy/openPdf/web/viewer.html?file="+pdfUrl,'_blank');
//		 sessionStorage.setItem("contractUrl",pdfUrl);
//		 location.hash="#zx_agencyContract"
//	}else{
//		mui.alert("文件不存在");
//	}
//}

//安卓电子签名请求后台回调
function getsignDigitalSignaturData(result) {
	if (result.success) {
		mui.alert("签名成功");
		isSign = true;
		$("#globalMask").css("display","none");
		var ua = navigator.userAgent.toLowerCase();
	   
		if (/iphone|ipad|ipod/.test(ua)) {
			var data = {
				CHEQUENO: refPhoneCard,
				deviceType:"ios"
			};
			Clients.postClientAjax(url.	zx_signaturePDF, data, function(){});
		} else if (/android/.test(ua)) {
			var data = {
				CHEQUENO: refPhoneCard,
			    deviceType:"android"
			};
			Clients.postClientAjax(url.	zx_signaturePDF, data, function(){});
		}
		$("#globalMask").css("display","none");
	
	} else {
		mui.alert("签名失败");
		isSign = false;
	}
}

//点击确认图片回显回调
function getReturnPhotoData(result) {
	if (result.success) {
		var allPicTypes = result.data.allPicTypes;
		for (var i = 0; i < allPicTypes.length; i++) {
			if (result.data.allPicTypes[i] == "999900") {
				$("#appntCamera").attr('src', result.data.allPicPaths[i]);
				isFaceVerify = true;
			} else if (result.data.allPicTypes[i] == "999800") {
				$('#Signname').attr('src', result.data.allPicPaths[i]);
				isSign = true;
			}

		}
	}
}

//审批中图片回显回调
function getReturnPhotoDataY(result) {
	if (result.success) {
		var allPicTypes = result.data.allPicTypes;
		for (var i = 0; i < allPicTypes.length; i++) {
			if (result.data.allPicTypes[i] == "999900") {
				$("#appntCamera").attr('src', result.data.allPicPaths[i]);
				isFaceVerify = true;
			} else if (result.data.allPicTypes[i] == "999800") {
				$('#Signname').attr('src', result.data.allPicPaths[i]);
				isSign = true;
			}

		}
	}
}

//提交申请的回调
function getApprInfoData(result) {
	if (result.success) {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
		sessionStorage.setItem("stutas", "AI"); //返回审批中
		var flag = sessionStorage.getItem("flag");
		flag = true;
		sessionStorage.setItem("flag", flag);
		location.hash = "#zx_approval";
	} else {
		$("#indexMask").hide();
		$("#indexNetPop").hide();
		mui.alert(result.message);
	}
}

//返回后请求删除图片
function getReturnDeletePhotoData(result) {
	//改变人脸识别、短信、签名的状态为false
	isFaceVerify = false;
	isBankPhone = false;
	isSign = false;
	ischeck = false;
	$("#appntCamera").attr("src",
		"app/resources/imgs/camera-red.jpg");
	$("#Signname").attr("src", "app/resources/imgs/sign.jpg");
}