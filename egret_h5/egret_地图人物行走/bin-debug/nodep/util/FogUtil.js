var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**单个地图块的迷雾的类
 *
 */
var FogUtil = (function () {
    function FogUtil(columnCount, rowCount) {
        this.fogCount = 0;
        this.isExploreArray = Array();
        this.fogCount = columnCount * rowCount;
        for (var rowNumber = 0; rowNumber < rowCount; rowNumber++) {
            var bArray = new Array();
            for (var columnNumber = 0; columnNumber < columnCount; columnNumber++) {
                var b = true;
                bArray.push(b);
            }
            this.isExploreArray.push(bArray);
        }
    }
    return FogUtil;
}());
__reflect(FogUtil.prototype, "FogUtil");
//# sourceMappingURL=FogUtil.js.map