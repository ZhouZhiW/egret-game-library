var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.requestImage = function (img, url) {
        // console.log("requestImage: "+url);
        // url = "http://b.hiphotos.baidu.com/baike/w%3D268%3Bg%3D0/sign=92e00c9b8f5494ee8722081f15ce87c3/29381f30e924b899c83ff41c6d061d950a7bf697.jpg"
        // const imageLoader: egret.ImageLoader = new egret.ImageLoader();
        // // imageLoader.crossOrigin = "anonymous";
        // egret.ImageLoader.crossOrigin = "anonymous";
        // imageLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event) {
        //     const imageLoader = <egret.ImageLoader>event.currentTarget;
        //     img.texture = new egret.Bitmap(imageLoader.data).texture;
        //     // const bitmap: egret.Bitmap = new egret.Bitmap();
        // }, this);
        // imageLoader.load(url);
        RES.getResByUrl(url, function (texture) {
            img.source = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    Utils.numberToPre = function (value) {
        var v = value * 100;
        var vi = Math.floor(v);
        if (v == vi) {
            return v + "%";
        }
        else {
            return v.toFixed(2) + "%";
        }
    };
    /**
     * under 包含
     * over 不包含
     */
    Utils.random = function (under, over) {
        switch (arguments.length) {
            case 1: return Math.floor(Math.random() * under);
            case 2: return Math.floor(Math.random() * (over - under) + under);
            default: return 0;
        }
    };
    Utils.getParams = function () {
        var params = location.search; //获取url中"?"符后的字串 
        // const params = "?a=1&b=bc&c=101";
        var theRequest = new Object();
        if (params.indexOf("?") != -1) {
            var str = params.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
        }
        return theRequest;
    };
    /**
     * obj1 目标对象 同是返回值
     * obj2 被合并的对象
     */
    Utils.objMerger = function (obj1, obj2) {
        for (var r in obj2) {
            eval("obj1." + r + "=obj2." + r);
        }
        return obj1;
    };
    Utils.formatLongTime = function (time) {
        var t = Math.ceil(time);
        var hour = Math.floor(t / 60 / 60 % 60);
        var minute = Math.floor(t / 60 % 60);
        var second = Math.ceil(t % 60);
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return hour + ":" + minute + ":" + second;
    };
    Utils.formatShortTime = function (time) {
        var t = Math.ceil(time);
        var minute = Math.floor(t / 60 % 60);
        var second = Math.ceil(t % 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    };
    /**
     * 默认 Def;白羊座 Ari;金牛座 Tau;双子座 Gem;巨蟹座 Cnc;
     * 狮子座 Leo;处女座 Vir;天秤座 Lib;天蝎座 Sco;
     * 射手座 Sgr;摩羯座 Cap;水瓶座 Agr;双鱼座 Psc;
     */
    Utils.starsName = function (index) {
        switch (index) {
            case 0:
                return "def";
            case 1:
                return "ari";
            case 2:
                return "tau";
            case 3:
                return "gem";
            case 4:
                return "cnc";
            case 5:
                return "leo";
            case 6:
                return "vir";
            case 7:
                return "lib";
            case 8:
                return "sco";
            case 9:
                return "sgr";
            case 10:
                return "cap";
            case 11:
                return "agr";
            case 12:
                return "psc";
        }
    };
    //heros
    Utils.herosName = function (index) {
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
    Utils.getHoroscopeName = function (type) {
        var name;
        switch (type) {
            case DataType_PlayerIndex.Def:
                name = "星愿";
                break;
            case DataType_PlayerIndex.Ari:
                name = "白羊";
                break;
            case DataType_PlayerIndex.Tau:
                name = "金牛";
                break;
            case DataType_PlayerIndex.Gem:
                name = "双子";
                break;
            case DataType_PlayerIndex.Cnc:
                name = "巨蟹";
                break;
            case DataType_PlayerIndex.Leo:
                name = "狮子";
                break;
            case DataType_PlayerIndex.Vir:
                name = "处女";
                break;
            case DataType_PlayerIndex.Lib:
                name = "天秤";
                break;
            case DataType_PlayerIndex.Sco:
                name = "天蝎";
                break;
            case DataType_PlayerIndex.Sgr:
                name = "射手";
                break;
            case DataType_PlayerIndex.Cap:
                name = "摩羯";
                break;
            case DataType_PlayerIndex.Agr:
                name = "水瓶";
                break;
            case DataType_PlayerIndex.Psc:
                name = "双鱼";
                break;
        }
        return name;
    };
    Utils.getHeroName = function (type) {
        var name;
        switch (type) {
            case DataType_HeroIndex.Def:
                name = "";
                break;
            case DataType_HeroIndex.Pandora:
                name = "潘多拉";
                break;
            case DataType_HeroIndex.Poseidon:
                name = "波塞冬";
                break;
            case DataType_HeroIndex.Athena:
                name = "雅典娜";
                break;
            case DataType_HeroIndex.Handes:
                name = "哈迪斯";
                break;
            case DataType_HeroIndex.Hera:
                name = "赫拉";
                break;
            case DataType_HeroIndex.Zeus:
                name = "宙斯";
                break;
        }
        return name;
    };
    Utils.getSexIconPath = function (index) {
        var path;
        switch (index) {
            case 1:
                path = "resource/res/ui/base/base_sex_m.png";
                break;
            case 2:
                path = "resource/res/ui/base/base_sex_w.png";
                break;
        }
        return path;
    };
    Utils.getTipIcon = function () {
        var tip = new eui.Image();
        tip.source = "resource/res/ui/base/tipIcon.png";
        tip.width = 26;
        tip.height = 26;
        tip.anchorOffsetX = 26;
        tip.anchorOffsetY = 0;
        return tip;
    };
    Utils.getGoldPoint = function (parent) {
        if (parent === void 0) { parent = null; }
        return this.getPoint(400, 62, parent);
    };
    Utils.getGemPoint = function (parent) {
        if (parent === void 0) { parent = null; }
        return this.getPoint(119 + (53 / 2), 745 + (49 / 2), parent);
    };
    Utils.getPoint = function (x, y, parent) {
        if (parent === void 0) { parent = null; }
        if (parent == null) {
            return this.temPoint.setTo(x, y);
        }
        else {
            return parent.globalToLocal(x, y, this.temPoint);
        }
    };
    return Utils;
}());
Utils.temPoint = new egret.Point();
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map