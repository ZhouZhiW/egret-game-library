var game;
(function (game) {
    var Car = (function (_super) {
        __extends(Car, _super);
        function Car(textureName) {
            _super.call(this);
            this.startPos = new egret.Point();
            this.move = new game.MoveUtil(this, false); //移动工具类，设置false默认只移动一次
            this.name = textureName;
            this.texture = RES.getRes(textureName);
            if (this.texture == null) {
                console.log("car 资源名称不对");
            }
            this.addEventListener(egret.Event.ADDED, this.onAdded, this);
        }
        var d = __define,c=Car;p=c.prototype;
        p.init = function (num) {
            if (num === void 0) { num = 0; }
            var startPosX = num == 0 ? 100 : 280;
            this.move.startPos = new egret.Point(0, -this.texture.textureHeight);
            this.move.endPos = new egret.Point(0, game.Data.stageH);
            this.startPos.x = startPosX;
            this.startPos.y = -this.texture.textureHeight;
        };
        //添加到舞台事件
        p.onAdded = function () {
            this.x = this.startPos.x;
            this.y = this.startPos.y;
        };
        p.onEnterFrame = function () {
            if (this.move) {
                this.move.onEnterFrame();
                if (this.y > game.Data.stageH) {
                    this.distory();
                }
            }
        };
        //设置速度
        p.setSpeed = function (speed) {
            this.move.speedY = speed;
        };
        p.distory = function () {
            if (this && this.parent) {
                this.parent.removeChild(this);
                game.CarFactory.getInstance().reclaim(this);
            }
        };
        return Car;
    })(egret.Bitmap);
    game.Car = Car;
    egret.registerClass(Car,"game.Car");
})(game || (game = {}));
