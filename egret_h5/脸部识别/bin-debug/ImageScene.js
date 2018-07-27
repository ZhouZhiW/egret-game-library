var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageScene = (function (_super) {
    __extends(ImageScene, _super);
    //private htmlImg: HTMLImage;
    function ImageScene() {
        var _this = _super.call(this) || this;
        _this.scale = 0;
        _this.maxW = 877;
        _this.maxH = 300;
        _this.addEventListener(egret.Event.ADDED, _this.init, _this);
        return _this;
    }
    ImageScene.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        //this.htmlImg = new HTMLImage();
        this.node = new one.WebNode();
        this.maxH = this.stage.stageHeight - 798;
    };
    ImageScene.prototype.InitImage = function (data, xuanzhuan) {
        var _this = this;
        console.log("旋转", xuanzhuan);
        if (this.photo != null) {
            this.con.removeChildren();
            this.rcon.removeChildren();
            this.photo = null;
            this.con = null;
            this.rcon = null;
            this.removeChildren();
            //this.htmlImg.removeFromDOM();
            console.log("clear");
        }
        RES.getResByUrl(data, function (texture) {
            console.log(texture);
            _this.photo = new egret.Bitmap(texture);
            _this.photo.smoothing = true;
            console.log(_this.photo);
            egret.log("拍照的图", _this.photo.width, _this.photo.height);
            _this.addChild(_this.photo);
            _this.drawCon();
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    ImageScene.prototype.drawCon = function () {
        if (this.con == null) {
            this.con = new egret.DisplayObjectContainer();
            this.rcon = new egret.DisplayObjectContainer();
            this.rcon.addChild(this.con);
            this.addChild(this.rcon);
        }
        this.con.addChild(this.photo);
        console.log((this.photo.width / this.photo.height), (this.maxW / this.maxH));
        if ((this.photo.width / this.photo.height) < (this.maxW / this.maxH)) {
            this.scale = this.maxH / this.photo.height;
        }
        else {
            this.scale = this.maxW / this.photo.width;
        }
        this.con.scaleX = this.scale;
        this.con.scaleY = this.scale;
        this.con.x = (this.stage.stageWidth - this.con.width * this.scale) / 2;
        this.con.y = 444 + (this.maxH - this.con.height * this.scale) / 2;
        //框
        var k = new egret.Bitmap();
        k.texture = RES.getRes("kuang_png");
        this.rcon.addChild(k);
        k.width = this.photo.width * this.scale + 33;
        k.height = this.photo.height * this.scale + 33;
        k.x = this.con.x - 16;
        k.y = this.con.y - 6;
    };
    ImageScene.prototype.drawAnalysis = function (obj, bardata) {
        console.log(obj);
        if (obj.length == 0) {
            //没有脸
            var bg = new egret.Bitmap();
            var texture = RES.getRes("meilian_png");
            bg.texture = texture;
            bg.x = (this.stage.stageWidth - bg.width) / 2;
            bg.y = (this.stage.stageHeight - bg.height) / 2;
            this.rcon.addChild(bg);
        }
        else {
            for (var i = 0; i < obj.length; i++) {
                this.drawBorder(obj[i]);
            }
            this.drawbar(bardata);
            this.drawErweima();
            //创建html image标签1
            var rect = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            rect.height = this.con.y + this.con.height * this.scale + 50; //this.rcon.height;//this.con.y + this.con.height * this.scale + 50;
            //this.htmlImg.addToDOM(this.stage, rect, this.stage);
            //this.htmlImg.removeDOMByID("jietu")
            var img = document.createElement("img");
            this.node.bind(img);
            this.node.width = rect.width;
            this.node.height = rect.height;
            this.addChild(this.node);
            var renterTexture = new egret.RenderTexture();
            renterTexture.drawToTexture(this.stage, rect);
            img.src = renterTexture.toDataURL("image/png");
            //this.rcon.removeChildren();
            this.succeeText();
        }
    };
    ImageScene.prototype.drawBorder = function (obj) {
        //框
        var border = new egret.Shape();
        border.graphics.lineStyle(2, 0xffffff, 0.5);
        border.graphics.drawRect(this.con.x + this.scale * obj["faceRectangle"].left, this.con.y + this.scale * obj["faceRectangle"].top, this.scale * obj["faceRectangle"].width, this.scale * obj["faceRectangle"].height);
        border.graphics.endFill();
        this.rcon.addChild(border);
    };
    ImageScene.prototype.drawbar = function (obj) {
        console.log("标签", obj);
        var len = 0;
        if (obj.length > 2) {
            len = 2;
        }
        else {
            len = obj.length;
        }
        var rects = [];
        console.log("长度", len);
        for (var i = 0; i < len; i++) {
            //年龄bar
            var bar = Bar.create(parseFloat(obj[i]["faceAttributes"]["smile"]), obj[i]["faceAttributes"]["gender"], parseInt(obj[i]["faceAttributes"]["age"]));
            bar.x = this.con.x + this.scale * obj[i]["faceRectangle"].left + (this.scale * obj[i]["faceRectangle"].width - bar.width) / 2;
            bar.y = (this.con.y + this.scale * obj[i]["faceRectangle"].top) - 140;
            rects.push(new egret.Rectangle(bar.x, bar.y, bar.width, bar.height));
            bar.alpha = 0.85;
            this.rcon.addChild(bar);
        }
        if (rects.length == 2) {
            this.linkHeart(rects[0], rects[1]);
        }
    };
    ImageScene.prototype.drawErweima = function () {
        var erweima = new egret.Bitmap();
        erweima.texture = RES.getRes("erweima_png");
        this.rcon.addChild(erweima);
        erweima.width = 150;
        erweima.height = 150;
        erweima.x = this.con.x + this.con.width * this.scale - erweima.width;
        erweima.y = this.con.y + this.con.height * this.scale - erweima.height;
    };
    ImageScene.prototype.linkHeart = function (rect1, rect2) {
        var heart = new HeartValue();
        this.rcon.addChild(heart);
        var p1 = new egret.Point(rect1.x + rect1.width / 2, rect1.y + rect1.height / 2);
        var p2 = new egret.Point(rect2.x + rect2.width / 2, rect2.y + rect2.height / 2);
        var pc = egret.Point.interpolate(p1, p2, 0.5);
        ;
        if (egret.Point.distance(p1, p2) < 358) {
            pc.y -= 170;
        }
        heart.x = pc.x;
        heart.y = pc.y;
        heart.alpha = 0.85;
        //e63333 line
        var l1 = new egret.Shape();
        l1.graphics.lineStyle(5, 0xe63333, 0.85);
        l1.graphics.moveTo(p1.x, p1.y);
        l1.graphics.curveTo(p1.x, pc.y, pc.x, pc.y);
        l1.graphics.endFill();
        this.rcon.addChildAt(l1, this.rcon.numChildren - 3);
        var l2 = new egret.Shape();
        l2.graphics.lineStyle(5, 0xe63333, 0.85);
        l2.graphics.moveTo(p2.x, p2.y);
        l2.graphics.curveTo(p2.x, pc.y, pc.x, pc.y);
        l2.graphics.endFill();
        this.rcon.addChildAt(l2, this.rcon.numChildren - 3);
        //console.log(rect1,rect2,heart.getBounds())
    };
    ImageScene.prototype.succeeText = function () {
        var k = new egret.Bitmap();
        k.texture = RES.getRes("tishi");
        this.rcon.addChild(k);
        k.x = (this.stage.stageWidth - k.width) / 2;
        k.y = this.con.y + this.con.height * this.scale + 50;
    };
    return ImageScene;
}(egret.DisplayObjectContainer));
__reflect(ImageScene.prototype, "ImageScene");
