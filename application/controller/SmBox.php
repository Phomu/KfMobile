<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 神秘盒子页面控制器
 * @package app\controller
 */
class SmBox extends Base
{
    /**
     * 展示神秘盒子页面
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $response = Proxy::get('kf_smbox.php', $request->param());
        $smBox = new responser\SmBox($response);
        $this->assign($smBox->index());
        return $this->fetch('SmBox/index');
    }
}
