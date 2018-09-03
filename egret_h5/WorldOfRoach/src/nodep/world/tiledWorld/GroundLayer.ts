/**
 * 地图基础容器
 * @author nodep
 * @version 1.0
 */
class GroundLayer extends egret.DisplayObjectContainer{
	private _maxW:number;
	private _maxH:number;
	private _worldW:number;
	private _worldH:number;
	private _hafX:number;
	private _hafY:number;
	private _maxOffsetX:number;
	private _maxOffsetY:number;
	private _toX:number;
	private _toY:number;
	//地表
	private _floor:FloorLayer;
	private _stage:StageLayer;

	/**舞台宽度,舞台高度,世界宽度,世界高度 */
	public constructor(maxW:number,maxH:number,worldW:number,worldH:number) {
		super();
		this._maxW = maxW/WinsManager.scaleX;
		this._maxH = maxH/WinsManager.scaleY;
		this._worldW = worldW;
		this._worldH = worldH;
		this._hafX = this._maxW/2;
		this._hafY = this._maxH/2;
		this._maxOffsetX = -this._worldW+this._maxW+GameConfig.GRID_W/2;
		this._maxOffsetY = -this._worldH+this._maxH;
		this._floor = new FloorLayer(worldW,worldH);
		this.addChild(this._floor);
		this._stage = new StageLayer(worldW,worldH);
		this.addChild(this._stage);
	}

	/**初始化当前位置 */
	public initPosition(cx:number,cy:number):void
	{
		this._toX = -cx+this._hafX;
		this._toY = -cy+this._hafY;
		if(this._toX>0)
			this._toX=0;
		else if(this._toX<this._maxOffsetX)
			this._toX=this._maxOffsetX;
		if(this._toY>0)
			this._toY=0;
		else if(this._toY<this._maxOffsetY)
			this._toY=this._maxOffsetY;
		this.x = this._toX;
		this.y = this._toY;
		this._floor.initPosition(-this.x,-this.y);
		this._stage.initSynArea(-this.x,-this.y);
	}

	/**同步到当前位置 */
	public synPositionTo(cx:number,cy:number):void
	{
		this._toX = -cx+this._hafX;
		this._toY = -cy+this._hafY;
		if(this._toX>0)
			this._toX=0;
		else if(this._toX<this._maxOffsetX)
			this._toX=this._maxOffsetX;
		if(this._toY>0)
			this._toY=0;
		else if(this._toY<this._maxOffsetY)
			this._toY=this._maxOffsetY;
		this.x = this._toX;
		this.y = this._toY;
		if(this._floor.synPosition(-this.x,-this.y))
			this._stage.trySynArea(-this.x,-this.y);
	}

	/**添加一个演员 */
	public addRole(dis:egret.DisplayObject):void
	{
		this._stage.addRoleToLink(dis);
	}
}