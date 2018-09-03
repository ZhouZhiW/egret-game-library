/**
 * 植物数据,可通过Grid的统计来计算,也可以通过三角形范围内的随机来运算
 * @author nodep
 * @version 1.0
 */
class PlantData {

	//标志了数据库是否拥有这个植被区
	private _localAreaDic: Object = new Object();
	//标志了当前是否已加载了这个植被区
	private _areaData: Map<string, boolean> = new Map<string, boolean>();
	//存放植被的树形结构,此结构比区域更小
	private _plantsGrids: Map<string, Array<Object>> = new Map<string, Array<Object>>();

	public constructor() {
	}

	/**保存当前存档 */
	public resetConfig(): void {
		localStorage.setItem(Server_Map.T_MAP_PLANTS, JSON.stringify(this._localAreaDic));
	}

	/**加载存档 */
	public loadConfig(): void {
		var str: string = localStorage.getItem(Server_Map.T_MAP_PLANTS);
		this._localAreaDic = JSON.parse(str);
	}

	/**创建一个区域数据 */
	public createArea(key: string): void {
		this._localAreaDic[key] = true;
		this._areaData.set(key, true);
		this.resetConfig();
	}

	/**是否拥有某个区域的数据 */
	public hasPlantArea(key: string): boolean {
		if (this._localAreaDic[key] == null)
			return false;
		else
			return true;
	}

	/**
	 * 初始化植被区
	 * 将这些植物初始化到指定的树形结构中
	 */
	public initArea(key: string, lst: Array<Object>): void {
		var strs: string[] = key.split("_");
		var gx: number = Number(strs[0]);
		var gy: number = Number(strs[1]);
		//上面的数据其实是用不到的
		this.insertPlants(gx, gy, lst);
	}

	/**加载某个区域的数据,如果没有加载的话 */
	public loadArea(key: string): void {
		if (this._areaData.get(key) != null)
			return;
		//加载这个区域
		this._areaData.set(key, true);
		var jsonStr: string = localStorage.getItem(Server_Map.T_MAP_PLANTS + key);
		var o: any = JSON.parse(jsonStr);
		this.initArea(key, o);
	}

	/**获取区域植被 */
	public getAreaPlants(key:string):Array<Object>
	{
		return this._plantsGrids.get(key);
	}

	/**
	 * 插入一个区域的植物
	 * 这里的px和py属于大的区域坐标
	 */
	private insertPlants(px: number, py: number, lst: Array<Object>): void {
		//px,py为大的区域编号,转换为小的删格编号
		var obj: Object;
		var gx: number;
		var gy: number;
		var fromx: number = px * GameConfig.ROOM_CHECK_W;
		var fromy: number = py * GameConfig.ROOM_CHECK_H;
		var tox: number = fromx + GameConfig.ROOM_CHECK_W;
		var toy: number = fromy + GameConfig.ROOM_CHECK_H;
		for (fromx; fromx < tox; fromx += GameConfig.ROOM_GRID_SIZE) {
			for (var j: number = fromy; j < toy; j += GameConfig.ROOM_GRID_SIZE) {
				gx = Math.floor(fromx/GameConfig.ROOM_GRID_SIZE);
				gy = Math.floor(j/GameConfig.ROOM_GRID_SIZE);
				this._plantsGrids.set(gx+"_"+gy,new Array<Object>());
			}
		}
		var key:any;
		for(key in lst)
		{
			obj = lst[key];
			this._plantsGrids.get(obj["key"]).push(obj);
		}
	}
}