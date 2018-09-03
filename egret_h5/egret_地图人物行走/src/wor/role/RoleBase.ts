abstract class RoleBase extends eui.Component {
	/**role的基类
	 * 
	 * @param name 名字
	 * @param font 名字字体
	 */
	public constructor() {
		super();
		this.skinName="resource/eui_skins/roleBaseSkin/RoleBaseSkin.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beTouched,this);
	}
	/**添加到舞台触发事件
	 * 
	 * @param event 
	 */
	private addToStage(event:egret.Event){

	}

	/**从舞台移除触发事件
	 * 
	 * @param event 
	 */
	private removeFromStage(event:egret.Event){
		this.dispose();
	}

	/**子类必须实现的点击事件
	 * 
	 * @param event 
	 */
	protected abstract beTouched(event:egret.Event);

	/**人物图片
	 * 
	 */
	public roleModel:eui.Image;

	/**名字label
	 * 
	 */
	public roleName:eui.BitmapLabel;

	/**名字group
	 * 
	 */
	private nameGroup:eui.Group;

	/**删除掉监听的对象
	 * 
	 */
	private dispose(){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.beTouched,this);		
	}
}