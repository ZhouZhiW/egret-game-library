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
var RankScene = (function (_super) {
    __extends(RankScene, _super);
    function RankScene(gamescene) {
        var _this = _super.call(this) || this;
        _this.btnarr_0 = new Array("paihangbtn_0", "paihangbtn_2", "paihangbtn_4");
        _this.btnarr_1 = new Array("paihangbtn_1", "paihangbtn_3", "paihangbtn_5");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gamescene = gamescene;
        return _this;
    }
    RankScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.paihangimgSheet = RES.getRes("paihangimg_json");
        this.paihangstage = 0;
        this.btn_id = 0;
        this.createScene();
    };
    RankScene.prototype.createScene = function () {
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;
        var friendtop = new egret.Bitmap();
        friendtop.texture = this.gameimgSheet.getTexture("titletop");
        friendtop.x = 0;
        friendtop.y = 50;
        this.addChild(friendtop);
        var titlefriend = new egret.Bitmap();
        titlefriend.texture = this.gameimgSheet.getTexture("paihangtop");
        titlefriend.x = (GameUtils.SCREEN_W - titlefriend.texture.textureWidth) / 2;
        titlefriend.y = 60;
        this.addChild(titlefriend);
        this.btnlayer = new egret.Sprite();
        this.addChild(this.btnlayer);
        this.drawMenu();
        var titlebottom = new egret.Bitmap();
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
    };
    RankScene.prototype.clearList = function () {
        if (this.listlayer) {
            this.listlayer.removeChildren();
        }
    };
    RankScene.prototype.drawList = function () {
        var list = new RankList(this, this.paihangstage);
        this.listlayer.addChild(list);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(list);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 100 - 190;
        myscrollView.x = 0;
        myscrollView.y = 185;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listlayer.addChild(myscrollView);
    };
    RankScene.prototype.drawMenu = function () {
        var start_x = (GameUtils.SCREEN_W - 166 * 3) / 2;
        for (var i = 0; i < 3; i++) {
            var menuBtn = new egret.Bitmap();
            menuBtn.texture = this.paihangimgSheet.getTexture(this.paihangstage == i ? this.btnarr_0[i] : this.btnarr_1[i]);
            menuBtn.name = "" + i;
            menuBtn.x = start_x + 166 * i;
            menuBtn.y = 110;
            this.btnlayer.addChild(menuBtn);
            menuBtn.touchEnabled = true;
            menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuBtn, this);
        }
    };
    RankScene.prototype.menuBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            this.btn_id = parseInt(btn.name);
            if (this.btn_id != this.paihangstage) {
                if (this.btn_id == 0) {
                    NetWorkUtils.sendSimpleNetPostRequest(107, this.getPaiHangMeili, this.onPostIOError, this, this);
                }
                else {
                    var sendhaoganobj = { cmd: 108, player_token: GameUtils.playerToken, npc_id: this.btn_id, return_json: 1 };
                    NetWorkUtils.sendNetPostRequest(sendhaoganobj, this.getPaiHangHaoGan, this.onPostIOError, this, this);
                }
            }
        }
    };
    RankScene.prototype.getPaiHangMeili = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_107.k", event);
        GameUtils.rankOtherList = new Array();
        if (obj.rank) {
            if (obj.rank.length > 0) {
                for (var i = 0; i < obj.rank.length; i++) {
                    GameUtils.rankOtherList.push(new RankBean(obj.rank[i].ranking, obj.rank[i].player_id, obj.rank[i].name, obj.rank[i].avatar, obj.rank[i].meilizhi));
                }
            }
        }
        GameUtils.rankSelfList = new Array();
        if (obj.self) {
            if (obj.self.length > 0) {
                for (var i = 0; i < obj.self.length; i++) {
                    GameUtils.rankSelfList.push(new RankBean(obj.self[i].ranking, obj.self[i].player_id, obj.self[i].name, obj.self[i].avatar, obj.self[i].meilizhi));
                }
            }
        }
        this.paihangstage = this.btn_id;
        this.clearMenu();
        this.drawMenu();
        this.clearList();
        this.drawList();
    };
    RankScene.prototype.getPaiHangHaoGan = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_108.k", event);
        GameUtils.rankOtherList = new Array();
        if (obj.rank) {
            if (obj.rank.length > 0) {
                for (var i = 0; i < obj.rank.length; i++) {
                    GameUtils.rankOtherList.push(new RankBean(obj.rank[i].ranking, obj.rank[i].player_id, obj.rank[i].name, obj.rank[i].avatar, obj.rank[i].haogandu));
                }
            }
        }
        GameUtils.rankSelfList = new Array();
        if (obj.self) {
            if (obj.self.length > 0) {
                for (var i = 0; i < obj.self.length; i++) {
                    GameUtils.rankSelfList.push(new RankBean(obj.self[i].ranking, obj.self[i].player_id, obj.self[i].name, obj.self[i].avatar, obj.self[i].haogandu));
                }
            }
        }
        this.paihangstage = this.btn_id;
        this.clearMenu();
        this.drawMenu();
        this.clearList();
        this.drawList();
    };
    RankScene.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    RankScene.prototype.clearMenu = function () {
        if (this.btnlayer) {
            this.btnlayer.removeChildren();
        }
    };
    RankScene.prototype.closeAll = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    };
    RankScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    return RankScene;
}(egret.DisplayObjectContainer));
__reflect(RankScene.prototype, "RankScene");
//# sourceMappingURL=RankScene.js.map