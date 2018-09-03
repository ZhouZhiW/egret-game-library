var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**地图分块加载-单个地图块（大小以stageWidth,stageHeight进行切割）
 *
 */
var MapBlockUtil = (function () {
    function MapBlockUtil() {
        /**单个地图块的背景资源名称---暂未实现每个单元块
         *
         */
        this.backGroundTileImageName = null;
        /**单个迷雾背景单元块的资源名称
         *
         */
        this.fogTileImageName = null;
        /**地图块的行数
         *
         */
        this.columnCount = null;
        /**地图块的行数
         *
         */
        this.rowCount = null;
        /**所在地图的列数
         *
         */
        this.HNumber = null;
        /**所在地图的列数
         *
         */
        this.VNumber = null;
        /**地图块x坐标
         *
         */
        this.x = null;
        /**地图块y坐标
         *
         */
        this.y = null;
        /**地图快的名字，方便舞台移除
         *
         */
        this.name = null;
    }
    return MapBlockUtil;
}());
__reflect(MapBlockUtil.prototype, "MapBlockUtil");
//# sourceMappingURL=MapBlockUtil.js.map