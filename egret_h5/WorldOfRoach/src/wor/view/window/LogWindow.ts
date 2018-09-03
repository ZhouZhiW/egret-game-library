/**
 * 日志,任务,记录
 */
class LogWindow extends GameWindow implements  eui.UIComponent {
	public constructor() {
		super();
		this.layerType = LayerType.LAYER_UI;
		this.typeName = WorWindowType.LOG_WINDOW;
		this.pop = true;
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}