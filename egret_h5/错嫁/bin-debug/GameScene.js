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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.effectstage = 0;
        _this.allGameObj = new Object();
        _this.backgroup = new Array();
        _this.vipBuyIndex = 0;
        _this.btnVipBuyArr = new Array();
        _this.GAMESTAGE_PAIHANG = 0;
        _this.GAMESTAGE_FRIEND = 1;
        _this.GAMESTAGE_MENU = 2;
        _this.GAMESTAGE_DIANWO = 3;
        _this.GAMESTAGE_SHOP = 4;
        _this.GAMESTAGE_JUQING = 5;
        _this.isWeekEnd = false;
        _this.isShowShortCutToast = false;
        _this.needLoadNum = 0;
        _this.mtaBuyBtnId = 0;
        _this.btnarr_0 = new Array("menu_1", "menu_3", "menu_5", "menu_7", "menu_9", "menu_11");
        _this.btnarr_1 = new Array("menu_0", "menu_2", "menu_4", "menu_6", "menu_8", "menu_10");
        _this.btnTishiNameArr = new Array("tishi_yaoqing", "tishi_shou", "tishi_guanzhu", "tishi_qiandao", "tishi_miansi", "tishi_share", "tishi_shop", "tishi_table", "tishi_libao", "tishi_nationalday", "tishi_meiyan", "tishi_qqbg", "tishi_weekend", "tishi_xingqubuluo", "tishi_qqcoin", "tishi_huodongshop", "tishi_vip", "iwan_enter_icon");
        _this.btnTishiPositionArr = new Array(476, 412, 348, 284, 220, 156, 92, 28);
        _this.bgtest = new Array("changlang", "chexiang", "ciangong", "dilao", "dixiagongdian", "dongkou", "fangjianbai", "fangjianye", "fanting", "guifang", "guifeigong", "changlangbai", "xiaofangjian", "ouyangfuyuanziye", "xiangfushufang", "guogongfuba", "guogongfuhuayuan", "guojiufu", "guzangge", "huanggong", "huanggongye", "huayuan", "hunfangbai", "hunfangye", "jiangjundating", "jiashan", "jiedao", "jiedufangjian", "lingtang", "muwu", "ouyangfuyuanzi", "ouyangfuye", "popofang", "riluo", "shufang", "shufeifangbai", "shufeifangye", "taizidating", "taizifubai", "tianlao", "xiangfubai", "xiangfudating", "xiangfuye", "xuanya", "xuehechibai", "xuehechihuo", "xuehechiye", "yewan", "yuanzi", "yuanziye", "yuhuayuan", "yushufang");
        _this.rolestest = new Array("baobiao", "fengpopo", "gonggong", "gongnv1", "gongnv2", "gufeihai", "guyulian", "guyuxiao1", "guyuxiao2", "guyuxiaoji", "guyuxiaojing", "guyuxiaonu", "guyuxiaoxiao", "guyuxiaoxiu", "guyuyao", "heiying", "heiying0", "helianchu0", "helianchu1", "helianchu2", "heliansheng", "huangdi", "huanghou", "huolao1", "huolao2", "laotou", "mingyue", "mushen1", "mushen2", "ouyangbuhuo", "shiwei", "xiaofei", "xieding", "xieguifei", "xieronger", "xumin", "yahuan1", "yahuan2", "yahuan3", "zhaohu", "zhaojiuyao", "zhaoqiaoyan", "zhaoshufei");
        _this.rolenameStr = new Array("顾雨筱", "？？？", "赫连楚", "风婆婆", "顾雨瑶", "赫连晟", "翠儿", "皇后", "赵淑妃", "宫女", "赵乔嫣", "赵九耀", "公公", "侍卫", "谢贵妃", "牢头", "皇帝", "顾飞海", "许敏", "顾雨廉", "木神", "丫环", "谢蓉儿", "丫环甲", "丫环乙", "丫环丙", "火老头", "欧阳夫人", "新纳小妾", "欧阳不惑", "保镖", "谢鼎", "赵虎", "逍妃娘娘", "逍妃", "西楚明月", "谢成");
        _this.rolenameImgStr = new Array("guyuxiao_name", "heiying_name", "helianchu_name", "fengpopo_name", "guyuyao_name", "heliansheng_name", "cuier_name", "huanghou_name", "zhaoshufei_name", "gongnv_name", "zhaoqiaoyan_name", "zhaojiuyao_name", "gonggong_name", "shiwei_name", "xieguifei_name", "laotou_name", "huangdi_name", "gufeihai_name", "xumin_name", "guyulian_name", "mushen_name", "yahuan_name", "xieronger_name", "yahuanjia_name", "yahuanyi_name", "yahuanbing_name", "huolaotou_name", "ouyangfuren_name", "xinnaxiaoqie_name", "ouyangbuhuo_name", "baobiao_name", "xieding_name", "zhaohu_name", "xiaofei_name", "xiaofei_name", "xichumingyue_name", "xiecheng_name");
        _this.effectStr = new Array("stop", "fenkai", "mohu", "zhendong", "hong", "huaban", "huohua", "liuxing", "love", "star", "xiyu", "yezi");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gamescene = _this;
        return _this;
    }
    GameScene.prototype.initstage = function (event) {
        this.loading = new LoadingUI();
        this.addChild(this.loading);
        GameUtils.loadingType = 0;
        //周末礼包时间判断
        var nowData = new Date();
        if (nowData.getDay() == 0 || nowData.getDay() == 6) {
            this.isWeekEnd = true;
        }
        else {
            this.isWeekEnd = false;
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.oninitComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        if (GameUtils.playerBean.player_die == 0) {
            this.scencindex = GameUtils.playerBean.player_current_in;
        }
        else {
            this.scencindex = GameUtils.playerBean.player_die_in;
            this.fuhuoindex = GameUtils.playerBean.player_current_in;
        }
        // this.scencindex = 101197000000;
        RES.loadGroup("scene");
    };
    GameScene.prototype.oninitComplete = function (event) {
        if (event.groupName == "scene") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.oninitComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.initComplete();
        }
    };
    GameScene.prototype.onResourceProgress = function (event) {
        if (this.loading) {
            this.loading.setProgress(GameUtils.loadingType, event.itemsLoaded, event.itemsTotal);
        }
    };
    GameScene.prototype.initComplete = function () {
        if (this.loading.parent) {
            this.loading.parent.removeChild(this.loading);
        }
        // var ziptest = new JSZip(RES.getRes("background_data"));
        // var data = JSON.parse(ziptest.file("main_body.json").asText());
        var data = RES.getRes("main_body_json");
        if (GameUtils.RELEASE_STAGE == 1) {
            this.gameTest(data);
        }
        var obj = new Object();
        for (var entry in data) {
            obj[data[entry].order] = data[entry];
        }
        this.GAMESTAGE_NOW = this.GAMESTAGE_JUQING;
        this.menubtn_id = 4;
        this.allGameObj = obj;
        this.effectstage = 0;
        this.huodongSheet = RES.getRes("huodong_json");
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.rolenameSheet = RES.getRes("rolename_json");
        this.shopimgSheet = RES.getRes("shopimg_json");
        this.iwanenterimg = RES.getRes("iwan_enterimg_json");
        if (!GameUtils.messageTime) {
            GameUtils.messageTime = new egret.Timer(GameUtils.playerBean.player_tili_frequency * 1000);
            GameUtils.messageTime.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            GameUtils.messageTime.start();
        }
        if (!GameUtils.showADTime) {
            GameUtils.showADTime = new egret.Timer(GameUtils.checktime * 1000);
            GameUtils.showADTime.addEventListener(egret.TimerEvent.TIMER, this.onShowADTimer, this);
            GameUtils.showADTime.start();
        }
        if (GameUtils.openShortCutTime) {
            if (!GameUtils.shortcutTime) {
                GameUtils.shortcutTime = new egret.Timer(1000 * 60, 1);
                GameUtils.shortcutTime.addEventListener(egret.TimerEvent.TIMER, this.onShortCutTimer, this);
                GameUtils.shortcutTime.start();
            }
        }
        if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_SHOWAD)) {
            GameUtils.dateEventSprite.addEventListener(EventData.DATA_SHOWAD, this.drawBtnAD, this);
        }
        if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_PLAYAD)) {
            GameUtils.dateEventSprite.addEventListener(EventData.DATA_PLAYAD, this.playAdCallBack, this);
        }
        this.createstage();
        if (!this.allGameObj[this.scencindex]) {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", this.scencindex + " ID不存在");
            this.addChild(tishi);
        }
        //领取每日礼包
        if (GameUtils.hlmy_gift) {
            if (GameUtils.is_hlmy_gift) {
                var sendhlmygiftobj = { cmd: 207, player_token: GameUtils.playerToken, gift_obj: GameUtils.hlmy_gift, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
                NetWorkUtils.sendNetPostRequest(sendhlmygiftobj, this.getGiftComplete, this.onPostIOError, this, this);
            }
            else {
                var sendwanbagiftobj = { cmd: 207, player_token: GameUtils.playerToken, gift: GameUtils.hlmy_gift, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
                NetWorkUtils.sendNetPostRequest(sendwanbagiftobj, this.getGiftComplete, this.onPostIOError, this, this);
            }
        }
        if (GameUtils.isfrompet) {
            var sendpetobj = { cmd: 215, player_token: GameUtils.playerToken, type: "cx", return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendpetobj, this.getPetComplete, this.onPostIOError, this, this);
        }
        this.initPreLoad(this.scencindex);
    };
    GameScene.prototype.getPetComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_215.k", event);
        //    GameUtils.debugLog(obj);
        // console.log(obj);
        if (obj.result == 1) {
            // GameUtils.debugLog("没有领取过");
            var toast = new DrawUtils();
            toast.createTishi("coverimg_json", "tishikuang1", "每天从空间宠物登录游戏，并在线5分钟，可获得100糖果。");
            this.addChild(toast);
            this.initPetTime();
        }
    };
    GameScene.prototype.initPetTime = function () {
        GameUtils.petTimeindex = 300;
        GameUtils.petTime = new egret.Timer(1000, 300);
        GameUtils.petTime.addEventListener(egret.TimerEvent.TIMER, this.pettimerFunc, this);
        GameUtils.petTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.pettimerComFunc, this);
        GameUtils.petTime.start();
        this.drawPetCountdown();
    };
    GameScene.prototype.pettimerFunc = function () {
        GameUtils.petTimeindex--;
        if (GameUtils.petTimeindex < 0) {
            GameUtils.petTimeindex = 0;
        }
        var m = Math.floor(GameUtils.petTimeindex / 60);
        var s = GameUtils.petTimeindex % 60;
        var mt = m < 10 ? ("0" + m) : ("" + m);
        var st = s < 10 ? ("0" + s) : ("" + s);
        this.petCountdownText.text = mt + ":" + st;
    };
    GameScene.prototype.pettimerComFunc = function () {
        if (this.petLayer) {
            this.petLayer.removeChildren();
        }
        if (GameUtils.petTime.hasEventListener(egret.TimerEvent.TIMER)) {
            GameUtils.dateEventSprite.removeEventListener(egret.TimerEvent.TIMER, this.pettimerFunc, this);
        }
        if (GameUtils.petTime.hasEventListener(egret.TimerEvent.TIMER)) {
            GameUtils.dateEventSprite.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.pettimerComFunc, this);
        }
        // GameUtils.playerGid = "53ae97205aad0bd4c947f0fd832a7216";
        var sendpetobj = { cmd: 215, player_token: GameUtils.playerToken, gid: GameUtils.playerGid, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
        NetWorkUtils.sendNetPostRequest(sendpetobj, this.getPetLingquComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getPetLingquComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_215.k", event);
        // console.log(obj);
        if (obj.result == 1) {
            var toast = new DrawUtils();
            toast.createTishi("coverimg_json", "tishikuang1", "游戏在线5分钟，获得100糖果。");
            this.addChild(toast);
        }
    };
    /**
     * 绘制领取宠物糖果倒计时
     */
    GameScene.prototype.drawPetCountdown = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRoundRect(0, 180, 80, 24, 20, 20);
        bg.graphics.endFill();
        bg.alpha = 1;
        bg.touchEnabled = false;
        this.petLayer.addChild(bg);
        this.petCountdownText = new egret.TextField();
        this.petCountdownText.text = "05:00";
        this.petCountdownText.x = 0;
        this.petCountdownText.y = 180;
        this.petCountdownText.size = 20;
        this.petCountdownText.width = 80;
        this.petCountdownText.height = 24;
        this.petCountdownText.textColor = 0x000000;
        this.petCountdownText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.petCountdownText.textAlign = egret.HorizontalAlign.CENTER;
        this.petLayer.addChild(this.petCountdownText);
    };
    GameScene.prototype.getGiftComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_207.k", event);
        if (obj.result == 1) {
            if (obj.attributes.length == 0) {
                if (obj.info) {
                    var tishi = new DrawUtils();
                    tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                    this.addChild(tishi);
                }
            }
            else {
                this.showGiftToast(obj);
            }
        }
        else {
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
            }
        }
    };
    GameScene.prototype.gameTest = function (data) {
        console.log("检查开始");
        var no_bg = new Array();
        for (var i = 0; i < this.bgtest.length; i++) {
            no_bg[i] = 0;
        }
        var no_roles = new Array();
        for (var i = 0; i < this.rolestest.length; i++) {
            no_roles[i] = 0;
        }
        var no_rolename = new Array();
        for (var i = 0; i < this.rolenameStr.length; i++) {
            no_rolename[i] = 0;
        }
        var eff_arr = new Array();
        var no_effect = new Array();
        for (var i = 0; i < this.effectStr.length; i++) {
            no_effect[i] = 0;
        }
        var nametest = new Array();
        //        背景
        //                            console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            if (data[i].background) {
                var findok = false;
                for (var j = 0; j < this.bgtest.length; j++) {
                    if (data[i].background != "black" && data[i].background != "white") {
                        if (data[i].background == this.bgtest[j] + "_jpg") {
                            findok = true;
                            if (no_bg[j] == 0) {
                                no_bg[j] = 1;
                            }
                        }
                    }
                }
                if (!findok) {
                    if (data[i].background != "black" && data[i].background != "white") {
                        console.log("缺少背景   " + data[i].order);
                        console.log("缺少背景   " + data[i].background);
                    }
                }
            }
        }
        //        说话名字
        var nametest = new Array();
        for (var i = 0; i < data.length; i++) {
            if (data[i].name) {
                var isin = false;
                for (var j = 0; j < nametest.length; j++) {
                    if (data[i].name == nametest[j]) {
                        isin = true;
                    }
                }
                if (!isin) {
                    nametest.push(data[i].name);
                }
                if ("special1" != data[i].name
                    && "special2" != data[i].name
                    && "special3" != data[i].name
                    && "special4" != data[i].name
                    && "special5" != data[i].name
                    && "special6" != data[i].name) {
                    var findok = false;
                    for (var j = 0; j < this.rolenameStr.length; j++) {
                        if (data[i].name == this.rolenameStr[j]) {
                            findok = true;
                            if (no_rolename[j] == 0) {
                                no_rolename[j] = 1;
                            }
                        }
                    }
                    if (!findok) {
                        console.log("缺少人名   " + data[i].order);
                        console.log("缺少人名   " + data[i].name);
                    }
                }
            }
        }
        //         人物
        for (var i = 0; i < data.length; i++) {
            if (data[i].roles) {
                if (data[i].roles.length > 0) {
                    for (var a = 0; a < data[i].roles.length; a++) {
                        var findok = false;
                        for (var j = 0; j < this.rolestest.length; j++) {
                            if (data[i].roles[a].role_img == (this.rolestest[j] + "_png")) {
                                findok = true;
                                if (no_roles[j] == 0) {
                                    no_roles[j] = 1;
                                }
                            }
                        }
                        if (!findok) {
                            console.log("缺少人物   " + data[i].order);
                            console.log("缺少人物   " + data[i].roles[a].role_img);
                        }
                    }
                }
            }
        }
        //粒子效果
        for (var i = 0; i < data.length; i++) {
            if (data[i].effect) {
                var findok = false;
                for (var j = 0; j < this.effectStr.length; j++) {
                    if (data[i].effect == this.effectStr[j]) {
                        findok = true;
                        if (no_effect[j] == 0) {
                            no_effect[j] = 1;
                        }
                    }
                }
                if (!findok) {
                    console.log("缺少粒子效果   " + data[i].order);
                    console.log("缺少粒子效果   " + data[i].effect);
                }
            }
        }
        //用到的效果
        for (var i = 0; i < data.length; i++) {
            if (data[i].effect) {
                var findok = false;
                for (var j = 0; j < eff_arr.length; j++) {
                    if (data[i].effect == eff_arr[j]) {
                        findok = true;
                    }
                }
                if (!findok) {
                    eff_arr.push(data[i].effect);
                }
            }
        }
        //没有用到的背景图片
        //        for(var i: number = 0;i < no_bg.length;i++) {
        //            if(no_bg[i] == 0) {
        //                console.log("没用的背景   " + this.bgtest[i]);
        //            }
        //        }
        //没有用到的人物立绘
        //        for(var i: number = 0;i < no_roles.length;i++) {
        //            if(no_roles[i] == 0) {
        //                console.log("没用的立绘   " + this.rolestest[i]);
        //            }
        //        }
        //没有用到的说话人名
        //        for(var i: number = 0;i < no_rolename.length;i++) {
        //            if(no_rolename[i] == 0) {
        //                console.log("没用的说话人  " + this.rolenameStr[i]);
        //            }
        //        }
        //没有用到的粒子效果
        //        for(var i: number = 0;i < no_effect.length;i++) {
        //            if(no_effect[i] == 0) {
        //                console.log("没用的粒子效果  " + this.effectStr[i]);
        //            }
        //        }
        //输出用到的效果
        //        for(var i = 0;i < eff_arr.length;i++) {
        //            console.log("用到的效果  " + eff_arr[i]);
        //        }
        //        //输出说话人名
        //        for(var c: number = 0;c < nametest.length;c++) {
        //            if(!this.isSpecialScene(nametest[c])) {
        //                GameUtils.debugLog(nametest[c]);
        //            }
        //        }
        console.log("检查结束");
    };
    GameScene.prototype.RefreshMoney = function () {
        if (this.qiandaolayer) {
            this.qiandaolayer.removeChildren();
        }
        this.drawQianDao();
    };
    GameScene.prototype.removeFrameSprListener = function () {
        this.drawtopmoney.closeMenoyFrame();
    };
    GameScene.prototype.onTimer = function (evt) {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            this.RefreshMoney();
        }
    };
    GameScene.prototype.createstage = function () {
        this.backgroundlayer = new egret.Sprite();
        this.backgroundlayer.graphics.beginFill(0x000000, 1);
        this.backgroundlayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.backgroundlayer.graphics.endFill();
        this.backgroundlayer.width = GameUtils.SCREEN_W;
        this.backgroundlayer.height = GameUtils.SCREEN_H - 82;
        this.addChild(this.backgroundlayer);
        this.particlesystemlayer = new egret.Sprite();
        this.addChild(this.particlesystemlayer);
        this.scenelayer = new egret.Sprite();
        this.scenelayer.graphics.beginFill(0x000000, 0);
        this.scenelayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.scenelayer.graphics.endFill();
        this.scenelayer.width = GameUtils.SCREEN_W;
        this.scenelayer.height = GameUtils.SCREEN_H - 82;
        this.addChild(this.scenelayer);
        this.scenelayer.touchEnabled = true;
        this.scenelayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.menulayer = new egret.Sprite();
        this.addChild(this.menulayer);
        //        var backbtn = new DrawUtils();
        //        backbtn.createBtn("coverimg_json","start1","start2",this);
        //        this.uilayer.addChild(backbtn);
        //        backbtn.x = 30;
        //        backbtn.y = 50;
        //        backbtn.touchEnabled = true;
        //        backbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backbtn,this);
        this.drawMenu();
        this.optionlayer = new egret.Sprite();
        this.addChild(this.optionlayer);
        this.btnshowADlayer = new egret.Sprite();
        this.addChild(this.btnshowADlayer);
        this.petLayer = new egret.Sprite();
        this.addChild(this.petLayer);
        this.checkerlayer = new egret.Sprite();
        this.addChild(this.checkerlayer);
        this.pangbailayer = new egret.Sprite();
        this.addChild(this.pangbailayer);
        this.qiandaolayer = new egret.Sprite();
        this.addChild(this.qiandaolayer);
        this.drawQianDao();
        this.drawtopmoney = new DrawTopMoney(this.gotoShangChengDaoju, this.gotoShangChengChongzhi, this.gotoFriend, this);
        this.addChild(this.drawtopmoney);
        this.shouchongLayer = new egret.Sprite();
        this.addChild(this.shouchongLayer);
        this.changeGameScene();
    };
    GameScene.prototype.drawTishiShouChong = function (showtype) {
        var alphaspr = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.3;
        this.shouchongLayer.addChild(alphaspr);
        alphaspr.touchEnabled = true;
        if (showtype == 0) {
            var kuang = new egret.Bitmap();
            kuang.texture = this.huodongSheet.getTexture("shouchongkuang");
            kuang.x = 0;
            kuang.y = (GameUtils.SCREEN_H - 460) / 2 - 80;
            this.shouchongLayer.addChild(kuang);
            var okbtn = new egret.Bitmap();
            okbtn.texture = this.gameimgSheet.getTexture("shouchongbtn");
            okbtn.x = (GameUtils.SCREEN_W - 254) / 2;
            okbtn.y = GameUtils.SCREEN_H / 2 + 190 - 80;
            this.shouchongLayer.addChild(okbtn);
            okbtn.touchEnabled = true;
            okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouchong, this);
            var closebtn = new egret.Bitmap();
            closebtn.texture = this.coverimgSheet.getTexture("closemenu");
            closebtn.x = GameUtils.SCREEN_W - 82;
            closebtn.y = GameUtils.SCREEN_H / 2 - 220 - 80;
            this.shouchongLayer.addChild(closebtn);
            closebtn.touchEnabled = true;
            closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShouChongTiShi, this);
        }
        else if (showtype == 1) {
            var miansikuang = new egret.Bitmap();
            miansikuang.texture = this.huodongSheet.getTexture("miansibg");
            miansikuang.x = 5;
            miansikuang.y = (GameUtils.SCREEN_H - 500) / 2 - 55;
            this.shouchongLayer.addChild(miansikuang);
            if (GameUtils.isMiansiDiscounts) {
                var miansiprice1 = new egret.BitmapText();
                miansiprice1.font = RES.getRes("miansinum_fnt");
                this.shouchongLayer.addChild(miansiprice1);
                miansiprice1.text = "" + GameUtils.miansipriceStr + "+";
                miansiprice1.letterSpacing = 0;
                miansiprice1.x = 5 + 365;
                miansiprice1.y = (GameUtils.SCREEN_H - 500) / 2 - 55 + 206;
                var miansprite = new egret.Sprite();
                this.shouchongLayer.addChild(miansprite);
                miansprite.x = 5 + 365 + 40;
                miansprite.y = (GameUtils.SCREEN_H - 500) / 2 - 55 + 206 + 20;
                miansprite.rotation = 5;
                var miansishare = new egret.Shape;
                miansishare.graphics.beginFill(0x000000, 1);
                miansishare.graphics.drawRect(0, 0, 80, 4);
                miansishare.graphics.endFill();
                miansprite.addChild(miansishare);
                miansprite.anchorOffsetX = miansprite.width / 2;
                miansprite.anchorOffsetY = miansprite.height / 2;
                var miansiprice = new egret.BitmapText();
                miansiprice.font = RES.getRes("miansinum_fnt");
                this.shouchongLayer.addChild(miansiprice);
                miansiprice.text = "" + GameUtils.miansi_price + "+";
                miansiprice.letterSpacing = 0;
                miansiprice.x = 5 + 365;
                miansiprice.y = (GameUtils.SCREEN_H - 500) / 2 - 55 + 206 - 50;
                miansiprice.scaleX = 1.2;
                miansiprice.scaleY = 1.2;
            }
            else {
                var miansiprice = new egret.BitmapText();
                miansiprice.font = RES.getRes("miansinum_fnt");
                this.shouchongLayer.addChild(miansiprice);
                miansiprice.text = "" + GameUtils.miansi_price + "+";
                miansiprice.letterSpacing = 0;
                miansiprice.x = 5 + 365;
                miansiprice.y = (GameUtils.SCREEN_H - 500) / 2 - 55 + 206;
            }
            var miansiokbtnstr = "miansi_buy";
            if (GameUtils.isMiansiDiscounts) {
                miansiokbtnstr = "miansi_buy_h";
            }
            var miansiokbtn = new egret.Bitmap();
            miansiokbtn.texture = this.gameimgSheet.getTexture(miansiokbtnstr);
            miansiokbtn.x = (GameUtils.SCREEN_W - 254) / 2;
            miansiokbtn.y = GameUtils.SCREEN_H / 2 + 215 - 55;
            this.shouchongLayer.addChild(miansiokbtn);
            miansiokbtn.touchEnabled = true;
            miansiokbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMiansi, this);
            var miansiclosebtn = new egret.Bitmap();
            miansiclosebtn.texture = this.coverimgSheet.getTexture("closemenu");
            miansiclosebtn.x = GameUtils.SCREEN_W - 82;
            miansiclosebtn.y = GameUtils.SCREEN_H / 2 - 270 - 55;
            this.shouchongLayer.addChild(miansiclosebtn);
            miansiclosebtn.touchEnabled = true;
            miansiclosebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShouChongTiShi, this);
            if (!GameUtils.noYaoQing) {
                var yaoqingbtn = new egret.Bitmap();
                yaoqingbtn.texture = this.gameimgSheet.getTexture("btn_miansi_share");
                yaoqingbtn.x = 70;
                yaoqingbtn.y = GameUtils.SCREEN_H / 2 + 80;
                this.shouchongLayer.addChild(yaoqingbtn);
                yaoqingbtn.touchEnabled = true;
                yaoqingbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
            }
        }
        else if (showtype == 2) {
            var kuanglibao = new egret.Bitmap();
            kuanglibao.texture = this.huodongSheet.getTexture("libaobg");
            kuanglibao.x = 40;
            kuanglibao.y = (GameUtils.SCREEN_H - 460) / 2 - 80;
            this.shouchongLayer.addChild(kuanglibao);
            var libaobtn = new egret.Bitmap();
            libaobtn.texture = this.gameimgSheet.getTexture("miansi_buy");
            libaobtn.x = (GameUtils.SCREEN_W - 254) / 2;
            libaobtn.y = (GameUtils.SCREEN_H - 460) / 2 - 80 + 290;
            this.shouchongLayer.addChild(libaobtn);
            libaobtn.touchEnabled = true;
            libaobtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyLiBao, this);
            var libaoclosebtn = new egret.Bitmap();
            libaoclosebtn.texture = this.coverimgSheet.getTexture("closemenu");
            libaoclosebtn.x = GameUtils.SCREEN_W - 82;
            libaoclosebtn.y = GameUtils.SCREEN_H / 2 - 220 - 80;
            this.shouchongLayer.addChild(libaoclosebtn);
            libaoclosebtn.touchEnabled = true;
            libaoclosebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShouChongTiShi, this);
        }
        else if (showtype == 3) {
            var bg = new egret.Bitmap();
            bg.texture = this.huodongSheet.getTexture("nationalday_bg");
            bg.x = (GameUtils.SCREEN_W - 486) / 2;
            bg.y = (GameUtils.SCREEN_H - 716) / 2;
            this.shouchongLayer.addChild(bg);
            var start_x = (GameUtils.SCREEN_W - 486) / 2;
            var buybg_x = (486 - 168 * 2) / 3;
            var start_y = (GameUtils.SCREEN_H - 716) / 2 + 190;
            var buybg_H = 30;
            var buybg_y = (716 - 230 - 223 * 2 - buybg_H) / 2;
            for (var i = 0; i < GameUtils.nationalDayidArr.length; i++) {
                var buybg = new egret.Bitmap();
                buybg.texture = this.huodongSheet.getTexture(this.getGiftBagBg(GameUtils.nationalDayidArr[i]));
                buybg.x = start_x + buybg_x + (buybg_x + 168) * (i % 2);
                buybg.y = start_y + buybg_y + (buybg_H + 223) * Math.floor(i / 2);
                this.shouchongLayer.addChild(buybg);
                if (GameUtils.nationalDayidArr[i] == 200) {
                    var icon0 = new egret.Bitmap();
                    icon0.texture = this.huodongSheet.getTexture("nationalday_tuijian");
                    icon0.x = start_x + buybg_x + (buybg_x + 168) * (i % 2) - 15;
                    icon0.y = start_y + buybg_y + (buybg_H + 223) * Math.floor(i / 2) - 5;
                    this.shouchongLayer.addChild(icon0);
                }
                else if (GameUtils.nationalDayidArr[i] == 201
                    || GameUtils.nationalDayidArr[i] == 203) {
                    var icon1 = new egret.Bitmap();
                    icon1.texture = this.huodongSheet.getTexture("nationalday_remai");
                    icon1.x = start_x + buybg_x + (buybg_x + 168) * (i % 2) - 15;
                    icon1.y = start_y + buybg_y + (buybg_H + 223) * Math.floor(i / 2) - 5;
                    this.shouchongLayer.addChild(icon1);
                }
                var buybtn = new egret.Bitmap();
                buybtn.texture = this.huodongSheet.getTexture("nationalday_buy_btn");
                buybtn.x = start_x + buybg_x + (buybg_x + 168) * (i % 2) + 22;
                buybtn.y = start_y + buybg_y + (buybg_H + 223) * Math.floor(i / 2) + 195;
                buybtn.name = "" + i;
                this.shouchongLayer.addChild(buybtn);
                buybtn.touchEnabled = true;
                buybtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyGiftBag, this);
            }
            var closegiftbag = new egret.Bitmap();
            closegiftbag.texture = this.coverimgSheet.getTexture("closemenu");
            closegiftbag.x = start_x + 485 - closegiftbag.texture.textureWidth;
            closegiftbag.y = (GameUtils.SCREEN_H - 716) / 2 + 95;
            this.shouchongLayer.addChild(closegiftbag);
            closegiftbag.touchEnabled = true;
            closegiftbag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGiftBag, this);
        }
    };
    GameScene.prototype.getGiftBagBg = function (id) {
        var bgname = "nationalday_buy_bg_0";
        if (id == 200) {
            bgname = "nationalday_buy_bg_0";
        }
        else if (id == 201) {
            bgname = "nationalday_buy_bg_1";
        }
        else if (id == 202) {
            bgname = "nationalday_buy_bg_2";
        }
        else if (id == 203) {
            bgname = "nationalday_buy_bg_3";
        }
        return bgname;
    };
    GameScene.prototype.buyGiftBag = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.giftBagid = btnid;
            var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: GameUtils.nationalDayidArr[this.giftBagid], hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayGiftBagComplete, this.onPostIOError, this, this);
        }
    };
    GameScene.prototype.getPayGiftBagComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                    }
                }
            });
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
    };
    GameScene.prototype.closeGiftBag = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
    };
    GameScene.prototype.buyLiBao = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: 109, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
        NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayLiBaoComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getPayLiBaoComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                        GameUtils.isShowLibaoIcon = false;
                    }
                }
            });
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
    };
    GameScene.prototype.closeShouChongTiShi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
    };
    GameScene.prototype.buyMiansi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        //        onPay({ "appKey": GameUtils.APPKEY_1758, "itemCode": GameUtils.MIANSI_ITEMCODE });
        var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: 99, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
        NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayGoodsComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getPayGoodsComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                    }
                }
            });
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
    };
    GameScene.prototype.onPaySucceed = function () {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.shouchong = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (GameUtils.SHOUCHONG_GOODS_ID != -1) {
            if (this.shouchongLayer) {
                this.shouchongLayer.removeChildren();
            }
            var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: GameUtils.SHOUCHONG_GOODS_ID, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayShouChongComplete, this.onPostIOError, this, this);
        }
        else {
            if (this.GAMESTAGE_NOW != this.GAMESTAGE_SHOP) {
                if (this.shouchongLayer) {
                    this.shouchongLayer.removeChildren();
                }
                this.GAMESTAGE_NOW = this.GAMESTAGE_SHOP;
                this.drawMenu();
                this.clearMenuScene(this.GAMESTAGE_NOW);
                this.shopscene = new ShopScene(this);
                this.addChild(this.shopscene);
            }
        }
    };
    GameScene.prototype.getPayShouChongComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                    }
                }
            });
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
    };
    GameScene.prototype.drawQianDao = function () {
        var showindex = 0;
        if (!GameUtils.noYaoQing) {
            this.btnYaoqing = new egret.Bitmap();
            this.btnYaoqing.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[0]);
            this.btnYaoqing.x = this.btnTishiPositionArr[showindex];
            this.btnYaoqing.y = 50;
            this.qiandaolayer.addChild(this.btnYaoqing);
            this.btnYaoqing.touchEnabled = true;
            this.btnYaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
            showindex++;
        }
        if (!GameUtils.noShare) {
            this.btnShare = new egret.Bitmap();
            this.btnShare.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[5]);
            this.btnShare.x = this.btnTishiPositionArr[showindex];
            this.btnShare.y = 50;
            this.qiandaolayer.addChild(this.btnShare);
            this.btnShare.touchEnabled = true;
            this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            showindex++;
        }
        if (GameUtils.playerBean.player_first_pay == 0) {
            this.btnShouChong = new egret.Bitmap();
            this.btnShouChong.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[1]);
            this.btnShouChong.x = this.btnTishiPositionArr[showindex];
            this.btnShouChong.y = 50;
            this.qiandaolayer.addChild(this.btnShouChong);
            this.btnShouChong.touchEnabled = true;
            this.btnShouChong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouchongTishi, this);
            showindex++;
        }
        if (GameUtils.playerBean.player_follow_reward == 0 && !GameUtils.noGuanZhu) {
            this.btnGuanZhu = new egret.Bitmap();
            this.btnGuanZhu.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[2]);
            this.btnGuanZhu.x = this.btnTishiPositionArr[showindex];
            this.btnGuanZhu.y = 50;
            this.qiandaolayer.addChild(this.btnGuanZhu);
            this.btnGuanZhu.touchEnabled = true;
            this.btnGuanZhu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoGuanzhu, this);
            showindex++;
        }
        if (GameUtils.playerBean.player_sign_in == 0) {
            this.btnQianDao = new egret.Bitmap();
            this.btnQianDao.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[3]);
            this.btnQianDao.x = this.btnTishiPositionArr[showindex];
            this.btnQianDao.y = 50;
            this.qiandaolayer.addChild(this.btnQianDao);
            this.btnQianDao.touchEnabled = true;
            this.btnQianDao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoHuoDongList, this);
            showindex++;
        }
        if (GameUtils.playerBean.player_miansi == 0 && GameUtils.isShowMiansiIcon) {
            if (GameUtils.isMiansiDiscounts) {
                var tishitableeff = new egret.Bitmap();
                tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
                tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
                tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
                tishitableeff.anchorOffsetX = 35;
                tishitableeff.anchorOffsetY = 35;
                this.qiandaolayer.addChild(tishitableeff);
                var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
                tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
                this.btnTishiNameArr[4] = "tishi_miansi_h";
            }
            this.btnMianSi = new egret.Bitmap();
            this.btnMianSi.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[4]);
            this.btnMianSi.x = this.btnTishiPositionArr[showindex];
            this.btnMianSi.y = 50;
            this.qiandaolayer.addChild(this.btnMianSi);
            this.btnMianSi.touchEnabled = true;
            this.btnMianSi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mianshi, this);
            showindex++;
        }
        if (GameUtils.isShopDiscounts) {
            var tishitableeff = new egret.Bitmap();
            tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
            tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
            tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
            tishitableeff.anchorOffsetX = 35;
            tishitableeff.anchorOffsetY = 35;
            this.qiandaolayer.addChild(tishitableeff);
            var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
            tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
            this.btnTishiNameArr[6] = "tishi_shop_h";
        }
        var btnshop = new egret.Bitmap();
        btnshop.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[6]);
        btnshop.x = this.btnTishiPositionArr[showindex];
        btnshop.y = 50;
        btnshop.touchEnabled = true;
        btnshop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShop, this);
        this.qiandaolayer.addChild(btnshop);
        showindex++;
        if (GameUtils.addShortcut) {
            if (GameUtils.playerBean.player_sent_desk == 0) {
                var tishitableeff = new egret.Bitmap();
                tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
                tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
                tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
                tishitableeff.anchorOffsetX = 35;
                tishitableeff.anchorOffsetY = 35;
                this.qiandaolayer.addChild(tishitableeff);
                var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
                tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
            }
            this.btnAddShortcut = new egret.Bitmap();
            this.btnAddShortcut.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[7]);
            this.btnAddShortcut.x = this.btnTishiPositionArr[showindex];
            this.btnAddShortcut.y = 50;
            this.qiandaolayer.addChild(this.btnAddShortcut);
            this.btnAddShortcut.touchEnabled = true;
            this.btnAddShortcut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addShortcut, this);
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ADDSHORTCUT)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ADDSHORTCUT, this.ShortcutCallBack, this);
            }
            showindex++;
        }
        if (GameUtils.isShowLibaoIcon) {
            this.btnLibao = new egret.Bitmap();
            this.btnLibao.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[8]);
            this.btnLibao.x = this.btnTishiPositionArr[showindex % 8];
            this.btnLibao.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnLibao.touchEnabled = true;
            this.btnLibao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLiBao, this);
            this.qiandaolayer.addChild(this.btnLibao);
            showindex++;
        }
        if (GameUtils.noNationalDay) {
            this.btnNationalDay = new egret.Bitmap();
            this.btnNationalDay.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[9]);
            this.btnNationalDay.x = this.btnTishiPositionArr[showindex % 8];
            this.btnNationalDay.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnNationalDay.touchEnabled = true;
            this.btnNationalDay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShowGiftBag, this);
            this.qiandaolayer.addChild(this.btnNationalDay);
            showindex++;
        }
        if (GameUtils.noFacialRecognition && GameUtils.channelStr == "玩吧") {
            this.btnFaceSdk = new egret.Bitmap();
            this.btnFaceSdk.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[10]);
            this.btnFaceSdk.x = this.btnTishiPositionArr[showindex % 8];
            this.btnFaceSdk.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnFaceSdk.touchEnabled = true;
            this.btnFaceSdk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFace, this);
            this.qiandaolayer.addChild(this.btnFaceSdk);
            showindex++;
        }
        if (GameUtils.setQQbackground && GameUtils.channelStr == "玩吧") {
            this.btnQQbg = new egret.Bitmap();
            this.btnQQbg.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[11]);
            this.btnQQbg.x = this.btnTishiPositionArr[showindex % 8];
            this.btnQQbg.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnQQbg.touchEnabled = true;
            this.btnQQbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShowQQbg, this);
            this.qiandaolayer.addChild(this.btnQQbg);
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_QQBACKGROUND)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_QQBACKGROUND, this.qqbackgroundCallBack, this);
            }
            showindex++;
        }
        //周末礼包
        // if (GameUtils.channelStr == "玩吧") {
        //     if (this.isWeekEnd) {
        //         var tishitableeff: egret.Bitmap = new egret.Bitmap();
        //         tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
        //         tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
        //         tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
        //         tishitableeff.anchorOffsetX = 35;
        //         tishitableeff.anchorOffsetY = 35;
        //         this.qiandaolayer.addChild(tishitableeff);
        //         var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
        //         tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
        //     }
        //     this.btnWeekend = new egret.Bitmap();
        //     this.btnWeekend.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[12]);
        //     this.btnWeekend.x = this.btnTishiPositionArr[showindex % 8];
        //     this.btnWeekend.y = 50 + 64 * Math.floor(showindex / 8);
        //     this.btnWeekend.touchEnabled = true;
        //     this.btnWeekend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShowWeekendBg, this);
        //     this.qiandaolayer.addChild(this.btnWeekend);
        //     showindex++;
        // }
        if (GameUtils.isShowxingqubuluo) {
            this.btnXingquBuluo = new egret.Bitmap();
            this.btnXingquBuluo.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[13]);
            this.btnXingquBuluo.x = this.btnTishiPositionArr[showindex % 8];
            this.btnXingquBuluo.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnXingquBuluo.touchEnabled = true;
            this.btnXingquBuluo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGotoXingquBuluo, this);
            this.qiandaolayer.addChild(this.btnXingquBuluo);
            showindex++;
        }
        if (GameUtils.isQQcoin) {
            var tishitableeff = new egret.Bitmap();
            tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
            tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
            tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
            tishitableeff.anchorOffsetX = 35;
            tishitableeff.anchorOffsetY = 35;
            this.qiandaolayer.addChild(tishitableeff);
            var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
            tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
            this.btnQQcoin = new egret.Bitmap();
            this.btnQQcoin.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[14]);
            this.btnQQcoin.x = this.btnTishiPositionArr[showindex % 8];
            this.btnQQcoin.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnQQcoin.touchEnabled = true;
            this.btnQQcoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGotoQQcoin, this);
            this.qiandaolayer.addChild(this.btnQQcoin);
            showindex++;
        }
        if (GameUtils.isShowHongdongShop && GameUtils.channelStr == "玩吧") {
            //付费礼包
            var tishitableeff = new egret.Bitmap();
            tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
            tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
            tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
            tishitableeff.anchorOffsetX = 35;
            tishitableeff.anchorOffsetY = 35;
            this.qiandaolayer.addChild(tishitableeff);
            var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
            tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
            this.btnHuodongShop = new egret.Bitmap();
            this.btnHuodongShop.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[15]);
            this.btnHuodongShop.x = this.btnTishiPositionArr[showindex % 8];
            this.btnHuodongShop.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnHuodongShop.touchEnabled = true;
            this.btnHuodongShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShowHuodongShop, this);
            this.qiandaolayer.addChild(this.btnHuodongShop);
            showindex++;
        }
        if (GameUtils.channelStr == "玩吧") {
            //VIP礼包
            this.btnVip = new egret.Bitmap();
            this.btnVip.texture = this.gameimgSheet.getTexture(this.btnTishiNameArr[16]);
            this.btnVip.x = this.btnTishiPositionArr[showindex % 8];
            this.btnVip.y = 50 + 64 * Math.floor(showindex / 8);
            this.btnVip.touchEnabled = true;
            this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnDrawVip, this);
            this.qiandaolayer.addChild(this.btnVip);
            showindex++;
        }
        if (GameUtils.isWanbaQQshipin) {
            var tishitableeff = new egret.Bitmap();
            tishitableeff.texture = this.gameimgSheet.getTexture("tishi_table_eff");
            tishitableeff.x = this.btnTishiPositionArr[showindex % 8] - 8 + 35;
            tishitableeff.y = 50 - 8 + 35 + 64 * Math.floor(showindex / 8);
            tishitableeff.anchorOffsetX = 35;
            tishitableeff.anchorOffsetY = 35;
            this.qiandaolayer.addChild(tishitableeff);
            var tweeneff = egret.Tween.get(tishitableeff, { loop: true });
            tweeneff.to({ rotation: -360, alpha: 0.3 }, 1500).to({ rotation: -720, alpha: 1 }, 1500);
            this.btniwanenter = new egret.Bitmap();
            this.btniwanenter.texture = this.iwanenterimg.getTexture(this.btnTishiNameArr[17]);
            this.btniwanenter.x = this.btnTishiPositionArr[showindex % 8];
            this.btniwanenter.y = 50 + 64 * Math.floor(showindex / 8);
            this.btniwanenter.width = 54;
            this.btniwanenter.height = 54;
            this.btniwanenter.touchEnabled = true;
            this.btniwanenter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnIwanEnter, this);
            this.qiandaolayer.addChild(this.btniwanenter);
            showindex++;
        }
    };
    /**
         * 腾讯视频动画
         */
    GameScene.prototype.btnIwanEnter = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawIwanEnter();
    };
    GameScene.prototype.drawIwanEnter = function () {
        var alphaspr = new egret.Shape;
        alphaspr.graphics.beginFill(0x000000, 0.3);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.touchEnabled = true;
        this.shouchongLayer.addChild(alphaspr);
        var bg = new egret.Bitmap();
        bg.texture = this.iwanenterimg.getTexture("iwan_enter_bg");
        bg.x = (GameUtils.SCREEN_W - 470) / 2;
        bg.y = (GameUtils.SCREEN_H - 800) / 2;
        this.shouchongLayer.addChild(bg);
        var data = RES.getRes("iwan_enter_json");
        var txtr = RES.getRes("iwan_enter_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("iwan"));
        this.shouchongLayer.addChild(mc1);
        mc1.gotoAndPlay(1, -1);
        mc1.x = (GameUtils.SCREEN_W - 412) / 2;
        mc1.y = (GameUtils.SCREEN_H - 800) / 2 + 131;
        var closeiwan = new egret.Shape();
        closeiwan.graphics.beginFill(0xffffff, 0);
        closeiwan.graphics.drawRect((GameUtils.SCREEN_W - 120) / 2, (GameUtils.SCREEN_H - 800) / 2 + 735, 120, 65);
        closeiwan.graphics.endFill();
        closeiwan.alpha = 0;
        this.shouchongLayer.addChild(closeiwan);
        closeiwan.touchEnabled = true;
        closeiwan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseIwan, this);
    };
    GameScene.prototype.btnCloseIwan = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
    };
    /**
         * VIP
         */
    GameScene.prototype.btnDrawVip = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var sendobj = { cmd: 214, player_token: GameUtils.playerToken, gid: GameUtils.playerGid, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
        NetWorkUtils.sendNetPostRequest(sendobj, this.getVipShopListComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getVipShopListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_214.k", event);
        // GameUtils.debugLog(obj);
        GameUtils.VipBean = new VipBean(obj);
        if (obj.items) {
            if (obj.items.length > 0) {
                GameUtils.isShowVipShop = true;
            }
        }
        // for (var i: number = 0; i < GameUtils.VipBean.ireceive.length; i++) {
        //     console.log(GameUtils.VipBean.ireceive[i].vip);
        //     for (var j: number = 0; j < GameUtils.VipBean.ireceive[i].igift.length; j++) {
        //         console.log(GameUtils.VipBean.ireceive[i].igift[j].description);
        //     }
        // }
        // for (var i: number = 0; i < GameUtils.VipBean.items.length; i++) {
        //     console.log(GameUtils.VipBean.items[i].name);
        //     for (var j: number = 0; j < GameUtils.VipBean.items[i].igift.length; j++) {
        //         console.log(GameUtils.VipBean.items[i].igift[j].description);
        //     }
        // }
        if (obj.result == 1) {
            this.drawVipShop();
        }
    };
    GameScene.prototype.drawVipShop = function () {
        var alphaspr = new egret.Shape;
        alphaspr.graphics.beginFill(0x000000, 0.3);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.touchEnabled = true;
        this.shouchongLayer.addChild(alphaspr);
        var bg_h = 500;
        var bg_x = 50;
        var bg_y = (GameUtils.SCREEN_H - bg_h) / 2;
        var bg = new egret.Bitmap();
        bg.texture = this.shopimgSheet.getTexture("huodongshopbg_0");
        bg.x = bg_x;
        bg.y = bg_y;
        this.shouchongLayer.addChild(bg);
        var bgGrid = new egret.Rectangle(30, 30, 30, 30);
        bg.scale9Grid = bgGrid;
        bg.width = GameUtils.SCREEN_W - bg_x * 2;
        bg.height = bg_h;
        this.drawVipDes(0);
        var vipclosebtn = new egret.Bitmap();
        vipclosebtn.texture = this.coverimgSheet.getTexture("closemenu");
        vipclosebtn.x = GameUtils.SCREEN_W - bg_x - 54;
        vipclosebtn.y = bg_y - 30;
        vipclosebtn.touchEnabled = true;
        vipclosebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeVipShop, this);
        this.shouchongLayer.addChild(vipclosebtn);
    };
    GameScene.prototype.drawVipDes = function (drawtype) {
        var bg_h = 500;
        var bg_x = 50;
        var bg_y = (GameUtils.SCREEN_H - bg_h) / 2;
        this.vipLayer = new egret.Sprite();
        this.shouchongLayer.addChild(this.vipLayer);
        if (drawtype == 0) {
            var title = new egret.Bitmap();
            title.texture = this.shopimgSheet.getTexture("viptitle_0");
            title.x = (GameUtils.SCREEN_W - 328) / 2;
            title.y = bg_y - 23;
            this.vipLayer.addChild(title);
            var btn_vipswitch_0 = new egret.Bitmap();
            btn_vipswitch_0.texture = this.shopimgSheet.getTexture("btn_vip_go_1");
            btn_vipswitch_0.x = GameUtils.SCREEN_W - bg_x - 20 - 118;
            btn_vipswitch_0.y = bg_y + 30;
            btn_vipswitch_0.touchEnabled = true;
            btn_vipswitch_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnVipswitchToShop, this);
            this.vipLayer.addChild(btn_vipswitch_0);
            var level = new egret.TextField();
            level.text = "当前VIP等级：";
            level.x = bg_x + 30;
            level.y = bg_y + 40;
            level.size = GameUtils.TEXT_SIZE_SMALL;
            level.textColor = 0xff0000;
            this.vipLayer.addChild(level);
            var viplevel = new egret.Bitmap();
            viplevel.texture = this.shopimgSheet.getTexture(this.getVipLevelIcon(GameUtils.VipBean.vip));
            viplevel.x = bg_x + 30 + 140;
            viplevel.y = bg_y + 40;
            this.vipLayer.addChild(viplevel);
            var des = new egret.TextField();
            des.text = "小游戏VIP详情请在QQ空间小游戏特权中心内查看";
            des.x = bg_x;
            des.y = bg_y + 80;
            des.size = 16;
            des.textColor = 0x000000;
            this.vipLayer.addChild(des);
            des.width = GameUtils.SCREEN_W - 100;
            des.textAlign = egret.HorizontalAlign.CENTER;
            var cur_des = new egret.TextField();
            cur_des.text = "当前VIP等级可领特权礼包内容";
            cur_des.x = bg_x + 30;
            cur_des.y = bg_y + 110;
            cur_des.size = 16;
            cur_des.textColor = 0x000000;
            this.vipLayer.addChild(cur_des);
            var curitembg = new egret.Bitmap();
            curitembg.texture = this.shopimgSheet.getTexture("huodongshopbg_1");
            curitembg.x = bg_x + 30;
            curitembg.y = bg_y + 140;
            this.vipLayer.addChild(curitembg);
            var curitembgGrid = new egret.Rectangle(30, 30, 30, 30);
            curitembg.scale9Grid = curitembgGrid;
            curitembg.width = GameUtils.SCREEN_W - (bg_x + 30) * 2;
            curitembg.height = 120;
            var vipl = GameUtils.VipBean.vip;
            if (vipl < 1) {
                vipl = 1;
            }
            var viplevel_1 = new egret.Bitmap();
            viplevel_1.texture = this.shopimgSheet.getTexture(this.getVipLevelIcon(vipl));
            viplevel_1.x = bg_x + 30;
            viplevel_1.y = bg_y + 130;
            this.vipLayer.addChild(viplevel_1);
            var arr_index_1 = GameUtils.VipBean.vip - 1;
            if (arr_index_1 < 0) {
                arr_index_1 = 0;
            }
            for (var i = 0; i < GameUtils.VipBean.ireceive[arr_index_1].igift.length; i++) {
                var curitemicon = new egret.Bitmap();
                curitemicon.texture = this.gameimgSheet.getTexture(this.getVipItemIcon(GameUtils.VipBean.ireceive[arr_index_1].igift[i].type));
                curitemicon.x = bg_x + 50 + (80 + 30) * i;
                curitemicon.y = bg_y + 140 + 30;
                this.vipLayer.addChild(curitemicon);
                curitemicon.width = 80;
                curitemicon.height = 80;
                var curitemnum = new egret.TextField();
                curitemnum.text = "X" + GameUtils.VipBean.ireceive[arr_index_1].igift[i].value;
                curitemnum.x = bg_x + 50 + (80 + 30) * i;
                curitemnum.y = bg_y + 140 + 30 + 60;
                curitemnum.size = 16;
                curitemnum.textColor = 0xffffff;
                this.vipLayer.addChild(curitemnum);
                curitemnum.width = 75;
                curitemnum.textAlign = egret.HorizontalAlign.RIGHT;
                curitemnum.stroke = 2;
                curitemnum.strokeColor = 0x000000;
            }
            if (GameUtils.VipBean.vip > 0) {
                if (GameUtils.VipBean.isReceive == 1) {
                    this.vipLingquBtn = new egret.Bitmap();
                    this.vipLingquBtn.texture = this.shopimgSheet.getTexture("btnvip_lingqu_0");
                    this.vipLingquBtn.x = GameUtils.SCREEN_W - 40 - 20 - 126;
                    this.vipLingquBtn.y = bg_y + 170 + 44;
                    this.vipLingquBtn.touchEnabled = true;
                    this.vipLingquBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnVipLingqu, this);
                    this.vipLayer.addChild(this.vipLingquBtn);
                }
                else {
                    var btn_viplingen = new egret.Bitmap();
                    btn_viplingen.texture = this.shopimgSheet.getTexture("btnvip_lingqu_1");
                    btn_viplingen.x = GameUtils.SCREEN_W - 40 - 20 - 126;
                    btn_viplingen.y = bg_y + 170 + 44;
                    this.vipLayer.addChild(btn_viplingen);
                }
            }
            if (GameUtils.VipBean.vip > 0 && GameUtils.VipBean.vip < 6) {
                var next_des = new egret.TextField();
                next_des.text = "下一档VIP等级可领特权礼包内容";
                next_des.x = bg_x + 30;
                next_des.y = bg_y + 270;
                next_des.size = 16;
                next_des.textColor = 0x000000;
                this.vipLayer.addChild(next_des);
                var nextitembg = new egret.Bitmap();
                nextitembg.texture = this.shopimgSheet.getTexture("huodongshopbg_1");
                nextitembg.x = bg_x + 30;
                nextitembg.y = bg_y + 300;
                this.vipLayer.addChild(nextitembg);
                var nextitembgGrid = new egret.Rectangle(30, 30, 30, 30);
                nextitembg.scale9Grid = nextitembgGrid;
                nextitembg.width = GameUtils.SCREEN_W - (bg_x + 30) * 2;
                nextitembg.height = 120;
                var viplevel_2 = new egret.Bitmap();
                viplevel_2.texture = this.shopimgSheet.getTexture(this.getVipLevelIcon(GameUtils.VipBean.vip + 1));
                viplevel_2.x = bg_x + 30;
                viplevel_2.y = bg_y + 290;
                this.vipLayer.addChild(viplevel_2);
                var arr_index_2 = GameUtils.VipBean.vip;
                for (var i = 0; i < GameUtils.VipBean.ireceive[arr_index_2].igift.length; i++) {
                    var nextitemicon = new egret.Bitmap();
                    nextitemicon.texture = this.gameimgSheet.getTexture(this.getVipItemIcon(GameUtils.VipBean.ireceive[arr_index_2].igift[i].type));
                    nextitemicon.x = bg_x + 50 + (80 + 30) * i;
                    nextitemicon.y = bg_y + 330;
                    this.vipLayer.addChild(nextitemicon);
                    nextitemicon.width = 80;
                    nextitemicon.height = 80;
                    var nextitemnum = new egret.TextField();
                    nextitemnum.text = "X" + GameUtils.VipBean.ireceive[arr_index_2].igift[i].value;
                    nextitemnum.x = bg_x + 50 + (80 + 30) * i;
                    nextitemnum.y = bg_y + 330 + 60;
                    nextitemnum.size = 16;
                    nextitemnum.textColor = 0xffffff;
                    this.vipLayer.addChild(nextitemnum);
                    nextitemnum.width = 75;
                    nextitemnum.textAlign = egret.HorizontalAlign.RIGHT;
                    nextitemnum.stroke = 2;
                    nextitemnum.strokeColor = 0x000000;
                }
            }
        }
        else {
            var title = new egret.Bitmap();
            title.texture = this.shopimgSheet.getTexture("viptitle_1");
            title.x = (GameUtils.SCREEN_W - 328) / 2;
            title.y = bg_y - 23;
            this.vipLayer.addChild(title);
            var btn_vipswitch_1 = new egret.Bitmap();
            btn_vipswitch_1.texture = this.shopimgSheet.getTexture("btn_vip_go_0");
            btn_vipswitch_1.x = GameUtils.SCREEN_W - bg_x - 20 - 118;
            btn_vipswitch_1.y = bg_y + 30;
            btn_vipswitch_1.touchEnabled = true;
            btn_vipswitch_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnVipswitchToGift, this);
            this.vipLayer.addChild(btn_vipswitch_1);
            var level = new egret.TextField();
            level.text = "当前VIP等级：";
            level.x = bg_x + 30;
            level.y = bg_y + 40;
            level.size = GameUtils.TEXT_SIZE_SMALL;
            level.textColor = 0xff0000;
            this.vipLayer.addChild(level);
            var viplevel = new egret.Bitmap();
            viplevel.texture = this.shopimgSheet.getTexture(this.getVipLevelIcon(GameUtils.VipBean.vip));
            viplevel.x = bg_x + 30 + 140;
            viplevel.y = bg_y + 40;
            this.vipLayer.addChild(viplevel);
            var des = new egret.TextField();
            des.text = "小游戏VIP详情请在QQ空间小游戏特权中心内查看";
            des.x = bg_x;
            des.y = bg_y + 80;
            des.size = 16;
            des.textColor = 0x000000;
            this.vipLayer.addChild(des);
            des.width = GameUtils.SCREEN_W - 100;
            des.textAlign = egret.HorizontalAlign.CENTER;
            var cur_des = new egret.TextField();
            cur_des.text = "特价礼包：";
            cur_des.x = bg_x + 30;
            cur_des.y = bg_y + 110;
            cur_des.size = 16;
            cur_des.textColor = 0x000000;
            this.vipLayer.addChild(cur_des);
            this.btnVipBuyArr = new Array();
            var buybglayer = new egret.Sprite();
            this.vipLayer.addChild(buybglayer);
            var myscrollView = new egret.ScrollView();
            myscrollView.setContent(buybglayer);
            myscrollView.x = 0;
            myscrollView.y = bg_y + 130;
            myscrollView.width = GameUtils.SCREEN_W;
            myscrollView.height = 340;
            myscrollView.verticalScrollPolicy = "on";
            myscrollView.horizontalScrollPolicy = "off";
            this.vipLayer.addChild(myscrollView);
            for (var i = 0; i < GameUtils.VipBean.items.length; i++) {
                var curitembg = new egret.Bitmap();
                curitembg.texture = this.shopimgSheet.getTexture("huodongshopbg_1");
                curitembg.x = bg_x + 30;
                curitembg.y = 10 + 140 * i;
                buybglayer.addChild(curitembg);
                var curitembgGrid = new egret.Rectangle(30, 30, 30, 30);
                curitembg.scale9Grid = curitembgGrid;
                curitembg.width = GameUtils.SCREEN_W - (bg_x + 30) * 2;
                curitembg.height = 120;
                var viplevel_1 = new egret.Bitmap();
                viplevel_1.texture = this.shopimgSheet.getTexture(this.getVipLevelIcon(i + 1));
                viplevel_1.x = bg_x + 30;
                viplevel_1.y = 140 * i;
                buybglayer.addChild(viplevel_1);
                for (var j = 0; j < GameUtils.VipBean.items[i].igift.length; j++) {
                    var itemicon = new egret.Bitmap();
                    itemicon.texture = this.gameimgSheet.getTexture(this.getVipItemIcon(GameUtils.VipBean.items[i].igift[j].type));
                    itemicon.x = bg_x + 50 + (80 + 30) * j;
                    itemicon.y = 40 + 140 * i;
                    buybglayer.addChild(itemicon);
                    itemicon.width = 80;
                    itemicon.height = 80;
                    var itemnum = new egret.TextField();
                    itemnum.text = "X" + GameUtils.VipBean.items[i].igift[j].value;
                    itemnum.x = bg_x + 50 + (80 + 30) * j;
                    itemnum.y = 40 + 60 + 140 * i;
                    itemnum.size = 16;
                    itemnum.textColor = 0xffffff;
                    buybglayer.addChild(itemnum);
                    itemnum.width = 75;
                    itemnum.textAlign = egret.HorizontalAlign.RIGHT;
                    itemnum.stroke = 2;
                    itemnum.strokeColor = 0x000000;
                }
                if (GameUtils.VipBean.items[i].isBuy == 1) {
                    var btn_vipbuy = new egret.Bitmap();
                    btn_vipbuy.texture = this.shopimgSheet.getTexture("btnvip_buy_0");
                    btn_vipbuy.x = GameUtils.SCREEN_W - 40 - 20 - 126;
                    btn_vipbuy.y = 140 * i + 84;
                    btn_vipbuy.touchEnabled = true;
                    btn_vipbuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnVipBuy, this);
                    buybglayer.addChild(btn_vipbuy);
                    btn_vipbuy.name = "" + i;
                    this.btnVipBuyArr.push(btn_vipbuy);
                }
                else {
                    var btn_vipbuyen = new egret.Bitmap();
                    btn_vipbuyen.texture = this.shopimgSheet.getTexture("btnvip_buy_1");
                    btn_vipbuyen.x = GameUtils.SCREEN_W - 40 - 20 - 126;
                    btn_vipbuyen.y = 140 * i + 84;
                    buybglayer.addChild(btn_vipbuyen);
                }
                var zhuanshiicon = new egret.Bitmap();
                zhuanshiicon.texture = this.gameimgSheet.getTexture("zhuanshiicon");
                zhuanshiicon.x = GameUtils.SCREEN_W - 40 - 20 - 110;
                zhuanshiicon.y = 140 * i + 35;
                buybglayer.addChild(zhuanshiicon);
                zhuanshiicon.scaleX = 0.5;
                zhuanshiicon.scaleY = 0.5;
                var oldprice = new egret.TextField();
                oldprice.text = "" + GameUtils.VipBean.items[i].originalPrice;
                oldprice.x = GameUtils.SCREEN_W - 40 - 20 - 110 + 25;
                oldprice.y = 140 * i + 35;
                oldprice.size = 16;
                oldprice.textColor = 0xff0000;
                buybglayer.addChild(oldprice);
                oldprice.height = 20;
                oldprice.verticalAlign = egret.VerticalAlign.BOTTOM;
                var hongshp = new egret.Shape();
                hongshp.graphics.beginFill(0xff0000, 1);
                hongshp.graphics.drawRect(GameUtils.SCREEN_W - 40 - 20 - 110 + 25 - 2, 140 * i + 35 + 13, oldprice.textWidth + 4, 1);
                hongshp.graphics.endFill();
                buybglayer.addChild(hongshp);
                var zhuanshiicon = new egret.Bitmap();
                zhuanshiicon.texture = this.gameimgSheet.getTexture("zhuanshiicon");
                zhuanshiicon.x = GameUtils.SCREEN_W - 40 - 20 - 110;
                zhuanshiicon.y = 140 * i + 60;
                buybglayer.addChild(zhuanshiicon);
                zhuanshiicon.scaleX = 0.5;
                zhuanshiicon.scaleY = 0.5;
                var newprice = new egret.TextField();
                newprice.text = "" + GameUtils.VipBean.items[i].price;
                newprice.x = GameUtils.SCREEN_W - 40 - 20 - 110 + 25;
                newprice.y = 140 * i + 60;
                newprice.size = 16;
                newprice.textColor = 0x000000;
                buybglayer.addChild(newprice);
                newprice.height = 20;
                newprice.verticalAlign = egret.VerticalAlign.BOTTOM;
            }
        }
    };
    GameScene.prototype.getVipLevelIcon = function (lv) {
        var str = "v0";
        if (lv > 6) {
            lv = 6;
        }
        switch (lv) {
            case 0:
                str = "v0";
                break;
            case 1:
                str = "v1";
                break;
            case 2:
                str = "v2";
                break;
            case 3:
                str = "v3";
                break;
            case 4:
                str = "v4";
                break;
            case 5:
                str = "v5";
                break;
            case 6:
                str = "v6";
                break;
        }
        return str;
    };
    GameScene.prototype.getVipItemIcon = function (itemtype) {
        var str = "qqbggift";
        switch (itemtype) {
            case 4:
                str = "duihuan_icon_3";
                break;
            case 10:
                str = "qqbggift";
                break;
        }
        return str;
    };
    GameScene.prototype.btnVipBuy = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            if (GameUtils.VipBean.vip - 1 >= btnid) {
                this.vipBuyIndex = btnid;
                if (!GameUtils.VipBean.is_expire) {
                    var sendobj = { cmd: 213, player_token: GameUtils.playerToken, qq_vip: GameUtils.VipBean.vip, gift_type: GameUtils.VipBean.items[btnid].gift_type, return_json: 1 };
                    NetWorkUtils.sendNetPostRequest(sendobj, this.getVipBuyComplete, this.onPostIOError, this, this);
                }
                else {
                    this.jumptoast = new DrawUtils();
                    this.jumptoast.createTiaoZhuanTishi("coverimg_json", "tishikuang1", "VIP失效请充值", this.vipGotoShop, this);
                    this.addChild(this.jumptoast);
                }
            }
            else {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", "VIP等级不足");
                this.addChild(tishi);
            }
        }
    };
    GameScene.prototype.getVipBuyComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_213.k", event);
        // GameUtils.debugLog(obj);
        if (obj.result == 1) {
            this.btnVipBuyArr[this.vipBuyIndex].texture = this.shopimgSheet.getTexture("btnvip_buy_1");
            this.btnVipBuyArr[this.vipBuyIndex].touchEnabled = false;
        }
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
        this.addChild(tishi);
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.btnVipswitchToShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.vipLayer) {
            this.vipLayer.removeChildren();
            if (this.vipLayer.parent) {
                this.vipLayer.parent.removeChild(this.vipLayer);
            }
        }
        this.drawVipDes(1);
    };
    GameScene.prototype.btnVipswitchToGift = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.vipLayer) {
            this.vipLayer.removeChildren();
            if (this.vipLayer.parent) {
                this.vipLayer.parent.removeChild(this.vipLayer);
            }
        }
        this.drawVipDes(0);
    };
    GameScene.prototype.btnVipLingqu = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (!GameUtils.VipBean.is_expire) {
            var sendobj = { cmd: 212, player_token: GameUtils.playerToken, qq_vip: GameUtils.VipBean.vip, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendobj, this.getVipLingquComplete, this.onPostIOError, this, this);
        }
        else {
            this.jumptoast = new DrawUtils();
            this.jumptoast.createTiaoZhuanTishi("coverimg_json", "tishikuang1", "VIP失效请充值", this.vipGotoShop, this);
            this.addChild(this.jumptoast);
        }
    };
    GameScene.prototype.vipGotoShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.jumptoast) {
            this.jumptoast.removeChildren();
            if (this.jumptoast.parent) {
                this.jumptoast.parent.removeChild(this.jumptoast);
            }
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
        this.gotoShangChengDaoju();
    };
    GameScene.prototype.getVipLingquComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_212.k", event);
        // GameUtils.debugLog(obj);
        if (obj.result == 1) {
            this.vipLingquBtn.texture = this.shopimgSheet.getTexture("btnvip_lingqu_1");
            this.vipLingquBtn.touchEnabled = false;
        }
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
        this.addChild(tishi);
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.closeVipShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
    };
    /**
     * 绘制活动商店
     */
    GameScene.prototype.drawHuodongShop = function () {
        var alphaspr = new egret.Shape;
        alphaspr.graphics.beginFill(0x000000, 0.3);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.touchEnabled = true;
        this.shouchongLayer.addChild(alphaspr);
        var itembg_w = GameUtils.SCREEN_W - 40;
        var itembg_h = 120;
        var iconbg_spacing = 20;
        var bg_h = itembg_h * 3 + iconbg_spacing * 2 + 30 * 2;
        var bg_x = 10;
        var bg_y = (GameUtils.SCREEN_H - bg_h) / 2;
        var itembg_x = (GameUtils.SCREEN_W - itembg_w) / 2;
        var itembg_y = bg_y + 30;
        var bg = new egret.Bitmap();
        bg.texture = this.shopimgSheet.getTexture("huodongshopbg_0");
        bg.x = bg_x;
        bg.y = bg_y;
        this.shouchongLayer.addChild(bg);
        var bgGrid = new egret.Rectangle(30, 30, 30, 30);
        bg.scale9Grid = bgGrid;
        bg.width = GameUtils.SCREEN_W - 20;
        bg.height = bg_h;
        var title = new egret.Bitmap();
        title.texture = this.shopimgSheet.getTexture("huodongshoptitle");
        title.x = (GameUtils.SCREEN_W - 280) / 2;
        title.y = bg_y - 80;
        this.shouchongLayer.addChild(title);
        var bgsprite = new egret.Sprite();
        this.shouchongLayer.addChild(bgsprite);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(bgsprite);
        myscrollView.x = bg_x;
        myscrollView.y = itembg_y;
        myscrollView.width = GameUtils.SCREEN_W - bg_x * 2;
        myscrollView.height = itembg_h * 3 + iconbg_spacing * 2 + 5;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.shouchongLayer.addChild(myscrollView);
        for (var i = 0; i < GameUtils.huodongShopGoodsList.length; i++) {
            var iconbg = new egret.Bitmap();
            iconbg.texture = this.shopimgSheet.getTexture("huodongshopbg_1");
            iconbg.x = 10;
            iconbg.y = (itembg_h + iconbg_spacing) * i;
            bgsprite.addChild(iconbg);
            var iconbgGrid = new egret.Rectangle(30, 30, 30, 30);
            iconbg.scale9Grid = iconbgGrid;
            iconbg.width = itembg_w;
            iconbg.height = itembg_h;
            var iconid = i;
            if (i > 2) {
                iconid = 2;
            }
            var icon = new egret.Bitmap();
            icon.texture = this.shopimgSheet.getTexture("huodongshopicon" + iconid);
            icon.x = 10 + 13;
            icon.y = 16 + (itembg_h + iconbg_spacing) * i;
            bgsprite.addChild(icon);
            var name = new egret.TextField();
            name.text = "" + GameUtils.huodongShopGoodsList[i].shopl_name;
            name.x = 23 + 110;
            name.y = 16 + (itembg_h + iconbg_spacing) * i;
            name.size = GameUtils.TEXT_SIZE_SMALL;
            name.textColor = 0xff0000;
            bgsprite.addChild(name);
            var des = new egret.TextField();
            des.text = "" + GameUtils.huodongShopGoodsList[i].shopl_description;
            des.x = 23 + 110;
            des.y = 16 + (itembg_h + iconbg_spacing) * i + 30;
            des.size = GameUtils.TEXT_SIZE_SMALL;
            des.textColor = 0x000000;
            bgsprite.addChild(des);
            des.width = 250;
            des.lineSpacing = 3;
            var btn = new egret.Bitmap();
            btn.texture = this.shopimgSheet.getTexture("shopbuybtn0");
            btn.x = 10 + itembg_w - 98 - 20;
            btn.y = (itembg_h - 36) / 2 + (itembg_h + iconbg_spacing) * i;
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyHuodongshopBtn, this);
            btn.name = "" + i;
            bgsprite.addChild(btn);
            var shopmoneyicon = new egret.Bitmap();
            shopmoneyicon.texture = this.shopimgSheet.getTexture("shopmoneyicon2");
            shopmoneyicon.x = 10 + itembg_w - 98;
            shopmoneyicon.y = (itembg_h - 36) / 2 + 6 + (itembg_h + iconbg_spacing) * i;
            bgsprite.addChild(shopmoneyicon);
            var buynum = new egret.BitmapText();
            buynum.font = RES.getRes("shopnum_fnt");
            buynum.text = "" + GameUtils.huodongShopGoodsList[i].shopl_price;
            buynum.x = 10 + itembg_w - 98 + 30;
            buynum.y = (itembg_h - 36) / 2 + 10 + (itembg_h + iconbg_spacing) * i;
            bgsprite.addChild(buynum);
        }
        var huodongshopclosebtn = new egret.Bitmap();
        huodongshopclosebtn.texture = this.coverimgSheet.getTexture("closemenu");
        huodongshopclosebtn.x = GameUtils.SCREEN_W - 10 - 54;
        huodongshopclosebtn.y = bg_y - 30;
        huodongshopclosebtn.touchEnabled = true;
        huodongshopclosebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHuodongShop, this);
        this.shouchongLayer.addChild(huodongshopclosebtn);
    };
    GameScene.prototype.buyHuodongshopBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            // console.log(btnid);
            if (GameUtils.huodongShopGoodsList[btnid].shopl_item_code) {
                this.mtaBuyBtnId = btnid;
                var sendpayobj = {
                    cmd: 113,
                    player_token: GameUtils.playerToken,
                    item_id: GameUtils.huodongShopGoodsList[btnid].shopl_id,
                    hlmy_gw: GameUtils.hlmy_gw,
                    item_code: GameUtils.huodongShopGoodsList[btnid].shopl_item_code, return_json: 1
                };
                // console.log( "item_code    "+ GameUtils.huodongShopGoodsList[btnid].shopl_item_code);
                NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayHuodongShopComplete, this.onPostIOError, this, this);
            }
        }
    };
    GameScene.prototype.getPayHuodongShopComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        // console.log(obj);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                    }
                }
            });
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
    };
    GameScene.prototype.closeHuodongShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shouchongLayer) {
            this.shouchongLayer.removeChildren();
        }
    };
    GameScene.prototype.btnShowHuodongShop = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawHuodongShop();
    };
    GameScene.prototype.btnGotoQQcoin = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var obj = { name: "qqcoin" };
        HlmyUtils.HlmyExecute(obj);
    };
    GameScene.prototype.btnGotoXingquBuluo = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var obj = { name: "buluo" };
        HlmyUtils.HlmyExecute(obj);
    };
    /**
     * 周末礼包
     */
    GameScene.prototype.btnShowWeekendBg = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.showWeekEndToast();
    };
    GameScene.prototype.showWeekEndToast = function () {
        this.toastBgLayer = new egret.Sprite();
        this.toastBgLayer.graphics.beginFill(0x000000, 0);
        this.toastBgLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.toastBgLayer.graphics.endFill();
        this.toastBgLayer.width = GameUtils.SCREEN_W;
        this.toastBgLayer.height = GameUtils.SCREEN_H - 82;
        this.addChild(this.toastBgLayer);
        this.toastBgLayer.touchEnabled = true;
        var toastalpha = new egret.Sprite();
        toastalpha.graphics.beginFill(0x000000, 1);
        toastalpha.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        toastalpha.graphics.endFill();
        toastalpha.width = GameUtils.SCREEN_W;
        toastalpha.height = GameUtils.SCREEN_H;
        toastalpha.alpha = 0.7;
        this.toastBgLayer.addChild(toastalpha);
        toastalpha.touchEnabled = true;
        var kuang_w = 500;
        var kuang_h = 300;
        this.toastLayer = new egret.Sprite();
        this.toastLayer.alpha = 0;
        this.toastLayer.scaleX = 0.02;
        this.toastLayer.scaleY = 0.02;
        this.toastLayer.x = (GameUtils.SCREEN_W) / 2;
        this.toastLayer.y = (GameUtils.SCREEN_H) / 2;
        this.toastLayer.width = kuang_w;
        this.toastLayer.height = kuang_h;
        this.toastLayer.anchorOffsetX = kuang_w / 2;
        this.toastLayer.anchorOffsetY = kuang_h / 2;
        this.addChild(this.toastLayer);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var kuang = new egret.Bitmap();
        kuang.texture = this.gameimgSheet.getTexture("qqbg_bg");
        kuang.x = 0;
        kuang.y = 0;
        this.toastLayer.addChild(kuang);
        var kuangscaleGrid = new egret.Rectangle(54, 54, 54, 54);
        kuang.scale9Grid = kuangscaleGrid;
        kuang.width = kuang_w;
        kuang.height = kuang_h + 20;
        var title = new egret.Bitmap();
        title.texture = this.gameimgSheet.getTexture("weekendtitle");
        title.x = (kuang_w - 166) / 2;
        title.y = 20;
        this.toastLayer.addChild(title);
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawRect(8, 84, kuang_w - 16, 36);
        shp.graphics.endFill();
        shp.alpha = 0.2;
        this.toastLayer.addChild(shp);
        var toast1 = new egret.TextField();
        toast1.textColor = 0xff0000;
        toast1.size = 20;
        toast1.text = "每周六，周日登录游戏即可领取周末礼包";
        toast1.x = 0;
        toast1.y = 90;
        toast1.width = kuang_w;
        this.toastLayer.addChild(toast1);
        toast1.textAlign = egret.HorizontalAlign.CENTER;
        var qqbggift = new egret.Bitmap();
        qqbggift.texture = this.gameimgSheet.getTexture("qqbggift");
        qqbggift.x = (kuang_w - 88) / 2;
        qqbggift.y = 155;
        this.toastLayer.addChild(qqbggift);
        var giftnum = new egret.TextField();
        giftnum.x = (kuang_w - 88) / 2;
        giftnum.y = 155 + 88 + 10;
        giftnum.textColor = 0xff0000;
        giftnum.size = 24;
        giftnum.text = "+8";
        this.toastLayer.addChild(giftnum);
        giftnum.width = 88;
        giftnum.textAlign = egret.HorizontalAlign.CENTER;
        if (this.isWeekEnd) {
            var okbtn = new egret.Bitmap();
            okbtn.texture = this.gameimgSheet.getTexture("lingqubtn");
            okbtn.x = (kuang_w - 126) / 2;
            okbtn.y = kuang_h - 10;
            this.toastLayer.addChild(okbtn);
            okbtn.touchEnabled = true;
            okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.weekendOK, this);
        }
        else {
            var clear = new egret.Bitmap();
            clear.texture = this.gameimgSheet.getTexture("qqbg_close");
            clear.x = kuang_w - 40;
            clear.y = -10;
            this.toastLayer.addChild(clear);
            clear.touchEnabled = true;
            clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearWeekEndToastLayer, this);
        }
    };
    GameScene.prototype.weekendOK = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.toastLayer) {
            this.toastLayer.removeChildren();
            if (this.toastLayer.parent) {
                this.toastLayer.parent.removeChild(this.toastLayer);
            }
        }
        if (this.toastBgLayer) {
            this.toastBgLayer.removeChildren();
            if (this.toastBgLayer.parent) {
                this.toastBgLayer.parent.removeChild(this.toastBgLayer);
            }
        }
        NetWorkUtils.sendSimpleNetPostRequest(210, this.getWeekEndComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getWeekEndComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_210.k", event);
        if (obj.result == 1) {
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
                NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
            }
        }
    };
    GameScene.prototype.clearWeekEndToastLayer = function () {
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.toastLayer) {
                this.toastLayer.removeChildren();
                if (this.toastLayer.parent) {
                    this.toastLayer.parent.removeChild(this.toastLayer);
                }
            }
            if (this.toastBgLayer) {
                this.toastBgLayer.removeChildren();
                if (this.toastBgLayer.parent) {
                    this.toastBgLayer.parent.removeChild(this.toastBgLayer);
                }
            }
        }, this);
    };
    GameScene.prototype.qqbackgroundCallBack = function () {
        //        alert("发送208消息");
        NetWorkUtils.sendSimpleNetPostRequest(209, this.getQQbackgroundComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getQQbackgroundComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_209.k", event);
        if (obj.result == 1) {
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
                NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
            }
        }
    };
    GameScene.prototype.btnShowQQbg = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.showQQbgToast();
    };
    GameScene.prototype.showQQbgToast = function () {
        this.toastBgLayer = new egret.Sprite();
        this.toastBgLayer.graphics.beginFill(0x000000, 0);
        this.toastBgLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.toastBgLayer.graphics.endFill();
        this.toastBgLayer.width = GameUtils.SCREEN_W;
        this.toastBgLayer.height = GameUtils.SCREEN_H - 82;
        this.addChild(this.toastBgLayer);
        this.toastBgLayer.touchEnabled = true;
        var toastalpha = new egret.Sprite();
        toastalpha.graphics.beginFill(0x000000, 1);
        toastalpha.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        toastalpha.graphics.endFill();
        toastalpha.width = GameUtils.SCREEN_W;
        toastalpha.height = GameUtils.SCREEN_H;
        toastalpha.alpha = 0.7;
        this.toastBgLayer.addChild(toastalpha);
        toastalpha.touchEnabled = true;
        var kuang_w = 500;
        var kuang_h = 320;
        this.toastLayer = new egret.Sprite();
        this.toastLayer.alpha = 0;
        this.toastLayer.scaleX = 0.02;
        this.toastLayer.scaleY = 0.02;
        this.toastLayer.x = (GameUtils.SCREEN_W) / 2;
        this.toastLayer.y = (GameUtils.SCREEN_H) / 2;
        this.toastLayer.width = kuang_w;
        this.toastLayer.height = kuang_h;
        this.toastLayer.anchorOffsetX = kuang_w / 2;
        this.toastLayer.anchorOffsetY = kuang_h / 2;
        this.addChild(this.toastLayer);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var kuang = new egret.Bitmap();
        kuang.texture = this.gameimgSheet.getTexture("qqbg_bg");
        kuang.x = 0;
        kuang.y = 0;
        this.toastLayer.addChild(kuang);
        var kuangscaleGrid = new egret.Rectangle(54, 54, 54, 54);
        kuang.scale9Grid = kuangscaleGrid;
        kuang.width = kuang_w;
        kuang.height = kuang_h + 20;
        var title = new egret.Bitmap();
        title.texture = this.gameimgSheet.getTexture("qqbgtitle");
        title.x = (kuang_w - 434) / 2;
        title.y = 20;
        this.toastLayer.addChild(title);
        var qqbgtitle_2 = new egret.Bitmap();
        qqbgtitle_2.texture = this.gameimgSheet.getTexture("qqbgtitle_2");
        qqbgtitle_2.x = (kuang_w - 374) / 2;
        qqbgtitle_2.y = 20 + 70;
        this.toastLayer.addChild(qqbgtitle_2);
        var gift_W = 50;
        var gift_x = (kuang_w - 88 * 2 - gift_W) / 2;
        var qqbggift = new egret.Bitmap();
        qqbggift.texture = this.gameimgSheet.getTexture("qqbggift");
        qqbggift.x = gift_x;
        qqbggift.y = 174;
        this.toastLayer.addChild(qqbggift);
        var giftnum_1 = new egret.TextField();
        giftnum_1.x = gift_x;
        giftnum_1.y = 174 + 88 + 10;
        giftnum_1.textColor = 0xff0000;
        giftnum_1.size = 24;
        giftnum_1.text = "+10";
        this.toastLayer.addChild(giftnum_1);
        giftnum_1.width = 88;
        giftnum_1.textAlign = egret.HorizontalAlign.CENTER;
        var qqbggift_2 = new egret.Bitmap();
        qqbggift_2.texture = this.gameimgSheet.getTexture("duihuan_icon_3");
        qqbggift_2.x = gift_x + 88 + gift_W;
        qqbggift_2.y = 174;
        this.toastLayer.addChild(qqbggift_2);
        var giftnum_2 = new egret.TextField();
        giftnum_2.x = gift_x + 88 + gift_W;
        giftnum_2.y = 174 + 88 + 10;
        giftnum_2.textColor = 0xff0000;
        giftnum_2.size = 24;
        giftnum_2.text = "+2";
        this.toastLayer.addChild(giftnum_2);
        giftnum_2.width = 88;
        giftnum_2.textAlign = egret.HorizontalAlign.CENTER;
        var clear = new egret.Bitmap();
        clear.texture = this.gameimgSheet.getTexture("qqbg_close");
        clear.x = kuang_w - 40;
        clear.y = -10;
        this.toastLayer.addChild(clear);
        clear.touchEnabled = true;
        clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearQQbgToastLayer, this);
        var okbtn = new egret.Bitmap();
        okbtn.texture = this.gameimgSheet.getTexture("qqbgbtn");
        okbtn.x = (kuang_w - 126) / 2;
        okbtn.y = kuang_h - 10;
        this.toastLayer.addChild(okbtn);
        okbtn.touchEnabled = true;
        okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qqbgOK, this);
    };
    GameScene.prototype.qqbgOK = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.toastLayer) {
            this.toastLayer.removeChildren();
            if (this.toastLayer.parent) {
                this.toastLayer.parent.removeChild(this.toastLayer);
            }
        }
        if (this.toastBgLayer) {
            this.toastBgLayer.removeChildren();
            if (this.toastBgLayer.parent) {
                this.toastBgLayer.parent.removeChild(this.toastBgLayer);
            }
        }
        //统计
        var obj = {
            name: "cover", callback: function (result) {
                if (result == 1) {
                    var callBackEvent = new JsCallBackEvent.CallBack();
                    callBackEvent.qqBackgroundCallBack();
                }
            }
        };
        HlmyUtils.HlmyExecute(obj);
    };
    GameScene.prototype.clearQQbgToastLayer = function () {
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.toastLayer) {
                this.toastLayer.removeChildren();
                if (this.toastLayer.parent) {
                    this.toastLayer.parent.removeChild(this.toastLayer);
                }
            }
            if (this.toastBgLayer) {
                this.toastBgLayer.removeChildren();
                if (this.toastBgLayer.parent) {
                    this.toastBgLayer.parent.removeChild(this.toastBgLayer);
                }
            }
        }, this);
    };
    GameScene.prototype.btnFace = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var face = {
            "appKey": GameUtils.APPKEY_1758,
            "hlmy_gw": GameUtils.hlmy_gw,
            "gid": GameUtils.playerGid
        };
        HlmyUtils.HlmyFace(face);
        // console.log("人脸融合SDK");
    };
    GameScene.prototype.btnShowGiftBag = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawTishiShouChong(3);
    };
    GameScene.prototype.btnLiBao = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawTishiShouChong(2);
    };
    GameScene.prototype.btnShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.GAMESTAGE_NOW = this.GAMESTAGE_SHOP;
        this.clearMenu();
        this.drawMenu();
        this.clearMenuScene(this.GAMESTAGE_NOW);
        this.shopscene = new ShopScene(this);
        this.addChild(this.shopscene);
    };
    GameScene.prototype.ShortcutCallBack = function () {
        //        alert("发送208消息");
        NetWorkUtils.sendSimpleNetPostRequest(208, this.getShortcutComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.onShortCutTimer = function (evt) {
        if (!this.isShowShortCutToast && GameUtils.addShortcut && GameUtils.playerBean.player_sent_desk == 0) {
            this.showShortCutToast();
        }
    };
    GameScene.prototype.showShortCutToast = function () {
        this.isShowShortCutToast = true;
        this.toastBgLayer = new egret.Sprite();
        this.toastBgLayer.graphics.beginFill(0x000000, 1);
        this.toastBgLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.toastBgLayer.graphics.endFill();
        this.toastBgLayer.width = GameUtils.SCREEN_W;
        this.toastBgLayer.height = GameUtils.SCREEN_H - 82;
        this.toastBgLayer.alpha = 0.0;
        this.addChild(this.toastBgLayer);
        this.toastBgLayer.touchEnabled = true;
        var kuang_w = 400;
        var kuang_h = 220;
        this.toastLayer = new egret.Sprite();
        this.toastLayer.alpha = 0;
        this.toastLayer.scaleX = 0.02;
        this.toastLayer.scaleY = 0.02;
        this.toastLayer.x = (GameUtils.SCREEN_W) / 2;
        this.toastLayer.y = (GameUtils.SCREEN_H) / 2;
        this.toastLayer.width = kuang_w;
        this.toastLayer.height = kuang_h;
        this.toastLayer.anchorOffsetX = kuang_w / 2;
        this.toastLayer.anchorOffsetY = kuang_h / 2;
        this.addChild(this.toastLayer);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var kuang = new egret.Bitmap();
        kuang.texture = this.coverimgSheet.getTexture("tishikuang1");
        kuang.x = 0;
        kuang.y = 0;
        this.toastLayer.addChild(kuang);
        var kuangscaleGrid = new egret.Rectangle(34, 34, 34, 34);
        kuang.scale9Grid = kuangscaleGrid;
        kuang.width = kuang_w;
        kuang.height = kuang_h + 20;
        var text_w = 24 * 8;
        var toast1 = new egret.TextField();
        toast1.textColor = 0xff0000;
        toast1.size = GameUtils.TEXT_SIZE_MIDDLE;
        toast1.text = "首次添加游戏到桌";
        text_w = toast1.textWidth;
        toast1.x = (kuang_w - text_w) / 2;
        toast1.y = 90;
        this.toastLayer.addChild(toast1);
        var toast2 = new egret.TextField();
        toast2.x = (kuang_w - text_w) / 2;
        toast2.y = 130;
        toast2.textColor = 0xff0000;
        toast2.size = GameUtils.TEXT_SIZE_MIDDLE;
        toast2.text = "面可得奖励：5";
        this.toastLayer.addChild(toast2);
        var xin = new egret.Bitmap();
        xin.texture = this.gameimgSheet.getTexture("tili1");
        xin.x = (kuang_w - text_w) / 2 + toast2.textWidth + 5;
        xin.y = 130;
        this.toastLayer.addChild(xin);
        var clear = new egret.Bitmap();
        clear.texture = this.coverimgSheet.getTexture("closemenu");
        clear.x = 400 - 54;
        clear.y = 2;
        this.toastLayer.addChild(clear);
        clear.touchEnabled = true;
        clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearShortCutToastLayer, this);
        var okbtn = new egret.Bitmap();
        okbtn.texture = this.coverimgSheet.getTexture("ok1");
        okbtn.x = (kuang_w - 124) / 2;
        okbtn.y = kuang_h - 10;
        this.toastLayer.addChild(okbtn);
        okbtn.touchEnabled = true;
        okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shortcutOK, this);
    };
    GameScene.prototype.shortcutOK = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.isShowShortCutToast = false;
        if (this.toastLayer) {
            this.toastLayer.removeChildren();
            if (this.toastLayer.parent) {
                this.toastLayer.parent.removeChild(this.toastLayer);
            }
        }
        if (this.toastBgLayer) {
            this.toastBgLayer.removeChildren();
            if (this.toastBgLayer.parent) {
                this.toastBgLayer.parent.removeChild(this.toastBgLayer);
            }
        }
        //统计
        var obj = {
            name: "addShortcut", callback: function (result) {
                if (result == 1) {
                    var callBackEvent = new JsCallBackEvent.CallBack();
                    callBackEvent.addshortcutCallBack();
                }
            }
        };
        HlmyUtils.HlmyExecute(obj);
    };
    GameScene.prototype.clearShortCutToastLayer = function () {
        this.isShowShortCutToast = false;
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.toastLayer) {
                this.toastLayer.removeChildren();
                if (this.toastLayer.parent) {
                    this.toastLayer.parent.removeChild(this.toastLayer);
                }
            }
            if (this.toastBgLayer) {
                this.toastBgLayer.removeChildren();
                if (this.toastBgLayer.parent) {
                    this.toastBgLayer.parent.removeChild(this.toastBgLayer);
                }
            }
        }, this);
    };
    GameScene.prototype.addShortcut = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.showShortCutToast();
    };
    GameScene.prototype.getShortcutComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_208.k", event);
        if (obj.result == 1) {
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
                NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
            }
        }
    };
    GameScene.prototype.mianshi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawTishiShouChong(1);
    };
    GameScene.prototype.share = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var reward = new Array("分享可得：", "体力奖励");
        HlmyUtils.HlmySetShareInfo({ "state": GameUtils.MYAPPKEY_1758, "tipInfo": true, "reward": reward, "appKey": GameUtils.APPKEY_1758, "gid": GameUtils.playerGid });
        // NetWorkUtils.sendSimpleNetPostRequest(109, this.getshareComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getshareComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showshare = new DrawUtils();
        showshare.drawShare();
        this.addChild(showshare);
    };
    GameScene.prototype.yaoqing = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getsharelistComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.addChild(showsharelist);
    };
    GameScene.prototype.BtnDeathShouChong = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (GameUtils.SHOUCHONG_GOODS_ID != -1) {
            var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: GameUtils.SHOUCHONG_GOODS_ID, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayShouChongComplete, this.onPostIOError, this, this);
        }
        else {
            if (this.GAMESTAGE_NOW != this.GAMESTAGE_SHOP) {
                this.GAMESTAGE_NOW = this.GAMESTAGE_SHOP;
                this.drawMenu();
                this.clearMenuScene(this.GAMESTAGE_NOW);
                this.shopscene = new ShopScene(this);
                this.addChild(this.shopscene);
            }
        }
    };
    GameScene.prototype.shouchongTishi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawTishiShouChong(0);
    };
    GameScene.prototype.gotoGuanzhu = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_GAMEFOLLOW)) {
            GameUtils.dateEventSprite.addEventListener(EventData.DATA_GAMEFOLLOW, this.callBackGameFollow, this);
        }
        GameUtils.checkFollowSceneType = 0;
        HlmyUtils.HlmyCheckFollow();
    };
    GameScene.prototype.callBackGameFollow = function (event) {
        if (GameUtils.checkFollow == 1) {
            NetWorkUtils.sendSimpleNetPostRequest(803, this.getGuanZhuComplete, this.onPostIOError, this, this);
        }
        else {
            HlmyUtils.HlmyFollow();
        }
        if (GameUtils.dateEventSprite.hasEventListener(EventData.DATA_LISTFOLLOW)) {
            GameUtils.dateEventSprite.removeEventListener(EventData.DATA_LISTFOLLOW, this.callBackGameFollow, this);
        }
    };
    GameScene.prototype.gotoHuoDongList = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_DIANWO) {
            this.GAMESTAGE_NOW = this.GAMESTAGE_DIANWO;
            this.clearMenu();
            this.drawMenu();
            this.clearMenuScene(this.GAMESTAGE_NOW);
            this.huodongscene = new HuoDongScene(this);
            this.addChild(this.huodongscene);
        }
    };
    GameScene.prototype.getGuanZhuComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_803.k", event);
        if (obj.result == 1) {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
        }
        else {
            HlmyUtils.HlmyFollow();
        }
    };
    //    private backbtn(evt: egret.TouchEvent){
    //        if(GameUtils.gameSandPause) {
    //            return;
    //        }
    //        if(this.backgroup.length > 0) {
    //            this.scencindex = this.backgroup.pop();
    //            if(this.allGameObj[this.scencindex]) {
    //                this.changeGameScene();
    //            }
    //        }
    //    }
    GameScene.prototype.drawMenu = function () {
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("menubar");
        ditu.x = 0;
        ditu.y = GameUtils.SCREEN_H - 82;
        this.menulayer.addChild(ditu);
        if (GameUtils.isShopDiscounts) {
            this.btnarr_0[4] = "menu_9_h";
            this.btnarr_1[4] = "menu_8_h";
        }
        var menu_num = 6;
        var drawinde = 0;
        if (GameUtils.noFriend) {
            menu_num--;
            drawinde++;
        }
        if (GameUtils.noRank) {
            menu_num--;
            drawinde++;
        }
        var img_w = (GameUtils.SCREEN_W - 74 * (menu_num)) / (menu_num + 1);
        var img_W = 74 + img_w;
        var img_y = GameUtils.SCREEN_H - 76;
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                if (!GameUtils.noRank) {
                    var menubarBtn = new egret.Bitmap();
                    menubarBtn.texture = this.gameimgSheet.getTexture(this.GAMESTAGE_NOW == i ? this.btnarr_0[i] : this.btnarr_1[i]);
                    menubarBtn.name = "" + i;
                    menubarBtn.x = img_w + img_W * i;
                    menubarBtn.y = img_y;
                    this.menulayer.addChild(menubarBtn);
                    menubarBtn.touchEnabled = true;
                    menubarBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menubarBtn, this);
                }
            }
            else if (i == 1) {
                if (!GameUtils.noFriend) {
                    var menubarBtn = new egret.Bitmap();
                    menubarBtn.texture = this.gameimgSheet.getTexture(this.GAMESTAGE_NOW == i ? this.btnarr_0[i] : this.btnarr_1[i]);
                    menubarBtn.name = "" + i;
                    menubarBtn.x = img_w + img_W * (i - drawinde);
                    menubarBtn.y = img_y;
                    this.menulayer.addChild(menubarBtn);
                    menubarBtn.touchEnabled = true;
                    menubarBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menubarBtn, this);
                }
            }
            else {
                var menubarBtn = new egret.Bitmap();
                menubarBtn.texture = this.gameimgSheet.getTexture(this.GAMESTAGE_NOW == i ? this.btnarr_0[i] : this.btnarr_1[i]);
                menubarBtn.name = "" + i;
                menubarBtn.x = img_w + img_W * (i - drawinde);
                menubarBtn.y = img_y;
                this.menulayer.addChild(menubarBtn);
                menubarBtn.touchEnabled = true;
                menubarBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menubarBtn, this);
            }
        }
    };
    GameScene.prototype.menubarBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            this.menubtn_id = parseInt(btn.name);
            if (this.menubtn_id != this.GAMESTAGE_NOW) {
                //统计
                var m_name = "test";
                if (this.menubtn_id == this.GAMESTAGE_MENU) {
                    m_name = "shuxing";
                    NetWorkUtils.sendSimpleNetPostRequest(100, this.getCompleteToCaidan, this.onPostIOError, this, this);
                }
                else if (this.menubtn_id == this.GAMESTAGE_FRIEND) {
                    m_name = "haoyou";
                    NetWorkUtils.sendSimpleNetPostRequest(101, this.getFriendListComplete, this.onPostIOError, this, this);
                }
                else if (this.menubtn_id == this.GAMESTAGE_DIANWO) {
                    m_name = "dianwo";
                    this.GAMESTAGE_NOW = this.menubtn_id;
                    this.clearMenu();
                    this.drawMenu();
                    this.clearMenuScene(this.GAMESTAGE_NOW);
                    this.huodongscene = new HuoDongScene(this);
                    this.addChild(this.huodongscene);
                }
                else if (this.menubtn_id == this.GAMESTAGE_PAIHANG) {
                    m_name = "paihang";
                    NetWorkUtils.sendSimpleNetPostRequest(107, this.getPaiHangMeili, this.onPostIOError, this, this);
                }
                else if (this.menubtn_id == this.GAMESTAGE_SHOP) {
                    m_name = "shangcheng";
                    this.GAMESTAGE_NOW = this.menubtn_id;
                    this.clearMenu();
                    this.drawMenu();
                    this.clearMenuScene(this.GAMESTAGE_NOW);
                    this.shopscene = new ShopScene(this);
                    this.addChild(this.shopscene);
                }
                else if (this.menubtn_id == this.GAMESTAGE_JUQING) {
                    m_name = "juqing";
                    this.GAMESTAGE_NOW = this.menubtn_id;
                    this.clearMenu();
                    this.drawMenu();
                    this.clearMenuScene(this.GAMESTAGE_NOW);
                    this.RefreshMoney();
                }
                if (m_name != "test") {
                }
            }
        }
    };
    GameScene.prototype.clearMenu = function () {
        if (this.menulayer) {
            this.menulayer.removeChildren();
        }
    };
    GameScene.prototype.gotoProperty = function () {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getCompleteToCaidan, this.onPostIOError, this, this);
    };
    GameScene.prototype.getCompleteToCaidan = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            this.GAMESTAGE_NOW = this.GAMESTAGE_MENU;
            this.clearMenu();
            this.drawMenu();
            this.clearMenuScene(this.GAMESTAGE_NOW);
            this.propertyscene = new PropertyScene(this.gamescene);
            this.addChild(this.propertyscene);
        }
    };
    GameScene.prototype.getFriendListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_101.k", event);
        //        console.log(obj);
        if (obj.friends) {
            if (obj.friends.length > 0) {
                GameUtils.friendBeanList = new Array();
                for (var i = 0; i < obj.friends.length; i++) {
                    GameUtils.friendBeanList.push(new FriendListBean(obj.friends[i]));
                }
                GameUtils.friendBeanList.sort(function (a, b) {
                    return b.friendl_meilizhi - a.friendl_meilizhi;
                });
            }
        }
        this.GAMESTAGE_NOW = this.GAMESTAGE_FRIEND;
        this.clearMenu();
        this.drawMenu();
        this.clearMenuScene(this.GAMESTAGE_NOW);
        this.friendScene = new FriendScene(this.gamescene, 0);
        this.addChild(this.friendScene);
    };
    GameScene.prototype.getPaiHangMeili = function (event) {
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
        this.GAMESTAGE_NOW = this.GAMESTAGE_PAIHANG;
        this.clearMenu();
        this.drawMenu();
        this.clearMenuScene(this.GAMESTAGE_NOW);
        this.paihangscene = new RankScene(this.gamescene);
        this.addChild(this.paihangscene);
    };
    GameScene.prototype.gotoFriendNoSendMsg = function () {
        this.GAMESTAGE_NOW = this.GAMESTAGE_FRIEND;
        this.clearMenu();
        this.drawMenu();
        this.clearMenuScene(this.GAMESTAGE_NOW);
        this.friendScene = new FriendScene(this.gamescene, 1);
        this.addChild(this.friendScene);
    };
    GameScene.prototype.gotoFriend = function () {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_FRIEND) {
            NetWorkUtils.sendSimpleNetPostRequest(101, this.getFriendListComplete, this.onPostIOError, this, this);
        }
    };
    GameScene.prototype.gotoShangChengDaoju = function () {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_SHOP) {
            this.GAMESTAGE_NOW = this.GAMESTAGE_SHOP;
            this.drawMenu();
            this.clearMenuScene(this.GAMESTAGE_NOW);
            this.shopscene = new ShopScene(this);
            this.addChild(this.shopscene);
        }
    };
    GameScene.prototype.gotoShangChengChongzhi = function () {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_SHOP) {
            this.GAMESTAGE_NOW = this.GAMESTAGE_SHOP;
            this.drawMenu();
            this.clearMenuScene(this.GAMESTAGE_NOW);
            this.shopscene = new ShopScene(this);
            this.addChild(this.shopscene);
        }
    };
    GameScene.prototype.backJuQing = function () {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_JUQING) {
            this.GAMESTAGE_NOW = this.GAMESTAGE_JUQING;
            this.drawMenu();
            this.clearMenuScene(this.GAMESTAGE_NOW);
            this.RefreshMoney();
        }
    };
    GameScene.prototype.clearMenuScene = function (stage) {
        this.clearPropertyScene();
        this.clearFriendScene();
        this.clearShopScene();
        this.clearPaiHangScene();
        this.clearHuoDongScene();
    };
    GameScene.prototype.clearHuoDongScene = function () {
        if (this.huodongscene) {
            this.huodongscene.closeScene();
            if (this.huodongscene.parent) {
                this.huodongscene.parent.removeChild(this.huodongscene);
            }
        }
    };
    GameScene.prototype.clearPaiHangScene = function () {
        if (this.paihangscene) {
            this.paihangscene.closeScene();
            if (this.paihangscene.parent) {
                this.paihangscene.parent.removeChild(this.paihangscene);
            }
        }
    };
    GameScene.prototype.clearPropertyScene = function () {
        if (this.propertyscene) {
            this.propertyscene.closeScene();
            if (this.propertyscene.parent) {
                this.propertyscene.parent.removeChild(this.propertyscene);
            }
        }
    };
    GameScene.prototype.clearShopScene = function () {
        if (this.shopscene) {
            this.shopscene.closeScene();
            if (this.shopscene.parent) {
                this.shopscene.parent.removeChild(this.shopscene);
            }
        }
    };
    GameScene.prototype.clearFriendScene = function () {
        if (this.friendScene) {
            this.friendScene.closeScene();
            if (this.friendScene.parent) {
                this.friendScene.parent.removeChild(this.friendScene);
            }
        }
    };
    GameScene.prototype.closeGameScene = function () {
        this.removeFrameSprListener();
        this.removeChildren();
    };
    GameScene.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    GameScene.prototype.click = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_JUQING) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (TextUtils.gameTextStage) {
            TextUtils.setAllGameDialog();
            this.drawOptions();
            if ("special2" != this.allGameObj[this.scencindex].name
                && "special3" != this.allGameObj[this.scencindex].name) {
                this.showContinueIcon();
            }
            return;
        }
        this.scenelayer.touchEnabled = false;
        if (this.gameshape) {
            this.gameshape.touchEnabled = false;
        }
        if (this.allGameObj[this.scencindex].checker) {
            this.fuhuoindex = this.scencindex;
            var sendcheckerobj = { cmd: 301, player_token: GameUtils.playerToken, checker_id: this.allGameObj[this.scencindex].checker, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendcheckerobj, this.getCheckerComplete, this.checkeronPostIOError, this, this);
        }
        else {
            this.turnTo();
        }
    };
    GameScene.prototype.turnTo = function () {
        if (this.allGameObj[this.scencindex].turn_to) {
            this.scencindex = this.allGameObj[this.scencindex].turn_to;
            this.backgroup.push(this.scencindex);
            if (this.nextscene_num == this.scencindex) {
                if (this.ispreload_ok) {
                    this.nextSceneComplete();
                }
                else {
                    this.showloading = true;
                    this.loading = new LoadingUI();
                    this.addChild(this.loading);
                }
            }
            else {
                if (this.allGameObj[this.scencindex]) {
                    this.changeGameScene();
                }
            }
        }
        else {
            if (GameUtils.sequelUrl != "") {
                this.drawGameOver();
            }
            else {
                this.closeGameScene();
                var produce = new ProductionGroup();
                this.addChild(produce);
            }
        }
    };
    GameScene.prototype.nextSceneComplete = function () {
        this.changeGameScene();
        this.initPreLoad(this.scencindex);
    };
    GameScene.prototype.getCheckerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_301.k", event);
        if (obj.result == 1) {
            this.turnTo();
        }
        else if (obj.result == -1) {
            this.scenelayer.touchEnabled = true;
            if (obj.info) {
                this.drawChecker(obj.info, obj.result);
            }
        }
        else {
            this.scenelayer.touchEnabled = true;
            if (obj.info) {
                this.drawChecker(obj.info, obj.result);
            }
        }
    };
    GameScene.prototype.checkeronPostIOError = function (event) {
        GameUtils.gameSandPause = false;
        if (this.scenelayer) {
            this.scenelayer.touchEnabled = true;
        }
        if (this.gameshape) {
            this.gameshape.touchEnabled = true;
        }
        //        console.log("post error : " + event);
        this.clearNetLoading();
    };
    GameScene.prototype.changeGameScene = function () {
        this.clearPangbai();
        if (this.allGameObj[this.scencindex]) {
            this.drawBackGround();
            this.scenelayer.touchEnabled = true;
            this.clearRoles();
            this.drawRoles();
            this.clearEffect();
            this.drawEffect();
            this.clearDuihuakuang();
            this.clearDialog();
            this.drawDialogue();
            this.clearNameKuang();
            this.drawName();
            this.drawSpecial();
            this.playBgMusic();
        }
        if (this.allGameObj[this.scencindex]) {
            if (this.allGameObj[this.scencindex].trigger_id) {
                var sendtriggerobj = { cmd: 119, player_token: GameUtils.playerToken, trigger_id: this.allGameObj[this.scencindex].trigger_id, return_json: 1 };
                NetWorkUtils.sendNetPostRequest(sendtriggerobj, this.getTriggerComplete, this.onPostIOError, this, this);
            }
        }
        //  var tishi = new DrawUtils();
        // tishi.createTriggerToast("gameimg_json", "obj.name", 1, 3);
        // this.addChild(tishi);
    };
    GameScene.prototype.onShowADTimer = function (evt) {
        HlmyUtils.HLMYCheckAd();
    };
    GameScene.prototype.playAdCallBack = function () {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.drawBtnAD = function () {
        if (GameUtils.checkAd) {
            if (!this.BtnShowAD) {
                this.BtnShowAD = new egret.Bitmap();
                this.BtnShowAD.texture = this.gameimgSheet.getTexture("bt_ad");
                this.BtnShowAD.x = GameUtils.SCREEN_W / 2;
                this.BtnShowAD.y = -100;
                this.BtnShowAD.anchorOffsetX = 34;
                this.BtnShowAD.anchorOffsetY = 28;
                this.btnshowADlayer.addChild(this.BtnShowAD);
                this.BtnShowAD.touchEnabled = true;
                this.BtnShowAD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnPlayAD, this);
                var tween = egret.Tween.get(this.BtnShowAD);
                tween.to({ y: GameUtils.SCREEN_H / 2 }, 2000).to({ scaleX: 1.4, scaleY: 1.4 }, 300).to({ scaleX: 1.0, scaleY: 1.0, x: GameUtils.SCREEN_W - 34 - 10, y: GameUtils.SCREEN_H - 320 }, 500);
                var tween_1 = egret.Tween.get(this.BtnShowAD, { loop: true });
                tween_1.wait(10000).to({ scaleX: 1.4, scaleY: 1.4 }, 300).to({ scaleX: 1.0, scaleY: 1.0 }, 300);
                HlmyUtils.HLMYShowAd(1);
            }
            else {
                if (!this.BtnShowAD.visible) {
                    this.BtnShowAD.x = GameUtils.SCREEN_W / 2;
                    this.BtnShowAD.y = -100;
                    this.BtnShowAD.visible = true;
                    var tween = egret.Tween.get(this.BtnShowAD);
                    tween.to({ y: GameUtils.SCREEN_H / 2 }, 2000).to({ scaleX: 1.4, scaleY: 1.4 }, 300).to({ scaleX: 1.0, scaleY: 1.0, x: GameUtils.SCREEN_W - 34 - 10, y: GameUtils.SCREEN_H - 320 }, 500);
                    var tween_1 = egret.Tween.get(this.BtnShowAD, { loop: true });
                    tween_1.wait(10000).to({ scaleX: 1.4, scaleY: 1.4 }, 300).to({ scaleX: 1.0, scaleY: 1.0 }, 300);
                    HlmyUtils.HLMYShowAd(1);
                }
            }
        }
        else {
            if (this.BtnShowAD) {
                this.BtnShowAD.visible = false;
            }
        }
    };
    GameScene.prototype.clickBtnPlayAD = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        HlmyUtils.HLMYPlayAd("播放广告", 1);
        GameUtils.checkAd = false;
        if (this.BtnShowAD) {
            this.BtnShowAD.visible = false;
        }
        if (this.BtnFuHuoShowAD) {
            this.BtnFuHuoShowAD.visible = false;
        }
        if (this.TextFuHuoShowADNum) {
            this.TextFuHuoShowADNum.visible = false;
        }
    };
    GameScene.prototype.clickBtnFuhuoPlayAD = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        HlmyUtils.HLMYPlayAd("播放广告", 2);
        GameUtils.checkAd = false;
        if (this.BtnShowAD) {
            this.BtnShowAD.visible = false;
        }
        if (this.BtnFuHuoShowAD) {
            this.BtnFuHuoShowAD.visible = false;
        }
        if (this.TextFuHuoShowADNum) {
            this.TextFuHuoShowADNum.visible = false;
        }
    };
    GameScene.prototype.getTriggerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_119.k", event);
        if (obj.result == 2) {
            if (GameUtils.noDress) {
                var tishi = new DrawUtils();
                tishi.createTriggerToast("gameimg_json", obj.name, obj.type, obj.rewards.length + 1);
                this.addChild(tishi);
                if (obj.rewards) {
                    if (obj.rewards.length > 0) {
                        GameUtils.rewardsList = new Array();
                        for (var i = 0; i < obj.rewards.length; i++) {
                            var reward = new RewardsBean(obj.rewards[i]);
                            GameUtils.rewardsList.push(reward);
                        }
                        this.loadImgIcon();
                    }
                }
            }
            else {
                var tishi = new DrawUtils();
                tishi.createTriggerToast("gameimg_json", obj.name, obj.type, 1);
                this.addChild(tishi);
            }
            //            var con_str: string = "";
            //            if(obj.type == 1) {
            //                con_str = "解锁事件：" + obj.name;
            //            } else {
            //                con_str = "解锁结局：" + obj.name;
            //            }
            //            HlmyUtils.HlmyExecuteSendMsg(GameUtils.player_pid,con_str);
        }
    };
    GameScene.prototype.loadImgIcon = function () {
        this.netloading = new NetLoadingUI();
        this.addChild(this.netloading);
        GameUtils.gameSandPause = true;
        this.needLoadNum = 0;
        for (var i = 0; i < GameUtils.rewardsList.length; i++) {
            this.netLoadIconImg(i);
        }
    };
    GameScene.prototype.netLoadIconImg = function (id) {
        this.needLoadNum++;
        var imgLoader = new NetImageLoader();
        imgLoader.crossOrigin = "*";
        imgLoader.imgid = id;
        imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
        imgLoader.load(GameUtils.rewardsList[id].rewards_url);
    };
    GameScene.prototype.imgError = function (event) {
        var loader = event.currentTarget;
        if (loader) {
            //                        GameUtils.debugLog("game加载ICON失败    " + loader.data);
            for (var i = 0; i < GameUtils.rewardsList.length; i++) {
                if (loader.imgid == i) {
                    GameUtils.rewardsList[i].rewards_bitdata = null;
                }
            }
            this.needLoadNum--;
            this.LoadIconCompleteTurnto();
        }
    };
    GameScene.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        if (loader) {
            //                        GameUtils.debugLog("game加载成功    ");
            for (var i = 0; i < GameUtils.rewardsList.length; i++) {
                if (loader.imgid == i) {
                    GameUtils.rewardsList[i].rewards_bitdata = loader.data;
                }
            }
            this.needLoadNum--;
            this.LoadIconCompleteTurnto();
        }
    };
    GameScene.prototype.LoadIconCompleteTurnto = function () {
        if (this.needLoadNum == 0) {
            this.clearNetLoading();
        }
    };
    GameScene.prototype.clearNetLoading = function () {
        if (this.netloading.parent) {
            this.netloading.clearSceneNetLoading();
            this.netloading.parent.removeChild(this.netloading);
        }
        GameUtils.gameSandPause = false;
    };
    GameScene.prototype.playBgMusic = function () {
        //音乐播放
        if (!GameUtils.isLoadSoundError) {
            if (this.allGameObj[this.scencindex].background_music) {
                var musicname = this.allGameObj[this.scencindex].background_music;
                if (musicname != GameUtils.gameSoundName) {
                    GameUtils.gameSoundName = musicname;
                    if (!GameUtils.gameSoundChannel) {
                        GameUtils.playSound(musicname);
                    }
                    else {
                        GameUtils.stopSound();
                        GameUtils.playSound(musicname);
                    }
                }
            }
            else {
                GameUtils.stopSound();
                GameUtils.gameSoundName = "";
            }
        }
    };
    GameScene.prototype.clearNameKuang = function () {
        var namekuang = this.scenelayer.getChildByName("namekuang_png");
        if (namekuang) {
            if (namekuang.parent) {
                namekuang.parent.removeChild(namekuang);
            }
        }
    };
    GameScene.prototype.clearDialog = function () {
        if (this.gameDialog) {
            if (this.gameDialog.parent) {
                this.gameDialog.parent.removeChild(this.gameDialog);
            }
        }
        if (this.continueicon) {
            if (this.continueicon.parent) {
                this.continueicon.parent.removeChild(this.continueicon);
            }
        }
    };
    GameScene.prototype.clearDuihuakuang = function () {
        var duihuakuang = this.scenelayer.getChildByName("duihuakuang_png");
        if (duihuakuang) {
            if (duihuakuang.parent) {
                duihuakuang.parent.removeChild(duihuakuang);
            }
        }
    };
    GameScene.prototype.clearRoles = function () {
        if (this.playergrouplast) {
            if (this.playergrouplast.length > 0) {
                for (var i = 0; i < this.playergrouplast.length; i++) {
                    var roles = this.scenelayer.getChildByName(this.playergrouplast[i]);
                    if (roles) {
                        if (roles.parent) {
                            roles.parent.removeChild(roles);
                        }
                    }
                }
            }
        }
    };
    GameScene.prototype.drawSpecial = function () {
        if (this.allGameObj[this.scencindex].name == "special1") {
            this.drawPangbai();
        }
        else if (this.allGameObj[this.scencindex].name == "special2") {
            this.scenelayer.touchEnabled = false;
            this.drawFuHuo();
        }
        else if (this.allGameObj[this.scencindex].name == "special3") {
            //            alert("special3  结局");
            if (GameUtils.sequelUrl != "") {
                this.drawGameOver();
            }
            else {
                this.closeGameScene();
                var produce = new ProductionGroup();
                this.addChild(produce);
            }
        }
        else if (this.allGameObj[this.scencindex].name == "special6") {
            //            alert("special3  结局");
            if (GameUtils.sequelUrl != "") {
                this.drawGameOver();
            }
            else {
                this.closeGameScene();
                var produce = new ProductionGroup();
                this.addChild(produce);
            }
        }
        else if (this.allGameObj[this.scencindex].name == "special4") {
            this.gameStoryDialog = new egret.TextField();
            this.pangbailayer.addChild(this.gameStoryDialog);
            this.gameStoryDialog.x = 20;
            this.gameStoryDialog.y = 30;
            this.gameStoryDialog.width = GameUtils.SCREEN_W - 40;
            this.gameStoryDialog.height = GameUtils.SCREEN_H - 120;
            this.gameStoryDialog.size = GameUtils.TEXT_SIZE_LARGE;
            this.gameStoryDialog.text = this.allGameObj[this.scencindex].dialogue;
            this.gameStoryDialog.textAlign = egret.HorizontalAlign.CENTER;
            this.gameStoryDialog.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.showContinueIcon();
        }
        else if (this.allGameObj[this.scencindex].name == "special5") {
            this.drawPangbaiCenter();
        }
    };
    GameScene.prototype.drawGameOver = function () {
        var overlayer = new egret.Shape;
        overlayer.graphics.beginFill(0x000000, 1);
        overlayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        overlayer.graphics.endFill();
        overlayer.alpha = 0.4;
        overlayer.touchEnabled = true;
        this.addChild(overlayer);
        var url = "";
        for (var i = 0; i < GameUtils.AppKeyArr.length; i++) {
            if (GameUtils.gameoverAppKey == GameUtils.AppKeyArr[i]) {
                url = GameUtils.gameOverImgUrlArr[i];
            }
        }
        if (url != "") {
            var imgLoader = new NetImageLoader();
            imgLoader.addEventListener(egret.Event.COMPLETE, this.gameOverImgLoadHandler, this);
            imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.gameOverImgError, this);
            imgLoader.load(url);
        }
        else {
            var jiejubtn_0 = new egret.Bitmap();
            jiejubtn_0.texture = this.gameimgSheet.getTexture("jieju_0");
            jiejubtn_0.x = (GameUtils.SCREEN_W) / 2 - 222 - 20;
            jiejubtn_0.y = GameUtils.SCREEN_H / 2;
            this.addChild(jiejubtn_0);
            jiejubtn_0.touchEnabled = true;
            jiejubtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoProductionGroup, this);
            var jiejubtn_1 = new egret.Bitmap();
            jiejubtn_1.texture = this.gameimgSheet.getTexture("jieju_1");
            jiejubtn_1.x = (GameUtils.SCREEN_W) / 2 + 20;
            jiejubtn_1.y = GameUtils.SCREEN_H / 2;
            this.addChild(jiejubtn_1);
            jiejubtn_1.touchEnabled = true;
            jiejubtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSequel, this);
        }
    };
    GameScene.prototype.gameOverImgError = function (event) {
        RES.removeEventListener(egret.Event.COMPLETE, this.gameOverImgLoadHandler, this);
        RES.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.gameOverImgError, this);
        var jiejubtn_0 = new egret.Bitmap();
        jiejubtn_0.texture = this.gameimgSheet.getTexture("jieju_0");
        jiejubtn_0.x = (GameUtils.SCREEN_W) / 2 - 222 - 20;
        jiejubtn_0.y = GameUtils.SCREEN_H / 2;
        this.addChild(jiejubtn_0);
        jiejubtn_0.touchEnabled = true;
        jiejubtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoProductionGroup, this);
        var jiejubtn_1 = new egret.Bitmap();
        jiejubtn_1.texture = this.gameimgSheet.getTexture("jieju_1");
        jiejubtn_1.x = (GameUtils.SCREEN_W) / 2 + 20;
        jiejubtn_1.y = GameUtils.SCREEN_H / 2;
        this.addChild(jiejubtn_1);
        jiejubtn_1.touchEnabled = true;
        jiejubtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSequel, this);
    };
    GameScene.prototype.gameOverImgLoadHandler = function (evt) {
        RES.removeEventListener(egret.Event.COMPLETE, this.gameOverImgLoadHandler, this);
        RES.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.gameOverImgError, this);
        var loader = evt.currentTarget;
        if (loader) {
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.x = (GameUtils.SCREEN_W - bmp.width) / 2;
            bmp.y = GameUtils.SCREEN_H / 2 + 50;
            this.addChild(bmp);
            bmp.touchEnabled = true;
            bmp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSequel, this);
            var btn = new egret.Bitmap();
            btn.texture = this.gameimgSheet.getTexture("jieju_2");
            btn.x = GameUtils.SCREEN_W - 60;
            btn.y = GameUtils.SCREEN_H / 2 + 50 - 100;
            this.addChild(btn);
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoProductionGroup, this);
        }
    };
    GameScene.prototype.gotoSequel = function (evt) {
        // 跳转到第二季
        this.removeChildren();
        window.location.href = GameUtils.sequelUrl;
    };
    GameScene.prototype.gotoProductionGroup = function (evt) {
        this.closeGameScene();
        var produce = new ProductionGroup();
        this.addChild(produce);
    };
    GameScene.prototype.drawName = function () {
        if (this.allGameObj[this.scencindex].name) {
            if (!this.isSpecialScene(this.allGameObj[this.scencindex].name)) {
                var pnamebg = new egret.Bitmap();
                pnamebg.texture = this.rolenameSheet.getTexture(this.getRoleName(this.allGameObj[this.scencindex].name));
                this.scenelayer.addChild(pnamebg);
                pnamebg.name = "namekuang_png";
                var position = this.allGameObj[this.scencindex].specking;
                if (position == 2) {
                    pnamebg.x = GameUtils.SCREEN_W - pnamebg.texture.textureWidth;
                    pnamebg.y = GameUtils.SCREEN_H - 230 - pnamebg.texture.textureHeight;
                }
                else {
                    pnamebg.x = 0;
                    pnamebg.y = GameUtils.SCREEN_H - 230 - pnamebg.texture.textureHeight;
                }
            }
        }
    };
    GameScene.prototype.showContinueIcon = function () {
        this.clearContinueIcon();
        var continueEffSpr = new egret.Sprite();
        this.pangbailayer.addChild(continueEffSpr);
        var continueSpr = new egret.Sprite();
        this.pangbailayer.addChild(continueSpr);
        this.continueicon = new egret.Bitmap();
        this.continueicon.texture = this.gameimgSheet.getTexture("continueicon");
        continueSpr.addChild(this.continueicon);
        this.continueicon.anchorOffsetX = 24;
        this.continueicon.anchorOffsetY = 19;
        this.continueicon.x = GameUtils.SCREEN_W - 40;
        this.continueicon.y = GameUtils.SCREEN_H - 82 - 40;
        var tw = egret.Tween.get(this.continueicon, { loop: true });
        tw.to({ scaleX: 0.7, scaleY: 0.7 }, 600).wait(200).call(function () {
            var continueeff = new ContinueEff(continueEffSpr, GameUtils.SCREEN_W - 40 - 20, GameUtils.SCREEN_H - 82 - 40 - 10);
        }, this).to({ scaleX: 1.0, scaleY: 1.0 }, 600);
    };
    GameScene.prototype.clearContinueIcon = function () {
        if (this.continueicon) {
            egret.Tween.removeTweens(this.continueicon);
            if (this.continueicon.parent) {
                this.continueicon.parent.removeChild(this.continueicon);
            }
        }
    };
    GameScene.prototype.drawDialogue = function () {
        if (this.allGameObj[this.scencindex].dialogue) {
            if (this.allGameObj[this.scencindex].name) {
                if (!this.isSpecialScene(this.allGameObj[this.scencindex].name)) {
                    this.drawDialogueText(0x000000);
                }
            }
            else {
                this.drawDialogueText(0xff5003);
            }
        }
    };
    GameScene.prototype.drawDialogueText = function (col) {
        var textbg = new egret.Bitmap();
        textbg.texture = this.gameimgSheet.getTexture("duihuakuang");
        this.scenelayer.addChild(textbg);
        textbg.name = "duihuakuang_png";
        textbg.x = 0;
        textbg.y = GameUtils.SCREEN_H - 254;
        var rect = new egret.Rectangle(36, 36, 42, 42);
        textbg.scale9Grid = rect;
        textbg.width = GameUtils.SCREEN_W;
        textbg.height = 172;
        this.gameDialog = TextUtils.typewriterTextCom(TextUtils.replaceText(this.allGameObj[this.scencindex].dialogue), 30, textbg.y + 30, GameUtils.SCREEN_W - 60, 126, col, 5, GameUtils.TEXT_SIZE_MIDDLE, 30, this.timerComFunc, this);
        this.scenelayer.addChild(this.gameDialog);
    };
    GameScene.prototype.drawEffect = function () {
        if (this.allGameObj[this.scencindex].effect) {
            if (this.allGameObj[this.scencindex].effect == "fenkai") {
                this.effectstage = 1;
                var fenkai_1 = new egret.Shape;
                fenkai_1.graphics.beginFill(0x000000, 1);
                fenkai_1.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H / 2 - 100);
                fenkai_1.name = "fenkai_1";
                fenkai_1.graphics.endFill();
                this.scenelayer.addChild(fenkai_1);
                var fenkaiw_1 = egret.Tween.get(fenkai_1);
                fenkaiw_1.to({ y: -GameUtils.SCREEN_H }, 1500, egret.Ease.quartIn);
                var fenkai_2 = new egret.Shape;
                fenkai_2.graphics.beginFill(0x000000, 1);
                fenkai_2.graphics.drawRect(0, GameUtils.SCREEN_H / 2 - 120, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
                fenkai_2.graphics.endFill();
                fenkai_2.name = "fenkai_2";
                this.scenelayer.addChild(fenkai_2);
                var fenkaiw_2 = egret.Tween.get(fenkai_2);
                fenkaiw_2.to({ y: GameUtils.SCREEN_H }, 1500, egret.Ease.quartIn);
            }
            else if (this.allGameObj[this.scencindex].effect == "mohu") {
                this.effectstage = 2;
                var blurFliter = new egret.BlurFilter(125, 125);
                this.background.filters = [blurFliter];
            }
            else if (this.allGameObj[this.scencindex].effect == "zhendong") {
                this.effectstage = 7;
                var tw = egret.Tween.get(this);
                tw.to({ x: -8, y: -8 }, 50)
                    .to({ x: 8, y: -8 }, 50)
                    .to({ x: 8, y: 8 }, 50)
                    .to({ x: -4, y: 4 }, 50)
                    .to({ x: -4, y: -4 }, 50)
                    .to({ x: 0, y: 0 }, 50);
            }
            else if (this.allGameObj[this.scencindex].effect == "love") {
                if (this.effectstage != 3) {
                    this.effectstage = 3;
                    // var texture = RES.getRes("love_png");
                    // var config = RES.getRes("love_json");
                    // this.system_love = new particle.GravityParticleSystem(texture, config);
                    // this.system_love.name = "love";
                    // this.particlesystemlayer.addChild(this.system_love);
                    // this.system_love.start();
                }
            }
            else if (this.allGameObj[this.scencindex].effect == "huaban") {
                if (this.effectstage != 4) {
                    this.effectstage = 4;
                    // var texture = RES.getRes("huaban_png");
                    // var config = RES.getRes("huaban_json");
                    // this.system_huaban = new particle.GravityParticleSystem(texture, config);
                    // this.system_huaban.name = "huaban";
                    // this.particlesystemlayer.addChild(this.system_huaban);
                    // this.system_huaban.start();
                }
            }
            else if (this.allGameObj[this.scencindex].effect == "yezi") {
                if (this.effectstage != 5) {
                    this.effectstage = 5;
                    // var texture = RES.getRes("yezi_png");
                    // var config = RES.getRes("yezi_json");
                    // this.system_yezi = new particle.GravityParticleSystem(texture, config);
                    // this.system_yezi.name = "yezi";
                    // this.particlesystemlayer.addChild(this.system_yezi);
                    // this.system_yezi.start();
                }
            }
            else if (this.allGameObj[this.scencindex].effect == "huohua") {
                if (this.effectstage != 6) {
                    this.effectstage = 6;
                    // var texture = RES.getRes("huohua_png");
                    // var config = RES.getRes("huohua_json");
                    // this.system_huohua = new particle.GravityParticleSystem(texture, config);
                    // this.system_huohua.name = "huohua";
                    // this.particlesystemlayer.addChild(this.system_huohua);
                    // this.system_huohua.start();
                }
            }
        }
        else {
            this.effectstage = 0;
        }
    };
    GameScene.prototype.drawRoles = function () {
        this.playergrouplast = new Array();
        var speckingposition = 0;
        if (this.allGameObj[this.scencindex].specking) {
            speckingposition = this.allGameObj[this.scencindex].specking;
        }
        if (this.allGameObj[this.scencindex].roles) {
            if (this.allGameObj[this.scencindex].roles.length > 0) {
                for (var i = 0; i < this.allGameObj[this.scencindex].roles.length; i++) {
                    var Str_playerimg = this.allGameObj[this.scencindex].roles[i].role_img;
                    this.playergrouplast.push(Str_playerimg);
                    var Str_playerposition = this.allGameObj[this.scencindex].roles[i].role_position;
                    if (Str_playerimg) {
                        var player = new egret.Bitmap();
                        player.texture = RES.getRes(Str_playerimg);
                        player.name = Str_playerimg;
                        this.scenelayer.addChild(player);
                        player.y = GameUtils.SCREEN_H - 254 - player.texture.textureHeight;
                        if (this.allGameObj[this.scencindex].roles[i].role_effect) {
                            if (this.allGameObj[this.scencindex].roles[i].role_effect == 1) {
                                if (Str_playerposition == 2) {
                                    player.x = GameUtils.SCREEN_W;
                                }
                                else {
                                    player.x = -player.texture.textureWidth;
                                }
                                if (Str_playerposition == 2) {
                                    var playertw_2 = egret.Tween.get(player);
                                    playertw_2.to({ x: GameUtils.SCREEN_W - player.texture.textureWidth }, 1500, egret.Ease.backInOut);
                                }
                                else {
                                    var playertw_1 = egret.Tween.get(player);
                                    playertw_1.to({ x: 0 }, 1500, egret.Ease.backInOut);
                                }
                            }
                            else if (this.allGameObj[this.scencindex].roles[i].role_effect == 2) {
                                if (Str_playerposition == 2) {
                                    player.x = GameUtils.SCREEN_W - player.texture.textureWidth;
                                    var twr = egret.Tween.get(player);
                                    twr.to({ x: player.x + 80 }, 100)
                                        .to({ x: player.x - 10 }, 100)
                                        .to({ x: player.x + 40 }, 100)
                                        .to({ x: player.x }, 100);
                                }
                                else {
                                    player.x = 0;
                                    var twl = egret.Tween.get(player);
                                    twl.to({ x: player.x - 80 }, 100)
                                        .to({ x: player.x + 10 }, 100)
                                        .to({ x: player.x - 40 }, 100)
                                        .to({ x: player.x }, 100);
                                }
                            }
                        }
                        else {
                            if (Str_playerposition == 2) {
                                player.x = GameUtils.SCREEN_W - player.texture.textureWidth;
                            }
                            else {
                                player.x = 0;
                            }
                            if (Str_playerposition != speckingposition) {
                                player.alpha = 0.5;
                            }
                            else {
                                player.alpha = 1;
                            }
                        }
                    }
                }
            }
        }
    };
    GameScene.prototype.drawBackGround = function () {
        var Str_bgname = "";
        if (this.backgroundshape) {
            if (this.backgroundshape.parent) {
                this.backgroundshape.parent.removeChild(this.backgroundshape);
            }
        }
        if (this.allGameObj[this.scencindex].background == "black" || !this.allGameObj[this.scencindex].background) {
            this.backgroundshape = new egret.Shape;
            this.backgroundshape.graphics.beginFill(0x000000, 1);
            this.backgroundshape.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
            this.backgroundshape.graphics.endFill();
            this.backgroundlayer.addChild(this.backgroundshape);
        }
        else {
            Str_bgname = this.allGameObj[this.scencindex].background;
            if (this.background) {
                if (this.background.name != Str_bgname) {
                    if (this.background.parent) {
                        this.background.parent.removeChild(this.background);
                        this.background = this.createBitmapByName(Str_bgname);
                        this.background.name = Str_bgname;
                        this.background.x = 0;
                        this.background.y = 0;
                        this.backgroundlayer.addChild(this.background);
                    }
                }
            }
            else {
                this.background = this.createBitmapByName(Str_bgname);
                this.background.name = Str_bgname;
                this.background.x = 0;
                this.background.y = 0;
                this.backgroundlayer.addChild(this.background);
            }
        }
    };
    GameScene.prototype.drawOptions = function () {
        if (this.allGameObj[this.scencindex].options) {
            var btnNum = this.allGameObj[this.scencindex].options.length;
            if (btnNum > 0) {
                this.fuhuoindex = this.scencindex;
                this.scenelayer.touchEnabled = false;
                for (var i = 0; i < btnNum; i++) {
                    var btnimg = new egret.Bitmap();
                    btnimg.texture = this.gameimgSheet.getTexture("xuanzetiao");
                    btnimg.name = "" + i;
                    btnimg.x = (GameUtils.SCREEN_W - 384) / 2;
                    btnimg.y = GameUtils.SCREEN_H - 255 - btnNum * 92 + 92 * i;
                    this.optionlayer.addChild(btnimg);
                    btnimg.touchEnabled = true;
                    btnimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoScene, this);
                    var btntext = new egret.TextField();
                    btntext.text = this.allGameObj[this.scencindex].options[i].option_text;
                    btntext.size = GameUtils.TEXT_SIZE_MIDDLE;
                    btntext.textColor = 0xffffff;
                    btntext.x = 10;
                    btntext.y = GameUtils.SCREEN_H - 255 - btnNum * 92 + 92 * i;
                    btntext.lineSpacing = 3;
                    btntext.width = GameUtils.SCREEN_W - 20;
                    btntext.height = 72;
                    btntext.textAlign = egret.HorizontalAlign.CENTER;
                    btntext.verticalAlign = egret.VerticalAlign.MIDDLE;
                    this.optionlayer.addChild(btntext);
                }
            }
        }
    };
    GameScene.prototype.timerComFunc = function () {
        TextUtils.setAllGameDialog();
        this.drawOptions();
        this.showContinueIcon();
    };
    GameScene.prototype.clearEffect = function () {
        if (this.effectstage == 1) {
            var fenkai_1 = this.scenelayer.getChildByName("fenkai_1");
            if (fenkai_1) {
                if (fenkai_1.parent) {
                    fenkai_1.parent.removeChild(fenkai_1);
                }
            }
            var fenkai_2 = this.scenelayer.getChildByName("fenkai_2");
            if (fenkai_2) {
                if (fenkai_2.parent) {
                    fenkai_2.parent.removeChild(fenkai_2);
                }
            }
        }
        else if (this.effectstage == 2) {
            var blurFliter = new egret.BlurFilter(0, 0);
            this.background.filters = [blurFliter];
        }
        else if (this.effectstage == 3) {
            if (this.allGameObj[this.scencindex].effect) {
                if (this.allGameObj[this.scencindex].effect != "love") {
                    this.clearSystemLove();
                }
            }
            else {
                this.clearSystemLove();
            }
        }
        else if (this.effectstage == 4) {
            if (this.allGameObj[this.scencindex].effect) {
                if (this.allGameObj[this.scencindex].effect != "huaban") {
                    this.clearSystemHuaban();
                }
            }
            else {
                this.clearSystemHuaban();
            }
        }
        else if (this.effectstage == 5) {
            if (this.allGameObj[this.scencindex].effect) {
                if (this.allGameObj[this.scencindex].effect != "yezi") {
                    this.clearSystemYezi();
                }
            }
            else {
                this.clearSystemYezi();
            }
        }
        else if (this.effectstage == 6) {
            if (this.allGameObj[this.scencindex].effect) {
                if (this.allGameObj[this.scencindex].effect != "huohua") {
                    this.clearSystemHuohua();
                }
            }
            else {
                this.clearSystemHuohua();
            }
        }
    };
    GameScene.prototype.clearSystemLove = function () {
        // if (this.system_love) {
        //     this.system_love.stop();
        //     if (this.system_love.parent) {
        //         this.system_love.parent.removeChild(this.system_love);
        //     }
        // }
    };
    GameScene.prototype.clearSystemHuaban = function () {
        // if (this.system_huaban) {
        //     this.system_huaban.stop();
        //     if (this.system_huaban.parent) {
        //         this.system_huaban.parent.removeChild(this.system_huaban);
        //     }
        // }
    };
    GameScene.prototype.clearSystemYezi = function () {
        // if (this.system_yezi) {
        //     this.system_yezi.stop();
        //     if (this.system_yezi.parent) {
        //         this.system_yezi.parent.removeChild(this.system_yezi);
        //     }
        // }
    };
    GameScene.prototype.clearSystemHuohua = function () {
        // if (this.system_huohua) {
        //     this.system_huohua.stop();
        //     if (this.system_huohua.parent) {
        //         this.system_huohua.parent.removeChild(this.system_huohua);
        //     }
        // }
    };
    GameScene.prototype.drawChecker = function (str, resultid) {
        var checkshape = new egret.Shape;
        checkshape.graphics.beginFill(0x000000, 1);
        checkshape.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        checkshape.graphics.endFill();
        checkshape.alpha = 0.7;
        checkshape.touchEnabled = true;
        checkshape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearChecker, this);
        this.checkerlayer.addChild(checkshape);
        var checkdialog = new egret.TextField();
        checkdialog.x = 60;
        checkdialog.y = 200;
        checkdialog.width = GameUtils.SCREEN_W - 120;
        checkdialog.height = GameUtils.SCREEN_H - 200;
        checkdialog.textColor = 0xffffff;
        checkdialog.size = GameUtils.TEXT_SIZE_MIDDLE;
        checkdialog.text = "　　" + TextUtils.replaceText(str);
        checkdialog.lineSpacing = 10;
        this.checkerlayer.addChild(checkdialog);
        if (resultid == -1) {
            var p_x_arr = [202];
            var x_num = 1;
            if (GameUtils.checkAd) {
                x_num++;
            }
            if (GameUtils.playerBean.player_miansi == 0 && GameUtils.isShowMiansiIcon) {
                x_num++;
            }
            if (x_num == 1) {
                p_x_arr = [202];
            }
            else if (x_num == 2) {
                p_x_arr = [119, 285];
            }
            else if (x_num == 3) {
                p_x_arr = [36, 202, 368];
            }
            var drawindex = 0;
            if (GameUtils.checkAd) {
                HlmyUtils.HLMYShowAd(2);
                this.BtnFuHuoShowAD = new egret.Bitmap();
                this.BtnFuHuoShowAD.texture = this.gameimgSheet.getTexture("btn_fuhuo_5");
                this.BtnFuHuoShowAD.x = p_x_arr[drawindex];
                this.BtnFuHuoShowAD.y = GameUtils.SCREEN_H - 280;
                this.BtnFuHuoShowAD.touchEnabled = true;
                this.BtnFuHuoShowAD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnFuhuoPlayAD, this);
                this.checkerlayer.addChild(this.BtnFuHuoShowAD);
                this.TextFuHuoShowADNum = new egret.TextField();
                this.TextFuHuoShowADNum.text = "" + GameUtils.check_ad_reward;
                this.TextFuHuoShowADNum.size = GameUtils.TEXT_SIZE_MIDDLE;
                this.TextFuHuoShowADNum.textColor = 0x0000ff;
                this.TextFuHuoShowADNum.x = p_x_arr[drawindex] + 78;
                this.TextFuHuoShowADNum.y = GameUtils.SCREEN_H - 280 + 60;
                this.checkerlayer.addChild(this.TextFuHuoShowADNum);
                drawindex++;
            }
            var texturename = "btn_fuhuo_0";
            if (GameUtils.playerBean.player_miansi == 1) {
                texturename = "btn_fuhuo_2";
            }
            else {
                if (GameUtils.playerBean.player_jinpai == 0 && GameUtils.playerBean.player_yuanbao >= 20) {
                    texturename = "btn_fuhuo_1";
                }
                else {
                    texturename = "btn_fuhuo_0";
                }
            }
            var fuhuo = new egret.Bitmap();
            fuhuo.texture = this.gameimgSheet.getTexture(texturename);
            this.checkerlayer.addChild(fuhuo);
            fuhuo.x = p_x_arr[drawindex];
            fuhuo.y = GameUtils.SCREEN_H - 280;
            fuhuo.touchEnabled = true;
            fuhuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkfuhuo, this);
            if (GameUtils.playerBean.player_miansi == 0) {
                if (GameUtils.playerBean.player_jinpai == 0 && GameUtils.playerBean.player_yuanbao >= 20) {
                    var fuhuoNum = new egret.TextField();
                    fuhuoNum.text = "" + GameUtils.fuhuo_zuanshi;
                    fuhuoNum.size = GameUtils.TEXT_SIZE_MIDDLE;
                    fuhuoNum.textColor = 0xff0000;
                    fuhuoNum.x = p_x_arr[drawindex] + 83;
                    fuhuoNum.y = GameUtils.SCREEN_H - 280 + 41;
                    this.checkerlayer.addChild(fuhuoNum);
                }
            }
            drawindex++;
            if (GameUtils.playerBean.player_miansi == 0 && GameUtils.isShowMiansiIcon) {
                if (GameUtils.isMiansiDiscounts) {
                    var miansiprice = new egret.BitmapText();
                    miansiprice.font = RES.getRes("miansinum_fnt");
                    this.checkerlayer.addChild(miansiprice);
                    miansiprice.text = "" + GameUtils.miansi_price + "+";
                    miansiprice.letterSpacing = 0;
                    miansiprice.x = 5 + p_x_arr[drawindex];
                    miansiprice.y = GameUtils.SCREEN_H - 280 - 20;
                    var miansiprice1 = new egret.BitmapText();
                    miansiprice1.font = RES.getRes("miansinum_fnt");
                    this.checkerlayer.addChild(miansiprice1);
                    miansiprice1.text = "" + GameUtils.miansipriceStr + "+";
                    miansiprice1.letterSpacing = 0;
                    miansiprice1.x = 5 + p_x_arr[drawindex] + 80;
                    miansiprice1.y = GameUtils.SCREEN_H - 280 - 20;
                    miansiprice1.scaleX = 0.8;
                    miansiprice1.scaleY = 0.8;
                    var miansishare = new egret.Shape;
                    miansishare.graphics.beginFill(0xffff00, 1);
                    miansishare.graphics.drawRect(5 + p_x_arr[drawindex] + 80, GameUtils.SCREEN_H - 280 - 20 + 13, 60, 2);
                    miansishare.graphics.endFill();
                    this.checkerlayer.addChild(miansishare);
                }
                else {
                    var miansiprice = new egret.BitmapText();
                    miansiprice.font = RES.getRes("miansinum_fnt");
                    this.checkerlayer.addChild(miansiprice);
                    miansiprice.text = "" + GameUtils.miansi_price + "+";
                    miansiprice.letterSpacing = 0;
                    miansiprice.x = 5 + p_x_arr[drawindex];
                    miansiprice.y = GameUtils.SCREEN_H - 280 - 20;
                }
                var miansiBtn = new egret.Bitmap();
                miansiBtn.texture = this.gameimgSheet.getTexture("btn_fuhuo_4");
                miansiBtn.x = p_x_arr[drawindex];
                miansiBtn.y = GameUtils.SCREEN_H - 280;
                miansiBtn.touchEnabled = true;
                miansiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMiansi, this);
                this.checkerlayer.addChild(miansiBtn);
            }
        }
        else {
            var p_x_arr = [202];
            var x_num = 1;
            if (GameUtils.checkAd) {
                x_num++;
            }
            if (x_num == 1) {
                p_x_arr = [202];
            }
            else if (x_num == 2) {
                p_x_arr = [119, 285];
            }
            var drawindex = 0;
            if (GameUtils.checkAd) {
                HlmyUtils.HLMYShowAd(2);
                this.BtnFuHuoShowAD = new egret.Bitmap();
                this.BtnFuHuoShowAD.texture = this.gameimgSheet.getTexture("btn_fuhuo_5");
                this.BtnFuHuoShowAD.x = p_x_arr[drawindex];
                this.BtnFuHuoShowAD.y = GameUtils.SCREEN_H - 280;
                this.BtnFuHuoShowAD.touchEnabled = true;
                this.BtnFuHuoShowAD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnFuhuoPlayAD, this);
                this.checkerlayer.addChild(this.BtnFuHuoShowAD);
                this.TextFuHuoShowADNum = new egret.TextField();
                this.TextFuHuoShowADNum.text = "" + GameUtils.check_ad_reward;
                this.TextFuHuoShowADNum.size = GameUtils.TEXT_SIZE_MIDDLE;
                this.TextFuHuoShowADNum.textColor = 0x0000ff;
                this.TextFuHuoShowADNum.x = p_x_arr[drawindex] + 78;
                this.TextFuHuoShowADNum.y = GameUtils.SCREEN_H - 280 + 60;
                this.checkerlayer.addChild(this.TextFuHuoShowADNum);
                drawindex++;
            }
            var shop = new egret.Bitmap();
            shop.texture = this.gameimgSheet.getTexture("btn_fuhuo_3");
            this.checkerlayer.addChild(shop);
            shop.x = p_x_arr[drawindex];
            shop.y = GameUtils.SCREEN_H - 280;
            shop.touchEnabled = true;
            shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkGotoProperty, this);
        }
        if (GameUtils.playerBean.player_first_pay == 0) {
            var btnshouchong = new egret.Bitmap();
            btnshouchong.texture = this.gameimgSheet.getTexture("btn_shouchong");
            this.checkerlayer.addChild(btnshouchong);
            btnshouchong.x = 132;
            btnshouchong.y = GameUtils.SCREEN_H - 280 - 100;
            btnshouchong.touchEnabled = true;
            btnshouchong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.BtnDeathShouChong, this);
            var shouchongeff = new egret.Bitmap();
            shouchongeff.texture = this.gameimgSheet.getTexture("btn_shouchongeff");
            shouchongeff.x = 270;
            shouchongeff.y = GameUtils.SCREEN_H - 280 - 104 + 36;
            shouchongeff.anchorOffsetX = 141;
            shouchongeff.anchorOffsetY = 36;
            this.checkerlayer.addChild(shouchongeff);
            var eff_tw = egret.Tween.get(shouchongeff, { loop: true });
            eff_tw.to({ scaleX: 0.95, scaleY: 0.8, alpha: 0 }, 400).to({ scaleX: 1.0, scaleY: 1.0, alpha: 1 }, 300);
        }
        if (!GameUtils.noYaoQing) {
            var btnfuhuofriend = new egret.Bitmap();
            btnfuhuofriend.texture = this.gameimgSheet.getTexture("btn_fuhuo_friedn");
            this.checkerlayer.addChild(btnfuhuofriend);
            btnfuhuofriend.x = GameUtils.SCREEN_W - 60;
            btnfuhuofriend.y = GameUtils.SCREEN_H - 380 + 72 - 180;
            btnfuhuofriend.touchEnabled = true;
            btnfuhuofriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFuhuoFriend, this);
        }
    };
    GameScene.prototype.checkfuhuo = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(203, this.getcheckFuHuoComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getcheckFuHuoComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_203.k", event);
        if (obj.result == 0) {
            if (obj.info) {
                this.gotoShangChengDaoju();
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
            }
        }
        else {
            if (this.checkerlayer) {
                this.checkerlayer.removeChildren();
            }
            if (this.optionlayer) {
                this.optionlayer.removeChildren();
            }
            this.scencindex = this.fuhuoindex;
            if (this.allGameObj[this.scencindex]) {
                this.changeGameScene();
            }
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
            }
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
        }
    };
    GameScene.prototype.checkGotoProperty = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gotoProperty();
        if (this.checkerlayer) {
            this.checkerlayer.removeChildren();
        }
    };
    GameScene.prototype.clearChecker = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.checkerlayer) {
            this.checkerlayer.removeChildren();
        }
    };
    GameScene.prototype.drawFuHuo = function () {
        this.gameshape = new egret.Shape;
        this.gameshape.graphics.beginFill(0x000000, 1);
        this.gameshape.graphics.drawRect(0, 48, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82 - 48);
        this.gameshape.graphics.endFill();
        this.gameshape.alpha = 0.7;
        this.gameshape.touchEnabled = true;
        this.pangbailayer.addChild(this.gameshape);
        this.gameStoryDialog = TextUtils.typewriterText("　　" + TextUtils.replaceText(this.allGameObj[this.scencindex].dialogue), 60, 200, GameUtils.SCREEN_W - 118, GameUtils.SCREEN_H - 200, 0xffffff, 10, GameUtils.TEXT_SIZE_MIDDLE, 30);
        this.pangbailayer.addChild(this.gameStoryDialog);
        var p_x_arr = [202];
        var x_num = 1;
        if (GameUtils.checkAd) {
            x_num++;
        }
        if (GameUtils.playerBean.player_miansi == 0 && GameUtils.isShowMiansiIcon) {
            x_num++;
        }
        if (x_num == 1) {
            p_x_arr = [202];
        }
        else if (x_num == 2) {
            p_x_arr = [119, 285];
        }
        else if (x_num == 3) {
            p_x_arr = [36, 202, 368];
        }
        var drawindex = 0;
        if (GameUtils.checkAd) {
            HlmyUtils.HLMYShowAd(2);
            this.BtnFuHuoShowAD = new egret.Bitmap();
            this.BtnFuHuoShowAD.texture = this.gameimgSheet.getTexture("btn_fuhuo_5");
            this.BtnFuHuoShowAD.x = p_x_arr[drawindex];
            this.BtnFuHuoShowAD.y = GameUtils.SCREEN_H - 280;
            this.BtnFuHuoShowAD.touchEnabled = true;
            this.BtnFuHuoShowAD.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnFuhuoPlayAD, this);
            this.pangbailayer.addChild(this.BtnFuHuoShowAD);
            this.TextFuHuoShowADNum = new egret.TextField();
            this.TextFuHuoShowADNum.text = "" + GameUtils.check_ad_reward;
            this.TextFuHuoShowADNum.size = GameUtils.TEXT_SIZE_MIDDLE;
            this.TextFuHuoShowADNum.textColor = 0x0000ff;
            this.TextFuHuoShowADNum.x = p_x_arr[drawindex] + 78;
            this.TextFuHuoShowADNum.y = GameUtils.SCREEN_H - 280 + 60;
            this.pangbailayer.addChild(this.TextFuHuoShowADNum);
            drawindex++;
        }
        var texturename = "btn_fuhuo_0";
        if (GameUtils.playerBean.player_miansi == 1) {
            texturename = "btn_fuhuo_2";
        }
        else {
            if (GameUtils.playerBean.player_jinpai == 0 && GameUtils.playerBean.player_yuanbao >= 20) {
                texturename = "btn_fuhuo_1";
            }
            else {
                texturename = "btn_fuhuo_0";
            }
        }
        this.fuhuoBtnImg = new egret.Bitmap();
        this.fuhuoBtnImg.texture = this.gameimgSheet.getTexture(texturename);
        this.fuhuoBtnImg.name = "fuhuo";
        this.pangbailayer.addChild(this.fuhuoBtnImg);
        this.fuhuoBtnImg.x = p_x_arr[drawindex];
        this.fuhuoBtnImg.y = GameUtils.SCREEN_H - 280;
        this.fuhuoBtnImg.touchEnabled = true;
        this.fuhuoBtnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickfuhuo, this);
        if (GameUtils.playerBean.player_miansi == 0) {
            if (GameUtils.playerBean.player_jinpai == 0 && GameUtils.playerBean.player_yuanbao >= 20) {
                var fuhuoNum = new egret.TextField();
                fuhuoNum.text = "" + GameUtils.fuhuo_zuanshi;
                fuhuoNum.size = GameUtils.TEXT_SIZE_MIDDLE;
                fuhuoNum.textColor = 0xff0000;
                fuhuoNum.x = p_x_arr[drawindex] + 83;
                fuhuoNum.y = GameUtils.SCREEN_H - 280 + 41;
                this.pangbailayer.addChild(fuhuoNum);
            }
        }
        drawindex++;
        if (GameUtils.playerBean.player_miansi == 0 && GameUtils.isShowMiansiIcon) {
            if (GameUtils.isMiansiDiscounts) {
                var miansiprice = new egret.BitmapText();
                miansiprice.font = RES.getRes("miansinum_fnt");
                this.pangbailayer.addChild(miansiprice);
                miansiprice.text = "" + GameUtils.miansi_price + "+";
                miansiprice.letterSpacing = 0;
                miansiprice.x = 5 + p_x_arr[drawindex];
                miansiprice.y = GameUtils.SCREEN_H - 280 - 20;
                var miansiprice1 = new egret.BitmapText();
                miansiprice1.font = RES.getRes("miansinum_fnt");
                this.pangbailayer.addChild(miansiprice1);
                miansiprice1.text = "" + GameUtils.miansipriceStr + "+";
                miansiprice1.letterSpacing = 0;
                miansiprice1.x = 5 + p_x_arr[drawindex] + 80;
                miansiprice1.y = GameUtils.SCREEN_H - 280 - 20;
                miansiprice1.scaleX = 0.8;
                miansiprice1.scaleY = 0.8;
                var miansishare = new egret.Shape;
                miansishare.graphics.beginFill(0xffff00, 1);
                miansishare.graphics.drawRect(5 + p_x_arr[drawindex] + 80, GameUtils.SCREEN_H - 280 - 20 + 13, 60, 2);
                miansishare.graphics.endFill();
                this.pangbailayer.addChild(miansishare);
            }
            else {
                var miansiprice = new egret.BitmapText();
                miansiprice.font = RES.getRes("miansinum_fnt");
                this.pangbailayer.addChild(miansiprice);
                miansiprice.text = "" + GameUtils.miansi_price + "+";
                miansiprice.letterSpacing = 0;
                miansiprice.x = 5 + p_x_arr[drawindex];
                miansiprice.y = GameUtils.SCREEN_H - 280 - 20;
            }
            var miansiBtn = new egret.Bitmap();
            miansiBtn.texture = this.gameimgSheet.getTexture("btn_fuhuo_4");
            miansiBtn.x = p_x_arr[drawindex];
            miansiBtn.y = GameUtils.SCREEN_H - 280;
            miansiBtn.touchEnabled = true;
            miansiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMiansi, this);
            this.pangbailayer.addChild(miansiBtn);
        }
        if (GameUtils.playerBean.player_first_pay == 0) {
            var btnshouchong = new egret.Bitmap();
            btnshouchong.texture = this.gameimgSheet.getTexture("btn_shouchong");
            this.pangbailayer.addChild(btnshouchong);
            btnshouchong.x = 132;
            btnshouchong.y = GameUtils.SCREEN_H - 280 - 100;
            btnshouchong.touchEnabled = true;
            btnshouchong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.BtnDeathShouChong, this);
            var shouchongeff = new egret.Bitmap();
            shouchongeff.texture = this.gameimgSheet.getTexture("btn_shouchongeff");
            shouchongeff.x = 270;
            shouchongeff.y = GameUtils.SCREEN_H - 280 - 104 + 36;
            shouchongeff.anchorOffsetX = 141;
            shouchongeff.anchorOffsetY = 36;
            this.pangbailayer.addChild(shouchongeff);
            var eff_tw = egret.Tween.get(shouchongeff, { loop: true });
            eff_tw.to({ scaleX: 0.95, scaleY: 0.8, alpha: 0 }, 400).to({ scaleX: 1.0, scaleY: 1.0, alpha: 1 }, 300);
        }
        if (!GameUtils.noYaoQing) {
            var btnfuhuofriend = new egret.Bitmap();
            btnfuhuofriend.texture = this.gameimgSheet.getTexture("btn_fuhuo_friedn");
            this.pangbailayer.addChild(btnfuhuofriend);
            btnfuhuofriend.x = GameUtils.SCREEN_W - 60;
            btnfuhuofriend.y = GameUtils.SCREEN_H - 380 + 72 - 180;
            btnfuhuofriend.touchEnabled = true;
            btnfuhuofriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFuhuoFriend, this);
        }
    };
    GameScene.prototype.btnFuhuoFriend = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (GameUtils.channelStr != "玩吧") {
            NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
        }
        else {
            if (!GameUtils.isNewPlayerFourDay) {
                NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
            }
            else {
                NetWorkUtils.sendSimpleNetPostRequest(101, this.getHuanXingFriendListComplete, this.onPostIOError, this, this);
            }
        }
    };
    GameScene.prototype.getHuanXingFriendListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_101.k", event);
        //                GameUtils.debugLog(obj);
        if (obj.friends) {
            if (obj.friends.length > 0) {
                GameUtils.friendBeanList = new Array();
                for (var i = 0; i < obj.friends.length; i++) {
                    GameUtils.friendBeanList.push(new FriendListBean(obj.friends[i]));
                }
                GameUtils.friendBeanList.sort(function (a, b) {
                    return b.friendl_meilizhi - a.friendl_meilizhi;
                });
            }
        }
        var isshow = false;
        for (var i = 0; i < GameUtils.friendBeanList.length; i++) {
            if (GameUtils.friendBeanList[i].friendl_interaction == 0) {
                isshow = true;
                break;
            }
        }
        if (isshow) {
            this.gotoFriendNoSendMsg();
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", "没有可以唤醒的好友");
            this.addChild(tishi);
        }
    };
    GameScene.prototype.clickfuhuo = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (TextUtils.gameTextStage) {
            TextUtils.setAllGameDialog();
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(203, this.getFuHuoComplete, this.onPostIOError, this, this);
    };
    GameScene.prototype.getFuHuoComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_203.k", event);
        if (obj.result == 0) {
            if (obj.info) {
                this.gotoShangChengDaoju();
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
            }
        }
        else {
            this.scencindex = this.fuhuoindex;
            if (this.allGameObj[this.scencindex]) {
                this.changeGameScene();
            }
            if (obj.info) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                this.addChild(tishi);
            }
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
        }
    };
    GameScene.prototype.drawPangbai = function () {
        this.gameshape = new egret.Shape;
        this.gameshape.graphics.beginFill(0x000000, 1);
        this.gameshape.graphics.drawRect(0, 48, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82 - 48);
        this.gameshape.graphics.endFill();
        this.gameshape.alpha = 0.7;
        this.pangbailayer.addChild(this.gameshape);
        this.gameshape.touchEnabled = true;
        this.gameshape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.gameStoryDialog = TextUtils.typewriterTextCom("　　" + TextUtils.replaceText(this.allGameObj[this.scencindex].dialogue), 60, 200, GameUtils.SCREEN_W - 120, GameUtils.SCREEN_H - 200, 0xffffff, 10, GameUtils.TEXT_SIZE_MIDDLE, 30, this.timerComFunc, this);
        this.pangbailayer.addChild(this.gameStoryDialog);
    };
    GameScene.prototype.drawPangbaiCenter = function () {
        this.gameshape = new egret.Shape;
        this.gameshape.graphics.beginFill(0x000000, 1);
        this.gameshape.graphics.drawRect(0, 48, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82 - 48);
        this.gameshape.graphics.endFill();
        this.gameshape.alpha = 0.7;
        this.pangbailayer.addChild(this.gameshape);
        this.gameshape.touchEnabled = true;
        this.gameshape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.gameStoryDialog = new egret.TextField();
        this.pangbailayer.addChild(this.gameStoryDialog);
        this.gameStoryDialog.x = 20;
        this.gameStoryDialog.y = 30;
        this.gameStoryDialog.width = GameUtils.SCREEN_W - 40;
        this.gameStoryDialog.height = GameUtils.SCREEN_H - 120;
        this.gameStoryDialog.size = GameUtils.TEXT_SIZE_LARGE;
        this.gameStoryDialog.text = this.allGameObj[this.scencindex].dialogue;
        this.gameStoryDialog.textAlign = egret.HorizontalAlign.CENTER;
        this.gameStoryDialog.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.showContinueIcon();
    };
    GameScene.prototype.clearPangbai = function () {
        this.clearContinueIcon();
        if (this.pangbailayer) {
            this.pangbailayer.removeChildren();
        }
        if (this.checkerlayer) {
            this.checkerlayer.removeChildren();
        }
        if (this.optionlayer) {
            this.optionlayer.removeChildren();
        }
    };
    GameScene.prototype.isSpecialScene = function (str) {
        var isspecial = false;
        if (str.indexOf("special") != -1) {
            isspecial = true;
        }
        return isspecial;
    };
    GameScene.prototype.playerIsExist = function (Str_playerimg) {
        var isexist = false;
        if (this.playergrouplast) {
            for (var i = 0; i < this.playergrouplast.length; i++) {
                if (Str_playerimg == this.playergrouplast[i]) {
                    isexist = true;
                }
            }
        }
        return isexist;
    };
    GameScene.prototype.gotoScene = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.GAMESTAGE_NOW != this.GAMESTAGE_JUQING) {
            return;
        }
        var btnimg = evt.currentTarget;
        if (this.allGameObj[this.scencindex].options[parseInt(btnimg.name)].option_id) {
            var sendobj = { cmd: 300, player_token: GameUtils.playerToken, option_id: this.allGameObj[this.scencindex].options[parseInt(btnimg.name)].option_id, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendobj, this.getOptionComplete, this.onPostIOError, this, this);
        }
    };
    GameScene.prototype.getOptionComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_300.k", event);
        if (obj.result == -1) {
            if (obj.info) {
                this.drawChecker(obj.info, obj.result);
            }
        }
        else {
            if (this.optionlayer) {
                this.optionlayer.removeChildren();
            }
            this.scencindex = obj.turn_to;
            if (this.allGameObj[this.scencindex]) {
                this.changeGameScene();
            }
            if (obj.details) {
                var textarr = new Array();
                var isnewline = false;
                if (obj.details.wuli) {
                    textarr.push(new ITextElementObj("武力 ", 0xffffff));
                    if (obj.details.wuli > 0) {
                        textarr.push(new ITextElementObj("+" + obj.details.wuli, 0x00ff00));
                    }
                    else {
                        textarr.push(new ITextElementObj("" + obj.details.wuli, 0xff0000));
                    }
                    isnewline = true;
                }
                if (obj.details.zhihui) {
                    textarr.push(new ITextElementObj((isnewline ? "\n" : "") + "智慧 ", 0xffffff));
                    if (obj.details.zhihui > 0) {
                        textarr.push(new ITextElementObj("+" + obj.details.zhihui, 0x00ff00));
                    }
                    else {
                        textarr.push(new ITextElementObj("" + obj.details.zhihui, 0xff0000));
                    }
                    isnewline = true;
                }
                if (obj.details.koucai) {
                    textarr.push(new ITextElementObj((isnewline ? "\n" : "") + "口才 ", 0xffffff));
                    if (obj.details.koucai > 0) {
                        textarr.push(new ITextElementObj("+" + obj.details.koucai, 0x00ff00));
                    }
                    else {
                        textarr.push(new ITextElementObj("" + obj.details.koucai, 0xff0000));
                    }
                    isnewline = true;
                }
                if (obj.details.meilizhi) {
                    textarr.push(new ITextElementObj((isnewline ? "\n" : "") + "魅力 ", 0xffffff));
                    if (obj.details.meilizhi > 0) {
                        textarr.push(new ITextElementObj("+" + obj.details.meilizhi, 0x00ff00));
                    }
                    else {
                        textarr.push(new ITextElementObj("" + obj.details.meilizhi, 0xff0000));
                    }
                    isnewline = true;
                }
                if (obj.details.name && obj.details.haogandu) {
                    textarr.push(new ITextElementObj((isnewline ? "\n" : "") + obj.details.name + "好感度 ", 0xffffff));
                    if (obj.details.haogandu > 0) {
                        textarr.push(new ITextElementObj("+" + obj.details.haogandu, 0x00ff00));
                    }
                    else {
                        textarr.push(new ITextElementObj("" + obj.details.haogandu, 0xff0000));
                    }
                    isnewline = true;
                }
                if (obj.info) {
                    textarr.push(new ITextElementObj((isnewline ? "\n" : "") + obj.info, 0xffffff));
                }
                var tishi = new DrawUtils();
                tishi.createTishiOption("gameimg_json", "tishikuang", textarr);
                this.addChild(tishi);
            }
        }
    };
    /**
         * 礼包弹框,每日礼包，VIP礼包，积分礼包
         */
    GameScene.prototype.showGiftToast = function (obj) {
        this.toastBgLayer = new egret.Sprite();
        this.toastBgLayer.graphics.beginFill(0x000000, 1);
        this.toastBgLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.toastBgLayer.graphics.endFill();
        this.toastBgLayer.width = GameUtils.SCREEN_W;
        this.toastBgLayer.height = GameUtils.SCREEN_H - 82;
        this.toastBgLayer.alpha = 0.0;
        this.addChild(this.toastBgLayer);
        this.toastBgLayer.touchEnabled = true;
        var iconlength = obj.attributes.length;
        var kuang_w = 520;
        if (iconlength <= 3) {
            kuang_w = 360;
        }
        else if (iconlength == 4) {
            kuang_w = 440;
        }
        var kuang_h = 260;
        this.toastLayer = new egret.Sprite();
        this.toastLayer.alpha = 0;
        this.toastLayer.scaleX = 0.02;
        this.toastLayer.scaleY = 0.02;
        this.toastLayer.x = (GameUtils.SCREEN_W) / 2;
        this.toastLayer.y = (GameUtils.SCREEN_H) / 2;
        this.toastLayer.width = kuang_w;
        this.toastLayer.height = kuang_h;
        this.toastLayer.anchorOffsetX = kuang_w / 2;
        this.toastLayer.anchorOffsetY = kuang_h / 2;
        this.addChild(this.toastLayer);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var kuang = new egret.Bitmap();
        kuang.texture = this.coverimgSheet.getTexture("tishikuang1");
        kuang.x = 0;
        kuang.y = 0;
        this.toastLayer.addChild(kuang);
        var kuangscaleGrid = new egret.Rectangle(34, 34, 34, 34);
        kuang.scale9Grid = kuangscaleGrid;
        kuang.width = kuang_w;
        kuang.height = kuang_h + 20;
        var titlestr = "";
        var desstr = "";
        if (obj.gift_type == 0) {
            //0:每日礼包
            titlestr = "gifttitle";
            desstr = "成功领取每日礼包";
        }
        else if (obj.gift_type == 9) {
            //9：积分礼包 
            titlestr = "gifttitle_1";
            desstr = "成功领取积分礼包";
        }
        else if (obj.gift_type == 10) {
            //10：节日礼包
            titlestr = "gifttitle";
            desstr = "成功领取节日礼包";
        }
        else if (obj.gift_type == 11) {
            //11：QQ空间专属礼包
            titlestr = "gifttitle";
            desstr = "成功领取QQ空间专属礼包";
        }
        else if (obj.gift_type == 12) {
            //12：VIP礼包
            titlestr = "gifttitle";
            desstr = "成功领取VIP礼包";
        }
        else {
            //非以上类型的礼包
            titlestr = "gifttitle";
            desstr = "成功领取礼包";
        }
        var title = new egret.Bitmap();
        title.texture = this.coverimgSheet.getTexture(titlestr);
        title.x = (kuang_w - title.texture.textureWidth) / 2;
        title.anchorOffsetY = title.texture.textureHeight;
        title.y = 20;
        this.toastLayer.addChild(title);
        var des = new egret.TextField();
        des.x = 0;
        des.y = 40;
        des.textColor = 0xff0000;
        des.size = GameUtils.TEXT_SIZE_MIDDLE;
        des.text = desstr;
        this.toastLayer.addChild(des);
        des.width = kuang_w;
        des.textAlign = egret.HorizontalAlign.CENTER;
        var icon_W = (kuang_w - 88 * iconlength) / (iconlength + 1);
        var icon_x = icon_W;
        for (var i = 0; i < iconlength; i++) {
            var icon = new egret.Bitmap();
            icon.texture = this.gameimgSheet.getTexture(this.getGiftIconName(obj.attributes[i].type));
            icon.x = icon_x + (88 + icon_W) * i;
            icon.y = (kuang_h - 88) / 2 + 20;
            this.toastLayer.addChild(icon);
            var giftnum = new egret.TextField();
            giftnum.x = icon_x + (88 + icon_W) * i;
            giftnum.y = (kuang_h - 88) / 2 + 20 + 88 + 5;
            giftnum.textColor = 0xff0000;
            giftnum.size = 16;
            giftnum.text = "+" + obj.attributes[i].value;
            this.toastLayer.addChild(giftnum);
            giftnum.width = 88;
            giftnum.textAlign = egret.HorizontalAlign.CENTER;
        }
        var okbtn = new egret.Bitmap();
        okbtn.texture = this.coverimgSheet.getTexture("ok1");
        okbtn.x = (kuang_w - 126) / 2;
        okbtn.y = kuang_h - 10;
        this.toastLayer.addChild(okbtn);
        okbtn.touchEnabled = true;
        okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearToastLayer, this);
    };
    GameScene.prototype.getGiftIconName = function (icontype) {
        var iconname = "qqbggift";
        if (icontype == 0) {
            iconname = "duihuan_icon_1";
        }
        else if (icontype == 4) {
            iconname = "duihuan_icon_3";
        }
        else if (icontype == 5) {
            iconname = "duihuan_icon_2";
        }
        else if (icontype == 10) {
            iconname = "qqbggift";
        }
        else if (icontype == 11) {
            iconname = "duihuan_icon_0";
        }
        return iconname;
    };
    GameScene.prototype.clearToastLayer = function (evt) {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.toastLayer) {
                this.toastLayer.removeChildren();
                if (this.toastLayer.parent) {
                    this.toastLayer.parent.removeChild(this.toastLayer);
                }
            }
            if (this.toastBgLayer) {
                this.toastBgLayer.removeChildren();
                if (this.toastBgLayer.parent) {
                    this.toastBgLayer.parent.removeChild(this.toastBgLayer);
                }
            }
        }, this);
    };
    GameScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*
     * 获得人物名字
     */
    GameScene.prototype.getRoleName = function (str) {
        var findname = false;
        for (var i = 0; i < this.rolenameStr.length; i++) {
            if (str == this.rolenameStr[i]) {
                str = this.rolenameImgStr[i];
                findname = true;
            }
        }
        if (!findname) {
            str = "heiying_name";
        }
        return str;
    };
    GameScene.prototype.initPreLoad = function (sceneindex) {
        GameUtils.loadingType = 0;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.ispreload_ok = false;
        this.showloading = false;
        this.getNextSceneNum(sceneindex);
        this.PreloadImg(this.nextscene_num);
    };
    GameScene.prototype.onPreLoadComplete = function (event) {
        if (event.groupName == "pregroup") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            if (this.preloadgamesoundgroup.length > 0) {
                GameUtils.loadingType = 1;
                this.soundloadtimeout = new SoundLoadTimeOut(this.preSoundLoadTimeOut, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadSoundComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadSoundError, this);
                RES.loadGroup("presoundgroup");
            }
            else {
                GameUtils.isLoadSoundError = false;
                this.removePreLis();
            }
        }
    };
    GameScene.prototype.getNextSceneNum = function (sceneindex) {
        var resnum = 0;
        // var ziptest = new JSZip(RES.getRes("role_data"));
        // var res = JSON.parse(ziptest.file("res.json").asText());
        var res = RES.getRes("res_json");
        if (res) {
            for (var i = res.length - 1; i >= 0; i--) {
                if (res[i].id <= sceneindex) {
                    resnum = i;
                    if (i + 1 <= res.length - 1) {
                        this.nextscene_num = res[i + 1].id;
                    }
                    else {
                        this.nextscene_num = res[i].id;
                    }
                    break;
                }
            }
        }
    };
    GameScene.prototype.PreloadImg = function (sceneindex) {
        this.preloadgamegroup = new Array();
        this.preloadgamesoundgroup = new Array();
        var resnum = 0;
        // var ziptest = new JSZip(RES.getRes("role_data"));
        // var res = JSON.parse(ziptest.file("res.json").asText());
        var res = RES.getRes("res_json");
        if (res) {
            for (var i = res.length - 1; i >= 0; i--) {
                if (res[i].id <= sceneindex) {
                    resnum = i;
                    break;
                }
            }
        }
        if (res) {
            var str = res[resnum].resources;
            var regex = ",";
            var strs = str.split(regex);
            for (var i = 0; i < strs.length; i++) {
                if (strs[i] != "black" && strs[i] != "fenkai" && strs[i] != "mohu" && strs[i] != "zhendong" && strs[i] != "xiayu") {
                    if (strs[i].indexOf("_mp3") != -1) {
                        this.preloadgamesoundgroup.push(strs[i]);
                    }
                    else {
                        this.preloadgamegroup.push(strs[i]);
                    }
                }
            }
        }
        if (this.preloadgamesoundgroup.length > 0) {
            RES.createGroup("presoundgroup", this.preloadgamesoundgroup, true);
        }
        if (this.preloadgamegroup.length > 0) {
            RES.createGroup("pregroup", this.preloadgamegroup, true);
            RES.loadGroup("pregroup");
        }
    };
    GameScene.prototype.preSoundLoadTimeOut = function () {
        GameUtils.isLoadSoundError = true;
        this.removePreLis();
    };
    GameScene.prototype.onPreloadSoundComplete = function (event) {
        if (event.groupName == "presoundgroup") {
            GameUtils.isLoadSoundError = false;
            this.removePreLis();
        }
    };
    GameScene.prototype.onPreloadSoundError = function (event) {
        if (event.groupName == "presoundgroup") {
            GameUtils.isLoadSoundError = true;
            this.removePreLis();
        }
    };
    GameScene.prototype.removePreLis = function () {
        if (this.soundloadtimeout) {
            this.soundloadtimeout.clearSoundTimer();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadSoundComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadSoundError, this);
        this.ispreload_ok = true;
        if (this.showloading) {
            this.showloading = false;
            if (this.loading.parent) {
                this.loading.parent.removeChild(this.loading);
            }
            this.nextSceneComplete();
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map