<?php
namespace app\responser;

/**
 * 帮助页面响应类
 * @package app\responser
 */
class Faq extends Responser
{
    /**
     * 获取帮助页面的响应数据
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

        $pqArea = pq('.kf_share1 > tr:last-child');

        // 问题列表
        $questionList = [];
        foreach ($pqArea->find('> td:first-child > div > a') as $item) {
            $pqItem = pq($item);
            $id = 0;
            $title = '';
            if (preg_match('/id=(\d+)/i', $pqItem->attr('href'), $matches)) {
                $id = intval($matches[1]);
            }
            $title = trim_strip($pqItem->text());
            $questionList[] = ['id' => $id, 'title' => $title];
        }

        // 问题内容
        $pqContentCell = $pqArea->find('> td:last-child');
        $questionTitle = trim_strip($pqContentCell->find('> div:first-child')->text());
        $questionContent = replace_common_html_content($pqContentCell->find('> div:last-child')->html());
        $questionContent = str_replace('=======================================', '======================', $questionContent);

        $data = [
            'questionList' => $questionList,
            'questionTitle' => $questionTitle,
            'questionContent' => $questionContent,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
