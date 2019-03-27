/*!
2016-08-31 地址三级联动选择器 js
 */

var windowHeight = $(window).height(); //获得当前页面的高度 
var AddressHeight = windowHeight*0.5-80.5;     //获取当前弹窗存放内容的高度

var scrollNumbers =[];  //数组存放三个选中的translateY值
var point =0;          //存放数组下标
var scroNum1=null;//第一个选择器存放三个选中的translateY值
var addPoint1=null;//第一个选择器存放数组下标
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery', 'ChineseDistricts'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'), require('ChineseDistricts'));
    } else {
        // Browser globals.
        factory(jQuery, ChineseDistricts);
    }
})(function ($, ChineseDistricts) {

    'use strict';

    if (typeof ChineseDistricts === 'undefined') {
        throw new Error('The file "city-picker.data.js" must be included first!');
    }

    var NAMESPACE = 'citypicker';
    var EVENT_CHANGE = 'change.' + NAMESPACE;
    var PROVINCE = 'province';
    var CITY = 'city';
    var DISTRICT = 'district';    
    var ADDRESS2 ='';  //用于存放获取的地址的值

    function CityPicker(element, options) {
        this.$element = $(element);
        this.$dropdown = null;
        this.options = $.extend({}, CityPicker.DEFAULTS, $.isPlainObject(options) && options);
        this.active = false;
        this.dems = [];
        this.needBlur = false;
        this.init();
    }

    CityPicker.prototype = {
        constructor: CityPicker,

        init: function () {

            this.defineDems();

            this.render();

            this.bind();           
           
            this.active = true;  
            
            if($("#city-picker3").val()!=''){
                $(".city-picker-span").find('>.placeholder').hide();                     
            } 
            
        },

       
        render: function () {
            var p = this.getPosition(),
                placeholder = this.$element.attr('placeholder') || this.options.placeholder,
                textspan = '<span class="city-picker-span" style="' +
                    this.getWidthStyle(375) + 'height:' +
                    p.height + 'px;line-height:' + (p.height - 1) + 'px;">' +                    
                    '<span class="title"></span>'+
                    (placeholder ? '<span class="placeholder">' + placeholder + '</span>' : '')+
                    '<div class="arrow"></div>' + '</span>',

                dropdown = '<div class="city-picker-dropdown" style="left:0px;top:100%;' +
                    this.getWidthStyle(375, true) + '">' +
                    '<div class="city-select-wrap">' +
                    '<div class="city-select-tab">' +
                    '<a class="active" data-count="province">省份</a>' +
                    (this.includeDem('city') ? '<a data-count="city">城市</a>' : '') +
                    (this.includeDem('district') ? '<a data-count="district">区县</a>' : '') + '</div>' +
                    '<div class="city-select-content"><div id="scroll1" class="mui-scroll-wrapper"><div class="mui-scroll">' +
                    '<div class="city-select province" data-count="province"></div>' +
                    (this.includeDem('city') ? '<div class="city-select city" data-count="city"></div>' : '') +
                    (this.includeDem('district') ? '<div class="city-select district" data-count="district"></div>' : '') +
                    '</div></div></div></div>';

            this.$element.addClass('city-picker-input');
            this.$textspan = $(textspan).insertAfter(this.$element);
            this.$dropdown = $(dropdown).insertAfter(this.$textspan);
            var $select = this.$dropdown.find('.city-select');

            // setup this.$province, this.$city and/or this.$district object
            $.each(this.dems, $.proxy(function (i, type) {
                this['$' + type] = $select.filter('.' + type + '');
            }, this));

            this.refresh();
        },

        refresh: function (force) {
            // clean the data-item for each $select
            var $select = this.$dropdown.find('.city-select');
            $select.data('item', null);
            // parse value from value of the target $element
            var val = this.$element.val() || '';
            val = val.split(' ');
            $.each(this.dems, $.proxy(function (i, type) {
                if (val[i] && i < val.length) {
                    this.options[type] = val[i];
                } else if (force) {
                    this.options[type] = '';
                }
                this.output(type);
            }, this));
            this.tab(PROVINCE);
            this.feedText();
            this.feedVal();
        },

        defineDems: function () {
            var stop = false;
            $.each([PROVINCE, CITY/*,DISTRICT*/], $.proxy(function (i, type) {
                if (!stop) {
                    this.dems.push(type);
                }
                if (type === this.options.level) {
                    stop = true;
                }
            }, this));
        },

        includeDem: function (type) {
            return $.inArray(type, this.dems) !== -1;
        },

        getPosition: function () {
            var p, h, w, s, pw;
            p = this.$element.position();
            s = this.getSize(this.$element);
            h = s.height;
            w = s.width;
            if (this.options.responsive) {
                pw = this.$element.offsetParent().width();
                if (pw) {
                    w = w / pw;
                    if (w > 0.99) {
                        w = 1;
                    }
                    w = w * 100 + '%';
                }
            }

            return {
                top: p.top || 0,
                left: p.left || 0,
                height: h,
                width: w
            };
        },

        getSize: function ($dom) {
            var $wrap, $clone, sizes;
            if (!$dom.is(':visible')) {
                $wrap = $("<div />").appendTo($("body"));
                $wrap.css({
                    "position": "absolute !important",
                    "visibility": "hidden !important",
                    "display": "block !important"
                });

                $clone = $dom.clone().appendTo($wrap);

                sizes = {
                    width: $clone.outerWidth(),
                    height: $clone.outerHeight()
                };

                $wrap.remove();
            } else {
                sizes = {
                    width: $dom.outerWidth(),
                    height: $dom.outerHeight()
                };
            }

            return sizes;
        },

        getWidthStyle: function (w, dropdown) {
            if (this.options.responsive && !$.isNumeric(w)) {
                return 'width:' + w + ';';
            } else {
                return 'width:' + (dropdown ? Math.max(320, w) : w) + 'px;';
            }
        },

        bind: function () {
            var $this = this;            

            $(document).on('click', (this._mouteclick = function (e) {
                var $target = $(e.target);
                var $dropdown, $span, $input;
                if ($target.is('.city-picker-span')) {
                    $span = $target;
                } else if ($target.is('.city-picker-span *')) {
                    $span = $target.parents('.city-picker-span');
                }
                if ($target.is('.city-picker-input')) {
                    $input = $target;
                }
                if ($target.is('.city-picker-dropdown')) {
                    $dropdown = $target;
                } else if ($target.is('.city-picker-dropdown *')) {
                    $dropdown = $target.parents('.city-picker-dropdown');
                }
                if ((!$input && !$span && !$dropdown) ||
                    ($span && $span.get(0) !== $this.$textspan.get(0)) ||
                    ($input && $input.get(0) !== $this.$element.get(0)) ||
                    ($dropdown && $dropdown.get(0) !== $this.$dropdown.get(0))) {
                    $this.close(true);
                }

            }));

            this.$element.on('change', (this._changeElement = $.proxy(function () {
                this.close(true);
                this.refresh(true);
            }, this))).on('focus', (this._focusElement = $.proxy(function () {
                this.needBlur = true;
                this.open();
            }, this))).on('blur', (this._blurElement = $.proxy(function () {
                if (this.needBlur){
                    this.needBlur = false;
                    this.close(true);
                }
            }, this)));

            this.$textspan.on('click', function (e) {
                var $target = $(e.target), type;
                $this.needBlur = false;
                if ($target.is('.select-item')) {
                    type = $target.data('count'); 
                    
                   	$(".select-item").css("border-bottom","none");/***去除所有下划线***/
                   	$(".city-picker-span .placeholder").css("border-bottom","none");
                 	$target.css("border-bottom","2px solid #EB4853");
                   	
                    $this.open(type);
                    setAddress(type);
                    
                    
                } else {
                    if ($this.$dropdown.is(':visible')) {
                        $this.close();
                    } else {
                        $this.open();
                    }
                }
            }).on('mousedown', function () {
                $this.needBlur = false;
            });

            this.$dropdown.on('click', '.city-select a', function (e) {
            	var LISTNUM = Math.floor($(".mui-scroll").height()/28);  //当前列的个数
            	/*$(".mui-scroll").css({
    				'-webkit-transform': 'translate3d(0px, 0px, 0px) translateZ(0px)'
    				
    	     	});*/
    	     	
    	     	
                var $select = $(this).parents('.city-select');
                var $active = $select.find('a.active');
                var aIndex = LISTNUM - $(this).nextAll().length;
                var last = $select.next().length === 0;   
                
                $active.removeClass('active');
                $(this).addClass('active');                
                scrollNumbers[point]=getTranslateY(aIndex,LISTNUM);              
                    $select.data('item', {
                        address: $(this).attr('title'), code: $(this).data('code')
                    });
                    $(this).trigger(EVENT_CHANGE);   
                     
                    $this.feedText();
                    $this.feedVal();
                    
                   /* var $target=$(e.target);
    	     		var $targetPar=$(e.target).parents("div.city-select");
    	     		var slen=$(".city-picker-span .title span").length;
    	     		if(slen>0){
    	     			if($targetPar.attr("data-count")=="province"){
	    	     			var provinceText=$(".city-picker-span span[data-count=province]").text();
	    	     			($target.text()!=provinceText||slen==1)&&($(".city-picker-span").find('>.placeholder').show().css("border-bottom","2px solid #EB4853"));
	    	     			slen>=2&&($(".city-picker-span span[data-count=city]").css("border-bottom","2px solid #EB4853"));
	    	     			
	    	     		}*//*else if($targetPar.attr("data-count")=="city"){
	    	     			var cityText=$(".city-picker-span span[data-count=city]").text();
	    	     			($target.text()!=cityText||slen==2)&&($(".city-picker-span").find('>.placeholder').show().css("border-bottom","2px solid #EB4853"));
	    	     			slen>2&&($(".city-picker-span span[data-count=district]").css("border-bottom","2px solid #EB4853"));
	    	     		}*/
	    	   /*  	}else{
	    	     		$(".city-picker-span").find('>.placeholder').show().css("border-bottom","2px solid #EB4853"); 
	    	     	}*/
                   
                    if($select.next().find('dd a').length !=0){
                    	
                		point=point+1;//设置当前选中的scroll居中
                	}
                    if($select.next().find('dd a').length ==0){   
                    	$(".city-picker-span").find('>.placeholder').hide(); 
                    	var len = $(".select-item").length;
	                 	switch(len){
		                 	case 1: scrollNumbers[1]='';scrollNumbers[2]=''; 
		                 	$this.open('province');
		                    point=0;
		                 	break;
		                 	/*case 2: scrollNumbers[2]=''; $this.open('city');
		                 	point=1;
		                 	break;*/
		                 	case 2: break;
		                 }
                        last = 1;
                        
                    }                  
                    if (last) {
                        $this.close();
                        $(".city-picker-span").find('>.placeholder').hide();                        
                        $(".title").children("span").each(function(){
                        	ADDRESS2 +=$(this).html()+' ';
                        });
                        selectSuccess();
                        $("#blackInterface").hide();
                    }

            }).on('click', '.city-select-tab a', function () {
                if (!$(this).hasClass('active')) {
                    var type = $(this).data('count');
                    $this.tab2(type);
                }             
            }).on('mousedown', function () {
                $this.needBlur = false;
            });

            if (this.$province) {
                this.$province.on(EVENT_CHANGE, (this._changeProvince = $.proxy(function () {
                    this.output(CITY);
	                /*this.output(DISTRICT);*/
                    this.tab2(CITY);
                 	
                }, this)));
            }

          /*  if (this.$city) {
                this.$city.on(EVENT_CHANGE, (this._changeCity = $.proxy(function () {
                    this.output(DISTRICT);
                    this.tab2(DISTRICT);
                }, this)));
            }*/
        },

        open: function (type) {
            type = type || PROVINCE;
            this.$dropdown.show();
            this.$textspan.addClass('open').addClass('focus');
            this.tab(type);
        },

        close: function (blur) {
           // this.$dropdown.hide();
            this.$textspan.removeClass('open');
            if (blur) {
                this.$textspan.removeClass('focus');
            }
        },

        unbind: function () {

            $(document).off('click', this._mouteclick);

            this.$element.off('change', this._changeElement);
            this.$element.off('focus', this._focusElement);
            this.$element.off('blur', this._blurElement);

            this.$textspan.off('click');
            this.$textspan.off('mousedown');

            this.$dropdown.off('click');
            this.$dropdown.off('mousedown');

            if (this.$province) {
                this.$province.off(EVENT_CHANGE, this._changeProvince);
            }

            if (this.$city) {
                this.$city.off(EVENT_CHANGE, this._changeCity);
            }
        },

        getText: function () {
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item'),
                        type = $(this).data('count');
                    if (item) {
                        text += ($(this).hasClass('province') ? '' : '') + '<span class="select-item" data-count="' +
                            type + '" data-code="' + item.code + '">' + item.address + '</span>';
                    }
                });
            return text;
        },

        getPlaceHolder: function () {
            return this.$element.attr('placeholder') || this.options.placeholder;
        },

        feedText: function () {
            var text = this.getText();
            if (text) {
               // this.$textspan.find('>.placeholder').hide();
                this.$textspan.find('>.title').html(this.getText()).show();

            } else {
                this.$textspan.find('>.placeholder').text(this.getPlaceHolder()).show().css("border-bottom","2px solid #EB4853");
                this.$textspan.find('>.title').html('').hide();
            }
        },

        getVal: function () {
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item');
                    if (item) {
                        text += ($(this).hasClass('province') ? '' : '/') + item.address;
                    }
                });
            return text;
        },

        feedVal: function () {
            this.$element.val(this.getVal());
        },

        output: function (type) {
            var options = this.options;
            //var placeholders = this.placeholders;
            var $select = this['$' + type];
            var data = type === PROVINCE ? {} : [];
            var item;
            var districts;
            var code;
            var matched = null;
            var value;

            if (!$select || !$select.length) {
                return;
            }

            item = $select.data('item');

            value = (item ? item.address : null) || options[type];

            code = (
                type === PROVINCE ? 86 :
                    type === CITY ? this.$province && this.$province.find('.active').data('code') :
                        /*type === DISTRICT ? this.$city && this.$city.find('.active').data('code') :*/ code
            );

            districts = $.isNumeric(code) ? ChineseDistricts[code] : null;

            if ($.isPlainObject(districts)) {
                $.each(districts, function (code, address) {
                    var provs;
                    if (type === PROVINCE) {
                        provs = [];
                        for (var i = 0; i < address.length; i++) {
                            if (address[i].address === value) {
                                matched = {
                                    code: address[i].code,
                                    address: address[i].address
                                };
                            }
                            provs.push({
                                code: address[i].code,
                                address: address[i].address,
                                selected: address[i].address === value
                            });
                        }
                        data[code] = provs;
                    } else {
                        if (address === value) {
                            matched = {
                                code: code,
                                address: address
                            };
                        }
                        data.push({
                            code: code,
                            address: address,
                            selected: address === value
                        });
                    }
                });
            }

            $select.html(type === PROVINCE ? this.getProvinceList(data) :
                this.getList(data, type));
            $select.data('item', matched);
        },

        getProvinceList: function (data) {
            var list = [],
                $this = this,
                simple = this.options.simple;

            $.each(data, function (i, n) {
                list.push('<dl class="clearfix">');
                list.push('<dt>' + i + '</dt><dd>');
                $.each(n, function (j, m) {
                    list.push(
                        '<a' +
                        ' title="' + (m.address || '') + '"' +
                        ' data-code="' + (m.code || '') + '"' +
                        ' class="' +
                        (m.selected ? ' active' : '') +
                        '">' +
                        ( simple ? $this.simplize(m.address, PROVINCE) : m.address) +
                        '</a>');
                });
                list.push('</dd></dl>');
            });

            return list.join('');
        },

        getList: function (data, type) {
            var list = [],
                $this = this,
                simple = this.options.simple;
            list.push('<dl class="clearfix"><dd>');

            $.each(data, function (i, n) {
                list.push(
                    '<a' +
                    ' title="' + (n.address || '') + '"' +
                    ' data-code="' + (n.code || '') + '"' +
                    ' class="' +
                    (n.selected ? ' active' : '') +
                    '">' +
                    ( simple ? $this.simplize(n.address, type) : n.address) +
                    '</a>');
            });
            list.push('</dd></dl>');

            return list.join('');
        },

        simplize: function (address, type) {
            address = address || '';
            if (type === PROVINCE) {
                return address.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, '');
            } else if (type === CITY) {
                return address.replace(/[市,地区,回族,蒙古,苗族,白族,傣族,景颇族,藏族,彝族,壮族,傈僳族,布依族,侗族]/g, '')
                    .replace('哈萨克', '').replace('自治州', '').replace(/自治县/, '');
            } else if (type === DISTRICT) {
                return address.length > 2 ? address.replace(/[市,区,县,旗]/g, '') : address;
            }
        },

        tab: function (type) {
        	
            var $selects = this.$dropdown.find('.city-select');
            var $tabs = this.$dropdown.find('.city-select-tab > a');
            var $select = this['$' + type];
            var $tab = this.$dropdown.find('.city-select-tab > a[data-count="' + type + '"]');
          
            	if ($select) {           		
	                $selects.hide();
	                $select.show();
	                $tabs.removeClass('active');
		            $tab.addClass('active');
            	}
          
            
        },
		
		 tab2: function (type) {
        	
            var $selects = this.$dropdown.find('.city-select');
            var $tabs = this.$dropdown.find('.city-select-tab > a');
            var $select = this['$' + type];
            var $tab = this.$dropdown.find('.city-select-tab > a[data-count="' + type + '"]');         
            	if ($select) {
	            	$selects.fadeOut(300);
			        $select.fadeIn(function(){
	            		$(".mui-scroll").css({
    						'-webkit-transform': 'translate3d(0px, 0px, 0px) translateZ(0px)'
    	     			});
	            	});
			        $tabs.removeClass('active');
				    $tab.addClass('active');
            	}
        },
        reset: function () {
            this.$element.val(null).trigger('change');
        },

        destroy: function () {
            this.unbind();
            this.$element.removeData(NAMESPACE).removeClass('city-picker-input');
            this.$textspan.remove();
            this.$dropdown.remove();
        }
    };

    CityPicker.DEFAULTS = {
        simple: false,
        responsive: false,
        placeholder: '请选择',
        level: 'district',
        province: '',
        city: '',
        district: ''
    };

    CityPicker.setDefaults = function (options) {
        $.extend(CityPicker.DEFAULTS, options);
    };

    // Save the other citypicker
    CityPicker.other = $.fn.citypicker;

    // Register as jQuery plugin
    $.fn.citypicker = function (option) {
        var args = [].slice.call(arguments, 1);

        return this.each(function () {
            var $this = $(this);
            var data = $this.data(NAMESPACE);
            var options;
            var fn;

            if (!data) {
                if (/destroy/.test(option)) {
                    return;
                }

                options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
                $this.data(NAMESPACE, (data = new CityPicker(this, options)));
            }

            if (typeof option === 'string' && $.isFunction(fn = data[option])) {
                fn.apply(data, args);
            }
        });
    };

    $.fn.citypicker.Constructor = CityPicker;
    $.fn.citypicker.setDefaults = CityPicker.setDefaults;

    // No conflict
    $.fn.citypicker.noConflict = function () {
        $.fn.citypicker = CityPicker.other;
        return this;
    };

    $(function () {
        $('[data-toggle="city-picker"]').citypicker();        
       
    });    
    
    
    
    function setAddress(type){
    	
    	var getScroll = ''; 
    	if(type=="province"){    	
    	    point =0;
    	}
    	else if(type=="city"){
    		point =1;
    	}
    	getScroll = scrollNumbers[point];
    	
    	$(".mui-scroll").css({
    		'-webkit-transform': 'translate3d(0px,'+getScroll+'px , 0px) translateZ(0px)'			
		});
    }
    
    //选择结束后执行的操作
    function selectSuccess(){   	
        $("#UOBI-bankCity").val(ADDRESS2);
        ADDRESS2 ="";
        
        scroNum1=scrollNumbers.slice(0,scrollNumbers.length);
		addPoint1=point;
  		point=0;
    	bankCity =true ;
       	//UOBISuccessBtn();
       $alertBankegion.hide();
        $(".address").hide();
        $("#blackInterface").show();
    }
    
});

function getTranslateY(index,listNum){
    	var pageNum = Math.floor(AddressHeight / 28);
    	var halfNum = pageNum/2;
    	var scrollH =0;    	
    	if(index < halfNum || listNum <pageNum ){
    		scrollH =0;    		
    		
    	}
    	else if(index>listNum-halfNum){
    		scrollH = AddressHeight-$(".mui-scroll").height();    
    		
    	}
    	else{
    		scrollH = -28*(index)+AddressHeight/2;
    	
    	}       
        return scrollH;	
    }

$(document).ready(function(){   
    (function(mui) {  
        mui.init({
            swipeBack: false
        });
        mui('.mui-scroll-wrapper').scroll({
        	scrollY: true, //是否竖向滚动
 			scrollX: false, //是否横向滚动
            indicators: true, //是否显示滚动条
            deceleration:0.0006 //阻尼系数,系数越小滑动越灵敏
        }); 
    })(mui);
    // initAddress();
    //地址实现初始化。这个暂时好像没有用到。先放着吧。
    function initAddress(){
        var $citypicker1 = $('#city-picker1');
//      $citypicker1.citypicker();
        var $citypicker2 = $('#city-picker2');
        var $citypicker3 = $('#city-picker3'); 
    }   
     //初始化地址选择器的弹窗高度，会根据屏幕大小的改变而改变
    $(".city-select-content").css({
    'min-height': AddressHeight+'px'
    });
    ///////////////////////////////这里写自己的点击代码 自己的元素前加id///////////////////////////////////
    $("#UOBI-bankCity").bind('click focus',function(){      	
		$(this).blur();
		$("#cardPhone").blur();
		$("#phoneCode").blur();
		$(".address").slideDown();
		$("#blackInterface").show();
		if($(this).val()==""){
        	$("#distpicker .city-picker-span span.title").html("").hide();
        	$("#distpicker .city-picker-span span.placeholder").show();
        	$("#distpicker .city-select").find("a.active").removeClass('active');
        	$("#distpicker .city-select").hide();
        	$("#distpicker .city-select.province").show();
        	$(".address:visible .mui-scroll").css({
           		'-webkit-transform': 'translate3d(0px, 0px, 0px) translateZ(0px)'
       		});
       	}else{
       		scrollNumbers=scroNum1;
       		point=addPoint1;
       		var targetPage=$(".address:visible .city-picker-span span.title span:last-child");
			var placeholSpan=$(".address:visible .city-picker-span").find('>.placeholder');
			if(placeholSpan.is(":hidden")){
				$("#distpicker .city-select").hide();
        		$("#distpicker .city-select."+targetPage.attr("data-count")).show();
        		$(".address:visible .select-item").css("border-bottom","none");
        		targetPage.css("border-bottom","2px solid #EB4853");
        		$(".address:visible .mui-scroll").css({
            		'-webkit-transform': 'translate3d(0px,'+scrollNumbers[point]+'px , 0px) translateZ(0px)'
        		});
			}else{
				if(targetPage.attr("data-count")=="province"){
					$("#distpicker .city-select.city").show();
				}
				$(".address:visible .select-item").css("border-bottom","none");
				placeholSpan.css("border-bottom","2px solid #EB4853");
				
			}
			point=0;
    	}
	});	
	$("#zx_bankAlipay .closeBtn").bind('click',function(){		
		$(".address").slideUp();
		$("#blackInterface").hide();
		if($("#UOBI-bankCity").val()==""){
			bankCity =false ;
       		//UOBISuccessBtn();
       		$alertBankegion.show();
       		$alertBankegionText.text("请选择开户行所在地")
		}else{
			bankCity =true ;
       		//UOBISuccessBtn();
       		$alertBankegion.hide();
		}
	});	
});


