/**
 * 游戏常用的时间处理
 * @author nodep
 * @version 1.0
 */
class TimeUtil {

	/**
	 * 根据小时和分钟计算
	 */
	public static getTimeStrByHM(hour:number,min:number):string
	{
		var str:string = "";
		str += hour>=10?hour+":":"0"+hour+":";
		str += min>=10?min:"0"+min;
		return str;
	}
}