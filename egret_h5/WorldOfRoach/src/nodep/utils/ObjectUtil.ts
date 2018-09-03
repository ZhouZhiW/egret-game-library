/**
 * 对象属性的批量操作
 * @author nodep
 * @version 1.0
 */
class ObjectUtil {

	/**
	 * 拷贝属性,并不是创建，而是将from中的属性都拷贝到to中
	 * 前提是to对象必须拥有这些属性的暴露
	 */
	public static copyTo(from:any,to:any):void
	{
		var key:any;
		for(key in from)
			to[key] = from[key];
	}
}