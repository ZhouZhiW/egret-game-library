var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**通用函数类
 *
 */
var Comman = (function () {
    function Comman() {
    }
    /**根据传入的参数判断是否小于10，小于10则加0----返回值如00，01,02,...09，方便区分name
     *
     * @param value
     */
    Comman.isMaxTen = function (value) {
        var ret = value.toString();
        if (value < 10) {
            ret = "0" + ret;
        }
        return ret;
    };
    /**拼接图片资源名字并返回资源
     *
     * @param name 开头
     * @param all  all
     */
    Comman.nameJoint = function (name) {
        var all = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            all[_i - 1] = arguments[_i];
        }
        var jointString = name + GameConfig.SPLIT_CHAR + all.join(GameConfig.SPLIT_CHAR);
        return jointString;
    };
    /**复制函数-属性值以from类为准
     *
     * @param from 拷贝的对象
     * @param to  被拷贝的对象
     */
    Comman.copyFrom = function (from, to) {
        for (var key in from) {
            to[key] = from[key];
        }
    };
    /**复制函数-属性值以to类为准
     *
     * @param from 拷贝的对象
     * @param to  被拷贝的对象
     */
    Comman.copyTo = function (from, to) {
        for (var key in to) {
            to[key] = from[key];
        }
    };
    /**获取资源
     *
     * @param value 资源名称
     */
    Comman.getRes = function (value) {
        var res = this.getFromRes(value);
        if (res == null) {
        }
        return res;
    };
    /**从已加载资源中获取
     *
     * @param value 资源名称
     */
    Comman.getFromRes = function (value) {
        var res = RES.getRes(value);
        return res;
    };
    /**从服务器获取资源
     *
     * @param value 资源名称
     */
    Comman.getFromServer = function (value) {
    };
    /**获取到舞台所需要的SceneUtil
     *
     * @param sceneArray SceneUtil集合
     * @param name 所要寻找的名称
     */
    Comman.searchScene = function (sceneArray, name) {
        var search = null;
        if (sceneArray == null) {
            return search;
        }
        for (var sceneNumber = 0; sceneNumber < sceneArray.length; sceneNumber++) {
            if (sceneArray[sceneNumber].name == name) {
                search = sceneArray[sceneNumber];
                return search;
            }
        }
    };
    return Comman;
}());
__reflect(Comman.prototype, "Comman");
//# sourceMappingURL=Comman.js.map