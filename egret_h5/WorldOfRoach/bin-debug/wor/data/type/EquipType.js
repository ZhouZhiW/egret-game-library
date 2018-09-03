var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 装备类型
 */
var EquipType = (function () {
    function EquipType() {
    }
    return EquipType;
}());
/**武器*/
EquipType.weapon = 1;
EquipType.weapon_1 = 1; //单手剑
EquipType.weapon_2 = 2; //双手剑
EquipType.weapon_3 = 3; //匕首
EquipType.weapon_4 = 4; //书籍
EquipType.weapon_5 = 5; //单手斧
EquipType.weapon_6 = 6; //双手斧
EquipType.weapon_7 = 7; //单手棍
EquipType.weapon_8 = 8; //双手棍
/**衣服*/
EquipType.clothes = 2;
/**裤子*/
EquipType.trousers = 3;
/**帽子*/
EquipType.hat = 4;
/**盾牌*/
EquipType.shield = 5;
/**护腿*/
EquipType.leg = 6;
/**手套*/
EquipType.glove = 7;
/**鞋子*/
EquipType.shoe = 8;
/**戒子 x 2*/
EquipType.ring = 9;
/**项链*/
EquipType.necklace = 10;
/**箭*/
EquipType.arrow = 11;
/**远程武器*/
EquipType.pow = 12;
EquipType.pow_1 = 1; //弓
EquipType.pow_2 = 2; //弩
EquipType.pow_3 = 3; //枪
/*布*/
EquipType.weight_1 = "light";
/*皮*/
EquipType.weight_2 = "medium";
/*甲*/
EquipType.weight_4 = "heavy";
__reflect(EquipType.prototype, "EquipType");
//# sourceMappingURL=EquipType.js.map