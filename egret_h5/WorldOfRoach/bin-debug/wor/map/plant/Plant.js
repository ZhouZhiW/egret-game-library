var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基础植物类
 */
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x000000, 1);
        shape.graphics.drawRect(-20, -250, 40, 250);
        shape.graphics.beginFill(0x00FF00, 1);
        shape.graphics.drawRect(-70, -250, 140, 80);
        shape.graphics.endFill();
        _this.addChild(shape);
        _this._rectX = -20;
        _this._rectY = -30;
        _this._rectW = 40;
        _this._rectH = 30;
        return _this;
    }
    //是否可操作
    Plant.prototype.tryOption = function (px, py) {
        if ((px >= this._gx - Plant._optRound && px <= this._gx + this._rectW + Plant._optRound) && (py >= this._gy - Plant._optRound && py <= this._gy + this._rectH + Plant._optRound))
            return Math.abs(Math.min(px - (this._gx - Plant._optRound), this._gx + this._rectW + Plant._optRound - px));
        return -1;
    };
    //是否已碰撞
    Plant.prototype.hitTestArea = function (px, py) {
        return (px >= this._gx && px <= this._gx + this._rectW) && (py >= this._gy && py <= this._gy + this._rectH);
    };
    Plant.prototype.setData = function (data) {
        this._data = data;
    };
    Plant.prototype.getData = function () {
        return this._data;
    };
    Plant.prototype.getPre = function () {
        return this._preLink;
    };
    Plant.prototype.setPre = function (target) {
        this._preLink = target;
    };
    Plant.prototype.getNext = function () {
        return this._nextLink;
    };
    Plant.prototype.setNext = function (target) {
        this._nextLink = target;
    };
    Plant.prototype.setAreaKey = function (ak) {
        this._ak = ak;
    };
    Plant.prototype.getAreaKey = function () {
        return this._ak;
    };
    Plant.prototype.removed = function () {
    };
    Plant.prototype.added = function () {
        this._gx = this.x + this._rectX;
        this._gy = this.y + this._rectY;
    };
    Plant.prototype.getOptType = function () {
        return RoleType.POLE_PLANT;
    };
    return Plant;
}(egret.DisplayObjectContainer));
Plant._optRound = 20;
__reflect(Plant.prototype, "Plant", ["ILink", "IRole"]);
//# sourceMappingURL=Plant.js.map