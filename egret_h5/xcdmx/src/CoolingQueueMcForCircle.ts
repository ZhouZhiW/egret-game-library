/**
 * 圆圈进度条遮罩
 * @author nodep
 * @version 1.0
 */
class CoolingQueueMcForCircle {

	private _mask: egret.Shape;
	private _w: number = 0;//最大矩形框图
	private _target: egret.DisplayObject;

	public constructor(target: egret.DisplayObject, w: number) {
		this._target = target;
		this._mask = new egret.Shape();
		this._mask.x = target.x + target.width / 2;
		this._mask.y = target.y + target.height / 2;
		target.parent.addChildAt(this._mask, target.parent.getChildIndex(this._target) + 1);
		this._target.mask = this._mask;
		this._w = w;
	}

	/**画框的顺序*/
	private static _drawRectPoints: any[] = [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];

	/**
		 * 设置当前的进度
		 * @param lastTime
		 * @param total
		 */
	public setProgress(lastTime: number, total: number): void {
		if (!this._mask)
			return;
		this._mask.graphics.clear();
		if (lastTime >= total) {
			this._mask.graphics.beginFill(0);
			// this._mask.graphics.drawCircle(0, 0, this._w);
			this._mask.graphics.drawRect(-this._w, -this._w, this._w * 2, this._w * 2);
			this._mask.graphics.endFill();
			return;
		}
		this._mask.graphics.beginFill(0, 1);
		this._mask.graphics.lineStyle(1);
		this._mask.graphics.moveTo(0, 0);
		var passTime: number = 360 * lastTime / total;
		var passRad: number = Math.PI / 180 * passTime;
		var tox: number;
		var toy: number;
		var startX: number = 0;
		if (passTime <= 45)//小于45度
		{
			tox = this._w * Math.tan(passRad);
			toy = -this._w;
			startX = 1;
		}
		else if (passTime <= 90) {
			tox = this._w;
			toy = -this._w * Math.tan(Math.PI / 180 * 90 - passRad);
			startX = 2;
		}
		else if (passTime <= 135) {
			tox = this._w;
			toy = this._w * Math.tan(passRad - Math.PI / 180 * 90);
			startX = 3;
		}
		else if (passTime <= 180) {
			toy = this._w;
			tox = this._w * Math.tan(Math.PI - passRad);
			startX = 4;
		}
		else if (passTime <= 225) {
			toy = this._w;
			tox = -this._w * Math.tan(passRad - Math.PI);
			startX = 5;
		}
		else if (passTime <= 270) {
			tox = -this._w;
			toy = this._w * Math.tan(Math.PI / 180 * 270 - passRad);
			startX = 6;
		}
		else if (passTime <= 315) {
			tox = -this._w;
			toy = -this._w * Math.tan(passRad - Math.PI / 180 * 270);
			startX = 7;
		}
		else {
			toy = -this._w;
			tox = -this._w * Math.tan(Math.PI * 2 - passRad);
			startX = 8;
		}
		this._mask.graphics.lineTo(tox, toy);
		this.drawRect(startX);
	}

	/**
	 * 绘制
	 * @param start
	 */
	private drawRect(start: number): void {
		for (start; start >= 0; start--) {
			var args: any[] = CoolingQueueMcForCircle._drawRectPoints[start];
			this._mask.graphics.lineTo(args[0] * this._w, args[1] * this._w);
		}
		this._mask.graphics.endFill();
	}
}