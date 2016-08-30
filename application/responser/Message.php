<?php
namespace app\responser;

/**
 * 短消息页面响应类
 * @package app\responser
 */
class Message extends Responser
{
    /**
     * 获取短消息页面的页面数据
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
        $request = request();

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

        // 清空信箱验证code
        $clearMsgBoxVerifyCode = '';
        if (preg_match('/message\.php\?action=clear&ckcode=(\w+)\'\);/i', $this->response['document'], $matches)) {
            $clearMsgBoxVerifyCode = $matches[1];
        }

        // 信箱状态
        $msgBoxInfo = pq('form[name="del"]')->prev('div')->prev('div')->find('> table > tr:first-child > td')->html();
        $msgBoxInfo = str_replace('信箱状态：', '<b>信箱状态：</b>', $msgBoxInfo);

        // 短消息列表
        $messageList = [];
        foreach (pq('.thread1 > tr:gt(0):not(:last)') as $item) {
            $pqItem = pq($item);
            $no = trim_strip($pqItem->find('td:first-child')->text());

            $pqMsgLink = $pqItem->find('td:nth-child(2) > a');
            $mid = 0;
            if (preg_match('/mid=(\d+)/i', $pqMsgLink->attr('href'), $matches)) {
                $mid = intval($matches[1]);
            }
            $msgTitle = trim_strip($pqMsgLink->text());

            $pqSendUserLink = $pqItem->find('td:nth-child(3) > a');
            $sendUid = 0;
            if (preg_match('/uid=(\d+)/i', $pqSendUserLink->attr('href'), $matches)) {
                $sendUid = intval($matches[1]);
            }
            $sendUserName = trim_strip($pqSendUserLink->text());

            $pqReceiveUserLink = $pqItem->find('td:nth-child(4) > a');
            $receiveUid = 0;
            if (preg_match('/uid=(\d+)/i', $pqReceiveUserLink->attr('href'), $matches)) {
                $receiveUid = intval($matches[1]);
            }
            $receiveUserName = trim_strip($pqReceiveUserLink->text());

            $sendTime = trim_strip($pqItem->find('td:nth-child(5)')->text());

            $unRead = false;
            $canSelect = false;
            $canEdit = false;
            if ($extraData['action'] === 'receivebox' || $extraData['action'] === 'scout') {
                $unRead = trim($pqItem->find('td:nth-child(6)')->text()) === '否';
            }
            $canSelect = $pqItem->find(
                    sprintf('td:nth-child(%d) > input[type="checkbox"]', $extraData['action'] === 'sendbox' ? 6 : 7)
                )->length > 0;
            if ($extraData['action'] === 'scout') {
                $canEdit = $pqItem->find('td:nth-child(8) > a[href*="edmid"]')->length > 0;
            }

            $messageList[] = [
                'no' => $no,
                'mid' => $mid,
                'msgTitle' => $msgTitle,
                'sendUid' => $sendUid,
                'sendUserName' => $sendUserName,
                'receiveUid' => $receiveUid,
                'receiveUserName' => $receiveUserName,
                'sendTime' => $sendTime,
                'unRead' => $unRead,
                'canSelect' => $canSelect,
                'canEdit' => $canEdit,
            ];
        }

        $data = [
            'action' => $extraData['action'],
            'currentPageNum' => $currentPageNum,
            'prevPageNum' => $currentPageNum > 1 ? $currentPageNum - 1 : 1,
            'nextPageNum' => $currentPageNum < $maxPageNum ? $currentPageNum + 1 : $maxPageNum,
            'maxPageNum' => $maxPageNum,
            'pageParam' => $pageParam,
            'clearMsgBoxVerifyCode' => $clearMsgBoxVerifyCode,
            'msgBoxInfo' => $msgBoxInfo,
            'messageList' => $messageList,
        ];
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
