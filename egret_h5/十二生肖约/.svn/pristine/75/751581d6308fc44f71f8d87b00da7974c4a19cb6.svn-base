class G_HPProgressBar extends BaseComponent {
    private hpProgressBar: eui.Image;
    private HPWidth = 59;

    public getW(): number {
        return 63;
    }

    public getH(): number {
        return 11;
    }

    protected onCreate() {

    }

    protected onDestroy() {

    }

    protected get skinPath(): String {
        return "resource/skins/game/G_HPProgressBarSkin.exml";
    }

    public setHP(currentHP: number, totleHP: number): void {
        
        egret.Tween.removeTweens(this.hpProgressBar);
        const w = Math.ceil(currentHP / totleHP * this.HPWidth);
        if (w > 0) {
            egret.Tween.get(this.hpProgressBar).to({ width: w }, 200, egret.Ease.sineIn);
        } else {
            egret.Tween.get(this.hpProgressBar).to({ width: w }, 200, egret.Ease.sineIn).call(function () {
                this.visible = false;
            }, this);
        }



    }
}