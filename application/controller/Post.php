<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 发帖页面控制器
 * @package app\controller
 */
class Post extends Base
{
    public function reply(Request $request)
    {
        if (!$request->isPost()) return error('非法请求');
        if (input('action', '') !== 'reply') return error('非法请求');
        $response = Proxy::post('post.php', $request->param());
        new responser\Responser($response);
        return error('回复失败');
    }
}
