var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var MoreGameList = (function (_super) {
    __extends(MoreGameList, _super);
    function MoreGameList() {
        var _this = _super.call(this) || this;
        _this.coverimgSheet = RES.getRes("coverimg_json");
        _this.init();
        return _this;
    }
    MoreGameList.prototype.init = function () {
        var all_H = GameUtils.SCREEN_H - 130;
        if (all_H > GameUtils.moregame_list.length * 85) {
            this.start_y = (all_H - GameUtils.moregame_list.length * 85) / 2;
        }
        else {
            this.start_y = 0;
        }
        for (var i = 0; i < GameUtils.moregame_list.length; i++) {
            var morebg1 = new egret.Bitmap();
            morebg1.texture = this.coverimgSheet.getTexture("morebg1");
            morebg1.name = "" + i;
            morebg1.x = 25;
            morebg1.y = this.start_y + 85 * i;
            this.addChild(morebg1);
            var bgrect1 = new egret.Rectangle(12, 12, 12, 12);
            morebg1.scale9Grid = bgrect1;
            morebg1.width = GameUtils.SCREEN_W - 25 * 2;
            morebg1.height = 80;
            morebg1.touchEnabled = true;
            morebg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoOtherGame, this);
            if (GameUtils.moregame_list[i].more_state == 3) {
                var icon = new egret.Bitmap();
                icon.texture = this.coverimgSheet.getTexture("moreicon0");
                icon.x = 29;
                icon.y = this.start_y + 85 * i + 4;
                this.addChild(icon);
            }
            else {
                if (GameUtils.moregame_list[i].more_icon) {
                    var imgLoader = new NetImageLoader();
                    imgLoader.imgid = i;
                    imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                    imgLoader.load(GameUtils.moregame_list[i].more_icon);
                }
                else {
                    var icon = new egret.Bitmap();
                    icon.texture = this.coverimgSheet.getTexture("moreicon0");
                    icon.x = 29;
                    icon.y = this.start_y + 85 * i + 4;
                    this.addChild(icon);
                }
            }
            var morename = new egret.TextField();
            morename.x = 107;
            morename.y = this.start_y + 85 * i;
            morename.height = 80;
            morename.width = GameUtils.SCREEN_W - 112 - 28;
            morename.textColor = 0xffffff;
            morename.lineSpacing = 4;
            morename.size = GameUtils.TEXT_SIZE_MIDDLE;
            morename.textFlow = [
                { text: GameUtils.moregame_list[i].more_name, style: { "textColor": 0xFFFF00, "size": 28 } },
                { text: GameUtils.moregame_list[i].more_description, style: { "textColor": 0xffffff, "size": 24 } }
            ];
            morename.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(morename);
        }
    };
    MoreGameList.prototype.gotoOtherGame = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var id = parseInt(btn.name);
            if (GameUtils.moregame_list[id].more_state != 3) {
                if (GameUtils.moregame_list[id].more_url) {
                    window.location.href = GameUtils.moregame_list[id].more_url + GameUtils.tongji_url;
                }
            }
        }
    };
    MoreGameList.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        if (loader) {
            var spacing_H = 0;
            if (loader.imgid < GameUtils.rankOtherList.length) {
                spacing_H = 0;
            }
            else {
                spacing_H = 30;
            }
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.x = 29;
            bmp.y = this.start_y + 4 + 85 * loader.imgid;
            bmp.width = 72;
            bmp.height = 72;
            this.addChild(bmp);
            if (GameUtils.moregame_list[loader.imgid].more_state == 1 || GameUtils.moregame_list[loader.imgid].more_state == 2) {
                var iconname = GameUtils.moregame_list[loader.imgid].more_state == 1 ? "moreicon1" : "moreicon2";
                var moreicon = new egret.Bitmap();
                moreicon.texture = this.coverimgSheet.getTexture(iconname);
                moreicon.x = 25;
                moreicon.y = this.start_y + 85 * loader.imgid;
                this.addChild(moreicon);
            }
        }
    };
    return MoreGameList;
}(egret.DisplayObjectContainer));
__reflect(MoreGameList.prototype, "MoreGameList");
//# sourceMappingURL=MoreGameList.js.map