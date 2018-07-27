/**
 *
 * @author 
 *
 */
class AboutScene extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private aboutlayer: egret.Sprite;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene();
    }
    private createScene(): void {
        this.aboutlayer = new egret.Sprite();
        this.addChild(this.aboutlayer);

        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.aboutlayer.addChild(ditu);
        ditu.touchEnabled = true;

        var abouttop: egret.Bitmap = new egret.Bitmap();
        abouttop.texture = this.gameimgSheet.getTexture("titletop");
        abouttop.x = 0;
        abouttop.y = 50;
        this.aboutlayer.addChild(abouttop);

        var titleabout: egret.Bitmap = new egret.Bitmap();
        titleabout.texture = this.gameimgSheet.getTexture("titleabout");
        titleabout.x = (GameUtils.SCREEN_W - titleabout.texture.textureWidth) / 2;
        titleabout.y = 60;
        this.aboutlayer.addChild(titleabout);

        var closeabout: egret.Bitmap = new egret.Bitmap();
        closeabout.texture = this.gameimgSheet.getTexture("close");
        closeabout.x = GameUtils.SCREEN_W - closeabout.texture.textureWidth;
        closeabout.y = 55;
        this.aboutlayer.addChild(closeabout);
        closeabout.touchEnabled = true;
        closeabout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAbout, this);

        var aboutbg: egret.Bitmap = new egret.Bitmap();
        aboutbg.texture = this.coverimgSheet.getTexture("msgbg");
        aboutbg.x = 10;
        aboutbg.y = 110;
        this.aboutlayer.addChild(aboutbg);
        var bgrectsound: egret.Rectangle = new egret.Rectangle(50, 50, 50, 50);
        aboutbg.scale9Grid = bgrectsound;
        aboutbg.width = GameUtils.SCREEN_W - 20;
        aboutbg.height = GameUtils.SCREEN_H - 220;

        var kuang_y: number = 126;
        var text_H: number = 170;
        var msgkuang1: egret.Bitmap = new egret.Bitmap();
        msgkuang1.texture = this.coverimgSheet.getTexture("msgkuang1");
        msgkuang1.x = (GameUtils.SCREEN_W - msgkuang1.texture.textureWidth) / 2;
        msgkuang1.y = kuang_y + 10;
        this.aboutlayer.addChild(msgkuang1);

        var xiaoshuo_title: egret.TextField = new egret.TextField();
        xiaoshuo_title.x = 0;
        xiaoshuo_title.y = 126;
        xiaoshuo_title.height = 70;
        xiaoshuo_title.width = GameUtils.SCREEN_W;
        xiaoshuo_title.textColor = 0x914d8a;
        xiaoshuo_title.size = GameUtils.TEXT_SIZE_MIDDLE;
        xiaoshuo_title.text = "小说原著";
        xiaoshuo_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        xiaoshuo_title.textAlign = egret.HorizontalAlign.CENTER;
        this.aboutlayer.addChild(xiaoshuo_title);
        xiaoshuo_title.strokeColor = 0xffb6b6;
        xiaoshuo_title.stroke = 2;

        var xiaoshuo: egret.TextField = new egret.TextField();
        xiaoshuo.x = (GameUtils.SCREEN_W - 420) / 2;
        xiaoshuo.y = 216;
        xiaoshuo.width = 420;
        xiaoshuo.textColor = 0x000000;
        xiaoshuo.size = 24;
        xiaoshuo.text = "本篇游戏根据粉色书城签约作品《错嫁太子妃》改编，原著作者--香林";
        xiaoshuo.bold = true;
        xiaoshuo.lineSpacing = 10;
        this.aboutlayer.addChild(xiaoshuo);

        var msgkuang2: egret.Bitmap = new egret.Bitmap();
        msgkuang2.texture = this.coverimgSheet.getTexture("msgkuang1");
        msgkuang2.x = (GameUtils.SCREEN_W - msgkuang2.texture.textureWidth) / 2;
        msgkuang2.y = kuang_y + text_H + 10;
        this.aboutlayer.addChild(msgkuang2);

        var shouquan_title: egret.TextField = new egret.TextField();
        shouquan_title.x = 0;
        shouquan_title.y = kuang_y + text_H;
        shouquan_title.height = 70;
        shouquan_title.width = GameUtils.SCREEN_W;
        shouquan_title.textColor = 0x914d8a;
        shouquan_title.size = GameUtils.TEXT_SIZE_MIDDLE;
        shouquan_title.text = "授权信息";
        shouquan_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        shouquan_title.textAlign = egret.HorizontalAlign.CENTER;
        this.aboutlayer.addChild(shouquan_title);
        shouquan_title.strokeColor = 0xffb6b6;
        shouquan_title.stroke = 2;

        var shouquan: egret.TextField = new egret.TextField();
        shouquan.x = (GameUtils.SCREEN_W - 430) / 2;
        shouquan.y = kuang_y + text_H + 90;
        shouquan.width = 430;
        shouquan.textColor = 0x000000;
        shouquan.size = 24;
        shouquan.text = "本篇游戏改编权由粉色书城授权";
        shouquan.bold = true;
        shouquan.lineSpacing = 10;
        this.aboutlayer.addChild(shouquan);
        // if (!GameUtils.noBookurl) {
        //     var msgkuang3: egret.Bitmap = new egret.Bitmap();
        //     msgkuang3.texture = this.coverimgSheet.getTexture("msgkuang1");
        //     msgkuang3.x = (GameUtils.SCREEN_W - msgkuang3.texture.textureWidth) / 2;
        //     msgkuang3.y = kuang_y + text_H * 2 + 10;
        //     this.aboutlayer.addChild(msgkuang3);

        //     var mangguo_title: egret.TextField = new egret.TextField();
        //     mangguo_title.x = 0;
        //     mangguo_title.y = kuang_y + text_H * 2;
        //     mangguo_title.height = 70;
        //     mangguo_title.width = GameUtils.SCREEN_W;
        //     mangguo_title.textColor = 0x914d8a;
        //     mangguo_title.size = GameUtils.TEXT_SIZE_MIDDLE;
        //     mangguo_title.text = "小说网站";
        //     mangguo_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        //     mangguo_title.textAlign = egret.HorizontalAlign.CENTER;
        //     this.aboutlayer.addChild(mangguo_title);
        //     mangguo_title.strokeColor = 0xffb6b6;
        //     mangguo_title.stroke = 2;

        //     var dizhi1: egret.TextField = new egret.TextField();
        //     dizhi1.x = (GameUtils.SCREEN_W - 420) / 2;
        //     dizhi1.y = kuang_y + text_H * 2 + 90;
        //     dizhi1.width = 420;
        //     dizhi1.size = GameUtils.TEXT_SIZE_MIDDLE;
        //     dizhi1.textFlow = new Array<egret.ITextElement>(
        //         { text: "阅读原著:       ", style: { "textColor": 0x000000 } },
        //          { text: "《错嫁太子妃》", style: { "textColor": 0xff9c2f, "href": "http://wx.1758.com/static/partner/cmhd/jump.html?story=cjtzf", "underline": true } }
        //     );
        //     dizhi1.verticalAlign = egret.VerticalAlign.MIDDLE;
        //     dizhi1.textAlign = egret.HorizontalAlign.CENTER;
        //     dizhi1.bold = true;
        //     this.aboutlayer.addChild(dizhi1);
        //     // dizhi1.touchEnabled = true;
        //     // dizhi1.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
        //     //     //            console.log(evt.text);
        //     // }, this);

        // }
        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.aboutlayer.addChild(titlebottom);
    }
    private closeAbout(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.removeChildren();
    }
}
