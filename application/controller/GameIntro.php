<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

/**
 * 游戏介绍页面控制器
 * @package app\controller
 */
class GameIntro extends Base
{
    /**
     * 展示游戏介绍首页
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $response = Proxy::get('g_intro_index.php', $request->param());
        $gameIntro = new responser\GameIntro($response);
        $this->assign($gameIntro->index());
        return $this->fetch('GameIntro/index');
    }

    /**
     * 展示游戏搜索页面
     * @param Request $request
     * @return mixed
     */
    public function search(Request $request)
    {
        $param = $request->except('k');
        $param['s'] = input('k', '');
        $response = Proxy::get('g_intro_s.php', $param);
        $gameIntro = new responser\GameIntro($response);
        $this->assign($gameIntro->search());
        return $this->fetch('GameIntro/search');
    }

    /**
     * 展示本月新作页面
     * @param Request $request
     * @return mixed
     */
    public function moon(Request $request)
    {
        $param = [];
        $param['g_moon_y'] = input('year/d', '');
        $param['g_moon_m'] = input('month/d', '');
        $response = Proxy::get('g_intro_moon.php', $param);
        $gameIntro = new responser\GameIntro($response);
        $this->assign($gameIntro->moon());
        return $this->fetch('GameIntro/moon');
    }

    /**
     * 展示游戏介绍页面
     * @param Request $request
     * @return mixed
     */
    public function game(Request $request)
    {
        $response = Proxy::get('g_intro.php', $request->param());
        $gameIntro = new responser\GameIntro($response);
        $this->assign($gameIntro->game());
        return $this->fetch('GameIntro/game');
    }
}
