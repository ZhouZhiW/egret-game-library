/**
 *
 * @author 
 *
 */
class CoverScene extends egret.DisplayObjectContainer {
    private startbtn: egret.Bitmap;
    private restartBtn: egret.Bitmap;
    private isshowRestart: boolean = false;
    private clearGameLayer: egret.Sprite;
    private loading: LoadingUI;
    private netloading: NetLoadingUI;
    // private system_hua: particle.ParticleSystem;
    private preloadgamegroup: Array<string>;
    private preloadgamesoundgroup: Array<string>;
    private isnetok: boolean;
    private ispreload_ok: boolean;
    private showloading: boolean;
    private coverlogo: egret.Bitmap;
    private companyLogoBg: egret.Bitmap;
    private companyLogo: egret.Bitmap;
    private infolayer: egret.Sprite;
    private listlayer: egret.Sprite;
    private coverimgSheet: egret.SpriteSheet;
    private loadimgSheet: egret.SpriteSheet;
    private soundloadtimeout: SoundLoadTimeOut;
    private btnsound: egret.Bitmap;
    private orientationLayer: egret.Sprite;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.loading = new LoadingUI();
        this.addChild(this.loading);
        // this.isnetok = false;
        // this.ispreload_ok = false;
        // this.showloading = false;
        // GameUtils.dateEventSprite = new EventSprite();
        // GameUtils.dateEventSprite.addEventListener(EventData.DATA_TIME, this.callBackTime, this);
        // GameUtils.dateEventSprite.addEventListener(EventData.DATA_FRIEND, this.callBackFriend, this);
        // GameUtils.dateEventSprite.addEventListener(EventData.DATA_CHECK_TOKEN_FAILED, this.checkTokenToast, this);
        // //音乐监听是否转入后台
        // this.addSoundListener();
        // if (!GameUtils.firstOpenGame) {
        //     if (GameUtils.RELEASE_STAGE == 0) {
        //         if (!GameUtils.fromDressGame) {
        //             if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_AUTH_SUCCEED)) {
        //                 GameUtils.dateEventSprite.addEventListener(EventData.DATA_AUTH_SUCCEED, this.authSucceedCallBack, this);
        //             }
        //             if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_AUTH_FAILED)) {
        //                 GameUtils.dateEventSprite.addEventListener(EventData.DATA_AUTH_FAILED, this.authFailedCallBack, this);
        //             }
        //             var authData: Object = {
        //                 appKey: GameUtils.APPKEY_1758,
        //                 hlmy_gw: GameUtils.hlmy_gw,
        //                 userToken: GameUtils.userToken,
        //                 callback: function (data) {
        //                     if (data.result == 1) {
        //                         GameUtils.authBean = new AuthBean(data);
        //                         //                                console.log(data);
        //                         var callBackEvent = new JsCallBackEvent.CallBack();
        //                         callBackEvent.authsucceedCallBack();
        //                     } else {
        //                         var callBackEvent = new JsCallBackEvent.CallBack();
        //                         callBackEvent.authfailedCallBack();
        //                     }
        //                 }
        //             };
        //             HlmyUtils.HlmyAuth(authData);
        //         } else {
        //             var sendtokenobj = {
        //                 cmd: 10,
        //                 token: GameUtils.token,
        //                 avatar: GameUtils.GET_DRESS_PLAYER_AVATAR,
        //                 nickName: GameUtils.GET_DRESS_PLAYER_NAME,
        //                 inner: GameUtils.GET_DRESS_PLAYER_INNER,
        //                 gameVersion: GameUtils.GAME_VERSION,
        //                 return_json: 1
        //             };
        //             NetWorkUtils.sendNetPostRequest(sendtokenobj, this.getPlayerTokenComplete, this.onPostIOError, this, this);
        //         }
        //     } else if (GameUtils.RELEASE_STAGE == 1) {
        //         GameUtils.playerToken = "ReRo%2FG%2FBJLJRbSBIHvnroZURmWa17rd%2B9OtBegApvWYj4lhGKxpfa%2BuZc5Di%2F1MeJ6KtNiCPzmUi3vyIVXKFecWCFsdXuZZC";
        //         HlmyUtils.HlmyInit({ "gid": "90bcf394003a3f2d6f1630326cf980da", "appKey": GameUtils.APPKEY_1758, "hlmy_gw": "0___" });
        //         this.sandParams();
        //     } else {
        //         GameUtils.playerToken = "ReRo%2FG%2FBJLJRbSBIHvnroZURmWa17rd%2B9OtBegApvWYj4lhGKxpfa%2BuZc5Di%2F1MeJ6KtNiCPzmUi3vyIVXKFecWCFsdXuZZC";
        //         HlmyUtils.HlmyInit({ "gid": "90bcf394003a3f2d6f1630326cf980da", "appKey": GameUtils.APPKEY_1758, "hlmy_gw": "0___" });
        //         this.sandParams();
        //     }
        //     GameUtils.firstOpenGame = true;
        // } else {
        //     GameUtils.gameSandPause = false;
        //     this.sandParams();
        // }
    }
    private authSucceedCallBack() {
        var sendtokenobj = {
            cmd: 10,
            token: GameUtils.token,
            hlmy_gw: GameUtils.authBean.auth_hlmy_gw,
            nonce: GameUtils.authBean.auth_nonce,
            sign: GameUtils.authBean.auth_sign,
            timestamp: GameUtils.authBean.auth_timestamp,
            avatar: GameUtils.authBean.auth_avatar,
            gid: GameUtils.authBean.auth_gid,
            nickName: GameUtils.authBean.auth_nickName,
            sex: GameUtils.authBean.auth_sex,
            gameVersion: GameUtils.GAME_VERSION, return_json: 1
        };
        NetWorkUtils.sendNetPostRequest(sendtokenobj, this.getLoginComplete, this.onPostIOError, this, this);
    }
    private getLoginComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_10.k", event);
        //      GameUtils.debugLog(obj);
        if (obj.result == 1) {
            if (obj.pid) {
                GameUtils.playerGid = obj.pid;
                HlmyUtils.HlmysetBaseState(GameUtils.MYAPPKEY_1758);
            }
            if (obj.player_token) {
                GameUtils.playerToken = obj.player_token;
                this.sandParams();
            }
        }
    }
    private authFailedCallBack() {
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", "用户注册失败，请刷新页面重试。");
        this.addChild(tishi);
    }
    private addSoundListener(): void {
        try {
            var stage: egret.Stage = egret.MainContext.instance.stage;
            //添加激活侦听
            stage.addEventListener(egret.Event.ACTIVATE, this.activateHandler, this);
            //添加取消激活侦听
            stage.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
            //横屏监听
            stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        } catch (e) {
        }
    }
    /**
     * 横屏监听
     */
    private onOrientationChange(e: egret.StageOrientationEvent): void {
        if (window.orientation == 0 || window.orientation == 180) {
            if (this.orientationLayer) {
                this.orientationLayer.removeChildren();
            }
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            this.drawOrientation();
        }
    }
    private drawOrientation() {
        this.orientationLayer = new egret.Sprite();
        this.orientationLayer.graphics.beginFill(0x000000, 0);
        this.orientationLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.orientationLayer.graphics.endFill();
        this.addChild(this.orientationLayer);

        var ditushp: egret.Shape = new egret.Shape();
        ditushp.graphics.beginFill(0x000000, 1);
        ditushp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        ditushp.graphics.endFill();
        ditushp.alpha = 1;
        ditushp.touchEnabled = true;
        this.orientationLayer.addChild(ditushp);

        var orientationtext: egret.TextField = new egret.TextField();
        orientationtext.text = "保持竖屏，会有更好的游戏体验。";
        orientationtext.x = 0;
        orientationtext.y = 0;
        orientationtext.size = 24;
        orientationtext.width = this.stage.stageWidth;
        orientationtext.height = this.stage.stageHeight;
        orientationtext.textColor = 0xffffff;
        orientationtext.verticalAlign = egret.VerticalAlign.MIDDLE;
        orientationtext.textAlign = egret.HorizontalAlign.CENTER;
        this.orientationLayer.addChild(orientationtext);
    }
    private activateHandler(): void {
        //从后台转成激活状态时恢复音乐播放
        try {
            if (!GameUtils.isLoadSoundError) {
                if (GameUtils.gameSound) {
                    GameUtils.gameSoundChannel = GameUtils.gameSound.play();
                    GameUtils.gameSoundChannel.volume = 1.0;
                }
            }
        } catch (e) {
        }
    }

    private deactivateHandler(): void {
        //转入后台时关闭音乐播放
        try {
            if (!GameUtils.isLoadSoundError) {
                if (GameUtils.gameSound) {
                    GameUtils.stopSound();
                }
            }
        } catch (e) {
        }
    }
    private loadCover() {
        GameUtils.loadingType = 0;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("cover");
    }
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (this.loading) {
            this.loading.setProgress(GameUtils.loadingType, event.itemsLoaded, event.itemsTotal);
        }
    }
    private onLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "cover") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
            this.loadSound();
        }
    }
    private loadComplete() {
        console.log("11111111111111111111111");
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getisshowRestart, this.onPostIOError, this, this);
    }
    public getisshowRestart(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        console.log(obj);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            if (this.loading.parent) {
                this.loading.parent.removeChild(this.loading);
            }
            if (GameUtils.playerBean.player_current_in == GameUtils.firstChapterId) {
                this.isshowRestart = false;
            } else {
                this.isshowRestart = true;
            }
            this.coverimgSheet = RES.getRes("coverimg_json");
            this.loadimgSheet = RES.getRes("loadimg_json");

            this.createScene();

            if (!GameUtils.noGongGao) {
                if (GameUtils.initState != 2) {
                    this.sandGongGao();
                } else {
                    this.sandMoreGame();
                }
            } else {
                this.sandMoreGame();
            }
        }
    }
    private loadSound() {
        GameUtils.loadingType = 1;
        this.soundloadtimeout = new SoundLoadTimeOut(this.coverSoundLoadTimeOut, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadSoundComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadSoundError, this);
        RES.loadGroup("coversound");
    }
    public coverSoundLoadTimeOut() {
        GameUtils.isLoadSoundError = true;
        this.removeCoverLis();
    }
    private onLoadSoundComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "coversound") {
            GameUtils.isLoadSoundError = false;
            this.removeCoverLis();
        }
    }
    private onLoadSoundError(event: RES.ResourceEvent): void {
        if (event.groupName == "coversound") {
            GameUtils.isLoadSoundError = true;
            this.removeCoverLis();
        }
    }
    private removeCoverLis(): void {
        if (this.soundloadtimeout) {
            this.soundloadtimeout.clearSoundTimer();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadSoundComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadSoundError, this);
        this.loadComplete();
    }
    private getPlayerTokenComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_10.k", event);
        if (obj.result == 1) {
            if (obj.pid) {
                GameUtils.playerGid = obj.pid;
                HlmyUtils.HlmyInit({ "gid": GameUtils.playerGid, "appKey": GameUtils.APPKEY_1758, "hlmy_gw": GameUtils.hlmy_gw });
                HlmyUtils.HlmysetBaseState(GameUtils.MYAPPKEY_1758);
            }
            if (obj.player_token) {
                GameUtils.playerToken = obj.player_token;
                this.sandParams();
            }
        }
    }
    private sandParams(): void {
        // if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ADAPT_PARAMS)) {
        //     GameUtils.dateEventSprite.addEventListener(EventData.DATA_ADAPT_PARAMS, this.callBackAdaptParams, this);
        // }
        // HlmyUtils.HlmyAdaptParams();

        this.loadCover();
    }
    private callBackAdaptParams(event: EventData) {
        this.loadCover();
        if (GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ADAPT_PARAMS)) {
            GameUtils.dateEventSprite.removeEventListener(EventData.DATA_ADAPT_PARAMS, this.callBackAdaptParams, this);
        }
    }
    private sandGongGao() {
        NetWorkUtils.sendSimpleNetPostRequest(11, this.getGongGaoComplete, this.onPostIOError, this, this);
    }
    private createScene(): void {
        var coverbg: egret.Bitmap = new egret.Bitmap();
        coverbg.texture = RES.getRes("coverbg_jpg");
        coverbg.name = "coverbg";
        coverbg.x = 0;
        coverbg.y = 0;
        this.addChild(coverbg);


        // egret.Ticker.getInstance().register(function (frameTime: number) { dragonBones.WorldClock.clock.advanceTime(-1) }, this);

        // var dbFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        // GameUtils.addArmatureToFactory(dbFactory, "fengmianrenwu_json", "texture_json", "texture_png");
        // var armature: dragonBones.Armature = dbFactory.buildArmature("fengmiandonghua");
        // this.addChild(armature.display);
        // armature.display.x = 0;
        // armature.display.y = GameUtils.SCREEN_H;
        // dragonBones.WorldClock.clock.add(armature);
        // armature.animation.gotoAndPlay("piaoyang");

        // var texture = RES.getRes("huaban_png");
        // var config = RES.getRes("huaban_json");
        // this.system_hua = new particle.GravityParticleSystem(texture, config);
        // this.addChild(this.system_hua);
        // this.system_hua.start();

        if (GameUtils.is_iphone_x) {
            this.companyLogoBg = new egret.Bitmap();
            this.companyLogoBg.texture = this.coverimgSheet.getTexture("companyLogobg");
            this.companyLogoBg.x = 20;
            this.companyLogoBg.y = GameUtils.SCREEN_H - 185;
            this.addChild(this.companyLogoBg);
            var bgrect1: egret.Rectangle = new egret.Rectangle(20, 20, 20, 20);
            this.companyLogoBg.scale9Grid = bgrect1;
            this.companyLogoBg.width = GameUtils.SCREEN_W - 20 * 2;
            this.companyLogoBg.height = 110;

            this.companyLogo = new egret.Bitmap();
            this.companyLogo.texture = this.coverimgSheet.getTexture("companyLogo");
            this.companyLogo.x = (GameUtils.SCREEN_W - 300) / 2;
            this.companyLogo.y = GameUtils.SCREEN_H - 185 + 16;
            this.addChild(this.companyLogo);
        }

        this.coverlogo = new egret.Bitmap();
        this.coverlogo.texture = this.coverimgSheet.getTexture("coverlogo");
        this.coverlogo.x = GameUtils.SCREEN_W - 250;
        this.coverlogo.y = -coverbg.texture.textureHeight - 50;
        this.addChild(this.coverlogo);

        if (GameUtils.initState != 2) {
            var sbtn_x: number = (GameUtils.SCREEN_W - 172 - 182 - 40) / 2;
            this.restartBtn = new egret.Bitmap();
            this.restartBtn.texture = this.coverimgSheet.getTexture(this.isshowRestart ? "start2" : "start3");
            this.restartBtn.x = sbtn_x;
            this.restartBtn.y = GameUtils.SCREEN_H - 300;
            this.addChild(this.restartBtn);
            this.restartBtn.alpha = 0;

            this.startbtn = new egret.Bitmap();
            this.startbtn.texture = this.coverimgSheet.getTexture("start1");
            this.startbtn.x = sbtn_x + 172 + 40;
            this.startbtn.y = GameUtils.SCREEN_H - 300;
            this.addChild(this.startbtn);
            this.startbtn.alpha = 0;
        } else {
            var start = egret.Tween.get(this);
            start.wait(3000).call(function () {
                this.playDianSound();
                if (this.isnetok && this.ispreload_ok) {
                    this.removeChildren();
                    var gamescene = new GameScene();
                    this.addChild(gamescene);

                } else {
                    this.showloading = true;
                    this.loading = new LoadingUI();
                    this.addChild(this.loading);
                }
            }, this);
        }
        var jiankang1: egret.Bitmap = new egret.Bitmap();
        jiankang1.texture = this.loadimgSheet.getTexture("jiankang1");
        jiankang1.x = GameUtils.SCREEN_W / 2 - jiankang1.texture.textureWidth;
        jiankang1.y = GameUtils.SCREEN_H - 80;
        this.addChild(jiankang1);

        var jiankang2: egret.Bitmap = new egret.Bitmap();
        jiankang2.texture = this.loadimgSheet.getTexture("jiankang2");
        jiankang2.x = GameUtils.SCREEN_W / 2;
        jiankang2.y = GameUtils.SCREEN_H - 80;
        this.addChild(jiankang2);

        var company: egret.TextField = new egret.TextField();
        company.x = 0;
        company.y = GameUtils.SCREEN_H - 30;
        company.width = GameUtils.SCREEN_W;
        company.height = 30;
        company.textColor = 0xffffff;
        company.size = 16;
        company.text = "声明：本应用由“北京寰立铭宇信息技术有限公司”提供";
        company.verticalAlign = egret.VerticalAlign.MIDDLE;
        company.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(company);
        company.strokeColor = 0x000000;
        company.stroke = 2;

        var zhengban: egret.Bitmap = new egret.Bitmap();
        zhengban.texture = this.loadimgSheet.getTexture("zhengban");
        zhengban.x = (GameUtils.SCREEN_W - zhengban.texture.textureWidth) / 2;
        zhengban.y = 0;
        this.addChild(zhengban);

        if (egret.localStorage.getItem(GameUtils.SAVE_SOUND) == "soundclose") {
            GameUtils.isSound = false;
        } else {
            GameUtils.isSound = true;
        }

        if ("fengmian_mp3" != GameUtils.gameSoundName && !GameUtils.isLoadSoundError) {
            GameUtils.gameSoundName = "fengmian_mp3";
            if (!GameUtils.gameSoundChannel) {
                GameUtils.playSound("fengmian_mp3");
            } else {
                GameUtils.stopSound();
                GameUtils.playSound("fengmian_mp3");
            }
        }

        this.infolayer = new egret.Sprite();
        this.addChild(this.infolayer);

        if (GameUtils.channelStr != "玩吧") {
            this.btnsound = new egret.Bitmap();
            this.btnsound.texture = this.coverimgSheet.getTexture("btn_sound_0");
            this.btnsound.name = "0";
            this.btnsound.x = GameUtils.SCREEN_W - 60;
            this.btnsound.y = GameUtils.SCREEN_H - 265;
            this.addChild(this.btnsound);
            this.btnsound.touchEnabled = true;
            this.btnsound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSound, this);
        }
        var version: egret.TextField = new egret.TextField();
        version.x = 0;
        version.y = GameUtils.SCREEN_H - 20;
        version.height = 20;
        version.textColor = 0xffffff;
        version.size = 12;
        version.text = GameUtils.GAME_VERSION;
        version.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(version);
        version.strokeColor = 0x000000;
        version.stroke = 2;
        if (window.orientation == 90 || window.orientation == -90) {
            this.drawOrientation();
        }
    }
    private playDianSound() {
        if (!GameUtils.isLoadSoundError) {
            GameUtils.gameSoundName = "dian_mp3";
            GameUtils.stopSound();
            GameUtils.playSound("dian_mp3");
        }
    }
    private btnSound(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btnimg: egret.Bitmap = evt.currentTarget;
        if (btnimg) {
            var id: number = parseInt(btnimg.name);
            id = id == 0 ? 1 : 0;
            this.btnsound.texture = this.coverimgSheet.getTexture((id == 0 ? "btn_sound_0" : "btn_sound_1"));
            this.btnsound.name = "" + id;
            if (!GameUtils.isLoadSoundError) {
                GameUtils.gameSoundName = "fengmian_mp3";
                if (!GameUtils.gameSoundChannel) {
                    GameUtils.playSound("fengmian_mp3");
                } else {
                    GameUtils.stopSound();
                    GameUtils.playSound("fengmian_mp3");
                }
            }
        }
    }

    private showMoreGame(): void {

        var morebtn: egret.Bitmap = new egret.Bitmap();
        morebtn.texture = this.coverimgSheet.getTexture("morebtn");
        morebtn.x = (GameUtils.SCREEN_W - morebtn.texture.textureWidth) / 2;
        morebtn.y = GameUtils.SCREEN_H - 200 - 35;
        this.addChild(morebtn);
        morebtn.touchEnabled = true;
        morebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMoreGame, this);

        var morebg0: egret.Bitmap = new egret.Bitmap();
        morebg0.texture = this.coverimgSheet.getTexture("morebg0");
        morebg0.x = 20;
        morebg0.y = GameUtils.SCREEN_H - 150 - 35;
        this.addChild(morebg0);
        var bgrect1: egret.Rectangle = new egret.Rectangle(20, 20, 20, 20);
        morebg0.scale9Grid = bgrect1;
        morebg0.width = GameUtils.SCREEN_W - 20 * 2;
        morebg0.height = 100;
        morebg0.touchEnabled = true;
        morebg0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMoreGame, this);

        for (var i = 0; i < 2; i++) {
            var morebg1: egret.Bitmap = new egret.Bitmap();
            morebg1.texture = this.coverimgSheet.getTexture("morebg1");
            morebg1.x = 25;
            morebg1.y = GameUtils.SCREEN_H - 143 - 35 + 47 * i;
            this.addChild(morebg1);
            var bgrect1: egret.Rectangle = new egret.Rectangle(12, 12, 12, 12);
            morebg1.scale9Grid = bgrect1;
            morebg1.width = GameUtils.SCREEN_W - 25 * 2;
            morebg1.height = 40;

            if (GameUtils.moregame_list[i].more_state == 1 || GameUtils.moregame_list[i].more_state == 2) {
                var iconname: string = GameUtils.moregame_list[i].more_state == 1 ? "moreicon1" : "moreicon2";
                var moreicon: egret.Bitmap = new egret.Bitmap();
                moreicon.texture = this.coverimgSheet.getTexture(iconname);
                moreicon.x = 25;
                moreicon.y = GameUtils.SCREEN_H - 143 - 35 + 47 * i;
                this.addChild(moreicon);
            }

            var morename: egret.TextField = new egret.TextField();
            morename.x = 65;
            morename.y = GameUtils.SCREEN_H - 143 - 35 + 47 * i;
            morename.height = 40;
            morename.width = GameUtils.SCREEN_W - 90;
            morename.textColor = 0xffffff;
            morename.size = 24;
            morename.text = TextUtils.getChar((GameUtils.moregame_list[i].more_name + GameUtils.moregame_list[i].more_description), 18);
            morename.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(morename);

        }
        this.listlayer = new egret.Sprite();
        this.addChild(this.listlayer);
    }
    private btnMoreGame(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        //        this.drawMoreGameList();
        window.location.href = GameUtils.dressUrl + "&state=t3" + GameUtils.tongji_url;
    }
    private drawMoreGameList(): void {
        var morebg0: egret.Bitmap = new egret.Bitmap();
        morebg0.texture = this.coverimgSheet.getTexture("morebg0");
        morebg0.x = 20;
        morebg0.y = 40;
        this.listlayer.addChild(morebg0);
        var bgrect1: egret.Rectangle = new egret.Rectangle(20, 20, 20, 20);
        morebg0.scale9Grid = bgrect1;
        morebg0.width = GameUtils.SCREEN_W - 20 * 2;
        morebg0.height = GameUtils.SCREEN_H - 80;
        morebg0.touchEnabled = true;

        var morebtn: egret.Bitmap = new egret.Bitmap();
        morebtn.texture = this.coverimgSheet.getTexture("morebtn");
        morebtn.x = (GameUtils.SCREEN_W - morebtn.texture.textureWidth) / 2;
        morebtn.y = 45;
        this.listlayer.addChild(morebtn);

        var closemore = new egret.Bitmap();
        closemore.texture = this.coverimgSheet.getTexture("closemenu");
        closemore.x = GameUtils.SCREEN_W - closemore.texture.textureWidth - 5;
        closemore.y = 13;
        this.listlayer.addChild(closemore);
        closemore.touchEnabled = true;
        closemore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMoreList, this);

        var list = new MoreGameList();
        this.listlayer.addChild(list);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(list);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 80 - 50;
        myscrollView.x = 0;
        myscrollView.y = 80;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listlayer.addChild(myscrollView);

    }
    private closeMoreList(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.listlayer) {
            this.listlayer.removeChildren();
        }
    }
    public callBackTime(event: EventData) {
        NetWorkUtils.sendSimpleNetPostRequest(206, this.getSharefriend, this.onPostIOError, this, this);
    }
    public getSharefriend(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_206.k", event);
        if (obj.info) {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);

            NetWorkUtils.sendSimpleNetPostRequest(100, this.getShareFriendPlayerComplete, this.onPostIOError, this, this);
        }
    }
    public getShareFriendPlayerComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            this.sendSharList();
        }
    }
    private sendSharList() {
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    }

    private getsharelistComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
    }
    public callBackFriend(event: EventData) {
        NetWorkUtils.sendSimpleNetPostRequest(206, this.getSharefriend, this.onPostIOError, this, this);
    }
    public checkTokenToast() {
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", "登录验证失效。");
        this.addChild(tishi);
    }
    private getGongGaoComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_11.k", event);
        // console.log(obj);
        if (obj.title && obj.info) {
            this.drawInfo(obj.title, obj.info);
        } else {
            this.sandMoreGame();
        }
    }
    private sandMoreGame(): void {
        NetWorkUtils.sendSimpleNetPostRequest(12, this.getMoreComplete, this.onPostIOError, this, this);
    }
    private getMoreComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_12.k", event);
        if (obj.catalogues) {
            if (obj.catalogues.length > 0) {
                GameUtils.moregame_list = new Array();
                for (var i: number = 0; i < obj.catalogues.length; i++) {
                    GameUtils.moregame_list.push(new MoreGameBean(obj.catalogues[i].id, obj.catalogues[i].icon, obj.catalogues[i].name,
                        obj.catalogues[i].description ? obj.catalogues[i].description : " ", obj.catalogues[i].url, obj.catalogues[i].state, obj.catalogues[i].order));
                }
                GameUtils.moregame_list.sort(function (a, b) {
                    return b.more_order - a.more_order;
                });
            }
        }
        this.showLogoTween();
        this.sandPropertyM();
    }
    private sandPropertyM() {
        NetWorkUtils.sendSimpleNetPostRequest(111, this.getPropertyModelComplete, this.onPostIOError, this, this);
    }
    private getPropertyModelComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_111.k", event);
        if (obj.result == 1) {
            if (obj.items) {
                if (obj.items.length > 0) {
                    GameUtils.propertyModeList = new Array();
                    for (var i: number = 0; i < obj.items.length; i++) {
                        GameUtils.propertyModeList.push(new PropertyModeBean(
                            obj.items[i].item_id,
                            obj.items[i].attribute_type,
                            obj.items[i].price,
                            obj.items[i].money_type,
                            obj.items[i].value,
                            obj.items[i].npc_id));
                    }
                }
            }
        }
        this.sandShopM();
    }
    private sandShopM() {
        NetWorkUtils.sendSimpleNetPostRequest(200, this.getShopModelComplete, this.onPostIOError, this, this);
    }
    public drawInfo(gonggaotitle: string, gonggaoinfo: string) {
        var alphaspr: egret.Sprite = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.0;
        this.infolayer.addChild(alphaspr);
        alphaspr.touchEnabled = true;

        var infobg: egret.Bitmap = new egret.Bitmap();
        infobg.texture = this.coverimgSheet.getTexture("msgbg");
        infobg.x = (GameUtils.SCREEN_W - 500) / 2;
        infobg.y = 60;
        this.infolayer.addChild(infobg);
        var bgrectsound: egret.Rectangle = new egret.Rectangle(50, 50, 50, 50);
        infobg.scale9Grid = bgrectsound;
        infobg.width = 500;
        infobg.height = GameUtils.SCREEN_H - 120;

        var msgkuang1: egret.Bitmap = new egret.Bitmap();
        msgkuang1.texture = this.coverimgSheet.getTexture("msgkuang1");
        msgkuang1.x = (GameUtils.SCREEN_W - msgkuang1.texture.textureWidth) / 2;
        msgkuang1.y = 70;
        this.infolayer.addChild(msgkuang1);

        var name: egret.TextField = new egret.TextField();
        name.x = 0;
        name.y = 60;
        name.height = 70;
        name.width = GameUtils.SCREEN_W;
        name.textColor = 0xffdf48;
        name.size = GameUtils.TEXT_SIZE_MIDDLE;
        name.text = gonggaotitle;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.textAlign = egret.HorizontalAlign.CENTER;
        this.infolayer.addChild(name);
        name.strokeColor = 0xae6363;
        name.stroke = 2;

        var info: egret.TextField = new egret.TextField();
        info.x = 40;
        info.y = 10;
        info.width = GameUtils.SCREEN_W - 120;
        info.textColor = 0x000000;
        info.size = GameUtils.TEXT_SIZE_MIDDLE;
        info.textFlow = (new egret.HtmlTextParser).parser(gonggaoinfo);
        info.lineSpacing = 8;
        this.infolayer.addChild(info);
        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(info);
        myscrollView.x = 20;
        myscrollView.y = 140;
        myscrollView.width = GameUtils.SCREEN_W - 40;
        myscrollView.height = GameUtils.SCREEN_H - 140 - 80;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.infolayer.addChild(myscrollView);

        var closegonggao: egret.Bitmap = new egret.Bitmap();
        closegonggao.texture = this.coverimgSheet.getTexture("closemenu");
        closegonggao.x = GameUtils.SCREEN_W - closegonggao.texture.textureWidth - 25;
        closegonggao.y = 65;
        this.infolayer.addChild(closegonggao);
        closegonggao.touchEnabled = true;
        closegonggao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGongGao, this);
    }
    private closeGongGao(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.infolayer) {
            this.infolayer.removeChildren();
        }
        this.sandMoreGame();
    }
    private showLogoTween(): void {
        if (this.coverlogo) {
            var move = egret.Tween.get(this.coverlogo);
            move.to({ y: 30 }, 2000, egret.Ease.backOut);
        }
        if (this.startbtn) {
            var btnalpha = egret.Tween.get(this.startbtn);
            btnalpha.wait(2000).to({ alpha: 1 }, 500).call(function () {
                this.startbtn.touchEnabled = true;
                this.startbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.coverBtn, this);
                if (GameUtils.noDress && GameUtils.initState != 2) {
                    if (GameUtils.moregame_list.length > 0) {
                        if (GameUtils.is_iphone_x) {
                            this.companyLogo.visible = false;
                            this.companyLogoBg.visible = false;
                        }
                        this.showMoreGame();
                    }
                }
            }, this);
        }
        if (this.restartBtn) {
            var btnalpha = egret.Tween.get(this.restartBtn);
            btnalpha.wait(2000).to({ alpha: 1 }, 500).call(function () {
                this.restartBtn.touchEnabled = true;
                this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.isshowRestart ? this.coverRestartBtn : this.nocoverRestartBtn, this);
            }, this);
        }
    }
    private getShopModelComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_200.k", event);
        if (obj.props) {
            if (obj.props.length > 0) {
                GameUtils.shopModelList = new Array();
                for (var i: number = 0; i < obj.props.length; i++) {
                    GameUtils.shopModelList.push(new ShopModelBean(obj.props[i].description, obj.props[i].id, obj.props[i].name,
                        obj.props[i].scope, obj.props[i].value));
                }
            }
        }
        if (obj.triggers.length > 0) {
            GameUtils.endModelList = new Array();
            for (var i: number = 0; i < obj.triggers.length; i++) {
                GameUtils.endModelList.push(new TriggerModelBean(obj.triggers[i]));
            }
        }
        if (obj.ad_frequency) {
            GameUtils.checktime = obj.ad_frequency;
        }
        if (obj.ad_reward) {
            GameUtils.check_ad_reward = obj.ad_reward;
        }
        NetWorkUtils.sendSimpleNetPostRequest(201, this.getShopListComplete, this.onPostIOError, this, this);

    }
    private getShopListComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_201.k", event);
        if (obj.items) {
            if (obj.items.length > 0) {
                GameUtils.shopGoodsList = new Array();
                for (var i: number = 0; i < obj.items.length; i++) {
                    if (obj.items[i].id == 109) {
                        GameUtils.isShowLibaoIcon = true;
                    } else {
                        if (obj.items[i].id == 31) {//超值大礼包980金额
                            if (GameUtils.channelStr == "玩吧") {
                                GameUtils.shopGoodsList.push(new ShopListBean(obj.items[i]));
                            }
                        } else {
                            GameUtils.shopGoodsList.push(new ShopListBean(obj.items[i]));
                        }

                        if (obj.items[i].id == 11) {
                            GameUtils.fuhuo_zuanshi = obj.items[i].price;
                        }
                        if (obj.items[i].id == 99) {
                            GameUtils.isShowMiansiIcon = true;
                            GameUtils.miansi_price = obj.items[i].price;
                        }
                        if (obj.items[i].id == 200
                            || obj.items[i].id == 201
                            || obj.items[i].id == 202
                            || obj.items[i].id == 203) {
                            //国庆礼包
                            GameUtils.noNationalDay = true;
                            GameUtils.nationalDayidArr.push(obj.items[i].id);
                        }
                    }
                }
                GameUtils.nationalDayidArr.sort(function (a, b) {
                    return a - b;
                });
                GameUtils.shopGoodsList.sort(function (a, b) {
                    return a.shopl_order - b.shopl_order;
                });

                //
                for (var i: number = 0; i < GameUtils.shopGoodsList.length; i++) {
                    if (GameUtils.shopGoodsList[i].shopl_goods_type == 1) {
                        if (GameUtils.shopGoodsList[i].shopl_price == 5 || GameUtils.shopGoodsList[i].shopl_price == 6) {
                            GameUtils.SHOUCHONG_GOODS_ID = GameUtils.shopGoodsList[i].shopl_id;
                        }
                    }
                }
            }
        }
        NetWorkUtils.sendSimpleNetPostRequest(14, this.getHuodongShopListComplete, this.onPostIOError, this, this);
    }
    private getHuodongShopListComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_14.k", event);
        // console.log(obj);
        if (obj.items) {
            if (obj.items.length > 0) {
                GameUtils.isShowHongdongShop = true;
                GameUtils.huodongShopGoodsList = new Array();
                for (var i: number = 0; i < obj.items.length; i++) {
                    GameUtils.huodongShopGoodsList.push(new ShopListBean(obj.items[i]));
                }
                GameUtils.huodongShopGoodsList.sort(function (a, b) {
                    return a.shopl_order - b.shopl_order;
                });
                // for (var i: number = 0; i < GameUtils.huodongShopGoodsList.length; i++) {
                //     console.log("id: " + GameUtils.huodongShopGoodsList[i].shopl_id + "  item_code: " + GameUtils.huodongShopGoodsList[i].shopl_item_code + "  description: " + GameUtils.huodongShopGoodsList[i].shopl_description)
                // }
            }
        }

        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    }
    private coverBtn(evt: egret.TouchEvent) {
        if (this.showloading) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.playDianSound();
        if (this.isnetok && this.ispreload_ok) {
            this.removeChildren();
            var gamescene = new GameScene();
            this.addChild(gamescene);

        } else {
            this.showloading = true;
            this.loading = new LoadingUI();
            this.addChild(this.loading);
        }
    }
    private coverRestartBtn(evt: egret.TouchEvent) {
        if (this.showloading) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawClearGameSave();
    }
    private nocoverRestartBtn(evt: egret.TouchEvent) {
        if (this.showloading) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var toast = new DrawUtils();
        toast.createTishi("coverimg_json", "tishikuang1", "当前没有游戏进度，无需清除存档。请点击开始阅读。");
        this.addChild(toast);
    }
    public drawClearGameSave(): void {
        this.clearGameLayer = new egret.Sprite();
        this.clearGameLayer.graphics.beginFill(0x000000, 0);
        this.clearGameLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.clearGameLayer.graphics.endFill();
        this.addChild(this.clearGameLayer);

        var tishi: egret.Shape = new egret.Shape();
        tishi.graphics.beginFill(0x000000, 1);
        tishi.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        tishi.graphics.endFill();
        tishi.alpha = 0;
        tishi.touchEnabled = true;
        this.clearGameLayer.addChild(tishi);

        var start_y: number = (GameUtils.SCREEN_H - 260) / 2;
        var duihuanbg: egret.Bitmap = new egret.Bitmap();
        duihuanbg.texture = this.coverimgSheet.getTexture("msgbg");
        duihuanbg.x = (GameUtils.SCREEN_W - 460) / 2;
        duihuanbg.y = start_y;
        this.clearGameLayer.addChild(duihuanbg);
        var bgrectsound: egret.Rectangle = new egret.Rectangle(50, 50, 50, 50);
        duihuanbg.scale9Grid = bgrectsound;
        duihuanbg.width = 460;
        duihuanbg.height = 260;

        var name: egret.TextField = new egret.TextField();
        name.x = (GameUtils.SCREEN_W - 393) / 2;
        name.y = start_y + 40;
        name.height = 200;
        name.width = 393;
        name.textColor = 0xff0000;
        name.size = GameUtils.TEXT_SIZE_MIDDLE;
        name.text = "注意！重新开始(如果没有免死金牌)需花费一颗还魂丹，将会清除现有进度和属性数据，以便挑战其他结局！";
        this.clearGameLayer.addChild(name);

        var clear: egret.Bitmap = new egret.Bitmap();
        clear.texture = this.coverimgSheet.getTexture("ok1");
        clear.x = 100;
        clear.y = start_y + 180;
        this.clearGameLayer.addChild(clear);
        clear.touchEnabled = true;
        clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearGameSave, this);

        var back: egret.Bitmap = new egret.Bitmap();
        back.texture = this.coverimgSheet.getTexture("quxiao");
        back.x = GameUtils.SCREEN_W - 126 - 100;
        back.y = start_y + 180;
        this.clearGameLayer.addChild(back);
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backSet, this);
    }
    private clearGameSave(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.clearGameLayer) {
            this.clearGameLayer.removeChildren();
        }
        NetWorkUtils.sendSimpleNetPostRequest(104, this.getcleargameComplete, this.onPostIOError, this, this);
    }
    private backSet(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.clearGameLayer) {
            this.clearGameLayer.removeChildren();
        }
    }
    private getcleargameComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_104.k", event);
        //        GameUtils.debugLog(obj);
        if (obj.result == 0) {
            var toast = new DrawUtils();
            toast.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(toast);
        } else {
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getRestartPlayerComplete, this.onPostIOError, this, this);
        }
    }
    private getRestartPlayerComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        //    GameUtils.debugLog(obj);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            GameUtils.draw_yuanbao_num = obj.player.yuanbao;
            GameUtils.draw_jinpai_num = obj.player.jinpai;
            GameUtils.draw_tili_num = obj.player.tili;
            GameUtils.draw_miansi_num = obj.player.miansi;
            var nowData = new Date();
            var num: number = 4 * 24 * 60 * 60 * 1000;
            if (nowData.getTime() - GameUtils.playerBean.player_regtime > num) {
                GameUtils.isNewPlayerFourDay = true;
            }
            var isnew: boolean = GameUtils.playerBean.player_isnew == 0 ? false : true;
            var roleobj = {
                "serverId": 1,//区服id
                "serverName": "1区",//区服名称
                "isNewRole": isnew,//是否是新创建的角色
                "roleId": GameUtils.playerBean.player_id,//角色id
                "roleName": GameUtils.playerBean.player_name,//角色名称
                "roleLevel": 0,//角色级别
                "roleCoins": GameUtils.playerBean.player_yuanbao,//角色当前的财富值
                "roleCreateTime": GameUtils.playerBean.player_regtime//角色创建时间
            };
            HlmyUtils.HlmyRoleInfo(roleobj);
        }
        //预加载资源
        this.showloading = true;
        this.isnetok = true;
        var initscencindex: number = GameUtils.firstChapterId;
        if (GameUtils.playerBean.player_die == 0) {
            initscencindex = GameUtils.playerBean.player_current_in;
        } else {
            initscencindex = GameUtils.playerBean.player_die_in;
        }
        // initscencindex = 101197000000;
        GameUtils.loadingType = 0;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.PreloadImg(initscencindex);
    }
    private getPlayerComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            GameUtils.draw_yuanbao_num = obj.player.yuanbao;
            GameUtils.draw_jinpai_num = obj.player.jinpai;
            GameUtils.draw_tili_num = obj.player.tili;
            GameUtils.draw_miansi_num = obj.player.miansi;
            var nowData = new Date();
            var num: number = 4 * 24 * 60 * 60 * 1000;
            if (nowData.getTime() - GameUtils.playerBean.player_regtime > num) {
                GameUtils.isNewPlayerFourDay = true;
            }
            var isnew: boolean = GameUtils.playerBean.player_isnew == 0 ? false : true;
            var roleobj = {
                "serverId": 1,//区服id
                "serverName": "1区",//区服名称
                "isNewRole": isnew,//是否是新创建的角色
                "roleId": GameUtils.playerBean.player_id,//角色id
                "roleName": GameUtils.playerBean.player_name,//角色名称
                "roleLevel": 0,//角色级别
                "roleCoins": GameUtils.playerBean.player_yuanbao,//角色当前的财富值
                "roleCreateTime": GameUtils.playerBean.player_regtime//角色创建时间
            };
            HlmyUtils.HlmyRoleInfo(roleobj);
        }

        this.isnetok = true;
        var initscencindex: number = GameUtils.firstChapterId;
        if (GameUtils.playerBean.player_die == 0) {
            initscencindex = GameUtils.playerBean.player_current_in;
        } else {
            initscencindex = GameUtils.playerBean.player_die_in;
        }
        // initscencindex = 101197000000;
        GameUtils.loadingType = 0;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.PreloadImg(initscencindex);
    }
    private onPostIOError(event: egret.IOErrorEvent): void {
        console.log("eeeeeeeeeeeeeeeeeeeeeeee");
        NetWorkUtils.clearNetLoading();
    }

    private onPreLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preloadgroup") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            if (this.preloadgamesoundgroup.length > 0) {
                this.preloadSound();
            } else {
                this.preloadsoundComplete();
            }
        }
    }
    private PreloadImg(sceneindex: number) {
        this.preloadgamegroup = new Array<string>();
        this.preloadgamesoundgroup = new Array<string>();
        var resnum: number = 0;
        var res = RES.getRes("res_json");
        // var ziptest = new JSZip(RES.getRes("role_data"));
        // var res = JSON.parse(ziptest.file("res.json").asText());
        if (res) {
            for (var i: number = res.length - 1; i >= 0; i--) {
                if (res[i].id <= sceneindex) {
                    resnum = i;
                    break;
                }
            }
        }
        if (res) {
            var str: string = res[resnum].resources;
            var regex: string = ",";
            var strs = str.split(regex);
            for (var i: number = 0; i < strs.length; i++) {
                if (strs[i] != "black" && strs[i] != "fenkai" && strs[i] != "mohu" && strs[i] != "zhendong" && strs[i] != "xiayu") {
                    if (strs[i].indexOf("_mp3") != -1) {
                        this.preloadgamesoundgroup.push(strs[i]);
                    } else {
                        this.preloadgamegroup.push(strs[i]);
                    }
                }
            }
        }
        if (this.preloadgamesoundgroup.length > 0) {
            RES.createGroup("preloadsoundgroup", this.preloadgamesoundgroup, true);
        }
        if (this.preloadgamegroup.length > 0) {
            RES.loadGroup("game", 1);
            RES.createGroup("preloadgroup", this.preloadgamegroup, true);
            RES.loadGroup("preloadgroup", 0);
        }

    }
    private preloadsoundComplete() {
        this.ispreload_ok = true;
        if (this.showloading) {
            this.removeChildren();
            var gamescene = new GameScene();
            this.addChild(gamescene);
        }
    }
    private preloadSound() {
        GameUtils.loadingType = 1;
        this.soundloadtimeout = new SoundLoadTimeOut(this.preSoundLoadTimeOut, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadSoundComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadSoundError, this);
        RES.loadGroup("preloadsoundgroup");
    }
    public preSoundLoadTimeOut() {
        GameUtils.isLoadSoundError = true;
        this.removePreLis();
    }
    private onPreloadSoundComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preloadsoundgroup") {
            GameUtils.isLoadSoundError = false;
            this.removePreLis();
        }
    }
    private onPreloadSoundError(event: RES.ResourceEvent): void {
        if (event.groupName == "preloadsoundgroup") {
            GameUtils.isLoadSoundError = true;
            this.removePreLis();
        }
    }
    private removePreLis(): void {
        if (this.soundloadtimeout) {
            this.soundloadtimeout.clearSoundTimer();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadSoundComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadSoundError, this);
        this.preloadsoundComplete();
    }
}
