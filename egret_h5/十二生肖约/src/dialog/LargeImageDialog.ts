class LargeImageDialog extends CustomDialog {
    private image: eui.Image;
    private path: string;
    private scroller: eui.Scroller;

    constructor(imagePath: string) {
        super(false, true);
        this.image.source = imagePath;
        this.addButton("确定");
    }

    public onCreate() {

    }

    public onDestroy() {
    }

    public setScroller(flag: boolean) {
        this.scroller.scrollPolicyV = (flag ? eui.ScrollPolicy.ON : eui.ScrollPolicy.OFF);
    }

    protected get style(): number {
        return 1;
    }

    protected get skinPath(): String {
        return "resource/skins/dialog/CustomImageDialogSkin.exml";
    }
}

