var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtils = (function () {
    function GameUtils() {
    }
    /**
        * 默认 Def;白羊座 Ari;金牛座 Tau;双子座 Gem;巨蟹座 Cnc;
        * 狮子座 Leo;处女座 Vir;天秤座 Lib;天蝎座 Sco;
        * 射手座 Sgr;摩羯座 Cap;水瓶座 Agr;双鱼座 Psc;
        */
    GameUtils.starsName = function (index) {
        if (index == null || index == "") {
            return "";
        }
        var info = index.split("_");
        var name = null;
        switch (Number(info[0])) {
            case 0:
                name = "def";
                break;
            case 1:
                name = "ari";
                break;
            case 2:
                name = "tau";
                break;
            case 3:
                name = "gem";
                break;
            case 4:
                name = "cnc";
                break;
            case 5:
                name = "leo";
                break;
            case 6:
                name = "vir";
                break;
            case 7:
                name = "lib";
                break;
            case 8:
                name = "sco";
                break;
            case 9:
                name = "sgr";
                break;
            case 10:
                name = "cap";
                break;
            case 11:
                name = "agr";
                break;
            case 12:
                name = "psc";
                break;
        }
        return name + "_" + info[1];
    };
    //heros
    GameUtils.herosName = function (index) {
        switch (index) {
            case 1:
                return "pandora";
            case 2:
                return "poseidon";
            case 3:
                return "athena";
            case 4:
                return "handes";
            case 5:
                return "hera";
            case 6:
                return "zeus";
        }
    };
    GameUtils.getGoldPoint = function (parent) {
        if (parent === void 0) { parent = null; }
        return this.getPoint(400, 62, parent);
    };
    GameUtils.getGemPoint = function (parent) {
        if (parent === void 0) { parent = null; }
        return this.getPoint(119 + (53 / 2), 745 + (49 / 2), parent);
    };
    GameUtils.getPoint = function (x, y, parent) {
        if (parent === void 0) { parent = null; }
        if (parent == null) {
            return this.temPoint.setTo(x, y);
        }
        else {
            return parent.globalToLocal(x, y, this.temPoint);
        }
    };
    return GameUtils;
}());
GameUtils.temPoint = new egret.Point();
__reflect(GameUtils.prototype, "GameUtils");
//# sourceMappingURL=GameUtils.js.map