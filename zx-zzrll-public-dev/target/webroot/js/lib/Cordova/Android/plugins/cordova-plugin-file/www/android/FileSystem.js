cordova.define("cordova-plugin-file.androidFileSystem",function(e,t,n){FILESYSTEM_PROTOCOL="cdvfile",n.exports={__format__:function(e,t){var n,o=/^content:\/\//.exec(t);if(o)n=t.substring(o[0].length-1);else{n=FileSystem.encodeURIPath(e),/^\//.test(n)||(n="/"+n);var i=/\?.*/.exec(t);i&&(n+=i[0])}return FILESYSTEM_PROTOCOL+"://localhost/"+this.name+n}}});
//# sourceMappingURL=FileSystem.js.map
