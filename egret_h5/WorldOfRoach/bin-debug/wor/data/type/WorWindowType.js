var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WorWindowType = (function (_super) {
    __extends(WorWindowType, _super);
    function WorWindowType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WorWindowType;
}(WindowType));
WorWindowType.MENU_WINDOW = "MENU_WINDOW"; //登陆界面的菜单
WorWindowType.ROCKER_LEFT = "ROCKER_LEFT"; //摇杆
WorWindowType.TOP_TOOLBAR = "TOP_TOOLBAR"; //右上角导航
WorWindowType.BOTTOM_TOOLBAR = "BOTTOM_TOOLBAR"; //正下方导航
WorWindowType.LOG_WINDOW = "LOG_WINDOW"; //日志任务记录界面
WorWindowType.MINI_MAP = "MINI_MAP"; //小地图
WorWindowType.OPT_MAP = "OPT_MAP"; //设置界面
WorWindowType.CURB_BAR = "CURB_BAR"; //右手操作区
WorWindowType.ROLE_WINDOW = "ROLE_WINDOW"; //左上角角色属性区
WorWindowType.MAIN_LOADING = "MAIN_LOADING"; //游戏主加载界面
__reflect(WorWindowType.prototype, "WorWindowType");
//# sourceMappingURL=WorWindowType.js.map