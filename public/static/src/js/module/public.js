/* 公共模块 */
'use strict';
import * as Util from './util';
import Const from './const';
import * as Dialog from './dialog';
import {read as readConfig, write as writeConfig} from './config';
import * as ConfigDialog from './configDialog';

/**
 * 处理主菜单
 */
export const handleMainMenu = function () {
    $('#mainMenuTogglerBtn').click(function () {
        let maxHeight = document.documentElement.clientHeight - $(this).closest('.navbar').outerHeight();
        if (maxHeight > 0) {
            $('#mainMenu').css('max-height', maxHeight + 'px');
        }
    });
};

/**
 * 处理主菜单链接
 */
export const handleMainMenuLink = function () {
    $('#mainMenu').find('[data-name="openConfigDialog"]').click(function (e) {
        e.preventDefault();
        $('#mainMenuTogglerBtn').click();
        ConfigDialog.show();
    });
};

/**
 * 处理滚动到页顶/页底按钮
 */
export const handleRollToTopOrBottomBtn = function () {
    $(window).scroll(function () {
        let $btn = $('#rollToTopOrBottom');
        if ($(window).scrollTop() > 640) {
            if ($btn.data('direction') === 'top') return;
            $btn.data('direction', 'top').attr('aria-label', '滚动到页顶')
                .find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        else {
            if ($btn.data('direction') === 'bottom') return;
            $btn.data('direction', 'bottom').attr('aria-label', '滚动到页底')
                .find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });

    $('#rollToTopOrBottom').click(function () {
        let scrollTop = $(this).data('direction') === 'bottom' ? $('body').height() : 0;
        $('body, html').animate({scrollTop: scrollTop});
    });
};

/**
 * 处理搜索对话框
 */
export const handleSearchDialog = function () {
    let $searchDialog = $('#searchDialog');

    $searchDialog.on('shown.bs.modal', function () {
        $('#searchKeyword').select().focus();
    }).find('form').submit(function () {
        let $this = $(this);
        let $searchKeyword = $this.find('#searchKeyword');
        let searchType = $this.find('#searchType').val();
        let keyword = $.trim($searchKeyword.val());
        if (searchType === 'gjc') {
            $this.attr('action', Util.makeUrl('gjc/' + keyword));
        }
        else if (searchType === 'username') {
            $this.attr('action', Util.makeUrl('user/username/' + keyword));
        }
        else {
            $this.attr('action', Util.makeUrl('search'));
            $searchKeyword.attr('name', searchType === 'author' ? 'pwuser' : 'keyword');
            if (searchType === 'title') {
                if (keyword.length && Util.getStrByteLen(keyword) <= 2) {
                    let $method = $this.find('[name="method"]');
                    $method.val('OR');
                    $searchKeyword.val(keyword + ' ' + Math.floor(new Date().getTime() / 1000));
                    setTimeout(() => {
                        $searchKeyword.val(keyword);
                        $method.val('AND');
                    }, 200);
                }
            }
        }
    });

    $searchDialog.find('[name="searchRange"]').on('click', function () {
        let value = 'all';
        if ($(this).val() === 'current') value = pageInfo.fid;
        $searchDialog.find('[name="f_fid"]').val(value);
    });

    let $current = $searchDialog.find('[name="searchRange"][value="current"]');
    let $currentBox = $current.closest('.form-check-inline');
    $searchDialog.find('#searchType').change(function () {
        let searchType = $(this).val();
        if (!$current.data('enabled')) return;
        let disabled = searchType === 'gjc' || searchType === 'username';
        $current.prop('disabled', disabled);
        if (disabled) $currentBox.addClass('disabled');
        else $currentBox.removeClass('disabled');
    });

    if (pageId === 'threadPage' || pageId === 'readPage') {
        $current.prop('disabled', false).data('enabled', true).click();
        $currentBox.removeClass('disabled');
    }
};

/**
 * 处理分页导航
 */
export const handlePageInput = function () {
    $(document).on('click', '.page-input', function (e) {
        e.preventDefault();
        if (pageInfo.maxPageNum && pageInfo.maxPageNum <= 1) return;
        let action = $(this).data('url');
        if (!action) return;
        let excludeParams = $(this).data('exclude');
        if (excludeParams) excludeParams = excludeParams.split(',');
        else excludeParams = [];
        let num = parseInt(
            prompt(`要跳转到第几页？${pageInfo.maxPageNum ? `（共${pageInfo.maxPageNum}页）` : ''}`, pageInfo.currentPageNum)
        );
        if (num && num > 0) {
            location.href = Util.makeUrl(action, 'page=' + num, true, excludeParams);
        }
    });
};

/**
 * 绑定快速提交的快捷键
 * @param {jQuery} $node 想要绑定的节点的jQuery对象
 */
export const bindFastSubmitShortcutKey = function ($node) {
    $node.keydown(function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            $(this).closest('form').submit();
        }
    });
};

/**
 * 显示编辑常用版块对话框
 */
export const showEditCommonForumDialog = function () {
    $(document).on('click', '.edit-common-forum-btn', function (e) {
        e.preventDefault();
        const dialogName = 'editCommonForumDialog';
        if ($('#' + dialogName).length > 0) return;
        readConfig();

        let commonForumList = Config.commonForumList.length > 0 ? Config.commonForumList : Const.commonForumList;
        let commonForumListHtml = '';
        for (let {fid, name} of commonForumList) {
            commonForumListHtml += `<span class="btn btn-outline-primary" data-fid="${fid}">${name}</span>`;
        }
        let availableForumListHtml = '';
        for (let {fid, name} of Const.availableForumList) {
            if (commonForumList.find(elem => elem.fid === fid)) continue;
            availableForumListHtml += `<span class="btn btn-outline-primary" data-fid="${fid}">${name}</span>`;
        }

        let bodyContent = `
<p class="font-size-sm text-muted">
  请将可用版块内的版块按钮拖拽到常用版块内（或相反）
</p>
<fieldset class="fieldset mb-3 py-2">
  <legend>常用版块</legend>
  <div class="edit-forum-list d-flex flex-wrap" id="editCommonForumList">${commonForumListHtml}</div>
</fieldset>
<fieldset class="fieldset mb-3 py-2">
  <legend>可用版块</legend>
  <div class="edit-forum-list d-flex flex-wrap" id="editAvailableForumList">${availableForumListHtml}</div>
</fieldset>`;
        let footerContent = `
<button class="btn btn-primary" name="save" type="submit">保存</button>
<button class="btn btn-secondary" data-dismiss="dialog" type="button">取消</button>
<button class="btn btn-danger" name="reset" type="button">重置</button>`;
        let $dialog = Dialog.create(dialogName, '编辑常用版块', bodyContent, footerContent);

        let $dragulaScriptPath = $('[name="dragulaScriptPath"]');
        let dragulaScriptPath = $dragulaScriptPath.val();
        if (dragulaScriptPath) {
            $.getScript(dragulaScriptPath, () => dragula($dialog.find('.edit-forum-list').get(), {revertOnSpill: true}));
            $dragulaScriptPath.val('');
        }
        else dragula($dialog.find('.edit-forum-list').get(), {revertOnSpill: true});

        $dialog.find('[name="save"]').click(function () {
            Config.commonForumList = [];
            $('#editCommonForumList').children('.btn').each(function () {
                let $this = $(this);
                let fid = parseInt($this.data('fid'));
                let name = $this.text().trim();
                if (!fid || !name) return;
                Config.commonForumList.push({fid: fid, name: name});
            });
            writeConfig();
            alert('设置已保存');
            Dialog.close(dialogName);
            location.reload();
        }).end().find('[name="reset"]').click(function () {
            if (!confirm('是否重置？')) return;
            Config.commonForumList = [];
            writeConfig();
            alert('设置已重置');
            Dialog.close(dialogName);
            location.reload();
        });

        Dialog.show(dialogName);
    });
};

/**
 * 填充常用版块面板
 */
export const fillCommonForumPanel = function () {
    let commonForumList = Config.commonForumList.length > 0 ? Config.commonForumList : Const.commonForumList;
    let html = '';
    for (let [index, {fid, name}] of commonForumList.entries()) {
        if (index === 0 || index % 3 === 0) html += '<div class="row mb-3">';
        html += `
<div class="col-4">
  <a class="btn btn-outline-primary btn-block" href="${Util.makeUrl('thread')}/${fid}">${name}</a>
</div>
`;
        if (index === commonForumList.length - 1 || index % 3 === 2) html += '</div>';
    }
    $('.common-forum-panel').html(html);
};

/**
 * 在操作进行时阻止关闭页面
 */
export const preventCloseWindow = function () {
    window.addEventListener("beforeunload", function (e) {
        if ($('.mask').length > 0) {
            let msg = '正在进行操作中，确定要关闭页面吗？';
            e.returnValue = msg;
            return msg;
        }
    });
};
