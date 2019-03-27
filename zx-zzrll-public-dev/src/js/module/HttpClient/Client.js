//
// var BASEURl = "http://192.168.8.101:8081/"; //xiulan

  
// var BASEURl = "http://192.168.8.117:8081/";//yongguo
//var BASEURl = "http://192.168.8.108:8081/";//yipeng
// var BASEURl = "http://192.168.43.193:8081/";//yipeng


//var BASEURl = "http://192.168.8.101:8081/"; //xiulan 
// var BASEURl = "http://192.168.8.117:8081/";//yongguo
//var BASEURl = "http://192.168.8.108:8081/";//yipeng
//var  BASEURl  = "http://192.168.8.108:8081/";//haibo

 //var  BASEURl  = "http://192.168.8.108:8081/";//haibo
////var  BASEURl  = "http://192.168.8.118:8081/";//lizuo

// var BASEURl="https://test2.citicpruagents.com.cn/autoemploy/";//81测试环境地址
var BASEURl="https://test2.citicpruagents.com.cn/autoemployDev/";//77测试环境地址

//var  BASEURl  = "http://192.168.8.127:8081/";//lizuo

// var  BASEURl  = "http://192.168.43.208:8081/";//xinbin

// var  BASEURl  = "http://192.168.43.208:8081/";//xinbin

// var  BASEURl  = "http://192.168.43.193:8081/";//yipeng
//var  BASEURl  = "http://192.168.8.118:8081/";//lizuo
// var  BASEURl  = "http://192.168.8.126:8081/";//qinda

//var  BASEURl  = "http://192.168.8.131:8081/";//haomiao


var url = {
	//管理页面开始sa
	//外勤待办提醒结束
	"zx_manageOpneContract":BASEURl + "printpdf/printSealPDF",
	"zx_manageContract":BASEURl + "printpdf/downpdf",
		//缴费凭证开始
		"zx_managePayMoneyPdf":BASEURl + "printPayMoneyPdf/printPayMoneyPdf",
		//缴费凭证结束
		
		//离职列表小红点开始
		"zx_manageApprovalPoint":BASEURl + "leaveApproval/getApprovalStatus",
		//离职列表小红点结束
	//管理页面结束
	//信息录入开始
	//初始化获取数据开始
	"zx_inforRegister_init": BASEURl + "inform/getALLValue",
	//初始化获取数据结束
	//判断数据库是否存在此人，信息回显开始
	"zx_inforRegister_state": BASEURl + "inform/getAgentByChequeno",
	//判断数据库是否存在此人，信息回显结束
	//保存数据开始
	"zx_inforRegister_update": BASEURl + "inform/saveAgent",
	//保存数据结束

	//返回申请人的保存和修改开始
	"zx_inforRegister_saveReturn":BASEURl + "inform/saveTemp",
		//返回申请人的保存和修改结束
	//更新数据结束
	"zx_Phonecode": BASEURl + "message/getMessageCode",
	"zx_Phoneimg": BASEURl + "login/getImagecode",
	"zx_Imgcode": BASEURl + "login/VerifyImagecode",//登录页面验证 --验证码是否正确
	"zx_Jobappimg": BASEURl + "multifile/multifileUpload",
	"zx_Gologin": BASEURl + "login/verfiyUniqueInfo",
	 //引荐人工号开始
	 "zx_inforRegister_teamRelation":BASEURl+"inform/getTeamRelationByAgentNum", 
	 //引荐人工号结束
	 //引荐人身份证开始
	 "zx_inforRegister_teamRelation2":BASEURl+"inform/getTeamRelationByChequeno", 
	 //引荐人身份证结束
	 //生成代理合同开始
	 "zx_printpdf":BASEURl+"printpdf/printFirstPdf", 
	  //生成代理合同结束
	  //返回申请人和审批不通过开始
	   "zx_printpdf2":BASEURl+"printpdf/printThirdPdf", 
	    //返回申请人和审批不通过结束
	  //扫描身份证验证合法性开始
	  "zx_verfiyOCR":BASEURl+"inform/verfiyUniqueAfterOCR", 
	
	   //扫描身份证验证合法性开始
	//信息录入结束
	"zx_verifyChequeno": BASEURl + "login/verifyChequenoAndTelNum", //登录页面点击确认接口
	
	//点击审批状态进入页面开始
	"zx_approval": BASEURl + "position/getAgentStatInfo",
	"zx_approvalPay": BASEURl + "payment/payInfo",
	//点击审批状态进入页面结束
	//审批列表开始
	//审批列表开始
	"zx_approvalListP": BASEURl + "referrer/queryActracks",
	//审批列表结束
	//审批列表点击确定时开始
	"zx_approvalListA": BASEURl + "referrer/queryActracks",
	//审批列表点击确定时结束
	//审批列表点击引荐人开始
	"zx_approvalList": BASEURl + "referrer/getAgentInfo",
	//审批列表点击引荐人时结束
	//审批列表结束
	

	//审批开始
	"zx_commonAudit": BASEURl + "referrer/getAgentInfo",
	"zx_commonAuditPass": BASEURl + "referrer/passAppr",
	"zx_commonAuditUnPass": BASEURl + "referrer/unPassAppr",
	"zx_commonAuditReturn": BASEURl + "referrer/returnApplcation",
	"zx_commonAuditUpload": BASEURl + "multifile/getAllURL",
	"zx_getAllURLYN": BASEURl + "multifile/getAllURLYN",
	//审批结束
	//支付宝支付页面开始
	"zx_approvePayInit": BASEURl + "payment/paymentAlipay",
	//支付宝支付页面结束
	//银行支付页面开始
		"zx_bankalipayCode":BASEURl+"internal/getAllPayBank",
		//点击支付按钮处理事件
		"zx_bankalipayInit":BASEURl+"payment/paymentBank",
	//银行支付页面结束
	//资料签署验证码开始
		//请求删除图片开始
		"zx_signInformationDeletePhoto": BASEURl + "multifile/deletePicFES",
		//请求删除图片结束	
		//验证码开始
		"zx_signInformationCode": BASEURl + "login/getMessageCode",
		//验证码结束
		//代理合同地址开始
			"zx_signContractInit":BASEURl+"printpdf/printSecondPdf",		
		//代理合同地址结束
		//人脸识别开始
			//思图系统
			"zx_signFaceVerify":BASEURl+"face/faceVerify",
			"zx_signMultifileUploadPhoto":BASEURl+"multifile/multifileUpload",
		//人脸识别结束
		//电子签名开始
			"zx_signDigitalSignature": BASEURl + "bjca/save",
		//电子签名结束
		//电子签名的pdf请求开始
		 "zx_signaturePDF":BASEURl + "printpdf/createSigNamePdf ", 
		//电子签名的pdf请求结束
		//点击确认图片回显开始
			"zx_signFaceSignPhoto": BASEURl + "multifile/returnPEurl",
		//点击确认图片回显结束
		//审批中的图片回显开始
		"zx_signFaceSignPhotoY": BASEURl + "multifile/returnPEurlY",
		//审批中的图片回显结束
		//点击提交申请开始
			"zx_signInsertApprInfo": BASEURl + "referrer/insertApprInfo",
		//点击提交申请结束
	//资料签署验证码结束
	//银行卡支付短信验证码接口
	//"zx_bankCode": BASEURl + "internal/getPayBankCode",
	//登录页面是否是第一次登录标识接口
	"zx_queryCode":BASEURl+"inform/getAgentByChequeno",
	//支付页面审批接口
	"zx_appPaymoney":BASEURl+"internal/getAllPayType",
	//分公司开始
	"zx_inforRegister_company":BASEURl+"inform/getALLCompany",  
	 //分公司结束
	 //获取中支开始
	"zx_inforRegister_medium":BASEURl+"inform/getMediumByCompany", 
	     
	//获取中支结束
	//营销部门开始
	"zx_inforRegister_agent":BASEURl+"inform/getAgentByMedium", 
	     //营销部门结束
	     
	//离职申请登录接口
	"zx_queryCode":BASEURl+"message/getMessageCode",
	//离职信息录入接口
	"zx_quitapple":BASEURl+"disEmploy/applyDismisson",
	//lizhi
	"zx_disEmploy":BASEURl+"disEmploy/getApplyInfo",
	"zx_agentInfo":BASEURl+"leaveApproval/agentInfo",
	//lizhifujian
	"zx_fileUploadLeave":BASEURl+"leaveUpload/multifileUploadLeave",
	"zx_fliesaveLeave":BASEURl+"bjca/saveLeave",
	"zx_verifyUniqueCheqTel":BASEURl+"disEmploy/verifyUniqueCheqTel",
//	"zx_selectApplyInfo":BASEURl+"disEmploy/selectApplyInfo",
	//离职信息附件回显接口
	"zx_getAllURLYNLeave":BASEURl+"multifile/getAllURLYNLeave",
	//"verifyUniqueCheqTel":BASEURl+"/disEmploy/verifyUniqueCheqTel",     
	     
//	===============================离职开始=======================================    

// 离职审批详情开始
   // 离职审批详情初始化开始
   "zx_leaveBossAudit_init":BASEURl+"leaveApproval/agentInfo", 
   // 离职审批详情初始化结束
   // 离职审批详情提交开始
  "zx_leaveBossAudit_commit1":BASEURl+"leaveApproval/repApprove", //L1审批岗的请求
  "zx_leaveBossAudit_commit2":BASEURl+"leaveApproval/grpApprove",//L2审批岗的请求
   // 离职审批详情提交结束
   // 离职审批详情结束流程开始
   "zx_leaveBossAudit_end":BASEURl+"leaveApproval/unApprove",
   // 离职审批详情结束流程结束
   // 上传附件图片回显开始
   "zx_leaveBossAudit_upload":BASEURl+"multifile/getLeavePicAndTrack",
   // 上传附件图片回显结束
   // 审批轨迹回显开始
   "zx_leaveBossAudit_route":BASEURl+"leaveApproval/queryResignByAPPLICANT",
   //审批轨迹回显结束
   //审批列表开始
   "zx_lzapproval_list":BASEURl+"leaveApproval/findActracks",
   //审批列表结束
   //审批状态开始
   "zx_lzapprovalInit":BASEURl+"leaveApproval/getLeaveStatus",
   //审批状态结束
// 离职审批详情结束

	     
//	===============================离职结束=======================================  
}
var Clients = {
		/*
		 *每次点击上传图片时需初始化picSize、picSuccess、serSize、picFail
		 * 其中picSuccess、serSize、picFail需初始为固定的值0
		 * picSize为上传图片的数量
		 * */
		picSize: 1, //图片上传的个数
		picSuccess: 0, //存储文件上传成功的次数
		serSize: 0, //存储服务端错误
		picFail: 0, //上传失败的次数
		lineFail: 0, //联网失败的次数
		picInfo: [], //存储多张图片返回的信息
		/*get请求方法
		 *参数1：请求服务端地址
		 * 参数2：请求服务端时发送的数据
		 * return：{'code':'202','message':'发生错误'};code=200 请求成功，201 请求失败 202 请求报错
		 * */
		getClient: function(url, data) {
			var returnDate;
			$.ajax({
				type: "GET",
				url: url,
				data: data,
				async: false,
				dataType: "json",
				success: function(data) {

					returnDate = data;
				},
				error: function(jqXHR) {
					console.log("发生错误：" + jqXHR.status);
				},
			});
			return returnDate;
		},

		/*post请求方法
		 *参数1：请求服务端地址
		 * 参数2：请求服务端时发送的数据
		 * return：{'code':'202','message':'发生错误'};code=200 请求成功，201 请求失败 202 请求报错
		 * */
		postClient: function(url, data) {
			var returnDate;
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				async: false,
				dataType: "json",
				success: function(data) {

					returnDate = data;
				},
				error: function(jqXHR) {
					console.log("发生错误：" + jqXHR.status);
				},
			});
			return returnDate;
		},

		/*post请求方法---异步
		 *参数1：请求服务端地址
		 * 参数2：请求服务端时发送的数据
		 * return：{'code':'202','message':'发生错误'};code=200 请求成功，201 请求失败 202 请求报错
		 * */
		//	postClientAjax:function(url,data,callback){
		//		if(sino.isApp()) {
		//			updataApp(url,data,callback,null,null,Clients.MypostClientAjax);
		//		}else{
		//			Clients.MypostClientAjax(url,data,callback);
		//		}				
		//	},
		postClientAjax: function(url, data, callback) {
                              $("#globalMask").show();        
			
			$.ajax({
				xhrFields: {
					withCredentials: true
				},
				type: "POST",
				url: url,
				data: data,
				dataType: "json",
			//	processData:false,
				//contentType:"application/json",
				success: function(data) {
					$("#globalMask").hide();
					callback(data);
				},
				error: function(jqXHR) {
					$("#globalMask").hide();
					mui.alert("服务端发生错误 ，请再次提交请求，或者刷新界面！", " ", "我知道了");
				},
			});
		},
	

		/*post请求方法---异步
		 *参数1：请求服务端地址
		 * 参数2：请求服务端时发送的数据
		 * callback1:成功时的回调函数
		 * callback2:失败的回调函数
		 * callback3:联网失败的回调函数
		 * return：{'code':'202','message':'发生错误'};code=200 请求成功，201 请求失败 202 请求报错
		 * */
		//	postClientOnlyAjax:function(url,data,callback1,callback2,callback3){
		//		if(sino.isApp()) {
		//			updataApp(url,data,callback1,callback2,callback3,Clients.MypostClientOnlyAjax);	
		//		}else{
		//			Clients.MypostClientOnlyAjax(url,data,callback1,callback2,callback3);
		//		}				
		//	},
		postClientOnlyAjax: function(url, data, callback1, callback2) {
			$("#globalMask").show();
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "json",
				success: function(data) {
					console.log(data);
					$("#globalMask").hide();
					callback1(data);
				},
				error: function(jqXHR) {
					$("#globalMask").hide();
					callback2();
				},
			});
		}
	}

function ajaxFileUpload(url, fileID, data, Mysuccess, Myerror) {
	$("#globalMask").show();
	var formId = 'jUploadForm' + fileID; //file为input的id  
	var test1 = jQuery('#' + formId);
	if (test1.length > 0) {
		test1.remove();
	}
	$.ajaxFileUpload({
		url: url, //用于文件上传的服务器端请求地址
		// url: url, //用于文件上传的服务器端请求地址
		type: 'post',
		//data: { Id: '123', name: 'lunis' }, //此参数非常严谨，写错一个引号都不行
		//data: { contno: '86110020160210008443', type: '1', manager:'861100' },
		data: data,
		//contentType : 'application/json;charset=UTF-8', // contentType很重要
		secureuri: false, //一般设置为false
		fileElementId: fileID, //文件上传空间的id属性  <input type="file" id="file" name="file" />
		dataType: 'text', //返回值类型 一般设置为json
		success: function(data, status) { //请求服务端成功的数据
			$("#globalMask").hide();
			data = eval('(' + data + ')');
			Mysuccess(data);
		},
		error: function(data, status, e) //服务器响应失败处理函数
			{
				$("#globalMask").hide();
				Myerror();
			}
	})
}
