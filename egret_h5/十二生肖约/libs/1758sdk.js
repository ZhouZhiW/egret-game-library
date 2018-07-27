var hlmysdk;
function hlmyInit(gid, appkey, hlmy_gw) {
    hlmysdk = window.HLMY_SDK;
    hlmysdk.init({
        "gid": gid,
        "appKey": appkey,
        "hlmy_gw": hlmy_gw
    });
}
function hlmyPay(paySafecode) {
    hlmysdk.pay({
        "paySafecode": paySafecode
    });
}
function setShareInfo(state, tipInfo, reward) {
    hlmysdk.setShareInfo({
        "state": state,
        "tipInfo": tipInfo,
        "reward": reward
    });
}
function onShareTimeline() {
    NetEventManager.inst.pushInvitation(null, -2);
    //游戏在方法内实现自身逻辑，如：提示用户分享成功，并发放奖励
}
function onShareFriend() {
    NetEventManager.inst.pushInvitation(null, -2);
    //游戏在方法内实现自身逻辑，如：提示用户分享成功，并发放奖励
}