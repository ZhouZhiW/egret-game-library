var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameOver = (function (_super) {
    __extends(gameOver, _super);
    function gameOver() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    gameOver.prototype.onAddToStage = function () {
        var _score = 0;
        for (var a = 0; a < configData.selectScore.length; a++) {
            _score += configData.selectScore[a];
        }
        console.log("s", _score);
        CanvasToimages_1(25 - _score);
        this.imageTagVisible(true);
    };
    gameOver.prototype.imageTagVisible = function (visible) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        }
        else {
            document.getElementById("saveContainer").style.display = "none";
        }
    };
    return gameOver;
}(egret.DisplayObjectContainer));
__reflect(gameOver.prototype, "gameOver");
//# sourceMappingURL=over.js.map