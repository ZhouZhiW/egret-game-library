/**荧幕类
 * 
 */
class StoryTitle extends BaseStage {
	public constructor(title?:string,content?:string) {
		super();
		this.skinName="resource/eui_skins/commponentsSkin/StoryTitleSkin.exml";
		this.config=RES.getRes(GameConfig.STORYTITLE_CONFIG);
		this.title.text=title;
		this.content.text=content;
	}
	private config:StoryTitleConfig;

	/**当荧幕展现完的时候，下个加入舞台的类
	 * 
	 */
	public nextStage:BaseStage;

	/**添加到舞台触发此事件
	 * 
	 * @param event 
	 */
	protected addToStage(event:egret.Event){
		this.tweenStart();
	}

	/**从舞台移除触发此事件
	 * 
	 * @param event 
	 */
	protected removeFromStage(event:egret.Event){
		this.dispose();
	}
	/**顶部黑色展现
	 * 
	 */
	private topRect:eui.Rect;

	/**底部黑色展现
	 * 
	 */
	private bottomRect:eui.Rect;

	/**标题---第xxx章
	 * 
	 */
	private title:eui.BitmapLabel;

	/**展现的内容---轮回地狱
	 * 
	 */
	private content:eui.BitmapLabel;

	/**设置标题和内容
	 * 
	 * @param title 标题
	 * @param content 内容
	 */
	public setContent(title:string,content:string){
		this.title.text=title;
		this.content.text=content;
	}
	
	/**tween动画开始展现
	 * 
	 */
	protected tweenStart(){
		let config:StoryTitleConfig=this.config;
		this.rectTween(this.topRect,config.topRectTween_endScale,config.topRectTween_tweenTime);
		this.rectTween(this.bottomRect,config.bottomRectTween_endScale,config.bottomRectTween_tweenTime);
		this.contentTween(this.title,config.titleTween_endAlpha,config.titleTween_waitTime,config.titleTween_tweenTime);
		this.contentTween(this.content,config.contentTween_endAlpha,config.contentTween_waitTime,config.contentTween_tweenTime,this.onTweenComplete);
	}

	/**内容tween展现
	 * 
	 * @param label  eui.bitmapLabel
	 * @param alpha  透明度
	 * @param waitTime 等待动画执行时间
	 * @param tweenTime 动画时间
	 * @param callBack 回调函数
	 */
	private contentTween(label:eui.BitmapLabel,alpha:number,waitTime:number,tweenTime:number,callBack?:any){
		let tween:egret.Tween=egret.Tween.get(label);
		tween.wait(waitTime);
		tween.to({alpha:alpha},tweenTime);
		if(callBack!=null){
			tween.call(callBack,this);
		}	
	}

	/**tween动画完成事件
	 * 
	 */
	private onTweenComplete(){
		ControlStage.ins.setStage(this,this.nextStage);
	}
	/**rect添加动画
	 * 
	 * @param rect 对象
	 * @param scale scale值
	 * @param tweenTime 动画时间
	 */
	private rectTween(rect:eui.Rect,scale:number,tweenTime:number){
		egret.Tween.get(rect,{
			loop:false
		})
		.to({scaleY:scale},tweenTime,egret.Ease.quintInOut);
	}

	/**显式释放掉tween动画
	 * 
	 */
	protected dispose(){
		super.dispose();
		egret.Tween.removeTweens(this.topRect);
		egret.Tween.removeTweens(this.bottomRect);
		egret.Tween.removeTweens(this.title);
		egret.Tween.removeTweens(this.content);
	}
}