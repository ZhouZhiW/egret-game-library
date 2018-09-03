

class ObjectPool {


    constructor() {
        // egret.Ticker.getInstance().register(this.onEnterFrame, this);
        egret.startTick(this.onEnterFrame, this);
        this.time1 = egret.getTimer();
        // egret.Tween.get(this, { loop: true }).wait(1000/60).call(() => {
        //     this.onEnterFrame(1000/60);
        // })
        // egret.Tween
    }
    public paused = false;
    private time1: number = 0;
    private onEnterFrame(advancedTime: number) {
        if (this.paused) return;
        /* var fps = 1000 / advancedTime;
         var speedOffset: number = 60 / fps;
         Const.speedOffset = speedOffset*/
        

        let time1 = this.time1;
        let disTime = advancedTime - time1;
        this.time1 = advancedTime;
        if (disTime < 10 || disTime > 100) {
            return;
        }
        var fps = 1000 / disTime;
        var speedOffset: number = 60 / fps;
        if (disTime > 30) disTime = 18;
        var list = this._list.concat();
        for (var i = 0, length = list.length; i < length; i++) {
            var obj: GameObject = list[i];
            obj.onEnterFrame(disTime);
        }
        return false
    }

    private _pool = {};

    private _list: Array<any> = [];

    public createObject(classFactory: any): GameObject {
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
    }

    public destroyObject(obj: GameObject) {
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
    }

    private static instance: ObjectPool;

    public static getInstance(): ObjectPool {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    }
}
