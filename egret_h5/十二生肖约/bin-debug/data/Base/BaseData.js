var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseData = (function () {
    function BaseData() {
        this.dataChangeListeners = [];
    }
    Object.defineProperty(BaseData.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (d) {
            this._data = d;
        },
        enumerable: true,
        configurable: true
    });
    BaseData.prototype.setServiceData = function (data) {
    };
    BaseData.prototype.callListener = function (sourceType, eventType) {
        if (eventType === void 0) { eventType = BaseData.DATA_CHANGED_ALL; }
        if (!this.data) {
            return;
        }
        for (var i = 0; i < this.dataChangeListeners.length; i++) {
            var l = this.dataChangeListeners[i];
            if (eventType == BaseData.DATA_CHANGED_ALL || l.type == eventType) {
                l.callback.call(l.objThis, new DataEvent(sourceType, eventType, this));
            }
        }
    };
    BaseData.prototype.addDataListener = function (listener, objThis, type, refreshNow) {
        if (type === void 0) { type = BaseData.DATA_CHANGED_ALL; }
        if (refreshNow === void 0) { refreshNow = true; }
        var l = { callback: listener, objThis: objThis, type: type };
        this.dataChangeListeners.push(l);
        if (!this.data) {
            return;
        }
        if (refreshNow) {
            l.callback.call(l.objThis, new DataEvent(BaseData.DATA_SOURCE_INIT, type, this));
        }
    };
    BaseData.prototype.removeDataListener = function (listener, objThis, type) {
        if (type === void 0) { type = BaseData.DATA_CHANGED_ALL; }
        for (var i = 0; i < this.dataChangeListeners.length; i++) {
            var l = this.dataChangeListeners[i];
            if (l.type == type && l.callback == listener && l.objThis == objThis) {
                this.dataChangeListeners.splice(i, 1);
                return;
            }
        }
    };
    return BaseData;
}());
BaseData.DATA_SOURCE_INIT = 100;
BaseData.DATA_SOURCE_SERVICE = 101;
BaseData.DATA_SOURCE_CLIENT = 102;
BaseData.DATA_CHANGED_ALL = 0;
__reflect(BaseData.prototype, "BaseData");
//# sourceMappingURL=BaseData.js.map