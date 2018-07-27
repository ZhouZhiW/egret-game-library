var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Tie_Treasures = (function (_super) {
    __extends(UI_Tie_Treasures, _super);
    function UI_Tie_Treasures(data) {
        var _this = _super.call(this) || this;
        _this.makeTreasureIcon(data);
        return _this;
    }
    UI_Tie_Treasures.prototype.makeTreasureIcon = function (data) {
        var component = new eui.Image();
        if (data instanceof Data_Gold) {
            this.treasureInfo.text = "金币 " + data.value;
            component.source = "resource/res/ui/treasures/gold/tre_gold_gold.png";
            this.movePoint = Utils.getGoldPoint(this);
        }
        else if (data instanceof Data_Diamond) {
            this.treasureInfo.text = "钻石 " + data.value;
            component.source = "resource/res/ui/treasures/diam/tre_diam_diamond.png";
            this.movePoint = Utils.getGoldPoint(this);
        }
        else if (data instanceof Data_BaseGem) {
            this.treasureInfo.text = UI_Tre_GemConfig.getGemName(data.gemType, data.gemLevel) + "  x" + data.gemCounts;
            component = new UI_Tre_Gem();
            component.setData(data);
            this.movePoint = Utils.getGemPoint(this);
        }
        else if (data instanceof Data_GemEssence) {
            this.treasureInfo.text = "守护石精华 " + data.value;
            component.source = "resource/res/ui/treasures/gemEss/tre_gemess_ess.png";
            this.movePoint = Utils.getGemPoint(this);
        }
        component.anchorOffsetX = 34;
        component.anchorOffsetY = 34;
        this.treasureIcon.addChild(component);
    };
    Object.defineProperty(UI_Tie_Treasures.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/treasures/UI_Tie_TreasuresSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Tie_Treasures.prototype.onCreate = function () {
        this.isRemoving = false;
        this.treasureIcon.touchEnabled = true;
        this.treasureIcon.touchChildren = false;
        this.treasureIcon.once(egret.TouchEvent.TOUCH_TAP, this.clickTreasure, this);
        this.tweenLight();
    };
    UI_Tie_Treasures.prototype.onDestroy = function () {
    };
    UI_Tie_Treasures.prototype.tweenLight = function () {
        egret.Tween.get(this.treasureLight, { loop: true }).to({ rotation: 360 }, 80000);
        egret.Tween.get(this).wait(2000).call(this.startRemove, this);
    };
    UI_Tie_Treasures.prototype.startRemove = function () {
        if (this.isRemoving) {
            return;
        }
        this.isRemoving = true;
        egret.Tween.get(this.treasureIcon).to({ scaleX: 1.3, scaleY: 1.3 }, 50, egret.Ease.getBackIn)
            .wait(200)
            .call(this.removeTreasure, this);
    };
    UI_Tie_Treasures.prototype.removeTreasure = function () {
        egret.Tween.removeTweens(this.treasureLight);
        this.treasureTitle.visible = false;
        this.treasureLight.visible = false;
        this.treasureInfo.visible = false;
        egret.Tween.get(this.treasureIcon).to({ x: this.movePoint.x, y: this.movePoint.y, scaleX: 0.1, scaleY: 0.1, alpha: 0.5 }, 200, egret.Ease.sineIn).call(this.destroyTreasure, this);
    };
    UI_Tie_Treasures.prototype.destroyTreasure = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis);
        }
    };
    UI_Tie_Treasures.prototype.clickTreasure = function () {
        this.startRemove();
    };
    UI_Tie_Treasures.prototype.setDestroyListener = function (listener, self) {
        this.listener = { callback: listener, callbackThis: self };
    };
    UI_Tie_Treasures.prototype.removeDestroyListener = function (listener) {
        this.listener = null;
    };
    return UI_Tie_Treasures;
}(BaseComponent));
__reflect(UI_Tie_Treasures.prototype, "UI_Tie_Treasures");
//# sourceMappingURL=UI_Tie_Treasures.js.map