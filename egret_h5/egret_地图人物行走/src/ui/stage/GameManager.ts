/**展现内容类，只要涉及到更改地图，需要设置此为null，必须先设置地图信息，再设置其他
 * 
 */
class GameManager extends BaseStage {
	public constructor() {
		super();
		this.skinName="resource/eui_skins/stageSkin/GameManagerSkin.exml";		
		//绑定摄像机与其展现内容
		this.camera.viewport=this.goodsLayer;

		//添加ui界面
		this.uiLayer.addChild(new UIStage(this));
	}
	/**获取或者设置hero
	 * 
	 */
	private _hero:Hero;
	public get hero(){
		return this._hero;
	}
	public set hero(value:Hero){
		this._hero=value;
		//防止重复添加英雄
		if(this.heroLayer.numChildren==0){
			this.heroLayer.addChild(this._hero);
			this.mapInfoName=value.heroUtil.onMap;
			this.setGoodsLayer(value.heroUtil.onMap,value.x,value.y);
			this.setViewPort(this.mapInfo.width,this.mapInfo.height);
			this.fogOperate.fogLayer=this.fogLayer;
			this.fogOperate.init(value.x,value.y,1,this.mapInfo);
		}
	}

	/**根据地图的大小设置摄像机大小及其所在的位置
	 * 
	 * @param width 地图宽度
	 * @param height 地图高度
	 */
	private setViewPort(width:number,height:number){
		let spaceH:number=this.camera.width-width;
		if(spaceH>0){
			this.camera.x=spaceH/2;
			this.camera.width=width;
		}
		let spaceV:number=this.camera.height-height;
		if(spaceV>0){
			this.camera.y=spaceV/2;
			this.camera.height=height;
		}
	}
	/**根据人物坐标设置3个层,此代码可做简化，暂时先不做了
	 * 
	 * @param roleX role x坐标 
	 * @param roleY role y坐标
	 */
	private setGoodsLayer(mapName:string,roleX:number,roleY:number){
		let mapLayer:eui.Group=this.mapLayer;
		let npcLayer:eui.Group=this.npcLayer;
		let fogLayer:eui.Group=this.fogLayer;
		let existsLayerArray:Array<string>=new Array<string>();

		//获取存在的mapBlock的名字集合 
		for(let childNumber:number=0;childNumber<this.mapLayer.numChildren;childNumber++){
			existsLayerArray.push(mapLayer.getChildAt(childNumber).name);
		}
		let operate:OperateLayterUtil=this.createMb.calculateNeedMbArray(mapName,roleX,roleY,this.camera.width,this.camera.height,this.mapInfo,existsLayerArray);

		//删除
		for(let deleteNumber:number=0;deleteNumber<operate.deleteMbArray.length;deleteNumber++){
			let name:string=operate.deleteMbArray[deleteNumber];
			this.doRemove(name,mapLayer,GameConfig.MAP_LAYER);
			this.doRemove(name,npcLayer,GameConfig.NPC_LAYER);
			this.doRemove(name,fogLayer,GameConfig.FOG_LAYER);
		}

		//添加
		for(let addNumber:number=0;addNumber<operate.needMbArray.length;addNumber++){
			let layer:LayerUtil=operate.needMbArray[addNumber];
			this.doAdd(layer.goodsLayer.get(GameConfig.MAP_LAYER),mapLayer);
			this.doAdd(layer.goodsLayer.get(GameConfig.NPC_LAYER),npcLayer);
			this.doAdd(layer.goodsLayer.get(GameConfig.FOG_LAYER),fogLayer);
		}
	}

	//删除layer
	private doRemove(name:string,layer:eui.Group,layerName:string){
		let group:eui.Group=<eui.Group>layer.getChildByName(name);
		if(group){
			if(layerName==GameConfig.FOG_LAYER){
				this.fogOperate.saveFog(this.hero.heroUtil.onMap,group.name,(<FogLayer>this.fogLayer.getChildAt(0)).fogUtil);
			}
			layer.removeChild(group);
		}
	}

	//添加layer
	private doAdd(group:eui.Group,layer:any){
		if(group.name!=""){
			layer.addChild(group);
		}
	}

	/**伪装摄像机
	 * 
	 */
	private camera:eui.Scroller;

	/**地图信息
	 * 
	 */
	public mapInfo:MapInformation=new MapInformation();

	/**地图的名称，获取到地图信息
	 * 
	 */
	private _mapInfoName:string;
	public get mapInfoName(){
		return this._mapInfoName;
	}
	public set mapInfoName(value:string){
		//获取地图信息资源并拷贝
		Comman.copyFrom(Comman.getRes(value),this.mapInfo);
	}

	/**内容层的基层，让摄像机展示里面的内容
	 * 
	 */
	private goodsLayer:eui.Group;

	private createMb:CreateMapBlock=new CreateMapBlock();
	/**地图层
	 * 
	 */
	private mapLayer:eui.Group;
	
	/**npc层(包括建筑层)
	 * 
	 */
	private npcLayer:eui.Group;

	/**迷雾层
	 * 
	 */
	private fogLayer:FogLayer;

	/**人物层--英雄层
	 * 
	 */
	private heroLayer:eui.Group;

	/**ui层，用来展示按钮
	 * 
	 */
	private uiLayer:eui.Group; 

	//人物移动类
	private roleMove:Move=new Move();

	/**类单例存储变量
	 * 
	 */
	private static _ins:GameManager;

	/**获取类单例，若为null则new一个
	 * 
	 */
	public static get ins(){
		if(this._ins==null){
			let res:any=Comman.getRes(GameConfig.START_CONFIG);
			this._ins=new GameManager();
		}
		return this._ins;
	}

	/**只能设置此为null
	 * 
	 */
	public static set ins(value:GameManager){
		if(value!=null){
			return;
		}
		if(this._ins.parent){
			this._ins.parent.removeChild(this._ins);
		}
		this._ins=value;
	}

	/**迷雾层处理类
	 * 
	 */
	private fogOperate:FogLayerOperate=new FogLayerOperate();

	//移动
	public move(moveEnum:MoveEnum){
		let movePoint:MoveUtil=this.roleMove.move(moveEnum,this.hero,this.camera,this.mapInfo);

		//判断左右
		if(moveEnum==MoveEnum.LEFT||moveEnum==MoveEnum.RIGHT){
			this.calculatePositionX(this.hero,this.camera,movePoint);
		}

		//判断上下
		else if(moveEnum==MoveEnum.TOP||moveEnum==MoveEnum.BOTTOM){
			this.calculatePositionY(this.hero,this.camera,movePoint);
		}

		//重新设置地图块
		this.setGoodsLayer(this.hero.heroUtil.onMap,this.hero.x,this.hero.y);
		this.fogOperate.init(this.hero.x,this.hero.y,1,this.mapInfo);
	}

	//计算摄像机和人物在横向的坐标
	private calculatePositionX(hero:RoleBase,camera:eui.Scroller,movePoint:MoveUtil){
		hero.x=movePoint.realPosition;
		camera.viewport.scrollH=movePoint.scrollPosition;
	}

	//计算摄像机和人物在纵向的坐标
	private calculatePositionY(hero:RoleBase,camera:eui.Scroller,movePoint:MoveUtil){
		hero.y=movePoint.realPosition;
		camera.viewport.scrollV=movePoint.scrollPosition;
		
	}
}