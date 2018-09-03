var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropView = (function (_super) {
    __extends(PropView, _super);
    function PropView(type) {
        var _this = _super.call(this) || this;
        _this._type = -1; //道具类型
        _this.id = -1;
        _this._num = 0; //数量
        _this._type = type;
        _this.init();
        return _this;
    }
    Object.defineProperty(PropView.prototype, "proptype", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    PropView.prototype.init = function () {
        this.createView();
        this.createNumText();
        this.addChild(this._view_active);
        this.addChild(this._view_box);
        this.addChild(this._numText);
        this.setActivateState(true);
    };
    PropView.prototype.createNumText = function () {
        this._numText = new egret.BitmapText();
        this._numText.font = RES.getRes("number_fnt");
        this._numText.x = this._view_active.width - 31;
    };
    PropView.prototype.createView = function () {
        var _interval = 15;
        var _width = (GameData.stageW - _interval * 6) / 5;
        if (!this._view_active) {
            this._view_active = new egret.Bitmap();
            this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
            this._view_active.width = this._view_active.height = _width;
        }
        if (!this._view_box) {
            this._view_box = new egret.Bitmap();
            this._view_box.texture = RES.getRes("propbox_png");
            this._view_box.width = this._view_box.height = this._view_active.width + 10;
            this._view_box.x = -5;
            this._view_box.y = -5;
        }
    };
    Object.defineProperty(PropView.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (val) {
            this._num = val;
            this._numText.text = val.toString();
            if (val <= 0) {
                this.setActivateState(false);
            }
            else {
                this.setActivateState(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    PropView.prototype.getFocusTexture = function (type) {
        var textureName = "";
        switch (type) {
            case 0:
                textureName = "tongseactive_png";
                break;
            case 1:
                textureName = "zhadanactive_png";
                break;
            case 2:
                textureName = "zhenghangactive_png";
                break;
            case 3:
                textureName = "zhenglieactive_png";
                break;
            case 4:
                textureName = "chanziactive_png";
                break;
        }
        return textureName;
    };
    PropView.prototype.getActivateTexture = function (type) {
        var textureName = "";
        switch (type) {
            case 0:
                textureName = "tongse_png";
                break;
            case 1:
                textureName = "zhadan_png";
                break;
            case 2:
                textureName = "zhenghang_png";
                break;
            case 3:
                textureName = "zhenglie_png";
                break;
            case 4:
                textureName = "chanzi_png";
                break;
        }
        return textureName;
    };
    PropView.prototype.getDisableTexture = function (type) {
        var textureName = "";
        switch (type) {
            case 0:
                textureName = "tongsedisable_png";
                break;
            case 1:
                textureName = "zhadandisable_png";
                break;
            case 2:
                textureName = "zhenghangdisable_png";
                break;
            case 3:
                textureName = "zhengliedisable_png";
                break;
            case 4:
                textureName = "chanzidisable_png";
                break;
        }
        return textureName;
    };
    PropView.prototype.setActivateState = function (val) {
        this.touchEnabled = val;
        if (val) {
            this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
            this._numText.font = RES.getRes("number_fnt");
        }
        else {
            this._view_active.texture = RES.getRes(this.getDisableTexture(this._type));
            this._numText.font = RES.getRes("numberdisable_fnt");
        }
    };
    PropView.prototype.setFocus = function (val) {
        if (val) {
            this._view_active.texture = RES.getRes(this.getFocusTexture(this._type));
        }
        else {
            if (this._num > 0) {
                this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
            }
            else {
                this._view_active.texture = RES.getRes(this.getDisableTexture(this._type));
            }
        }
    };
    return PropView;
}(egret.Sprite));
__reflect(PropView.prototype, "PropView");
//# sourceMappingURL=PropView.js.map