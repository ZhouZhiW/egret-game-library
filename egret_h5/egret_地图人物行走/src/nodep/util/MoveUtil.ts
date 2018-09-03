/**摄像机和人物移动的类，不做存储
 * 
 */
class MoveUtil {

	constructor(scrollPosition:number,realPosition:number){
		this.scrollPosition=scrollPosition;
		this.realPosition=realPosition;
	}
	/**摄像机的位置
	 * 
	 */
	scrollPosition:number;
	/**人物的位置
	 * 
	 */
	realPosition:number;
}