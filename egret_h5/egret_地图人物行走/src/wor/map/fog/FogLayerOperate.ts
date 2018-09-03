/**对迷雾层的处理类
 * 
 */
class FogLayerOperate {
	public constructor() {
	}
	public fogLayer:FogLayer;

	/**初始化，或者传送 
	 * 
	 */
	public init(roleX:number,roleY:number,initDeleteFogNumber:number,mapInfo:MapInformation){

		let mbColumnCount:number=mapInfo.mbList[0][0].columnCount;
		let mbRowCount:number=mapInfo.mbList[0][0].rowCount;
		//根据role的x坐标获得所在的mapBlock的列数，向下取整
		let mbHNumber:number=Math.floor(roleX/(mbColumnCount*mapInfo.tileWidth));
		
		//根据role的y坐标获得所在的mapBlock的行数，向下取整
		let mbVNumber:number=Math.floor(roleY/(mbRowCount*mapInfo.tileHeight));

		let tileHNumber:number=roleX/mapInfo.tileWidth;
		let tileVNumber:number=roleY/mapInfo.tileHeight;
		let topTileNumber:number=tileVNumber-initDeleteFogNumber;
		let bottomTileNumber:number=tileVNumber+initDeleteFogNumber;

		for(;topTileNumber<=bottomTileNumber;topTileNumber++){
			if(topTileNumber<0){
				continue;
			}
			if(topTileNumber>=mapInfo.rowCount){
				return;
			}
		let leftTileHNumber:number=tileHNumber-initDeleteFogNumber;
		let rightTileNumber:number=tileHNumber+initDeleteFogNumber;
			for(;leftTileHNumber<=rightTileNumber;leftTileHNumber++){
				if(leftTileHNumber>=0){
					this.clearFog(this.fogLayer,topTileNumber,leftTileHNumber,mbColumnCount,mbRowCount);
				}
			}
		}
	}

	private clearFog(fogLayer:FogLayer,topTileNumber:number,leftTileNumber:number,mbColumnCount:number,mbRowCount:number){
		let groupName:string=GameConfig.MAP_BLOCK_NAME+Comman.isMaxTen(Math.floor(topTileNumber/mbRowCount))+Comman.isMaxTen(Math.floor(leftTileNumber/mbColumnCount));
		let group:FogLayer=<FogLayer>fogLayer.getChildByName(groupName);
		if(leftTileNumber==mbColumnCount){
			leftTileNumber=0;
		}
		let tileName:string=GameConfig.FOG_TILE_NAME+Comman.isMaxTen(topTileNumber%mbRowCount)+Comman.isMaxTen(leftTileNumber%mbColumnCount);
		if(group){
			let fog:any=group.getChildByName(tileName);

				if(fog){
				group.fogUtil.isExploreArray[topTileNumber%mbRowCount][leftTileNumber%mbColumnCount]=false;
				group.fogUtil.fogCount--;
				group.removeChild(fog);
				console.log((topTileNumber%mbRowCount)*(leftTileNumber%mbColumnCount));
			}
		}
	}

	public saveFog(mapName:string,mapBlockName:string,fogLayer:FogUtil){
		if(fogLayer.fogCount==0){
			return;
		}
		let name:string=mapName+GameConfig.SPLIT_CHAR+mapBlockName;
		Local.save(name,JSON.stringify(fogLayer));
	}

	public loadFog(mapName:string,mapBlockName:string):string{
		let name:string=mapName+GameConfig.SPLIT_CHAR+mapBlockName;
		return Local.load(name);		
	}
	/**移动
	 * 
	 */
	public move(){

	}
}