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
    /**
     *
     * @author
     *
     */
    var D5BitmapParticle = (function (_super) {
        __extends(D5BitmapParticle, _super);
        function D5BitmapParticle() {
            var _this = _super.call(this) || this;
            _this.xspeed = 0;
            _this.yspeed = 0;
            _this.rotationSpeed = 0;
            _this.xscaleSpeed = 0;
            _this.yscaleSpeed = 0;
            _this.alphaSpeed = 0;
            return _this;
        }
        D5BitmapParticle.getInstance = function () {
            if (D5BitmapParticle._pool.length) {
                return D5BitmapParticle._pool.pop();
            }
            else {
                var p = new D5BitmapParticle();
                return p;
            }
        };
        D5BitmapParticle.back2Pool = function (p) {
            if (D5BitmapParticle._pool.indexOf(p) == -1) {
                D5BitmapParticle._pool.push(p);
            }
        };
        D5BitmapParticle.prototype.run = function () {
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.rotation += this.rotationSpeed;
            this.scaleX += this.xscaleSpeed;
            this.scaleY += this.yscaleSpeed;
            this.alpha += this.alphaSpeed;
        };
        D5BitmapParticle.prototype.isLife = function (t) {
            if (this.alpha <= 0 || this.life > 0 && this.life < t)
                return false;
            return true;
        };
        D5BitmapParticle.prototype.dispose = function () {
            this.scaleX = this.scaleY = 1;
            this.rotation = 0;
            this.xspeed = 0;
            this.yspeed = 0;
            this.xscaleSpeed = 0;
            this.yscaleSpeed = 0;
            this.rotationSpeed = 0;
            this.alphaSpeed = 1;
            this.alpha = 1;
            if (this.parent)
                this.parent.removeChild(this);
            D5BitmapParticle.back2Pool(this);
        };
        D5BitmapParticle._pool = [];
        return D5BitmapParticle;
    }(egret.Bitmap));
    d5power.D5BitmapParticle = D5BitmapParticle;
    __reflect(D5BitmapParticle.prototype, "d5power.D5BitmapParticle");
})(d5power || (d5power = {}));
//# sourceMappingURL=D5BitmapParticle.js.map