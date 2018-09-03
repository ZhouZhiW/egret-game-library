/**
 * 顶部功能栏
 */
class TopToolBar extends GameWindow implements eui.UIComponent {
	private _btnNames: Array<string> = ["logBtn", "mapBtn", "optBtn"];

	public constructor() {
		super();
		this.typeName = WorWindowType.TOP_TOOLBAR;
		this.layerType = LayerType.LAYER_MENU;
		this.align(AlignType.TOP_RIGHT, 0, 20);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventTap(this._btnNames);
	}

	/**tap响应函数*/
	protected tapCallback(childName: string): void {
		switch (childName) {
			case "logBtn"://日志
				GameManager.getIns().openGameUI(LogWindow);
				break;
			case "mapBtn"://地图
				WinsManager.getIns().switchWin(MiniMap);
				break;
			case "optBtn"://设置
				GameManager.getIns().openGameUI(OptWindow);
				break;
			default:
				LogTrace.log("未处理的子对象");
		}
	}
}