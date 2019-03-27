cordova.define("org.apache.cordova.intent", function(require, exports, module) { /*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

/**
 * Provides access to the vibration mechanism on the device.
 */

module.exports = {

    /**
     * 一共5个参数
       第一个 :成功会掉
       第二个 :失败回调
       第三个 :将要调用的类的配置名字(在config.xml中配置 稍后在下面会讲解)
       第四个 :调用的方法名(一个类里可能有多个方法 靠这个参数区分)
       第五个 :传递的参数  以json的格式
     */
    demo: function(mills) {
    	var intent = 0;
    	if(mills==1){
    		intent="intent";
    	}else if(mills==20){
    		intent="_20";
    	}else if(mills==21){
    		intent="_21";
    	}else if(mills==22){
    		intent="_22";
    	}
    	else if(mills==23){
    		intent="_23";
    	}
    	else if(mills==24){
    		intent="_24";
    	}
        exec(function(winParam){
        	alert(winParam);
        }, null, "Demo", intent, [mills]);
    },
};

});
