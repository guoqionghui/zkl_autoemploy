function init(){$(".Card-type").text(Typeinfo),"1"==CarType?($("#Nametype").show(),$("#ReseImg").hide()):($("#Nametype").hide(),$("#ReseImg").show())}function clickEvent(){$("#zx_job_application .clickImg").click(function(){if("1"==$(this).children("img").attr("data-i")){$("#imgShow").show();var a=$(this).children("img").attr("src");$("#imgShow img").attr("src",a)}}),$("#imgShow").click(function(){$(this).hide()}),$("#ARestImg").click(function(){$("#ishospital").slideDown(),$("#blackInterface").show()}),$("#HandImg").click(function(){$("#ishospital2").slideDown(),$("#blackInterface").show()}),$("#HandImgone").click(function(){$("#ishospital3").slideDown(),$("#blackInterface").show()}),$("#EducationImg").click(function(){$("#ishospital1").slideDown(),$("#blackInterface").show()}),$("#BankImg").click(function(){$("#ishospital4").slideDown(),$("#blackInterface").show()}),$("#Willwrite").click(function(){$("#ishospital5").slideDown(),$("#blackInterface").show()}),$("#Restsimgone").click(function(){$("#ishospital6").slideDown(),$("#blackInterface").show()}),$("#Restsimgtow").click(function(){$("#ishospital7").slideDown(),$("#blackInterface").show()}),$("#Restsimgthree").click(function(){$("#ishospital8").slideDown(),$("#blackInterface").show()}),$("#Restsimgfour").click(function(){$("#ishospital9").slideDown(),$("#blackInterface").show()}),$("#Restsimgfive").click(function(){$("#ishospital10").slideDown(),$("#blackInterface").show()}),$("#choosePhone").click(function(){n()}),$("#choosePreview").click(function(){c()}),$("#choosePhone1").click(function(){s()}),$("#choosePreview1").click(function(){o()}),$("#choosePhone2").click(function(){a()}),$("#choosePreview2").click(function(){i()}),$("#choosePhone3").click(function(){e()}),$("#choosePreview3").click(function(){t()}),$("#choosePhone4").click(function(){r()}),$("#choosePreview4").click(function(){l()}),$("#choosePhone5").click(function(){p()}),$("#choosePreview5").click(function(){d()}),$("#choosePhone6").click(function(){h()}),$("#choosePreview6").click(function(){g()}),$("#choosePhone7").click(function(){m()}),$("#choosePreview7").click(function(){u()}),$("#choosePhone8").click(function(){f()}),$("#choosePreview8").click(function(){b()}),$("#choosePhone9").click(function(){w()}),$("#choosePreview9").click(function(){I()}),$("#choosePhone10").click(function(){k()}),$("#choosePreview10").click(function(){_()}),$("#hidecance").click(function(){$("#ishospital").slideUp(),$("#blackInterface").hide(20)}),$("#hidecancel").click(function(){$("#ishospital1").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance2").click(function(){$("#ishospital2").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance3").click(function(){$("#ishospital3").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance4").click(function(){$("#ishospital4").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance5").click(function(){$("#ishospital5").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance6").click(function(){$("#ishospital6").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance7").click(function(){$("#ishospital7").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance8").click(function(){$("#ishospital8").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance9").click(function(){$("#ishospital9").slideUp(),$("#blackInterface").hide(20)}),$("#hidecance10").click(function(){$("#ishospital10").slideUp(),$("#blackInterface").hide(20)});var a=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital2").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addone").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),HandImg=["data:image/png;base64,"+i.signImg],imgID.push(HandImg),piNos.push("1");var e=["010100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:HandImg};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img1=!0}};cordova.sino.takePhoto(i,a)},i=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital2").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addone").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),HandImg=["data:image/png;base64,"+i.signImg],imgID.push(HandImg),piNos.push("1");var e=["010100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:HandImg};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img1=!0}};cordova.sino.takePhoto(i,a)},e=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital3").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addtow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),HandImgone=["data:image/png;base64,"+i.signImg],imgID.push(HandImgone),piNos.push("2");var e=["010101"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:HandImgone};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img2=!0}};cordova.sino.takePhoto(i,a)},t=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital3").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addtow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),HandImgone=["data:image/png;base64,"+i.signImg],imgID.push(HandImgone),piNos.push("2");var e=["010101"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:HandImgone};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img2=!0}};cordova.sino.takePhoto(i,a)},s=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital1").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Education").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Xl_education=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Educationshow").show(),imgID.push(Xl_education),piNos.push("4");var e=["020100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Xl_education};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img4=!0}};cordova.sino.takePhoto(i,a)},o=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital1").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Education").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Xl_education=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Educationshow").show(),imgID.push(Xl_education),piNos.push("4");var e=["020100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Xl_education};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img4=!0}};cordova.sino.takePhoto(i,a)},n=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"0",imgType:"OtherPhoto"},i=function(a){if($("#ishospital").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addtow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),RestImg=["data:image/png;base64,"+i.signImg];var e={CHEQUENO:Phone_card,PicTypes:[CarType],fileName:RestImg};Clients.postClientAjax(url.zx_Jobappimg,e,successUploder),Img3=!0}};cordova.sino.takePhoto(i,a)},c=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"0",imgType:"OtherPhoto"},i=function(a){if($("#ishospital").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Card-addtow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),$("#zx_job_application .Cardshow").show(),RestImg=["data:image/png;base64,"+i.signImg];var e={CHEQUENO:Phone_card,PicTypes:[CarType],fileName:RestImg};Clients.postClientAjax(url.zx_Jobappimg,e,successUploder),Img3=!0}};cordova.sino.takePhoto(i,a)},r=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital4").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Bank-addimg").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Bank_addcard=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Bankshow").show(),imgID.push(Bank_addcard),piNos.push("5");var e=["030100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Bank_addcard};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img5=!0}};cordova.sino.takePhoto(i,a)},l=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital4").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#Bank-addimg").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Bank_addcard=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Bankshow").show(),imgID.push(Bank_addcard),piNos.push("5");var e=["030100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Bank_addcard};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img5=!0}};cordova.sino.takePhoto(i,a)},p=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital5").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addWillwrite").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Willwrite=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Willwriteshow").show(),imgID.push(Willwrite),piNos.push("6");var e=["040100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Willwrite};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img6=!0}};cordova.sino.takePhoto(i,a)},d=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital5").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addWillwrite").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Willwrite=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Willwriteshow").show(),imgID.push(Willwrite),piNos.push("6");var e=["040100"],t={CHEQUENO:Phone_card,PicTypes:e,fileName:Willwrite};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder),Img6=!0}};cordova.sino.takePhoto(i,a)},h=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital6").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsone").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgone=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsoneshow").show(),imgID.push(Restsimgone),piNos.push("7");var e=["050100"];piNos=["8"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgone};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},g=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital6").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsone").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgone=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsoneshow").show(),imgID.push(Restsimgone),piNos.push("7");var e=["050100"];piNos=["8"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgone};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},m=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital7").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addReststow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgtow=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Reststowshow").show(),imgID.push(Restsimgtow),piNos.push("8");var e=["060100"];piNos=["8"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgtow};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},u=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital7").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addReststow").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgtow=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Reststowshow").show(),imgID.push(Restsimgtow),piNos.push("8");var e=["060100"];piNos=["8"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgtow};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},f=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital8").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addReststhree").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgthree=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Reststhreeshow").show();var e=["070100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgthree};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},b=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital8").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addReststhree").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgthree=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Reststhreeshow").show();var e=["070100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgthree};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},w=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital9").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsfour").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgfour=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsfourshow").show();var e=["080100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgfour};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},I=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"false",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital10").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsfive").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgfour=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsfourshow").show();var e=["090100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgfour};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},k=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital10").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsfive").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgfive=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsfiveshow").show();var e=["090100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgfive};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},_=function(){var a={width:"960",height:"720",mono:"false",quality:"50",openFromGallery:"true",businessType:"1",imgType:"OtherPhoto"},i=function(a){if($("#ishospital9").slideUp(),$("#blackInterface").hide(20),!a.data.exit){var i=a.data;$("#addRestsfour").attr("src","data:image/png;base64,"+i.signImg).attr("data-i","1"),Restsimgfive=["data:image/png;base64,"+i.signImg],$("#zx_job_application .Restsfourshow").show();var e=["090100"];piNos=["9"];var t={CHEQUENO:Phone_card,PicTypes:e,fileName:Restsimgfive};Clients.postClientAjax(url.zx_Jobappimg,t,successUploder)}};cordova.sino.takePhoto(i,a)},v=sessionStorage.getItem("Imgref");if(1==v){var y=sessionStorage.getItem("Phone_card");Clients.postClientAjax(url.zx_commonAuditUpload,{idNum:y},getFileData),$(".btnonclick").click(function(){sessionStorage.setItem("flag",!1),location.hash="#zx_signInformation"})}else $(".btnonclick").click(function(){"1"==CarType?Img1&&Img2&&Img4&&Img5&&Img6?(sessionStorage.setItem("flag",!1),location.hash="#zx_signInformation"):mui.alert("请上传完必要的附件"):Img3&&Img4&&Img5&&Img6?(sessionStorage.setItem("flag",!1),location.hash="#zx_signInformation"):mui.alert("请上传完必要的附件")})}function successUploder(a){1==a.success?console.log(a):mui.alert(a.message)}function getFileData(a){console.log(a);for(var i=0;i<a.list.length;i++)switch(a.list[i].pictype){case"010100":$("#Card-addone").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010101":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010200":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010300":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010400":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010500":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010600":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010700":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010800":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"010900":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"011000":$("#Card-addtow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Cardshow").show();break;case"020100":$("#Education").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Educationshow").show();break;case"030100":$("#Bank-addimg").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Bankshow").show();break;case"040100":$("#addWillwrite").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Willwriteshow").show();break;case"050100":$("#addRestsone").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Restsoneshow").show();break;case"060100":$("#addReststow").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Reststowshow").show();break;case"070100":$("#addReststhree").attr("src",a.list[i].picpath).attr("data-i","1"),$("#zx_job_application .Reststhreeshow").show()}}var HandImg=null,HandImgone=null,RestImg=null,Xl_education=null,Bank_addcard=null,Bank_addcard1=null,Willwrite=null,Restsimgone=null,Restsimgtow=null,Restsimgthree=null,Restsimgfour=null,Restsimgfive=null,imgID=[],PicTypess,piNos=[],uploadSuccess=[0,0,0,0,0,0,0,0,0,0],Img1=!1,Img2=!1,Img3=!1,Img4=!1,Img5=!1,Img6=!1,Img7=!1,idImageInfo=[],CarType=sessionStorage.getItem("Type_code"),Phone_card=sessionStorage.getItem("Phone_card"),Typeinfo=sessionStorage.getItem("idType"),cradref;$(function(){init(),clickEvent()});
//# sourceMappingURL=zx_Job-application.js.map