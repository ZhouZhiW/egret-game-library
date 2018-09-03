/**
 * 游戏主循环控制器
 * @author nodep
 * @version 1.0
 */
class RenderManager {
	private static _ins: RenderManager;
	private _stage: egret.Stage;
	private _renderList: Array<IRender>;
	private _lastTime: number = 0;

	//当前标准帧频
	public static frameRate = 30;

	public static getIns(): RenderManager {
		if (!this._ins)
			this._ins = new RenderManager();
		return this._ins;
	}

	public constructor() {
		this._renderList = new Array();
	}

	/**
	 * 启动这个render
	 */
	public startRender(stage: egret.Stage): void {
		this._stage = stage;
		this._lastTime = egret.getTimer();
		this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
	}

	/**
	 * 游戏主循环
	 */
	private enterFrameHandler(evt: egret.Event): void {
		var key: any;
		var t:number = egret.getTimer();
		var interval: number =  t - this._lastTime;
		this._lastTime = t;
		for (key in this._renderList) {
			this._renderList[key].renderUpdate(interval);
		}
		//this._renderList.forEach(this.renderHandler);
	}

	/**
	 * foreach处理函数
	 */
	// private renderHandler(target:IRender,index:number): void {
	// 	target.renderUpdate();
	// }

	/**
	 * 注册render
	 */
	public registRender(render: IRender): void {
		this._renderList.push(render);
	}

	/**
	 * 移除一个render
	 */
	public unregistRender(render: IRender): void {
		var indexN: number = this._renderList.indexOf(render);
		if (indexN >= 0) {
			this._renderList.splice(indexN, 1);
		}
	}
}