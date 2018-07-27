var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiamondDialog = (function (_super) {
    __extends(DiamondDialog, _super);
    function DiamondDialog(isNullBtn) {
        if (isNullBtn === void 0) { isNullBtn = false; }
        return _super.call(this) || this;
    }
    DiamondDialog.prototype.setDiamond = function (diamond) {
        this.text = "确定消耗“" + diamond + "”完成此次操作吗";
        return this;
    };
    DiamondDialog.prototype.setDiamondInfo = function (info) {
        this.text = info;
        return this;
    };
    DiamondDialog.prototype.show = function () {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("确定", true, this.click, this);
        _super.prototype.show.call(this);
    };
    DiamondDialog.prototype.setClickListener = function (listener, self) {
        this.listener = { callback: listener, callbackThis: self };
        return this;
    };
    DiamondDialog.prototype.click = function (dialog) {
        dialog.close();
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis, dialog);
        }
    };
    DiamondDialog.prototype.closeDialog = function (dialog) {
        dialog.close();
    };
    return DiamondDialog;
}(NTextDialog));
__reflect(DiamondDialog.prototype, "DiamondDialog");
//# sourceMappingURL=DiamondDialog.js.map