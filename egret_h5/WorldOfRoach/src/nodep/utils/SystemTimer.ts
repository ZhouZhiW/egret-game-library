/**
 * 系统时间
 * @author nodep
 * @version 1.0
 */
class SystemTimer {
	private static _startTime:number;
	public static init():void
	{
		SystemTimer._startTime = new Date().getTime();
	}

	public static getTimer():number
	{
		return new Date().getTime() - SystemTimer._startTime;
	}
}