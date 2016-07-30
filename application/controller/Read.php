<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 主题页面控制器
 * @package app\controller
 */
class Read extends Base
{
    public function index(Request $request)
    {
        $fpage = input('fpage/d', 0);
        $response = Proxy::get('read.php', $request->param());
        $read = new responser\Read($response);
        $this->assign(array_merge($read->index(), ['fpage' => $fpage]));
        return $this->fetch('Read/index');
    }
}
