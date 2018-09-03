//消息发送与处理基类
class ModuleBase {

	/**
	 * 请求
	 */
	protected static TYPE_RQ:number = 1;
	/**
	 * 返回
	 */
	protected static TYPE_RS:number = 2;

	protected moduleID:number = 0;
	private __reqHandlerMap:Map<number,Function>;

	public constructor(id:number) {
		this.moduleID = id;
		this.__reqHandlerMap = new Map();
	}

	/**
	 * 向服务端发送请求,根据主动注册的函数的不同而调用不同的函数来预处理
	 */
	public requestToServer(pid:number,mess:string): void {
		mess = this.__reqHandlerMap.get(pid).apply(this,[ModuleBase.TYPE_RQ,mess]);
		ServerVirtual.request(this.moduleID,pid,mess);
	}

	/**
	 * 获取服务端返回的请求,根据主动注册的函数的不同而调用不同的函数来预处理
	 */
	public responseFromServer(pid:number,mess:string):void{
		this.__reqHandlerMap.get(pid).apply(this,[ModuleBase.TYPE_RS,mess]);
	}

	//注册一个函数来对某个pid进行处理
	protected registHandler(pid:number,req:Function):void{
		this.__reqHandlerMap.set(pid,req);
	}
}