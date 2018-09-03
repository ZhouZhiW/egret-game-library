var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**对迷雾层的处理类
 *
 */
var FogLayerOperate = (function () {
    function FogLayerOperate() {
    }
    /**初始化，或者传送
     *
     */
    FogLayerOperate.prototype.init = function (roleX, roleY, initDeleteFogNumber, mapInfo) {
        var mbColumnCount = mapInfo.mbList[0][0].columnCount;
        var mbRowCount = mapInfo.mbList[0][0].rowCount;
        //根据role的x坐标获得所在的mapBlock的列数，向下取整
        var mbHNumber = Math.floor(roleX / (mbColumnCount * mapInfo.tileWidth));
        //根据role的y坐标获得所在的mapBlock的行数，向下取整
        var mbVNumber = Math.floor(roleY / (mbRowCount * mapInfo.tileHeight));
        var tileHNumber = roleX / mapInfo.tileWidth;
        var tileVNumber = roleY / mapInfo.tileHeight;
        var topTileNumber = tileVNumber - initDeleteFogNumber;
        var bottomTileNumber = tileVNumber + initDeleteFogNumber;
        for (; topTileNumber <= bottomTileNumber; topTileNumber++) {
            if (topTileNumber < 0) {
                continue;
            }
            if (topTileNumber >= mapInfo.rowCount) {
                return;
            }
            var leftTileHNumber = tileHNumber - initDeleteFogNumber;
            var rightTileNumber = tileHNumber + initDeleteFogNumber;
            for (; leftTileHNumber <= rightTileNumber; leftTileHNumber++) {
                if (leftTileHNumber >= 0) {
                    this.clearFog(this.fogLayer, topTileNumber, leftTileHNumber, mbColumnCount, mbRowCount);
                }
            }
        }
    };
    FogLayerOperate.prototype.clearFog = function (fogLayer, topTileNumber, leftTileNumber, mbColumnCount, mbRowCount) {
        var groupName = GameConfig.MAP_BLOCK_NAME + Comman.isMaxTen(Math.floor(topTileNumber / mbRowCount)) + Comman.isMaxTen(Math.floor(leftTileNumber / mbColumnCount));
        var group = fogLayer.getChildByName(groupName);
        if (leftTileNumber == mbColumnCount) {
            leftTileNumber = 0;
        }
        var tileName = GameConfig.FOG_TILE_NAME + Comman.isMaxTen(topTileNumber % mbRowCount) + Comman.isMaxTen(leftTileNumber % mbColumnCount);
        if (group) {
            var fog = group.getChildByName(tileName);
            if (fog) {
                group.fogUtil.isExploreArray[topTileNumber % mbRowCount][leftTileNumber % mbColumnCount] = false;
                group.fogUtil.fogCount--;
                group.removeChild(fog);
                console.log((topTileNumber % mbRowCount) * (leftTileNumber % mbColumnCount));
            }
        }
    };
    FogLayerOperate.prototype.saveFog = function (mapName, mapBlockName, fogLayer) {
        if (fogLayer.fogCount == 0) {
            return;
        }
        var name = mapName + GameConfig.SPLIT_CHAR + mapBlockName;
        Local.save(name, JSON.stringify(fogLayer));
    };
    FogLayerOperate.prototype.loadFog = function (mapName, mapBlockName) {
        var name = mapName + GameConfig.SPLIT_CHAR + mapBlockName;
        return Local.load(name);
    };
    /**移动
     *
     */
    FogLayerOperate.prototype.move = function () {
    };
    return FogLayerOperate;
}());
__reflect(FogLayerOperate.prototype, "FogLayerOperate");
//# sourceMappingURL=FogLayerOperate.js.map