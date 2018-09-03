var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 房间创建器
 * 经过测试得出结论,房间的创建要在地图创建之初就初始化好并且写到本地
 * @author nodep
 * @version 1.0
 */
var RoomMaker = (function () {
    function RoomMaker() {
        this._id = 1;
        //地形计数器
        this._counter = new Map();
        this._plantCounter = new Map();
        this._plantRandomArea = new Map();
        this._waitForDelPlants = [];
        this._focusPlants = [];
        this._maxWPos = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_CHECK_W);
        this._maxHPos = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_CHECK_H);
        this._sgWCount = Math.floor(GameConfig.ROOM_CHECK_W / GameConfig.GRID_W);
        this._sgHCount = Math.floor(GameConfig.ROOM_CHECK_H / GameConfig.GRID_H) * 2;
        GameConfig.map_cfx = GameConfig.WORD_W / GameData.mapData.baseMap._bitmapWidth;
        GameConfig.map_cfy = GameConfig.WORD_H / GameData.mapData.baseMap._bitmapHeight;
    }
    RoomMaker.getIns = function () {
        if (RoomMaker._ins == null)
            RoomMaker._ins = new RoomMaker();
        return RoomMaker._ins;
    };
    /**初始化创建 */
    RoomMaker.prototype.initCreate = function (fromX, fromY) {
        var initLst = [];
        var tox;
        var toy;
        var key;
        for (var i = 0; i < RoomMaker._grids.length; i += 2) {
            tox = fromX + RoomMaker._grids[i];
            toy = fromY + RoomMaker._grids[i + 1];
            if (tox < 0 || toy < 0 || tox >= this._maxWPos || toy > this._maxHPos)
                continue;
            key = tox + "_" + toy;
            if (GameData.plantData.hasPlantArea(key))
                GameData.plantData.loadArea(key);
            else {
                GameData.plantData.createArea(key);
                this.createArea(tox, toy);
            }
            initLst.push(key);
        }
        this.delArea(initLst);
    };
    /**同步创建 */
    RoomMaker.prototype.synCreate = function (fromX, fromY) {
        var initLst = [];
        var tox;
        var toy;
        var key;
        for (var i = 0; i < RoomMaker._grids.length; i += 2) {
            tox = fromX + RoomMaker._grids[i];
            toy = fromY + RoomMaker._grids[i + 1];
            if (tox < 0 || toy < 0 || tox >= this._maxWPos || toy > this._maxHPos)
                continue;
            key = tox + "_" + toy;
            if (GameData.plantData.hasPlantArea(key))
                GameData.plantData.loadArea(key);
            else {
                GameData.plantData.createArea(key);
                this.createArea(tox, toy);
            }
            initLst.push(key);
        }
        this.delArea(initLst);
    };
    //过滤区域,方便维护(在玩家比较空闲的时候来做删除操作)
    RoomMaker.prototype.delArea = function (newLst) {
        var key;
        var keyStr;
        //保留准备删除的
        for (key in newLst) {
            keyStr = newLst[key];
            var index = this._waitForDelPlants.indexOf(keyStr);
            if (index >= 0)
                this._waitForDelPlants.splice(index, 1);
        }
        //删除不需要的
        for (key in this._focusPlants) {
            keyStr = this._focusPlants[key];
            if (newLst.indexOf(keyStr) < 0 && this._waitForDelPlants.indexOf(keyStr) < 0)
                this._waitForDelPlants.push(keyStr); //等待删除
        }
        this._focusPlants = newLst;
    };
    /**立即创建某个区域的数据 */
    RoomMaker.prototype.createArea = function (fromX, fromY) {
        //初始化计数器
        var key;
        var ft;
        for (key in LloydMapData._fixFloorTypes) {
            ft = LloydMapData._fixFloorTypes[key];
            if (ft == LloydMapData.SEA || ft == LloydMapData.LAKE)
                continue;
            this._counter.set(ft, 0);
            this._plantRandomArea.set(ft, []);
        }
        var lst = new Array();
        var x1 = fromX * this._sgWCount;
        var x2 = x1 + this._sgWCount;
        var y1 = fromY * this._sgHCount;
        var y2 = y1 + this._sgHCount;
        var pos;
        var ft;
        for (x1; x1 < x2; x1++) {
            for (var j = y1; j < y2; j += 2) {
                pos = MapUtil.getPosByGrid(x1, j);
                ft = GameData.mapData.getFloorTypeByPx(pos.x, pos.y);
                if (ft <= 0)
                    continue;
                else if (ft == LloydMapData.SEA || ft == LloydMapData.LAKE)
                    continue;
                var c = this._counter.get(ft);
                c++;
                this._plantRandomArea.get(ft).push(x1);
                this._plantRandomArea.get(ft).push(j);
                if (c == 1)
                    this._plantCounter.set(ft, this.getRandomPlantType(ft));
                else if (c >= this._plantCounter.get(ft)["count"]) {
                    c = 0;
                    lst.push(this.getPlant(this._plantCounter.get(ft), this._plantRandomArea.get(ft)));
                    this._plantRandomArea.set(ft, []);
                }
                this._counter.set(ft, c);
            }
        }
        GameData.plantData.initArea(fromX + "_" + fromY, lst);
        SaveManager.getIns().savePlants(fromX + "_" + fromY, JSON.stringify(lst));
    };
    /**通过模版文件和范围获取一个植物数据对象 */
    RoomMaker.prototype.getPlant = function (target, pxes) {
        var obj = new Object();
        obj["id"] = this._id++;
        var ridx = Math.floor(Math.random() * (pxes.length / 2)) * 2;
        var gx = pxes[ridx];
        var gy = pxes[ridx + 1];
        var centerPoint = MapUtil.getPosByGrid(gx, gy);
        obj["x"] = Math.floor(centerPoint.x - GameConfig.GRID_W / 4 + Math.random() * GameConfig.GRID_W / 2);
        obj["y"] = Math.floor(centerPoint.y - GameConfig.GRID_H / 4 + Math.random() * GameConfig.GRID_H / 2);
        obj["key"] = Math.floor(centerPoint.x / GameConfig.ROOM_GRID_SIZE) + "_" + Math.floor(centerPoint.y / GameConfig.ROOM_GRID_SIZE);
        //这里还缺少配置文件中的一些其他数据,比如生长等
        return obj;
    };
    /**
     * 获取一个随机的植物类型,这里需要通过JSON配置文件来获取
     * @param ft 地板的类型
     * @returns 对应JSON中的植物类型
     */
    RoomMaker.prototype.getRandomPlantType = function (ft) {
        return JSON.parse("{\"count\":8}");
    };
    RoomMaker.prototype.renderUpdate = function (interval) {
    };
    return RoomMaker;
}());
RoomMaker._grids = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, 1, -1, 1, 1, -1, 1, -1, -1];
__reflect(RoomMaker.prototype, "RoomMaker", ["IRender"]);
//# sourceMappingURL=RoomMaker.js.map