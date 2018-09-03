var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 本地基础数据,主要针对json文件
 * 将以数组形式存在的JSON文件进行统一管理
 * 如下格式user.json=[{},{},{}]
 * 通过file=user来查询这个表格,可通过扩展来完善仿sql
 * 另外需要注意：这样做的主要目的是为了将JSON的配置放置到Excel中，并利用工具自动创建.json,.ts文件
 * @see LocalDataTable
 * @author nodep
 * @version 1.1
 */
var LocalData = (function () {
    function LocalData() {
    }
    /**
     * 异步初始化表格
     * @param files json文件名数组 比如RES下的user_json.json->user
     */
    LocalData.loadLocalDataAsync = function (files, callBack, thisObj) {
        LocalData._callback = callBack;
        LocalData._thisObj = thisObj;
        LocalData._files = files;
        LocalData.loadNextAsync();
    };
    LocalData.loadNextAsync = function () {
        if (LocalData._files.length <= 0) {
            LocalData._callback.apply(LocalData._thisObj);
            LocalData._callback = null;
            LocalData._thisObj = null;
            LocalData._files = null;
        }
        else {
            LocalData._targetFile = LocalData._files.pop();
            RES.getResAsync(LocalData._targetFile.substr(0, LocalData._targetFile.length - 2) + "_json", LocalData.loadDbCompleteAsync, LocalData);
        }
    };
    LocalData.loadDbCompleteAsync = function (result) {
        LocalData.createTable(LocalData._targetFile, result);
        LocalData.loadNextAsync();
    };
    LocalData.loadLocalData = function (file) {
        var jsonName = file.substr(0, file.length - 2);
        var values = RES.getRes(jsonName + "_json");
        LocalData.createTable(file, values);
    };
    LocalData.createTable = function (file, result) {
        var table = new LocalDataTable();
        table.initTable(file, result);
        LocalData._dataMap.set(file, table);
        return table;
    };
    /**
     * 根据key-value获取一个对象，如果有多个对象将返回第一个.如果没有符合条件的对象，返回null
     * @param file 要获取的JSON名称
     * @param args 参数对
     */
    LocalData.getObjectByKv = function (file, args) {
        if (null == LocalData._dataMap.get(file))
            LocalData.loadLocalData(file);
        return LocalData._dataMap.get(file).getObject(args);
    };
    /**
     * 根据key-value获取符合条件的所有对象,如果没有符合条件的将返回长度为0的数组
     * @param key
     * @param value
     */
    LocalData.getObjectsByKv = function (file, args) {
        if (null == LocalData._dataMap.get(file))
            LocalData.loadLocalData(file);
        return LocalData._dataMap.get(file).getObjects(args);
    };
    return LocalData;
}());
LocalData._dataMap = new Map();
__reflect(LocalData.prototype, "LocalData");
//# sourceMappingURL=LocalData.js.map