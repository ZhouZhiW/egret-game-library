var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(heroType) {
        var _this = _super.call(this) || this;
        _this.init(heroType);
        return _this;
    }
    Hero.prototype.init = function (heroType) {
        var heroSprite = new egret.Bitmap();
        heroSprite.texture = RES.getRes("hero0" + heroType + "_png");
        this.heroSprite = heroSprite;
        var data = RES.getRes("hero" + heroType + "_json");
        var texture = RES.getRes("hero" + heroType + "_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        var heroMC = new egret.MovieClip(mcDataFactory.generateMovieClipData("stay"));
        this.addChild(heroMC);
        heroMC.play(-1);
        this.anchorOffsetX = 0;
        this.anchorOffsetY = heroSprite.height / 2;
        this.mcDataFactory = mcDataFactory;
        this.heroMC = heroMC;
    };
    return Hero;
}(egret.Sprite));
__reflect(Hero.prototype, "Hero");
