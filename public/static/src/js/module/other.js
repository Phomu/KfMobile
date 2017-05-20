/* 其它模块 */
'use strict';
import * as Util from './util';
import Const from './const';
import {read as readConfig, write as writeConfig} from './config';

/**
 * 高亮关键词页面中未读的消息
 */
export const highlightUnReadAtTipsMsg = function () {
    if (Info.gjc !== Info.userName) return;
    let timeString = Util.getCookie(Const.prevAtTipsTimeCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    let prevString = '';
    $('.thread-list-item time').each(function (index) {
        let $this = $(this);
        let curString = $.trim($this.text());
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('text-danger');
            prevString = curString;
        }
        else return false;
    });

    $(document).on('click', '.thread-list-item .thread-link-item a', function () {
        Util.deleteCookie(Const.prevAtTipsTimeCookieName);
    });
};

/**
 * 处理游戏搜索区域
 */
export const handleGameIntroSearchArea = function () {
    $('#gameSearchKeyword').val(Info.keyword);
    $('#gameSearchType').val(Info.searchType);
};

/**
 * 推游戏介绍
 */
export const tuiGameIntro = function () {
    $('.tui-btn').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        if ($this.data('wait')) return;

        let type = $this.data('type');
        let cookieName = '';
        if (type === 'company') cookieName = 'g_intro_inc_tui_';
        else if (type === 'type') cookieName = 'g_intro_adv_tui_';
        else if (type === 'property') cookieName = 'g_intro_moe_tui_';
        else cookieName = 'g_intro_tui_';
        cookieName += Info.id;
        if (Util.getCookie(cookieName, '')) {
            alert('你在48小时内已经推过');
            return;
        }

        $this.data('wait', true);
        $.ajax({
            type: 'GET',
            url: $this.data('url'),
            success: function () {
                let $num = $this.find('span:first');
                let num = parseInt($num.text());
                $num.text('+1');
                setTimeout(() => {
                    $num.text(++num);
                }, 1000);
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
 * 绑定收藏夹页面按钮点击事件
 */
export const bindFavorPageBtnsClick = function () {
    let $form = $('form[name="favorForm"]');

    $(document).on('click', '.remove-catalog', () => confirm('是否删除该目录？'));

    $('#addCatalog').click(function (e) {
        e.preventDefault();
        let type = $.trim(prompt('请输入收藏夹目录名称：'));
        if (!type) return;
        $form.find('[name="job"]').val('addtype');
        $form.find('[name="type"]').val(type);
        $form.submit();
    });

    $('#favorActionBtns').on('click', 'button', function () {
        let action = $(this).data('action');
        if (action === 'selectAll') {
            Util.selectAll($('[name="delid[]"]'));
        }
        else if (action === 'selectInverse') {
            Util.selectInverse($('[name="delid[]"]'));
        }
        else if (action === 'delete') {
            let $checked = $('[name="delid[]"]:checked');
            if ($checked.length > 0 && confirm(`是否删除这${$checked.length}项？`)) {
                $form.find('[name="job"]').val('clear');
                $form.submit();
            }
        }
    });

    $('#convertCatalogDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        let type = $(this).data('type');
        let $checked = $('[name="delid[]"]:checked');
        if ($checked.length > 0 && confirm(`是否将这${$checked.length}项转换到指定目录？`)) {
            $form.find('[name="job"]').val('change');
            $form.find('[name="type"]').val(type);
            $form.submit();
        }
    });
};

/**
 * 绑定好友列表页面按钮点击事件
 */
export const bindFriendPageBtnsClick = function () {
    $('#friendActionBtns').on('click', '[type="button"]', function () {
        let action = $(this).data('action');
        if (action === 'selectAll') {
            Util.selectAll($('[name="selid[]"]'));
        }
        else if (action === 'selectInverse') {
            Util.selectInverse($('[name="selid[]"]'));
        }
    });
};

/**
 * 在账号设置页面里为生日字段赋值
 */
export const assignBirthdayField = function () {
    $('#birthday').change(function () {
        let value = $(this).val().trim();
        let matches = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value);
        let year = '', month = '', day = '';
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
export const syncPerPageFloorNum = function () {
    /**
     * 同步设置
     */
    const syncConfig = function () {
        let perPageFloorNum = parseInt($('[name="p_num"]').val());
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
export const handleUploadAvatarFileBtn = function () {
    $('#browseAvatar').change(function () {
        let $this = $(this);
        let matches = /\.(\w+)$/.exec($this.val());
        if (!matches || !['jpg', 'gif', 'png'].includes(matches[1].toLowerCase())) {
            alert('头像图片类型不匹配');
        }
    });
};

/**
 * 转账提醒
 */
export const transferKfbAlert = function () {
    $('#transferKfbForm').submit(function () {
        let $this = $(this);
        let transferKfb = parseInt($this.find('[name="to_money"]').val());
        let fixedDeposit = parseInt($('#fixedDeposit').text());
        let currentDeposit = parseInt($('#currentDeposit').text());
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
export const bindMessageActionBtnsClick = function () {
    $('#messageActionBtns').on('click', 'button', function () {
        let $form = $('#messageListForm');
        let name = $(this).attr('name');
        if (name === 'selectAll') {
            Util.selectAll($('[name="delid[]"]'));
        }
        else if (name === 'selectInverse') {
            Util.selectInverse($('[name="delid[]"]'));
        }
        else if (name === 'selectCustom') {
            let title = $.trim(
                prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除')
            );
            if (!title) return;
            $('[name="delid[]"]').prop('checked', false);
            $('a.thread-link').each(function () {
                let $this = $(this);
                for (let key of title.split('|')) {
                    if ($this.text().toLowerCase().includes(key.toLowerCase())) {
                        $this.parent().find('[name="delid[]"]').prop('checked', true);
                    }
                }
            });
        }
        else if (name === 'download') {
            let $checked = $('[name="delid[]"]:checked');
            if ($checked.length > 0 && confirm(`是否下载这${$checked.length}项？`)) {
                $form.attr('action', '/message.php').find('[name="action"]').val('down');
                $form.submit();
            }
        }
        else if (name === 'delete') {
            let $checked = $('[name="delid[]"]:checked');
            if ($checked.length > 0 && confirm(`是否删除这${$checked.length}项？`)) {
                $form.attr('action', Util.makeUrl('message/job')).find('[name="action"]').val('del');
                $form.submit();
            }
        }
    });
};

/**
 * 验证注册页面字段
 */
export const validateRegisterField = function () {
    $(document).on('change', 'input[name]', function () {
        let $this = $(this);
        let name = $this.attr('name');
        let value = $this.val();
        if (!value) {
            Util.showValidationMsg($this, 'clear');
            return;
        }
        if (name === 'regemail') {
            Util.showValidationMsg($this, 'wait', '检查中，请稍等&hellip;');
            $.post(Util.makeUrl('register/check'), 'username=' + value, ({type, msg, username}) => {
                if ($this.val() === username) {
                    Util.showValidationMsg($this, type, msg);
                }
            }).fail(() => {
                Util.showValidationMsg($this, 'error', '响应失败');
            });
        }
        else if (name === 'regpwd') {
            if (value.length > 16 || value.length < 6) {
                Util.showValidationMsg($this, 'error', '密码长度不正确');
            }
            else {
                Util.showValidationMsg($this, 'clear');
                $('[name="regpwdrepeat"]').trigger('change');
            }
        }
        else if (name === 'regpwdrepeat') {
            if (value !== $('[name="regpwd"]').val()) Util.showValidationMsg($this, 'error', '两次输入的密码不相符');
            else Util.showValidationMsg($this, 'clear');
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
 * 处理个人信息页面下的按钮
 */
export const handleUserPageBtns = function () {
    let $area = $('#profileBtns');
    let userName = $area.data('username');
    $area.on('click', '[name="followUser"], [name="blockUser"]', function () {
        readConfig();
        let $this = $(this);
        let str = '关注';
        let userList = Config.followUserList;
        if ($this.attr('name') === 'blockUser') {
            str = '屏蔽';
            userList = Config.blockUserList;
            Config.blockUserEnabled = true;
        }
        else Config.followUserEnabled = true;
        if ($this.text().includes('取消')) {
            let index = Util.inFollowOrBlockUserList(userName, userList);
            if (index > -1) {
                userList.splice(index, 1);
                writeConfig();
            }
            $this.removeClass('btn-outline-danger').addClass('btn-outline-primary').find('span').text(str + '用户');
            alert('该用户已被取消' + str);
        }
        else {
            if (Util.inFollowOrBlockUserList(userName, userList) === -1) {
                if (str === '屏蔽') {
                    let type = Config.blockUserDefaultType;
                    type = prompt('请填写屏蔽类型，0：主题和回帖；1：主题；2：回帖', type);
                    if (type === null) return;
                    type = parseInt(type);
                    if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                    userList.push({name: userName, type: type});
                }
                else {
                    userList.push({name: userName});
                }
                writeConfig();
            }
            $this.removeClass('btn-outline-primary').addClass('btn-outline-danger').find('span').text('取消' + str);
            alert('该用户已被' + str);
        }
    }).find('[name="followUser"], [name="blockUser"]').each(function () {
        let $this = $(this);
        let str = '关注';
        let userList = Config.followUserList;
        if ($this.attr('name') === 'blockUser') {
            str = '屏蔽';
            userList = Config.blockUserList;
        }
        if (Util.inFollowOrBlockUserList(userName, userList) > -1) {
            $this.removeClass('btn-outline-primary').addClass('btn-outline-danger').find('span').text('取消' + str);
        }
    });
};

/**
 * 处理个人信息页面上的元素
 */
export const handleProfilePage = function () {
    let $registerDate = $('#registerDate');
    let matches = /(\d{4})-(\d{2})-(\d{2})/.exec($registerDate.text());
    if (matches) {
        let now = new Date();
        let [, year, month, day] = matches;
        if (parseInt(month) === now.getMonth() + 1 && parseInt(day) === now.getDate() && parseInt(year) <= now.getFullYear()) {
            $registerDate.attr('title', `今天是该用户注册${now.getFullYear() - parseInt(year)}周年纪念日`).addClass('text-danger help');
        }
    }
};
