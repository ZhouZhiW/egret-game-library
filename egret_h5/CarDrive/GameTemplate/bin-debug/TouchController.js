var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var d5power;
(function (d5power) {
    var TouchController = (function () {
        function TouchController(listener, callback, thisobj) {
            this._callback = callback;
            this._thisobj = thisobj;
            this._listener = listener;
            this._listener.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        }
        TouchController.prototype.init = function (bg, controller) {
            if (!bg.width || !bg.height || !controller.width || !controller.height) {
                egret.error("[TouchController] please draw ui interface first.");
                return;
            }
            if (!bg.parent) {
                egret.error("[TouchController] please make true bg is in stage.");
            }
            this._bg = bg;
            this._controller = controller;
            this._stage = this._bg.stage;
            this._bg.parent.removeChild(this._bg);
            this._limit = bg.width > bg.height ? Math.ceil(bg.width >> 1) : Math.ceil(bg.height >> 1);
            this._bg.anchorOffsetX = this._bg.width >> 1;
            this._bg.anchorOffsetY = this._bg.height >> 1;
            this._controller.anchorOffsetX = this._controller.width >> 1;
            this._controller.anchorOffsetY = this._controller.height >> 1;
            this._bg.touchEnabled = false;
            this._controller.touchEnabled = false;
        };
        TouchController.prototype.onBegin = function (e) {
            this._listener.once(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this._listener.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this._bg.x = this._controller.x = e.stageX;
            this._bg.y = this._controller.y = e.stageY;
            this._lastX = this._bg.x;
            this._lastY = this._bg.y;
            this._stage.addChild(this._bg);
            this._stage.addChild(this._controller);
        };
        TouchController.prototype.onMove = function (e) {
            e.updateAfterEvent();
            var cx = e.stageX - this._bg.x;
            var cy = e.stageY - this._bg.y;
            var p = Math.sqrt(cx * cx + cy * cy);
            var angle = Math.atan2(e.stageY - this._bg.y, e.stageX - this._bg.x);
            var changeAngle = Math.atan2(e.stageY - this._lastY, e.stageX - this._lastX);
            if (p > this._limit) {
                this._controller.x = this._bg.x + parseInt(this._limit * Math.cos(angle) + '');
                this._controller.y = this._bg.y + parseInt(this._limit * Math.sin(angle) + '');
            }
            else {
                this._controller.x = e.stageX;
                this._controller.y = e.stageY;
            }
            if (this._callback != null) {
                this._callback.apply(this._thisobj, [angle, p, changeAngle]);
            }
        };
        TouchController.prototype.onEnd = function (e) {
            this._listener.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            if (this._bg && this._bg.parent)
                this._bg.parent.removeChild(this._bg);
            if (this._controller && this._controller.parent)
                this._controller.parent.removeChild(this._controller);
            if (this._callback)
                this._callback.apply(this._thisobj);
        };
        return TouchController;
    }());
    d5power.TouchController = TouchController;
    __reflect(TouchController.prototype, "d5power.TouchController");
})(d5power || (d5power = {}));
//# sourceMappingURL=TouchController.js.map