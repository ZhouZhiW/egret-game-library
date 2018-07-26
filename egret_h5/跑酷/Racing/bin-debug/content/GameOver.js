var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = "gameOverSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }
        var d = __define,c=GameOver;p=c.prototype;
        //添加到舞台
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_START;
            this.resultGroup.y = -600;
            egret.Tween.get(this.resultGroup).to({ y: 97 }, 500, egret.Ease.backOut);
            this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
            if (!game.Data.gameResult) {
                this.result.source = "failedNotice_png";
            }
        };
        //离开舞台
        p.onRemoved = function (e) {
            egret.Tween.removeTweens(this.resultGroup);
            this.playAgainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
        };
        p.onPlayAgain = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return GameOver;
    })(eui.Component);
    game.GameOver = GameOver;
    egret.registerClass(GameOver,"game.GameOver");
})(game || (game = {}));
