<?php
namespace app\responser;

/**
 * 争夺页面响应类
 * @package app\responser
 */
class Loot extends Responser
{
    /**
     * 获取争夺排行页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function rank($extraData = [])
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

        // 排行列表
        $rankList = [];
        foreach (pq('.kf_fw_ig1 > tr:gt(1)') as $item) {
            $pqItem = pq($item);
            if ($pqItem->is(':empty')) continue;
            $no = trim($pqItem->find('td:first-child')->html());
            $userName = trim($pqItem->find('td:nth-child(2)')->html());
            $maxLevel = trim($pqItem->find('td:nth-child(3)')->html());
            $rankList[] = [
                'no' => $no,
                'userName' => $userName,
                'maxLevel' => $maxLevel,
            ];
        }

        $data = [
            'rankList' => $rankList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取争夺帮助说明页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function readme($extraData = [])
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

        // 帮助说明
        $readmeContent = trim(pq('.kf_fw_ig1 > tr > td')->html());
        $readmeContent = str_replace('相关详细说明<br>', '', $readmeContent);
        $readmeContent = preg_replace('/(技能说明|NPC属性)<br>/', '<br>$1<br>', $readmeContent);
        $readmeContent = preg_replace('/(装备属性|NPC属性|灵活和智力的抵消机制|技能说明|各道具效果)<br>/', '<h5>$1</h5>', $readmeContent);
        $readmeContent = preg_replace(
            '/(蕾米莉亚同人漫画|十六夜同人漫画|档案室钥匙|傲娇LOLI娇蛮音CD|消逝之药|整形优惠卷)<br>/',
            '<strong>$1</strong><br>',
            $readmeContent
        );

        $data = [
            'readmeContent' => $readmeContent,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
