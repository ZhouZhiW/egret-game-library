var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomDialog = (function (_super) {
    __extends(CustomDialog, _super);
    function CustomDialog(horizontalCenter, verticalCenter) {
        if (horizontalCenter === void 0) { horizontalCenter = false; }
        if (verticalCenter === void 0) { verticalCenter = false; }
        var _this = _super.call(this) || this;
        _this.baseDialog = new CustomBaseDialog(_this.style);
        if (horizontalCenter) {
            _this.horizontalCenter = 0;
        }
        if (verticalCenter) {
            _this.verticalCenter = 0;
        }
        _this.baseDialog.setCompoent(_this);
        return _this;
    }
    CustomDialog.prototype.onCreate = function () {
    };
    CustomDialog.prototype.onDestroy = function () {
    };
    CustomDialog.prototype.show = function () {
        this.baseDialog.show();
    };
    CustomDialog.prototype.close = function () {
        this.baseDialog.close();
    };
    CustomDialog.prototype.addButton = function (name, clickable, callback, self) {
        if (clickable === void 0) { clickable = true; }
        if (callback === void 0) { callback = null; }
        if (self === void 0) { self = null; }
        return this.baseDialog.addButton(name, clickable, callback, self);
    };
    CustomDialog.prototype.addIconButton = function (name, value, iconpath, clickable, callback, self) {
        if (clickable === void 0) { clickable = true; }
        if (callback === void 0) { callback = null; }
        if (self === void 0) { self = null; }
        return this.baseDialog.addIconButton(name, value, iconpath, clickable, callback, self);
    };
    Object.defineProperty(CustomDialog.prototype, "style", {
        get: function () {
            // 对话框类型 必须实现
            // 0:可设置按钮的小对话框
            // 1：可设置按钮的大对话框
            // 2: 无按钮的宽对话框
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomDialog.prototype, "skinPath", {
        get: function () {
            // 自定义对话框 皮肤
            // 自定义尺寸必须遵照下列尺寸
            // 0   330 * 160
            // 1   330 * 368
            // 2   455 * 280
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return CustomDialog;
}(BaseComponent));
__reflect(CustomDialog.prototype, "CustomDialog");
var CustomBaseDialog = (function (_super) {
    __extends(CustomBaseDialog, _super);
    function CustomBaseDialog(style) {
        if (style === void 0) { style = 0; }
        var _this = _super.call(this) || this;
        _this.style = style;
        _this.btnObjs = [];
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        switch (style) {
            case 0:
                _this.skinName = "resource/skins/dialog/CustomBaseDialogASkin.exml";
                break;
            case 1:
                _this.skinName = "resource/skins/dialog/CustomBaseDialogALSkin.exml";
                break;
            case 2:
                _this.skinName = "resource/skins/dialog/CustomBaseDialogBSkin.exml";
                break;
        }
        return _this;
    }
    CustomBaseDialog.prototype.onCreate = function () {
        this.setButton();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    CustomBaseDialog.prototype.onDestroy = function () {
        this.removeButton();
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    CustomBaseDialog.prototype.setCompoent = function (compoent) {
        if (compoent != null) {
            this.customGroup.addChild(compoent);
        }
    };
    CustomBaseDialog.prototype.addButton = function (name, clickable, callback, self) {
        if (clickable === void 0) { clickable = true; }
        if (callback === void 0) { callback = null; }
        if (self === void 0) { self = null; }
        if (this.style > 1) {
            console.error("Dialog addBtn style Error!");
            return null;
        }
        if (this.btnObjs.length >= 3) {
            console.error("Dialog addBtn Nums Error!");
            return null;
        }
        var obj = null;
        if (callback == null || self == null) {
            obj = this.getButtonObj(name, clickable, this.close, this);
        }
        else {
            obj = this.getButtonObj(name, clickable, callback, self);
        }
        this.btnObjs.push(obj);
        return obj.btn;
    };
    CustomBaseDialog.prototype.addIconButton = function (name, value, iconpath, clickable, callback, self) {
        if (clickable === void 0) { clickable = true; }
        if (callback === void 0) { callback = null; }
        if (self === void 0) { self = null; }
        if (this.style > 1) {
            console.error("Dialog addBtn style Error!");
            return null;
        }
        if (this.btnObjs.length >= 3) {
            console.error("Dialog addBtn Nums Error!");
            return null;
        }
        var obj = null;
        if (callback == null || self == null) {
            obj = this.getIconButtonObj(name, value, iconpath, clickable, this.close, this);
        }
        else {
            obj = this.getIconButtonObj(name, value, iconpath, clickable, callback, self);
        }
        this.btnObjs.push(obj);
        return obj.btn;
    };
    CustomBaseDialog.prototype.setButton = function () {
        if (this.style > 1) {
            return;
        }
        if (this.btnObjs.length == 0) {
            this.addButton("确定");
        }
        for (var i = 0; i < this.btnObjs.length; i++) {
            this.btnObjs[i].btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            this.btnGroup.addChild(this.btnObjs[i].btn);
        }
        var layout = new eui.HorizontalLayout();
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
    };
    CustomBaseDialog.prototype.removeButton = function () {
        for (var i = 0; i < this.btnObjs.length; i++) {
            this.btnObjs[i].btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
    };
    CustomBaseDialog.prototype.clickBtn = function (e) {
        var tag = e.currentTarget;
        var index = this.btnGroup.getChildIndex(tag);
        if (index > -1) {
            this.btnObjs[index].callback.call(this.btnObjs[index].self, this);
        }
        else {
            this.close();
        }
    };
    CustomBaseDialog.prototype.show = function () {
        DialogLayer.inst.showDialog(this);
    };
    CustomBaseDialog.prototype.close = function () {
        DialogLayer.inst.closeDialog(this);
    };
    CustomBaseDialog.prototype.getButtonObj = function (name, clickable, callback, self) {
        var btn = new UI_BaseCostomButton();
        btn.setStyle(0);
        btn.setText(name);
        btn.setTextSize(22);
        btn.setBtnSize(107, 56);
        btn.enabled = clickable;
        return { btn: btn, callback: callback, self: self };
    };
    CustomBaseDialog.prototype.getIconButtonObj = function (name, value, iconpath, clickable, callback, self) {
        if (iconpath === void 0) { iconpath = null; }
        if (clickable === void 0) { clickable = true; }
        if (callback === void 0) { callback = null; }
        if (self === void 0) { self = null; }
        this.dialogBackGround.height = 293;
        name, value, iconpath;
        var iconBtn = new UI_BaseCostomButton();
        iconBtn.setStyle(1);
        iconBtn.setText(name);
        iconBtn.setTextSize(22);
        iconBtn.setBtnSize(125, 74);
        iconBtn.setValue(value);
        iconBtn.setIcon(iconpath);
        iconBtn.enabled = clickable;
        return { btn: iconBtn, callback: callback, self: self };
    };
    CustomBaseDialog.prototype.getGreenBtnSkin = function () {
        return "resource/skins/dialog/DialogGreenBtnSkin.exml";
    };
    return CustomBaseDialog;
}(BaseComponent));
__reflect(CustomBaseDialog.prototype, "CustomBaseDialog");
//# sourceMappingURL=CustomDialog.js.map