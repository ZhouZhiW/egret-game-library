var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var SceneEvent = (function (_super) {
        __extends(SceneEvent, _super);
        function SceneEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=SceneEvent;p=c.prototype;
        SceneEvent.ChangeScene = "changeScene";
        SceneEvent.GAME_START = "gamestart";
        SceneEvent.GAME_PLAYING = "gameplaying";
        SceneEvent.GAME_END = "gameend";
        return SceneEvent;
    })(egret.Event);
    game.SceneEvent = SceneEvent;
    egret.registerClass(SceneEvent,"game.SceneEvent");
})(game || (game = {}));
