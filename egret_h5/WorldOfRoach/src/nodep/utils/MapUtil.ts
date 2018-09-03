/**
 * 地图相关算法
 * @author nodep
 * @version 1.0
 */
class MapUtil {

	/**
	 * 通过坐标和格子的宽高获取所在格子x_y
	 */
	public static getDiamondKeyX_YFromPos(px: number, py: number, gridW: number, gridH: number): string {
		px += gridW/2;
		var xIndex:number = Math.floor(px / gridW);
		var yIndex:number = Math.floor(py / gridH);
		var leftCut:number = px - xIndex * gridW;
		var upCut:number = py - yIndex * gridH;
		var leftUp: Boolean = leftCut/upCut >= 2;
		var rightUp: Boolean = (gridW - leftCut)/upCut >= 2;
		if (leftUp) {
			if (rightUp)
				return xIndex+"_"+(yIndex * 2);//上
			else
				return xIndex+"_"+(yIndex * 2 + 1);//右
		}
		else {
			if (rightUp)
				return (xIndex-1)+"_"+(yIndex * 2 + 1);//左
			else
				return xIndex+"_"+(yIndex * 2 + 2);//下
		}
	}

	/**通过格子的编号获取格子中点坐标 */
	public static getPosByGrid(px:number,py:number):egret.Point
	{
		var p:egret.Point = new egret.Point();
		if (py % 2 == 0) {//偶数行
			p.x = px*GameConfig.GRID_W;
			p.y = py/2*GameConfig.GRID_H;
		}
		else {
			p.x = px*TiledFloorBase.GW + GameConfig.GRID_W/2;
			p.y = (py-1)/2*TiledFloorBase.GH + GameConfig.GRID_H/2;
		}
		return p;
	}

	/**
	 * 根据像素值获取当前房间自查区域所在的xy
	 */
	public static getRoomPosByPosition(px:number,py:number):egret.Point
	{
		var p:egret.Point = new egret.Point();
		p.x = Math.floor(px/GameConfig.ROOM_CHECK_W);
		p.y = Math.floor(py/GameConfig.ROOM_CHECK_H);
		return p;
	}
}