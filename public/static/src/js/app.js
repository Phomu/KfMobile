'use strict';
// 页面ID
var pageId = $('body').attr('id');
// 配置名称
var configName = 'kf_config';
/**
 * 配置类
 */
var Config = {};
/**
 * 配置常量类
 */
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

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {*} value Cookie值
 * @param {?Date} [date] Cookie有效期，为空则表示有效期为浏览器进程关闭
 * @param {string} [prefix] Cookie名称前缀，留空则表示使用{@link pageInfo.cookiePrefix}前缀
 */
var setCookie = function (name, value, date, prefix) {
    document.cookie =
        '{0}{1}={2}{3};path=/;'
            .replace('{0}', typeof prefix === 'undefined' || prefix === null ? pageInfo.cookiePrefix : prefix)
            .replace('{1}', name)
            .replace('{2}', encodeURI(value))
            .replace('{3}', !date ? '' : ';expires=' + date.toUTCString());
};

/**
 * 获取Cookie
 * @param {string} name Cookie名称
 * @param {string} [prefix] Cookie名称前缀，留空则表示使用{@link pageInfo.cookiePrefix}前缀
 * @returns {?string} Cookie值
 */
var getCookie = function (name, prefix) {
    var regex = new RegExp(
        '(^| ){0}{1}=([^;]*)(;|$)'
            .replace('{0}', typeof prefix === 'undefined' || prefix === null ? pageInfo.cookiePrefix : prefix)
            .replace('{1}', name)
    );
    var matches = document.cookie.match(regex);
    if (!matches) return null;
    else return decodeURI(matches[2]);
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
var getDate = function (value) {
    var date = new Date();
    var matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
    if (!matches) return null;
    var flag = typeof matches[1] === 'undefined' ? 0 : (matches[1] === '+' ? 1 : -1);
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
var getStrLen = function (str) {
    var len = 0;
    var s_len = str.indexOf('\n') !== -1 ? str.replace(/\r?\n/g, '_').length : str.length;
    var c_len = 2;
    for (var i = 0; i < s_len; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? c_len : 1;
    }
    return len;
};

/**
 * 获取当前域名的URL
 * @returns {string} 当前域名的URL
 */
var getHostNameUrl = function () {
    return location.protocol + '//' + location.host;
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = function (textArea, code, selText) {
    var startPos = selText === '' ? code.indexOf(']') + 1 : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        var prePos = textArea.selectionStart;
        textArea.value = textArea.value.substr(0, prePos) + code + textArea.value.substr(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    }
    else {
        textArea.value += code;
    }
};

/**
 * 获取选择文本
 * @param textArea 文本框
 * @returns {string} 选择文本
 */
var getSelText = function (textArea) {
    return textArea.value.substr(textArea.selectionStart, textArea.selectionEnd - textArea.selectionStart);
};

/**
 * 从URL查询字符串提取参数对象
 * @param {string} str URL查询字符串
 * @returns {{}} 参数对象
 */
var extractQueryStr = function (str) {
    var param = {};
    $.each(str.split('&'), function (i, value) {
        if (!value) return;
        var arr = value.split('=');
        param[arr[0]] = typeof arr[1] !== 'undefined' ? arr[1] : '';
    });
    return param;
};

/**
 * 从参数对象中创建URL查询字符串
 * @param {{}} obj 参数对象
 * @returns {string} URL查询字符串
 */
var buildQueryStr = function (obj) {
    var queryStr = '';
    $.each(obj, function (key, value) {
        queryStr += '/' + key + '/' + value;
    });
    return queryStr;
};

/**
 * 生成指定的URL
 * @param {string} action 控制器（小写）
 * @param {string} [param=''] 查询参数
 * @param {boolean} [includeOtherParam=false] 是否包括当前页面的其它查询参数
 * @returns {string} URL 最终的URL
 */
var makeUrl = function (action, param, includeOtherParam) {
    var url = '';
    var paramList = extractQueryStr(param ? param : '');
    if (includeOtherParam) {
        paramList = $.extend(extractQueryStr(pageInfo.urlParam), paramList);
    }
    var hasEntryFile = location.pathname.indexOf(pageInfo.baseFile) === 0;
    if (hasEntryFile) url = pageInfo.baseFile;
    else url = pageInfo.rootPath.substr(0, pageInfo.rootPath.length - 1);
    var queryStr = '';
    if (!$.isEmptyObject(paramList)) queryStr = buildQueryStr(paramList);
    if (pageInfo.urlType === 2) url += '?s=' + '/' + action + queryStr;
    else url += '/' + action + queryStr;
    return url;
};

/**
 * 解码HTML特殊字符
 * @param {string} str 待解码的字符串
 * @returns {string} 解码后的字符串
 */
var decodeHtmlSpecialChar = function (str) {
    if (str.length === 0) return '';
    return str.replace(/<br\s*\/?>/gi, '\n')
        .replace(/&quot;/gi, '\"')
        .replace(/&#39;/gi, '\'')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&gt;/gi, '>')
        .replace(/&lt;/gi, '<')
        .replace(/&amp;/gi, '&');
};

/**
 * 全选
 * @param {jQuery} $nodes 想要全选的节点的jQuery对象
 */
var selectAll = function ($nodes) {
    $nodes.prop('checked', true);
};

/**
 * 反选
 * @param {jQuery} $nodes 想要反选的节点的jQuery对象
 */
var selectReverse = function ($nodes) {
    $nodes.each(function () {
        var $this = $(this);
        $this.prop('checked', !$this.prop('checked'));
    });
};

/**
 * 绑定快速提交的按键事件
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
var bindFastSubmitKeydown = function ($node) {
    $node.keydown(function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            $(this).closest('form').submit();
        }
    });
};

/**
 * 显示字段验证消息
 * @param {jQuery} $node 验证字段的jQuery对象
 * @param {string} type 验证类型
 * @param {string} [msg] 验证消息
 */
var showValidationMsg = function ($node, type, msg) {
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
    }
    else {
        $feedback.text(msg ? msg : '');
    }
};

/**
 * 读取设置
 */
var readConfig = function () {
    var options = localStorage['configName'];
    if (!options) return;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    Config = options;
};

/**
 * 写入设置
 */
var writeConfig = function () {
    localStorage['configName'] = JSON.stringify(Config);
};

/**
 * 处理主菜单
 */
var handleMainMenu = function () {
    $('#mainMenuTogglerBtn').click(function () {
        $('#mainMenu').css('max-height', document.documentElement.clientHeight - 49 + 'px');
    });
};

/**
 * 处理滚动到页顶/页底按钮
 */
var handleRollToTopOrBottomBtn = function () {
    $(window).scroll(function () {
        var $btn = $('#rollToTopOrBottom');
        if ($(window).scrollTop() > 640) {
            if ($btn.data('direction') === 'top') return;
            $btn.data('direction', 'top').attr('aria-label', '滚动到页顶')
                .find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        else {
            if ($btn.data('direction') === 'bottom') return;
            $btn.data('direction', 'bottom').attr('aria-label', '滚动到页底')
                .find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });

    $("#rollToTopOrBottom").click(function () {
        var scrollTop = $(this).data('direction') === 'bottom' ? $('body').height() : 0;
        $('body, html').animate({scrollTop: scrollTop});
    });
};

/**
 * 处理搜索对话框
 */
var handleSearchDialog = function () {
    var $searchDialog = $('#searchDialog');

    $searchDialog.on('shown.bs.modal', function () {
        $('#searchKeyword').select().focus();
    }).find('form').submit(function () {
        var $this = $(this);
        var $searchKeyword = $this.find('#searchKeyword');
        var searchType = $this.find('#searchType').val();
        var keyword = $.trim($searchKeyword.val());
        if (searchType === 'gjc') {
            $this.attr('action', makeUrl('gjc/' + keyword));
        }
        else if (searchType === 'username') {
            $this.attr('action', makeUrl('user/username/' + keyword));
        }
        else {
            $this.attr('action', makeUrl('search'));
            $searchKeyword.attr('name', searchType === 'author' ? 'pwuser' : 'keyword');
            if (searchType === 'title') {
                if (keyword.length && getStrLen(keyword) <= 2) {
                    var $method = $this.find('input[name="method"]');
                    $method.val('OR');
                    $searchKeyword.val(keyword + ' ' + Math.floor(new Date().getTime() / 1000));
                    window.setTimeout(function () {
                        $searchKeyword.val(keyword);
                        $method.val('AND');
                    }, 200);
                }
            }
        }
    });

    $searchDialog.find('input[name="searchRange"]').on('click', function () {
        var value = 'all';
        if ($(this).val() === 'current') value = pageInfo.fid;
        $searchDialog.find('input[name="f_fid"]').val(value);
    });

    var $current = $searchDialog.find('input[name="searchRange"][value="current"]');
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
var handleForumPanel = function () {
    if (Config.activeForumPanel1) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeForumPanel1)).tab('show');
    }
    if (Config.activeForumPanel2) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeForumPanel2)).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        var targetPanel = $target.attr('href');
        if (targetPanel.indexOf('ForumPanel') === -1) return;
        var typeName = '';
        if (targetPanel === '#galgameForumPanel' || targetPanel === '#resourceForumPanel') typeName = 'activeForumArea1Panel';
        else if (targetPanel === '#discussForumPanel' || targetPanel === '#acgForumPanel') typeName = 'activeForumArea2Panel';
        if (typeName) {
            readConfig();
            Config[typeName] = $target.attr('href');
            writeConfig();
        }
    });
};

/**
 * 处理首页的@提醒按钮
 */
var handleAtTipsBtn = function () {
    $('#atTips').click(function () {
        var $this = $(this);
        var time = $this.data('time');
        var cookieValue = getCookie(Const.atTipsTimeCookieName);
        if (!time || time === cookieValue) return;
        if (!cookieValue) {
            var currentDate = (new Date()).getDate();
            setCookie(Const.prevAtTipsTimeCookieName, (currentDate < 10 ? '0' + currentDate : currentDate) + '日00时00分');
        }
        else if (cookieValue !== time) {
            setCookie(Const.prevAtTipsTimeCookieName, cookieValue);
        }
        setCookie(Const.atTipsTimeCookieName, time, getDate('+3d'));
        $this.removeClass('btn-outline-danger').addClass('btn-outline-primary');
    });
};

/**
 * 高亮关键词页面中未读的消息
 */
var highlightUnReadAtTipsMsg = function () {
    if (pageInfo.gjc !== pageInfo.userName) return;
    var timeString = getCookie(Const.prevAtTipsTimeCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    var prevString = '';
    $('.thread-list-item time').each(function (index) {
        var $this = $(this);
        var curString = $.trim($this.text());
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('text-danger');
            prevString = curString;
        }
        else return false;
    });

    $(document).on('click', '.thread-list-item .thread-link-item a', function () {
        setCookie(Const.prevAtTipsTimeCookieName, '', getDate('-1d'));
    });
};

/**
 * 处理首页主题链接面板
 */
var handleIndexThreadPanel = function () {
    if (Config.activeNewReplyPanel) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeNewReplyPanel)).tab('show');
    }
    if (Config.activeTopRecommendPanel) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeTopRecommendPanel)).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        var targetPanel = $target.attr('href');
        var typeName = '';
        if (targetPanel.indexOf('NewReplyPanel') > 0) typeName = 'activeNewReplyPanel';
        else if (targetPanel.indexOf('TopRecommendPanel') > 0) typeName = 'activeTopRecommendPanel';
        if (typeName) {
            readConfig();
            Config[typeName] = $target.attr('href');
            writeConfig();
        }
    });
};

/**
 * 处理选择页面背景图片
 */
var handleSelectBgImage = function () {
    $('#selectBgImage').on('click', '[data-id]', function () {
        var $this = $(this);
        var id = $this.data('id');
        var fileName = $this.data('filename');
        var path = $this.parent().data('path');
        if (!id || !fileName || !path) return;
        if (window.confirm('是否选择此背景图片？')) {
            setCookie(Const.bgStyleCookieName, id, getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + path + fileName + '")');
            alert('背景已更换');
        }
    });
};

/**
 * 处理选择页面背景颜色
 */
var handleSelectBgColor = function () {
    $('#selectBgImage').on('click', '[data-color]', function () {
        var $this = $(this);
        var color = $this.data('color');
        if (!color) return;
        if (window.confirm('是否选择此背景颜色？')) {
            setCookie(Const.bgStyleCookieName, color, getDate('+1y'));
            $('body, .modal-content').css('background', color);
            alert('背景已更换');
        }
    });
};

/**
 * 处理自定义背景样式
 */
var handleCustomBgStyle = function () {
    $('#customBgStyle').click(function () {
        var value = getCookie(Const.bgStyleCookieName);
        if (!value || parseInt(value)) value = '';
        value = window.prompt(
            '请输入背景图片URL、颜色代码或CSS样式：\n（例：http://xxx.com/abc.jpg 或 #fcfcfc，留空表示恢复默认背景）\n' +
            '（注：建议选择简洁、不花哨、偏浅色系的背景图片或颜色）',
            value
        );
        if (value === null) return;
        if ($.trim(value) === '') {
            setCookie(Const.bgStyleCookieName, '', getDate('-1d'));
            alert('背景已恢复默认');
            location.reload();
        }
        else if (/^https?:\/\/[^"\']+/.test(value)) {
            setCookie(Const.bgStyleCookieName, value, getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + value + '")');
            alert('背景已更换');
        }
        else if (/^#[0-9a-f]{6}$/i.test(value)) {
            setCookie(Const.bgStyleCookieName, value, getDate('+1y'));
            $('body, .modal-content').css('background', value.toLowerCase());
            alert('背景已更换');
        }
        else if (!/[<>:{}]/.test(value)) {
            value = value.replace(';', '');
            setCookie(Const.bgStyleCookieName, value, getDate('+1y'));
            $('body, .modal-content').css('background', value);
            alert('背景已更换');
        }
        else {
            alert('格式不正确');
        }
    });
};

/**
 * 处理分页导航
 * @param {string} action 控制器
 */
var handlePageNav = function (action) {
    $(document).on('click', '.page-item.active > .page-link', function (e) {
        e.preventDefault();
        if (pageInfo.maxPageNum && pageInfo.maxPageNum <= 1) return;
        var num = parseInt(
            window.prompt('要跳转到第几页？' + (pageInfo.maxPageNum ? '（共' + pageInfo.maxPageNum + '页）' : ''), pageInfo.currentPageNum)
        );
        if (num && num > 0) {
            location.href = makeUrl(action, 'page=' + num, true);
        }
    });
};

/**
 * 显示楼层跳转链接
 */
var showFloorLink = function () {
    $(document).on('click', '.floor-num', function (e) {
        e.preventDefault();
        window.prompt('本楼的跳转链接：', getHostNameUrl() + $(this).attr('href'));
    });
};

/**
 * 处理快速回复按钮
 */
var handleFastReplyBtn = function () {
    $(document).on('click', '.fast-reply-btn', function (e) {
        e.preventDefault();
        var $article = $(this).closest('article');
        var floor = $article.data('floor');
        var userName = $article.data('username');
        $('#postGjc').val(userName);
        var postContent = $('#postContent').get(0);
        postContent.value = '[quote]回 {0}楼({1}) 的帖子[/quote]\n'.replace('{0}', floor).replace('{1}', userName);
        postContent.selectionStart = postContent.value.length;
        postContent.selectionEnd = postContent.value.length;
        postContent.focus();
    });
};

/**
 * 处理屏蔽回帖按钮
 */
var handleBlockFloorBtn = function () {
    $(document).on('click', '.block-floor', function () {
        if (!window.confirm('确认要屏蔽该回帖？本操作不可恢复！（屏蔽后该回帖将对大家不可见）')) return false;
    });
};

/**
 * 处理购买帖子按钮
 */
var handleBuyThreadBtn = function () {
    $(document).on('click', '.buy-thread-btn', function (e) {
        e.preventDefault();
        var $this = $(this);
        var pid = $this.data('pid');
        var price = $this.data('price');
        if (price > 5 && !window.confirm('此贴售价{0}KFB，是否购买？'.replace('{0}', price))) return;
        location.href = makeUrl(
            'job/buytopic',
            'tid={0}&pid={1}&verify={2}'
                .replace('{0}', pageInfo.tid)
                .replace('{1}', pid)
                .replace('{2}', pageInfo.verify)
        );
    });
};

/**
 * 复制购买人名单
 */
var copyBuyThreadList = function () {
    $(document).on('change', '.buy-thread-list', function () {
        var $this = $(this);
        if ($this.val() !== 'copyList') return;
        var list = $this.find('option').map(function (index) {
            var name = $(this).text();
            if (index === 0 || index === 1 || name === '-----------') return null;
            else return name;
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
var handleFloorImage = function () {
    $(document).on('click', '.img', function () {
        var $this = $(this);
        if ($this.parent().is('a') || this.naturalWidth <= $this.closest('.read-content').width()) return;
        location.href = $this.attr('src');
    });
};

/**
 * 插入表情代码
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
var addSmileCode = function ($node) {
    $('.smile-panel').on('click', 'img', function () {
        $('.smile-panel').addClass('open');
        var textArea = $node.get(0);
        if (!textArea) return;
        var code = '[s:' + $(this).data('id') + ']';
        addCode(textArea, code, '');
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
        if (!$relatedTarget.data('open')) $relatedTarget.removeData('open');
        else return e.preventDefault();
    });

    $('#smileDropdownBtn').click(function () {
        var $this = $(this);
        $this.data('open', !$this.data('open'));
    });
};

/**
 * 快速跳转到指定楼层
 */
var fastGotoFloor = function () {
    $('.fast-goto-floor').click(function (e) {
        e.preventDefault();
        if (!Config.perPageFloorNum) {
            var floorNum = parseInt(
                window.prompt('你的论坛设置里“文章列表每页个数”为多少（10、20、30）？\n注：如修改了论坛中的此项设置，请访问账号设置页面即可自动同步本地设置', 10)
            );
            if (floorNum && $.inArray(floorNum, [10, 20, 30]) !== -1) {
                Config.perPageFloorNum = floorNum;
                writeConfig();
            }
            else return;
        }
        var floor = parseInt(window.prompt('你要跳转到哪一层楼？'));
        if (!floor || floor <= 0) return;
        location.href = makeUrl(
            'read/index',
            'tid={0}&page={1}&floor={2}'
                .replace('{0}', pageInfo.tid)
                .replace('{1}', Math.floor(floor / Config.perPageFloorNum) + 1)
                .replace('{2}', floor)
        );
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
var tuiThread = function () {
    $('.tui-btn').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.data('wait')) return;
        $this.data('wait', true);
        $.ajax({
            type: 'POST',
            url: '/diy_read_tui.php',
            data: 'tid=' + pageInfo.tid + '&safeid=' + pageInfo.safeId,
            success: function (msg) {
                var matches = /<span.+?\+\d+!<\/span>\s*(\d+)/i.exec(msg);
                if (matches) {
                    var $num = $this.find('span:first');
                    $num.text('+1');
                    window.setTimeout(function () {
                        $num.text(matches[1]);
                    }, 1000);
                }
                else if (/已推过/.test(msg)) {
                    alert('已推过');
                }
                else {
                    alert('操作失败');
                }
            },
            error: function () {
                alert('操作失败');
            },
            complete: function () {
                $this.removeData('wait');
            }
        });
    });
};

/**
 * 复制代码
 */
var copyCode = function () {
    $(document).on('click', '.copy-code', function (e) {
        e.preventDefault();
        var $this = $(this);
        var code = $this.data('code');
        if (code) {
            $this.text('复制代码').removeData('code');
            $this.next('textarea').remove();
            $this.after('<pre class="pre-scrollable">' + code + '</pre>');
        }
        else {
            var $pre = $this.next('pre');
            var html = $pre.html();
            $this.text('还原代码').data('code', html);
            html = decodeHtmlSpecialChar(html);
            var height = $pre.height();
            if (height < 50) height = 50;
            if (height > 340) height = 340;
            $pre.remove();
            $('<textarea class="form-control code-textarea" style="height: ' + height + 'px" wrap="off">' + html + '</textarea>')
                .insertAfter($this).select().focus();
        }
    });
};

/**
 * 获取当前页面选中的多重引用数据
 * @returns {{}[]} 多重引用数据列表
 */
var getCheckedMultiQuoteData = function () {
    var quoteList = [];
    $('.multi-quote-check:checked').each(function () {
        var $article = $(this).closest('article');
        quoteList.push({floor: $article.data('floor'), pid: $article.data('pid'), userName: $article.data('username')});
    });
    return quoteList;
};

/**
 * 绑定多重引用复选框点击事件
 */
var bindMultiQuoteCheckClick = function () {
    $(document).on('click', '.multi-quote-check', function () {
        var data = localStorage[Const.multiQuoteStorageName];
        if (data) {
            try {
                data = JSON.parse(data);
                if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) data = null;
                else if (typeof data.tid === 'undefined' || data.tid !== pageInfo.tid || $.type(data.quoteList) !== 'object') data = null;
            }
            catch (ex) {
                data = null;
            }
        }
        else {
            data = null;
        }
        var quoteList = getCheckedMultiQuoteData();
        if (!data) {
            localStorage.removeItem(Const.multiQuoteStorageName);
            data = {tid: pageInfo.tid, quoteList: {}};
        }
        if (quoteList.length > 0) data.quoteList[pageInfo.currentPageNum] = quoteList;
        else delete data.quoteList[pageInfo.currentPageNum];
        localStorage[Const.multiQuoteStorageName] = JSON.stringify(data);
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
var handleMultiQuote = function (type) {
    var data = localStorage[Const.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    }
    catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    if (!pageInfo.tid || typeof data.tid === 'undefined' || data.tid !== pageInfo.tid || $.type(data.quoteList) !== 'object') return;
    if (type === 2 && !pageInfo.fid) return;
    var list = [];
    for (var i in data.quoteList) {
        if ($.type(data.quoteList[i]) !== 'array') continue;
        for (var j in data.quoteList[i]) {
            list.push(data.quoteList[i][j]);
        }
    }
    if (!list.length) {
        localStorage.removeItem(Const.multiQuoteStorageName);
        return;
    }

    var keywords = [];
    var content = '';
    if (type === 2) {
        // 显示多重引用等待消息
    }
    $.each(list, function (index, quote) {
        if (typeof quote.floor === 'undefined' || typeof quote.pid === 'undefined') return;
        if ($.inArray(quote.userName, keywords) === -1) keywords.push(quote.userName);
        if (type === 2) {
            // 处理多重引用
        }
        else {
            content += '[quote]回 {0}楼({1}) 的帖子[/quote]\n'.replace('{0}', quote.floor).replace('{1}', quote.userName);
        }
    });
    $('input[name="diy_guanjianci"]').val(keywords.join(','));
    $('#postForm').submit(function () {
        localStorage.removeItem(Const.multiQuoteStorageName);
    });
    if (type === 1) $('#postContent').val(content).focus();
};

/**
 * 处理清除多重引用数据按钮
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleClearMultiQuoteDataBtn = function (type) {
    $('.clear-multi-quote-data-btn').click(function (e) {
        e.preventDefault();
        localStorage.removeItem(Const.multiQuoteStorageName);
        $('input[name="diy_guanjianci"]').val('');
        if (type === 2) $('#textarea').val('');
        else $('#postContent').val('');
        alert('多重引用数据已被清除');
    });
};

/**
 * 处理游戏搜索区域
 */
var handleGameIntroSearchArea = function () {
    $('#gameSearchKeyword').val(pageInfo.keyword);
    $('#gameSearchType').val(pageInfo.searchType);
};

/**
 * 推游戏介绍
 * @param {string} type 页面类型
 */
var tuiGameIntro = function (type) {
    var cookieName = '';
    if (type === 'company') cookieName = 'g_intro_inc_tui_';
    else if (type === 'type') cookieName = 'g_intro_adv_tui_';
    else if (type === 'property') cookieName = 'g_intro_moe_tui_';
    else cookieName = 'g_intro_tui_';
    cookieName += pageInfo.id;
    var url = makeUrl('game_intro/' + type, 'id=' + pageInfo.id + '&tui=1');

    $('.tui-btn').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.data('wait')) return;
        if (getCookie(cookieName, '')) {
            alert('你在48小时内已经推过');
            return;
        }
        $this.data('wait', true);
        $.ajax({
            type: 'GET',
            url: url,
            success: function () {
                var $num = $this.find('span:first');
                var num = parseInt($num.text());
                $num.text('+1');
                window.setTimeout(function () {
                    $num.text(++num);
                }, 1000);
            },
            error: function () {
                alert('操作失败');
            },
            complete: function () {
                $this.removeData('wait');
            },
            dataType: 'html'
        });
    });
};

/**
 * 随机选择神秘盒子
 */
var randomSelectSmBox = function () {
    $('#smBoxRandom').click(function () {
        var $boxes = $('#smBoxPanel .table a');
        var number = Math.floor(Math.random() * $boxes.length);
        $(this).html('你选择了<b>No. ' + number + '</b>').off('click');
        window.setTimeout(function () {
            location.href = $boxes.eq(number).attr('href');
        }, 1000);
    });
};

/**
 * 绑定收藏夹页面按钮点击事件
 */
var bindFavorPageBtnsClick = function () {
    var $form = $('form[name="favorForm"]');

    $(document).on('click', '.remove-catalog', function () {
        return window.confirm('是否删除该目录？');
    });

    $('#addCatalog').click(function (e) {
        e.preventDefault();
        var type = $.trim(window.prompt('请输入收藏夹目录名称：'));
        if (!type) return;
        $form.find('input[name="job"]').val('addtype');
        $form.find('input[name="type"]').val(type);
        $form.submit();
    });

    $('#favorActionBtns').on('click', 'button', function () {
        var action = $(this).data('action');
        if (action === 'selectAll') {
            selectAll($('input[name="delid[]"]'));
        }
        else if (action === 'selectReverse') {
            selectReverse($('input[name="delid[]"]'));
        }
        else if (action === 'delete') {
            var $checked = $('input[name="delid[]"]:checked');
            if ($checked.length > 0 && window.confirm('是否删除这{0}项？'.replace('{0}', $checked.length))) {
                $form.find('input[name="job"]').val('clear');
                $form.submit();
            }
        }
    });

    $('#convertCatalogDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        var type = $(this).data('type');
        var $checked = $('input[name="delid[]"]:checked');
        if ($checked.length > 0 && window.confirm('是否将这{0}项转换到指定目录？'.replace('{0}', $checked.length))) {
            $form.find('input[name="job"]').val('change');
            $form.find('input[name="type"]').val(type);
            $form.submit();
        }
    });
};

/**
 * 绑定好友列表页面按钮点击事件
 */
var bindFriendPageBtnsClick = function () {
    $('#friendActionBtns').on('click', 'button[type="button"]', function () {
        var action = $(this).data('action');
        if (action === 'selectAll') {
            selectAll($('input[name="selid[]"]'));
        }
        else if (action === 'selectReverse') {
            selectReverse($('input[name="selid[]"]'));
        }
    });
};

/**
 * 在账号设置页面里为生日字段赋值
 */
var assignBirthdayField = function () {
    $('#birthday').change(function () {
        var value = $.trim($(this).val());
        var matches = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value);
        var year = '', month = '', day = '';
        if (matches) {
            year = parseInt(matches[1]);
            month = parseInt(matches[2]);
            day = parseInt(matches[3]);
        }
        $('input[name="proyear"]').val(year);
        $('input[name="promonth"]').val(month);
        $('input[name="proday"]').val(day);
    });
};

/**
 * 同步主题每页楼层数量的设置
 */
var syncPerPageFloorNum = function () {
    /**
     * 同步设置
     */
    var syncConfig = function () {
        var perPageFloorNum = parseInt($('select[name="p_num"]').val());
        if (perPageFloorNum === 0) perPageFloorNum = 10;
        if (!isNaN(perPageFloorNum) && perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            writeConfig();
        }
    };

    syncConfig();
    $('#creator').submit(function () {
        readConfig();
        syncConfig();
    });
};

/**
 * 处理上传头像文件浏览按钮
 */
var handleUploadAvatarFileBtn = function () {
    $('#browseAvatar').change(function () {
        var $this = $(this);
        var matches = /\.(\w+)$/.exec($this.val());
        if (!matches || $.inArray(matches[1].toLowerCase(), ['jpg', 'gif', 'png']) === -1) {
            alert('头像图片类型不匹配');
        }
    });
};

/**
 * 转账提醒
 */
var transferKfbAlert = function () {
    $('#transferKfbForm').submit(function () {
        var $this = $(this);
        var transferKfb = parseInt($this.find('input[name="to_money"]').val());
        var fixedDeposit = parseInt($('#fixedDeposit').text());
        var currentDeposit = parseInt($('#currentDeposit').text());
        if (transferKfb > 0 && fixedDeposit > 0 && transferKfb > currentDeposit) {
            if (!window.confirm('你的活期存款不足，转账金额将从定期存款里扣除，是否继续？')) {
                return false;
            }
        }
    });
};

/**
 * 绑定短消息页面操作按钮点击事件
 */
var bindMessageActionBtnsClick = function () {
    $('#messageActionBtns').on('click', 'button', function () {
        var $form = $('#messageListForm');
        var action = $(this).data('action');
        if (action === 'selectAll') {
            selectAll($('input[name="delid[]"]'));
        }
        else if (action === 'selectReverse') {
            selectReverse($('input[name="delid[]"]'));
        }
        else if (action === 'selectCustom') {
            var title = $.trim(
                window.prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除')
            );
            if (!title) return;
            $('input[name="delid[]"]').prop('checked', false);
            $('a.thread-link').each(function () {
                var $this = $(this);
                $.each(title.split('|'), function (index, key) {
                    if ($this.text().toLowerCase().indexOf(key.toLowerCase()) > -1) {
                        $this.parent().find('input[name="delid[]"]').prop('checked', true);
                    }
                });
            });
        }
        else if (action === 'download') {
            var $checked = $('input[name="delid[]"]:checked');
            if ($checked.length > 0 && window.confirm('是否下载这{0}项？'.replace('{0}', $checked.length))) {
                $form.attr('action', '/message.php').find('input[name="action"]').val('down');
                $form.submit();
            }
        }
        else if (action === 'delete') {
            var $checked = $('input[name="delid[]"]:checked');
            if ($checked.length > 0 && window.confirm('是否删除这{0}项？'.replace('{0}', $checked.length))) {
                $form.attr('action', makeUrl('message/job')).find('input[name="action"]').val('del');
                $form.submit();
            }
        }
    });
};

/**
 * 处理编辑器按钮
 */
var handleEditorBtns = function () {
    var textArea = $('#postContent').get(0);

    // 编辑器按钮
    $(document).on('click', '.editor-btn-group button[data-action]', function () {
        var action = $(this).data('action');
        var value = '';
        switch (action) {
            case 'link':
                value = window.prompt('请输入链接URL：', 'http://');
                break;
            case 'img':
                value = window.prompt('请输入图片URL：', 'http://');
                break;
            case 'sell':
                value = window.prompt('请输入出售金额：', 1);
                break;
            case 'hide':
                value = window.prompt('请输入神秘等级：', 1);
                break;
            case 'audio':
                value = window.prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）', 'http://');
                var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(value);
                if (matches) value = 'http://music.miaola.info/163/{0}.mp3'.replace('{0}', matches[1]);
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(value);
                if (matches) value = 'http://music.miaola.info/xiami/{0}.mp3'.replace('{0}', matches[1]);
                break;
            case 'video':
                value = window.prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                var matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(value);
                if (matches) value = 'http://video.miaola.info/youtube/{0}'.replace('{0}', matches[1]);
                matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(value);
                if (matches) value = 'http://video.miaola.info/youtube/{0}'.replace('{0}', matches[1]);
                break;
        }
        if (value === null) return;

        var selText = '';
        var code = '';
        switch (action) {
            case 'link':
                selText = getSelText(textArea);
                code = '[url={0}]{1}[/url]'.replace('{0}', value).replace('{1}', selText);
                break;
            case 'img':
                code = '[img]{0}[/img]'.replace('{0}', value);
                break;
            case 'quote':
                selText = getSelText(textArea);
                code = '[quote]{0}[/quote]'.replace('{0}', selText);
                break;
            case 'code':
                selText = getSelText(textArea);
                code = '[code]{0}[/code]'.replace('{0}', selText);
                break;
            case 'sell':
                selText = getSelText(textArea);
                code = '[sell={0}]{1}[/sell]'.replace('{0}', value).replace('{1}', selText);
                break;
            case 'hide':
                selText = getSelText(textArea);
                code = '[hide={0}]{1}[/hide]'.replace('{0}', value).replace('{1}', selText);
                break;
            case 'bold':
                selText = getSelText(textArea);
                code = '[b]{0}[/b]'.replace('{0}', selText);
                break;
            case 'italic':
                selText = getSelText(textArea);
                code = '[i]{0}[/i]'.replace('{0}', selText);
                break;
            case 'underline':
                selText = getSelText(textArea);
                code = '[u]{0}[/u]'.replace('{0}', selText);
                break;
            case 'strike':
                selText = getSelText(textArea);
                code = '[strike]{0}[/strike]'.replace('{0}', selText);
                break;
            case 'super':
                selText = getSelText(textArea);
                code = '[sup]{0}[/sup]'.replace('{0}', selText);
                break;
            case 'sub':
                selText = getSelText(textArea);
                code = '[sub]{0}[/sub]'.replace('{0}', selText);
                break;
            case 'horizontal':
                code = '[hr]';
                break;
            case 'align-left':
                selText = getSelText(textArea);
                code = '[align=left]{0}[/align]'.replace('{0}', selText);
                break;
            case 'align-center':
                selText = getSelText(textArea);
                code = '[align=center]{0}[/align]'.replace('{0}', selText);
                break;
            case 'align-right':
                selText = getSelText(textArea);
                code = '[align=right]{0}[/align]'.replace('{0}', selText);
                break;
            case 'fly':
                selText = getSelText(textArea);
                code = '[fly]{0}[/fly]'.replace('{0}', selText);
                break;
            case 'audio':
                code = '[audio]{0}[/audio]'.replace('{0}', value);
                break;
            case 'video':
                code = '[video]{0}[/video]'.replace('{0}', value);
                break;
        }
        if (!code) return;
        addCode(textArea, code, selText);
        textArea.focus();
    });

    // 字号下拉菜单
    $('#fontSizeDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        var size = $(this).data('size');
        var selText = getSelText(textArea);
        var code = '[size={0}]{1}[/size]'.replace('{0}', size).replace('{1}', selText);
        addCode(textArea, code, selText);
        textArea.focus();
    });

    // 颜色、背景颜色下拉菜单
    $('#colorDropdownMenu, #bgColorDropdownMenu').on('click', 'span', function () {
        var $this = $(this);
        var codeType = $this.parent().is('#bgColorDropdownMenu') ? 'backcolor' : 'color';
        var color = $this.data('color');
        var selText = getSelText(textArea);
        var code = '[{0}={1}]{2}[/{0}]'
            .replace(/\{0\}/g, codeType)
            .replace('{1}', color)
            .replace('{2}', selText);
        addCode(textArea, code, selText);
        textArea.focus();
    });
};

/**
 * 检查发帖表单
 */
var checkPostForm = function () {
    $('#postForm').submit(function () {
        var $postType = $('#postType');
        if ($postType.length > 0 && !$postType.val()) {
            alert('没有选择主题分类');
            $postType.focus();
            return false;
        }

        var $postTitle = $('#postTitle');
        if ($postTitle.length > 0) {
            var length = getStrLen($postTitle.val());
            if (!length) {
                alert('标题不能为空');
                $postTitle.focus();
                return false;
            }
            else if (length > 100) {
                alert('标题超过最大长度 100 个字节');
                $postTitle.focus();
                return false;
            }
        }

        var $voteItemContent = $('#voteItemContent');
        if ($voteItemContent.length > 0) {
            if (!$.trim($voteItemContent.val())) {
                alert('投票选项不能为空');
                $voteItemContent.focus();
                return false;
            }
        }

        var $postContent = $('#postContent');
        if ($postContent.length > 0) {
            var length = getStrLen($.trim($postContent.val()));
            if (length < 12) {
                alert('文章内容少于 12 个字节');
                $postContent.focus();
                return false;
            }
            else if (length > 50000) {
                alert('文章内容大于 50000 个字节');
                $postContent.focus();
                return false;
            }
        }

        var $postGjc = $('#postGjc');
        if ($postGjc.length > 0 && pageInfo.action === 'new' && !$.trim($postGjc.val())) {
            alert('请在内容文本框的下方填写关键词，以方便搜索，也可以在标题中选择任意一个词填入');
            $postGjc.focus();
            return false;
        }
    });
};

/**
 * 处理附件按钮
 */
var handleAttachBtns = function () {
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
            var code = '[{0}={1}]'.replace('{0}', type === 'new' ? 'upload' : 'attachment').replace('{1}', id);
            addCode(textArea, code, '');
            textArea.focus();
        }
        else if (action === 'update') {
            $area.find('.attach-info').prop('hidden', true).after(
                '<label><input name="replace_{0}" type="file" aria-label="选择附件"></label>'.replace('{0}', id)
            );
            $this.data('action', 'cancel').text('取消').blur();
            if (!$(document).data('attachUpdateAlert')) {
                alert('本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果');
                $(document).data('attachUpdateAlert', true);
            }
        }
        else if (action === 'cancel') {
            $area.find('.attach-info').prop('hidden', false).next('label').remove();
            $this.data('action', 'update').text('更新').blur();
        }
        else if (action === 'delete') {
            $area.remove();
        }
    });

    $(document).on('change', '[type="file"]', function () {
        var $this = $(this);
        var matches = /\.(\w+)$/.exec($this.val());
        if (!matches || $.inArray(matches[1].toLowerCase(), ['jpg', 'gif', 'png', 'torrent']) === -1) {
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
            $(
                ('<div class="form-group row font-size-sm attach-area" data-id="{0}">' +
                '  <div class="col-xs-12 col-form-label">' +
                '    <label>' +
                '      <input name="attachment_{0}" data-type="new" type="file" aria-label="选择附件">' +
                '    </label>' +
                '    <span hidden>' +
                '      <a data-action="insert" data-type="new" href="#">插入</a>&nbsp;' +
                '      <a data-action="delete" href="#">删除</a>' +
                '    </span>' +
                '  </div>' +
                '  <div class="col-xs-4">' +
                '    <label class="sr-only" for="atc_downrvrc{0}">神秘系数</label>' +
                '    <input class="form-control form-control-sm" id="atc_downrvrc{0}" name="atc_downrvrc{0}" data-toggle="tooltip" ' +
                'type="number" value="0" min="0" title="神秘系数" placeholder="神秘系数">' +
                '  </div>' +
                '  <div class="col-xs-8">' +
                '    <label class="sr-only" for="atc_desc{0}">描述</label>' +
                '    <input class="form-control form-control-sm" id="atc_desc{0}" name="atc_desc{0}" data-toggle="tooltip" type="text" ' +
                'title="描述" placeholder="描述">' +
                '  </div>' +
                '</div>').replace(/\{0\}/g, ++id)
            ).insertAfter($lastAttachArea).find('[data-toggle="tooltip"]').tooltip({'container': 'body'});
        }
    });
};

/**
 * 验证注册页面字段
 */
var validateRegisterField = function () {
    $(document).on('change', 'input[name]', function () {
        var $this = $(this);
        var name = $this.attr('name');
        var value = $this.val();
        if (!value) {
            showValidationMsg($this, 'clear');
            return;
        }
        if (name === 'regemail') {
            showValidationMsg($this, 'wait', '检查中，请稍等&hellip;');
            $.post(makeUrl('register/check'), 'username=' + value, function (data) {
                if ($this.val() === data.username) {
                    showValidationMsg($this, data.type, data.msg);
                }
            }).fail(function () {
                showValidationMsg($this, 'error', '响应失败');
            });
        }
        else if (name === 'regpwd') {
            if (value.length > 16 || value.length < 6) {
                showValidationMsg($this, 'error', '密码长度不正确');
            }
            else {
                showValidationMsg($this, 'clear');
                $('[name="regpwdrepeat"]').trigger('change');
            }
        }
        else if (name === 'regpwdrepeat') {
            if (value !== $('[name="regpwd"]').val()) showValidationMsg($this, 'error', '两次输入的密码不相符');
            else showValidationMsg($this, 'clear');
        }
    });

    $('#registerForm').submit(function () {
        if ($(this).find('.has-danger').length > 0) {
            alert('请正确填写表单');
            return false;
        }
    });
};

/**
 * 初始化
 */
$(function () {
    if (pageId === 'loginPage') return;
    else if (pageId === 'registerPage') {
        validateRegisterField();
        return;
    }
    readConfig();

    handleMainMenu();
    handleRollToTopOrBottomBtn();
    handleSearchDialog();
    handleForumPanel();
    if (pageId === 'indexPage') {
        handleAtTipsBtn();
        handleIndexThreadPanel();
        handleSelectBgImage();
        handleSelectBgColor();
        handleCustomBgStyle();
    }
    else if (pageId === 'threadPage') {
        handlePageNav('thread/index');
    }
    else if (pageId === 'readPage') {
        fastGotoFloor();
        handlePageNav('read/index');
        tuiThread();
        showFloorLink();
        handleFastReplyBtn();
        handleBlockFloorBtn();
        handleBuyThreadBtn();
        copyBuyThreadList();
        handleFloorImage();
        checkPostForm();
        bindFastSubmitKeydown($('#postContent'));
        copyCode();
        bindMultiQuoteCheckClick();
        handleClearMultiQuoteDataBtn(1);
        addSmileCode($('#postContent'));
    }
    else if (pageId === 'searchPage') {
        handlePageNav('search/index');
    }
    else if (pageId === 'gjcPage') {
        highlightUnReadAtTipsMsg();
    }
    else if (pageId === 'myReplyPage') {
        handlePageNav('personal/reply');
    }
    else if (pageId === 'gameIntroSearchPage') {
        handlePageNav('game_intro/search');
        handleGameIntroSearchArea();
    }
    else if (pageId === 'gameIntroPage') {
        tuiGameIntro('game');
    }
    else if (pageId === 'gameIntroCompanyPage') {
        tuiGameIntro('company');
    }
    else if (pageId === 'gameIntroTypePage') {
        tuiGameIntro('type');
    }
    else if (pageId === 'gameIntroPropertyPage') {
        tuiGameIntro('property');
    }
    else if (pageId === 'smBoxPage') {
        randomSelectSmBox();
    }
    else if (pageId === 'favorPage') {
        bindFavorPageBtnsClick();
    }
    else if (pageId === 'friendPage') {
        bindFriendPageBtnsClick();
    }
    else if (pageId === 'modifyPage') {
        syncPerPageFloorNum();
        assignBirthdayField();
        handleUploadAvatarFileBtn();
    }
    else if (pageId === 'bankPage') {
        transferKfbAlert();
    }
    else if (pageId === 'bankLogPage') {
        handlePageNav('bank/log');
    }
    else if (pageId === 'messagePage') {
        handlePageNav('message/index');
        bindMessageActionBtnsClick();
    }
    else if (pageId === 'readMessagePage') {
        handleFloorImage();
        copyCode();
    }
    else if (pageId === 'writeMessagePage') {
        bindFastSubmitKeydown($('#msgContent'));
        addSmileCode($('#msgContent'));
    }
    else if (pageId === 'messageBannedPage') {
        bindFastSubmitKeydown($('#banidinfo'));
    }
    else if (pageId === 'selfRateLatestPage') {
        handlePageNav('self_rate/latest');
    }
    else if (pageId === 'selfRateCompletePage') {
        handlePageNav('self_rate/complete');
    }
    else if (pageId === 'postPage') {
        checkPostForm();
        bindFastSubmitKeydown($('#postContent'));
        handleEditorBtns();
        addSmileCode($('#postContent'));
        handleAttachBtns();
    }

    //var tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    //console.log('tooltip初始化耗时：' + (new Date() - tooltipStartTime) + 'ms');
});
