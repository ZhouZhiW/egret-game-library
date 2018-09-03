/**
 * 右手操作区
 */
class CurbBar extends GameWindow implements eui.UIComponent {
	private _optBtn: eui.Button;

	public constructor() {
		super();
		this.scaleX = this.scaleY = WinsManager.scaleX;
		this.typeName = WorWindowType.CURB_BAR;
		this.layerType = LayerType.LAYER_MENU;
		this.align(AlignType.BOTTOM_RIGHT, 0, 0);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this._optBtn = this.getChildByName("optBtn") as eui.Button;
		this.addEventTap("optBtn");
		this.initOptTarget();
	}

	//刷新opt目标
	private initOptTarget(): void {
		this._optBtn.visible = WorldManager.getIns().focusOptionRole!=null;
	}

	/**
     * tap响应函数
     */
	protected tapCallback(childName: string): void {
		switch (childName) {
			case "optBtn"://与场景元素进行互动
				
				break;
		}
	}

	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.MAP_OPT_CHANGE:
				this.initOptTarget();
				break;
		}
	}
}