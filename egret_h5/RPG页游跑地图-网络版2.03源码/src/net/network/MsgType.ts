/**
 *
 * @author 
 *
 */
class MsgType {
    /** 状态消息*/
    public static msgA: string = "0";
    /** 内容消息*/
    public static msgB: string = "1";
    public static msgC: string = "2";
    public static msgD: string = "3";
    
    /** 状态 连接至服务器成功*/
    public static msgA_a: string = "0";
    /** 状态 尚未建立连接*/
    public static msgA_b: string = "1";
    /** 状态 已有连接，勿重复*/
    public static msgA_c: string = "2";
    
    /** A星路径 */
    public static msgB_a: string = "0";
    
	public constructor() {
	}
}
