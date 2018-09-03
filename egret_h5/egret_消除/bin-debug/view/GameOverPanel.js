var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this._isSuccess = false;
        return _this;
    }
    GameOverPanel.prototype.show = function (isSuccess) {
        this._isSuccess = isSuccess;
        this._view = new egret.Bitmap();
        this._view.texture = RES.getRes("level_0002_background_png");
        this._view.width = GameData.stageW;
        this._view.height = GameData.stageH;
        this.addChild(this._view);
        this.scaleX = 0.1;
        this.scaleY = 0.1;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 700, egret.Ease.bounceOut).call(this.playStarAni, this);
        this.playStarAni();
    };
    GameOverPanel.prototype.playStarAni = function () {
        console.log("播放失败动画");
        if (this._isSuccess) {
            //成功动画
            var success = new egret.Bitmap();
            success.texture = RES.getRes("success_png");
            success.width = (this._view.width - 50) / 3;
            success.height = success.width;
            success.x = (GameData.stageW - success.width * 2) / 3 + this._view.x;
            success.y = 150 + this._view.y;
            success.scaleX = 1.5;
            success.scaleY = 1.5;
            success.alpha = 0;
            this.addChild(success);
            egret.Tween.get(success).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
        }
        else {
            //失败动画
            var fail = new egret.Bitmap();
            fail.texture = RES.getRes("fail_png");
            fail.width = (this._view.width - 50) / 3;
            fail.height = fail.width;
            fail.x = (GameData.stageW - fail.width * 2) / 3 + this._view.x;
            fail.y = 150 + this._view.y;
            fail.scaleX = 1.5;
            fail.scaleY = 1.5;
            fail.alpha = 0;
            this.addChild(fail);
            egret.Tween.get(fail).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circIn);
        }
    };
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map