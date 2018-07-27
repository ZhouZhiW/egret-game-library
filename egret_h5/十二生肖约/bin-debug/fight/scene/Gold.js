var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Gold = (function (_super) {
    __extends(Gold, _super);
    function Gold(goldData, point, goldMcdf) {
        var _this = _super.call(this) || this;
        _this.goldData = goldData;
        _this.initialX = point.x;
        _this.initialY = point.y;
        _this.x = _this.initialX;
        _this.y = _this.initialY;
        if (goldMcdf != null) {
            _this.moneyMC = new egret.MovieClip(goldMcdf.generateMovieClipData("money"));
            _this.addChild(_this.moneyMC);
        }
        return _this;
    }
    Gold.prototype.onCreate = function () {
        this.drop();
    };
    Gold.prototype.onDestroy = function () {
    };
    Gold.prototype.drop = function () {
        var y = this.initialY + this.getDropOffsideY();
        egret.Tween.get(this, { onChange: this.dropping, onChangeObj: this })
            .to({ y: y - 66 }, 250, egret.Ease.sineOut).to({ y: y }, 250, egret.Ease.sineIn).call(this.turn, this);
        this.dropOffsideX = this.getDropOffsideX();
    };
    Gold.prototype.dropping = function () {
        this.x += this.dropOffsideX;
    };
    Gold.prototype.turn = function () {
        this.moneyMC.gotoAndPlay("turn", 1);
    };
    Gold.prototype.getDropOffsideX = function () {
        var n = (Utils.random(2) ? 1 : -1) * (Math.random() * 2);
        return n;
    };
    Gold.prototype.getDropOffsideY = function () {
        var n = (Utils.random(2) ? 1 : -1) * Utils.random(10);
        return n;
    };
    Gold.prototype.pickUp = function () {
        egret.Tween.removeTweens(this);
        this.moneyMC.gotoAndStop("turn");
        var g = this.goldData;
        this.goldData = null; //保证只拾取一次
        if (this.moneyMC == null) {
            this.pickUpComplete();
            return g;
        }
        else {
            var p = GameUtils.getGoldPoint(this.parent);
            egret.Tween.get(this).to({ x: p.x, y: p.y }, 300, egret.Ease.sineIn).call(this.pickUpComplete, this);
        }
        return g;
    };
    Gold.prototype.pickUpComplete = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    Gold.prototype.checkClick = function (stageX, stageY) {
        return this.hitTestPoint(stageX, stageY, false);
    };
    return Gold;
}(BaseComponent));
__reflect(Gold.prototype, "Gold");
//# sourceMappingURL=Gold.js.map