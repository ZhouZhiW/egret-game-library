var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BossChest = (function (_super) {
    __extends(BossChest, _super);
    function BossChest(chestID) {
        var _this = _super.call(this) || this;
        _this.openEnable = false;
        _this.chestID = chestID;
        _this.loadMovieClipDataFactory("resource/mc/monsters/bosschest", _this.getChestMC);
        return _this;
    }
    BossChest.prototype.getChestMC = function (mcdf) {
        this.chestMC = new egret.MovieClip(mcdf.generateMovieClipData("bosschest"));
        this.addChild(this.chestMC);
    };
    BossChest.prototype.drop = function (point) {
        this.x = point.x;
        this.y = point.y;
        this.dropOffsideX = this.getDropOffsideX();
        this.alpha = 0.5;
        this.scaleX = this.dropOffsideX < 0 ? -0.5 : 0.5;
        this.scaleY = 0.5;
        var endScaleX = this.dropOffsideX < 0 ? -1 : 1;
        var y = this.y + 20;
        egret.Tween.get(this, { onChange: this.dropping, onChangeObj: this })
            .to({ alpha: 1, y: y - 100 }, 250, egret.Ease.sineOut).to({ scaleX: endScaleX, scaleY: 1, y: y }, 250, egret.Ease.sineIn).call(this.dropComplete, this);
        if (this.chestMC != null) {
            this.chestMC.gotoAndPlay("drop", -1);
        }
    };
    BossChest.prototype.getDropOffsideX = function () {
        var n = (Utils.random(2) ? 1 : -1) * (Math.random() * 2);
        return n;
    };
    BossChest.prototype.dropping = function () {
        this.x += this.dropOffsideX;
    };
    BossChest.prototype.getDropOffsideY = function () {
        var n = (Utils.random(2) ? 1 : -1) * Utils.random(10);
        return n;
    };
    BossChest.prototype.dropComplete = function () {
        this.openEnable = true;
        egret.Tween.get(this).wait(2000).call(this.click, this);
    };
    BossChest.prototype.checkClick = function (stageX, stageY) {
        if (this.hitTestPoint(stageX, stageY, false)) {
            return this.click();
        }
        else {
            return false;
        }
    };
    BossChest.prototype.click = function () {
        if (!this.openEnable) {
            return;
        }
        egret.Tween.removeTweens(this);
        this.openEnable = false;
        NetEventManager.inst.pushOpenChest(this.chestID, true);
        if (this.chestMC != null) {
            this.chestMC.gotoAndPlay("open", 1);
        }
        egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 200).call(this.end, this);
        return;
    };
    BossChest.prototype.end = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return BossChest;
}(BaseMovieClip));
__reflect(BossChest.prototype, "BossChest");
//# sourceMappingURL=BossChest.js.map