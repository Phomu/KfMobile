<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 等级经验页面控制器
 * @package app\controller
 */
class GrowUp extends Base
{
    /**
     * 展示等级经验页面
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $response = Proxy::get('kf_growup.php', $request->param());
        $growUp = new responser\GrowUp($response);
        $this->assign($growUp->index());
        return $this->fetch('GrowUp/index');
    }

    /**
     * 捐款
     * @param Request $request
     */
    public function donation(Request $request)
    {
        if (!$request->isPost()) return error('非法请求');
        $response = Proxy::post('kf_growup.php?ok=1', $request->param());
        new responser\Responser($response);
        return error('捐款失败');
    }

    /**
     * 更换ID颜色
     * @param Request $request
     */
    public function changeColor(Request $request)
    {
        $response = Proxy::get('kf_growup.php?ok=2', $request->param());
        new responser\Responser($response);
        return error('更换ID颜色失败');
    }
}