<?php
// 应用公共文件

/**
 * 获取经过序列化后的cookies字符串
 * @param array $cookies cookies数组
 * @param string $prefix 用于筛选的cookies前缀
 * @return string 经过序列化后的cookies字符串
 */
function serialize_cookies($cookies, $prefix = '')
{
    $result = '';
    foreach ($cookies as $key => $value) {
        if ($prefix && strpos($key, $prefix) !== 0) continue;
        $result .= $key . '=' . $value . '; ';
    }
    return $result;
}

/**
 * 操作成功跳转的快捷方法
 * @param string $msg 提示信息
 * @param string $url 跳转的URL地址
 * @param int $wait 跳转等待时间
 * @throws \think\exception\HttpResponseException
 */
function success($msg, $url = null, $wait = 5)
{
    controller('Msg')->successMsg($msg, $url, $wait);
}

/**
 * 操作错误跳转的快捷方法
 * @param string $msg 提示信息
 * @throws \think\exception\HttpResponseException
 */
function error($msg)
{
    controller('Msg')->errorMsg($msg);
}

/**
 * 将远端的URL转换为本站的URL
 * @param string $url 远端的URL
 * @return string 经过转换的URL
 */
function convert_url($url)
{
    if ($url === '/' || $url === 'index.php') return url('/');
    $matches = [];
    if (preg_match('/^(\w+\.php)(?:\?(.+))?/i', $url, $matches)) {
        $path = strtolower($matches[1]);
        $params = isset($matches[2]) ? $matches[2] : '';
        if ($path === 'login.php') return url('Login/index');
        elseif ($path === 'thread.php') return url('Thread/index', $params);
        return $url;
    } elseif (preg_match('/^(https?:|\/)/', $url)) {
        return $url;
    }
    return url($url);
}

/**
 * 将字符串两端的空白字符删除并将HTML字符转义
 * @param string $str 字符串
 * @return string 经过转换后的字符串
 */
function trim_strip($str)
{
    return htmlspecialchars(trim($str));
}
