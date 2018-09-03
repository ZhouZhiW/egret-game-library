/**
 * nodep
 * 游戏等待界面
 */
class GameMainLoaderWindow extends GameWindow implements eui.UIComponent {

	private _bgShape: egret.Shape;
	private _infoLabel: eui.Label;

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WorWindowType.MAIN_LOADING;
		this.align(AlignType.TOP_LEFT);
	}

	protected childrenCreated(): void {
		this._bgShape = new egret.Shape();
		this._bgShape.graphics.beginFill(0x000000, 1);
		this._bgShape.graphics.drawRect(0, 0, 1, 1);
		this._bgShape.graphics.endFill();
		this.addChildAt(this._bgShape, 0);
		this._infoLabel = this.getChildByName("message") as eui.Label;
		this._infoLabel.text = "";
		super.childrenCreated();
	}

	public resize(): void {
		super.resize();
		if (this._bgShape == null)
			return;
		this._bgShape.scaleX = WinsManager.stageWidth;
		this._bgShape.scaleY = WinsManager.stageHeight;
		this._infoLabel.x = (WinsManager.stageWidth - this._infoLabel.width) / 2;
		this._infoLabel.y = (WinsManager.stageHeight - this._infoLabel.height) / 2;
	}

	/**
     * 捕获到对应的通知
     */
	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.MAIN_LOADING_SET:
				this._infoLabel.text = updateObject;
				break;
		}
	}

}