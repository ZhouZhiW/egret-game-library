/**重写Button按钮
 * 
 */
class OvButton extends eui.Component {
	public constructor() {
		super();
		this.skinName="resource/eui_skins/commponentsSkin/OvButtonSkin.exml";
	}

	/**Button.label
	 * 
	 */
	public labelDisplay:eui.BitmapLabel;
}