/**
 * 设置界面
 */
class OptWindow extends GameWindow implements  eui.UIComponent {
	public constructor() {
		super();
		this.typeName = WorWindowType.OPT_MAP;
		this.layerType = LayerType.LAYER_UI;
		this.align(AlignType.CENTER,0,0);
		this.pop = true;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}