var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//消息发送与处理基类
var ModuleBase = (function () {
    function ModuleBase(id) {
        this.moduleID = 0;
        this.moduleID = id;
        this.__reqHandlerMap = new Map();
    }
    /**
     * 向服务端发送请求,根据主动注册的函数的不同而调用不同的函数来预处理
     */
    ModuleBase.prototype.requestToServer = function (pid, mess) {
        mess = this.__reqHandlerMap.get(pid).apply(this, [ModuleBase.TYPE_RQ, mess]);
        ServerVirtual.request(this.moduleID, pid, mess);
    };
    /**
     * 获取服务端返回的请求,根据主动注册的函数的不同而调用不同的函数来预处理
     */
    ModuleBase.prototype.responseFromServer = function (pid, mess) {
        this.__reqHandlerMap.get(pid).apply(this, [ModuleBase.TYPE_RS, mess]);
    };
    //注册一个函数来对某个pid进行处理
    ModuleBase.prototype.registHandler = function (pid, req) {
        this.__reqHandlerMap.set(pid, req);
    };
    return ModuleBase;
}());
/**
 * 请求
 */
ModuleBase.TYPE_RQ = 1;
/**
 * 返回
 */
ModuleBase.TYPE_RS = 2;
__reflect(ModuleBase.prototype, "ModuleBase");
//# sourceMappingURL=ModuleBase.js.map