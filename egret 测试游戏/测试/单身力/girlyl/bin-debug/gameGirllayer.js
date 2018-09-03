var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameGirllayer = (function (_super) {
    __extends(gameGirllayer, _super);
    function gameGirllayer(num) {
        var _this = _super.call(this) || this;
        _this.soundNum = 0;
        document.body.style.backgroundColor = '#f5f5f7';
        // document.body.style.backgroundColor = '#000000';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startLoad, this);
    }
    gameGirllayer.prototype.startLoad = function () {
        //创建 URLLoader 对象
        var loader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url = "resource/music/" + (configData.gameLevel + 1) + ".mp3";
        var request = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    };
    gameGirllayer.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的 Sound 对象
        var sound = loader.data;
        this.sound = sound;
        this.soundLength = sound.length >>> 0;
        console.log("zzws", this.soundLength);
        //一个简单的播放按钮
        var _bg1 = new egret.Shape();
        _bg1.graphics.beginFill(0xfbfbfb);
        _bg1.graphics.drawRect(0, 0, this.stage.stageWidth - 200, 150);
        _bg1.graphics.endFill();
        this.addChild(_bg1);
        _bg1.anchorOffsetX = _bg1.width / 2;
        _bg1.x = this.stage.stageWidth / 2;
        _bg1.y = 220;
        this.btn = new egret.Bitmap();
        this.btn.texture = RES.getRes("_stop_png");
        this.addChild(this.btn);
        this.btn.touchEnabled = true;
        this.btn.anchorOffsetX = this.btn.width / 2;
        this.btn.x = 230;
        this.btn.anchorOffsetY = this.btn.height / 2;
        this.btn.y = 290;
        //监听按钮的触摸事件
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.TimeText = new egret.TextField();
        this.TimeText.text = "0:00";
        this.TimeText.x = 300;
        this.TimeText.y = 265;
        this.TimeText.size = 50;
        this.TimeText.textColor = 0x000000;
        this.addChild(this.TimeText);
        this.addChild(this.btn);
        this.initHSlider();
    };
    gameGirllayer.prototype.initHSlider = function () {
        this.hSlider = new eui.HSlider();
        this.hSlider.width = 400;
        this.hSlider.x = 490;
        this.hSlider.y = 280;
        this.hSlider.minimum = 0; //定义最小值
        this.hSlider.maximum = 100; //定义最大值
        this.hSlider.value = 0; //定义默认值
        this.addChild(this.hSlider);
        this.timer = new egret.Timer(10, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        // this.hSlider.touchEnabled = false;
        this.hSlider.enabled = false;
        // this.hSlider.addEventListener(eui.UIEvent.CHANGE_START, this.changeHandler, this);
        // this.hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        // this.hSlider.addEventListener(eui.UIEvent.CHANGE_END, this.endHandler, this);
    };
    gameGirllayer.prototype.timerHandler = function () {
        this.hSlider.value += 0.5;
        var _num = this.hSlider.value / 100 * this.soundLength >>> 0;
        if (_num >= 10) {
            this.TimeText.text = "0:" + _num;
        }
        else { }
        this.TimeText.text = "0:0" + _num;
        if (this.hSlider.value >= 100) {
            this.btn.texture = RES.getRes("_stop_png");
            var sound = this.sound;
            var channel = this.soundChannel;
            channel.stop();
            this.soundChannel = null;
            this.timer.stop();
        }
    };
    gameGirllayer.prototype.changeHandler = function (evt) {
        // var sound = this.sound;
        // var channel: egret.SoundChannel = this.soundChannel;
        // console.log("start");
        // channel.stop();
        // this.soundChannel = null;
        // this.timer.stop();
    };
    gameGirllayer.prototype.endHandler = function (evt) {
        // console.log("end");
        // var _num = evt.target.value / 100 * this.soundLength >>> 0;
        // this.soundNum = _num
        // var channel: egret.SoundChannel = this.soundChannel;
        // this.sound.play(this.soundNum);
        // this.soundChannel = channel;
        // this.timer.start();
    };
    gameGirllayer.prototype.onTouch = function () {
        var sound = this.sound;
        var channel = this.soundChannel;
        if (channel) {
            //调用soundChannel对象的stop方法停止播放音频
            this.btn.texture = RES.getRes("_stop_png");
            channel.stop();
            this.timer.stop();
            this.soundChannel = null;
            return;
        }
        else {
            this.timer.start();
            this.btn.texture = RES.getRes("_start_png");
        }
        if (this.hSlider.value >= 100) {
            this.hSlider.value = 0;
        }
        channel = sound.play(this.soundNum, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.soundChannel = channel;
    };
    gameGirllayer.prototype.onSoundComplete = function (event) {
        console.log("onSoundComplete");
    };
    gameGirllayer.prototype.onAddToStage = function () {
        var bg_heigth = 400;
        this._bg = new egret.Shape();
        this._bg.graphics.beginFill(0xffffff);
        this._bg.graphics.drawRect(0, 0, this.stage.stageWidth, bg_heigth);
        this._bg.graphics.endFill();
        this.addChild(this._bg);
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
        this.startLoad();
        if (configData.data[configData.gameLevel].bg) {
            var _Array = configData.data[configData.gameLevel].bg;
            for (var a = 0; a < _Array.length; a++) {
                this.CreateBG(a, _Array[a], bg_heigth);
            }
        }
        else if (configData.data[configData.gameLevel].result) {
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
            _back.y = this._bg.height + (_Array.length + 1) * 160 + 200;
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
    };
    gameGirllayer.prototype.backGame = function (evt) {
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel--;
            var _gameLayer = new gameGirllayer(configData.gameLevel);
            configData.MainLayer.addChild(_gameLayer);
        }, 100);
    };
    gameGirllayer.prototype.CreateBG = function (index, bgnum, _height) {
        var data = RES.getRes(bgnum._json);
        var txtr = RES.getRes(bgnum._png);
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("game"));
        mc1.play(-1);
        mc1.scaleX = 1.2;
        mc1.scaleY = 1.2;
        mc1.x = bgnum.x;
        mc1.y = bgnum.y;
        var _shape = new bgshape(index);
        _shape.graphics.beginFill(0xffffff);
        _shape.graphics.lineStyle(2, 0xa1a1a0);
        _shape.graphics.drawRect(0, 0, mc1.width * mc1.scaleX + 100, mc1.height * mc1.scaleY + 100);
        _shape.graphics.endFill();
        _shape.x = mc1.x;
        _shape.y = mc1.y;
        _shape.anchorOffsetX = _shape.width / 2;
        _shape.anchorOffsetY = _shape.height / 2;
        this.addChild(_shape);
        this.addChild(mc1);
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
    };
    gameGirllayer.prototype.CreateResult = function (index, txt) {
        var _shape = new bgshape(index);
        // _shape.graphics.lineStyle(2, 0xa1a1a0);
        _shape.graphics.beginFill(0xffffff);
        _shape.graphics.drawRect(0, 0, 1080, 150);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = this.stage.stageWidth / 2;
        _shape.y = this.title.y + 300 + 160 * index;
        _shape.anchorOffsetX = _shape.width / 2;
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
        var title = this.CreateText(txt);
        title.size = 50;
        title.y = this.title.y + 300 + 160 * index + 50;
        title.width = this.stage.stageWidth - 80;
        title.height = 50;
        title.x = title.width / 2 + 40;
        title.anchorOffsetX = title.width / 2;
        title.textAlign = egret.HorizontalAlign.LEFT;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor = 0x000000;
    };
    gameGirllayer.prototype.enterGame = function (evt) {
        var sound = this.sound;
        var channel = this.soundChannel;
        if (channel) {
            //调用soundChannel对象的stop方法停止播放音频
            channel.stop();
            this.timer.stop();
            this.soundChannel = null;
        }
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel++;
            if (configData.gameLevel > configData.data.length - 1) {
                var _gameover = new gamegirlOver();
                configData.MainLayer.addChild(_gameover);
            }
            else {
                var _gameLayer = new gameGirllayer(configData.gameLevel);
                configData.MainLayer.addChild(_gameLayer);
            }
        }, 100);
    };
    gameGirllayer.prototype.CreateText = function (txt) {
        var _text = new egret.TextField();
        _text.text = txt;
        this.addChild(_text);
        return _text;
    };
    gameGirllayer.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return gameGirllayer;
}(egret.DisplayObjectContainer));
__reflect(gameGirllayer.prototype, "gameGirllayer");
