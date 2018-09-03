var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通过这个类，你可以访问服务器提供的一切逻辑
 */
var ProxyManager = (function () {
    //注册通信模块
    function ProxyManager() {
        ServerVirtual.build();
        this._moduleMap = new Map();
        this._moduleMap.set(ModuleType.USER, new UserModule(ModuleType.USER));
    }
    ProxyManager.getIns = function () {
        if (!this._ins)
            this._ins = new ProxyManager();
        return this._ins;
    };
    /**
     * 向服务端发起请求
     */
    ProxyManager.prototype.send = function (mt, pxy, mess) {
        if (mess === void 0) { mess = ""; }
        //在真实的有后端的情况是
        //1.进行封装
        //2.发送给服务端
        //-----------------下面是当前模拟的结果-------------
        this._moduleMap.get(mt).requestToServer(pxy, mess);
    };
    /**
     * 服务端返回信息
     */
    ProxyManager.prototype.response = function (mt, pxy, mess) {
        if (mess === void 0) { mess = ""; }
        this._moduleMap.get(mt).responseFromServer(pxy, mess);
    };
    return ProxyManager;
}());
__reflect(ProxyManager.prototype, "ProxyManager");
//# sourceMappingURL=ProxyManager.js.map