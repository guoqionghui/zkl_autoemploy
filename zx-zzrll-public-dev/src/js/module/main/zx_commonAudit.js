$(function(){
	init1();//获取初始数据
	init2();//基本信息
	init3();//附件上传
	
});
var eduFileOne;//保存附件上传一张图片
var prePic;//保存一张预览图片
var group;//保存预览框架
var prePicDiv;//保存存放图片的容器
var route_content;//保存审批轨迹
 var buttonExist;//保存p或者f
function init1(){

	//	判断按钮是否显示开始
	  buttonExist=sessionStorage.getItem("strus");
	
	 if(buttonExist=="f"){
	 	 $("#zx_commonAudit .mui-title").html("审批详情");
	 	 $(".decide_button").remove();
	 	 $(".advise").remove();
	 }
   //	判断按钮是否显示结束
	eduFileOne=$(".eduFiles").html();
	prePic=$(".viewPic .mui-slider-item a").html();
	$(".viewPic .mui-slider-item a img").remove();
	prePicDiv=$(".viewPic .mui-slider-group").html();
	$(".viewPic .mui-slider-group .mui-slider-item").remove();
	group=$(".viewPic").html();
	route_content=$(".route_content").html();
	
	  //移除附件上传的照相机图片开始
	$(".eduFiles img").remove();
	$(".apartFiles img").remove();
	$(".bankFront img").remove();
	$(".otherFile1 img").remove();
	$(".otherFile2 img").remove();
	$(".otherFile3 img").remove();
	$(".otherFile4 img").remove();
	$(".otherFile5 img").remove();
	$(".route_content ul").remove();
	$("#idTypeHtml").html("");
	//移除附件上传的照相机图片结束
	
	/*点击图片事件处理函数*/
	$("#Card-addone").click(function(){
		var imgPath = $(this).attr("src");
		$("#imgShow").show();
		$("#imgShow img").attr("src", imgPath);
		
	})
	$("#Card-addtow").click(function(){
		var imgPath = $(this).attr("src");
		$("#imgShow").show();
		$("#imgShow img").attr("src", imgPath);
		
	})
	/*点击图片事件处理函数*/
	$("#zx_commonAudit .clickImg").click(function() {
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
		}
	})
	$("#imgShow").click(function() {
		$(this).hide();
	
	
	})
}
function init2(){
	eventBind();
	
	/*发送请求，回调获取数据*/
	var secuityNo=sessionStorage.getItem("secuityno");
	 Clients.postClientAjax(url.zx_commonAudit,{secuityNo:secuityNo},getStateData);
}
function init3(){
	var idNum=sessionStorage.getItem("secuityno");
	 Clients.postClientAjax(url.zx_commonAuditUpload,{idNum:idNum},getFileData);
}

//回显数据:团队归属+基本信息
function getStateData(data){
	console.log(345324534);
	console.log(data);
	if(data.success){
		getStateCallback(data);
    }
}
function getStateCallback(data){
	 
	   console.log(data);
	  
	if(data.data.curlinkNo=="A1"|| data.data.curlinkNo=="A2"){
		 $("#okPass1").hide();
		 $("#returnApp1").hide();
		 $("#noPass1").hide();
		 $("#okPass").show();
		 $("#returnApp").show();
		
	}
	else{
		 $("#okPass1").show();
		 $("#returnApp1").show();
		 $("#noPass1").show();
		 $("#okPass").hide();
	     $("#returnApp").hide();
	 	
	}
	if(data.data.agent.agenName){
		$(".agenName").html(data.data.agent.agenName);
	}
   if(data.data.agent.intro_Chequeno==""&& data.data.agent.intro_No=="" && data.data.agent.intro_Name==""){
   	   $(".import_infor").hide();
   }
   if(data.data.agent.telphonenum){
   	   $("#telphonenum").val(data.data.agent.telphonenum);
   }  
   if(data.data.agent.procflg01){
      $("#idType1").attr("procflg01",data.data.agent.procflg01);
      if(data.data.agent.procflg01=="1"){
            $(".idA").removeClass("col-xs-7").addClass("col-xs-5"); 
            $(".idB").removeClass("col-xs-5").addClass("col-xs-7");  
       }
      else{
           $(".idA").removeClass("col-xs-5").addClass("col-xs-7"); 
           $(".idB").removeClass("col-xs-7").addClass("col-xs-5");  
       }
      $("#cardname").html("本人"+ data.data.agent.procname);
      $("#idType1").val(data.data.agent.procname);
   } 

   if(data.data.agent.chequeno){
      $("#identity").val(addStar(data.data.agent.chequeno));

      
      
   }
   if(data.data.agent.prodesc02){
   	 $("#apart1").val(data.data.agent.prodesc02);
   }
   if(data.data.agent.company){
   	 $("#apart2").val(data.data.agent.company);
   }
   if(data.data.agent.branch){
   	 $("#apart2").val(data.data.agent.branch);
   }
   if(data.data.agent.agencode){
   	 $("#apart3").val(data.data.agent.agencode);
   }
   if(data.data.agent.intro_Chequeno){
   	 $("#refererId").val(addStar(data.data.agent.intro_Chequeno));
     $('.r_id').html(addStar(data.data.agent.intro_Chequeno));
   }
   if(data.data.agent.intro_No){
     $("#refererNumber").val(data.data.agent.intro_No);
     $(".r_number").html(data.data.agent.intro_No);
   }
   if(data.data.agent.intro_Name){
     $("#refererName").val(data.data.agent.intro_Name); 
     $(".r_name").html(data.data.agent.intro_Name);
   }
   if(data.data.agent.reportag){
     $(".bNum").eq(0).val(data.data.agent.reportag);
   }
   if(data.data.agent.reporname){
     $(".bName").eq(0).val(data.data.agent.reporname);
   }
   if(data.data.agent.groupname){
     $(".bName").eq(1).val(data.data.agent.groupname);
   }
   if(data.data.agent.groupno){
    $(".bNum").eq(1).val(data.data.agent.groupno);
   }
   if(data.data.agent.clntsurnm){
     $("#clntsurnm").html(data.data.agent.clntsurnm);
     $('.info_name').html(data.data.agent.clntsurnm);
   }
   if(data.data.agent.dutydeg){
   	   console.log(data.data.agent.dutydeg);
        $("#job1").attr("dutydeg",data.data.agent.dutydeg);
        $(".work").attr("dutydeg",data.data.agent.dutydeg);
        $("#job1").val(data.data.agent.dutyname); 
        $(".work").html(data.data.agent.dutyname);
       
    }
   
    if(data.data.agent.nationab){
       $("#country1").attr("nationab",data.data.agent.nationab);
       $("#country1").val(data.data.agent.nationname);
    
    }
   if(data.data.agent.birthdate){
    
      $("#uBtdDate").val(data.data.agent.birthdate);
   }
   if(data.data.agent.gender){
   	
   	  $("#showSexy").html(data.data.agent.gendname);
    
        
   }
    if(data.data.agent.marstatus){
        $("#marriedState").attr("data-marriedstate-type",data.data.agent.marstatus); 
        $("#marriedState").val(data.data.agent.marname);
     }
    if(data.data.agent.edu_Level){
    	$("#education").attr("eduLevel",data.data.agent.edu_Level);
        $("#education").val(data.data.agent.eduname);
    }
    if(data.data.agent.politicalcode){
    	
        $("#political").attr("paramno",data.data.agent.politicalcode);
        $("#political").val(data.data.agent.politicname);
    }
     if(data.data.agent.housetype){
    	
         $("#accountType").attr("paramno",data.data.agent.housetype);
         $("#accountType").val(data.data.agent.housename);
    }

    if(data.data.agent.ethnic){
    	
         $("#people").attr("paramno",data.data.agent.ethnic);
         $("#people").val(data.data.agent.ethnname);
    }
   if(data.data.agent.counter){
    	
         $("#source").attr("paramno",data.data.agent.counter);
         $("#source").val(data.data.agent.countname);
    
    }
   
    if(data.data.agent.homephone){
    	$("#phone").val(data.data.agent.homephone);
    }

    if(data.data.agent.addtress){
      
        $("#place").text(data.data.agent.addtress);
       
    }
    if(data.data.agent.postcode){
       $("#postcode").val(data.data.agent.postcode);
    }
  
    if(data.data.agent.email){
    	
       $("#eMail").val(data.data.agent.email);
    }
    if(data.data.agent.bankcount){

       $("#bankcount").val(addStar2(data.data.agent.bankcount));
    }
    if(data.data.agent.bankname){
    	
       $("#bank").attr("bankkey",data.data.agent.bankname);
       $("#bank").val(data.data.agent.bankfname);
     
     }
    console.log(data.data.zlocusList);
    if(data.data.zlocusList){
    	for(var i=0;i<data.data.zlocusList.length;i++){
    		var $ul=$(route_content);
    		$ul.find("li div:nth-of-type(1) span:nth-of-type(1)").html(data.data.zlocusList[i].linkname);
    		$ul.find("li div:nth-of-type(1) span:nth-of-type(2)").html(data.data.zlocusList[i].agentname);
    		$ul.find("li div:nth-of-type(1) span:nth-of-type(3)").html(data.data.zlocusList[i].agentnum);
    		$ul.find("li div:nth-of-type(2) span:nth-of-type(1)").html(data.data.zlocusList[i].resulttag);
    		$ul.find("li div:nth-of-type(2) span:nth-of-type(2)").html(data.data.zlocusList[i].updatedate);
            $ul.find(".referer_advise").html(data.data.zlocusList[i].opinion);
    	    $(".route_content").append($ul);
    		
    	}
    }
}
//上传附件开始
function getFileData(data){
	console.log(data);
	if(data.success){
		fileCallback(data);
	}else{
		mui.alert(data.message);
	}
}
//上传附件结束
//上传附件回显开始
function fileCallback(data){
	var list=data.list;
	var idFile=[];
	var eduFile=[];
	var bankFile=[];
	var apartFile=[];
	var otherFile1=[];
	var otherFile2=[];
	var otherFile3=[];
	var otherFile4=[];
	var otherFile5=[];
	var flag1=true;
	var flag2=true;
	var flag3=true;
	var flag4=true;
	var flag5=true;
    for (var i = 0; i < data.list.length; i++) {
		if(data.list[i].pictype=="050100"){
			flag1=false;
		}
		if(data.list[i].pictype=="060100"){
			flag2=false;
		
		}
		if(data.list[i].pictype=="070100"){
			flag3=false;
			
		}
		if(data.list[i].pictype=="080100"){
			flag4=false;
		
		}
		if(data.list[i].pictype=="090100"){
			flag5=false;
		
		}
	}
    if(flag1){
    	$("#addRestsone").hide();
    }
    if(flag2){
    	$("#addReststow").hide();
    }
	if(flag3){
    	 $("#addReststhree").hide();
    }	 
	if(flag4){
    	$("#addRestsfour").hide();
    }	 
	if(flag5){
    	$("#addRestsfive").hide();
    }
	for (var i = 0; i < data.list.length; i++) {
		switch (data.list[i].pictype) {
			case "010100":
			  
				$("#Card-addone").attr("src", data.list[i].picpath).attr("data-i", "1");
				//$("#zx_commonAudit .Cardshow").show(); //身份证件照片容器div
				//Img1=true;
				break;
			case "010101":
			  
				$("#Card-addtow").attr("src", data.list[i].picpath).attr("data-i", "1");
				//$("#zx_commonAudit .Cardshow").show(); //身份证件照片容器div
				//Img2=true;
				break;
			case "010200":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010300":
			   	$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
			   	$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010400":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010500":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010600":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010700":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010800":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_commonAudit .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "010900":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_job_application .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "011000":
				$("#Card-addtow1").attr("src", data.list[i].picpath).attr("data-i", "1");
				$("#Nametype").hide();
				$("#ReseImg").show();
				//$("#zx_job_application .Cardshow1").show(); //身份其他证件照片容器div
				//Img3=true;
				break;
			case "020100":
				$("#Education").attr("src", data.list[i].picpath).attr("data-i", "1");
				//$("#zx_job_application .Educationshow").show();
				//Img4=true;
				break;
			case "030100":
				$("#Bank-addimg").attr("src", data.list[i].picpath).attr("data-i", "1");
				//$("#zx_job_application .Bankshow").show();
				//Img5=true;
				break;
			case "040100":
				$("#addWillwrite").attr("src", data.list[i].picpath).attr("data-i", "1");
			//	$("#zx_job_application .Willwriteshow").show();
				//Img6=true;
				break;
			case "050100":
			  
			    		$("#addRestsone").attr("src", data.list[i].picpath).attr("data-i", "1");
			    		$("#addRestsone").show();
			  
			    
			
				//$("#zx_job_application .Restsoneshow").show();
				break;
			case "060100":
			
				  
				     	$("#addReststow").attr("src", data.list[i].picpath).attr("data-i", "1");
				     	$("#addReststow").show();
				    
				//$("#zx_job_application .Reststowshow").show();
				break;
			case "070100":
			  
			     		 $("#addReststhree").attr("src", data.list[i].picpath).attr("data-i", "1");
			     		 $("#addReststhree").show();
			   
			
				//$("#zx_job_application .Reststhreeshow").show();
				break;
			case "080100":
				
			
			    	$("#addRestsfour").attr("src", data.list[i].picpath).attr("data-i", "1");
			    	$("#addRestsfour").show();
			  
				//$("#zx_job_application .Restsfourshow").show();
				break;
			case "090100":
			  
			    	$("#addRestsfive").attr("src", data.list[i].picpath).attr("data-i", "1");
			    	$("#addRestsfive").show();
			  
				
				//$("#zx_job_application .Restsfiveshow").show();
				break;
		}
	}
}

//上传附件回显结束
function eventBind(){
	  //返回按钮开始
	  $("#zx_commonAudit .mui-btn").on("click",function(){
	  	 	sessionStorage.setItem("strus",buttonExist);
	  });
	  //返回按钮结束
	  //审批轨迹开始
	$("#zx_commonAudit .route_title li span:nth-of-type(2)").click(function(){
	 	if($("#zx_commonAudit .route_content").css("display")=="none"){
          $("#zx_commonAudit .route_content").slideDown();
          $("#zx_commonAudit .route_title li span:nth-of-type(2) img").css("transform","rotate(-270deg)");
	   }
	   else{
         $("#zx_commonAudit .route_content").slideUp();
          $("#zx_commonAudit .route_title li span:nth-of-type(2) img").css("transform","rotate(360deg)");
	   }
	 
	 	
	 });
    //审批轨迹结束
    //审批通过
	$("#okPass").find("button").on("click",function(){
		var option;
		var secuityNo=sessionStorage.getItem("secuityno");
	
		if($("#teArea").val()==""){
			mui.alert("请输入审批意见");
			return;
		}
		else{
			
			option=$("#teArea").val();
		}
		$("#global-loading-shadow").css("display","block");
		 Clients.postClientAjax(url.zx_commonAuditPass,{secuityNo:secuityNo,opinion:option},function(data){
		 	$("#global-loading-shadow").css("display","none");
		 	if(data.success){
		 		mui.alert("提交成功!");
			 	sessionStorage.setItem("stutas","AY");
			 	sessionStorage.setItem("strus",buttonExist);
			 	location.hash="#zx_approval_list";
		 	}
		 	else{
		 		mui.alert(data.message);
		 	}
		 	
		 });
		
	});
	//返回申请人
	$("#returnApp").find("button").on("click",function(){
		
		var option;
	    var secuityNo=sessionStorage.getItem("secuityno");
		if($("#teArea").val()==""){
			mui.alert("请输入审批意见");
		    return;
		}
		else{
			option=$("#teArea").val();
		}
		$("#global-loading-shadow").css("display","block");
		 Clients.postClientAjax(url.zx_commonAuditReturn,{secuityNo:secuityNo,opinion:option},function(data){
		 	$("#global-loading-shadow").css("display","none");
		 	if(data.success){
		 		
			 	mui.alert("提交成功!");
			 	sessionStorage.setItem("stutas","AB");
			 	sessionStorage.setItem("strus",buttonExist);
			 	location.hash="#zx_approval_list";
		 	}
		 	else{
		 		alert(data.message);
		 	}
		 	
		 	
		 });
	});
	
	$("#okPass1").find("button").on("click",function(){
		var option;
	
		var secuityNo=sessionStorage.getItem("secuityno");
		if($("#teArea").val()==""){
			mui.alert("请输入审批意见");
			
			return;
		}
		else{
			option=$("#teArea").val();
		}
		$("#global-loading-shadow").css("display","block");
		 Clients.postClientAjax(url.zx_commonAuditPass,{secuityNo:secuityNo,opinion:option},function(data){
		 	$("#global-loading-shadow").css("display","none");
		 	if(data.success){
		 		mui.alert("提交成功!");
		 		sessionStorage.setItem("stutas","AY");
		 		sessionStorage.setItem("strus",buttonExist);
		 		location.hash="#zx_approval_list";
		 	}else{
		 		mui.alert(data.message);
		 	}
		 });
		
	});
	$("#returnApp1").find("button").on("click",function(){
		var option;
		
		var secuityNo=sessionStorage.getItem("secuityno");
		if($("#teArea").val()==""){
			mui.alert("请输入审批意见");
			return;
		}
		else{
			option=$("#teArea").val();
		}
		$("#global-loading-shadow").css("display","block");
		 Clients.postClientAjax(url.zx_commonAuditReturn,{secuityNo:secuityNo,opinion:option},function(data){
		 	$("#global-loading-shadow").css("display","none");
		 	if(data.success){
		 		mui.alert("提交成功!");
		 		sessionStorage.setItem("stutas","AB");
		 		sessionStorage.setItem("strus",buttonExist);
		 		location.hash="#zx_approval_list";
		 	}else{
		 		mui.alert(data.message)
		 	}
		 });
	});
	$("#noPass1").find("button").on("click",function(){
		var option;
		var secuityNo=sessionStorage.getItem("secuityno");
         if($("#teArea").val()==""){
			mui.alert("请输入审批意见");
			return;
		 }
		 else{
			option=$("#teArea").val();
		 }
		$("#global-loading-shadow").css("display","block");
		 Clients.postClientAjax(url.zx_commonAuditUnPass,{secuityNo:secuityNo,opinion:option},function(data){
		 		$("#global-loading-shadow").css("display","none");
		 	if (data.success) {
		 		mui.alert("提交成功!");
		 		sessionStorage.setItem("stutas","AN");
		 		sessionStorage.setItem("strus",buttonExist);
		 		location.hash="#zx_approval_list";
		 	} else{
		 		mui.alert(data.message);
		 	}
		 });
	});
	//团队归属开始
	$(".apartment").on("click",function(){
		if($(".referers").css("display")=="none"){
             
              $(".apartment img").css("transform","rotate(-270deg)");
               $(".referers").slideDown();
		}
		else{
            
             $(".apartment img").css("transform","rotate(360deg)");
              $(".referers").slideUp();
		}
	});
	//团队归属结束
	//基本信息开始
	$(".information").on("click",function(){
	if($(".informationDetail").css("display")=="none"){
        
          $(".information img").css("transform","rotate(-270deg)");
          $(".informationDetail").slideDown();
	}
	else{
        
          $(".information img").css("transform","rotate(360deg)");
           $(".informationDetail").slideUp();
	}
    });
    	//审批意见
   	var showadbise = sessionStorage.getItem("strus");
    if(showadbise=="p"){
    	$(".advise_input").show();
    	$(".advise_title").on("click",function(){
			if($(".advise_input").css("display")=="none"){
		       	$(".advise_title img").css("transform","rotate(-270deg)");
		          $(".advise_input").slideDown();
			}else{
		          $(".advise_title img").css("transform","rotate(360deg)");
		           $(".advise_input").slideUp();
			}
	    });
    }else{
    	$(".advise_title").on("click",function(){
			if($(".advise_input").css("display")=="none"){
		       	$(".advise_title img").css("transform","rotate(-270deg)");
		          $(".advise_input").slideDown();
			}else{
		          $(".advise_title img").css("transform","rotate(360deg)");
		           $(".advise_input").slideUp();
			}
	    });
    }
	//基本信息结束
	//团队归属开始
	$(".upload").on("click",function(){
		if($(".uploadDetail").css("display")=="none"){
       
           $(".upload img").css("transform","rotate(-270deg)");
           $(".uploadDetail").slideDown();
	    }
	   else{
       
          $(".upload img").css("transform","rotate(360deg)");
          $(".uploadDetail").slideUp();
	    }
	});
	//团队归属结束
	//性别开始
	$("#zx_commonAudit .sexyGroup").click(function() {
	$(".male").removeClass("sexyActive ");
	$(".female").removeClass("sexyActive ");
	$(".unclear").removeClass("sexyActive ");
	$(this).addClass("sexyActive");
    });
	//性别结束
	//附件上传开始
	$(".upload").click(function(){
	//	$("#showimg").slideDown();
		if($("#showimg").css("display")=="none"){
           $(".upload img").css("transform","rotate(-270deg)");
           $("#showimg").slideDown();
	    }
	   else{
          $(".upload img").css("transform","rotate(360deg)");
          $("#showimg").slideUp();
	    }
	});
    //审批意见
    $("#teArea").on("blur",function(){
    	if($(this).val()){
			if(!checkOpinion($(this).val())){
				$(this).val("");
			    $(".opinionTip").show();
			}
			else{
				$(".opinionTip").hide();
			}
			
		}
    });
     $("#teArea").on("focus",function(){
     
        setTimeout(function () {
                    $("#teArea")[0].scrollIntoView();
                    $("#teArea")[0].scrollIntoViewIfNeeded();
         }, 300);


     });
    

	
	
}
//转换中国标准时间转化成时间格式开始
function changTime(data){
	var datetime=data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + (data.getDate()-1);
	  return datetime;
}
//转换中国标准时间转化成时间格式结束
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
//身份证脱敏处理开始

function addStar(str){
	
	var str1=str;
	if(str.length==15){
		return str.slice(0,3)+"********"+str.slice(11,15);
	}
	else if(str.length==18){
		
		return str.slice(0,3)+"***********"+str.slice(14,18);
	}
	else{
		
		return str;
		
	}
	
	
}
//身份证脱敏处理结束
//银行卡脱敏处理开始
function addStar2(str){
	
	var str1=str;
	if(str.length==16){
		return str.slice(0,4)+"********"+str.slice(12,16);
	}
	else if(str.length==18){
		
		return str.slice(0,5)+"********"+str.slice(13,18);
	}
	else if(str.length==19){
		
		return str.slice(0,5)+"********"+str.slice(13,19);
		
	}
	
	
}
//银行卡脱敏处理结束
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