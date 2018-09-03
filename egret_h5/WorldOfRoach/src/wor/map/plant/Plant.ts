/**
 * 基础植物类
 */
class Plant extends egret.DisplayObjectContainer implements ILink, IRole {

	private static _optRound:number = 20;
	private _data: Object;
	private _preLink: ILink;
	private _nextLink: ILink;
	private _ak: string;
	private _rectX: number;
	private _rectY: number;
	private _rectW: number;
	private _rectH: number;
	private _gx: number;//碰撞检测框x
	private _gy: number;//碰撞检测框y

	public constructor() {
		super();
		var shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0x000000, 1);
		shape.graphics.drawRect(-20, -250, 40, 250);
		shape.graphics.beginFill(0x00FF00, 1);
		shape.graphics.drawRect(-70, -250, 140, 80);
		shape.graphics.endFill();
		this.addChild(shape);
		this._rectX = -20;
		this._rectY = -30;
		this._rectW = 40;
		this._rectH = 30;
	}

	//是否可操作
	public tryOption(px: number, py: number): number {
		if((px>=this._gx-Plant._optRound&&px<=this._gx+this._rectW+Plant._optRound)&&(py>=this._gy-Plant._optRound&&py<=this._gy+this._rectH+Plant._optRound))
			return Math.abs(Math.min(px-(this._gx-Plant._optRound),this._gx+this._rectW+Plant._optRound-px));
		return -1;
	}

	//是否已碰撞
	public hitTestArea(px: number, py: number): boolean {
		return (px>=this._gx&&px<=this._gx+this._rectW)&&(py>=this._gy&&py<=this._gy+this._rectH);
	}

	public setData(data: Object): void {
		this._data = data;
	}

	public getData(): Object {
		return this._data;
	}
	public getPre(): ILink {
		return this._preLink;
	}
	public setPre(target: ILink): void {
		this._preLink = target;
	}
	public getNext(): ILink {
		return this._nextLink;
	}
	public setNext(target: ILink): void {
		this._nextLink = target;
	}
	public setAreaKey(ak: string): void {
		this._ak = ak;
	}
	public getAreaKey(): string {
		return this._ak;
	}
	public removed(): void {

	}
	public added(): void {
		this._gx = this.x + this._rectX;
		this._gy = this.y + this._rectY;
	}
	public getOptType():string{
		return RoleType.POLE_PLANT;
	}
}