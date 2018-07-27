class DiamondDialog extends NTextDialog {
    private listener: { callback: Function, callbackThis: any };
    private text: string;
    private obj: any;
    constructor(isNullBtn: boolean = false) {
        super();
    }

    public setDiamond(diamond: number): DiamondDialog {
        this.text = "确定消耗“" + diamond + "”完成此次操作吗";
        return this;
    }
    public setDiamondInfo(info: string): DiamondDialog {
        this.text = info;
        return this;
    }

    public show() {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("确定", true, this.click, this);
        super.show();
    }


    public setClickListener(listener: Function, self: any): DiamondDialog {
        this.listener = { callback: listener, callbackThis: self };
        return this;
    }

    private click(dialog: NTextDialog) {
        dialog.close();
        if (this.listener != null) {
            this.listener.callback.call(this.listener.callbackThis, dialog);
        }
    }

    private closeDialog(dialog: NTextDialog) {
        dialog.close();
    }

}