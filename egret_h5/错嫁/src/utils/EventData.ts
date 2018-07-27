/**
 *
 * @author 
 *
 */
class EventData extends egret.Event {
    public static DATA_TIME: string = "shareTimelineCallBack";
    public static DATA_FRIEND: string = "shareFriendCallBack";
    public static DATA_GAMEFOLLOW: string = "gamefollowCallBack";
    public static DATA_LISTFOLLOW: string = "listfollowCallBack";
    public static DATA_CLOSESAVEIMAGE: string = "closeimageCallBack";
    public static DATA_ADAPT_PARAMS: string = "adaptparamsCallBack";
    public static DATA_TENCENT_FRIENDLIST: string = "tencentFriendListCallBack";
    public static DATA_SHOWAD: string = "showadCallBack";
    public static DATA_PLAYAD: string = "playadCallBack";
    public static DATA_ADDSHORTCUT: string = "addshortcutCallBack";
    public static DATA_XUANYAO: string = "xuanyaoCallBack";
    public static DATA_ONPAY_SUCCEED: string = "onpaysucceedCallBack";
    public static DATA_AUTH_SUCCEED: string = "authsucceedCallBack";
    public static DATA_AUTH_FAILED: string = "authfailedCallBack";
    public static DATA_QQBACKGROUND: string = "qqbackgroundCallBack";
    public static DATA_CHECK_TOKEN_FAILED:string  = "checktokenCallBack";
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}
