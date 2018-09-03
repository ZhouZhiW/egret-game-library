/**本地存储
 * 
 */
class Local {

	/**存档
	 * 
	 * @param key 键值
	 * @param value 内容
	 */
	public static save(key:string,value:string){
		localStorage.setItem(key,value);
	}

	/**读档
	 * 
	 * @param key 键值 
	 */
	public static load(key:string):string{
		return localStorage.getItem(key);
	}
}