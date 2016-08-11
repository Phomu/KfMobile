<?php
namespace app\responser;

/**
 * 游戏介绍页面响应类
 * @package app\responser
 */
class GameIntro extends Responser
{
    /**
     * 获取游戏介绍首页的页面数据
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

        // 游戏介绍链接列表
        $moonGameAttentionRankList = [];
        $nextMoonGameAttentionRankList = [];
        $latestGameIntroList = [];
        $allGameAttentionRankList = [];
        foreach (pq('#intro_index_field1:lt(4)') as $i => $area) {
            $pqArea = pq($area);
            if ($i === 0) $list = &$moonGameAttentionRankList;
            elseif ($i === 1) $list = &$nextMoonGameAttentionRankList;
            elseif ($i === 2) $list = &$latestGameIntroList;
            else $list = &$allGameAttentionRankList;

            foreach ($pqArea->find('> div > a') as $item) {
                $pqItem = pq($item);
                $id = 0;
                $title = '';
                if (preg_match('/id=(\d+)/i', $pqItem->attr('href'), $matches)) {
                    $id = intval($matches[1]);
                }
                $title = trim_strip($pqItem->text());
                $list[] = ['id' => $id, 'title' => $title];
            }
        }

        $data = [
            'moonGameAttentionRankList' => $moonGameAttentionRankList,
            'nextMoonGameAttentionRankList' => $nextMoonGameAttentionRankList,
            'latestGameIntroList' => $latestGameIntroList,
            'allGameAttentionRankList' => $allGameAttentionRankList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
