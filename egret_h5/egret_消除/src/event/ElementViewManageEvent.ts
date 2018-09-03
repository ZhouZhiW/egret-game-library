class ElementViewManageEvent extends egret.Event {
	
    public static TAP_TWO_ELEMENT:string = "tap_two_element";
    public static REMOVE_ANIMATION_OVER:string = "remove_animation_over";
    public static UPDATE_MAP:string = "update_map";
    public static UPDATE_VIEW_OVER:string = "update_view_over";
    public static USE_PROP_CLICK:string = "use_prop_click";

    public propToElementLocation:number = 0; //携带道具点击的元素位置
    public ele1:number=0;//第一个点击的元素
    public ele2:number=0;//第二个点击的元素
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}