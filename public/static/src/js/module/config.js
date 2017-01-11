/* 配置模块 */
'use strict';
import * as Util from './util';

// 配置名称
const name = 'kf_config';

/**
 * 配置类
 */
export const Config = {
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

    // 主题每页楼层数量，用于电梯直达等功能，如果修改了论坛设置里的“文章列表每页个数”，请在此修改成相同的数目
    perPageFloorNum: 10,
    // 主题内容字体大小，设为0表示使用默认大小，默认值：14px
    threadContentFontSize: 0,

    // 默认的消息显示时间（秒），设置为-1表示永久显示
    defShowMsgDuration: -1,

    // 是否开启关注用户的功能，true：开启；false：关闭
    followUserEnabled: false,
    // 关注用户列表，格式：[{name:'用户名'}]，例：[{name:'张三'}, {name:'李四'}]
    followUserList: [],
    // 是否高亮所关注用户在首页下的主题链接，true：开启；false：关闭
    highlightFollowUserThreadInHPEnabled: true,
    // 是否高亮所关注用户在主题列表页面下的主题链接，true：开启；false：关闭
    highlightFollowUserThreadLinkEnabled: true,
    // 是否开启屏蔽用户的功能，true：开启；false：关闭
    blockUserEnabled: false,
    // 屏蔽用户的默认屏蔽类型，0：屏蔽主题和回贴；1：仅屏蔽主题；2：仅屏蔽回贴
    blockUserDefaultType: 0,
    // 是否屏蔽被屏蔽用户的@提醒，true：开启；false：关闭
    blockUserAtTipsEnabled: true,
    // 屏蔽用户的版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockUserForumType: 0,
    // 屏蔽用户的版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockUserFidList: [],
    // 屏蔽用户列表，格式：[{name:'用户名', type:屏蔽类型}]，例：[{name:'张三', type:0}, {name:'李四', type:1}]
    blockUserList: [],
    // 是否开启屏蔽标题包含指定关键字的主题的功能，true：开启；false：关闭
    blockThreadEnabled: false,
    // 屏蔽主题的默认版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockThreadDefForumType: 0,
    // 屏蔽主题的默认版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockThreadDefFidList: [],
    // 屏蔽主题的关键字列表，格式：[{keyWord:'关键字', includeUser:['包括的用户名'], excludeUser:['排除的用户名'], includeFid:[包括指定的版块ID], excludeFid:[排除指定的版块ID]}]
    // 关键字可使用普通字符串或正则表达式（正则表达式请使用'/abc/'的格式），includeUser、excludeUser、includeFid和excludeFid这三项为可选
    // 例：[{keyWord: '标题1'}, {keyWord: '标题2', includeUser:['用户名1', '用户名2'], includeFid: [5, 56]}, {keyWord: '/关键字A.*关键字B/i', excludeFid: [92, 127, 68]}]
    blockThreadList: [],
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
export const normalize = function (options) {
    let settings = {};
    if ($.type(options) !== 'object') return settings;
    for (let [key, value] of Object.entries(options)) {
        if (key in Config && $.type(value) === $.type(Config[key])) {
            settings[key] = value;
        }
    }
    return settings;
};
