var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 圆圈进度条遮罩
 * @author nodep
 * @version 1.0
 */
var CoolingQueueMcForCircle = (function () {
    function CoolingQueueMcForCircle(target, w) {
        this._w = 0; //最大矩形框图
        this._target = target;
        this._mask = new egret.Shape();
        this._mask.x = target.x + target.width / 2;
        this._mask.y = target.y + target.height / 2;
        target.parent.addChildAt(this._mask, target.parent.getChildIndex(this._target) + 1);
        this._target.mask = this._mask;
        this._w = w;
    }
    /**
         * 设置当前的进度
         * @param lastTime
         * @param total
         */
    CoolingQueueMcForCircle.prototype.setProgress = function (lastTime, total) {
        if (!this._mask)
            return;
        this._mask.graphics.clear();
        if (lastTime >= total) {
            this._mask.graphics.beginFill(0);
            // this._mask.graphics.drawCircle(0, 0, this._w);
            this._mask.graphics.drawRect(-this._w, -this._w, this._w * 2, this._w * 2);
            this._mask.graphics.endFill();
            return;
        }
        this._mask.graphics.beginFill(0, 1);
        this._mask.graphics.lineStyle(1);
        this._mask.graphics.moveTo(0, 0);
        var passTime = 360 * lastTime / total;
        var passRad = Math.PI / 180 * passTime;
        var tox;
        var toy;
        var startX = 0;
        if (passTime <= 45) {
            tox = this._w * Math.tan(passRad);
            toy = -this._w;
            startX = 1;
        }
        else if (passTime <= 90) {
            tox = this._w;
            toy = -this._w * Math.tan(Math.PI / 180 * 90 - passRad);
            startX = 2;
        }
        else if (passTime <= 135) {
            tox = this._w;
            toy = this._w * Math.tan(passRad - Math.PI / 180 * 90);
            startX = 3;
        }
        else if (passTime <= 180) {
            toy = this._w;
            tox = this._w * Math.tan(Math.PI - passRad);
            startX = 4;
        }
        else if (passTime <= 225) {
            toy = this._w;
            tox = -this._w * Math.tan(passRad - Math.PI);
            startX = 5;
        }
        else if (passTime <= 270) {
            tox = -this._w;
            toy = this._w * Math.tan(Math.PI / 180 * 270 - passRad);
            startX = 6;
        }
        else if (passTime <= 315) {
            tox = -this._w;
            toy = -this._w * Math.tan(passRad - Math.PI / 180 * 270);
            startX = 7;
        }
        else {
            toy = -this._w;
            tox = -this._w * Math.tan(Math.PI * 2 - passRad);
            startX = 8;
        }
        this._mask.graphics.lineTo(tox, toy);
        this.drawRect(startX);
    };
    /**
     * 绘制
     * @param start
     */
    CoolingQueueMcForCircle.prototype.drawRect = function (start) {
        for (start; start >= 0; start--) {
            var args = CoolingQueueMcForCircle._drawRectPoints[start];
            this._mask.graphics.lineTo(args[0] * this._w, args[1] * this._w);
        }
        this._mask.graphics.endFill();
    };
    /**画框的顺序*/
    CoolingQueueMcForCircle._drawRectPoints = [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];
    return CoolingQueueMcForCircle;
}());
__reflect(CoolingQueueMcForCircle.prototype, "CoolingQueueMcForCircle");
