<?php
namespace app\responser;

/**
 * 我的页面响应类
 * @package app\responser
 */
class Personal extends Responser
{
    /**
     * 获取我的回复页面的页面数据
     * @param array $extraData 额外参数
     * @return array 页面数据
     */
    public function reply($extraData = [])
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
        $totalPageNum = 1;
        $maxPageNum = 1;
        $pageParam = '';
        $pqPages = pq('.pages:first');
        if (preg_match('/-\s*(\d+)\s*-/', $pqPages->find('li > a[href="javascript:;"]')->text(), $matches)) {
            $currentPageNum = intval($matches[1]);
        }
        $pqEndPage = $pqPages->find('li:last-child > a');
        if (preg_match('/…(\d+)页/', $pqEndPage->text(), $matches)) {
            $totalPageNum = intval($matches[1]);
        }
        if (preg_match('/(?<!\w)page=(\d+)/', $pqEndPage->attr('href'), $matches)) {
            $maxPageNum = intval($matches[1]);
        }
        $pageParam = http_build_query($request->except('page'));

        // 主题列表
        $threadList = [];
        foreach (pq('div.t:last > table > tr.tr3') as $item) {
            $pqItem = pq($item);
            $tid = 0;
            $pid = 0;
            $threadTitle = '';
            $fid = 0;
            $threadForum = '';
            $authorUid = 0;
            $author = '';
            $replyTime = '';

            $pqThreadLink = $pqItem->find('> th > a.a2');
            if (preg_match('/tid=(\d+).+#(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
                $pid = intval($matches[2]);
            }
            $threadTitle = trim($pqThreadLink->html());
            $threadTitle = preg_replace('/<font color="([^"]+)">/i', '<span style="color: $1">', $threadTitle);
            $threadTitle = preg_replace('/<\/font>/i', '</span>', $threadTitle);

            $pqForumLink = $pqItem->find('> td:nth-child(3) > a');
            if (preg_match('/fid=(\d+)/i', $pqForumLink->attr('href'), $matches)) {
                $fid = intval($matches[1]);
            }
            $threadForum = trim_strip($pqForumLink->text());

            $pqAuthorLink = $pqItem->find('> td:nth-child(4) > a');
            if (preg_match('/uid=(\d+)/i', $pqAuthorLink->attr('href'), $matches)) {
                $authorUid = intval($matches[1]);
            }
            $author = trim_strip($pqAuthorLink->text());

            $replyTime = trim_strip($pqItem->find('> td:nth-child(5)')->text());

            $threadList[] = [
                'tid' => $tid,
                'pid' => $pid,
                'threadTitle' => $threadTitle,
                'fid' => $fid,
                'threadForum' => $threadForum,
                'authorUid' => $authorUid,
                'author' => $author,
                'replyTime' => $replyTime,
            ];
        }

        $data = [
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum < $maxPageNum ? $currentPageNum + 1 : $maxPageNum,
            'maxPageNum' => $maxPageNum,
            'pageParam' => $pageParam,
            'threadList' => $threadList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
