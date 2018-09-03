var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 装备数据
 */
var EquipData = (function () {
    //初始化位置列表
    function EquipData() {
        /**
         * 位置:装备
         */
        this.posMap = new Map();
    }
    return EquipData;
}());
__reflect(EquipData.prototype, "EquipData");
//# sourceMappingURL=EquipData.js.map