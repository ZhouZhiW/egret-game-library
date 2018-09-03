/**开始游戏界面函数
 * 
 */
class StartGameStage extends BaseStage {
	public constructor(config:StartGameStageConfig) {
		super();
		this.skinName="resource/eui_skins/stageSkin/StartGameStageSkin.exml";

		//获取该类所需要的config
		this.config=config;

		//初始化界面按钮点击事件监听
		let type:string=egret.TouchEvent.TOUCH_TAP;
		this.init_Btn(this.btnStart,config.btnStart_Name,type,this.btnStart_Click,this);
		this.init_Btn(this.btnOption,config.btnOption_Name,type,this.btnOption_Click,this);
		this.init_Btn(this.btnExit,config.btnExit_Name,type,this.btnExit_Click,this);
	}

	/**该类某些属性的配置文件类
	 * 
	 */
	config:StartGameStageConfig;
	
	/**游戏开始大标题
	 * 
	 */
	private title:eui.BitmapLabel;
	/**大标题动画
	 * 
	 * @param title 大标题 
	 * @param startScale 开始scale 
	 * @param endScale  结束scale
	 * @param waitTime  动画等待时间
	 * @param tweenTime 动画执行时间
	 */
	private titleTween(title:eui.BitmapLabel,startScale:number,endScale:number,waitTime:number,tweenTime:number){
		egret.Tween.get(title,{
			loop:true
		})
		.to({scaleY:endScale},tweenTime)
		.set({scaleY:endScale})
		.wait(waitTime)
	}

	/**开始游戏按钮
	 * 
	 */
	private btnStart:OvButton;
	/**开始按钮点击事件
	 * 
	 * @param event 
	 */
	private btnStart_Click(event:egret.TouchEvent){
		//移除自身
		let thisParent:egret.DisplayObjectContainer=this.parent;
		if(thisParent){
			thisParent.removeChild(this);
			let hero:Hero=new Hero();
			hero.heroUtil=Comman.getRes("Hero_json");
			GameManager.ins.hero=hero;
		}

		//获取荧幕相关的东西
		let sceneConfig:SceneConfig=Comman.getRes(GameConfig.SCENE_CONFIG);
		let sceneUtil:SceneUtil=Comman.searchScene(sceneConfig.sceneUtilArray,this.config.name);
		let storyTitle:StoryTitle=new StoryTitle();
		ControlStage.ins.addChild(storyTitle);
		storyTitle.nextStage=GameManager.ins;
		//不为null，则设置title和content，方便测试
		if(sceneUtil!=null){
			storyTitle.setContent(sceneUtil.titleName,sceneUtil.contentName);
		}
	}

	/**游戏选项按钮
	 * 
	 */
	private btnOption:OvButton;
	/**游戏选项按钮点击事件
	 * 
	 * @param event 
	 */
	private btnOption_Click(event:egret.TouchEvent){
		console.log("option");
	}

	/**退出游戏按钮
	 * 
	 */
	private btnExit:OvButton;
	/**退出按钮点击事件
	 * 
	 * @param event 
	 */
	private btnExit_Click(event:egret.TouchEvent){
		console.log("exit");
	}

	/**初始化OvButton
	 * 
	 * @param button OvButton类
	 * @param text  OvButton.labelDislay.text
	 * @param type  触摸事件
	 * @param listener 触摸监听函数
	 * @param objectSender 作用域
	 */
	private init_Btn<T>(button:OvButton,text:string,type:string,listener:(this:T,event:egret.TouchEvent)=>void,objectThis:any){
		let label:eui.BitmapLabel=button.labelDisplay;
		label.text=text;
		button.touchEnabled=true;
		button.addEventListener(type,listener,objectThis);
	}

	/**当添加到舞台触发此事件
	 * 
	 */
	protected addToStage(event:egret.Event){
		let config:StartGameStageConfig=this.config;
		this.title.text=config.title_Name;
		this.titleTween(this.title,config.titleTween_startScale,config.titleTween_endScale,config.titleTween_WaitTime,config.titleTween_TweenTime);
	}
	
	/**类单例存储变量
	 * 
	 */
	private static _ins:BaseStage;

	/**获取类单例，若为null则new一个
	 * 
	 */
	public static get ins(){
		if(this._ins==null){
			let res:any=Comman.getRes(GameConfig.START_CONFIG);
			this._ins=new StartGameStage(res);
		}
		return this._ins;
	}

	/**只能设置此为null
	 * 
	 */
	public static set ins(value:BaseStage){
		if(value!=null){
			return;
		}
		this._ins=value;
	}
	
	/**删除事件监听并显式设置为null
	 * 
	 */
	protected dispose(){
		//移除父类的监听事件
		super.dispose();

		//移除自身tween--虽然没什么用
		egret.Tween.removeTweens(this.title);

		//移除自身按钮监听事件
		let type:string=egret.TouchEvent.TOUCH_TAP;
		this.btnStart.removeEventListener(type,this.btnStart_Click,this);
		this.btnOption.removeEventListener(type,this.btnOption_Click,this);
		this.btnExit.removeEventListener(type,this.btnExit_Click,this);
	}
}