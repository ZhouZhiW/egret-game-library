class Gold extends BaseComponent {
    private goldData: Data_Gold;
    private initialX: number;
    private initialY: number;
    private dropOffsideX: number;
    private moneyMC: egret.MovieClip;
    public constructor(goldData: Data_Gold, point: egret.Point, goldMcdf: egret.MovieClipDataFactory) {
        super();
        this.goldData = goldData;
        this.initialX = point.x;
        this.initialY = point.y;
        this.x = this.initialX;
        this.y = this.initialY;
        if (goldMcdf != null) {
            this.moneyMC = new egret.MovieClip(goldMcdf.generateMovieClipData("money"));
            this.addChild(this.moneyMC);
        }
    }


    protected onCreate() {
        this.drop();
    }

    protected onDestroy() {

    }

    private drop() {
        const y = this.initialY + this.getDropOffsideY();
        egret.Tween.get(this, { onChange: this.dropping, onChangeObj: this })
            .to({ y: y - 66 }, 250, egret.Ease.sineOut).to({ y: y }, 250, egret.Ease.sineIn).call(this.turn, this);
        this.dropOffsideX = this.getDropOffsideX();
    }


    private dropping() {
        this.x += this.dropOffsideX;
    }

    private turn() {
        this.moneyMC.gotoAndPlay("turn", 1);
    }

    private getDropOffsideX(): number {
        const n = (Utils.random(2) ? 1 : -1) * (Math.random() * 2);
        return n;
    }

    private getDropOffsideY(): number {
        const n = (Utils.random(2) ? 1 : -1) * Utils.random(10);
        return n;
    }



    public pickUp(): Data_Gold {
        egret.Tween.removeTweens(this);
        this.moneyMC.gotoAndStop("turn");

        const g = this.goldData;
        this.goldData = null;//保证只拾取一次
        if (this.moneyMC == null) {
            this.pickUpComplete();
            return g;
        } else {
            const p = GameUtils.getGoldPoint(this.parent);
            egret.Tween.get(this).to({ x: p.x, y: p.y }, 300, egret.Ease.sineIn).call(this.pickUpComplete, this);
        }
        return g;
    }

    private pickUpComplete() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    public checkClick(stageX: number, stageY: number): boolean {
        return this.hitTestPoint(stageX, stageY, false);
    }

}
