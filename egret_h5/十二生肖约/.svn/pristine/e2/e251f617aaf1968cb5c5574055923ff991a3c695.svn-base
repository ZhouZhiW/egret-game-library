var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FightLayer = (function (_super) {
    __extends(FightLayer, _super);
    function FightLayer() {
        var _this = _super.call(this) || this;
        _this.isShake = false;
        _this.gameStatistics = new GameStatistics();
        return _this;
    }
    Object.defineProperty(FightLayer, "inst", {
        get: function () {
            if (FightLayer.ins == null) {
                FightLayer.ins = new FightLayer();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    FightLayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.sceneLayer = new SceneLayer();
        this.monsterLayer = new MonstersLayer();
        this.roleLayer = new RoleLayer();
        this.infoLayer = new InfoLayer();
        this.addChild(this.sceneLayer);
        this.addChild(this.monsterLayer);
        this.addChild(this.roleLayer);
        this.addChild(this.infoLayer);
    };
    FightLayer.prototype.onDestroy = function () {
        FightLayer.ins = null;
        _super.prototype.onDestroy.call(this);
    };
    FightLayer.prototype.shake = function () {
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        egret.Tween.get(this)
            .to({ x: 8, y: 8 }, 80, egret.Ease.sineOut)
            .to({ x: -5, y: -5 }, 140, egret.Ease.sineOut)
            .to({ x: 2, y: 2 }, 100, egret.Ease.sineOut)
            .to({ x: 0, y: 0 }, 40, egret.Ease.sineOut)
            .wait(200)
            .call(this.shakeEnd, this);
    };
    FightLayer.prototype.shakeEnd = function () {
        egret.Tween.removeTweens(this);
        this.x = 0;
        this.y = 0;
        this.isShake = false;
    };
    return FightLayer;
}(BaseLayer));
__reflect(FightLayer.prototype, "FightLayer");
//# sourceMappingURL=FightLayer.js.map