var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 植物数据,可通过Grid的统计来计算,也可以通过三角形范围内的随机来运算
 * @author nodep
 * @version 1.0
 */
var PlantData = (function () {
    function PlantData() {
        //标志了数据库是否拥有这个植被区
        this._localAreaDic = new Object();
        //标志了当前是否已加载了这个植被区
        this._areaData = new Map();
        //存放植被的树形结构,此结构比区域更小
        this._plantsGrids = new Map();
    }
    /**保存当前存档 */
    PlantData.prototype.resetConfig = function () {
        localStorage.setItem(Server_Map.T_MAP_PLANTS, JSON.stringify(this._localAreaDic));
    };
    /**加载存档 */
    PlantData.prototype.loadConfig = function () {
        var str = localStorage.getItem(Server_Map.T_MAP_PLANTS);
        this._localAreaDic = JSON.parse(str);
    };
    /**创建一个区域数据 */
    PlantData.prototype.createArea = function (key) {
        this._localAreaDic[key] = true;
        this._areaData.set(key, true);
        this.resetConfig();
    };
    /**是否拥有某个区域的数据 */
    PlantData.prototype.hasPlantArea = function (key) {
        if (this._localAreaDic[key] == null)
            return false;
        else
            return true;
    };
    /**
     * 初始化植被区
     * 将这些植物初始化到指定的树形结构中
     */
    PlantData.prototype.initArea = function (key, lst) {
        var strs = key.split("_");
        var gx = Number(strs[0]);
        var gy = Number(strs[1]);
        //上面的数据其实是用不到的
        this.insertPlants(gx, gy, lst);
    };
    /**加载某个区域的数据,如果没有加载的话 */
    PlantData.prototype.loadArea = function (key) {
        if (this._areaData.get(key) != null)
            return;
        //加载这个区域
        this._areaData.set(key, true);
        var jsonStr = localStorage.getItem(Server_Map.T_MAP_PLANTS + key);
        var o = JSON.parse(jsonStr);
        this.initArea(key, o);
    };
    /**获取区域植被 */
    PlantData.prototype.getAreaPlants = function (key) {
        return this._plantsGrids.get(key);
    };
    /**
     * 插入一个区域的植物
     * 这里的px和py属于大的区域坐标
     */
    PlantData.prototype.insertPlants = function (px, py, lst) {
        //px,py为大的区域编号,转换为小的删格编号
        var obj;
        var gx;
        var gy;
        var fromx = px * GameConfig.ROOM_CHECK_W;
        var fromy = py * GameConfig.ROOM_CHECK_H;
        var tox = fromx + GameConfig.ROOM_CHECK_W;
        var toy = fromy + GameConfig.ROOM_CHECK_H;
        for (fromx; fromx < tox; fromx += GameConfig.ROOM_GRID_SIZE) {
            for (var j = fromy; j < toy; j += GameConfig.ROOM_GRID_SIZE) {
                gx = Math.floor(fromx / GameConfig.ROOM_GRID_SIZE);
                gy = Math.floor(j / GameConfig.ROOM_GRID_SIZE);
                this._plantsGrids.set(gx + "_" + gy, new Array());
            }
        }
        var key;
        for (key in lst) {
            obj = lst[key];
            this._plantsGrids.get(obj["key"]).push(obj);
        }
    };
    return PlantData;
}());
__reflect(PlantData.prototype, "PlantData");
//# sourceMappingURL=PlantData.js.map