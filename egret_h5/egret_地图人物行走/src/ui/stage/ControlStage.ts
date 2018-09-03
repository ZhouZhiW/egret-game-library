/**代替Main成为整个加载界面的主类
 * 
 */
class ControlStage extends BaseStage {
	public constructor() {
		super();
		this.skinName="resource/eui_skins/stageSkin/ControlStageSkin.exml";
	}
	
	/**类单例存储变量
	 * 
	 */
	private static _ins:ControlStage;

	/**从舞台删除类，添加类到舞台
	 * 
	 * @param removeStage 需要删除的类
	 * @param addStage 需要添加的类
	 */
	public setStage(removeStage:BaseStage,addStage:BaseStage){
		if(removeStage.parent==this){
			this.removeChild(removeStage);
		}
		if(addStage==null){
			return;
		}
		this.addChild(addStage);
	}

	/**添加到舞台触发此事件
	 * 
	 * @param event 
	 */
	protected addToStage(event:egret.Event){
		//添加开始界面
		this.addChild(StartGameStage.ins);
	}

	/**获取类单例，若为null则new一个
	 * 
	 */
	public static get ins(){
		if(this._ins==null){
			this._ins=new ControlStage();
		}
		return this._ins;
	}

	/**只能设置此为null
	 * 
	 */
	public static set ins(value:ControlStage){
		if(value!=null){
			return;
		}
		this._ins=value;
	}
}