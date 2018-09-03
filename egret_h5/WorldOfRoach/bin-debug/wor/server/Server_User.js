var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家数据模拟服务器
 */
var Server_User = (function () {
    function Server_User() {
        ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_GETHISTORY, this.getUserHistory, this);
        ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_ENTERGAME, this.userEnterGame, this);
        ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_CREATE, this.userCreate, this);
    }
    /**
     * 获取玩家历史数据
     */
    Server_User.prototype.getUserHistory = function (mess) {
        var bs = localStorage.getItem(Server_User.T_USER_HISTORY);
        if (!bs || bs == "")
            return "{\"has\":0}";
        else
            return bs;
    };
    /**
     * 进入游戏
     * 需要在逻辑服务器读取玩家当前存档,生成tiled地图数据等
     */
    Server_User.prototype.userEnterGame = function (mess) {
        var bs = localStorage.getItem(Server_User.T_USER_DATA);
        return bs;
    };
    /**
     * 创建角色
     * 创建角色并且写本地
     */
    Server_User.prototype.userCreate = function (mess) {
        var posJson = JSON.parse(mess);
        var tempUser = LocalData.getObjectByKv("UserLO", { id: 1 });
        var obj = new Object();
        ObjectUtil.copyTo(tempUser, obj);
        obj["posX"] = posJson["posX"];
        obj["posY"] = posJson["posY"];
        localStorage.setItem(Server_User.T_USER_DATA, JSON.stringify(obj));
        GameData.historyData.has = 1;
        localStorage.setItem(Server_User.T_USER_HISTORY, JSON.stringify(GameData.historyData));
        return null;
    };
    return Server_User;
}());
Server_User.T_USER_HISTORY = "T_USER_HISTORY";
Server_User.T_USER_DATA = "T_USER_DATA";
__reflect(Server_User.prototype, "Server_User");
//# sourceMappingURL=Server_User.js.map