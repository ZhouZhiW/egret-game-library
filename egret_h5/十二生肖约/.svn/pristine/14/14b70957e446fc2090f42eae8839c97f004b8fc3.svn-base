var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_AssistorAvatar = (function (_super) {
    __extends(UI_Rank_AssistorAvatar, _super);
    function UI_Rank_AssistorAvatar() {
        return _super.call(this) || this;
    }
    UI_Rank_AssistorAvatar.prototype.setTitle = function (type) {
        if (this.titleTip != null) {
            this.removeChild(this.titleTip);
        }
        switch (type) {
            case 0:
                this.titleTip = new eui.Label();
                this.titleTip.fontFamily = "黑体";
                this.titleTip.bold = true;
                this.titleTip.stroke = 2;
                this.titleTip.top = 5;
                this.titleTip.size = 10;
                this.titleTip.text = "约会中";
                this.titleTip.textColor = 0xffca27;
                this.titleTip.strokeColor = 0x5e2e04;
                this.titleTip.horizontalCenter = 0;
                break;
            case 1:
                this.titleTip = new eui.Image("resource/res/ui/rank/rk_item_rob_icon.png");
                break;
        }
        this.addChild(this.titleTip);
    };
    return UI_Rank_AssistorAvatar;
}(UI_UserAvatar));
__reflect(UI_Rank_AssistorAvatar.prototype, "UI_Rank_AssistorAvatar");
//# sourceMappingURL=UI_Rank_AssistorAvatar.js.map