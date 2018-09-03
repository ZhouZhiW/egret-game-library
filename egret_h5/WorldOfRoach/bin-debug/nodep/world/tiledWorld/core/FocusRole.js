var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 焦点目标,一旦被设置为场景焦点后可以控制场景摄像机位置
 * @author nodep
 * @version 1.0
 */
var FocusRole = (function (_super) {
    __extends(FocusRole, _super);
    function FocusRole() {
        var _this = _super.call(this) || this;
        _this.__isFocus = false;
        _this.id = 0;
        FocusRole._addId++;
        _this.id = FocusRole._addId;
        return _this;
    }
    FocusRole.prototype.renderUpdate = function (interval) {
    };
    /**增加到世界 */
    FocusRole.prototype.addToWorld = function () {
        RenderManager.getIns().registRender(this);
    };
    /**设置当前焦点 */
    FocusRole.prototype.setFocus = function (flag) {
        this.__isFocus = flag;
        return this;
    };
    /**检查自己的Y轴排序 */
    FocusRole.prototype.checkPosY = function () {
        while (this._preLink && this.y < this._preLink["y"]) {
            StageLayer.self.gotoPre(this);
        }
        while (this._nextLink && this.y > this._nextLink["y"]) {
            StageLayer.self.gotoNext(this);
        }
    };
    FocusRole.prototype.getPre = function () {
        return this._preLink;
    };
    FocusRole.prototype.setPre = function (target) {
        this._preLink = target;
    };
    FocusRole.prototype.getNext = function () {
        return this._nextLink;
    };
    FocusRole.prototype.setNext = function (target) {
        this._nextLink = target;
    };
    FocusRole.prototype.setAreaKey = function (ak) {
        this._ak = ak;
    };
    FocusRole.prototype.getAreaKey = function () {
        return this._ak;
    };
    FocusRole.prototype.removed = function () {
    };
    FocusRole.prototype.added = function () {
    };
    FocusRole.prototype.tryOption = function (px, py) {
        return 0;
    };
    FocusRole.prototype.hitTestArea = function (px, py) {
        return false;
    };
    FocusRole.prototype.getOptType = function () {
        return this.type;
    };
    return FocusRole;
}(egret.DisplayObjectContainer));
FocusRole._addId = 0;
__reflect(FocusRole.prototype, "FocusRole", ["IFocus", "IRender", "ILink", "IRole"]);
//# sourceMappingURL=FocusRole.js.map