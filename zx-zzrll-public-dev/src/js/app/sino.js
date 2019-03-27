/**
 * 提供一些通用方法
 * @type {{}|*}
 */
jQuery(function(){
    window.sino = window.sino || window.app || {};

    //复制全局设置至sino变量
    if(window.GloConfig){
        for(var key in GloConfig){
            sino[key] = GloConfig[key];
        }
    }

    /**
     * 获取当前版本
     * @type {{_Android: sino.mobile._Android, _BlackBerry: sino.mobile._BlackBerry, _iOS: sino.mobile._iOS, _Windows: sino.mobile._Windows, _Any: sino.mobile._Any, Android: string, BlackBerry: string, iOS: string, Windows: string, is: sino.mobile.is}}
     */
    sino.mobile = {
        _Android : function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        _BlackBerry : function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        _iOS : function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        _Windows : function() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        _Any : function() {
            return (this._Android() || this._BlackBerry() || this._iOS() || this._Windows());
        },
        Android:'Android',
        BlackBerry:'BlackBerry',
        iOS:'iOS',
        Windows:'Windows',
        is:function(name){
            if(name){
                return this['_'+name]();
            }else{
                return (this._Android() && this.Android) || (this._BlackBerry() && this.BlackBerry) || (this._iOS() && this.iOS) || (this._Windows() && this.Windows);
            }
        }
    };

    /**
     * 判断当前环境是否是APP
     */
    sino.isApp = function(){
        return sino.appVersion != 'Browser';
    }

    /**
     * 判断当前是否为Android
     */
    sino.isAndroidApp = function(){
        return sino.appVersion == 'AndroidAPP';
    }

    sino.isIOSApp = function(){
        return sino.appVersion == 'iOSAPP';
    }

    /**
     * 服务器地址 永远指向当前服务器的地址
     */
    sino.SERVERPATH = (function(){
        return sino.serverPath;
    })();

    /**
     * 根据分辨率判断当前的设备是否是手机
     * 在cordova加载后该方法会被重写
     * @returns {boolean}
     */
    sino.isPhone = function(){
        return document.documentElement.clientWidth < 700;
    };

    /**
     * 获取html页面连接中的传参
     * @returns {{}} 返回对象
     */
    sino.getParams = function(){
        var data = {};
        var str = location.search;
        if(str){
            str = str.slice(1);
            dataArr = str.split('&');
            for(var i=0;i<dataArr.length;i++){
                var _dataArr = dataArr[i].split('=');
                data[_dataArr[0]] = _dataArr[1];
            }
        }
        return data;
    };

    /**
     * 弹出提示
     * @param 对象或者字符串 如果为字符串则作为content其他使用默认值 options {
     * title: 标题 默认 提示
     * type:1为alert 2为 confirm 默认为1
     * content: 显示内容
     * cancleBtnText:取消按钮文字 默认 取消
     * confirmBtnText:确定按钮文字 默认 确定
     * cancleAction:点击取消执行的回调函数
     * confirmAction:点击确定执行的回调函数
     * }
     *
     * @return 弹窗对象{
     * show:显示弹窗
     * hide:隐藏
     * destory:销毁
     * source:当前弹窗的jquery对象
     * options:创建弹窗的参数
     * }
     */
    sino.popupTipsList = {};
    sino.popupTips = function(options){
        options._id = options.id;
        var _popupWin = null;
        //如果存在相同id的 则不再进行创建直接返回现有弹窗
        if(options._id && sino.popupTipsList[options._id]){
            _popupWin =  sino.popupTipsList[options._id];
        }else{
            options.id = 'global-alert-' + (new Date()).getTime() + parseInt(Math.random() * 100);
            options.cancleBtnId = options.id + '-cancel';
            options.confirmBtnId = options.id + '-confirm';
            options = $.extend({
                title:'提示',
                cancleBtnText:'取消',
                confirmBtnText:'确定',
                type:1,
            },options);

            if(options.type == 1){
                options.cancleHide = true;
            }

            var $popupWin = $('#global-alert').toHtml(options);
            $('#global-popups').append($popupWin);
            $popupWin = $('#'+options.id);

            _popupWin = {
                _destory:0,
                show:function(){
                    if(this._destory) return null;
                    sino.globalShadow.show(options.id);
                    $popupWin.show();
                    return this;
                },
                hide:function(){
                    if(this._destory) return null;
                    sino.globalShadow.hide(options.id);
                    $popupWin.hide();
                    return this;
                },
                destory:function(){
                    if(!this._destory){
                        if(options._id) sino.popupTipsList[options._id] = null;
                        sino.globalShadow.hide(options.id);
                        $popupWin.remove();
                        this._destory = 1;
                    }
                    return null;
                },
                source:$popupWin,
                options:options
            }

            if(options._id) sino.popupTipsList[options._id] = _popupWin;

            $('#'+options.cancleBtnId).on('click',function(){
                if(options.cancleAction) options.cancleAction.apply(_popupWin);
            });
            $('#'+options.confirmBtnId).on('click',function(){
                if(options.confirmAction) options.confirmAction.apply(_popupWin);
            });
        }

        return _popupWin;
    }

    /**
     * alert提示框 同样内容的提示框只会同时存在一个
     * @param content 提示内容 会自动替换其中的\n换行符为<br />
     * @param callback 回调函数
     * @returns {*}
     */
    sino.alert = function(content,callback){
        var _pop = this.popupTips({
            id:content.replace(/\n/g,'<br />'),
            content:content.replace(/\n/g,'<br />'),
            confirmAction:function(){
                if(callback) callback();
                this.destory();
            }
        }).show();

        return _pop;
    }

    /**
     * confirm提示框
     * @param content 提示的内容
     * @param callback 回调函数 回调函数接收参数 0点击的是取消 1点击的是确定
     * @returns {*}
     */
    sino.confirm = function(content,callback){
        var _pop = this.popupTips({
            content:content.replace(/\n/g,'<br />'),
            type:2,
            cancleAction:function(){
                if(callback) callback(0);
                this.destory();
            },
            confirmAction:function(){
                if(callback) callback(1);
                this.destory();
            },
        }).show();
        return _pop;
    }

    /**
     * 发送邮件 调用系统内置邮件客户端发送邮件
     * @param receiver 收件人
     * @param subject 主题
     * @param content 邮件内容
     */
    sino.sendMail = function(receiver,subject,content){
        window.open('mailto:'+(receiver || '')+'?subject='+subject+'&body='+content,'_system');
    };
    //设备ID 默认为空 如果是APP则会取出
    sino.deviceID = '';

    sino.apiSecretKey = 'V4nEbWQOkJ+Vz4N2UTsBRxOpD8dcfgQVZ0A1Wjuw5XI=';

    //APP版本 需要加载其他的功能
    if(sino.isApp()){
        document.addEventListener('backbutton',function(){
            if(sino.curr.back) sino.curr.back();
          //  else history.back();
        },false);

        sino.deviceID = device.uuid;

    }
    //为a标签添加默认事件
    $('body').on('click','a.no-href',function(e){
        e.preventDefault();
    });


    sino.ajax = function(options){
    		console.log("ajax options 1" , options);
        var globalLoadingID = 'ajax-'+ Date.now() + Math.floor(Math.random() * 1000);
        sino.globalLoading.show(globalLoadingID);
        //默认的ajax设置
        var ajaxConfig = {
            type:'POST',
            dataType:'json',
            // processData: false,
            // contentType:'application/json;charset=UTF-8',
            xhrFields: {
                withCredentials: true
            },
            sino_completeUrl:true,//自动拼接URL
            headers : {
                'sino-from' : 'SINO_WEBAPP',
                'sino-device' : sino.appVersion
            }
        }
        //继承默认设置
        options = $.extend({},ajaxConfig,options);
        console.log("ajax options", options);
        //重新设置 回调函数
        var _error = options.error;
        var _success = options.success;
        options.success = success;
        options.error = error

        //如果自动完成URL 没有设置为false 则进行拼接
        if(options.sino_completeUrl) options.url = sino.SERVERPATH + options.url;
        //如果为json数据 且 data为对象 则进行转换
        if(options.contentType == 'application/json;charset=UTF-8' && (typeof options.data == 'object') ) options.data = JSON.stringify(options.data);

        //增加签名
        var now = Date.now();
        options.headers['sino-time'] = now;
        options.headers['sino-deviceID'] = sino.deviceID;
        options.headers['sino-sign'] = CryptoJS.HmacSHA1(sino.deviceID + now,sino.apiSecretKey).toString(CryptoJS.enc.HEX);


        function success(data) {
            sino.globalLoading.hide(globalLoadingID);
            if(!data || data.flag == 0){
                sino.alert( (data && data.error) || '服务器发生错误');
                if(_success) _success(data);
            }else if(data.flag == "-1"){
                location.hash = 'sys-download';
            }else if(_success){
                _success(data);
            }
        }

        function error(xhr,state,error){
            sino.globalLoading.hide(globalLoadingID);
            sino.globalLoading.hide();
            if(xhr.getResponseHeader("sessionstatus") == 'timeout'){
                sino.alert('登录已超时,请重新登录');
            }else if(_error){
                _error(xhr,state,error);
                console.warn('[APP]连接服务器失败\n状态:',event,'\nxhr对象:',xhr,'\n发送使用的设置:',options);
            }else{
                sino.alert('连接服务器失败');
                console.warn('[APP]连接服务器失败\n状态:',event,'\nxhr对象:',xhr,'\n发送使用的设置:',options);
            }
        }

        return $.ajax(options);
    }
})