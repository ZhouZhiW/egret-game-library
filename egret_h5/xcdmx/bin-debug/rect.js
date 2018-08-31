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
    function Rect(num, id, _spType, roatation_type) {
        var _this = _super.call(this) || this;
        _this._rect = [];
        _this.rectType = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
        _this.Id = id;
        _this.RotationId = roatation_type;
        _this.TypeSprite(num, _spType, roatation_type);
        return _this;
    }
    Rect.prototype.TypeSprite = function (num, _spType, roatation_type) {
        // var _spType =10;  
        // console.log("选择的类型为:",_spType);
        for (var a = 0; a < data.typeArray[_spType][roatation_type].length; a++) {
            var sp_x = data.typeArray[_spType][roatation_type][a][0] * data.rect_width;
            var sp_y = data.typeArray[_spType][roatation_type][a][1] * data.rect_width;
            this.createRect(sp_x, sp_y, num, _spType, roatation_type);
        }
    };
    Rect.prototype.createRect = function (sp_x, sp_y, num, spType, _roatation_type) {
        var str = this.rectType[num];
        var sp = new RectBool();
        sp.texture = RES.getRes(str);
        this.addChild(sp);
        sp.COLOR = num;
        sp.TYPE = spType;
        sp.ROTATIONTYPE = _roatation_type;
        sp.CANREMOVE = false;
        sp.x = sp_x;
        sp.y = sp_y;
        sp.ROW = 0;
        sp.COL = 0;
        this._rect.push(sp);
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
