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

        // 发帖标题、关键词等
        $threadTitle = htmlspecialchars($pqForm->find('input[name="atc_title"]')->val());
        $gjc = trim_strip($pqForm->find('#diy_guanjianci')->val());
        $xinZuoStatus = $pqForm->find('input[name="diy_xinzuo"]')->attr('checked');
        if ($xinZuoStatus === null) $xinZuoStatus = 0;
        elseif ($xinZuoStatus === 'checked') $xinZuoStatus = 1;
        else $xinZuoStatus = -1;

        // 发帖内容
        $threadContent = ltrim(htmlspecialchars($pqForm->find('#textarea')->val()));
        $threadContent = str_replace('&amp;', '&', $threadContent);
        $threadContent = str_replace("\xC2\xA0", " ", $threadContent);
        if ($hiddenFields['action'] === 'quote' && preg_match('/\[quote\](.|\n)+?\[\/quote\]/', $threadContent, $matches)) {
            $quoteContent = $matches[0];
            $quoteContent = str_replace("\n\n", "\n", $quoteContent);
            $quoteContent = preg_replace('/\[attachment=\d+\]/', '[color=red][附件图片][/color]', $quoteContent);
            $quoteContent = preg_replace_callback(
                '/\[url=([^\]]+)\]/',
                function ($urlMatches) {
                    $urlMatches[1] = str_replace('&amp;', '&', $urlMatches[1]);
                    $domain = request()->domain();
                    $url = convert_url(str_replace($domain . '/', '/', $urlMatches[1]));
                    if ($url !== $urlMatches[1]) $url = $domain . $url;
                    return '[url=' . $url . ']';
                },
                $quoteContent
            );
            $quoteContent = $this->getRemoveUnpairedBBCodeQuoteContent($quoteContent);
            $threadContent = str_replace($matches[0], $quoteContent, $threadContent);
        }

        // 投票信息
        $vote = [];
        if (intval($hiddenFields['special']) === 1) {
            $vote['timeLimit'] = trim_strip($pqForm->find('input[name="timelimit"]')->val());
            $vote['hasClose'] = $pqForm->find('input[name="vote_close"]')->length > 0;
            $vote['isMultiple'] = $pqForm->find('input[name="multiplevote"]:checked')->length > 0;
            $vote['mostVotes'] = trim_strip($pqForm->find('input[name="mostvotes"]')->val());
            $vote['modifiable'] = $pqForm->find('input[name="modifiable"]:checked')->length > 0;
            $vote['previewable'] = $pqForm->find('input[name="previewable"]:checked')->length > 0;

            $vote['items'] = [];
            foreach ($pqForm->find('input[name^="vt_selarray"]') as $item) {
                $pqItem = pq($item);
                $name = $pqItem->attr('name');
                $value = trim_strip($pqItem->val());
                if (empty($value)) continue;
                $vote['items'][] = ['name' => $name, 'value' => $value];
            }
        }

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
        $latestFloorContent = '';
        $pqLatestFloorContent = pq('center:contains("主题回顾")')->next('table')->find('> tr > td');
        if ($pqLatestFloorContent->length > 0) {
            Read::handleFloorElements($pqLatestFloorContent);
            $latestFloorContent = replace_floor_content(replace_common_html_content(trim($pqLatestFloorContent->html())));
            $latestFloorContent = preg_replace('/^([^<>]+?):<br>/i', '<b>$1：</b><br>', $latestFloorContent);
        }

        $data = [
            'parentNavUrl' => $parentNavUrl,
            'parentNavName' => $parentNavName,
            'threadTypeList' => $threadTypeList,
            'threadTitle' => $threadTitle,
            'threadContent' => $threadContent,
            'gjc' => $gjc,
            'xinZuoStatus' => $xinZuoStatus,
            'vote' => $vote,
            'attachList' => $attachList,
            'latestFloorContent' => $latestFloorContent,
        ];
        $data = array_merge($hiddenFields, $data);
        debug('end');
        trace('phpQuery解析用时：' . debug('begin', 'end') . 's' . '（初始化：' . $initTime . 's）');
        if (config('app_debug')) trace('响应数据：' . json_encode($data, JSON_UNESCAPED_UNICODE));
        return array_merge($commonData, $data);
    }

    /**
     * 获取去除了不配对BBCode的引用内容
     * @param string $content 引用内容
     * @return string 去除了不配对BBCode的引用内容
     */
    protected function getRemoveUnpairedBBCodeQuoteContent($content)
    {
        $startCodeList = [
            '/\[color=.+?\]/', '/\[backcolor=.+?\]/', '/\[size=.+?\]/', '/\[font=.+?\]/', '/\[align=.+?\]/', '/\[b\]/', '/\[i\]/',
            '/\[u\]/', '/\[strike\]/', '/\[sup\]/', '/\[sub\]/'
        ];
        $endCodeList = [
            '/\[\/color\]/', '/\[\/backcolor\]/', '/\[\/size\]/', '/\[\/font\]/', '/\[\/align\]/', '/\[\/b\]/', '/\[\/i\]/',
            '/\[\/u\]/', '/\[\/strike\]/', '/\[\/sup\]/', '/\[\/sub\]/'
        ];
        for ($i = 0; $i < count($startCodeList); $i++) {
            $startMatchesNum = preg_match_all($startCodeList[$i], $content);
            $endMatchesNum = preg_match_all($endCodeList[$i], $content);
            if ($startMatchesNum !== $endMatchesNum) {
                $content = preg_replace($startCodeList[$i], '', $content);
                $content = preg_replace($endCodeList[$i], '', $content);
            }
        }
        return $content;
    }
}
