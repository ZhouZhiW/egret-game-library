/**地图层，NPC层（包括建筑层），迷雾层,不做存储，仅在运行时调用
 * 
 */
class LayerUtil {
	constructor(mapBlockGroup?:eui.Group,npcGroup?:eui.Group,fogGroup?:eui.Group){
		this.goodsLayer=new Map<string,eui.Group>();
		//设置地图层
		mapBlockGroup.cacheAsBitmap=true;
		this.goodsLayer.set(GameConfig.MAP_LAYER,mapBlockGroup);

		//设置NPC层
		npcGroup.cacheAsBitmap=true;
		this.goodsLayer.set(GameConfig.NPC_LAYER,npcGroup);

		//设置迷雾层
		fogGroup.cacheAsBitmap=true;
		this.goodsLayer.set(GameConfig.FOG_LAYER,fogGroup);
	}
	/**3个层的集合，便于后面的对应分层
	 * 
	 */
	public goodsLayer:Map<string,any>;
}