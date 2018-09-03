var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var start = (function (_super) {
    __extends(start, _super);
    function start() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    start.prototype.onAddToStage = function () {
        var bg = this.createBitmapByName("startbg_jpg");
        var bg1 = this.createBitmapByName("bg1_png");
        this.addChild(bg);
        this.addChild(bg1);
        bg1.x = this.stage.width / 2 - bg1.width / 2 - 10;
        this.CreateInput();
        this.AddSex();
        this.AddBtn();
    };
    start.prototype.CreateInput = function () {
        var pos_y = 680;
        var text_hight = 100;
        var text_width = 400;
        var point = new egret.Sprite();
        point.graphics.beginFill(0xffffff);
        point.graphics.drawRect(this.stage.stage.width / 2 - text_width / 2, pos_y, text_width, text_hight);
        point.graphics.endFill();
        this.addChild(point);
        this._inputText = new egret.TextField();
        this._inputText.type = egret.TextFieldType.INPUT;
        //设置输入文本的样式为文本
        this._inputText.inputType = egret.TextFieldInputType.TEXT;
        this._inputText.text = "请输入您的姓名";
        this._inputText.width = text_width;
        this._inputText.height = text_hight;
        this._inputText.textColor = 0x000000;
        this._inputText.x = this.stage.stage.width / 2 - text_width / 2;
        this._inputText.y = pos_y;
        this.addChild(this._inputText);
        this._inputText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._inputText.textAlign = egret.HorizontalAlign.CENTER;
        this._inputText.touchEnabled = true;
        this.stage.addEventListener(egret.FocusEvent.FOCUS_IN, function (evt) {
            console.log("ss1", this._inputText.text);
            if (this._inputText.text == "请输入您的姓名") {
                this._inputText.text = "";
            }
        }, this);
        this.stage.addEventListener(egret.FocusEvent.FOCUS_OUT, function (evt) {
            // this._inputText.text = ""
            configData.name_Str = this._inputText.text;
            // console.log("configData.name_Str ", configData.name_Str)
        }, this);
        this.stage.addEventListener(egret.Event.CHANGE, function (evt) {
            console.log("ss3");
            configData.name_Str = this._inputText.text;
            // console.log("configData.name_Str ss3 ", configData.name_Str)
        }, this);
    };
    start.prototype.AddSex = function () {
        var _man = this.Createtext("男", 50);
        this.addChild(_man);
        _man.x = this.stage.stage.width / 2 - 100;
        _man.y = 820;
        _man.textColor = 0xf2f626;
        _man.fontFamily = "Microsoft Yahei";
        var _woman = this.Createtext("女", 50);
        this.addChild(_woman);
        _woman.x = this.stage.stage.width / 2 + 50;
        _woman.y = 820;
        _woman.fontFamily = "Microsoft Yahei";
        _woman.textColor = 0xffffff;
        _man.touchEnabled = true;
        _woman.touchEnabled = true;
        _man.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _man.textColor = 0xf2f626;
            _woman.textColor = 0xffffff;
            configData.game_sex = 1;
        }, this);
        _woman.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _woman.textColor = 0xf2f626;
            _man.textColor = 0xffffff;
            configData.game_sex = 2;
        }, this);
    };
    start.prototype.AddBtn = function () {
        var _numX = this.stage.stage.width / 2 - 200;
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0x8bbf66);
        _shape.graphics.drawRoundRect(_numX, 900, 400, 100, 100, 100);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.touchEnabled = true;
        var that = this;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (configData.name_Str == null || configData.name_Str == "") {
                var _tishi = new tishi();
                that.addChild(_tishi);
                var tw = egret.Tween.get(that);
                tw.wait(2000).call(function () {
                    _tishi.parent.removeChild(_tishi);
                });
            }
            else {
                if (this.parent) {
                    this.parent.removeChild(this);
                    var resultend = new result();
                    configData.Main_layer.addChild(resultend);
                }
            }
        }, this);
        var _str = "生成我的娱乐封面";
        var _text = this.Createtext(_str, 40);
        this.addChild(_text);
        _text.width = 400;
        _text.height = 100;
        _text.textAlign = egret.HorizontalAlign.CENTER;
        _text.verticalAlign = egret.VerticalAlign.MIDDLE;
        // _text.fontFamily="Microsoft Yahei"
        _text.x = _numX;
        _text.y = 900;
        _text.textColor = 0xffffff;
        var _str = "本游戏来自1758，仅供娱乐";
        var _text1 = this.Createtext(_str, 20);
        this.addChild(_text1);
        _text1.x = this.stage.stage.width / 2 - _text1.width / 2;
        _text1.y = 1050;
        _text1.textColor = 0xffffff;
        var bg3 = this.createBitmapByName("down_jpg");
        // this.addChild(bg3);
        bg3.width = 750;
        bg3.height = 100;
        bg3.y = 1106;
        bg3.touchEnabled = true;
        bg3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            top.window.location.href = "http://1758nb.25184wang.top/static/quiz/client/index.html";
        }, this);
    };
    start.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("result");
    };
    start.prototype.onResourceLoadComplete = function () {
        this.parent.removeChild(this);
        var resultend = new result();
        configData.Main_layer.addChild(resultend);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    };
    start.prototype.Createtext = function (str, _num) {
        var _text = new egret.TextField();
        _text.text = str;
        _text.size = _num;
        return _text;
    };
    start.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return start;
}(egret.DisplayObjectContainer));
__reflect(start.prototype, "start");
//# sourceMappingURL=start.js.map