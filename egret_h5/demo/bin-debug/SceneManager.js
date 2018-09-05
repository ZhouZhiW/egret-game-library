var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (SceneManager._manager == null) {
                SceneManager._manager = new SceneManager();
            }
            return SceneManager._manager;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.changeScene = function (s) {
        if (this._currentScene) {
            this.rootScene.removeChild(this._currentScene);
            this._currentScene = null;
        }
        this.rootScene.addChild(s);
        this._currentScene = s;
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
