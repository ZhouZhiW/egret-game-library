var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestBG = (function (_super) {
    __extends(TestBG, _super);
    function TestBG() {
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        _this.source = "resource/res/base/base_black_bg.png";
        return _this;
        // this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    TestBG.prototype.init = function () {
        if (this.width < 70) {
            this.width = this.parent.width;
            this.height = this.parent.height;
        }
    };
    return TestBG;
}(eui.Image));
__reflect(TestBG.prototype, "TestBG");
//# sourceMappingURL=TestBG.js.map