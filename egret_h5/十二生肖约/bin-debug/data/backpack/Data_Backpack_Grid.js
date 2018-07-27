var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Backpack_Grid = (function () {
    function Data_Backpack_Grid(data) {
        this.data = data;
        switch (data.type) {
            case 0:
                this.mail = new Data_Backpack_Mail(data);
                break;
            case 1:
                this.equip = new Data_Backpack_Equip(data);
                break;
        }
    }
    Object.defineProperty(Data_Backpack_Grid.prototype, "mailData", {
        get: function () {
            return this.mail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Grid.prototype, "equipData", {
        get: function () {
            return this.equip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Grid.prototype, "type", {
        get: function () {
            return this.data.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Grid.prototype, "path", {
        get: function () {
            return this.data.path;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Backpack_Grid;
}());
__reflect(Data_Backpack_Grid.prototype, "Data_Backpack_Grid");
//# sourceMappingURL=Data_Backpack_Grid.js.map