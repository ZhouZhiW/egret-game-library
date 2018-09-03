var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 进度条
 * @author nodep
 * @version 1.0
 */
var ProgressBar = (function () {
    /**
     * 创建进度条
     */
    function ProgressBar(dis) {
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._cur = -1;
        this._total = -1;
        this._maskShape = new egret.Shape();
        dis.mask = this._maskShape;
        this._maskShape.x = dis.x;
        this._maskShape.y = dis.y;
        dis.parent.addChild(this._maskShape);
        this._maxWidth = dis.width;
        this._maxHeight = dis.height;
    }
    /**
     * 设置进度
     */
    ProgressBar.prototype.setProgress = function (cur, total) {
        this._maskShape.graphics.clear();
        this._maskShape.graphics.beginFill(0, 1);
        this._maskShape.graphics.drawRect(0, 0, Math.trunc(this._maxWidth * cur / total), this._maxHeight);
        this._maskShape.graphics.endFill();
    };
    return ProgressBar;
}());
__reflect(ProgressBar.prototype, "ProgressBar");
//# sourceMappingURL=ProgressBar.js.map