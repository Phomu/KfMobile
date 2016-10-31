'use strict';
import {init as initConfig} from './module/config';

import {
    handleMainMenu,
    handleRollToTopOrBottomBtn,
    handleSearchDialog,
    handlePageInput,
    bindFastSubmitShortcutKey,
    showEditCommonForumDialog,
    fillCommonForumPanel,
    preventCloseWindow,
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
    handleCopyFloorLinkBtn,
    handleFastReplyBtn,
    handleBlockFloorBtn,
    handleBuyThreadBtn,
    copyBuyThreadList,
    handleFloorImage,
    handleCopyCodeBtn,
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

    preventCloseWindow();
    handleMainMenu();
    handleRollToTopOrBottomBtn();
    handleSearchDialog();
    fillCommonForumPanel();
    showEditCommonForumDialog();
    if ($('.page-input').length > 0) {
        handlePageInput();
    }
    if (pageId === 'indexPage') {
        handleAtTipsBtn();
        handleIndexThreadPanel();
        handleSelectBgImage();
        handleSelectBgColor();
        handleCustomBgStyle();
    }
    else if (pageId === 'readPage') {
        fastGotoFloor();
        tuiThread();
        handleCopyFloorLinkBtn();
        handleFastReplyBtn();
        handleBlockFloorBtn();
        handleBuyThreadBtn();
        copyBuyThreadList();
        handleFloorImage();
        checkPostForm();
        bindFastSubmitShortcutKey($('#postContent'));
        handleCopyCodeBtn();
        bindMultiQuoteCheckClick();
        handleClearMultiQuoteDataBtn(1);
        addSmileCode($('#postContent'));
    }
    else if (pageId === 'gjcPage') {
        highlightUnReadAtTipsMsg();
    }
    else if (pageId === 'gameIntroSearchPage') {
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
    else if (pageId === 'messagePage') {
        bindMessageActionBtnsClick();
    }
    else if (pageId === 'readMessagePage') {
        handleFloorImage();
        handleCopyCodeBtn();
    }
    else if (pageId === 'writeMessagePage') {
        bindFastSubmitShortcutKey($('#msgContent'));
        addSmileCode($('#msgContent'));
    }
    else if (pageId === 'messageBannedPage') {
        bindFastSubmitShortcutKey($('[name="banidinfo"]'));
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
