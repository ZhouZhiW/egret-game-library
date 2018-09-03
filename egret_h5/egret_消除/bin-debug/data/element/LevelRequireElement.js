var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelRequireElement = (function (_super) {
    __extends(LevelRequireElement, _super);
    function LevelRequireElement() {
        //游戏关卡通关条件数据
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.num = 0; //需要消除得元素数量
        return _this;
    }
    return LevelRequireElement;
}(BaseElement));
__reflect(LevelRequireElement.prototype, "LevelRequireElement");
//# sourceMappingURL=LevelRequireElement.js.map