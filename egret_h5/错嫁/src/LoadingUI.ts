

class LoadingUI extends egret.Sprite {
    private textProgress: egret.TextField;
    private loadimg: egret.Bitmap;
    private loadimgSheet: egret.SpriteSheet;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.loadimgSheet = RES.getRes("loadimg_json");
        this.createView();
    }

    private createView(): void {
        var shp: egret.Shape = new egret.Shape;
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        shp.graphics.endFill();
        this.addChild(shp);

        //        this.text_Progress = new egret.TextField();
        //        this.addChild(this.text_Progress);
        //        this.text_Progress.x = 0;
        //        this.text_Progress.y = 0;
        //        this.text_Progress.width = GameUtils.SCREEN_W;
        //        this.text_Progress.height = GameUtils.SCREEN_H;
        //        this.text_Progress.size = GameUtils.TEXT_SIZE_MIDDLE;
        //        this.text_Progress.text = "补妆中...";
        //        this.text_Progress.textColor = 0xffffff;
        //        this.text_Progress.textAlign = egret.HorizontalAlign.CENTER;
        //        this.text_Progress.verticalAlign = egret.VerticalAlign.MIDDLE;
        //        var twtext = egret.Tween.get(this.text_Progress,{ loop: true });
        //        twtext.to({ alpha: 0.3 },1000).to({ alpha: 1 },1000);

        var bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("coverbg_jpg");
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);

        var loadimg2: egret.Bitmap = new egret.Bitmap();
        loadimg2.texture = this.loadimgSheet.getTexture("loading2");
        loadimg2.x = GameUtils.SCREEN_W / 2;
        loadimg2.y = GameUtils.SCREEN_H / 2 - 100;
        loadimg2.anchorOffsetX = 100;
        loadimg2.anchorOffsetY = 100;
        this.addChild(loadimg2);

        this.loadimg = new egret.Bitmap();
        this.loadimg.texture = this.loadimgSheet.getTexture("loading");
        this.loadimg.x = GameUtils.SCREEN_W / 2;
        this.loadimg.y = GameUtils.SCREEN_H / 2 - 100;
        this.loadimg.anchorOffsetX = 100;
        this.loadimg.anchorOffsetY = 100;
        this.addChild(this.loadimg);
        var tw = egret.Tween.get(this.loadimg, { loop: true });
        tw.to({ rotation: 360 }, 1000);

        //        var loadimg3: egret.Bitmap = new egret.Bitmap();
        //        loadimg3.texture = this.loadimgSheet.getTexture("loading3");
        //        loadimg3.x = (GameUtils.SCREEN_W-loadimg3.texture.textureWidth)/2;
        //        loadimg3.y = GameUtils.SCREEN_H / 2 + 120 - 100;
        //        this.addChild(loadimg3);
        //        var twload3 = egret.Tween.get(loadimg3,{ loop: true });
        //        twload3.to({ alpha: 0.3 },1000).to({ alpha: 1 },1000);

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
        this.textProgress = new egret.TextField();
        this.textProgress.x = 0;
        this.textProgress.y = GameUtils.SCREEN_H / 2 + 20;
        this.textProgress.width = GameUtils.SCREEN_W;
        this.textProgress.textColor = 0xffffff;
        this.textProgress.size = GameUtils.TEXT_SIZE_LARGE;
        this.textProgress.text = "";
        this.textProgress.textAlign = egret.HorizontalAlign.CENTER;
        this.textProgress.strokeColor = 0x000000;
        this.textProgress.stroke = 2;
        this.addChild(this.textProgress);
    }

    public setProgress(type: number, current: number, total: number): void {
        var str: string = "";
        if (type == 0) {
            str = "图片";
        } else {
            str = "音乐";
        }
        this.textProgress.text = str + "加载中..." + Math.round(current * 100 / total) + "%";
        //        this.textProgress.text = "补妆中...";
    }
}
