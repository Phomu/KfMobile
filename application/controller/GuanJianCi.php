<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 关键词页面控制器
 * @package app\controller
 */
class GuanJianCi extends Base
{
    public function index(Request $request)
    {
        $response = Proxy::get('guanjianci.php', $request->param());
        $gjc = new responser\GuanJianCi($response);
        $this->assign($gjc->index());
        return $this->fetch('GuanJianCi/index');
    }
}
