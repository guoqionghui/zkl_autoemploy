/**
 * Created by LHY on 15/11/12.
 */
$(function() {
	console.log("sino.isApp()================" + sino.isApp());
	if(sino.isApp()) {
		//打开APP要做的事
		/*监听cordova加载完毕*/
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
			/*监听安卓返回键*/
			document.addEventListener("backbutton", onBackbutton, false);
			/*监听app切换到后台运行*/
			document.addEventListener("pause", onPause, false);
			/*监听app切换到前台运行*/
			document.addEventListener("resume", onResume, false);
		}
	}
	/**
	 * 进行APP的相关初始化操作
	 */
	sino.initAppData = function() {
			sino.loadViewport();
		}
		//主框架页加载完成后 初始化APP信息
	sino.initAppData();
})

function onBackbutton() {
	console.log("onBackbutton==========================已加载");
}

function onPause() {
	console.log("onPause==========================已加载");

}

function onResume() {
	console.log("onResume==========================已加载");
}

function upload() {
	var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
	var targetPath = cordova.file.documentsDirectory + "testImage.png";
	var trustHosts = true;
	var options = {};
	$cordovaFileTransfer.upload(server, filePath, options)
		.then(function(result) {
			// Success!
		}, function(err) {
			// Error
		}, function(progress) {
			// constant progress updates
		});

}