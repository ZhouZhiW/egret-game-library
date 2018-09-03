/**
 * 游戏基础摇杆
 */
class RockerBar extends GameWindow implements eui.UIComponent {
	
	private _contorller:RockBarContorller;
	private _bgShape: egret.Shape;//背景圆圈图

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_UI;
		this.typeName = WorWindowType.ROCKER_LEFT;
		this.align(AlignType.BOTTOM_LEFT, 150, -150);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this._contorller = new RockBarContorller(this.getChildByName("barBtn") as eui.Button,this.x,this.y);
		this.drawC();
	}

	//绘制背景
	private drawC(): void {
		if (!this._bgShape) {
			this._bgShape = new egret.Shape();
			this.addChildAt(this._bgShape, 0);
			this._bgShape.touchEnabled = false;
		}
		this._bgShape.graphics.clear();
		this._bgShape.graphics.beginFill(0xFFFFFF, 0.5);
		this._bgShape.graphics.drawCircle((this.getChildByName("barBtn") as eui.Button).anchorOffsetX, (this.getChildByName("barBtn") as eui.Button).anchorOffsetY, GameConfig.rocker_bar_sensitivity);
		this._bgShape.graphics.endFill();
	}
}