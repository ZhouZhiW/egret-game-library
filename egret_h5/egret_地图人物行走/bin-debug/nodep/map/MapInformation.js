var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**单个地图的信息
 *
 */
var MapInformation = (function () {
    function MapInformation() {
        /**行数
         *
         */
        this.columnCount = null;
        /**列数
         *
         */
        this.rowCount = null;
        /**单个单元格的宽度
         *
         */
        this.tileWidth = null;
        /**单个单元格的高度
         *
         */
        this.tileHeight = null;
        /**根据cameraWidth及height切割的mapBlock集合
         *
         */
        this.mbList = null;
    }
    Object.defineProperty(MapInformation.prototype, "width", {
        /**地图宽度
         *
         */
        get: function () {
            return this.columnCount * this.tileWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInformation.prototype, "height", {
        /**地图高度
         *
         */
        get: function () {
            return this.rowCount * this.tileHeight;
        },
        enumerable: true,
        configurable: true
    });
    return MapInformation;
}());
__reflect(MapInformation.prototype, "MapInformation");
//# sourceMappingURL=MapInformation.js.map