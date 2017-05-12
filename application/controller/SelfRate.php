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
        $data = $selfRate->latest(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/latest', $data);
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
        $data = $selfRate->waitCheck(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/waitCheck', $data);
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
        $data = $selfRate->my(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/my', $data);
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
        $data = $selfRate->complete(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/complete', $data);
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
        $data = $selfRate->rating(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/rating', $data);
    }

    /**
     * 展示自助评分检查页面
     * @param Request $request
     * @return mixed
     */
    public function check(Request $request)
    {
        $do = input('do/d', 2);
        $do = intval($do) === 3 ? 3 : 2;
        $response = Proxy::get('kf_fw_1wkfb.php?do=' . $do, $request->param());
        $selfRate = new responser\SelfRate($response);
        $data = $selfRate->check(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/check', $data);
    }

    /**
     * 展示待检查的优秀帖页面
     * @param Request $request
     * @return mixed
     */
    public function waitCheckGoodPost(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=5', $request->param());
        $selfRate = new responser\SelfRate($response);
        $data = $selfRate->waitCheckGoodPost(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/waitCheckGoodPost', $data);
    }

    /**
     * 展示已完成的优秀帖页面
     * @param Request $request
     * @return mixed
     */
    public function completeGoodPost(Request $request)
    {
        $response = Proxy::get('kf_fw_1wkfb.php?ping=6', $request->param());
        $selfRate = new responser\SelfRate($response);
        $data = $selfRate->completeGoodPost(['action' => $request->action()]);
        if ($request->isAjax()) return $data;
        else return $this->fetch('SelfRate/completeGoodPost', $data);
    }
}
