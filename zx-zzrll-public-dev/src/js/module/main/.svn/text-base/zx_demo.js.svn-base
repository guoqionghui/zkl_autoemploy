$(function () {
//  $('#demoCall').on('click', function () {
//      var data = {
//				width : '320',
//				height : '240',
//				mono : 'true',
//				quality : '50',
//				openFromGallery : 'false',
//				businessType : '1'
//			};
//		var callback = function(result) {
//			$('#demoText').text('调取成功')
//		};
//		cordova.sino.takePhoto(callback, data);
//  })
//
//  $('#demoQ').on('click', function () {
//      var data = {
//          title : '签名',
//          titleSpanFromOffset : '4',
//          titleSpanToOffset : '5',
//          singleWidth : '150',
//          singleHeight : '75',
//          businessType : '1',
//          Identitycardnbr : '1232', //应该是传递用户id
//          username : 'nihao', //用户姓名
//          nessesary : 'false',
//          template_serial : '80_03', //标识号
//          serverConfigRule : '1122'
//      };
//
//      var callback = function(result) {
//          /*if(!result.data.exit){
//              var data = result.data;
//              $("#appntauto").attr('src', 'data:image/png;base64,' + data.signImg);
//              $("#appnt").hide();
//              $("#appntauto").show();
//              signId_21 = data.signImg;
//              AppntSignatureData = data.signatureData;//投保人签名加密数据
//          }*/
//
//          // 正确回调参考上面注释代码
//          $('#demoText').text('签名调取成功')
//      };
//      cordova.sino.digitalSignature(callback, data);
//  });
	/*点击图片事件处理函数*/
    $('#btnGo').on('click', function(){
        var a = $('#demoGo').val()
        window.location.href = 'http://' +a+ ':8000/index.html'
    })
		$("#zx_demo .clickImg").click(function() {
			if ($(this).children("img").attr("data-i") == "1") {
				$("#imgShow").show();
				var imgPath = $(this).children("img").attr("src");
				$("#imgShow img").attr("src", imgPath);
			}
		})
		$("#imgShow").click(function() {
			$(this).hide();
		})
		//绑定点击添加图片事件
		$("#EducationImg").on("change", function() {
			var filePath = $(this).val(), //获取到input的value，里面是文件的路径
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
				imgBase64 = '', //存储图片的imgBase64
				fileObj = document.getElementById('EducationImg').files[0]; //上传文件的对象,要这样写才行，用jquery写法获取不到对象
 
			// 检查是否是图片
			if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
				mui.alert('上传错误,文件格式必须为：png/jpg/jpeg');
				return;
			}

			// 调用函数，对图片进行压缩
			compress(fileObj, function(imgBase64) {
				Xl_education = imgBase64; //获取学历证书照
//				imgID.push(Xl_education);
//				PicTypes.push("020100");
				var data = {
						"CHEQUENO": "13393883321",
						"PicTypes": ["020100"],
						//"PicNos":piNos,
						"fileName": [Xl_education],
					}
				Clients.postClientAjax(url.zx_Jobappimg, data, successUploder);
				$("#Education").attr("src", imgBase64).attr("data-i", "1");
				$("#zx_demo .Educationshow").show();
			});
		});
})
/*上传图片回调函数方法*/
function successUploder(data) {
	if (data.success == true) {
		//mui.alert("OK")
	} else {
		mui.alert(data.message);
	}
}
	// 不对图片进行压缩，直接转成base64
	function directTurnIntoBase64(fileObj, callback) {
		var r = new FileReader();
		// 转成base64
		r.onload = function() {
			//变成字符串
			imgBase64 = r.result;
			console.log(imgBase64);
			callback(imgBase64);
		}
		r.readAsDataURL(fileObj); //转成Base64格式
	}
	// 对图片进行压缩
	function compress(fileObj, callback) {
		if (typeof(FileReader) === 'undefined') {
			console.log("当前浏览器内核不支持base64图标压缩");
			//调用上传方式不压缩  
			directTurnIntoBase64(fileObj, callback);
		} else {
			try {
					//获取照片方向角属性，用户旋转控制
					EXIF.getData(fileObj, function() {
					   // alert(EXIF.pretty(this));
					    EXIF.getAllTags(fileObj); 
					    //alert(EXIF.getTag(this, 'Orientation')); 
					    Orientation = EXIF.getTag(fileObj, 'Orientation');
					    mui.alert(Orientation)
					   // return;
					});
				var reader = new FileReader();
				reader.onload = function(e) {
					var image = $('<img/>');
					image.load(function() {
							square = 700, //定义画布的大小，也就是图片压缩之后的像素
							canvas = document.createElement('canvas'),
							context = canvas.getContext('2d'),
							imageWidth = 0, //压缩图片的大小
							imageHeight = 0,
							offsetX = 0,
							offsetY = 0,
							data = '';

						canvas.width = square;
						canvas.height = square;
						context.clearRect(0, 0, square, square);

						if (this.width > this.height) {
							imageWidth = Math.round(square * this.width / this.height);
							imageHeight = square;
							offsetX = -Math.round((imageWidth - square) / 2);
						} else {
							imageHeight = Math.round(square * this.height / this.width);
							imageWidth = square;
							offsetY = -Math.round((imageHeight - square) / 2);
						}
						context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
						//修复ios
						if (navigator.userAgent.match(/iphone/i)) {
							//alert(expectWidth + ',' + expectHeight);
							//如果方向角不为1，都需要进行旋转 added by lzk                 
							if(Orientation != "" && Orientation != 1){
								switch(Orientation){
								 	case 6://需要顺时针（向左）90度旋转(竖直)
								 		rotateImg(this,'left',canvas);
								 		break;
								 	case 8://需要逆时针（向右）90度旋转
								 		rotateImg(this,'right',canvas);
								 		break;
								 	case 3://需要180度旋转
										 rotateImg(this,'center',canvas);//转两次

										break;
								}		
							}
						}
						//var data = canvas.toDataURL('image/jpeg');
						//压缩完成执行回调  
						data = canvas.toDataURL("image/jpeg");
						callback(data);
					});
					image.attr('src', e.target.result);
				};
				reader.readAsDataURL(fileObj);
			} catch (e) {
				console.log("压缩失败!");
				//调用直接上传方式  不压缩 
				directTurnIntoBase64(fileObj, callback);
			}
		}
	}
	//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {  
		//alert(img);
        //最小与最大旋转方向，图片旋转4次后回到原方向  
        var min_step = 0;  
        var max_step = 3;  
        //var img = document.getElementById(pid);  
        if (img == null)return;  
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
        var height = img.height;  
        var width = img.width;  
        //var step = img.getAttribute('step');  
        var step = 2;  
        if (step == null) {  
            step = min_step;  
        }  
        if (direction == 'right') {  
            step++;  
            //旋转到原位置，即超过最大值  
            step > max_step && (step = min_step);  
        } else if (direction == 'center') {
            step = 2
        } else {  
            step--;  
            step < min_step && (step = max_step);  
        }  
        //img.setAttribute('step', step);  
        /*var canvas = document.getElementById('pic_' + pid);  
        if (canvas == null) {  
            img.style.display = 'none';  
            canvas = document.createElement('canvas');  
            canvas.setAttribute('id', 'pic_' + pid);  
            img.parentNode.appendChild(canvas);  
        }  */
        //旋转角度以弧度值为参数  
        var degree = step * 90 * Math.PI / 180;  
        var ctx = canvas.getContext('2d');  
        switch (step) {  
            case 0:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.drawImage(img, 0, 0);  
                break;  
            case 1:  
                canvas.width = height;  
                canvas.height = width;  
                ctx.rotate(degree);  
                ctx.drawImage(img, 0, -height);  
               
                break;  
            case 2:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, -height);  
                break;  
            case 3:  
                canvas.width = height;  
                canvas.height = width;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, 0);  
                break;  
        }  
    }  
