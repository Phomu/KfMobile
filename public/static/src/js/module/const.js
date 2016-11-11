/* 常量模块 */
'use strict';

/**
 * 常量类
 */
const Const = {
    // 存储多重引用数据的LocalStorage名称
    multiQuoteStorageName: 'kf_multi_quote',
    // at提醒时间的Cookie名称
    atTipsTimeCookieName: 'at_tips_time',
    // 上一次at提醒时间的Cookie名称
    prevAtTipsTimeCookieName: 'prev_at_tips_time',
    // 背景样式的Cookie名称
    bgStyleCookieName: 'bg_style',
    // 常用版块列表
    commonForumList: [
        {fid: 106, name: '新作动态'},
        {fid: 41, name: '网盘下载'},
        {fid: 16, name: '种子下载'},
        {fid: 52, name: '游戏讨论'},
        {fid: 84, name: '动漫讨论'},
        {fid: 67, name: 'CG下载'},
        {fid: 5, name: '自由讨论'},
        {fid: 56, name: '个人日记'},
        {fid: 57, name: '同人漫本'},
    ],
    // 可用版块列表
    availableForumList: [
        {fid: 106, name: '新作动态'},
        {fid: 52, name: '游戏讨论'},
        {fid: 16, name: '种子下载'},
        {fid: 41, name: '网盘下载'},
        {fid: 67, name: 'CG下载'},
        {fid: 102, name: '游戏推荐'},
        {fid: 24, name: '疑难互助'},
        {fid: 57, name: '同人漫本'},
        {fid: 84, name: '动漫讨论'},
        {fid: 92, name: '动画共享'},
        {fid: 127, name: '漫画小说'},
        {fid: 68, name: '音乐共享'},
        {fid: 163, name: 'LIVE共享'},
        {fid: 182, name: '转载资源'},
        {fid: 94, name: '原创绘画'},
        {fid: 87, name: '宅物交流'},
        {fid: 86, name: '电子产品'},
        {fid: 115, name: '文字作品'},
        {fid: 96, name: '图片来源'},
        {fid: 36, name: '寻求资源'},
        {fid: 5, name: '自由讨论'},
        {fid: 56, name: '个人日记'},
        {fid: 9, name: '我的关注'},
        {fid: 4, name: '意见投诉'},
        {fid: 93, name: '管理组区'},
        {fid: 59, name: '原创组区'},
        {fid: 125, name: '水楼林立'},
        {fid: 181, name: '私人日记'},
        {fid: 42, name: '旧期资料'},
        {fid: 128, name: '作品判定'},
        {fid: 98, name: '日本语版'},
        {fid: 99, name: '意見箱'},
        {fid: 112, name: '掲示板'},
        {fid: 100, name: '創作感想'},
    ],
};

export default Const;
