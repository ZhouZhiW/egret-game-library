var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 柏林噪声图2维测试
 * @author nodep
 * @version 1.0
 */
var PerlinNoiseUtil = (function () {
    function PerlinNoiseUtil() {
    }
    /**
     * 产生一个噪声图的二维数据
     * @param w 噪声图的宽度
     * @param h 噪声图的高度
     */
    PerlinNoiseUtil.noise2D = function (w, h) {
        var btd = [];
        PerlinNoiseUtil.seed = Math.floor(Math.random() * 1376312589);
        var bs = 10;
        var gridW = Math.floor(w / bs);
        var gridH = Math.floor(h / bs);
        var i = 0;
        var startX = Math.floor(Math.random() * 5);
        var startY = Math.floor(Math.random() * 5);
        for (i; i < w; i++) {
            btd[i] = new Array();
            for (var j = 0; j < h; j++) {
                var f = PerlinNoiseUtil.insertNum_2D(i / gridW + startX, j / gridH + startY);
                var color = Math.floor(0x0000FF * f);
                btd[i][j] = color;
            }
        }
        return btd;
    };
    /**
     * 获取平滑的2D噪声点
     * @param x
     * @param y
     * @return
     */
    PerlinNoiseUtil.getSmoothNoise2D = function (x, y) {
        var cut = 1;
        var corners = (PerlinNoiseUtil.getNoise2D(x - cut, y - cut) + PerlinNoiseUtil.getNoise2D(x + cut, y - cut) + PerlinNoiseUtil.getNoise2D(x - cut, y + cut) + PerlinNoiseUtil.getNoise2D(x + cut, y + cut)) / 16;
        var sides = (PerlinNoiseUtil.getNoise2D(x - cut, y) + PerlinNoiseUtil.getNoise2D(x + cut, y) + PerlinNoiseUtil.getNoise2D(x, y - cut) + PerlinNoiseUtil.getNoise2D(x, y + cut)) / 8;
        var center = PerlinNoiseUtil.getNoise2D(x, y) / 4;
        return corners + sides + center;
    };
    /**
     * 获取一个0-1之间的随机数,不能有负数
     * @param x
     * @param y
     * @return
     */
    PerlinNoiseUtil.getNoise2D = function (x, y) {
        var n = x + y * 57;
        n = (n << 13) ^ n;
        n = (1.0 - ((n * (n * n * 15731 + 789221) + PerlinNoiseUtil.seed) & 0x7fffffff) / 1073741824.0);
        n = Math.abs(n);
        return n;
    };
    /**
     * 插入二维图
     * @param x
     * @param y
     * @return
     */
    PerlinNoiseUtil.insertNum_2D = function (x, y) {
        var integer_X = Math.floor(x); //上一个整数x
        var fractional_X = x - integer_X; //距离上一个整数x
        var integer_Y = Math.floor(y); //上一个y
        var fractional_Y = y - integer_Y;
        var v1 = PerlinNoiseUtil.getSmoothNoise2D(integer_X, integer_Y); //第一象限
        var v2 = PerlinNoiseUtil.getSmoothNoise2D(integer_X + 1, integer_Y); //第二象限
        var v3 = PerlinNoiseUtil.getSmoothNoise2D(integer_X, integer_Y + 1); //第四象限
        var v4 = PerlinNoiseUtil.getSmoothNoise2D(integer_X + 1, integer_Y + 1); //第三象限
        var i1 = PerlinNoiseUtil.insertNum_2(v1, v2, fractional_X);
        var i2 = PerlinNoiseUtil.insertNum_2(v3, v4, fractional_X);
        return PerlinNoiseUtil.insertNum_2(i1, i2, fractional_Y);
    };
    /**
     * 余玄插入函数
     * @param a
     * @param b
     * @param x
     * @return
     */
    PerlinNoiseUtil.insertNum_2 = function (a, b, x) {
        var ft = x * 3.1415927;
        var f = (1 - Math.cos(ft)) * 0.5;
        return a * (1 - f) + b * f;
    };
    return PerlinNoiseUtil;
}());
/**地图随机种子 */
PerlinNoiseUtil.seed = 0;
__reflect(PerlinNoiseUtil.prototype, "PerlinNoiseUtil");
//# sourceMappingURL=PerlinNoiseUtil.js.map