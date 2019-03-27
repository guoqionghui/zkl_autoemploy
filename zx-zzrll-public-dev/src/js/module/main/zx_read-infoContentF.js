$(document).ready(function() {
	//	进入页面,保持是否选择的样式
	// var refF;
	var aefF = sessionStorage.getItem("aefF");//获取session 是否已经阅读资料标识
	var flag = sessionStorage.getItem("flag");//获取从哪个页面返回的标识 资料页面为true，附件上传页面为false
	flag=true;//资料页面为true
	//点击资料页面的返回键设置标识为true
	$("#zx_read-infoContentF .mui-pull-left").click(function(){		
		sessionStorage.setItem("flag",flag);
	});
	
	//判断是否存在审批状态 获取session
	if(sessionStorage.getItem("stutas")||sessionStorage.getItem("payref")){
		var personState=sessionStorage.getItem("stutas");
		// alert(personState);
		//AI为审批中，审批中不能修改信息
	   if(personState=="AI"||sessionStorage.getItem("payref")=="PY"){
			$(".readOne").addClass('read');
			$('.check-confirm').unbind();		    
		}
		//返回申请人或者审批不通过
		else{
			if(aefF == '1'){
				//在没有审批状态下，判断是否已经阅读过资料
				$(".readOne").addClass('read');			
			}else{
				//在还未可阅读过资料下的看状态
				$('.readOne').removeClass('read');
			}
			//点击本人确认方框
			$('.check-confirm').click(function() {
				$('.check-confirm span').toggleClass('read');
				//判断是否含有"read"，设置sessionStorage
				if ($('.check-confirm span').hasClass('read')) {
					sessionStorage.setItem("infoReadStateF", "1");
				} else {
					sessionStorage.setItem("infoReadStateF", "0");
				}
			});				
		}    
	}else if(aefF == '1') {
		//在没有审批状态下，判断是否已经阅读过资料
		$(".readOne").addClass('read');
		//点击本人确认方框
		$('.check-confirm').click(function() {
			$('.check-confirm span').toggleClass('read');
			//判断是否含有"read"，设置sessionStorage
			if ($('.check-confirm span').hasClass('read')) {
				sessionStorage.setItem("infoReadStateF", "1");
			} else {
				sessionStorage.setItem("infoReadStateF", "0");
			}
		});
	}else {
		//在还未可阅读过资料下的看状态
		$('.readOne').removeClass('read');
		//点击本人确认方框
		$('.check-confirm').click(function() {
			$('.check-confirm span').toggleClass('read');
			//判断是否含有"read"，设置sessionStorage
			if ($('.check-confirm span').hasClass('read')) {
				sessionStorage.setItem("infoReadStateF", "1");
			} else {
				sessionStorage.setItem("infoReadStateF", "0");
			}
		});
	}
	

});