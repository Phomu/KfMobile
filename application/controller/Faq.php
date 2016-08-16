<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 帮助页面控制器
 * @package app\controller
 */
class Faq extends Base
{
    /**
     * 展示帮助页面
     * @param int $id 问题ID
     * @return mixed
     */
    public function index($id = 1)
    {
        $id = intval($id);
        $response = Proxy::get('faq.php', 'id=' . $id);
        $faq = new responser\Faq($response);
        $this->assign($faq->index(['id' => $id]));
        return $this->fetch('Faq/index');
    }
}
