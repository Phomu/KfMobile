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

    (0, _public.handleMainMenu)();
    (0, _public.handleRollToTopOrBottomBtn)();
    (0, _public.handleSearchDialog)();
    //handleForumPanel();
    if (pageId === 'indexPage') {
        (0, _index.handleAtTipsBtn)();
        (0, _index.handleIndexThreadPanel)();
        (0, _index.handleSelectBgImage)();
        (0, _index.handleSelectBgColor)();
        (0, _index.handleCustomBgStyle)();
    } else if (pageId === 'threadPage') {
        (0, _public.handlePageNav)('thread/index');
    } else if (pageId === 'readPage') {
        (0, _read.fastGotoFloor)();
        (0, _public.handlePageNav)('read/index');
        (0, _read.tuiThread)();
        (0, _read.showFloorLink)();
        (0, _read.handleFastReplyBtn)();
        (0, _read.handleBlockFloorBtn)();
        (0, _read.handleBuyThreadBtn)();
        (0, _read.copyBuyThreadList)();
        (0, _read.handleFloorImage)();
        (0, _post.checkPostForm)();
        (0, _public.bindFastSubmitShortcutKey)($('#postContent'));
        (0, _read.copyCode)();
        (0, _read.bindMultiQuoteCheckClick)();
        (0, _read.handleClearMultiQuoteDataBtn)(1);
        (0, _post.addSmileCode)($('#postContent'));
    } else if (pageId === 'searchPage') {
        (0, _public.handlePageNav)('search/index');
    } else if (pageId === 'gjcPage') {
        (0, _other.highlightUnReadAtTipsMsg)();
    } else if (pageId === 'myTopicPage') {
        (0, _public.handlePageNav)('personal/topic');
    } else if (pageId === 'myReplyPage') {
        (0, _public.handlePageNav)('personal/reply');
    } else if (pageId === 'gameIntroSearchPage') {
        (0, _public.handlePageNav)('game_intro/search');
        (0, _other.handleGameIntroSearchArea)();
    } else if (pageId === 'gameIntroPage') {
        (0, _other.tuiGameIntro)('game');
    } else if (pageId === 'gameIntroCompanyPage') {
        (0, _other.tuiGameIntro)('company');
    } else if (pageId === 'gameIntroTypePage') {
        (0, _other.tuiGameIntro)('type');
    } else if (pageId === 'gameIntroPropertyPage') {
        (0, _other.tuiGameIntro)('property');
    } else if (pageId === 'smBoxPage') {
        (0, _other.randomSelectSmBox)();
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
    } else if (pageId === 'bankLogPage') {
        (0, _public.handlePageNav)('bank/log');
    } else if (pageId === 'messagePage') {
        (0, _public.handlePageNav)('message/index');
        (0, _other.bindMessageActionBtnsClick)();
    } else if (pageId === 'readMessagePage') {
        (0, _read.handleFloorImage)();
        (0, _read.copyCode)();
    } else if (pageId === 'writeMessagePage') {
        (0, _public.bindFastSubmitShortcutKey)($('#msgContent'));
        (0, _post.addSmileCode)($('#msgContent'));
    } else if (pageId === 'messageBannedPage') {
        (0, _public.bindFastSubmitShortcutKey)($('[name="banidinfo"]'));
    } else if (pageId === 'selfRateLatestPage') {
        (0, _public.handlePageNav)('self_rate/latest');
    } else if (pageId === 'selfRateCompletePage') {
        (0, _public.handlePageNav)('self_rate/complete');
    } else if (pageId === 'postPage') {
        (0, _post.checkPostForm)();
        (0, _public.bindFastSubmitShortcutKey)($('#postContent'));
        (0, _post.handleEditorBtns)();
        (0, _post.addSmileCode)($('#postContent'));
        (0, _post.handleAttachBtns)();
    }

    //let tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({ 'container': 'body' });
    //console.log(`tooltip初始化耗时：${new Date() - tooltipStartTime}ms`);
});

},{"./module/config":2,"./module/index":4,"./module/other":5,"./module/post":6,"./module/public":7,"./module/read":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.write = exports.read = exports.init = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 配置名称
var name = 'kf_config';

/**
 * 配置类
 */
var Config = {
    // 主题每页楼层数量
    perPageFloorNum: 0,
    // 当前激活的最新回复面板
    activeNewReplyPanel: '#galgameNewReplyPanel',
    // 当前激活的当前推荐面板
    activeTopRecommendPanel: '#galgameTopRecommendPanel',
    // 当前激活的版块列表面板1
    activeForumPanel1: '',
    // 当前激活的版块列表面板2
    activeForumPanel2: ''
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
        if (key in Config) {
            settings[key] = value;
        }
    });
    return settings;
};

},{"./util":9}],3:[function(require,module,exports){
'use strict';

/**
 * 配置常量类
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
    bgStyleCookieName: 'bg_style'
};

exports.default = Const;

},{}],4:[function(require,module,exports){
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
        if ($.trim(value) === '') {
            Util.setCookie(_const2.default.bgStyleCookieName, '', Util.getDate('-1d'));
            alert('背景已恢复默认');
            location.reload();
        } else if (/^https?:\/\/[^"']+/.test(value)) {
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + value + '")');
            alert('背景已更换（图片可能需要一定时间加载）');
        } else if (/^#[0-9a-f]{6}$/i.test(value)) {
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background', value.toLowerCase());
            alert('背景已更换');
        } else if (!/[<>{}]/.test(value)) {
            value = value.replace(';', '');
            Util.setCookie(_const2.default.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background', value);
            alert('背景已更换（图片可能需要一定时间加载）');
        } else {
            alert('格式不正确');
        }
    });
};

},{"./config":2,"./const":3,"./util":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateRegisterField = exports.bindMessageActionBtnsClick = exports.transferKfbAlert = exports.handleUploadAvatarFileBtn = exports.syncPerPageFloorNum = exports.assignBirthdayField = exports.bindFriendPageBtnsClick = exports.bindFavorPageBtnsClick = exports.randomSelectSmBox = exports.tuiGameIntro = exports.handleGameIntroSearchArea = exports.highlightUnReadAtTipsMsg = undefined;

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
 * 随机选择神秘盒子
 */
var randomSelectSmBox = exports.randomSelectSmBox = function randomSelectSmBox() {
    $('#smBoxRandom').click(function () {
        var $boxes = $('#smBoxPanel .table a');
        var number = Math.floor(Math.random() * $boxes.length);
        $(this).html('\u4F60\u9009\u62E9\u4E86<b>No. ' + number + '</b>').off('click');
        setTimeout(function () {
            location.href = $boxes.eq(number).attr('href');
        }, 1000);
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
                var type = _ref.type;
                var msg = _ref.msg;
                var username = _ref.username;

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

},{"./config":2,"./const":3,"./util":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSmileCode = exports.handleAttachBtns = exports.checkPostForm = exports.handleEditorBtns = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 处理编辑器按钮
 */
var handleEditorBtns = exports.handleEditorBtns = function handleEditorBtns() {
    var textArea = $('#postContent').get(0);

    // 编辑器按钮
    $(document).on('click', '.editor-btn-group button[data-action]', function () {
        var action = $(this).data('action');
        var value = '';
        var matches = null;
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
                value = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）', 'http://');
                matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(value);
                if (matches) value = 'http://music.miaola.info/163/' + matches[1] + '.mp3';
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(value);
                if (matches) value = 'http://music.miaola.info/xiami/' + matches[1] + '.mp3';
                break;
            case 'video':
                value = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(value);
                if (matches) value = 'http://video.miaola.info/youtube/' + matches[1];
                matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(value);
                if (matches) value = 'http://video.miaola.info/youtube/' + matches[1];
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

},{"./util":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bindFastSubmitShortcutKey = exports.handlePageNav = exports.handleForumPanel = exports.handleSearchDialog = exports.handleRollToTopOrBottomBtn = exports.handleMainMenu = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 处理主菜单
 */
var handleMainMenu = exports.handleMainMenu = function handleMainMenu() {
    $('#mainMenuTogglerBtn').click(function () {
        $('#mainMenu').css('max-height', document.documentElement.clientHeight - 49 + 'px');
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
    $searchDialog.find('#searchType').change(function () {
        var searchType = $(this).val();
        if (!$current.data('enabled')) return;
        $current.prop('disabled', searchType === 'gjc' || searchType === 'username');
    });

    if (pageId === 'threadPage' || pageId === 'readPage') {
        $current.prop('disabled', false).data('enabled', true).click();
    }
};

/**
 * 处理版块列表面板
 */
var handleForumPanel = exports.handleForumPanel = function handleForumPanel() {
    if (Config.activeForumPanel1) {
        $('a[data-toggle="tab"][href="' + Config.activeForumPanel1 + '"]').tab('show');
    }
    if (Config.activeForumPanel2) {
        $('a[data-toggle="tab"][href="' + Config.activeForumPanel2 + '"]').tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        var targetPanel = $target.attr('href');
        if (!targetPanel.includes('ForumPanel')) return;
        var typeName = '';
        if (targetPanel === '#galgameForumPanel' || targetPanel === '#resourceForumPanel') typeName = 'activeForumPanel1';else if (targetPanel === '#discussForumPanel' || targetPanel === '#acgForumPanel') typeName = 'activeForumPanel2';
        if (typeName && Config[typeName] !== targetPanel) {
            (0, _config.read)();
            Config[typeName] = targetPanel;
            (0, _config.write)();
        }
    });
};

/**
 * 处理分页导航
 * @param {string} action 控制器
 */
var handlePageNav = exports.handlePageNav = function handlePageNav(action) {
    $(document).on('click', '.page-item.active > .page-link', function (e) {
        e.preventDefault();
        if (pageInfo.maxPageNum && pageInfo.maxPageNum <= 1) return;
        var num = parseInt(prompt('\u8981\u8DF3\u8F6C\u5230\u7B2C\u51E0\u9875\uFF1F' + (pageInfo.maxPageNum ? '\uFF08\u5171' + pageInfo.maxPageNum + '\u9875\uFF09' : ''), pageInfo.currentPageNum));
        if (num && num > 0) {
            location.href = Util.makeUrl(action, 'page=' + num, true);
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

},{"./config":2,"./util":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleClearMultiQuoteDataBtn = exports.bindMultiQuoteCheckClick = exports.copyCode = exports.tuiThread = exports.fastGotoFloor = exports.handleFloorImage = exports.copyBuyThreadList = exports.handleBuyThreadBtn = exports.handleBlockFloorBtn = exports.handleFastReplyBtn = exports.showFloorLink = undefined;

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 显示楼层跳转链接
 */
var showFloorLink = exports.showFloorLink = function showFloorLink() {
    $(document).on('click', '.floor-num', function (e) {
        e.preventDefault();
        prompt('本楼的跳转链接：', Util.getHostNameUrl() + $(this).attr('href'));
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
        location.href = Util.makeUrl('job/buytopic', 'tid=' + pageInfo.tid + '&pid=' + pid + '&verify=' + pageInfo.verify);
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
 * 快速跳转到指定楼层
 */
var fastGotoFloor = exports.fastGotoFloor = function fastGotoFloor() {
    $('.fast-goto-floor').click(function (e) {
        e.preventDefault();
        if (!Config.perPageFloorNum) {
            var floorNum = parseInt(prompt('你的论坛设置里“文章列表每页个数”为多少（10、20、30）？\n注：如修改了论坛中的此项设置，请访问账号设置页面即可自动同步本地设置', 10));
            if ([10, 20, 30].includes(floorNum)) {
                Config.perPageFloorNum = floorNum;
                (0, _config.write)();
            } else return;
        }
        var floor = parseInt(prompt('你要跳转到哪一层楼？'));
        if (!floor || floor <= 0) return;
        location.href = Util.makeUrl('read/index', 'tid=' + pageInfo.tid + '&page=' + (Math.floor(floor / Config.perPageFloorNum) + 1) + '&floor=' + floor);
    });

    if (pageInfo.floor && pageInfo.floor > 0) {
        var hashName = $('article[data-floor="' + pageInfo.floor + '"]').prev('a').attr('name');
        if (hashName) {
            location.hash = '#' + hashName;
        }
    }
};

/**
 * 推帖子
 */
var tuiThread = exports.tuiThread = function tuiThread() {
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
 * 复制代码
 */
var copyCode = exports.copyCode = function copyCode() {
    $(document).on('click', '.copy-code', function (e) {
        e.preventDefault();
        var $this = $(this);
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

    $('.multi-reply-btn').click(function (e) {
        e.preventDefault();
        handleMultiQuote(1);
    });
};

/**
 * 处理多重回复和多重引用
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleMultiQuote = function handleMultiQuote() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var data = localStorage[_const2.default.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    } catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    var _data = data;
    var tid = _data.tid;
    var quoteList = _data.quoteList;

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
        // 显示多重引用等待消息
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _quote = _step2.value;

            if (!('floor' in _quote) || !('pid' in _quote)) continue;
            keywords.add(_quote.userName);
            if (type === 2) {
                // 处理多重引用
            } else {
                content += '[quote]\u56DE ' + _quote.floor + '\u697C(' + _quote.userName + ') \u7684\u5E16\u5B50[/quote]\n';
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

    $('input[name="diy_guanjianci"]').val([].concat(_toConsumableArray(keywords)).join(','));
    $('#postForm').submit(function () {
        localStorage.removeItem(_const2.default.multiQuoteStorageName);
    });
    if (type === 1) $('#postContent').val(content).focus();
};

/**
 * 处理清除多重引用数据按钮
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleClearMultiQuoteDataBtn = exports.handleClearMultiQuoteDataBtn = function handleClearMultiQuoteDataBtn() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    $('.clear-multi-quote-data-btn').click(function (e) {
        e.preventDefault();
        localStorage.removeItem(_const2.default.multiQuoteStorageName);
        $('[name="diy_guanjianci"]').val('');
        if (type === 2) $('#textarea').val('');else $('#postContent').val('');
        alert('多重引用数据已被清除');
    });
};

},{"./config":2,"./const":3,"./util":9}],9:[function(require,module,exports){
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
    var sLen = str.includes('\n') ? str.replace(/\r?\n/g, '_').length : str.length;
    var cLen = 2;
    for (var i = 0; i < sLen; i++) {
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
        textArea.value = textArea.value.substr(0, prePos) + code + textArea.value.substr(textArea.selectionEnd);
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
    return textArea.value.substr(textArea.selectionStart, textArea.selectionEnd - textArea.selectionStart);
};

/**
 * 从URL查询字符串提取参数对象
 * @param {string} str URL查询字符串
 * @returns {Map} 参数集合
 */
var extractQueryStr = exports.extractQueryStr = function extractQueryStr(str) {
    var param = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = str.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            if (!value) continue;
            var arr = value.split('=');
            param.set(arr[0], arr[1] !== undefined ? arr[1] : '');
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

    return param;
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
            var _step2$value = _slicedToArray(_step2.value, 2);

            var key = _step2$value[0];
            var value = _step2$value[1];

            queryStr += '/' + key + '/' + value;
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
 * @returns {string} URL 最终的URL
 */
var makeUrl = exports.makeUrl = function makeUrl(action) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var includeOtherParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var url = '';
    var paramList = extractQueryStr(param);
    if (includeOtherParam) {
        paramList = new Map([].concat(_toConsumableArray(extractQueryStr(pageInfo.urlParam).entries()), _toConsumableArray(paramList.entries())));
    }
    if (location.pathname.startsWith(pageInfo.baseFile)) url = pageInfo.baseFile;else url = pageInfo.rootPath.substr(0, pageInfo.rootPath.length - 1);
    var queryStr = '';
    if (paramList.size > 0) queryStr = buildQueryStr(paramList);
    if (pageInfo.urlType === 2) url += '?s=/' + action + queryStr;else url += '/' + action + queryStr;
    return url;
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
        var c = $.extend($.isArray(a) ? [] : {}, a, b);
        $.each(c, function (i) {
            if (typeof a[i] === 'undefined' || typeof b[i] === 'undefined') return false;
            if (!deepEqual(a[i], b[i])) return false;
        });
        return true;
    }
    return false;
};

},{}]},{},[1])

