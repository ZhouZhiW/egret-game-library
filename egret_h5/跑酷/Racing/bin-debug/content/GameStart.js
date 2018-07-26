var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var GameStart = (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = "gameStartSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }
        var d = __define,c=GameStart;p=c.prototype;
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PLAYING;
            this.sceneEvent.eventObj = this;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        p.onStartGame = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return GameStart;
    })(eui.Component);
    game.GameStart = GameStart;
    egret.registerClass(GameStart,"game.GameStart");
})(game || (game = {}));
