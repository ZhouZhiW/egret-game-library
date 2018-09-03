/**
 * 基于位图的地砖
 * @author nodep
 * @version 1.0
 */
class TiledFloorBase extends egret.Bitmap implements IFloor {
	public static GW: number;
	public static GH: number;
	public static GW_HALF:number;
	public static GH_HALF:number;
	private static _floorDic:Map<number, egret.BitmapData> = new Map<number, egret.BitmapData>();
	public fType:number;
	public posx:number;
	public posy:number;

	public constructor() {
		super();
	}

	public getType():number{
		return this.fType;
	}

	public removeFloor(): IFloor {
		this.parent.removeChild(this);
		return this;
	}

	public standOn():void
	{
		this.alpha = 0.5;
	}

	public setPosition(px: number,py: number):void
	{
		this.posx = px;
		this.posy = py;
		if (py % 2 == 0) {//偶数行
			this.x = px*TiledFloorBase.GW - TiledFloorBase.GW/2;
			this.y = py/2*TiledFloorBase.GH - TiledFloorBase.GH/2;
		}
		else {
			this.x = px*TiledFloorBase.GW;
			this.y = (py-1)/2*TiledFloorBase.GH;
		}
	}

	public createFloor(p: egret.DisplayObjectContainer, px: number, py: number): void {
		this.setPosition(px,py);
		this.fType = Tiled_Ground.getIns().getFloorType(this.x + TiledFloorBase.GW_HALF,this.y + TiledFloorBase.GH_HALF);
		this.bitmapData = TiledFloorBase.getBitmapData(this.fType);
		p.addChild(this);
	}

	/**重新构建 */
	public reCreate(ct:number):void
	{
		this.fType = ct;
		this.bitmapData = TiledFloorBase.getBitmapData(this.fType);
	}

	//获取地板贴图
	private static getBitmapData(cType:number):egret.BitmapData
	{
		if(cType<0)
			return null;
		//LogTrace.log(npx+"x"+npy+"_"+px+"x"+py+"创建颜色"+cType);
		if (this._floorDic.get(cType) == null) {
			var tx: egret.RenderTexture = new egret.RenderTexture();
			var shape: egret.Shape = new egret.Shape();
			shape.graphics.beginFill(cType);
			shape.graphics.lineStyle(1, cType, 1);
			shape.graphics.moveTo(GameConfig.GRID_W / 2, 0);
			shape.graphics.lineTo(GameConfig.GRID_W, GameConfig.GRID_H / 2);
			shape.graphics.lineTo(GameConfig.GRID_W / 2, GameConfig.GRID_W / 2);
			shape.graphics.lineTo(0, GameConfig.GRID_H / 2);
			shape.graphics.lineTo(GameConfig.GRID_W / 2, 0);
			shape.graphics.endFill();
			tx.drawToTexture(shape);
			this._floorDic.set(cType, tx.bitmapData);
		}
		return this._floorDic.get(cType);
	}
}