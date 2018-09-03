var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基础层级容器的实现
 * @author nodep
 * @version 1.0
 */
var GameLayer = (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wins = [];
        _this._popCount = 0;
        return _this;
    }
    /**
     * 添加一个界面到舞台
     */
    GameLayer.prototype.addWindow = function (win) {
        win.visible = false;
        this.addChild(win);
        this._wins.push(win);
        if (win.pop)
            this._popCount++;
        this.updateModel();
        if (win.__inited)
            win.reOpen();
        win.__inited = true;
    };
    /**
     * 移除一个界面
     */
    GameLayer.prototype.removeWindow = function (win) {
        if (win.pop)
            this._popCount--;
        this.updateModel();
        this.removeChild(win);
        this._wins.splice(this._wins.indexOf(win), 1);
    };
    /**
     * 刷新阻挡层
     */
    GameLayer.prototype.updateModel = function () {
        //添加
        if (this._popCount > 0 && (!this._popShape || !this._popShape.parent)) {
            if (!this._popShape)
                this._popShape = new egret.Shape();
            this._popShape.graphics.clear();
            this._popShape.graphics.beginFill(0x000000, 0.7);
            this._popShape.graphics.drawRect(0, 0, WinsManager.stageWidth, WinsManager.stageHeight);
            this._popShape.graphics.endFill;
            this._popShape.touchEnabled = true;
            this.addChildAt(this._popShape, 0);
        } //删除
        else if (this._popCount <= 0 && (this._popShape && this._popShape.parent)) {
            this.removeChild(this._popShape);
            this._popShape.graphics.clear();
            this._popShape = null;
        }
    };
    /**
     * 界面大小变化
     */
    GameLayer.prototype.resize = function () {
        var key;
        for (key in this._wins) {
            this._wins[key].resize();
        }
    };
    return GameLayer;
}(egret.DisplayObjectContainer));
__reflect(GameLayer.prototype, "GameLayer", ["GameLayerInterface"]);
//# sourceMappingURL=GameLayer.js.map