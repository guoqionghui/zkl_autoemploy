function init(){Clients.postClientAjax(url.zx_bankalipayCode,null,getInitData)}function getInitData(e){var n=e.data;bankData=textChange(n,"bankdesc"),userPicker.setData(bankData)}function textChange(e,n){for(var a=0;a<e.length;a++){var t=e[a][n];delete e[a][n],e[a].text=t}return e}function clickEvent(){$alertBankcode=$("#zx_bankAlipay .alertBankcode"),$alertBankcodeText=$("#zx_bankAlipay .alertBankcode span"),$alertopenBank=$("#zx_bankAlipay .alertopenBank"),$alertopenBankText=$("#zx_bankAlipay .alertopenBank span"),$alertBankegion=$("#zx_bankAlipay .alertBankegion"),$alertBankegionText=$("#zx_bankAlipay .alertBankegion span"),$alertBankeType=$("#zx_bankAlipay .alertBankeType"),$alertBankeTypeText=$("#zx_bankAlipay .alertBankeType span"),$alertBankPhone=$("#zx_bankAlipay .alertBankPhone"),$alertBankPhoneText=$("#zx_bankAlipay .alertBankPhone span"),$("#zx_bankAlipay .card-phone").bind("input",function(){var e=$(this).val();e=e.replace(/\D/g,"").replace(/....(?!$)/g,"$& "),$(this).val(e),$alertBankcode.hide()}),$("#zx_bankAlipay .valCode").bind("input",function(){$alertBankPhone.hide()}),$("#zx_bankAlipay .card-phone").blur("input",function(){var e=$(this).val();e=e.replace(/\D/g,"");var n=/^(\d{16}|\d{19})$/;""==$(this).val()?($alertBankcode.hide(),$alertBankcodeText.text("请输入银行卡号"),BankCode=!1):0==n.test(e)?($alertBankcodeText.text("银行卡位数不对，请输入正确的银行卡号"),$alertBankcode.show(),BankCode=!1):($alertBankcode.hide(),BankCode=!0)}),$("#zx_bankAlipay .countBtn").click(function(){var e=/^1\d{10}$/;e.test(Bankphone)?(sendPhone=Bankphone,telphonenum={telphonenum:Bankphone,messageType:"BankCode"},validationCode.sendMessage($("#zx_bankAlipay .countBtn")),Clients.postClientAjax(url.zx_Phonecode,telphonenum,getPhonecode),console.log(telphonenum),$alertBankPhone.hide()):""==Bankphone||null==Bankphone||void 0==Bankphone?($alertBankPhone.show(),$alertBankPhoneText.text("手机号码不存在，无法获取验证码")):($alertBankPhone.show(),$alertBankPhoneText.text("手机号码无效，无法获取验证码"))}),function(e,n){e.init(),e(".mui-input-row input").input(),e.ready(function(){userPicker=new e.PopPicker;var n=document.getElementsByClassName("mui-poppicker-btn-cancel")[0],a=document.createElement("h2");a.setAttribute("class","addTitle"),a.innerHTML="请选择开户银行",$(n).after(a);var t=document.getElementById("id-bank");document.getElementById("inputMask");t.addEventListener("tap",function(e){userPicker.show(function(e){t.value=e[0].text,t.dataset.i=e[0].bankcode,BankType=e[0].text,$alertopenBank.hide(),Openbank=!0})},!1),n.addEventListener("tap",function(){t.value?($alertopenBank.hide(),Openbank=!0):($alertopenBank.show(),$alertopenBankText.text("请选择开户银行"),Openbank=!1)},!1)})}(mui,document),function(e,n){e.init(),e(".mui-input-row input").input(),e.ready(function(){userPickertype=new e.PopPicker;var n=document.getElementsByClassName("mui-poppicker-btn-cancel")[1],a=document.createElement("h2");a.setAttribute("class","addTitle"),a.innerHTML="请选择账户类型",$(n).after(a),userPickertype.setData(bankCardKind);var t=document.getElementById("id-BankType");document.getElementById("inputMask");t.addEventListener("tap",function(e){userPickertype.show(function(e){t.value=e[0].text,t.dataset.i=e[0].type,Bankmold=e[0].text,$alertBankeType.hide(),bankAccount=!0})},!1),n.addEventListener("tap",function(){t.value?($alertBankeType.hide(),bankAccount=!0):($alertBankeType.show(),$alertBankeTypeText.text("请选择账户类型"),bankAccount=!1)},!1)})}(mui,document),$("#zx_bankAlipay .Bankbtnonclick").click(function(){isVerifyinfo()})}function onBtnback(){userPicker.dispose(),userPickertype.dispose(),history.go(-1)}function isVerifyinfo(){if(BankCode&&bankAccount&&bankCity&&Openbank){var e=$("#cardPhone").val().replace(/\s/g,"");console.log(e);var n=$("#id-bank").attr("data-i"),a={idNo:phoneCard,amount:payAmount,bankcount:e,bankcode:n};Clients.postClientAjax(url.zx_bankalipayInit,a,getBankalipayData)}else mui.alert("信息有未填写或填写错误！")}function inputAccount(){var e=$("#cardPhone").val();if(e.length>num){var n=e.replace(/\s/g,"");""!=e&&n.length>4&&n.length%4==1&&($("#cardPhone").attr("type","text"),$("#cardPhone").val(e.substring(0,e.length-1)+" "+e.substring(e.length-1,e.length)))}num=e.length}function getPhonecode(e){msincre=299,phoneCode=e.data,console.log(e.data),msinLess()}function getBankalipayData(e){1==e.success?"PY"==e.data?(sessionStorage.setItem("stutas","PY"),location.hash="#zx_approval"):"PI"==e.data?(mui.alert(e.message),$(".Bankbtnonclick").attr("disabled",!0).css("background","#ccc")):"AY"==e.data&&mui.alert(e.message):mui.alert(e.message)}function msinLess(){timer=setInterval(function(){msincre--,0==msincre&&(clearInterval(timer),timer=null)},1e3)}function scanBankCardInfo(){cordova.sino.getBankCardInfo(function(e){e.success?e.data.exit||("IOS"===appVersion?e.data.ok&&($("#bankcount").val(e.data.CardNumber),$("#bank").val(e.data.CardInsName),$("#AccountType").val(e.data.BankCardType)):cordova.sino.confirmBankCardInfo(function(e){e.success?e.data.ok?($("#cardPhone").val(e.data.CardNumber),$("#id-bank").val(e.data.CardInsName),$("#id-BankType").val(e.data.BankCardType)):scanBankCardInfo():mui.alert("确认银行卡信息发生错误:"+e.data.errormsg)},e.data)):mui.alert("扫描银行卡信息失败:"+e.data.errormsg)})}var validationCode={timer:"null",count:59,curCount:null,sendMessage:function(e){var n=this;n.curCount=n.count,e.attr("disabled","true").css("background","#c1c1c1"),e.text(n.curCount+"s"),n.timer=setInterval(function(){n.SetRemainTime(e)},1e3)},SetRemainTime:function(e){var n=this;1==n.curCount?(clearInterval(n.timer),e.removeAttr("disabled").css("background","#fff"),e.text("重新发送")):(n.curCount--,e.text(n.curCount+"s"))}},msincre=100,phoneCode,telphonenum=null,BankType,Openbank=!1,BankCode=!1,bankCity=!1,bankAccount=!1,BankPhone=!1,Bankmold,userPicker,userPickertype,$alertBankcode,$alertBankcodeText,$alertopenBank,$alertopenBankText,$alertBankegion,$alertBankegionText,$alertBankeType,$alertBankeTypeTetxt,$alertBankPhone,$alertBankPhoneText,phoneCard=sessionStorage.getItem("Phone_card"),payAmount=sessionStorage.getItem("payAmount"),Bankphone=sessionStorage.getItem("Phonevode");$(function(){mui(".mui-input-row input").input(),init(),clickEvent()});
//# sourceMappingURL=zx_Bankalipay.js.map
