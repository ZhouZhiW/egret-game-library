var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var d5power;
(function (d5power) {
    var Car = (function (_super) {
        __extends(Car, _super);
        function Car(map) {
            var _this = _super.call(this, map) || this;
            /**
             * 转向角度
             */
            _this._turnRoation = 0;
            /**
             * 速度
             */
            _this._speed = 0;
            /**
             * 推进
             */
            _this._powerOn = false;
            /**
             * 摩擦力
             */
            _this._friction = 1;
            _this._rotationSpeed = 2;
            _this._targetTurnRotaion = 0;
            _this._targetTurnDir = 1;
            _this._lastParticle = 0;
            return _this;
        }
        Car.prototype.engineOn = function (speed) {
            this._speed = speed;
            this._powerOn = true;
        };
        Car.prototype.engineOff = function () {
            this._powerOn = false;
        };
        Object.defineProperty(Car.prototype, "turnRoation", {
            get: function () {
                return this._turnRoation;
            },
            set: function (value) {
                if (Math.abs(this._turnRoation - value) > 180) {
                    this._turnRoation += value > 0 ? 360 : -360;
                }
                this._targetTurnRotaion = value;
                this._targetTurnDir = value > this._turnRoation ? 1 : -1;
            },
            enumerable: true,
            configurable: true
        });
        Car.prototype.run = function (t) {
            if (this._targetTurnRotaion != this._turnRoation) {
                this._turnRoation = Math.abs(this._turnRoation - this._targetTurnRotaion) > this._rotationSpeed ? this._turnRoation + this._targetTurnDir * this._rotationSpeed : this._targetTurnRotaion;
            }
            this._monitor.rotation = this._turnRoation; //汽车转向
            //汽车位移
            var vx = this._speed * Math.cos(this._turnRoation * Car.PI_180);
            var vy = this._speed * Math.sin(this._turnRoation * Car.PI_180);
            this._pos.x += vx;
            this._pos.y += vy;
            if (!this._powerOn) {
                this._speed = this._speed * this._friction; //摩擦力
            }
            // if(Math.abs(this._turnRoation-0)>.1)
            // {
            //     this._turnRoation+=(0-this._turnRoation)/2;
            // }else{
            //     this._turnRoation = 0;
            // }
            _super.prototype.run.call(this, t);
            if (t - this._lastParticle > 40) {
                this._lastParticle = t;
                for (var i = 0, j = this._particlePoints.length; i < j; i++) {
                    var p = this._monitor.localToGlobal(this._particlePoints[i].x, this._particlePoints[i].y);
                    p = this._map.getWorldPostion(p.x, p.y);
                    Main.me.game.particle.graphicsScale(p.x, p.y, 0xffffff, 20, 1, -.05);
                }
            }
        };
        Car.prototype.onResReady = function (data) {
            _super.prototype.onResReady.call(this, data);
            var p1 = new egret.Point(data.textureWidth * .2, data.textureHeight * .1);
            var p2 = new egret.Point(data.textureWidth * .2, data.textureHeight * .9);
            this._particlePoints = [p1, p2];
        };
        /**
         * 最大转向角
         */
        Car.maxLunRota = 45;
        Car.PI_180 = Math.PI / 180;
        Car.l80_PI = 180 / Math.PI;
        return Car;
    }(d5power.SingleFrameCharacter));
    d5power.Car = Car;
    __reflect(Car.prototype, "d5power.Car");
})(d5power || (d5power = {}));
//# sourceMappingURL=Car.js.map