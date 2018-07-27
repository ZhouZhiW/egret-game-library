var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var AuthBean = (function () {
    function AuthBean(authobj) {
        this.auth_appKey = authobj.data.appKey;
        this.auth_hlmy_gw = authobj.data.hlmy_gw;
        this.auth_nonce = authobj.data.nonce;
        this.auth_sign = authobj.data.sign;
        this.auth_timestamp = authobj.data.timestamp;
        this.auth_avatar = authobj.data.userInfo.avatar;
        this.auth_gid = authobj.data.userInfo.gid;
        this.auth_nickName = authobj.data.userInfo.nickName;
        this.auth_sex = authobj.data.userInfo.sex;
        GameUtils.hlmy_gw = this.auth_hlmy_gw;
        //        
        //        console.log("appKey      " + this.auth_appKey);
        //        console.log("hlmy_gw     " + this.auth_hlmy_gw);
        //        console.log("nonce       " + this.auth_nonce);
        //        console.log("sign        " + this.auth_sign);
        //        console.log("timestamp   " + this.auth_timestamp);
        //        console.log("avatar      " + this.auth_avatar);
        //        console.log("gid         " + this.auth_gid);
        //        console.log("nickName    " + this.auth_nickName);
        //        console.log("sex         " + this.auth_sex);
    }
    return AuthBean;
}());
__reflect(AuthBean.prototype, "AuthBean");
//# sourceMappingURL=AuthBean.js.map