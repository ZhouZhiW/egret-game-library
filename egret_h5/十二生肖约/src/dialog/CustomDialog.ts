class CustomDialog extends BaseComponent {
    private baseDialog: CustomBaseDialog;
    constructor(horizontalCenter = false, verticalCenter = false) {// 自定义区域是否在对话框中心。
        super();
        this.baseDialog = new CustomBaseDialog(this.style);
        if (horizontalCenter) {
            this.horizontalCenter = 0;
        }
        if (verticalCenter) {
            this.verticalCenter = 0;
        }
        this.baseDialog.setCompoent(this);

    }
    protected onCreate() {

    }

    protected onDestroy() {

    }

    public show() {
        this.baseDialog.show();
    }

    public close() {
        this.baseDialog.close();
    }

    public addButton(name: string, clickable: boolean = true, callback: Function = null, self: any = null): UI_BaseCostomButton {
        return this.baseDialog.addButton(name, clickable, callback, self);
    }

    public addIconButton(name: string, value: number, iconpath: number, clickable: boolean = true, callback: Function = null, self: any = null): UI_BaseCostomButton {
        return this.baseDialog.addIconButton(name, value, iconpath, clickable, callback, self);
    }

    protected get style(): number {
        // 对话框类型 必须实现
        // 0:可设置按钮的小对话框
        // 1：可设置按钮的大对话框
        // 2: 无按钮的宽对话框
        return 0;
    }
    protected get skinPath(): String {
        // 自定义对话框 皮肤
        // 自定义尺寸必须遵照下列尺寸
        // 0   330 * 160
        // 1   330 * 368
        // 2   455 * 280
        return null;
    }
}

class CustomBaseDialog extends BaseComponent {
    private style: number;
    private dialogBackGround: eui.Image;
    private customGroup: eui.Group;
    private closeBtn: eui.Button;
    private btnGroup: eui.Group;
    private btnObjs: Array<{ btn: any, callback: Function, self: any }>
    constructor(style: number = 0) {
        super();
        this.style = style;
        this.btnObjs = [];
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        switch (style) {
            case 0:
                this.skinName = "resource/skins/dialog/CustomBaseDialogASkin.exml";
                break;
            case 1:
                this.skinName = "resource/skins/dialog/CustomBaseDialogALSkin.exml";
                break;
            case 2:
                this.skinName = "resource/skins/dialog/CustomBaseDialogBSkin.exml";
                break;
        }
    }
    protected onCreate() {
        this.setButton();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    protected onDestroy() {
        this.removeButton();
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }
    public setCompoent(compoent: eui.Component) {
        if (compoent != null) {
            this.customGroup.addChild(compoent);
        }
    }
    public addButton(name: string, clickable: boolean = true, callback: Function = null, self: any = null): UI_BaseCostomButton {
        if (this.style > 1) {
            console.error("Dialog addBtn style Error!");
            return null;
        }
        if (this.btnObjs.length >= 3) {
            console.error("Dialog addBtn Nums Error!");
            return null;
        }
        let obj: { btn: UI_BaseCostomButton, callback: Function, self: any } = null;
        if (callback == null || self == null) {
            obj = this.getButtonObj(name, clickable, this.close, this);
        } else {
            obj = this.getButtonObj(name, clickable, callback, self);
        }
        this.btnObjs.push(obj);
        return obj.btn;
    }
    public addIconButton(name: string, value: number, iconpath: number, clickable: boolean = true, callback: Function = null, self: any = null): UI_BaseCostomButton {
        if (this.style > 1) {
            console.error("Dialog addBtn style Error!");
            return null;
        }
        if (this.btnObjs.length >= 3) {
            console.error("Dialog addBtn Nums Error!");
            return null;
        }
        let obj: { btn: UI_BaseCostomButton, callback: Function, self: any } = null;
        if (callback == null || self == null) {
            obj = this.getIconButtonObj(name, value, iconpath, clickable, this.close, this);
        } else {
            obj = this.getIconButtonObj(name, value, iconpath, clickable, callback, self);
        }
        this.btnObjs.push(obj);
        return obj.btn;
    }

    private setButton() {
        if (this.style > 1) {
            return;
        }
        if (this.btnObjs.length == 0) {
            this.addButton("确定");
        }
        for (let i = 0; i < this.btnObjs.length; i++) {
            this.btnObjs[i].btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            this.btnGroup.addChild(this.btnObjs[i].btn);
        }
        var layout: eui.HorizontalLayout = new eui.HorizontalLayout();
        switch (this.btnGroup.numChildren) {
            case 2:
                layout.gap = 50;
                break;
            case 3:
                layout.gap = 8;
                break;
        }
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.btnGroup.layout = layout;
    }
    private removeButton() {
        for (let i = 0; i < this.btnObjs.length; i++) {
            this.btnObjs[i].btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
    }

    private clickBtn(e: egret.TouchEvent) {
        const tag: eui.Button = e.currentTarget;
        const index = this.btnGroup.getChildIndex(tag);
        if (index > -1) {
            this.btnObjs[index].callback.call(this.btnObjs[index].self, this);
        } else {
            this.close();
        }
    }

    public show() {
        DialogLayer.inst.showDialog(this);
    }

    public close() {
        DialogLayer.inst.closeDialog(this);
    }

    private getButtonObj(name: string, clickable: boolean, callback: Function, self: any): { btn: UI_BaseCostomButton, callback: Function, self: any } {
        const btn = new UI_BaseCostomButton();
        btn.setStyle(0);
        btn.setText(name);
        btn.setTextSize(22);
        btn.setBtnSize(107, 56);
        btn.enabled = clickable;
        return { btn: btn, callback: callback, self: self };
    }

    private getIconButtonObj(name: string, value: number, iconpath: number = null, clickable: boolean = true, callback: Function = null, self: any = null) {
        this.dialogBackGround.height = 293;
        name, value, iconpath
        const iconBtn = new UI_BaseCostomButton();
        iconBtn.setStyle(1);
        iconBtn.setText(name);
        iconBtn.setTextSize(22);
        iconBtn.setBtnSize(125, 74);
        iconBtn.setValue(value);
        iconBtn.setIcon(iconpath);
        iconBtn.enabled = clickable;
        return { btn: iconBtn, callback: callback, self: self };
    }

    private getGreenBtnSkin(): string {
        return "resource/skins/dialog/DialogGreenBtnSkin.exml";
    }
}