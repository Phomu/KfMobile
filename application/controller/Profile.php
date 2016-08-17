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
}
