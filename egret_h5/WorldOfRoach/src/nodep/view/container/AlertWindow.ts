/**
 * 普通确认取消框
 * @author nodep
 * @version 1.0
 */
class AlertWindow extends GameWindow implements eui.UIComponent {

	private static _message:string;
	private static _callBack:Function;
	private static _thisObject:any;
	private static _labels:Array<string>;

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WindowType.ALERT_WIN;
		this.pop = true;
		this.align(AlignType.CENTER,0,0);
	}

	//打开一个确认框
	public static alertShow(message:string,callBack:Function,thisObject:any,btnLabels:Array<string> = null):void
	{
		AlertWindow._message = message;
		AlertWindow._callBack = callBack;
		AlertWindow._thisObject = thisObject;
		AlertWindow._labels = btnLabels;
		WinsManager.getIns().openWindow(AlertWindow);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		(this.getChildByName("okBtn") as eui.Button).addEventListener(egret.TouchEvent.TOUCH_TAP,this.handler,this);
		(this.getChildByName("cancelBtn") as eui.Button).addEventListener(egret.TouchEvent.TOUCH_TAP,this.handler,this);
		this.reOpen();
	}

	private handler(evt:egret.TouchEvent):void
	{
		if(AlertWindow._callBack!=null)
			AlertWindow._callBack.apply(AlertWindow._thisObject,[evt.currentTarget.name=="okBtn"]);
		WinsManager.getIns().closeWin(this);
	}

	public reOpen():void
	{
		super.reOpen();
		(this.getChildByName("infoTxt") as eui.Label).text = AlertWindow._message;
	}
}