!function(e,t){e.dom=function(i){return"string"!=typeof i?i instanceof Array||i[0]&&i.length?[].slice.call(i):[i]:(e.__create_dom_div__||(e.__create_dom_div__=t.createElement("div")),e.__create_dom_div__.innerHTML=i,[].slice.call(e.__create_dom_div__.childNodes))};var i='<div class="mui-poppicker">\t\t<div class="mui-poppicker-header">\t\t\t<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\t\t\t<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\t\t\t<div class="mui-poppicker-clear"></div>\t\t</div>\t\t<div class="mui-poppicker-body">\t\t</div>\t</div>',c='<div class="mui-picker">\t\t<div class="mui-picker-inner">\t\t\t<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\t\t\t<ul class="mui-pciker-list">\t\t\t</ul>\t\t\t<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\t\t</div>\t</div>';e.PopPicker=e.Class.extend({init:function(c){var a=this;a.options=c||{},a.options.buttons=a.options.buttons||["取消","确定"],a.panel=e.dom(i)[0],t.body.appendChild(a.panel),a.ok=a.panel.querySelector(".mui-poppicker-btn-ok"),a.cancel=a.panel.querySelector(".mui-poppicker-btn-cancel"),a.body=a.panel.querySelector(".mui-poppicker-body"),a.mask=e.createMask(),a.cancel.innerText=a.options.buttons[0],a.ok.innerText=a.options.buttons[1],a.cancel.addEventListener("tap",function(e){a.hide()},!1),a.ok.addEventListener("tap",function(e){if(a.callback){var t=a.callback(a.getSelectedItems());t!==!1&&a.hide()}},!1),a.mask[0].addEventListener("tap",function(){a.hide()},!1),a._createPicker(),a.panel.addEventListener(e.EVENT_START,function(e){e.preventDefault()},!1),a.panel.addEventListener(e.EVENT_MOVE,function(e){e.preventDefault()},!1)},_createPicker:function(){var t=this,i=t.options.layer||1,a=100/i+"%";t.pickers=[];for(var n=1;n<=i;n++){var s=e.dom(c)[0];s.style.width=a,t.body.appendChild(s);var r=e(s).picker();t.pickers.push(r),s.addEventListener("change",function(e){var t=this.nextSibling;if(t&&t.picker){var i=e.detail||{},c=i.item||{};t.picker.setItems(c.children)}},!1)}},setData:function(e){var t=this;e=e||[],t.pickers[0].setItems(e)},getSelectedItems:function(){var e=this,t=[];for(var i in e.pickers){var c=e.pickers[i];t.push(c.getSelectedItem()||{})}return t},show:function(i){var c=this;c.callback=i,c.mask.show(),t.body.classList.add(e.className("poppicker-active-for-page")),c.panel.classList.add(e.className("active")),c.__back=e.back,e.back=function(){c.hide()}},hide:function(){var i=this;i.disposed||(i.panel.classList.remove(e.className("active")),i.mask.close(),t.body.classList.remove(e.className("poppicker-active-for-page")),e.back=i.__back)},dispose:function(){var e=this;e.hide(),setTimeout(function(){e.panel.parentNode.removeChild(e.panel);for(var t in e)e[t]=null,delete e[t];e.disposed=!0},300)}})}(mui,document);
//# sourceMappingURL=mui.poppicker.js.map