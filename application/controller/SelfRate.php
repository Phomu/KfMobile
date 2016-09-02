<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 自助评分页面控制器
 * @package app\controller
 */
class SelfRate extends Base
{
    /**
     * 展示最近发布的分享帖页面
     * @param Request $request
     * @return mixed
     */
    public function latest(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=1', $request->param());
        $selfRate = new responser\SelfRate($response);
        $this->assign($selfRate->latest(['action' => $request->action()]));
        return $this->fetch('SelfRate/latest');
    }

    /**
     * 展示待检查的评分记录页面
     * @param Request $request
     * @return mixed
     */
    public function waitCheck(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=2', $request->param());
        $selfRate = new responser\SelfRate($response);
        $this->assign($selfRate->waitCheck(['action' => $request->action()]));
        return $this->fetch('SelfRate/waitCheck');
    }

    /**
     * 展示关于我的评分记录页面
     * @param Request $request
     * @return mixed
     */
    public function my(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=3', $request->param());
        $selfRate = new responser\SelfRate($response);
        $this->assign($selfRate->my(['action' => $request->action()]));
        return $this->fetch('SelfRate/my');
    }

    /**
     * 展示已完成的评分记录页面
     * @param Request $request
     * @return mixed
     */
    public function complete(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=4', $request->param());
        $selfRate = new responser\SelfRate($response);
        $this->assign($selfRate->complete(['action' => $request->action()]));
        return $this->fetch('SelfRate/complete');
    }

    /**
     * 展示自助评分奖励页面
     * @param Request $request
     * @return mixed
     */
    public function rating(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?do=1', $request->param());
        $selfRate = new responser\SelfRate($response);
        $this->assign($selfRate->rating(['action' => $request->action()]));
        return $this->fetch('SelfRate/rating');
    }
}
