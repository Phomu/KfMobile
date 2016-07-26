<?php
namespace app\controller;

use think\Request;
use app\lib\Proxy;
use app\responser;

class Profile extends Base
{
    public function show(Request $request)
    {
        $uid = $request->param('uid', '');
        $userName = $request->param('username', '');
        if (!empty($userName)) $userName = mb_convert_encoding($userName, config('remote_site_encoding'), config('site_encoding'));
        $param = '';
        if (!empty($uid)) {
            $param .= '&uid=' . $uid;
        }
        if (!empty($userName)) {
            $param .= '&username=' . $userName;
        }
        $this->redirect('/profile.php?action=show' . $param);
    }
}
