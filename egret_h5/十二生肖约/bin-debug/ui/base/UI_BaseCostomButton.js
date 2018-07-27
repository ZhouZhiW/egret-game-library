var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_BaseCostomButton = (function (_super) {
    __extends(UI_BaseCostomButton, _super);
    function UI_BaseCostomButton() {
        return _super.call(this) || this;
    }
    UI_BaseCostomButton.prototype.onCreate = function () {
    };
    UI_BaseCostomButton.prototype.onDestroy = function () {
    };
    UI_BaseCostomButton.prototype.setBtnSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    UI_BaseCostomButton.prototype.setTextSize = function (size) {
        this.btnText.size = size;
    };
    UI_BaseCostomButton.prototype.setIconSize = function (size) {
        if (this.btnIcon == null) {
            return;
        }
        this.btnIcon.width = size;
        this.btnIcon.height = size;
    };
    /**
     * styleIndex: 0 绿色纯文字 1 黄色带图标
     */
    UI_BaseCostomButton.prototype.setStyle = function (styleIndex) {
        switch (styleIndex) {
            case 0:
                this.skinName = "resource/skins/ui/base/UI_CustomButtonDefaultSkin.exml";
                break;
            case 1:
                this.skinName = "resource/skins/ui/base/UI_CustomButtonIconSkin.exml";
                break;
            case 2:
                this.skinName = "resource/skins/ui/base/UI_CustomSmallButtonSkin.exml";
                break;
        }
    };
    UI_BaseCostomButton.prototype.setText = function (text) {
        this.btnText.text = text;
    };
    /**
     * iconIndex: 0 钻石  1 宝石精华  2 底座碎片
     */
    UI_BaseCostomButton.prototype.setIcon = function (iconIndex) {
        if (this.btnIcon == null) {
            return;
        }
        switch (iconIndex) {
            case 0:
                this.btnIcon.source = "resource/res/assicon/assicon_diamond.png";
                break;
            case 1:
                this.btnIcon.source = "resource/res/assicon/assicon_ess.png";
                break;
            case 2:
                this.btnIcon.source = "resource/res/assicon/assicon_frg.png";
                break;
            case 3:
                this.btnIcon.source = "esource/res/assicon/assicon_gold.png";
        }
    };
    UI_BaseCostomButton.prototype.setValue = function (value) {
        if (this.btnValue == null) {
            return;
        }
        this.btnValue.text = EasyNumber.easyNum(value);
    };
    return UI_BaseCostomButton;
}(eui.Button));
__reflect(UI_BaseCostomButton.prototype, "UI_BaseCostomButton");
//# sourceMappingURL=UI_BaseCostomButton.js.map