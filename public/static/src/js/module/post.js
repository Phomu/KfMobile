'use strict';
import * as Util from './util';

/**
 * 处理编辑器按钮
 */
export const handleEditorBtns = function () {
    let textArea = $('#postContent').get(0);

    // 编辑器按钮
    $(document).on('click', '.editor-btn-group button[data-action]', function () {
        let action = $(this).data('action');
        let value = '';
        let matches = null;
        switch (action) {
            case 'link':
                value = prompt('请输入链接URL：', 'http://');
                break;
            case 'img':
                value = prompt('请输入图片URL：', 'http://');
                break;
            case 'sell':
                value = prompt('请输入出售金额：', 1);
                break;
            case 'hide':
                value = prompt('请输入神秘等级：', 1);
                break;
            case 'audio':
                value = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）', 'http://');
                matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(value);
                if (matches) value = `http://music.miaola.info/163/${matches[1]}.mp3`;
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(value);
                if (matches) value = `http://music.miaola.info/xiami/${matches[1]}.mp3`;
                break;
            case 'video':
                value = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(value);
                if (matches) value = `http://video.miaola.info/youtube/${matches[1]}`;
                matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(value);
                if (matches) value = `http://video.miaola.info/youtube/${matches[1]}`;
                break;
        }
        if (value === null) return;

        let selText = '';
        let code = '';
        switch (action) {
            case 'link':
                selText = Util.getSelText(textArea);
                code = `[url=${value}]${selText}[/url]`;
                break;
            case 'img':
                code = `[img]${value}[/img]`;
                break;
            case 'quote':
                selText = Util.getSelText(textArea);
                code = `[quote]${selText}[/quote]`;
                break;
            case 'code':
                selText = Util.getSelText(textArea);
                code = `[code]${selText}[/code]`;
                break;
            case 'sell':
                selText = Util.getSelText(textArea);
                code = `[sell=${value}]${selText}[/sell]`;
                break;
            case 'hide':
                selText = Util.getSelText(textArea);
                code = `[hide=${value}]${selText}[/hide]`;
                break;
            case 'bold':
                selText = Util.getSelText(textArea);
                code = `[b]${selText}[/b]`;
                break;
            case 'italic':
                selText = Util.getSelText(textArea);
                code = `[i]${selText}[/i]`;
                break;
            case 'underline':
                selText = Util.getSelText(textArea);
                code = `[u]${selText}[/u]`;
                break;
            case 'strike':
                selText = Util.getSelText(textArea);
                code = `[strike]${selText}[/strike]`;
                break;
            case 'super':
                selText = Util.getSelText(textArea);
                code = `[sup]${selText}[/sup]`;
                break;
            case 'sub':
                selText = Util.getSelText(textArea);
                code = `[sub]${selText}[/sub]`;
                break;
            case 'horizontal':
                code = `[hr]`;
                break;
            case 'align-left':
                selText = Util.getSelText(textArea);
                code = `[align=left]${selText}[/align]`;
                break;
            case 'align-center':
                selText = Util.getSelText(textArea);
                code = `[align=center]${selText}[/align]`;
                break;
            case 'align-right':
                selText = Util.getSelText(textArea);
                code = `[align=right]${selText}[/align]`;
                break;
            case 'fly':
                selText = Util.getSelText(textArea);
                code = `[fly]${selText}[/fly]`;
                break;
            case 'audio':
                code = `[audio]${value}[/audio]`;
                break;
            case 'video':
                code = `[video]${value}[/video]`;
                break;
        }
        if (!code) return;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });

    // 字号下拉菜单
    $('#fontSizeDropdownMenu').on('click', 'a', function (e) {
        e.preventDefault();
        let size = $(this).data('size');
        let selText = Util.getSelText(textArea);
        let code = `[size=${size}]${selText}[/size]`;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });

    // 颜色、背景颜色下拉菜单
    $('#colorDropdownMenu, #bgColorDropdownMenu').on('click', 'span', function () {
        let $this = $(this);
        let codeType = $this.parent().is('#bgColorDropdownMenu') ? 'backcolor' : 'color';
        let color = $this.data('color');
        let selText = Util.getSelText(textArea);
        let code = `[${codeType}=${color}]${selText}[/${codeType}]`;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    });
};

/**
 * 检查发帖表单
 */
export const checkPostForm = function () {
    $('#postForm').submit(function () {
        let $postType = $('#postType');
        if ($postType.length > 0 && !$postType.val()) {
            alert('没有选择主题分类');
            $postType.focus();
            return false;
        }

        let $postTitle = $('#postTitle');
        if ($postTitle.length > 0) {
            let length = Util.getStrByteLen($postTitle.val());
            if (!length) {
                alert('标题不能为空');
                $postTitle.focus();
                return false;
            }
            else if (length > 100) {
                alert('标题超过最大长度 100 个字节');
                $postTitle.focus();
                return false;
            }
        }

        let $voteItemContent = $('#voteItemContent');
        if ($voteItemContent.length > 0) {
            if (!$voteItemContent.val().trim()) {
                alert('投票选项不能为空');
                $voteItemContent.focus();
                return false;
            }
        }

        let $postContent = $('#postContent');
        if ($postContent.length > 0) {
            let length = Util.getStrByteLen($postContent.val().trim());
            if (length < 12) {
                alert('文章内容少于 12 个字节');
                $postContent.focus();
                return false;
            }
            else if (length > 50000) {
                alert('文章内容大于 50000 个字节');
                $postContent.focus();
                return false;
            }
        }

        let $postGjc = $('#postGjc');
        if ($postGjc.length > 0 && pageInfo.action === 'new' && !$postGjc.val().trim()) {
            alert('请在内容文本框的下方填写关键词，以方便搜索，也可以在标题中选择任意一个词填入');
            $postGjc.focus();
            return false;
        }
    });
};

/**
 * 处理附件按钮
 */
export const handleAttachBtns = function () {
    $(document).on('click', '.attach-area a[data-action]', function (e) {
        e.preventDefault();
        let $this = $(this);
        let $area = $this.closest('.attach-area');
        let action = $this.data('action');
        let id = $area.data('id');
        if (!id) return;
        if (action === 'insert') {
            let type = $this.data('type');
            let textArea = $('#postContent').get(0);
            let code = `[${type === 'new' ? 'upload' : 'attachment'}=${id}]`;
            Util.addCode(textArea, code);
            textArea.focus();
        }
        else if (action === 'update') {
            $area.find('.attach-info').prop('hidden', true).after(
                `<label><input name="replace_${id}" type="file" aria-label="选择附件"></label>`
            );
            $this.data('action', 'cancel').text('取消').blur();
            if (!$(document).data('attachUpdateAlert')) {
                alert('本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果');
                $(document).data('attachUpdateAlert', true);
            }
        }
        else if (action === 'cancel') {
            $area.find('.attach-info').prop('hidden', false).next('label').remove();
            $this.data('action', 'update').text('更新').blur();
        }
        else if (action === 'delete') {
            $area.remove();
        }
    });

    $(document).on('change', '[type="file"]', function () {
        let $this = $(this);
        let matches = /\.(\w+)$/.exec($this.val());
        if (!matches || !['jpg', 'gif', 'png', 'torrent'].includes(matches[1].toLowerCase())) {
            alert('附件类型不匹配');
            return;
        }

        let type = $this.data('type');
        if (type === 'new') {
            $this.removeData('type').parent().next().prop('hidden', false);

            let $newAttachArea = $('#newAttachArea');
            let totalNum = $newAttachArea.find('[type="file"]').length;
            if (totalNum >= 5) return;
            let $lastAttachArea = $newAttachArea.find('[type="file"]:last').closest('.attach-area');
            let id = parseInt($lastAttachArea.data('id'));
            if (!id) return;
            id++;
            $(`
<div class="form-group row font-size-sm attach-area" data-id="${id}">
  <div class="col-xs-12 col-form-label">
    <label>
      <input name="attachment_${id}" data-type="new" type="file" aria-label="选择附件">
    </label>
    <span hidden>
      <a data-action="insert" data-type="new" href="#">插入</a>&nbsp;
      <a data-action="delete" href="#">删除</a>
    </span>
  </div>
  <div class="col-xs-4">
    <label class="sr-only" for="atc_downrvrc${id}">神秘系数</label>
    <input class="form-control form-control-sm" id="atc_downrvrc${id}" name="atc_downrvrc${id}" data-toggle="tooltip" 
type="number" value="0" min="0" title="神秘系数" placeholder="神秘系数">
  </div>
  <div class="col-xs-8">
    <label class="sr-only" for="atc_desc${id}">描述</label>
    <input class="form-control form-control-sm" id="atc_desc${id}" name="atc_desc${id}" data-toggle="tooltip" type="text" 
title="描述" placeholder="描述">
  </div>
</div>
`).insertAfter($lastAttachArea).find('[data-toggle="tooltip"]').tooltip({'container': 'body'});
        }
    });
};

/**
 * 插入表情代码
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
export const addSmileCode = function ($node) {
    $('.smile-panel').on('click', 'img', function () {
        $('.smile-panel').addClass('open');
        let textArea = $node.get(0);
        if (!textArea) return;
        let code = `[s:${$(this).data('id')}]`;
        Util.addCode(textArea, code, '');
        textArea.blur();
    }).parent().on('shown.bs.dropdown', function () {
        $('.smile-panel img').each(function () {
            let $this = $(this);
            if (!$this.attr('src')) {
                $this.attr('src', $this.data('src'));
            }
        });
    }).on('hide.bs.dropdown', function (e) {
        let $relatedTarget = $(e.relatedTarget);
        if (!$relatedTarget.data('open')) $relatedTarget.removeData('open');
        else return e.preventDefault();
    });

    $('#smileDropdownBtn').click(function () {
        let $this = $(this);
        $this.data('open', !$this.data('open'));
    });
};
