var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
/**开始界面的json资源名称
 *
 */
GameConfig.START_CONFIG = "StartGameStageConfig_json";
/**资源分隔符
 *
 */
GameConfig.SPLIT_CHAR = '_';
/**图片名字-第一个字符串,比如map_xx_xx
 *
 */
GameConfig.MAP_NAME = "map";
/**单元格名字-第二个字符串,比如map_tile_xx
 *
 */
GameConfig.TILE_NAME = "tile";
/**mapBlock名字，确定mapBlock所在的group
 *
 */
GameConfig.MAP_BLOCK_NAME = "mapBlock";
GameConfig.FOG_TILE_NAME = "fog";
/**png后缀名
 *
 */
GameConfig.PNG_FORMAT = "png";
/**json后缀名
 *
 */
GameConfig.JSON_FORMAT = "json";
/**jpg后缀名
 *
 */
GameConfig.JPG_FORMAT = "jpg";
/**fnt后缀名
 *
 */
GameConfig.FNT_FORMAT = "fnt";
/**StoryTitle的json资源名称
 *
 */
GameConfig.STORYTITLE_CONFIG = "StoryTitleConfig_json";
/**StoryTitle的中间文字集合名称
 *
 */
GameConfig.SCENE_CONFIG = "SceneConfig_json";
/**地图层名字
 *
 */
GameConfig.MAP_LAYER = "mapLayer";
/**NPC层名字（包含建筑层）
 *
 */
GameConfig.NPC_LAYER = "npcLayer";
/**迷雾层名字
 *
 */
GameConfig.FOG_LAYER = "fogLayer";
/**需要删除的层名字集合
 *
 */
GameConfig.DELETE_LAYER = "deleteLayer";
/**人物层名字
 *
 */
GameConfig.HERO_LAYER = "heroLayer";
/**UI层名字
 *
 */
GameConfig.UI_LAYER = "uiLayer";
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map