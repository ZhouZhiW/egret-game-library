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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.Map_Array = [];
        _this.rectType = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
        _this.CreateMap();
        _this.addUi();
        data.Map_Layer = _this;
        return _this;
    }
    Map.prototype.CreateMap = function () {
        var bg = this.createBitmapByName("bg2_jpg");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageHeight;
        this.addChild(bg);
        for (var a = 0; a < data.map_row; a++) {
            for (var b = 0; b < data.map_col; b++) {
                this.Map_Array.push({
                    row: a,
                    col: b,
                    x: data.rect_x + data.rect_width * b,
                    y: data.rect_y + a * data.rect_width,
                    canDown: false
                });
                this.addSprite(data.rect_x + data.rect_width * a, data.rect_y + b * data.rect_width);
            }
        }
        if (data.Is_first && data.readDateArray && data.readDateArray.gameArray.up_game.length > 0) {
            for (var i = 0; i < data.readDateArray.gameArray.up_game.length; i++) {
                var _x = data.readDateArray.gameArray.up_game[i].rect_x;
                var _y = data.readDateArray.gameArray.up_game[i].rect_y; //表示随机从方块类型为13种选取一中
                var _row = data.readDateArray.gameArray.up_game[i].rect_row;
                var _col = data.readDateArray.gameArray.up_game[i].rect_col;
                var _color = data.readDateArray.gameArray.up_game[i].rect_color;
                this.create_Rect(_x, _y, _color, _row, _col);
            }
        }
    };
    Map.prototype.addSprite = function (sp_x, sp_y) {
        var bg = this.createBitmapByName("geizi_png");
        bg.x = sp_x;
        bg.y = sp_y;
        this.addChild(bg);
    };
    Map.prototype.addUi = function () {
        var jiangbei = this.createBitmapByName("achievement_png");
        this.addChild(jiangbei);
        jiangbei.x = egret.MainContext.instance.stage.stageWidth / 2 - jiangbei.width / 2;
        jiangbei.y = 75;
    };
    Map.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Map.prototype.create_Rect = function (sp_x, sp_y, _color, _row, _col) {
        var str = this.rectType[_color];
        var sp = new RectBool();
        sp.texture = RES.getRes(str);
        this.addChild(sp);
        sp.COLOR = _color;
        sp.CANREMOVE = false;
        sp.x = sp_x;
        sp.y = sp_y;
        sp.ROW = _row;
        sp.COL = _col;
        data.Block_Array[sp.ROW * data.map_row + sp.COL] = sp;
        this.Map_Array[sp.ROW * data.map_row + sp.COL].canDown = true;
    };
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
