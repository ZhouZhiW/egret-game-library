//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.onCreate = function () {
    };
    GameScene.prototype.onDestroy = function () {
    };
    GameScene.prototype.onEnterFrame = function (advancedTime) {
        GameUtils.gameDistance += advancedTime / 1000 * Const.GAME_SPEED;
        GameManager.getInstance().dispatchEventWith("UPDATE");
        if (GameUtils.gameDistance >= Const.MAP_WIDTH - Const.SW / 2) {
            ObjectPool.getInstance().paused = true;
        }
    };
    GameScene.key = "gamescene";
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map