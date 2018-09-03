/**stage的基类
 * 
 */
abstract class BaseStage extends eui.Component {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
	}
	/**当添加到舞台触发此事件
	 * 
	 */
	protected addToStage(event:egret.Event){
		
	}

	/**从舞台移除触发此事件
	 * 
	 * @param event 
	 */
	protected removeFromStage(event:egret.Event){
		this.dispose();
	}

	/**删除事件监听
	 * 
	 */
	protected dispose(){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
	}
}