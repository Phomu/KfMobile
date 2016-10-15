'use strict';

// 配置名称
const configName = 'kf_config';

/**
 * 配置类
 */
let Config = {};

/**
 * 读取设置
 */
export const read = function () {
    let options = localStorage[configName];
    if (!options) return;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    window.Config = options;
};

/**
 * 写入设置
 */
export const write = function () {
    localStorage[configName] = JSON.stringify(window.Config);
};
