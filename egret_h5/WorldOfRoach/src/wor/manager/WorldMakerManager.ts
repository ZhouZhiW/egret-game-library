/**
 * nodep
 * 世界构造器
 * 一个随机形状的地图，在构造地图的过程中不能将游戏主显示线程卡死。这个可以后期再做处理
 */
class WorldMakerManager implements IRender{
	private static _ins:WorldMakerManager;
	private _sizeW:number = 800;
	private _sizeH:number = 800;

	public static getIns(): WorldMakerManager {
		if (WorldMakerManager._ins == null)
			WorldMakerManager._ins = new WorldMakerManager();
		return WorldMakerManager._ins;
	}

	//开始创建地图,缺少异常处理
	//?如何创造一个看上去很自然的海岸线呢？
	//?需要设计一个线程接口来实现异步的运算?
	public createWorld():void
	{
		GameManager.getIns().setMainLoadingInfo(LanguageData.getIns().getLang(10001));
		var points:Array<number> = RandomPointUtil.getRandomPoints(this._sizeW,this._sizeH,10,1000);
		var lloy:LloydUtil = new LloydUtil(points,this._sizeW,this._sizeH);
		lloy.delaunay();
		lloy.voronoi();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		var nosie:any = PerlinNoiseUtil.noise2D(500,500);
		GameData.mapData.initData(lloy.getPolgons(),this._sizeW,this._sizeH);//初始化地图数据
		GameData.mapData.adjustCoast(0.58,nosie);//优化海岸线
		GameData.mapData.initArea();//初始化区域
		GameData.mapData.checkTerrain();//检测地形
		GameData.mapData.amendLake(6,8);//修正湖泊
		//检查陆地?区分大陆块和岛屿
		//修正岛屿?如果有业务的需要才需要修正岛屿
		GameData.mapData.initAltitude(5,8,2);//创建海拔图（每快陆地都应该有自己的海拔）
		GameData.mapData.initRiver(1,1,5,8,10);//创建河流
		GameData.mapData.initHumidity();//修正降水量
		GameData.mapData.buildLand();//修正地图的地形为最终地形
		GameData.mapData.amendOasis(3);//增加绿洲
		//------------下面是业务部分-----------
		//设置玩家的出生坐标
		var bornPoint:egret.Point = GameData.mapData.getBorn();
		GameData.playerData.posX = bornPoint.x;
		GameData.playerData.posY = bornPoint.y;
		var baseMap:string = JSON.stringify(GameData.mapData.getDb());
		localStorage.setItem(Server_Map.T_MAP_BASE,baseMap);//将当前地图数据写入到本地
		//初始化植被数据
		GameData.plantData.resetConfig();
		this.drawTr();
		//创建迷雾
		FogForGrid.getIns().init(this._sizeW,this._sizeH);
	}

	private drawTr(debug:boolean=false):void
	{
		//初始化河流
		var map:egret.Shape = GameData.mapData.getMapBaseTextture(800,800);
		var ttr:egret.RenderTexture = new egret.RenderTexture();
		ttr.drawToTexture(map);
		GameData.mapData.baseMap = ttr;
		var river:egret.Shape = GameData.mapData.getRiverTextture(800,800);
		ttr = new egret.RenderTexture();
		ttr.drawToTexture(river);
		GameData.mapData.riverMap = ttr;
		if(debug)
		{
			WinsManager.getIns().gameStage().addChild(map);
			if(GameConfig.showRiver)
				WinsManager.getIns().gameStage().addChild(river);
		}
	}

	/**
	 * 重新构建
	 */
	public rebuildWord(str:string):void
	{
		GameData.mapData.build(JSON.parse(str));
		this.drawTr();
		//加载迷雾
		FogForGrid.getIns().rebuild(this._sizeW,this._sizeH);
	}

	/**
	 * 刷新函数
	 */
	public renderUpdate(interval:number):void
	{
		
	}
}