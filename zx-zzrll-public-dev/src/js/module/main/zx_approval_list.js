var DatePicker; //时间选择器
var fHtml; //我的待办列表 li html
var sHtml; //历史记录列表 li html
var upcoming = "p"; //传参 p为待办,f为历史记录
var record = "f"; //传参 p为待办,f为历史记录
var statusData; // 查询条件的数据
var stateFlage = sessionStorage.getItem("strus"); //获取session是从待办或者历史记录的标识
var stateConditionFlage = sessionStorage.getItem("statusCondition"); // 获取session查询条件的数据的标识
var identityEvent=0;//辨别是我的代办或历史记录 还是确认按钮点击的
// var stateFlage = "f"//获取session是从待办或者历史记录的标识

$(document).ready(function() {
	init();
});

//初始化页面
function init() {
	//调用绑定事件
	eventBind();
	fHtml = $(".upcoming ul").html();
	sHtml = $(".record ul").html();                                                                                                                               
	//调用mui选择器函数
	selectors();
	$(".upcoming ul li").css("display","none");
	$(".record ul li").css("display","none");
	//进入页面清空数据
	
}

//事件绑定函数
function eventBind() {
	//点击时返回，清除缓存
	$("#zx_approval_list .mui-btn").click(function() {
			sessionStorage.removeItem('strus');
			sessionStorage.removeItem('statusCondition');
		})
		// 判断是否下个页面是从历史记录返回的
	if (stateFlage == "f") {
		if (stateConditionFlage) {
			var data = JSON.parse(stateConditionFlage);
			recordConditionData(data);
			// Clients.postClientAjax(url.zx_approvalListA,data,getApprovalListARData);

		} else {
			var data = {
				strus: record,
			}
			recordInitData(data);
		}
		//  选项卡历史记录
		$(".table li:first-of-type").removeClass("cur");
		$(".table li:last-of-type").addClass('cur');
		$(".tab-bar .line-first").css("display", "none");
		$(".tab-bar .line-second").css("display", "block");
		$(".upcoming ").css("display", "none");
		$(".record ").css("display", "block");
	} else if (stateFlage == "p") {
		if (stateConditionFlage) {
			var data = JSON.parse(stateConditionFlage);
			upcomingConditionData(data);
			// upcomingInitData(data);
			// Clients.postClientAjax(url.zx_approvalListA,data,getApprovalListAUData);
		} else {
			// Clients.postClientAjax(url.zx_approvalListA,{strus:upcoming},getApprovalListUpcomingData);
			var data = {
				strus: upcoming,
			}
			upcomingInitData(data);

		}
		//  选项卡默认选中我的待办
		$(".table li:first-of-type").addClass("cur");
		$(".table li:last-of-type").removeClass('cur');
		$(".tab-bar .line-first").css("display", "block");
		$(".tab-bar .line-second").css("display", "none");
		$(".upcoming ").css("display", "block");
		$(".record ").css("display", "none");
	} else {
		//  选项卡默认选中我的待办
		$(".table li:first-of-type").addClass("cur");
		$(".table li:last-of-type").removeClass('cur');
		$(".tab-bar .line-first").css("display", "block");
		$(".tab-bar .line-second").css("display", "none");
		$(".upcoming ").css("display", "block");
		$(".record ").css("display", "none");
		var data = {
			strus: upcoming,
		}
		upcomingInitData(data);
	}

	//点击搜索出现或隐藏
	$("#search").click(function() {
		$('.search_condition').toggle();
		$(".applicate-name").val("");
		$("#se-approval-state").val("");
		$("#se-approval-state").attr("data-i","");
		$(".start-time input").attr("value", "");
	})

	//点击我的待办 发起请求
	$(".table li:first-of-type").click(function() {
		identityEvent=0;
		$(".table li:first-of-type").addClass("cur");
		$(".table li:last-of-type").removeClass('cur');
		$(".tab-bar .line-first").css("display", "block");
		$(".tab-bar .line-second").css("display", "none");
		$(".upcoming ").css("display", "block");
		$(".record ").css("display", "none");
		$(".upcoming ul li").remove();
		var data = {
			strus: upcoming
		};
		sessionStorage.setItem("statusCondition", JSON.stringify(data));
		upcomingInitData(data);
	});
	//点击历史记录 发起请求
	$(".table li:last-of-type").click(function() {
		identityEvent=0;
		$(".table li:first-of-type").removeClass("cur");
		$(".table li:last-of-type").addClass('cur');
		$(".tab-bar .line-first").css("display", "none");
		$(".tab-bar .line-second").css("display", "block");
		$(".upcoming ").css("display", "none");
		$(".record ").css("display", "block");
		$(".record ul li").remove();
		var data = {
			strus: record
		}
		sessionStorage.setItem("statusCondition", JSON.stringify(data));
		recordInitData(data);
		//Clients.postClientAjax(url.zx_approvalListA,{strus:record},getApprovalListRecordData);
	});

	//点击确认按钮请求数据
	$(".btnonclick").click(function() {
		identityEvent=1;
		//点击确认键后,搜索框隐藏
		$('.search_condition').toggle();
		$(".upcoming ul li").remove();
		$(".record ul li").remove();
		var applicateName = $(".applicate-name").val();
		//var applicateState = $("#se-approval-state").attr("data-i");
		var startTime = $(".startTime").val();
		var endTime = $(".endTime").val();
		if (startTime && endTime) {
			var dateBegin = new Date(startTime.slice(0, 4), startTime.slice(5, 7) - 1, startTime.slice(8, 10));
			var dateEnd = new Date(endTime.slice(0, 4), endTime.slice(5, 7) - 1, endTime.slice(8, 10));
			if (dateEnd - dateBegin < 0) {
				mui.alert("结束时间不能小于开始时间");
				return;
			}
//			if (Math.floor((dateEnd - dateBegin) / (3600 * 24 * 1000)) > 30) {
//				mui.alert("收费日期查询区间不得大于30天");
//				return false;
//			}
		}
		if(applicateName=="请选择"){
        	applicateState="";
       }else{
        	 applicateState=$("#se-approval-state").attr("data-i");
        }
		if ($(".table li:first-of-type").hasClass("cur")) {
			var data = {
				clntsurNm: applicateName,
				statusNo: applicateState,
				startDate: startTime,
				endDate: endTime,
				strus: upcoming
			}
			statusData = JSON.stringify(data);
			sessionStorage.setItem("statusCondition", statusData);
			upcomingConditionData(data);
			// Clients.postClientAjax(url.zx_approvalListA,
			// {clntsurNm:applicateName,statusNo:applicateState,startDate:startTime,endDate:endTime,strus:upcoming},
			// getApprovalListAUData);

		} else {
			var data = {
				clntsurNm: applicateName,
				statusNo: applicateState,
				startDate: startTime,
				endDate: endTime,
				strus: record
			}
			statusData = JSON.stringify(data);
			sessionStorage.setItem("statusCondition", statusData);
			recordConditionData(data);
			// Clients.postClientAjax(url.zx_approvalListA,
			// {clntsurNm:applicateName,statusNo:applicateState,startDate:startTime,endDate:endTime,strus:record},
			// getApprovalListARData);
		}
	});
}

//mui选择器
function selectors() {
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
				if ($(".table li:first-of-type").hasClass("cur")) {
					userPicker2.setData(aprovalState1); //aprovalState 审核状态aprovalState3
				} else {
					userPicker2.setData(aprovalState); //aprovalState 审核状态
				}
				$("input").blur();
				userPicker2.show(function(items) {
					showBorrowUsing.value = items[0].text;
					showBorrowUsing.setAttribute('data-i', items[0].value);
					//返回 false 可以阻止选择框的关闭
					//return false;
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
				var dVlaue = rs.y.value + "/" + rs.m.value + "/" + rs.d.value;
				$('.uBtdDate')[0].setAttribute("value", dVlaue);
				uBtdDate = true;
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
				var dVlaue = rs.y.value + "/" + rs.m.value + "/" + rs.d.value;
				$('.uBtdDate')[1].setAttribute("value", dVlaue);
				uBtdDate = true;

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
		if (DatePicker) {
			DatePicker.dispose();
		}
	})(mui);
}

//一进页面请求数据回调函数,默认我的待办
function upcomingInitData(dataParam) {
	var page = 1;
	$(function() {
			//一进页面请求数据,默认我的待办
			Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListUpcomingData);
	})
		//一进页面请求数据回调函数,默认我的待办
	function getApprovalListUpcomingData(data) {
//	    alert(JSON.stringify(data));
	    $(".moreData").css("display", "none");
		$(".contentScroll").off("scroll");
		if (data.success) {
			// $(".upcoming ul li").remove(); 
			$(".fhtml").css("display", "block");
			var appListRes = data.data.items;
			
			if (appListRes != null) {
				for (var i = 0; i < appListRes.length; i++) {
					var li = $(fHtml);
				
					//审批名称
					li.find(".app-name").html(appListRes[i].clntsurnm);
					//提交申请时间applydate
					li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
					//引荐人linkname
					li.find(".referral-person").html(appListRes[i].linkname);
					//审批结果statusname
					li.find(".approval-state").html(appListRes[i].statusname);
					//对于营销员的审批结果
					// alert(appListRes[i].statusno);
					// li.attr("volor",appListRes[i].statusno);
					//审批证件号
					li.attr('secuityno', appListRes[i].secuityno);
					//判断是待办还是历史记录
					li.attr('strus', upcoming);
					//li.defineProperty(li,"secuityno",{enumerable:false,value:appListRes[i].secuityno});
	                li.attr('strus', upcoming);
	                li.css("display","block");
					$("#zx_approval_list .ul").append(li);
					// $("#zx_approval_list .ul").append("<li volor="+statusno +"secuityno="+appListRes[i].secuityno">"+li.html()+"</li>");		
				}
				//点击li时存进seesion并跳转
				$(".ul li").on('click', function() {
					sessionStorage.setItem("secuityno", $(this).attr("secuityno"));
					sessionStorage.setItem("strus", $(this).attr("strus"));
					location.hash = "#zx_commonAudit";
				});
				page++;
			
				$(".contentScroll").scroll(function(event) {

					var allHeight = $(".app").outerHeight();

					var cilentHeight = $(".contentScroll").height();

					var scrollHeight = $(".contentScroll").scrollTop();
				
					// console.log(parseFloat(allHeight) + "  " + parseFloat(cilentHeight) + "  " + parseFloat(scrollHeight))

					if (scrollHeight + cilentHeight == allHeight) {
						dataParam.pageNo = page;

						//一进页面请求分页数据,默认我的待办
						Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListUpcomingData);
					}
				})
			}
		} else {
//			alert(data.message);
			$(".contentScroll").off("scroll");
			$(".moreData").css("display", "block");
			// $(".upcoming ul li").remove();
		}
	}
}

//历史纪录请求数据回调函数
function recordInitData(dataParam) {
	var page = 1;
	$(function() {
			//点击历史纪录请求数据
			Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListRecordData);
		})
		//点击历史纪录请求数据回调函数
	function getApprovalListRecordData(data) {
		$(".moreData").css("display", "none");
		$(".contentScroll").off("scroll");
		if (data.success) {
			// $(".upcoming ul li").remove(); 
			$(".shtml").css("display", "block");
			var appListRes = data.data.items;
			if (appListRes != null) {
				for (var i = 0; i < appListRes.length; i++) {
					var li = $(fHtml);
					//审批名称
					li.find(".app-name").html(appListRes[i].clntsurnm);
					//提交申请时间applydate
					li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
					//引荐人linkname
					li.find(".referral-person").html(appListRes[i].linkname);
					//审批结果statusname
					li.find(".approval-state").html(appListRes[i].statusname);
					//对于营销员的审批结果
					// alert(appListRes[i].statusno);
					li.attr("volor", appListRes[i].statusno);
					//审批证件号
					li.attr('secuityno', appListRes[i].secuityno);
					//判断是待办还是历史记录
					li.attr('strus', record);
					li.css("display","block");
					//li.defineProperty(li,"secuityno",{enumerable:false,value:appListRes[i].secuityno});
					$(".ul").append(li);
					// $("#zx_approval_list .ul").append("<li volor="+statusno +"secuityno="+appListRes[i].secuityno">"+li.html()+"</li>");		
				}
				//点击li时存进seesion并跳转
				$(".ul li").on('click', function() {
					sessionStorage.setItem("secuityno", $(this).attr("secuityno"));
					var strus = sessionStorage.getItem("strus");
					strus = $(this).attr("strus");
					sessionStorage.setItem("strus", strus);
					location.hash = "#zx_commonAudit";
				});
				page++;
				$(".contentScroll").scroll(function(event) {

					var allHeight = $(".app").outerHeight();

					var cilentHeight = $(".contentScroll").height();

					var scrollHeight = $(".contentScroll").scrollTop();

					// console.log(parseFloat(allHeight) + "  " + parseFloat(cilentHeight) + "  " + parseFloat(scrollHeight))

					if (scrollHeight + cilentHeight == allHeight) {
						dataParam.pageNo = page;
						//点击历史纪录请求数据
						Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListRecordData);
					}
				})
			}
		} else {
//			alert(data.message);
			$(".contentScroll").off("scroll")
			$(".moreData").css("display", "block");
			// mui.alert("查无信息");
			// $(".upcoming ul li").remove();
		}
	}
}
//点击确认 我的待办回调函数
function upcomingConditionData(dataParam) {
	var page = 1;
	$(function() {
			//点击确认请求我的待办
			Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListAUData);
		})
		//点击确认请求我的待办回调函数
	function getApprovalListAUData(data) {
//		alert("identityEvent"+identityEvent);
		$(".moreData").css("display", "none");
		$(".contentScroll").off("scroll");
		if (data.success) {
			// $(".upcoming ul li").remove(); 
			$(".fhtml").css("display", "block");
			var appListRes = data.data.items;
			if (appListRes != null) {
				for (var i = 0; i < appListRes.length; i++) {
					var li = $(fHtml);
					//审批名称
					li.find(".app-name").html(appListRes[i].clntsurnm);
					//提交申请时间applydate
					li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
					//引荐人linkname
					li.find(".referral-person").html(appListRes[i].linkname);
					//审批结果statusname
					li.find(".approval-state").html(appListRes[i].statusname);
					//对于营销员的审批结果
					// alert(appListRes[i].statusno);
					// li.attr("volor",appListRes[i].statusno);
					//审批证件号
					li.attr('secuityno', appListRes[i].secuityno);
					//判断是待办还是历史记录
					li.attr('strus', upcoming);
					//li.defineProperty(li,"secuityno",{enumerable:false,value:appListRes[i].secuityno});
                    li.css("display","block");
					$("#zx_approval_list .ul").append(li);
					// $("#zx_approval_list .ul").append("<li volor="+statusno +"secuityno="+appListRes[i].secuityno">"+li.html()+"</li>");		
				}
				//点击li时存进seesion并跳转
				$(".ul li").on('click', function() {
					sessionStorage.setItem("secuityno", $(this).attr("secuityno"));
					sessionStorage.setItem("strus", $(this).attr("strus"));
					location.hash = "#zx_commonAudit";
				});
				page++;
				$(".contentScroll").scroll(function(event) {
                    identityEvent=0;
					var allHeight = $(".app").outerHeight();

					var cilentHeight = $(".contentScroll").height();

					var scrollHeight = $(".contentScroll").scrollTop();

					// console.log(parseFloat(allHeight) + "  " + parseFloat(cilentHeight) + "  " + parseFloat(scrollHeight))

					if (scrollHeight + cilentHeight == allHeight) {
						dataParam.pageNo = page;
						console.log(page);
						//一进页面请求分页数据,默认我的待办
						Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListAUData);
					}
				})
			}
		} else {
//			alert(data.message);
			$(".contentScroll").off("scroll");
		    if(identityEvent==1){
				mui.alert("查无信息");
			}
			else{
				$(".moreData").css("display", "block");
			}
			
				// $(".upcoming ul li").remove();
		}
	}
}

//点击确认 历史记录回调函数
function recordConditionData(dataParam) {
	var page = 1;
	$(function() {
			//点击历史纪录请求数据
			Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListARData);
		})
		//点击历史纪录请求数据回调函数
	function getApprovalListARData(data) {
//		alert("identityEvent"+identityEvent);
		$(".moreData").css("display", "none");
		$(".contentScroll").off("scroll");
		if (data.success) {
			// $(".upcoming ul li").remove(); 
			$(".shtml").css("display", "block");
			var appListRes = data.data.items;
			if (appListRes != null) {
				for (var i = 0; i < appListRes.length; i++) {
					var li = $(fHtml);
					//审批名称
					li.find(".app-name").html(appListRes[i].clntsurnm);
					//提交申请时间applydate
					li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
					//引荐人linkname
					li.find(".referral-person").html(appListRes[i].linkname);
					//审批结果statusname
					li.find(".approval-state").html(appListRes[i].statusname);
					//对于营销员的审批结果
					// alert(appListRes[i].statusno);
					li.attr("volor", appListRes[i].statusno);
					//审批证件号
					li.attr('secuityno', appListRes[i].secuityno);
					//判断是待办还是历史记录
					li.attr('strus', record);
					//li.defineProperty(li,"secuityno",{enumerable:false,value:appListRes[i].secuityno});
				    li.css("display","block");
					$(".ul").append(li);
					// $("#zx_approval_list .ul").append("<li volor="+statusno +"secuityno="+appListRes[i].secuityno">"+li.html()+"</li>");		
				}
				//点击li时存进seesion并跳转
				$(".ul li").on('click', function() {
					sessionStorage.setItem("secuityno", $(this).attr("secuityno"));
					var strus = sessionStorage.getItem("strus");
					strus = $(this).attr("strus");
					sessionStorage.setItem("strus", strus);
					location.hash = "#zx_commonAudit";
				});
				page++;
				$(".contentScroll").scroll(function(event) {
                    identityEvent=0;
					var allHeight = $(".app").outerHeight();

					var cilentHeight = $(".contentScroll").height();

					var scrollHeight = $(".contentScroll").scrollTop();

					// console.log(parseFloat(allHeight) + "  " + parseFloat(cilentHeight) + "  " + parseFloat(scrollHeight))

					if (scrollHeight + cilentHeight == allHeight) {
						dataParam.pageNo = page;
						//点击历史纪录请求数据
						Clients.postClientAjax(url.zx_approvalListA, dataParam, getApprovalListARData);
					}
				})
			}
		} else {
//			alert(data.message);
			$(".contentScroll").off("scroll")
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
function changTime(data) {
	var datetime = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + (data.getDate());
	return datetime;
}
//返回管理页面事件
function backmange(){
	location.hash="#zx_manage";
}
//一进页面请求数据回调函数,默认我的待办
// function getApprovalListUpcomingData(data){
//     if(data.success){
//         console.log(data);
//     $(".upcoming ul li").remove(); 
//     $(".fhtml").css("display","block");                             
//         var appListRes=data.data.items;
//         if(appListRes!= null){
//             page += 1
//             for(var i=0;i<appListRes.length;i++){
//                 var li =$(fHtml);
//                 //审批状态英文代号
//                 // var statusno = appListRes[i].statusno;
//                 //申请人姓名
//                 li.find(".app-name").html(appListRes[i].name);
//                 //申请日期
//                 li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
//                 //当前审批岗名称
//                 li.find(".referral-person").html(appListRes[i].linkname);
//                 if(appListRes[i].resulttag){
//                     //当前审批状态
//                     li.find(".approval-state").html(appListRes[i].resulttag);
//                     //审批状态英文代号
//                     // li.attr("volor",statusno);
//                     //工号
//                     li.attr('applicant',appListRes[i].applicant);
//                     //当前审批岗代号
//                     li.attr('linkno',appListRes[i].linkno);
//                     //标识待办还是历史记录
//                     li.attr('strus',upcoming);
//                     //li.defineProperty(li,"secuitynum",{enumerable:false,value:appListRes[i].secuityno});
//                 }   
//                 $("#zx_approval_list .ul").append(li);

//                 // $("#zx_approval_list .ul").append("<li volor="+statusno +"secuitynum="+appListRes[i].secuityno">"+li.html()+"</li>");
//             }
//             $(".ul li").on('click',function(){
//                     // alert(JSON.stringify($(this)));
//                     //工号
//                     sessionStorage.setItem("applicant",$(this).attr("applicant"));
//                     //当前审批岗代号
//                     sessionStorage.setItem("linkno",$(this).attr("linkno"));
//                     // var applicant = sessionStorage.getItem("applicant");
//                     // alert(applicant);
//                     //标识待办还是历史记录
//                     sessionStorage.setItem("strus",$(this).attr("strus"));
//                    location.hash="#zx_leaveBossAudit";
//             });
//         }

//     }else{
//         mui.alert("查无信息");
//         $(".upcoming ul li").remove();
//     }   
// }

//点击历史记录请求数据回调函数
// function getApprovalListRecordData(data){   
//     if(data.success){    
//         $(".record ul li").remove();                          
//         var appListRes=data.data.items;
//         if(appListRes!= null){
//             for(var i=0;i<appListRes.length;i++){
//                 var li =$(sHtml);
//                 //审批状态英文代号
//                 var statusno = appListRes[i].statusno;
//                 //申请人姓名
//                 li.find(".app-name").html(appListRes[i].name);
//                 //申请日期
//                 li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
//                 //当前审批岗名称
//                 li.find(".referral-person").html(appListRes[i].linkname);
//                 if(appListRes[i].statusname){
//                     //当前审批状态
//                     li.find(".approval-state").html(appListRes[i].statusname);
//                     //审批状态英文代号
//                     li.attr("volor",statusno);
//                     //工号
//                     li.attr('applicant',appListRes[i].applicant);
//                     //当前审批岗代号
//                     li.attr('linkno',appListRes[i].linkno);
//                     //标识待办还是历史记录
//                     li.attr('strus',record);
//                     //li.defineProperty(li,"secuitynum",{enumerable:false,value:appListRes[i].secuityno});
//                 }   
//                 $("#zx_lzapproval_list .ul").append(li);        
//                 // $("#zx_approval_list .ul").append("<li volor="+statusno +"secuitynum="+appListRes[i].secuityno">"+li.html()+"</li>");
//             }
//             $(".ul li").on('click',function(){
//                     // alert(JSON.stringify($(this)));
//                     //工号
//                     sessionStorage.setItem("applicant",$(this).attr("applicant"));
//                     //当前审批岗代号
//                     sessionStorage.setItem("linkno",$(this).attr("linkno"));
//                     // var applicant = sessionStorage.getItem("applicant");
//                     // alert(applicant);
//                     //标识待办还是历史记录
//                     sessionStorage.setItem("strus",$(this).attr("strus"));
//                    location.hash="#zx_leaveBossAudit";
//             });
//         }else{
//             console.log(没有更多数据了)
//             $(window).off("scroll")
//         }

//     }else{
//         mui.alert("查无信息");
//         $(".record ul li").remove();
//     }   
// }

//点击确认 我的待办数据
// function getApprovalListAUData(data){   
//     if(data.success){
//     $(".upcoming ul li").remove();                             
//         var appListRes=data.data.items;
//         if(appListRes!= null){
//             for(var i=0;i<appListRes.length;i++){
//                 var li =$(fHtml);
//                 //审批状态英文代号
//                 // var statusno = appListRes[i].statusno;
//                 //申请人姓名
//                 li.find(".app-name").html(appListRes[i].name);
//                 //申请日期
//                 li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
//                 //当前审批岗名称
//                 li.find(".referral-person").html(appListRes[i].linkname);
//                 if(appListRes[i].resulttag){
//                     //当前审批状态
//                     li.find(".approval-state").html(appListRes[i].resulttag);
//                     //审批状态英文代号
//                     // li.attr("volor",statusno);
//                     //工号
//                     li.attr('applicant',appListRes[i].applicant);
//                     //当前审批岗代号
//                     li.attr('linkno',appListRes[i].linkno);
//                     //标识待办还是历史记录
//                     li.attr('strus',upcoming);
//                     //li.defineProperty(li,"secuitynum",{enumerable:false,value:appListRes[i].secuityno});
//                 }   
//                 $("#zx_lzapproval_list .ul").append(li);        
//                 // $("#zx_approval_list .ul").append("<li volor="+statusno +"secuitynum="+appListRes[i].secuityno">"+li.html()+"</li>");
//             }
//             $(".ul li").on('click',function(){
//                     // alert(JSON.stringify($(this)));
//                     //工号
//                     sessionStorage.setItem("applicant",$(this).attr("applicant"));
//                     //当前审批岗代号
//                     sessionStorage.setItem("linkno",$(this).attr("linkno"));
//                     // var applicant = sessionStorage.getItem("applicant");
//                     // alert(applicant);
//                     //标识待办还是历史记录
//                     sessionStorage.setItem("strus",$(this).attr("strus"));
//                    location.hash="#zx_leaveBossAudit";
//             });
//         }

//     }else{
//         mui.alert("查无信息");
//         $(".upcoming ul li").remove();
//     }   
// }

//点击确认 历史记录数据
// function getApprovalListARData(data){
//     if(data.success){
//         $(".record ul li").remove();                           
//         var appListRes=data.data.items;
//         if(appListRes!= null){
//             for(var i=0;i<appListRes.length;i++){
//                 var li =$(sHtml);
//                 //审批状态英文代号
//                 var statusno = appListRes[i].statusno;
//                 //申请人姓名
//                 li.find(".app-name").html(appListRes[i].name);
//                 //申请日期
//                 li.find(".app-time").html(changTime(new Date(appListRes[i].applydate)));
//                 //当前审批岗名称
//                 li.find(".referral-person").html(appListRes[i].linkname);
//                 if(appListRes[i].statusname){
//                     //当前审批状态
//                     li.find(".approval-state").html(appListRes[i].statusname);
//                     //审批状态英文代号
//                     li.attr("volor",statusno);
//                     //工号
//                     li.attr('applicant',appListRes[i].applicant);
//                     //当前审批岗代号
//                     li.attr('linkno',appListRes[i].linkno);
//                     //标识待办还是历史记录
//                     li.attr('strus',record);
//                     //li.defineProperty(li,"secuitynum",{enumerable:false,value:appListRes[i].secuityno});
//                 }   
//                 $("#zx_lzapproval_list .ul").append(li);        
//                 // $("#zx_approval_list .ul").append("<li volor="+statusno +"secuitynum="+appListRes[i].secuityno">"+li.html()+"</li>");
//             }
//             $(".ul li").on('click',function(){
//                     // alert(JSON.stringify($(this)));
//                     //工号
//                     sessionStorage.setItem("applicant",$(this).attr("applicant"));
//                     //当前审批岗代号
//                     sessionStorage.setItem("linkno",$(this).attr("linkno"));
//                     // var applicant = sessionStorage.getItem("applicant");
//                     // alert(applicant);
//                     //标识待办还是历史记录
//                     sessionStorage.setItem("strus",$(this).attr("strus"));
//                    location.hash="#zx_leaveBossAudit";
//             });
//         }

//     }else{
//         mui.alert("查无信息");
//         $(".record ul li").remove();
//     }   
// }

// function scrollFn() {
//             //真实内容的高度
//             var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
//             //视窗的高度
//             var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
//             //隐藏的高度
//             var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//             if (flagNoData) { //数据全部加载完了
//                 return;
//             } else if (pageHeight - viewportHeight - scrollHeight < 10) {    //如果满足触发条件，执行
//                 showAjax(page);
//             }
//         }
// $(window).bind("scroll", scrollFn);