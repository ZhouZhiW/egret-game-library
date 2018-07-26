module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
	export class GamePlaying extends eui.Component {
		public constructor() {
            super();
            this.skinName = "gamePlayingSkin";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}


		public distanceNum: eui.BitmapLabel;
		public carlight: eui.Image;
		public bg: eui.Image;
		public bg1: eui.Image;
		public hero: eui.Image;
		public roadblock: eui.Image;
		
        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);//自定义事件
		private bgMoveUtil: MoveUtil;
		private bg1MoveUtil: MoveUtil;
		private roadblockMoveUtil: MoveUtil;
		private isTouching: boolean = false;
		private startTouchPos: egret.Point = new egret.Point();//记录触摸初始点坐标
		private carsName: Array<string> = ["car0_png", "car1_png", "car2_png"];//车资源名称
		private preProduceCarTime: number = 0;//记录上次生产车的时间
		private carLayer: eui.Group;//车子层级
		private sumSarsNum: number = 0;// 生产的所有的车子的总数
		//添加的到舞台
		private onAdded(e: egret.Event) {
			//初始化
			egret.Tween.get(this.carlight, { loop: true }).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300);
			this.bgMoveUtil = new MoveUtil(this.bg);
			this.bg1MoveUtil = new MoveUtil(this.bg1);
			this.roadblockMoveUtil = new MoveUtil(this.roadblock, false);

			this.bgMoveUtil.startPos = new egret.Point(0, 0);
			this.bgMoveUtil.endPos = new egret.Point(0, Data.stageH);

			this.bg1MoveUtil.startPos = new egret.Point(0, -Data.stageH);
			this.bg1MoveUtil.endPos = new egret.Point(0, 0);
			
			
			
			//自定义事件
			this.sceneEvent.eventType = SceneEvent.GAME_END;
			this.sceneEvent.eventObj = this;

			this.roadblockMoveUtil.startPos = new egret.Point(80, 416);//这里是皮肤视图里面的数值，这里根据大家的设定自己设置
			this.roadblockMoveUtil.endPos = new egret.Point(0, Data.stageH);

			this.bgMoveUtil.getDistance(true); //这里只需要一个设置为true就可以。
			
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

		}


		private onTouchBegin(e: egret.TouchEvent) {
			this.isTouching = true;
			this.startTouchPos.x = e.stageX;
			this.startTouchPos.y = e.stageY;
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		}

		private onTouchMove(e: egret.TouchEvent) {

			if (this.isTouching) {

				if (e.stageX - this.startTouchPos.x > 50) {
					//向右移动
					this.isTouching = false;
					egret.Tween.get(this.carlight).to({ x: 281 }, 300);
					egret.Tween.get(this.hero).to({ x: 287 }, 300).call(e=> {
						this.isTouching = true;
					}, this);
				}

				else if (e.stageX - this.startTouchPos.x < -50) {
					//向左移动
					this.isTouching = false;
					egret.Tween.get(this.carlight).to({ x: 94 }, 300);
					egret.Tween.get(this.hero).to({ x: 100 }, 300).call(e=> {
						this.isTouching = true;
					}, this);
				}
			}
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		private onTouchEnd(e: egret.TouchEvent) {

			this.isTouching = false;
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}
		
		
		
		//离开舞台
		private onRemoved() {
			this.resetData();
		}

		//重置数据
		private resetData() {
			this.bg.y = 0;
			this.bg1.y = -Data.stageH;
			this.roadblock.x = 80;
			this.roadblock.y = 416;
			this.carlight.x = 281;
			this.hero.x = 287;
			Data.distanceLength = 0;
			CarFactory.getInstance().liveCarArray.length = 0;
			
		}

		//游戏结束抛事件
		private onGameOver() {
			
			this.carLayer.removeChildren();
			egret.Tween.removeTweens(this.carlight);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
		}

		//每帧
		private onEnterFrame(e: egret.Event) {

			//检测游戏是否结束
			if (this.isOver()) {
				this.onGameOver();
			}


			//随即生产小车
			var time: number = egret.getTimer();
			if (time - this.preProduceCarTime > Math.floor(Math.random() * 500 + 1500)) {
				this.randomProduceCar();
				this.preProduceCarTime = time;
			}
			
			//移动小车
			if (CarFactory.getInstance().liveCarArray.length) {
				for (var i = CarFactory.getInstance().liveCarArray.length - 1, car: Car; i >= 0; i--) {
					car = CarFactory.getInstance().liveCarArray[i];
					car.setSpeed(Data.currentSpeedY - 2);
					car.onEnterFrame();
				}
			}


			this.bg1MoveUtil.onEnterFrame();
			this.bgMoveUtil.onEnterFrame();
			this.roadblockMoveUtil.onEnterFrame();

			this.distanceNum.text = Math.floor(Data.distanceLength).toString();

		}
		
		//判断是否结束
		private isOver(): boolean {
			if (Data.distanceLength >= Data.targetDistance) {
				Data.gameResult = true;
				return true;
			}

			for (var i = CarFactory.getInstance().liveCarArray.length - 1, car: Car; i >= 0; i--) {
				car = CarFactory.getInstance().liveCarArray[i];
				if (this.isHit(car, this.hero)) {
					Data.gameResult = false;
					return true;
				}
			}
			return false;
		}

		//随即生产小车
		private randomProduceCar() {
			this.sumSarsNum++;
			var index = Math.floor(Math.random() * 3);
			var car: Car = CarFactory.getInstance().produce(this.carsName[index]);
			var n = Math.floor(Math.random() * 2);
			car.init(n);
			car.setSpeed(Data.currentSpeedY - 2);
			this.carLayer.addChild(car);
		}

		//碰撞检测
		private isHit(target1: any, target2: any): boolean {

			var rect1 = target1;
			var rect2 = target2;

			if (Math.abs(rect1.x - rect2.x) < (rect1.width + rect2.width) * 0.5 && Math.abs(rect1.y - rect2.y) < (rect1.height + rect2.height) * 0.5) {
				return true;
			}

			return false;

		}
	}
}
