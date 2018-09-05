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
    var D5Particle = (function (_super) {
        __extends(D5Particle, _super);
        function D5Particle(map) {
            var _this = _super.call(this) || this;
            _this.xspeed = 0;
            _this.yspeed = 0;
            _this.rotationSpeed = 0;
            _this.xscaleSpeed = 0;
            _this.yscaleSpeed = 0;
            _this.alphaSpeed = 0;
            _this.px = 0;
            _this.py = 0;
            _this.protation = 0;
            _this.palpha = 1;
            _this._lastRender = 0;
            _this._map = map;
            return _this;
        }
        D5Particle.getInstance = function (map) {
            if (D5Particle._pool.length) {
                return D5Particle._pool.pop();
            }
            else {
                var p = new D5Particle(map);
                return p;
            }
        };
        D5Particle.back2Pool = function (p) {
            if (D5Particle._pool.indexOf(p) == -1) {
                D5Particle._pool.push(p);
            }
        };
        D5Particle.prototype.run = function (t) {
            this.px += this.xspeed;
            this.py += this.yspeed;
            this.protation += this.rotationSpeed;
            this.pscale += this.xscaleSpeed;
            this.palpha += this.alphaSpeed;
            if (t - this._lastRender > 40) {
                this._lastRender = t;
                this.scaleX = this.scaleY = this.pscale;
                this.alpha = this.palpha;
                this.rotation = this.protation;
            }
            var target = this._map.getScreenPostion(this.px, this.py);
            this.x = target.x;
            this.y = target.y;
        };
        D5Particle.prototype.isLife = function (t) {
            if (this.width * this.pscale < 1 || this.height * this.pscale < 1 || this.palpha <= 0 || this.life > 0 && this.life < t)
                return false;
            return true;
        };
        D5Particle.prototype.dispose = function () {
            this.scaleX = this.scaleY = 1;
            this.rotation = 0;
            this.xspeed = 0;
            this.yspeed = 0;
            this.xscaleSpeed = 0;
            this.yscaleSpeed = 0;
            this.rotationSpeed = 0;
            this.alpha = 1;
            this.px = 0;
            this.py = 0;
            this.protation = 0;
            this.pscale = 1;
            this.palpha = 1;
            if (this.parent)
                this.parent.removeChild(this);
            this.graphics.clear();
            D5Particle.back2Pool(this);
        };
        D5Particle._pool = [];
        return D5Particle;
    }(egret.Shape));
    d5power.D5Particle = D5Particle;
    __reflect(D5Particle.prototype, "d5power.D5Particle", ["d5power.ID5Particle"]);
})(d5power || (d5power = {}));
//# sourceMappingURL=D5Particle.js.map