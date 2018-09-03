var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 这是一个虚拟的服务器入口,提供一切可提供的通信接口
 */
var ServerVirtual = (function () {
    function ServerVirtual() {
    }
    /**
     * 初始化模拟服务器
     */
    ServerVirtual.build = function () {
        ServerVirtual._handlerMap = new Map();
        ServerVirtual._thisObjectMap = new Map();
        new Server_User();
    };
    /**
     * 添加一个测试用的响应处理函数
     */
    ServerVirtual.registHandlerTest = function (mid, pxy, handler, thisObject) {
        ServerVirtual._handlerMap.set(mid + "_" + pxy, handler);
        ServerVirtual._thisObjectMap.set(mid, thisObject);
    };
    /**
     * 收到来之客户端的请求,处理完毕后进行返回
     */
    ServerVirtual.request = function (mid, pxy, mess) {
        //处理完毕之后直接返回给客户端,实际为socket或http的返回信息
        var returnMess = ServerVirtual._handlerMap.get(mid + "_" + pxy).apply(ServerVirtual._thisObjectMap.get(mid), [mess]);
        ProxyManager.getIns().response(mid, pxy, returnMess);
    };
    return ServerVirtual;
}());
__reflect(ServerVirtual.prototype, "ServerVirtual");
//# sourceMappingURL=ServerVirtual.js.map