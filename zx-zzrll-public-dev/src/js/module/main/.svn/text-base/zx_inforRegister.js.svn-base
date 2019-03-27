﻿/*银行名称开始*/
var bankData;
/*银行名称结束*/
/*营销员来源开始*/
var sourceData;
/*营销员来源结束*/
/*申请职级开始*/
var jobData;
/*申请职级结束*/
/*学历开始*/
var educationData;
/*学历结束*/
/*民族开始*/
var peopleData;
/*民族结束*/
/*户口类型开始*/
var accountData;
/*户口类型结束*/
/*国籍开始*/
var countryData;
/*国籍结束*/
/*政治面貌开始*/
var politicalData;
/*政治面貌结束*/
/*公共证件类型*/
var IDKinds=[
		{value:"1",text:"身份证"},
//		{value:"2",text:"中国护照"},
	 	{value:"3",text:"军官证"},
	 	{value:"4",text:"港澳回乡证"},
	 	{value:"5",text:"其他"},
        {value:"9",text:"台胞证"},
        {value:"A",text:"外国人永久居留身份证"}
	 
];
/*公共证件类型结束*/
/*婚姻状况开始*/
var marriedData;
/*婚姻状况结束*/
var apt1;//分公司
var apt2;//中支
var head;//保存回显时的分公司，假如点击改变，则清空中支和服务部
var dutydeg1;//保存引荐人职级
var dutydeg2;//保存直辖主管职级
var refererName;//保存引荐人名字
var refererId;//保存引荐人身份证
var bossName;//保存直辖主管名字
var bossId;//保存直辖主管工号
var idMunber;//保存身份证
/*身份证地区数组开始*/
var aCity = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江",31: "上海",32: "江苏",
      	33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",
      	50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",
      	81: "香港",82: "澳门",91: "国外"
}
/*身份证地区数组结束*/
var referDuty=[
{num:13,dutydeg:"A1"},
{num:12,dutydeg:"B1"},
{num:11,dutydeg:"D0"},
{num:10,dutydeg:"D1"},
{num:9,dutydeg:"E1"},
{num:8,dutydeg:"E2"},
{num:7,dutydeg:"F0"},
{num:6,dutydeg:"F1"},
{num:5,dutydeg:"F2"},
{num:4,dutydeg:"F1"},
{num:3,dutydeg:"F2"}
]//保存引荐人的所有职级

var state=0;/*判断数据库是否有这个人*/
var flag1=false;
var flag2=false;
var flag3=false;
var message;
$(function(){

    var chequeno=sessionStorage.getItem("Phone_card");
    //状态不是审批中（AI）或审批完成待缴费（PY）,则发请求

    if(!(sessionStorage.getItem("payref")=="PY"||sessionStorage.getItem("stutas")=="AI") ){
        //发送请求，获得下拉框数据，赋值给各自下拉框的全局数组，调用选择器显示下拉
	    Clients.postClientAjax(url.zx_inforRegister_init,null,getInitData);
     	Clients.postClientAjax(url.zx_inforRegister_company,null,getCompanyData);
	}

	init3();//数据回显
	
	
 });

function init3(){
	
	//绑定事件开始
    eventBind();
    //绑定事件结束
	var chequeno;//保存身份证
	var tag;//保存审批状态
	//只有身份证才可以进行姓名OCR扫描开始
	if(sessionStorage.getItem("Type_code") && sessionStorage.getItem("Type_code")!="1"){
		 $(".removeIcon").css("display","none"); 	 
		 $("#clntsurnm").attr("placeholder","请输入姓名");
   	}
	else{
		 $(".removeIcon").css("display","inline-block"); 	 
		 $("#clntsurnm").removeAttr("placeholder");
	}
	//只有身份证才可以进行姓名OCR扫描结束
	//获取登录时证件号码
	if(sessionStorage.getItem("Phone_card")){
    	$("#identity").val(sessionStorage.getItem("Phone_card"));
    	chequeno=sessionStorage.getItem("Phone_card");
    	
    }
    //获取登录时手机号码
    if(sessionStorage.getItem("Phonevode")){
    	$("#telphonenum").val(sessionStorage.getItem("Phonevode"));
    	
    }
    //获取登录时证件类型
    if(sessionStorage.getItem("Type_code")){
   	   for(var i=0;i<IDKinds.length;i++){
   	   	 if(IDKinds[i].value==sessionStorage.getItem("Type_code")){
   	   	 	 $("#idType1").val(IDKinds[i].text);
   	   	 	 $("#idType1").attr("procflg01",sessionStorage.getItem("Type_code"));
   	   	 	break;
   	   	 }
   	   }
   	   //证件类型如果是4,9，A,户口类型不必填
   	   if(sessionStorage.getItem("Type_code")=="4"||sessionStorage.getItem("Type_code")=="9"||sessionStorage.getItem("Type_code")=="A"){
   	      $(".accountStar").remove();
   	   }
   }
    //初始化就触发证件号码的失去焦点事件，自动带出出生日期和性别
    if( $("#idType1").attr("procflg01")==1 && $("#identity").val() && checkID($("#identity").val())){
   	   $("#identity").triggerHandler("blur");
   	}
    if(sessionStorage.getItem("stutas")=="AB"){
     	tag="AB";//返回申请人
        $(".scanImage").unbind();
        $("#stopWrite1").hide();
		$("#stopWrite2").hide();
		$("#stopWrite3").hide();
     }
    else if(sessionStorage.getItem("stutas")=="AN"){
     	tag="AN";//审批不通过
     	$("#stopWrite1").hide();
		$("#stopWrite2").hide();
		$("#stopWrite3").hide();
     }
    else{
     	tag="AE";//其他
     	if(sessionStorage.getItem("stutas")=="AI"){
     		    notInput();  // 禁用输入
	    		$("#stopWrite1").hide();
	    		$("#stopWrite2").hide();
	    		$("#stopWrite3").hide();
	    	    removePlaceholder();  // 移除placeholder
     	}
     }
        //缴费页面进入信息录入页面
    if(sessionStorage.getItem("payref")){
    	if(sessionStorage.getItem("payref")=="PY"){
	    		notInput();
	    		$("#stopWrite2").hide();
	    		$("#stopWrite3").hide();
	    		$("#saveData").unbind();
	    	    removePlaceholder();  // 移除placeholder
	    	    
	    }
    }
    if(tag){
    	 //数据库存在此人信息，数据回显开始
        Clients.postClientAjax(url.zx_inforRegister_state,{tag:tag},getStateData);
    }
   

}
//获取下拉选择器的值开始
function getInitData(data){

	if(data.success){
			
	    /*银行名称开始*/
	    var bank;
	    bank=data.data.Bank;
	    bankData=textChange(bank,"bankdesc");//选择器中的文本显示是固定字段text,因此要进行转换
	    /*银行名称结束*/
	    /*营销员来源开始*/
	     var source;
	     source=data.data.Counter;
	     sourceData=textChange( source,"paramname");
	    /*营销员来源结束*/
	     // 申请职级开始
		var job;
		job=data.data.Duty;
	    jobData=textChange(job,"dutyFname");
		//申请职级结束
		// 学历开始
		var edu;
		edu=data.data.Edu;
		educationData=textChange(edu,"eduName");
		// 学历结束
		/*民族开始*/
	     var people;
	     people=data.data.Ethic;
	     peopleData=textChange(people,"paramname");
	    /*民族结束*/
	    /*户口类型开始*/
		var account;
		account=data.data.Housetype;
		accountData=textChange(account,"paramname");
	    /*户口类型结束*/
	    /*国籍开始*/
	    var country;
	    country=data.data.Nation;
	    countryData=textChange(country,"nationabdc");  
	    /*国籍结束*/
		/*政治面貌开始*/
		var political;
		political=data.data.Politic;
		politicalData=textChange(political,"paramname");
	    /*政治面貌结束*/
        //婚姻状况开始
        var married;
        married=data.data.Marry
        marriedData=textChange(married,"paramname");
        //婚姻状况结束
	    selector();//选择器
 
	}
	else{
		flag1=true;
		message=data.message;
		
	
	}


}
//获取下拉选择器的值结束
//获取分公司开始
function getCompanyData(data){
	if(data.success && data.data){
		var apt;
	    apt=data.data;
	    apt1=textChange(apt,"subcomname");//分公司
	    var apartPicker = new mui.PopPicker();//分公司
		var apartPicker2 = new mui.PopPicker();//中支
		var apartPicker3 = new mui.PopPicker();//营销服务部
	    var apartment1 = $('#apartment1');
		var apart1 = $('#apart1');
		var apartment2 =$('#apartment2');
		var apart2 = $('#apart2');
		var apartment3 =$('#apartment3');
		var apart3 = $('#apart3');
		apartPicker.setData(apt1);
	     //分公司开始
		apartment1.on('tap', function() {
			//关闭输入框开始
			closeIme();
			//关闭输入框结束
			apartPicker.show(function(items) {
				//设置分公司选中值开始
				apart1.val(items[0].text);
				apart1.attr("subcomid",items[0].subcomid);
				//设置分公司选中值结束
	            //清除中支和分公司开始
				$("#apart2").val("");
				$("#apart2").attr("company","");
				$("#apart2").attr("branch","");
				$("#apart3").val("");
				$("#apart3").attr("agencode","");
				if($("#apart2").val()==""){
					$("#refererId").val("");
					$("#refererNumber").val("");
					$("#refererName").val("");
					$(".bNum").val("");
					$(".bName").val("");
					$(".bName").eq(0).removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");                      
	                $(".bNum").eq(0).removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");                   
	                $("#refererName").removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");   
				}
				 //清除中支和分公司结束
				 //第一次登陆按顺序填写信息开始
				if(state==0){
					if($("#apart1").val()&&$("#apart2").val()&&$("#apart3").val()){
		    	         $("#stopWrite2").hide();
		            }
			        else{
				        $("#stopWrite2").show();
				        $("#stopWrite3").show();
			        }
				}
			     //第一次登陆按顺序填写信息结束
		    
				//数据回显时如果改变分公司则清空中支和服务部门开始
				if(head && apart1.val()!=head){
					$("#apart2").val("");
					$("#apart2").attr("company","");
					$("#apart2").attr("branch","");
					$("#apart3").val("");
					$("#apart3").attr("agencode","");
				}
				//数据回显时如果改变分公司则清空中支和服务部门结束
				//向后台传apart1.val();获取所有的中支，赋值给apt2结束
				
			});
		   
			
			
			
	});
		 //分公司结束
		 //中支开始
		apartment2.on('tap', function() {
	     closeIme();
	     //获取中支
		if ($('#apart1').val() != "") {
		    //向后台传apart1.val(),获取所有的中支，赋值给apt2开始；
	        
			Clients.postClientAjax(url.zx_inforRegister_medium,{companyName:apart1.val()},function(data){
				  	console.log(JSON.stringify(data));
			        if(data.success&& data.data){
			        	var apt2Value=$('#apart2').val();
			        	apt2=textChange(data.data,"citydesc");
			            apartPicker2.setData(apt2);
			    	    apartPicker2.show(function(items) {
							apart2.val(items[0].text);
							$("#apart3").val("");
							$("#apart3").attr("agencode","");
							apart2.attr("company", items[0].company);
							apart2.attr("branch", items[0].branch);
							if($("#apart2").val()==""||apt2Value!= items[0].text){
									$("#refererId").val("");
									$("#refererNumber").val("");
									$("#refererName").val("");
									$(".bNum").val("");
									$(".bName").val("");
									$(".bName").eq(0).removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");                      
								    $(".bNum").eq(0).removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");                   
								    $("#refererName").removeAttr("readonly","readonly").css("backgroundColor","#ffffff").parent().parent().css("backgroundColor","#ffffff");   
				            }
							if(state==0){
								if($("#apart1").val()&&$("#apart2").val()&&$("#apart3").val()){
		                             $("#stopWrite2").hide();
			     
			                    }
			                    else{
								        $("#stopWrite2").show();
								        $("#stopWrite3").show();
			     
			                    }
							}
						
			            });
			        	
			        }
			        else{
			        	mui.alert(data.message);
			        }
			      
			
			});
		
		
		}
	       
	    });		
	    //中支结束
	    //营销服务部开始
	    apartment3.on('tap', function() {
	    	       closeIme();
	    	       if(state==0){
	    	       	    if($("#apart1").val()&&$("#apart2").val()&&$("#apart3").val()){
		                   $("#stopWrite2").hide();
		      
			            }
			            else{
						        $("#stopWrite2").show();
						        $("#stopWrite3").show();
						       
			            }
	    	       }
				  
	                //获取营销服务部数据
						
					if ($('#apart1').val() != "" && $('#apart2').val() != "") {
						 var company=apart2.attr("company");
						 var branch=apart2.attr("branch");
						 Clients.postClientAjax(url.zx_inforRegister_agent,{company:company,branch:branch},function(data){
						      if(data.success && data.data){
							      	console.log(JSON.stringify(data));
							      	apt3=textChange(data.data,"agcyName");
				                    apartPicker3.setData(apt3);
							        apartPicker3.show(function(items) {
									apart3.val(items[0].text);
									apart3.attr("agencode", items[0].agencode);
					     	 });
						      	
						      }
						      else{
			        	         mui.alert(data.message);
			                  }
						     
						   
						});
						
					}
					
		});
	    //营销服务部结束
	   /*您所属办公室职场结束*/
	}
	else{
		flag2=true;
		message=data.message;
	
	}
	    

}
//获取分公司结束
//回显回调开始
function getStateData(data){

    $("#addDetail").val("");
  
    console.log("回显开始==="+data);
	if(data.success){
		//再次登陆的标识开始
		state=1;//不是初次登录
		//再次登陆的标识结束
        getStateCallback(data);
        //隐藏按顺序填写的遮罩开始
        $("#stopWrite1").hide();
		$("#stopWrite2").hide();
        $("#stopWrite3").hide();
       //隐藏按顺序填写的遮罩结束
        
    }
	else{
		 
		flag3=true;
	    message=data.message;
		//初次登陆的标识开始
        state=0;//初次登录
        //初次登陆的标识结束
         //显示按顺序填写的遮罩开始
        $("#stopWrite1").show();
		$("#stopWrite2").show();
        $("#stopWrite3").show();
          //显示按顺序填写的遮罩结束
     }
	if((flag1||flag2||flag3) && message){
		mui.alert(message);
	}
	

}
//回显回调结束
//输入框不可用开始
function notInput(){
	$(".red_star2").css("display","none");
	$(".red_star").css("display","none");
	$(".red_down").css("display","none");
	$(".imageup").css("display","none");
    $("#bankcount").parent().removeClass("col-xs-8").addClass("col-xs-9");
	$("#apartment1").unbind();
	$("#apartment2").unbind();
    $("#apartment3").unbind();
    $("#job").unbind();
    $("#country").unbind();
    $("#marriedState1").unbind();
    $("#education1").unbind();
    $("#political1").unbind();
    $("#accountType1").unbind();
    $("#people1").unbind();
    $("#place1").unbind();
    $("#bank1").unbind();
    $("#source1").unbind();
	$(".exist").unbind();
	$(".notExist").unbind();
	$("#refererId").unbind();
	$("#refererNumber").unbind();
	$("#refererName").unbind();
	if($(".bNum").attr("onblur")){
		$(".bNum").removeAttr("onblur");
	  
	}
	else{
		$(".bNum").unbind();
	  
	}
	if($(".bName").attr("onblur")){
		
	    $(".bName").removeAttr("onblur");
	}
	else{
		
	    $(".bName").unbind();
	}
	$("#zx_inforRegister .referers").children().eq(2).find("input").unbind();
	$("#clntsurnm").unbind();
	$("#phone").unbind();
	$("#addDetail").unbind();
	$("#bankcount").unbind();
	$("#source").unbind();
	$("#postcode").unbind();
	$("#eMail").unbind();
	$("#uBtdDate1").unbind();
	$("#place").unbind();
	$("#zx_inforRegister .sexyGroup").unbind();
	$("#refererId").attr("readonly","readonly");
	$("#refererNumber").attr("readonly","readonly");
	$("#refererName").attr("readonly","readonly");
	$(".bNum").attr("readonly","readonly");
	$(".bName").attr("readonly","readonly");
	$("#clntsurnm").attr("readonly","readonly");
	$("#phone").attr("readonly","readonly");
	$("#addDetail").attr("readonly","readonly");
	$("#bankcount").attr("readonly","readonly");
	$("#source").attr("readonly","readonly");
	$("#postcode").attr("readonly","readonly");
	$("#eMail").attr("readonly","readonly");
	$("#uBtdDate").attr("readonly","readonly");
	$("#place").attr("readonly","readonly");
	$(".scanImage").unbind();
	$(".bankCard").unbind();
	$("#refererName").attr("placeholder","");
}
//输入框不可用结束
//回显成功回调开始
function getStateCallback(data){

   console.log(data);
   head=data.data.prodesc02;//保存回显时的分公司，假如点击改变，则清空中支和服务部
    //根据是否有引荐人控制按钮的显示开始
    if((data.data.intro_Chequeno!="" && data.data.intro_No!="" && data.data.intro_Name!="")|| (data.data.intro_No!="" && data.data.intro_Name!="")||(data.data.intro_Chequeno!="" && data.data.intro_Name!="")){
   	    $(".exist").addClass("referer_active");
   	    $(".notExist").removeClass("referer_active");
   	    $(".referer_one").eq(0).css("display","block");
   	
   	  
    }
    else{
       $(".exist").removeClass("referer_active");
   	   $(".notExist").addClass("referer_active");
   	   $(".referer_one").eq(0).css("display","none");
   	  
   	
    }
   

    
    //根据是否有引荐人控制按钮的显示结束
    //回显分公司   
    if(data.data.prodesc02){
	   	 $("#apart1").val(data.data.prodesc02);
	   	 $("#apart1").attr("subcomid",data.data.prodescId);
    }
    //回显中支
    if(data.data.company && data.data.branch && data.data.sorgName){
	      $("#apart2").val(data.data.sorgName);
	 	  $("#apart2").attr("company",data.data.company);
	 	  $("#apart2").attr("branch",data.data.branch);
    }
   //回显营销部
    if(data.data.agencode){
   	    $("#apart3").val(data.data.agenName);
   	 	$("#apart3").attr("agencode",data.data.agencode);
    }
    //回显手机号码
    if(data.data.telphonenum){
   	   $("#telphonenum").val(data.data.telphonenum);
    }  
   //回显证件类型
    if(data.data.procflg01){
    	
        $("#idType1").attr("procflg01",data.data.procflg01);
        $("#idType1").val(data.data.procname);
    } 
   //回显证件号码
    if(data.data.chequeno){
      $("#identity").val(data.data.chequeno);
    }
   //回显引荐人证件号码
    if(data.data.intro_Chequeno){
   	  $("#refererId").val(data.data.intro_Chequeno);
    }
    //回显引荐人工号
    if(data.data.intro_No){
      $("#refererNumber").val(data.data.intro_No)
    }
    //回显引荐人姓名
    if(data.data.intro_Name){
      $("#refererName").val(data.data.intro_Name); 
    }
    //回显直辖主管工号
    if(data.data.reportag){
      $(".bNum").eq(0).val(data.data.reportag);
    }
   //回显直辖主管姓名
    if(data.data.reporname){
      $(".bName").eq(0).val(data.data.reporname);
    }
    //回显团队最高主管姓名
    if(data.data.groupname){
      $(".bName").eq(1).val(data.data.groupname);
    }
    //回显团队最高主管姓名
    if(data.data.groupno){
     $(".bNum").eq(1).val(data.data.groupno);
    }
    //显现姓名
    if(data.data.clntsurnm){
      $("#clntsurnm").val(data.data.clntsurnm);
    }
    //回显职级
    if(data.data.dutydeg){
        $("#job1").attr("dutydeg",data.data.dutydeg);
        $("#job1").val(data.data.dutyname); 
    }
    //回显国籍
    if(data.data.nationab){
       $("#country1").attr("nationab",data.data.nationab);
       $("#country1").val(data.data.nationname);
    }
    //回显生日日期
    if(data.data.birthdate){
   	  var birth=data.data.birthdate.slice(0,4)+"-"+data.data.birthdate.slice(4,6)+"-"+data.data.birthdate.slice(6,8);
   	  $("#uBtdDate").val(birth);
    }
    //回显性别
    if(data.data.gender){
    	if(data.data.gender=="M"){
    		$(".male").addClass("sexyActive");
    		$(".female").removeClass("sexyActive");
    	}
    	else if(data.data.gender=="F"){
    		$(".male").removeClass("sexyActive");
    		$(".female").addClass("sexyActive");
    	}

    }
    //回显婚姻状况
    if(data.data.marstatus){
       $("#marriedState").attr("data-marriedstate-type",data.data.marstatus); 
       $("#marriedState").val(data.data.marname);
    }
     //回显学历
    if(data.data.edu_Level){
    	$("#education").attr("eduLevel",data.data.edu_Level);
        $("#education").val(data.data.eduname);
    }
    //回显政治面貌
    if(data.data.politicalcode){
         $("#political").attr("paramno",data.data.politicalcode);
         $("#political").val(data.data.politicname);
    }
    //回显户口类型
    if(data.data.housetype){
    	$("#accountType").attr("paramno",data.data.housetype);
        $("#accountType").val(data.data.housename);
         
    }
    //回显民族
    if(data.data.ethnic){
        $("#people").attr("paramno",data.data.ethnic);
        $("#people").val(data.data.ethnname);
    }
    //回显营销员来源
    if(data.data.counter){
     	$("#source").attr("paramno",data.data.counter);
        $("#source").val(data.data.countname);
    }
    //回显家庭电话
    if(data.data.homephone){
    	$("#phone").val(data.data.homephone);
    }
     //回显地址
    if(data.data.addtress){
        var address=data.data.addtress.split(" ");
        $("#place").val(address[0]);
        $("#addDetail").val(address[1]);
    }
    //回显邮编
    if(data.data.postcode){
       $("#postcode").val(data.data.postcode);
    }
    //回显邮箱
    if(data.data.email){
       $("#eMail").val(data.data.email);
    }
    //回显银行账号 
    if(data.data.bankcount){
       $("#bankcount").val(data.data.bankcount);
    }
    //回显银行名称
    if(data.data.bankname){
       $("#bank").attr("bankkey",data.data.bankname);
       $("#bank").attr("bankcode",data.data.bankcode);
       $("#bank").val(data.data.bankfname);
   
    }
     if($(".exist").hasClass("referer_active")){
    	  
   	    if($("#refererName").val()&& $(".bName").eq(0).val() && $(".bNum").eq(0).val()){
   	   
   	    	 $(".bName").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
                              .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
             $(".bNum").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
                             .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
             $("#refererName").attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
                                    .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
   	    }
    }
    else{
    	 if($(".bNum").eq(0).val()){
   	    	 $(".bName").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
                              .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
          
          
   	    }
    }

    
}
//回显成功回调结束
/*选择器文本键的修改开始*/
function textChange(arr,key){ 
   
    for(var i=0;i<arr.length;i++){
   	    var textValue=arr[i][key];
   	    delete arr[i][key];
   	  	arr[i]["text"]=textValue;
   	  
    }
    return arr;
}
/*选择器文本键的修改结束*/
function eventBind(){
	//申请人姓名开始
	$("#clntsurnm").on("change",function(){
		if($(this).val()){
			if(checkName($(this).val())){
				$(".clntsurnmTip").css("display","none");
			}
			else{
				$(this).val("");
			    $(".clntsurnmTip").css("display","block");
			}
		}
	
	});
	//申请人姓名结束
	//返回上一个页面开始
	$("#backgo").click(function(){
		history.go(-1);
	})
	//返回上一个页面结束
	//有无引荐人开始
	$("#zx_inforRegister .exist").click(function() {
	    //清除团队归属填写的内容开始
	    $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
        $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
        $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");   
        $("#zx_inforRegister #refererInfo").find("input").val("");
		$(".bNum").eq(0).val("");
	    $(".bName").eq(0).val("")
	    $(".bNum").eq(1).val("");
	    $(".bName").eq(1).val("");
		$("#zx_inforRegister .notExist").removeClass("referer_active");
		$("#zx_inforRegister .exist").addClass("referer_active");
		$(".referer_one").eq(0).css("display","block");
		$(".idTip").css("display","none");
		$(".bossTip").css("display","none");
		$(".topTip").css("display","none");
	    $(".clntsurnmTip").css("display","none");
	    $(".eMailTip").css("display","none");
	    $(".accountTip").css("display","none");
	    $(".areaTip").css("display","none");
	    $(".addressTip").css("display","none");
	    $(".importPer").css("display","none");
		$(".importPerCall").css("display","none");
	    $(".idTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;证件号和工号任选其一!');
		$(".idTip").show();
		$(".bNum").eq(0).parent().parent().children().eq(0).find(".red_star").css("display","inline");
	    $(".bName").eq(0).parent().parent().children().eq(0).find(".red_star").css("display","inline");
	    //清除团队归属填写的内容结束
	    //初始登录按顺序填写开始
	    if(state==0){
	    	if(getTeamValue()){
	          $("#stopWrite3").hide();
	          $(".idTip").css("display","none");
			  $(".bossTip").css("display","none");
			  $(".topTip").css("display","none");
	     
		     }
		    else{
	             $("#stopWrite3").show();
	             $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
	
		    } 
	    }
	    //初始登录按顺序填写结束
	});
	$("#zx_inforRegister .notExist").click(function() {
	     //清除团队归属填写的内容开始
	    $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
        $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
        $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");                    
		$(".bNum").eq(0).val("");
	    $(".bName").eq(0).val("")
	    $(".bNum").eq(1).val("");
	    $(".bName").eq(1).val("");
	   	$("#zx_inforRegister #refererInfo").find("input").val("");
		$("#zx_inforRegister .exist").removeClass("referer_active");
		$("#zx_inforRegister .notExist").addClass("referer_active");
        $(".idTip").css("display","none");
		$(".bossTip").css("display","none");
		$(".topTip").css("display","none");
		$(".clntsurnmTip").css("display","none");
		$(".accountTip").css("display","none");
		$(".eMailTip").css("display","none");
		$(".areaTip").css("display","none");
		$(".addressTip").css("display","none");
		$(".importPer").css("display","none");
		$(".importPerCall").css("display","none");
		$(".referer_one").eq(0).css("display","none");
		$(".bNum").eq(0).removeAttr("readonly","readonly");
	    $(".bName").eq(0).removeAttr("readonly","readonly");
	    $(".bNum").eq(0).parent().parent().children().eq(0).find(".red_star").css("display","none");
	    $(".bName").eq(0).parent().parent().children().eq(0).find(".red_star").css("display","none");
	    //清除团队归属填写的内容结束
	    //初始登录按顺序填写开始
	    if(state==0){
	   	    if(getTeamValue2()){
	          $("#stopWrite3").hide();
	          $(".idTip").css("display","none");
			  $(".bossTip").css("display","none");
			  $(".topTip").css("display","none");
	     
		    }
		    else{
	             $("#stopWrite3").show();
	             $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
	
		    }
	    }
	     //初始登录按顺序填写结束

	});
	//有无引荐人结束
	//性别开始
	$("#zx_inforRegister .sexyGroup").click(function() {
		$(".male").removeClass("sexyActive ");
		$(".female").removeClass("sexyActive ");
		$(".unclear").removeClass("sexyActive ");
		$(this).addClass("sexyActive");
	});
	//性别结束
    //邮箱开始   
	$("#zx_inforRegister #eMail").on("blur", function() {
		$("#zx_inforRegister .eMailTip").hide();
		if ($(this).val() != "") {
			if (isEmail($(this).val()) == false) {
				$("#zx_inforRegister .eMailTip").show();
				$("#zx_inforRegister #eMail").val("");
				$("#zx_inforRegister #eMail").focus();
			} else {
				$("#zx_inforRegister .eMailTip").hide();
			}
		}
	});
	//邮箱结束
	//邮政区号开始
	$("#zx_inforRegister .checkAreaNum").on("blur",function(){
		$("#zx_inforRegister .areaTip").hide();
		if($(this).val()!=""){
			if(checkAreaNum($(this).val())==false){
				$(this).val("");
				$(this).focus();
				$("#zx_inforRegister .areaTip").show();
			}
			else{
				$("#zx_inforRegister .areaTip").hide();
			}
		}
	});
	//邮政区号结束
	//家庭电话失去焦点开始
	$("#zx_inforRegister #phone").on("blur", function() {
		$("#zx_inforRegister .phoneNumber").hide();
		if ($(this).val() != "") {
			
			if (checkTel($(this).val()) == false) {
				$(this).val("");
				$(this).focus();
				$("#zx_inforRegister .phoneNumber").css("display","block");
			} else {
				$("#zx_inforRegister .phoneNumber").css("display","none");
		
			}
		}
	});
	//家庭电话失去焦点结束
    //证件号码失去焦点开始
	$("#zx_inforRegister #identity").on("blur", function() {
		if ($(this).val() != "" && $("#idType1").attr("procflg01") == "1") {
			if(checkID($(this).val())){
				var idClass = checkID($(this).val());
				var birthday = idClass.id_birth;
				var gender = idClass.id_gender;
				$("#zx_inforRegister .identityTip").hide();
				$("#uBtdDate").val(birthday);
				if (gender == "M") {
					$(".male").triggerHandler("click");
				} else if (gender == "F") {
					$(".female").triggerHandler("click");
				}
			}
			else{
				$("#zx_inforRegister #identity").val("");
			    $("#zx_inforRegister .identityTip").show();
			}
			
		}
	});
	//证件号码失去焦点结束
	//引荐人信息开始
	//引荐人身份证
	 $("#zx_inforRegister #refererId").on("blur", function() {
		var tag=false;//判断是否符合证件类型
		if($(".exist").hasClass("referer_active")){
			if($(this).val()){
			var iValue=$(this).val();
			var card=/^([a-zA-Z0-9\u4e00-\u9fa5]{6,21})$/;//军官证
		
			if(card.test(iValue)){
				tag=true;
			}
			else{
				tag=false;
			}
			
			if(tag){
				$(".idTip").hide();
				if($("#refererNumber").val()!=""){
					$("#refererNumber").triggerHandler("blur");
				}
				else if($(".bNum").eq(0).val()!=""){
					$(".bNum").eq(0).triggerHandler("blur");
				}
			    if($("#refererNumber").val()==""){
				   var company=$("#apart2").attr("company");
				   var branch=$("#apart2").attr("branch");
				   var chequeno=$("#refererId").val();
				   var data={company:company,branch:branch,chequeno:chequeno};
				
				   Clients.postClientAjax(url.zx_inforRegister_teamRelation2,data,function(data1){
				   	  getTeam2(data1);
				   	
				   });
			   	
			   	
			    }
			    var flag= ($("#refererId").val()=="" && $("#refererNumber").val()=="") || $("#refererName").val()=="";
	            if(!flag){
	            
					$(".bossTip").hide();
	            }
	         
			
			}
			else{
				$("#refererId").val("");
			    $(".idTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;填写正确格式的证件号!');
				$(".idTip").show();
			
			}
			
		}
		    else{
			//身份证和工号不能同时为空
	        if ($(this).val() == "" && $("#refererNumber").val() == "") {
				$(".idTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;证件号和工号不能同时为空!');
				$(".idTip").show();
			} 
		}
		}
		  
		//初次登录按顺序填写开始
	    if(state==0){
	    	
	    	if($(".exist").hasClass("referer_active")){
	     
	     	 	if(getTeamValue()){
	                $("#stopWrite3").hide();
	            	$(".idTip").css("display","none");
					$(".bossTip").css("display","none");
					$(".topTip").css("display","none");
		        }
		        else{
		            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");   
	       
			        $("#stopWrite3").show();
			      
		        }
	     	
	     	 
	        }
	        if($(".notExist").hasClass("referer_active")){
	     
	     		if(getTeamValue2()){
		             $("#stopWrite3").hide();
		             
	            }
	            else{
	     
	                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
			        $("#stopWrite3").show();
		        
	        }
	     	
	     	 
	     }
	  
	    	
	    }
	    //初次登录按顺序填写结束
       
	});
	 $("#refererId").on("input",function(){
	 	 
	 	    if($("#refererNumber").val()==""){
		 	    	    if($("#refererName").attr("readonly")){
			 	     	    $("#refererName").val("");
			    	     }
			    	     $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
			             $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
			                       .parent().parent().css("backgroundColor","#ffffff");  
			             $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
			                       .parent().parent().css("backgroundColor","#ffffff");    
			             $(".bName").val("");
			    	     $(".bNum").val("");
	 	    	
	 	    }
    	  
    	     
    });
	//引荐人工号
	 $("#refererNumber").on("blur", function() {
	 	
		if($(".exist").hasClass("referer_active")){
			if($(this).val() != ""){
				if(checkNumber($("#refererNumber").val())){
					$(".idTip").hide();
					sendReInfo();
					var flag= ($("#refererId").val()=="" && $("#refererNumber").val()=="") || $("#refererName").val()=="";
		            if(!flag){
		            
						$(".bossTip").hide();
		            }
				}
				else{
					$(".bNum").eq(0).removeAttr("readonly");
	   	            $(".bName").eq(0).removeAttr("readonly");
					$("#refererNumber").val("");
				    $(".idTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;填写正确格式的工号!');
					$(".idTip").show();
					
				   
				}
			
		    }
			else if($(this).val() == "" &&  $("#refererId").val()==""){
				if($(this).val() == ""){
					$(".bNum").eq(0).removeAttr("readonly");
	   	            $(".bName").eq(0).removeAttr("readonly");
				}
				$(".idTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;证件号和工号不能同时为空!');
				$(".idTip").show();
			}
		}
        if(state==0){
	    	
	    	if($(".exist").hasClass("referer_active")){
	     
	     	 	if(getTeamValue()){
	                $("#stopWrite3").hide();
	            	$(".idTip").css("display","none");
					$(".bossTip").css("display","none");
					$(".topTip").css("display","none");
		        }
		        else{
		            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");   
	       
			        $("#stopWrite3").show();
			      
		        }
	     	
	     	 
	        }
	        if($(".notExist").hasClass("referer_active")){
	     
	     		if(getTeamValue2()){
		             $("#stopWrite3").hide();
		             
	            }
	            else{
	     
	                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
			        $("#stopWrite3").show();
		        
	        }
	     	
	     	 
	     }
	  
	    	
	    }
	
	});
     $("#refererNumber").on("input",function(){
    	    if($("#refererName").attr("readonly")){
    	     	  $("#refererName").val("");
    	     }
    		 $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
             $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
             $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");   
             $(".bName").val("");
    	     $(".bNum").val("");
    	     
    });
    $("#refererName").on("blur",function(){
    	    var flag= ($("#refererId").val()=="" && $("#refererNumber").val()=="") || $("#refererName").val()=="";
            if(!flag){
            
				$(".bossTip").hide();
            }
    })
    //直辖主管开始
    $(".bNum").eq(0).on("blur", function(){
	    var bNumValue=$(".bNum").eq(0).val();

		if($(".notExist").hasClass("referer_active")){
			if(bNumValue){
				if(checkNumber(bNumValue)){
					sendBoInfo();
					$(".bossTip").hide();
				}else{
							
					  
					   	$(".bNum").eq(0).val("");
						$(".bossTip").show();
						$(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;请输入正确格式的工号!');
					    $(".bNum").val("");
					    $(".bName").val("");
					  
				}
			}else{
				$(".bossTip").show();
			    $(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;工号不能为空!');
			}
		}else if($(".exist").hasClass("referer_active")){
             var flag= ($("#refererId").val()=="" && $("#refererNumber").val()=="") || $("#refererName").val()=="";
             if(flag){
             	$(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;先填写引荐人信息!');	
             	$(".bossTip").show();
				$(".bNum").val("");
				$(".bName").val("");
				return;
             }
            if(bNumValue){
			    
					if(checkNumber(bNumValue)){
						if($("#refererNumber").val()==""){
						   sendBoInfo();
					       $(".bossTip").hide();
						}
					
					}else{ 
						   
						    $(".bNum").eq(0).focus();
					     	$(".bNum").eq(0).val("");
							$(".bossTip").show();
							$(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;请输入正确格式的工号!');
						
							$(".bNum").val("");
						    $(".bName").val("");
						  
					}
				
			}else{

				$(".bossTip").show();
			    $(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;工号不能为空!');
			}
		}
		
	 
	    if(state==0){
	    	
	    	if($(".exist").hasClass("referer_active")){
	     
	     	 	if(getTeamValue()){
	                $("#stopWrite3").hide();
	            	$(".idTip").css("display","none");
					$(".bossTip").css("display","none");
					$(".topTip").css("display","none");
		        }
		        else{
		            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");   
	       
			        $("#stopWrite3").show();
			      
		        }
	     	
	     	 
	        }
	        if($(".notExist").hasClass("referer_active")){
	     
	     		if(getTeamValue2()){
		             $("#stopWrite3").hide();
		             
	            }
	            else{
	     
	                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
			        $("#stopWrite3").show();
		        
	        }
	     	
	     	 
	     }
	  
	    	
	    } 
	});
	$(".bNum").eq(0).on("input",function(){
	
			$(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#FFFFFF")
                              .parent().parent().css("backgroundColor","#FFFFFF");
        
    	    $(".bName").val("");
    	    $(".bNum").eq(1).val("");
	});
	$(".bName").eq(0).on("blur",function(){
		    var flag= ($("#refererId").val()=="" && $("#refererNumber").val()=="") || $("#refererName").val()=="";
            if($(".exist").hasClass("referer_active") && flag){
             	$(".bossTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;先填写引荐人信息!');	
             	$(".bossTip").show();
				$(".bNum").val("");
				$(".bName").val("");
				return;
            }
	})
	//直辖主管结束
	//最高主管开始
	$("#zx_inforRegister .manager").on("click", function() {
		
		var boNumber = $("#zx_inforRegister .referers").children().eq(1).find("input").eq(0).val();
		var boName = $("#zx_inforRegister .referers").children().eq(1).find("input").eq(1).val();
		if (boNumber == "" || boName == "") {
			$("#zx_inforRegister .referers").children().eq(2).find(".topTip").html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;先填写完整直辖主管信息!');
			$("#zx_inforRegister .referers").children().eq(2).find(".topTip").show();
			$(this).val("");
			$("#stopWrite3").css("top",($(".referers").height()+445)+"px");

		} else {
			$("#zx_inforRegister .referers").children().eq(2).find(".topTip").hide();
		}
		
	});
	//最高主管结束
	//引荐人信息结束
	//保存开始
	$("#saveData").on("click", saveData);
	//保存结束
	//下一步开始
	$("#nxt").on("click", nxtData);
   //下一步结束
	//扫描银行卡开始
	$(".bankCard").on("click",function(){
		scanBankCardInfo();
	})
	//扫描银行卡结束
	//扫描身份证开始
	$(".scanImage").on("click",function(){
		scanIDCardInfo();	
    })
	//扫描身份证结束
    //扫描银行卡开始
    $("#bankcount").on("blur",function(){
    	//银行卡账号为16,18,19位
	    if($(this).val()){
	    	
	    	var str=$(this).val().replace(/\s*/g,"");
	    	var reg=/^\d{16,19}$/g;
			if(reg.test($(this).val())&&(str.length==16||str.length==18||str.length==19)){
				$(".accountTip").hide();
			
			}
			else{
				
				$(this).val("");
				$(".accountTip").show();
				
			}
	    }
	});
	 //扫描银行卡结束
	 //按顺序填写开始
	 $("#stopWrite2").on("click",function(){
	 	if(state==0){
	 		if($("#apart1").val()&&$("#apart2").val()&&$("#apart3").val()){
	          $("#stopWrite2").hide();
	     
		    }
		    else{
		        $("#stopWrite2").show();
		        $("#stopWrite3").show();
		        $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
		        mui.alert("请先填写所属营销服务部！");
		    }
	 	}
	     
	    
	 
	 });
	 $("#stopWrite3").on("click",function(){
	      if(state==0){
	      		if($(".notExist").hasClass("referer_active")&&$(".bNum").eq(0).val()==""&&$(".bName").eq(0).val()==""){
	 		
	 		        $("#stopWrite3").hide();
	 		
	 	        }
	        	else{
	 		
	 		       $("#stopWrite3").show();
	 	        }
	            if($("#apart1").val()&&$("#apart2").val()&&$("#apart3").val()){
	              $("#stopWrite2").hide();
	         
	            }
			    else{
			       	 
			        $("#stopWrite3").show();
			        $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
			        $("#stopWrite2").show();
			        mui.alert("请先填写所属营销服务部！");
			        return;
			     
			     }
	            if($(".exist").hasClass("referer_active")){
	     	
	     	       if(getTeamValue()){
			             $("#stopWrite3").hide();
			             $(".idTip").css("display","none");
						 $(".bossTip").css("display","none");
						 $(".topTip").css("display","none");
	      
	                }
	               else{
		         	
		               $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
			           $("#stopWrite3").show();
		               mui.alert("请先填写团队归属！");
	        
	                }
	             }
	      }
   
	    
	    
	    
	 
	 });
	 //按顺序填写结束
	 //详细地址开始
	 $("#addDetail").on("blur",function(){
	 	var val=$(this).val();
	 	if(val){
	 		if(checkAddress(val)){
	 	 	     $(".addressTip").css("display","none");
		 	 }
		 	 else{
		 	 	$("#addDetail").val("");
		 	 	$(".addressTip").css("display","block");
		 	 }
	 	}
	 });
	//详细地址校结束
	//银行处输入框被遮挡处理开始
	 $("#bankcount").on("focus",function(){
	 	 setTimeout(function () {
                    $("#bankcount")[0].scrollIntoView();
                    $("#bankcount")[0].scrollIntoViewIfNeeded();
         }, 300);
	 })
	
	//银行处输入框被遮挡处理结束
	//紧急联系人开始
	
	$("#importPer").on("blur",function(){
		if($(this).val()){
			if(checkName($(this).val())){
				$(".importPer").hide();
			
			}
			else{
				$(".importPer").show();
				$(this).val("");
			}
		}
		
		
	})
	//紧急联系人结束
	//紧急联系人电话开始
		$("#importPerCall").on("blur",function(){
		if($(this).val()){
			if(checkPhone($(this).val())){
				$(".importPerCall").hide();
			}
			else{
				$(".importPerCall").show();
				$(this).val("");
			}
		}
		
		
	})
	//紧急联系人电话结束
}
//获取团队归属的值开始
function checkAddress(str){
	var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+$/g;
	
	if(reg.test(str)){
		return true;
	}
	else{
		return false;
	}
}
//引荐人
function getTeamValue(){
var status=false;
if(($("#refererId").val()||$("#refererNumber").val())&& $("#refererName").val()&&$(".bNum").val()&&$(".bName").val()){
       status=true;
}


return status;


}
//直辖主管
function getTeamValue2(){
	var status=false;
	if($(".bNum").val()&&$(".bName").val()){
	       status=true;
	}
	return status;
}
//获取团队归属的值结束
//引荐人信息发送后台，请求数据开始
function sendReInfo() {
        //有工号&没有工号
	
	   var company=$("#apart2").attr("company");
	   var branch=$("#apart2").attr("branch");
	   var agentNum=$("#refererNumber").val();
	   refererName=$("#refererName").val();
	   refererId=$("#refererId").val();
	   var data={company:company,branch:branch,agentNum:agentNum};
	   Clients.postClientAjax(url.zx_inforRegister_teamRelation,data,getTeam);
			
	
}
//引荐人信息发送后台，请求数据结束
//引荐人工号发送数据回调开始
function getTeam(data){
	console.log(JSON.stringify(data));
	console.log(data);
	var d;
    if(data.success){
		if(data.data){
				d=JSON.parse(data.data);
				var secuityNo=d.secuityNo;
			    var surName=d.surName;
			    var flag=true;  	  
			    if(refererId && secuityNo &&secuityNo!=refererId){
			       $(".bNum").eq(0).val("");
			       $(".bName").eq(0).val("")
			       $(".bNum").eq(1).val("");
			       $(".bName").eq(1).val("");
			       $(".bName").eq(1).val("");
			       $("#refererId").val("");
			       flag=false;
			   
			    }
			    if(refererName && surName && refererName!=surName){
			  	
			  	 
				   $(".bNum").eq(0).val("");
				   $(".bName").eq(0).val("")
				   $(".bNum").eq(1).val("");
				   $(".bName").eq(1).val("");
				   $(".bName").eq(1).val("");
			       $("#refererName").val("");
			        flag=false; 
			    }
			    if(!flag){
			  
			      mui.alert("请核实引荐人信息!");
			      $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
		                                    .parent().parent().css("backgroundColor","#ffffff");
		          $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
		                       .parent().parent().css("backgroundColor","#ffffff");  
		          $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
		                       .parent().parent().css("backgroundColor","#ffffff");
			      return;
			     
			    }
				if(d.statuz=="****"){
					 	  $(".bNum").eq(0).attr("readonly","readonly");
					   	  $(".bName").eq(0).attr("readonly","readonly");
						  $(".bNum").eq(0).val(d.reportag);
					      $(".bName").eq(0).val(d.reporname);
					      $(".bNum").eq(1).val(d.groupno);
					      $(".bName").eq(1).val(d.groupname);
					      $("#refererName").val(d.surName);
					      $(".bName").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
		                              .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
		                  $(".bNum").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
		                             .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
		                  $("#refererName").attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
		                                    .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
		              
		                
				          sessionStorage.setItem("dutydeg1",d.dutyDec);
				} 
				else{
			
		     mui.alert(d.errmsg);
			 $("#refererNumber").val("");
			 $("#refererId").val("");
			 $("#refererName").val("");
			 $(".bNum").val("");
	         $(".bName").val("");
	   	     $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
             $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
             $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");   
                     
	   	}
			
		}
		else{
			if(!data.data){
			 
				 mui.alert("查无此引荐人信息!");
				 $("#refererNumber").val("");
				 $("#refererId").val("");
				 $("#refererName").val("");
				 $(".bNum").val("");
		         $(".bName").val("");
		         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
	                                    .parent().parent().css("backgroundColor","#ffffff");
	             $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
	                       .parent().parent().css("backgroundColor","#ffffff");  
	             $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
	                       .parent().parent().css("backgroundColor","#ffffff");   
		        
	        
		    }
		}

	}
	else{
		 mui.alert(data.message);
		 $("#refererNumber").val("");
		 $("#refererId").val("");
		 $("#refererName").val("");
		 $(".bNum").val("");
         $(".bName").val("");
         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                .parent().parent().css("backgroundColor","#ffffff");
         $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                   .parent().parent().css("backgroundColor","#ffffff");  
         $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                   .parent().parent().css("backgroundColor","#ffffff");   
	}
    //先判断引荐人工号存不存在~1.存在~证件号码与姓名与工号是否匹配~匹配则判断引荐人的入职机构是否匹配结束
   	if(state==0 && $(".exist").hasClass("referer_active")){
	     	
	     	 if(getTeamValue()){
		             $("#stopWrite3").hide();
		             $(".idTip").css("display","none");
					 $(".bossTip").css("display","none");
					 $(".topTip").css("display","none");
	             
	      
	          }
	         else{
	     
                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
		        $("#stopWrite3").show();
		    
	        
	         }
	}
	if(state==0 && $(".notExist").hasClass("referer_active")){
	     	 $(".bNum").eq(0).removeAttr("readonly");
       	     $(".bName").eq(0).removeAttr("readonly");
	     	 if(getTeamValue2()){
	             $("#stopWrite3").hide();
	      
	          }
	         else{
	            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
		        $("#stopWrite3").show();
		        
	        
	         }
	}
	
}
//引荐人工号发送数据回调结束
//引荐人身份证发送数据回调开始
function getTeam2(data){
    var d;
    if(data.success){
    	if(data.data){
    		d=JSON.parse(data.data);
		    if(d.statuz=="****"){
		    	   
				 	  $(".bNum").eq(0).attr("readonly","readonly");
				   	  $(".bName").eq(0).attr("readonly","readonly");
					  $(".bNum").eq(0).val(d.reportag);
				      $(".bName").eq(0).val(d.reporname);
				      $(".bNum").eq(1).val(d.groupno);
				      $(".bName").eq(1).val(d.groupname);
				      $("#refererName").val(d.surName);
				      $("#refererNumber").val(d.introNo);
				      $(".bName").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
	                              .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
	                  $(".bNum").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
	                             .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
	                  $("#refererName").attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
	                                    .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
	              
	                
			          sessionStorage.setItem("dutydeg1",d.dutyDec);
			} 
			else{
				 mui.alert(d.errmsg);
				 $("#refererId").val("");
				 $("#refererName").val("");
				 $("#refererNumber").val("");
				 $(".bNum").val("");
		         $(".bName").val("");
		         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                                    .parent().parent().css("backgroundColor","#ffffff");
                 $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
                 $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                       .parent().parent().css("backgroundColor","#ffffff");  
                     
	   	}
    	}
    	else{
    		if(!data.data){
			
		
			     mui.alert("查无此直辖主管信息!");
				 $(".bNum").val("");
		         $(".bName").val("");
		         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
	                                    .parent().parent().css("backgroundColor","#ffffff");
	             $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
	                       .parent().parent().css("backgroundColor","#ffffff");  
	             $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
	                       .parent().parent().css("backgroundColor","#ffffff");  
                     
	        
	        
		    }
    		
    		
    	}
		
	}
	else{
		 mui.alert(data.message);
		 $("#refererId").val("");
		 $("#refererName").val("");
		 $("#refererNumber").val("");
		 $(".bNum").val("");
         $(".bName").val("");
         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
                            .parent().parent().css("backgroundColor","#ffffff");
         $(".bNum").eq(0).removeAttr("readonly").attr("placeholder","请输入工号").css("backgroundColor","#ffffff")
               .parent().parent().css("backgroundColor","#ffffff");  
         $("#refererName").removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#ffffff")
               .parent().parent().css("backgroundColor","#ffffff");  
    }
	//先判断引荐人工号存不存在~1.存在~证件号码与姓名与工号是否匹配~匹配则判断引荐人的入职机构是否匹配结束
   	if(state==0 && $(".exist").hasClass("referer_active")){
	     	
	     	 if(getTeamValue()){
		             $("#stopWrite3").hide();
		             $(".idTip").css("display","none");
					 $(".bossTip").css("display","none");
					 $(".topTip").css("display","none");
	             
	      
	          }
	         else{
	     
                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
		        $("#stopWrite3").show();
		    
	        
	         }
	}
	if(state==0 && $(".notExist").hasClass("referer_active")){
	     	 $(".bNum").eq(0).removeAttr("readonly");
       	     $(".bName").eq(0).removeAttr("readonly");
	     	 if(getTeamValue2()){
	             $("#stopWrite3").hide();
	      
	          }
	         else{
	            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
		        $("#stopWrite3").show();
		        
	        
	         }
	}
	
}
//引荐人身份证发送数据回调结束
//直辖主管发送后台，请求数据开始
function sendBoInfo(){
	   
         $("#zx_inforRegister .referers").children().eq(2).find(".bossTip").hide();
		 var company=$("#apart2").attr("company");
		 var branch=$("#apart2").attr("branch");
		 var agentNum=$(".bNum").eq(0).val();
		 bossName=$(".bName").eq(0).val();
         bossId=$(".bNum").eq(0).val();
         if($(".exist").hasClass("referer_active")){
         	refererName=$("#refererName").val();
		    refererId=$("#refererId").val();
         }
         var data={company:company,branch:branch,agentNum:agentNum};
	     Clients.postClientAjax(url.zx_inforRegister_teamRelation,data,function(data){ 
	     	var d;
	     	 //先判断直辖主管工号存不存在~1.存在~证件号码与姓名与工号是否匹配~匹配则判断直辖主管的入职机构是否匹配开始
	        if(data.success){
	        	   if(data.data){
	        	   	        var flag=true;//保存直辖主管
		                    d=JSON.parse(data.data);
						    if(d.statuz=="****"){
						 	  	 $(".bName").eq(0).val(d.reporname);
					    	 	 $(".bNum").eq(1).val(d.groupno);
					             $(".bName").eq(1).val(d.groupname);
		                         $(".bName").eq(0).attr("readonly","readonly").removeAttr("placeholder").css("backgroundColor","rgba(0,0,0,0.1)")
		                                    .parent().parent().css("backgroundColor","rgba(0,0,0,0.1)");
					             sessionStorage.setItem("dutydeg2",d.dutyDec);
							}
							else{
								            if(d.errmsg=="引荐人已离职"){
												mui.alert("直辖主管已离职");
											}
											else{
												mui.alert(d.errmsg);
											}
											if( $(".notExist").hasClass("referer_active")){
									      		$(".bNum").val("");
									            $(".bName").val("");
									        }
									        else{
									      	     $(".bNum").val("");
									             $(".bName").val("");
									         
									        }
									         $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#FFFFFF")
		                                    .parent().parent().css("backgroundColor","#FFFFFF");
							}

	        	   	
	        	   }
	        	   else{
	        	   	      
	        	   	            mui.alert("查无此直辖主管信息!");
						        if( $(".notExist").hasClass("referer_active")){
						      		$(".bNum").val("");
						            $(".bName").val("");
						        }
						        else{
						      	     $(".bNum").val("");
						             $(".bName").val("");
						        
						        }
					            $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#FFFFFF")
                                    .parent().parent().css("backgroundColor","#FFFFFF");
	        	   }
		          
	        }
	        else{
						
			     	mui.alert(data.message);	
					if( $(".notExist").hasClass("referer_active")){
				      		$(".bNum").val("");
				            $(".bName").val("");
			        }
			        else{
			      	     $(".bNum").val("");
			             $(".bName").val("");
			         
			        }
			        $(".bName").eq(0).removeAttr("readonly").attr("placeholder","请输入姓名").css("backgroundColor","#FFFFFF")
                    .parent().parent().css("backgroundColor","#FFFFFF");
	                 
	        }
			//先判断直辖主管工号存不存在~1.存在~证件号码与姓名与工号是否匹配~匹配则判断直辖主管的入职机构是否匹配开始
			 if(state==0 && $(".exist").hasClass("referer_active")){
	     	
			     	 if(getTeamValue()){
				             $("#stopWrite3").hide();
				             $(".idTip").css("display","none");
							 $(".bossTip").css("display","none");
							 $(".topTip").css("display","none");
			             
			      
			          }
			         else{
			     
		                $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
				        $("#stopWrite3").show();
				    
			        
			         }
	        }
			 if(state==0 && $(".notExist").hasClass("referer_active")){
			     	 $(".bNum").eq(0).removeAttr("readonly");
		       	     $(".bName").eq(0).removeAttr("readonly");
			     	 if(getTeamValue2()){
			             $("#stopWrite3").hide();
			      
			          }
			         else{
			            $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
				        $("#stopWrite3").show();
				        
			        
			         }
			}
	
     	
	    });
	
	
	   
		
}
//直辖主管发送后台，请求数据开始
//保存数据开始
function data(){
   var obj={};
   /*
     telphonenum:手机号码
     procflg01：证件类型
     chequeno:证件号码
     prodesc02:分公司
     company:?
     branch:?
     agencode:营销服务部
     introChequeno:引荐人身份证号
     introNo:引荐人工号
     introName:引荐人姓名
     reportag:直辖主管工号
     reporname:直辖主管姓名
     groupname:团队最高主管工号
     groupno:团队最高主管姓名
     clntsurnm:申请人姓名
     dutydeg:申请职级
     nationab:国籍
     birthdate：出生日期
     gender：性别
     marstatus:婚姻状况
     eduLevel:学历
     politicalcode:政治面貌
     housetype:户口类型
     ethnic:民族
     homephone:家庭电话
     addtress:家庭地址
     postcode；邮递区号
     email:邮箱
     bankcount:银行账号
     bankkey:银行名称
     counter:营销员来源
   */
   var telphonenum=$("#telphonenum").val();
   var procflg01=$("#idType1").attr("procflg01");
   var chequeno=$("#identity").val();
 
   var prodesc02=$("#apart1").val();
   var company=$("#apart2").attr("company");
   var branch=$("#apart2").attr("branch");
   var agencode=$("#apart3").attr("agencode");
   var intro_Chequeno=$("#refererId").val();
   var intro_No=$("#refererNumber").val();
   var intro_Name=$("#refererName").val();
   var reportag=$(".bNum").eq(0).val();
   var reporname=$(".bName").eq(0).val();
   var groupname=$(".bName").eq(1).val();
   var groupno=$(".bNum").eq(1).val();
   var clntsurnm=$("#clntsurnm").val();
   var dutydeg=$("#job1").attr("dutydeg");
   var nationab=$("#country1").attr("nationab");
   var birthdate=removeDate($("#uBtdDate").val());
   var gender=$("#sexy").find(".sexyActive").attr("data-sexy-type");
   var marstatus=$("#marriedState").attr("data-marriedstate-type"); 
   var edu_Level=$("#education").attr("eduLevel");
   var politicalcode=$("#political").attr("paramno");
   var housetype= $("#accountType").attr("paramno");
   var ethnic=$("#people").attr("paramno");
   var homephone=$("#phone").val();
   var addtress=$("#place").val()+" "+$("#addDetail").val();
   console.log(addtress);
   var postcode=$("#postcode").val();
   var email=$("#eMail").val();
   var bankcount=$("#bankcount").val().replace(/\s*/g,"");
   var bankkey=$("#bank").attr("bankkey");
   var bankcode=$("#bank").attr("bankcode");
   var counter=$("#source").attr("paramno");
   var prodescId=$("#apart1").attr("subcomid");
   var sorgName=$("#apart2").val();
   var agenName=$("#apart3").val();
   var procname=$("#idType1").val();
   var dutyname=$("#job1").val();
   var nationname=$("#country1").val();
    var gendname;
   if(gender=="M"){
   		gendname="男";
   }else{
   		gendname="女";
   }
   var marname=$("#marriedState").val();
   var eduname=$("#education").val();
   var politicname=$("#political").val();
   var ethnname=$("#people").val();
   var housename=$("#accountType").val();
   var countname=$("#source").val();
   var bankfname=$("#bank").val();
   if($(".exist").hasClass("referer_active")){
   	   obj.intro_Chequeno= intro_Chequeno;
	   obj.intro_No= intro_No;
	   obj.intro_Name=intro_Name;
   	
   }
   else{
   	   obj.intro_Chequeno = "";
	   obj.intro_No = "";
	   obj.intro_Name ="";
   	
   }
    if(chequeno){
    	   obj.chequeno=chequeno;
    }
   obj.telphonenum=telphonenum;
   obj.procflg01=procflg01;
   obj.prodesc02=prodesc02;
   obj.company= company;
   obj.branch= branch;
   obj.agencode= agencode;
   obj.reportag=reportag;
   obj.reporname=reporname;
   obj.groupname=groupname;
   obj.groupno=groupno;
   obj.clntsurnm=clntsurnm;
   obj.dutydeg=dutydeg;
   obj.nationab=nationab;
   obj.birthdate=birthdate;
   obj.gender=gender;
   obj.marstatus=marstatus;
   obj.edu_Level=edu_Level;
   obj.politicalcode=politicalcode;
   obj.housetype=housetype;
   obj.ethnic= ethnic;
   obj.homephone=homephone;
   obj.addtress=addtress;
   obj.postcode=postcode;
   obj.email=email;
   obj.bankcount=bankcount;
   obj.bankname=bankkey;
   obj.counter= counter;
   obj.bankcode=bankcode;//银行代号
   obj.prodescId=prodescId;//分公司编号
   obj.sorgName=sorgName;//中支
   obj.agenName=agenName;//营销服务部
   obj.procname=procname;//证件类型
   obj.dutyname=dutyname;//职级
   obj.nationname=nationname;//国籍
   obj.gendname=gendname;//性别
   obj.marname=marname;//婚姻状况
   obj.eduname=eduname;//学历
   obj.politicname=politicname;//政治面貌
   obj.ethnname=ethnname;//民族
   obj.housename=housename;//户口类型
   obj.countname=countname;//营销员来源
   obj.bankfname=bankfname;//银行名称
   return obj;
}
function saveData() {
	console.log("保存数据===="+data());
	//如果审批状态是审批成功代缴费或审批中，则不进行保存和判断职级
	if(sessionStorage.getItem("payref")=="PY"||sessionStorage.getItem("stutas")=="AI"){
          return;
	}
	if(state==0){
	 	Clients.postClientAjax(url.zx_inforRegister_update,data(),function(data){
	        if(data.success){
		  		mui.alert("保存成功");
	    	    state=1;
		  		
		  	}
		  	else{
		  		mui.alert(data.message);
		  		 state=0;
		  	}
    	}); 
    }
    else if(state==1){
    	
    	
    		if(sessionStorage.getItem("stutas")=="AB"||sessionStorage.getItem("stutas")=="AN"){
    		    Clients.postClientAjax(url.zx_inforRegister_saveReturn,data(),function(data){
	    		   	if(data.success){
	    			 	mui.alert("保存成功");
	    			}
	    			else{
	    			  mui.alert(data.message);
	    			}
    		   	});
    		}	
    		else{
    			if(sessionStorage.getItem("stutas")!="AI"){
    			     Clients.postClientAjax(url.zx_inforRegister_update,data(),function(data){
	    		
	    			  	if(data.success){
	    			  		mui.alert("保存成功");
		    	    	    state=1;
	    			  		
	    			  	}
	    			  	else{
	    			  		mui.alert(data.message);
	    			  		 state=0;
	    			  	}
	    	      
	    	    	
    	    		
    	           });
    			}
    			
    		}
      
    }
   }
//保存数据结束
//下一步开始
function nxtData() {
	
	console.log("下一步====");
	//如果审批状态是审批成功代缴费或审批中，则不进行保存和判断职级
	if(!(sessionStorage.getItem("payref")=="PY"||sessionStorage.getItem("stutas")=="AI")){
	
       //引荐人职级判断开始
        if($("#refererNumber").val()!="" || $(".bNum").eq(0).val()!=""){
        	if(!judgeDuty()){
               
       	        return;
            }
        }
       
      //引荐人职级判断结束
	}
	else{
		
	     sessionStorage.setItem("applicationName",$("#clntsurnm").val());
	     var chequeno=$("#identity").val();//身份证
	     var addrress=$("#place").val()+""+$("#addDetail").val();//乙方地址
	     var postcode=$("#postcode").val();//邮编
	     var subcomid=$("#apart1").attr('subcomid');//分公司编号
         var payAmount = sessionStorage.getItem('payAmount');//履约保证金seesion
	     var obj={subcomid:subcomid,chequeno:chequeno,addrress:addrress,postcode:postcode,paymoney:payAmount};
	     var contract=JSON.stringify(obj);
	     sessionStorage.setItem("contract",contract);
	      //审批中直接跳转页面开始
		 var ua = navigator.userAgent.toLowerCase();	
		if (/iphone|ipad|ipod/.test(ua)) {
				sessionStorage.setItem("show","1");
		   		 location.hash="#zx_job_applicationios";
		} else if (/android/.test(ua)) {
				sessionStorage.setItem("show","1");
		   		location.hash="#zx_job_application";
		}
        //审批中直接跳转页面结束	
		return;
	}
   //判断信息是否填写完整开始
   
	var complete1=judgeInfoComplete();
   //判断信息是否填写完整结束
	
	if (complete1) {
			
			if(state==0){
				
				Clients.postClientAjax(url.zx_inforRegister_update,data(),function(data){
								 		
				 	    if(data.success){
								 		   
                                            if(sessionStorage.getItem("stutas")==null){ 

								    			var idMunber=$("#identity").val();
								    		    var subcomid=$("#apart1").attr("subcomid");
                                                if(idMunber!=""&&subcomid!=""){
                                                   Clients.postClientAjax(url.zx_printpdf,{chequeno:idMunber,subcomid:subcomid},function(data){});
								    		    }
							    		    }
							    		        sessionStorage.setItem("applicationName",$("#clntsurnm").val());
											    var chequeno=$("#identity").val();//身份证
											    var addrress=$("#place").val();//邮编
											    var subcomid=$("#apart1").attr('subcomid');//分公司编号
									            var payAmount = sessionStorage.getItem('payAmount');//履约保证金seesion
											    var obj={subcomid:subcomid,chequeno:chequeno,addrress:addrress,postcode:postcode,paymoney:payAmount};
											    var contract=JSON.stringify(obj);
											    sessionStorage.setItem("contract",contract);
											    state=1;
									            var ua = navigator.userAgent.toLowerCase();	
												if (/iphone|ipad|ipod/.test(ua)) {
													sessionStorage.setItem("show","1");
											   		 location.hash="#zx_job_applicationios";
												} else if (/android/.test(ua)) {
													sessionStorage.setItem("show","1");
											   		location.hash="#zx_job_application";
												}
						    		 
					    	
								 	    }
			            else{
		                     mui.alert(data.message);
		                }
				}); 
			}
	        else if(state==1){
	        	if(sessionStorage.getItem("stutas")=="AB"||sessionStorage.getItem("stutas")=="AN"){
				
						Clients.postClientAjax(url.zx_inforRegister_saveReturn,data(),function(data){
						 		
							 	 if(data.success){
						 	
				    		        var idMunber=$("#identity").val();
					    		    var subcomid=$("#apart1").attr("subcomid");
					    		    if(idMunber!=""&&subcomid!=""){
					    		    	Clients.postClientAjax(url.zx_printpdf2,{chequeno:idMunber,subcomid:subcomid},function(data){
					    		    		
					    		    	});
					    		    }
					    		    sessionStorage.setItem("applicationName",$("#clntsurnm").val());
								    var chequeno=$("#identity").val();//身份证
								    var addrress=$("#place").val()+""+$("#addDetail").val();//乙方地址
								    var postcode=$("#postcode").val();//邮编
								    var subcomid=$("#apart1").attr('subcomid');//分公司编号
						            var payAmount = sessionStorage.getItem('payAmount');//履约保证金seesion
								    var obj={subcomid:subcomid,chequeno:chequeno,addrress:addrress,postcode:postcode,paymoney:payAmount};
								    var contract=JSON.stringify(obj);
								    sessionStorage.setItem("contract",contract);
								    state=1;
				                    var ua = navigator.userAgent.toLowerCase();	
									if (/iphone|ipad|ipod/.test(ua)) {
										sessionStorage.setItem("show","1");
								   		 location.hash="#zx_job_applicationios";
									} else if (/android/.test(ua)) {
										sessionStorage.setItem("show","1");
								   		location.hash="#zx_job_application";
									}
			    	
						 	    }
		                         else{
		                         	mui.alert(data.message);
		                         }
						});
		        }
				else{
									 
						Clients.postClientAjax(url.zx_inforRegister_update,data(),function(data){
							 	
							 	if(data.success){ 
							 		    
						    		    if(sessionStorage.getItem("stutas")==null){
							    			var idMunber=$("#identity").val();
							    		    var subcomid=$("#apart1").attr("subcomid");
							    		    if(idMunber!=""&&subcomid!=""){
							    		    	Clients.postClientAjax(url.zx_printpdf,{chequeno:idMunber,subcomid:subcomid},function(data){});
							    		    }
						    		    }
						    	        sessionStorage.setItem("applicationName",$("#clntsurnm").val());
									    var chequeno=$("#identity").val();//身份证
									    var addrress=$("#place").val()+""+$("#addDetail").val();//乙方地址
									    var postcode=$("#postcode").val();//邮编
									    var subcomid=$("#apart1").attr('subcomid');//分公司编号
							            var payAmount = sessionStorage.getItem('payAmount');//履约保证金seesion
									    var obj={subcomid:subcomid,chequeno:chequeno,addrress:addrress,postcode:postcode,paymoney:payAmount};
									    var contract=JSON.stringify(obj);
									    sessionStorage.setItem("contract",contract);
									    state=1;
									    var ua = navigator.userAgent.toLowerCase();	
										if (/iphone|ipad|ipod/.test(ua)) {
											sessionStorage.setItem("show","1");
									   		 location.hash="#zx_job_applicationios";
										} else if (/android/.test(ua)) {
											sessionStorage.setItem("show","1");
									   		location.hash="#zx_job_application";
										}
                                                      
			    		  
				    	
							 	}
    		                    else{
		                         	mui.alert(data.message);
		                        }
    		
    		
		                }); 
				 }
		    }
	     
		
	} 
	
}  
//下一步结束
//校验开始

	//校验直辖，最高主管姓名不为空开始
	function nameCheck(obj) {
		if ($(obj).val() == "") {
			$(obj).parent().parent().parent().prev().html('<img src="app/resources/imgs/tip.jpg" height="18px"/>&nbsp;姓名不可为空！');
			$(obj).parent().parent().parent().prev().show();
		} else {
			$(obj).parent().parent().parent().prev().hide();
		}
	
	}
	//校验直辖，最高主管姓名不为空结束
	//e-mail校验开始(@前面必须要有内容，不能以[-_.]开头，@后面必须要有内容，可以有多个'.',但'.'前后要有内容，以2-4位的字母或数字结尾)
	function isEmail(str) {
		var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z]{2,4}$/
		return reg.test(str);
	}
	//e-mail校验结束
	//家庭电话校验开始(有3至4位的区号|是没有区号，&7至8位的数字)
	function checkTel(str) {
		var reg = /^([0-9]{3,4}-[0-9]{7,8}|[0-9]{7,8})$/;
		return reg.test(str);
	}
	//家庭电话校验结束
	//邮递区号开始
	function checkAreaNum(str){
		var reg=/[1-9]\d{5}(?!\d)/g;
		return reg.test(str);
	}
	//邮递区号结束
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
	//工号校验规则开始
    function checkNumber(str) {
		var reg=/\d{8,8}/g;
	
		if (str.length < 9 && str != "" && reg.test(str)) {
			return true;
		}
		return false;
	}
    
	//工号校验规则结束
	//姓名校验开始
	function checkName(str){
		
		var reg=/^[A-Za-z\u4e00-\u9fa5\s]*$/g;
		if(reg.test(str)){
			
			return true;
		}
		else{
			return false;
		}
	
	
	}
	///姓名校验结束
	//紧急联系人电话开始
	function checkPhone(str){
		var reg=/^1[34578]\d{9}$/g;
		if(reg.test(str)){
			return true;
			
		}else{
			return false;
			
		}
		
		
		
	}
	
	
	//紧急联系人电话结束
//校验结束

//选择器开始
function selector(){

	
	//选择器们开始
	(function(mui, doc) {
		mui.init({
			
			gestureConfig: {
				tap: false
			}
		});
		mui.ready(function() {
			
        
           /*国籍开始*/
		
			var countryPicker = new mui.PopPicker();
			
			countryPicker.setData(countryData);
			var country = $('#country');
			var country1 = $('#country1');
			country.on('tap', function(event) {
				closeIme();
				countryPicker.show(function(items) {
					country1.val(items[0].text);
					country1.attr("nationab", items[0].nationab);
				});
				
			});
		
			
			/*国籍结束*/
			/*申请职级开始*/
			var jobPicker = new mui.PopPicker();
			jobPicker.setData(jobData);
			var job = $('#job');
			var job1 = $('#job1');
			job.on('tap', function(event) {
				closeIme();
				jobPicker.show(function(items) {
					job1.val(items[0].text);
					job1.attr("dutyDeg", items[0].dutyDeg);
                    job1.attr("dutyEname", items[0].dutyEname);   
				});
			});
			/*申请职级结束结束*/
			
		 /*出生年月日开始*/
			var uBtdDate1 = $("#uBtdDate1");
			var uBtdDate = doc.getElementById("uBtdDate");
			uBtdDate1.on('tap', function() {
				closeIme();
				var optionsJson = doc.getElementById("uBtdDate").getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var DatePicker = new mui.DtPicker(options);
				var cancelBtn = doc.getElementsByClassName('mui-dtpicker-title')[0];
				var addH2 = doc.createElement("h2");
				// addH2.innerHTML = "请选择出生日期";
				addH2.setAttribute("class", "addTitle");
				$(cancelBtn).before(addH2);
				DatePicker.show(function(rs) {
					var dValue = rs.y.value + "-" + rs.m.value + "-" + rs.d.value;
					var dValue1=new Date(dValue);
					var currentValue1=new Date(initShowDate());
					if (dValue1.getTime()>currentValue1.getTime()) {
						mui.alert("出生日期不能大于当前日期");
						$("#uBtdDate").val("");
					} else{
						$("#uBtdDate").val(dValue);
					}
					//在mui的时间选择器上添加这段代码，解决选择器弹出对次的问题
					if (DatePicker){
						DatePicker.dispose();
					}

				});

			});
			/*出生年月日结束*/
			
			/*政治面貌开始*/
			var polPicker = new mui.PopPicker();
			polPicker.setData(politicalData);
			var political1 = $('#political1');
			var political = $('#political');
			political1.on('tap', function(event) {
				closeIme();
				polPicker.show(function(items) {
					political.val(items[0].text);
				    political.attr("paramno", items[0].paramno);
				});
			});
			/*政治面貌结束*/
			/*户口类型开始*/
			var accountPicker = new mui.PopPicker();
			accountPicker.setData(accountData);
			var accountType1 = $('#accountType1');
			var accountType = $('#accountType');
			accountType1.on('tap', function(event) {
				closeIme();
				accountPicker.show(function(items) {
					accountType.val(items[0].text);
				    accountType.attr("paramno", items[0].paramno);
				});
			});
			/*户口类型结束*/
			/*民族开始*/
			var peoPicker = new mui.PopPicker();
			peoPicker.setData(peopleData);
			var people1 = $('#people1');
			var people = $('#people');
			people1.on('tap', function(event) {
				closeIme();
				peoPicker.show(function(items) {
					people.val(items[0].text);
					people.attr("paramno", items[0].paramno);
				});
			});
			/*民族结束*/
			/*营销员来源开始*/
			var srcPicker = new mui.PopPicker();
			srcPicker.setData(sourceData);
			
			var source1 = $('#source1');
			var source = $('#source');
			source1.on('tap', function(event) {
				closeIme();
				srcPicker.show(function(items) {
					source.val(items[0].text);
					source.attr("paramno", items[0].paramno);
				});
			});
			/*营销员来源结束*/
			//银行名称开始

			var bankPicker = new mui.PopPicker();
			bankPicker.setData(bankData);
			var bank1 = $('#bank1');
			var bank = $('#bank');
			bank1.on('tap', function(event) {
				closeIme();
				bankPicker.show(function(items) {
					$(".bankTip").hide();
					bank.val(items[0].text);
					bank.attr("bankkey", items[0].bankkey);
					bank.attr("bankcode", items[0].bankcode);
				});
			});

			//银行名称结束
			//地址开始
			var _getParam = function(obj, param) {
				return obj[param] || '';
			};
			var cityPicker3 = new mui.PopPicker({
				layer: 3
			});
			cityPicker3.setData(cityData3);
			var place1 = $('#place1');
			place1.on('tap', function(event) {
				closeIme();
				cityPicker3.show(function(items) {
					$("#place").val(_getParam(items[0], 'text') + _getParam(items[1], 'text') + _getParam(items[2], 'text'));
					$("#place").attr("data-address-type", _getParam(items[0], 'value') + _getParam(items[1], 'value') + _getParam(items[2], 'value'));
				});
			});
			//地址结束
			//婚姻状况开始
			var marriedPicker = new mui.PopPicker();
			marriedPicker.setData(marriedData);
			var marriedState1 = $('#marriedState1');
			var marriedState = $('#marriedState');
			marriedState1.on('tap', function(event) {
				closeIme();
				marriedPicker.show(function(items) {
					$(".bankTip").hide();
					marriedState.val(items[0].text);
					marriedState.attr("data-marriedState-type", items[0].paramno);
				});
			});
			//婚姻状况结束
			/*学历开始*/
			var eduPicker = new mui.PopPicker();
			 eduPicker.setData(educationData);
			var education1 = $('#education1');
			var education = $('#education');
			education1.on('tap', function(event) {
				closeIme();
				eduPicker.show(function(items) {
					$('#education').val(items[0].text);
					$('#education').attr("eduLevel", items[0].eduLevel);
					
				});
			});
			/*学历结束*/
			

		});
	})(mui, document);
    //选择器们结束
	

	
}
//选择器结束
//扫描身份证开始
function scanIDCardInfo(){
	   cordova.sino.getIDCardInfo(function(result){
		    if(result.success){
				if(!result.data.exit){
					if(appVersion==="IOS"){
					    if(result.data.ok){
							if(result.data.isFront){
								if(sessionStorage.getItem("Phone_card")!=result.data.Id){
									mui.confirm("您的证件号码与登录环节录入信息不一致，是否同意覆盖并用该证件号码进行登录","Tip",["否","是"],function(e){
										if(e.index==1){
											Clients.postClientAjax(url.zx_verfiyOCR,{chequeno:result.data.Id},function(data){
										
												if(data.success){
													   
													$("#clntsurnm").val(result.data.Name);
													
													if(result.data.Sex=="女"){
													    $(".female").trigger("click");
														$(".female").attr("data-sexy-type","F");
													}
													else{
														$(".male").trigger("click");
														$(".male").attr("data-sexy-type","M");
													}
													$("#idType1").val("身份证");
											        $("#idType1").attr("procflg01","1");
											        $("#uBtdDate").val(result.data.Birthday);
											        if(checkID(result.data.Id)){
											        	$("#identity").val(result.data.Id);
											        	sessionStorage.setItem("Phone_card",result.data.Id); //证件号码
			                                            sessionStorage.setItem("Type_code", "1"); //证件类型
											        }
											        else{
											        	mui.alert("请输入正确格式的身份证号码！");
											        }
											  
													
													
												}
												else{
													
												     mui.alert(data.message);
												}  
											});
											
									    }
									})
								}
								else{
								        $("#clntsurnm").val(result.data.Name);
										if(result.data.Sex=="女"){
										    $(".female").trigger("click");
											$(".female").attr("data-sexy-type","F");
										}
										else{
											$(".male").trigger("click");
											$(".male").attr("data-sexy-type","M");
										}
										$("#idType1").val("身份证");
								        $("#idType1").attr("procflg01","1");
								        $("#uBtdDate").val(result.data.Birthday);
								        if(checkID(result.data.Id)){
								        	$("#identity").val(result.data.Id);
								        	sessionStorage.setItem("Phone_card",result.data.Id); //证件号码
                                            sessionStorage.setItem("Type_code", "1"); //证件类型
								        }
								        else{
								        	mui.alert("请输入正确格式的身份证号码！");
								        }
								}
							}
							else{
								mui.alert("请扫描正面身份证");
							}
						 
						}
					}
					else{
					 
					    result.data.bigPic="";
					    result.data.smallPic="";
					    cordova.sino.confirmIDCardInfo(function(result){
					        if(result.success){
								if(result.data.ok){
									if(result.data.isFront){
										if(sessionStorage.getItem("Phone_card")!=result.data.Id){
										   mui.confirm("您的证件号码与登录环节录入信息不一致，是否同意覆盖并用该证件号码进行登录","Tip",["否","是"],function(e){
											    if(e.index==1){
												     Clients.postClientAjax(url.zx_verfiyOCR,{chequeno:result.data.Id},function(data){
												       
												        if(data.success){
													        $("#clntsurnm").val(result.data.Name);
															if(result.data.Sex=="女"){
															    $(".female").trigger("click");
																$(".female").attr("data-sexy-type","F");
															}
															else{
																$(".male").trigger("click");
																$(".male").attr("data-sexy-type","M");
															}
															$("#idType1").val("身份证");
											                $("#idType1").attr("procflg01","1");
											                $("#uBtdDate").val(result.data.Birthday);
											                if(checkID(result.data.Id)){
													        	$("#identity").val(result.data.Id);
													        	sessionStorage.setItem("Phone_card",result.data.Id); //证件号码
					                                            sessionStorage.setItem("Type_code", "1"); //证件类型
													        }
													        else{
													        	mui.alert("请输入正确格式的身份证号码！");
													        }
		                                                }
												        else{
									                         mui.alert(data.message);
												        }
											        });
										        }
											    else{
											     	 location.hash="#zx_Register";
											    }
									        });
								        }
								        else{
									        $("#clntsurnm").val(result.data.Name);
											if(result.data.Sex=="女"){
											    $(".female").trigger("click");
												$(".female").attr("data-sexy-type","F");
											}
											else{
												$(".male").trigger("click");
												$(".male").attr("data-sexy-type","M");
											}
											$("#idType1").val("身份证");
									        $("#idType1").attr("procflg01","1");
									        $("#uBtdDate").val(result.data.Birthday);
									        if(checkID(result.data.Id)){
									        	$("#identity").val(result.data.Id);
									        	sessionStorage.setItem("Phone_card",result.data.Id); //证件号码
	                                            sessionStorage.setItem("Type_code", "1"); //证件类型
									        }
									        else{
									        	mui.alert("请输入正确格式的身份证号码！");
									        }
								}
									    }
								    else{
								         mui.alert("请扫描正面身份证");
							        }
								
								}
								else{
									scanIDCardInfo();
								}
							}
							else{
								mui.alert("确认身份证信息发生错误,请手动输入!");
							}
						},result.data)
					}
				}

			}
			else{
				mui.alert("扫描身份证信息失败!");
			}
		
		});
}
	
//扫描身份证结束
//扫描银行卡开始
function scanBankCardInfo(){
		cordova.sino.getBankCardInfo(function(result){
			if(result.success){
				if(!result.data.exit){
					if(appVersion==="IOS"){
						if(result.data.ok){
							if(result.data.CardInsName=="中信银行" || result.data.CardInsName=="中国工商银行"){
							                $(".accountTip").hide();
										    var CardNumber=result.data.CardNumber.replace(/\s/g,"");
										    var reg=/^\d{16,19}$/g;
			                                if(reg.test(CardNumber)&&(CardNumber.length==16||CardNumber.length==18||CardNumber.length==19)){
			                                	 $("#bankcount").val(CardNumber);
			                                }
			                                else{
			                                	mui.alert("请输入正确格式的银行卡号！");
			                                }
										   
										    $("#bank").val(result.data.CardInsName);
											if(result.data.CardInsName=="中信银行"){
												$("#bank").attr("bankkey","CITICINDUB");
											}
											if(result.data.CardInsName=="中国工商银行"){
												$("#bank").attr("bankkey","INDU&COMMB");
											}
	
							    }
					    		else{
					    			mui.alert("现阶段只支持中信银行和工商银行");
					    		}
						        	
						}
					}
					else{
					     result.data.bigPic="";
					     result.data.smallPic="";
						 cordova.sino.confirmBankCardInfo(function(result){

							if(result.success){
								if(result.data.ok){
								
									if(result.data.CardInsName=="中信银行" || result.data.CardInsName=="中国工商银行"){
									
//									   
											    $(".accountTip").hide();
										        var CardNumber=result.data.CardNumber.replace(/\s/g,"");
											    var reg=/^\d{16,19}$/g;
				                                if(reg.test(CardNumber)&&(CardNumber.length==16||CardNumber.length==18||CardNumber.length==19)){
				                                	 $("#bankcount").val(CardNumber);
				                                }
				                                else{
				                                	mui.alert("请输入正确格式的银行卡号！");
				                                }
											    $("#bank").val(result.data.CardInsName);
												if(result.data.CardInsName=="中信银行"){
													$("#bank").attr("bankkey","CITICINDUB");
												}
												if(result.data.CardInsName=="中国工商银行"){
													$("#bank").attr("bankkey","INDU&COMMB");
												}
//									
											
								    }
						    		else{
						    			mui.alert("现阶段只支持中信银行和工商银行");
						    		}
							    }
								else{
									scanBankCardInfo();
								}
								
							}
							else{
								mui.alert("确认银行卡信息发生错误!");
							}
						},result.data);
					}
				}
			}
			else{
				mui.alert("扫描银行卡信息失败!");
			}
				
		})
	}
//扫描银行卡结束
//初始化出生日期，默认为当前时间，今天
function initShowDate(){
	   	var mydate = new Date();
	   	var year=mydate.getFullYear();
	   	var m=mydate.getMonth()+1;
	   	m=m<10?"0"+m:m;
	   	var d=mydate.getDate();
	   	d=d<10?"0"+d:d;
	  
		return year+"-"+m+"-"+d;

	
}
//日期去杠开始
function removeDate(str){
	return str.replace(/-/g,"");
}
//日期去杠结束
//收起键盘开始
function closeIme(){
    $("#clntsurnm").blur();
	$("#identity").blur();
	$("#phone").blur();
	$("#telphonenum").blur();
	$("#addDetail").blur();
	$("#eMail").blur();
	$("#bankcount").blur();
}
//收起键盘结束
//移除placeholder开始
function removePlaceholder(){
	 $("#refererId").removeAttr("placeholder");
	 $("#clntsurnm").removeAttr("placeholder");
	 $("#addDetail").removeAttr("placeholder");
	 $("#refererNumber").removeAttr("placeholder");
	 $("#phone").removeAttr("placeholder");
	 $("#eMail").removeAttr("placeholder");
	 $("#importPer").removeAttr("placeholder");
	 $("#importPerCall").removeAttr("placeholder");
}
//移除placeholder结束
//判断引荐人和直辖主管的职级开始
function judgeDuty(){
	var state1=true;
    if($(".exist").hasClass("referer_active")&&$("#refererNumber").val()!=""){
    	    
		   
		    if(!sessionStorage.getItem("dutydeg1")){
		   	       var company=$("#apart2").attr("company");
				   var branch=$("#apart2").attr("branch");
				   var agentNum=$("#refererNumber").val();
				   refererName=$("#refererName").val();
				   refererId=$("#refererId").val();
				
				   var data={company:company,branch:branch,agentNum:agentNum};
				   Clients.postClientAjax(url.zx_inforRegister_teamRelation,data,function(data){
					    console.log(data);
					 
					    if(data.success){
					    	if(data.data){
					    		var d=JSON.parse(data.data);
						   	 	if(d.statuz=="****" ){
						   	 	 	 dutydeg1=d.dutyDec;
						   	 	}
					    	}
					   	}
					    else{
					    	mui.alert(data.message);
					    }
				   	
				   });
		    }
			else{
			   	  dutydeg1=sessionStorage.getItem("dutydeg1");
			}
		 
		   
			if(dutydeg1){
			
				var job1=$("#job1").attr("dutydeg");
				if(dutydeg1 && $("#job1").attr("dutydeg") && $("#job1").val()){
	    			var num1;
	    			var num2;
	    		   
	    			for(var j=0;j<referDuty.length;j++){
	    			
	    	
	    				if(referDuty[j].dutydeg==dutydeg1){
	    				
	    					num1=referDuty[j].num;
	    					break;
	    				}
	    			}	
	    			for(var z=0;z<referDuty.length;z++){
	    				if(referDuty[z].dutydeg==$("#job1").attr("dutydeg")){
	    					num2=referDuty[z].num;
	    					break;
	    				}
	    				
	    				
	    		   }
	    	      
	    			if(num1&&num2&&Number(num1)<Number(num2)){
	    				  
	    					mui.alert("引荐人职级低于您的职级，请重新录入");
	    					$("#refererId").val("");
	    					$("#refererNumber").val("");
	    					$("#refererName").val("");
	    					$(".bNum").val("");
	    					$(".bName").val("");
	    				    state1=false;
	    					 if(state==0){
							    	if(getTeamValue()){
							          $("#stopWrite3").hide();
							          $(".idTip").css("display","none");
									  $(".bossTip").css("display","none");
									  $(".topTip").css("display","none");
							     
								     }
								    else{
							             $("#stopWrite3").show();
							             $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
							
								    } 
							 }
	    					
	    					
	    			}
	    			else{
	    				 state1=true;
	    			}
    			
    			
    		    }
			}
				
			
			
			
		    
		
		  

     }
	else if($(".bNum").eq(0).val()!=""){
		     
			if(!sessionStorage.getItem("dutydeg2")){
				 var company=$("#apart2").attr("company");
				 var branch=$("#apart2").attr("branch");
				 var agentNum=$(".bNum").eq(0).val();
		         var data={company:company,branch:branch,agentNum:agentNum};
	             Clients.postClientAjax(url.zx_inforRegister_teamRelation,data,function(data){
	             	   if(data.success){
	             	     	if(data.data){
	             	     		var d=JSON.parse(data.data);
						   	 	if(d.statuz=="****"){
						   	 	 	 
						   	 	 	 dutydeg2=d.dutyDec;
						   	 	 	
						   	 	}
	             	     	}
					   	}
	             	   else{
					    	mui.alert(data.message);
					    }
	             });
		   	   
				
				
		    }
			else{
			   	  dutydeg2=sessionStorage.getItem("dutydeg2");
			}
		    if(dutydeg2){
		    	var job2=$("#job1").attr("dutydeg");
		        if(dutydeg2 && $("#job1").attr("dutydeg") && $("#job1").val()){
    			var num3;
    			var num4;
    		   
    			for(var j=0;j<referDuty.length;j++){
    				
    				if(referDuty[j].dutydeg==dutydeg2){
    					num3=referDuty[j].num;
    					break;
    				}
    			}	
    			for(var j=0;j<referDuty.length;j++){
    				if(referDuty[j].dutydeg==$("#job1").attr("dutydeg")){
    					num4=referDuty[j].num;
    					break;
    				}
    				
    				
    		   }
    	    
    			if(num3&&num4&&Number(num3)<Number(num4)){
    				  
    					mui.alert("直辖主管职级低于您的职级，请重新录入");
    					$("#refererId").val("");
    					$("#refererNumber").val("");
    					$("#refererName").val("");
    					$(".bNum").val("");
    					$(".bName").val("");
    					 if(state==0){
						    	if(getTeamValue()){
						          $("#stopWrite3").hide();
						          $(".idTip").css("display","none");
								  $(".bossTip").css("display","none");
								  $(".topTip").css("display","none");
						     
							     }
							    else{
						             $("#stopWrite3").show();
						             $("#stopWrite3").css("top",($(".referers").height()+445)+"px");
						
							    } 
						 }
    					 state1=false;
    			}
    			else{
    				 state1=true;
    			}
    			
    		}
		    }
			
	        
		
	}
 
    return state1;

}
//判断引荐人和直辖主管的职级结束
//下一步时判断输入信息是否完整开始
function judgeInfoComplete(){
	var flag = true;
    if ($("#apart1").val() == "") {
		mui.toast('请填写分公司信息');
		flag = false;
		
	}
	else{
		if ($("#apart2").val() == "") {
		mui.toast('请填写中支信息');
		flag = false;
	   }
		else{
			if ($("#apart3").val() == "") {
				mui.toast('请填写营销服务部门信息');
				flag = false;
	        }
			else{
				if ($(".exist").hasClass("referer_active") && $("#refererId").val() == "" && $("#refererNumber").val() == "") {
					mui.toast('请填写引荐人身份证号或工号信息');
					flag = false;
             	}
				else{
					if ($("#refererName").val() == "" && $(".exist").hasClass("referer_active")) {
							mui.toast('请填写引荐人姓名信息');
							flag = false;
	                }
					else{
						if ($("#refererName").val() == "" && $(".exist").hasClass("referer_active")) {
								mui.toast('请填写引荐人姓名信息');
								flag = false;
	                     }
						else{
							
							if ($(".referers").children().eq(1).find("input").eq(0).val() == ""&& $(".exist").hasClass("referer_active")) {
									mui.toast('请填写直辖主管工号信息');
									flag = false;
	                         }
							else{
								 	if ($(".referers").children().eq(1).find("input").eq(1).val() == ""&&$(".exist").hasClass("referer_active")) {
										mui.toast('请填写直辖主管姓名信息');
										flag = false;
	                                } 
	                                else{
	                                		if ($(".referers").children().eq(2).find("input").eq(0).val() == ""&&$(".exist").hasClass("referer_active")) {
										//		mui.alert('请填写团队最高主管工号信息');
												flag = false;
											}
	                                		else{
	                                				if ($(".referers").children().eq(2).find("input").eq(1).val() == ""&&$(".exist").hasClass("referer_active")) {
													//		mui.alert('请填写团队最高主管姓名信息');
															flag = false;
												    }
	                                				else{
	                                						if ($("#clntsurnm").val() == "") {
																	mui.toast('请填写基本信息处姓名信息');
																	flag = false;
															}
	                                						else{
																                                							
																if ($("#job1").val() == "") {
																	mui.toast('请填写申请职级信息');
																	flag = false;
																}
																else{
																		if ($("#country1").val() == "") {
																				mui.toast('请填写国籍信息');
																				flag = false;
																		}
																		else{
																			
																				if ($("#idType1").val() == "") {
																					mui.toast('请填写证件类型信息');
																					flag = false;
																				}
																				else{
																					if ($("#identity").val() == "") {
																							mui.toast('请填写证件号码信息');
																							flag = false;
																				    }
																					else{
																						if ($("#uBtdDate").val() == "") {
																							mui.toast('请填写出生日期信息');
																							flag = false;
																						}
																						else{
																								if ($("#marriedState").val() == "") {
																									mui.toast('请填写婚姻状况信息');
																									flag = false;
																								}
																								else{
																										if ($("#education").val()  == "") {
																												mui.toast('请填写学历信息');
																												flag = false;
																										}
																										else{
																												if ($("#political").val()  == "") {
																													mui.toast('请填写政治面貌信息');
																													flag = false;
																												}
																												else{
																													    var code=sessionStorage.getItem("Type_code");
																														if ((code=="1"||code=="2"||code=="3"||code=="5"||code=="6"||code=="7"||code=="8")&&$("#accountType").val() == "") {
																																mui.toast('请填写户口类型信息');
																																flag = false;
																													    }
																														else{
																															if ($("#people").val() == "") {
																																mui.toast('请填写民族信息');
																																flag = false;
																															}
																															else{
																																if ($("#place").val() == "") {
																																	mui.toast('请填写地址信息');
																																	flag = false;
																																}
																																else{
																																	if ($("#addDetail").val() == "") {
																																		mui.toast('请填写详细地址信息');
																																		flag = false;
																																	}
																																	else{
																																		if ($("#postcode").val() == "") {
																																				mui.toast('请填写邮递区号信息');
																																				flag = false;
																																		}
																																		else{
																																				if ($("#bankcount").val() == "") {
																																					mui.toast('请填写银行账号信息');
																																					flag = false;
																																				}
																																				else{
																																					
																																					if ($("#bank").val() == "") {
																																						mui.toast('请填写银行名称信息');
																																						flag = false;
																																					}
																																					else{
																																						if ($("#source").val() == "") {
																																							mui.toast('请填写营销员来源信息');
																																							flag = false;
																																						}
																																					}
																																				}
																																		}
																																	}
																																}
																															}
																														}
																												}
																										}
																								}
																							
																						}
																					}
																				}
																		}
																}
	                                						}
	                                					
	                                				}
	                                				
	                                			
	                                		}
	                                }
							}
							
						}
						
					}
				}
				
			}
		}
		
	}
	return flag;
}
//下一步时判断输入信息是否完整结束
