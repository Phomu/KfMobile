/* 自定义脚本模块 */
'use strict';

/**
 * 运行命令
 * @param {string} cmd 命令
 * @param {boolean} isOutput 是否在控制台上显示结果
 * @returns {{isError: boolean, response: string}} isError：是否出错；response：执行结果
 */
export const runCmd = function (cmd, isOutput = false) {
    let isError = false;
    let response = '';
    try {
        response = eval(cmd);
        if (isOutput) console.log(response);
    }
    catch (ex) {
        isError = true;
        response = ex;
        console.log(ex);
    }
    return {isError, response: String(response)};
};
