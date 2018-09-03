var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图相关算法
 * @author nodep
 * @version 1.0
 */
var MapUtil = (function () {
    function MapUtil() {
    }
    /**
     * 通过坐标和格子的宽高获取所在格子x_y
     */
    MapUtil.getDiamondKeyX_YFromPos = function (px, py, gridW, gridH) {
        px += gridW / 2;
        var xIndex = Math.floor(px / gridW);
        var yIndex = Math.floor(py / gridH);
        var leftCut = px - xIndex * gridW;
        var upCut = py - yIndex * gridH;
        var leftUp = leftCut / upCut >= 2;
        var rightUp = (gridW - leftCut) / upCut >= 2;
        if (leftUp) {
            if (rightUp)
                return xIndex + "_" + (yIndex * 2); //上
            else
                return xIndex + "_" + (yIndex * 2 + 1); //右
        }
        else {
            if (rightUp)
                return (xIndex - 1) + "_" + (yIndex * 2 + 1); //左
            else
                return xIndex + "_" + (yIndex * 2 + 2); //下
        }
    };
    /**通过格子的编号获取格子中点坐标 */
    MapUtil.getPosByGrid = function (px, py) {
        var p = new egret.Point();
        if (py % 2 == 0) {
            p.x = px * GameConfig.GRID_W;
            p.y = py / 2 * GameConfig.GRID_H;
        }
        else {
            p.x = px * TiledFloorBase.GW + GameConfig.GRID_W / 2;
            p.y = (py - 1) / 2 * TiledFloorBase.GH + GameConfig.GRID_H / 2;
        }
        return p;
    };
    /**
     * 根据像素值获取当前房间自查区域所在的xy
     */
    MapUtil.getRoomPosByPosition = function (px, py) {
        var p = new egret.Point();
        p.x = Math.floor(px / GameConfig.ROOM_CHECK_W);
        p.y = Math.floor(py / GameConfig.ROOM_CHECK_H);
        return p;
    };
    return MapUtil;
}());
__reflect(MapUtil.prototype, "MapUtil");
//# sourceMappingURL=MapUtil.js.map