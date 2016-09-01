<?php
namespace app\responser;

/**
 * 最新共享页面响应类
 * @package app\responser
 */
class Share extends Responser
{
    /**
     * 获取最新共享页面的页面数据
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

        // 共享列表
        $shareList = [];
        foreach (pq('.kf_share1:eq(1) > tr:gt(0)') as $item) {
            $pqItem = pq($item);
            $publishTime = trim($pqItem->find('td:first-child')->html());

            $pqType = $pqItem->find('td:nth-child(2)');
            $threadType = trim_strip($pqType->text());
            $threadTypeColor = $pqType->find('font')->attr('color');
            if (empty($threadTypeColor)) $threadTypeColor = '#000';

            $pqThreadLink = $pqItem->find('td:nth-child(3) > a');
            $tid = 0;
            $threadTitle = '';
            if (preg_match('/tid=(\d+)/i', $pqThreadLink->attr('href'), $matches)) {
                $tid = intval($matches[1]);
            }
            $threadTitle = trim($pqThreadLink->html());
            $threadTitle = str_replace('<font color="#009900">[新作]</font>', '<span class="tag tag-success">新作</span> ', $threadTitle);
            $threadTitle = str_replace('<font color="#ff0000">[推荐]</font>', '<span class="tag tag-danger">推荐</span> ', $threadTitle);

            $author = trim($pqItem->find('td:nth-child(4)')->html());
            $shareList[] = [
                'publishTime' => $publishTime,
                'threadType' => $threadType,
                'threadTypeColor' => $threadTypeColor,
                'tid' => $tid,
                'threadTitle' => $threadTitle,
                'author' => $author,
            ];
        }

        $data = [
            'shareList' => $shareList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
