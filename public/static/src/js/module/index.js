'use strict';
import * as Util from './util';
import Const from './const';
import {read as readConfig, write as writeConfig} from './config';

/**
 * 处理首页的@提醒按钮
 */
export const handleAtTipsBtn = function () {
    $('#atTips').click(function () {
        let $this = $(this);
        let time = $this.data('time');
        let cookieValue = Util.getCookie(Const.atTipsTimeCookieName);
        if (!time || time === cookieValue) return;
        if (!cookieValue) {
            let currentDate = (new Date()).getDate();
            Util.setCookie(Const.prevAtTipsTimeCookieName, (currentDate < 10 ? '0' + currentDate : currentDate) + '日00时00分');
        }
        else if (cookieValue !== time) {
            Util.setCookie(Const.prevAtTipsTimeCookieName, cookieValue);
        }
        Util.setCookie(Const.atTipsTimeCookieName, time, Util.getDate('+3d'));
        $this.removeClass('btn-outline-danger').addClass('btn-outline-primary');
    });
};

/**
 * 高亮关键词页面中未读的消息
 */
export const highlightUnReadAtTipsMsg = function () {
    if (pageInfo.gjc !== pageInfo.userName) return;
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
 * 处理首页主题链接面板
 */
export const handleIndexThreadPanel = function () {
    if (Config.activeNewReplyPanel) {
        $(`a[data-toggle="tab"][href="${Config.activeNewReplyPanel}"]`).tab('show');
    }
    if (Config.activeTopRecommendPanel) {
        $(`a[data-toggle="tab"][href="${Config.activeTopRecommendPanel}"]`).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        let $target = $(e.target);
        let targetPanel = $target.attr('href');
        let typeName = '';
        if (targetPanel.includes('NewReplyPanel')) typeName = 'activeNewReplyPanel';
        else if (targetPanel.includes('TopRecommendPanel')) typeName = 'activeTopRecommendPanel';
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
export const handleSelectBgImage = function () {
    $('#selectBgImage').on('click', '[data-id]', function () {
        let $this = $(this);
        let id = $this.data('id');
        let fileName = $this.data('filename');
        let path = $this.parent().data('path');
        if (!id || !fileName || !path) return;
        if (confirm('是否选择此背景图片？')) {
            Util.setCookie(Const.bgStyleCookieName, id, Util.getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + path + fileName + '")');
            alert('背景已更换');
        }
    });
};

/**
 * 处理选择页面背景颜色
 */
export const handleSelectBgColor = function () {
    $('#selectBgImage').on('click', '[data-color]', function () {
        let $this = $(this);
        let color = $this.data('color');
        if (!color) return;
        if (confirm('是否选择此背景颜色？')) {
            Util.setCookie(Const.bgStyleCookieName, color, Util.getDate('+1y'));
            $('body, .modal-content').css('background', color);
            alert('背景已更换');
        }
    });
};

/**
 * 处理自定义背景样式
 */
export const handleCustomBgStyle = function () {
    $('#customBgStyle').click(function () {
        let value = Util.getCookie(Const.bgStyleCookieName);
        if (!value || parseInt(value)) value = '';
        value = prompt(
            '请输入背景图片URL、颜色代码或CSS样式：\n（例：http://xxx.com/abc.jpg 或 #fcfcfc，留空表示恢复默认背景）\n' +
            '（注：建议选择简洁、不花哨、偏浅色系的背景图片或颜色）',
            value
        );
        if (value === null) return;
        if ($.trim(value) === '') {
            Util.setCookie(Const.bgStyleCookieName, '', Util.getDate('-1d'));
            alert('背景已恢复默认');
            location.reload();
        }
        else if (/^https?:\/\/[^"\']+/.test(value)) {
            Util.setCookie(Const.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background-image', 'url("' + value + '")');
            alert('背景已更换');
        }
        else if (/^#[0-9a-f]{6}$/i.test(value)) {
            Util.setCookie(Const.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background', value.toLowerCase());
            alert('背景已更换');
        }
        else if (!/[<>{}]/.test(value)) {
            value = value.replace(';', '');
            Util.setCookie(Const.bgStyleCookieName, value, Util.getDate('+1y'));
            $('body, .modal-content').css('background', value);
            alert('背景已更换');
        }
        else {
            alert('格式不正确');
        }
    });
};
