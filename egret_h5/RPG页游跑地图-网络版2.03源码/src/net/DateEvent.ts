/**
 *
 * @author 
 *自定义事件类
 * 用于各类之间的 事件流消息传递
 */
class DateEvent extends egret.Event
{
    /**标识*/
    public static DATE:string = "内容";
    
    public testTxt:string = "";
    
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}

