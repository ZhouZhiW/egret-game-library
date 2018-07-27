class DialogLayer extends BaseLayer {
    private static ins: DialogLayer;
    private bgImg: eui.Image;
    public static get inst(): DialogLayer {
        if (DialogLayer.ins == null) {
            DialogLayer.ins = new DialogLayer();
        }

        return this.ins;
    }
    public constructor() {
        super();
    }
    protected onCreate() {
        this.bgImg = new eui.Image();
        this.bgImg.visible = false;
        this.bgImg.source = "resource/res/base/base_black_bg.png"
        this.bgImg.alpha = 0.5;
        this.bgImg.width = this.width;
        this.bgImg.height = this.height;
        this.addChild(this.bgImg);
        super.onCreate();
    }

    protected onDestroy() {
        super.onDestroy();
    }



    public showDialog(dialog: CustomBaseDialog) {
        this.addChild(dialog);
        this.bgImg.visible = this.numChildren > 1;
    }

    public closeDialog(dialog: CustomBaseDialog) {
        if (this.getChildIndex(dialog) >= 0) {
            this.removeChild(dialog);
        } else {
            console.error(dialog.name + "is close!");
        }
        this.bgImg.visible = this.numChildren > 1;
    }
}