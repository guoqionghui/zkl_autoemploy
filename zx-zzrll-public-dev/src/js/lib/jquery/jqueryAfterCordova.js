/**
 * 在APP中延迟jQuery ready事件的执行 直至Cordova加载完成
 * Created by LHY on 16/3/3.
 */

(function (){
    $.holdReady(true);//阻止jquery的ready事件
    //如果是APP 版本则要等到 cordova加载完成后才能执行ready事件
    if(navigator.userAgent.match('SINO_([\\w])+_APP/([\\d.]+)')){
        document.addEventListener('deviceready',function(){
            console.log('cordova加载完成');
            cordova.sino = {};
            $.holdReady(false);
        });
    }else{
        $.holdReady(false);
    }
})();