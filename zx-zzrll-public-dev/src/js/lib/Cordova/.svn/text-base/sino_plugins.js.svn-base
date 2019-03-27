/**
 * 使用以下方法 请注意首先使用 sino.isApp() 来判断当前是否运行在APP环境中 如果不是则以下方法不可调用
 * 通过 cordova.sino 来调用以下方法
 * Created by LHY on 16/3/1.
 */

$(function(){

    if(window.cordova){
        var _sino = cordova.sino = cordova.sino || {};
        var _argsMap = {
            "1001": "getVersion",
            "2002": "getTabBarTag",
            "2004": "saveCustomerInfo",
            "2005": "scanIDCard",
            "2006": "scanBankCard",
            "2007": "scanVisitingCard",
            "3003": "takePhoto",
            "3005": "initPhotoView",
            "3004": "imagesUpload",
            "4000": "receiveMessageNumber",
            "4001": "setMessageNumberIs0",
            "3001": "showSignViewController",
            "3002": "showCameraViewController",
            "2011": "deleteCustomerInfo",
            "2012": "requestCustomerData",
            "3006": "sendNonGifContent",
            "3007": "sendTencentContent",
            "4003": "modifyLockGesture",
            "4004": "checkGesture",
            "4005": "openLocalURL",
            "6666": "LivenessDetection",
            "6001": "entryPreservation",//进入移动保全
            "6002": "entryLocalSysFromOtherSys",//移动保全返回
            "7777": "makePhone"//客户详情打电话接口

        };

        /**
         * 获取在开始时由原生传送过来的数据
         * 该方法一般无需调用 页面在加载时会自动调用该方法 同时将数据保存到 sino.appTransData 中
         * @param callback 接收两个参数 flag: 0 失败 1成功  data: 成功返回数据 失败返回错误信息
         */
        _sino.LivenessDetection = function(callback,data){
            execSinoPlugin('6666',callback,data);
        };
        
        _sino.getInitData = function(callback){
            execSinoPlugin('1',callback);
        };


        //客户详情打电话接口
        _sino.clientDetailsPhone = function(callback,data){
            execSinoPlugin('7777',callback,data);
        };

        /**
         * App成功初始化之后获取App的版本和App中H5文件的版本
         * 第一次在登录页面调用
         * @param callback
         * 回调函数返回两个数据 "ResourceVersion","AppVersion"
         */
        _sino.getVersion = function(callback){
            execSinoPlugin('1001',callback);
        };

        /**
         * 登录时同步服务器客户数据
         * @param {Object} callback
         * @param {Object} data
         */
        _sino.customSycn = function(callback,data){
            execSinoPlugin('2001',callback,data);
        };
        /**
         * 从H5界面跳转到客户查询界面
         * @param {Object} callback
         * @param {Object} data
         */
        _sino.goCustom = function(callback,data){
            execSinoPlugin('2002',callback,data);
        };
        /**
         * 从H5界面跳转到客户查询界面(无网络)
         * @param {Object} callback
         * @param {Object} data
         */
        _sino.getCustom = function(callback,data){
            execSinoPlugin('2003',callback,data);
        };

        /**
         * 保存准客户到客户端
         * @param {Object} callback
         * @param {Object} data
         */
        _sino.saveCustom = function(callback,data){
            execSinoPlugin('2004',callback,data);
        };

        /**
         * 扫描读取身份证信息
         * @param {Object} callback
         */
        _sino.getIDCardInfo = function(callback){
            execSinoPlugin('2005',callback);
        };
        /**
         * 扫描读取银行卡信息
         * @param {Object} callback
         */
        _sino.getBankCardInfo = function(callback){
            execSinoPlugin('2006',callback);
        };

        /**
         * 扫描读取名片信息
         * @param {Object} callback
         */
        _sino.getVisitCardInfo = function(callback){
            execSinoPlugin('2007',callback);
        };
        /**
         * 确认身份证信息
         * @param {Object} callback
         */
        _sino.confirmIDCardInfo = function(callback,data){
            execSinoPlugin('2008',callback,data);
        };
        /**
         * 确认银行卡信息
         * @param {Object} callback
         */
        _sino.confirmBankCardInfo = function(callback,data){
            execSinoPlugin('2009',callback,data);
        };

        /**
         * 确认名片信息
         * @param {Object} callback
         */
        _sino.confirmVisitCardInfo = function(callback,data){
            execSinoPlugin('2010',callback,data);
        };
        /**
         * 删除准客户
         * @param {Object} callback
         */
        _sino.deleteCustom = function(callback,data){
            execSinoPlugin('2011',callback,data);
        };

        /**
         * 签名接口
         * @param {Object} callback
         */
        _sino.digitalSignature = function(callback,data){
            execSinoPlugin('3001',callback,data);
        };
        /**
         * 拍照接口
         * @param {Object} callback
         */
        _sino.takePhoto = function(callback,data){
            execSinoPlugin('3002',callback,data);
        };
        /**
         * 拍照接口（电子投保资料上传）
         * @param {Object} callback
         */
        _sino.takePhoto_upload = function(callback,data){
            execSinoPlugin('3003',callback,data);
        };
        /**
         * 上传接口（电子投保资料上传）
         * @param {Object} callback
         */
        _sino.uploadPhoto = function(callback,data){
            execSinoPlugin('3004',callback,data);
        };
        /**
         * 页面初始化（电子投保资料上传）
         * @param {Object} callback
         */
        _sino.inUploadPage = function(callback,data){
            execSinoPlugin('3005',callback,data);
        };
        /**
         *微信分享（电子投保预览）
         * @param {Object} callback
         */
        _sino.shareWX = function(callback,data){
            execSinoPlugin('3006',callback,data);
        };
        /**
         *QQ分享（电子投保预览）
         * @param {Object} callback
         */
        _sino.shareQQ = function(callback,data){
            execSinoPlugin('3007',callback,data);
        };
        /**
         * 返回首页
         * @param callback 可选参数 接收两个参数 flag: 0 失败 1成功  data: 成功返回数据 失败返回错误信息
         */
        _sino.goHomePage = function(callback){
            execSinoPlugin('goHomePage',callback);
        };

        /**
         * 调用投保人签名方法
         * 投保人和被保人签名的方法不同 因为签名框的标题不同
         * @param callback 接收两个参数 flag: 0 失败 1成功  data: 成功返回数据(返回数据为图片BASE64编码) 失败返回错误信息
         */
        _sino.signAppnt = function(callback){
            execSinoPlugin('20',callback);

        }

        /**
         * 调用被保人签名方法
         * 投保人和被保人签名的方法不同 因为签名框的标题不同
         * @param callback 接收两个参数 flag: 0 失败 1成功  data: 成功返回数据(返回数据为图片BASE64编码) 失败返回错误信息
         */
        _sino.signInsure = function(callback){
            execSinoPlugin('21',callback);
        }

        /**
         * 调用抄写风险语录方法
         * @param callback(flag,data) flag: 0 失败 1成功  data: 成功返回数据(返回数据为图片BASE64编码) 失败返回错误信息
         */
        _sino.signRiskWarn = function(callback){
            execSinoPlugin('30',callback)
        }
        /**
         * 登陆成功后发送用户信息
         * @param callback
         * @param data
         */
        _sino.sendUserMsg = function(callback,data){
            execSinoPlugin('2012',callback,data)
        }
        /**
         * 初始化我的 照会、待缴费、待补充资料、回执 的未读条数
         * @param callback
         * @param data
         */
        _sino.initMyCount = function(callback,data){
            execSinoPlugin('4000',callback,data)
        }
        /**
         * 处理我的 照会、待缴费、待补充资料、回执 的未读条数
         * @param callback
         * @param data
         */
        _sino.reinitMyCount = function(callback,data){
            execSinoPlugin('4001',callback,data)
        }

        /**
         * 调用拍照方法
         * @param callback(flag,data) flag: 0 失败 1成功  data: 成功返回数据(返回数据为图片BASE64编码) 失败返回错误信息
         */
        /*  _sino.takePhoto = function(callback){
              execSinoPlugin('31',callback)
          }*/

        /**
         * 调用打开PDF 方法
         * @param url callback(flag,data) flag: 0 失败 1成功  data: 成功返回数据 失败返回错误信息
         * @param callback
         */
        _sino.openPDF = function(callback,data){
            execSinoPlugin('4005',callback,data);
        }

        /**
         * 打开及修改手势密码
         */
        _sino.modifyLockGesture = function(url,callback){
            execSinoPlugin('4003',callback,url);
        }
        /**
         * 判断是否已设置手势密码
         */
        _sino.checkGesture = function(url,callback){
            execSinoPlugin('4004',callback,url);
        }

        /**
         * 从信易通2.0->移动保全
         */
        _sino.entryOtherSys = function(callback,data){
            execSinoPlugin('6001',callback,data);
        };
        /**
         * 从移动保全-->信易通2.0
         */
        _sino.entryLocalSys= function(callback,data){
            execSinoPlugin('6002',callback,data);
        }
        /**
         * 将日志打印到App中
         */
        /*var log = window.console.log();
        window.console.log = function(){
            if(sino.isApp()){
                execSinoPlugin('9999',function(){},arguments);
            }
            log.apply(window.console,arguments);
        };*/

        function execSinoPlugin(id,fn,data){
            id = appVersion==='IOS'?_argsMap[id]:id;
            if(data) data = [data];
            else data = [];
            var result = {};
            cordova.exec(function(data) {
                //自定义 调用成功方法 返回参数为json对象。
                result.success = true;
                result.data = data;
                if(fn) fn(result);
            }, function(err) {
                //自定义 调用失败方法 返回参数为err
                result.success = false;
                result.data = err;
                if(fn) fn(result);

            }, "SignaPlugin", id, data);
        }

    }

})