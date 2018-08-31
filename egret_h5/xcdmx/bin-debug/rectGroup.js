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
var GroupRect = (function (_super) {
    __extends(GroupRect, _super);
    function GroupRect() {
        var _this = _super.call(this) || this;
        _this.RotationId = 0;
        _this.getid = 0;
        _this.ISCLICK = false;
        _this.rectType = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
        // this.createRects();
        if (data.Is_first && data.readDateArray && data.readDateArray.gameArray.down_game.length > 0) {
            _this.addSavedata();
            data.Is_first = false;
        }
        else {
            _this.createRects();
        }
        return _this;
    }
    GroupRect.prototype.createRects = function () {
        this._group = []; //初始化数组
        for (var i = 0; i < 3; i++) {
            var _num = Math.floor(Math.random() * 6);
            var _spType = Math.floor(Math.random() * 15); //表示随机从方块类型为13种选取一中
            this.RotationId = 0;
            this.createSprite(_num, i, _spType, this.RotationId);
        }
    };
    GroupRect.prototype.onClickBegin = function (evt) {
        this.getid = evt.currentTarget.Id;
        this.ISCLICK = true;
    };
    GroupRect.prototype.addSavedata = function () {
        this._group = []; //初始化数组
        var clicknum = [];
        for (var i = 0; i < data.readDateArray.gameArray.down_game.length; i++) {
            var _num = data.readDateArray.gameArray.down_game[i][0].rect_color;
            var _spType = data.readDateArray.gameArray.down_game[i][0].rect_type; //表示随机从方块类型为13种选取一中
            var RotationId = data.readDateArray.gameArray.down_game[i][0].rect_rotationtype;
            var i_index = data.readDateArray.gameArray.down_game[i][0].rect_CLICKNUM;
            this.createSprite(_num, i_index, _spType, RotationId);
            clicknum.push(i_index);
        }
        for (var a = 0; a < data.rect_num_Array.length; a++) {
            if (clicknum.indexOf(data.rect_num_Array[a]) == -1) {
                data.click_post[a].click = false;
                data.rect_num_Array.splice(a, 1);
                a--;
                data.CLICKNUM--;
            }
        }
    };
    GroupRect.prototype.createSprite = function (_num, _i_index, _spType, _rotationtype) {
        var rect = new Rect(_num, _i_index, _spType, _rotationtype);
        this._group[_i_index] = rect;
        this.addChild(rect);
        rect.scaleX = 0.5;
        rect.scaleY = 0.5;
        rect.x = data.DOWN_POSTION[_i_index][0];
        // rect.y = data.DOWN_POSTION[i][1];
        rect.y = 1300;
        egret.Tween.get(rect).to({ x: data.DOWN_POSTION[_i_index][0], y: data.DOWN_POSTION[_i_index][1] }, 600, egret.Ease.backOut);
        /*** 本示例关键代码段结束 ***/
        rect.touchEnabled = true;
        rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBegin, this); //将组加上监听
    };
    return GroupRect;
}(egret.Sprite));
__reflect(GroupRect.prototype, "GroupRect");
