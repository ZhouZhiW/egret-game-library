var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_Pedestal_Dialog = (function (_super) {
    __extends(UI_Gem_Pedestal_Dialog, _super);
    function UI_Gem_Pedestal_Dialog() {
        return _super.call(this, true) || this;
    }
    UI_Gem_Pedestal_Dialog.prototype.onCreate = function () {
        //设置按钮
        this.costBtn.setIcon(2);
        this.costBtn.setText("升级");
        this.costBtn.setTextSize(22);
        DataManager.inst.pedestal.addDataListener(this.refreshDialog, this);
        this.costBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    };
    UI_Gem_Pedestal_Dialog.prototype.onDestroy = function () {
        this.costBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        DataManager.inst.pedestal.removeDataListener(this.refreshDialog, this);
    };
    UI_Gem_Pedestal_Dialog.prototype.refreshDialog = function (e) {
        var data = e.data;
        this.diaFraNum.text = EasyNumber.easyNum(data.fragmentNum);
        this.diaLv.text = "LV." + data.baseLevel;
        this.speedeUp.text = data.percent;
        this.speedUpNext.text = data.nextPercent;
        this.costBtn.setValue(data.costFragment);
        this.costBtn.enabled = data.fragmentNum >= data.costFragment;
    };
    UI_Gem_Pedestal_Dialog.prototype.onClicked = function (e) {
        NetEventManager.inst.pushGemPedestalUp(1);
    };
    Object.defineProperty(UI_Gem_Pedestal_Dialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/gem/UI_Gem_Pedestal_DialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Gem_Pedestal_Dialog.prototype, "style", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    return UI_Gem_Pedestal_Dialog;
}(CustomDialog));
__reflect(UI_Gem_Pedestal_Dialog.prototype, "UI_Gem_Pedestal_Dialog");
//# sourceMappingURL=UI_Gem_Pedestal_Dialog.js.map