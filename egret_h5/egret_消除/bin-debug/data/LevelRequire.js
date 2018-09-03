var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelRequire = (function () {
    function LevelRequire() {
        this.reqElements = new Array();
    }
    /**
     * 过卡过关条件数量
     */
    LevelRequire.prototype.getLevelReqNum = function () {
        return this.reqElements.length;
    };
    /**
     * 添加一个关卡元素，类型与数量
     */
    LevelRequire.prototype.addElements = function (type, num) {
        var element = new LevelRequireElement();
        element.num = num;
        element.type = type;
        this.reqElements.push(element);
    };
    /**
     * 启动关卡条件修改
       */
    LevelRequire.prototype.openChange = function () {
        this.reqElements = [];
    };
    /**
     * 减少关卡中得元素数量
     */
    LevelRequire.prototype.changeReqNum = function (type, num) {
        var len = this.getLevelReqNum();
        for (var i = 0; i < len; i++) {
            if (this.reqElements[i].type == type) {
                this.reqElements[i].num -= num;
                console.log("最新数量", this.reqElements[i].num);
                return;
            }
        }
    };
    /**
     * 检测所有关卡元素是否都被删除
     */
    LevelRequire.prototype.isClear = function () {
        var len = this.getLevelReqNum();
        for (var i = 0; i < len; i++) {
            if (this.reqElements[i].num > 0) {
                return false;
            }
        }
        return true;
    };
    return LevelRequire;
}());
__reflect(LevelRequire.prototype, "LevelRequire");
//# sourceMappingURL=LevelRequire.js.map