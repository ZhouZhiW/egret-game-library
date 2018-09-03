class Const {

    /**
     * 1.web
     * 2.微信小游戏
     * 3.qq玩一玩
     * 4.facebook
     * 
     */
    public static Capabilities = 2;
    public static stage
    public static WEBP = false;
    public static SW: number = 0;
    public static SH: number = 0;


    public static MAP_SKY_WIDTH = 2000;
    public static MAP_BEHIND_WIDTH = 5000;
    public static MAP_MIDDLE_WIDTH = 6000;
    public static MAP_FRONT_WIDTH = 10000;
    public static MAP_WIDTH = 20000;

    public static GAME_PLANE_Y = 562;
    public static GAME_WATER_Y = 540;
    public static MIDDLE_Y = 400;
    public static FRONT_Y = 550;
    public static BEHIND_Y = 400;
    public static SHADOW_Y = 0;

    public static HERO_WIDTH = 36;
    public static HERO_HEIGHT = 80;

    public static FACTOR = 50;

    public static HERO_SPEED = 300;

    public static GRAVITY = -3500;

    public static JUMP_SPEED = 600;
    public static JUMP_TIME_MAX = 300;

    public static HERO_BEGIN_X: number = 0;
    public static HERO_BEGIN_Y: number = 300;

    public static STORAGE_UNLOCK_MAP_ID = "STORAGE_UNLOCK_MAP_ID";
    public static STORAGE_SCORE_OBJECT = "STORAGE_SCORE_OBJECT";

    public static GRASS_SCALE_9_GRID: egret.Rectangle = new egret.Rectangle(14, 61, 16, 131);
    public static GROUND_SCALE_9_GRID: egret.Rectangle = new egret.Rectangle(16, 13, 97, 3);

    public static SPINE_PATH_FUNC = function (w, h): number[][] {
        var itemWidth = 38;
        var itemHeight = 43;
        var path = [[itemWidth / 2, -4], [6, -h], [w - 6, -h]];
        if (w > itemWidth)
            path.push([w - itemWidth / 2, -4]);
        return path;
    }
    public static SPINE_BIG_PATH_FUNC = function (w, h): number[][] {
        var itemWidth = 49;
        var itemHeight = 63;
        var path = [[itemWidth / 2, -4], [6, -h], [w - 6, -h]];
        if (w > itemWidth)
            path.push([w - itemWidth / 2, -4]);
        return path;
    }

    public static DEFAULT_UNLOCK_MAP_ID = 1;
    public static MAX_MAP_ID = 6;
    /**
     * 是否点击分享
     */
    public static CLICK_SHARE = false;

    public static GAME_SPEED = 500;

    public static speedOffset = 1;
}