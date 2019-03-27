/**
 * Created by LHY on 16/3/21.
 */
$(function(){
    sino.utils = sino.utils || {};

    /**
     * 将数字转换为中文
     * @param n
     * @returns {string}
     */
    sino.utils.toChineseNum = function(n){
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

    /**
     * 对日期进行加减操作 该方法不会修改传入的Date对象
     * @param date 如果为null 则表示为当前日期
     * @param unit 单位 y:年 M:月 d:日 h:小时 m:分钟 s:秒
     * @param value 增加的数值 可以为负数
     * @return 返回值为修改后的新的Date对象
     */
    sino.utils.addDate = function(date,unit,value){
        date = date ? date instanceof Date ? new Date(date.getTime()) : new Date(date) : new Date();
        var units = {
            y:'FullYear',
            M:'Month',
            d:'Date',
            h:'Hours',
            m:'Minutes',
            s:'Seconds'
        }

        try{
            if(units[unit]){
                date['set'+units[unit]](date['get'+units[unit]]() + parseInt(value));
            }
        }catch (e){
            console.error(e);
        }

        return date;
    }

    /**
     * 获取当前日期字符串
     */
    sino.utils.getCurrDate = function(){
        return this.getDateStr();
    }

    sino.utils.getDateStr = function(date){
        date = date ? date instanceof Date ? new Date(date.getTime()) : new Date(date) : new Date();
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        day = day < 10 ? '0'+day : day;
        month = month < 10 ? '0' + month : month;

        return year + '-' + month + '-' + day;
    }


    /**
     * 获取本周的所有日期
     * @param date
     */
    sino.utils.getWeekDates = function(date){
        date = date ? date instanceof Date ? new Date(date.getTime()) : new Date(date) : new Date();
        var day = date.getDay();
        var week = [];
        for(var i=1;i<=5;i++){
            week.push(this.addDate(date,'d',i - day));
        }
        return week;
    }

    /**
     * 判断是否为假日 目前为周六或周日
     * @param date(可选) 毫秒数或Date 不传或传null为当前日期
     */
    sino.utils.isHoliday = function(date){
        date = date ? date instanceof Date ? new Date(date.getTime()) : new Date(date) : new Date();
        var day = date.getDay();
        return day === 6 || day === 7;
    }
});