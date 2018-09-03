/**玩家道具*/
class ItemData {
	/**材料,包括食物在内*/
	public materials:Array<ItemVO> = [];
	/**书籍,可能具有功能性*/
	public bookss:Array<ItemVO> = [];
	/**关键道具*/
	public tasks:Array<ItemVO> = [];
	/**垃圾*/
	public rubbishs:Array<ItemVO> = [];
}