class NTextDialog extends CustomDialog {
    public title: eui.Label;
    public content: eui.Label;
    public warn: eui.Label;
    constructor() {
        super(true, true);//设置中心显示
    }

    public onCreate() {

    }

    public onDestroy() {

    }

    public setTitle(value: string): NTextDialog {
        if (value != null) {
            this.title.text = value;
        }
        return this;
    }
    public setContent(value: string): NTextDialog {
        if (value != null) {
            this.content.text = value;
        }
        return this;
    }
    public setWarn(value: string): NTextDialog {
        if (value != null) {
            this.warn.text = value;
        }
        return this;
    }
 

    protected get style(): number {
        return 0;
    }

    protected get skinPath(): String {
        return "resource/skins/dialog/TextDialogSkin.exml";
    }
}

