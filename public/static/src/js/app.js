'use strict';
// 页面ID
var pageId = $('body').attr('id');
// 配置名称
var configName = 'kf_config';
// 配置
var Config = {};

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
 * 处理回到顶部按钮
 */
var handleBackToTop = function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300)
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
 * 处理登出按钮
 */
var handleLogoutButton = function () {
    $(document).on('click', '#dropdownItemLogout', function () {
        if (!window.confirm('是否登出账号？')) return false;
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
    if (Config['activeNewReplyPanel']) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeNewReplyPanel)).tab('show');
    }
    if (Config['activeTopRecommendPanel']) {
        $('a[data-toggle="tab"][href="{0}"]'.replace('{0}', Config.activeTopRecommendPanel)).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        var $target = $(e.target);
        readConfig();
        var panelName = $target.attr('href');
        var typeName = '';
        if (panelName.indexOf('NewReplyPanel') > 0) typeName = 'activeNewReplyPanel';
        else if (panelName.indexOf('TopRecommendPanel') > 0) typeName = 'activeTopRecommendPanel';
        if (typeName) {
            Config[typeName] = $target.attr('href');
            writeConfig();
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
        if (pageInfo.maxPageNum <= 1) return;
        var num = parseInt(window.prompt('要跳转到第几页？（共' + pageInfo.maxPageNum + '页）', pageInfo.currentPageNum));
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
        var $this = $(this);
        var floor = $this.data('floor');
        var userName = $this.data('username');
        $('#articleGjc').val(userName);
        var replyContent = $('#articleContent').get(0);
        replyContent.value = '[quote]回 {0}楼({1}) 的帖子[/quote]\n'.replace('{0}', floor).replace('{1}', userName);
        replyContent.selectionStart = replyContent.value.length;
        replyContent.selectionEnd = replyContent.value.length;
        replyContent.focus();
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
        if ($this.val() !== 'copyList' || $this.children().length <= 3) return;
        var list = $this.find('option:gt(2)').map(function () {
            return $(this).text();
        }).get().join('\n');
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
        if ($this.parent().is('a') || this.naturalWidth <= $this.closest('.read-floor').width()) return;
        location.href = $this.attr('src');
    });
};

/**
 * 插入表情代码
 */
var addSmileCode = function () {
    $('.smile-panel').on('click', 'img', function () {
        $('.smile-panel').addClass('open');
        var textArea = $('#articleContent').get(0);
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
 * 处理发帖表单
 */
var handlePostForm = function () {
    $('#articleForm').submit(function () {
        var minLen = 12;
        var $textArea = $('#articleContent');
        if (getStrLen($.trim($textArea.val())) < minLen) {
            alert('文章内容少于 ' + minLen + ' 个字节');
            return false;
        }
    }).keydown(function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            $(this).submit();
        }
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
        var hashName = $('a[data-floor="' + pageInfo.floor + '"]').closest('article').prev('a').attr('name');
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
 * 检查捐款按钮状态
 */
var checkDonationBtnStatus = function () {
    if ($('form[name="rvrc1"] .input-group-addon:contains("已捐款")').length > 0) {
        $('form[name="rvrc1"]').find('input, button').prop('disabled', true);
    }
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
var assignBirthdayFiled = function () {
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
 * 上传头像
 */
var uploadAvatar = function () {
    $('#uploadAvatar').click(function (e) {
        e.preventDefault();
        var $browseAvatar = $('#browseAvatar');
        if (!$browseAvatar.val()) {
            alert('请选择要上传的图片');
            return;
        }
        var formData = new FormData();
        formData.append('facetype', '3');
        formData.append('step', '2');
        formData.append('upload', $browseAvatar.get(0).files[0]);
        $.ajax({
            type: 'POST',
            url: '/profile.php?action=ajaxface',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {
                console.log(html);
            },
            error: function () {
                alert('上传失败');
            }
        });
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
 * 初始化
 */
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
        handlePageNav('thread/index');
    } else if (pageId === 'readPage') {
        fastGotoFloor();
        handlePageNav('read/index');
        tuiThread();
        showFloorLink();
        handleFastReplyBtn();
        handleBlockFloorBtn();
        handleBuyThreadBtn();
        copyBuyThreadList();
        handleFloorImage();
        handlePostForm();
        copyCode();
        addSmileCode();
    } else if (pageId === 'searchPage') {
        handlePageNav('search/index');
    } else if (pageId === 'gjcPage') {
        highlightUnReadAtTipsMsg();
    } else if (pageId === 'growUpPage') {
        checkDonationBtnStatus();
    } else if (pageId === 'myReplyPage') {
        handlePageNav('personal/reply');
    } else if (pageId === 'gameIntroSearchPage') {
        handlePageNav('game_intro/search');
        handleGameIntroSearchArea();
    } else if (pageId === 'gameIntroPage') {
        tuiGameIntro('game');
    } else if (pageId === 'gameIntroCompanyPage') {
        tuiGameIntro('company');
    } else if (pageId === 'gameIntroTypePage') {
        tuiGameIntro('type');
    } else if (pageId === 'gameIntroPropertyPage') {
        tuiGameIntro('property');
    } else if (pageId === 'smBoxPage') {
        randomSelectSmBox();
    } else if (pageId === 'favorPage') {
        bindFavorPageBtnsClick();
    } else if (pageId === 'friendPage') {
        bindFriendPageBtnsClick();
    } else if (pageId === 'modifyPage') {
        syncPerPageFloorNum();
        assignBirthdayFiled();
        //uploadAvatar();
    }

    //var tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    //console.log('tooltip初始化耗时：' + (new Date() - tooltipStartTime) + 'ms');
});
