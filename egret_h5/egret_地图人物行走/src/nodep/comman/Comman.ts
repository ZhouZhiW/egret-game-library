/**通用函数类
 * 
 */
class Comman {

	/**根据传入的参数判断是否小于10，小于10则加0----返回值如00，01,02,...09，方便区分name
	 * 
	 * @param value 
	 */
	public static isMaxTen(value:number):string{
		let ret:string=value.toString();
		if(value<10){
			ret="0"+ret;
		}
		return ret;
	}
	/**拼接图片资源名字并返回资源
	 * 
	 * @param name 开头
	 * @param all  all
	 */
	public static nameJoint(name:string,...all:string[]):string{
		let jointString:string=name+GameConfig.SPLIT_CHAR+all.join(GameConfig.SPLIT_CHAR);
		return jointString;
	}

	/**复制函数-属性值以from类为准
	 * 
	 * @param from 拷贝的对象
	 * @param to  被拷贝的对象
	 */
	public static copyFrom(from:any,to:any){
		for(let key in from){
			to[key]=from[key];
		}
	}

	/**复制函数-属性值以to类为准
	 * 
	 * @param from 拷贝的对象
	 * @param to  被拷贝的对象
	 */
	public static copyTo(from:any,to:any){
		for(let key in to){
			to[key]=from[key];
		}
	}

	/**获取资源
	 * 
	 * @param value 资源名称
	 */
	public static getRes(value:string){
		let res=this.getFromRes(value);
		if(res==null){

		}
		return res;
	}

	/**从已加载资源中获取
	 * 
	 * @param value 资源名称
	 */
	private static getFromRes(value:string):any{
		let res:any=RES.getRes(value);
		return res;
	}

	/**从服务器获取资源
	 * 
	 * @param value 资源名称 
	 */
	private static getFromServer(value:string){

	}

	/**获取到舞台所需要的SceneUtil
	 * 
	 * @param sceneArray SceneUtil集合
	 * @param name 所要寻找的名称
	 */
	public static searchScene(sceneArray:Array<SceneUtil>,name:string):SceneUtil{
		let search:SceneUtil=null;
		if(sceneArray==null){
			return search;
		}
		for(let sceneNumber:number=0;sceneNumber<sceneArray.length;sceneNumber++){
			if(sceneArray[sceneNumber].name==name){
				search=sceneArray[sceneNumber];
				return search;
			}
		}
	}
}