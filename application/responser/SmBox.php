<?php
namespace app\responser;

/**
 * 神秘盒子页面响应类
 * @package app\responser
 */
class SmBox extends Responser
{
    /**
     * 获取神秘盒子页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function index($extraData = [])
    {
        debug('begin');
        $doc = null;
        $initTime = 0;
        try {
            debug('initBegin');
            $document = $this->response['document'];
            $document = str_replace('--!>', '-->', $document);
            $doc = \phpQuery::newDocumentHTML($document);
            debug('initEnd');
            $initTime = debug('initBegin', 'initEnd');
        } catch (\Exception $ex) {
            $this->handleError($ex);
        }
        $commonData = array_merge($this->getCommonData($doc), $extraData);
        $matches = [];

        // 神秘盒子列表
        $smBoxList = [];
        for ($i = 0; $i < 400; $i++) {
            $smBoxList[$i] = 0;
        }
        foreach (pq('.box1 a') as $item) {
            $pqItem = pq($item);
            if (preg_match('/box=(\d+)/i', $pqItem->attr('href'), $matches)) {
                $box = intval($matches[1]);
                $smBoxList[$box - 1] = $box;
            }
        }

        // 中奖名单列表
        $winnerList = [];
        foreach (pq('.box2 > tr:gt(0)') as $item) {
            $pqItem = pq($item);
            $winningTime = '';
            $winner = '';
            $bonus = 0;
            $number = 0;
            $winningTime = trim_strip($pqItem->find('td:first-child')->text());
            $winner = trim_strip($pqItem->find('td:nth-child(2)')->text());
            $pqBonusCell = $pqItem->find('td:last-child');
            $bonus = intval($pqBonusCell->find('b:first')->text());
            if (preg_match('/\d+/', $pqBonusCell->find('font b')->text(), $matches)) {
                $number = intval($matches[0]);
            }
            $winnerList[] = [
                'winningTime' => $winningTime,
                'winner' => $winner,
                'bonus' => $bonus,
                'number' => $number,
            ];
        }

        $data = [
            'smBoxList' => $smBoxList,
            'winnerList' => $winnerList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
