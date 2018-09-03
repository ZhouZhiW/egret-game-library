var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 左上角生命,经历等信息
 */
var RoleWindow = (function (_super) {
    __extends(RoleWindow, _super);
    function RoleWindow() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.ROLE_WINDOW;
        _this.layerType = LayerType.LAYER_MENU;
        _this.align(AlignType.TOP_LEFT, 0, 0);
        return _this;
    }
    RoleWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._timeLabel = this.getChildByName("timeTxt");
        this._day = this.getChildByName("day");
        this._dayBg = this.getChildByName("dayBg");
        this._light = this.getChildByName("light");
        this._lightBg = this.getChildByName("lightBg");
        this._hpBar = new ProgressBar(this.getChildByName("hpBar"));
        this._mpBar = new ProgressBar(this.getChildByName("mpBar"));
        this._epBar = new ProgressBar(this.getChildByName("epBar"));
        this.flushTime();
        this.flushBars();
        DelayCall.call(1000, this.flushTime, this, null, 0);
    };
    RoleWindow.prototype.flushTime = function () {
        this._timeLabel.text = GameData.timeData.pd + " " + TimeUtil.getTimeStrByHM(GameData.timeData.hour, GameData.timeData.min);
        this._dayBg.visible = this._day.visible = !GameData.timeData.isLight;
        this._light.visible = this._lightBg.visible = GameData.timeData.isLight;
    };
    RoleWindow.prototype.flushBars = function () {
        // this._hpBar.setProgress(GameData.playerData.hp,GameData.playerData.hpMax);
        // this._mpBar.setProgress(GameData.playerData.mp,GameData.playerData.mpMax);
        // this._epBar.setProgress(GameData.playerData.ep,GameData.playerData.epMax);
    };
    return RoleWindow;
}(GameWindow));
__reflect(RoleWindow.prototype, "RoleWindow", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=RoleWindow.js.map