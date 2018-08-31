class gameOver extends egret.Sprite {
    public constructor() {
        super();
        this.addbtn();

    }
    private txt: egret.TextField;
    private addbtn() {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        this.touchEnabled = true;//防止点击穿透；防止下层点击事件被触发
        var sp: egret.Sprite = new egret.Sprite();
        // sp.graphics.lineStyle(0x000000);
        sp.graphics.beginFill(0x000000, 0.5);
        sp.graphics.drawRect(0, 0, egret_width, egret_height);
        sp.graphics.endFill();
        this.addChild(sp);

        var bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("gameover_png");
        this.addChild(bg);
        bg.x = egret_width / 2;
        bg.y = egret_height / 2 - 100;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        var _overAndMunu = new overAndMunu();
        this.addChild(_overAndMunu);

        this.txt = new egret.TextField();
        this.addChild(this.txt);
        this.txt.width = egret_width;
        this.txt.y = egret_height / 2 - 60;
        this.txt.textColor = 0xffffff;
        this.txt.fontFamily = "KaiTi";
        this.txt.bold = true;
        this.txt.size = 38;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = data.Score.toString();
        data.updateData();
        // egret.localStorage.removeItem("saveDataArray");
        data.createBtn("share_png", function () {
            //分享功能

        }, egret_width / 2 - 120, egret_height - 100, this);

        data.createBtn("more_png", function () {
            //更多游戏功能
        }, egret_width / 2 + 120, egret_height - 100, this);

    }
    
}