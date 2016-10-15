'use strict';
import * as Util from './module/util';
import Const from './module/const';
import {read as readConfig, write as writeConfig} from './module/config';
import * as Public from './module/public';
import * as Index from './module/index';
import * as Read from './module/read';
import * as Post from './module/post';
import * as Other from './module/other';

// 页面ID
window.pageId = $('body').attr('id');

/**
 * 初始化
 */
$(function () {
    if (pageId === 'loginPage') return;
    else if (pageId === 'registerPage') {
        Other.validateRegisterField();
        return;
    }
    readConfig();

    Public.handleMainMenu();
    Public.handleRollToTopOrBottomBtn();
    Public.handleSearchDialog();
    //Public.handleForumPanel();
    if (pageId === 'indexPage') {
        Index.handleAtTipsBtn();
        Index.handleIndexThreadPanel();
        Index.handleSelectBgImage();
        Index.handleSelectBgColor();
        Index.handleCustomBgStyle();
    }
    else if (pageId === 'threadPage') {
        Public.handlePageNav('thread/index');
    }
    else if (pageId === 'readPage') {
        Read.fastGotoFloor();
        Public.handlePageNav('read/index');
        Read.tuiThread();
        Read.showFloorLink();
        Read.handleFastReplyBtn();
        Read.handleBlockFloorBtn();
        Read.handleBuyThreadBtn();
        Read.copyBuyThreadList();
        Read.handleFloorImage();
        Post.checkPostForm();
        Public.bindFastSubmitShortcutKey($('#postContent'));
        Read.copyCode();
        Read.bindMultiQuoteCheckClick();
        Read.handleClearMultiQuoteDataBtn(1);
        Post.addSmileCode($('#postContent'));
    }
    else if (pageId === 'searchPage') {
        Public.handlePageNav('search/index');
    }
    else if (pageId === 'gjcPage') {
        Index.highlightUnReadAtTipsMsg();
    }
    else if (pageId === 'myReplyPage') {
        Public.handlePageNav('personal/reply');
    }
    else if (pageId === 'gameIntroSearchPage') {
        Public.handlePageNav('game_intro/search');
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
    else if (pageId === 'smBoxPage') {
        Other.randomSelectSmBox();
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
    else if (pageId === 'bankLogPage') {
        Public.handlePageNav('bank/log');
    }
    else if (pageId === 'messagePage') {
        Public.handlePageNav('message/index');
        Other.bindMessageActionBtnsClick();
    }
    else if (pageId === 'readMessagePage') {
        Read.handleFloorImage();
        Read.copyCode();
    }
    else if (pageId === 'writeMessagePage') {
        Public.bindFastSubmitShortcutKey($('#msgContent'));
        Post.addSmileCode($('#msgContent'));
    }
    else if (pageId === 'messageBannedPage') {
        Public.bindFastSubmitShortcutKey($('#banidinfo'));
    }
    else if (pageId === 'selfRateLatestPage') {
        Public.handlePageNav('self_rate/latest');
    }
    else if (pageId === 'selfRateCompletePage') {
        Public.handlePageNav('self_rate/complete');
    }
    else if (pageId === 'postPage') {
        Post.checkPostForm();
        Public.bindFastSubmitShortcutKey($('#postContent'));
        Post.handleEditorBtns();
        Post.addSmileCode($('#postContent'));
        Post.handleAttachBtns();
    }

    //let tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    //console.log(`tooltip初始化耗时：${new Date() - tooltipStartTime}ms`);
});
