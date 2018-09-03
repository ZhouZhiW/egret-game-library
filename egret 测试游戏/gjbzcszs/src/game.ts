class gamelayer extends egret.DisplayObjectContainer {
    constructor(num) {
        super();
        this.gameIndex = num;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private gameIndex;
    private onAddToStage() {
        this.Createtitlebg();
    }
    private titlebg;
    private title: egret.TextField;
    private result;

    private Createtitlebg() {
        var bg = this.createBitmapByName("gamebg_png");
        this.addChild(bg);
        this.CrateDown();
        this.titlebg = new egret.Bitmap();
        this.titlebg.texture = RES.getRes(configData.data[this.gameIndex].url);
        this.titlebg.y = 100;
        this.titlebg.width = egret.MainContext.instance.stage.stageWidth;
        this.titlebg.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.titlebg.anchorOffsetX = this.titlebg.width / 2;
        this.addChild(this.titlebg);
        this.Createtitle(this.titlebg.height);
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private Createtitle(num) {
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0xB0E1FB);
        _shape.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, 100);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.y = this.titlebg.y + num - 20;
        this.title = this.CreateText(configData.data[this.gameIndex].title);
        this.title.y = _shape.y;
        this.title.width = egret.MainContext.instance.stage.stageWidth - 80;
        this.title.lineSpacing = 5;
        this.title.height = 100;
        this.title.x = this.title.width / 2 + 40
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.textAlign = egret.HorizontalAlign.CENTER;
        this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.title.textColor = 0x548dd4;
        this.AddResult();
    }

    private AddResult() {
        var _result = configData.data[this.gameIndex].result
        for (var a = 0; a < _result.length; a++) {
            this.CreateResult(a, _result[a]);
        }
    }

    private CreateResult(index, txt) {
        var _shape = new bgshape(index);
        _shape.graphics.beginFill(0x548DD2);
        _shape.graphics.drawRoundRect(0, 0, 500, 50, 20, 20);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = egret.MainContext.instance.stage.stageWidth / 2;
        _shape.y = this.title.y + 150 + 70 * index;
        _shape.anchorOffsetX = _shape.width / 2

        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this)

        var title = this.CreateText(txt);
        title.size = 25
        title.y = this.title.y + 150 + 70 * index;
        title.width = egret.MainContext.instance.stage.stageWidth - 80;
        title.height = 50;
        title.x = title.width / 2 + 40
        title.anchorOffsetX = title.width / 2
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor = 0xffffff;

    }
    private enterGame(evt: egret.TouchEvent) {
      
        configData.selectScore += configData.result[configData.gameLevel][evt.currentTarget.Id];
      
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel++;
            if (configData.gameLevel > configData.data.length - 1) {
                var _gameover = new gameOver()
                configData.MainLayer.addChild(_gameover)
            } else {
                var _gameLayer = new gamelayer(configData.gameLevel)
                configData.MainLayer.addChild(_gameLayer);
            }
        }, 100);

    }
    private CreateText(txt) {
        var _text = new egret.TextField();
        _text.text = txt;
        this.addChild(_text);
        return _text;
    }
    private CrateDown() {
        // var num = Math.floor(Math.random() * 2);
        var num =0;
        var _d = this.createBitmapByName(configData.downUrl[num].img);
        _d.width = egret.MainContext.instance.stage.stageWidth;
        // _d.y = egret.MainContext.instance.stage.height-100;
        _d.y = 0;
        _d.height=100;
        this.addChild(_d);
        _d.touchEnabled = true;
        _d.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            top.window.location.href = configData.downUrl[num].url
        }, this)
    }
}