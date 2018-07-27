var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UILayer = (function (_super) {
    __extends(UILayer, _super);
    function UILayer() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UILayer, "inst", {
        get: function () {
            if (UILayer.ins == null) {
                UILayer.ins = new UILayer();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    UILayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.homeLayer = new UI_Home_Main();
        this.addChild(this.homeLayer);
        this.treasuresManager = new UI_TreasuresManager();
    };
    UILayer.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Object.defineProperty(UILayer.prototype, "home", {
        get: function () {
            return this.homeLayer;
        },
        enumerable: true,
        configurable: true
    });
    UILayer.prototype.showVisit = function (playerID) {
        this.addChild(new UI_Visit_Tab_Main(playerID));
        // this.visitLayer = new UI_Visit_Main(playerID);
        // this.addChild(this.visitLayer);
    };
    UILayer.prototype.closeVisit = function () {
        if (this.visitLayer != null) {
            this.removeChild(this.visitLayer);
            this.visitLayer = null;
        }
    };
    return UILayer;
}(BaseLayer));
__reflect(UILayer.prototype, "UILayer");
//# sourceMappingURL=UILayer.js.map