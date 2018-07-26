/**
 *
 * @author 
 *
 */
class MapPoint {
    /**地图高度*/
    private mapHeight: number = MapLoad.mapHeight;
    /**格子高度*/
    private gridWidth: number = MapLoad.tileWidth;
    private gridHeight: number = MapLoad.tileHeight;
    
	public constructor() {
	}
    /**地图坐标 转换为 格子坐标，
 * x，
 * y，
 * OffsetY-地图偏移 ＝ 画板1.高度 ÷ 步长y
 * */
    private mPoint(x: number,y: number,OffsetY: number): egret.Point {

        var aa: egret.Point = new egret.Point();
        var bx: number = this.gridWidth;
        var by: number = this.gridHeight;
        
        var hx: number = x + bx;
        var hy: number = y + by / 2;
        
        var zx: number = hy + hx / 2;
        var sx: number = Math.floor(zx / by - 1);
        
        var zy: number = hx - hy * 2;
        var sy: number = Math.floor(zy / bx + OffsetY);

        //console.log("格子:" + sx + "|" + sy );
        aa.x = sx;
        aa.y = sy;
        return aa;
    }
    /**格子坐标 转换为 地图坐标，
     * x，
     * y，
     * OffsetY-地图偏移 ＝ 画板1.高度 ÷ 步长y
     * */
    private gPoint(x: number,y: number,OffsetY: number): egret.Point {
        var aa: egret.Point = new egret.Point();
        var m: number = this.gridHeight;
        var n: number = m / 2;
        aa.x = m * (x - (OffsetY - y));
        aa.y = n * (x + OffsetY - y);
        //console.log("坐标:" + aa.x + "|" + aa.y);
        return aa;
    }

    /**地图坐标 转换为 地图格子中心点坐标*/
    public Point_a(x: number,y: number): egret.Point {

        return this.Point_a_a(x,y);
    }
    private Point_a_a(x: number,y: number): egret.Point {
        
        //  ======================还原地图坐标 开始
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        //计算用户点击 与 中心点 的距离
        var downX: number = Math.abs(x + sW);
        var downY: number = Math.abs(y + sH);
        /*if(downX && downY) {
            //console.log(x + "|" + y + " , " + downX + "|" + downY);
        } else {
            downX = 0;
            downY = 0;
        }*/
        //  ======================还原地图坐标 结束
        
        //  ======================测试格子坐标转换 开始
        var h1: number = Math.floor(this.mapHeight / this.gridHeight);
        var hh: egret.Point;
        hh = this.mPoint(downX,downY,h1);
        //console.log(hh.x + ":" + hh.y);
        hh = this.gPoint(hh.x,hh.y,h1);
        //console.log(hh.x + ":" + hh.y);
        //  ======================测试格子坐标转换 结束
        downX = Math.abs(hh.x - sW);
        downY = Math.abs(hh.y - sH);
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
        return hh;
    }
    /**格子坐标 转换为 地图格子中心点坐标*/
    public Point_b(x: number,y: number): egret.Point {
        
        return this.Point_b_a(x,y);
    }
    private Point_b_a(x: number,y: number): egret.Point {
        
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;

        //  ======================测试格子坐标转换 开始
        var h1: number = Math.floor(this.mapHeight / this.gridHeight);//计算偏移OffsetY
        var hh: egret.Point = new egret.Point();
        hh.x = x;
        hh.y = y;
        hh = this.gPoint(hh.x,hh.y,h1);
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
        var viewMouse: egret.Point = new egret.Point();
        var nOffX: number = x - Tile.OFFSET_TAB_X;
        var nOffY: number = y - Tile.OFFSET_TAB_Y;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH;      // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT;    // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        viewMouse.x = viewMouse.x;
        viewMouse.y = viewMouse.y / 2;
        return viewMouse;
    }    
    /**地图坐标 转换为 格子坐标*/
    public Point_c(x: number,y: number): egret.Point {

        return this.Point_c_a(x,y);
    }
    private Point_c_a(x: number,y: number): egret.Point {
        
        //  ======================还原地图坐标 开始
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        //计算用户点击 与 中心点 的距离
        var downX: number = Math.abs(x + sW);
        var downY: number = Math.abs(y + sH);
        /*if(downX && downY) {
            //console.log(x + "|" + y + " , " + downX + "|" + downY);
        } else {
            //downX = 0;
            //downY = 0;
        }*/
        //console.log(x + "|" + y + " , " + downX + "|" + downY);
        //  ======================还原地图坐标 结束

        //  ======================测试格子坐标转换 开始
        var h1: number = Math.floor(this.mapHeight / this.gridHeight);
        var hh: egret.Point;
        hh = this.mPoint(downX,downY,h1);
        //console.log(hh.x + ":" + hh.y);
        //  ======================测试格子坐标转换 结束
        return hh;
    }
}
