/**
 * 平铺世界的基础容器
 * @author nodep qq623440028
 * @version 1.0
 */
class Tiled_Ground extends egret.DisplayObjectContainer implements IRender {
	
	private static _ins: Tiled_Ground;
	public stageW:number;//舞台宽度
	public stageH:number;//舞台高度
	public worldWidth:number;//世界宽度
	public worldHeight:number;//世界高度
	public cf_X:number;//x系数
	public cf_Y:number;//y系数
	private _self:PlayerRole;//自己
	private _focus:FocusRole;
	public roleMap:Map<number,FocusRole>//场景中受管理的角色对象
	private _groud:GroundLayer;

	//世界只有一个
	public static getIns(): Tiled_Ground {
		if (null == Tiled_Ground._ins)
			Tiled_Ground._ins = new Tiled_Ground();
		return Tiled_Ground._ins;
	}

	public constructor(){
		super();
		this.scaleX = WinsManager.scaleX;
		this.scaleY = WinsManager.scaleY;
	}

	/**刷新函数 */
	public renderUpdate(interval:number) {
		this._groud.synPositionTo(this._focus.x,this._focus.y);
	}

	/**
	 * 获取地图类型 
	 * 由于这个坑货的颜色并不连贯,所以不能用这个方法取颜色了。包括河流（暂时不做河流了，因为颜色不连贯）
	 */
	public getFloorType(px:number,py:number):number
	{
		px = Math.floor(px/this.cf_X);
		py = GameData.mapData.baseMap._bitmapHeight - Math.floor(py/this.cf_Y);
		return GameData.mapData.getFloorType(px,py);
	}

	/**
	 * 根据坐标获取对应区域类型
	 */
	public getFloorTypeByArea(px:number,py:number):number
	{
		px = Math.floor(px/this.cf_X);
		py = Math.floor(py/this.cf_Y);
		return GameData.mapData.getFloorTypeByArea(px,py);
	}

	/**设置当前焦点对象 */
	public setFocus(roleId:number):void
	{
		if(this._focus!=null)
			this._focus.__isFocus = false;
		this._focus = this.roleMap.get(roleId);
		this._focus.__isFocus = true;
	}

	/**添加一个焦点显示对象 */
	public addFocusRole(role:FocusRole):void
	{
		this.roleMap.set(role.id,role);
		this._groud.addRole(role);
		role.addToWorld();
	}

	//初始化地图
	public initWorld(worldW:number,worldH:number):void {
		this.roleMap = new Map<number,FocusRole>();
		this.stageW = WinsManager.getIns().gameStage().stageWidth;
		this.stageH = WinsManager.getIns().gameStage().stageHeight;
		this.worldWidth = worldW;
		this.worldHeight = worldH;
		this.cf_X = this.worldWidth/GameData.mapData.baseMap._bitmapWidth;
		this.cf_Y = this.worldHeight/GameData.mapData.baseMap._bitmapHeight;
		this._groud = new GroundLayer(this.stageW,this.stageH,this.worldWidth,this.worldHeight);
		this.addChild(this._groud);
		this.createSelf();
		RenderManager.getIns().registRender(this);
	}

	/**将自己添加到场景*/
	private createSelf():void
	{
		this._self = new PlayerRole();
		this._self.x = GameData.playerData.posX * this.cf_X;
		this._self.y = GameData.playerData.posY * this.cf_Y;
		this._groud.initPosition(this._self.x,this._self.y);
		this.addFocusRole(this._self);
		this.setFocus(this._self.id);
		this._self.amendPosition();
	}
}