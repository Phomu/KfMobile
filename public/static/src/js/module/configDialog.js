/* 设置对话框模块 */
'use strict';
import * as Dialog from './dialog';
import {read as readConfig, write as writeConfig} from './config';

/**
 * 显示设置对话框
 */
export const show = function () {
    const dialogName = 'configDialog';
    if ($('#' + dialogName).length > 0) return;
    readConfig();
    let bodyContent = `
<fieldset class="fieldset mb-3 py-2">
  <legend>主题页面相关</legend>
  <div class="form-group">
    <label>主题每页楼层数量</label>
    <span class="tips" data-toggle="tooltip" title="主题页面中每页的楼层数量（用于电梯直达等功能），如果修改了论坛设置里的“文章列表每页个数”，请在此修改成相同的数目">[?]</span>
    <select class="custom-select form-control" name="perPageFloorNum">
      <option value="10">10</option><option value="20">20</option><option value="30">30</option>
    </select>
  </div>
</fieldset>
<fieldset class="fieldset mb-3 py-2">
  <legend>其它设置</legend>
  <div class="form-group">
    <label>默认消息显示时间</label>
    <span class="tips" data-toggle="tooltip" title="默认的消息显示时间（秒），设置为-1表示永久显示，例：15">[?]</span>
    <input class="form-control" name="defShowMsgDuration" type="number" min="-1" required>
  </div>
</fieldset>
<fieldset class="fieldset mb-3 py-2">
  <legend>关注和屏蔽</legend>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" name="followUserEnabled" type="checkbox" data-disabled="[data-name=openFollowUserDialog]"> 关注用户
    </label>
    <span class="tips" data-toggle="tooltip" title="开启关注用户的功能，所关注的用户将被加注记号，请点击详细设置管理关注用户">[?]</span>
    <a class="ml-3" data-name="openFollowUserDialog" href="#" role="button">详细设置&raquo;</a>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" name="blockUserEnabled" type="checkbox" data-disabled="[data-name=openBlockUserDialog]"> 屏蔽用户
    </label>
    <span class="tips" data-toggle="tooltip" title="开启屏蔽用户的功能，你将看不见所屏蔽用户的发言，请点击详细设置管理屏蔽用户">[?]</span>
    <a class="ml-3" data-name="openBlockUserDialog" href="#" role="button">详细设置&raquo;</a>
  </div>
  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" name="blockThreadEnabled" type="checkbox" data-disabled="[data-name=openBlockThreadDialog]"> 屏蔽主题
    </label>
    <span class="tips" data-toggle="tooltip" title="开启屏蔽标题中包含指定关键字的主题的功能，请点击详细设置管理屏蔽关键字">[?]</span>
    <a class="ml-3" data-name="openBlockThreadDialog" href="#" role="button">详细设置&raquo;</a>
  </div>
</fieldset>`;
    let footerContent = `
<button class="btn btn-primary" type="submit">确定</button>
<button class="btn btn-secondary" data-dismiss="dialog" type="button">取消</button>`;
    let $dialog = Dialog.create(dialogName, '助手设置', bodyContent, footerContent);
    Dialog.show(dialogName);
};
