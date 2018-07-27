var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_EssDialog = (function (_super) {
    __extends(UI_Gem_EssDialog, _super);
    function UI_Gem_EssDialog() {
        return _super.call(this, true) || this;
    }
    UI_Gem_EssDialog.prototype.onCreate = function () {
        //设置按钮
        this.groovesBtn.setIcon(1);
        this.groovesBtn.setText("升级");
        this.groovesBtn.setTextSize(22);
        this.groovesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this);
    };
    UI_Gem_EssDialog.prototype.onDestroy = function () {
        this.groovesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this);
    };
    UI_Gem_EssDialog.prototype.refreshGem = function (e) {
        var data = e.data;
        this.essNums.text = EasyNumber.easyNum(data.gemPieces);
        this.groovesCurrent.text = Utils.numberToPre(data.groovesCurrent);
        this.groovesNext.text = Utils.numberToPre(data.groovesNext);
        this.groovesLevel.text = "LV. " + data.groovesLevel;
        this.groovesBtn.enabled = data.groovesEss <= data.gemPieces;
        this.groovesBtn.setValue(data.groovesEss);
    };
    UI_Gem_EssDialog.prototype.clickBtn = function () {
        NetEventManager.inst.pushGemEssUp();
    };
    Object.defineProperty(UI_Gem_EssDialog.prototype, "style", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Gem_EssDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/gem/UI_Gem_EssDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Gem_EssDialog;
}(CustomDialog));
__reflect(UI_Gem_EssDialog.prototype, "UI_Gem_EssDialog");
//# sourceMappingURL=UI_Gem_EssDialog.js.map