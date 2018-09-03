/**界面展示的按钮之类的
 * 
 */
class UIStage extends BaseStage {
	public constructor(gameManager:GameManager) {
		super();
		this.skinName="resource/eui_skins/stageSkin/UIStageSkin.exml";
		this.moveBar.gameManager=gameManager;
	}

	/**控制移动的组件
	 * 
	 */
	private moveBar:MoveBar;
}