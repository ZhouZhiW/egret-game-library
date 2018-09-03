var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInfo = (function () {
    function PlayerInfo() {
    }
    PlayerInfo.code = "";
    PlayerInfo.encryptedData = "";
    PlayerInfo.userInfo = "";
    PlayerInfo.iv = "";
    PlayerInfo.signature = "";
    PlayerInfo.openId = '';
    PlayerInfo.nickName = ""; //userInfo.nickName
    PlayerInfo.avatarUrl = ""; //userInfo.avatarUrl
    PlayerInfo.gender = ""; //userInfo.gender //性别 0：未知、1：男、2：女
    PlayerInfo.province = ""; //userInfo.province
    PlayerInfo.city = ""; //userInfo.city
    PlayerInfo.country = ""; //userInfo.country
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map