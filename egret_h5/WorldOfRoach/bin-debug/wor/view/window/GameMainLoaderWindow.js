var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * nodep
 * 游戏等待界面
 */
var GameMainLoaderWindow = (function (_super) {
    __extends(GameMainLoaderWindow, _super);
    function GameMainLoaderWindow() {
        var _this = _super.call(this) || this;
        _this.layerType = LayerType.LAYER_POP;
        _this.typeName = WorWindowType.MAIN_LOADING;
        _this.align(AlignType.TOP_LEFT);
        return _this;
    }
    GameMainLoaderWindow.prototype.childrenCreated = function () {
        this._bgShape = new egret.Shape();
        this._bgShape.graphics.beginFill(0x000000, 1);
        this._bgShape.graphics.drawRect(0, 0, 1, 1);
        this._bgShape.graphics.endFill();
        this.addChildAt(this._bgShape, 0);
        this._infoLabel = this.getChildByName("message");
        this._infoLabel.text = "";
        _super.prototype.childrenCreated.call(this);
    };
    GameMainLoaderWindow.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this._bgShape == null)
            return;
        this._bgShape.scaleX = WinsManager.stageWidth;
        this._bgShape.scaleY = WinsManager.stageHeight;
        this._infoLabel.x = (WinsManager.stageWidth - this._infoLabel.width) / 2;
        this._infoLabel.y = (WinsManager.stageHeight - this._infoLabel.height) / 2;
    };
    /**
     * 捕获到对应的通知
     */
    GameMainLoaderWindow.prototype.update = function (updateType, updateObject) {
        switch (updateType) {
            case UpdateType.MAIN_LOADING_SET:
                this._infoLabel.text = updateObject;
                break;
        }
    };
    return GameMainLoaderWindow;
}(GameWindow));
__reflect(GameMainLoaderWindow.prototype, "GameMainLoaderWindow", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameMainLoaderWindow.js.map