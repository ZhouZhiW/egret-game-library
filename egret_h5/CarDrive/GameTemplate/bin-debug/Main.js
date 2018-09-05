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
/**
 * D5Power游戏框架模版
 *
 * @author D5-Howard(d5@microgame.cn)
 *
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        Main._me = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(Main, "me", {
        get: function () {
            return this._me;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 舞台初始化后运行
     * @param event
     */
    Main.prototype.onAddToStage = function (event) {
        // 请从这里开始编写游戏逻辑
        d5power.D5UIResourceData.setup('resource/assets/ui/default/', this.onUIReady, this);
    };
    /**
     * 当界面主题加载完成后运行本方法
     */
    Main.prototype.onUIReady = function () {
        this._game = new d5power.GameScene();
        this.addChild(this._game);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map