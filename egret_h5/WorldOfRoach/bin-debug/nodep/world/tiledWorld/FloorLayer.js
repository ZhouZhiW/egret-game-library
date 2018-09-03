var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 地表容器
 * 采用均衡帧的方式来创建地砖,删除不做控制
 * @author nodep
 * @version 1.0
 */
var FloorLayer = (function (_super) {
    __extends(FloorLayer, _super);
    function FloorLayer(worldW, worldH) {
        var _this = _super.call(this) || this;
        _this._startX = -10000; //当前显示的矩形框体x坐标
        _this._startY = -10000; //当前显示的矩形框体y坐标
        //----------------当前显示的格子范围------------------
        _this._gridX_from = -1;
        _this._gridX_to = -1;
        _this._gridY_from = -1;
        _this._gridY_to = -1;
        //----------------均衡负载相关---------------
        _this._balance = 5; //均衡创建
        _this._addCount = 0; //每帧创建计数器
        //-----------------地板--------------------
        _this._floorMap = new Map(); //已创建的地板
        _this._errorFloor = new Array(); //具有错误地表的地板
        _this._preAddFloors = []; //均衡用预加载地表
        _this._errorFloorDic = new Map();
        _this._changeDrawCount = 0;
        FloorLayer.floorSelf = _this;
        _this._offsetW = GameConfig.OFFSET_W;
        _this._offsetH = GameConfig.OFFSET_H;
        _this._gridW = GameConfig.GRID_W;
        _this._gridH = GameConfig.GRID_H;
        _this._gridW_HALF = _this._gridW / 2;
        _this._gridH_HALF = _this._gridH / 2;
        //计算得到在当前屏幕尺寸下,横向需要展现的格子数量，纵向需要展现的格子数量
        _this._wCount = Math.round((WinsManager.getIns().gameStage().stageWidth / WinsManager.scaleX + _this._offsetW * 2) / _this._gridW) + 2;
        _this._hCount = Math.round((WinsManager.getIns().gameStage().stageHeight / WinsManager.scaleY + _this._offsetH * 2) / _this._gridH) + 3;
        _this._hCount = _this._hCount * 2;
        _this._maxGridW = Math.floor(worldW / _this._gridW);
        _this._maxGridH = Math.floor(worldH / _this._gridH * 2);
        TiledFloorBase.GW = _this._gridW;
        TiledFloorBase.GH = _this._gridH;
        TiledFloorBase.GW_HALF = _this._gridW / 2;
        TiledFloorBase.GH_HALF = _this._gridH / 2;
        return _this;
    }
    /**单纯获取地表类型 */
    FloorLayer.prototype.getStandType = function (xp, yp) {
        var key = MapUtil.getDiamondKeyX_YFromPos(xp, yp, this._gridW, this._gridH);
        var ifloor = this._floorMap.get(key);
        this._standOn = ifloor; //保存当前所在地板
        switch (ifloor.getType()) {
            case LloydMapData.SEA: return StandType.SEA;
            case LloydMapData.LAKE: return StandType.LAKE;
            default: return StandType.LAND;
        }
    };
    //预添加地板
    FloorLayer.prototype.preAddFloor = function (px, py) {
        var key = px + "_" + py;
        if (this._floorMap.get(key) != null)
            return;
        this._preAddFloors.push(px);
        this._preAddFloors.push(py);
    };
    //均衡添加地板
    FloorLayer.prototype.balanceAddFloor = function (px, py) {
        var key = px + "_" + py;
        if (this._floorMap.get(key) != null)
            return;
        this._addCount++;
        var floor = new TiledFloorBase();
        floor.createFloor(this, px, py);
        this._floorMap.set(key, floor);
        if (floor.fType < 0)
            floor.reCreate(this.getRealType(floor.fType, floor.x, floor.y));
    };
    //添加地板
    FloorLayer.prototype.addFloor = function (px, py) {
        var key = px + "_" + py;
        if (this._floorMap.get(key) != null)
            return;
        var floor = new TiledFloorBase();
        floor.createFloor(this, px, py);
        this._floorMap.set(key, floor);
        if (floor.fType < 0)
            this._errorFloor.push(floor);
    };
    //删除地板
    FloorLayer.prototype.delFloor = function (key) {
        if (this._floorMap.get(key) != null) {
            this._floorMap.get(key).removeFloor();
            this._floorMap.delete(key);
        }
    };
    /**更改删除和添加列表 */
    FloorLayer.prototype.changeDeleteAndCreate = function (x1, x2, y1, y2) {
        var px = this._gridX_from;
        var py = this._gridY_from;
        //删除不需要的
        for (px; px <= this._gridX_to; px++) {
            for (py = this._gridY_from; py <= this._gridY_to; py++) {
                if ((px < x1 || px > x2) || (py < y1 || py > y2)) {
                    this.delFloor(px + "_" + py);
                }
            }
        }
        px = x1;
        py = y1;
        for (px; px <= x2; px++) {
            for (py = y1; py <= y2; py++) {
                this.preAddFloor(px, py);
            }
        }
        this._gridX_from = x1;
        this._gridX_to = x2;
        this._gridY_from = y1;
        this._gridY_to = y2;
    };
    //初始化
    FloorLayer.prototype.initCreate = function (x1, x2, y1, y2) {
        var px;
        var py;
        //创建必须的
        this._addCount = 0;
        px = x1;
        py = y1;
        for (px; px <= x2; px++) {
            for (py = y1; py <= y2; py++) {
                this.addFloor(px, py);
            }
        }
        //处理地图类型异常的地表
        while (this._errorFloor.length > 0) {
            var baseFloor = this._errorFloor.pop();
            baseFloor.reCreate(this.getRealType(baseFloor.fType, baseFloor.x, baseFloor.y));
        }
        this._gridX_from = x1;
        this._gridX_to = x2;
        this._gridY_from = y1;
        this._gridY_to = y2;
    };
    /**
     * 算法过于复杂且无法回滚
     * 所以直接采用取最近多边形的方法
     */
    FloorLayer.prototype.getRealType = function (cType, px, py) {
        if (this._errorFloorDic.get(px + "_" + py) != null)
            return this._errorFloorDic.get(px + "_" + py);
        cType = Tiled_Ground.getIns().getFloorTypeByArea(px + this._gridW_HALF, py + this._gridH_HALF);
        this._errorFloorDic.set(px + "_" + py, cType);
        return cType;
    };
    //初始化格子
    FloorLayer.prototype.initTileds = function (sx, sy) {
        var gridX_1 = Math.floor(sx / this._gridW) - 1;
        var gridX_2 = gridX_1 + this._wCount;
        var gridY_1 = (Math.floor(sy / this._gridH) - 1) * 2;
        var gridY_2 = gridY_1 + this._hCount;
        if (gridX_1 < 0)
            gridX_1 = 0;
        if (gridX_2 > this._maxGridW)
            gridX_2 = this._maxGridW;
        if (gridY_1 < 0)
            gridY_1 = 0;
        if (gridY_2 > this._maxGridH)
            gridY_2 = this._maxGridH;
        this.initCreate(gridX_1, gridX_2, gridY_1, gridY_2);
    };
    /**
     * 拼装地板
     * 用一个字典来存放（key->格子编号）
     * 计算左上角的点对应的格子编号(可以得到应该显示的格子编号范围)
     * 通过和上一次格子的移动方向对比，可以确定删除哪些，同时可以确定添加哪些
     * 添加格子的时候直接取baseMap像素*系数可获得格子位置
     * 通过像素和格子的宽度和高度，可以获得当前格子的编号
     * 通过格子编号可获得格子坐标
     */
    FloorLayer.prototype.synTileds = function (sx, sy) {
        var gridX_1 = Math.floor(sx / this._gridW) - 1;
        var gridX_2 = gridX_1 + this._wCount;
        var gridY_1 = (Math.floor(sy / this._gridH) - 1) * 2;
        var gridY_2 = gridY_1 + this._hCount;
        if (gridX_1 < 0)
            gridX_1 = 0;
        if (gridX_2 > this._maxGridW)
            gridX_2 = this._maxGridW;
        if (gridY_1 < 0)
            gridY_1 = 0;
        if (gridY_2 > this._maxGridH)
            gridY_2 = this._maxGridH;
        this.changeDeleteAndCreate(gridX_1, gridX_2, gridY_1, gridY_2);
    };
    /**初始化到指定的xy */
    FloorLayer.prototype.initPosition = function (toX, toY) {
        this._startX = toX;
        this._startY = toY;
        this.initTileds(this._startX - this._offsetW, this._startY - this._offsetH);
    };
    /**同步到指定的x,y */
    FloorLayer.prototype.synPosition = function (toX, toY) {
        if (Math.abs(this._startX - toX) > this._offsetW || Math.abs(this._startY - toY) > this._offsetH) {
            this._changeDrawCount++;
            if (this._changeDrawCount >= 10) {
                this._errorFloorDic.clear();
                this._changeDrawCount = 0;
            }
            this._preAddFloors = [];
            this._startX = toX;
            this._startY = toY;
            this.synTileds(this._startX - this._offsetW, this._startY - this._offsetH);
        }
        if (this._preAddFloors.length <= 0)
            return true;
        this._addCount = 0;
        while (this._preAddFloors.length > 0 && this._addCount < this._balance)
            this.balanceAddFloor(this._preAddFloors.shift(), this._preAddFloors.shift());
        return false;
    };
    return FloorLayer;
}(egret.DisplayObjectContainer));
__reflect(FloorLayer.prototype, "FloorLayer");
//# sourceMappingURL=FloorLayer.js.map