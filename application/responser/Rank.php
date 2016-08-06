<?php
namespace app\responser;

/**
 * 论坛排行页面响应类
 * @package app\responser
 */
class Rank extends Responser
{
    /**
     * 获取论坛排行页面的页面数据
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

        // 我的神秘系数排名
        $myRank = '';
        if (preg_match('/第\s*(.+?)\s*位/', pq('.kf_no11:first > tr > td > div > span')->text(), $matches)) {
            $myRank = trim_strip($matches[1]);
        }

        // 排行列表
        $rankList = [];
        foreach (pq('.kf_no11:eq(2) > tr:gt(0)') as $item) {
            $pqItem = pq($item);
            $no = trim($pqItem->find('td:first-child')->html());
            $userName = trim($pqItem->find('td:nth-child(2)')->html());
            $smLevel = trim($pqItem->find('td:nth-child(3)')->html());
            $exp = trim($pqItem->find('td:nth-child(4)')->html());
            $followNum = trim($pqItem->find('td:nth-child(5)')->html());
            $postNum = trim($pqItem->find('td:nth-child(6)')->html());
            $contribution = trim($pqItem->find('td:nth-child(7)')->html());
            $rankList[] = [
                'no' => $no,
                'userName' => $userName,
                'smLevel' => $smLevel,
                'exp' => $exp,
                'followNum' => $followNum,
                'postNum' => $postNum,
                'contribution' => $contribution,
            ];
        }

        $data = [
            'myRank' => $myRank,
            'type' => $extraData['type'],
            'rankList' => $rankList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
