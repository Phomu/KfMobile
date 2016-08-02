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
    $url = str_replace('&amp;', '&', $url);
    if ($url === '/' || $url === 'index.php') return url('/');
    elseif (strpos($url, '#') === 0 || strpos($url, 'javascript:') === 0) return $url;
    $matches = [];
    if (preg_match('/^\/?(\w+\.php)(?:\?(.+))?/i', $url, $matches)) {
        $path = strtolower($matches[1]);
        $params = isset($matches[2]) ? $matches[2] : '';
        $anchor = '';
        if (preg_match('/(.+)(#.+)/', $params, $matches)) {
            $params = $matches[1];
            $anchor = $matches[2];
        }
        if ($path === 'login.php') return url('Login/index');
        elseif ($path === 'thread.php') return url('Thread/index', $params) . $anchor;
        elseif ($path === 'read.php') return url('Read/index', $params) . $anchor;
        elseif ($path === 'search.php') return url('Search/index', $params);
        elseif ($path === 'guanjianci.php') return url('GuanJianCi/index', $params);
        if (strpos($url, '/') !== 0) $url = '/' . $url;
        return $url;
    } elseif (preg_match('/^(https?:|\/)/', $url)) {
        return $url;
    }
    return url($url);
}

/**
 * 将KF其它域名的URL转换为当前域名
 * @param string $url 转换前的URL
 * @return string 转换后的URL
 */
function convert_to_current_domain_url($url)
{
    $url = str_replace(request()->domain() . '/', '/', $url);
    return preg_replace('/^https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|kfer|miaola)\.\w+\/(.+)/i', '/$1', $url);
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

/**
 * 通过指定数字获取指定颜色名称
 * @param int $num
 * @return string 颜色名称
 */
function get_color_from_number($num)
{
    switch ($num % 5) {
        case 1:
            return 'success';
        case 2:
            return 'info';
        case 3:
            return 'warning';
        case 4:
            return 'danger';
        default:
            return 'primary';
    }
}