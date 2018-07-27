/**
 *
 * @author 
 *
 */
class ProductionGroup extends egret.DisplayObjectContainer {
    private gamescene: GameScene;
    private loading: LoadingUI;
    private produceSheet: egret.SpriteSheet;
    private roll_layer: egret.Sprite;

    private pro_jobArr = new Array("leader+写代码的", "画画的", "挖坑的", "打字的", "涂鸦的", "搬砖的");
    private pro_nameArr = new Array("九尾", "又在嗨", "泡泡玉", "Bravo", "Melody", "逗逗你玩");
    private pro_imgArr = new Array("produce_worker1", "produce_worker2", "produce_worker3", "produce_worker4", "produce_worker6", "produce_worker5");
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.loading = new LoadingUI();
        this.addChild(this.loading);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.loadGroup("produce");
    }
    private onComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "produce") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            if (this.loading.parent) {
                this.loading.parent.removeChild(this.loading);
            }
            this.produceSheet = RES.getRes("produce_json");
            this.roll_layer = new egret.Sprite();
            this.roll_layer.x = 0;
            this.roll_layer.y = GameUtils.SCREEN_H;
            this.addChild(this.roll_layer);
            this.createScene();
        }
    }

    private createScene() {
        var logo: egret.Bitmap = new egret.Bitmap();
        logo.texture = this.produceSheet.getTexture("produce_logo");
        this.roll_layer.addChild(logo);
        logo.x = (GameUtils.SCREEN_W - logo.texture.textureWidth) / 2;
        logo.y = 20;

        var line: egret.Shape = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(10, 180);
        line.graphics.lineTo(GameUtils.SCREEN_W - 10, 180);
        line.graphics.endFill();
        this.roll_layer.addChild(line);

        var group: egret.TextField = new egret.TextField();
        group.x = 0;
        group.y = 190;
        group.textColor = 0xffffff;
        group.size = GameUtils.TEXT_SIZE_LARGE;
        group.text = "如春天般温暖的制作组！";
        group.width = GameUtils.SCREEN_W;
        group.height = 42;
        this.roll_layer.addChild(group);
        group.textAlign = egret.HorizontalAlign.CENTER;
        group.verticalAlign = egret.VerticalAlign.MIDDLE;

        var W: number = 260;
        var H: number = 50;
        var start_x = (GameUtils.SCREEN_W - W - 108 - 30) / 2;
        var job_H = 14;
        var job_y = (96 - 24 * 2 - job_H) / 2;
        for (var i: number = 0; i < this.pro_imgArr.length; i++) {
            var job: egret.TextField = new egret.TextField();
            job.x = start_x;
            job.y = job_y + H + 220 + (96 + H) * i;
            job.textColor = 0xffffff;
            job.size = 24;
            job.text = this.pro_jobArr[i];
            job.width = W;
            job.height = 100;
            this.roll_layer.addChild(job);
            job.textAlign = egret.HorizontalAlign.CENTER;

            var name: egret.TextField = new egret.TextField();
            name.x = start_x;
            name.y = job_y + 24 + job_H + H + 220 + (96 + H) * i;
            name.textColor = 0xffffff;
            name.size = 24;
            name.text = this.pro_nameArr[i];
            name.width = W;
            name.height = 100;
            this.roll_layer.addChild(name);
            name.textAlign = egret.HorizontalAlign.CENTER;

            var img: egret.Bitmap = new egret.Bitmap();
            img.texture = this.produceSheet.getTexture(this.pro_imgArr[i]);
            this.roll_layer.addChild(img);
            img.x = start_x + W + 30;
            img.y = H + 220 + (96 + H) * i;
        }
        var move_h = H + 220 + (96 + H) * this.pro_imgArr.length;
        var tw = egret.Tween.get(this.roll_layer);
        tw.to({ y: -move_h }, 20000).call(this.gotoCover);
    }
    private gotoCover(): void {
        this.removeChildren();
        this.x = 0;
        this.y = 0;
        var gamecover = new CoverScene();
        this.addChild(gamecover);
    }
}
