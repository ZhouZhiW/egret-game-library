var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        _this.loginView = new LoginUI();
        _this.fightLayer = FightLayer.inst;
        _this.uiLayer = UILayer.inst;
        _this.dialogLayer = DialogLayer.inst;
        return _this;
    }
    LayerManager.prototype.onCreate = function () {
        this.login();
        this.addChild(this.dialogLayer);
    };
    LayerManager.prototype.onDestroy = function () {
    };
    LayerManager.prototype.login = function () {
        this.loginView.addClickListener(this.goGame, this);
        this.addChildAt(this.loginView, 0);
    };
    LayerManager.prototype.goGame = function () {
        this.removeChild(this.loginView);
        this.loginView = null;
        this.addChildAt(FightLayer.inst, 0);
        this.addChildAt(UILayer.inst, 1);
    };
    return LayerManager;
}(BaseLayer));
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map