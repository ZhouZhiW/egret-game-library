class gamelayer extends egret.DisplayObjectContainer {
    constructor(num) {
        super();
        document.body.style.backgroundColor = '#f5f5f7';
        // document.body.style.backgroundColor = '#000000';
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    private onAddToStage() {

        var _bg = new egret.Shape();
        _bg.graphics.beginFill(0xffffff);
        _bg.graphics.drawRect(0, 0, this.stage.stageWidth + 300, 300);
        _bg.graphics.endFill();
        this.addChild(_bg);

        this.title = new egret.TextField();
        this.title.text = configData.data[configData.gameLevel].title;
        this.title.y = 100;
        this.title.x = 60;
        this.addChild(this.title);
        this.title.size = 50;
        this.title.textColor = 0x000000;
        this.title.width = this.stage.stageWidth - 120;
        this.title.textAlign = egret.HorizontalAlign.CENTER;
        this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.title.lineSpacing = 20;

        if (configData.data[configData.gameLevel].bg) {
            var _Array = configData.data[configData.gameLevel].bg;
            for (var a = 0; a < _Array.length; a++) {
                this.CreateBG(a, _Array[a], 300);
            }

        } else if (configData.data[configData.gameLevel].result) {
            var _Array = configData.data[configData.gameLevel].result;
            for (var a = 0; a < _Array.length; a++) {
                this.CreateResult(a, _Array[a]);
            }
            var _back = new egret.Shape();
            _back.graphics.beginFill(0xFE745B);
            _back.graphics.drawRoundRect(0, 0, 1080 - 200, 100, 50, 50);
            _back.graphics.endFill();
            this.addChild(_back);
            _back.x = 1080 / 2;
            _back.anchorOffsetX = _back.width / 2;
            _back.y = this.title.y + (_Array.length + 1) * 160 + 200;
            _back.touchEnabled = true;
            _back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backGame, this);
            var _backtext = new egret.TextField();
            _backtext.text = "上一题";
            _backtext.size = 50;
            _backtext.textColor = 0xffffff;
            _backtext.x = this.stage.stageWidth / 2;
            _backtext.anchorOffsetX = _backtext.width / 2;
            _backtext.y = _back.y + 25;
            // _text1.anchorOffsetY = _text1.height ;
            this.addChild(_backtext);

        }

    }
    private backGame(evt: egret.TouchEvent) {
        // configData.selectScore.slice(configData.selectScore.length - 1, 1);
        configData.selectScore.pop();
      
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel--;
            var _gameLayer = new gamelayer(configData.gameLevel)
            configData.MainLayer.addChild(_gameLayer);
        }, 100);

    }
    private CreateBG(index, bgnum, _height) {
        let result = new BgBit(index);
        let texture: egret.Texture = RES.getRes(bgnum);
        result.texture = texture;

        this.addChild(result);
        if (index <= 1) {
            result.x = (result.width + 20) * index + 25;
            result.y = this.title.y + _height;
        } else {
            result.x = (result.width + 20) * (index - 2) + 25;
            result.y = this.title.y + _height + 500 + 100;
        }
        result.touchEnabled = true;
        result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
    }
    private title;
    private CreateResult(index, txt) {
        var _shape = new bgshape(index);
        _shape.graphics.beginFill(0xffffff);
        _shape.graphics.drawRect(0, 0, 1080, 150);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = this.stage.stageWidth / 2;
        _shape.y = this.title.y + 300 + 160 * index;
        _shape.anchorOffsetX = _shape.width / 2
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this)

        var title = this.CreateText(txt);
        title.size = 50
        title.y = this.title.y + 300 + 160 * index + 50;
        title.width = this.stage.stageWidth - 80;
        title.height = 50;
        title.x = title.width / 2 + 40
        title.anchorOffsetX = title.width / 2
        title.textAlign = egret.HorizontalAlign.LEFT;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor = 0x000000;
    }
    private enterGame(evt: egret.TouchEvent) {
        configData.selectScore.push(configData.result[configData.gameLevel][evt.currentTarget.Id]);
       
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel++;
            if (configData.gameLevel > configData.data.length - 1) {
                var _gameover = new gameOver();
                configData.MainLayer.addChild(_gameover);
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
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}