/**
 * 舞台角色接口
 * @author nodep
 * @version 1.0
 */
interface IRole {
	setAreaKey(ak:string):void;
	getAreaKey():string;
	removed():void;
	added():void;
	/**
	 * 检测是否属于操作范围内
	 * @returns 在操作范围内返回正数,否则返回负数.正数越小距离越近
	 */
	tryOption(px:number,py:number):number;
	/**
	 * 碰撞检测
	 */
	hitTestArea(px:number,py:number):boolean;
	/**
	 * 获取操作类型
	 */
	getOptType():string;
}