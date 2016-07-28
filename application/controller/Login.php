<?php
namespace app\controller;

use think\Controller;
use think\Request;
use app\lib\Proxy;
use app\responser\Responser;

/**
 * 登录控制器
 * @package app\controller
 */
class Login extends Controller
{
    /**
     * 初始化
     */
    protected function _initialize()
    {
        if (config('site_close', false)) {
            error(config('site_close_msg'));
        }
    }

    /**
     * 展示登录页面
     * @param bool $isRemote 是否获取远端页面
     * @param null $jumpUrl 跳转URL
     * @return mixed
     */
    public function index($isRemote = true, $jumpUrl = null)
    {
        if ($isRemote) {
            $response = Proxy::get('login.php');
            new Responser($response);
        }
        $this->assign([
            'jumpUrl' => $jumpUrl ? $jumpUrl : url('/'),
            'noPageInfo' => true
        ]);
        return $this->fetch('Login/index');
    }

    /**
     * 登录
     * @param Request $request
     */
    public function login(Request $request)
    {
        if (!$this->request->isPost()) return error('请求类型错误！');

        $response = Proxy::post('login.php', $request->param());
        if ($response['code'] !== 200) {
            $this->error(
                '远端连接错误' .
                (empty($response['errorMsg']) ? '（' . $response['code'] . '）' : '：' . $response['errorMsg'])
            );
        }
        $cookies = $response['cookies'];
        $userCookieName = config('kf_cookie_prefix') . 'winduser';
        if (isset($cookies[$userCookieName])) {
            $expire = $request->param('cktime', 0) ? 60 * 60 * 24 * 356 : 0;
            cookie($userCookieName, $cookies[$userCookieName], ['prefix' => '', 'expire' => $expire, 'httponly' => 'true']);
        }

        new Responser($response, $request->param('jumpurl', ''));
        return $this->error('登录失败');
    }

    /**
     * 登出
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $response = Proxy::get('login.php?action=quit&verify=' . $request->param('verify', ''));
        new Responser($response, url('/'));
        return success('登出', url('/'));
    }
}