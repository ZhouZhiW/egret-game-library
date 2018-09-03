/**
 * 游戏登陆
 */
class MenuWindow extends GameWindow implements eui.UIComponent {
	public constructor() {
		super();
		this.typeName = WorWindowType.MENU_WINDOW;
		this.layerType = LayerType.LAYER_UI;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.getChildByName("newGame").addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this)
		this.getChildByName("oldGame").addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this)
		this.reOpen();
	}

	public reOpen(): void {
		this.getChildByName("newGame").visible = false;
		this.getChildByName("oldGame").visible = false;
		//请求玩家历史数据
		ProxyManager.getIns().send(ModuleType.USER, ProxyType.USER_GETHISTORY);
	}

	public update(updateType: number, updateObject: any): void {
		switch(updateType)
		{
			case UpdateType.USER_HISTORY_BACLL://玩家历史数据返回
				this.updatePanel();
				break;
		}
	}

	//刷新整个界面
	private updatePanel():void
	{
		this.getChildByName("newGame").visible = true;
		this.getChildByName("oldGame").visible = GameData.historyData.hasData;
	}

	private optionHandler(evt: TouchEvent): void {
		switch (evt.currentTarget["name"]) {
			case "newGame":
				if(GameData.historyData.hasData)
					AlertWindow.alertShow("确定要开始新的冒险吗?这将覆盖原有存档!",this.startNewGame,this);
				else
					this.startNewGame(true);
				break;
			case "oldGame":
				this.startOldGame();
				break;
		}
	}

	//开始一个新游戏
	private startNewGame(flag:boolean):void
	{
		if(flag)
		{
			LogTrace.log("startGame for new!");
			GameManager.getIns().isNewGame = true;
			GameManager.getIns().startNewGame();
		}
	}

	//读取以前的档案
	private startOldGame():void
	{
		LogTrace.log("startGame for old");
		GameManager.getIns().isNewGame = false;
		GameManager.getIns().startOldGame();
	}
}