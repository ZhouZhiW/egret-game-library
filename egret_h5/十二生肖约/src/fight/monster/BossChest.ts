class BossChest extends BaseMovieClip {
    private chestID: number;
    private chestMC: egret.MovieClip;
    private dropOffsideX: number;
    private openEnable: boolean;
    public constructor(chestID: number) {
        super();
        this.openEnable = false;
        this.chestID = chestID;
        this.loadMovieClipDataFactory("resource/mc/monsters/bosschest", this.getChestMC);
    }


    private getChestMC(mcdf: egret.MovieClipDataFactory) {
        this.chestMC = new egret.MovieClip(mcdf.generateMovieClipData("bosschest"));
        this.addChild(this.chestMC);
    }


    public drop(point: egret.Point) {
        this.x = point.x;
        this.y = point.y;

        this.dropOffsideX = this.getDropOffsideX();
        this.alpha = 0.5;
        this.scaleX = this.dropOffsideX < 0 ? -0.5 : 0.5;
        this.scaleY = 0.5;
        const endScaleX = this.dropOffsideX < 0 ? -1 : 1;

        const y = this.y + 20;
        egret.Tween.get(this, { onChange: this.dropping, onChangeObj: this })
            .to({ alpha: 1, y: y - 100 }, 250, egret.Ease.sineOut).to({ scaleX: endScaleX, scaleY: 1, y: y }, 250, egret.Ease.sineIn).call(this.dropComplete, this);

        if (this.chestMC != null) {
            this.chestMC.gotoAndPlay("drop", -1);
        }
    }

    private getDropOffsideX(): number {
        const n = (Utils.random(2) ? 1 : -1) * (Math.random() * 2);
        return n;
    }


    private dropping() {
        this.x += this.dropOffsideX;
    }

    private getDropOffsideY(): number {
        const n = (Utils.random(2) ? 1 : -1) * Utils.random(10);
        return n;
    }

    private dropComplete() {
        this.openEnable = true;
        egret.Tween.get(this).wait(2000).call(this.click, this);
    }


    public checkClick(stageX: number, stageY: number): boolean {
        if (this.hitTestPoint(stageX, stageY, false)) {
            return this.click();
        } else {
            return false;
        }
    }

    private click(): boolean {
        if (!this.openEnable) {
            return;
        }
        egret.Tween.removeTweens(this);
        this.openEnable = false;
        NetEventManager.inst.pushOpenChest(this.chestID, true);
        if (this.chestMC != null) {
            this.chestMC.gotoAndPlay("open", 1);
        }
        egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 200).call(this.end, this);
        return;
    }

    private end() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }
}