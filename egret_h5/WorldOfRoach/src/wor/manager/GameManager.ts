/**
 * 游戏总流程管理器
 */
class GameManager {
	private static _ins: GameManager;
	public isNewGame:boolean = false;

	public static getIns(): GameManager {
		if (GameManager._ins == null)
			GameManager._ins = new GameManager();
		return GameManager._ins;
	}

	/**
	 * 正常流程开始新游戏
	 */
	public startNewGame(): void {
		//创建角色
		WinsManager.getIns().openWindow(GameMainLoaderWindow);//打开游戏主加载界面
		DelayCall.call(100,this.buildEnter,this)
	}

	//游戏创建的方式进入游戏
	private buildEnter():void
	{
		WorldMakerManager.getIns().createWorld();//创建世界
		ProxyManager.getIns().send(ModuleType.USER,ProxyType.USER_CREATE,"{\"posX\":"+GameData.playerData.posX+",\"posY\":"+GameData.playerData.posY+"}");
	}

	private createEnter():void
	{
		//加载游戏地图数据
		if(!this.isNewGame)
		{
			var str:string = localStorage.getItem(Server_Map.T_MAP_BASE);//将当前地图数据写入到本地
			WorldMakerManager.getIns().rebuildWord(str);
			LogTrace.log("loadBaseMap.len="+str.length);
		}
		//进入游戏,即获取玩家数据
		ProxyManager.getIns().send(ModuleType.USER,ProxyType.USER_ENTERGAME);
	}

	/**
	 * 创建角色和开始新游戏都会走这里
	 */
	public startOldGame(): void {
		WinsManager.getIns().closeWin(MenuWindow);
		WinsManager.getIns().gcWindowAll();
		WinsManager.getIns().openWindow(GameMainLoaderWindow);//打开游戏主加载界面
		DelayCall.call(100,this.createEnter,this)
	}

	//进入游戏
	public enterGame():void
	{
		WinsManager.getIns().gameStage().addChildAt(Tiled_Ground.getIns(),0);
		GameData.plantData.loadConfig();
		//初始化游戏界面->实际开发中需要加入初始化进度条
		Tiled_Ground.getIns().initWorld(GameConfig.WORD_W,GameConfig.WORD_H);//初始化世界的宽度和高度
		GameData.timeData.play();
		WinsManager.getIns().openWindow(RockerBar);//初始化摇杆到界面
		WinsManager.getIns().openWindow(TopToolBar);//初始化顶部导航栏
		WinsManager.getIns().openWindow(CurbBar);//初始化右侧主控区
		WinsManager.getIns().openWindow(BottomBar);//底部导航
		WinsManager.getIns().openWindow(RoleWindow);//左上角
		WinsManager.getIns().gameStage().addEventListener(egret.Event.DEACTIVATE,this.deactivateHandler,this);
		WinsManager.getIns().gameStage().addEventListener(egret.Event.ACTIVATE,this.activateHandler,this);
		WinsManager.getIns().closeWin(GameMainLoaderWindow);//关闭加载
	}

	public deactivateHandler():void
	{
		SaveManager.getIns().saveAll();
		LogTrace.log("暂停游戏->存档");
	}

	public activateHandler():void
	{
		LogTrace.log("继续游戏->继续");
	}

	/**
	 * 开启业务窗口,判断互斥
	 */
	public openGameUI(cls: any): void {
		//关闭与之互斥的窗口,保留同步的窗口
		//之后则打开窗口
		WinsManager.getIns().openWindow(cls);
	}

	/**
	 * 改变主加载界面的文本
	 */
	public setMainLoadingInfo(infoStr:string):void{
		WinsManager.getIns().updateWin(UpdateType.MAIN_LOADING_SET,[WorWindowType.MAIN_LOADING],infoStr);
	}
}