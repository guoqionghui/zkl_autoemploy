/**
 * ldy：集成模板数据插件
 */
(function($){
	var compiled = {};
	/**
	 * 直接使用模板替换当前元素的html内容
     * 操作后会将元素中原模板内容清除 同时将模板保存到 data('template') 数据保存在 data('tplData')
	 * @type {Function}
	 */
	$.fn.template = $.fn.tpl = function(data){
        var me = $(this);
        //获取模板
        var template = me.data('template');
        if(me.data('template')){
            template = me.data('template');
        }else if ($(this).hasClass('template')){
            template = me.html();
            me.html('');
            me.removeClass('template');
        }else{
            template = me.find('.template').first().html();
        }
		//保存模板
        $(this).data('template',template);

		if(!compiled[template]) compiled[template] = Handlebars.compile(template);
		$(this).html(compiled[template](data)).data('tplData',data);
	};
	$.fn.template1 = function(data){
		var template = $.trim($(this).first().html());
		if(compiled[template] == undefined){
			compiled[template] = Handlebars.compile(template);
		}
		return $(compiled[template](data));
	};

	/**
	 * 获取元素中
	 * @param data
	 * @returns {*|HTMLElement}
     */
	$.fn.toHtml = function(data){
		var template = $.trim($(this).first().html());
		if(!compiled[template]) compiled[template] = Handlebars.compile(template);
		return $(compiled[template](data));
	}

    $.extend({
        toHtml:function(template,data){
            compiled[template] = Handlebars.compile(template);
            return $(compiled[template](data));
        }
    });

	/*按小数点后多少位格式化数据*/
	function formatFloat(val,token){
		if(val.indexOf(".")>0){
			return val.substring(0,val.indexOf(".")+token);
		}else{
			return val;
		}
	};
	/*用逗号格式化钱*/
	function renderWithComma(val){
		return val.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
	};
	/*转为以万为单位*/
	function rendererZhMoneyWan(v) {
		if(isNaN(v)){
			return v;
		}
		v = v*0.0001;//10000;
		v = formatFloat(v.toString(),3);//parseInt(v);
		return renderWithComma(v)+"万";
	};

    function jsonString(val){
        return JSON.stringify(val);
    }

	function toChineseNum (n){
		var chineseNum = '';
		var shu = ['零','一','二','三','四','五','六','七','八','九'];
		var danwei = ['','十','百','千','万','十','百','千','亿'];
		var lastNotZeroFlag = false;//上一个数不是零为 true
		var ys = 0;
		for(var i=0;n>0;i++){
			ys = n%10;
			n = parseInt(n/10);
			if(ys == 0){
				if(lastNotZeroFlag){
					chineseNum = shu[ys] + chineseNum;
					lastNotZeroFlag = false;
				}
			}else{
				chineseNum = shu[ys] + danwei[i] + chineseNum;
				lastNotZeroFlag = true;
			}
		}

		if(chineseNum.indexOf('一十') == 0){
			chineseNum = chineseNum.substring(1,chineseNum.length);
		}

		return chineseNum;
	}

    Handlebars.registerHelper('jsonString',jsonString);

	/*格式化钱(以万为单位)*/
	Handlebars.registerHelper('formatnumber', function(num, options){
		return rendererZhMoneyWan(num);
	});

	//如果文本长度过长，以省略号显示,截取长度参数为trunLen
	Handlebars.registerHelper('formatTextLength', function(text,trunLen){
		var omitStr = "……";
		if(text!=undefined){
			var newText = $.trim(text);
			if(newText.length>trunLen){
				return newText.substr(0,trunLen)+omitStr;
			}
		}
		return text;
	});

	//如果文本长度过长，以省略号显示,截取长度参数为trunLen
	Handlebars.registerHelper('formatTextLength2', function(text,trunLen){
		var omitStr = "…";
		if(text!=undefined){
			var newText = $.trim(text);
			if(newText.length>trunLen){
				return newText.substr(0,trunLen)+omitStr;
			}
		}
		return text;
	});
	//格式化头像
	Handlebars.registerHelper('formatHeadImg', function(text){
		return rootPath+"/upload/headImg/"+text;
	});
	Handlebars.registerHelper(('formatTypeData'),function(type,supDate,suvDate,createDate){
		//"P":支持；"S":认购；"C":创建的项目；
		if("P"===type){
			return supDate;
		}
		if("S"===type){
			return suvDate;
		}
		if("C"===type){
			return createDate;
		}
	});

	Handlebars.registerHelper(('toChineseNum'),toChineseNum);

	//注册一个比较大小的Helper,判断v1是否大于v2
	Handlebars.registerHelper("equals",function(v1,v2,options){
		if(v1 == v2){
			//满足添加继续执行
			return options.fn(this);
		}else{
			//不满足条件执行{{else}}部分
			return options.inverse(this);
		}
	});
})(jQuery);
