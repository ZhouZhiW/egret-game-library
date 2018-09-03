class GameConfig {
	/**开始界面的json资源名称
	 * 
	 */
	public static START_CONFIG:string="StartGameStageConfig_json";
	
	/**资源分隔符
	 * 
	 */
	public static SPLIT_CHAR:string='_';

	/**图片名字-第一个字符串,比如map_xx_xx
	 * 
	 */
	public static MAP_NAME:string="map";

	/**单元格名字-第二个字符串,比如map_tile_xx
	 * 
	 */
	public static TILE_NAME:string="tile";

	/**mapBlock名字，确定mapBlock所在的group
	 * 
	 */
	public static MAP_BLOCK_NAME:string="mapBlock";

	public static FOG_TILE_NAME:string="fog";

	/**png后缀名
	 * 
	 */
	public static PNG_FORMAT:string="png";

	/**json后缀名
	 * 
	 */
	public static JSON_FORMAT:string="json";


	/**jpg后缀名
	 * 
	 */
	public static JPG_FORMAT:string="jpg";

	/**fnt后缀名
	 * 
	 */
	public static FNT_FORMAT:string="fnt";

	/**StoryTitle的json资源名称 
	 * 
	 */
	public static STORYTITLE_CONFIG:string="StoryTitleConfig_json";

	/**StoryTitle的中间文字集合名称
	 * 
	 */
	public static SCENE_CONFIG:string="SceneConfig_json";

	/**地图层名字
	 * 
	 */
	public static MAP_LAYER:string="mapLayer";

	/**NPC层名字（包含建筑层）
	 * 
	 */
	public static NPC_LAYER:string="npcLayer";

	/**迷雾层名字
	 * 
	 */
	public static FOG_LAYER:string="fogLayer";

	/**需要删除的层名字集合
	 * 
	 */
	public static DELETE_LAYER:string="deleteLayer";

	/**人物层名字
	 * 
	 */
	public static HERO_LAYER:string="heroLayer";

	/**UI层名字
	 * 
	 */
	public static UI_LAYER:string="uiLayer";
}