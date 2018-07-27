class UI_Mail_Item extends eui.ItemRenderer {
    private itemData: Data_Mail_Item;
    private mailDescribe: eui.Label;
    private buyBtn: UI_BaseCostomButton;
    private maiIcon: eui.Image;

    constructor() {
        super();
        this.touchChildren = true;
        this.skinName = "resource/skins/ui/mail/UI_Mail_ItemSkin.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    private onCreate() {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickedBtn, this);
        this.buyBtn.setText("购买");
        this.buyBtn.setTextSize(16);
        this.buyBtn.setIconSize(18);
        this.buyBtn.setIcon(0);
    }

    private onDestroy() {
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickedBtn, this);
    }

    private onclickedBtn(e: egret.TouchEvent) {
        if (!this.itemData.canShop) {
            const d = new NTextDialog();
            d.setContent(this.itemData.errorDescription);
            d.show();
            return;
        }
        if (DataManager.inst.asset.diamond < this.itemData.cost) {
            const d = new PayDialog();
            d.setTipDiamond(this.itemData.cost);
            d.show();
        } else {
            const d = new DiamondDialog();
            d.setDiamond(this.itemData.cost);
            d.setClickListener(this.pushNet, this);
            d.show();
        }
    }

    private pushNet() {
        NetEventManager.inst.pushBuy(this.itemData.index);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Mail_Item>this.data;
        this.buyBtn.setValue(this.itemData.cost);
        this.mailDescribe.text = this.itemData.description;
        this.maiIcon.source = this.getIcon(this.itemData.index);
    }

    private getIcon(index: number) {
        let path;
        switch (index) {
            case 1:
                path = "resource/res/itemicon/mall/item_icon_mall_gold.png";
                break;
            case 2:
                path = "resource/res/itemicon/mall/item_icon_mall_firstgem.png";
                break;
            case 3:
                path = "resource/res/itemicon/mall/item_icon_mall_thirdgem.png";
                break;
            case 4:
                path = "resource/res/itemicon/mall/item_icon_mall_thirdgem10.png";
                break;
            case 5:
                path = "resource/res/itemicon/mall/item_icon_mall_ess.png";
                break;
            case 6:
                path = "resource/res/itemicon/mall/item_icon_mall_ess10.png";
                break;
            case 7:
                path = "resource/res/itemicon/mall/item_icon_mall_frg.png";
                break;
            case 8:
                path = "resource/res/itemicon/mall/item_icon_mall_frg10.png";
                break;
            case 9:
                path = "resource/res/itemicon/mall/item_icon_mall_equipnomal.png";
                break;
            case 10:
                path = "resource/res/itemicon/mall/item_icon_mall_equipLux.png";
                break;
        }
        return path;
    }
}