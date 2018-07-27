var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameLevelInfo = (function (_super) {
    __extends(GameLevelInfo, _super);
    function GameLevelInfo(value) {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.x = 240;
        _this.y = 360;
        _this.font = new egret.BitmapText();
        if (value == 0) {
            _this.text = "b  !";
        }
        else {
            _this.text = "r  " + value;
        }
        return _this;
    }
    GameLevelInfo.prototype.onCreate = function () {
        this.font = ResManager.inst.gameLevelFont;
        this.anchorOffsetX = this.width >> 1;
        this.floating();
    };
    GameLevelInfo.prototype.floating = function () {
        egret.Tween.get(this)
            .to({ alpha: 0, y: this.y - 60 }, 1000, egret.Ease.sineOut).call(this.floatingComplete, this);
    };
    GameLevelInfo.prototype.floatingComplete = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return GameLevelInfo;
}(egret.BitmapText));
__reflect(GameLevelInfo.prototype, "GameLevelInfo");
//# sourceMappingURL=GameLevelInfo.js.map