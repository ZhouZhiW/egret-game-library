/**
 * 地表容器
 * 采用均衡帧的方式来创建地砖,删除不做控制
 * @author nodep
 * @version 1.0
 */
class FloorLayer extends egret.DisplayObjectContainer {
	//----------------初始化------------------
	public static floorSelf:FloorLayer;
	public _gridW: number;//格子宽度,一个单位的景物,占1/2,这是在6plus的分辨率下
	public _gridH: number;//格子高度
	public _gridW_HALF:number;
	public _gridH_HALF:number;
	private _offsetW: number;//左右预加载数量
	private _offsetH: number;//上下预加载数量
	private _startX: number = -10000;//当前显示的矩形框体x坐标
	private _startY: number = -10000;//当前显示的矩形框体y坐标
	private _wCount: number;//横向格子总数
	private _hCount: number;//纵向格子总数
	private _maxGridW: number;//横向最大格子数
	private _maxGridH: number;//纵向最大格子数
	//----------------当前显示的格子范围------------------
	private _gridX_from: number = -1;
	private _gridX_to: number = -1;
	private _gridY_from: number = -1;
	private _gridY_to: number = -1;
	//----------------均衡负载相关---------------
	private _balance: number = 5;//均衡创建
	private _addCount: number = 0;//每帧创建计数器
	//-----------------地板--------------------
	private _floorMap: Map<string, IFloor> = new Map<string, IFloor>();//已创建的地板
	private _errorFloor: Array<IFloor> = new Array<IFloor>();//具有错误地表的地板
	private _preAddFloors: number[] = [];//均衡用预加载地表
	private _errorFloorDic:Map<string,number> = new Map<string,number>();
	private _changeDrawCount:number = 0;
	private _standOn:IFloor;

	public constructor(worldW: number, worldH: number) {
		super();
		FloorLayer.floorSelf = this;
		this._offsetW = GameConfig.OFFSET_W;
		this._offsetH = GameConfig.OFFSET_H;
		this._gridW = GameConfig.GRID_W;
		this._gridH = GameConfig.GRID_H;
		this._gridW_HALF = this._gridW/2;
		this._gridH_HALF = this._gridH/2;
		//计算得到在当前屏幕尺寸下,横向需要展现的格子数量，纵向需要展现的格子数量
		this._wCount = Math.round((WinsManager.getIns().gameStage().stageWidth/WinsManager.scaleX + this._offsetW * 2) / this._gridW) + 2;
		this._hCount = Math.round((WinsManager.getIns().gameStage().stageHeight/WinsManager.scaleY + this._offsetH * 2) / this._gridH) + 3;
		this._hCount = this._hCount * 2;
		this._maxGridW = Math.floor(worldW / this._gridW);
		this._maxGridH = Math.floor(worldH / this._gridH * 2);
		TiledFloorBase.GW = this._gridW;
		TiledFloorBase.GH = this._gridH;
		TiledFloorBase.GW_HALF = this._gridW / 2;
		TiledFloorBase.GH_HALF = this._gridH / 2;
	}

	/**单纯获取地表类型 */
	public getStandType(xp:number,yp:number):number
	{	
		var key:string = MapUtil.getDiamondKeyX_YFromPos(xp,yp,this._gridW,this._gridH);
		var ifloor:IFloor = this._floorMap.get(key);
		this._standOn = ifloor;//保存当前所在地板
		switch(ifloor.getType())
		{
			case LloydMapData.SEA:return StandType.SEA;
			case LloydMapData.LAKE:return StandType.LAKE;
			default:return StandType.LAND;
		}
	}

	//预添加地板
	private preAddFloor(px: number, py: number): void {
		var key: string = px + "_" + py;
		if (this._floorMap.get(key) != null)
			return;
		this._preAddFloors.push(px);
		this._preAddFloors.push(py);
	}

	//均衡添加地板
	private balanceAddFloor(px: number, py: number): void {
		var key: string = px + "_" + py;
		if (this._floorMap.get(key) != null)
			return;
		this._addCount++;
		var floor: TiledFloorBase = new TiledFloorBase();
		floor.createFloor(this, px, py);
		this._floorMap.set(key, floor);
		if (floor.fType < 0)//如果属于一个非法的地表类型
			floor.reCreate(this.getRealType(floor.fType,floor.x,floor.y));
	}

	//添加地板
	private addFloor(px: number, py: number): void {
		var key: string = px + "_" + py;
		if (this._floorMap.get(key) != null)
			return;
		var floor: TiledFloorBase = new TiledFloorBase();
		floor.createFloor(this, px, py);
		this._floorMap.set(key, floor);
		if (floor.fType < 0)//如果属于一个非法的地表类型
			this._errorFloor.push(floor);
	}

	//删除地板
	private delFloor(key: string): void {
		if (this._floorMap.get(key) != null) {
			this._floorMap.get(key).removeFloor();
			this._floorMap.delete(key);
		}
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
					this.delFloor(px + "_" + py);
				}
			}
		}
		px = x1;
		py = y1;
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.preAddFloor(px, py);
			}
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
	}

	//初始化
	private initCreate(x1: number, x2: number, y1: number, y2: number): void {
		var px: number;
		var py: number;
		//创建必须的
		this._addCount = 0;
		px = x1;
		py = y1;
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.addFloor(px, py);
			}
		}
		//处理地图类型异常的地表
		while (this._errorFloor.length > 0) {
			var baseFloor: TiledFloorBase = this._errorFloor.pop() as TiledFloorBase;
			baseFloor.reCreate(this.getRealType(baseFloor.fType, baseFloor.x, baseFloor.y));
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
	}

	/**
	 * 算法过于复杂且无法回滚
	 * 所以直接采用取最近多边形的方法
	 */
	private getRealType(cType: number, px: number, py: number): number {
		if(this._errorFloorDic.get(px+"_"+py)!=null)
			return this._errorFloorDic.get(px+"_"+py);
		cType = Tiled_Ground.getIns().getFloorTypeByArea(px+this._gridW_HALF,py+this._gridH_HALF);
		this._errorFloorDic.set(px+"_"+py,cType);
		return cType;
	}

	//初始化格子
	private initTileds(sx: number, sy: number): void {
		var gridX_1: number = Math.floor(sx / this._gridW) - 1;
		var gridX_2: number = gridX_1 + this._wCount;
		var gridY_1: number = (Math.floor(sy / this._gridH) - 1) * 2;
		var gridY_2: number = gridY_1 + this._hCount;
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxGridW)
			gridX_2 = this._maxGridW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxGridH)
			gridY_2 = this._maxGridH;
		this.initCreate(gridX_1, gridX_2, gridY_1, gridY_2);
	}

	/**
	 * 拼装地板
	 * 用一个字典来存放（key->格子编号）
	 * 计算左上角的点对应的格子编号(可以得到应该显示的格子编号范围)
	 * 通过和上一次格子的移动方向对比，可以确定删除哪些，同时可以确定添加哪些
	 * 添加格子的时候直接取baseMap像素*系数可获得格子位置
	 * 通过像素和格子的宽度和高度，可以获得当前格子的编号
	 * 通过格子编号可获得格子坐标
	 */
	private synTileds(sx: number, sy: number): void {
		var gridX_1: number = Math.floor(sx / this._gridW) - 1;
		var gridX_2: number = gridX_1 + this._wCount;
		var gridY_1: number = (Math.floor(sy / this._gridH) - 1) * 2;
		var gridY_2: number = gridY_1 + this._hCount;
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxGridW)
			gridX_2 = this._maxGridW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxGridH)
			gridY_2 = this._maxGridH;
		this.changeDeleteAndCreate(gridX_1, gridX_2, gridY_1, gridY_2);
	}

	/**初始化到指定的xy */
	public initPosition(toX: number, toY: number): void {
		this._startX = toX;
		this._startY = toY;
		this.initTileds(this._startX - this._offsetW, this._startY - this._offsetH);
	}

	/**同步到指定的x,y */
	public synPosition(toX: number, toY: number):boolean {
		if (Math.abs(this._startX - toX) > this._offsetW || Math.abs(this._startY - toY) > this._offsetH) {
			this._changeDrawCount ++;
			if(this._changeDrawCount>=10)
			{
				this._errorFloorDic.clear();
				this._changeDrawCount=0;
			}
			this._preAddFloors = [];
			this._startX = toX;
			this._startY = toY;
			this.synTileds(this._startX - this._offsetW, this._startY - this._offsetH);
		}
		if (this._preAddFloors.length <= 0)
			return true;
		this._addCount = 0;
		while (this._preAddFloors.length > 0 && this._addCount < this._balance)
			this.balanceAddFloor(this._preAddFloors.shift(), this._preAddFloors.shift());
		return false;
	}
}