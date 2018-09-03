/**
 * 焦点目标,一旦被设置为场景焦点后可以控制场景摄像机位置
 * @author nodep
 * @version 1.0
 */
class FocusRole extends egret.DisplayObjectContainer implements IFocus, IRender, ILink, IRole {

	private static _addId: number = 0;
	public __isFocus: boolean = false;
	public id: number = 0;
	public type: string;
	public speedX: number;
	public speedY: number;
	private _preLink: any;
	private _nextLink: any;
	private _ak: string;

	public constructor() {
		super();
		FocusRole._addId++;
		this.id = FocusRole._addId;
	}

	public renderUpdate(interval: number): void {

	}

	/**增加到世界 */
	public addToWorld(): void {
		RenderManager.getIns().registRender(this);
	}

	/**设置当前焦点 */
	public setFocus(flag: boolean): FocusRole {
		this.__isFocus = flag;
		return this;
	}

	/**检查自己的Y轴排序 */
	protected checkPosY(): void {
		while (this._preLink && this.y < this._preLink["y"]) {
			StageLayer.self.gotoPre(this);
		}
		while (this._nextLink && this.y > this._nextLink["y"]) {
			StageLayer.self.gotoNext(this);
		}
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

	}
	public tryOption(px: number, py: number): number {
		return 0;
	}
	public hitTestArea(px:number,py:number):boolean{
		return false;
	}
	public getOptType():string{
		return this.type;
	}
}