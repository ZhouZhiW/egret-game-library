/**
 * 舞台层级,包括一切地标以上的物件与角色
 * 主要包括人物,npc,生物,敌人,植被,矿物
 * 植被:循环计数法创建植被
 * @author nodep
 * @version 1.0
 */
class StageLayer extends egret.DisplayObjectContainer {

	public static __xGridCount: number;//世界横向格子总数
	public static __yGridCount: number;//世界纵向格子总数
	public static self: StageLayer;
	private static _hitRound: number[] = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, -1, -1, 1, -1, -1, 1, 1, 1];


	private _maxRollW: number;
	private _maxRollH: number;
	private _wCount: number;
	private _hCount: number;
	private _roomMaker: RoomMaker;
	private _wordW: number;
	private _wordH: number;
	private _startX: number = -100000;
	private _startY: number = -100000;
	private _rollPx: number;
	private _rollPy: number;
	//----------------当前显示的格子范围------------------
	private _gridX_from: number = -1;
	private _gridX_to: number = -1;
	private _gridY_from: number = -1;
	private _gridY_to: number = -1;
	//----------------显示对象的维护---------------
	private _step:number = -1;
	private _roleLink: LinkArray;
	private _roleGirds: Map<string, Array<IRole>> = new Map<string, Array<IRole>>();//用于碰撞检测的grids
	private _hitTestArray: string[] = [];//最近一次碰撞检测的数组
	private _hitTestPoint: egret.Point = new egret.Point(-1, -1);//最近一次碰撞检测的核心点

	public constructor(ww: number, wh: number) {
		super();
		StageLayer.self = this;
		this._roleLink = new LinkArray();
		this._roomMaker = new RoomMaker();
		this._wordW = ww;
		this._wordH = wh;
		this._wCount = Math.round((WinsManager.getIns().gameStage().stageWidth / WinsManager.scaleX + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE);
		this._hCount = Math.round((WinsManager.getIns().gameStage().stageHeight / WinsManager.scaleY + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE)+1;
		this._maxRollW = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_GRID_SIZE);
		this._maxRollH = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_GRID_SIZE);
		StageLayer.__xGridCount = Math.floor(this._wordW / FloorLayer.floorSelf._gridW);
		StageLayer.__yGridCount = Math.floor(this._wordH / FloorLayer.floorSelf._gridH) * 2;
	}

	/**
	 * 强制初始化一个区域的显示
	 */
	private addAreaInit(px: number, py: number): void {
		var areaKey: string = px + "_" + py;
		var plants: Array<Object> = GameData.plantData.getAreaPlants(areaKey);
		//将plants中的所有对象都构建为对应的植物,并添加到链表对象中
		var key: any;
		var obj: Object;
		var plant: Plant;
		for (key in plants) {
			obj = plants[key];
			plant = PlantMaker.getPlant(obj);
			this.addRoleToLink(plant, areaKey);
		}
	}

	/**
	 * 删除整个区域的显示(数据不在这里维护,只是删除显示)
	 * 通过数据中的ID来进行删除
	 */
	private delArea(areaKey: string): void {
		var delLst: Array<IRole> = this._roleGirds.get(areaKey);
		if (delLst != null) {
			while (delLst.length > 0) {
				this.removeRoleFromLink(delLst.pop());
			}
		}
		this._roleGirds.delete(areaKey);
	}

	/**
	 * 预加载并显示区域
	 */
	private preAddArea(px: number, py: number): void {
		// var plants: Array<Object> = GameData.plantData.getAreaPlants(px + "_" + py);
		// if (plants == null)
		// 	LogTrace.log("植被显示速度超过了植被数据的生成速度");
		var areaKey: string = px + "_" + py;
		var plants: Array<Object> = GameData.plantData.getAreaPlants(areaKey);
		//将plants中的所有对象都构建为对应的植物,并添加到链表对象中
		var key: any;
		var obj: Object;
		var plant: Plant;
		for (key in plants) {
			obj = plants[key];
			plant = PlantMaker.getPlant(obj);
			this.addRoleToLink(plant, areaKey);
		}
	}

	/**
	 * 尝试初始化当前屏幕区域
	 * 屏幕左上角坐标
	 */
	public initSynArea(sx: number, sy: number): void {
		this._rollPx = sx;
		this._rollPy = sy;
		var p: egret.Point = MapUtil.getRoomPosByPosition(sx, sy);
		this._startX = p.x;
		this._startY = p.y;
		this._roomMaker.initCreate(this._startX, this._startY);
		var gridX_1: number = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
		var gridX_2: number = gridX_1 + this._wCount;
		var gridY_1: number = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
		var gridY_2: number = gridY_1 + this._hCount;
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxRollW)
			gridX_2 = this._maxRollW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxRollH)
			gridY_2 = this._maxRollH;
		this.initCreate(gridX_1, gridX_2, gridY_1, gridY_2);
		FogForGrid.getIns().updateFogs();
	}

	/**
	 * 尝试同步区域
	 * 屏幕左上角坐标
	 */
	public trySynArea(sx: number, sy: number): void {
		var p: egret.Point = MapUtil.getRoomPosByPosition(sx, sy);
		if (p.x != this._startX || p.y != this._startY) {
			this._startX = p.x;
			this._startY = p.y;
			this._roomMaker.synCreate(this._startX, this._startY);
			return;//由于这一步操作运算量很大,所以这一步不再做任何操作
		}
		//检查是否要滚动
		if (Math.abs(sx - this._rollPx) > GameConfig.ROOM_GRID_SIZE || Math.abs(sy - this._rollPy) > GameConfig.ROOM_GRID_SIZE) {
			this._rollPx = sx;
			this._rollPy = sy;
			this.rollOver();
		}
		if(this._step==1)//刷新迷雾
		{
			FogForGrid.getIns().updateFogs();
			this._step = -1;
		}
	}

	/**
	 * 检查需要隐藏哪些,显示哪些
	 * 以gameConfig中的room_size为基础,求的当前屏幕显示范围,上下左右各扩展一格
	 */
	private rollOver(): void {
		var gridX_1: number = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
		var gridX_2: number = gridX_1 + this._wCount;
		var gridY_1: number = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
		var gridY_2: number = gridY_1 + this._hCount;
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxRollW)
			gridX_2 = this._maxRollW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxRollH)
			gridY_2 = this._maxRollH;
		this.changeDeleteAndCreate(gridX_1, gridX_2, gridY_1, gridY_2);
		this._step = 1;
	}

	/**通过坐标获取当前所在房间的Key */
	private getRoomKey(px: number, py: number): egret.Point {
		var gridX: number = Math.floor(px / GameConfig.ROOM_GRID_SIZE);
		var gridY: number = Math.floor(py / GameConfig.ROOM_GRID_SIZE);
		if (gridX < 0)
			gridX = 0;
		else if (gridX > this._maxRollW)
			gridX = this._maxRollW;
		if (gridY < 0)
			gridY = 0;
		else if (gridY > this._maxRollH)
			gridY = this._maxRollH;
		return new egret.Point(gridX, gridY);
	}

	//重置当前碰撞检测区域
	private resetHitTestArray(): void {
		var i: number = 0;
		var len: number = StageLayer._hitRound.length;
		this._hitTestArray = [];
		for (i; i < len; i += 2)
			this._hitTestArray.push((this._hitTestPoint.x + StageLayer._hitRound[i]) + "_" + (this._hitTestPoint.y + StageLayer._hitRound[i + 1]));
	}

	/**
	 * 初始化树显示结构
	 * 初始化的树显示队列具有排序链表的数据结构,这样可以最大限度的减少后期的排序,只需要自排动态对象
	 */
	private initCreate(x1: number, x2: number, y1: number, y2: number): void {
		var px: number = x1;
		var py: number = y1;
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.addAreaInit(px, py);
			}
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
		this._roleLink.buildLink("y");
		this.sortAllChildren();//初始化排序
	}

	/**更改删除和添加列表 */
	private changeDeleteAndCreate(x1: number, x2: number, y1: number, y2: number): void {
		var px: number = this._gridX_from;
		var py: number = this._gridY_from;
		//删除不需要的
		for (px; px <= this._gridX_to; px++) {
			for (py = this._gridY_from; py <= this._gridY_to; py++) {
				if ((px < x1 || px > x2) || (py < y1 || py > y2))//不符合现在的区域条件进行删除
				{
					this.delArea(px + "_" + py);
				}
			}
		}
		px = x1;
		py = y1;
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.preAddArea(px, py);
			}
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
	}

	//初始化排序
	private sortAllChildren(): void {
		this._roleLink.resetIteration();
		var role: any;
		var index: number = 0;
		do {
			role = this._roleLink.next();
			if (role != null)
				this.addChildAt(role, index++);
		} while (role != null)
	}

	/**将一个对象添加到显示链表中 */
	public addRoleToLink(lk: egret.DisplayObject, areaKey: string = null): void {
		var index: number = this._roleLink.put(lk);
		this.addChildAt(lk, index);
		var irole: IRole = lk as any;
		irole.setAreaKey(areaKey);
		irole.added();
		if (areaKey == null)
			return;
		if (this._roleGirds.get(areaKey) == null)
			this._roleGirds.set(areaKey, new Array<IRole>());
		this._roleGirds.get(areaKey).push(irole);
	}

	/**删除一个显示对象 */
	public removeRoleFromLink(lk: any, onlySelf: boolean = false): void {
		this.removeChild(lk);
		this._roleLink.remove(lk);
		var irole: IRole = lk;
		irole.removed();
		if (!onlySelf)//如果属于独自删除动作,还需要从维护列表中进行删除
			return;
		var ak: string = irole.getAreaKey();
		var rlst: Array<IRole> = this._roleGirds.get(ak);
		if (rlst == null)
			return;
		var index: number = rlst.indexOf(lk);
		if (index >= 0)
			rlst.splice(index, 1);
	}

	/**在链表中上移一个 */
	public gotoPre(lk: any): void {
		var lkIndex: number = this.getChildIndex(lk);
		this.swapChildrenAt(lkIndex - 1, lkIndex);
		this._roleLink.swapNear(lk, -1);
	}

	/**在链表中下移一个 */
	public gotoNext(lk: any): void {
		var lkIndex: number = this.getChildIndex(lk);
		this.swapChildrenAt(lkIndex, lkIndex + 1);
		this._roleLink.swapNear(lk, 1);
	}

	//碰撞检测与互动检测
	public hitTestRole(px: number, py: number): boolean {
		var p: egret.Point = this.getRoomKey(px, py);
		if (this._hitTestPoint.x != p.x || this._hitTestPoint.y != p.y) {
			this._hitTestPoint = p;
			this.resetHitTestArray();
		}
		var hit:boolean = false;
		var key:any;
		var roles:Array<IRole>;
		var role:IRole;
		var optNum:number
		var maxOptdist:number = 100000;
		var optRole:IRole;
		for(key in this._hitTestArray)
		{
			roles = this._roleGirds.get(this._hitTestArray[key]);
			if(roles==null)
				continue;
			for(key in roles)
			{
				role = roles[key];
				optNum = role.tryOption(px,py);
				if(optNum>0)
				{
					if(optNum<maxOptdist)
						optRole = role;
					if(!hit && role.hitTestArea(px,py))
						hit = true;
				}
			}
		}
		WorldManager.getIns().setOptionRole(optRole);
		return hit;
	}
}