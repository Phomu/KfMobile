<?php
namespace app\responser;

/**
 * 发表帖子页面响应类
 * @package app\responser
 */
class Post extends Responser
{
    /**
     * 获取发表帖子页面的页面数据
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

        // 导航
        $pqForm = pq('form[name="FORM"]');
        $pqParentNav = $pqForm->find('> .thread1 > tr:first-child > td a:last');
        $parentNavName = trim_strip($pqParentNav->text());
        $parentNavUrl = '';
        if (preg_match('/(fid|tid)=(\d+)/i', $pqParentNav->attr('href'), $matches)) {
            if ($matches[1] === 'fid') $parentNavUrl = url('Thread/index', 'fid=' . $matches[2]);
            else $parentNavUrl = url('Read/index', 'tid=' . $matches[2]);
        }

        // 发帖表单隐藏字段
        $hiddenFields = [];
        foreach ($pqForm->find('input[type="hidden"]') as $item) {
            $pqItem = pq($item);
            $name = $pqItem->attr('name');
            if (empty($name)) continue;
            $hiddenFields[$name] = trim_strip($pqItem->val());
        }

        // 主题类型列表
        $threadTypeList = [];
        foreach ($pqForm->find('select[name="p_type"]')->find('option') as $item) {
            $pqItem = pq($item);
            $name = trim_strip($pqItem->text());
            $value = trim_strip($pqItem->val());
            $selected = $pqItem->attr('selected') === 'selected';
            $threadTypeList[] = ['name' => $name, 'value' => $value, 'selected' => $selected];
        }

        // 发帖标题、内容、关键词等
        $threadTitle = trim_strip($pqForm->find('input[name="atc_title"]')->val());
        $threadContent = trim_strip($pqForm->find('#textarea')->val());
        $threadContent = str_replace("\xC2\xA0", " ", $threadContent);
        $gjc = trim_strip($pqForm->find('#diy_guanjianci')->val());
        $xinZuoStatus = $pqForm->find('input[name="diy_xinzuo"]')->attr('checked');
        if ($xinZuoStatus === null) $xinZuoStatus = 0;
        elseif ($xinZuoStatus === 'checked') $xinZuoStatus = 1;
        else $xinZuoStatus = -1;

        // 附件列表
        $attachList = [];
        foreach ($pqForm->find('div[id^="att_"]') as $item) {
            $pqItem = pq($item);

            $attachId = intval($pqItem->find('input[name="keep[]"]')->val());
            if (empty($attachId)) continue;
            $attachRequire = trim_strip($pqItem->find('input[name^="downrvrc"]')->val());
            $attachDescription = trim_strip($pqItem->find('input[name^="attdesc"]')->val());

            $pqAttachInfo = $pqItem->find('#attach_' . $attachId);
            $attachName = trim_strip($pqAttachInfo->find('b')->text());
            $pqAttachInfoContents = $pqAttachInfo->contents();
            $attachSize = 0;
            if (preg_match('/\((\d+)K\)/i', $pqAttachInfoContents->get($pqAttachInfoContents->length - 1)->textContent, $matches)) {
                $attachSize = intval($matches[1]);
            }

            $attachList[] = [
                'id' => $attachId,
                'require' => $attachRequire,
                'description' => $attachDescription,
                'name' => $attachName,
                'size' => $attachSize,
            ];
        }

        // 主题回顾
        $latestFloorContent = trim(pq('center:contains("主题回顾")')->next('table')->find('> tr > td')->html());

        $data = [
            'parentNavUrl' => $parentNavUrl,
            'parentNavName' => $parentNavName,
            'threadTypeList' => $threadTypeList,
            'threadTitle' => $threadTitle,
            'threadContent' => $threadContent,
            'gjc' => $gjc,
            'xinZuoStatus' => $xinZuoStatus,
            'attachList' => $attachList,
            'latestFloorContent' => $latestFloorContent,
        ];
        $data = array_merge($hiddenFields, $data);
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }
}
