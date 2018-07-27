/**
 *
 * @author 
 *
 */
class AuthBean {
    public auth_appKey: string;
    public auth_hlmy_gw: string;
    public auth_nonce: string;
    public auth_sign: string;
    public auth_timestamp: number;
    public auth_avatar: string;
    public auth_gid: string;
    public auth_nickName: string;
    public auth_sex: number;
    public constructor(authobj: any) {
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
}
