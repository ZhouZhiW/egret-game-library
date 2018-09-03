/**
 * 缩略地图可半透明
 */
class MiniMap extends GameWindow implements eui.UIComponent {
	private _mapBg: egret.Bitmap;
	private _riverBg: egret.Bitmap;
	private _self: egret.Shape;
	private _scX: number;
	private _scY: number;

	public constructor() {
		super();
		this.typeName = WorWindowType.MINI_MAP;
		this.layerType = LayerType.LAYER_GROUND;
		this.align(AlignType.CENTER, 0, 0);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	/**初始化完成 */
	protected childrenCreated(): void {
		this.initPanel();
		super.childrenCreated();
	}

	private initPanel(): void {
		var toW: number = Math.floor(WinsManager.getIns().gameStage().stageWidth * 0.7);
		var toH: number = Math.floor(WinsManager.getIns().gameStage().stageHeight * 0.7);
		this._mapBg = new egret.Bitmap();
		this._mapBg.bitmapData = GameData.mapData.baseMap.bitmapData;
		this._scX = toW / this._mapBg.width;
		this._scY = toH / this._mapBg.height;
		this._mapBg.scaleX = this._scX;
		this._mapBg.scaleY = this._scY;
		this.addChild(this._mapBg);
		if (GameConfig.showRiver) {
			this._riverBg = new egret.Bitmap();
			this._riverBg.bitmapData = GameData.mapData.riverMap.bitmapData;
			this._riverBg.scaleX = this._scX;
			this._riverBg.scaleY = this._scY;
			this.addChild(this._riverBg);
		}
		this.width = toW;
		this.height = toH;
		this._self = new egret.Shape();
		this._self.graphics.beginFill(0xFF0000, 1);
		this._self.graphics.drawCircle(0, 0, 5);
		this._self.graphics.endFill();
		this.addChild(this._self);
		FogForGrid.getIns().scaleX = this._scX;
		FogForGrid.getIns().scaleY = this._scY;
		if (GameConfig.showFog)
			this.addChild(FogForGrid.getIns());
		this.updateSelfPosition();
		this.synFog();
	}

	//用植被区域来同步迷雾,无论是通过挖洞还是创建的形式?不知道挖洞的性能如何
	private synFog(): void {
		FogForGrid.getIns().reDraw();
		FogForGrid.getIns().autoDraw = true;
	}

	public reOpen(): void {
		super.reOpen();
		this.updateSelfPosition();
		this.synFog();
	}

	public beforeClose(): boolean {
		FogForGrid.getIns().autoDraw = false;
		return super.beforeClose();
	}

	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.MAP_SELF_MOVE:
				this.updateSelfPosition();
				break;
		}
	}

	private updateSelfPosition(): void {
		if (!this._self)
			return;
		this._self.x = PlayerRole.self.x / GameConfig.map_cfx * this._scX;
		this._self.y = PlayerRole.self.y / GameConfig.map_cfy * this._scY;
	}
}