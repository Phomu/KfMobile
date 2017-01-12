'use strict';
import {init as initConfig} from './module/Config';
import * as Util from './module/util';
import Const from './module/const';
import * as Msg from './module/msg';
import * as Dialog from './module/dialog';
import * as Public from './module/public';
import * as Index from './module/index';
import * as Read from './module/read';
import * as Post from './module/post';
import * as Other from './module/other';
import * as ConfigDialog from './module/configDialog';

// 页面ID
window.pageId = $('body').attr('id');

/**
 * 导出模块
 */
const exportModule = function () {
    try {
        window.Util = require('./module/Util');
        window.Const = require('./module/Const').default;
        window.Msg = require('./module/Msg');
        window.Dialog = require('./module/Dialog');
        window.Public = require('./module/Public');
        window.Index = require('./module/Index');
        window.Read = require('./module/Read');
        window.Post = require('./module/Post');
        window.Other = require('./module/Other');
        const Conf = require('./module/Config');
        window.readConfig = Conf.read;
        window.writeConfig = Conf.write;
    }
    catch (ex) {
        console.log(ex);
    }
};

/**
 * 初始化
 */
const init = function () {
    if (pageId === 'loginPage') return;
    let startTime = new Date();
    exportModule();
    if (pageId === 'registerPage') {
        Other.validateRegisterField();
        return;
    }
    initConfig();

    if (Config.customCssEnabled && Config.customCssContent) $('head').append(`<style>${Config.customCssContent}</style>`);
    Public.preventCloseWindow();
    Public.handleMainMenu();
    Public.handleMainMenuLink();
    if (Config.showSidebarBtnGroupEnabled) Public.showSidebarBtnGroup();
    Public.handleSidebarRollBtn();
    Public.handleSearchDialog();
    Public.fillCommonForumPanel();
    Public.showEditCommonForumDialog();
    if ($('.page-input').length > 0) {
        Public.handlePageInput();
    }
    if (pageId === 'indexPage') {
        Index.handleAtTipsBtn();
        Index.handleIndexThreadPanel();
        Index.handleSelectBgImage();
        Index.handleSelectBgColor();
        Index.handleCustomBgStyle();
    }
    else if (pageId === 'readPage') {
        Read.gotoFloor();
        if (Config.threadContentFontSize > 0)
            $('head').append(`<style>.read-content { font-size: ${Config.threadContentFontSize}px; }</style>`);
        Read.handleFastGotoFloorBtn();
        Read.handleTuiThreadBtn();
        Read.handleCopyFloorLinkBtn();
        Read.handleFastReplyBtn();
        Read.handleBlockFloorBtn();
        Read.handleBuyThreadBtn();
        Read.copyBuyThreadList();
        Read.handleFloorImage();
        Post.checkPostForm();
        Public.bindFastSubmitShortcutKey($('#postContent'));
        Read.handleCopyCodeBtn();
        Post.addSmileCode($('#postContent'));
        Read.bindMultiQuoteCheckClick();
        Post.handleClearMultiQuoteDataBtn();
        $('.multi-reply-btn').click(() => Post.handleMultiQuote(1));
        if (Config.userMemoEnabled) Read.addUserMemo();
    }
    else if (pageId === 'postPage') {
        Post.checkPostForm();
        Public.bindFastSubmitShortcutKey($('#postContent'));
        Post.handleEditorBtns();
        Post.addSmileCode($('#postContent'));
        Post.handleAttachBtns();
        Post.handleClearMultiQuoteDataBtn();
        if (Info.multiQuote) Post.handleMultiQuote(2);
    }
    else if (pageId === 'gjcPage') {
        Other.highlightUnReadAtTipsMsg();
    }
    else if (pageId === 'userPage') {
        Other.handleUserPageBtns();
    }
    else if (pageId === 'gameIntroSearchPage') {
        Other.handleGameIntroSearchArea();
    }
    else if (pageId === 'gameIntroPage') {
        Other.tuiGameIntro('game');
    }
    else if (pageId === 'gameIntroCompanyPage') {
        Other.tuiGameIntro('company');
    }
    else if (pageId === 'gameIntroTypePage') {
        Other.tuiGameIntro('type');
    }
    else if (pageId === 'gameIntroPropertyPage') {
        Other.tuiGameIntro('property');
    }
    else if (pageId === 'favorPage') {
        Other.bindFavorPageBtnsClick();
    }
    else if (pageId === 'friendPage') {
        Other.bindFriendPageBtnsClick();
    }
    else if (pageId === 'modifyPage') {
        Other.syncPerPageFloorNum();
        Other.assignBirthdayField();
        Other.handleUploadAvatarFileBtn();
    }
    else if (pageId === 'bankPage') {
        Other.transferKfbAlert();
    }
    else if (pageId === 'messagePage') {
        Other.bindMessageActionBtnsClick();
    }
    else if (pageId === 'readMessagePage') {
        Read.handleFloorImage();
        Read.handleCopyCodeBtn();
    }
    else if (pageId === 'writeMessagePage') {
        Public.bindFastSubmitShortcutKey($('#msgContent'));
        Post.addSmileCode($('#msgContent'));
    }
    else if (pageId === 'messageBannedPage') {
        Public.bindFastSubmitShortcutKey($('[name="banidinfo"]'));
    }
    if (Config.blockUserEnabled) Public.blockUsers();
    if (Config.blockThreadEnabled) Public.blockThread();
    if (Config.followUserEnabled) Public.followUsers();

    $('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    console.log(`脚本加载完毕，耗时：${new Date() - startTime}ms`);
};

$(document).ready(init);
