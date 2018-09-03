var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息通知类型
 * 模块号+四位消息自增号
 */
var UpdateType = (function () {
    function UpdateType() {
    }
    return UpdateType;
}());
//玩家历史数据返回
UpdateType.USER_HISTORY_BACLL = 10001;
//自己的位置变化
UpdateType.MAP_SELF_MOVE = 20001;
//互动对象发生变化
UpdateType.MAP_OPT_CHANGE = 20002;
//改变当前主等待界面的信息
UpdateType.MAIN_LOADING_SET = 9990001;
__reflect(UpdateType.prototype, "UpdateType");
//# sourceMappingURL=UpdateType.js.map