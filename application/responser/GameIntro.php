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

    /**
     * 获取游戏搜索页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
     */
    public function search($extraData = [])
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

        $pqArea = pq('#div740_2 > div:nth-child(2)');
        // 搜索关键字、搜索类型
        $keyword = '';
        $searchType = 'game';
        if (preg_match('/您搜索的类型为 “(.+?)” ，关键字为 “(.*?)”/', $pqArea->text(), $matches)) {
            $searchType = trim_strip($matches[1]);
            switch ($searchType) {
                case '会社':
                    $searchType = 'inc';
                    break;
                case '人名':
                    $searchType = 'cv';
                    break;
                default:
                    $searchType = 'game';
            }
            $keyword = trim_strip($matches[2]);
        }

        // 分页导航
        $currentPageNum = 1;
        $maxPageNum = 1;
        $pageParam = '';
        $pqPages = pq('.pages:first');
        if (preg_match('/-\s*(\d+)\s*-/', $pqPages->find('li > a[href="javascript:;"]')->text(), $matches)) {
            $currentPageNum = intval($matches[1]);
        }
        $pqEndPage = $pqPages->find('li:last-child > a');
        if (preg_match('/(?<!\w)page=(\d+)/', $pqEndPage->attr('href'), $matches)) {
            $maxPageNum = intval($matches[1]);
        }
        $pageParam = http_build_query($request->except('page'));

        // 游戏列表
        $gameList = [];
        foreach ($pqArea->find('> table > tr') as $item) {
            $pqItem = pq($item);
            $img = $pqItem->find('> td:first-child > a > img')->attr('src');

            $id = 0;
            $gameName = '';
            $aliasName = '';
            $inc = '';
            $sellTime = '';
            $gameType = '';
            $property = '';
            $pqLinkCell = $pqItem->find('> td:last-child');
            $pqLink = $pqLinkCell->find('> b > a');
            if (preg_match('/id=(\d+)/i', $pqLink->attr('href'), $matches)) {
                $id = intval($matches[1]);
            }
            $gameName = trim_strip($pqLink->text());
            if (preg_match('/别名：(.*?)<br><br>会社：(.*?)发售时间:(.+?)<br><br>类型：(.*?)属性：(.*)/', $pqLinkCell->html(), $matches)) {
                $aliasName = trim($matches[1]);
                $inc = trim($matches[2]);
                $sellTime = trim($matches[3]);
                $gameType = trim($matches[4]);
                $property = trim($matches[5]);
            }

            $gameList[] = [
                'img' => $img,
                'id' => $id,
                'gameName' => $gameName,
                'aliasName' => $aliasName,
                'inc' => $inc,
                'sellTime' => $sellTime,
                'type' => $gameType,
                'property' => $property,
            ];
        }

        $data = [
            'keyword' => $keyword,
            'searchType' => $searchType,
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum < $maxPageNum ? $currentPageNum + 1 : $maxPageNum,
            'maxPageNum' => $maxPageNum,
            'pageParam' => $pageParam,
            'gameList' => $gameList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
