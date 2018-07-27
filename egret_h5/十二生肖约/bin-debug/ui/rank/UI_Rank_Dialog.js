var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Dialog = (function (_super) {
    __extends(UI_Rank_Dialog, _super);
    function UI_Rank_Dialog(isNullBtn) {
        if (isNullBtn === void 0) { isNullBtn = false; }
        return _super.call(this) || this;
    }
    UI_Rank_Dialog.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    UI_Rank_Dialog.prototype.show = function () {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("确定", true, this.click, this);
        _super.prototype.show.call(this);
    };
    UI_Rank_Dialog.prototype.setClickListener = function (listener, self, obj) {
        if (obj === void 0) { obj = null; }
        this.listener = { callback: listener, callbackThis: self, callbackObj: obj };
        return this;
    };
    UI_Rank_Dialog.prototype.closeDialog = function (dialog) {
        dialog.close();
    };
    UI_Rank_Dialog.prototype.click = function (dialog) {
        dialog.close();
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis, this.listener.callbackObj);
        }
    };
    return UI_Rank_Dialog;
}(NTextDialog));
__reflect(UI_Rank_Dialog.prototype, "UI_Rank_Dialog");
//# sourceMappingURL=UI_Rank_Dialog.js.map