class FloatingAttactValue extends egret.BitmapText {
    private iscrit: boolean;
    public constructor(value: number, point: egret.Point) {
        super();
        this.x = point.x;
        this.y = point.y;
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.font = new egret.BitmapText();
        this.iscrit = value < 0;
        this.text = EasyNumber.easyNum(Math.abs(value));
    }

    protected onCreate() {
        if (this.iscrit) {
            this.font = ResManager.inst.floatingCritFont;
        } else {
            this.font = ResManager.inst.floatingFont;
        }

        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height;
        this.floating();
    }

    private floating() {
        // if (this.iscrit) {
        //     egret.Tween.get(this)
        //         .to({ scaleX: 1.8, scaleY: 1.8 }, 20, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 30, egret.Ease.sineIn).wait(400).
        //         to({ y: this.y - 50, alpha: 0.7 }, 1000).call(this.floatingComplete, this);
        // } else {
        //     egret.Tween.get(this)
        //         .to({ scaleX: 1.5, scaleY: 1.5 }, 50, egret.Ease.sineIn).to({ scaleX: 0.8, scaleY: 0.8 }, 50, egret.Ease.sineIn).wait(200).
        //         to({ y: this.y - 30, alpha: 0.5 }, 300).call(this.floatingComplete, this);

        // }
        egret.Tween.get(this)
            .to({ y: this.y - 50 }, 1000, egret.Ease.sineOut).call(this.floatingComplete, this);
    }

    private floatingComplete() {
        if(this.parent!=null){
            this.parent.removeChild(this);
        }
    }
}