/* 对话框模块 */
'use strict';

/**
 * 创建对话框
 * @param {string} id 对话框ID
 * @param {string} title 对话框标题
 * @param {string} bodyContent 对话框主体内容
 * @param {string} footerContent 对话框底部内容
 * @param {string} style 对话框样式
 * @returns {jQuery} 对话框的jQuery对象
 */
export const create = function (id, title, bodyContent, footerContent = '', style = '') {
    let html = `
<div class="dialog-container" id="${id}" style="${style}" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="${id}Title">
  <div class="container" role="document">
    <form>
      <div class="dialog-header">
        <button class="close" data-dismiss="dialog" type="button" aria-label="关闭">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="dialog-title" id="${id}Title">${title}</h5>
      </div>
      <div class="dialog-body">${bodyContent}</div>
      <div class="dialog-footer" ${!footerContent ? 'hidden' : ''}>${footerContent}</div>
    </form>
  </div>
</div>`;
    let $dialog = $(html).appendTo('body');
    $dialog.on('click', '[data-dismiss="dialog"]', () => close(id))
        .on('click', '.tips', () => false)
        .on('click', '.disabled-link', () => false)
        .keydown(function (e) {
            if (e.keyCode === 27) {
                return close(id);
            }
        })
        .find('legend [type="checkbox"]')
        .click(function () {
            let $this = $(this);
            $this.closest('fieldset').prop('disabled', !$this.prop('checked'));
        }).end()
        .find('input[data-disabled]')
        .click(function () {
            let $this = $(this);
            let checked = $this.prop('checked');
            $($this.data('disabled')).each(function () {
                let $this = $(this);
                if ($this.is('a')) {
                    if (checked) $this.removeClass('disabled-link');
                    else $this.addClass('disabled-link');
                }
                else {
                    $this.prop('disabled', !checked);
                }
            });
        }).end().find('[data-toggle="tooltip"]').tooltip({'container': 'body'});
    $(window).on('resize.' + id, () => show(id));
    return $dialog;
};

/**
 * 显示或调整对话框
 * @param {string} id 对话框ID
 */
export const show = function (id) {
    let $dialog = $('#' + id);
    if (!$dialog.length) return;
    $dialog.find('.dialog-body')
        .css('max-height', $(window).height() - $dialog.find('.dialog-header').outerHeight() - $dialog.find('.dialog-footer').outerHeight())
        .end().find('legend [type="checkbox"]')
        .each(function () {
            $(this).triggerHandler('click');
        }).end().find('input[data-disabled]')
        .each(function () {
            $(this).triggerHandler('click');
        });
    $dialog.fadeIn('fast').find('.close:first').focus();
};

/**
 * 关闭对话框
 * @param {string} id 对话框ID
 * @returns {boolean} 返回false
 */
export const close = function (id) {
    $('#' + id).fadeOut('fast', function () {
        $(this).remove();
    });
    $(window).off('resize.' + id);
    return false;
};
