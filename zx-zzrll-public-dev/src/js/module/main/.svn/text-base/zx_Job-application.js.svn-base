//判断是否有选择图片的标记
var HandImg = null; //身份证件正面
var HandImgone = null; //身份证件反面
var RestImg = null; //其他的证件类型
var Xl_education = null; //学历证件
var Bank_addcard = null; //银行卡正面
var Bank_addcard1 = null; //银行卡反面
var Willwrite = null; //归属意愿书
var Restsimgone = null; //其他证件1
var Restsimgtow = null; //其他证件2
var Restsimgthree = null; //其他证件3
var Restsimgfour = null; //其他证件4
var Restsimgfive = null; //其他证件5
//var Xl_education1=null;//学历证件
//var imgID=["HandImg","HandImgone","RestImg","Xl_education","Bank_addcard","Bank_addcard1","Willwrite","Restsimgone","Restsimgtow","Restsimgthree"];//上传图片的位置的ID
var imgID = [];
var isimgID = false;
var PicTypess;
var piNos = [];
var Img1 = false;
var Img2 = false;
var Img3 = false;
var Img4 = false;
var Img5 = false;
var Img6 = false;
var Img7 = false;
var CarType = sessionStorage.getItem("Type_code"); //获取证件类型
var Phone_card = sessionStorage.getItem("Phone_card"); //获取证件号码
var Typeinfo = sessionStorage.getItem("idType"); //证件类型
var satats = sessionStorage.getItem("stutas");
var IDKinds = [{
		PROCFLG01: "1",
		text: "身份证"
	},{
		PROCFLG01: "3",
		text: "军官证"
	}, {
		PROCFLG01: "4",
		text: "港澳回乡证"
	}, {
		PROCFLG01: "5",
		text: "其他"
	},
	//	 	{PROCFLG01 :"6",text:"出生证"},
	//	 	{PROCFLG01 :"7",text:"户口本"},
	//	 	{PROCFLG01 :"8",text:"士兵证"},
	{
		PROCFLG01: "9",
		text: "台胞证"
	}, {
		PROCFLG01: "A",
		text: "外国人永久居留身份证"
	},

];
$(function() {
		init();
		clickEvent(); //点击事件初始化方法
	})
	/*初始化方法*/
function init() {
	//设置页面证件类型显示
	//获取登录时证件类型
	//获取登录时证件类型
	// $("#cardname").text(sessionStorage.getItem("idType"));
	if (CarType) {
		for (var i = 0; i < IDKinds.length; i++) {
			if (IDKinds[i].PROCFLG01 == CarType) {
				$("#cardname").text(IDKinds[i].text);
				// $("#idType1").attr("procflg01",sessionStorage.getItem("Type_code"));
				break;
			}
		}
	}
	/*如果获取的证件类型*/
	if (CarType == "1") {
		$("#Nametype").show();
		$("#ReseImg").hide();
	} else {
		$("#Nametype").hide();
		$("#ReseImg").show();
		$("#Card-addone").hide;
	}
	var wef = sessionStorage.getItem("Imgref");
	var py = sessionStorage.getItem("payref");
	if (satats != "AN") {
		if (satats == "AB" || satats == "AI" || wef == "1" || py == "PY" || Phone_card != "" && Phone_card != null && Phone_card != undefined) {
			Clients.postClientAjax(url.zx_getAllURLYN, {idNum:Phone_card}, getFileData);
			console.log(Phone_card);
		}
	} else {
		Img1 = false;
		Img2 = false;
		Img3 = false;
		Img4 = false;
		Img5 = false;
		Img6 = false;
		if (wef == "1") {
			Clients.postClientAjax(url.zx_getAllURLYN, {idNum:Phone_card}, getFileData);
		}
	}
}
/*页面点击事件方法*/
function clickEvent() {
	/*点击图片事件处理函数*/
	$("#zx_job_application .clickImg").click(function() {
		if ($(this).children("img").attr("data-i") == "1") {
			$("#imgShow img").removeClass("imgone");
			$("#imgShow img").removeClass("imgtow");
			$("#imgShow").show();
			var imgPath = $(this).children("img").attr("src");
		    $("#imgShow img").attr("src", imgPath);
		    if ($("#imgShow img").width() > $("#imgShow img").height()) {
		    	$("#imgShow img").addClass("imgone");
		    } else {
		    	$("#imgShow img").addClass("imgtow");
			}
		    $("#zx_job_application .contentScroll").css("overflow-y","hidden");
		}
	})
	$("#imgShow").click(function() {
		$(this).hide();
		$("#zx_job_application .contentScroll").css("overflow-y","scroll");
	})
	var py = sessionStorage.getItem("payref");
	var satats = sessionStorage.getItem("stutas");
	if (satats == "AI" || py == "PY") {
		$("#ReseImg").unbind();
		$("#EducationImg").unbind();
		$("#BankImg").unbind();
		$("#Willwrite").unbind();
		$("#Restsimgone").unbind();
		$("#Restsimgtow").unbind();
		$("#Restsimgthree").unbind();
		$("#Restsimgfour").unbind();
		$("#Restsimgfive").unbind();
		$("#HandImgone").unbind();
		$("#HandImg").unbind();
	} else {
		//绑定其他身份证点击添加图片事件
		$("#ReseImg").click(function() {
			//进行拍照
			$("#ishospital").slideDown();
			$("#blackInterface").show();
			//appntCamera();
		});
		//绑定点击身份证正面添加图片事件
		$("#HandImg").click(function() {
			$("#ishospital2").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击身份证反面添加图片事件
		$("#HandImgone").click(function() {
			$("#ishospital3").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击学历证书添加图片事件
		$("#EducationImg").click(function() {
			$("#ishospital1").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击银行卡添加图片事件
		$("#BankImg").click(function() {
			$("#ishospital4").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击归属意愿书添加图片事件
		$("#Willwrite").click(function() {
			$("#ishospital5").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击其他1添加图片事件
		$("#Restsimgone").click(function() {
			$("#ishospital6").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击其他2添加图片事件
		$("#Restsimgtow").click(function() {
			$("#ishospital7").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击其他3添加图片事件
		$("#Restsimgthree").click(function() {
			$("#ishospital8").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击其他4添加图片事件
		$("#Restsimgfour").click(function() {
			$("#ishospital9").slideDown();
			$("#blackInterface").show();
		});
		//绑定点击其他5添加图片事件
		$("#Restsimgfive").click(function() {
			$("#ishospital10").slideDown();
			$("#blackInterface").show();
		});
	}
	//弹框拍照事件
	$("#choosePhone").click(function() {
		//其他证件拍照获取
		appntCamera();
	});
	//弹框选择从相册
	$("#choosePreview").click(function() {
		//其他证件相册获取
		appntCameraview();
	});
	//弹框拍照事件
	$("#choosePhone1").click(function() {
		//学历进行拍照
		appntCamera3();
	});
	//弹框选择从相册
	$("#choosePreview1").click(function() {
		//学历进行从相册获取
		appntCameraXimg();
	});
	//弹框拍照事件
	$("#choosePhone2").click(function() {
		//身份证正面拍照获取
		appntCamera1();
	});
	//弹框选择从相册
	$("#choosePreview2").click(function() {
		//身份证正面相册获取
		appntCameraF2();
	});
	//弹框拍照事件
	$("#choosePhone3").click(function() {
		//身份证反面拍照获取
		appntCamera2();
	});
	//弹框选择从相册
	$("#choosePreview3").click(function() {
		//身份证反面相册获取
		appntCameraFimg();
	});
	//弹框拍照事件
	$("#choosePhone4").click(function() {
		//进行拍照银行卡
		appntCamera4();
	});
	//弹框选择从相册
	$("#choosePreview4").click(function() {
		//进行拍照银行卡相册获取
		appntCameraBank();
	});
	//弹框拍照事件
	$("#choosePhone5").click(function() {
		//进行拍照归属意愿书
		appntCamera5();
	});
	//弹框选择从相册
	$("#choosePreview5").click(function() {
		//进行拍照归属意愿书相册获取
		appntCameraGui();
	});
	//弹框拍照事件
	$("#choosePhone6").click(function() {
		//进行拍照其他证件
		appntCamera6();
	});
	//弹框选择从相册
	$("#choosePreview6").click(function() {
		//进行其他证件相册获取
		appntCameraQt();
	});
	//弹框拍照事件
	$("#choosePhone7").click(function() {
		//进行拍照其他证件2
		appntCamera7();
	});
	//弹框选择从相册
	$("#choosePreview7").click(function() {
		//进行其他证件2相册获取
		appntCameraQ2();
	});
	//弹框拍照事件
	$("#choosePhone8").click(function() {
		//进行拍照
		appntCamera8();
	});
	//弹框选择从相册
	$("#choosePreview8").click(function() {
		//进行其他证件3相册获取
		appntCamera9();
	});
	//弹框拍照事件
	$("#choosePhone9").click(function() {
		//进行拍照
		appntCamera11();
	});
	//弹框选择从相册
	$("#choosePreview9").click(function() {
		//进行其他证件3相册获取
		appntCamera10();
	});
	//弹框拍照事件
	$("#choosePhone10").click(function() {
		//进行拍照
		appntCamera13();
	});
	//弹框选择从相册
	$("#choosePreview10").click(function() {
		//进行其他证件3相册获取
		appntCamera12();
	});
	//拍照弹框取消按钮事件
	$("#hidecance").click(function() {
		$("#ishospital").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecancel").click(function() {
		$("#ishospital1").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance2").click(function() {
		$("#ishospital2").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance3").click(function() {
		$("#ishospital3").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance4").click(function() {
		$("#ishospital4").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance5").click(function() {
		$("#ishospital5").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance6").click(function() {
		$("#ishospital6").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance7").click(function() {
		$("#ishospital7").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance8").click(function() {
		$("#ishospital8").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance9").click(function() {
		$("#ishospital9").slideUp();
		$("#blackInterface").hide(20);
	});
	//拍照弹框取消按钮事件
	$("#hidecance10").click(function() {
		$("#ishospital10").slideUp();
		$("#blackInterface").hide(20);
	});
	//var ref = sessionStorage.getItem("Imgref");

	//拍照，身份正面图片采集
	var appntCamera1 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital2").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#Card-addone").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
				HandImg = ["data:image/png;base64," + data.signMinImg];
				imgID.push(HandImg);
				piNos.push("1");
				var photoTypes = ["010100"];
				var imgdatas = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: HandImg
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdatas, successUploder);
				Img1 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，身份正面图片采集--从相册获取
	var appntCameraF2 = function() {
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital2").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#Card-addone").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
				HandImg = ["data:image/png;base64," + data.signMinImg];
				imgID.push(HandImg);
				piNos.push("1");
				var photoTypes = ["010100"];
				var imgdatas = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: HandImg
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdatas, successUploder);
				Img1 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，身份反面图片采集
	var appntCamera2 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital3").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#Card-addtow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份证件照片容器div
				HandImgone = ["data:image/png;base64," + data.signMinImg];
				imgID.push(HandImgone);
				piNos.push("2");
				var photoTypes = ["010101"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: HandImgone
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img2 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，身份反面图片采集
	var appntCameraFimg = function() { //相册
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'true',
			businessType: '1',
			prtNum: "1",
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital3").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#Card-addtow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份证件照片容器div
				HandImgone = ["data:image/png;base64," + data.signMinImg];
				imgID.push(HandImgone);
				piNos.push("2");
				var photoTypes = ["010101"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: HandImgone
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img2 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，学历图片采集
	var appntCamera3 = function() { // 拍照
		var data = {
		width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital1").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#Education").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Xl_education = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Educationshow").show();
				imgID.push(Xl_education);
				piNos.push("4");
				var photoTypes = ["020100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Xl_education
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img4 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，学历图片采集----从相册获取
	var appntCameraXimg = function() {
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital1").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#Education").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Xl_education = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Educationshow").show();
				imgID.push(Xl_education);
				piNos.push("4");
				var photoTypes = ["020100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Xl_education
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img4 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他证件图片采集 拍照
	var appntCamera = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			//openFromGallery : 'false',//是否从相册选择照片
			openFromGallery: 'false', //是否从相册选择照片
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		}
		var callback = function(result) {
			$("#ishospital").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#Card-addtow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
				RestImg = ["data:image/png;base64," + data.signMinImg];
				var imgdata9 = {
					CHEQUENO: Phone_card,
					PicTypes: [CarType],
					fileName: RestImg
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata9, successUploder);
				Img3 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他证件图片采集 从相册选择
	var appntCameraview = function() {
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'true', // 是否从相册选择照片
			businessType: '1',
			prtNum: "1",
			scale: "5",
			scalefalg: "true",
			imgType: 'OtherPhoto'
		}
		var callback = function(result) {
			$("#ishospital").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit === "false") {
				var data = result.data;
				$("#Card-addtow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
				RestImg = ["data:image/png;base64," + data.signMinImg];
				var imgdata9 = {
					CHEQUENO: Phone_card,
					PicTypes: [CarType],
					fileName: RestImg
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata9, successUploder);
				Img3 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，银行卡图片采集
	var appntCamera4 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital4").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#Bank-addimg").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Bank_addcard = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Bankshow").show();
				imgID.push(Bank_addcard);
				piNos.push("5");
				var photoTypes = ["030100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Bank_addcard
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img5 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，银行卡图片采集
	var appntCameraBank = function() { // 相册
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: " 5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital4").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#Bank-addimg").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Bank_addcard = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Bankshow").show();
				imgID.push(Bank_addcard);
				piNos.push("5");
				var photoTypes = ["030100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Bank_addcard
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img5 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，归属意愿书图片采集
	var appntCamera5 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital5").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#addWillwrite").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Willwrite = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Willwriteshow").show();
				imgID.push(Willwrite);
				piNos.push("6");
				var photoTypes = ["040100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Willwrite
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img6 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，归属意愿书图片采集
	var appntCameraGui = function() { //相册
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital5").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addWillwrite").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Willwrite = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Willwriteshow").show();
				imgID.push(Willwrite);
				piNos.push("6");
				var photoTypes = ["040100"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Willwrite
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
				Img6 = true;
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他1图片采集
	var appntCamera6 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital6").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#addRestsone").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgone = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsoneshow").show();
				imgID.push(Restsimgone);
				piNos.push("7");
				var photoTypes = ["050100"];
				piNos = ["8"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgone
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他1图片采集
	var appntCameraQt = function() { // 相册
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital6").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addRestsone").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgone = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsoneshow").show();
				imgID.push(Restsimgone);
				piNos.push("7");
				var photoTypes = ["050100"];
				piNos = ["8"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgone
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他2图片采集
	var appntCamera7 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital7").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#addReststow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgtow = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Reststowshow").show();
				imgID.push(Restsimgtow);
				piNos.push("8");
				var photoTypes = ["060100"];
				piNos = ["8"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgtow
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他2图片采集
	var appntCameraQ2 = function() { // 相册
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital7").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addReststow").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgtow = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Reststowshow").show();
				imgID.push(Restsimgtow);
				piNos.push("8");
				var photoTypes = ["060100"];
				piNos = ["8"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgtow
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他3图片采集
	var appntCamera8 = function() { // 拍照
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital8").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit="false") {
				var data = result.data;
				$("#addReststhree").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgthree = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Reststhreeshow").show();
				var photoTypes = ["070100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgthree
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他3图片采集
	var appntCamera9 = function() { // 相册选择
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital8").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addReststhree").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgthree = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Reststhreeshow").show();
				var photoTypes = ["070100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgthree
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他4图片采集
	var appntCamera10 = function() { // 相册选择
		var data = {
			width: "320",
			height: "240",
			mono: 'false',//彩色
			quality: '85',//分辨率
			prtNum: " 1",//
			openFromGallery: 'true',//是否从相册中选取
			businessType: '1',
			scale: "5",//缩放比例
			scalefalg: "true",//是否缩放
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital9").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addRestsfour").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgfour = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsfourshow").show();
				var photoTypes = ["080100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgfour
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他4图片采集
	var appntCamera11 = function() { // 拍照
		var data = {
		width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital9").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#addRestsfour").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgfour = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsfourshow").show();
				var photoTypes = ["080100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgfour
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他5图片采集
	var appntCamera12 = function() { // 相册选择
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			prtNum: "1",
			openFromGallery: 'true',
			businessType: '1',
			scale: "5",
			scalefalg: "true",
			imgType: "OtherPhoto"
		};
		var callback = function(result) {
			$("#ishospital10").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit == "false") {
				var data = result.data;
				$("#addRestsfive").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgfive = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsfiveshow").show();
				var photoTypes = ["090100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgfive
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	//拍照，其他5图片采集
	var appntCamera13 = function() { // paizhao
		var data = {
			width: "320",
			height: "240",
			mono: 'false',
			quality: '85',
			openFromGallery: 'false',
			businessType: '1',
			scale: "10",
			scalefalg: "true",
			imgType: "01"
		};
		var callback = function(result) {
			$("#ishospital10").slideUp();
			$("#blackInterface").hide(20);
			if (result.data.exit=="false") {
				var data = result.data;
				$("#addRestsfive").attr("src", "data:image/png;base64," + data.signMinImg).attr("data-i", "1");
				Restsimgfive = ["data:image/png;base64," + data.signMinImg];
				$("#zx_job_application .Restsfiveshow").show();
				var photoTypes = ["090100"];
				piNos = ["9"];
				var imgdata = {
					CHEQUENO: Phone_card,
					PicTypes: photoTypes,
					//"PicNos":piNos,
					fileName: Restsimgfive
				}
				Clients.postClientAjax(url.zx_Jobappimg, imgdata, successUploder);
			}
		}
		cordova.sino.takePhoto_upload(callback, data);
	};
	console.log(sessionStorage.getItem("siimgid"))
	var ref = sessionStorage.getItem("Imgref"); //标识是否返回当前页面调用图片回显
	var aef = sessionStorage.getItem("imgcode"); //标识是否返回当前页面调用图片回显
	var wef = sessionStorage.getItem("wef");
	var show = sessionStorage.getItem("show");
	//	if (sessionStorage.getItem("siimgid")=="true"||ref=="1") {
	//		$(".btnonclick").click(function() {
	//			sessionStorage.setItem("flag", false);
	//			location.hash = "#zx_signInformation";
	//		});
	//	} else {
	//点击下一步按钮事件处理
	$(".btnonclick").click(function() {
		if (CarType == "1") {
			if (Img1 && Img2 && Img4 && Img5 && Img6) {
				sessionStorage.setItem("flag", false);
				location.hash = "#zx_signInformation";
			} else {
				mui.alert("请将附件上传完整");
			}
		} else {
			if (Img3 && Img4 && Img5 && Img6) {
				sessionStorage.setItem("flag", false);
				location.hash = "#zx_signInformation";
			} else {
				mui.alert("请将附件上传完整");
			}
		}
	});
	//}
}
/*上传图片回调函数方法*/
function successUploder(data) {
	if (data.success == true) {
		//mui.alert(data.message);
		console.log(data);
	} else {
		mui.alert(data.message);
	}
}
/*回调图片回显方法*/
function getFileData(data) {
	if (data.success == true) {
			for (var i = 0; i < data.list.length; i++) {
				switch (data.list[i].pictype) {
					case "010100":
						$("#Card-addone").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份证件照片容器div
						Img1 = true;

						break;
					case "010101":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份证件照片容器div
						Img2 = true;
						break;
					case "010200":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010300":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010400":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010500":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010600":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010700":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010800":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "010900":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "011000":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Cardshow").show(); //身份其他证件照片容器div
						Img3 = true;
						break;
					case "020100":
						$("#Education").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Educationshow").show();
						Img4 = true;
						break;
					case "030100":
						$("#Bank-addimg").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Bankshow").show();
						Img5 = true;
						break;
					case "040100":
						$("#addWillwrite").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Willwriteshow").show();
						Img6 = true;
						break;
					case "050100":
						$("#addRestsone").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Restsoneshow").show();
						break;
					case "060100":
						$("#addReststow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Reststowshow").show();
						break;
					case "070100":
						$("#addReststhree").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Reststhreeshow").show();
						break;
					case "080100":
						$("#addRestsfour").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Restsfourshow").show();
						break;
					case "090100":
						$("#addRestsfive").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_application .Restsfiveshow").show();
						break;
				}
			}
		//		var py = sessionStorage.getItem("payref");
		//		if(isimgID!=true){
		//			if (sessionStorage.getItem("siimgid")=="true" || isimgID==true) {
		//				$(".btnonclick").click(function() {
		//					if ($("#addReststhree").attr("src") != "" || $("#addReststow").attr("src") != "" || $("#addRestsone").attr("src") != "" || $("#addRestsfour").attr("src") !="" || $("#addRestsfive").attr("src")!="") {
		//						var data = {
		//							"CHEQUENO": Phone_card,
		//							"PicTypes": ["090100", "080100", "070100", "060100", "050100"],
		//							//"PicNos":piNos,
		//							"fileName": [Restsimgfive, Restsimgfour, Restsimgthree, Restsimgtow, Restsimgone],
		//						}
		//						Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
		//					} else {
		//						location.hash = "#zx_signInformation";
		//					}
		//				});
		//			}
		//		}else{
		//			$(".btnonclick").click(function() {
		//				location.hash = "#zx_signInformation";
		//			});
		//			console.log("==========");
		//		}
	} else {
		if (data.data == "N") {
			console.log(data.message);
		} else if (data.data == "F") {
			mui.alert(data.message);
		} else if (data.data == "W") {
			mui.alert(data.message);
		} else {
			mui.alert(data.message);
		}
	}
}