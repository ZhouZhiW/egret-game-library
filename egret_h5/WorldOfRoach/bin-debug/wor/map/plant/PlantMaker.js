var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 植物构造器
 */
var PlantMaker = (function () {
    function PlantMaker() {
    }
    /**
     * 获取一个植物
     */
    PlantMaker.getPlant = function (obj) {
        var p = new Plant();
        p.setData(obj);
        p.x = obj["x"];
        p.y = obj["y"];
        return p;
    };
    return PlantMaker;
}());
__reflect(PlantMaker.prototype, "PlantMaker");
//# sourceMappingURL=PlantMaker.js.map