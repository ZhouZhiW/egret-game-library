var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**游戏存档管理器 */
var SaveManager = (function () {
    function SaveManager() {
    }
    //获取单例
    SaveManager.getIns = function () {
        if (!SaveManager._ins)
            SaveManager._ins = new SaveManager();
        return SaveManager._ins;
    };
    /**将所有进行存档处理 */
    SaveManager.prototype.saveAll = function () {
        this.savePlayer();
        this.saveFocusPlants();
        FogForGrid.getIns().saveMiniMap();
    };
    //存档自己的位置
    SaveManager.prototype.savePlayer = function () {
        GameData.playerData.posX = PlayerRole.self.x / Tiled_Ground.getIns().cf_X;
        GameData.playerData.posY = PlayerRole.self.y / Tiled_Ground.getIns().cf_Y;
        localStorage.setItem(Server_User.T_USER_DATA, JSON.stringify(GameData.playerData));
    };
    /**保存当前所有的植物状态 */
    SaveManager.prototype.saveFocusPlants = function () {
    };
    /**存指定的植物区域 */
    SaveManager.prototype.savePlants = function (key, jsonStr) {
        localStorage.setItem(Server_Map.T_MAP_PLANTS + key, jsonStr);
    };
    return SaveManager;
}());
__reflect(SaveManager.prototype, "SaveManager");
//# sourceMappingURL=SaveManager.js.map