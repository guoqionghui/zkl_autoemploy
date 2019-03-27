/**
 *  用于HTML5文件相关操作
 *  适用于cordova APP(phoneGap)
 *  最悲哀的就是没人懂你的喜悦
 *  @author LHY
 */

(function() {
    window.sino_file = {};
    
    sino_file.tempDirURL = 'cdvfile://localhost/temporary/';
    
    sino_file.enabled = window.resolveLocalFileSystemURL && window.requestFileSystem;
    
    //用于读取数据的类型 
    sino_file.readType = {
        BLOB:0, //二进制字符串
        TEXT:1, //文本字符串
        DATA_URL:2, //BASE64编码
        ARRAY:3, //ArrayBuffer 对象
        FILE_URI:4, //filesystem地址
        CORDOVA_URL:5 //cordova 的url 可用于src等属性
    };
    
    /**
     * 读取文件内容
     * @param path 文件路径
     * @param type @see sino_file.readType
     * @param callback
     */
    sino_file.readFileByPath = function(path,type,callback){
        type = type || 'text';//默认为text
        
        window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024,onSuccess, sino_file.errorHandler);
        function onSuccess(fs){
            fs.root.getFile(path, {}, function(fileEntry) {
                //读取文件
                sino_file.readFile(fileEntry,type,callback,sino_file.errorHandler);
            },sino_file.errorHandler);
        }
        
    };
    
    /**
     * 根据filesystem URL 读取文件 
     * @param url 文件路径 在ios中格式为 file:///... 也可以为 cordova url格式
     * @param type @see sino_file.readType
     * @param callback 读取后的回调函数 参数为 读取到得数据
     */
    sino_file.readFileByURL = function(url,type,callback){
        window.resolveLocalFileSystemURL(url, function(fileEntry) {
            //读取文件
            sino_file.readFile(fileEntry,type,callback,sino_file.errorHandler);
        },sino_file.errorHandler);
    };
    
    /**
     * 向文件中写入内容
     * @param url 文件路径
     * @param content 写入的内容
     * @param callback 写入成功后回调函数
     */
    sino_file.writeFileByURL = function(url,content,callback){
        window.resolveLocalFileSystemURL(url, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter){
                fileWriter.onwriteend = function(e) {
                    if(callback) callback();
                };

                fileWriter.onerror = function(e) {
                    console.log('Write failed: ' + e.toString());
                };
                
                fileWriter.write(content);
            },sino_file.errorHandler);
        });
    };
    
    /**
     * 创建文件
     */
    sino_file.createFile = function(url,callback){
        var index = url.lastIndexOf('/');
        var dir = url.slice(0,index);
        var fileName = url.slice(index+1);
        console.log(dir);
        console.log(fileName);
        
        window.resolveLocalFileSystemURL(dir, function(fileEntry) {
            console.log('获得文件成功');
            fileEntry.getFile(fileName,{create:true},function(fileEntry){
                if(callback) callback(fileEntry);
            },sino_file.errorHandler);
        },sino_file.errorHandler);
    }
    
    /**
     * 根据文件路径 判断文件是否存在
     * @param url
     * @param callback 参数{
     *      isExist:1 存在 0 不存在
     *      entry:当文件存在时返回文件对象
     * }
     */
    sino_file.isExist = function(url,callback){
        window.resolveLocalFileSystemURL(url,function(fileEntry){
            callback({
                isExist:1,
                entry:fileEntry
            });
        },function(e){
            callback({
                isExist:0
            });
        });
    };
    
    
    /**
     * 根据路径创建目录
     * @param path
     * @param callback 返回最后创建成功的目录entry
     */
    sino_file.mkdirs = function(path,callback){
        window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024,onSuccess, sino_file.errorHandler);
        
        
        function onSuccess(fs){
            createDir(fs.root,path.split('/'));
        }
        
        function createDir(rootDirEntry, folders) {
            if (folders[0] == '.' || folders[0] == '') {
                folders = folders.slice(1);
            }
            
            rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
                if (folders.length > 1 ) {
                    createDir(dirEntry, folders.slice(1));
                }else{
                    if(callback) callback(dirEntry);
                }
            }, sino_file.errorHandler);
        };
    };
    
    /**
     * 移动文件 
     * @param src 原文件URL
     * @param dir 目标URL 以cdvfile://localhost/temporary/ 开头
     * @param newName copy后文件名称 如果无需改名 为null
     * @param callback 
     */
    sino_file.move = function(src,dir,newName,callback){
        console.log('准备移动文件,src:'+src+'\ndir:'+dir+'\nnewName:'+newName);
        var _dir = dir.replace(sino_file.tempDirURL,'');
        console.log(_dir);
        sino_file.mkdirs(_dir,function(dirEntry){
            window.resolveLocalFileSystemURL(src,function(srcEntry){
                srcEntry.moveTo(dirEntry,newName);
                if(callback) callback();
            });
        });
    };
    
    /**
     * 根据url删除 文件
     * @param url 文件url file:/// 或 cdvfile:// 
     * @param callback 执行完成后回调函数
     */
    sino_file.deleteByURL = function(url,callback){
        try{
            window.resolveLocalFileSystemURL(url, function(entry) {
                if(entry.isFile){
                    entry.remove();
                }else{
                    entry.removeRecursively();
                }
                if(callback) callback();
            },function(){
                if(callback) callback();
            });
        }catch(e){
            console.error(e);
            if(callback) callback();
        }
        
    };
    
    /**
     * 删除temp目录下所有文件
     * @param callback
     * @param type file 为删除文件 dir 为删除目录 为空 则都删除
     */
    sino_file.deleteTemp = function(callback,type){
        window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024,onSuccess, sino_file.errorHandler);
        
        function onSuccess(fs){
            var dirReader = fs.root.createReader();
            
            readEntries();
            
            function readEntries(){
                dirReader.readEntries(function(results){
                    if(results.length){
                        results.forEach(function(entry,i){
                            if(entry.isFile){
                                if(!type || type == 'file') entry.remove();
                            }else{
                                if(!type || type == 'dir') entry.removeRecursively();
                            }
                        });
                        readEntries();
                    }else{
                        if(callback) callback();
                    }
                });
            }
        }
    };
    
    /**
     * 根据type读取文件
     */
    sino_file.readFile = function(fileEntry,type,success,error){
        console.log('fileEntry:');
        console.log(fileEntry);
        fileEntry.file(function(file) {
            console.log('开始读取文件');
            console.log(file);
            var reader = new FileReader();
            reader.onloadend = function(e) {
                console.log(e);
                success(e.target.result);
            };

            switch (type) {
                case sino_file.readType.BLOB:
                    reader.readAsBinaryString(file);
                    break;
                case sino_file.readType.TEXT:
                    reader.readAsText(file);
                    break;
                case sino_file.readType.DATA_URL:
                    reader.readAsDataURL(file);
                    break;
                case sino_file.readType.ARRAY:
                    reader.readAsArrayBuffer(file);
                    break;
                case sino_file.readType.FILE_URI:
                    success(fileEntry.toURL());
                    break;
                case sino_file.readType.CORDOVA_URL:
                    success(file.localURL);
                    break;
                default:
                    reader.readAsText(file);
                }
        }, error);
    };

    /**
     * 调用cordova 的 file-transfer 插件进行文件上传
     * 递归上传所有文件 无论失败还是成功均会处理完所有文件 调用回调函数
     * @param options 对象 
     * {
     *      data:[{fileURL:文件地址,options:@see file-transfer的upload方法中options参数}]
     *      server:服务器地址
     *      callback: 传入参数数组 每个元素如下{
     *                            success:如果失败为UNDEFINED 成功为插件回调参数
     *                            error:如果成功为UNDEFINED 失败为插件回调函数
     *                            data:执行上传时的data对象
     *                        }
     *      onprogress:每完成一次就调用一次每个元素如下{
     *                            success:如果失败为UNDEFINED 成功为插件回调参数
     *                            error:如果成功为UNDEFINED 失败为插件回调函数
     *                            data:执行上传时的data对象
     *      }
     * }
     * 
     * 数组 包含fileURL server options success error等参数
     */
    sino_file.uploadFile = function(options){
        
        var returnData = [];
        
        if(options.data.length > 0){
            options.data[0].index = 0;
            options.data[0].options.headers.isStart = 1;//标识这是本次上传中第一个上传请求
            upload(options.data[0]);
        }
        
        function upload(parames){
            var ft = new FileTransfer();
            
            ft.upload(parames.fileURL,options.server,function(r){
                console.log('服务器返回:',r);
                var currData = {
                    success:r,
                    data:parames
                };
                returnData.push(currData);
                var respObj = JSON.parse(r.response);
                var index = parames.index + 1;
                if(index < options.data.length&&respObj.flag=='1'){
                    options.data[index].index = index;
                    options.onprogress(currData);
                    upload(options.data[index]);
                }else{
                    options.onprogress(currData);
                    options.callback(returnData);
                }
            },function(error){
                console.log('服务器返回:',error);
                var currData = {
                        error:error,
                        data:parames
                };
                
                returnData.push(currData);
                var index = parames.index + 1;
                if(index < options.data.length){
                    options.data[index].index = index;
                    options.onprogress(currData);
                    upload(options.data[index]);
                }else{
                    options.onprogress(currData);
                    options.callback(returnData);
                }
            },parames.options);
        }
        
    };
    
    /**
     * 下载文件 文件保存在临时目录
     * @param options 数组 元素格式{
     *      url:下载路径,
     *      fileName:文件名,
     *      coverOnExit:如果文件存在是否覆盖 1为覆盖 0 为不覆盖 直接返回成功
     * }
     * @param callback 参数为数组 元素格式{
     *      success:如果成功 包含成功参数
     *      error:失败 包含失败参数
     *      data:当前下载的options子元素
     * }
     */
    sino_file.download = function(options,callback){
        var returnData = [];
        if(options.length > 0){
            options[0].index = 0;
            download(options[0]);
        }
        
        function download(parames){
            //如果下载为空 判定为失败 直接进入下一个
            if(!parames.url){
                onError({});
            }else{
                var ft = new FileTransfer();
                var savePath = sino_file.tempDirURL+parames.fileName;
                parames.cordovaURL = savePath;
                //如果不覆盖已经存在的文件 则不继续下载
                if(!parames.coverOnExit){
                    //判断文件是否存在
                    sino_file.isExist(savePath,function(existData){
                        console.log('文件'+ (existData.isExist ? '已存在,不进行下载操作' : '不存在,准备下载'));
                        //如果文件存在  直接返回成功
                        if(existData.isExist){
                            onSuccess(existData.entry);
                        }else{
                            console.log('开始下载:'+savePath);
                            ft.download(parames.url,savePath,onSuccess,onError);
                        }
                    });
                }else{
                    console.log('开始下载:'+savePath);
                    ft.download(parames.url,savePath,onSuccess,onError);
                }
                
            }
            
            
            function onSuccess(entry){
                console.log('下载成功:',entry);
                returnData.push({
                    success:entry,
                    data:parames
                });
                
                var index = parames.index + 1;
                if(index < options.length){
                    options[index].index = index;
                    download(options[index]);
                }else{
                    callback(returnData);
                }
            }
            
            function onError(error){
                console.log('下载失败:',error);
                returnData.push({
                    error:error,
                    data:parames
                });
                
                var index = parames.index + 1;
                if(index < options.length){
                    options[index].index = index;
                    download(options[index]);
                }else{
                    callback(returnData);
                }
            }
        }
    };
    
    sino_file.errorHandler = function(e) {
        console.log('发生错误:',e);
    };
})();