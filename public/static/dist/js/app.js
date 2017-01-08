(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _config = require('./module/config');

var _public = require('./module/public');

var _index = require('./module/index');

var _read = require('./module/read');

var _post = require('./module/post');

var _other = require('./module/other');

// 页面ID
window.pageId = $('body').attr('id');

/**
 * 初始化
 */
$(function () {
    if (pageId === 'loginPage') return;else if (pageId === 'registerPage') {
        (0, _other.validateRegisterField)();
        return;
    }
    (0, _config.init)();

    (0, _public.preventCloseWindow)();
    (0, _public.handleMainMenu)();
    (0, _public.handleMainMenuLink)();
    (0, _public.handleRollToTopOrBottomBtn)();
    (0, _public.handleSearchDialog)();
    (0, _public.fillCommonForumPanel)();
    (0, _public.showEditCommonForumDialog)();
    if ($('.page-input').length > 0) {
        (0, _public.handlePageInput)();
    }
    if (pageId === 'indexPage') {
        (0, _index.handleAtTipsBtn)();
        (0, _index.handleIndexThreadPanel)();
        (0, _index.handleSelectBgImage)();
        (0, _index.handleSelectBgColor)();
        (0, _index.handleCustomBgStyle)();
    } else if (pageId === 'readPage') {
        (0, _read.gotoFloor)();
        (0, _read.handleFastGotoFloorBtn)();
        (0, _read.handleTuiThreadBtn)();
        (0, _read.handleCopyFloorLinkBtn)();
        (0, _read.handleFastReplyBtn)();
        (0, _read.handleBlockFloorBtn)();
        (0, _read.handleBuyThreadBtn)();
        (0, _read.copyBuyThreadList)();
        (0, _read.handleFloorImage)();
        (0, _post.checkPostForm)();
        (0, _public.bindFastSubmitShortcutKey)($('#postContent'));
        (0, _read.handleCopyCodeBtn)();
        (0, _post.addSmileCode)($('#postContent'));
        (0, _read.bindMultiQuoteCheckClick)();
        (0, _post.handleClearMultiQuoteDataBtn)();
        $('.multi-reply-btn').click(function () {
            (0, _post.handleMultiQuote)(1);
        });
    } else if (pageId === 'postPage') {
        (0, _post.checkPostForm)();
        (0, _public.bindFastSubmitShortcutKey)($('#postContent'));
        (0, _post.handleEditorBtns)();
        (0, _post.addSmileCode)($('#postContent'));
        (0, _post.handleAttachBtns)();
        (0, _post.handleClearMultiQuoteDataBtn)();
        if (pageInfo.multiQuote) (0, _post.handleMultiQuote)(2);
    } else if (pageId === 'gjcPage') {
        (0, _other.highlightUnReadAtTipsMsg)();
    } else if (pageId === 'gameIntroSearchPage') {
        (0, _other.handleGameIntroSearchArea)();
    } else if (pageId === 'gameIntroPage') {
        (0, _other.tuiGameIntro)('game');
    } else if (pageId === 'gameIntroCompanyPage') {
        (0, _other.tuiGameIntro)('company');
    } else if (pageId === 'gameIntroTypePage') {
        (0, _other.tuiGameIntro)('type');
    } else if (pageId === 'gameIntroPropertyPage') {
        (0, _other.tuiGameIntro)('property');
    } else if (pageId === 'favorPage') {
        (0, _other.bindFavorPageBtnsClick)();
    } else if (pageId === 'friendPage') {
        (0, _other.bindFriendPageBtnsClick)();
    } else if (pageId === 'modifyPage') {
        (0, _other.syncPerPageFloorNum)();
        (0, _other.assignBirthdayField)();
        (0, _other.handleUploadAvatarFileBtn)();
    } else if (pageId === 'bankPage') {
        (0, _other.transferKfbAlert)();
    } else if (pageId === 'messagePage') {
        (0, _other.bindMessageActionBtnsClick)();
    } else if (pageId === 'readMessagePage') {
        (0, _read.handleFloorImage)();
        (0, _read.handleCopyCodeBtn)();
    } else if (pageId === 'writeMessagePage') {
        (0, _public.bindFastSubmitShortcutKey)($('#msgContent'));
        (0, _post.addSmileCode)($('#msgContent'));
    } else if (pageId === 'messageBannedPage') {
        (0, _public.bindFastSubmitShortcutKey)($('[name="banidinfo"]'));
    }

    //let tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({ 'container': 'body' });
    //console.log(`tooltip初始化耗时：${new Date() - tooltipStartTime}ms`);
});

},{"./module/config":2,"./module/index":6,"./module/other":8,"./module/post":9,"./module/public":10,"./module/read":11}],2:[function(require,module,exports){
/* 配置模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.write = exports.read = exports.init = exports.Config = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 配置名称
var name = 'kf_config';

/**
 * 配置类
 */
var Config = exports.Config = {
    // 主题每页楼层数量
    perPageFloorNum: 0,
    // 当前激活的最新回复面板
    activeNewReplyPanel: '#galgameNewReplyPanel',
    // 当前激活的当前推荐面板
    activeTopRecommendPanel: '#galgameTopRecommendPanel',
    // 当前激活的版块列表面板1
    activeForumPanel1: '',
    // 当前激活的版块列表面板2
    activeForumPanel2: '',
    // 常用版块列表
    commonForumList: [],
    // 默认的消息显示时间（秒），设置为-1表示永久显示
    defShowMsgDuration: -1
};

/**
 * 初始化
 */
var init = exports.init = function init() {
    window.Config = $.extend(true, {}, Config);
    read();
};

/**
 * 读取设置
 */
var read = exports.read = function read() {
    var options = localStorage[name];
    if (!options) return;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    options = normalize(options);
    window.Config = $.extend(true, {}, Config, options);
};

/**
 * 写入设置
 */
var write = exports.write = function write() {
    var options = Util.getDifferenceSetOfObject(Config, window.Config);
    localStorage[name] = JSON.stringify(options);
};

/**
 * 清空设置
 */
var clear = exports.clear = function clear() {
    localStorage.removeItem(name);
};

/**
 * 获取经过规范化的Config对象
 * @param {{}} options 待处理的Config对象
 * @returns {{}} 经过规范化的Config对象
 */
var normalize = function normalize(options) {
    var settings = {};
    if ($.type(options) !== 'object') return settings;
    $.each(options, function (key, value) {
        if (key in Config && $.type(value) === $.type(Config[key])) {
            settings[key] = value;
        }
    });
    return settings;
};

},{"./util":12}],3:[function(require,module,exports){
/* 设置对话框模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = undefined;

var _dialog = require('./dialog');

var Dialog = _interopRequireWildcard(_dialog);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 显示设置对话框
 */
var show = exports.show = function show() {
  var dialogName = 'configDialog';
  if ($('#' + dialogName).length > 0) return;
  (0, _config.read)();
  var bodyContent = '\n<fieldset class="fieldset mb-3 py-2">\n  <legend>\u4E3B\u9898\u9875\u9762\u76F8\u5173</legend>\n  <div class="form-group">\n    <label>\u4E3B\u9898\u6BCF\u9875\u697C\u5C42\u6570\u91CF</label>\n    <span class="tips" data-toggle="tooltip" title="\u4E3B\u9898\u9875\u9762\u4E2D\u6BCF\u9875\u7684\u697C\u5C42\u6570\u91CF\uFF08\u7528\u4E8E\u7535\u68AF\u76F4\u8FBE\u7B49\u529F\u80FD\uFF09\uFF0C\u5982\u679C\u4FEE\u6539\u4E86\u8BBA\u575B\u8BBE\u7F6E\u91CC\u7684\u201C\u6587\u7AE0\u5217\u8868\u6BCF\u9875\u4E2A\u6570\u201D\uFF0C\u8BF7\u5728\u6B64\u4FEE\u6539\u6210\u76F8\u540C\u7684\u6570\u76EE">[?]</span>\n    <select class="custom-select form-control" name="perPageFloorNum">\n      <option value="10">10</option><option value="20">20</option><option value="30">30</option>\n    </select>\n  </div>\n</fieldset>\n<fieldset class="fieldset mb-3 py-2">\n  <legend>\u5176\u5B83\u8BBE\u7F6E</legend>\n  <div class="form-group">\n    <label>\u9ED8\u8BA4\u6D88\u606F\u663E\u793A\u65F6\u95F4</label>\n    <span class="tips" data-toggle="tooltip" title="\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C\u8BBE\u7F6E\u4E3A-1\u8868\u793A\u6C38\u4E45\u663E\u793A\uFF0C\u4F8B\uFF1A15">[?]</span>\n    <input class="form-control" name="defShowMsgDuration" type="number" min="-1" required>\n  </div>\n</fieldset>\n<fieldset class="fieldset mb-3 py-2">\n  <legend>\u5173\u6CE8\u548C\u5C4F\u853D</legend>\n  <div class="form-check">\n    <label class="form-check-label">\n      <input class="form-check-input" name="followUserEnabled" type="checkbox" data-disabled="[data-name=openFollowUserDialog]"> \u5173\u6CE8\u7528\u6237\n    </label>\n    <span class="tips" data-toggle="tooltip" title="\u5F00\u542F\u5173\u6CE8\u7528\u6237\u7684\u529F\u80FD\uFF0C\u6240\u5173\u6CE8\u7684\u7528\u6237\u5C06\u88AB\u52A0\u6CE8\u8BB0\u53F7\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5173\u6CE8\u7528\u6237">[?]</span>\n    <a class="ml-3" data-name="openFollowUserDialog" href="#" role="button">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a>\n  </div>\n  <div class="form-check">\n    <label class="form-check-label">\n      <input class="form-check-input" name="blockUserEnabled" type="checkbox" data-disabled="[data-name=openBlockUserDialog]"> \u5C4F\u853D\u7528\u6237\n    </label>\n    <span class="tips" data-toggle="tooltip" title="\u5F00\u542F\u5C4F\u853D\u7528\u6237\u7684\u529F\u80FD\uFF0C\u4F60\u5C06\u770B\u4E0D\u89C1\u6240\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u7528\u6237">[?]</span>\n    <a class="ml-3" data-name="openBlockUserDialog" href="#" role="button">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a>\n  </div>\n  <div class="form-check">\n    <label class="form-check-label">\n      <input class="form-check-input" name="blockThreadEnabled" type="checkbox" data-disabled="[data-name=openBlockThreadDialog]"> \u5C4F\u853D\u4E3B\u9898\n    </label>\n    <span class="tips" data-toggle="tooltip" title="\u5F00\u542F\u5C4F\u853D\u6807\u9898\u4E2D\u5305\u542B\u6307\u5B9A\u5173\u952E\u5B57\u7684\u4E3B\u9898\u7684\u529F\u80FD\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u5173\u952E\u5B57">[?]</span>\n    <a class="ml-3" data-name="openBlockThreadDialog" href="#" role="button">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a>\n  </div>\n</fieldset>';
  var footerContent = '\n<button class="btn btn-primary" type="submit">\u786E\u5B9A</button>\n<button class="btn btn-secondary" data-dismiss="dialog" type="button">\u53D6\u6D88</button>';
  var $dialog = Dialog.create(dialogName, '助手设置', bodyContent, footerContent);
  Dialog.show(dialogName);
};

},{"./config":2,"./dialog":5}],4:[function(require,module,exports){
/* 常量模块 */
'use strict';

/**
 * 常量类
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Const = {
    // 存储多重引用数据的LocalStorage名称
    multiQuoteStorageName: 'kf_multi_quote',
    // at提醒时间的Cookie名称
    atTipsTimeCookieName: 'at_tips_time',
    // 上一次at提醒时间的Cookie名称
    prevAtTipsTimeCookieName: 'prev_at_tips_time',
    // 背景样式的Cookie名称
    bgStyleCookieName: 'bg_style',
    // 常用版块列表
    commonForumList: [{ fid: 106, name: '新作动态' }, { fid: 41, name: '网盘下载' }, { fid: 16, name: '种子下载' }, { fid: 52, name: '游戏讨论' }, { fid: 84, name: '动漫讨论' }, { fid: 67, name: 'CG下载' }, { fid: 5, name: '自由讨论' }, { fid: 56, name: '个人日记' }, { fid: 57, name: '同人漫本' }],
    // 可用版块列表
    availableForumList: [{ fid: 106, name: '新作动态' }, { fid: 52, name: '游戏讨论' }, { fid: 16, name: '种子下载' }, { fid: 41, name: '网盘下载' }, { fid: 67, name: 'CG下载' }, { fid: 102, name: '游戏推荐' }, { fid: 24, name: '疑难互助' }, { fid: 57, name: '同人漫本' }, { fid: 84, name: '动漫讨论' }, { fid: 92, name: '动画共享' }, { fid: 127, name: '漫画小说' }, { fid: 68, name: '音乐共享' }, { fid: 163, name: 'LIVE共享' }, { fid: 182, name: '转载资源' }, { fid: 94, name: '原创绘画' }, { fid: 87, name: '宅物交流' }, { fid: 86, name: '电子产品' }, { fid: 115, name: '文字作品' }, { fid: 96, name: '图片来源' }, { fid: 36, name: '寻求资源' }, { fid: 5, name: '自由讨论' }, { fid: 56, name: '个人日记' }, { fid: 9, name: '我的关注' }, { fid: 4, name: '意见投诉' }, { fid: 93, name: '管理组区' }, { fid: 59, name: '原创组区' }, { fid: 125, name: '水楼林立' }, { fid: 181, name: '私人日记' }, { fid: 42, name: '旧期资料' }, { fid: 128, name: '作品判定' }, { fid: 98, name: '日本语版' }, { fid: 99, name: '意見箱' }, { fid: 112, name: '掲示板' }, { fid: 100, name: '創作感想' }]
};

exports.default = Const;

},{}],5:[function(require,module,exports){
/* 对话框模块 */
'use strict';

/**
 * 创建对话框
 * @param {string} id 对话框ID
 * @param {string} title 对话框标题
 * @param {string} bodyContent 对话框主体内容
 * @param {string} footerContent 对话框底部内容
 * @param {string} style 对话框样式
 * @returns {jQuery} 对话框的jQuery对象
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var create = exports.create = function create(id, title, bodyContent) {
    var footerContent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    var html = '\n<div class="dialog-container" id="' + id + '" style="' + style + '" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="' + id + 'Title">\n  <div class="container" role="document">\n    <form>\n      <div class="dialog-header">\n        <h5 class="dialog-title" id="' + id + 'Title">' + title + '</h5>\n        <button class="close" data-dismiss="dialog" type="button" aria-label="\u5173\u95ED">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="dialog-body">' + bodyContent + '</div>\n      <div class="dialog-footer" ' + (!footerContent ? 'hidden' : '') + '>' + footerContent + '</div>\n    </form>\n  </div>\n</div>';
    var $dialog = $(html).appendTo('body');
    $dialog.on('click', '[data-dismiss="dialog"]', function () {
        return close(id);
    }).on('click', '.tips', function () {
        return false;
    }).on('click', '.disabled-link', function () {
        return false;
    }).keydown(function (e) {
        if (e.keyCode === 27) {
            return close(id);
        }
    }).find('legend [type="checkbox"]').click(function () {
        var $this = $(this);
        $this.closest('fieldset').prop('disabled', !$this.prop('checked'));
    }).end().find('input[data-disabled]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        $($this.data('disabled')).each(function () {
            var $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.removeClass('disabled-link');else $this.addClass('disabled-link');
            } else {
                $this.prop('disabled', !checked);
            }
        });
    }).end().find('[data-toggle="tooltip"]').tooltip({ 'container': 'body' });
    $(window).on('resize.' + id, function () {
        return show(id);
    });
    return $dialog;
};

/**
 * 显示或调整对话框
 * @param {string} id 对话框ID
 */
var show = exports.show = function show(id) {
    var $dialog = $('#' + id);
    if (!$dialog.length) return;
    $dialog.find('legend [type="checkbox"]').each(function () {
        $(this).triggerHandler('click');
    }).end().find('input[data-disabled]').each(function () {
        $(this).triggerHandler('click');
    });
    $dialog.fadeIn('fast').find('.dialog-body').css('max-height', $(window).height() - $dialog.find('.dialog-header').outerHeight() - $dialog.find('.dialog-footer').outerHeight()).end().find('.close:first').focus();
};

/**
 * 关闭对话框
 * @param {string} id 对话框ID
 * @returns {boolean} 返回false
 */
var close = exports.close = function close(id) {
    $('#' + id).fadeOut('fast', function () {
        $(this).remove();
    });
    $(window).off('resize.' + id);
    return false;
};

},{}],6:[function(require,module,exports){
/* 首页模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleCustomBgStyle = exports.handleSelectBgColor = exports.handleSelectBgImage = exports.handleIndexThreadPanel = exports.handleAtTipsBtn = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 处理首页的@提醒按钮
 */
var handleAtTipsBtn = exports.handleAtTipsBtn = function handleAtTipsBtn() {
    $('#atTips').click(function () {
        var $this = $(this);
        var time = $this.data('time');
        var cookieValue = Util.getCookie(_const2.default.atTipsTimeCookieName);
        if (!time || time === cookieValue) return;
        if (!cookieValue) {
            var currentDate = new Date().getDate();
            Util.setCookie(_const2.default.prevAtTipsTimeCookieName, (currentDate < 10 ? '0' + currentDate : currentDate) + '日00时00分');
        } else if (cookieValue !== time) {
            Util.setCookie(_const2.default.prevAtTipsTimeCookieName, cookieValue);
        }
        Util.setCookie(_const2.default.atTipsTimeCookieName, time, Util.getDate('+3d'));
        $this.removeClass('btn-outline-danger').addClass('btn-outline-primary');
    });
};

/**
 * 处理首页主题链接面板
 */
var handleIndexThreadPanel = exports.handleIndexThreadPanel = function handleIndexThreadPanel() {
    if (Config.activeNewReplyPanel) {
        $('a[data-toggle="tab"][href="' + Config.activeNewReplyPanel + '"]').tab('show');
    }
    if (Config.activeTopRecommendPanel) {
        $('a[data-toggle="tab"][href="' + Config.activeTopRecommendPanel + '"]').tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        var targetPanel = $target.attr('href');
        var typeName = '';
        if (targetPanel.includes('NewReplyPanel')) typeName = 'activeNewReplyPanel';else if (targetPanel.includes('TopRecommendPanel')) typeName = 'activeTopRecommendPanel';
        if (typeName && Config[typeName] !== targetPanel) {
            (0, _config.read)();
            Config[typeName] = targetPanel;
            (0, _config.write)();
        }
    });
};

/**
 * 处理选择页面背景图片
 */
var handleSelectBgImage = exports.handleSelectBgImage = function handleSelectBgImage() {
    $('#selectBgImage').on('click', '[data-id]', function () {
        var $this = $(this);
        var id = $this.data('id');
        var fileName = $this.data('filename');
        var path = $this.parent().data('path');
        if (!id || !fileName || !path) return;
        if (confirm('是否选择此背景图片？')) {
            Util.setCookie(_const2.default.bgStyleCookieName, id, Util.getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + path + fileName + '")');
            alert('背景已更换（图片可能需要一定时间加载）');
        }
    });
};

/**
 * 处理选择页面背景颜色
 */
var handleSelectBgColor = exports.handleSelectBgColor = function handleSelectBgColor() {
    $('#selectBgImage').on('click', '[data-color]', function () {
        var $this = $(this);
        var color = $this.data('color');
        if (!color) return;
        if (confirm('是否选择此背景颜色？')) {
            Util.setCookie(_const2.default.bgStyleCookieName, color, Util.getDate('+1y'));
            $('body, .modal-content').css('background', color);
            alert('背景已更换');
        }
    });
};

/**
 * 处理自定义背景样式
 */
var handleCustomBgStyle = exports.handleCustomBgStyle = function handleCustomBgStyle() {
    $('#customBgStyle').click(function () {
        var value = Util.getCookie(_const2.default.bgStyleCookieName);
        if (!value || parseInt(value)) value = '';
        value = prompt('请输入背景图片URL、颜色代码或CSS样式：\n（例：http://xxx.com/abc.jpg 或 #fcfcfc，留空表示恢复默认背景）\n' + '（注：建议选择简洁、不花哨、偏浅色系的背景图片或颜色）', value);
        if (value === null) return;
        var $bg = $('body, .modal-content, .dialog-container');
        if ($.trim(value) === '') {
            Util.setCookie(_const2.default.bgStyleCookieName, '', Util.getDate('-1d'));
            alert('背景已恢复默认');
            location.reload();
        } else if (/^https?:\/\/[^"']+/.test(value)) {
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $bg.css('background-image', 'url("' + value + '")');
            alert('背景已更换（图片可能需要一定时间加载）');
        } else if (/^#[0-9a-f]{6}$/i.test(value)) {
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $bg.css('background', value.toLowerCase());
            alert('背景已更换');
        } else if (!/[<>{}]/.test(value)) {
            value = value.replace(';', '');
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $bg.css('background', value);
            alert('背景已更换（图片可能需要一定时间加载）');
        } else {
            alert('格式不正确');
        }
    });
};

},{"./config":2,"./const":4,"./util":12}],7:[function(require,module,exports){
/* 消息模块 */
'use strict';

/**
 * 显示消息
 * @param {string|Object} options 消息或设置对象
 * @param {string} [options.msg] 消息
 * @param {number} [options.duration={@link Config.defShowMsgDuration}] 消息显示时间（秒），-1为永久显示
 * @param {boolean} [options.clickable=true] 消息框可否手动点击消除
 * @param {boolean} [options.preventable=false] 是否阻止点击网页上的其它元素
 * @param {number} [duration] 消息显示时间（秒），-1为永久显示
 * @example
 * show('<span class="mr-3">使用道具</span><span class="text-item">神秘系数<em class="text-warning">+1</em></span>', -1);
 * show({
 *   msg: '<span class="mr-3">抽取神秘盒子</span><span class="text-item">KFB<em class="text-warning">+8</em></span>',
 *   duration: 20,
 *   clickable: false,
 * });
 * @returns {jQuery} 消息框对象
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var show = exports.show = function show(options, duration) {
    var settings = {
        msg: '',
        duration: Config.defShowMsgDuration,
        clickable: true,
        preventable: false
    };
    if ($.type(options) === 'object') {
        $.extend(settings, options);
    } else {
        settings.msg = options;
        settings.duration = typeof duration === 'undefined' ? Config.defShowMsgDuration : duration;
    }

    var $container = $('.msg-container');
    var isFirst = $container.length === 0;
    if (!isFirst && !$('.mask').length) {
        if ($container.height() >= $(window).height() * 0.8) {
            destroy();
            isFirst = true;
        }
    }
    if (settings.preventable && !$('.mask').length) {
        $('<div class="mask"></div>').appendTo('body');
    }
    if (isFirst) {
        $container = $('<div class="container msg-container"></div>').appendTo('body');
    }

    var $msg = $('<div class="msg">' + settings.msg + '</div>').appendTo($container);
    $msg.on('click', '.stop-action', function (e) {
        e.preventDefault();
        $(this).text('正在停止&hellip;').closest('.msg').data('stop', true);
    });
    if (settings.clickable) {
        $msg.css('cursor', 'pointer').click(function () {
            hide($(this));
        }).find('a').click(function (e) {
            e.stopPropagation();
        });
    }
    if (settings.preventable) $msg.attr('preventable', true);
    $msg.slideDown('normal');
    if (settings.duration > -1) {
        setTimeout(function () {
            hide($msg);
        }, settings.duration * 1000);
    }
    return $msg;
};

/**
 * 显示等待消息
 * @param {string} msg 消息
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @returns {jQuery} 消息框对象
 */
var wait = exports.wait = function wait(msg) {
    var preventable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return show({ msg: msg, duration: -1, clickable: false, preventable: preventable });
};

/**
 * 隐藏指定消息框
 * @param {jQuery} $msg 消息框对象
 */
var hide = exports.hide = function hide($msg) {
    $msg.slideUp('normal', function () {
        remove($(this));
    });
};

/**
 * 移除指定消息框
 * @param {jQuery} $msg 消息框对象
 */
var remove = exports.remove = function remove($msg) {
    var $container = $msg.parent();
    $msg.remove();
    if (!$('.msg').length) {
        $container.remove();
        $('.mask').remove();
    } else if (!$('.msg[preventable]').length) {
        $('.mask').remove();
    }
};

/**
 * 销毁所有消息框
 */
var destroy = exports.destroy = function destroy() {
    $('.msg-container').remove();
    $('.mask').remove();
};

},{}],8:[function(require,module,exports){
/* 其它模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateRegisterField = exports.bindMessageActionBtnsClick = exports.transferKfbAlert = exports.handleUploadAvatarFileBtn = exports.syncPerPageFloorNum = exports.assignBirthdayField = exports.bindFriendPageBtnsClick = exports.bindFavorPageBtnsClick = exports.tuiGameIntro = exports.handleGameIntroSearchArea = exports.highlightUnReadAtTipsMsg = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 高亮关键词页面中未读的消息
 */
var highlightUnReadAtTipsMsg = exports.highlightUnReadAtTipsMsg = function highlightUnReadAtTipsMsg() {
    if (pageInfo.gjc !== pageInfo.userName) return;
    var timeString = Util.getCookie(_const2.default.prevAtTipsTimeCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    var prevString = '';
    $('.thread-list-item time').each(function (index) {
        var $this = $(this);
        var curString = $.trim($this.text());
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('text-danger');
            prevString = curString;
        } else return false;
    });

    $(document).on('click', '.thread-list-item .thread-link-item a', function () {
        Util.deleteCookie(_const2.default.prevAtTipsTimeCookieName);
    });
};

/**
 * 处理游戏搜索区域
 */
var handleGameIntroSearchArea = exports.handleGameIntroSearchArea = function handleGameIntroSearchArea() {
    $('#gameSearchKeyword').val(pageInfo.keyword);
    $('#gameSearchType').val(pageInfo.searchType);
};

/**
 * 推游戏介绍
 * @param {string} type 页面类型
 */
var tuiGameIntro = exports.tuiGameIntro = function tuiGameIntro(type) {
    var cookieName = '';
    if (type === 'company') cookieName = 'g_intro_inc_tui_';else if (type === 'type') cookieName = 'g_intro_adv_tui_';else if (type === 'property') cookieName = 'g_intro_moe_tui_';else cookieName = 'g_intro_tui_';
    cookieName += pageInfo.id;
    var url = Util.makeUrl('game_intro/' + type, 'id=' + pageInfo.id + '&tui=1');

    $('.tui-btn').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.data('wait')) return;
        if (Util.getCookie(cookieName, '')) {
            alert('你在48小时内已经推过');
            return;
        }
        $this.data('wait', true);
        $.ajax({
            type: 'GET',
            url: url,
            success: function success() {
                var $num = $this.find('span:first');
                var num = parseInt($num.text());
                $num.text('+1');
                setTimeout(function () {
                    $num.text(++num);
                }, 1000);
            },
            error: function error() {
                alert('操作失败');
            },
            complete: function complete() {
                $this.removeData('wait');
            },
            dataType: 'html'
        });
    });
};

/**
 * 绑定收藏夹页面按钮点击事件
 */
var bindFavorPageBtnsClick = exports.bindFavorPageBtnsClick = function bindFavorPageBtnsClick() {
    var $form = $('form[name="favorForm"]');

    $(document).on('click', '.remove-catalog', function () {
        return confirm('是否删除该目录？');
    });

    $('#addCatalog').click(function (e) {
        e.preventDefault();
        var type = $.trim(prompt('请输入收藏夹目录名称：'));
        if (!type) return;
        $form.find('[name="job"]').val('addtype');
        $form.find('[name="type"]').val(type);
        $form.submit();
    });

    $('#favorActionBtns').on('click', 'button', function () {
        var action = $(this).data('action');
        if (action === 'selectAll') {
            Util.selectAll($('[name="delid[]"]'));
        } else if (action === 'selectReverse') {
            Util.selectReverse($('[name="delid[]"]'));
        } else if (action === 'delete') {
            var $checked = $('[name="delid[]"]:checked');
            if ($checked.length > 0 && confirm('\u662F\u5426\u5220\u9664\u8FD9' + $checked.length + '\u9879\uFF1F')) {
                $form.find('[name="job"]').val('clear');
                $form.submit();
            }
        }
    });

    $('#convertCatalogDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        var type = $(this).data('type');
        var $checked = $('[name="delid[]"]:checked');
        if ($checked.length > 0 && confirm('\u662F\u5426\u5C06\u8FD9' + $checked.length + '\u9879\u8F6C\u6362\u5230\u6307\u5B9A\u76EE\u5F55\uFF1F')) {
            $form.find('[name="job"]').val('change');
            $form.find('[name="type"]').val(type);
            $form.submit();
        }
    });
};

/**
 * 绑定好友列表页面按钮点击事件
 */
var bindFriendPageBtnsClick = exports.bindFriendPageBtnsClick = function bindFriendPageBtnsClick() {
    $('#friendActionBtns').on('click', '[type="button"]', function () {
        var action = $(this).data('action');
        if (action === 'selectAll') {
            Util.selectAll($('[name="selid[]"]'));
        } else if (action === 'selectReverse') {
            Util.selectReverse($('[name="selid[]"]'));
        }
    });
};

/**
 * 在账号设置页面里为生日字段赋值
 */
var assignBirthdayField = exports.assignBirthdayField = function assignBirthdayField() {
    $('#birthday').change(function () {
        var value = $(this).val().trim();
        var matches = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value);
        var year = '',
            month = '',
            day = '';
        if (matches) {
            year = parseInt(matches[1]);
            month = parseInt(matches[2]);
            day = parseInt(matches[3]);
        }
        $('[name="proyear"]').val(year);
        $('[name="promonth"]').val(month);
        $('[name="proday"]').val(day);
    });
};

/**
 * 同步主题每页楼层数量的设置
 */
var syncPerPageFloorNum = exports.syncPerPageFloorNum = function syncPerPageFloorNum() {
    /**
     * 同步设置
     */
    var syncConfig = function syncConfig() {
        var perPageFloorNum = parseInt($('[name="p_num"]').val());
        if (perPageFloorNum === 0) perPageFloorNum = 10;
        if (!isNaN(perPageFloorNum) && perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            (0, _config.write)();
        }
    };

    syncConfig();
    $('#creator').submit(function () {
        (0, _config.read)();
        syncConfig();
    });
};

/**
 * 处理上传头像文件浏览按钮
 */
var handleUploadAvatarFileBtn = exports.handleUploadAvatarFileBtn = function handleUploadAvatarFileBtn() {
    $('#browseAvatar').change(function () {
        var $this = $(this);
        var matches = /\.(\w+)$/.exec($this.val());
        if (!matches || !['jpg', 'gif', 'png'].includes(matches[1].toLowerCase())) {
            alert('头像图片类型不匹配');
        }
    });
};

/**
 * 转账提醒
 */
var transferKfbAlert = exports.transferKfbAlert = function transferKfbAlert() {
    $('#transferKfbForm').submit(function () {
        var $this = $(this);
        var transferKfb = parseInt($this.find('[name="to_money"]').val());
        var fixedDeposit = parseInt($('#fixedDeposit').text());
        var currentDeposit = parseInt($('#currentDeposit').text());
        if (transferKfb > 0 && fixedDeposit > 0 && transferKfb > currentDeposit) {
            if (!confirm('你的活期存款不足，转账金额将从定期存款里扣除，是否继续？')) {
                return false;
            }
        }
    });
};

/**
 * 绑定短消息页面操作按钮点击事件
 */
var bindMessageActionBtnsClick = exports.bindMessageActionBtnsClick = function bindMessageActionBtnsClick() {
    $('#messageActionBtns').on('click', 'button', function () {
        var $form = $('#messageListForm');
        var action = $(this).data('action');
        if (action === 'selectAll') {
            Util.selectAll($('[name="delid[]"]'));
        } else if (action === 'selectReverse') {
            Util.selectReverse($('[name="delid[]"]'));
        } else if (action === 'selectCustom') {
            var _ret = function () {
                var title = $.trim(prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除'));
                if (!title) return {
                        v: void 0
                    };
                $('[name="delid[]"]').prop('checked', false);
                $('a.thread-link').each(function () {
                    var $this = $(this);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = title.split('|')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            if ($this.text().toLowerCase().includes(key.toLowerCase())) {
                                $this.parent().find('[name="delid[]"]').prop('checked', true);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        } else if (action === 'download') {
            var $checked = $('[name="delid[]"]:checked');
            if ($checked.length > 0 && confirm('\u662F\u5426\u4E0B\u8F7D\u8FD9' + $checked.length + '\u9879\uFF1F')) {
                $form.attr('action', '/message.php').find('[name="action"]').val('down');
                $form.submit();
            }
        } else if (action === 'delete') {
            var _$checked = $('[name="delid[]"]:checked');
            if (_$checked.length > 0 && confirm('\u662F\u5426\u5220\u9664\u8FD9' + _$checked.length + '\u9879\uFF1F')) {
                $form.attr('action', Util.makeUrl('message/job')).find('[name="action"]').val('del');
                $form.submit();
            }
        }
    });
};

/**
 * 验证注册页面字段
 */
var validateRegisterField = exports.validateRegisterField = function validateRegisterField() {
    $(document).on('change', 'input[name]', function () {
        var $this = $(this);
        var name = $this.attr('name');
        var value = $this.val();
        if (!value) {
            Util.showValidationMsg($this, 'clear');
            return;
        }
        if (name === 'regemail') {
            Util.showValidationMsg($this, 'wait', '检查中，请稍等&hellip;');
            $.post(Util.makeUrl('register/check'), 'username=' + value, function (_ref) {
                var type = _ref.type,
                    msg = _ref.msg,
                    username = _ref.username;

                if ($this.val() === username) {
                    Util.showValidationMsg($this, type, msg);
                }
            }).fail(function () {
                Util.showValidationMsg($this, 'error', '响应失败');
            });
        } else if (name === 'regpwd') {
            if (value.length > 16 || value.length < 6) {
                Util.showValidationMsg($this, 'error', '密码长度不正确');
            } else {
                Util.showValidationMsg($this, 'clear');
                $('[name="regpwdrepeat"]').trigger('change');
            }
        } else if (name === 'regpwdrepeat') {
            if (value !== $('[name="regpwd"]').val()) Util.showValidationMsg($this, 'error', '两次输入的密码不相符');else Util.showValidationMsg($this, 'clear');
        }
    });

    $('#registerForm').submit(function () {
        if ($(this).find('.has-danger').length > 0) {
            alert('请正确填写表单');
            return false;
        }
    });
};

},{"./config":2,"./const":4,"./util":12}],9:[function(require,module,exports){
/* 发帖模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleClearMultiQuoteDataBtn = exports.handleMultiQuote = exports.addSmileCode = exports.handleAttachBtns = exports.checkPostForm = exports.handleEditorBtns = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _msg = require('./msg');

var Msg = _interopRequireWildcard(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 处理编辑器按钮
 */
var handleEditorBtns = exports.handleEditorBtns = function handleEditorBtns() {
    var textArea = $('#postContent').get(0);

    // 编辑器按钮
    $(document).on('click', '.editor-btn-group button[data-action]', function () {
        var action = $(this).data('action');
        var value = '';
        switch (action) {
            case 'link':
                value = prompt('请输入链接URL：', 'http://');
                break;
            case 'img':
                value = prompt('请输入图片URL：', 'http://');
                break;
            case 'sell':
                value = prompt('请输入出售金额：', 1);
                break;
            case 'hide':
                value = prompt('请输入神秘等级：', 1);
                break;
            case 'audio':
                {
                    value = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）', 'http://');
                    var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(value);
                    if (matches) value = 'http://music.miaola.info/163/' + matches[1] + '.mp3';
                    matches = /^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(value);
                    if (matches) value = 'http://music.miaola.info/xiami/' + matches[1] + '.mp3';
                }
                break;
            case 'video':
                {
                    value = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                    var _matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(value);
                    if (_matches) value = 'http://video.miaola.info/youtube/' + _matches[1];
                    _matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(value);
                    if (_matches) value = 'http://video.miaola.info/youtube/' + _matches[1];
                }
                break;
        }
        if (value === null) return;

        var selText = '';
        var code = '';
        switch (action) {
            case 'link':
                selText = Util.getSelText(textArea);
                code = '[url=' + value + ']' + selText + '[/url]';
                break;
            case 'img':
                code = '[img]' + value + '[/img]';
                break;
            case 'quote':
                selText = Util.getSelText(textArea);
                code = '[quote]' + selText + '[/quote]';
                break;
            case 'code':
                selText = Util.getSelText(textArea);
                code = '[code]' + selText + '[/code]';
                break;
            case 'sell':
                selText = Util.getSelText(textArea);
                code = '[sell=' + value + ']' + selText + '[/sell]';
                break;
            case 'hide':
                selText = Util.getSelText(textArea);
                code = '[hide=' + value + ']' + selText + '[/hide]';
                break;
            case 'bold':
                selText = Util.getSelText(textArea);
                code = '[b]' + selText + '[/b]';
                break;
            case 'italic':
                selText = Util.getSelText(textArea);
                code = '[i]' + selText + '[/i]';
                break;
            case 'underline':
                selText = Util.getSelText(textArea);
                code = '[u]' + selText + '[/u]';
                break;
            case 'strike':
                selText = Util.getSelText(textArea);
                code = '[strike]' + selText + '[/strike]';
                break;
            case 'super':
                selText = Util.getSelText(textArea);
                code = '[sup]' + selText + '[/sup]';
                break;
            case 'sub':
                selText = Util.getSelText(textArea);
                code = '[sub]' + selText + '[/sub]';
                break;
            case 'horizontal':
                code = '[hr]';
                break;
            case 'align-left':
                selText = Util.getSelText(textArea);
                code = '[align=left]' + selText + '[/align]';
                break;
            case 'align-center':
                selText = Util.getSelText(textArea);
                code = '[align=center]' + selText + '[/align]';
                break;
            case 'align-right':
                selText = Util.getSelText(textArea);
                code = '[align=right]' + selText + '[/align]';
                break;
            case 'fly':
                selText = Util.getSelText(textArea);
                code = '[fly]' + selText + '[/fly]';
                break;
            case 'audio':
                code = '[audio]' + value + '[/audio]';
                break;
            case 'video':
                code = '[video]' + value + '[/video]';
                break;
        }
        if (!code) return;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });

    // 字号下拉菜单
    $('#fontSizeDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        var size = $(this).data('size');
        var selText = Util.getSelText(textArea);
        var code = '[size=' + size + ']' + selText + '[/size]';
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });

    // 颜色、背景颜色下拉菜单
    $('#colorDropdownMenu, #bgColorDropdownMenu').on('click', 'span', function () {
        var $this = $(this);
        var codeType = $this.parent().is('#bgColorDropdownMenu') ? 'backcolor' : 'color';
        var color = $this.data('color');
        var selText = Util.getSelText(textArea);
        var code = '[' + codeType + '=' + color + ']' + selText + '[/' + codeType + ']';
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });
};

/**
 * 检查发帖表单
 */
var checkPostForm = exports.checkPostForm = function checkPostForm() {
    $('#postForm').submit(function () {
        var $postType = $('#postType');
        if ($postType.length > 0 && !$postType.val()) {
            alert('没有选择主题分类');
            $postType.focus();
            return false;
        }

        var $postTitle = $('#postTitle');
        if ($postTitle.length > 0) {
            var length = Util.getStrByteLen($postTitle.val());
            if (!length) {
                alert('标题不能为空');
                $postTitle.focus();
                return false;
            } else if (length > 100) {
                alert('标题超过最大长度 100 个字节');
                $postTitle.focus();
                return false;
            }
        }

        var $voteItemContent = $('#voteItemContent');
        if ($voteItemContent.length > 0) {
            if (!$voteItemContent.val().trim()) {
                alert('投票选项不能为空');
                $voteItemContent.focus();
                return false;
            }
        }

        var $postContent = $('#postContent');
        if ($postContent.length > 0) {
            var _length = Util.getStrByteLen($postContent.val().trim());
            if (_length < 12) {
                alert('文章内容少于 12 个字节');
                $postContent.focus();
                return false;
            } else if (_length > 50000) {
                alert('文章内容大于 50000 个字节');
                $postContent.focus();
                return false;
            }
        }

        var $postGjc = $('#postGjc');
        if ($postGjc.length > 0 && pageInfo.action === 'new' && !$postGjc.val().trim()) {
            alert('请在内容文本框的下方填写关键词，以方便搜索，也可以在标题中选择任意一个词填入');
            $postGjc.focus();
            return false;
        }
    });
};

/**
 * 处理附件按钮
 */
var handleAttachBtns = exports.handleAttachBtns = function handleAttachBtns() {
    $(document).on('click', '.attach-area a[data-action]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $area = $this.closest('.attach-area');
        var action = $this.data('action');
        var id = $area.data('id');
        if (!id) return;
        if (action === 'insert') {
            var type = $this.data('type');
            var textArea = $('#postContent').get(0);
            var code = '[' + (type === 'new' ? 'upload' : 'attachment') + '=' + id + ']';
            Util.addCode(textArea, code);
            textArea.focus();
        } else if (action === 'update') {
            $area.find('.attach-info').prop('hidden', true).after('<label><input name="replace_' + id + '" type="file" aria-label="\u9009\u62E9\u9644\u4EF6"></label>');
            $this.data('action', 'cancel').text('取消').blur();
            if (!$(document).data('attachUpdateAlert')) {
                alert('本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果');
                $(document).data('attachUpdateAlert', true);
            }
        } else if (action === 'cancel') {
            $area.find('.attach-info').prop('hidden', false).next('label').remove();
            $this.data('action', 'update').text('更新').blur();
        } else if (action === 'delete') {
            $area.remove();
        }
    });

    $(document).on('change', '[type="file"]', function () {
        var $this = $(this);
        var matches = /\.(\w+)$/.exec($this.val());
        if (!matches || !['jpg', 'gif', 'png', 'torrent'].includes(matches[1].toLowerCase())) {
            alert('附件类型不匹配');
            return;
        }

        var type = $this.data('type');
        if (type === 'new') {
            $this.removeData('type').parent().next().prop('hidden', false);

            var $newAttachArea = $('#newAttachArea');
            var totalNum = $newAttachArea.find('[type="file"]').length;
            if (totalNum >= 5) return;
            var $lastAttachArea = $newAttachArea.find('[type="file"]:last').closest('.attach-area');
            var id = parseInt($lastAttachArea.data('id'));
            if (!id) return;
            id++;
            $('\n<div class="form-group row font-size-sm attach-area" data-id="' + id + '">\n  <div class="col-xs-12 col-form-label">\n    <label>\n      <input name="attachment_' + id + '" data-type="new" type="file" aria-label="\u9009\u62E9\u9644\u4EF6">\n    </label>\n    <span hidden>\n      <a data-action="insert" data-type="new" href="#">\u63D2\u5165</a>&nbsp;\n      <a data-action="delete" href="#">\u5220\u9664</a>\n    </span>\n  </div>\n  <div class="col-xs-4">\n    <label class="sr-only" for="atc_downrvrc' + id + '">\u795E\u79D8\u7CFB\u6570</label>\n    <input class="form-control form-control-sm" id="atc_downrvrc' + id + '" name="atc_downrvrc' + id + '" data-toggle="tooltip" \ntype="number" value="0" min="0" title="\u795E\u79D8\u7CFB\u6570" placeholder="\u795E\u79D8\u7CFB\u6570">\n  </div>\n  <div class="col-xs-8">\n    <label class="sr-only" for="atc_desc' + id + '">\u63CF\u8FF0</label>\n    <input class="form-control form-control-sm" id="atc_desc' + id + '" name="atc_desc' + id + '" data-toggle="tooltip" type="text" \ntitle="\u63CF\u8FF0" placeholder="\u63CF\u8FF0">\n  </div>\n</div>\n').insertAfter($lastAttachArea).find('[data-toggle="tooltip"]').tooltip({ 'container': 'body' });
        }
    });
};

/**
 * 插入表情代码
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
var addSmileCode = exports.addSmileCode = function addSmileCode($node) {
    $('.smile-panel').on('click', 'img', function () {
        $('.smile-panel').addClass('open');
        var textArea = $node.get(0);
        if (!textArea) return;
        var code = '[s:' + $(this).data('id') + ']';
        Util.addCode(textArea, code, '');
        textArea.blur();
    }).parent().on('shown.bs.dropdown', function () {
        $('.smile-panel img').each(function () {
            var $this = $(this);
            if (!$this.attr('src')) {
                $this.attr('src', $this.data('src'));
            }
        });
    }).on('hide.bs.dropdown', function (e) {
        var $relatedTarget = $(e.relatedTarget);
        if (!$relatedTarget.data('open')) $relatedTarget.removeData('open');else return e.preventDefault();
    });

    $('#smileDropdownBtn').click(function () {
        var $this = $(this);
        $this.data('open', !$this.data('open'));
    });
};

/**
 * 处理多重回复和多重引用
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleMultiQuote = exports.handleMultiQuote = function handleMultiQuote() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var data = localStorage[_const2.default.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    } catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    var _data = data,
        tid = _data.tid,
        quoteList = _data.quoteList;

    if (!pageInfo.tid || tid !== pageInfo.tid || $.type(quoteList) !== 'object') return;
    if (type === 2 && !pageInfo.fid) return;
    var list = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.values(quoteList)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _data2 = _step.value;

            if ($.type(_data2) !== 'array') continue;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _data2[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var quote = _step3.value;

                    list.push(quote);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (!list.length) {
        localStorage.removeItem(_const2.default.multiQuoteStorageName);
        return;
    }

    var keywords = new Set();
    var content = '';
    if (type === 2) {
        Msg.wait('<span class="mr-3">\u6B63\u5728\u83B7\u53D6\u5F15\u7528\u5185\u5BB9\u4E2D&hellip;</span>\u5269\u4F59\uFF1A<em class="text-warning countdown-num">' + list.length + '</em>');
        $(document).clearQueue('MultiQuote');
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        var _loop = function _loop() {
            var _step2$value = _slicedToArray(_step2.value, 2),
                index = _step2$value[0],
                quote = _step2$value[1];

            if (!('floor' in quote) || !('pid' in quote)) return 'continue';
            keywords.add(quote.userName);
            if (type === 2) {
                $(document).queue('MultiQuote', function () {
                    $.get(Util.makeUrl('post/index', 'action=quote&fid=' + pageInfo.fid + '&tid=' + tid + '&pid=' + quote.pid + '&article=' + quote.floor + '&t=' + new Date().getTime()), function (_ref) {
                        var postContent = _ref.postContent;

                        content += postContent ? postContent + (index === list.length - 1 ? '' : '\n') : '';
                        var $countdownNum = $('.countdown-num:last');
                        $countdownNum.text(parseInt($countdownNum.text()) - 1);
                        if (index === list.length - 1) {
                            Msg.destroy();
                            $('#postContent').val(content).focus();
                        } else {
                            setTimeout(function () {
                                $(document).dequeue('MultiQuote');
                            }, 100);
                        }
                    });
                });
            } else {
                content += '[quote]\u56DE ' + quote.floor + '\u697C(' + quote.userName + ') \u7684\u5E16\u5B50[/quote]\n';
            }
        };

        for (var _iterator2 = list.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ret = _loop();

            if (_ret === 'continue') continue;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    $('[name="diy_guanjianci"]').val([].concat(_toConsumableArray(keywords)).join(','));
    $('#postForm').submit(function () {
        localStorage.removeItem(_const2.default.multiQuoteStorageName);
    });
    if (type === 2) $(document).dequeue('MultiQuote');else $('#postContent').val(content).focus();
};

/**
 * 处理清除多重引用数据按钮
 */
var handleClearMultiQuoteDataBtn = exports.handleClearMultiQuoteDataBtn = function handleClearMultiQuoteDataBtn() {
    $('.clear-multi-quote-data-btn').click(function (e) {
        e.preventDefault();
        if (!confirm('是否清除多重引用数据？')) return;
        localStorage.removeItem(_const2.default.multiQuoteStorageName);
        $('[name="diy_guanjianci"]').val('');
        $('#postContent').val('');
    });
};

},{"./const":4,"./msg":7,"./util":12}],10:[function(require,module,exports){
/* 公共模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.preventCloseWindow = exports.fillCommonForumPanel = exports.showEditCommonForumDialog = exports.bindFastSubmitShortcutKey = exports.handlePageInput = exports.handleSearchDialog = exports.handleRollToTopOrBottomBtn = exports.handleMainMenuLink = exports.handleMainMenu = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _dialog = require('./dialog');

var Dialog = _interopRequireWildcard(_dialog);

var _config = require('./config');

var _configDialog = require('./configDialog');

var ConfigDialog = _interopRequireWildcard(_configDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 处理主菜单
 */
var handleMainMenu = exports.handleMainMenu = function handleMainMenu() {
    $('#mainMenuTogglerBtn').click(function () {
        var maxHeight = document.documentElement.clientHeight - $(this).closest('.navbar').outerHeight();
        if (maxHeight > 0) {
            $('#mainMenu').css('max-height', maxHeight + 'px');
        }
    });
};

/**
 * 处理主菜单链接
 */
var handleMainMenuLink = exports.handleMainMenuLink = function handleMainMenuLink() {
    $('#mainMenu').find('[data-name="openConfigDialog"]').click(function (e) {
        e.preventDefault();
        $('#mainMenuTogglerBtn').click();
        ConfigDialog.show();
    });
};

/**
 * 处理滚动到页顶/页底按钮
 */
var handleRollToTopOrBottomBtn = exports.handleRollToTopOrBottomBtn = function handleRollToTopOrBottomBtn() {
    $(window).scroll(function () {
        var $btn = $('#rollToTopOrBottom');
        if ($(window).scrollTop() > 640) {
            if ($btn.data('direction') === 'top') return;
            $btn.data('direction', 'top').attr('aria-label', '滚动到页顶').find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            if ($btn.data('direction') === 'bottom') return;
            $btn.data('direction', 'bottom').attr('aria-label', '滚动到页底').find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });

    $('#rollToTopOrBottom').click(function () {
        var scrollTop = $(this).data('direction') === 'bottom' ? $('body').height() : 0;
        $('body, html').animate({ scrollTop: scrollTop });
    });
};

/**
 * 处理搜索对话框
 */
var handleSearchDialog = exports.handleSearchDialog = function handleSearchDialog() {
    var $searchDialog = $('#searchDialog');

    $searchDialog.on('shown.bs.modal', function () {
        $('#searchKeyword').select().focus();
    }).find('form').submit(function () {
        var $this = $(this);
        var $searchKeyword = $this.find('#searchKeyword');
        var searchType = $this.find('#searchType').val();
        var keyword = $.trim($searchKeyword.val());
        if (searchType === 'gjc') {
            $this.attr('action', Util.makeUrl('gjc/' + keyword));
        } else if (searchType === 'username') {
            $this.attr('action', Util.makeUrl('user/username/' + keyword));
        } else {
            $this.attr('action', Util.makeUrl('search'));
            $searchKeyword.attr('name', searchType === 'author' ? 'pwuser' : 'keyword');
            if (searchType === 'title') {
                if (keyword.length && Util.getStrByteLen(keyword) <= 2) {
                    (function () {
                        var $method = $this.find('[name="method"]');
                        $method.val('OR');
                        $searchKeyword.val(keyword + ' ' + Math.floor(new Date().getTime() / 1000));
                        setTimeout(function () {
                            $searchKeyword.val(keyword);
                            $method.val('AND');
                        }, 200);
                    })();
                }
            }
        }
    });

    $searchDialog.find('[name="searchRange"]').on('click', function () {
        var value = 'all';
        if ($(this).val() === 'current') value = pageInfo.fid;
        $searchDialog.find('[name="f_fid"]').val(value);
    });

    var $current = $searchDialog.find('[name="searchRange"][value="current"]');
    var $currentBox = $current.closest('.form-check-inline');
    $searchDialog.find('#searchType').change(function () {
        var searchType = $(this).val();
        if (!$current.data('enabled')) return;
        var disabled = searchType === 'gjc' || searchType === 'username';
        $current.prop('disabled', disabled);
        if (disabled) $currentBox.addClass('disabled');else $currentBox.removeClass('disabled');
    });

    if (pageId === 'threadPage' || pageId === 'readPage') {
        $current.prop('disabled', false).data('enabled', true).click();
        $currentBox.removeClass('disabled');
    }
};

/**
 * 处理分页导航
 */
var handlePageInput = exports.handlePageInput = function handlePageInput() {
    $(document).on('click', '.page-input', function (e) {
        e.preventDefault();
        if (pageInfo.maxPageNum && pageInfo.maxPageNum <= 1) return;
        var action = $(this).data('url');
        if (!action) return;
        var excludeParams = $(this).data('exclude');
        if (excludeParams) excludeParams = excludeParams.split(',');else excludeParams = [];
        var num = parseInt(prompt('\u8981\u8DF3\u8F6C\u5230\u7B2C\u51E0\u9875\uFF1F' + (pageInfo.maxPageNum ? '\uFF08\u5171' + pageInfo.maxPageNum + '\u9875\uFF09' : ''), pageInfo.currentPageNum));
        if (num && num > 0) {
            location.href = Util.makeUrl(action, 'page=' + num, true, excludeParams);
        }
    });
};

/**
 * 绑定快速提交的快捷键
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
var bindFastSubmitShortcutKey = exports.bindFastSubmitShortcutKey = function bindFastSubmitShortcutKey($node) {
    $node.keydown(function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            $(this).closest('form').submit();
        }
    });
};

/**
 * 显示编辑常用版块对话框
 */
var showEditCommonForumDialog = exports.showEditCommonForumDialog = function showEditCommonForumDialog() {
    $(document).on('click', '.edit-common-forum-btn', function (e) {
        e.preventDefault();
        var dialogName = 'editCommonForumDialog';
        if ($('#' + dialogName).length > 0) return;
        (0, _config.read)();

        var commonForumList = Config.commonForumList.length > 0 ? Config.commonForumList : _const2.default.commonForumList;
        var commonForumListHtml = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = commonForumList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _step.value,
                    fid = _step$value.fid,
                    name = _step$value.name;

                commonForumListHtml += '<span class="btn btn-outline-primary" data-fid="' + fid + '">' + name + '</span>';
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var availableForumListHtml = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            var _loop = function _loop() {
                var _step2$value = _step2.value,
                    fid = _step2$value.fid,
                    name = _step2$value.name;

                if (commonForumList.find(function (elem) {
                    return elem.fid === fid;
                })) return 'continue';
                availableForumListHtml += '<span class="btn btn-outline-primary" data-fid="' + fid + '">' + name + '</span>';
            };

            for (var _iterator2 = _const2.default.availableForumList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _ret2 = _loop();

                if (_ret2 === 'continue') continue;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var bodyContent = '\n<p class="font-size-sm text-muted">\n  \u8BF7\u5C06\u53EF\u7528\u7248\u5757\u5185\u7684\u7248\u5757\u6309\u94AE\u62D6\u62FD\u5230\u5E38\u7528\u7248\u5757\u5185\uFF08\u6216\u76F8\u53CD\uFF09\n</p>\n<fieldset class="fieldset mb-3 py-2">\n  <legend>\u5E38\u7528\u7248\u5757</legend>\n  <div class="edit-forum-list d-flex flex-wrap" id="editCommonForumList">' + commonForumListHtml + '</div>\n</fieldset>\n<fieldset class="fieldset mb-3 py-2">\n  <legend>\u53EF\u7528\u7248\u5757</legend>\n  <div class="edit-forum-list d-flex flex-wrap" id="editAvailableForumList">' + availableForumListHtml + '</div>\n</fieldset>';
        var footerContent = '\n<button class="btn btn-primary" name="save" type="submit">\u4FDD\u5B58</button>\n<button class="btn btn-secondary" data-dismiss="dialog" type="button">\u53D6\u6D88</button>\n<button class="btn btn-danger" name="reset" type="button">\u91CD\u7F6E</button>';
        var $dialog = Dialog.create(dialogName, '编辑常用版块', bodyContent, footerContent);

        var $dragulaScriptPath = $('[name="dragulaScriptPath"]');
        var dragulaScriptPath = $dragulaScriptPath.val();
        if (dragulaScriptPath) {
            $.getScript(dragulaScriptPath, function () {
                return dragula($dialog.find('.edit-forum-list').get(), { revertOnSpill: true });
            });
            $dragulaScriptPath.val('');
        } else dragula($dialog.find('.edit-forum-list').get(), { revertOnSpill: true });

        $dialog.find('[name="save"]').click(function () {
            Config.commonForumList = [];
            $('#editCommonForumList').children('.btn').each(function () {
                var $this = $(this);
                var fid = parseInt($this.data('fid'));
                var name = $this.text().trim();
                if (!fid || !name) return;
                Config.commonForumList.push({ fid: fid, name: name });
            });
            (0, _config.write)();
            alert('设置已保存');
            Dialog.close(dialogName);
            location.reload();
        }).end().find('[name="reset"]').click(function () {
            if (!confirm('是否重置？')) return;
            Config.commonForumList = [];
            (0, _config.write)();
            alert('设置已重置');
            Dialog.close(dialogName);
            location.reload();
        });

        Dialog.show(dialogName);
    });
};

/**
 * 填充常用版块面板
 */
var fillCommonForumPanel = exports.fillCommonForumPanel = function fillCommonForumPanel() {
    var commonForumList = Config.commonForumList.length > 0 ? Config.commonForumList : _const2.default.commonForumList;
    var html = '';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = commonForumList.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                index = _step3$value[0],
                _step3$value$ = _step3$value[1],
                _fid = _step3$value$.fid,
                name = _step3$value$.name;

            if (index === 0 || index % 3 === 0) html += '<div class="row mb-3">';
            html += '\n<div class="col-4">\n  <a class="btn btn-outline-primary btn-block" href="' + Util.makeUrl('thread') + '/' + _fid + '">' + name + '</a>\n</div>\n';
            if (index === commonForumList.length - 1 || index % 3 === 2) html += '</div>';
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    $('.common-forum-panel').html(html);
};

/**
 * 在操作进行时阻止关闭页面
 */
var preventCloseWindow = exports.preventCloseWindow = function preventCloseWindow() {
    window.addEventListener("beforeunload", function (e) {
        if ($('.mask').length > 0) {
            var msg = '正在进行操作中，确定要关闭页面吗？';
            e.returnValue = msg;
            return msg;
        }
    });
};

},{"./config":2,"./configDialog":3,"./const":4,"./dialog":5,"./util":12}],11:[function(require,module,exports){
/* 主题模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bindMultiQuoteCheckClick = exports.handleCopyCodeBtn = exports.handleTuiThreadBtn = exports.handleFastGotoFloorBtn = exports.gotoFloor = exports.handleFloorImage = exports.copyBuyThreadList = exports.handleBuyThreadBtn = exports.handleBlockFloorBtn = exports.handleFastReplyBtn = exports.handleCopyFloorLinkBtn = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _config = require('./config');

var _msg = require('./msg');

var Msg = _interopRequireWildcard(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 处理复制楼层跳转链接按钮
 */
var handleCopyFloorLinkBtn = exports.handleCopyFloorLinkBtn = function handleCopyFloorLinkBtn() {
    $(document).on('click', '.floor-num', function (e) {
        e.preventDefault();
        var $this = $(this);
        var link = Util.getHostNameUrl() + $this.attr('href');
        $this.data('copy-text', link);
        if (!Util.copyText($this, $this)) {
            prompt('本楼的跳转链接：', link);
        }
    });
};

/**
 * 处理快速回复按钮
 */
var handleFastReplyBtn = exports.handleFastReplyBtn = function handleFastReplyBtn() {
    $(document).on('click', '.fast-reply-btn', function (e) {
        e.preventDefault();
        var $article = $(this).closest('article');
        var floor = $article.data('floor');
        var userName = $article.data('username');
        $('#postGjc').val(userName);
        var postContent = $('#postContent').get(0);
        postContent.value = '[quote]\u56DE ' + floor + '\u697C(' + userName + ') \u7684\u5E16\u5B50[/quote]\n';
        postContent.selectionStart = postContent.value.length;
        postContent.selectionEnd = postContent.value.length;
        postContent.focus();
    });
};

/**
 * 处理屏蔽回帖按钮
 */
var handleBlockFloorBtn = exports.handleBlockFloorBtn = function handleBlockFloorBtn() {
    $(document).on('click', '.block-floor', function () {
        return confirm('确认要屏蔽该回帖？本操作不可恢复！（屏蔽后该回帖将对大家不可见）');
    });
};

/**
 * 处理购买帖子按钮
 */
var handleBuyThreadBtn = exports.handleBuyThreadBtn = function handleBuyThreadBtn() {
    $(document).on('click', '.buy-thread-btn', function (e) {
        e.preventDefault();
        var $this = $(this);
        var pid = $this.data('pid');
        var price = $this.data('price');
        if (price > 5 && !confirm('\u6B64\u8D34\u552E\u4EF7' + price + 'KFB\uFF0C\u662F\u5426\u8D2D\u4E70\uFF1F')) return;
        var $wait = Msg.wait('正在购买帖子&hellip;');
        $.get(Util.makeUrl('job/buytopic', 'tid=' + pageInfo.tid + '&pid=' + pid + '&verify=' + pageInfo.verify), function (_ref) {
            var msg = _ref.msg;

            Msg.remove($wait);
            if (msg === '操作完成') {
                location.reload();
            } else if (msg.includes('您已经购买此帖')) {
                alert('你已经购买过此帖');
                location.reload();
            } else {
                alert('帖子购买失败');
            }
        });
    });
};

/**
 * 复制购买人名单
 */
var copyBuyThreadList = exports.copyBuyThreadList = function copyBuyThreadList() {
    $(document).on('change', '.buy-thread-list', function () {
        var $this = $(this);
        if ($this.val() !== 'copyList') return;
        var list = $this.find('option').map(function (index) {
            var name = $(this).text();
            if (index === 0 || index === 1 || name === '-'.repeat(11)) return null;else return name;
        }).get().join('\n');
        if (!list) {
            alert('暂时无人购买');
            $this.get(0).selectedIndex = 0;
            return;
        }
        $('#buyThreadListContent').val(list);
        $('#buyThreadListDialog').modal('show');
        $this.get(0).selectedIndex = 0;
    });

    $('#buyThreadListDialog').on('shown.bs.modal', function () {
        $('#buyThreadListContent').select().focus();
    });
};

/**
 * 处理楼层内的图片
 */
var handleFloorImage = exports.handleFloorImage = function handleFloorImage() {
    $(document).on('click', '.img', function () {
        var $this = $(this);
        if ($this.parent().is('a') || this.naturalWidth <= $this.closest('.read-content').width()) return;
        location.href = $this.attr('src');
    });
};

/**
 * 跳转到指定楼层
 */
var gotoFloor = exports.gotoFloor = function gotoFloor() {
    if (pageInfo.floor && pageInfo.floor > 0) {
        var hashName = $('article[data-floor="' + pageInfo.floor + '"]').prev('a').attr('name');
        if (hashName) location.hash = '#' + hashName;
    }
};

/**
 * 处理快速跳转到指定楼层按钮
 */
var handleFastGotoFloorBtn = exports.handleFastGotoFloorBtn = function handleFastGotoFloorBtn() {
    $('.fast-goto-floor').click(function (e) {
        e.preventDefault();
        if (!Config.perPageFloorNum) {
            var floorNum = parseInt(prompt('你的论坛设置里“文章列表每页个数”为多少（10、20、30）？\n注：如修改了论坛中的此项设置，请访问账号设置页面即可自动同步本地设置', 10));
            if ([10, 20, 30].includes(floorNum)) {
                Config.perPageFloorNum = floorNum;
                (0, _config.write)();
            } else return;
        }
        var action = $(this).data('url');
        if (!action) return;
        var floor = parseInt(prompt('你要跳转到哪一层楼？'));
        if (!floor || floor <= 0) return;
        location.href = Util.makeUrl(action, 'page=' + (Math.floor(floor / Config.perPageFloorNum) + 1) + '&floor=' + floor);
    });
};

/**
 * 处理推帖子按钮
 */
var handleTuiThreadBtn = exports.handleTuiThreadBtn = function handleTuiThreadBtn() {
    $('.tui-btn').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.data('wait')) return;
        $this.data('wait', true);
        $.ajax({
            type: 'POST',
            url: '/diy_read_tui.php',
            data: 'tid=' + pageInfo.tid + '&safeid=' + pageInfo.safeId,
            success: function success(msg) {
                var matches = /<span.+?\+\d+!<\/span>\s*(\d+)/i.exec(msg);
                if (matches) {
                    (function () {
                        var $num = $this.find('span:first');
                        $num.text('+1');
                        setTimeout(function () {
                            $num.text(matches[1]);
                        }, 1000);
                    })();
                } else if (/已推过/.test(msg)) {
                    alert('已推过');
                } else {
                    alert('操作失败');
                }
            },
            error: function error() {
                alert('操作失败');
            },
            complete: function complete() {
                $this.removeData('wait');
            }
        });
    });
};

/**
 * 处理复制代码按钮
 */
var handleCopyCodeBtn = exports.handleCopyCodeBtn = function handleCopyCodeBtn() {
    $(document).on('click', '.copy-code', function (e) {
        e.preventDefault();
        var $this = $(this);
        if (Util.copyText($this.next('pre'), $this)) return;

        var code = $this.data('code');
        if (code) {
            $this.text('复制代码').removeData('code');
            $this.next('textarea').remove();
            $this.after('<pre class="pre-scrollable">' + code + '</pre>');
        } else {
            var $pre = $this.next('pre');
            var html = $pre.html();
            $this.text('还原代码').data('code', html);
            html = Util.decodeHtmlSpecialChar(html);
            var height = $pre.height();
            if (height < 50) height = 50;
            if (height > 340) height = 340;
            $pre.remove();
            $('<textarea class="form-control code-textarea" style="height: ' + height + 'px" wrap="off">' + html + '</textarea>').insertAfter($this).select().focus();
        }
    });
};

/**
 * 获取当前页面选中的多重引用数据
 * @returns {{}[]} 多重引用数据列表
 */
var getCheckedMultiQuoteData = function getCheckedMultiQuoteData() {
    var quoteList = [];
    $('.multi-quote-check:checked').each(function () {
        var $article = $(this).closest('article');
        quoteList.push({ floor: $article.data('floor'), pid: $article.data('pid'), userName: $article.data('username') });
    });
    return quoteList;
};

/**
 * 绑定多重引用复选框点击事件
 */
var bindMultiQuoteCheckClick = exports.bindMultiQuoteCheckClick = function bindMultiQuoteCheckClick() {
    $(document).on('click', '.multi-quote-check', function () {
        var data = localStorage[_const2.default.multiQuoteStorageName];
        if (data) {
            try {
                data = JSON.parse(data);
                if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) data = null;else if (!('tid' in data) || data.tid !== pageInfo.tid || $.type(data.quoteList) !== 'object') data = null;
            } catch (ex) {
                data = null;
            }
        } else {
            data = null;
        }
        var quoteList = getCheckedMultiQuoteData();
        if (!data) {
            localStorage.removeItem(_const2.default.multiQuoteStorageName);
            data = { tid: pageInfo.tid, quoteList: {} };
        }
        if (quoteList.length > 0) data.quoteList[pageInfo.currentPageNum] = quoteList;else delete data.quoteList[pageInfo.currentPageNum];
        localStorage[_const2.default.multiQuoteStorageName] = JSON.stringify(data);
    });
};

},{"./config":2,"./const":4,"./msg":7,"./util":12}],12:[function(require,module,exports){
/* 其它模块 */
'use strict';

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {*} value Cookie值
 * @param {?Date} date Cookie有效期，留空则表示有效期为浏览器进程
 * @param {string} prefix Cookie名称前缀
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setCookie = exports.setCookie = function setCookie(name, value) {
    var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : pageInfo.cookiePrefix;

    document.cookie = '' + prefix + name + '=' + encodeURI(value) + (!date ? '' : ';expires=' + date.toUTCString()) + ';path=/;';
};

/**
 * 获取Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 * @returns {?string} Cookie值
 */
var getCookie = exports.getCookie = function getCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pageInfo.cookiePrefix;

    var regex = new RegExp('(^| )' + prefix + name + '=([^;]*)(;|$)');
    var matches = document.cookie.match(regex);
    if (!matches) return null;else return decodeURI(matches[2]);
};

/**
 * 删除Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 */
var deleteCookie = exports.deleteCookie = function deleteCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pageInfo.cookiePrefix;

    document.cookie = '' + prefix + name + '=;expires=' + getDate('-1d').toUTCString() + ';path=/;';
};

/**
 * 获取在当前时间的基础上的指定（相对）时间量的Date对象
 * @param {string} value 指定（相对）时间量，+或-：之后或之前（相对于当前时间）；无符号：绝对值；Y：完整年份；y：年；M：月；d：天；h：小时；m：分；s：秒；ms：毫秒
 * @returns {?Date} 指定（相对）时间量的Date对象
 * @example
 * Tools.getDate('+2y') 获取2年后的Date对象
 * Tools.getDate('+3M') 获取3个月后的Date对象
 * Tools.getDate('-4d') 获取4天前的Date对象
 * Tools.getDate('5h') 获取今天5点的Date对象（其它时间量与当前时间一致）
 * Tools.getDate('2015Y') 获取年份为2015年的Date对象
 */
var getDate = exports.getDate = function getDate(value) {
    var date = new Date();
    var matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
    if (!matches) return null;
    var flag = typeof matches[1] === 'undefined' ? 0 : matches[1] === '+' ? 1 : -1;
    var increment = flag === -1 ? -parseInt(matches[2]) : parseInt(matches[2]);
    var unit = matches[3];
    switch (unit) {
        case 'Y':
            date.setFullYear(increment);
            break;
        case 'y':
            date.setFullYear(flag === 0 ? increment : date.getFullYear() + increment);
            break;
        case 'M':
            date.setMonth(flag === 0 ? increment : date.getMonth() + increment);
            break;
        case 'd':
            date.setDate(flag === 0 ? increment : date.getDate() + increment);
            break;
        case 'h':
            date.setHours(flag === 0 ? increment : date.getHours() + increment);
            break;
        case 'm':
            date.setMinutes(flag === 0 ? increment : date.getMinutes() + increment);
            break;
        case 's':
            date.setSeconds(flag === 0 ? increment : date.getSeconds() + increment);
            break;
        case 'ms':
            date.setMilliseconds(flag === 0 ? increment : date.getMilliseconds() + increment);
            break;
        default:
            return null;
    }
    return date;
};

/**
 * 获取指定字符串的字节长度（1个GBK字符按2个字节来算）
 * @param {string} str 指定字符串
 * @returns {number} 字符串的长度
 */
var getStrByteLen = exports.getStrByteLen = function getStrByteLen(str) {
    var len = 0;
    var cLen = 2;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? cLen : 1;
    }
    return len;
};

/**
 * 获取当前域名的URL
 * @returns {string} 当前域名的URL
 */
var getHostNameUrl = exports.getHostNameUrl = function getHostNameUrl() {
    return location.protocol + '//' + location.host;
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = exports.addCode = function addCode(textArea, code) {
    var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var startPos = selText === '' ? code.indexOf(']') + 1 : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        var prePos = textArea.selectionStart;
        textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    } else {
        textArea.value += code;
    }
};

/**
 * 获取选择文本
 * @param textArea 文本框
 * @returns {string} 选择文本
 */
var getSelText = exports.getSelText = function getSelText(textArea) {
    return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
};

/**
 * 从URL查询字符串提取参数对象
 * @param {string} str URL查询字符串
 * @returns {Map} 参数集合
 */
var extractQueryStr = exports.extractQueryStr = function extractQueryStr(str) {
    var params = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = str.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var param = _step.value;

            if (!param) continue;

            var _param$split = param.split('='),
                _param$split2 = _slicedToArray(_param$split, 2),
                key = _param$split2[0],
                value = _param$split2[1];

            params.set(key, typeof value !== 'undefined' ? value : '');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return params;
};

/**
 * 从参数对象中创建URL查询字符串
 * @param {Map} map 参数集合
 * @returns {string} URL查询字符串
 */
var buildQueryStr = exports.buildQueryStr = function buildQueryStr(map) {
    var queryStr = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                key = _step2$value[0],
                value = _step2$value[1];

            if (pageInfo.urlType === 2) {
                queryStr += (queryStr ? '&' : '') + key + '=' + value;
            } else {
                queryStr += (queryStr ? '/' : '') + key + '/' + value;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return queryStr;
};

/**
 * 生成指定的URL
 * @param {string} action 控制器（小写）
 * @param {string} param 查询参数
 * @param {boolean} includeOtherParam 是否包括当前页面的其它查询参数
 * @param {[]} excludeParams 要排除当前页面的查询参数列表
 * @returns {string} URL 最终的URL
 */
var makeUrl = exports.makeUrl = function makeUrl(action) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var includeOtherParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var excludeParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    var url = '';
    var paramList = extractQueryStr(param);
    if (includeOtherParam) {
        paramList = new Map([].concat(_toConsumableArray(extractQueryStr(pageInfo.urlParam).entries()), _toConsumableArray(paramList.entries())));
        for (var i in excludeParams) {
            paramList.delete(excludeParams[i]);
        }
    }
    if (!action.startsWith('/')) {
        if (location.pathname.startsWith(pageInfo.baseFile)) url = pageInfo.baseFile + '/';else url = pageInfo.rootPath;
    }
    url += action;
    if (paramList.size > 0) {
        var queryStr = buildQueryStr(paramList);
        if (queryStr) {
            url += (pageInfo.urlType === 2 ? '?' : '/') + queryStr;
        }
    }
    return url;
};

/**
 * 获取URL查询字符串中的指定参数
 * @param {string} name 参数名称
 * @returns {?string} 参数值
 */
var getQueryParam = exports.getQueryParam = function getQueryParam(name) {
    return extractQueryStr(pageInfo.urlParam).get(name);
};

/**
 * 解码HTML特殊字符
 * @param {string} str 待解码的字符串
 * @returns {string} 解码后的字符串
 */
var decodeHtmlSpecialChar = exports.decodeHtmlSpecialChar = function decodeHtmlSpecialChar(str) {
    if (!str.length) return '';
    return str.replace(/<br\s*\/?>/gi, '\n').replace(/&quot;/gi, '\"').replace(/&#39;/gi, '\'').replace(/&nbsp;/gi, ' ').replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&amp;/gi, '&');
};

/**
 * 全选
 * @param {jQuery} $nodes 想要全选的节点的jQuery对象
 */
var selectAll = exports.selectAll = function selectAll($nodes) {
    $nodes.prop('checked', true);
};

/**
 * 反选
 * @param {jQuery} $nodes 想要反选的节点的jQuery对象
 */
var selectReverse = exports.selectReverse = function selectReverse($nodes) {
    $nodes.each(function () {
        var $this = $(this);
        $this.prop('checked', !$this.prop('checked'));
    });
};

/**
 * 显示字段验证消息
 * @param {jQuery} $node 验证字段的jQuery对象
 * @param {string} type 验证类型
 * @param {string} msg 验证消息
 */
var showValidationMsg = exports.showValidationMsg = function showValidationMsg($node, type) {
    var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (type === 'error') type = 'danger';
    $node.removeClass('form-control-success form-control-warning form-control-danger');
    var $parent = $node.parent();
    $parent.removeClass('has-success has-warning has-danger');
    if ($.inArray(type, ['success', 'warning', 'danger'] > -1)) {
        $node.addClass('form-control-' + type).parent().addClass('has-' + type);
    }
    var $feedback = $parent.find('.form-control-feedback');
    if (type === 'wait') {
        $feedback.html('<span class="text-muted"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> ' + msg + '</span>');
    } else {
        $feedback.text(msg);
    }
};

/**
 * 获取对象A在对象B中的相对补集
 * @param {Object} a 对象A
 * @param {Object} b 对象B
 * @returns {Object} 相对补集
 */
var getDifferenceSetOfObject = exports.getDifferenceSetOfObject = function getDifferenceSetOfObject(a, b) {
    var c = {};
    if ($.type(a) !== 'object' || $.type(b) !== 'object') return c;
    $.each(b, function (key, data) {
        if (key in a) {
            if (!deepEqual(a[key], data)) c[key] = data;
        }
    });
    return c;
};

/**
 * 深度比较两个对象是否相等
 * @param {*} a
 * @param {*} b
 * @returns {boolean} 是否相等
 */
var deepEqual = exports.deepEqual = function deepEqual(a, b) {
    if (a === b) return true;
    if ($.type(a) !== $.type(b)) return false;
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;
    if ($.isArray(a) && $.isArray(b) || $.type(a) === 'object' && $.type(b) === 'object') {
        if (a.length !== b.length) return false;
        for (var i in $.extend($.isArray(a) ? [] : {}, a, b)) {
            if (typeof a[i] === 'undefined' || typeof b[i] === 'undefined') return false;
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }
    return false;
};

/**
 * 复制文本
 * @param {jQuery} $target 要复制文本的目标元素
 * @param {?jQuery} $source 触发事件的源元素
 * @returns {boolean} 是否复制成功
 */
var copyText = exports.copyText = function copyText($target) {
    var $source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!('execCommand' in document) || !$target.length) return false;
    var copyText = $target.data('copy-text');
    if (copyText) {
        $target = $('<span class="text-hide">' + copyText + '</span>').insertAfter($target);
    }
    var s = window.getSelection();
    s.selectAllChildren($target.get(0));
    var result = document.execCommand('copy');
    s.removeAllRanges();
    if (copyText) $target.remove();
    if (result && $source) {
        var msg = $source.data('copy-msg');
        $source.attr('title', msg ? msg : '已复制').on('hidden.bs.tooltip', function () {
            $(this).tooltip('dispose');
        }).tooltip('show');
    }
    return result;
};

},{}]},{},[1])

