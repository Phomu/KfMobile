<?php
namespace app\responser;

/**
 * 等级经验页面响应类
 * @package app\responser
 */
class GrowUp extends Responser
{
    /**
     * 获取等级经验页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
     */
    public function index($extraData = [])
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

        $pqArea = pq('#alldiv > table:first > tr:first-child > td:nth-child(2) > div:first');

        // 等级经验
        $expInfo = '';
        $expPercent = 0;
        $expRemain = 0;
        $expInfo = $pqArea->find('div:first')->html();
        $expInfo = preg_replace('/神秘系数\s*(\d+)\s*\|\s*/', '神秘系数 [ <b>$1</b> ]<br>', $expInfo);
        $pgExpProgress = $pqArea->find('> div:eq(1) > div:first');
        if (preg_match('/(\d+)成长/', $pgExpProgress->find('> div:first > span')->text(), $matches)) {
            $expRemain = intval($matches[1]);
        }
        if (preg_match('/(\d+)%/', $pgExpProgress->find('> div:last > span')->text(), $matches)) {
            $expPercent = intval($matches[1]);
        }

        // 任务、捐款
        $pqOtherArea = $pqArea->find('> div:nth-child(3) > table > tr');
        $jobList = [];
        foreach ($pqOtherArea->find('> td:first > div:first > div:not(:last)') as $job) {
            $pqJob = pq($job);
            $jobName = $pqJob->find('> div:last')->html();
            $jobExp = trim_strip($pqJob->find('> div:first')->text());
            $jobExp = preg_replace_callback(
                '/\((未获得|已获得)\)/',
                function ($matches) {
                    if ($matches[1] === '已获得') return ' <span class="tag tag-success">已获得</span>';
                    else  return ' <span class="tag tag-default">未获得</span>';
                },
                $jobExp
            );
            $jobList[] = ['name' => $jobName, 'exp' => $jobExp];
        }
        $isVip = $pqOtherArea->find('> td:nth-child(2) > div > div:eq(1) > div:first > div:eq(1) > span:contains("Yes")')->length > 0;
        $hasDonation = strpos($pqOtherArea->find('form[name="rvrc1"]')->html(), '今天已经捐款') > 0;

        // 自定义ID颜色
        $colorList = [];
        foreach ($pqArea->next()->next()->find('> table > tr:gt(0) > td') as $node) {
            $pqNode = pq($node);
            $color = '';
            $colorId = 0;
            $colorLevel = 0;
            if (preg_match('/background-color:([#\w]+);/', $pqNode->attr('style'), $matches)) {
                $color = $matches[1];
            }
            if (preg_match('/color=(\d+)/', $pqNode->find('a')->attr('href'), $matches)) {
                $colorId = intval($matches[1]);
            } else if (preg_match('/需(\d+)神秘等级/', $pqNode->find('span')->text(), $matches)) {
                $colorLevel = intval($matches[1]);
            }
            $colorList[] = ['color' => $color, 'id' => $colorId, 'level' => $colorLevel];
        }

        $data = [
            'expInfo' => $expInfo,
            'expPercent' => $expPercent,
            'expRemain' => $expRemain,
            'jobList' => $jobList,
            'isVip' => $isVip,
            'hasDonation' => $hasDonation,
            'colorList' => $colorList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
