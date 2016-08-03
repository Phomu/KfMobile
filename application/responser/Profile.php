<?php
namespace app\responser;

/**
 * 身份页面响应类
 * @package app\responser
 */
class Profile extends Responser
{
    /**
     * 获取详细信息页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
     */
    public function show($extraData = [])
    {
        debug('begin');
        $doc = null;
        $initTime = 0;
        try {
            debug('initBegin');
            $doc = \phpQuery::newDocumentHTML($this->response['document']);
            debug('initEnd');
            $initTime = debug('initBegin', 'initEnd');
        } catch (\Exception $ex) {
            $this->handleError($ex);
        }
        $commonData = array_merge($this->getCommonData($doc), $extraData);
        $matches = [];

        $pqLog = pq('.log1');
        // 基本信息
        $profileUid = 0;
        $profileUserName = '';
        $profileAvatar = '';
        if (preg_match('/^(.+)\s详细信息/', $pqLog->find('tr:first-child > td:first-child')->text(), $matches)) {
            $profileUserName = trim_strip($matches[1]);
        }
        $pqSecondLine = $pqLog->find('tr:last-child');
        $pqAvatarCell = $pqSecondLine->find('td:first-child');
        $profileAvatar = $pqAvatarCell->find('div > img.pic')->attr('src');
        if (strpos($profileAvatar, 'none.gif')) $profileAvatar = '';
        if (preg_match('/authorid=(\d+)/i', $pqAvatarCell->find('a[href^="search.php?authorid="]'), $matches)) {
            $profileUid = intval($matches[1]);
        }

        // 详细信息
        $pqDetailsHtml = $pqSecondLine->find('td:nth-child(2)')->html();
        $pqDetailsHtml .= $pqSecondLine->find('td:nth-child(3)')->html();
        $profileDetails = explode('<br>', $pqDetailsHtml);
        foreach ($profileDetails as &$line) {
            $line = str_replace("\r\n", "", $line);
            $line = str_replace("\t", "", $line);
            $line = preg_replace('/([^<>]+?)：/', '<strong>$1：</strong>', trim($line), 1);
            $line = preg_replace_callback('/\(\s*<b>(在线|离线)<\/b>\s*\)/i',
                function ($matches) {
                    $isOnline = false;
                    if (trim($matches[1]) === '在线') $isOnline = true;
                    return sprintf('<span class="tag tag-%s">%s</span>', $isOnline ? 'success' : 'default', $isOnline ? '在线' : '离线');
                },
                $line
            );
        }

        $data = [
            'profileUid' => $profileUid,
            'profileUserName' => $profileUserName,
            'profileAvatar' => $profileAvatar,
            'profileDetails' => $profileDetails,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
