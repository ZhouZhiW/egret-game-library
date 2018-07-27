var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_TitlePassType;
(function (UI_Home_TitlePassType) {
    UI_Home_TitlePassType[UI_Home_TitlePassType["LOCK"] = 0] = "LOCK";
    UI_Home_TitlePassType[UI_Home_TitlePassType["COMPLETED"] = 1] = "COMPLETED";
    UI_Home_TitlePassType[UI_Home_TitlePassType["CURRENTATT"] = 2] = "CURRENTATT";
})(UI_Home_TitlePassType || (UI_Home_TitlePassType = {}));
;
var UI_Home_TitlePass = (function (_super) {
    __extends(UI_Home_TitlePass, _super);
    function UI_Home_TitlePass() {
        return _super.call(this) || this;
    }
    UI_Home_TitlePass.prototype.onCreate = function () {
    };
    UI_Home_TitlePass.prototype.onDestroy = function () {
    };
    UI_Home_TitlePass.prototype.setInfo = function (type, level) {
        var path;
        var txColor = 0;
        var tx;
        switch (type) {
            case UI_Home_TitlePassType.COMPLETED:
                path = "resource/res/ui/home/home_title_pass_completed.png";
                // txColor = 0x138a9f;
                tx = "" + level;
                break;
            case UI_Home_TitlePassType.CURRENTATT:
                path = "resource/res/ui/home/home_title_pass_current.png";
                // txColor = 0x59770a;
                tx = "" + level;
                break;
            case UI_Home_TitlePassType.LOCK:
            default:
                path = "resource/res/ui/home/home_title_pass_lock.png";
                tx = "";
                break;
        }
        this.homeTitlePassBg.source = path;
        // this.homeTitlePassLevel.strokeColor = txColor;
        this.homeTitlePassLevel.text = tx;
    };
    return UI_Home_TitlePass;
}(BaseComponent));
__reflect(UI_Home_TitlePass.prototype, "UI_Home_TitlePass");
//# sourceMappingURL=UI_Home_TitlePass.js.map