/**
 *
 * @author 
 *
 */
class RankList extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private paihangimgSheet: egret.SpriteSheet;
    private paihangstage: number;
    private topStr = new Array(
        "top_0", "top_1", "top_2"
    );
    public constructor(thisObj: any, paihangstage: number) {
        super();
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.paihangimgSheet = RES.getRes("paihangimg_json");
        this.paihangstage = paihangstage;
        this.init();
    }
    private init() {
        var ranknum: number = GameUtils.rankOtherList.length;

        for (var i: number = 0; i < (GameUtils.rankOtherList.length + GameUtils.rankSelfList.length); i++) {
            var spacing_H: number = 0;
            if (i < GameUtils.rankOtherList.length) {
                spacing_H = 0;
            } else {
                spacing_H = 30;
            }

            var kuangname: string = "paihangkuang";
            if (i < GameUtils.rankOtherList.length) {
                kuangname = "paihangkuang";
                if (GameUtils.rankOtherList[i].meili_rank_player_id == GameUtils.playerBean.player_id) {
                    kuangname = "paihangkuang1";
                } else {
                    kuangname = "paihangkuang";
                }
            } else {
                if (GameUtils.rankSelfList[i - ranknum].meili_rank_player_id == GameUtils.playerBean.player_id) {
                    kuangname = "paihangkuang1";
                } else {
                    kuangname = "paihangkuang";
                }
            }
            var kuang: egret.Bitmap = new egret.Bitmap();
            kuang.texture = this.paihangimgSheet.getTexture(kuangname);
            kuang.x = 15;
            kuang.y = spacing_H + 95 * i;
            this.addChild(kuang);

            var touxiangkuang: egret.Bitmap = new egret.Bitmap();
            touxiangkuang.texture = this.gameimgSheet.getTexture("touxiangkuang");
            touxiangkuang.x = 17;
            touxiangkuang.y = spacing_H + 2 + 95 * i;
            this.addChild(touxiangkuang);

            if (i < GameUtils.rankOtherList.length) {
                if (GameUtils.rankOtherList[i].meili_rank_avatar) {
                    var imgLoader: NetImageLoader = new NetImageLoader();
                    imgLoader.imgid = i;
                    imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                    imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
                    imgLoader.load(GameUtils.rankOtherList[i].meili_rank_avatar);
                } else {
                    var tou0: egret.Bitmap = new egret.Bitmap();
                    tou0.texture = this.gameimgSheet.getTexture("tou0");
                    tou0.x = 24;
                    tou0.y = spacing_H + 9 + 95 * i;
                    this.addChild(tou0);
                }
            } else {
                if (GameUtils.rankSelfList[i - ranknum].meili_rank_avatar) {
                    var imgLoader: NetImageLoader = new NetImageLoader();
                    imgLoader.imgid = i;
                    imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                    imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
                    imgLoader.load(GameUtils.rankSelfList[i - ranknum].meili_rank_avatar);
                } else {
                    var tou0: egret.Bitmap = new egret.Bitmap();
                    tou0.texture = this.gameimgSheet.getTexture("tou0");
                    tou0.x = 24;
                    tou0.y = spacing_H + 9 + 95 * i;
                    this.addChild(tou0);
                }
            }

            var namestr: string = "";
            if (i < GameUtils.rankOtherList.length) {
                namestr = GameUtils.rankOtherList[i].meili_rank_name;
            } else {
                namestr = GameUtils.rankSelfList[i - ranknum].meili_rank_name;
            }
            var name: egret.TextField = new egret.TextField();
            name.x = 120;
            name.y = spacing_H + 95 * i;
            name.height = 40;
            name.textColor = 0x000000;
            name.size = GameUtils.TEXT_SIZE_SMALL;
            name.text = namestr;
            name.bold = true;
            this.addChild(name);
            name.verticalAlign = egret.VerticalAlign.MIDDLE;

            var paiming_num: number = 0;
            if (i < GameUtils.rankOtherList.length) {
                paiming_num = GameUtils.rankOtherList[i].meili_rank_ranking;
            } else {
                paiming_num = GameUtils.rankSelfList[i - ranknum].meili_rank_ranking;
            }
            if (i < 3) {
                var topicon: egret.Bitmap = new egret.Bitmap();
                topicon.texture = this.paihangimgSheet.getTexture(this.topStr[i]);
                topicon.x = 340 + 49;
                topicon.y = spacing_H + 95 * i + 5;
                this.addChild(topicon);
            } else {
                var paimingnum: egret.TextField = new egret.TextField();
                paimingnum.x = 340;
                paimingnum.y = spacing_H + 95 * i;
                paimingnum.textColor = 0xffffff;
                paimingnum.size = GameUtils.TEXT_SIZE_SMALL;
                paimingnum.text = "" + paiming_num;
                paimingnum.bold = true;
                paimingnum.width = 188;
                paimingnum.height = 40;
                this.addChild(paimingnum);
                paimingnum.textAlign = egret.HorizontalAlign.CENTER;
                paimingnum.verticalAlign = egret.VerticalAlign.MIDDLE;
            }

            var meili: egret.TextField = new egret.TextField();
            meili.x = 200;
            meili.y = spacing_H + 40 + 95 * i;
            meili.textColor = 0x8d5555;
            meili.size = GameUtils.TEXT_SIZE_SMALL;
            meili.text = this.paihangstage == 0 ? "魅力" : "好感度";
            meili.bold = true;
            meili.height = 50;
            this.addChild(meili);
            meili.verticalAlign = egret.VerticalAlign.MIDDLE;

            var meili_num: number = 0;
            if (i < GameUtils.rankOtherList.length) {
                meili_num = GameUtils.rankOtherList[i].meili_rank_meilizhi;
            } else {
                meili_num = GameUtils.rankSelfList[i - ranknum].meili_rank_meilizhi;
            }

            var meilinum: egret.TextField = new egret.TextField();
            meilinum.x = 300;
            meilinum.y = spacing_H + 40 + 95 * i;
            meilinum.textColor = 0x8d5555;
            meilinum.size = GameUtils.TEXT_SIZE_SMALL;
            meilinum.text = "" + meili_num;
            meilinum.bold = true;
            meilinum.height = 50;
            this.addChild(meilinum);
            meilinum.verticalAlign = egret.VerticalAlign.MIDDLE;
        }
    }
    private imgError(event: egret.IOErrorEvent): void {
        var loader: NetImageLoader = event.currentTarget;
        if (loader) {
            var spacing_H: number = 0;
            if (loader.imgid < GameUtils.rankOtherList.length) {
                spacing_H = 0;
            } else {
                spacing_H = 30;
            }
            var tou0: egret.Bitmap = new egret.Bitmap();
            tou0.texture = this.gameimgSheet.getTexture("tou0");
            tou0.x = 24;
            tou0.y = spacing_H + 9 + 95 * loader.imgid;
            this.addChild(tou0);
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
            bmp.x = 24;
            bmp.y = spacing_H + 9 + 95 * loader.imgid;
            bmp.width = 72;
            bmp.height = 72;
            this.addChild(bmp);
        }
    }
}
