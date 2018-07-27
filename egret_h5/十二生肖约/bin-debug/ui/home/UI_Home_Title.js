var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_Title = (function (_super) {
    __extends(UI_Home_Title, _super);
    function UI_Home_Title() {
        return _super.call(this) || this;
    }
    UI_Home_Title.prototype.onCreate = function () {
        this.homeTitlePass = [];
        this.homeTitlePass.push(this.homeTitlePass0);
        this.homeTitlePass.push(this.homeTitlePass1);
        this.homeTitlePass.push(this.homeTitlePass2);
        this.homeTitlePass.push(this.homeTitlePass3);
        this.homeTitlePass.push(this.homeTitlePass4);
        DataManager.inst.userInfo.addDataListener(this.refreshUserInfo, this);
        DataManager.inst.gameLevel.addDataListener(this.refreshChapter, this);
    };
    UI_Home_Title.prototype.onDestroy = function () {
        DataManager.inst.userInfo.removeDataListener(this.refreshUserInfo, this);
        DataManager.inst.gameLevel.removeDataListener(this.refreshChapter, this);
    };
    UI_Home_Title.prototype.setPass = function (level, maxLevel) {
        if (maxLevel == null || maxLevel < level) {
            maxLevel = level;
        }
        var n = level % 5;
        n = (n == 0) ? 5 : n;
        var first = level - n + 1;
        for (var i = first; i < first + 5; i++) {
            var type = 0;
            if (i == level) {
                type = UI_Home_TitlePassType.CURRENTATT;
            }
            else if (i <= maxLevel) {
                type = UI_Home_TitlePassType.COMPLETED;
            }
            else {
                type = UI_Home_TitlePassType.LOCK;
            }
            var m = i % 5;
            m = (m == 0) ? 5 - 1 : m - 1;
            this.homeTitlePass[m].setInfo(type, i);
        }
    };
    UI_Home_Title.prototype.refreshUserInfo = function (e) {
        var data = e.data;
        this.userAvatar.setAvatar(data.avatar);
        this.homeTitleUserTx.text = data.userName; //设置用户名
    };
    UI_Home_Title.prototype.refreshChapter = function (e) {
        var data = e.data;
        this.setPass(data.chapterIndex, data.maxChapter); //设置关卡
    };
    Object.defineProperty(UI_Home_Title.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_TitleSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Home_Title;
}(BaseComponent));
__reflect(UI_Home_Title.prototype, "UI_Home_Title");
//# sourceMappingURL=UI_Home_Title.js.map