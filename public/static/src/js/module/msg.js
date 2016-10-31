'use strict';

/**
 * 显示消息
 * @param {string} msg 消息
 * @param {number} duration 消息持续时间（秒），-1为永久显示
 * @param {boolean} clickable 消息框可否手动点击消除
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @example
 * show('<span class="mr-1">使用道具</span><span class="text-item">神秘系数<em class="text-warning">+1</em></span>', -1);
 * show({
 *   msg: '<span class="mr-1">抽取神秘盒子</span><span class="text-item">KFB<em class="text-warning">+8</em></span>',
 *   duration: 20,
 *   clickable: false,
 * });
 * @returns {jQuery} 消息框对象
 */
export const show = function ({
    msg = '',
    duration = Config.defShowMsgDuration,
    clickable = true,
    preventable = false,
}) {
    if (arguments.length > 0) {
        if ($.type(arguments[0]) === 'string') msg = arguments[0];
        if ($.type(arguments[1]) === 'number') duration = arguments[1];
    }

    let $container = $('.msg-container');
    let isFirst = $container.length === 0;
    if (!isFirst && !$('.mask').length) {
        if ($container.height() >= $(window).height() * 0.8) {
            destroy();
            isFirst = true;
        }
    }
    if (preventable && !$('.mask').length) {
        $('<div class="mask"></div>').appendTo('body');
    }
    if (isFirst) {
        $container = $('<div class="container msg-container"></div>').appendTo('body');
    }

    let $msg = $(`<div class="msg">${msg}</div>`).appendTo($container);
    $msg.on('click', '.stop-action', function (e) {
        e.preventDefault();
        $(this).text('正在停止&hellip;').closest('.msg').data('stop', true);
    });
    if (clickable) {
        $msg.css('cursor', 'pointer').click(function () {
            hide($(this));
        }).find('a').click(function (e) {
            e.stopPropagation();
        });
    }
    if (preventable) $msg.attr('preventable', true);
    $msg.slideDown('normal');
    if (duration > -1) {
        setTimeout(() => {
            hide($msg);
        }, duration * 1000);
    }
    return $msg;
};

/**
 * 显示等待消息
 * @param {string} msg 消息
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @returns {jQuery} 消息框对象
 */
export const wait = function (msg, preventable = true) {
    return show({msg: msg, duration: -1, clickable: false, preventable: preventable});
};

/**
 * 隐藏指定消息框
 * @param {jQuery} $msg 消息框对象
 */
export const hide = function ($msg) {
    $msg.slideUp('normal', function () {
        remove($(this));
    });
};

/**
 * 删除指定消息框
 * @param {jQuery} $msg 消息框对象
 */
export const remove = function ($msg) {
    let $container = $msg.parent();
    $msg.remove();
    if (!$('.msg').length) {
        $container.remove();
        $('.mask').remove();
    }
    else if (!$('.msg[preventable]').length) {
        $('.mask').remove();
    }
};

/**
 * 销毁所有消息框
 */
export const destroy = function () {
    $('.msg-container').remove();
    $('.mask').remove();
};
