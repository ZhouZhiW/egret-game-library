module game {
	/**
	 * 移动工具类
	 * @ author xsstomy
	 * 这里大家可以扩展一下设置方向，x轴。我这里默认为y轴方向的移动
	 */
	export class MoveUtil extends egret.Sprite {
		public constructor(target: any, isLoop: boolean = true) {
			super();
			this.obj = target;
			this.isLoop = isLoop;

		}

		private _startPos: egret.Point = new egret.Point(0, 0); //默认起点位置
		private _endPos: egret.Point = new egret.Point(0, Data.stageH);//默认终点位置
		private _speedY: number = 6;
		private _startSpeedY: number = 6;//初始速度
		private obj: any = null;
		private isLoop: boolean = true; //是否循环移动,默认为true
		private _aSpeedY: number = 0.1;
		public isGetDistance: boolean = false;// 默认不获取
		private preEnterFrameTime: number = 0;//上一次移动的时间点
		private moveFrameNum: number = 60;//固定时间
		public set startPos(value: egret.Point) {
			if (this._startPos !== value) {
				this._startPos = value;
			}
		}


		public set endPos(value: egret.Point) {
			if (this._endPos !== value) {
				this._endPos = value;
			}
		}

		public set speedY(value: number) {
			if (this._startSpeedY !== value) {
				this._startSpeedY = value;
			}
		}
		
		//是否获取数据，设置全局数据
		public getDistance(isTrue: boolean = false) {
			this.isGetDistance = isTrue;
		}


		public onEnterFrame() {
			if (!this.obj) {
				return null;
			}
			
			this.obj.y += Math.floor(this._speedY);

			//设置速度上限
			if (this._speedY >= 20) {
				this._speedY = 20;
			}

			if (this.obj.y >= this._endPos.y && this.isLoop) {
				this.obj.y = this._startPos.y;
			}
			else if (this.obj.y >= this._endPos.y && !this.isLoop) {

				this.obj = null;
				return;
			}

			var time = Date.now();
			if (time - this.preEnterFrameTime > this.moveFrameNum) {

				this.preEnterFrameTime = time;
				this._speedY += this._aSpeedY;
				// console.log("speedY " + this._speedY);

				if (this.isLoop && this.isGetDistance) {

					Data.distanceLength += (this._speedY + this._startSpeedY) * 0.5;
					Data.currentSpeedY = this._speedY;

					// console.log("speed = " + Data.currentSpeedY + " distance = " + Data.distanceLength);
				}

			}

		}

	}
}