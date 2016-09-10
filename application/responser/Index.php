<?php
namespace app\responser;

/**
 * 首页响应类
 * @package app\responser
 */
class Index extends Responser
{
    /**
     * 获取首页的响应数据
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
            $doc = \phpQuery::newDocumentHTML($this->response['document']);
            debug('initEnd');
            $initTime = debug('initBegin', 'initEnd');
        } catch (\Exception $ex) {
            $this->handleError($ex);
        }
        $commonData = array_merge($this->getCommonData($doc), $extraData);
        $matches = [];

        // 功能区
        $atTipsTime = '';
        if (preg_match('/\d+日\d+时\d+分/', pq('a[href^="guanjianci.php?gjc="]')->text(), $matches)) {
            $atTipsTime = $matches[0];
        }
        $kfb = 0;
        if (preg_match('/拥有(-?\d+)KFB/i', pq('a[href="kf_givemekfb.php"]')->text(), $matches)) {
            $kfb = intval($matches[1]);
        }
        $smLevel = 0;
        $smRank = '';
        if (preg_match('/神秘(-?\d+)级\s*\(系数排名第\s*(\d+\+?)\s*位\)/', pq('a[href="kf_growup.php"]')->text(), $matches)) {
            $smLevel = intval($matches[1]);
            $smRank = $matches[2];
        }
        $hasRatingBonus = pq('a[href^="kf_fw_1wkfb.php?ping=3"]')->length > 0;

        // 最新回复帖子
        $galgameNewReplyList = [];
        $resourceNewReplyList = [];
        $otherNewReplyList = [];
        $pqNewReplyList = pq('li.b_tit4 > a');
        foreach ($pqNewReplyList as $i => $link) {
            $pqLink = pq($link);
            $tid = preg_match('/tid=(\d+)/', $pqLink->attr('href'), $matches) ? intval($matches[1]) : 0;
            $title = '';
            $author = '';
            if (preg_match('/^《(.+)》by：(.+)$/', trim_strip($pqLink->attr('title')), $matches)) {
                $title = $matches[1];
                $author = $matches[2];
            }
            $linkData = ['tid' => $tid, 'title' => $title, 'author' => $author];
            if ($i >= 20) $otherNewReplyList[] = $linkData;
            elseif ($i >= 10) $resourceNewReplyList[] = $linkData;
            else $galgameNewReplyList[] = $linkData;
        }

        // 当前推荐帖子 & 最新发表帖子
        $galgameTopRecommendList = [];
        $resourceTopRecommendList = [];
        $otherTopRecommendList = [];
        $newPublishList = [];
        $pqNewReplyList = pq('li.b_tit4_1 > a');
        foreach ($pqNewReplyList as $i => $link) {
            $pqLink = pq($link);
            $tid = preg_match('/tid=(\d+)/', $pqLink->attr('href'), $matches) ? intval($matches[1]) : 0;
            $title = '';
            $author = '';
            if (preg_match('/^《(.+)》by：(.+)$/', trim_strip($pqLink->attr('title')), $matches)) {
                $title = $matches[1];
                $author = $matches[2];
            }
            $linkData = ['tid' => $tid, 'title' => $title, 'author' => $author];
            if ($i >= 24) $newPublishList[] = $linkData;
            elseif ($i >= 16) $otherTopRecommendList[] = $linkData;
            elseif ($i >= 8) $resourceTopRecommendList[] = $linkData;
            else $galgameTopRecommendList[] = $linkData;
        }

        $data = [
            'atTipsTime' => $atTipsTime,
            'kfb' => $kfb,
            'smLevel' => $smLevel,
            'smRank' => $smRank,
            'hasRatingBonus' => $hasRatingBonus,
            'galgameNewReplyList' => $galgameNewReplyList,
            'resourceNewReplyList' => $resourceNewReplyList,
            'otherNewReplyList' => $otherNewReplyList,
            'galgameTopRecommendList' => $galgameTopRecommendList,
            'resourceTopRecommendList' => $resourceTopRecommendList,
            'otherTopRecommendList' => $otherTopRecommendList,
            'newPublishList' => $newPublishList,
            'pcVersionUrl' => $commonData['pcVersionUrl'] . '?nomible=1',
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
