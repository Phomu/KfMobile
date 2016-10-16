'use strict';
import * as Util from './util';

// 配置名称
const name = 'kf_config';

/**
 * 配置类
 */
let Config = {
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
};

/**
 * 初始化
 */
export const init = function () {
    window.Config = $.extend(true, {}, Config);
    read();
};

/**
 * 读取设置
 */
export const read = function () {
    let options = localStorage[name];
    if (!options) return;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    options = normalize(options);
    window.Config = $.extend(true, {}, Config, options);
};

/**
 * 写入设置
 */
export const write = function () {
    let options = Util.getDifferenceSetOfObject(Config, window.Config);
    localStorage[name] = JSON.stringify(options);
};

/**
 * 清空设置
 */
export const clear = function () {
    localStorage.removeItem(name);
};

/**
 * 获取经过规范化的Config对象
 * @param {{}} options 待处理的Config对象
 * @returns {{}} 经过规范化的Config对象
 */
const normalize = function (options) {
    var settings = {};
    if ($.type(options) !== 'object') return settings;
    $.each(options, (key, value) => {
        if (key in Config) {
            settings[key] = value;
        }
    });
    return settings;
};
