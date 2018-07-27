var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Treasures = (function (_super) {
    __extends(UI_Treasures, _super);
    function UI_Treasures(manager, data) {
        var _this = _super.call(this) || this;
        _this.treasuresManager = manager;
        _this.treasureIcon.setMaterialData(data);
        _this.treasureInfo.text = data.name + " x " + data.counts;
        _this.treasureIcon.scaleX = 0.7;
        _this.treasureIcon.scaleY = 0.7;
        _this.touchEnabled = true;
        _this.once(egret.TouchEvent.TOUCH_TAP, _this.clickTreasure, _this);
        return _this;
    }
    Object.defineProperty(UI_Treasures.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/treasures/UI_TreasuresSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Treasures.prototype.onCreate = function () {
        this.tweenLight();
    };
    UI_Treasures.prototype.onDestroy = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    UI_Treasures.prototype.clickTreasure = function () {
        this.pickUp();
    };
    UI_Treasures.prototype.tweenLight = function () {
        egret.Tween.get(this.treasureLight, { loop: true }).to({ rotation: 360 }, 80000);
        egret.Tween.get(this.treasureIcon)
            .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineInOut)
            .wait(1000)
            .call(this.pickUp, this);
    };
    UI_Treasures.prototype.pickUp = function () {
        egret.Tween.removeTweens(this.treasureLight);
        egret.Tween.removeTweens(this.treasureIcon);
        this.treasureTitle.visible = false;
        this.treasureLight.visible = false;
        this.treasureInfo.visible = false;
        var p = this.getPickUpPoint(this.treasureIcon.getMaterialData().type);
        egret.Tween.get(this.treasureIcon).
            to({ x: p.x, y: p.y, scaleX: 0.1, scaleY: 0.1, alpha: 0.5 }, 200, egret.Ease.sineIn)
            .call(this.destroyTreasure, this);
    };
    UI_Treasures.prototype.destroyTreasure = function () {
        this.treasuresManager.popEnd();
    };
    UI_Treasures.prototype.getPickUpPoint = function (type) {
        var p = new egret.Point();
        switch (type) {
            case DataType_Material.Gold:
                p.x = 383;
                p.y = 25;
                break;
            case DataType_Material.Diamond:
                p.x = 383;
                p.y = 64;
                break;
            case DataType_Material.Gem:
                p.x = 122;
                p.y = 753;
                break;
            case DataType_Material.Ess:
                p.x = 122;
                p.y = 753;
                break;
            case DataType_Material.Fragment:
                p.x = 122;
                p.y = 753;
                break;
            default:
                p.x = 198;
                p.y = 753;
                break;
        }
        return p;
    };
    return UI_Treasures;
}(BaseComponent));
__reflect(UI_Treasures.prototype, "UI_Treasures");
//# sourceMappingURL=UI_Treasure.js.map