var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 基础数据表
 * @author nodep
 * @version 1.0
 */
var LocalDataTable = (function () {
    function LocalDataTable() {
        this.datas = new Array();
    }
    /**
     * 初始化一个表格数据
     * 需要扩展索引等
     */
    LocalDataTable.prototype.initTable = function (file, values) {
        this.name = file;
        var obj;
        var cls = egret.getDefinitionByName(file);
        var value;
        while (values.length > 0) {
            obj = values.pop();
            value = new cls();
            ObjectUtil.copyTo(obj, value);
            this.datas.push(value);
        }
    };
    /**获取一条数据,他的属性于传入的相当 */
    LocalDataTable.prototype.getObject = function (args) {
        var value;
        var key;
        var flag = false;
        for (var _i = 0, _a = this.datas; _i < _a.length; _i++) {
            value = _a[_i];
            flag = true;
            for (key in args) {
                if (args[key] != value[key]) {
                    flag = false;
                    break;
                }
            }
            if (flag)
                return value;
        }
        return null;
    };
    /**获取一组符合条件的数据 */
    LocalDataTable.prototype.getObjects = function (args) {
        var values = [];
        var value;
        var key;
        var flag = false;
        for (var _i = 0, _a = this.datas; _i < _a.length; _i++) {
            value = _a[_i];
            flag = true;
            for (key in args) {
                if (args[key] != value[key]) {
                    flag = false;
                    break;
                }
            }
            if (flag)
                values.push(value);
        }
        return values;
    };
    return LocalDataTable;
}());
__reflect(LocalDataTable.prototype, "LocalDataTable");
//# sourceMappingURL=LocalDataTable.js.map