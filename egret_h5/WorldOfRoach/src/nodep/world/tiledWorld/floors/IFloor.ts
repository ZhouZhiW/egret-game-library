/**
 * 地板
 * @author nodep
 * @version 1.0
 */
interface IFloor {
	removeFloor():IFloor;
	createFloor(p:egret.DisplayObjectContainer,px:number,py:number):void;
	getType():number;
	/**当前焦点对象站上时调用 */
	standOn():void;
}