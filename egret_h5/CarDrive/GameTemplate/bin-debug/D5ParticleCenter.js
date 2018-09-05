var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var d5power;
(function (d5power) {
    /**
     *
     * @author
     *
     */
    var D5ParticleCenter = (function () {
        function D5ParticleCenter(container, map) {
            this._list = [];
            this._container = container;
            this._map = map;
        }
        D5ParticleCenter.prototype.bitmapRadiation = function (startx, starty, res, num, alphaSpeed) {
            if (alphaSpeed === void 0) { alphaSpeed = 0; }
            var t = egret.getTimer();
            for (var i = 0; i < num; i++) {
                var p = d5power.D5BitmapParticle.getInstance();
                p.texture = d5power.D5UIResourceData.getData(res).getResource(0);
                p.x = startx;
                p.y = starty;
                p.life = t + 800;
                var r = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random() * 16 * Math.cos(r);
                p.yspeed = Math.random() * 16 * Math.sin(r);
                p.rotationSpeed = Math.random() * 20;
                p.alphaSpeed = alphaSpeed;
                this._container.addChild(p);
                this._list.push(p);
            }
        };
        D5ParticleCenter.prototype.bitmapScale = function (startx, starty, res, num, alphaSpeed) {
            if (alphaSpeed === void 0) { alphaSpeed = 0; }
            var t = egret.getTimer();
            for (var i = 0; i < num; i++) {
                var p = d5power.D5BitmapParticle.getInstance();
                p.texture = d5power.D5UIResourceData.getData(res).getResource(0);
                p.x = startx;
                p.y = starty;
                p.life = t + 800;
                var r = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random() * 8 * Math.cos(r);
                p.yspeed = Math.random() * 8 * Math.sin(r);
                p.xscaleSpeed = p.yscaleSpeed = 0.03 * Math.random() * (Math.random() > .5 ? 1 : -1);
                p.alphaSpeed = alphaSpeed;
                this._container.addChild(p);
                this._list.push(p);
            }
        };
        D5ParticleCenter.prototype.graphicsScale = function (startx, starty, color, size, shape, alpha, num) {
            if (shape === void 0) { shape = 0; }
            if (alpha === void 0) { alpha = 0; }
            if (num === void 0) { num = 1; }
            var t = egret.getTimer();
            for (var i = 0; i < num; i++) {
                var p = d5power.D5Particle.getInstance(this._map);
                p.graphics.beginFill(color, 1);
                if (shape == 0) {
                    p.graphics.drawCircle(0, 0, size * Math.random() + .5);
                }
                else {
                    p.graphics.drawRect(0, 0, size, size);
                    p.anchorOffsetX = size * .5;
                    p.anchorOffsetY = size * .5;
                }
                p.graphics.endFill();
                p.px = startx;
                p.py = starty;
                p.life = t + 800;
                var r = Math.random() * 2 * 3.1416;
                //p.xspeed = Math.random() * 16 * Math.cos(r);
                //p.yspeed = Math.random() * 16 * Math.sin(r);
                p.xscaleSpeed = p.yscaleSpeed = -0.03; //0.03 * Math.random() * (Math.random() > .5 ? 1 : -1);
                p.alphaSpeed = alpha;
                this._container.addChild(p);
                this._list.push(p);
            }
        };
        D5ParticleCenter.prototype.graphicsRadiation = function (startx, starty, color, size, num) {
            var t = egret.getTimer();
            for (var i = 0; i < num; i++) {
                var p = d5power.D5Particle.getInstance(this._map);
                p.graphics.beginFill(color, 1);
                p.graphics.drawRect(-size * .5, -size * .5, size, size);
                p.graphics.endFill();
                p.px = startx;
                p.py = starty;
                p.life = t + 800;
                var r = Math.random() * 2 * 3.1416;
                p.xspeed = Math.random() * 16 * Math.cos(r);
                p.yspeed = Math.random() * 16 * Math.sin(r);
                ;
                this._container.addChild(p);
                this._list.push(p);
            }
        };
        D5ParticleCenter.prototype.render = function (t) {
            var p;
            for (var i = this._list.length - 1; i >= 0; i--) {
                p = this._list[i];
                p.run(t);
                if (!p.isLife(t)) {
                    p.dispose();
                    this._list.splice(i, 1);
                }
            }
        };
        D5ParticleCenter.prototype.clear = function () {
            var p;
            for (var i = this._list.length - 1; i >= 0; i--) {
                p = this._list[i];
                p.dispose();
                this._list.pop();
            }
        };
        return D5ParticleCenter;
    }());
    d5power.D5ParticleCenter = D5ParticleCenter;
    __reflect(D5ParticleCenter.prototype, "d5power.D5ParticleCenter");
})(d5power || (d5power = {}));
//# sourceMappingURL=D5ParticleCenter.js.map