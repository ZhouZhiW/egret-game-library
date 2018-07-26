/**
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(heroType) {
        _super.call(this);
        this.init(heroType);
    }
    var d = __define,c=Hero;p=c.prototype;
    p.init = function (heroType) {
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
        //        heroMC.scaleY = -1;
        //        this.scaleY = -1;
    };
    return Hero;
})(egret.Sprite);
egret.registerClass(Hero,"Hero");
