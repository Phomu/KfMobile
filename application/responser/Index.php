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
        $kfb = 0;
        $gongXian = 0;
        if (preg_match('/(-?\d+)KFB\s*\|\s*(-?\d+(?:\.\d+)?)贡献/', pq('a.rightbox1[title="网站虚拟货币"]')->text(), $matches)) {
            $kfb = intval($matches[1]);
            $gongXian = floatval($matches[2]);
        }
        $pqSmArea = pq('a.rightbox1[href="kf_growup.php"]');
        $smLevel = 0;
        $smRank = '';
        if (preg_match('/神秘(-?\d+)级\s*\(系数排名第\s*(\d+\+?)\s*位\)/', $pqSmArea->text(), $matches)) {
            $smLevel = intval($matches[1]);
            $smRank = $matches[2];
        }
        $smTips = $pqSmArea->attr('title');

        // 最新回复帖子
        $galgameNewReplyList = [];
        $resourceNewReplyList = [];
        $otherNewReplyList = [];
        $pqNewReplyList = pq('li.b_tit4 > a');
        foreach ($pqNewReplyList as $i => $link) {
            $pqLink = pq($link);
            $threadUrl = convert_url($pqLink->attr('href'));
            $title = '';
            $author = '';
            if (preg_match('/^《(.+)》by：(.+)$/', trim_strip($pqLink->attr('title')), $matches)) {
                $title = $matches[1];
                $author = $matches[2];
            }
            $linkData = ['threadUrl' => $threadUrl, 'title' => $title, 'author' => $author];
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
            $threadUrl = convert_url($pqLink->attr('href'));
            $title = '';
            $author = '';
            if (preg_match('/^《(.+)》by：(.+)$/', trim_strip($pqLink->attr('title')), $matches)) {
                $title = $matches[1];
                $author = $matches[2];
            }
            $linkData = ['threadUrl' => $threadUrl, 'title' => $title, 'author' => $author];
            if ($i >= 24) $newPublishList[] = $linkData;
            elseif ($i >= 16) $otherTopRecommendList[] = $linkData;
            elseif ($i >= 8) $resourceTopRecommendList[] = $linkData;
            else $galgameTopRecommendList[] = $linkData;
        }

        $data = [
            'kfb' => $kfb,
            'gongXian' => $gongXian,
            'smLevel' => $smLevel,
            'smRank' => $smRank,
            'smTips' => $smTips,
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
