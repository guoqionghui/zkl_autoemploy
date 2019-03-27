

$(function(){
    //当前文件的路径
    var _filePath = app.basePath + 'js/index.min.js';

    app.findCurrPath = function(){
        var path = null;
        var scripts = document.getElementsByTagName('script');
        for (var n = scripts.length-1; n>-1; n--) {
            var src = scripts[n].src.replace(/\?.*$/, ''); // 去掉查询字段
            if (src.indexOf(_filePath) == (src.length - _filePath.length)) {
                path = src.substring(0, src.length - _filePath.length);
                break;
            }
        }

        if(path && path.lastIndexOf('/') != path.length-1) path += '/';
        return path;
    };

    /**
     * 当前访问的地址
     */
    app.LOCALPATH = (function(){
        return app.findCurrPath();
    })();

    function sino_cordova_checkApp(){
        //安卓APP 和 IOS APP中增加了自定义UA 用于识别当前的版本
        //其中安卓UA为 SINO_ANDROID_APP/1.0 1.0为版本号
        //IOS UA为 SINO_IOS_APP/1.0
        var reData = {};
        var match = navigator.userAgent.match('SINO_([\\w]+)_APP/([\\d.]+)');
       // console.log(match);
        if(match){
            reData.device = match[1] == 'IOS' ? 'iOSAPP' : 'AndroidAPP';
            reData.version = match[2];
        }else{
            reData.device = 'Browser';
            reData.version = '0'
        }

        return reData;
    }
    //当前运行环境为 APP 或 浏览器
    app.deviceVersion = sino_cordova_checkApp();
    app.appVersion = app.deviceVersion.device;

    //控制全局loading
    //show hide 方法可接受一个id值 默认值为 global 列表中所有id的loading全部被隐藏后 loading才会隐藏
    app.globalLoading = {
        _times: 0,
        _list:{},
        _hide:function(){
            this._list = {};
            $('#global-loading-shadow').hide();
        },
        hide:function(id){
        //    console.trace('隐藏全局Loading'+ (id ? (',id:' + id) : '') );
            id = id || 'global';
            if(this._list[id]){
                this._times = Math.max(this._times - 1,0);
                this._list[id] = null;
            }

            if(this._times === 0){
                $('#global-loading-shadow').hide();
            }
        },
        show:function(id){
          //  console.trace('显示全局Loading'+ (id ? (',id:' + id) : '' ) );
            id = id || 'global';
            if(!this._list[id]){
                this._times = Math.max(this._times,0) + 1;
                this._list[id] = true;
            }
            $('#global-loading-shadow').show();
        }
    }

    //控制全局shadow
    app.globalShadow = {
        _times: 0,
        _list:{},
        _hide:function(){
            this._list = {};
            $('#global-shadow').css('z-index','2000').hide();
        },
        hide:function(id){
            if(this._list[id]){
                this._times = Math.max(this._times - 1,0);
                this._list[id] = null;
            }

            var _arr = [];
            for(var key in this._list){
                _arr.push(this._list[key]);
            }
            $('#global-shadow').css('z-index',Math.max.apply(null,_arr))

            if(this._times === 0){
                $('#global-shadow').css('z-index','2000').hide();
            }
        },
        show:function(id){
            if(!this._list[id]){
                this._times = Math.max(this._times,0) + 1;
                this._list[id] = ($('#'+id).css('z-index') || 2000);

                if($('#'+id).length > 0){
                    $('#global-shadow').css('z-index',this._list[id] - 1);
                }
            }
            $('#global-shadow').show();
        }
    }

    /**
     * 执行相应id的 弹框的函数
     * @param id 上面配置的 modal的id
     * @param fn 字符串 调用modal中相应地方法(modal[fn]) 如果有第三个参数作为modal.fn的参数传入 多个参数请使用数组
     *           数组   依次调用modal中的相应方法或者数组元素本身即为函数 并将后续参数依次作为参数传入
     *           函数   直接执行 第三个参数作为该函数的参数
     *           空值   执行modal.show函数 如果不存在 执行 $('#id').show()
     * @params 从第三个参数开始 每个参数 依次作为第二个参数中的函数的参数
     * 例:
     * id为 test modal中函数定义为
     * modal.init = function(index,cleanFun){};
     * modal.test = function(a,b,c);
     * 则调用时使用
     * app.modal.exec('test',['init','test'],[index,cleanFun],[a,b,c])
     */
    app.modal.exec = function(id,fn/*data*/){
        //取得参数列表
        var _args = Array.prototype.slice.call(arguments,2);

        app.loadModal(id,function(loadData){
            if(loadData.flag && app.modal[id]){
                if(fn){//如果fn 参数存在 则执行
                    if(!$.isArray(fn)) fn = [fn];
                    //依次执行函数
                    for(var i=0;i<fn.length;i++){
                        var _fn = fn[i];
                        if(typeof _fn == 'string' && typeof app.modal[id][_fn] == 'function'){
                            app.modal[id][_fn].apply(app.modal[id],args(i));
                        }else if(typeof _fn == 'function'){
                            fn.apply(app.modal[id],args(i));
                        }
                    }
                }else if(app.modal[id].show){//fn不存在 show存在 则执行
                    app.modal[id].show();
                }else{//以上均不存在 则直接显示
                    $('#'+id).show();
                }
            }
        });

        function args(index){
            if(index > _args.length - 1){
                return null;
            }else{
                var arg = _args[index];
                if(!$.isArray(arg)) arg = [arg];
                return arg
            };
        }
    };

    /**
     * 控制页面底部的显示隐藏
     * @type {{hide: Function, show: Function}}
     */
    app.footer = {
        hide:function(){
            $('#mainviewport').addClass('footer-hide');
        },
        show:function(){
            $('#mainviewport').removeClass('footer-hide');
        }
    };

    /**
     * 控制页面头的显示隐藏
     * @type {{hide: Function, show: Function}}
     */
    app.header = {
        hide:function(){
            $('#mainviewport').addClass('header-hide');
        },
        show:function(){
            $('#mainviewport').removeClass('header-hide');
        }
    };

    /**
     * 用于引入js文件
     * @param src js文件路径 可以为字符串或数组
     * @param loadType 0逐个加载 1 同时加载 默认为0
     * @param 加载完成的回调函数 可以为空
     */
    app.loadJS = function(src,loadType,callback){
        //将src放在数组中 便于统一处理
        if(!$.isArray(src)) src = [src];
        var needSrcs = [];
        var haveSrcs = [];

        //取得当前页面中的所有js标签
        var scripts = document.getElementsByTagName('script');

        for(var i=0;i<scripts.length;i++){
            haveSrcs.push(scripts[i].src);
        }

        for(var i=0;i<src.length;i++){
            if(haveSrcs.indexOf(src[i]) == -1) needSrcs.push(src[i]);
        }

        if(needSrcs.length > 0){
            if(loadType){
                parallelLoad();
            }else{
                serialLoad(0);
            }
        }

        var _data = {
            flag:1,//加载是否成功标记
        };

        /**
         * 串行加载
         * @param i
         */
        function serialLoad(i){
            var scriptE = document.createElement('script');
            scriptE.setAttribute('type','text/javascript');
            scriptE.onload = ready;
            scriptE.onerror = ready;
            scriptE.setAttribute('src',needSrcs[i]);
            document.head.appendChild(scriptE);

            function ready(e){
                if(e.type == 'error'){
                    console.error('[APP] 加载js出错,',e);
                    _data.flag = 0;
                }
                //如果不是最后一个 则继续加载
                if(i != needSrcs.length-1) {
                    serialLoad(i+1);
                }else{
                    if(callback){
                        callback(_data);
                    }
                }
            }
        }

        /**
         * 并行加载
         */
        function parallelLoad(){
            var loaded = 0;
            //加载所有js
            for(var i=0;i<needSrcs.length;i++){
                var scriptE = document.createElement('script');
                scriptE.setAttribute('type','text/javascript');
                scriptE.setAttribute('src',app.LOCALPATH+needSrcs[i]);
                scriptE.onload = ready;
                scriptE.onerror = ready;
                document.head.appendChild(scriptE);
            }

            function ready(e){
                if(e.type == 'error'){
                    _data.flag = 0;
                    console.error('[APP] 加载js出错',e);
                }
                loaded++;
                if(loaded == needSrcs.length){
                    if(callback) callback(_data);
                }
            }
        }
    };

    /**
     * 为元素添加事件或事件委托 会在页面切换时移除添加的事件 接受参数同jquery.on方法
     */
    app._removeEEList = [];//需要移除的事件的元素列表
    $.fn.sino_on = function(){
        app._removeEEList.push($(this));
        if(arguments.length > 0){
            arguments[0] = arguments[0].replace(/\w+/g,'$&'+app.removeEventNS);
        }
        $(this).on.apply($(this),arguments);

    };

    /**
     * 加载全局modal弹出框
     * @param modalId
     * @param callback
     */
    app.loadModal = function(modalId,callback){
        var modalData = app.modal[modalId];
        if(!modalData){
            console.error('[APP] [加载modal错误] 没有查找到id为:'+modalId+'的相关配置');
            callback({html:0,js:0,flag:0,modal:modalData});
        }else{
            //已经加载过的modal不再进行加载
            if(modalData.ready){
                callback({html:1,js:1,flag:1,modal:modalData});
            }else{
                console.log('[APP] 开始加载modal:'+modalId);
                $.ajax({
                    url:app.LOCALPATH + app.basePath + modalData.html,
                    dataType:'html',
                    success:function(data){
                        $('#'+app.modalContentID).append(data);
                        if(modalData.js) app.loadJS(app.LOCALPATH + app.basePath + modalData.js,0,function(data){
                            var _data = {
                                html:1,
                                js:data.flag,
                                flag: data.flag,
                                modal:modalData
                            };
                            modalData.ready = true;
                            callback(_data);
                        });
                    },
                    error:function(){
                        console.error('[加载modal错误] 加载路径为:' + modalData.html + '的文件失败');
                        callback({html:0,js:0,flag:0,modal:modalData});
                    }
                });
            }
        }
    }

    /**
     * 加载指定路径的内容
     * @param path
     * @param callback
     */
    app.loadPath = function(path,callback){
        var route = app.route;
        //如果没有配置路径则不做操作
        if(!route[path]){
            if(callback) callback();
            return;
        }

        //加载HTML
        $('#'+app.contentID).load(app.LOCALPATH + app.basePath + route[path].html,function(){
            //移除上一个页面加载的js
            if(app.curr && app.curr.js){
                app.curr.js.map(function(value){
                    $('script[src="'+app.LOCALPATH + app.basePath + value+'"]').remove();
                });
            }

            // 如果有需要移除的事件 则依次移
            if(app._removeEEList.length > 0){
                app._removeEEList.map(function(value){
                    value.off(app.removeEventNS);
                });
            }

            //如果有undo函数则调用 用来消除之前页面js对当前环境造成的影响
            if(app.curr && app.curr.undo) app.curr.undo();

            app.curr = route[path];

            if(app.curr.title) $('#header-title').text(app.curr.title);

            if(app.curr.hideHeadTitle){
                $('#header-title').text('');
            }else{
                $('#header-title').text(app.curr.title || '');
            }

            var jsArr = [];
            //如果存在js则遍历增加
            if(app.curr.js){
                app.curr.js.map(function(value){
                    jsArr.push(app.LOCALPATH + app.basePath +  value);
                });
            }else{
                if(callback) callback(app.curr);
            }

            //加载完成后将页面移动到顶端
            $('#'+app.contentID).scrollTop(0);

            app.loadJS(jsArr,0,function(){
                if(callback) callback(app.curr);
            });
        });
    };

    /**
     * 路径发生变化时触发加载页面的操作
     */
    function loadViewport(){
        var path = location.hash || '#' + app.route.default;
        app.globalLoading.show();

       // console.log('[APP] 开始加载页面['+path+']');
        app.loadPath(path.slice(1),function(data){
        	//console.log('[APP] 加载页面['+path+']完成');
            //如果需要显示左上角菜单按钮 则显示
            if(data && data.showHeaderMenuBtn){
                $('#global-header-menu').show();
                $('#global-header-back').show();
            }else{
                $('#global-header-menu').hide();
                $('#global-header-back').hide();
            }
            //控制首页按钮的显示
            if(data && data.showHomeBtn){
                $('#global-header-home').show();
            }else{
                $('#global-header-home').hide();
            }
            //控制加号按钮的显示
            if(data && data.showAddBtn){
                $('#global-header-add').show();
            }else{
                $('#global-header-add').hide();
            }
            //设置头部标题
            if(data && data.logoTitle){
                $('#updateName').text(data.logoTitle);
            }else{
                $('#updateName').text('');
            }

            //如果页面没有设置 则默认隐藏全局loading
            if(!data || !data.selfHideLoading) app.globalLoading.hide();
        });

    }

    app.loadViewport = loadViewport;

    /**
     * 当浏览器的hash发生变化时进行页面的加载
     */
    window.onhashchange = loadViewport;

});
