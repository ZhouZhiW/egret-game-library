/**
 * 这是一个虚拟的服务器入口,提供一切可提供的通信接口
 */
class ServerVirtual {

	private static _handlerMap:Map<string,Function>;
	private static _thisObjectMap:Map<number,Function>;

	public constructor() {
	}

	/**
	 * 初始化模拟服务器
	 */
	public static build():void
	{
		ServerVirtual._handlerMap = new Map();
		ServerVirtual._thisObjectMap = new Map();
		new Server_User();
	}

	/**
	 * 添加一个测试用的响应处理函数
	 */
	public static registHandlerTest(mid:number,pxy:number,handler:Function,thisObject:any):void
	{
		ServerVirtual._handlerMap.set(mid+"_"+pxy,handler);
		ServerVirtual._thisObjectMap.set(mid,thisObject);
	}

	/**
	 * 收到来之客户端的请求,处理完毕后进行返回
	 */
	public static request(mid:number,pxy:number,mess:string):void
	{
		//处理完毕之后直接返回给客户端,实际为socket或http的返回信息
		var returnMess:string = ServerVirtual._handlerMap.get(mid+"_"+pxy).apply(ServerVirtual._thisObjectMap.get(mid),[mess]);
		ProxyManager.getIns().response(mid,pxy,returnMess);
	}
}