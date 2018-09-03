/**
 * 植物构造器
 */
class PlantMaker {

	/**
	 * 获取一个植物
	 */
	public static getPlant(obj:Object):Plant
	{
		var p:Plant = new Plant();
		p.setData(obj);
		p.x = obj["x"];
		p.y = obj["y"];
		return p;
	}
}