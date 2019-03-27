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
var PicTypes = [];
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
var satats = sessionStorage.getItem("stutas");
var isimgID="false"; 
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
$(function() {
		init();
		clickEvent(); //点击事件初始化方法
	})
	/*初始化方法*/
function init() {
	//获取登录时证件类型
//	 $("#cardname").text(sessionStorage.getItem("idType"));
    if(CarType){
   	   for(var i=0;i<IDKinds.length;i++){
   	   	 if(IDKinds[i].PROCFLG01==CarType){
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
	}
	var ref = sessionStorage.getItem("Imgref");
	var py = sessionStorage.getItem("payref");
	var infotime = sessionStorage.getItem("infotime");
	if(satats!="AN"){
		if(satats=="AB" || satats=="AI" || ref=="1" || py=="PY" ||Phone_card!=""&&Phone_card!=null&&Phone_card!=undefined){
			Clients.postClientAjax(url.zx_getAllURLYN, {idNum:Phone_card}, getFileData);
		}
		console.log(infotime)
	}else{
		Img1 = false;
		Img2 = false;
		Img3 = false;
		Img4 = false;
		Img5 = false;
		Img6 = false;
		if (ref=="1") {
			Clients.postClientAjax(url.zx_getAllURLYN, {idNum:Phone_card}, getFileData);
		} 
		
	}
}
/*页面点击事件方法*/
function clickEvent() {
	
	/*点击图片事件处理函数*/
	$("#zx_job_applicationios .clickImg").click(function() {
		if ($(this).children("img").attr("data-i") == "1") {
			$("#imgShow").show();
			var imgPath = $(this).children("img").attr("src");
			$("#imgShow img").attr("src", imgPath);
          	$("#zx_job_applicationios .contentScroll").css("overflow-y","hidden");
		}
	})
	$("#imgShow").click(function() {
		$(this).hide();
		$("#zx_job_applicationios .contentScroll").css("overflow-y","scroll");
	})
	var stutas = sessionStorage.getItem("stutas");
	var py = sessionStorage.getItem("payref");
	if (stutas == "AI" || py=="PY") {
		$("#HandImg").attr("disabled","disabled");
		$("#HandImgone").attr("disabled","disabled");
		$("#RestImg").attr("disabled","disabled");
		$("#EducationImg").attr("disabled","disabled");
		$("#BankImg").attr("disabled","disabled");
		$("#Willwrite").attr("disabled","disabled");
		$("#Restsimgone").attr("disabled","disabled");
		$("#Restsimgtow").attr("disabled","disabled");
		$("#Restsimgthree").attr("disabled","disabled");
		$("#Restsimgfour").attr("disabled","disabled");
		$("#Restsimgfive").attr("disabled","disabled");
		sessionStorage.setItem("siimgid",true);
	}else{
		//绑定点击添加图片事件
		$("#HandImg").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('HandImg').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				
				imgBase64 = imgBase64; //存储转换的base64编码
				piNos.push("1");
				$("#Card-addone").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Cardshow").show(); //身份证件照片容器div
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["010100"],
						//"PicNos":piNos,
						"fileName": [imgBase64],
					}
					Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				Img1 = true;
			});
		});
		//绑定点击添加图片事件
		$("#HandImgone").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('HandImgone').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				HandImgone = imgBase64;
//				imgID.push(HandImgone);
//				PicTypes.push("010101");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["010101"],
						//"PicNos":piNos,
						"fileName": [HandImgone],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#Card-addtow").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Cardshow").show(); //身份证件照片容器div
				Img2 = true;
			});
		});
		//绑定点击添加图片事件
		$("#RestImg").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('RestImg').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}
			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				RestImg = imgBase64;
//				imgID.push(RestImg);
				$("#Card-addtow").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
				switch (CarType) {
					case "2":
						PicTypes.push("010200");
						break;
					case "3":
						PicTypes.push("010300");
						break;
					case "4":
						PicTypes.push("010400");
						break;
					case "5":
						PicTypes.push("010500");
						break;
					case "6":
						PicTypes.push("010600");
						break;
					case "7":
						PicTypes.push("010700");
						break;
					case "8":
						PicTypes.push("010800");
						break;
					case "9":
						PicTypes.push("010900");
						break;
					case "A":
						PicTypes.push("011000");
						break;
				}
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": PicTypes,
						//"PicNos":piNos,
						"fileName": [RestImg],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				Img3 = true;
			});
		});
		//绑定点击添加图片事件
		$("#EducationImg").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('EducationImg').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象
 
			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Xl_education = imgBase64; //获取学历证书照
//				imgID.push(Xl_education);
//				PicTypes.push("020100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["020100"],
						//"PicNos":piNos,
						"fileName": [Xl_education],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#Education").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Educationshow").show();
				Img4 = true;
			});
		});
		//绑定点击添加图片事件
		$("#BankImg").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('BankImg').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Bank_addcard = imgBase64; //获取学历证书照
//				imgID.push(Bank_addcard);
//				PicTypes.push("030100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["030100"],
						//"PicNos":piNos,
						"fileName": [Bank_addcard],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#Bank-addimg").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Bankshow").show();
				Img5 = true;
			});
		});
		//绑定点击添加图片事件
		$("#Willwrite").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Willwrite').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Willwrite = imgBase64; //获取学历证书照
//				imgID.push(Willwrite);
//				PicTypes.push("040100");
					var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["040100"],
						//"PicNos":piNos,
						"fileName": [Willwrite],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addWillwrite").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Willwriteshow").show();
				Img6 = true;
			});
		});
		//绑定点击添加图片事件
		$("#Restsimgone").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Restsimgone').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Restsimgone = imgBase64; //获取学历证书照
//				imgID.push(Restsimgone);
//				PicTypes.push("050100");
					var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["050100"],
						//"PicNos":piNos,
						"fileName": [Restsimgone],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addRestsone").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Restsoneshow").show();
			});
		});
		//绑定点击添加图片事件
		$("#Restsimgtow").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Restsimgtow').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Restsimgtow = imgBase64; //获取学历证书照
//				imgID.push(Restsimgtow);
//				PicTypes.push("060100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["060100"],
						//"PicNos":piNos,
						"fileName": [Restsimgtow],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addReststow").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Reststowshow").show();
			});
		});
		//绑定点击添加图片事件
		$("#Restsimgthree").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Restsimgthree').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}
			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Restsimgthree = imgBase64; //获取学历证书照
//				imgID.push(Restsimgthree);
//				PicTypes.push("070100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["070100"],
						//"PicNos":piNos,
						"fileName": [Restsimgthree],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addReststhree").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Reststhreeshow").show();
			});
		});
		//绑定点击添加图片事件
		$("#Restsimgfour").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Restsimgfour').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}
			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Restsimgfour = imgBase64; //获取学历证书照
//				imgID.push(Restsimgfour);
//				PicTypes.push("080100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["080100"],
						//"PicNos":piNos,
						"fileName": [Restsimgfour],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addRestsfour").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Restsfourshow").show();
			});
		});
		//绑定点击添加图片事件
		$("#Restsimgfive").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('Restsimgfive').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象

			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}
			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Restsimgfive = imgBase64; //获取学历证书照
//				imgID.push(Restsimgfive);
//				PicTypes.push("090100");
				var data = {
						"CHEQUENO": Phone_card,
						"PicTypes": ["090100"],
						//"PicNos":piNos,
						"fileName": [Restsimgfive],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#addRestsfive").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_job_applicationios .Restsfiveshow").show();
			});
		});
	}
	var ref = sessionStorage.getItem("Imgref"); //标识是否返回当前页面调用图片回显
	var aef = sessionStorage.getItem("imgcode"); //标识是否返回当前页面调用图片回显
	var wef = sessionStorage.getItem("wef");
	var show =sessionStorage.getItem("show");
	var py = sessionStorage.getItem("payref");
	console.log(sessionStorage.getItem("infotime"));
	//if(sessionStorage.getItem("infotime")=="1" || satats=="AN" ){
			$(".btnonclick").click(function() {
			if (CarType == "1") {
				if (Img1 && Img2 && Img4 && Img5 && Img6 ) {
					sessionStorage.setItem("flag",false);
					location.hash = "#zx_signInformation";
				} else {
					mui.alert("请将附件上传完整");
				}
			} else {
				if (Img3 && Img4 && Img5 && Img6) {
					sessionStorage.setItem("flag",false);
					location.hash = "#zx_signInformation";
				} else {
					mui.alert("请将附件上传完整");
				}
			}
		});
	//}
}
/*回调图片回显方法*/
function getFileData(data) {
	if(data.success==true){
			for (var i = 0; i < data.list.length; i++) {
				switch (data.list[i].pictype) {
					case "010100":
						$("#Card-addone").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份证件照片容器div
						Img1=true;
					
						break;
					case "010101":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份证件照片容器div
						Img2=true;
						break;
					case "010200":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010300":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010400":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010500":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010600":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010700":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010800":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "010900":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "011000":
						$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Cardshow").show(); //身份其他证件照片容器div
						Img3=true;
						break;
					case "020100":
						$("#Education").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Educationshow").show();
						Img4=true;
						break;
					case "030100":
						$("#Bank-addimg").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Bankshow").show();
						Img5=true;
						break;
					case "040100":
						$("#addWillwrite").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Willwriteshow").show();
						Img6=true;
						break;
					case "050100":
						$("#addRestsone").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Restsoneshow").show();
						break;
					case "060100":
						$("#addReststow").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Reststowshow").show();
						break;
					case "070100":
						$("#addReststhree").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Reststhreeshow").show();
						break;
					case "080100":
						$("#addRestsfour").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Restsfourshow").show();
						break;
					case "090100":
						$("#addRestsfive").attr("src", data.list[i].picpath).attr("data-i", "1");
						$("#zx_job_applicationios .Restsfiveshow").show();
						break;
				}
			}
//		if(sessionStorage.getItem("siimgid")="true"){
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
//		}else{
//			$(".btnonclick").click(function() {
//				location.hash = "#zx_signInformation";
//			});
//			console.log("==========");
//		}
	}else{
		if(data.data=="N"){
			console.log(data.message);
		}else if(data.data=="F"){
			mui.alert(data.message);
		}else if(data.data=="W"){
			mui.alert(data.message);
		}else{
			mui.alert(data.message);
		}
	}
}
/*上传图片回调函数方法*/
function successUploder(data) {
	if (data.success == true) {
		//mui.alert("OK")
	} else {
		mui.alert(data.message);
	}
}
// 对图片进行压缩
function compress(fileObj, callback) {
	if (typeof(FileReader) === 'undefined') {
		console.log("当前浏览器内核不支持base64图标压缩");
		//调用上传方式不压缩  
		directTurnIntoBase64(fileObj, callback);
	} else {
		try {
			//获取照片方向角属性，用户旋转控制
			EXIF.getData(fileObj, function() {
			   // alert(EXIF.pretty(this));
			    EXIF.getAllTags(fileObj); 
			    //alert(EXIF.getTag(this, 'Orientation')); 
			    Orientation = EXIF.getTag(fileObj, 'Orientation');
			   
			   // return;
			});
			var reader = new FileReader();
			reader.onload = function(e) {
				var image = $('<img/>');
				image.load(function() {
					square = 700, //定义画布的大小，也就是图片压缩之后的像素
						canvas = document.createElement('canvas'),
						context = canvas.getContext('2d'),
						imageWidth = 0, //压缩图片的大小
						imageHeight = 0,
						offsetX = 0,
						offsetY = 0,
						data = '';

					canvas.width = square;
					canvas.height = square;
					context.clearRect(0, 0, square, square);
		
					this.height = Math.round((700/this.width) * this.height);
				    this.width = 700;
					//修复ios
					if (navigator.userAgent.match(/iphone/i)) {
						//alert(expectWidth + ',' + expectHeight);
						//如果方向角不为1，都需要进行旋转 added by lzk
						if(Orientation != "" && Orientation != 1){
						
							switch(Orientation){
							 	case 6://需要顺时针（向左）90度旋转
							 		// rotateImg(this,'left',canvas);
									context.translate(canvas.width, 0);
									context.rotate( 90 * Math.PI / 180);
							 		break;
							 	case 8://需要逆时针（向右）90度旋转
							 		// rotateImg(this,'right',canvas);
									 context.translate(0, canvas.height)
									 context.rotate( 270 * Math.PI / 180);
							 		break;
							 	case 3://需要180度旋转
									// rotateImg(this,'center',canvas);//转两次
									context.translate(canvas.width, canvas.height)
									context.rotate( 180 * Math.PI / 180);
									break;
							}		
						}
					}
					context.drawImage(this, 0, 0, square, square);
					// context.drawImage(this, 0, 0, canvas.width, canvas.height);
					//压缩完成执行回调  
					data = canvas.toDataURL("image/jpeg");
				
					callback(data);
				});
				image.attr('src', e.target.result);
			};
			reader.readAsDataURL(fileObj);
		} catch (e) {
			console.log("压缩失败!");
			//调用直接上传方式  不压缩 
			directTurnIntoBase64(fileObj, callback);
		}
	}
}

