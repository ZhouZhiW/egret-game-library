var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        return _super.call(this) || this;
    }
    NPC.prototype.beTouched = function (event) {
        console.log("npc be Touched");
    };
    return NPC;
}(RoleBase));
__reflect(NPC.prototype, "NPC");
//# sourceMappingURL=NPC.js.map