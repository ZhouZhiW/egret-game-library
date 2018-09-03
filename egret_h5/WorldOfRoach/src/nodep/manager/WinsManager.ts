/**
 * 界面管理
 * 添加打开或关闭界面的方法:如果界面已打开,则进行关闭
 * @author nodep
 * @version 1.01;
 */
class WinsManager {

	private static _ins: WinsManager;
	private _baseUi: eui.UILayer;
	/**游戏的层级 */
	private _layerMap: Map<string, GameLayerInterface>;
	/**当前已创建的界面 */
	private _windowMap: Map<any, GameWindow>
	
	public static stageWidth:number = 0;
	public static stageHeight:number = 0;
	public static scaleX:number = 1;
	public static scaleY:number = 1;

	public constructor() {
		if (WinsManager._ins != null)
			throw (new Error("单例"));
		this._layerMap = new Map();
		this._windowMap = new Map();
		LogTrace.log("create WinsManager!");
	}

	private initScale():void{
		LogTrace.log(WinsManager.stageWidth+"_"+WinsManager.stageHeight);
		WinsManager.scaleX = WinsManager.stageWidth/1254;
		WinsManager.scaleY = WinsManager.scaleX;
	}

	/**
	 * 单例
	 */
	public static getIns(): WinsManager {
		if (!WinsManager._ins)
			WinsManager._ins = new WinsManager();
		return WinsManager._ins;
	}

	/**
	 * 初始化
	 */
	public initGame(ui: eui.UILayer): void {
		this._baseUi = ui;
		this._baseUi.stage.addEventListener(egret.Event.RESIZE,this.stageResizeHandler,this);
		WinsManager.stageWidth = this._baseUi.stage.stageWidth;
		WinsManager.stageHeight = this._baseUi.stage.stageHeight;
		this.initScale();
	}

	/**
	 * 添加一个层级
	 */
	public addLayer(layerName: string, layer: GameLayerInterface): void {
		this._layerMap.set(layerName, layer);
		this._baseUi.addChild(layer as GameLayer);
		LogTrace.log("add layer:" + layerName);
	}

	/**开启或关闭窗口 */
	public switchWin(cls: any):void{
		if (!this._windowMap.has(cls))
			this._windowMap.set(cls, new cls());
		let win: GameWindow = this._windowMap.get(cls);
		if(win.stage==null)
			this.openWindow(cls);
		else
			this.closeWin(cls);
	}

	/**
	 * 开启一个窗口
	 */
	public openWindow(cls: any): void {
		if (!this._windowMap.has(cls))
			this._windowMap.set(cls, new cls());
		let win: GameWindow = this._windowMap.get(cls);
		if (!win.stage) {
			if (this._layerMap.has(win.layerType))//如果有對應層級可以打開
			{
				this._layerMap.get(win.layerType).addWindow(win);
				LogTrace.log("openWindow->" + win.typeName);
			}
			else {
				throw (new Error(NodepErrorType.LAYER_NO_EXISTENT));
			}
		}
	}

	/**
	 * 在某個層級打開界面
	 */
	public openWindowToLayer(cls: any, layerType: string): void {
		if (!this._windowMap.has(cls))
			this._windowMap.set(cls, new cls());
		let win: GameWindow = this._windowMap.get(cls);
		if (!win.stage) {
			if (this._layerMap.has(layerType))//如果有對應層級可以打開
			{
				this._layerMap.get(layerType).addWindow(win);
				LogTrace.log("openWindow->" + win.typeName);
			}
			else {
				throw (new Error(NodepErrorType.LAYER_NO_EXISTENT));
			}
		}
	}

	/**
	 * 通过多种方式尝试关闭界面
	 */
	public closeWin(target: any): void {
		if (!target)
			return;
		var win:GameWindow = null;
		switch (typeof target) {
			case "object":win = target as GameWindow;
				break;
			case "string"://暂时不支持
				break;
			case "function":win = this._windowMap.get(target);
				break;
		}
		if(!win||!win.parent)
			return;
		if (win.beforeClose())
			(win.parent as GameLayer).removeWindow(win);
	}

	/**
	 * 刷新指定的界面,只会更新在显示列表中的
	 */
	public updateWin(updateType: number, typeNames: Array<string>, updateData: any = null): void {
		this._windowMap.forEach(function(win){
			if (typeNames.indexOf(win.typeName) >= 0 && win.stage != null)
				win.update(updateType, updateData);
		},this);
	}

	/**
	 * 全局更新界面,只会更新在显示列表中的
	 */
	public globalUpdate(updateType: number, updateData: any): void {
		this._windowMap.forEach(function(win){
			if(win.stage!=null)
				win.update(updateType, updateData);
		},this);
	}

	/**
	 * 屏幕尺寸变化
	 */
	private stageResizeHandler(evt:egret.Event):void
	{
		WinsManager.stageWidth = this._baseUi.stage.stageWidth;
		WinsManager.stageHeight = this._baseUi.stage.stageHeight;
		this.initScale();
		LogTrace.log("stageReszie!");
		//通知所有的layer
		this._layerMap.forEach(function(layer){
			layer.resize();
		},this);
	}

	/**
	 * 指定回收
	 */
	public gcWindow(key:any):void
	{

	}

	/**
	 * 回收所有没有在显示列表中的界面
	 */
	public gcWindowAll():void
	{

	}

	/**
	 * 快速获取游戏舞台
	 */
	public gameStage():egret.Stage
	{
		if(this._baseUi!=null)
			return this._baseUi.stage;
		else
			return null;
	}
}