<?php
namespace app\responser;

use think\Exception;

/**
 * 响应类
 * @package app\responser
 */
class Responser
{
    // 回应数据
    protected $response = null;
    // 跳转URL
    protected $jumpUrl = '';

    /**
     * 响应类构造方法
     * @param array $response 回应数据
     * @param string $jumpUrl 跳转URL
     */
    public function __construct($response, $jumpUrl = '')
    {
        $this->response = $response;
        $this->jumpUrl = $jumpUrl;
        $this->_initialize();
    }

    /**
     * 初始化
     */
    protected function _initialize()
    {
        $code = $this->response['code'];
        if ($code === 301 || $code === 302) {
            controller('Msg')->redirectUrl($this->response['location']);
        } elseif ($code !== 200) {
            error(
                '远端连接错误' .
                (empty($this->response['errorMsg']) ? '（' . $code . '）' : '：' . $this->response['errorMsg'])
            );
        }
        $this->setResponseCookies($this->response['cookies']);

        $document = $this->response['document'];
        $matches = [];
        if (preg_match(
            '/<span style="[^"]+">([^<>]+)<\/span><br\s*\/><a href="([^"]+)">如果您的浏览器没有自动跳转,请点击这里<\/a><\/div>/i',
            $document,
            $matches
        )) {
            trace('跳转url：' . $matches[2]);
            success($matches[1], $this->jumpUrl ? $this->jumpUrl : $matches[2]);
        } elseif (preg_match('/操作提示<br\s*\/>\r\n([^<>]+)<br\s*\/>\r\n<a href="javascript:history\.go\(-1\);">/i', $document, $matches)) {
            error($matches[1]);
        }
    }

    /**
     * 设置服务器返回的cookies
     * @param array $cookies cookies数组
     * @param int $expire cookies保存时间
     */
    protected function setResponseCookies($cookies, $expire = 0)
    {
        foreach ($cookies as $key => $value) {
            if (strpos($value, 'deleted') === 0) {
                cookie($key, null);
            } else {
                if ($key === config('kf_cookie_prefix') . 'winduser') continue;
                cookie($key, $value, ['prefix' => '', 'expire' => $expire, 'httponly' => 'true']);
            }
        }
    }

    /**
     * 获取页面通用数据
     * @param \phpQueryObject $doc 页面文档对象
     * @return array 页面通用数据
     */
    protected function getCommonData(\phpQueryObject $doc)
    {
        $title = pq('title', $doc)->text();
        $keywords = pq('meta[name="keywords"]', $doc)->attr('content');
        $description = pq('meta[name="description"]', $doc)->attr('content');

        $pqUser = pq('.topright > a[href^="profile.php?action=show&uid="]', $doc);
        $uid = 0;
        $matches = [];
        if (preg_match('/&uid=(\d+)/i', $pqUser->attr('href'), $matches)) $uid = intval($matches[1]);
        $userName = $pqUser->text();
        if (!$userName) {
            success('请登录', 'login/index');
        }

        $hasNewMsg = trim(pq('.topright > a[href="message.php"]', $doc)->text()) === '新消息';

        $verify = '';
        if (preg_match('/&verify=(\w+)/i', pq('.topright > a[href^="login.php?action=quit&verify="]', $doc)->attr('href'), $matches))
            $verify = $matches[1];

        $safeId = '';
        if (preg_match('/&safeid=(\w+)/i', pq('a[href*="safeid="]:first', $doc)->attr('href'), $matches))
            $safeId = $matches[1];

        return [
            'title' => $title,
            'keywords' => $keywords,
            'description' => $description,
            'uid' => $uid,
            'userName' => $userName,
            'hasNewMsg' => $hasNewMsg,
            'verify' => $verify,
            'safeId' => $safeId,
            'rootPath' => PUBLIC_PATH,
            'urlParam' => http_build_query(request()->param()),
            'remoteUrl' => $this->response['remoteUrl'],
        ];
    }

    /**
     * 获取测试用的页面通用数据
     * @return array 测试用的页面通用数据
     */
    public static function getTestCommonData()
    {
        return [
            'title' => config('site_name'),
            'keywords' => 'GALGAME,绯月,ACG论坛',
            'description' => '绯月是一个以动漫、游戏、音乐、绘画等为主题的论坛。',
            'uid' => 123456,
            'userName' => '测试账号',
            'hasNewMsg' => false,
            'verify' => 'abcdef',
            'safeId' => 'abc123',
            'rootPath' => PUBLIC_PATH,
            'remoteUrl' => config('proxy_base_url'),
        ];
    }

    /**
     * 处理文档解析错误
     * @param \Exception $ex 错误类
     * @throws \Exception
     */
    protected function handleError($ex)
    {
        if (!config('app_debug')) return error('文档解析错误');
        throw $ex;
    }
}
