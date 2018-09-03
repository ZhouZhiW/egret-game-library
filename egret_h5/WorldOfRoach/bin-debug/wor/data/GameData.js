var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏数据
 */
var GameData = (function () {
    function GameData() {
    }
    return GameData;
}());
/**历史数据 */
GameData.historyData = new HistoryData();
/**玩家数据 */
GameData.playerData = new PlayerData();
GameData.equipData = new EquipData();
GameData.itemData = new ItemData();
GameData.timeData = new GameTimeData();
GameData.mapData = new LloydMapData();
GameData.plantData = new PlantData();
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map