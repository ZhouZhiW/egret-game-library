/**单个地图的信息
 * 
 */
class MapInformation {
	
	/**地图宽度
	 * 
	 */
	public get width(){
		return this.columnCount*this.tileWidth;
	}

	/**地图高度
	 * 
	 */
	public get height(){
		return this.rowCount*this.tileHeight;
	}
	
	/**行数
	 * 
	 */
	public columnCount:number=null;

	/**列数
	 * 
	 */
	public rowCount:number=null;

	/**单个单元格的宽度
	 * 
	 */
	public tileWidth:number=null;

	/**单个单元格的高度
	 * 
	 */
	public tileHeight:number=null;

	/**根据cameraWidth及height切割的mapBlock集合
	 * 
	 */
	public mbList:Array<Array<MapBlockUtil>>=null;
}