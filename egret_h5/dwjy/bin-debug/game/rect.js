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
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(tag, row, col, x, y) {
        var _this = _super.call(this) || this;
        /*用于评估函数的三个数值*/
        _this.ag = 0;
        _this.ah = 0;
        _this.af = 0;
        _this.isOb = null; /*用于寻路算法中 判断是否能通过某个位置*/
        _this.parentNode = null; /*添加 父节点属性*/
        _this.ischeck = false; /*改对象是否被检测*/
        _this.removeArr = []; /*用于存储数字方块要删除时的移动路径*/
        _this.removeIdx = 0;
        _this.removeEnd = false;
        _this.removeCreate = false;
        _this.remoSpeed = null;
        _this._x = x;
        _this._y = y;
        _this.row = row;
        _this.col = col;
        _this.texttag = tag;
        _this.tag = tag;
        var _tag = tag % 9;
        if (_tag == 0) {
            _tag = 9;
        }
        _this.bmttag = _tag;
        _this.CreateObj();
        return _this;
    }
    Rect.prototype.CreateObj = function () {
        this._obj = new egret.Bitmap();
        this._obj.texture = RES.getRes(Data.colorArr[this.bmttag - 1]);
        this._obj.width = Data._width;
        this._obj.height = Data._width;
        this._obj.anchorOffsetX = this._obj.width / 2;
        this._obj.anchorOffsetY = this._obj.height / 2;
        this._obj.x = this.x;
        this._obj.y = this.y;
        this.addChild(this._obj);
        this.setChildIndex(this._obj, 1);
        this.num = new egret.TextField();
        // this.num = new egret.BitmapText();
        // this.num.font=Data.playlayer._font;
        // this.num.scale=0.2;
        this.num.size = 80;
        this.num.text = this.texttag.toString();
        this.num.anchorOffsetX = this.num.width / 2;
        this.num.anchorOffsetY = this.num.height / 2;
        // this.num.textColor = 0x000;
        this.num.x = this.x;
        this.num.y = this.y;
        this.addChild(this.num);
        this.setChildIndex(this.num, 2);
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
