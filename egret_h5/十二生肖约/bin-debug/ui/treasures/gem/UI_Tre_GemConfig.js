var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UI_Tre_GemConfig = (function () {
    function UI_Tre_GemConfig() {
    }
    UI_Tre_GemConfig.getGemName = function (type, level) {
        var tx = null;
        switch (type) {
            case DataType_GemType.Att:
                tx = "蓝宝石";
                break;
            case DataType_GemType.HeroAtt:
                tx = "绿宝石";
                break;
            case DataType_GemType.Cri:
                tx = "紫宝石";
                break;
            case DataType_GemType.Csd:
                tx = "红宝石";
                break;
            case DataType_GemType.Money:
                tx = "黄宝石";
                break;
        }
        return this.getlevelTx(level) + tx;
    };
    UI_Tre_GemConfig.getlevelTx = function (level) {
        var tx = null;
        switch (level) {
            case DataType_GemLevel.First:
                tx = "1级";
                break;
            case DataType_GemLevel.Second:
                tx = "2级";
                break;
            case DataType_GemLevel.Third:
                tx = "3级";
                break;
            case DataType_GemLevel.Fourth:
                tx = "4级";
                break;
            case DataType_GemLevel.Fifth:
                tx = "5级";
                break;
            case DataType_GemLevel.Sixth:
                tx = "6级";
                break;
            case DataType_GemLevel.Seventh:
                tx = "7级";
                break;
            case DataType_GemLevel.Eighth:
                tx = "8级";
                break;
            case DataType_GemLevel.Ninth:
                tx = "9级";
                break;
            case DataType_GemLevel.Tenth:
                tx = "10级";
                break;
            default:
                tx = "未知的";
        }
        return tx;
    };
    UI_Tre_GemConfig.getGemPath = function (type, level) {
        if (level === void 0) { level = 0; }
        var path = "resource/res/itemicon/gem/item_icon_gem_";
        switch (type) {
            case DataType_GemType.Null:
                path += "null";
                return this.pathExName(path);
            case DataType_GemType.UnLock:
                path += "lock";
                return this.pathExName(path);
            case DataType_GemType.Lock:
                path += "lock";
                return this.pathExName(path);
            case DataType_GemType.Att:
                path += "blue";
                break;
            case DataType_GemType.HeroAtt:
                path += "green";
                break;
            case DataType_GemType.Cri:
                path += "purple";
                break;
            case DataType_GemType.Csd:
                path += "red";
                break;
            case DataType_GemType.Money:
                path += "yellow";
                break;
            default:
                path += "null";
                return this.pathExName(path);
        }
        path = this.levelPath(path, level);
        return this.pathExName(path);
    };
    UI_Tre_GemConfig.levelPath = function (path, level) {
        switch (level) {
            case DataType_GemLevel.First:
                return path + "_1";
            case DataType_GemLevel.Second:
                return path + "_2";
            case DataType_GemLevel.Third:
                return path + "_3";
            case DataType_GemLevel.Fourth:
                return path + "_4";
            case DataType_GemLevel.Fifth:
                return path + "_5";
            case DataType_GemLevel.Sixth:
                return path + "_6";
            case DataType_GemLevel.Seventh:
                return path + "_7";
            case DataType_GemLevel.Eighth:
                return path + "_8";
            case DataType_GemLevel.Ninth:
                return path + "_9";
            case DataType_GemLevel.Tenth:
                return path + "_10";
            default:
                return path;
        }
    };
    UI_Tre_GemConfig.pathExName = function (path) {
        return path += ".png";
    };
    UI_Tre_GemConfig.getAttributesInfo = function (type, attributes) {
        switch (type) {
            case DataType_GemType.Att:
                return "点击伤害增加" + Utils.numberToPre(attributes);
            case DataType_GemType.HeroAtt:
                return "全体英雄秒伤增加" + Utils.numberToPre(attributes);
            case DataType_GemType.Cri:
                return "暴击率增加" + Utils.numberToPre(attributes);
            case DataType_GemType.Csd:
                return "暴击伤害增加" + Utils.numberToPre(attributes);
            case DataType_GemType.Money:
                return "金币掉落提高" + Utils.numberToPre(attributes);
        }
    };
    return UI_Tre_GemConfig;
}());
__reflect(UI_Tre_GemConfig.prototype, "UI_Tre_GemConfig");
//# sourceMappingURL=UI_Tre_GemConfig.js.map