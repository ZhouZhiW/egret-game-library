class gameOver extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage() {

        // document.body.style.backgroundColor = '#97CBFF';
        // document.body.style.backgroundColor = '#2f2f2f';
        // this.CreatgeText("长按保存图片分享");
        var _index = 0;
        if (configData.selectScore <= 2) {
            _index = 5;
        } else if (configData.selectScore <= 4) {
            _index = 4;
        } else if (configData.selectScore <= 6) {
            _index = 3;
        } else if (configData.selectScore <= 8) {
            _index = 2;
        } else {
            _index = 1;
        }
        CanvasToimages_1(_index);
        this.imageTagVisible(true);
       
    }
    public imageTagVisible(visible: boolean) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        } else {
            document.getElementById("saveContainer").style.display = "none";
        }
    }
    private CreatgeText(str) {
        var _width = document.body.clientWidth
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0x97CBFF);
        _shape.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, 80);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.y = 50;
        var _text = new egret.TextField();
        _text.text = str;
        // _text.x = _x;
        _text.y = 50;
        _text.size = 60;
        _text.textColor = 0xffffff;
        _text.width = egret.MainContext.instance.stage.stageWidth;
        _text.height = 80;
        _text.lineSpacing = 5;
        _text.textAlign = egret.HorizontalAlign.CENTER;
        _text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _text.bold = true;
        this.addChild(_text);
        // this.Createbtn();
        // this.CrateDown();

    }
    private Createbtn() {
        var btny = 850;
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0xff7342);
        _shape.graphics.drawRect(0, 0, 500, 80);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.y = btny;
        _shape.x = egret.MainContext.instance.stage.stageWidth / 2;
        _shape.anchorOffsetX = _shape.width / 2
        var _text = new egret.TextField();
        _text.text = "更多游戏";
        _text.x = egret.MainContext.instance.stage.stageWidth / 2;
        _text.y = btny + 20;
        _text.size = 35;
        _text.textColor = 0xffffff;
        _text.anchorOffsetX = _text.width / 2
        this.addChild(_text);

        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            top.window.location.href = "http://wx.1758.com/play/gamebox/123?ex1758=1&tp=full&yn=%E5%B0%8F%E6%B8%B8%E6%88%8F&title=%E5%B0%8F%E6%B8%B8%E6%88%8F&chn="
        }, this)
    }
    private CrateDown() {
        // var num = Math.floor(Math.random() * 2);
        var num =0;
        var _d = this.createBitmapByName(configData.downUrl[num].img);
        _d.width = egret.MainContext.instance.stage.stageWidth;
        _d.y = egret.MainContext.instance.stage.stageHeight - 100;
        _d.height = 100;
        this.addChild(_d);
        _d.touchEnabled = true;
        _d.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            top.window.location.href = configData.downUrl[num].url
        }, this)
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}