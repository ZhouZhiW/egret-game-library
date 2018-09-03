var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**道具类型*/
var ItemType = (function () {
    function ItemType() {
    }
    return ItemType;
}());
/**材料,包括食物在内*/
ItemType.material = 1;
/**书籍,可能具有功能性*/
ItemType.book = 2;
/**关键道具*/
ItemType.task = 3;
/**垃圾*/
ItemType.rubbish = 4;
/**药水 */
ItemType.mdc = 5;
__reflect(ItemType.prototype, "ItemType");
//# sourceMappingURL=ItemType.js.map