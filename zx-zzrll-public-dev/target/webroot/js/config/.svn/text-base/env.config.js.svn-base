(function(){
    //不同环境请修改env字符串
    var env = 'DEV';
    var config = {
        //生产环境配置
        PRODUCT:{
            env:'PRODUCT',
            serverPath:'http://127.0.0.1:8080/ms',
            androidPath:'download/SinoPM.apk',
            iOSPath:'itms-services://?action=download-manifest&url=https://dn-lhy.qbox.me/SinoPM/SinoPM.plist'
        },
        BETA:{
            env:'BETA',
            serverPath:'http://127.0.0.1:8080/ms',
            androidPath:'download/SinoPMBeta.apk',
            iOSPath:'itms-services://?action=download-manifest&url=https://dn-lhy.qbox.me/SinoPM/SinoPMBeta.plist'
        },
        //本机环境
        DEV:{
            env:'DEV',
            serverPath:'http://127.0.0.1:8080/ms',
            androidPath:'download/SinoPMBeta.apk',
            iOSPath:'itms-services://?action=download-manifest&url=https://dn-lhy.qbox.me/SinoPM/SinoPMBeta.plist'
        }
    };

    window.GloConfig = window.GloConfig || config[env];
    GloConfig.basePath = '';
})();