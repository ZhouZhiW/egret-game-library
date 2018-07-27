var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MallsDialog = (function (_super) {
    __extends(MallsDialog, _super);
    function MallsDialog(isNullBtn) {
        if (isNullBtn === void 0) { isNullBtn = false; }
        return _super.call(this) || this;
    }
    MallsDialog.prototype.show = function () {
        var text = "   亲，不要让金币不足影响您前进的步伐，快去商城购买金币吧";
        this.setContent(text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("去商城", true, this.click, this);
        _super.prototype.show.call(this);
    };
    MallsDialog.prototype.click = function (dialog) {
        UILayer.inst.home.showTab(5);
        dialog.close();
        // 去商城
    };
    MallsDialog.prototype.closeDialog = function (dialog) {
        dialog.close();
    };
    return MallsDialog;
}(NTextDialog));
__reflect(MallsDialog.prototype, "MallsDialog");
//# sourceMappingURL=MallsDialog.js.map