var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        return _super.call(this) || this;
    }
    Hero.prototype.beTouched = function (event) {
        console.log("hero be Touched");
    };
    Object.defineProperty(Hero.prototype, "heroUtil", {
        get: function () {
            return this._heroUtil;
        },
        set: function (value) {
            this.roleModel.texture = Comman.getRes(value.roleModel);
            this.roleName.text = value.name;
            this.roleName.font = value.font;
            this._heroUtil = value;
        },
        enumerable: true,
        configurable: true
    });
    return Hero;
}(RoleBase));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map