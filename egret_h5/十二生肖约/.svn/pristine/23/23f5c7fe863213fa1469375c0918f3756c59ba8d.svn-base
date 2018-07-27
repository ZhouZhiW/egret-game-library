class UI_Up_Again_Dialog extends NTextDialog {
    private listener: { callback: Function, callbackThis: any, callbackObj: any };
    private text: string;
    private obj: any;
    constructor(isNullBtn: boolean = false) {
        super();
    }

    public setText(text: string): UI_Up_Again_Dialog {
        this.text = text;
        return this;
    }

    public show() {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("确定", true, this.click, this);
        super.show();
    }

    public setClickListener(listener: Function, self: any, obj: any = null): UI_Up_Again_Dialog {
        this.listener = { callback: listener, callbackThis: self, callbackObj: obj };
        return this;
    }

    private closeDialog(dialog: NTextDialog) {
        dialog.close();
    }

    private click(dialog: NTextDialog) {
        dialog.close();
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis, this.listener.callbackObj);
        }
    }
}