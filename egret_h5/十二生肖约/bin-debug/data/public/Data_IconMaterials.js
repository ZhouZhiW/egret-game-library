var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataType_IconMaterials;
(function (DataType_IconMaterials) {
    DataType_IconMaterials[DataType_IconMaterials["Gold"] = 0] = "Gold";
    DataType_IconMaterials[DataType_IconMaterials["Diamond"] = 1] = "Diamond";
    DataType_IconMaterials[DataType_IconMaterials["Gem"] = 2] = "Gem";
    DataType_IconMaterials[DataType_IconMaterials["Ess"] = 3] = "Ess";
    DataType_IconMaterials[DataType_IconMaterials["Fragment"] = 4] = "Fragment";
    DataType_IconMaterials[DataType_IconMaterials["monthCard"] = 5] = "monthCard";
    DataType_IconMaterials[DataType_IconMaterials["lifeCard"] = 6] = "lifeCard";
})(DataType_IconMaterials || (DataType_IconMaterials = {}));
var Data_IconMaterials = (function () {
    function Data_IconMaterials(data) {
        this.data = data;
    }
    Data_IconMaterials.prototype.getType = function () {
        return this.data.type;
    };
    Data_IconMaterials.prototype.getCounts = function () {
        return this.data.counts;
    };
    Data_IconMaterials.prototype.getIconSource = function () {
        var source;
        switch (this.getType()) {
            case DataType_IconMaterials.Gold:
                source = "resource/res/assicon/assicon_gold.png";
                break;
            case DataType_IconMaterials.Diamond:
                source = "resource/res/assicon/assicon_diamond.png";
                break;
            case DataType_IconMaterials.Ess:
                source = "resource/res/assicon/assicon_ess.png";
                break;
            case DataType_IconMaterials.Fragment:
                source = "resource/res/assicon/assicon_frg.png";
                break;
            case DataType_IconMaterials.Gem:
                source = "resource/res/assicon/assicon_gem.png";
                break;
            case DataType_IconMaterials.monthCard:
                source = "resource/res/assicon/assicon_monthCard.png";
                break;
            case DataType_IconMaterials.lifeCard:
                source = "resource/res/assicon/assicon_lifeCard.png";
                break;
        }
        return source;
    };
    return Data_IconMaterials;
}());
__reflect(Data_IconMaterials.prototype, "Data_IconMaterials");
//# sourceMappingURL=Data_IconMaterials.js.map