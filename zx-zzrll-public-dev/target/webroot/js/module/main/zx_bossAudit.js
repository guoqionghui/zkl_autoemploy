function init1(){eduFileOne=$(".eduFiles").html(),prePic=$(".viewPic .mui-slider-item a").html(),$(".viewPic .mui-slider-item a img").remove(),prePicDiv=$(".viewPic .mui-slider-group").html(),$(".viewPic .mui-slider-group .mui-slider-item").remove(),group=$(".viewPic").html(),route_content=$(".route_content").html(),$(".eduFiles img").remove(),$(".otherFile1 img").remove(),$(".otherFile2 img").remove(),$(".otherFile3 img").remove(),$(".route_content ul").remove(),Clients.postClientAjax(url.zx_inforRegister_init,null,getInitData)}function init2(){eventBind();var a=sessionStorage.getItem("secuityno");Clients.postClientAjax(url.zx_commonAudit,{secuityNo:a},getStateData)}function init3(){var a=sessionStorage.getItem("secuityno");Clients.postClientAjax(url.zx_commonAuditUpload,{idNum:a},getFileData)}function getInitData(a){console.log(a),bankData=textChange(a.data.Bank,"bankdesc"),sourceData=textChange(a.data.Counter,"paramname"),jobData=textChange(a.data.Duty,"dutyFname"),educationData=textChange(a.data.Edu,"eduName"),peopleData=textChange(a.data.Ethic,"paramname"),accountData=textChange(a.data.Housetype,"paramname"),countryData=textChange(a.data.Nation,"nationabdc"),politicalData=textChange(a.data.Politic,"paramname")}function textChange(a,t){for(var e=0;e<a.length;e++){var n=a[e][t];delete a[e][t],a[e].text=n}return a}function getStateData(a){a.success&&getStateCallback(a)}function getStateCallback(a){if(console.log(a),""==a.data.agent.intro_Chequeno&&""==a.data.agent.intro_No&&""==a.data.agent.intro_Name&&$(".import_infor").hide(),a.data.agent.telphonenum&&$("#telphonenum").val(a.data.agent.telphonenum),a.data.agent.procflg01){$("#idType1").attr("procflg01",a.data.agent.procflg01);for(var t=0;t<IDKinds.length;t++)if(IDKinds[t].value==a.data.agent.procflg01){$("#idType1").val(IDKinds[t].text);break}}if(a.data.agent.chequeno&&$("#identity").val(a.data.agent.chequeno),a.data.agent.prodesc02&&$("#apart1").val(a.data.agent.prodesc02),a.data.agent.company&&$("#apart2").val(a.data.agent.company),a.data.agent.branch&&$("#apart2").val(a.data.agent.branch),a.data.agent.agencode&&$("#apart3").val(a.data.agent.agencode),a.data.agent.intro_Chequeno&&($("#refererId").val(a.data.agent.intro_Chequeno.substring(0,4)+"****"+a.data.agent.intro_Chequeno.substring(8)),$(".r_id").html(a.data.agent.intro_Chequeno.substring(0,4)+"****"+a.data.agent.intro_Chequeno.substring(8))),a.data.agent.intro_No&&($("#refererNumber").val(a.data.agent.intro_No),$(".r_number").html(a.data.agent.intro_No)),a.data.agent.intro_Name&&($("#refererName").val(a.data.agent.intro_Name),$(".r_name").html(a.data.agent.intro_Name)),a.data.agent.reportag&&$(".bNum").eq(0).val(a.data.agent.reportag),a.data.agent.reporname&&$(".bName").eq(0).val(a.data.agent.reporname),a.data.agent.groupname&&$(".bName").eq(1).val(a.data.agent.groupname),a.data.agent.groupno&&$(".bNum").eq(1).val(a.data.agent.groupno),a.data.agent.clntsurnm&&($("#clntsurnm").val(a.data.agent.clntsurnm),$(".info_name").html(a.data.agent.clntsurnm)),a.data.agent.dutydeg&&($("#job1").attr("dutydeg",a.data.agent.dutydeg),$(".work").attr("dutydeg",a.data.agent.dutydeg),jobData))for(var t=0;t<jobData.length;t++)if(jobData[t].dutyDeg==a.data.agent.dutydeg){$("#job1").val(jobData[t].text),$(".work").html(jobData[t].text);break}if(a.data.agent.nationab&&($("#country1").attr("nationab",a.data.agent.nationab),countryData))for(var t=0;t<countryData.length;t++)if(countryData[t].nationab==a.data.agent.nationab){$("#country1").val(countryData[t].text);break}if(a.data.agent.birthdate&&$("#uBtdDate").val(a.data.agent.birthdate),a.data.agent.gender){for(var t=0;t<3;t++)if($("#sexy").find(".sexyGroup").eq(t).attr("data-sexy-type")==a.data.agent.gender){$("#sexy").find(".sexyGroup").eq(t).triggerHandler("click");break}$("#sexy").find(".sexyGroup").off("click")}if(a.data.agent.marstatus){$("#marriedState").attr("data-marriedstate-type",a.data.agent.marstatus);for(var t=0;t<marriedData.length;t++)if(marriedData[t].value==a.data.agent.marstatus){$("#marriedState").val(marriedData[t].text);break}}if(a.data.agent.edu_Level&&($("#education").attr("eduLevel",a.data.agent.edu_Level),educationData)){console.log(educationData);for(var t=0;t<educationData.length;t++)if(educationData[t].eduLevel==a.data.agent.edu_Level){$("#education").val(educationData[t].text),$("#education").attr("eduLevel",a.data.agent.edu_Level);break}}if(a.data.agent.politicalcode){var e=a.data.agent.politicalcode.split("-");if(classno=e[0],paramno=e[1],$("#political").attr("classno",classno),$("#political").attr("paramno",paramno),politicalData)for(var t=0;t<politicalData.length;t++)if(politicalData[t].classno==classno&&politicalData[t].paramno==paramno){$("#political").val(politicalData[t].text);break}}if(a.data.agent.housetype){var n=a.data.agent.housetype.split("-");if(classno=n[0],paramno=n[1],$("#accountType").attr("classno",classno),$("#accountType").attr("paramno",paramno),accountData)for(var t=0;t<accountData.length;t++)if(accountData[t].classno==classno&&accountData[t].paramno==paramno){$("#accountType").val(accountData[t].text);break}}if(a.data.agent.ethnic){var i=a.data.agent.ethnic.split("-");if(classno=i[0],paramno=i[1],$("#people").attr("classno",classno),$("#people").attr("paramno",paramno),peopleData)for(var t=0;t<peopleData.length;t++)if(peopleData[t].classno==classno&&peopleData[t].paramno==paramno){$("#people").val(peopleData[t].text);break}}if(a.data.agent.counter){var o=a.data.agent.counter.split("-");if(classno=o[0],paramno=o[1],$("#source").attr("classno",classno),$("#source").attr("paramno",paramno),sourceData)for(var t=0;t<sourceData.length;t++)if(sourceData[t].classno==classno&&sourceData[t].paramno==paramno){$("#source").val(sourceData[t].text);break}}if(a.data.agent.homephone&&$("#phone").val(a.data.agent.homephone),a.data.agent.addtress){var l=a.data.agent.addtress.split(" ");$("#place").val(l[0]),$("#addDetail").val(l[1])}if(a.data.agent.postcode&&$("#postcode").val(a.data.agent.postcode),a.data.agent.email&&$("#eMail").val(a.data.agent.email),a.data.agent.bankcount&&$("#bankcount").val(a.data.agent.bankcount),a.data.agent.bankname&&($("#bank").attr("bankkey",a.data.agent.bankname),bankData)){console.log(bankData);for(var t=0;t<bankData.length;t++)bankData[t].bankkey==a.data.bankname&&$("#bank").val(bankData[t].text)}if(a.data.zlocusList)for(var t=0;t<a.data.zlocusList.length;t++){var r=$(route_content);r.find("li span:nth-of-type(1)").html(a.data.zlocusList[t].linkname),r.find("li span:nth-of-type(2)").html(a.data.zlocusList[t].opinion);var s=changTime(new Date(a.data.zlocusList[t].updatedate));r.find("li span:nth-of-type(3)").html(s),r.find("div").html(a.data.zlocusList[t].opinion),$(".route_content").append(r)}}function getFileData(a){console.log(a),a.success&&fileCallback(a)}function fileCallback(a){for(var t=a.list,e=[],n=[],i=[],o=[],l=[],r=0;r<t.length;r++)"010100"==t[r].pictype&&$("#zx_bossAudit .idFront").find("img").attr("src",t[r].picpath),"010101"==t[r].pictype&&$("#zx_bossAudit .idBack").find("img").attr("src",t[r].picpath),"0201"==t[r].pictype.slice(0,4)&&(e[e.length]=t[r].picpath),"0301"==t[r].pictype.slice(0,4)&&$(" #zx_bossAudit .bankFront").find("img").attr("src",t[r].picpath),"0401"==t[r].pictype.slice(0,4)&&(n[n.length]=t[r].picpath),"0501"==t[r].pictype.slice(0,4)&&(i[i.length]=t[r].picpath),"0601"==t[r].pictype.slice(0,4)&&(o[o.length]=t[r].picpath),"0701"==t[r].pictype.slice(0,4)&&(l[l.length]=t[r].picpath);if(e.length)for(var s=0;s<e.length;s++){e.length>1?$(".eduFiles").next().html(e.length).show():$(".eduFiles").next().hide();var d=$(eduFileOne).attr("src",e[s]);$(" #zx_bossAudit .eduFiles").append(d)}if(n.length)for(var c=0;c<n.length;c++){n.length>1?$(".apartFiles").next().html(n.length).show():$(".apartFiles").next().hide();var u=$(eduFileOne).attr("src",n[c]);$(" #zx_bossAudit .apartFiles").append(u)}if(i.length)for(var p=0;p<i.length;p++){i.length>1?$(".otherFile1").next().html(i.length).show():$(".otherFile1").next().hide();var g=$(eduFileOne).attr("src",i[p]);$(" #zx_bossAudit .otherFile1").append(g)}if(o.length)for(var m=0;m<o.length;m++){o.length>1?$(".otherFile2").next().html(o.length).show():$(".otherFile2").next().hide();var h=$(eduFileOne).attr("src",o[m]);$(" #zx_bossAudit .otherFile2").append(h)}if(l.length)for(var v=0;v<l.length;v++){l.length>1?$(".otherFile3").next().html(l.length).show():$(".otherFile3").next().hide();var f=$(eduFileOne).attr("src",o[v]);$(" #zx_bossAudit .otherFile3").append(f)}}function eventBind(){$("#zx_bossAudit .route_title li span:nth-of-type(2)").click(function(){$("#zx_bossAudit .route_content").slideToggle("fast")}),$(".apartment").on("click",function(){"none"==$(".referers").css("display")?$(".referers").slideDown():$(".referers").slideUp()}),$(".information").on("click",function(){"none"==$(".informationDetail").css("display")?$(".informationDetail").slideDown():$(".informationDetail").slideUp()}),$(".upload").on("click",function(){"none"==$(".uploadDetail").css("display")?$(".uploadDetail").slideDown():$(".uploadDetail").slideUp()}),$("#zx_bossAudit .sexyGroup").click(function(){$(".male").removeClass("sexyActive "),$(".female").removeClass("sexyActive "),$(".unclear").removeClass("sexyActive "),$(this).addClass("sexyActive")}),$("#okPass").find("button").click(function(){var a,t=sessionStorage.getItem("secuityno");return""==$(".advise_input").find("textarea").val()?(mui.alert("请输入审批意见"),void(a=$(".advise_input").find("textarea").val())):void Clients.postClientAjax(url.zx_commonAuditPass,{secuityNo:t,option:a},function(){mui.alert("提交成功!"),location.hash="#zx_approval_list"})}),$("#noPass").find("button").click(function(){var a,t=sessionStorage.getItem("secuityno");return""==$(".advise_input").find("textarea").val()?(mui.alert("请输入审批意见"),void(a=$(".advise_input").find("textarea").val())):void Clients.postClientAjax(url.zx_commonAuditUnPass,{secuityNo:t,option:a},function(){mui.alert("提交成功!"),location.hash="#zx_approval_list"})}),$("#returnApp").find("button").click(function(){var a,t=sessionStorage.getItem("secuityno");return""==$(".advise_input").find("textarea").val()?(mui.alert("请输入审批意见"),void(a=$(".advise_input").find("textarea").val())):void Clients.postClientAjax(url.zx_commonAuditReturn,{secuityNo:t,option:a},function(){mui.alert("提交成功!"),location.hash="#zx_approval_list"})}),$(" #zx_bossAudit .uploadDetail li").find("div:nth-of-type(2)").find("img").on("click",function(){$("#global-shadow").html("");for(var a=$(group),t=$(this).parent().children(),e=0;e<t.length;e++){var n=$(prePic),i=$(prePicDiv);n.attr("src",t.eq(e).attr("src")),i.find("a").append(n),a.find(".mui-slider-group").append(i)}$("#global-shadow").html(a),$("#global-shadow").show();var o=mui(".mui-slider");o.slider({interval:0})}),$(" #global-shadow").click(function(){$(this).html("").hide()})}function changTime(a){var t=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+(a.getDate()-1);return t}function showAdvice(a){"block"==$(a).next().css("display")?($(a).next().slideUp(),$(a).children().eq(3).find("img").attr("src","resources/imgs/select-right-gray.jpg")):($(a).next().slideDown(),$(a).children().eq(3).find("img").attr("src","resources/imgs/select-down-gray.jpg"))}$(function(){init1(),init2(),init3()});var bankData,sourceData,jobData,educationData,peopleData,accountData,countryData,politicalData,IDKinds=[{value:"1",text:"身份证"},{value:"2",text:"中国护照"},{value:"3",text:"军官证"},{value:"4",text:"港澳回乡证"},{value:"5",text:"其它"},{value:"6",text:"出生证"},{value:"7",text:"户口本"},{value:"8",text:"士兵证"},{value:"9",text:"台胞证"},{value:"A",text:"外国人永久居留身份证"}],marriedData=[{value:"M",text:"已婚"},{value:"S",text:"未婚"},{value:"N",text:"不明"},{value:"L",text:"离婚"},{value:"G",text:"鳏寡"}],eduFileOne,prePic,group,prePicDiv,route_content,result=[{value:"A",text:"待审批"},{value:"B",text:"审批通过"},{value:"C",text:"审批不通过"}],routeDiv;
//# sourceMappingURL=zx_bossAudit.js.map
