<?php
namespace app\responser;

/**
 * 自助评分页面响应类
 * @package app\responser
 */
class SelfRate extends Responser
{
    /**
     * 获取最近发布的分享帖页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
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
     * 获取待检查的评分记录页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
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

            $rateSize = 0;
            if (preg_match('/认定\[(\d+)\]MB/i', $pqItem->find('> td:nth-child(3)')->text(), $matches)) {
                $rateSize = intval($matches[1]);
            }
            $titleSize = 0;
            if (preg_match_all('/\D(\d+(?:\.\d+)?)(M|G)/i', $threadTitle, $matches, PREG_SET_ORDER)) {
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

            $pqTagCell = $pqItem->find('> td:nth-child(4)');
            $isNew = $pqTagCell->find('span:contains("新补")')->length > 0;
            $isSelfBuy = $pqTagCell->find('span:contains("自购")')->length > 0;

            $threadList[] = [
                'id' => $id,
                'tid' => $tid,
                'threadTitle' => $threadTitle,
                'remainingTime' => $remainingTime,
                'rateSize' => $rateSize,
                'titleSize' => $titleSize,
                'sizeStatus' => $sizeStatus,
                'sizeTips' => $sizeTips,
                'isNew' => $isNew,
                'isSelfBuy' => $isSelfBuy,
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
}
