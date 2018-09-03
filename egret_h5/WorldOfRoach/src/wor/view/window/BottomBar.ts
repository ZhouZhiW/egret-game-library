/**
 * 底部按钮:主角(装备),背包（背包是万能,把几乎所有的功能都归纳到背包里）,天赋
 */
class BottomBar extends GameWindow implements  eui.UIComponent {
	public constructor() {
		super();
		this.typeName = WorWindowType.BOTTOM_TOOLBAR;
		this.layerType = LayerType.LAYER_MENU;
		this.align(AlignType.BOTTOM_CENTER, 0, 0);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}