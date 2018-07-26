var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zhangheng on 2014/11/21.
 * 主要用于跨域加载图片.
 * this.stage.addChild(new EImage("http://bbs.egret-labs.org/uc_server/avatar.php?uid=542&size=middle"));
 * this.stage.addChild(EImage.loadAsync("http://bbs.egret-labs.org/uc_server/avatar.php?uid=542&size=middle"));
 */
var EImage = (function (_super) {
    __extends(EImage, _super);
    function EImage(url) {
        var _this = _super.call(this) || this;
        _this._src = null;
        _this._comp = false;
        if (url != null) {
            _this.load(url);
        }
        return _this;
    }
    Object.defineProperty(EImage.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (s) {
            this.load(s);
        },
        enumerable: true,
        configurable: true
    });
    EImage.$ = function (obj) {
        var img = obj["$"];
        delete obj["$"];
        obj.onload = null;
        obj.onerror = null;
        return img;
    };
    EImage.prototype.onLoadBack = function (img, url) {
        //console.log(img);
        //console.log(url);
        if (url == this._src) {
            if (img) {
                var tt = new egret.Texture();
                tt._setBitmapData(img);
                this.texture = tt;
            }
            else {
                this.texture = null;
            }
            this._comp = true;
        }
    };
    EImage.prototype.load = function (url) {
        if (this._src == url && this._comp)
            return;
        this._src = url;
        if (url != null && url.length > 0) {
            this._comp = false;
            //RES.getResByUrl(url, this.onLoadBack, this, "image");
            var img = new Image();
            img["$"] = this;
            img.onload = function () {
                EImage.$(this).onLoadBack(this, this.src);
            };
            img.onerror = function () {
                EImage.$(this).onLoadBack(this, this.src);
            };
            img.src = url;
        }
        else {
            this.texture = null;
            this._comp = true;
        }
    };
    EImage.prototype.size = function (w, h) {
        this.width = w;
        this.height = h;
    };
    EImage.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * 异步加载图片
     * @param url   图片地址
     * @param compFunc  {Function} 回调函数。示例：compFunc(egret.Bitmap,url:string):void。
     * @param thisObject
     * @returns {egret.Bitmap}
     */
    EImage.loadAsync = function (url, compFunc, thisObject) {
        if (compFunc === void 0) { compFunc = null; }
        if (thisObject === void 0) { thisObject = null; }
        var img = new Image();
        var bmp = new egret.Bitmap();
        img["$"] = bmp;
        img.onload = function () {
            var p = this["$"];
            delete this["$"];
            this.onload = null;
            this.onerror = null;
            var t = new egret.Texture();
            t._setBitmapData(this);
            p.texture = t;
            if (compFunc != null) {
                compFunc.apply(thisObject, [p]);
            }
        };
        img.onerror = function () {
            var p = this["$"];
            delete this["$"];
            this.onload = null;
            this.onerror = null;
            p.texture = null;
            if (compFunc != null) {
                compFunc.apply(thisObject, null);
            }
        };
        img.src = url;
        return bmp;
    };
    return EImage;
}(egret.Bitmap));
__reflect(EImage.prototype, "EImage");
//# sourceMappingURL=EImage.js.map