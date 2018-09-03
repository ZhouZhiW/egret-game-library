var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏时间类
 */
var GameTimeData = (function () {
    function GameTimeData() {
        this._costT = 0;
        this.day = 0;
        this.hour = 0;
        this.min = 0;
        this.pd = "";
        this.isLight = false; //是否是晚上
    }
    GameTimeData.prototype.play = function () {
        this.synGameTime();
        RenderManager.getIns().registRender(this);
    };
    /**
     * 同步游戏时间
     */
    GameTimeData.prototype.synGameTime = function () {
        this.min = GameData.playerData.time % 60;
        this.hour = Math.trunc(GameData.playerData.time / 60) % 24;
        this.day = Math.trunc(GameData.playerData.time / (60 * 24));
        this.day += 1;
        this.pd = this.hour < 12 ? GameTimeData.AM : GameTimeData.PM;
        this.isLight = this.hour >= 20 || this.hour < 6;
    };
    /**
     * 刷新游戏时间
     */
    GameTimeData.prototype.renderUpdate = function (interval) {
        this._costT += interval;
        if (this._costT >= GameConfig.game_time_t_my) {
            this._costT = this._costT - GameConfig.game_time_t_my;
            GameData.playerData.time += 1;
            this.synGameTime();
        }
    };
    return GameTimeData;
}());
GameTimeData.PM = "PM";
GameTimeData.AM = "AM";
__reflect(GameTimeData.prototype, "GameTimeData", ["IRender"]);
//# sourceMappingURL=GameTimeData.js.map