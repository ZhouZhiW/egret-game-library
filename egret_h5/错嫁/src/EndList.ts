/**
 *
 * @author 
 *
 */
class EndList extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private endScene: EndScene;
    private listLayer_1: egret.Sprite;
    private listLayer_2: egret.Sprite;
    private listLayer_3: egret.Sprite;
    private bigImgLayer: egret.Sprite;
    private imgData: Array<egret.BitmapData>;
    private bigImg: egret.Bitmap;
    private endStage: number;
    private typeArr: Array<TriggerModelBean> = new Array();
    private shareDes: string;
    public constructor(thisObj: any, stage: number) {
        super();
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.endScene = thisObj;
        this.endStage = stage;
        this.typeArr = new Array();
        for (var i = 0; i < GameUtils.endModelList.length; i++) {
            if (stage == 1) {
                if (GameUtils.endModelList[i].endm_type == 1) {
                    this.typeArr.push(GameUtils.endModelList[i]);
                }
            } else {
                if (GameUtils.endModelList[i].endm_type == 3) {
                    this.typeArr.push(GameUtils.endModelList[i]);
                }
            }

        }
        this.imgData = new Array();
        this.init();
    }
    private init() {
        this.listLayer_1 = new egret.Sprite();
        this.addChild(this.listLayer_1);
        this.listLayer_2 = new egret.Sprite();
        this.addChild(this.listLayer_2);
        this.listLayer_3 = new egret.Sprite();
        this.addChild(this.listLayer_3);

        var endbg_W = 40;
        var endbg_w = 200;
        var endbg_H = 14;
        var endbg_h = 140;
        var endbg_x: number = (GameUtils.SCREEN_W - endbg_w * 2 - endbg_W) / 2;
        for (var i = 0; i < this.typeArr.length; i++) {
            var isopen: boolean = false;
            for (var j = 0; j < GameUtils.openEndList.length; j++) {
                if (this.typeArr[i].endm_id == GameUtils.openEndList[j].triggeropen_id) {
                    isopen = true;
                }
            }
            var endbg_1: egret.Bitmap = new egret.Bitmap();
            endbg_1.name = "" + i;
            endbg_1.texture = this.gameimgSheet.getTexture("endbg");
            endbg_1.x = endbg_x + (endbg_w + endbg_W) * (i % 2);
            endbg_1.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 15;
            this.listLayer_1.addChild(endbg_1);

            if (this.endStage == 0) {
                if (isopen) {
                    endbg_1.touchEnabled = true;
                    endbg_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBigImgBtn, this);
                    if (this.typeArr[i].endm_img) {
                        var imgLoader: NetImageLoader = new NetImageLoader();
                        imgLoader.imgid = i;
                        imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                        imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
                        imgLoader.load(this.typeArr[i].endm_img);
                    }
                }
            } else {
                if (isopen) {
                    endbg_1.touchEnabled = true;
                    endbg_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBigImgBtn, this);
                }
            }
            if (this.typeArr[i].endm_score) {
                var num_str: string = "";
                if (this.typeArr[i].endm_score < 10) {
                    num_str = "" + this.typeArr[i].endm_score;
                } else {
                    num_str = "b";
                }
                if (!isopen) {
                    num_str = "a";
                }

                var endNum = new egret.BitmapText();
                endNum.font = RES.getRes("endnum_fnt");
                endNum.text = "" + num_str;
                endNum.x = endbg_x + (endbg_w + endbg_W) * (i % 2) + 170;
                endNum.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 15 + 110;
                endNum.anchorOffsetX = endNum.width / 2;
                endNum.anchorOffsetY = endNum.height / 2;
                this.listLayer_1.addChild(endNum);

            }

            if (isopen) {
                var btnshare: egret.Bitmap = new egret.Bitmap();
                btnshare.texture = this.gameimgSheet.getTexture("btnshare_end");
                btnshare.x = endbg_x + (endbg_w + endbg_W) * (i % 2) + 160;
                btnshare.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 15 + 100;
                this.listLayer_3.addChild(btnshare);
                btnshare.name = "" + i;
                btnshare.touchEnabled = true;
                btnshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnshare, this);
            }
            var endname: egret.Bitmap = new egret.Bitmap();
            endname.texture = this.gameimgSheet.getTexture("endname");
            endname.x = endbg_x + (endbg_w + endbg_W) * (i % 2) - 10;
            endname.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 5;
            this.listLayer_3.addChild(endname);

            var name: egret.TextField = new egret.TextField();
            name.x = endbg_x + (endbg_w + endbg_W) * (i % 2);
            name.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 9;
            name.textColor = 0x000000;
            name.size = 16;
            name.text = this.typeArr[i].endm_name;
            name.width = 140;
            name.height = 34;
            this.listLayer_3.addChild(name);

            if (this.endStage == 1 && this.typeArr[i].endm_description) {
                if (isopen) {
                    var des: egret.TextField = new egret.TextField();
                    des.x = endbg_x + (endbg_w + endbg_W) * (i % 2) + 18;
                    des.y = (endbg_h + endbg_H) * Math.floor(i / 2) + 15 + 20;
                    des.textColor = 0x000000;
                    des.size = GameUtils.TEXT_SIZE_SMALL;
                    des.text = TextUtils.getChar(this.typeArr[i].endm_description, 16);
                    des.width = 160;
                    des.height = 100;
                    this.listLayer_3.addChild(des);
                }
            }
        }
    }
    private btnshare(evt: egret.TouchEvent) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var dianeff = new DianEff(this.endScene, evt.stageX, evt.stageY);
        var btn: egret.Bitmap = evt.currentTarget;
        if (btn) {
            var btnid: number = parseInt(btn.name);
            var lockstr: string = "解锁结局：";
            if (this.endStage == 0) {
                lockstr = "解锁结局：";
            } else {
                lockstr = "解锁事件：";
            }
            this.shareDes = lockstr + this.typeArr[btnid].endm_name;
            HlmyUtils.HlmySetShareInfo({ "state": GameUtils.MYAPPKEY_1758, "tipInfo": true, "reward": this.shareDes, "appKey": GameUtils.APPKEY_1758, "gid": GameUtils.playerGid });
        }
    }
    private showBigImg(btnid: number): void {
        if (this.imgData[btnid] && this.endStage == 0) {
            this.bigImgLayer = new egret.Sprite();
            this.endScene.addChild(this.bigImgLayer);

            var imgshape: egret.Shape = new egret.Shape();
            imgshape.graphics.beginFill(0x000000, 0.7);
            imgshape.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
            imgshape.graphics.endFill();
            this.bigImgLayer.addChild(imgshape);
            imgshape.touchEnabled = true;


            var texture: egret.Texture = new egret.Texture();
            texture.bitmapData = this.imgData[btnid];
            this.bigImg = new egret.Bitmap(texture);
            this.bigImg.alpha = 0;
            this.bigImg.scaleX = 0.02;
            this.bigImg.scaleY = 0.02;
            this.bigImg.x = (GameUtils.SCREEN_W) / 2;
            this.bigImg.y = (GameUtils.SCREEN_H) / 2 - 70;
            this.bigImg.anchorOffsetX = this.imgData[btnid].width / 2;
            this.bigImg.anchorOffsetY = this.imgData[btnid].height / 2;

            this.bigImgLayer.addChild(this.bigImg);
            var tw = egret.Tween.get(this.bigImg);
            tw.to({ alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 500).
                to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100).
                call(function () {
                    this.bigImg.touchEnabled = true;
                    this.bigImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBigImgBtn, this);
                }, this);

            var des: egret.TextField = new egret.TextField();
            des.x = 60;
            des.y = GameUtils.SCREEN_H - 160;
            des.textColor = 0xffffff;
            des.size = GameUtils.TEXT_SIZE_MIDDLE;
            des.text = this.typeArr[btnid].endm_description;
            des.width = GameUtils.SCREEN_W - 120;
            des.height = 500;
            des.strokeColor = 0x000000;
            des.stroke = 2;
            des.lineSpacing = 3;
            this.bigImgLayer.addChild(des);
        } else if (this.endStage == 1) {
            var tishi = new DrawUtils();
            tishi.createDesTishi("coverimg_json", "tishikuang1", "　　" + this.typeArr[btnid].endm_description);
            this.endScene.addChild(tishi);
        }
    }
    private closeBigImgBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this.endScene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.bigImg) {
            this.bigImg.touchEnabled = false;
            var tw = egret.Tween.get(this.bigImg);
            tw.to({ scaleX: 1.2, scaleY: 1.2 }, 100).
                to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
                    if (this.bigImgLayer) {
                        this.bigImgLayer.removeChildren();
                        if (this.bigImgLayer.parent) {
                            this.bigImgLayer.parent.removeChild(this.bigImgLayer);
                        }
                    }
                }, this);
        }
    }
    private showBigImgBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this.endScene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn: egret.Bitmap = evt.currentTarget;
        if (btn) {
            var btnid: number = parseInt(btn.name);
            this.showBigImg(btnid);
        }
    }
    private imgError(event: egret.IOErrorEvent): void {
        var loader: NetImageLoader = event.currentTarget;
        if (loader) {
        }
    }
    private imgLoadHandler(evt: egret.Event): void {
        var loader: NetImageLoader = evt.currentTarget;
        if (loader) {
            var endbg_W = 40;
            var endbg_w = 200;
            var endbg_H = 14;
            var endbg_h = 140;
            var endbg_x: number = (GameUtils.SCREEN_W - endbg_w * 2 - endbg_W) / 2;
            var bmp_x = (endbg_w - 86) / 2;
            var bmd: egret.BitmapData = loader.data;
            if (bmd) {
                var texture: egret.Texture = new egret.Texture();
                texture.bitmapData = bmd;
                var bmp: egret.Bitmap = new egret.Bitmap(texture);
                this.imgData[loader.imgid] = bmd;
                bmp.x = endbg_x + (endbg_w + endbg_W) * (loader.imgid % 2) + bmp_x;
                bmp.y = (endbg_h + endbg_H) * Math.floor(loader.imgid / 2) + 15 + 9;
                bmp.width = 86;
                bmp.height = 122;
                this.listLayer_2.addChild(bmp);
            }
        }
    }
}
