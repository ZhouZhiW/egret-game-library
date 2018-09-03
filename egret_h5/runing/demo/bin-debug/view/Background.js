var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.skinName = BackGroundSkin;
        return _this;
    }
    Background.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.width = Const.SW;
        this.height = Const.SH;
    };
    /**
     * 初始化数据
     * @param name
     */
    Background.prototype.setData = function (name) {
        var texture = RES.getRes(name);
        this.bmp1.texture = texture;
        this.bmp2.texture = texture;
        this.bmp1.width = Const.SW;
        this.bmp2.width = Const.SW;
        this.bgWidth = Const.SW;
        this.bmp1.x = 0;
        this.bmp2.x = Const.SW;
        this.behindGroup1.x = 0;
        this.behindGroup2.x = Const.SW;
        this.frontGroup1.x = 0;
        this.frontGroup2.x = Const.SW;
        this.middleGroup1.x = 0;
        this.middleGroup2.x = Const.SW;
    };
    // private init()
    /**
     * 每帧执行
     */
    Background.prototype.run = function (second) {
        this.runShandow(second);
        this.runBehind(second);
        this.runMiddle(second);
        this.runFront(second);
    };
    Background.prototype.runShandow = function (second) {
        var _moveNum = second * 100;
        var self = this;
        // console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
        if (Math.abs(self.bmp1.x) > self.bgWidth) {
            self.bmp1.x = (self.bmp2.x + self.bgWidth);
        }
        if (Math.abs(self.bmp2.x) > self.bgWidth) {
            self.bmp2.x = (self.bmp1.x + self.bgWidth);
        }
        self.bmp1.x -= _moveNum;
        self.bmp2.x -= _moveNum;
    };
    Background.prototype.runBehind = function (second) {
        var _moveNum = second * 20;
        var self = this;
        // console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
        if (Math.abs(self.behindGroup1.x) > self.bgWidth) {
            self.behindGroup1.x = (self.behindGroup2.x + self.bgWidth);
        }
        if (Math.abs(self.behindGroup2.x) > self.bgWidth) {
            self.behindGroup2.x = (self.behindGroup1.x + self.bgWidth);
        }
        self.behindGroup1.x -= _moveNum;
        self.behindGroup2.x -= _moveNum;
    };
    Background.prototype.runMiddle = function (second) {
        var _moveNum = second * 50;
        var self = this;
        // console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
        if (Math.abs(self.middleGroup1.x) > self.bgWidth) {
            self.middleGroup1.x = (self.middleGroup2.x + self.bgWidth);
        }
        if (Math.abs(self.middleGroup2.x) > self.bgWidth) {
            self.middleGroup2.x = (self.middleGroup1.x + self.bgWidth);
        }
        self.middleGroup1.x -= _moveNum;
        self.middleGroup2.x -= _moveNum;
    };
    Background.prototype.runFront = function (second) {
        var _moveNum = second * 120;
        var self = this;
        // console.log(self.bmp1.x, Math.abs(self.bmp1.x) > self.bgWidth, self.bmp2.x)
        if (Math.abs(self.frontGroup1.x) > self.bgWidth) {
            self.frontGroup1.x = (self.frontGroup2.x + self.bgWidth);
        }
        if (Math.abs(self.frontGroup2.x) > self.bgWidth) {
            self.frontGroup2.x = (self.frontGroup1.x + self.bgWidth);
        }
        self.frontGroup1.x -= _moveNum;
        self.frontGroup2.x -= _moveNum;
    };
    Background.prototype.destory = function () {
        this.behindGroup1.removeChildren();
        this.behindGroup2.removeChildren();
        this.middleGroup1.removeChildren();
        this.middleGroup2.removeChildren();
        this.frontGroup2.removeChildren();
        this.frontGroup1.removeChildren();
    };
    return Background;
}(eui.Component));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Background.js.map