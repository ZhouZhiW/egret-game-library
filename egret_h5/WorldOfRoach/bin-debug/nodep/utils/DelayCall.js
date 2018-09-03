var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 延迟调用函数
 * @author nodep
 * @version 1.0
 */
var DelayCall = (function () {
    function DelayCall(callBack, thisObject, args) {
        if (args === void 0) { args = null; }
        this.delayTime = 0;
        this.repeatCount = 0;
        this._costTime = 0;
        this._callBack = callBack;
        this._thisObject = thisObject;
        this._args = args;
    }
    /**
     * 延迟回调函数
     */
    DelayCall.call = function (delayTime, callBack, thisObject, args, repeat) {
        if (args === void 0) { args = null; }
        if (repeat === void 0) { repeat = 1; }
        var dcall = new DelayCall(callBack, thisObject, args);
        dcall.delayTime = delayTime;
        dcall.repeatCount = repeat;
        RenderManager.getIns().registRender(dcall);
        return dcall;
    };
    /**
     * 刷新
     */
    DelayCall.prototype.renderUpdate = function (interval) {
        this._costTime += interval;
        if (this._costTime >= this.delayTime) {
            if (this.repeatCount > 0) {
                this.repeatCount -= 1;
                if (this.repeatCount <= 0) {
                    RenderManager.getIns().unregistRender(this);
                    if (null != this._callBack)
                        this._callBack.apply(this._thisObject, this._args);
                }
                this._callBack = null;
                this._thisObject = null;
                this._args = null;
            }
            else {
                this._costTime = this._costTime - this.delayTime;
                if (null != this._callBack)
                    this._callBack.apply(this._thisObject, this._args);
            }
        }
    };
    return DelayCall;
}());
__reflect(DelayCall.prototype, "DelayCall", ["IRender"]);
//# sourceMappingURL=DelayCall.js.map