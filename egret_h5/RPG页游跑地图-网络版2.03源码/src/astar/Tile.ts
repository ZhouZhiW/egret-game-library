/**
 *
 * @author 
 * 地图模型类 （考虑把A*多余不可以走的格子删除）
 */
class Tile extends egret.HashObject implements ITile{
    public static PATH_UNKNOWN: number = -1;        // 未知数据
    public static PATH_PASS: number = 0;            // 路径中 0 为可以通过
    public static PATH_BARRIER: number = 1;         // 路径中 1 为障碍
    public static PATH_TRANSLUCENCE: number = 2;    // 路径中 2 为半透明
    public static PATH_CLOSED_AREAS: number = 3;    // 路径中 3 为封闭区的路径（只能跳进去）
    
    public static OFFSET_TAB_X: number = 0;         // A*数据偏移X值
    public static OFFSET_TAB_Y: number = 0;         // A*数据偏移Y值
    public static TILE_WIDTH: number = 0;           // A*格子宽
    public static TILE_HEIGHT: number = 0;          // A*格子高
    public static TITE_HALF_WIDTH: number = 0;      // A*格子一半宽
    public static TITE_HALF_HEIGHT: number = 0;     // A*格子一半高
    
    public static DELTA_X: Array<any> = [0,0,1,1,-1,0,1,-1,-1,0,0];
    public static DELTA_Y: Array<any> = [0,-1,-1,0,-1,0,1,0,1,1,0];
    
    public data: Array<any>;                        // 地图数据
	
    public dispose() {
        this.data = null;
    }
    /**
	* 是否为障碍
	* @param startX	始点X坐标
	* @param startY	始点Y坐标
	* @param endX	终点X坐标
	* @param endY	终点Y坐标
	* @return 0为通路 1为障碍 2 为半透明 3 为摆摊位
	*/
    public isBlock(startX: number,startY: number,endX: number,endY: number): number {
        var mapWidth: number = this.data.length;
        var mapHeight: number = this.data[0].length;
        if(endX < 0 || endX >= mapWidth || endY < 0 || endY >= mapHeight) {
            return Tile.PATH_UNKNOWN;
        }
        return this.data[endX][endY];
    }
    
    /** 获取目标格数据  */
    public getTargetTile(x: number,y: number): number {
        return this.isBlock(0,0,x,y);
    }
    
    /** 判断A*地图从标是否可以通过的路 true 为可以通过 */
    public isPass(checkX: number,checkY: number): boolean {
        var mapWidth: number = this.data.length;
        var mapHeight: number = this.data[0].length;
        if(checkX < 0 || checkX >= mapWidth || checkY < 0 || checkY >= mapHeight) {
            return false;
        }
        return this.data[checkX][checkY] != Tile.PATH_BARRIER ? true : false;
    }
    
    /** 判断改点是否是地图上可以行走的点 */
    public isPassPoint(checkPoint: egret.Point): boolean {
        return this.isPass(checkPoint.x,checkPoint.y);
    }
    
    /**
	* 判断a点到b点 2点之间的线上是否有障碍物
	* @param startX		始点X坐标
	* @param startY		始点Y坐标
	* @param endX			终点X坐标
	* @param endY			终点Y坐标
	* @param checkDistance 检查点距离
	* @return true为通过 false为不可通过
	*/
    public isPassAToB(startX: number,startY: number,endX: number,endY: number,checkDistance: number): boolean {
        var a: egret.Point = new egret.Point(startX,startY);
        var b: egret.Point = new egret.Point(endX,endY);
        var distanceAToB: number = egret.Point.distance(a,b);
        var moveIncrement: egret.Point = this.moveIncrement(a,b,checkDistance);
        var moveDistance: number = <any>0;
        while(moveDistance < distanceAToB) {
            a = a.add(moveIncrement);
            moveDistance += checkDistance;
            var checkP: egret.Point = Tile.getTileStageToPoint(a.x,a.y);
            if(this.isPass(checkP.x,checkP.y) == false) {
                return false;
            }
        }
        return true;
    }
    
    private moveIncrement(startPoint: egret.Point,endPoint: egret.Point,step: number): egret.Point {
        var seDistance: number = egret.Point.distance(startPoint,endPoint);
        var scaleStepLength: number = step / seDistance;
        var x: number = (endPoint.x - startPoint.x) * scaleStepLength;
        var y: number = (endPoint.y - startPoint.y) * scaleStepLength;
        return new egret.Point(x,y);
	}
    
    /** 获取指定点方法下一点A*格坐标  */
    public static getNextPos(x: number,y: number,dir: number): egret.Point {
        var point: egret.Point = new egret.Point();
        point.x = x + Tile.DELTA_X[dir];
        point.y = y + Tile.DELTA_Y[dir];
        return point;
    }
    
    /**
	* 获取45度A*单元格矩阵坐标
	* @param px    		目标点X坐标
	* @param py    		目标点Y坐标
	* @param tileWidth     单元格宽
	* @param tileHeight    单元格高
	* @return              矩阵点坐标
	*/
    public static getTileStageToPoint(stageX: number,stageY: number): egret.Point {
        //界面坐标 计算以屏幕左上为原点的世界坐标
        var dataTempy: number = stageX - stageY * 2;
        if(dataTempy < 0) {
            dataTempy -= Tile.TILE_WIDTH;
        }
        var dataTempx: number = stageY * 2 + stageX;
        var dataTempx1: number = (dataTempx + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        var dataTempy1: number = (dataTempy + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        //加上偏移
        return new egret.Point(Tile.OFFSET_TAB_X + dataTempx1,Tile.OFFSET_TAB_Y + dataTempy1);
    }
    
    /**
	* 获取45度A*单元格矩阵坐标转舞台从标（获得的是格子的中心点坐标）
	* @param stageX    		舞台X坐标
	* @param stageY    		舞台Y坐标
	* @param tileWidth     单元格宽
	* @param tileHeight    单元格高
	* @return              矩阵点坐标
	*/
    public static getTilePointToStage(px: number,py: number): egret.Point {
        var viewMouse: egret.Point = new egret.Point();
        var nOffX: number = px - Tile.OFFSET_TAB_X;
        var nOffY: number = py - Tile.OFFSET_TAB_Y;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH;      // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT;    // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        return viewMouse;
    }
    
    
    public static getTileStageToPointByOffset(stageX: number,stageY: number,offsetX: number,offsetY: number): egret.Point {
        //界面坐标 计算以屏幕左上为原点的世界坐标
        var dataTempy: number = stageX - stageY * 2;
        if(dataTempy < 0) {
            dataTempy -= Tile.TILE_WIDTH;
        }
        var dataTempx: number = stageY * 2 + stageX;
        var dataTempx1: number = (dataTempx + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        var dataTempy1: number = (dataTempy + Tile.TITE_HALF_WIDTH) / Tile.TILE_WIDTH;
        //加上偏移
        return new egret.Point(offsetX + dataTempx1,offsetY + dataTempy1);
    }
    
    
    public static getTilePointToStageByOffset(px: number,py: number,offsetX: number,offsetY: number): egret.Point {
        var viewMouse: egret.Point = new egret.Point();
        var nOffX: number = px - offsetX;
        var nOffY: number = py - offsetY;
        viewMouse.x = nOffX * Tile.TITE_HALF_WIDTH + nOffY * Tile.TITE_HALF_WIDTH;      // 斜坐标 x每加1   竖坐标x+1/2  y+1/2
        viewMouse.y = nOffX * Tile.TITE_HALF_HEIGHT - nOffY * Tile.TITE_HALF_HEIGHT;    // 斜坐标 y每加1   竖坐标x+1/2  y-1/2
        return viewMouse;
    }
    
    /**
	* 生成地图数据
	* @param mapWidth    	地图宽
	* @param mapHeight    	地图高
	* @param tileWidth     单元格宽
	* @param tileHeight    单元格高
	* @return              地图二维数组
	*/
    public static createMapData(mapWidth: number,mapHeight: number,tileWidth: number,tileHeight: number): Array<any> {
        var arr: Array<any> = new Array();
        var w: number = tileWidth / 2;
        var h: number = tileHeight / 2;
        var col: number = mapWidth % tileWidth == 0 ? mapWidth / tileWidth : mapWidth / tileWidth + 1;
        var row: number = mapHeight % tileHeight == 0 ? mapHeight / tileHeight : mapHeight / tileHeight + 1;
        for(var i: number = 0;i < col;i++) {
            arr[i] = new Array();
            for(var j: number = 0;j < row;j++) {
                arr[i][j * 2] = 0;
                arr[i][(j * 2) + 1] = 0;
            }
        }
        return arr;
    }

    /** 获取A*格两点的格子数距离  */
    public static distance(startX: number,startY: number,endX: number,endY: number): number {
        var dx: number = Math.abs(startX - endX);
        var dy: number = Math.abs(startY - endY);
        return Math.max(dx,dy);
    }
    
    /** 通过A*格获取移动方法  */
    public static direction(startX: number,startY: number,endX: number,endY: number): number {
        if(startX < endX) {
            if(startY < endY) {
                return 6;
            }
            else if(startY > endY) {
                return 2;
            }
            else {
                return 3;
            }
        }
        else if(startX > endX) {
            if(startY < endY) {
                return 8;
            }
            else if(startY > endY) {
                return 4;
            }
            else {
                return 7;
            }
        }
        else {
            if(startY < endY) {
                return 9;
            }
            else if(startY > endY) {
                return 1;
            }
        }
        return 0;
    }
    
}
