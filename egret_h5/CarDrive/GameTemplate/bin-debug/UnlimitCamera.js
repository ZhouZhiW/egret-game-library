var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var d5power;
(function (d5power) {
    var UnlimitCamera = (function () {
        function UnlimitCamera(map) {
            this._zorderSpeed = 600;
            this._moveSpeed = 1;
            this._moveAngle = 0;
            if (UnlimitCamera._cameraView == null)
                UnlimitCamera._cameraView = new egret.Rectangle();
            this._cameraCutView = new egret.Rectangle();
            this._map = map;
        }
        Object.defineProperty(UnlimitCamera, "needreCut", {
            get: function () {
                return UnlimitCamera.$needreCut;
            },
            enumerable: true,
            configurable: true
        });
        UnlimitCamera.prototype.setZero = function (x, y) {
            x = Math.ceil(x);
            y = Math.ceil(y);
            UnlimitCamera.zeroX = x;
            UnlimitCamera.zeroY = y;
            var value = this._map.width - d5power.D5Game.screenWidth;
            //UnlimitCamera.zeroX = UnlimitCamera.zeroX < 0 ? 0 : UnlimitCamera.zeroX;
            //if(this._map.width>D5Game.screenWidth) UnlimitCamera.zeroX = UnlimitCamera.zeroX > value ? value : UnlimitCamera.zeroX;
            value = this._map.height - d5power.D5Game.screenHeight;
            //UnlimitCamera.zeroY = UnlimitCamera.zeroY < 0 ? 0 : UnlimitCamera.zeroY;
            //if(this._map.height>D5Game.screenHeight) UnlimitCamera.zeroY = UnlimitCamera.zeroY > value ? value : UnlimitCamera.zeroY;
        };
        UnlimitCamera.prototype.update = function () {
            if (this._focus)
                this.setZero(this._focus.posX - (d5power.D5Game.screenWidth >> 1), this._focus.posY - (d5power.D5Game.screenHeight >> 1));
            UnlimitCamera._cameraView.x = UnlimitCamera.zeroX;
            UnlimitCamera._cameraView.y = UnlimitCamera.zeroY;
            UnlimitCamera._cameraView.width = d5power.D5Game.screenWidth;
            UnlimitCamera._cameraView.height = d5power.D5Game.screenHeight;
        };
        Object.defineProperty(UnlimitCamera.prototype, "focus", {
            get: function () {
                return this._focus;
            },
            /**
             * 镜头注视
             */
            set: function (o) {
                if (this._focus) {
                    this._focus.beFocus = false;
                }
                this._focus = o;
                o.beFocus = true;
                this.update();
                this.reCut();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitCamera.prototype, "moveSpeed", {
            /**
             * 镜头移动速度
             */
            set: function (s) {
                this._moveSpeed = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitCamera, "cameraView", {
            /**
             * 镜头视野矩形
             * 返回镜头在世界地图内测区域
             */
            get: function () {
                return UnlimitCamera._cameraView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnlimitCamera.prototype, "cameraCutView", {
            /**
             * 镜头裁剪视野
             */
            get: function () {
                var zero_x = UnlimitCamera.zeroX;
                var zero_y = UnlimitCamera.zeroY;
                if (zero_x > 0)
                    zero_x -= this._map.tileWidth * 2;
                if (zero_x > 0)
                    zero_y -= zero_y - this._map.tileHeight * 2;
                zero_x = zero_x < 0 ? 0 : zero_x;
                zero_y = zero_y < 0 ? 0 : zero_y;
                this._cameraCutView.x = zero_x;
                this._cameraCutView.y = zero_y;
                this._cameraCutView.width = d5power.D5Game.screenWidth + this._map.tileWidth * 2;
                this._cameraCutView.height = d5power.D5Game.screenHeight + this._map.tileHeight * 2;
                return this._cameraCutView;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 镜头向上
         * @param    k    倍率
         */
        UnlimitCamera.prototype.moveNorth = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0 || UnlimitCamera.zeroY == 0)
                return;
            this.focus = null;
            this.setZero(UnlimitCamera.zeroX, UnlimitCamera.zeroY - this._moveSpeed * k);
            this.reCut();
        };
        /**
         * 镜头向下
         */
        UnlimitCamera.prototype.moveSourth = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0)
                return;
            this.focus = null;
            this.setZero(UnlimitCamera.zeroX, UnlimitCamera.zeroY + this._moveSpeed * k);
            this.reCut();
        };
        /**
         * 镜头向左
         */
        UnlimitCamera.prototype.moveWest = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0 || UnlimitCamera.zeroX == 0)
                return;
            this.focus = null;
            this.setZero(UnlimitCamera.zeroX - this._moveSpeed * k, UnlimitCamera.zeroY);
            this.reCut();
        };
        /**
         * 镜头向右
         */
        UnlimitCamera.prototype.moveEast = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0)
                return;
            this.focus = null;
            this.setZero(UnlimitCamera.zeroX + this._moveSpeed * k, UnlimitCamera.zeroY);
            this.reCut();
        };
        UnlimitCamera.prototype.move = function (xdir, ydir, k) {
            if (k === void 0) { k = 1; }
            this.focus = null;
            this.setZero(UnlimitCamera.zeroX + this._moveSpeed * xdir * k, UnlimitCamera.zeroY + this._moveSpeed * ydir * k);
            this.reCut();
        };
        /**
         * 镜头观察某点
         */
        UnlimitCamera.prototype.lookAt = function (x, y) {
            this.focus = null;
            this.setZero(x - (d5power.D5Game.screenWidth >> 1), y - (d5power.D5Game.screenHeight >> 1));
            this.reCut();
        };
        UnlimitCamera.prototype.flyTo = function (x, y, callback) {
            if (callback === void 0) { callback = null; }
            if (this._timer != null) {
                console.log("[D5Camera] Camera is moving,can not do this operation.");
                return;
            }
            this.focus = null;
            this._moveCallBack = callback;
            this._moveStart = new egret.Point(UnlimitCamera.zeroX - (d5power.D5Game.screenWidth >> 1), UnlimitCamera.zeroY - (d5power.D5Game.screenHeight >> 1));
            this._moveEnd = new egret.Point(x - (d5power.D5Game.screenWidth >> 1), y - (d5power.D5Game.screenHeight >> 1));
            this._timer = new egret.Timer(50);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.moveCamera, this);
            this._timer.start();
        };
        UnlimitCamera.prototype.moveCamera = function (e) {
            var k = 8;
            var xspeed = (this._moveEnd.x - this._moveStart.x) / k;
            var yspeed = (this._moveEnd.y - this._moveStart.y) / k;
            this._moveStart.x += xspeed;
            this._moveStart.y += yspeed;
            this.setZero(this._moveStart.x, this._moveStart.y);
            if ((xspeed > -.2 && xspeed < .2) && (yspeed > -.2 && yspeed < .2)) {
                //_scene.Map.$Center = _moveEnd;
                this._moveEnd = null;
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.moveCamera, this);
                this._timer = null;
                this.reCut();
                if (this._moveCallBack != null)
                    this._moveCallBack();
            }
        };
        Object.defineProperty(UnlimitCamera.prototype, "zorderSpeed", {
            get: function () {
                return this._zorderSpeed;
            },
            enumerable: true,
            configurable: true
        });
        UnlimitCamera.prototype.reCut = function () {
            /*
            var list:Array<IGD> = D5Game.me.dataList;
            var length:number = list.length;
            var obj:IGD;
            var contains:boolean;
            //console.log("[D5Camera] there are ",length,"objects.");
            for (var i:number = 0; i < length; i++) {
                obj = list[i];
                contains = UnlimitCamera.cameraView.containsPoint(obj.$pos);
                //console.log("[D5Camera] check ",obj.$pos,D5UnlimitCamera.cameraView);
                if (!obj.inScreen && contains) {
                    D5Game.me.add2Screen(obj);
                } else if(obj.inScreen && !contains) {
                    D5Game.me.remove4Screen(obj);
                }
            }
            */
        };
        UnlimitCamera.zeroX = 0;
        UnlimitCamera.zeroY = 0;
        /**
         * 分布渲染时间限制。每次渲染的最大允许占用时间，单位毫秒
         */
        UnlimitCamera.RenderMaxTime = 10;
        return UnlimitCamera;
    }());
    d5power.UnlimitCamera = UnlimitCamera;
    __reflect(UnlimitCamera.prototype, "d5power.UnlimitCamera");
})(d5power || (d5power = {}));
//# sourceMappingURL=UnlimitCamera.js.map