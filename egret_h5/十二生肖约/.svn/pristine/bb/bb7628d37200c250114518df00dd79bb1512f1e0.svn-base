class UI_Rank_AssistorAvatar extends UI_UserAvatar {
    private titleTip;

    constructor() {
        super();
    }

    public setTitle(type: number) {
        if (this.titleTip != null) {
            this.removeChild(this.titleTip);
        }
        switch (type) {
            case 0:
                this.titleTip = new eui.Label();
                this.titleTip.fontFamily = "黑体";
                this.titleTip.bold = true;
                this.titleTip.stroke = 2;
                this.titleTip.top = 5;
                this.titleTip.size = 10;
                this.titleTip.text = "约会中";
                this.titleTip.textColor = 0xffca27;
                this.titleTip.strokeColor = 0x5e2e04;
                this.titleTip.horizontalCenter = 0;
                break;
            case 1:
                this.titleTip = new eui.Image("resource/res/ui/rank/rk_item_rob_icon.png");
                break;
        }
        this.addChild(this.titleTip);
    }
}