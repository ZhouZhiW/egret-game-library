var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**玩家道具*/
var ItemData = (function () {
    function ItemData() {
        /**材料,包括食物在内*/
        this.materials = [];
        /**书籍,可能具有功能性*/
        this.bookss = [];
        /**关键道具*/
        this.tasks = [];
        /**垃圾*/
        this.rubbishs = [];
    }
    return ItemData;
}());
__reflect(ItemData.prototype, "ItemData");
//# sourceMappingURL=ItemData.js.map