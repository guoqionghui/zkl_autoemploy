// 获取设备类型，是andriod还是ios
var ua = navigator.userAgent.toLowerCase();
var idagentNum = sessionStorage.getItem("idagentNum");//离职工号
var statusno = sessionStorage.getItem("statusNo");//状态
var clntsurnm = sessionStorage.getItem("clntsurnm");//姓名
/*页面最开始加载执行*/
$(function() {
	init();//初始化
})
/*初始化方法*/
function init(){
	$("#approval-name").html("");
	
		$("#approval-name").html(clntsurnm);
		if(statusno){
			//申请状态代号
		
			 switch(statusno)
			{
			case "LB":$(".change-color").html("正在审批中");
					$(".add").html("，点击文字查看信息");
			  		break;
			case "LC":$(".change-color").html("返回发起人");
			 		 $(".add").html("，点击文字修改申请资料");
			  		break;
			case "LD":$('.remove').empty(".remove");
					 $(".change-color").html("审批不通过");
					 $(".add").html("，点击文字重新申请");
			  		break;
			case "LE":$(".change-color").html("审批完成待销号");
			 		 $(".add").html("，点击文字查看信息");
			  		break;
			case "LF":
					$(".change-color").html("处理中");
					$(".add").html("，点击文字查看信息");
			  		break;	
			case "LG": 
			        $(".change-color").html("审批完成已销号");
			        break;	
			}
			clickEvent();
		}else{
			mui.alert(statusno.message)
		}			
}


//点击头像的事件
function clickEvent(){
	//审批中、返回申请人、审批不通过、 审批完成待销号这三种状态跳转到信息录入页面
	if(statusno=="LB"||statusno=="LC"||statusno=="LD"||statusno=="LE"||statusno=="LF"){
		$(".approval-text").click(function(){
			//判断是andriod还是ios，并跳转到不同的页面
				if (/iphone;|ipad|ipod/.test(ua)) {
					sessionStorage.setItem("statusno", statusno); //状态代号
					sessionStorage.removeItem("flagiden");
					location.hash = "#zx_submitinfo";
				} else if (/android/.test(ua)) {
					sessionStorage.setItem("statusno", statusno); //状态代号
					sessionStorage.removeItem("flagiden");
					location.hash = "#zx_submitinfoaz";
				}	
		});
	}
}

function goRegister(){
	location.hash="zx_manage";

}