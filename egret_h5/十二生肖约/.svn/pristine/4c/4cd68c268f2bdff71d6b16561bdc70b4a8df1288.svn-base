class UI_Tie_Treasures extends BaseComponent {
    private treasureTitle: eui.Image;
    private treasureLight: eui.Image;
    public treasureIcon: eui.Group;
    private treasureInfo: eui.Label;
    private isRemoving: boolean;
    private listener: any;
    private movePoint: egret.Point;
    public constructor(data: Data_BaseTreasure) {
        super();
        this.makeTreasureIcon(data);
    }

    private makeTreasureIcon(data: Data_BaseTreasure) {
        let component: any = new eui.Image();
        if (data instanceof Data_Gold) {
            this.treasureInfo.text = "金币 " + data.value;
            component.source = "resource/res/ui/treasures/gold/tre_gold_gold.png"
            this.movePoint = Utils.getGoldPoint(this);
        } else if (data instanceof Data_Diamond) {
            this.treasureInfo.text = "钻石 " + data.value;
            component.source = "resource/res/ui/treasures/diam/tre_diam_diamond.png"
            this.movePoint = Utils.getGoldPoint(this);
        } else if (data instanceof Data_BaseGem) {
            this.treasureInfo.text = UI_Tre_GemConfig.getGemName(data.gemType, data.gemLevel) + "  x" + data.gemCounts
            component = new UI_Tre_Gem();
            component.setData(data);
            this.movePoint = Utils.getGemPoint(this);
        } else if (data instanceof Data_GemEssence) {
            this.treasureInfo.text = "守护石精华 " + data.value;
            component.source = "resource/res/ui/treasures/gemEss/tre_gemess_ess.png"
            this.movePoint = Utils.getGemPoint(this);
        }
        component.anchorOffsetX = 34;
        component.anchorOffsetY = 34;
        this.treasureIcon.addChild(component);
    } 


purple

    protected get skinPath(): String {
        return "resource/skins/ui/treasures/UI_Tie_TreasuresSkin.exml";
    }

    protected onCreate() {
        this.isRemoving = false;
        this.treasureIcon.touchEnabled = true;
        this.treasureIcon.touchChildren = false;
        this.treasureIcon.once(egret.TouchEvent.TOUCH_TAP, this.clickTreasure, this);
        this.tweenLight();
    }

    protected onDestroy() {

    }

    private tweenLight() {
        egret.Tween.get(this.treasureLight, { loop: true }).to({ rotation: 360 }, 80000);
        egret.Tween.get(this).wait(2000).call(this.startRemove, this);
    }

    private startRemove() {
        if (this.isRemoving) {
            return;
        }
        this.isRemoving = true;
        egret.Tween.get(this.treasureIcon).to({ scaleX: 1.3, scaleY: 1.3 }, 50, egret.Ease.getBackIn)
            .wait(200)
            // .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineInOut)
            .call(this.removeTreasure, this);
    }

    private removeTreasure() {
        egret.Tween.removeTweens(this.treasureLight);
        this.treasureTitle.visible = false;
        this.treasureLight.visible = false;
        this.treasureInfo.visible = false;
        egret.Tween.get(this.treasureIcon).to({ x: this.movePoint.x, y: this.movePoint.y, scaleX: 0.1, scaleY: 0.1, alpha: 0.5 }, 200, egret.Ease.sineIn).call(this.destroyTreasure, this);
    }

    private destroyTreasure() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis);
        }
    }

    private clickTreasure() {
        this.startRemove();
    }

    public setDestroyListener(listener: Function, self: any) {
        this.listener = { callback: listener, callbackThis: self };
    }

    public removeDestroyListener(listener: Function) {
        this.listener = null;
    }

}