<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 身份页面控制器
 * @package app\controller
 */
class Profile extends Base
{
    /**
     * 展示个人详细信息页面
     * @param Request $request
     * @return mixed
     */
    public function show(Request $request)
    {
        $response = Proxy::get('profile.php?action=show', $request->param());
        $profile = new responser\Profile($response);
        $this->assign($profile->show());
        return $this->fetch('Profile/show');
    }

    /**
     * 展示收藏夹页面
     * @param Request $request
     * @return mixed
     */
    public function favor(Request $request)
    {
        $type = input('type/d', -1);
        $func = 'get';
        if ($request->isPost()) $func = 'post';
        $response = Proxy::$func('profile.php?action=favor', $request->param());
        $profile = new responser\Profile($response);
        $this->assign($profile->favor(['type' => $type]));
        return $this->fetch('Profile/favor');
    }

    /**
     * 展示好友列表页面
     * @param Request $request
     * @return mixed
     */
    public function friend(Request $request)
    {
        $func = 'get';
        if ($request->isPost()) $func = 'post';
        $response = Proxy::$func('profile.php?action=friend', $request->param());
        $profile = new responser\Profile($response);
        $this->assign($profile->friend());
        return $this->fetch('Profile/friend');
    }
}
