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
var addDaoju = (function (_super) {
    __extends(addDaoju, _super);
    function addDaoju() {
        var _this = _super.call(this) || this;
        _this.addDaojuAnction();
        return _this;
    }
    addDaoju.prototype.addDaojuAnction = function () {
        this.touchEnabled = true;
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        this.touchEnabled = true; //防止点击穿透；防止下层点击事件被触发
        var sp = new egret.Sprite();
        // sp.graphics.lineStyle(0x000000);
        sp.graphics.beginFill(0x000000, 0.5);
        sp.graphics.drawRect(0, 0, egret_width, egret_height);
        sp.graphics.endFill();
        this.addChild(sp);
        var _data = RES.getRes("sun_json");
        var txtr = RES.getRes("sun_png");
        var mcFactory = new egret.MovieClipDataFactory(_data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("sun"));
        this.addChild(mc1);
        mc1.play(2);
        mc1.x = egret.MainContext.instance.stage.stageWidth / 2 - mc1.width / 2 - 10;
        mc1.y = egret.MainContext.instance.stage.stageHeight / 2 - mc1.height / 2 - 10;
        mc1.anchorOffsetX = mc1.width / 2;
        mc1.anchorOffsetY = mc1.height / 2;
        var sp_Array = [
            {
                url: "refresh_png",
                _x: 450,
                _y: 920,
            },
            {
                url: "transform_png",
                _x: 600,
                _y: 920,
            },
        ];
        var _index = Math.floor(Math.random() * 2);
        var _url = sp_Array[_index].url;
        var btn1 = new egret.Bitmap();
        btn1.texture = RES.getRes(_url);
        this.addChildAt(btn1, 10);
        btn1.x = egret.MainContext.instance.stage.stageWidth / 2;
        btn1.y = egret.MainContext.instance.stage.stageHeight / 2;
        btn1.anchorOffsetX = btn1.width / 2;
        btn1.anchorOffsetY = btn1.height / 2;
        this.addChild(btn1);
        var that = this;
        mc1.addEventListener(egret.Event.COMPLETE, function (e) {
            var end_x = sp_Array[_index]._x;
            var end_y = sp_Array[_index]._y;
            if (mc1.parent) {
                mc1.parent.removeChild(mc1);
                egret.Tween.get(btn1).to({ x: end_x, y: end_y, scaleX: 0.5, scaleY: 0.5 }, 1000).call(function () {
                    if (_index == 0) {
                        data.UPDATE_data++;
                        console.log("ssss", data.Game_Layer);
                        data.Game_Layer._updatedata.text = data.UPDATE_data.toString();
                    }
                    else {
                        data.ROTATION_data++;
                        console.log("ssss", data.Game_Layer);
                        data.Game_Layer._rotationdata.text = data.ROTATION_data.toString();
                    }
                    that.parent.removeChild(that);
                });
            }
        }, this);
    };
    return addDaoju;
}(egret.Sprite));
__reflect(addDaoju.prototype, "addDaoju");
