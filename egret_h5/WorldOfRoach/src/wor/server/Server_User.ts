/**
 * 玩家数据模拟服务器
 */
class Server_User {

	public static T_USER_HISTORY:string = "T_USER_HISTORY";
	public static T_USER_DATA:string = "T_USER_DATA";

	public constructor() {
		ServerVirtual.registHandlerTest(ModuleType.USER,ProxyType.USER_GETHISTORY,this.getUserHistory,this);
		ServerVirtual.registHandlerTest(ModuleType.USER,ProxyType.USER_ENTERGAME,this.userEnterGame,this);
		ServerVirtual.registHandlerTest(ModuleType.USER,ProxyType.USER_CREATE,this.userCreate,this);
	}

	/**
	 * 获取玩家历史数据
	 */
	private getUserHistory(mess:string):string
	{
		var bs:string = localStorage.getItem(Server_User.T_USER_HISTORY);
		if(!bs||bs=="")
			return "{\"has\":0}";
		else
			return bs;
	}

	/**
	 * 进入游戏
	 * 需要在逻辑服务器读取玩家当前存档,生成tiled地图数据等
	 */
	private userEnterGame(mess:string):string
	{
		var bs:string = localStorage.getItem(Server_User.T_USER_DATA);
		return bs;
	}

	/**
	 * 创建角色
	 * 创建角色并且写本地
	 */
	private userCreate(mess:string):string
	{
		var posJson:Object = JSON.parse(mess);
		var tempUser:UserLO = LocalData.getObjectByKv("UserLO",{id:1});
		var obj:Object = new Object();
		ObjectUtil.copyTo(tempUser,obj);
		obj["posX"] = posJson["posX"];
		obj["posY"] = posJson["posY"];
		localStorage.setItem(Server_User.T_USER_DATA,JSON.stringify(obj));
		GameData.historyData.has = 1;
		localStorage.setItem(Server_User.T_USER_HISTORY,JSON.stringify(GameData.historyData));
		return null;
	}
}