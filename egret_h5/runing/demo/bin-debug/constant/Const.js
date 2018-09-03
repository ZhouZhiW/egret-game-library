var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Const = (function () {
    function Const() {
    }
    /**
     * 1.web
     * 2.微信小游戏
     * 3.qq玩一玩
     * 4.facebook
     *
     */
    Const.Capabilities = 2;
    Const.WEBP = false;
    Const.SW = 0;
    Const.SH = 0;
    Const.MAP_SKY_WIDTH = 2000;
    Const.MAP_BEHIND_WIDTH = 5000;
    Const.MAP_MIDDLE_WIDTH = 6000;
    Const.MAP_FRONT_WIDTH = 10000;
    Const.MAP_WIDTH = 20000;
    Const.GAME_PLANE_Y = 562;
    Const.GAME_WATER_Y = 540;
    Const.MIDDLE_Y = 400;
    Const.FRONT_Y = 550;
    Const.BEHIND_Y = 400;
    Const.SHADOW_Y = 0;
    Const.HERO_WIDTH = 36;
    Const.HERO_HEIGHT = 80;
    Const.FACTOR = 50;
    Const.HERO_SPEED = 300;
    Const.GRAVITY = -3500;
    Const.JUMP_SPEED = 600;
    Const.JUMP_TIME_MAX = 300;
    Const.HERO_BEGIN_X = 0;
    Const.HERO_BEGIN_Y = 300;
    Const.STORAGE_UNLOCK_MAP_ID = "STORAGE_UNLOCK_MAP_ID";
    Const.STORAGE_SCORE_OBJECT = "STORAGE_SCORE_OBJECT";
    Const.GRASS_SCALE_9_GRID = new egret.Rectangle(14, 61, 16, 131);
    Const.GROUND_SCALE_9_GRID = new egret.Rectangle(16, 13, 97, 3);
    Const.SPINE_PATH_FUNC = function (w, h) {
        var itemWidth = 38;
        var itemHeight = 43;
        var path = [[itemWidth / 2, -4], [6, -h], [w - 6, -h]];
        if (w > itemWidth)
            path.push([w - itemWidth / 2, -4]);
        return path;
    };
    Const.SPINE_BIG_PATH_FUNC = function (w, h) {
        var itemWidth = 49;
        var itemHeight = 63;
        var path = [[itemWidth / 2, -4], [6, -h], [w - 6, -h]];
        if (w > itemWidth)
            path.push([w - itemWidth / 2, -4]);
        return path;
    };
    Const.DEFAULT_UNLOCK_MAP_ID = 1;
    Const.MAX_MAP_ID = 6;
    /**
     * 是否点击分享
     */
    Const.CLICK_SHARE = false;
    Const.GAME_SPEED = 500;
    Const.speedOffset = 1;
    return Const;
}());
__reflect(Const.prototype, "Const");
//# sourceMappingURL=Const.js.map