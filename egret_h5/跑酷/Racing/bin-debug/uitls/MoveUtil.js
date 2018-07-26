var game;
(function (game) {
    /**
     * 移动工具类
     * @ author xsstomy
     * 这里大家可以扩展一下设置方向，x轴。我这里默认为y轴方向的移动
     */
    var MoveUtil = (function (_super) {
        __extends(MoveUtil, _super);
        function MoveUtil(target, isLoop) {
            if (isLoop === void 0) { isLoop = true; }
            _super.call(this);
            this._startPos = new egret.Point(0, 0); //默认起点位置
            this._endPos = new egret.Point(0, game.Data.stageH); //默认终点位置
            this._speedY = 6;
            this._startSpeedY = 6; //初始速度
            this.obj = null;
            this.isLoop = true; //是否循环移动,默认为true
            this._aSpeedY = 0.1;
            this.isGetDistance = false; // 默认不获取
            this.preEnterFrameTime = 0; //上一次移动的时间点
            this.moveFrameNum = 60; //固定时间
            this.obj = target;
            this.isLoop = isLoop;
        }
        var d = __define,c=MoveUtil;p=c.prototype;
        d(p, "startPos",undefined
            ,function (value) {
                if (this._startPos !== value) {
                    this._startPos = value;
                }
            }
        );
        d(p, "endPos",undefined
            ,function (value) {
                if (this._endPos !== value) {
                    this._endPos = value;
                }
            }
        );
        d(p, "speedY",undefined
            ,function (value) {
                if (this._startSpeedY !== value) {
                    this._startSpeedY = value;
                }
            }
        );
        //是否获取数据，设置全局数据
        p.getDistance = function (isTrue) {
            if (isTrue === void 0) { isTrue = false; }
            this.isGetDistance = isTrue;
        };
        p.onEnterFrame = function () {
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
                    game.Data.distanceLength += (this._speedY + this._startSpeedY) * 0.5;
                    game.Data.currentSpeedY = this._speedY;
                }
            }
        };
        return MoveUtil;
    })(egret.Sprite);
    game.MoveUtil = MoveUtil;
    egret.registerClass(MoveUtil,"game.MoveUtil");
})(game || (game = {}));
