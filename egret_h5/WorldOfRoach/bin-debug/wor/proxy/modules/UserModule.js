var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 玩家信息
 */
var UserModule = (function (_super) {
    __extends(UserModule, _super);
    function UserModule(id) {
        var _this = _super.call(this, id) || this;
        _this.registHandler(ProxyType.USER_GETHISTORY, _this.userHistoryHandler);
        _this.registHandler(ProxyType.USER_ENTERGAME, _this.userEnterGame);
        _this.registHandler(ProxyType.USER_CREATE, _this.createUser);
        return _this;
    }
    //获取存档信息
    UserModule.prototype.userHistoryHandler = function (type, mess) {
        if (type == UserModule.TYPE_RQ)
            return mess;
        else {
            var obj = JSON.parse(mess);
            GameData.historyData.initHistoryData(obj);
            WinsManager.getIns().updateWin(UpdateType.USER_HISTORY_BACLL, [WorWindowType.MENU_WINDOW], null);
        }
        return null;
    };
    //进入游戏
    UserModule.prototype.userEnterGame = function (type, mess) {
        if (type == UserModule.TYPE_RQ)
            return mess;
        else {
            var obj = JSON.parse(mess);
            ObjectUtil.copyTo(obj, GameData.playerData);
            GameManager.getIns().enterGame();
        }
        return null;
    };
    //创建游戏角色
    UserModule.prototype.createUser = function (type, mess) {
        if (type == UserModule.TYPE_RQ)
            return mess;
        else {
            LogTrace.log("create new player completed!!");
            GameManager.getIns().startOldGame();
        }
        return null;
    };
    return UserModule;
}(ModuleBase));
__reflect(UserModule.prototype, "UserModule");
//# sourceMappingURL=UserModule.js.map