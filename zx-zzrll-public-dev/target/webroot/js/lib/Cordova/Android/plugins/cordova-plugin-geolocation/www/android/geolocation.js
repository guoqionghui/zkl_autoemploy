cordova.define("cordova-plugin-geolocation.geolocation",function(o,i,e){var n=cordova.require("cordova/exec"),r=o("cordova/utils"),a=o("./PositionError"),t={};e.exports={getCurrentPosition:function(o,i,e){var r=function(){var n=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation");n.getCurrentPosition(o,i,e)},t=function(){i&&i(new a(a.PERMISSION_DENIED,"Illegal Access"))};n(r,t,"Geolocation","getPermission",[])},watchPosition:function(o,i,e){var c=r.createUUID(),l=function(){var n=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation");t[c]=n.watchPosition(o,i,e)},g=function(){i&&i(new a(a.PERMISSION_DENIED,"Illegal Access"))};return n(l,g,"Geolocation","getPermission",[]),c},clearWatch:function(o){var i=function(){var i=t[o],e=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation");e.clearWatch(i)};n(i,null,"Geolocation","getPermission",[])}}});
//# sourceMappingURL=geolocation.js.map
