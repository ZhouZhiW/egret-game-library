var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gamegirlOver = (function (_super) {
    __extends(gamegirlOver, _super);
    function gamegirlOver() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    gamegirlOver.prototype.onAddToStage = function () {
        var _score = Math.floor(Math.random() * 18 + 1);
        CanvasToimages_1("result/game_" + _score);
        this.imageTagVisible(true);
    };
    gamegirlOver.prototype.imageTagVisible = function (visible) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        }
        else {
            document.getElementById("saveContainer").style.display = "none";
        }
    };
    return gamegirlOver;
}(egret.DisplayObjectContainer));
__reflect(gamegirlOver.prototype, "gamegirlOver");
