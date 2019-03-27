﻿var route;//保存路线
var pic;//保存一张图片
var workNum;//工号
var strus;//标识是我的待办还是历史记录
var imgList;//保存一张图片
var url_commit="";//保存提交时不同审批岗的请求
$(function(){

	init();
});
//控制审批意见自适应内容开始
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
//控制审批意见自适应内容结束
function init(){
	workNum=sessionStorage.getItem("applicant");
	strus=sessionStorage.getItem("strus");
	if(strus=='p'){
		$(".advise").css("display","block");
		$(".btn").css("display","block");
		
	}
	else if(strus=="f"){
		
		$(".advise").css("display","none");
		$(".btn").css("display","none");
	}
    eventBind();
    route=$(".route_content").html();
    $(".route_content ul").remove();
    pic=$(".pic_here").html();
    $(".pic_here img").remove();
    $("#end").parent().css("display","none");
    $("#commit").parent().css("display","none");
  //初始化获取申请人基本信息开始
	var  agentNum=workNum;
	var  initData={applicant:agentNum};
	Clients.postClientAjax(url.zx_agentInfo,initData,function(data){
		
		console.log(data);
	    if(data.success){
	    	    $(".prodesc02").html(data.data.resapply.prodesc02);
			    $(".sorgName").html(data.data.resapply.sorgName);
			    $(".sorgName").attr("company",data.data.resapply.company);
			    $(".sorgName").attr("branch",data.data.resapply.branch);
			    $(".agenName").html(data.data.resapply.agenName);
			    $(".agentnum").html(data.data.resapply.agentnum);
			    $(".clntsurnm").html(data.data.resapply.clntsurnm);
			    $(".dutyName").html(data.data.resapply.dutyName);
			    $(".dutyName").attr("dutydeg",data.data.resapply.dutydeg);
			    $(".entrydate").html(data.data.resapply.entrydate);
			    $(".telphonenum").html(data.data.resapply.telphonenum);
			    $(".leavereason").html(data.data.resapply.leavereason);
			   
			    if(data.data.resapply.linkno=="L1"){
			    	$("#commit").parent().css("display","block");
					$("#end").parent().css("display","none");
					$("#commit").parent().removeClass("col-xs-6").addClass("col-xs-12");
					url_commit="zx_leaveBossAudit_commit1";
		
				}
				else if(data.data.resapply.linkno=="L2"){
					$("#commit").parent().css("display","block");
					$("#end").parent().css("display","block");
					$("#commit").parent().removeClass("col-xs-12").addClass("col-xs-6");
					url_commit="zx_leaveBossAudit_commit2";
				} 
			
		       for(var i=0;i<data.data.materialList.length;i++){
					switch(data.data.materialList[i].pictype){
						case "510100":
						$("#addImg1").attr("src",data.data.materialList[i].picpath).attr("data-i", "1");
						$("#addImg1").parent().parent().css("display","block");
					
						break;
						case "510101":
						$("#addImg2").attr("src", data.data.materialList[i].picpath).attr("data-i", "1");
						$("#addImg2").parent().parent().css("display","block");
						break;
						case "510102":
						$("#addImg3").attr("src", data.data.materialList[i].picpath).attr("data-i", "1");
						$("#addImg3").parent().parent().css("display","block");
						break;
					}
			   }
			
		    
		       for(var i=0;i<data.data.zlocusList.length;i++){
		       	    
			       	 var $route=$(route);
			         $route.find("li div:nth-of-type(1) span:nth-of-type(1)").html(data.data.zlocusList[i].linkName);
			       	 $route.find("li div:nth-of-type(1) span:nth-of-type(2)").html(data.data.zlocusList[i].agentName);
			       	 $route.find("li div:nth-of-type(1) span:nth-of-type(3)").html(data.data.zlocusList[i].agentNum);
			       	 $route.find("li div:nth-of-type(2) span:nth-of-type(1)").html(data.data.zlocusList[i].statusName);
			       	 $route.find("li div:nth-of-type(2) span:nth-of-type(2)").html(data.data.zlocusList[i].updateDate);
			         $route.find(".referer_advise").html(data.data.zlocusList[i].opinion);
			       	 $(".route_content").append($route);
		       }
	    }else{
	    	mui.alert(data.message);
	    }
	});
//初始化获取申请人基本信息结束


}
function eventBind(){
     //审批轨迹开始
	 $("#zx_leaveBossAudit .route_title li span:nth-of-type(2)").click(function(){
	 
	 	if($("#zx_leaveBossAudit  .route_content").css("display")=="none"){
          $("#zx_leaveBossAudit  .route_content").slideDown();
          $("#zx_leaveBossAudit  .route_title li span:nth-of-type(2) img").css("transform","rotate(-270deg)");
	    }
	    else{
         $("#zx_leaveBossAudit  .route_content").slideUp();
          $("#zx_leaveBossAudit  .route_title li span:nth-of-type(2) img").css("transform","rotate(360deg)");
	    }
	 });
	/*点击图片事件处理函数*/
	$("#zx_leaveBossAudit .clickImg").click(function() {
		if ($(this).children("img").attr("data-i") == "1") {
			$("#imgShowlz img").removeClass("imgone");
			$("#imgShowlz img").removeClass("imgtow");
			$("#imgShowlz").show();
			var imgPath = $(this).children("img").attr("src");
		    $("#imgShowlz img").attr("src", imgPath);
		    if ($("#imgShowlz img").width() > $("#imgShowlz img").height()) {
		    	$("#imgShowlz img").addClass("imgone");
		    }
		    else {
		    	$("#imgShowlz img").addClass("imgtow");
		    }
		   }
	})
	$("#imgShowlz").click(function() {
			$(this).hide();
	})

	//审批轨迹结束
	//提交开始
	$("#commit").on("click",function(){
		if($("#opinion").val()){
			var APPLICANT3=workNum;//工号
		    var OPINION=$("#opinion").val();//审批意见
			var data={};
			data.applicant=APPLICANT3;
			data.opinion=OPINION;
			$("#global-loading-shadow").css("display","block");
		    Clients.postClientAjax(url[url_commit],data,function(data){
					$("#global-loading-shadow").css("display","none");
					console.log(data);
					if(data.success){
					
						mui.alert("提交成功!");
						location.href="#zx_lzapproval_list";
					}
					else{
						mui.alert("提交失败!");
					}
		    });
		
		}
		else{
			mui.alert("请填写审批意见！")
		}
	})
	//提交结束
    //结束流程开始
    $("#end").on("click",function(){
    	if($("#opinion").val()){
    		var APPLICANT4=workNum;//身份证
			var OPINION=$("#opinion").val();//审批意见
			var data={};
			data.applicant=APPLICANT4;
			data.opinion=OPINION;
			$("#global-loading-shadow").css("display","block");
			Clients.postClientAjax(url.zx_leaveBossAudit_end,data,function(data){
				$("#global-loading-shadow").css("display","none");
				console.log(data);
				if(data.success){
					mui.alert("提交成功!");
					location.href="#zx_lzapproval_list";
				}
				else{
					mui.alert("提交失败!");
				}
			});
    	}
    	else{
			mui.alert("请填写审批意见！")
		}
		
	})
    //结束流程结束
    $("#opinion").on("blur",function(){
    	if(!checkOpinion($(this).val())){
				$(this).val("");
			    $(".opinionTip").show();
		}
		else{
				$(".opinionTip").hide();
		}
    });
      $("#opinion").on("focus",function(){
    	 setTimeout(function () {
                    $("#opinion")[0].scrollIntoView();
                    $("#opinion")[0].scrollIntoViewIfNeeded();
         }, 300);
    })
 
}
function scaleSmall(realScale,clientScale,dom){
//	if(realScale<clientScale){
//		return "";
//	}
 dom.css("transform","scale(realScale)");
 return dom;
	
}
//审批轨迹开始
function showAdvice(obj){
	
	if($(obj).next().css("display")=="block"){
		$(obj).next().slideUp();
		$(obj).children().eq(3).find("img").attr("src","app/resources/imgs/select-right-gray.jpg");
	}
	else{
		$(obj).next().slideDown();
		$(obj).children().eq(3).find("img").attr("src","app/resources/imgs/select-down-gray.jpg");
	}
}
//审批轨迹结束
//审批意见开始
function checkOpinion(str){
	
	var reg=/^([A-Za-z\d\u4e00-\u9fa5\s]|[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\、|\，|\；|\。|\？|\！|\“|\”|\‘|\’|\：|\（|\）|\─|\…|\—|\·|\《|\》]){1,100}$/g;
	if(reg.test(str)){
		
		return true;
	}
	else{
		return false;
	}


}
//审批意见结束