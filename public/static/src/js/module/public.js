'use strict';
import * as Util from './util';
import {read as readConfig, write as writeConfig} from './config';

/**
 * 处理主菜单
 */
export const handleMainMenu = function () {
    $('#mainMenuTogglerBtn').click(function () {
        $('#mainMenu').css('max-height', document.documentElement.clientHeight - 49 + 'px');
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
    $searchDialog.find('#searchType').change(function () {
        let searchType = $(this).val();
        if (!$current.data('enabled')) return;
        $current.prop('disabled', searchType === 'gjc' || searchType === 'username');
    });

    if (pageId === 'threadPage' || pageId === 'readPage') {
        $current.prop('disabled', false).data('enabled', true).click();
    }
};


/**
 * 处理版块列表面板
 */
export const handleForumPanel = function () {
    if (Config.activeForumPanel1) {
        $(`a[data-toggle="tab"][href="${Config.activeForumPanel1}"]`).tab('show');
    }
    if (Config.activeForumPanel2) {
        $(`a[data-toggle="tab"][href="${Config.activeForumPanel2}"]`).tab('show');
    }

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        let $target = $(e.target);
        let targetPanel = $target.attr('href');
        if (!targetPanel.includes('ForumPanel')) return;
        let typeName = '';
        if (targetPanel === '#galgameForumPanel' || targetPanel === '#resourceForumPanel') typeName = 'activeForumPanel1';
        else if (targetPanel === '#discussForumPanel' || targetPanel === '#acgForumPanel') typeName = 'activeForumPanel2';
        if (typeName && Config[typeName] !== targetPanel) {
            readConfig();
            Config[typeName] = targetPanel;
            writeConfig();
        }
    });
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
