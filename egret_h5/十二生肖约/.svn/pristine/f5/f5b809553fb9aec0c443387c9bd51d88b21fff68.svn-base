var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_GrooveLockDialog = (function (_super) {
    __extends(UI_Gem_GrooveLockDialog, _super);
    function UI_Gem_GrooveLockDialog() {
        var _this = _super.call(this, true) || this;
        _this.DialogProgressMax = 180;
        return _this;
    }
    Object.defineProperty(UI_Gem_GrooveLockDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/gem/UI_Gem_GrooveLockDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Gem_GrooveLockDialog.prototype.onCreate = function () {
        // this.dialogBtn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this)
    };
    UI_Gem_GrooveLockDialog.prototype.onDestroy = function () {
    };
    UI_Gem_GrooveLockDialog.prototype.setBtn = function () {
        if (this.grooveType == DataType_GemType.UnLock) {
            this.addButton("解锁", true, this.clickBtn, this);
        }
        else if (this.grooveType == DataType_GemType.Lock) {
            this.addIconButton("解锁", this.grooveLockDiamond, 0, true, this.clickBtn, this);
        }
    };
    UI_Gem_GrooveLockDialog.prototype.setData = function (groove) {
        this.groove = groove;
        var data = groove.getMaterialData();
        this.grooveLockDiamond = data.gemLockCost;
        this.dialogInfoLable.text = data.gemLockDisc;
        var wp = data.gemLockCurrentProgress / data.gemLockMaxProgress;
        this.dialogProgress.width = wp > 1 ? this.DialogProgressMax : wp * this.DialogProgressMax;
        this.dialogProgressLable.text = data.gemLockCurrentProgress + "/" + data.gemLockMaxProgress;
        this.grooveType = data.getGemType();
        // this.dialogBtn.label = "" + data.gemLockCost;
        // if (data.gemType == DataType_GemType.UnLock) {
        //     this.dialogBtn.skinName = "resource/skins/ui/gem/UI_Gem_GrooveLockDialogBtnUnlockSkin.exml"
        // } else if (data.gemType == DataType_GemType.Lock) {
        //     this.dialogBtn.skinName = "resource/skins/ui/gem/UI_Gem_GrooveLockDialogBtnLockSkin.exml"
        // }
    };
    UI_Gem_GrooveLockDialog.prototype.clickBtn = function (d) {
        if (this.groove.getMaterialData().getGemType() == DataType_GemType.UnLock) {
            NetEventManager.inst.pushGemLock(this.groove.getGroupID(), DataType_GemLock.Nomal);
        }
        else if (this.grooveLockDiamond > DataManager.inst.asset.diamond) {
            new PayDialog().setTipDiamond(this.grooveLockDiamond).show();
        }
        else {
            new DiamondDialog().setDiamond(this.grooveLockDiamond)
                .setClickListener(this.gotoDiamond, this).show();
        }
        this.close();
    };
    UI_Gem_GrooveLockDialog.prototype.gotoDiamond = function () {
        NetEventManager.inst.pushGemLock(this.groove.getGroupID(), DataType_GemLock.Diamond);
    };
    Object.defineProperty(UI_Gem_GrooveLockDialog.prototype, "style", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return UI_Gem_GrooveLockDialog;
}(CustomDialog));
__reflect(UI_Gem_GrooveLockDialog.prototype, "UI_Gem_GrooveLockDialog");
//# sourceMappingURL=UI_Gem_GrooveLockDialog.js.map