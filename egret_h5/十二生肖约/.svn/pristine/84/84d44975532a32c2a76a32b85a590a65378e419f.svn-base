
class BaseData {
    public static DATA_SOURCE_INIT = 100;
    public static DATA_SOURCE_SERVICE = 101;
    public static DATA_SOURCE_CLIENT = 102;

    public static DATA_CHANGED_ALL = 0;
    protected dataChangeListeners: Array<{ callback: Function, objThis: any, type: number }>;
    private _data: any;

    public set data(d: any) {
        this._data = d;
    }
    public get data() {
        return this._data;
    }
    constructor() {
        this.dataChangeListeners = [];
    }




    protected setServiceData(data: any) {

    }

    public callListener(sourceType: number, eventType: number = BaseData.DATA_CHANGED_ALL) {
        if (!this.data) {
            return;
        }
        for (let i = 0; i < this.dataChangeListeners.length; i++) {
            const l = this.dataChangeListeners[i];
            if (eventType == BaseData.DATA_CHANGED_ALL || l.type == eventType) {
                l.callback.call(l.objThis, new DataEvent(sourceType, eventType, this))
            }
        }
    }

    public addDataListener(listener: Function, objThis: any, type: number = BaseData.DATA_CHANGED_ALL, refreshNow: boolean = true) {
        const l = { callback: listener, objThis: objThis, type: type };
        this.dataChangeListeners.push(l);

        if (!this.data) {
            return;
        }
        if (refreshNow) {
            l.callback.call(l.objThis, new DataEvent(BaseData.DATA_SOURCE_INIT, type, this))
            // this.callListener(BaseData.DATA_SOURCE_REFRESH, type);
        }
    }

    public removeDataListener(listener: Function, objThis: any, type: number = BaseData.DATA_CHANGED_ALL) {
        for (var i = 0; i < this.dataChangeListeners.length; i++) {
            var l = this.dataChangeListeners[i];
            if (l.type == type && l.callback == listener && l.objThis == objThis) {
                this.dataChangeListeners.splice(i, 1)
                return;
            }
        }
    }

    /*
    想根据动态key得到某对象中相对应的value的方法有二： 
    一、var key = "name1";var value = obj[key]; 
    二、var key = "name1";var value = eval("obj."+key);
    */
}