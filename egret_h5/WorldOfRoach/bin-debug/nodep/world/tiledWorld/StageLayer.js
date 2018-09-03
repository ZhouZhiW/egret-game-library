var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 舞台层级,包括一切地标以上的物件与角色
 * 主要包括人物,npc,生物,敌人,植被,矿物
 * 植被:循环计数法创建植被
 * @author nodep
 * @version 1.0
 */
var StageLayer = (function (_super) {
    __extends(StageLayer, _super);
    function StageLayer(ww, wh) {
        var _this = _super.call(this) || this;
        _this._startX = -100000;
        _this._startY = -100000;
        //----------------当前显示的格子范围------------------
        _this._gridX_from = -1;
        _this._gridX_to = -1;
        _this._gridY_from = -1;
        _this._gridY_to = -1;
        //----------------显示对象的维护---------------
        _this._step = -1;
        _this._roleGirds = new Map(); //用于碰撞检测的grids
        _this._hitTestArray = []; //最近一次碰撞检测的数组
        _this._hitTestPoint = new egret.Point(-1, -1); //最近一次碰撞检测的核心点
        StageLayer.self = _this;
        _this._roleLink = new LinkArray();
        _this._roomMaker = new RoomMaker();
        _this._wordW = ww;
        _this._wordH = wh;
        _this._wCount = Math.round((WinsManager.getIns().gameStage().stageWidth / WinsManager.scaleX + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE);
        _this._hCount = Math.round((WinsManager.getIns().gameStage().stageHeight / WinsManager.scaleY + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE) + 1;
        _this._maxRollW = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_GRID_SIZE);
        _this._maxRollH = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_GRID_SIZE);
        StageLayer.__xGridCount = Math.floor(_this._wordW / FloorLayer.floorSelf._gridW);
        StageLayer.__yGridCount = Math.floor(_this._wordH / FloorLayer.floorSelf._gridH) * 2;
        return _this;
    }
    /**
     * 强制初始化一个区域的显示
     */
    StageLayer.prototype.addAreaInit = function (px, py) {
        var areaKey = px + "_" + py;
        var plants = GameData.plantData.getAreaPlants(areaKey);
        //将plants中的所有对象都构建为对应的植物,并添加到链表对象中
        var key;
        var obj;
        var plant;
        for (key in plants) {
            obj = plants[key];
            plant = PlantMaker.getPlant(obj);
            this.addRoleToLink(plant, areaKey);
        }
    };
    /**
     * 删除整个区域的显示(数据不在这里维护,只是删除显示)
     * 通过数据中的ID来进行删除
     */
    StageLayer.prototype.delArea = function (areaKey) {
        var delLst = this._roleGirds.get(areaKey);
        if (delLst != null) {
            while (delLst.length > 0) {
                this.removeRoleFromLink(delLst.pop());
            }
        }
        this._roleGirds.delete(areaKey);
    };
    /**
     * 预加载并显示区域
     */
    StageLayer.prototype.preAddArea = function (px, py) {
        // var plants: Array<Object> = GameData.plantData.getAreaPlants(px + "_" + py);
        // if (plants == null)
        // 	LogTrace.log("植被显示速度超过了植被数据的生成速度");
        var areaKey = px + "_" + py;
        var plants = GameData.plantData.getAreaPlants(areaKey);
        //将plants中的所有对象都构建为对应的植物,并添加到链表对象中
        var key;
        var obj;
        var plant;
        for (key in plants) {
            obj = plants[key];
            plant = PlantMaker.getPlant(obj);
            this.addRoleToLink(plant, areaKey);
        }
    };
    /**
     * 尝试初始化当前屏幕区域
     * 屏幕左上角坐标
     */
    StageLayer.prototype.initSynArea = function (sx, sy) {
        this._rollPx = sx;
        this._rollPy = sy;
        var p = MapUtil.getRoomPosByPosition(sx, sy);
        this._startX = p.x;
        this._startY = p.y;
        this._roomMaker.initCreate(this._startX, this._startY);
        var gridX_1 = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
        var gridX_2 = gridX_1 + this._wCount;
        var gridY_1 = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
        var gridY_2 = gridY_1 + this._hCount;
        if (gridX_1 < 0)
            gridX_1 = 0;
        if (gridX_2 > this._maxRollW)
            gridX_2 = this._maxRollW;
        if (gridY_1 < 0)
            gridY_1 = 0;
        if (gridY_2 > this._maxRollH)
            gridY_2 = this._maxRollH;
        this.initCreate(gridX_1, gridX_2, gridY_1, gridY_2);
        FogForGrid.getIns().updateFogs();
    };
    /**
     * 尝试同步区域
     * 屏幕左上角坐标
     */
    StageLayer.prototype.trySynArea = function (sx, sy) {
        var p = MapUtil.getRoomPosByPosition(sx, sy);
        if (p.x != this._startX || p.y != this._startY) {
            this._startX = p.x;
            this._startY = p.y;
            this._roomMaker.synCreate(this._startX, this._startY);
            return; //由于这一步操作运算量很大,所以这一步不再做任何操作
        }
        //检查是否要滚动
        if (Math.abs(sx - this._rollPx) > GameConfig.ROOM_GRID_SIZE || Math.abs(sy - this._rollPy) > GameConfig.ROOM_GRID_SIZE) {
            this._rollPx = sx;
            this._rollPy = sy;
            this.rollOver();
        }
        if (this._step == 1) {
            FogForGrid.getIns().updateFogs();
            this._step = -1;
        }
    };
    /**
     * 检查需要隐藏哪些,显示哪些
     * 以gameConfig中的room_size为基础,求的当前屏幕显示范围,上下左右各扩展一格
     */
    StageLayer.prototype.rollOver = function () {
        var gridX_1 = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
        var gridX_2 = gridX_1 + this._wCount;
        var gridY_1 = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
        var gridY_2 = gridY_1 + this._hCount;
        if (gridX_1 < 0)
            gridX_1 = 0;
        if (gridX_2 > this._maxRollW)
            gridX_2 = this._maxRollW;
        if (gridY_1 < 0)
            gridY_1 = 0;
        if (gridY_2 > this._maxRollH)
            gridY_2 = this._maxRollH;
        this.changeDeleteAndCreate(gridX_1, gridX_2, gridY_1, gridY_2);
        this._step = 1;
    };
    /**通过坐标获取当前所在房间的Key */
    StageLayer.prototype.getRoomKey = function (px, py) {
        var gridX = Math.floor(px / GameConfig.ROOM_GRID_SIZE);
        var gridY = Math.floor(py / GameConfig.ROOM_GRID_SIZE);
        if (gridX < 0)
            gridX = 0;
        else if (gridX > this._maxRollW)
            gridX = this._maxRollW;
        if (gridY < 0)
            gridY = 0;
        else if (gridY > this._maxRollH)
            gridY = this._maxRollH;
        return new egret.Point(gridX, gridY);
    };
    //重置当前碰撞检测区域
    StageLayer.prototype.resetHitTestArray = function () {
        var i = 0;
        var len = StageLayer._hitRound.length;
        this._hitTestArray = [];
        for (i; i < len; i += 2)
            this._hitTestArray.push((this._hitTestPoint.x + StageLayer._hitRound[i]) + "_" + (this._hitTestPoint.y + StageLayer._hitRound[i + 1]));
    };
    /**
     * 初始化树显示结构
     * 初始化的树显示队列具有排序链表的数据结构,这样可以最大限度的减少后期的排序,只需要自排动态对象
     */
    StageLayer.prototype.initCreate = function (x1, x2, y1, y2) {
        var px = x1;
        var py = y1;
        for (px; px <= x2; px++) {
            for (py = y1; py <= y2; py++) {
                this.addAreaInit(px, py);
            }
        }
        this._gridX_from = x1;
        this._gridX_to = x2;
        this._gridY_from = y1;
        this._gridY_to = y2;
        this._roleLink.buildLink("y");
        this.sortAllChildren(); //初始化排序
    };
    /**更改删除和添加列表 */
    StageLayer.prototype.changeDeleteAndCreate = function (x1, x2, y1, y2) {
        var px = this._gridX_from;
        var py = this._gridY_from;
        //删除不需要的
        for (px; px <= this._gridX_to; px++) {
            for (py = this._gridY_from; py <= this._gridY_to; py++) {
                if ((px < x1 || px > x2) || (py < y1 || py > y2)) {
                    this.delArea(px + "_" + py);
                }
            }
        }
        px = x1;
        py = y1;
        for (px; px <= x2; px++) {
            for (py = y1; py <= y2; py++) {
                this.preAddArea(px, py);
            }
        }
        this._gridX_from = x1;
        this._gridX_to = x2;
        this._gridY_from = y1;
        this._gridY_to = y2;
    };
    //初始化排序
    StageLayer.prototype.sortAllChildren = function () {
        this._roleLink.resetIteration();
        var role;
        var index = 0;
        do {
            role = this._roleLink.next();
            if (role != null)
                this.addChildAt(role, index++);
        } while (role != null);
    };
    /**将一个对象添加到显示链表中 */
    StageLayer.prototype.addRoleToLink = function (lk, areaKey) {
        if (areaKey === void 0) { areaKey = null; }
        var index = this._roleLink.put(lk);
        this.addChildAt(lk, index);
        var irole = lk;
        irole.setAreaKey(areaKey);
        irole.added();
        if (areaKey == null)
            return;
        if (this._roleGirds.get(areaKey) == null)
            this._roleGirds.set(areaKey, new Array());
        this._roleGirds.get(areaKey).push(irole);
    };
    /**删除一个显示对象 */
    StageLayer.prototype.removeRoleFromLink = function (lk, onlySelf) {
        if (onlySelf === void 0) { onlySelf = false; }
        this.removeChild(lk);
        this._roleLink.remove(lk);
        var irole = lk;
        irole.removed();
        if (!onlySelf)
            return;
        var ak = irole.getAreaKey();
        var rlst = this._roleGirds.get(ak);
        if (rlst == null)
            return;
        var index = rlst.indexOf(lk);
        if (index >= 0)
            rlst.splice(index, 1);
    };
    /**在链表中上移一个 */
    StageLayer.prototype.gotoPre = function (lk) {
        var lkIndex = this.getChildIndex(lk);
        this.swapChildrenAt(lkIndex - 1, lkIndex);
        this._roleLink.swapNear(lk, -1);
    };
    /**在链表中下移一个 */
    StageLayer.prototype.gotoNext = function (lk) {
        var lkIndex = this.getChildIndex(lk);
        this.swapChildrenAt(lkIndex, lkIndex + 1);
        this._roleLink.swapNear(lk, 1);
    };
    //碰撞检测与互动检测
    StageLayer.prototype.hitTestRole = function (px, py) {
        var p = this.getRoomKey(px, py);
        if (this._hitTestPoint.x != p.x || this._hitTestPoint.y != p.y) {
            this._hitTestPoint = p;
            this.resetHitTestArray();
        }
        var hit = false;
        var key;
        var roles;
        var role;
        var optNum;
        var maxOptdist = 100000;
        var optRole;
        for (key in this._hitTestArray) {
            roles = this._roleGirds.get(this._hitTestArray[key]);
            if (roles == null)
                continue;
            for (key in roles) {
                role = roles[key];
                optNum = role.tryOption(px, py);
                if (optNum > 0) {
                    if (optNum < maxOptdist)
                        optRole = role;
                    if (!hit && role.hitTestArea(px, py))
                        hit = true;
                }
            }
        }
        WorldManager.getIns().setOptionRole(optRole);
        return hit;
    };
    return StageLayer;
}(egret.DisplayObjectContainer));
StageLayer._hitRound = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, -1, -1, 1, -1, -1, 1, 1, 1];
__reflect(StageLayer.prototype, "StageLayer");
//# sourceMappingURL=StageLayer.js.map