class UI_Treasures extends BaseComponent {
    private treasureTitle: eui.Image;
    private treasureLight: eui.Image;
    public treasureIcon: ImageMaterial;
    private treasureInfo: eui.Label;
    private treasuresManager: UI_TreasuresManager;

    public constructor(manager: UI_TreasuresManager, data: Data_Material) {
        super();
        this.treasuresManager = manager;
        this.treasureIcon.setMaterialData(data);
        this.treasureInfo.text = data.name + " x " + data.counts;
        this.treasureIcon.scaleX = 0.7;
        this.treasureIcon.scaleY = 0.7;
        this.touchEnabled = true;
        this.once(egret.TouchEvent.TOUCH_TAP, this.clickTreasure, this);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/treasures/UI_TreasuresSkin.exml";
    }

    protected onCreate() {
        this.tweenLight();
    }

    protected onDestroy() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }
    private clickTreasure() {
        this.pickUp();
    }

    private tweenLight() {
        egret.Tween.get(this.treasureLight, { loop: true }).to({ rotation: 360 }, 80000);
        egret.Tween.get(this.treasureIcon)
            .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineInOut)
            .wait(1000)
            .call(this.pickUp, this);
    }

    private pickUp() {
        egret.Tween.removeTweens(this.treasureLight);
        egret.Tween.removeTweens(this.treasureIcon);
        this.treasureTitle.visible = false;
        this.treasureLight.visible = false;
        this.treasureInfo.visible = false;
        const p = this.getPickUpPoint(this.treasureIcon.getMaterialData().type);
        egret.Tween.get(this.treasureIcon).
            to({ x: p.x, y: p.y, scaleX: 0.1, scaleY: 0.1, alpha: 0.5 }, 200, egret.Ease.sineIn)
            .call(this.destroyTreasure, this);
    }

    private destroyTreasure() {
        this.treasuresManager.popEnd();

    }

    private getPickUpPoint(type: number): egret.Point {
        let p = new egret.Point();
        switch (type) {
            case DataType_Material.Gold:
                p.x = 383;
                p.y = 25;
                break;
            case DataType_Material.Diamond:
                p.x = 383;
                p.y = 64;
                break;
            case DataType_Material.Gem:
                p.x = 122;
                p.y = 753;
                break;
            case DataType_Material.Ess:
                p.x = 122;
                p.y = 753;
                break;
            case DataType_Material.Fragment:
                p.x = 122;
                p.y = 753;
                break;
            default://背包
                p.x = 198;
                p.y = 753;
                break;
        }
        return p;
    }

}