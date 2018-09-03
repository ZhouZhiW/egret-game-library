var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeroObject = (function () {
    function HeroObject() {
        this.mAlive = false;
        this.mPaused = true;
        this.mcFactory = new egret.MovieClipDataFactory(RES.getRes("cola_json"), RES.getRes("cola_png"));
        this.view = new egret.MovieClip();
    }
    HeroObject.prototype.setInfo = function (res) {
        this.mcFactory = new egret.MovieClipDataFactory(RES.getRes(res + "_json"), RES.getRes(res + "_png"));
    };
    HeroObject.prototype.updateDisplay = function () {
        var self = this;
        if (!self.mAlive) {
            self.view.movieClipData = self.mcFactory.generateMovieClipData("dead");
            self.view.play();
        }
        else if (this.mPaused) {
            self.view.movieClipData = self.mcFactory.generateMovieClipData("stand");
            self.view.play();
        }
        else {
            self.view.movieClipData = self.mcFactory.generateMovieClipData("walk");
            self.view.play(-1);
        }
        // AnchorUtil.setAnchorY(self.view, 0.8);
    };
    return HeroObject;
}());
__reflect(HeroObject.prototype, "HeroObject");
//# sourceMappingURL=HeroObject.js.map