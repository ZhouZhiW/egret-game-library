var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    function ObjectPool() {
        this.paused = false;
        this.time1 = 0;
        this._pool = {};
        this._list = [];
        // egret.Ticker.getInstance().register(this.onEnterFrame, this);
        egret.startTick(this.onEnterFrame, this);
        this.time1 = egret.getTimer();
        // egret.Tween.get(this, { loop: true }).wait(1000/60).call(() => {
        //     this.onEnterFrame(1000/60);
        // })
        // egret.Tween
    }
    ObjectPool.prototype.onEnterFrame = function (advancedTime) {
        if (this.paused)
            return;
        /* var fps = 1000 / advancedTime;
         var speedOffset: number = 60 / fps;
         Const.speedOffset = speedOffset*/
        var time1 = this.time1;
        var disTime = advancedTime - time1;
        this.time1 = advancedTime;
        if (disTime < 10 || disTime > 100) {
            return;
        }
        var fps = 1000 / disTime;
        var speedOffset = 60 / fps;
        if (disTime > 30)
            disTime = 18;
        var list = this._list.concat();
        for (var i = 0, length = list.length; i < length; i++) {
            var obj = list[i];
            obj.onEnterFrame(disTime);
        }
        return false;
    };
    ObjectPool.prototype.createObject = function (classFactory) {
        var result;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate();
        this._list.push(result);
        return result;
    };
    ObjectPool.prototype.destroyObject = function (obj) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        obj.onDestroy();
        var index = this._list.indexOf(obj);
        if (index != -1) {
            this._list.splice(index, 1);
        }
    };
    ObjectPool.getInstance = function () {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map