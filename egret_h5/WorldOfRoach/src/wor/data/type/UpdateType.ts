/**
 * 消息通知类型
 * 模块号+四位消息自增号
 */
class UpdateType {
    //玩家历史数据返回
	public static USER_HISTORY_BACLL:number = 10001;
    //自己的位置变化
    public static MAP_SELF_MOVE:number = 20001;
    //互动对象发生变化
    public static MAP_OPT_CHANGE:number = 20002;
    //改变当前主等待界面的信息
    public static MAIN_LOADING_SET:number = 9990001;
}