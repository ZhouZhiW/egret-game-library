var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var end = (function (_super) {
    __extends(end, _super);
    function end() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    end.prototype.onAddToStage = function () {
        SaveImageUtils.drawCanvasimages();
        SaveImageUtils.imageTagVisible(true);
        this.CreatgeText("长按保存图片分享", 400, 30, 60, true);
        var tw = egret.Tween.get(this);
        tw.wait(2000).call(function () {
            // SaveImageUtils.drawCanvasimages();
            // SaveImageUtils.imageTagVisible(true);
        });
        // var end_bg = this.createBitmapByName("end_png")
        // this.addChild(end_bg);
        // end_bg.x = 72;
        // end_bg.y = 100;
        // var num = Math.floor(Math.random() * 10);
        // this.CreatgeText(_data.game_result[num].strleft, 150, 795, 70, true)
        // this.CreatgeText(_data.game_result[num].strright, 760, 795, 70, true)
        // this.CreatgeText(_data.game_result[1].str, 100, 890, 35, false);
        // SaveImageUtils.imageTagVisible(true);
    };
    end.prototype.CreatgeText = function (str, _x, _y, _size, bool) {
        var _text = new egret.TextField();
        _text.text = str;
        // _text.x = _x;
        _text.y = _y;
        _text.size = _size;
        _text.textColor = 0x000000;
        _text.width = 1080;
        _text.height = 100;
        _text.lineSpacing = 5;
        _text.textAlign = egret.HorizontalAlign.CENTER;
        // _text.textAlign=egret.VerticalAlign.MIDDLE;
        _text.bold = bool;
        this.addChild(_text);
    };
    end.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    end.prototype.aa = function () {
        // function CanvasToimages_1(str1, str2, str3) {
        //     var testDom = document.getElementById('test');
        //     // var vanvas = document.getElementsByTagName("canvas")[0];
        //     // var canvasImg = convertCanvasToImage(vanvas);
        //     // var base64 = getBase64Image(canvasImg);
        //     var image = new Image();
        //     image.src = "./resource/res/end.png"
        //     image.onload = function () {
        //         if (image.complete) {
        //             var canvas = document.createElement("canvas");
        //             canvas.width = image.width;
        //             canvas.height = image.height;
        //             var ctx = canvas.getContext("2d");
        //             ctx.drawImage(image, 0, 0, image.width, image.height);
        //             ctx.font = "60px 黑体";
        //             ctx.fillStyle = "black";
        //             ctx.fillText(str1, 110, 760);
        //             ctx.font = "60px 黑体";
        //             ctx.fillStyle = "black";
        //             ctx.fillText(str2, 720, 760);
        //             ctx.font = "35px 黑体";
        //             ctx.fillStyle = "black";
        //             // ctx.fillText(str3, 50, 820);
        //             var lineWidth = 0;
        //             var canvasWidth = 850; //计算canvas的宽度
        //             var initHeight = 820; //绘制字体距离canvas顶部初始的高度
        //             var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        //             for (let i = 0; i < str3.length; i++) {
        //                 lineWidth += ctx.measureText(str3[i]).width;
        //                 if (lineWidth > canvasWidth) {
        //                     ctx.fillText(str3.substring(lastSubStrIndex, i), 40, initHeight); //绘制截取部分
        //                     initHeight += 35; //35为字体的高度
        //                     lineWidth = 0;
        //                     lastSubStrIndex = i;
        //                 }
        //                 if (i == str3.length - 1) { //绘制剩余部分
        //                     ctx.fillText(str3.substring(lastSubStrIndex, i + 1), 40, initHeight);
        //                 }
        //             }
        //             var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
        //             //        var dataURL = canvas.toDataURL("image/"+ext);
        //             var dataURL = canvas.toDataURL("image/png", 1.0);
        //             var testDom = document.getElementById('test');
        //             testDom.src = dataURL;
        //             return dataURL;
        //         }
        //     }
        // }
    };
    return end;
}(egret.DisplayObjectContainer));
__reflect(end.prototype, "end");
//# sourceMappingURL=end.js.map