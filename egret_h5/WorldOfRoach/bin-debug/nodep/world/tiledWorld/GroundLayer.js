var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 地图基础容器
 * @author nodep
 * @version 1.0
 */
var GroundLayer = (function (_super) {
    __extends(GroundLayer, _super);
    /**舞台宽度,舞台高度,世界宽度,世界高度 */
    function GroundLayer(maxW, maxH, worldW, worldH) {
        var _this = _super.call(this) || this;
        _this._maxW = maxW / WinsManager.scaleX;
        _this._maxH = maxH / WinsManager.scaleY;
        _this._worldW = worldW;
        _this._worldH = worldH;
        _this._hafX = _this._maxW / 2;
        _this._hafY = _this._maxH / 2;
        _this._maxOffsetX = -_this._worldW + _this._maxW + GameConfig.GRID_W / 2;
        _this._maxOffsetY = -_this._worldH + _this._maxH;
        _this._floor = new FloorLayer(worldW, worldH);
        _this.addChild(_this._floor);
        _this._stage = new StageLayer(worldW, worldH);
        _this.addChild(_this._stage);
        return _this;
    }
    /**初始化当前位置 */
    GroundLayer.prototype.initPosition = function (cx, cy) {
        this._toX = -cx + this._hafX;
        this._toY = -cy + this._hafY;
        if (this._toX > 0)
            this._toX = 0;
        else if (this._toX < this._maxOffsetX)
            this._toX = this._maxOffsetX;
        if (this._toY > 0)
            this._toY = 0;
        else if (this._toY < this._maxOffsetY)
            this._toY = this._maxOffsetY;
        this.x = this._toX;
        this.y = this._toY;
        this._floor.initPosition(-this.x, -this.y);
        this._stage.initSynArea(-this.x, -this.y);
    };
    /**同步到当前位置 */
    GroundLayer.prototype.synPositionTo = function (cx, cy) {
        this._toX = -cx + this._hafX;
        this._toY = -cy + this._hafY;
        if (this._toX > 0)
            this._toX = 0;
        else if (this._toX < this._maxOffsetX)
            this._toX = this._maxOffsetX;
        if (this._toY > 0)
            this._toY = 0;
        else if (this._toY < this._maxOffsetY)
            this._toY = this._maxOffsetY;
        this.x = this._toX;
        this.y = this._toY;
        if (this._floor.synPosition(-this.x, -this.y))
            this._stage.trySynArea(-this.x, -this.y);
    };
    /**添加一个演员 */
    GroundLayer.prototype.addRole = function (dis) {
        this._stage.addRoleToLink(dis);
    };
    return GroundLayer;
}(egret.DisplayObjectContainer));
__reflect(GroundLayer.prototype, "GroundLayer");
//# sourceMappingURL=GroundLayer.js.map