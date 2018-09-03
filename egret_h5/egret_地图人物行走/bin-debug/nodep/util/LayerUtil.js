var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**地图层，NPC层（包括建筑层），迷雾层,不做存储，仅在运行时调用
 *
 */
var LayerUtil = (function () {
    function LayerUtil(mapBlockGroup, npcGroup, fogGroup) {
        this.goodsLayer = new Map();
        //设置地图层
        mapBlockGroup.cacheAsBitmap = true;
        this.goodsLayer.set(GameConfig.MAP_LAYER, mapBlockGroup);
        //设置NPC层
        npcGroup.cacheAsBitmap = true;
        this.goodsLayer.set(GameConfig.NPC_LAYER, npcGroup);
        //设置迷雾层
        fogGroup.cacheAsBitmap = true;
        this.goodsLayer.set(GameConfig.FOG_LAYER, fogGroup);
    }
    return LayerUtil;
}());
__reflect(LayerUtil.prototype, "LayerUtil");
//# sourceMappingURL=LayerUtil.js.map