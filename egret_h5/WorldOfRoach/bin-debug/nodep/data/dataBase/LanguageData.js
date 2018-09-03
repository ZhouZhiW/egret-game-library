var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 测试用语言包
 * 这里不牵涉配置文件,只是写死在业务中引用到,在替换版本后可实现配置文件多语言加载
 * @author nodep
 * @version 1.0
 */
var LanguageData = (function () {
    function LanguageData() {
        this.langMap = new Map();
        this.langMap.set(10001, "正在创建世界..");
    }
    LanguageData.getIns = function () {
        if (LanguageData._ins == null)
            LanguageData._ins = new LanguageData();
        return LanguageData._ins;
    };
    LanguageData.prototype.getLang = function (key) {
        return this.langMap.get(key);
    };
    return LanguageData;
}());
__reflect(LanguageData.prototype, "LanguageData");
//# sourceMappingURL=LanguageData.js.map