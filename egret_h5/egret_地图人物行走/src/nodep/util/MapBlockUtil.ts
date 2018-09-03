/**地图分块加载-单个地图块（大小以stageWidth,stageHeight进行切割）
 * 
 */
class MapBlockUtil {
	/**单个地图块的背景资源名称---暂未实现每个单元块
	 * 
	 */
	public backGroundTileImageName:string=null;

	/**单个迷雾背景单元块的资源名称
	 * 
	 */
	public fogTileImageName:string=null;

	/**地图块的行数
	 * 
	 */
	public columnCount:number=null;

	/**地图块的行数
	 * 
	 */
	public rowCount:number=null;

	/**所在地图的列数
	 * 
	 */
	public HNumber:number=null;

	/**所在地图的列数
	 * 
	 */
	public VNumber:number=null;

	/**地图块x坐标
	 * 
	 */
	public x:number=null;

	/**地图块y坐标
	 * 
	 */
	public y:number=null;

	/**地图快的名字，方便舞台移除
	 * 
	 */
	public name:string=null;

}