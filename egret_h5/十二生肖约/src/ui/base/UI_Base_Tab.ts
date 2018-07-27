class UI_Base_Tab extends BaseComponent {
    protected tabCloseBtn: eui.Button;
    constructor() {
        super();
    }

    public onCreate() {
        this.tabCloseBtn.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    public onDestroy() {

    }


    private close() {
        UILayer.inst.home.closeTab();
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

}
