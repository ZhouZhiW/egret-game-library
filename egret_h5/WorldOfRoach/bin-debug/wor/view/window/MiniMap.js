var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 缩略地图可半透明
 */
var MiniMap = (function (_super) {
    __extends(MiniMap, _super);
    function MiniMap() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.MINI_MAP;
        _this.layerType = LayerType.LAYER_GROUND;
        _this.align(AlignType.CENTER, 0, 0);
        return _this;
    }
    MiniMap.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    /**初始化完成 */
    MiniMap.prototype.childrenCreated = function () {
        this.initPanel();
        _super.prototype.childrenCreated.call(this);
    };
    MiniMap.prototype.initPanel = function () {
        var toW = Math.floor(WinsManager.getIns().gameStage().stageWidth * 0.7);
        var toH = Math.floor(WinsManager.getIns().gameStage().stageHeight * 0.7);
        this._mapBg = new egret.Bitmap();
        this._mapBg.bitmapData = GameData.mapData.baseMap.bitmapData;
        this._scX = toW / this._mapBg.width;
        this._scY = toH / this._mapBg.height;
        this._mapBg.scaleX = this._scX;
        this._mapBg.scaleY = this._scY;
        this.addChild(this._mapBg);
        if (GameConfig.showRiver) {
            this._riverBg = new egret.Bitmap();
            this._riverBg.bitmapData = GameData.mapData.riverMap.bitmapData;
            this._riverBg.scaleX = this._scX;
            this._riverBg.scaleY = this._scY;
            this.addChild(this._riverBg);
        }
        this.width = toW;
        this.height = toH;
        this._self = new egret.Shape();
        this._self.graphics.beginFill(0xFF0000, 1);
        this._self.graphics.drawCircle(0, 0, 5);
        this._self.graphics.endFill();
        this.addChild(this._self);
        FogForGrid.getIns().scaleX = this._scX;
        FogForGrid.getIns().scaleY = this._scY;
        if (GameConfig.showFog)
            this.addChild(FogForGrid.getIns());
        this.updateSelfPosition();
        this.synFog();
    };
    //用植被区域来同步迷雾,无论是通过挖洞还是创建的形式?不知道挖洞的性能如何
    MiniMap.prototype.synFog = function () {
        FogForGrid.getIns().reDraw();
        FogForGrid.getIns().autoDraw = true;
    };
    MiniMap.prototype.reOpen = function () {
        _super.prototype.reOpen.call(this);
        this.updateSelfPosition();
        this.synFog();
    };
    MiniMap.prototype.beforeClose = function () {
        FogForGrid.getIns().autoDraw = false;
        return _super.prototype.beforeClose.call(this);
    };
    MiniMap.prototype.update = function (updateType, updateObject) {
        switch (updateType) {
            case UpdateType.MAP_SELF_MOVE:
                this.updateSelfPosition();
                break;
        }
    };
    MiniMap.prototype.updateSelfPosition = function () {
        if (!this._self)
            return;
        this._self.x = PlayerRole.self.x / GameConfig.map_cfx * this._scX;
        this._self.y = PlayerRole.self.y / GameConfig.map_cfy * this._scY;
    };
    return MiniMap;
}(GameWindow));
__reflect(MiniMap.prototype, "MiniMap", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MiniMap.js.map