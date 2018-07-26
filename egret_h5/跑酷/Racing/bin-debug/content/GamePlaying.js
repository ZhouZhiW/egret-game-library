var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var GamePlaying = (function (_super) {
        __extends(GamePlaying, _super);
        function GamePlaying() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene); //自定义事件
            this.isTouching = false;
            this.startTouchPos = new egret.Point(); //记录触摸初始点坐标
            this.carsName = ["car0_png", "car1_png", "car2_png"]; //车资源名称
            this.preProduceCarTime = 0; //记录上次生产车的时间
            this.sumSarsNum = 0; // 生产的所有的车子的总数
            this.skinName = "gamePlayingSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }
        var d = __define,c=GamePlaying;p=c.prototype;
        //添加的到舞台
        p.onAdded = function (e) {
            //初始化
            egret.Tween.get(this.carlight, { loop: true }).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300);
            this.bgMoveUtil = new game.MoveUtil(this.bg);
            this.bg1MoveUtil = new game.MoveUtil(this.bg1);
            this.roadblockMoveUtil = new game.MoveUtil(this.roadblock, false);
            this.bgMoveUtil.startPos = new egret.Point(0, 0);
            this.bgMoveUtil.endPos = new egret.Point(0, game.Data.stageH);
            this.bg1MoveUtil.startPos = new egret.Point(0, -game.Data.stageH);
            this.bg1MoveUtil.endPos = new egret.Point(0, 0);
            //自定义事件
            this.sceneEvent.eventType = game.SceneEvent.GAME_END;
            this.sceneEvent.eventObj = this;
            this.roadblockMoveUtil.startPos = new egret.Point(80, 416); //这里是皮肤视图里面的数值，这里根据大家的设定自己设置
            this.roadblockMoveUtil.endPos = new egret.Point(0, game.Data.stageH);
            this.bgMoveUtil.getDistance(true); //这里只需要一个设置为true就可以。
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        p.onTouchBegin = function (e) {
            this.isTouching = true;
            this.startTouchPos.x = e.stageX;
            this.startTouchPos.y = e.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        };
        p.onTouchMove = function (e) {
            var _this = this;
            if (this.isTouching) {
                if (e.stageX - this.startTouchPos.x > 50) {
                    //向右移动
                    this.isTouching = false;
                    egret.Tween.get(this.carlight).to({ x: 281 }, 300);
                    egret.Tween.get(this.hero).to({ x: 287 }, 300).call(function (e) {
                        _this.isTouching = true;
                    }, this);
                }
                else if (e.stageX - this.startTouchPos.x < -50) {
                    //向左移动
                    this.isTouching = false;
                    egret.Tween.get(this.carlight).to({ x: 94 }, 300);
                    egret.Tween.get(this.hero).to({ x: 100 }, 300).call(function (e) {
                        _this.isTouching = true;
                    }, this);
                }
            }
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        p.onTouchEnd = function (e) {
            this.isTouching = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        //离开舞台
        p.onRemoved = function () {
            this.resetData();
        };
        //重置数据
        p.resetData = function () {
            this.bg.y = 0;
            this.bg1.y = -game.Data.stageH;
            this.roadblock.x = 80;
            this.roadblock.y = 416;
            this.carlight.x = 281;
            this.hero.x = 287;
            game.Data.distanceLength = 0;
            game.CarFactory.getInstance().liveCarArray.length = 0;
        };
        //游戏结束抛事件
        p.onGameOver = function () {
            this.carLayer.removeChildren();
            egret.Tween.removeTweens(this.carlight);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        //每帧
        p.onEnterFrame = function (e) {
            //检测游戏是否结束
            if (this.isOver()) {
                this.onGameOver();
            }
            //随即生产小车
            var time = egret.getTimer();
            if (time - this.preProduceCarTime > Math.floor(Math.random() * 500 + 1500)) {
                this.randomProduceCar();
                this.preProduceCarTime = time;
            }
            //移动小车
            if (game.CarFactory.getInstance().liveCarArray.length) {
                for (var i = game.CarFactory.getInstance().liveCarArray.length - 1, car; i >= 0; i--) {
                    car = game.CarFactory.getInstance().liveCarArray[i];
                    car.setSpeed(game.Data.currentSpeedY - 2);
                    car.onEnterFrame();
                }
            }
            this.bg1MoveUtil.onEnterFrame();
            this.bgMoveUtil.onEnterFrame();
            this.roadblockMoveUtil.onEnterFrame();
            this.distanceNum.text = Math.floor(game.Data.distanceLength).toString();
        };
        //判断是否结束
        p.isOver = function () {
            if (game.Data.distanceLength >= game.Data.targetDistance) {
                game.Data.gameResult = true;
                return true;
            }
            for (var i = game.CarFactory.getInstance().liveCarArray.length - 1, car; i >= 0; i--) {
                car = game.CarFactory.getInstance().liveCarArray[i];
                if (this.isHit(car, this.hero)) {
                    game.Data.gameResult = false;
                    return true;
                }
            }
            return false;
        };
        //随即生产小车
        p.randomProduceCar = function () {
            this.sumSarsNum++;
            var index = Math.floor(Math.random() * 3);
            var car = game.CarFactory.getInstance().produce(this.carsName[index]);
            var n = Math.floor(Math.random() * 2);
            car.init(n);
            car.setSpeed(game.Data.currentSpeedY - 2);
            this.carLayer.addChild(car);
        };
        //碰撞检测
        p.isHit = function (target1, target2) {
            var rect1 = target1;
            var rect2 = target2;
            if (Math.abs(rect1.x - rect2.x) < (rect1.width + rect2.width) * 0.5 && Math.abs(rect1.y - rect2.y) < (rect1.height + rect2.height) * 0.5) {
                return true;
            }
            return false;
        };
        return GamePlaying;
    })(eui.Component);
    game.GamePlaying = GamePlaying;
    egret.registerClass(GamePlaying,"game.GamePlaying");
})(game || (game = {}));
