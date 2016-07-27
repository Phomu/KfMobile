'use strict';
// 页面ID
var pageId = $('body').attr('id');
var configName = 'kf_config';
var config = {};

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {*} value Cookie值
 * @param {?Date} [date] Cookie有效期，为空则表示有效期为浏览器进程关闭
 * @param {string} [prefix] Cookie名称前缀，留空则表示使用{@link pageInfo.cookiePrefix}前缀
 */
var setCookie = function (name, value, date, prefix) {
    document.cookie = '{0}{1}={2}{3};path=/;'
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
    var regex = new RegExp('(^| ){0}{1}=([^;]*)(;|$)'
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
            date.setYear(flag === 0 ? increment : date.getYear() + increment);
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
 * 读取设置
 */
var readConfig = function () {
    var options = null;
    options = localStorage['configName'];
    if (!options) return;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    config = options;
};

/**
 * 写入设置
 */
var writeConfig = function () {
    localStorage['configName'] = JSON.stringify(config);
};

/**
 * 处理主菜单
 */
var handleMainMenu = function () {
    $('#mainMenuTogglerBtn').click(function () {
        $('#mainMenu').css('max-height', document.documentElement.clientHeight - 50 + 'px');
    });
};

/**
 * 处理回到顶部按钮
 */
var handleBackToTop = function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100)
            $("#backToTop").fadeIn();
        else
            $("#backToTop").fadeOut();
    });

    $("#backToTop").click(function () {
        $('body, html').animate({scrollTop: 0});
    });
};

/**
 * 处理搜索对话框
 */
var handleSearchDialog = function () {
    var $searchDialog = $('#searchDialog');

    $searchDialog.on('shown.bs.modal', function () {
        $('#searchKeyword').focus();
    }).find('form').submit(function () {
        var $this = $(this);
        var $searchKeyword = $this.find('#searchKeyword');
        var searchType = $this.find('#searchType').val();
        var keyword = $.trim($searchKeyword.val());
        if (searchType === 'gjc') {
            $this.attr('action', pageInfo.rootPath + 'gjc/' + keyword);
        }
        else if (searchType === 'username') {
            $this.attr('action', pageInfo.rootPath + 'user/username/' + keyword);
        }
        else {
            $this.attr('action', pageInfo.rootPath + 'search');
            $searchKeyword.attr('name', searchType === 'author' ? 'pwuser' : 'keyword');
            if (searchType === 'title') {
                if (keyword.length === 1 || (keyword.length === 2 && /^[\w\-]+$/.test(keyword))) {
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
 * 处理登出按钮
 */
var handleLogoutButton = function () {
    $(document).on('click', '#dropdownItemLogout', function () {
        if (!window.confirm('是否登出账号？')) return false;
    });
};

/**
 * 处理版块页面下的分页导航
 */
var handleThreadPageNav = function () {
    $(document).on('click', '.page-item.active > .page-link', function (e) {
        e.preventDefault();
        var num = parseInt(window.prompt('要跳转到第几页？（共' + pageInfo.maxPageNum + '页）', pageInfo.currentPageNum));
        if (num) {
            var urlParam = pageInfo.urlParam.replace(/&?page=\d*/i, '') + '&page=' + num;
            location.href = pageInfo.rootPath + 'thread?' + urlParam;
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
        var cookieValue = getCookie('at_tips_time');
        if (!time || time === cookieValue) return;
        if (!cookieValue) {
            var currentDate = (new Date()).getDate();
            setCookie('prev_at_tips_time', (currentDate < 10 ? '0' + currentDate : currentDate) + '日00时00分');
        }
        else if (cookieValue !== time) {
            setCookie('prev_at_tips_time', cookieValue);
        }
        setCookie('at_tips_time', time, getDate('+3d'));
        $this.removeClass('btn-outline-danger').addClass('btn-outline-primary');
    });
};

/**
 * 高亮关键词页面中未读的消息
 */
var highlightUnReadAtTipsMsg = function () {
    if (pageInfo.gjc !== pageInfo.userName) return;
    var timeString = getCookie('prev_at_tips_time');
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
        setCookie('prev_at_tips_time', '', getDate('-1d'));
    });
};

/**
 * 处理首页主题链接面板
 */
var handleIndexThreadPanel = function () {
    if (config['activeNewReplyPanel']) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', config['activeNewReplyPanel'])).tab('show');
    }
    if (config['activeTopRecommendPanel']) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', config['activeTopRecommendPanel'])).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        readConfig();
        var panelName = $target.attr('href');
        var typeName = 'activeNewReplyPanel';
        if (panelName.indexOf('TopRecommendPanel') > 0) typeName = 'activeTopRecommendPanel';
        config[typeName] = $target.attr('href');
        writeConfig();
    });
};

$(function () {
    if (pageId === 'loginPage') return;
    readConfig();

    handleMainMenu();
    handleBackToTop();
    handleSearchDialog();
    handleLogoutButton();
    if (pageId === 'indexPage') {
        handleAtTipsBtn();
        handleIndexThreadPanel();
    }
    else if (pageId === 'threadPage') {
        handleThreadPageNav();
    } else if (pageId === 'gjcPage') {
        highlightUnReadAtTipsMsg();
    }

    //$('[data-toggle="tooltip"]').tooltip();
});
