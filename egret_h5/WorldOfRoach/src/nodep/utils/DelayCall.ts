/**
 * 延迟调用函数
 * @author nodep
 * @version 1.0
 */
class DelayCall implements IRender {

	public delayTime: number = 0;
	public repeatCount: number = 0;
	private _costTime: number = 0;
	private _callBack: Function;
	private _thisObject: any;
	private _args: Array<any>;

	public constructor(callBack: Function, thisObject: any, args: Array<any> = null) {
		this._callBack = callBack;
		this._thisObject = thisObject;
		this._args = args;
	}

	/**
	 * 延迟回调函数
	 */
	public static call(delayTime: number, callBack: Function, thisObject: any, args: Array<any> = null, repeat: number = 1): DelayCall {
		var dcall: DelayCall = new DelayCall(callBack, thisObject, args);
		dcall.delayTime = delayTime;
		dcall.repeatCount = repeat;
		RenderManager.getIns().registRender(dcall);
		return dcall;
	}

	/**
	 * 刷新
	 */
	public renderUpdate(interval: number): void {
		this._costTime += interval;
		if (this._costTime >= this.delayTime) {
			if (this.repeatCount > 0) {
				this.repeatCount -= 1;
				if (this.repeatCount <= 0) {
					RenderManager.getIns().unregistRender(this);
					if (null != this._callBack)
						this._callBack.apply(this._thisObject, this._args);
				}
				this._callBack = null;
				this._thisObject = null;
				this._args = null;
			}
			else {
				this._costTime = this._costTime - this.delayTime;
				if (null != this._callBack)
						this._callBack.apply(this._thisObject, this._args);
			}
		}
	}
}