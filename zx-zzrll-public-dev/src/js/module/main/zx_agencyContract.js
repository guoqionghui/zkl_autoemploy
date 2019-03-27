//var contractUrl=sessionStorage.getItem("contractUrl");//获取资料签署页面请求代理合同图片的session
var pdfData= JSON.parse(sessionStorage.getItem("contract"));//请求代理合同传的参数(分公司名称、乙方身份在号、详细地址、邮编、履约保证金)
var pdfUrl;
$(document).ready(function() {
	init();
});
function init(){
	var flag = sessionStorage.getItem("flag");//获取从哪个页面返回的标识 资料页面为true，附件上传页面为false
	flag=true;//代理合同页面为true
	Clients.postClientAjax(url.zx_signContractInit+"?time="+new Date().getTime(),pdfData,getSignContractInitData);
	//点击资料页面的返回键设置标识为true
	$("#zx_agencyContract .mui-pull-left").click(function(){	
		sessionStorage.setItem("flag",flag);
		//$("#agencyContract").attr("src","");
	});
	// 页面追加src
	//$(".app").append("<img  style='width:100%;height:100%' id='agencyContract'/>");
}                  
//代理合同回调函数
function getSignContractInitData(result){
	// 请求自己后台获取的数据，result.data为pdf文件的url地址
	if(result.success){
		// alert(JSON.stringify(result.data));
		pdfUrl=result.data;
		//window.open("前端服务器地址/pdf/web/viewer.html?file=后台服务器地址的pdf")
		 // window.open("http://192.168.43.209:8000/openPdf/web/viewer.html?file=result.data");
		 // window.open("https://test2.citicpruagents.com.cn/autoemploy/pdf/435335465346464546_1.jpg",'_blank');
		$("#agencyContract").attr("src",pdfUrl+"?time=" + new Date().getTime());
		 // window.open("https://test2.citicpruagents.com.cn/autoemploy/openPdf/web/viewer.html?file="+pdfUrl,'_blank');
		// sessionStorage.setItem("contractUrl",pdfUrl);
		 //location.hash="#zx_agencyContract"
	}else{
		mui.alert("文件不存在");
	}
}