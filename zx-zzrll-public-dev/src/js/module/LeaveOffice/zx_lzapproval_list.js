var DatePicker;//时间选择器
var fHtml;//我的待办列表 li html
var sHtml;//历史记录列表 li html
var upcoming="p";//传参 p为待办,f为历史记录
var record="f";//传参 p为待办,f为历史记录
var statusData;// 查询条件的数据
var stateFlage = sessionStorage.getItem("strus");//获取session是从待办或者历史记录的标识
var stateConditionFlage = sessionStorage.getItem("statusCondition");// 获取session查询条件的数据的标识
var agentNum=sessionStorage.getItem("gentNum");
var pageNo=1;
var pageCount=0;
var identityEvent=0;//辨别是我的代办或历史记录 还是确认按钮点击的
$(document).ready(function() {
    init();
});
//初始化页面
function init(){
	
    //调用绑定事件
    eventBind();
    fHtml=$(".upcoming ul").html();
    sHtml=$(".record ul").html();
    //调用mui选择器函数
    selectors();
    //进入页面清空数据
    $(".upcoming ul li").css("display","none");
    $(".record ul li").css("display","none");    
}

//事件绑定函数
function eventBind(){
    //点击时返回，清除缓存
    $("#zx_approval_list .back").click(function(){
        sessionStorage.removeItem('strus');
        sessionStorage.removeItem('statusCondition');
    })
  
    // 判断是否下个页面是从历史记录返回的s
    if(stateFlage =="f"){
    	
        if(stateConditionFlage){
            var data = JSON.parse(stateConditionFlage);
            recordConditionData(data);
      
            
        }else{
            var data = {
                strus:record,
               // agentNum:agentNum,
	            clntsurNm:"",
	            statusNo:"",
	            startDate:"",
	            endDate:"",
	            pageNo:1
            }
            recordInitData(data);
        }
        //  选项卡历史记录
        $(".table li:first-of-type").removeClass("cur");
        $(".table li:last-of-type").addClass('cur');
        $(".tab-bar .line-first").css("display","none");
        $(".tab-bar .line-second").css("display","block");
        $(".upcoming ").css("display","none");
        $(".record ").css("display","block");   
    }else if(stateFlage =="p"){
        if(stateConditionFlage){
            var data = JSON.parse(stateConditionFlage);
            upcomingConditionData(data);
           
        }else{
         
            var data = {
                strus:upcoming,
                //agentNum:agentNum,
	            clntsurNm:"",
	            statusNo:"",
	            startDate:"",
	            endDate:"",
	            pageNo:1
            }
            upcomingInitData(data);

        }
        //  选项卡默认选中我的待办
        $(".table li:first-of-type").addClass("cur");
        $(".table li:last-of-type").removeClass('cur');
        $(".tab-bar .line-first").css("display","block");
        $(".tab-bar .line-second").css("display","none");
        $(".upcoming ").css("display","block");
        $(".record ").css("display","none");
    }else{

        //  选项卡默认选中我的待办
        $(".table li:first-of-type").addClass("cur");
        $(".table li:last-of-type").removeClass('cur');
        $(".tab-bar .line-first").css("display","block");
        $(".tab-bar .line-second").css("display","none");
        $(".upcoming ").css("display","block");
        $(".record ").css("display","none");
        var data = {
            strus:upcoming,
            // agentNum:agentNum,
            clntsurNm:"",
            statusNo:"",
            startDate:"",
            endDate:"",
            pageNo:1
        }
        upcomingInitData(data);
    }
    



    //点击搜索出现或隐藏
    $("#search").click(function(){
        $('.search_condition').toggle();
        $(".applicate-name").val("");
        $("#se-approval-state").val("");
        $("#se-approval-state").attr("data-i","");
        $(".start-time input").attr("value","");
    })
    
    
    //点击我的待办 发起请求
    $(".table li:first-of-type").click(function(){
    	identityEvent=0;//判断是否是点击查询按钮
        $(".table li:first-of-type").addClass("cur");
        $(".table li:last-of-type").removeClass('cur');
        $(".tab-bar .line-first").css("display","block");
        $(".tab-bar .line-second").css("display","none");
        $(".upcoming ").css("display","block");
        $(".record ").css("display","none");
        $(".upcoming ul li").remove();
        var data = {
            strus:upcoming,
            // agentNum:agentNum,
            clntsurNm:"",
            statusNo:"",
            startDate:"",
            endDate:"",
            pageNo:1
        }
         sessionStorage.setItem("statusCondition",JSON.stringify(data));
         upcomingInitData(data);
  
    });
    //点击历史记录 发起请求
    $(".table li:last-of-type").click(function(){
    	identityEvent=0;
        $(".table li:first-of-type").removeClass("cur");
        $(".table li:last-of-type").addClass('cur');
        $(".tab-bar .line-first").css("display","none");
        $(".tab-bar .line-second").css("display","block");
        $(".upcoming ").css("display","none");
        $(".record ").css("display","block");
        $(".record ul li").remove();
         var data = {
            strus:record,
            clntsurNm:"",
            statusNo:"",
            startDate:"",
            endDate:"",
            pageNo:1
        }
        sessionStorage.setItem("statusCondition",JSON.stringify(data));
        recordInitData(data);
      
    });
    
    //点击确认按钮请求数据
    $(".btnonclick").click(function(){
    	identityEvent=1;
        //点击确认键后,搜索框隐藏
        $('.search_condition').toggle();
        $(".upcoming ul li").remove();
        $(".record ul li").remove();
        var applicateName=$(".applicate-name").val();
     //   var applicateState=$("#se-approval-state").attr("data-i");
        var startTime=formatDate($(".startTime").val());
        var endTime=formatDate($(".endTime").val());
        if(startTime && endTime){
            var dateBegin=new Date(startTime.slice(0,4),startTime.slice(5,7)-1,startTime.slice(8,10));
            var dateEnd=new Date(endTime.slice(0,4),endTime.slice(5,7)-1,endTime.slice(8,10));
            if(dateEnd-dateBegin<0){
                mui.alert("结束时间不能小于开始时间");
                return;
            }
//          if(Math.floor((dateEnd-dateBegin)/(3600*24*1000))>30){
//              mui.alert("收费日期查询区间不得大于30天");
//              return false;
//          }
        }

        if(applicateName=="请选择"){
        	applicateState="";
        	
        }
        else{
        	 applicateState=$("#se-approval-state").attr("data-i");
        }

        if(applicateName=="请选择"){
        	applicateState="";
       }else{
        	 applicateState=$("#se-approval-state").attr("data-i");
        }

        if($(".table li:first-of-type").hasClass("cur")){           
            var data ={
            	//agentNum:agentNum,
                clntsurNm:applicateName,
                statusNo:applicateState,
                startDate:startTime,
                endDate:endTime,
                strus:upcoming,
                pageNo:1
            }
            statusData = JSON.stringify(data);
            sessionStorage.setItem("statusCondition",statusData);
            upcomingConditionData(data); 
        }else{
            var data ={
            	//agentNum:agentNum,
                clntsurNm:applicateName,
                statusNo:applicateState,
                startDate:startTime,
                endDate:endTime,
                strus:record,
                pageNo:pageNo
            }
            statusData = JSON.stringify(data);
            sessionStorage.setItem("statusCondition",statusData);
            recordConditionData(data); 
        }       
    });
}

//mui选择器
function selectors(){
    /*下拉选择器审核状态*/
    (function(mui, doc) {
        mui.init();
        mui('.mui-input-row input').input();
        mui.ready(function() {
            //普通示例
            userPicker2 = new mui.PopPicker();
            var cancelBtn = document.getElementsByClassName('mui-poppicker-btn-cancel')[0];
            var addH2 = document.createElement("h2");
            addH2.setAttribute("class", "addTitle");
            addH2.innerHTML = "请选择审核状态";
            $(cancelBtn).after(addH2);
            var showBorrowUsing = document.getElementById('se-approval-state');
            var showBank = document.getElementById('inputMask');
            showBank.addEventListener('click', function(event) {
                if($(".table li:first-of-type").hasClass("cur")){
                userPicker2.setData(aprovalState3); //aprovalState 审核状态aprovalState3
            }else{
                userPicker2.setData(aprovalState2); //aprovalState 审核状态
            }
                $("input").blur();
                userPicker2.show(function(items) {
                    showBorrowUsing.value = items[0].text;
                    showBorrowUsing.setAttribute('data-i',items[0].value) ;
          
                });
            }, false);
        });
    })(mui, document);
    //时间选择器  日期 
    (function(mui) {
        mui.init();
        var btns = mui('.uBtdDate');
        btns[0].addEventListener('click', function() {
             var optionsJson = this.getAttribute('data-options') || '{}';           
             var options = JSON.parse(optionsJson);         
                /* 首次显示时实例化组件
                 * 示例为了简洁，将 options 放在了按钮的 dom 上
                 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                 */ 
            DatePicker = new mui.DtPicker(options);
            //$(".mui-dtpicker-header h2.accidenttime").text("请选择起始日期");
            DatePicker.show(function(rs) {              
                    /* * rs.value 拼合后的 valuezz
                     * rs.text 拼合后的 text
                     * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                     * rs.m 月，用法同年
                     * rs.d 日，用法同年
                     * rs.h 时，用法同年
                     * rs.i 分（minutes 的第二个字母），用法同年               
                     statusno.innerText = '选择结果: ' + rs.text;   */  
                var dVlaue=rs.y.value+"/"+rs.m.value+"/"+rs.d.value;
                $('.uBtdDate')[0].setAttribute("value",dVlaue); 
                uBtdDate=true;
                     /** 返回 false 可以阻止选择框的关闭
                     * return false;
                     * 释放组件资源，释放后将将不能再操作组件
                     * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                     * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                     * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。*/
                DatePicker.dispose();
            });             
        }, false);

        
        /*第二个日期选择框*/
        btns[1].addEventListener('click', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';            
            var options = JSON.parse(optionsJson);  
            
                /*
                 * 首次显示时实例化组件
                 * 示例为了简洁，将 options 放在了按钮的 dom 上
                 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                 */ 
            DatePicker = new mui.DtPicker(options);
            $(".mui-dtpicker-header h2.accidenttime").text("请选择终止日期");
            DatePicker.show(function(rs) {              
                    /* * rs.value 拼合后的 value
                     * rs.text 拼合后的 text
                     * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                     * rs.m 月，用法同年
                     * rs.d 日，用法同年
                     * rs.h 时，用法同年
                     * rs.i 分（minutes 的第二个字母），用法同年               
                     statusno.innerText = '选择结果: ' + rs.text;   */  
                var dVlaue=rs.y.value+"/"+rs.m.value+"/"+rs.d.value;
                $('.uBtdDate')[1].setAttribute("value",dVlaue); 
                uBtdDate=true;
                
                     /** 返回 false 可以阻止选择框的关闭
                     * return false;
                     * 释放组件资源，释放后将将不能再操作组件
                     * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                     * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                     * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。*/
                DatePicker.dispose();
            }); 
        }, false);
        //在mui的时间选择器上添加这段代码，解决选择器弹出对次的问题
        if(DatePicker){
            DatePicker.dispose();
        }
    })(mui);
}

//一进页面请求数据回调函数,默认我的待办
function upcomingInitData(dataParam){
	
  
    $(function() {
        //一进页面请求数据,默认我的待办
        Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListUpcomingData);
    })
    //一进页面请求数据回调函数,默认我的待办
    function getApprovalListUpcomingData(data){
//  	alert(JSON.stringify(data));
        $(".upcoming ul li").css("display","none");
        $(".moreData").css("display","none");
        $(".contentScroll").off("scroll");
     
        if(data.success){
        	pageNo=data.page.pageNo;//当前页
        	pageCount=data.page.pageCount;//总页数
            $(".upcoming ul li").remove(); 
            var appListRes=data.data;
            if(appListRes.length>0){
            	for(var i=0;i<appListRes.length;i++){
                    var li =$(fHtml);
                    //申请人姓名
                    li.find(".app-name").html(appListRes[i].clntsurnm);
                    //申请日期
                    li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
                    //当前审批岗名称
                    li.find(".referral-person").html(appListRes[i].linkname);
                    //当前审批状态
                    li.find(".approval-state").html(appListRes[i].statusname);
                    //审批状态英文代号
                    //工号
                    li.attr('applicant',appListRes[i].applicant);
                    //当前审批岗代号
				    //标识待办还是历史记录
                    li.attr('strus',upcoming);
                    li.css("display","block");
                    $(".upcoming ul").append(li);
                }
                $(".contentScroll").scroll(function(event) {
                    var allHeight = $(".app").outerHeight();
                    var cilentHeight = $(".contentScroll").height();
                    var scrollHeight = $(".contentScroll").scrollTop();
                    if (scrollHeight + cilentHeight == allHeight) {
                    	if((pageNo++) == pageCount){
                    		$(".contentScroll").off("scroll");
				            $(".moreData").css("display","block");
                    	}else{
                    		dataParam.pageNo = pageNo;
                            //一进页面请求分页数据,默认我的待办
//                          alert("pageNo"+pageNo);
                            Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListUpcomingData);  
                    	}
                               
                    }
                })
            }

        }else{
           
            $(".contentScroll").off("scroll"); 
            $(".moreData").css("display","block");
        
        }   
    }
}
//
//历史纪录请求数据回调函数
function recordInitData(dataParam){

 
    $(function() {
        //点击历史纪录请求数据
        Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListRecordData);
    })
    //点击历史纪录请求数据回调函数
    function getApprovalListRecordData(data){
   
        $(".record ul li").css("display","none");  
    	$(".moreData").css("display","none");
        $(".contentScroll").off("scroll");
        if(data.success){
        	pageNo=data.page.pageNo;//当前页
        	pageCount=data.page.pageCount;//总页数
            var appListRes=data.data;
            if(appListRes.length>0){
               for(var i=0;i<appListRes.length;i++){
                    var li =$(sHtml);
                    //审批状态英文代号
                    var statusno = appListRes[i].statusno;
                    //申请人姓名
                    li.find(".app-name").html(appListRes[i].clntsurnm);
                    //申请日期
                    li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
                    //当前审批岗名称
                    li.find(".referral-person").html(appListRes[i].linkname);
                    //当前审批状态
                    li.find(".approval-state").html(appListRes[i].statusname);
                    //审批状态英文代号
                    li.attr("volor",statusno);
                    //工号
                    li.attr('applicant',appListRes[i].applicant);
                    //当前审批岗代号
                    li.attr('linkno',appListRes[i].linkno);
                    //标识待办还是历史记录
                    li.attr('strus',record);
                    $(".record  ul").append(li);
                     li.css("display","block");
                }
            
                
                $(".contentScroll").scroll(function(event) {

                    var allHeight = $(".app").outerHeight();

                    var cilentHeight = $(".contentScroll").height();

                    var scrollHeight = $(".contentScroll").scrollTop();
                    
                    if (scrollHeight + cilentHeight == allHeight) {
                    	if((pageNo++) == pageCount){
                    		$(".contentScroll").off("scroll");
				            $(".moreData").css("display","block");
                    	}else{
                    		dataParam.pageNo = pageNo;
                           //点击历史纪录请求数据
//                          alert("pageNo"+pageNo);
                            Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListRecordData);                       
                    	}
                       
                        
                    }
                })
                
            }
           
        }else{

            $(".contentScroll").off("scroll");
            $(".moreData").css("display","block");
           
        }   
    }
}
//点击确认 我的待办回调函数
function upcomingConditionData(dataParam){
//   alert(JSON.stringify(dataParam));
    $(function() {
        //点击确认请求我的待办
        Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListAUData);
    })
    //点击确认请求我的待办回调函数
    function getApprovalListAUData(data){
    	$(".upcoming ul li").css("display","none");
        $(".moreData").css("display","none");
        $(".contentScroll").off("scroll");
        if(data.success){
        	pageNo=data.page.pageNo;//当前页
        	pageCount=data.page.pageCount;//总页数
            var appListRes=data.data;
            if(appListRes.length>0){
                for(var i=0;i<appListRes.length;i++){
                    var li =$(fHtml);
                   //申请人姓名
                    li.find(".app-name").html(appListRes[i].clntsurnm);
                    //申请日期
                    li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
                    //当前审批岗名称
                    li.find(".referral-person").html(appListRes[i].linkname);
                   //当前审批状态
                    li.find(".approval-state").html(appListRes[i].statusname);
                    //审批状态英文代号
                     //工号
                    li.attr('applicant',appListRes[i].applicant);
                    //当前审批岗代号
                    li.attr('linkno',appListRes[i].linkno);
                    //标识待办还是历史记录
                    li.attr('strus',upcoming);
                    li.css("display","block");
                     $(".upcoming ul").append(li);
                }
               
            
                $(".contentScroll").scroll(function(event) {
                     identityEvent=0;
                    var allHeight = $(".app").outerHeight();

                    var cilentHeight = $(".contentScroll").height();

                    var scrollHeight = $(".contentScroll").scrollTop();
                    if (scrollHeight + cilentHeight == allHeight) {
                    	if((pageNo++) == pageCount){
                    		$(".contentScroll").off("scroll");
				            $(".moreData").css("display","block");
                    	}else{
                    		dataParam.pageNo = pageNo;
                           //一进页面请求分页数据,默认我的待办
//                         alert("pageNo"+pageNo);
                           Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListAUData);            
                    	}
                       
                     
                         
                    }
                })
            }

        }else{

            $(".contentScroll").off("scroll");
            if(identityEvent==1){
				mui.alert("查无信息");
			}
			else{
				$(".moreData").css("display", "block");
			}
        
        }   
    }
}


//点击确认 历史记录回调函数
function recordConditionData(dataParam){
	
//  alert(JSON.stringify(dataParam));
    $(function() {
        //点击历史纪录请求数据
        Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListARData);
    })
    //点击历史纪录请求数据回调函数
    function getApprovalListARData(data){
    	$(".record ul li").css("display","none");  
    	$(".moreData").css("display","none");
        $(".contentScroll").off("scroll");
        if(data.success){
        	pageNo=data.page.pageNo;//当前页
        	pageCount=data.page.pageCount;//总页数
             var appListRes=data.data;
            if(appListRes.length>0){
               for(var i=0;i<appListRes.length;i++){
                    var li =$(sHtml);
                    //审批状态英文代号
                    var statusno = appListRes[i].statusno;
                    //申请人姓名
                    li.find(".app-name").html(appListRes[i].clntsurnm);
                    //申请日期
                    li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
                    //当前审批岗名称
                    li.find(".referral-person").html(appListRes[i].linkname);
                   
                    //当前审批状态
                    li.find(".approval-state").html(appListRes[i].statusname);
                    //审批状态英文代号
                    li.attr("volor",statusno);
                    //工号
                    li.attr('applicant',appListRes[i].applicant);
                    //当前审批岗代号
                    li.attr('linkno',appListRes[i].linkno);
                    //标识待办还是历史记录
                    li.attr('strus',record);
                   
                    li.css("display","block"); 
                     $(".record  ul").append(li);
                         
                   
                }
               
              
                $(".contentScroll").scroll(function(event) {
                     identityEvent=0;
                    var allHeight = $(".app").outerHeight();

                    var cilentHeight = $(".contentScroll").height();

                    var scrollHeight = $(".contentScroll").scrollTop();

                  
               
                    if (scrollHeight + cilentHeight == allHeight) {
                    	if((pageNo++) == pageCount){
                    		$(".contentScroll").off("scroll");
				            $(".moreData").css("display","block");
                    	}else{
                    		dataParam.pageNo = pageNo;
                             //点击历史纪录请求数据
                          
                            Clients.postClientAjax(url.zx_lzapproval_list,dataParam,getApprovalListARData);            
                    	}
                      
                                            
                    }
                })
            }

        }else{
//    
            $(".contentScroll").off("scroll");
            if(identityEvent==1){
				mui.alert("查无信息");
			}
			else{
				$(".moreData").css("display", "block");
			}
          
        }   
    }
}

//转换中国标准时间转化成时间格式
function changTime(data){
    var datetime=data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + (data.getDate());
    return datetime;
}
//点击列表进入详情开始
function details(obj){
	
	   //工号
        sessionStorage.setItem("applicant",$(obj).attr("applicant"));
       //当前审批岗代号
        sessionStorage.setItem("linkno",$(obj).attr("linkno"));
       //标识待办还是历史记录
        sessionStorage.setItem("strus",$(obj).attr("strus"));
        location.hash="#zx_leaveBossAudit";
}
//点击列表进入详情结束

//格式化日期开始
function formatDate(str){
	var str1=str.replace(/\//g,"-");
	return str1;
}
//格式化日期结束
//返回管理页面事件
function gomange(){
	location.hash="#zx_manage";
}
