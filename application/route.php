<?php
// 路由配置
return [
    '/' => 'Index/index',
    'login$' => 'Login/index',
    'thread/:fid' => ['Thread/index', [], ['fid' => '\d+']],
    'read/:tid' => ['Read/index', [], ['tid' => '\d+']],
    'gjc/:gjc' => 'GuanJianCi/index',
    'user/uid/:uid' => ['Profile/show', [], ['uid' => '\d+']],
    'user/username/:username' => 'Profile/show',
    'growup$' => 'GrowUp/index',
    'rank' => 'Rank/index',
    'share' => 'Share/index',
    'game/:id' => ['GameIntro/game', [], ['id' => '\d+']],
];
