'use strict';
import {init as initConfig} from './module/config';

import {
    handleMainMenu,
    handleRollToTopOrBottomBtn,
    handleSearchDialog,
    handleForumPanel,
    handlePageNav,
    bindFastSubmitShortcutKey,
} from './module/public';

import {
    handleAtTipsBtn,
    handleIndexThreadPanel,
    handleSelectBgImage,
    handleSelectBgColor,
    handleCustomBgStyle
} from './module/index';

import {
    fastGotoFloor,
    tuiThread,
    showFloorLink,
    handleFastReplyBtn,
    handleBlockFloorBtn,
    handleBuyThreadBtn,
    copyBuyThreadList,
    handleFloorImage,
    copyCode,
    bindMultiQuoteCheckClick,
    handleClearMultiQuoteDataBtn,
} from './module/read';

import {
    checkPostForm,
    addSmileCode,
    handleEditorBtns,
    handleAttachBtns,
} from './module/post';

import {
    highlightUnReadAtTipsMsg,
    validateRegisterField,
    handleGameIntroSearchArea,
    tuiGameIntro,
    randomSelectSmBox,
    bindFavorPageBtnsClick,
    bindFriendPageBtnsClick,
    syncPerPageFloorNum,
    assignBirthdayField,
    handleUploadAvatarFileBtn,
    transferKfbAlert,
    bindMessageActionBtnsClick,
} from './module/other';

// 页面ID
window.pageId = $('body').attr('id');

/**
 * 初始化
 */
$(function () {
    if (pageId === 'loginPage') return;
    else if (pageId === 'registerPage') {
        validateRegisterField();
        return;
    }
    initConfig();

    handleMainMenu();
    handleRollToTopOrBottomBtn();
    handleSearchDialog();
    //handleForumPanel();
    if (pageId === 'indexPage') {
        handleAtTipsBtn();
        handleIndexThreadPanel();
        handleSelectBgImage();
        handleSelectBgColor();
        handleCustomBgStyle();
    }
    else if (pageId === 'threadPage') {
        handlePageNav('thread/index');
    }
    else if (pageId === 'readPage') {
        fastGotoFloor();
        handlePageNav('read/index');
        tuiThread();
        showFloorLink();
        handleFastReplyBtn();
        handleBlockFloorBtn();
        handleBuyThreadBtn();
        copyBuyThreadList();
        handleFloorImage();
        checkPostForm();
        bindFastSubmitShortcutKey($('#postContent'));
        copyCode();
        bindMultiQuoteCheckClick();
        handleClearMultiQuoteDataBtn(1);
        addSmileCode($('#postContent'));
    }
    else if (pageId === 'searchPage') {
        handlePageNav('search/index');
    }
    else if (pageId === 'gjcPage') {
        highlightUnReadAtTipsMsg();
    }
    else if (pageId === 'myReplyPage') {
        handlePageNav('personal/reply');
    }
    else if (pageId === 'gameIntroSearchPage') {
        handlePageNav('game_intro/search');
        handleGameIntroSearchArea();
    }
    else if (pageId === 'gameIntroPage') {
        tuiGameIntro('game');
    }
    else if (pageId === 'gameIntroCompanyPage') {
        tuiGameIntro('company');
    }
    else if (pageId === 'gameIntroTypePage') {
        tuiGameIntro('type');
    }
    else if (pageId === 'gameIntroPropertyPage') {
        tuiGameIntro('property');
    }
    else if (pageId === 'smBoxPage') {
        randomSelectSmBox();
    }
    else if (pageId === 'favorPage') {
        bindFavorPageBtnsClick();
    }
    else if (pageId === 'friendPage') {
        bindFriendPageBtnsClick();
    }
    else if (pageId === 'modifyPage') {
        syncPerPageFloorNum();
        assignBirthdayField();
        handleUploadAvatarFileBtn();
    }
    else if (pageId === 'bankPage') {
        transferKfbAlert();
    }
    else if (pageId === 'bankLogPage') {
        handlePageNav('bank/log');
    }
    else if (pageId === 'messagePage') {
        handlePageNav('message/index');
        bindMessageActionBtnsClick();
    }
    else if (pageId === 'readMessagePage') {
        handleFloorImage();
        copyCode();
    }
    else if (pageId === 'writeMessagePage') {
        bindFastSubmitShortcutKey($('#msgContent'));
        addSmileCode($('#msgContent'));
    }
    else if (pageId === 'messageBannedPage') {
        bindFastSubmitShortcutKey($('[name="banidinfo"]'));
    }
    else if (pageId === 'selfRateLatestPage') {
        handlePageNav('self_rate/latest');
    }
    else if (pageId === 'selfRateCompletePage') {
        handlePageNav('self_rate/complete');
    }
    else if (pageId === 'postPage') {
        checkPostForm();
        bindFastSubmitShortcutKey($('#postContent'));
        handleEditorBtns();
        addSmileCode($('#postContent'));
        handleAttachBtns();
    }

    //let tooltipStartTime = new Date();
    $('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    //console.log(`tooltip初始化耗时：${new Date() - tooltipStartTime}ms`);
});
