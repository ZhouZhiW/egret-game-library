/**
 * 进度条
 * @author nodep
 * @version 1.0
 */
class ProgressBar {

	private _maskShape:egret.Shape;
	private _maxWidth:number = 0;
	private _maxHeight:number = 0;
	private _cur:number = -1;
	private _total:number = -1;
	

	/**
	 * 创建进度条
	 */
	public constructor(dis:egret.DisplayObject) {
		this._maskShape = new egret.Shape();
		dis.mask = this._maskShape;
		this._maskShape.x = dis.x;
		this._maskShape.y = dis.y;
		dis.parent.addChild(this._maskShape);
		this._maxWidth = dis.width;
		this._maxHeight = dis.height;
	}

	/**
	 * 设置进度
	 */
	public setProgress(cur:number,total:number):void
	{
		this._maskShape.graphics.clear();
		this._maskShape.graphics.beginFill(0,1)
		this._maskShape.graphics.drawRect(0,0,Math.trunc(this._maxWidth*cur/total),this._maxHeight);
		this._maskShape.graphics.endFill();
	}
}