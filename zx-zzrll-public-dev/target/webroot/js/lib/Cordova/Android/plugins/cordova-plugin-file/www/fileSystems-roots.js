cordova.define("cordova-plugin-file.fileSystems-roots",function(e,l,n){var i=null,o=e("./FileSystem"),s=e("cordova/exec");e("./fileSystems").getFs=function(e,l){function n(n){i={};for(var s=0;s<n.length;++s){var t=n[s],f=new o(t.filesystemName,t);i[f.name]=f}l(i[e])}i?l(i[e]):s(n,null,"File","requestAllFileSystems",[])}});
//# sourceMappingURL=fileSystems-roots.js.map
