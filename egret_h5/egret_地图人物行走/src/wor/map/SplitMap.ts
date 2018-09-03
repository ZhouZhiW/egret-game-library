/**根据提供的大地图图片资源，分割成N个mapBlock，仅用来生成新的地图
 * 
 */
class SplitMap {

	/**分割大地图
	 * 
	 * @param cameraWidth 分割视图的宽度
	 * @param cameraHeight 分割视图的高度
	 * @param mapInfo 地图信息
	 */
	public split(cameraWidth:number,cameraHeight:number,mapInfo:MapInformation):Array<Array<MapBlockUtil>>{

		//mapBlock集合
		let mbList:Array<Array<MapBlockUtil>>=new Array<Array<MapBlockUtil>>();

		//计算横向有多少个mapBlock,若有不足的，强制+1
		let mbHCount:number=this.calculateMapBlockCount(mapInfo.width,cameraWidth);

		//计算纵向有多少个mapBlock,若有不足的，强制+1
		let mbVCount:number=this.calculateMapBlockCount(mapInfo.height,cameraHeight);

		mbList=this.createList(mbHCount,mbVCount,cameraWidth,cameraHeight,mapInfo);
		return mbList;
	}

	/**创建mapBlock总集合 
	 * 
	 * @param mbHCount mapBlock在横向有多少个
	 * @param mbVCount mapBlock在纵向有多少个
	 * @param cameraWidth 分割地图的视图宽度
	 * @param cameraHeight 分割地图的视图高度
	 * @param mapInfo 地图信息
	 */
	private createList(mbHCount:number,mbVCount:number,cameraWidth:number,cameraHeight:number,mapInfo:MapInformation):Array<Array<MapBlockUtil>>{

		//mapBlock的集合
		let mbList:Array<Array<MapBlockUtil>>=new Array<Array<MapBlockUtil>>();

		//根据count总数创建mbList
		for(let mbVNumber:number=0;mbVNumber<mbVCount;mbVNumber++){

			//根据vNumber获取横向的mapBlock集合
			let mbArray:Array<MapBlockUtil>=new Array<MapBlockUtil>();

			//获取单个地图快的行总数
			let mbRowCount:number=Math.ceil(cameraHeight/mapInfo.tileHeight);

			//设置地图块的y坐标
			let y:number=mbRowCount*mapInfo.tileHeight*mbVNumber;

			//判断纵向坐标的边界，最后一个为总行数-之前已经创建的行数
			if(mbVNumber==mbVCount-1){
					mbRowCount=mapInfo.rowCount-mbVNumber*mbRowCount;
				}
			for(let mbHNumber:number=0;mbHNumber<mbHCount;mbHNumber++){	

				//获取单个地图快的列总数
				let mbColumnCount=Math.ceil(cameraWidth/mapInfo.tileWidth);

				//设置x坐标
				let x:number=mbColumnCount*mapInfo.tileHeight*mbHNumber;

				//判断横向坐标的边界，最后一个为总列数-之前已经创建的列数
				if(mbHNumber==mbHCount-1){
					mbColumnCount=mapInfo.columnCount-mbHNumber*mbColumnCount;
				}	
				let mbUtil:MapBlockUtil=this.createTile(mbColumnCount,mbRowCount,mbHNumber,mbVNumber,x,y);
				mbArray.push(mbUtil);						
			}
			mbList.push(mbArray);
		}
		return mbList;
	}

	/**创建单个mapBlockUtil
	 * 
	 * @param columnCount 列数
	 * @param rowCount 行数
	 * @param HNumber  横向所在第几个
	 * @param VNumber 纵向所在第几个
	 * @param x x坐标
	 * @param y y坐标
	 */
	private createTile(columnCount:number,rowCount:number,HNumber:number,VNumber:number,x:number,y:number):MapBlockUtil{
				let mapBlockUtil:MapBlockUtil=new MapBlockUtil();
				mapBlockUtil.columnCount=columnCount;
				mapBlockUtil.rowCount=rowCount;
				mapBlockUtil.fogTileImageName=Comman.nameJoint(GameConfig.MAP_NAME,GameConfig.FOG_TILE_NAME,GameConfig.TILE_NAME,"00",GameConfig.PNG_FORMAT);
				mapBlockUtil.x=x;
				mapBlockUtil.y=y;
				mapBlockUtil.HNumber=HNumber;
				mapBlockUtil.VNumber=VNumber;
				mapBlockUtil.name=GameConfig.MAP_BLOCK_NAME+Comman.isMaxTen(VNumber)+Comman.isMaxTen(HNumber);

				//获取拼接后的名字
				mapBlockUtil.backGroundTileImageName=Comman.nameJoint(GameConfig.MAP_NAME,GameConfig.TILE_NAME,"0"+Math.round(Math.random()*9).toString(),GameConfig.PNG_FORMAT);
				return mapBlockUtil;
	}

	//根据传入的参数计算所产生的mapBlock数量
	private calculateMapBlockCount(mapAspect:number,cameraAspect:number){
		let mbCount:number=Math.ceil(mapAspect/cameraAspect);
		mbCount=mbCount==0?1:mbCount;
		return mbCount;
	}
}