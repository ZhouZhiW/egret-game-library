module game {
	export class Car extends egret.Bitmap {
		public constructor(textureName: string) {
			super();
			this.name = textureName;
			this.texture = RES.getRes(textureName);
			if (this.texture == null) {
				console.log("car 资源名称不对");
			}

			this.addEventListener(egret.Event.ADDED, this.onAdded, this);
		}
		private startPos: egret.Point = new egret.Point();
		private move: MoveUtil = new MoveUtil(this, false);//移动工具类，设置false默认只移动一次
		public init(num: number = 0) {

			var startPosX: number = num == 0 ? 100 : 280;

			this.move.startPos = new egret.Point(0, -this.texture.textureHeight);
			this.move.endPos = new egret.Point(0, Data.stageH);

			this.startPos.x = startPosX;
			this.startPos.y = -this.texture.textureHeight;
		}
		
		//添加到舞台事件
		private onAdded() {
			this.x = this.startPos.x;
			this.y = this.startPos.y;
		}

		public onEnterFrame() {
			if (this.move) {
				this.move.onEnterFrame();
				if(this.y > Data.stageH){
					this.distory();
				}
				
			}

		}
		//设置速度
		public setSpeed(speed: number) {
			this.move.speedY = speed;
		}
		
		private distory()
		{
			if(this && this.parent)
			{
				this.parent.removeChild(this);
				CarFactory.getInstance().reclaim(this);
			}
		}
	}
}