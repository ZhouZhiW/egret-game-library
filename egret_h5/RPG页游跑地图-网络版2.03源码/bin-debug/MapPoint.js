/**
 *
 * @author
 *
 */
var MapPoint = (function () {
    function MapPoint() {
        /**地图高度*/
        this.mapHeight = MapLoad.mapHeight;
        /**格子高度*/
        this.gridWidth = MapLoad.tileWidth;
        this.gridHeight = MapLoad.tileHeight;
    }
    var d = __define,c=MapPoint,p=c.prototype;
    /**地图坐标 转换为 格子坐标，
 * x，
 * y，
 * OffsetY-地图偏移 ＝ 画板1.高度 ÷ 步长y
 * */
    p.mPoint = function (x, y, OffsetY) {
        var aa = new egret.Point();
        var bx = this.gridWidth;
        var by = this.gridHeight;
        var hx = x + bx;
        var hy = y + by / 2;
        var zx = hy + hx / 2;
        var sx = Math.floor(zx / by - 1);
        var zy = hx - hy * 2;
        var sy = Math.floor(zy / bx + OffsetY);
        //console.log("格子:" + sx + "|" + sy );
        aa.x = sx;
        aa.y = sy;
        return aa;
    };
    /**格子坐标 转换为 地图坐标，
     * x，
     * y，
     * OffsetY-地图偏移 ＝ 画板1.高度 ÷ 步长y
     * */
    p.gPoint = function (x, y, OffsetY) {
        var aa = new egret.Point();
        var m = this.gridHeight;
        var n = m / 2;
        aa.x = m * (x - (OffsetY - y));
        aa.y = n * (x + OffsetY - y);
        //console.log("坐标:" + aa.x + "|" + aa.y);
        return aa;
    };
    /**地图坐标 转换为 地图格子中心点坐标*/
    p.Point_a = function (x, y) {
        return this.Point_a_a(x, y);
    };
    p.Point_a_a = function (x, y) {
        //  ======================还原地图坐标 开始
        var sW = egret.MainContext.instance.stage.stageWidth / 2;
        var sH = egret.MainContext.instance.stage.stageHeight / 2;
        //计算用户点击 与 中心点 的距离
        var downX = Math.abs(x + sW);
        var downY = Math.abs(y + sH);
        /*if(downX && downY) {
            //console.log(x + "|" + y + " , " + downX + "|" + downY);
        } else {
            downX = 0;
            downY = 0;
        }*/
        //  ======================还原地图坐标 结束
        //  ======================测试格子坐标转换 开始
        var h1 = Math.floor(this.mapHeight / this.gridHeight);
        var hh;
        hh = this.mPoint(downX, downY, h1);
        //console.log(hh.x + ":" + hh.y);
        hh = this.gPoint(hh.x, hh.y, h1);
        //console.log(hh.x + ":" + hh.y);
        //  ======================测试格子坐标转换 结束
        downX = Math.abs(hh.x - sW);
        downY = Math.abs(hh.y - sH);
        if (x < 0) {
            hh.x = -downX;
        }
        else {
            hh.x = downX;
        }
        if (y < 0) {
            hh.y = -downY;
        }
        else {
            hh.y = downY;
        }
        return hh;
    };
    /**格子坐标 转换为 地图格子中心点坐标*/
    p.Point_b = function (x, y) {
        return this.Point_b_a(x, y);
    };
    p.Point_b_a = function (x, y) {
        var sW = egret.MainContext.instance.stage.stageWidth / 2;
        var sH = egret.MainContext.instance.stage.stageHeight / 2;
        //  ======================测试格子坐标转换 开始
        var h1 = Math.floor(this.mapHeight / this.gridHeight); //计算偏移OffsetY
        var hh = new egret.Point();
        hh.x = x;
        hh.y = y;
        hh = this.gPoint(hh.x, hh.y, h1);
        //  ======================测试格子坐标转换 结束
        /*var downX: number = Math.abs(hh.x - sW);
        var downY: number = Math.abs(hh.y - sH);
        if(x < 0) {
            hh.x = -downX;
        } else {
            hh.x = downX;
        }
        if(y < 0) {
            hh.y = -downY;
        } else {
            hh.y = downY;
        }
        return hh;*/
        var viewMouse = new egret.Point();
        var nOffX = x - Tile.OFFSET_TAB_X;
        var nOffY = y - Tile.OFFSET_TAB_Y;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH; // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT; // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        viewMouse.x = viewMouse.x;
        viewMouse.y = viewMouse.y / 2;
        return viewMouse;
    };
    /**地图坐标 转换为 格子坐标*/
    p.Point_c = function (x, y) {
        return this.Point_c_a(x, y);
    };
    p.Point_c_a = function (x, y) {
        //  ======================还原地图坐标 开始
        var sW = egret.MainContext.instance.stage.stageWidth / 2;
        var sH = egret.MainContext.instance.stage.stageHeight / 2;
        //计算用户点击 与 中心点 的距离
        var downX = Math.abs(x + sW);
        var downY = Math.abs(y + sH);
        /*if(downX && downY) {
            //console.log(x + "|" + y + " , " + downX + "|" + downY);
        } else {
            //downX = 0;
            //downY = 0;
        }*/
        //console.log(x + "|" + y + " , " + downX + "|" + downY);
        //  ======================还原地图坐标 结束
        //  ======================测试格子坐标转换 开始
        var h1 = Math.floor(this.mapHeight / this.gridHeight);
        var hh;
        hh = this.mPoint(downX, downY, h1);
        //console.log(hh.x + ":" + hh.y);
        //  ======================测试格子坐标转换 结束
        return hh;
    };
    return MapPoint;
})();
egret.registerClass(MapPoint,'MapPoint');
//# sourceMappingURL=MapPoint.js.map