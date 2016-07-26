<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

class Search extends Base
{
    public function index(Request $request)
    {
        $param = $request->param();
        foreach ($param as &$value) {
            $value = mb_convert_encoding($value, config('remote_site_encoding'), config('site_encoding'));
        }
        $this->redirect('/search.php?' . http_build_query($param));
    }
}
