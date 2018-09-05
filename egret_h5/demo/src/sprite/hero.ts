class Hero extends egret.Sprite {
    constructor(heroType: number) {
        super();
       
        this.init(heroType);
    }
   
    public heroSprite: egret.Bitmap;
    public mcDataFactory: egret.MovieClipDataFactory;
    public heroMC: egret.MovieClip;


    private init(heroType: number): void {

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

    }

}