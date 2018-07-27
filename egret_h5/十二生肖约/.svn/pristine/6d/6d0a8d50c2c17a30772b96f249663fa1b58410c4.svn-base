var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResManager = (function () {
    function ResManager() {
        this._floatingFont = RES.getRes("floating_text_fnt");
        this._floatingCritFont = RES.getRes("floating_crit_text_fnt");
        this._gameLevelFont = RES.getRes("game_level_text_fnt");
    }
    Object.defineProperty(ResManager, "inst", {
        get: function () {
            if (this.ins == null) {
                this.ins = new ResManager();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResManager.prototype, "floatingFont", {
        get: function () {
            return this._floatingFont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResManager.prototype, "floatingCritFont", {
        get: function () {
            return this._floatingCritFont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResManager.prototype, "gameLevelFont", {
        get: function () {
            return this._gameLevelFont;
        },
        enumerable: true,
        configurable: true
    });
    return ResManager;
}());
__reflect(ResManager.prototype, "ResManager");
//# sourceMappingURL=ResManager.js.map