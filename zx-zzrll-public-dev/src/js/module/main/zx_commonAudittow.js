$(function(){
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

});
