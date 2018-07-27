var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_UserAvatar = (function (_super) {
    __extends(UI_UserAvatar, _super);
    function UI_UserAvatar() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_UserAvatar.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/base/UI_UserAvatarSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_UserAvatar.prototype.onCreate = function () {
        this.userAvatar.mask = this.userMask;
    };
    UI_UserAvatar.prototype.onDestroy = function () {
    };
    UI_UserAvatar.prototype.setAvatar = function (path) {
        // console.log("setAvatar: " + path);
        this.userAvatar.source = path;
    };
    return UI_UserAvatar;
}(BaseComponent));
__reflect(UI_UserAvatar.prototype, "UI_UserAvatar");
//# sourceMappingURL=UI_UserAvatar.js.map