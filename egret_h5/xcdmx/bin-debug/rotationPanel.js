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
var rotationPanel = (function (_super) {
    __extends(rotationPanel, _super);
    function rotationPanel() {
        var _this = _super.call(this) || this;
        _this.getid = 0;
        _this.sp_Array = [];
        _this.createPanel();
        return _this;
    }
    rotationPanel.prototype.createPanel = function () {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        this.touchEnabled = true; //防止点击穿透；防止下层点击事件被触发
        var sp = new egret.Sprite();
        // sp.graphics.lineStyle(0x000000);
        sp.graphics.beginFill(0x000000, 0.5);
        sp.graphics.drawRect(0, 0, egret_width, egret_height);
        sp.graphics.endFill();
        this.addChild(sp);
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("transform_bg_png");
        this.addChild(this.bg);
        this.bg.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.bg.y = egret.MainContext.instance.stage.stageHeight - 270;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        this.bg.scaleX = data.CLICKNUM / 3;
        this.CreateSprite();
    };
    rotationPanel.prototype.CreateSprite = function () {
        var bg_scale_width = this.bg.width * this.bg.scaleX;
        var start_x = egret.MainContext.instance.stage.stageWidth / 2 - bg_scale_width / 2;
        for (var i = 0; i < data.rect_num_Array.length; i++) {
            var _num = data.Game_Layer._GroupRect._group[data.rect_num_Array[i]]._rect[0].COLOR;
            var _spType = data.Game_Layer._GroupRect._group[data.rect_num_Array[i]]._rect[0].TYPE;
            var rect = new Rect(_num, data.rect_num_Array[i], _spType, 0);
            this.addChild(rect);
            rect.scaleX = 0.5;
            rect.scaleY = 0.5;
            rect.x = start_x + bg_scale_width * i / data.rect_num_Array.length + 100;
            rect.y = this.bg.y;
            rect.touchEnabled = true;
            this.sp_Array.push(rect);
            // rect.anchorOffsetX = rect.width / 2;
            // rect.anchorOffsetY = rect.height / 2;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBegin, this); //将组加上监听
        }
    };
    rotationPanel.prototype.onClickBegin = function (evt) {
        this.CreateRotaSprite(evt.currentTarget.Id);
    };
    rotationPanel.prototype.CreateRotaSprite = function (Id) {
        for (var a = 0; a < this.sp_Array.length; a++) {
            this.sp_Array[a].parent.removeChild(this.sp_Array[a]);
            this.sp_Array.splice(a, 1);
            a--;
        }
        this.bg.scaleX = 1;
        var start_x = egret.MainContext.instance.stage.stageWidth / 2 - this.bg.width / 2;
        var _num = data.Game_Layer._GroupRect._group[Id]._rect[0].COLOR;
        var _spType = data.Game_Layer._GroupRect._group[Id]._rect[0].TYPE;
        this.sp_Type = data.Game_Layer._GroupRect._group[Id]._rect[0].TYPE;
        var rotaType = data.Game_Layer._GroupRect._group[Id]._rect[0].ROTATIONTYPE;
        var _index = 0;
        for (var i = 0; i < 4; i++) {
            if (i != rotaType) {
                var rect = new Rect(_num, Id, _spType, i);
                this.addChild(rect);
                rect.scaleX = 0.5;
                rect.scaleY = 0.5;
                rect.x = start_x + this.bg.width * _index / 3 + 100;
                rect.y = this.bg.y;
                rect.touchEnabled = true;
                this.sp_Array.push(rect);
                rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.swapSprite, this); //将组加上监听
                _index++;
            }
        }
    };
    rotationPanel.prototype.swapSprite = function (evt) {
        var sp_Id = evt.currentTarget.Id;
        var sp_RotationId = evt.currentTarget.RotationId;
        for (var a = 0; a < data.Game_Layer._GroupRect._group[sp_Id]._rect.length; a++) {
            data.Game_Layer._GroupRect._group[sp_Id]._rect[a].x = data.typeArray[this.sp_Type][sp_RotationId][a][0] * data.rect_width;
            data.Game_Layer._GroupRect._group[sp_Id]._rect[a].y = data.typeArray[this.sp_Type][sp_RotationId][a][1] * data.rect_width;
        }
        this.parent.removeChild(this);
    };
    return rotationPanel;
}(egret.Sprite));
__reflect(rotationPanel.prototype, "rotationPanel");
