/**
 *
 * @author 
 *
 */
class RankScene extends egret.DisplayObjectContainer {
    private gamescene: GameScene;
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private paihangimgSheet: egret.SpriteSheet;
    private closeallbtn: egret.Bitmap;
    private btnlayer: egret.Sprite;
    private paihangstage: number;
    private btn_id: number;
    private listlayer: egret.Sprite;
    private netloading: NetLoadingUI;
    private btnarr_0 = new Array("paihangbtn_0", "paihangbtn_2", "paihangbtn_4");
    private btnarr_1 = new Array("paihangbtn_1", "paihangbtn_3", "paihangbtn_5");
    public constructor(gamescene: GameScene) {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
        this.gamescene = gamescene;
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.paihangimgSheet = RES.getRes("paihangimg_json");
        this.paihangstage = 0;
        this.btn_id = 0;
        this.createScene();
    }
    private createScene() {
        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;
        var friendtop: egret.Bitmap = new egret.Bitmap();
        friendtop.texture = this.gameimgSheet.getTexture("titletop");
        friendtop.x = 0;
        friendtop.y = 50;
        this.addChild(friendtop);

        var titlefriend: egret.Bitmap = new egret.Bitmap();
        titlefriend.texture = this.gameimgSheet.getTexture("paihangtop");
        titlefriend.x = (GameUtils.SCREEN_W - titlefriend.texture.textureWidth) / 2;
        titlefriend.y = 60;
        this.addChild(titlefriend);

        this.btnlayer = new egret.Sprite();
        this.addChild(this.btnlayer);
        this.drawMenu();


        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.addChild(titlebottom);

        this.closeallbtn = new egret.Bitmap();
        this.closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        this.closeallbtn.x = GameUtils.SCREEN_W - this.closeallbtn.texture.textureWidth - 5;
        this.closeallbtn.y = 50;
        this.addChild(this.closeallbtn);
        this.closeallbtn.touchEnabled = true;
        this.closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);

        this.listlayer = new egret.Sprite();
        this.addChild(this.listlayer);

        this.drawList();
    }
    private clearList() {
        if (this.listlayer) {
            this.listlayer.removeChildren();
        }
    }
    private drawList(): void {
        var list = new RankList(this, this.paihangstage);
        this.listlayer.addChild(list);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(list);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 100 - 190;
        myscrollView.x = 0;
        myscrollView.y = 185;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listlayer.addChild(myscrollView);
    }
    private drawMenu() {
        var start_x = (GameUtils.SCREEN_W - 166 * 3) / 2;
        for (var i: number = 0; i < 3; i++) {
            var menuBtn = new egret.Bitmap();
            menuBtn.texture = this.paihangimgSheet.getTexture(this.paihangstage == i ? this.btnarr_0[i] : this.btnarr_1[i]);
            menuBtn.name = "" + i;
            menuBtn.x = start_x + 166 * i;
            menuBtn.y = 110;
            this.btnlayer.addChild(menuBtn);
            menuBtn.touchEnabled = true;
            menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuBtn, this);
        }

    }
    private menuBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }

        var btn: egret.Bitmap = evt.currentTarget;
        if (btn) {
            this.btn_id = parseInt(btn.name);
            if (this.btn_id != this.paihangstage) {
                if (this.btn_id == 0) {
                    NetWorkUtils.sendSimpleNetPostRequest(107, this.getPaiHangMeili, this.onPostIOError, this, this);
                } else {
                    var sendhaoganobj = { cmd: 108, player_token: GameUtils.playerToken, npc_id: this.btn_id, return_json: 1 };
                    NetWorkUtils.sendNetPostRequest(sendhaoganobj, this.getPaiHangHaoGan, this.onPostIOError, this, this);
                }
            }
        }
    }
    private getPaiHangMeili(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_107.k", event);
        GameUtils.rankOtherList = new Array();
        if (obj.rank) {
            if (obj.rank.length > 0) {
                for (var i: number = 0; i < obj.rank.length; i++) {
                    GameUtils.rankOtherList.push(new RankBean(obj.rank[i].ranking, obj.rank[i].player_id, obj.rank[i].name, obj.rank[i].avatar, obj.rank[i].meilizhi));
                }
            }
        }
        GameUtils.rankSelfList = new Array();
        if (obj.self) {
            if (obj.self.length > 0) {
                for (var i: number = 0; i < obj.self.length; i++) {
                    GameUtils.rankSelfList.push(new RankBean(obj.self[i].ranking, obj.self[i].player_id, obj.self[i].name, obj.self[i].avatar, obj.self[i].meilizhi));
                }
            }
        }
        this.paihangstage = this.btn_id;
        this.clearMenu();
        this.drawMenu();
        this.clearList();
        this.drawList();
    }
    private getPaiHangHaoGan(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_108.k", event);
        GameUtils.rankOtherList = new Array();
        if (obj.rank) {
            if (obj.rank.length > 0) {
                for (var i: number = 0; i < obj.rank.length; i++) {
                    GameUtils.rankOtherList.push(new RankBean(obj.rank[i].ranking, obj.rank[i].player_id, obj.rank[i].name, obj.rank[i].avatar, obj.rank[i].haogandu));
                }
            }
        }
        GameUtils.rankSelfList = new Array();
        if (obj.self) {
            if (obj.self.length > 0) {
                for (var i: number = 0; i < obj.self.length; i++) {
                    GameUtils.rankSelfList.push(new RankBean(obj.self[i].ranking, obj.self[i].player_id, obj.self[i].name, obj.self[i].avatar, obj.self[i].haogandu));
                }
            }
        }

        this.paihangstage = this.btn_id;
        this.clearMenu();
        this.drawMenu();
        this.clearList();
        this.drawList();
    }
    private onPostIOError(event: egret.IOErrorEvent): void {
        NetWorkUtils.clearNetLoading();
    }
    private clearMenu() {
        if (this.btnlayer) {
            this.btnlayer.removeChildren();
        }
    }
    private closeAll(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    }
    public closeScene(): void {
        this.removeChildren();
    }
}
