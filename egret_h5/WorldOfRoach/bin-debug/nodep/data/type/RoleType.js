var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleType = (function () {
    function RoleType() {
    }
    return RoleType;
}());
RoleType.ROLE_PLAYER = "ROLE_PLAYER";
RoleType.ROLE_NPC = "ROLE_NPC";
RoleType.ROLE_ANIMAL = "ROLE_ANIMAL"; //动物
RoleType.ROLE_WILD = "ROLE_WILD"; //野兽
RoleType.POLE_PLANT = "POLE_PLANT";
RoleType.PLANT_TREE = "TREE"; //树木
RoleType.PLANT_COLL = "COLL"; //采集
RoleType.GROUND_ITEM = "GROUND_ITEM"; //掉落物
RoleType.ORE = "ORE"; //矿物
RoleType.TRAP = "TRAP"; //陷阱
__reflect(RoleType.prototype, "RoleType");
//# sourceMappingURL=RoleType.js.map