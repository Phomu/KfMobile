"use strict";var pageId=$("body").attr("id"),configName="kf_config",config={},setCookie=function(e,a,t,n){document.cookie="{0}{1}={2}{3};path=/;".replace("{0}","undefined"==typeof n||null===n?pageInfo.cookiePrefix:n).replace("{1}",e).replace("{2}",encodeURI(a)).replace("{3}",t?";expires="+t.toUTCString():"")},getCookie=function(e,a){var t=new RegExp("(^| ){0}{1}=([^;]*)(;|$)".replace("{0}","undefined"==typeof a||null===a?pageInfo.cookiePrefix:a).replace("{1}",e)),n=document.cookie.match(t);return n?decodeURI(n[2]):null},getDate=function(e){var a=new Date,t=/^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(e);if(!t)return null;var n="undefined"==typeof t[1]?0:"+"===t[1]?1:-1,o=n===-1?-parseInt(t[2]):parseInt(t[2]),i=t[3];switch(i){case"Y":a.setFullYear(o);break;case"y":a.setYear(0===n?o:a.getYear()+o);break;case"M":a.setMonth(0===n?o:a.getMonth()+o);break;case"d":a.setDate(0===n?o:a.getDate()+o);break;case"h":a.setHours(0===n?o:a.getHours()+o);break;case"m":a.setMinutes(0===n?o:a.getMinutes()+o);break;case"s":a.setSeconds(0===n?o:a.getSeconds()+o);break;case"ms":a.setMilliseconds(0===n?o:a.getMilliseconds()+o);break;default:return null}return a},readConfig=function(){var e=null;if(e=localStorage.configName){try{e=JSON.parse(e)}catch(a){return}e&&"object"===$.type(e)&&!$.isEmptyObject(e)&&(config=e)}},writeConfig=function(){localStorage.configName=JSON.stringify(config)},handleMainMenu=function(){$("#mainMenuTogglerBtn").click(function(){$("#mainMenu").css("max-height",document.documentElement.clientHeight-50+"px")})},handleBackToTop=function(){$(window).scroll(function(){$(window).scrollTop()>300?$("#backToTop").fadeIn():$("#backToTop").fadeOut()}),$("#backToTop").click(function(){$("body, html").animate({scrollTop:0})})},handleSearchDialog=function(){var e=$("#searchDialog");e.on("shown.bs.modal",function(){$("#searchKeyword").focus()}).find("form").submit(function(){var e=$(this),a=e.find("#searchKeyword"),t=e.find("#searchType").val(),n=$.trim(a.val());if("gjc"===t)e.attr("action",pageInfo.rootPath+"gjc/"+n);else if("username"===t)e.attr("action",pageInfo.rootPath+"user/username/"+n);else if(e.attr("action",pageInfo.rootPath+"search"),a.attr("name","author"===t?"pwuser":"keyword"),"title"===t&&(1===n.length||2===n.length&&/^[\w\-]+$/.test(n))){var o=e.find('input[name="method"]');o.val("OR"),a.val(n+" "+Math.floor((new Date).getTime()/1e3)),window.setTimeout(function(){a.val(n),o.val("AND")},200)}}),e.find('input[name="searchRange"]').on("click",function(){var a="all";"current"===$(this).val()&&(a=pageInfo.fid),e.find('input[name="f_fid"]').val(a)});var a=e.find('input[name="searchRange"][value="current"]');e.find("#searchType").change(function(){var e=$(this).val();a.data("enabled")&&a.prop("disabled","gjc"===e||"username"===e)}),"threadPage"!==pageId&&"readPage"!==pageId||a.prop("disabled",!1).data("enabled",!0).click()},handleLogoutButton=function(){$(document).on("click","#dropdownItemLogout",function(){if(!window.confirm("是否登出账号？"))return!1})},handleThreadPageNav=function(){$(document).on("click",".page-item.active > .page-link",function(e){e.preventDefault();var a=parseInt(window.prompt("要跳转到第几页？（共"+pageInfo.maxPageNum+"页）",pageInfo.currentPageNum));if(a){var t=pageInfo.urlParam.replace(/&?page=\d*/i,"")+"&page="+a;location.href=pageInfo.rootPath+"thread?"+t}})},handleAtTipsBtn=function(){$("#atTips").click(function(){var e=$(this),a=e.data("time"),t=getCookie("at_tips_time");if(a&&a!==t){if(t)t!==a&&setCookie("prev_at_tips_time",t);else{var n=(new Date).getDate();setCookie("prev_at_tips_time",(n<10?"0"+n:n)+"日00时00分")}setCookie("at_tips_time",a,getDate("+3d")),e.removeClass("btn-outline-danger").addClass("btn-outline-primary")}})},highlightUnReadAtTipsMsg=function(){if(pageInfo.gjc===pageInfo.userName){var e=getCookie("prev_at_tips_time");if(e&&/^\d+日\d+时\d+分$/.test(e)){var a="";$(".thread-list-item time").each(function(t){var n=$(this),o=$.trim(n.text());return 0===t&&(a=o),e<o&&a>=o&&(n.addClass("text-danger"),void(a=o))}),$(document).on("click",".thread-list-item .thread-link-item a",function(){setCookie("prev_at_tips_time","",getDate("-1d"))})}}},handleIndexThreadPanel=function(){config.activeNewReplyPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",config.activeNewReplyPanel)).tab("show"),config.activeTopRecommendPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",config.activeTopRecommendPanel)).tab("show"),$(document).on("shown.bs.tab",'a[data-toggle="tab"]',function(e){var a=$(e.target);readConfig();var t=a.attr("href"),n="activeNewReplyPanel";t.indexOf("TopRecommendPanel")>0&&(n="activeTopRecommendPanel"),config[n]=a.attr("href"),writeConfig()})};$(function(){"loginPage"!==pageId&&(readConfig(),handleMainMenu(),handleBackToTop(),handleSearchDialog(),handleLogoutButton(),"indexPage"===pageId?(handleAtTipsBtn(),handleIndexThreadPanel()):"threadPage"===pageId?handleThreadPageNav():"gjcPage"===pageId&&highlightUnReadAtTipsMsg())});
//# sourceMappingURL=app.js.map