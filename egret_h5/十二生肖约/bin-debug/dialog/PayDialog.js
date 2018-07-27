var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayDialog = (function (_super) {
    __extends(PayDialog, _super);
    function PayDialog(isNullBtn) {
        if (isNullBtn === void 0) { isNullBtn = false; }
        return _super.call(this) || this;
    }
    PayDialog.prototype.setTipDiamond = function (diamond) {
        this.text = "消费“" + diamond + "”钻石即可轻松搞定，快去充值吧！";
        return this;
    };
    PayDialog.prototype.show = function () {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("去充值", true, this.click, this);
        _super.prototype.show.call(this);
    };
    PayDialog.prototype.closeDialog = function (dialog) {
        dialog.close();
    };
    PayDialog.prototype.click = function (dialog) {
        dialog.close();
        UILayer.inst.home.showActivity(13);
        // 去充值
    };
    return PayDialog;
}(NTextDialog));
__reflect(PayDialog.prototype, "PayDialog");
//# sourceMappingURL=PayDialog.js.map