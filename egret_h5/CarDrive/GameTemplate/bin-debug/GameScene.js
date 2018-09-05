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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this._mapLayer = new egret.DisplayObjectContainer();
            _this._carLayer = new egret.DisplayObjectContainer();
            _this._effectLayer = new egret.DisplayObjectContainer();
            _this.addChild(_this._mapLayer);
            _this.addChild(_this._effectLayer);
            _this.addChild(_this._carLayer);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        Object.defineProperty(GameScene.prototype, "particle", {
            get: function () {
                return this._particle;
            },
            enumerable: true,
            configurable: true
        });
        GameScene.prototype.init = function (e) {
            if (e === void 0) { e = null; }
            this._renderList = [];
            this._map = new d5power.UnlimitMap();
            this._map.setContainer(this._mapLayer);
            this._map.createLoop(1, 'resource/map.png', this.onMapReady, this);
            this._mycar = new d5power.Car(this._map);
            this._carLayer.addChild(this._mycar.monitor);
            this._mycar.setPos(300, 300);
            this._mycar.turnRoation = -90;
            this._mycar.engineOn(20);
            this._mycar.setSkin('resource/car0.png');
            this._renderList.push(this._mycar);
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x666666);
            bg.graphics.drawCircle(60, 60, 60);
            bg.graphics.endFill();
            var controll = new egret.Shape();
            controll.graphics.beginFill(0xEEEEEE);
            controll.graphics.drawCircle(10, 10, 10);
            controll.graphics.endFill();
            this.addChild(bg);
            this._particle = new d5power.D5ParticleCenter(this._effectLayer, this._map);
            var controller = new d5power.TouchController(this.stage, this.onController, this);
            controller.init(bg, controll);
        };
        GameScene.prototype.onController = function (angle, length, changeAngle) {
            if (angle === void 0) { angle = NaN; }
            if (length === void 0) { length = NaN; }
            if (changeAngle === void 0) { changeAngle = NaN; }
            if (isNaN(angle) && isNaN(length)) {
                this._mycar.engineOff();
                return;
            }
            this._mycar.turnRoation = Math.ceil(angle * 180 / Math.PI);
            this._mycar.engineOn(20);
        };
        GameScene.prototype.onMapReady = function () {
            this._camera = new d5power.UnlimitCamera(this._map);
            this._camera.focus = this._mycar;
            this.addEventListener(egret.Event.ENTER_FRAME, this.render, this);
            //this.x = (this.stage.stageWidth-this._map.width)>>1;
        };
        GameScene.prototype.render = function (e) {
            var t = egret.getTimer();
            this._map.render();
            for (var i = this._renderList.length - 1; i >= 0; i--) {
                this._renderList[i].run(t);
                this._renderList[i].render(t);
            }
            this._camera.update();
            this._particle.render(t);
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    d5power.GameScene = GameScene;
    __reflect(GameScene.prototype, "d5power.GameScene");
})(d5power || (d5power = {}));
//# sourceMappingURL=GameScene.js.map