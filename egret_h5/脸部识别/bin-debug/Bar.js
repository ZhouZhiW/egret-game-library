var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Bar = (function () {
    function Bar() {
    }
    Bar.create = function (smile, gender, age) {
        console.log(smile, gender, age);
        var con = new egret.DisplayObjectContainer();
        var bar = new egret.Bitmap();
        var texture = RES.getRes("bar");
        bar.texture = texture;
        con.addChild(bar);
        //根据smile评分显示不同头像
        var smileImg = new egret.Bitmap();
        smileImg.x = 41;
        smileImg.y = 5;
        con.addChild(smileImg);
        if (smile >= 0 && smile < 0.1) {
            smileImg.texture = RES.getRes("s0");
        }
        else if (smile >= 0.1 && smile < 0.2) {
            smileImg.texture = RES.getRes("s1");
        }
        else if (smile >= 0.2 && smile < 0.3) {
            smileImg.texture = RES.getRes("s2");
        }
        else if (smile >= 0.3 && smile < 0.4) {
            smileImg.texture = RES.getRes("s3");
        }
        else if (smile >= 0.4 && smile < 0.5) {
            smileImg.texture = RES.getRes("s4");
        }
        else if (smile >= 0.5 && smile < 0.6) {
            smileImg.texture = RES.getRes("s5");
        }
        else if (smile >= 0.6 && smile <= 0.7) {
            smileImg.texture = RES.getRes("s6");
        }
        else if (smile >= 0.7 && smile < 08) {
            smileImg.texture = RES.getRes("s7");
        }
        else if (smile >= 0.8 && smile < 0.9) {
            smileImg.texture = RES.getRes("s8");
        }
        else if (smile >= 0.9 && smile <= 1) {
            smileImg.texture = RES.getRes("s9");
        }
        var genderImg = new egret.Bitmap();
        var genderTexture;
        if (gender == "male") {
            genderTexture = RES.getRes("man");
        }
        else {
            genderTexture = RES.getRes("woman");
        }
        genderImg.texture = genderTexture;
        genderImg.x = 10;
        genderImg.y = 72;
        con.addChild(genderImg);
        var agetext = new egret.BitmapText();
        agetext.font = RES.getRes("newnum_fnt");
        agetext.text = Math.ceil(age).toString();
        agetext.x = 46;
        agetext.y = 78;
        con.addChild(agetext);
        return con;
    };
    return Bar;
}());
__reflect(Bar.prototype, "Bar");
