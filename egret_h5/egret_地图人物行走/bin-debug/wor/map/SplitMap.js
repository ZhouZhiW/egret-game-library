var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**根据提供的大地图图片资源，分割成N个mapBlock，仅用来生成新的地图
 *
 */
var SplitMap = (function () {
    function SplitMap() {
    }
    /**分割大地图
     *
     * @param cameraWidth 分割视图的宽度
     * @param cameraHeight 分割视图的高度
     * @param mapInfo 地图信息
     */
    SplitMap.prototype.split = function (cameraWidth, cameraHeight, mapInfo) {
        //mapBlock集合
        var mbList = new Array();
        //计算横向有多少个mapBlock,若有不足的，强制+1
        var mbHCount = this.calculateMapBlockCount(mapInfo.width, cameraWidth);
        //计算纵向有多少个mapBlock,若有不足的，强制+1
        var mbVCount = this.calculateMapBlockCount(mapInfo.height, cameraHeight);
        mbList = this.createList(mbHCount, mbVCount, cameraWidth, cameraHeight, mapInfo);
        return mbList;
    };
    /**创建mapBlock总集合
     *
     * @param mbHCount mapBlock在横向有多少个
     * @param mbVCount mapBlock在纵向有多少个
     * @param cameraWidth 分割地图的视图宽度
     * @param cameraHeight 分割地图的视图高度
     * @param mapInfo 地图信息
     */
    SplitMap.prototype.createList = function (mbHCount, mbVCount, cameraWidth, cameraHeight, mapInfo) {
        //mapBlock的集合
        var mbList = new Array();
        //根据count总数创建mbList
        for (var mbVNumber = 0; mbVNumber < mbVCount; mbVNumber++) {
            //根据vNumber获取横向的mapBlock集合
            var mbArray = new Array();
            //获取单个地图快的行总数
            var mbRowCount = Math.ceil(cameraHeight / mapInfo.tileHeight);
            //设置地图块的y坐标
            var y = mbRowCount * mapInfo.tileHeight * mbVNumber;
            //判断纵向坐标的边界，最后一个为总行数-之前已经创建的行数
            if (mbVNumber == mbVCount - 1) {
                mbRowCount = mapInfo.rowCount - mbVNumber * mbRowCount;
            }
            for (var mbHNumber = 0; mbHNumber < mbHCount; mbHNumber++) {
                //获取单个地图快的列总数
                var mbColumnCount = Math.ceil(cameraWidth / mapInfo.tileWidth);
                //设置x坐标
                var x = mbColumnCount * mapInfo.tileHeight * mbHNumber;
                //判断横向坐标的边界，最后一个为总列数-之前已经创建的列数
                if (mbHNumber == mbHCount - 1) {
                    mbColumnCount = mapInfo.columnCount - mbHNumber * mbColumnCount;
                }
                var mbUtil = this.createTile(mbColumnCount, mbRowCount, mbHNumber, mbVNumber, x, y);
                mbArray.push(mbUtil);
            }
            mbList.push(mbArray);
        }
        return mbList;
    };
    /**创建单个mapBlockUtil
     *
     * @param columnCount 列数
     * @param rowCount 行数
     * @param HNumber  横向所在第几个
     * @param VNumber 纵向所在第几个
     * @param x x坐标
     * @param y y坐标
     */
    SplitMap.prototype.createTile = function (columnCount, rowCount, HNumber, VNumber, x, y) {
        var mapBlockUtil = new MapBlockUtil();
        mapBlockUtil.columnCount = columnCount;
        mapBlockUtil.rowCount = rowCount;
        mapBlockUtil.fogTileImageName = Comman.nameJoint(GameConfig.MAP_NAME, GameConfig.FOG_TILE_NAME, GameConfig.TILE_NAME, "00", GameConfig.PNG_FORMAT);
        mapBlockUtil.x = x;
        mapBlockUtil.y = y;
        mapBlockUtil.HNumber = HNumber;
        mapBlockUtil.VNumber = VNumber;
        mapBlockUtil.name = GameConfig.MAP_BLOCK_NAME + Comman.isMaxTen(VNumber) + Comman.isMaxTen(HNumber);
        //获取拼接后的名字
        mapBlockUtil.backGroundTileImageName = Comman.nameJoint(GameConfig.MAP_NAME, GameConfig.TILE_NAME, "0" + Math.round(Math.random() * 9).toString(), GameConfig.PNG_FORMAT);
        return mapBlockUtil;
    };
    //根据传入的参数计算所产生的mapBlock数量
    SplitMap.prototype.calculateMapBlockCount = function (mapAspect, cameraAspect) {
        var mbCount = Math.ceil(mapAspect / cameraAspect);
        mbCount = mbCount == 0 ? 1 : mbCount;
        return mbCount;
    };
    return SplitMap;
}());
__reflect(SplitMap.prototype, "SplitMap");
//# sourceMappingURL=SplitMap.js.map