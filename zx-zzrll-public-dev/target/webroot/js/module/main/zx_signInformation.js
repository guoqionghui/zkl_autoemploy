function eventBind(){$("#information1").click(function(){sessionStorage.setItem("aefF",refF),sessionStorage.setItem("flag",!1),location.hash="#zx_read-infoContentF"}),$("#information2").click(function(){sessionStorage.setItem("aefS",refS),sessionStorage.setItem("flag",!1),location.hash="#zx_read-infoContentS"}),$("#information3").click(function(){sessionStorage.setItem("aefT",refT),sessionStorage.setItem("flag",!1),location.hash="#zx_read-infoContentT"}),$(".check-confirm").on("tap",function(){$(".check-confirm span").toggleClass("read"),$(".check-confirm .readOne").hasClass("read")?sessionStorage.setItem("confirmed","1"):sessionStorage.setItem("confirmed","0")}),$("#agencyContract").click(function(){sessionStorage.setItem("agencyContract","1"),sessionStorage.setItem("flag",!1),Clients.postClientAjax(url.zx_signContractInit,pdfData,getSignContractInitData)}),$alertBankPhone=$("#zx_signInformation .alertBankPhone"),$alertBankPhoneText=$("#zx_signInformation .alertBankPhone span"),$("#zx_signInformation .valCode").bind("input",function(){$alertBankPhone.hide()}),$("#zx_signInformation .countBtn").click(function(){if(refConfirm=sessionStorage.getItem("confirmed"),"1"==refContract&&"1"==refConfirm){var e=/^1\d{10}$/;e.test(Bankphone)?(validationCode.sendMessage($("#zx_signInformation .countBtn")),$alertBankPhone.hide(),Clients.postClientAjax(url.zx_signInformationCode,{telphonenum:Bankphone,messageType:code},getPhoneCodeData)):""==Bankphone||null==Bankphone||void 0==Bankphone?($alertBankPhone.show(),$alertBankPhoneText.text("手机号码不存在，无法获取验证码")):($alertBankPhone.show(),$alertBankPhoneText.text("手机号码无效，无法获取验证码"))}else mui.alert("请阅读代理合同并确认")}),$("#appntCamera").click(function(){refConfirm=sessionStorage.getItem("confirmed"),console.log(refContract),"1"==refContract&&"1"==refConfirm?"1"==refTypeCode?appntOcr():appntCamera():mui.alert("请阅读代理合同并确认")}),$("#Signname").click(function(){refConfirm=sessionStorage.getItem("confirmed"),"1"==refContract&&"1"==refConfirm?appntPen():mui.alert("请阅读代理合同并确认")}),$("#confirm").click(function(){isFaceVerify&&isBankPhone&&isSign?($("#indexMask").show(),$("#indexNetPop").show()):mui.alert("请先进行对人脸识别/拍照、验证、电子签名")}),$("#rightButton").click(function(){$("#appntCamera").unbind("click"),$(".countBtn").css("display","none"),$("#Signname").unbind("click"),$("#indexMask").hide(),$("#indexNetPop").hide(),ischeck=!0}),$(".leftButton").click(function(){$("#indexMask").hide(),$("#indexNetPop").hide()}),$(".btnonclick").click(function(){ischeck&&"1"==refF&&"1"==refS&&"1"==refT?Clients.postClientAjax(url.zx_signInsertApprInfo,{chequeno:refPhoneCard},getApprInfoData):mui.alert("请阅读完资料以及完成电子签名和人脸识别以上操作")})}function goBack(){history.go(-1);var e=1;sessionStorage.setItem("Imgref",e)}function phoneCodeBlur(e){$("#zx_signInformation .valCode").blur("input",function(){$alertBankPhone.hide(),isBankPhone=!0})}function getPhoneCodeData(e){var a=e.data;console.log(a),phoneCodeBlur(a),msinLess()}function msinLess(){timer=setInterval(function(){msincre--,0==msincre&&(clearInterval(timer),timer=null)},1e3)}function getsignMultifileUploadPhotoData(e){"成功"==e.message?(isFaceVerify=!0,alert(e.message)):alert(e.message)}function getSignFaceVerifyData(e){"0"==e.data.verifyStatus?($("#appntCamera").attr("src","data:image/png;base64,"+e.data.resultImage),facePhoto=e.data.resultImage,isFaceVerify=!0,mui.alert("人脸识别成功"),sino.globalLoading.hide()):($("#appntCamera").attr("src","resources/imgs/camera-red.jpg"),mui.alert(e.message),sino.globalLoading.hide())}function getSignContractInitData(e){if(e.success){var a=e.data;sessionStorage.setItem("contractUrl",a),location.hash="#zx_agencyContract"}else mui.alert("文件不存在")}function getsignDigitalSignaturData(e){e.success?(alert("签名成功"),isSign=!0):(alert("签名失败"),isSign=!1)}function getReturnPhotoData(e){if(e.success)for(var a=e.data.allPicTypes,t=0;t<a.length;t++)"999900"==e.data.allPicTypes[t]?($("#appntCamera").attr("src",e.data.allPicPaths[t]),isFaceVerify=!0):"999800"==e.data.allPicTypes[t]&&($("#Signname").attr("src",e.data.allPicPaths[t]),isSign=!0),isFaceVerify&&isSign&&isBankPhone&&(ischeck=!0,$("#appntCamera").unbind("click"),$("#Signname").unbind("click"))}function getApprInfoData(e){e.success?(sessionStorage.setItem("stutas","AI"),location.hash="#zx_approval"):alert(e.success)}var validationCode={timer:"null",count:59,curCount:null,sendMessage:function(e){var a=this;a.curCount=a.count,e.attr("disabled","true").css("background","#c1c1c1"),e.text(a.curCount+"s"),a.timer=setInterval(function(){a.SetRemainTime(e)},1e3)},SetRemainTime:function(e){var a=this;1==a.curCount?(clearInterval(a.timer),e.removeAttr("disabled").css("background","#fff"),e.text("重新发送")):(a.curCount--,e.text(a.curCount+"s"))}},refF,refS,refT,refContract,refConfirm,dataUrl,$alertBankPhone,$alertBankPhoneText,msincre=60,conflag,isFaceVerify=!1,isBankPhone=!1,isSign=!1,ischeck=!1,code="Code",signPhoto,facePhoto,refF=sessionStorage.getItem("infoReadStateF"),refS=sessionStorage.getItem("infoReadStateS"),refT=sessionStorage.getItem("infoReadStateT"),refContract=sessionStorage.getItem("agencyContract"),refConfirm=sessionStorage.getItem("confirmed"),payAmount=sessionStorage.getItem("payAmount"),pdfData=JSON.parse(sessionStorage.getItem("contract")),refTypeCode=sessionStorage.getItem("Type_code"),Bankphone=sessionStorage.getItem("Phonevode"),applicationName=sessionStorage.getItem("applicationName"),refPhoneCard=sessionStorage.getItem("Phone_card"),AppntverificationData="";$(document).ready(function(){if(mui.init({swipeBack:!0}),eventBind(),"1"==refF&&($("#information1 span").html("已阅读"),$("#information1 span").css({color:"gray"})),"1"==refS&&($("#information2 span").html("已阅读"),$("#information2 span").css({color:"gray"})),"1"==refT&&($("#information3 span").html("已阅读"),$("#information3 span").css({color:"gray"})),"1"==refContract&&($("#agencyContract span").html("已阅读"),$("#agencyContract span").css({color:"gray"})),"1"==refConfirm?$(".readOne").addClass("read"):$(".readOne").removeClass("read"),"true"==sessionStorage.getItem("flag")){var e=["999900","999800"],a={PicTypes:e,CHEQUENO:refPhoneCard};Clients.postClientAjax(url.zx_signFaceSignPhoto,a,getReturnPhotoData)}});var appntOcrFlag=!0,appntOcr=function(){if("IOS"!=appVersion){if(!appntOcrFlag)return;appntOcrFlag=!1}var e={},a=function(e){appntOcrFlag=!0,"1"==e.data.isSuccess?(AppntverificationData=e.data.verificationData,appntOcrSave(AppntverificationData)):sino.alert("人脸识别失败")};cordova.sino.LivenessDetection(a,e)},appntCameraFlag=!0,appntCamera=function(){if("IOS"!=appVersion){if(!appntCameraFlag)return;appntCameraFlag=!1}var e={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1"},a=function(e){if(appntCameraFlag=!0,!e.data.exit){var a=e.data;$("#appntCamera").attr("src","data:image/png;base64,"+a.signImg),facePhoto=a.signImg;var t=["data:image/png;base64,"+a.signImg],n=["999900"],i=refPhoneCard,o={fileName:t,PicTypes:n,CHEQUENO:i};Clients.postClientAjax(url.zx_signMultifileUploadPhoto,o,getsignMultifileUploadPhotoData)}};cordova.sino.takePhoto(a,e)},signAppntFlag=!0,appntPen=function(){if("IOS"==appVersion||signAppntFlag){signAppntFlag=!1;var e={title:"请签名",titleSpanFromOffset:"4",titleSpanToOffset:"5",singleWidth:"150",singleHeight:"75",businessType:"1",Identitycardnbr:refPhoneCard,username:applicationName,nessesary:"false",template_serial:refPhoneCard,serverConfigRule:"1135"},a=function(e){if(signAppntFlag=!0,!e.data.exit){var a=e.data;AppntSignatureData=a.signatureData,$("#Signname").attr("src","data:image/png;base64,"+a.signImg),signPhoto=a.signImg;var a={CHEQUENO:refPhoneCard,base64Str:"data:image/png;base64,"+a.signImg,ESIGNBACKDSTR:AppntSignatureData};Clients.postClientAjax(url.zx_signDigitalSignature,a,getsignDigitalSignaturData)}e.data.cancel&&$("#Signname").attr("src","resources/imgs/sign.jpg")};signAppntFlag||cordova.sino.digitalSignature(a,e)}},ajaxceshi=function(e){alert("进入方法1"),$.ajax({url:"http://openapi.situdata.com/face/pair-package-photo",type:"post",data:{queryImagePackage:e,databaseImageContent:"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",databaseImageType:"1"},success:function(e){alert(JSON.stringify(e))},beforeSend:function(e){e.setRequestHeader("Content-Type","application/json"),e.setRequestHeader("X-Auth-Token","895cab5fe05e42769ec00dff2cd80527")}})},appntOcrSave=function(e){sino.globalLoading.show();var a={imagePackage:e,citizenId:refPhoneCard,appVersionPlat:appVersion,customerName:applicationName,idType:"1"};Clients.postClientAjax(url.zx_signFaceVerify,a,getSignFaceVerifyData)};
//# sourceMappingURL=zx_signInformation.js.map