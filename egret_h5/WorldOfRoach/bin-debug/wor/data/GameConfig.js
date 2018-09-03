var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局配置文件
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
/**摇杆半径*/
GameConfig.rocker_bar_sensitivity = 120;
/**游戏里一分钟对应现实的毫秒数*/
GameConfig.game_time_t_my = 1000;
/**单元格宽度 */
GameConfig.GRID_W = 200;
/**单元格高度 */
GameConfig.GRID_H = 100;
/**横向预加载格子数量 */
GameConfig.OFFSET_W = 400;
/**纵向预加载格子数量 */
GameConfig.OFFSET_H = 100;
/**植被存储横向像素 */
GameConfig.ROOM_CHECK_W = 2000;
/**植被存储纵向像素 */
GameConfig.ROOM_CHECK_H = 1000;
/**植被的树 */
GameConfig.ROOM_GRID_SIZE = 300;
/**世界的高度 */
GameConfig.WORD_W = 200000;
/**世界的宽度 */
GameConfig.WORD_H = 100000;
/**是否显示迷雾 */
GameConfig.showFog = false;
/**是否显示河流 */
GameConfig.showRiver = false;
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map