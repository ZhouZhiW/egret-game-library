class GameLevelInfo extends egret.BitmapText {
    public constructor(value: number) {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.x = 240;
        this.y = 360;
        this.font = new egret.BitmapText();
        if (value == 0) {
            this.text = "b  !";
        } else {
            this.text = "r  " + value;
        }
    }

    protected onCreate() {
        this.font = ResManager.inst.gameLevelFont;
        this.anchorOffsetX = this.width >> 1;
        this.floating();
    }
    private floating() {
        egret.Tween.get(this)
            .to({ alpha: 0, y: this.y - 60 }, 1000, egret.Ease.sineOut).call(this.floatingComplete, this);
    }
    private floatingComplete() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

}