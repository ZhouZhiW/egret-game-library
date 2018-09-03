/**
 * 房间创建器
 * 经过测试得出结论,房间的创建要在地图创建之初就初始化好并且写到本地
 * @author nodep
 * @version 1.0
 */
class RoomMaker implements IRender {

	private static _grids:number[] = [0,0,0,-1,0,1,1,0,-1,0,1,-1,1,1,-1,1,-1,-1];
	private static _ins: RoomMaker;
	private _id: number = 1;
	private _maxWPos: number;//横向最大删格
	private _maxHPos: number;//纵向最大删格
	private _sgWCount: number;//一个删格范围内横向和纵向的格子数
	private _sgHCount: number;
	//地形计数器
	private _counter: Map<number, number> = new Map<number, number>();
	private _plantCounter: Map<number, Object> = new Map<number, Object>();
	private _plantRandomArea: Map<number, number[]> = new Map<number, number[]>();
	private _waitForDelPlants:string[] = [];
	private _focusPlants:string[] = [];

	public static getIns(): RoomMaker {
		if (RoomMaker._ins == null)
			RoomMaker._ins = new RoomMaker();
		return RoomMaker._ins;
	}

	public constructor() {
		this._maxWPos = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_CHECK_W);
		this._maxHPos = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_CHECK_H);
		this._sgWCount = Math.floor(GameConfig.ROOM_CHECK_W / GameConfig.GRID_W);
		this._sgHCount = Math.floor(GameConfig.ROOM_CHECK_H / GameConfig.GRID_H) * 2;
		GameConfig.map_cfx = GameConfig.WORD_W / GameData.mapData.baseMap._bitmapWidth;
		GameConfig.map_cfy = GameConfig.WORD_H / GameData.mapData.baseMap._bitmapHeight;
	}

	/**初始化创建 */
	public initCreate(fromX:number,fromY:number):void
	{
		var initLst:string[] = [];
		var tox:number;
		var toy:number;
		var key:string;
		for(var i:number = 0;i<RoomMaker._grids.length;i+=2)
		{
			tox = fromX + RoomMaker._grids[i];
			toy = fromY + RoomMaker._grids[i+1];
			if(tox<0||toy<0||tox>=this._maxWPos||toy>this._maxHPos)
				continue;
			key = tox + "_" + toy;
			if(GameData.plantData.hasPlantArea(key))//如果拥有这个区域
				GameData.plantData.loadArea(key);
			else
			{
				GameData.plantData.createArea(key);
				this.createArea(tox,toy);
			}
			initLst.push(key);
		}
		this.delArea(initLst);
	}

	/**同步创建 */
	public synCreate(fromX:number,fromY:number):void
	{
		var initLst:string[] = [];
		var tox:number;
		var toy:number;
		var key:string;
		for(var i:number = 0;i<RoomMaker._grids.length;i+=2)
		{
			tox = fromX + RoomMaker._grids[i];
			toy = fromY + RoomMaker._grids[i+1];
			if(tox<0||toy<0||tox>=this._maxWPos||toy>this._maxHPos)
				continue;
			key = tox + "_" + toy;
			if(GameData.plantData.hasPlantArea(key))//如果拥有这个区域
				GameData.plantData.loadArea(key);
			else
			{
				GameData.plantData.createArea(key);
				this.createArea(tox,toy);
			}
			initLst.push(key);
		}
		this.delArea(initLst);
	}

	//过滤区域,方便维护(在玩家比较空闲的时候来做删除操作)
	private delArea(newLst:string[]):void
	{
		var key:any;
		var keyStr:string;
		//保留准备删除的
		for(key in newLst)
		{
			keyStr = newLst[key];
			var index:number = this._waitForDelPlants.indexOf(keyStr);
			if(index>=0)
				this._waitForDelPlants.splice(index,1);
		}
		//删除不需要的
		for(key in this._focusPlants)
		{
			keyStr = this._focusPlants[key];
			if(newLst.indexOf(keyStr)<0&&this._waitForDelPlants.indexOf(keyStr)<0)//如果已经不再显示这个区域
				this._waitForDelPlants.push(keyStr);//等待删除
		}
		this._focusPlants = newLst;
	}

	/**立即创建某个区域的数据 */
	public createArea(fromX: number, fromY: number): void {
		//初始化计数器
		var key: any;
		var ft: number;
		for (key in LloydMapData._fixFloorTypes) {
			ft = LloydMapData._fixFloorTypes[key];
			if (ft == LloydMapData.SEA || ft == LloydMapData.LAKE)
				continue;
			this._counter.set(ft, 0);
			this._plantRandomArea.set(ft, []);
		}
		var lst: Array<Object> = new Array<Object>();
		var x1: number = fromX * this._sgWCount;
		var x2: number = x1 + this._sgWCount;
		var y1: number = fromY * this._sgHCount;
		var y2: number = y1 + this._sgHCount;
		var pos: egret.Point;
		var ft: number;
		for (x1; x1 < x2; x1++) {
			for (var j: number = y1; j < y2; j +=2) {
				pos = MapUtil.getPosByGrid(x1, j);
				ft = GameData.mapData.getFloorTypeByPx(pos.x, pos.y);
				if (ft <= 0)//非法地图无视
					continue;
				else if (ft == LloydMapData.SEA || ft == LloydMapData.LAKE)//海洋和湖泊暂时不做任何创建
					continue;
				var c: number = this._counter.get(ft);
				c++;
				this._plantRandomArea.get(ft).push(x1);
				this._plantRandomArea.get(ft).push(j);
				if (c == 1)//获取一个植物
					this._plantCounter.set(ft, this.getRandomPlantType(ft));
				else if (c >= this._plantCounter.get(ft)["count"]) {
					c = 0;
					lst.push(this.getPlant(this._plantCounter.get(ft),this._plantRandomArea.get(ft)));
					this._plantRandomArea.set(ft,[]);
				}
				this._counter.set(ft, c);
			}
		}
		GameData.plantData.initArea(fromX+"_"+fromY,lst);
		SaveManager.getIns().savePlants(fromX+"_"+fromY,JSON.stringify(lst));
	}

	/**通过模版文件和范围获取一个植物数据对象 */
	private getPlant(target: Object,pxes:number[]): Object {
		var obj: Object = new Object();
		obj["id"] = this._id++;
		var ridx:number = Math.floor(Math.random()*(pxes.length/2))*2;
		var gx:number = pxes[ridx];
		var gy:number = pxes[ridx+1];
		var centerPoint:egret.Point = MapUtil.getPosByGrid(gx,gy);
		obj["x"] = Math.floor(centerPoint.x - GameConfig.GRID_W/4 + Math.random()*GameConfig.GRID_W/2);
		obj["y"] = Math.floor(centerPoint.y - GameConfig.GRID_H/4 + Math.random()*GameConfig.GRID_H/2);
		obj["key"] = Math.floor(centerPoint.x/GameConfig.ROOM_GRID_SIZE)+"_"+Math.floor(centerPoint.y/GameConfig.ROOM_GRID_SIZE);
		//这里还缺少配置文件中的一些其他数据,比如生长等
		return obj;
	}

	/**
	 * 获取一个随机的植物类型,这里需要通过JSON配置文件来获取
	 * @param ft 地板的类型
	 * @returns 对应JSON中的植物类型
	 */
	private getRandomPlantType(ft: number): Object {
		return JSON.parse("{\"count\":8}");
	}

	public renderUpdate(interval: number): void {

	}
}