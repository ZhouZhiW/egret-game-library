var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**本地存储
 *
 */
var Local = (function () {
    function Local() {
    }
    /**存档
     *
     * @param key 键值
     * @param value 内容
     */
    Local.save = function (key, value) {
        localStorage.setItem(key, value);
    };
    /**读档
     *
     * @param key 键值
     */
    Local.load = function (key) {
        return localStorage.getItem(key);
    };
    return Local;
}());
__reflect(Local.prototype, "Local");
//# sourceMappingURL=Local.js.map