<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

class Read extends Base
{
    public function index(Request $request)
    {
        $this->redirect('/read.php?' . http_build_query($request->param()));
    }
}
