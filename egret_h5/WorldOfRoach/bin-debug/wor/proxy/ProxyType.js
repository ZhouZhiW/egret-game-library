var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 协议号
 * 模块号+三位协议号
 */
var ProxyType = (function () {
    function ProxyType() {
    }
    return ProxyType;
}());
//获取玩家历史数据
ProxyType.USER_GETHISTORY = 1001;
//玩家进入游戏
ProxyType.USER_ENTERGAME = 1002;
//创建角色信息
ProxyType.USER_CREATE = 1003;
__reflect(ProxyType.prototype, "ProxyType");
//# sourceMappingURL=ProxyType.js.map