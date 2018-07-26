/**
 *地图模型接口
 * @author 
 *
 */
interface ITile {
    /**
	* 是否为障碍
	* @param startX	始点X坐标
	* @param startY	始点Y坐标
	* @param endX		终点X坐标
	* @param endY		终点Y坐标
	* @return			0为障碍 1为通路
	*/
    isBlock(startX: number,startY: number,endX: number,endY: number): number;
    
}

