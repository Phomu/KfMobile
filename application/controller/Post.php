<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 发表帖子页面控制器
 * @package app\controller
 */
class Post extends Base
{
    /**
     * 展示发表帖子页面
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $response = Proxy::get('post.php', $request->param());
        $post = new responser\Post($response);
        $this->assign($post->index());
        return $this->fetch('Post/index');
    }

    /**
     * 发表帖子
     * @param Request $request
     */
    public function post(Request $request)
    {
        if (!$request->isPost()) return error('非法请求');
        $response = Proxy::post('post.php', $request->param());
        new responser\Responser($response);
        return error('发帖失败');
    }
}
