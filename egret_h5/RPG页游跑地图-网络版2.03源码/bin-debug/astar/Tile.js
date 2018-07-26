/**
 *
 * @author
 * 地图模型类 （考虑把A*多余不可以走的格子删除）
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Tile,p=c.prototype;
    p.dispose = function () {
        this.data = null;
    };
    /**
    * 是否为障碍
    * @param startX	始点X坐标
    * @param startY	始点Y坐标
    * @param endX	终点X坐标
    * @param endY	终点Y坐标
    * @return 0为通路 1为障碍 2 为半透明 3 为摆摊位
    */
    p.isBlock = function (startX, startY, endX, endY) {
        var mapWidth = this.data.length;
        var mapHeight = this.data[0].length;
        if (endX < 0 || endX >= mapWidth || endY < 0 || endY >= mapHeight) {
            return Tile.PATH_UNKNOWN;
        }
        return this.data[endX][endY];
    };
    /** 获取目标格数据  */
    p.getTargetTile = function (x, y) {
        return this.isBlock(0, 0, x, y);
    };
    /** 判断A*地图从标是否可以通过的路 true 为可以通过 */
    p.isPass = function (checkX, checkY) {
        var mapWidth = this.data.length;
        var mapHeight = this.data[0].length;
        if (checkX < 0 || checkX >= mapWidth || checkY < 0 || checkY >= mapHeight) {
            return false;
        }
        return this.data[checkX][checkY] != Tile.PATH_BARRIER ? true : false;
    };
    /** 判断改点是否是地图上可以行走的点 */
    p.isPassPoint = function (checkPoint) {
        return this.isPass(checkPoint.x, checkPoint.y);
    };
    /**
    * 判断a点到b点 2点之间的线上是否有障碍物
    * @param startX		始点X坐标
    * @param startY		始点Y坐标
    * @param endX			终点X坐标
    * @param endY			终点Y坐标
    * @param checkDistance 检查点距离
    * @return true为通过 false为不可通过
    */
    p.isPassAToB = function (startX, startY, endX, endY, checkDistance) {
        var a = new egret.Point(startX, startY);
        var b = new egret.Point(endX, endY);
        var distanceAToB = egret.Point.distance(a, b);
        var moveIncrement = this.moveIncrement(a, b, checkDistance);
        var moveDistance = 0;
        while (moveDistance < distanceAToB) {
            a = a.add(moveIncrement);
            moveDistance += checkDistance;
            var checkP = Tile.getTileStageToPoint(a.x, a.y);
            if (this.isPass(checkP.x, checkP.y) == false) {
                return false;
            }
        }
        return true;
    };
    p.moveIncrement = function (startPoint, endPoint, step) {
        var seDistance = egret.Point.distance(startPoint, endPoint);
        var scaleStepLength = step / seDistance;
        var x = (endPoint.x - startPoint.x) * scaleStepLength;
        var y = (endPoint.y - startPoint.y) * scaleStepLength;
        return new egret.Point(x, y);
    };
    /** 获取指定点方法下一点A*格坐标  */
    Tile.getNextPos = function (x, y, dir) {
        var point = new egret.Point();
        point.x = x + Tile.DELTA_X[dir];
        point.y = y + Tile.DELTA_Y[dir];
        return point;
    };
    /**
    * 获取45度A*单元格矩阵坐标
    * @param px    		目标点X坐标
    * @param py    		目标点Y坐标
    * @param tileWidth     单元格宽
    * @param tileHeight    单元格高
    * @return              矩阵点坐标
    */
    Tile.getTileStageToPoint = function (stageX, stageY) {
        //界面坐标 计算以屏幕左上为原点的世界坐标
        var dataTempy = stageX - stageY * 2;
        if (dataTempy < 0) {
            dataTempy -= Tile.TILE_WIDTH;
        }
        var dataTempx = stageY * 2 + stageX;
        var dataTempx1 = (dataTempx + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        var dataTempy1 = (dataTempy + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        //加上偏移
        return new egret.Point(Tile.OFFSET_TAB_X + dataTempx1, Tile.OFFSET_TAB_Y + dataTempy1);
    };
    /**
    * 获取45度A*单元格矩阵坐标转舞台从标（获得的是格子的中心点坐标）
    * @param stageX    		舞台X坐标
    * @param stageY    		舞台Y坐标
    * @param tileWidth     单元格宽
    * @param tileHeight    单元格高
    * @return              矩阵点坐标
    */
    Tile.getTilePointToStage = function (px, py) {
        var viewMouse = new egret.Point();
        var nOffX = px - Tile.OFFSET_TAB_X;
        var nOffY = py - Tile.OFFSET_TAB_Y;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH; // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT; // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        return viewMouse;
    };
    Tile.getTileStageToPointByOffset = function (stageX, stageY, offsetX, offsetY) {
        //界面坐标 计算以屏幕左上为原点的世界坐标
        var dataTempy = stageX - stageY * 2;
        if (dataTempy < 0) {
            dataTempy -= Tile.TILE_WIDTH;
        }
        var dataTempx = stageY * 2 + stageX;
        var dataTempx1 = (dataTempx + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        var dataTempy1 = (dataTempy + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        //加上偏移
        return new egret.Point(offsetX + dataTempx1, offsetY + dataTempy1);
    };
    Tile.getTilePointToStageByOffset = function (px, py, offsetX, offsetY) {
        var viewMouse = new egret.Point();
        var nOffX = px - offsetX;
        var nOffY = py - offsetY;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH; // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT; // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        return viewMouse;
    };
    /**
    * 生成地图数据
    * @param mapWidth    	地图宽
    * @param mapHeight    	地图高
    * @param tileWidth     单元格宽
    * @param tileHeight    单元格高
    * @return              地图二维数组
    */
    Tile.createMapData = function (mapWidth, mapHeight, tileWidth, tileHeight) {
        var arr = new Array();
        var w = tileWidth / 2;
        var h = tileHeight / 2;
        var col = mapWidth % tileWidth == 0 ? mapWidth / tileWidth : mapWidth / tileWidth + 1;
        var row = mapHeight % tileHeight == 0 ? mapHeight / tileHeight : mapHeight / tileHeight + 1;
        for (var i = 0; i < col; i++) {
            arr[i] = new Array();
            for (var j = 0; j < row; j++) {
                arr[i][j * 2] = 0;
                arr[i][(j * 2) + 1] = 0;
            }
        }
        return arr;
    };
    /** 获取A*格两点的格子数距离  */
    Tile.distance = function (startX, startY, endX, endY) {
        var dx = Math.abs(startX - endX);
        var dy = Math.abs(startY - endY);
        return Math.max(dx, dy);
    };
    /** 通过A*格获取移动方法  */
    Tile.direction = function (startX, startY, endX, endY) {
        if (startX < endX) {
            if (startY < endY) {
                return 6;
            }
            else if (startY > endY) {
                return 2;
            }
            else {
                return 3;
            }
        }
        else if (startX > endX) {
            if (startY < endY) {
                return 8;
            }
            else if (startY > endY) {
                return 4;
            }
            else {
                return 7;
            }
        }
        else {
            if (startY < endY) {
                return 9;
            }
            else if (startY > endY) {
                return 1;
            }
        }
        return 0;
    };
    Tile.PATH_UNKNOWN = -1; // 未知数据
    Tile.PATH_PASS = 0; // 路径中 0 为可以通过
    Tile.PATH_BARRIER = 1; // 路径中 1 为障碍
    Tile.PATH_TRANSLUCENCE = 2; // 路径中 2 为半透明
    Tile.PATH_CLOSED_AREAS = 3; // 路径中 3 为封闭区的路径（只能跳进去）
    Tile.OFFSET_TAB_X = 0; // A*数据偏移X值
    Tile.OFFSET_TAB_Y = 0; // A*数据偏移Y值
    Tile.TILE_WIDTH = 0; // A*格子宽
    Tile.TILE_HEIGHT = 0; // A*格子高
    Tile.TITE_HALF_WIDTH = 0; // A*格子一半宽
    Tile.TITE_HALF_HEIGHT = 0; // A*格子一半高
    Tile.DELTA_X = [0, 0, 1, 1, -1, 0, 1, -1, -1, 0, 0];
    Tile.DELTA_Y = [0, -1, -1, 0, -1, 0, 1, 0, 1, 1, 0];
    return Tile;
})(egret.HashObject);
egret.registerClass(Tile,'Tile',["ITile"]);
//# sourceMappingURL=Tile.js.map