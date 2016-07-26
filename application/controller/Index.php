<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 首页控制器
 * @package app\controller
 */
class Index extends Base
{
    /**
     * 首页
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $response = Proxy::get('index.php', $request->param());
        $index = new responser\Index($response);
        $this->assign($index->index());
        return $this->fetch('Index/index');
    }
}
