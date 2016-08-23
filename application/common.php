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
        elseif ($path === 'thread.php') return url('Thread/index', $params);
        elseif ($path === 'read.php') return url('Read/index', $params) . $anchor;
        elseif ($path === 'search.php') return url('Search/index', $params);
        elseif ($path === 'guanjianci.php') return url('GuanJianCi/index', $params);
        elseif ($path === 'kf_growup.php') return url('GrowUp/index');
        elseif ($path === 'g_intro_index.php') return url('GameIntro/index');
        elseif ($path === 'g_intro.php') return url('GameIntro/game', $params);
        elseif ($path === 'g_intro_inc.php') return url('GameIntro/company', $params);
        elseif ($path === 'g_intro_adv.php') return url('GameIntro/type', $params);
        elseif ($path === 'g_intro_moe.php') return url('GameIntro/property', $params);
        elseif ($path === 'faq.php') return url('Faq/index', $params);
        elseif ($path === 'kf_smbox.php') return url('SmBox/index', $params);
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

/**
 * 通用HTML内容标签替换
 * @param string $html HTML内容
 * @return string 颜色名称
 */
function common_replace_html_tag($html)
{
    $html = preg_replace('/<strike>(.+?)<\/strike>/i', '<s>$1</s>', $html);
    $html = preg_replace_callback(
        '/href="([^"]+)"/i',
        function ($matches) {
            return 'href="' . convert_url(convert_to_current_domain_url($matches[1])) . '"';
        },
        $html
    );
    return $html;
}

/**
 * 生成游戏介绍图片的缩略图
 * @param string $path 图片路径
 * @param string $thumbPath 缩略图路径
 * @throws \Exception
 */
function make_thumb($path, $thumbPath)
{
    try {
        $content = file_get_contents(config('game_intro_base_url') . $path);
        $md5Path = md5($path);
        $fp = fopen(TEMP_PATH . $md5Path, 'w+');
        fwrite($fp, $content);
        fclose($fp);

        $image = \think\Image::open(TEMP_PATH . $md5Path);
        if (!file_exists(CACHE_PATH) && !mkdir(CACHE_PATH, 0755, true)) {
            exception('创建缩略图缓存目录失败');
        }
        $maxWidth = config('thumb_max_width');
        $maxHeight = config('thumb_max_height');
        if ($image->width() <= $maxWidth && $image->height() <= $maxHeight) {
            $image->save(CACHE_PATH . $thumbPath, null, 90);
        } else {
            $image->thumb($maxWidth, $maxHeight)->save(CACHE_PATH . $thumbPath, null, 90);
        }
        trace('保存缩略图至：' . CACHE_PATH . $thumbPath);
        unlink(TEMP_PATH . $md5Path);
    } catch (\Exception $ex) {
        if (config('app_debug')) throw $ex;
        else error('获取图片失败');
    }
}
