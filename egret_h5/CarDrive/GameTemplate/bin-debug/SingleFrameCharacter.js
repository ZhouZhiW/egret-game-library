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
var d5power;
(function (d5power) {
    var SingleFrameCharacter = (function (_super) {
        __extends(SingleFrameCharacter, _super);
        function SingleFrameCharacter(map) {
            var _this = _super.call(this, map) || this;
            _this._monitor = new egret.Bitmap;
            return _this;
        }
        SingleFrameCharacter.prototype.run = function (t) {
            this.updatePos();
        };
        SingleFrameCharacter.prototype.updatePos = function (offX, offY) {
            if (offX === void 0) { offX = 0; }
            if (offY === void 0) { offY = 0; }
            var tx = this._pos.x;
            var ty = this._pos.y;
            if (this._map) {
                var wout = this._map.width > d5power.D5Game.screenWidth;
                var hout = this._map.height > d5power.D5Game.screenHeight;
                if (this.beFocus && wout && hout) {
                    // 地图比屏幕大，需要卷动
                    tx = d5power.D5Game.screenWidth >> 1;
                    ty = d5power.D5Game.screenHeight >> 1;
                }
                else {
                    var target = this._map.getScreenPostion(tx, ty);
                    tx = target.x;
                    ty = target.y;
                }
            }
            if (this._monitor == null)
                return;
            this._monitor.x = tx + offX;
            this._monitor.y = ty + offY;
        };
        SingleFrameCharacter.prototype.setSkin = function (name) {
            var data = d5power.D5UIResourceData.getData(name);
            if (data == null) {
                trace("[D5Bitmap]No Resource" + name);
                var texture = RES.getRes(name);
                if (texture) {
                    this.onResReady(texture);
                }
                else {
                    RES.getResByUrl(name, this.onResReady, this, RES.ResourceItem.TYPE_IMAGE);
                }
                return;
            }
            this.onResReady(data.getResource(0));
        };
        SingleFrameCharacter.prototype.onResReady = function (data) {
            this._monitor.texture = data;
            this._monitor.anchorOffsetX = Math.ceil(data.textureWidth >> 1);
            this._monitor.anchorOffsetY = Math.ceil(data.textureHeight >> 1);
        };
        return SingleFrameCharacter;
    }(d5power.GameObject));
    d5power.SingleFrameCharacter = SingleFrameCharacter;
    __reflect(SingleFrameCharacter.prototype, "d5power.SingleFrameCharacter", ["d5power.IGD"]);
})(d5power || (d5power = {}));
//# sourceMappingURL=SingleFrameCharacter.js.map