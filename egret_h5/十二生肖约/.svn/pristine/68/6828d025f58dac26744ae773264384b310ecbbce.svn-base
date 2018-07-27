class PayDialog extends NTextDialog {
    private text: string;
    constructor(isNullBtn: boolean = false) {
        super();
    }

    public setTipDiamond(diamond: number): PayDialog {
        this.text = "消费“" + diamond + "”钻石即可轻松搞定，快去充值吧！";
        return this;
    }


    public show() {
        this.setContent(this.text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("去充值", true, this.click, this);
        super.show();
    }


    private closeDialog(dialog: NTextDialog) {
        dialog.close();
    }

    private click(dialog: NTextDialog) {
        dialog.close();
        UILayer.inst.home.showActivity(13);
        // 去充值
    }

}