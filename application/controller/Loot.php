<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 争夺页面控制器
 * @package app\controller
 */
class Loot extends Base
{
    /**
     * 展示争夺排行页面
     * @param Request $request
     * @return mixed
     */
    public function rank(Request $request)
    {
        $response = Proxy::get('kf_fw_ig_pklist.php');
        $loot = new responser\Loot($response);
        $data = $loot->rank();
        if ($request->isAjax()) return $data;
        else return $this->fetch('Loot/rank', $data);
    }
}
