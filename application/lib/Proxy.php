<?php
namespace app\lib;

/**
 * 反向代理类
 * @package app\lib
 */
class Proxy
{
    /**
     * 获取服务器返回的cookies
     * @param string $header http头部信息
     * @return array cookies数组
     */
    public static function getResponseCookies($header)
    {
        $matches = [];
        if (preg_match_all('/Set-Cookie:\s*([^;]+)/i', $header, $matches)) {
            $cookies = [];
            foreach ($matches[1] as $str) {
                list($key, $value) = explode('=', $str, 2);
                $cookies[$key] = $value;
            }
            return $cookies;
        }
        return [];
    }

    /**
     * 发出请求
     * @param string $url 请求的URL
     * @param string|array|null $postData post数据
     * @return array 响应信息
     */
    public static function request($url, $postData = null)
    {
        $url = config('proxy_base_url') . mb_convert_encoding($url, config('remote_site_encoding'), config('site_encoding'));
        $cookies = input('cookie.', []);
        unset($cookies[config('kf_cookie_prefix') . 'ipfrom']);
        $header[] = 'Cookie: ' . serialize_cookies($cookies, config('kf_cookie_prefix'));
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_USERAGENT, input('server.HTTP_USER_AGENT', ''));
        curl_setopt($ch, CURLOPT_REFERER, config('proxy_base_url'));
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, config('proxy_connection_timeout'));
        curl_setopt($ch, CURLOPT_TIMEOUT, config('proxy_timeout'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        if (!is_null($postData)) {
            curl_setopt($ch, CURLOPT_POST, true);
            if (is_array($postData)) {
                foreach ($postData as &$value) {
                    $value = mb_convert_encoding($value, config('remote_site_encoding'), config('site_encoding'));
                }
                $postData = http_build_query($postData);
            } else {
                $postData = mb_convert_encoding($postData, config('remote_site_encoding'), config('site_encoding'));
            }
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        }
        debug('begin');
        $result = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $errorMsg = curl_error($ch);
        curl_close($ch);
        debug('end');
        trace('获取远端页面用时：' . debug('begin', 'end') . 's');

        if (empty($result)) return ['code' => $code === 200 ? 502 : $code, 'errorMsg' => $errorMsg];
        list($header, $document) = explode("\r\n\r\n", $result, 2);
        if ($code === 200) {
            $document = mb_convert_encoding($document, config('site_encoding'), config('remote_site_encoding'));
            $document = str_ireplace(
                '<meta http-equiv="Content-Type" content="text/html; charset=gbk"',
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"',
                $document
            );
            $document = str_replace(rtrim(config('proxy_base_url'), '/'), request()->domain(), $document);
            return [
                'code' => $code,
                'header' => $header,
                'cookies' => self::getResponseCookies($header),
                'document' => $document,
                'remoteUrl' => $url
            ];
        } elseif ($code === 301 || $code === 302) {
            $matches = [];
            $location = '';
            if (preg_match('/Location:\s*(\S+)/i', $header, $matches)) {
                $location = $matches[1];
            }
            return ['code' => $code, 'header' => $header, 'location' => $location];
        } else {
            return ['code' => $code, 'header' => $header, 'errorMsg' => $errorMsg];
        }
    }

    /**
     * 发出GET请求
     * @param string $url 请求的URL
     * @param string|array $data GET请求数据
     * @return array 响应信息
     */
    public static function get($url, $data = null)
    {
        if (!is_null($data)) {
            if (is_array($data)) {
                foreach ($data as &$value) {
                    $value = mb_convert_encoding($value, config('remote_site_encoding'), config('site_encoding'));
                }
                $data = http_build_query($data);
            }
            if ($data) $url .= (strpos($url, '?') === false ? '?' : '&') . $data;
        }
        trace('GET请求：' . $url);
        return self::request($url);
    }

    /**
     * 发出POST请求
     * @param string $url 请求的URL
     * @param string|array $data POST请求数据
     * @return array 响应信息
     */
    public static function post($url, $data)
    {
        trace('POST请求：' . $url . '，请求数据：' . http_build_query($data));
        return self::request($url, $data);
    }

    public static function upload()
    {

    }
}
