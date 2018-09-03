/**
 * 链表排序接口,主要针对场景中需要排序的显示对象
 * @author nodep
 * @version 1.0
 */
interface ILink {
	getPre():ILink;
	setPre(target:ILink):void;
	getNext():ILink;
	setNext(target:ILink):void;
}