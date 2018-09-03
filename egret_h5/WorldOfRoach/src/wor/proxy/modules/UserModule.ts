/**
 * 玩家信息
 */
class UserModule extends ModuleBase{

	public constructor(id:number) {
		super(id);
		this.registHandler(ProxyType.USER_GETHISTORY,this.userHistoryHandler);
		this.registHandler(ProxyType.USER_ENTERGAME,this.userEnterGame);
		this.registHandler(ProxyType.USER_CREATE,this.createUser);
	}
	
	//获取存档信息
	private userHistoryHandler(type:number,mess:string):string
	{
		if(type==UserModule.TYPE_RQ)
			return mess;
		else
		{
			var obj:Object = JSON.parse(mess);
			GameData.historyData.initHistoryData(obj);
			WinsManager.getIns().updateWin(UpdateType.USER_HISTORY_BACLL,[WorWindowType.MENU_WINDOW],null);
		}
		return null;
	}

	//进入游戏
	private userEnterGame(type:number,mess:string):string
	{
		if(type==UserModule.TYPE_RQ)
			return mess;
		else
		{
			var obj:Object = JSON.parse(mess);
			ObjectUtil.copyTo(obj,GameData.playerData);
			GameManager.getIns().enterGame();
		}
		return null;
	}

	//创建游戏角色
	private createUser(type:number,mess:string):string
	{
		if(type==UserModule.TYPE_RQ)
			return mess;
		else
		{
			LogTrace.log("create new player completed!!");
			GameManager.getIns().startOldGame();
		}
		return null;
	}
}