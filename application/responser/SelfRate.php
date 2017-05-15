<?php

namespace app\responser;

/**
 * 自助评分页面响应类
 * @package app\responser
 */
class SelfRate extends Responser
{
    /**
     * 获取最近发布的分享帖页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function latest($extraData = [])
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
        $request = request();

        // 分页导航
        $currentPageNum = 1;
        $pageParam = '';
        $pqPages = pq('.adp1:last > tr:nth-child(2) > td:nth-child(2)');
        if (preg_match('/当前第\s*(\d+)\s*页/', $pqPages->html(), $matches)) {
            $currentPageNum = intval($matches[1]);
        }
        $pageParam = http_build_query($request->except('page'));

        // 主题列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(1):not(:last)') as $item) {
            $pqItem = pq($item);
            $publishTime = trim_strip($pqItem->find('> td:first-child')->text());
            $pqThreadLink = $pqItem->find('> td:nth-child(2) > a');
            $tid = 0;
            if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
            }
            $threadTitle = trim_strip($pqThreadLink->text());
            $status = trim_strip($pqItem->find('> td:nth-child(3)')->text());
            $threadList[] = [
                'tid' => $tid,
                'threadTitle' => $threadTitle,
                'publishTime' => $publishTime,
                'status' => $status,
            ];
        }

        $data = [
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum + 1,
            'pageParam' => $pageParam,
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取待检查的评分记录页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function waitCheck($extraData = [])
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

        // 主题列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(0)') as $item) {
            $pqItem = pq($item);

            $remainingTime = trim_strip($pqItem->find('> td:first-child')->text());

            $pqThreadCell = $pqItem->find('> td:nth-child(2)');
            $pqThreadLink = $pqThreadCell->find('a:first');
            $tid = 0;
            if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
            }
            $threadTitle = trim_strip($pqThreadLink->text());

            $id = 0;
            if (preg_match('/(?<!\w)id=(\d+)/i', $pqThreadCell->find('a:last')->attr('href'), $matches)) {
                $id = intval($matches[1]);
            }

            $pqTagCell = $pqItem->find('> td:nth-child(4)');
            $isNew = $pqTagCell->find('span:contains("新补")')->length > 0;
            $isSelfBuy = $pqTagCell->find('span:contains("自购")')->length > 0;

            $threadList[] = array_merge(
                [
                    'id' => $id,
                    'tid' => $tid,
                    'threadTitle' => $threadTitle,
                    'remainingTime' => $remainingTime,
                    'isNew' => $isNew,
                    'isSelfBuy' => $isSelfBuy,
                ],
                $this->getRateSizeStatusData($pqItem->find('> td:nth-child(3)')->text(), $threadTitle)
            );
        }

        $data = [
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取关于我的评分记录页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function my($extraData = [])
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

        // 主题列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(0)') as $item) {
            $pqItem = pq($item);

            $rateTime = trim_strip($pqItem->find('> td:first-child')->text());

            $pqRateCell = $pqItem->find('> td:nth-child(2)');
            $pqThreadLink = $pqRateCell->find('a');
            $tid = 0;
            if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
            }
            $pqThreadLink->attr('href', url('Read/index?tid=' . $tid))->addClass('thread-link d-inline font-size-base');
            $rateInfo = trim($pqRateCell->html());
            $rateInfo = preg_replace('/\[(<a.+?<\/a>)\]/i', ' $1 ', $rateInfo);

            $kfb = 0;
            if (preg_match('/\+\[(\d+)\]KFB/i', $pqItem->find('> td:nth-child(3)')->text(), $matches)) {
                $kfb = intval($matches[1]);
            }
            $gongXian = 0;
            if (preg_match('/\+\[([\d\.]+)\]贡献/i', $pqItem->find('> td:nth-child(4)')->text(), $matches)) {
                $gongXian = floatval($matches[1]);
            }

            $threadList[] = [
                'rateInfo' => $rateInfo,
                'rateTime' => $rateTime,
                'kfb' => $kfb,
                'gongXian' => $gongXian,
            ];
        }

        $data = [
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取已完成的评分记录页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function complete($extraData = [])
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
        $request = request();

        // 分页导航
        $currentPageNum = 1;
        $pageParam = '';
        $pqPages = pq('.adp1:last > tr:nth-child(2) > td:nth-child(2)');
        if (preg_match('/当前第\s*(\d+)\s*页/', $pqPages->html(), $matches)) {
            $currentPageNum = intval($matches[1]);
        }
        $pageParam = http_build_query($request->except('page'));

        // 主题列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(1):not(:last)') as $item) {
            $pqItem = pq($item);

            $rateTime = trim_strip($pqItem->find('> td:first-child')->text());

            $pqThreadCell = $pqItem->find('> td:nth-child(2)');
            $pqThreadLink = $pqThreadCell->find('a:first');
            $tid = 0;
            if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
            }
            $threadTitle = trim_strip($pqThreadLink->text());

            $id = 0;
            if (preg_match('/(?<!\w)id=(\d+)/i', $pqThreadCell->find('a:last')->attr('href'), $matches)) {
                $id = intval($matches[1]);
            }

            $pqTagCell = $pqItem->find('> td:nth-child(4)');
            $isNew = $pqTagCell->find('span:contains("新补")')->length > 0;
            $isSelfBuy = $pqTagCell->find('span:contains("自购")')->length > 0;

            $threadList[] = array_merge(
                [
                    'id' => $id,
                    'tid' => $tid,
                    'threadTitle' => $threadTitle,
                    'rateTime' => $rateTime,
                    'isNew' => $isNew,
                    'isSelfBuy' => $isSelfBuy,
                ],
                $this->getRateSizeStatusData($pqItem->find('> td:nth-child(3)')->text(), $threadTitle)
            );
        }

        $data = [
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum + 1,
            'pageParam' => $pageParam,
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取自助评分奖励页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function rating($extraData = [])
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

        // 自助评分奖励信息
        $pqArea = pq('.adp1');
        $pqThreadLink = $pqArea->find('tr:eq(2) > td:last-child > a');
        $tid = 0;
        if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
            $tid = intval($matches[1]);
        }
        $threadTitle = trim_strip($pqThreadLink->text());
        $forumName = trim_strip($pqArea->find('tr:eq(3) > td:last-child')->text());

        $data = [
            'tid' => $tid,
            'threadTitle' => $threadTitle,
            'forumName' => $forumName,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取自助评分检查页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function check($extraData = [])
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

        // 自助评分奖励信息
        $pqArea = pq('.adp1');
        $id = intval($pqArea->find('input[name="pfid"]')->val());
        $pqThreadLink = $pqArea->find('tr:eq(2) > td:last-child > a');
        $tid = 0;
        if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
            $tid = intval($matches[1]);
        }
        $threadTitle = trim_strip($pqThreadLink->text());
        $rateUserName = trim_strip($pqArea->find('tr:eq(3) > td:last-child')->text());
        $rateSize = 0;
        if (preg_match('/(\d+)\s*MB/i', $pqArea->find('tr:eq(4) > td:last-child')->html(), $matches)) {
            $rateSize = intval($matches[1]);
        }
        $isNew = strpos(trim($pqArea->find('tr:eq(5) > td:last-child')->html()), '是') === 0;
        $isSelfBuy = strpos(trim($pqArea->find('tr:eq(6) > td:last-child')->html()), '是') === 0;
        $isFake = strpos(trim($pqArea->find('tr:eq(7) > td:last-child')->html()), '是') === 0;
        $rateMsg = trim($pqArea->find('tr:eq(8) > td:last-child')->html());
        $rateMsg = trim(preg_replace('/<span style="color:#ff0000;">.+?<\/span>/i', '', $rateMsg));
        if ($rateMsg === '0') $rateMsg = '';

        $data = [
            'id' => $id,
            'tid' => $tid,
            'threadTitle' => $threadTitle,
            'rateUserName' => $rateUserName,
            'rateSize' => $rateSize,
            'isNew' => $isNew,
            'isSelfBuy' => $isSelfBuy,
            'isFake' => $isFake,
            'rateMsg' => $rateMsg,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取自助评分文件大小状态数据
     * @param string $rateSizeText 认定评分文本
     * @param string $threadTitle 帖子标题
     * @return array 自助评分文件大小状态信息
     */
    protected function getRateSizeStatusData($rateSizeText, $threadTitle)
    {
        $rateSize = 0;
        if (preg_match('/认定\[(\d+)\]MB/i', $rateSizeText, $matches)) {
            $rateSize = intval($matches[1]);
        }
        $titleSize = 0;
        if (preg_match_all('/\D(\d+(?:\.\d+)?)\s?(M|G)/i', $threadTitle, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $sizeMatches) {
                $size = floatval($sizeMatches[1]);
                if (strtoupper($sizeMatches[2]) === 'G') $size *= 1024;
                $titleSize += $size;
            }
        }

        $ratingErrorSizePercent = 3; // 自助评分错标范围百分比
        $sizeStatus = 0;
        $sizeTips = '认定文件体积';
        if (!$titleSize || !$rateSize) {
            $sizeStatus = -1;
            $sizeTips = '标题文件大小无法解析';
        } elseif ($titleSize > $rateSize * (100 + $ratingErrorSizePercent) / 100 + 1 ||
            $titleSize < $rateSize * (100 - $ratingErrorSizePercent) / 100 - 1
        ) {
            $sizeStatus = 1;
            $sizeTips = sprintf('标题文件大小（%sM）与认定文件大小（%sM）不一致', number_format($titleSize), number_format($rateSize));
        }

        return [
            'rateSize' => $rateSize,
            'titleSize' => $titleSize,
            'sizeStatus' => $sizeStatus,
            'sizeTips' => $sizeTips,
        ];
    }

    /**
     * 获取待检查的优秀帖页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function waitCheckGoodPost($extraData = [])
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

        // 优秀帖列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(0)') as $item) {
            $pqItem = pq($item);

            $submitTime = trim_strip($pqItem->find('> td:first-child')->text());

            $pqThreadCell = $pqItem->find('> td:nth-child(2)');
            $pqThreadLink = $pqThreadCell->find('a:first');
            $type = '';
            if (preg_match('/^\[([^\]]+)\]/', trim($pqThreadCell->text()), $matches)) {
                $type = $matches[1];
            }
            $threadUrl = convert_url($pqThreadLink->attr('href'));
            $threadTitle = trim_strip($pqThreadLink->text());

            $uid = intval($pqItem->find('> td:nth-child(4)')->text());

            $threadList[] = [
                'type' => $type,
                'threadUrl' => $threadUrl,
                'threadTitle' => $threadTitle,
                'submitTime' => $submitTime,
                'uid' => $uid,
            ];
        }

        $data = [
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取已完成的优秀帖页面的响应数据
     * @param array $extraData 额外参数
     * @return array 响应数据
     */
    public function completeGoodPost($extraData = [])
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
        $request = request();

        // 分页导航
        $currentPageNum = 1;
        $pageParam = '';
        $pqPages = pq('.adp1:last > tr:nth-child(2) > td:nth-child(2)');
        if (preg_match('/当前第\s*(\d+)\s*页/', $pqPages->html(), $matches)) {
            $currentPageNum = intval($matches[1]);
        }
        $pageParam = http_build_query($request->except('page'));

        // 主题列表
        $threadList = [];
        foreach (pq('.adp1:last > tr:gt(1):not(:last)') as $item) {
            $pqItem = pq($item);

            $submitTime = trim_strip($pqItem->find('> td:first-child')->text());

            $pqThreadCell = $pqItem->find('> td:nth-child(2)');
            $pqThreadLink = $pqThreadCell->find('a:first');
            $type = '';
            if (preg_match('/^\[([^\]]+)\]/', trim($pqThreadCell->text()), $matches)) {
                $type = $matches[1];
            }
            $threadUrl = convert_url($pqThreadLink->attr('href'));
            $threadTitle = trim_strip($pqThreadLink->text());

            $fid = 0;
            if (preg_match('/\[(\d+)\]板块/', $pqItem->find('> td:nth-child(4)')->text(), $matches)) {
                $fid = intval($matches[1]);
            }

            $threadList[] = array_merge(
                [
                    'type' => $type,
                    'threadUrl' => $threadUrl,
                    'threadTitle' => $threadTitle,
                    'submitTime' => $submitTime,
                    'fid' => $fid,
                ],
                $this->getRateSizeStatusData($pqItem->find('> td:nth-child(3)')->text(), $threadTitle)
            );
        }

        $data = [
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum + 1,
            'pageParam' => $pageParam,
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
