var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Roles = (function (_super) {
    __extends(Data_Roles, _super);
    function Data_Roles() {
        var _this = _super.call(this) || this;
        _this._player = new Data_Player();
        _this._heros = [];
        for (var i = 0; i < 6; i++) {
            _this._heros.push(new Data_Hero());
        }
        return _this;
    }
    Data_Roles.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_Roles setServiceData is null!");
            return;
        }
        this._player.setServiceData(this.data.player);
        if (this.data.heros == null || this.data.heros.length != 6) {
            console.error("Data_Roles setServiceData heros number is not 6 !");
        }
        for (var i = 0; i < this._heros.length; i++) {
            this._heros[i].setServiceData(this.data.heros[i]);
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Roles.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Roles.prototype, "heros", {
        get: function () {
            return this._heros;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Roles;
}(BaseData));
__reflect(Data_Roles.prototype, "Data_Roles");
//# sourceMappingURL=Data_Roles.js.map