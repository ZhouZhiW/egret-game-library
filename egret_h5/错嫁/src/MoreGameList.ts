/**
 *
 * @author 
 *
 */
class MoreGameList extends egret.DisplayObjectContainer {
    private coverimgSheet: egret.SpriteSheet;
    private start_y: number;
    public constructor() {
        super();
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.init();
    }
    private init() {
        var all_H = GameUtils.SCREEN_H - 130;
        if (all_H > GameUtils.moregame_list.length * 85) {
            this.start_y = (all_H - GameUtils.moregame_list.length * 85) / 2;
        } else {
            this.start_y = 0;
        }

        for (var i: number = 0; i < GameUtils.moregame_list.length; i++) {
            var morebg1: egret.Bitmap = new egret.Bitmap();
            morebg1.texture = this.coverimgSheet.getTexture("morebg1");
            morebg1.name = "" + i;
            morebg1.x = 25;
            morebg1.y = this.start_y + 85 * i;
            this.addChild(morebg1);
            var bgrect1: egret.Rectangle = new egret.Rectangle(12, 12, 12, 12);
            morebg1.scale9Grid = bgrect1;
            morebg1.width = GameUtils.SCREEN_W - 25 * 2;
            morebg1.height = 80;
            morebg1.touchEnabled = true;
            morebg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoOtherGame, this);


            if (GameUtils.moregame_list[i].more_state == 3) {
                var icon: egret.Bitmap = new egret.Bitmap();
                icon.texture = this.coverimgSheet.getTexture("moreicon0");
                icon.x = 29;
                icon.y = this.start_y + 85 * i + 4;
                this.addChild(icon);
            } else {
                if (GameUtils.moregame_list[i].more_icon) {
                    var imgLoader: NetImageLoader = new NetImageLoader();
                    imgLoader.imgid = i;
                    imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                    imgLoader.load(GameUtils.moregame_list[i].more_icon);
                } else {
                    var icon: egret.Bitmap = new egret.Bitmap();
                    icon.texture = this.coverimgSheet.getTexture("moreicon0");
                    icon.x = 29;
                    icon.y = this.start_y + 85 * i + 4;
                    this.addChild(icon);
                }
            }
            var morename: egret.TextField = new egret.TextField();
            morename.x = 107;
            morename.y = this.start_y + 85 * i;
            morename.height = 80;
            morename.width = GameUtils.SCREEN_W - 112 - 28;
            morename.textColor = 0xffffff;
            morename.lineSpacing = 4;
            morename.size = GameUtils.TEXT_SIZE_MIDDLE;
            morename.textFlow = <Array<egret.ITextElement>>[
                { text: GameUtils.moregame_list[i].more_name, style: { "textColor": 0xFFFF00, "size": 28 } },
                { text: GameUtils.moregame_list[i].more_description, style: { "textColor": 0xffffff, "size": 24 } }
            ];
            morename.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(morename);
        }
    }
    private gotoOtherGame(evt: egret.TouchEvent) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn: egret.Bitmap = evt.currentTarget;
        if (btn) {
            var id: number = parseInt(btn.name);
            if (GameUtils.moregame_list[id].more_state != 3) {
                if (GameUtils.moregame_list[id].more_url) {
                    window.location.href = GameUtils.moregame_list[id].more_url + GameUtils.tongji_url;
                }
            }
        }

    }
    private imgLoadHandler(evt: egret.Event): void {
        var loader: NetImageLoader = evt.currentTarget;
        if (loader) {
            var spacing_H: number = 0;
            if (loader.imgid < GameUtils.rankOtherList.length) {
                spacing_H = 0;
            } else {
                spacing_H = 30;
            }
            var bmd: egret.BitmapData = loader.data;
            var texture: egret.Texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp: egret.Bitmap = new egret.Bitmap(texture);
            bmp.x = 29;
            bmp.y = this.start_y + 4 + 85 * loader.imgid;
            bmp.width = 72;
            bmp.height = 72;
            this.addChild(bmp);

            if (GameUtils.moregame_list[loader.imgid].more_state == 1 || GameUtils.moregame_list[loader.imgid].more_state == 2) {
                var iconname: string = GameUtils.moregame_list[loader.imgid].more_state == 1 ? "moreicon1" : "moreicon2";
                var moreicon: egret.Bitmap = new egret.Bitmap();
                moreicon.texture = this.coverimgSheet.getTexture(iconname);
                moreicon.x = 25;
                moreicon.y = this.start_y + 85 * loader.imgid;
                this.addChild(moreicon);
            }

        }
    }
}
