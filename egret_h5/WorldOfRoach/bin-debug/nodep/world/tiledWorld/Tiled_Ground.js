var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 平铺世界的基础容器
 * @author nodep qq623440028
 * @version 1.0
 */
var Tiled_Ground = (function (_super) {
    __extends(Tiled_Ground, _super);
    function Tiled_Ground() {
        var _this = _super.call(this) || this;
        _this.scaleX = WinsManager.scaleX;
        _this.scaleY = WinsManager.scaleY;
        return _this;
    }
    //世界只有一个
    Tiled_Ground.getIns = function () {
        if (null == Tiled_Ground._ins)
            Tiled_Ground._ins = new Tiled_Ground();
        return Tiled_Ground._ins;
    };
    /**刷新函数 */
    Tiled_Ground.prototype.renderUpdate = function (interval) {
        this._groud.synPositionTo(this._focus.x, this._focus.y);
    };
    /**
     * 获取地图类型
     * 由于这个坑货的颜色并不连贯,所以不能用这个方法取颜色了。包括河流（暂时不做河流了，因为颜色不连贯）
     */
    Tiled_Ground.prototype.getFloorType = function (px, py) {
        px = Math.floor(px / this.cf_X);
        py = GameData.mapData.baseMap._bitmapHeight - Math.floor(py / this.cf_Y);
        return GameData.mapData.getFloorType(px, py);
    };
    /**
     * 根据坐标获取对应区域类型
     */
    Tiled_Ground.prototype.getFloorTypeByArea = function (px, py) {
        px = Math.floor(px / this.cf_X);
        py = Math.floor(py / this.cf_Y);
        return GameData.mapData.getFloorTypeByArea(px, py);
    };
    /**设置当前焦点对象 */
    Tiled_Ground.prototype.setFocus = function (roleId) {
        if (this._focus != null)
            this._focus.__isFocus = false;
        this._focus = this.roleMap.get(roleId);
        this._focus.__isFocus = true;
    };
    /**添加一个焦点显示对象 */
    Tiled_Ground.prototype.addFocusRole = function (role) {
        this.roleMap.set(role.id, role);
        this._groud.addRole(role);
        role.addToWorld();
    };
    //初始化地图
    Tiled_Ground.prototype.initWorld = function (worldW, worldH) {
        this.roleMap = new Map();
        this.stageW = WinsManager.getIns().gameStage().stageWidth;
        this.stageH = WinsManager.getIns().gameStage().stageHeight;
        this.worldWidth = worldW;
        this.worldHeight = worldH;
        this.cf_X = this.worldWidth / GameData.mapData.baseMap._bitmapWidth;
        this.cf_Y = this.worldHeight / GameData.mapData.baseMap._bitmapHeight;
        this._groud = new GroundLayer(this.stageW, this.stageH, this.worldWidth, this.worldHeight);
        this.addChild(this._groud);
        this.createSelf();
        RenderManager.getIns().registRender(this);
    };
    /**将自己添加到场景*/
    Tiled_Ground.prototype.createSelf = function () {
        this._self = new PlayerRole();
        this._self.x = GameData.playerData.posX * this.cf_X;
        this._self.y = GameData.playerData.posY * this.cf_Y;
        this._groud.initPosition(this._self.x, this._self.y);
        this.addFocusRole(this._self);
        this.setFocus(this._self.id);
        this._self.amendPosition();
    };
    return Tiled_Ground;
}(egret.DisplayObjectContainer));
__reflect(Tiled_Ground.prototype, "Tiled_Ground", ["IRender"]);
//# sourceMappingURL=Tiled_Ground.js.map