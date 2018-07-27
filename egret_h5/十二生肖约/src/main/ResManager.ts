class ResManager {
    private static ins: ResManager;

    private _floatingFont: egret.BitmapFont;
    private _floatingCritFont: egret.BitmapFont;
    private _gameLevelFont: egret.BitmapFont;

    public constructor() {
        this._floatingFont = RES.getRes("floating_text_fnt");
        this._floatingCritFont = RES.getRes("floating_crit_text_fnt");
        this._gameLevelFont = RES.getRes("game_level_text_fnt");
    }
    public static get inst(): ResManager {
        if (this.ins == null) {
            this.ins = new ResManager();
        }
        return this.ins;
    }

    public get floatingFont(): egret.BitmapFont {
        return this._floatingFont;
    }

    public get floatingCritFont(): egret.BitmapFont {
        return this._floatingCritFont;
    }
    public get gameLevelFont(): egret.BitmapFont {
        return this._gameLevelFont;
    }

}