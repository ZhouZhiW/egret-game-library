class UI_BaseCostomButton extends eui.Button {
    private btnText: eui.Label;
    private btnIcon: eui.Image;
    private btnValue: eui.Label;


    public constructor() {
        super();

    }

    protected onCreate() {

    }

    protected onDestroy() {

    }

    public setBtnSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public setTextSize(size: number) {
        this.btnText.size = size;
    }

    public setIconSize(size: number) {
        if (this.btnIcon == null) {
            return;
        }
        this.btnIcon.width = size;
        this.btnIcon.height = size;
    }
    /**
     * styleIndex: 0 绿色纯文字 1 黄色带图标 
     */
    public setStyle(styleIndex: number,skinName) {
        switch (styleIndex) {
            case 0:
                this.skinName = "resource/skins/ui/base/UI_CustomButtonDefaultSkin.exml";
                break;
            case 1:
                this.skinName = "resource/skins/ui/base/UI_CustomButtonIconSkin.exml";
                break;
            case 2:
                this.skinName = "resource/skins/ui/base/UI_CustomSmallButtonSkin.exml";
                break;
        }
    }

    public setText(text: string) {
        this.btnText.text = text;
    }


    /**
     * iconIndex: 0 钻石  1 宝石精华  2 底座碎片
     */
    public setIcon(iconIndex: number) {
        if (this.btnIcon == null) {
            return;
        }
        switch (iconIndex) {
            case 0:
                this.btnIcon.source = "resource/res/assicon/assicon_diamond.png";
                break;
            case 1:
                this.btnIcon.source = "resource/res/assicon/assicon_ess.png";
                break;
            case 2:
                this.btnIcon.source = "resource/res/assicon/assicon_frg.png";
                break;
            case 3:
                this.btnIcon.source = "esource/res/assicon/assicon_gold.png"
        }
    }
    
    public setValue(value: number) {
        if (this.btnValue == null) {
            return;
        }
        this.btnValue.text = EasyNumber.easyNum(value);
    }

}