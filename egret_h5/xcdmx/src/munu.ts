class munu extends egret.Sprite {
    public constructor() {
        super();
        this.addbtn();

    }
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
        var self = this;
        data.createBtn("continue_png", function () {
            if(self.parent){
                self.parent.removeChild(self);
            }
        }, egret_width / 2, egret_height / 2 - 100, this)

        var _overAndMunu = new overAndMunu();
        this.addChild(_overAndMunu);

    }

}