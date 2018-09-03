/**
 * 通过这个类，你可以访问服务器提供的一切逻辑
 */
class ProxyManager {
	private static _ins: ProxyManager;
	public static getIns(): ProxyManager {
		if (!this._ins)
			this._ins = new ProxyManager();
		return this._ins;
	}

	private _moduleMap:Map<number,ModuleBase>;

	//注册通信模块
	public constructor(){
		ServerVirtual.build();
		this._moduleMap = new Map();
		this._moduleMap.set(ModuleType.USER,new UserModule(ModuleType.USER));
	}

	/**
	 * 向服务端发起请求
	 */
	public send(mt:number,pxy:number,mess:string=""):void
	{
		//在真实的有后端的情况是
		//1.进行封装
		//2.发送给服务端
		//-----------------下面是当前模拟的结果-------------
		this._moduleMap.get(mt).requestToServer(pxy,mess);
	}

	/**
	 * 服务端返回信息
	 */
	public response(mt:number,pxy:number,mess:string=""):void
	{
		this._moduleMap.get(mt).responseFromServer(pxy,mess);
	}
}