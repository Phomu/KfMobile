<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 搜索页面控制器
 * @package app\controller
 */
class Search extends Base
{
    public function index(Request $request)
    {
        $response = Proxy::post('search.php', $request->param());
        $search = new responser\Search($response);
        $this->assign($search->index());
        return $this->fetch('Search/index');
    }
}
