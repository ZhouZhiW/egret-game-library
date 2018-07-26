/**
 */
var GameManager = (function () {
    function GameManager() {
    }
    var d = __define,c=GameManager;p=c.prototype;
    GameManager.setHeroIndex = function (val) {
        this._heroIndex = val;
    };
    GameManager.getHeroIndex = function () {
        return this._heroIndex;
    };
    GameManager.setCurScore = function (val) {
        this._curScore = val;
    };
    GameManager.getCurScore = function () {
        return this._curScore;
    };
    GameManager._heroIndex = 1;
    GameManager._curScore = 0;
    return GameManager;
})();
egret.registerClass(GameManager,"GameManager");
