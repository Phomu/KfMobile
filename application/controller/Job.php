<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 任务页面控制器
 * @package app\controller
 */
class Job extends Base
{
    /**
     * 购买帖子
     * @param Request $request
     */
    public function buyTopic(Request $request)
    {
        $response = Proxy::get('job.php?action=buytopic', $request->param());
        new responser\Responser($response);
        return error('购买失败');
    }
}
