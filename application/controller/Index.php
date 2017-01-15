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
        $data = $index->index();
        if ($request->isAjax()) return $data;
        else return $this->fetch('Index/index', $data);
    }
}
