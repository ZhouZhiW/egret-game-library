class MallsDialog extends NTextDialog {
    constructor(isNullBtn: boolean = false) {
        super();
    }

    public show() {
        const text: string = "   亲，不要让金币不足影响您前进的步伐，快去商城购买金币吧";
        this.setContent(text);
        this.addButton("取消", true, this.closeDialog, this);
        this.addButton("去商城", true, this.click, this);
        super.show();
    }

    private click(dialog: NTextDialog) {
        UILayer.inst.home.showTab(5);
        dialog.close();
        // 去商城
    }
    private closeDialog(dialog: NTextDialog) {
        dialog.close();
    }

}