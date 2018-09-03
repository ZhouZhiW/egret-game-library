/**游戏存档管理器 */
class SaveManager {
	private static _ins:SaveManager;

	//获取单例
	public static getIns():SaveManager
	{
		if(!SaveManager._ins)
			SaveManager._ins = new SaveManager();
		return SaveManager._ins;
	}

	/**将所有进行存档处理 */
	public saveAll():void
	{
		this.savePlayer();
		this.saveFocusPlants();
		FogForGrid.getIns().saveMiniMap();
	}

	//存档自己的位置
	public savePlayer():void
	{
		GameData.playerData.posX = PlayerRole.self.x/Tiled_Ground.getIns().cf_X;
		GameData.playerData.posY = PlayerRole.self.y/Tiled_Ground.getIns().cf_Y;
		localStorage.setItem(Server_User.T_USER_DATA,JSON.stringify(GameData.playerData));
	}

	/**保存当前所有的植物状态 */
	public saveFocusPlants():void
	{

	}

	/**存指定的植物区域 */
	public savePlants(key:string,jsonStr:string):void
	{
		localStorage.setItem(Server_Map.T_MAP_PLANTS+key,jsonStr);
	}
}