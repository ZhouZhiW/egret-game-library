var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtils = (function () {
    function GameUtils() {
    }
    /**
     * 获取当前的地图数据信息
     */
    GameUtils.parseMapData = function (curLevel) {
        Configs.mapDatas = RES.getRes("map" + curLevel + "_json");
    };
    /**
     * 通过奔跑的距离获取当前应该生成的地图资源数据
     */
    GameUtils.getLocalLookAtByDistance = function (distance) {
        // let mapDatasStr = JSON.stringify(Configs.mapDatas);
        // let curMapDatas = JSON.parse(mapDatasStr);
        var mapDatas = Configs.mapDatas;
        var layers = mapDatas.layers;
        var len = layers.length;
        // var groundLayer = mapDatas.layers[1].objects;
        // var groundBigLayer = mapDatas.layers[2].objects;
        // var groundLayes = mapDatas.layers[3].objects;
        // var spineLayer = mapDatas.layers[4].objects;
        // var spineBigLayer = mapDatas.layers[5].objects;
        // var goldLayer = mapDatas.layers[6].objects;
        // var stoneLayer = mapDatas.layers[7].objects;
        // var boxLayer = mapDatas.layers[8].objects;
        // this.parseLayers(groundLayer, distance);
        var createDatas = {};
        for (var i = 0; i < len; i++) {
            var flag = layers[i];
            createDatas[flag.name] = this.parseLayers(flag.objects, distance);
        }
        return createDatas;
    };
    GameUtils.parseLayers = function (layers, distance) {
        var arr = [];
        var len = layers.length;
        var clone = JSON.parse(JSON.stringify(layers));
        for (var i = 0; i < len; i++) {
            var obj = clone[i];
            if (obj.x > (distance - Const.SW) && obj.x < (distance + 100)) {
                obj.x = obj.x - distance + Const.SW;
                arr.push(obj);
                layers.splice(i, 1);
            }
            else {
                continue;
            }
        }
        return arr;
    };
    /**
     * 游戏更新的距离
     */
    GameUtils.gameDistance = 0;
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
//# sourceMappingURL=GameUtils.js.map